const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('../deck/node_modules/typescript');
const makeCue = (timeline) => ({ frames: timeline.map(() => ({})), timeline, duration: timeline.reduce((sum, frame) => sum + frame.duration, 0) });
const cues = [makeCue([{ duration: 0 }]), makeCue([{ duration: 500 }, { duration: 1000 }]), makeCue([{ duration: 200 }, { duration: 30000, media: true }, { duration: 300 }]), makeCue([{ duration: 30000, media: true }]), makeCue(Array.from({ length: 6 }, () => ({ duration: 1000 }))), makeCue([{ duration: 500 }, { duration: 500 }, { duration: 30000, media: true }, { duration: 500 }])];
const source = fs.readFileSync('deck/app/session-2/cue-player.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const exportsObject = {};
let now = 0;
let hooks = [];
let hookIndex = 0;
let effectQueue = [];
let currentHook;
let nextTimer = 0;
const timers = new Map();
const sameDependencies = (a, b) => !!a && a.length === b.length && a.every((item, index) => Object.is(item, b[index]));
const react = {
  useReducer(reducer, arg, initialize) {
    const index = hookIndex++;
    if (!hooks[index]) hooks[index] = { value: initialize(arg), dispatch(action) { hooks[index].value = reducer(hooks[index].value, action); renderHook(); } };
    return [hooks[index].value, hooks[index].dispatch];
  },
  useCallback(callback, dependencies) {
    const index = hookIndex++;
    if (!hooks[index] || !sameDependencies(hooks[index].dependencies, dependencies)) hooks[index] = { dependencies, callback };
    return hooks[index].callback;
  },
  useEffect(effect, dependencies) {
    const index = hookIndex++;
    if (hooks[index] && sameDependencies(hooks[index].dependencies, dependencies)) return;
    hooks[index]?.cleanup?.();
    hooks[index] = { dependencies };
    effectQueue.push(() => { hooks[index].cleanup = effect(); });
  },
};
const addTimer = (callback, delay, interval) => { const id = ++nextTimer; timers.set(id, { callback, at: now + delay, interval }); return id; };
vm.runInNewContext(compiled, {
  exports: exportsObject,
  require: (name) => name === 'react' ? react : name === './cues' ? { cues } : assert.fail(`Unexpected import: ${name}`),
  performance: { now: () => now },
  window: { setTimeout: (callback, delay) => addTimer(callback, delay, 0), clearTimeout: (id) => timers.delete(id), setInterval: (callback, delay) => addTimer(callback, delay, delay), clearInterval: (id) => timers.delete(id) },
});
function renderHook() { hookIndex = 0; currentHook = exportsObject.useCuePlayer(); while (effectQueue.length) effectQueue.shift()(); }
function advanceTime(milliseconds) {
  const until = now + milliseconds;
  for (;;) {
    const next = [...timers].sort((a, b) => a[1].at - b[1].at)[0];
    if (!next || next[1].at > until) break;
    const [id, timer] = next;
    now = timer.at;
    if (timer.interval) timer.at += timer.interval; else timers.delete(id);
    timer.callback();
  }
  now = until;
}
const send = (action) => currentHook.dispatch(action);
const token = () => ({ revision: currentHook.state.revision, frame: currentHook.state.frame });

renderHook();
assert.equal(currentHook.state.status, 'ready');
send({ type: 'enter', index: 1 });
assert.equal(currentHook.state.status, 'prepared');
advanceTime(1000);
assert.equal(currentHook.elapsed, 0);
send({ type: 'start' });
advanceTime(200);
assert.equal(currentHook.elapsed, 200, '100ms progress does not reset the clock');
advanceTime(50);
send({ type: 'pause' });
assert.equal(currentHook.elapsed, 250, 'pause captures time between progress pulses');
advanceTime(10000);
assert.equal(currentHook.elapsed, 250);
send({ type: 'resume' });
send({ type: 'tick', ...token() });
assert.equal(currentHook.state.frame, 0, 'queued pre-pause tick cannot finish a resumed frame early');
advanceTime(250);
assert.equal(currentHook.state.frame, 1);
assert.equal(currentHook.state.status, 'playing', 'last frame receives its own duration');
assert.equal(currentHook.elapsed, 500);
advanceTime(900);
assert.equal(currentHook.elapsed, 1400);
advanceTime(100);
assert.equal(currentHook.state.status, 'ready');
assert.equal(currentHook.elapsed, 1500);
advanceTime(2000);
assert.equal(currentHook.state.index, 1, 'completion never starts the next cue');

send({ type: 'enter', index: 2, autoplay: true });
advanceTime(200);
assert.equal(currentHook.state.frame, 1);
const oldMedia = token();
send({ type: 'media-progress', ...token(), currentTime: 0.6, duration: 1, waiting: true });
assert.equal(currentHook.elapsed, 800);
assert.equal(currentHook.duration, 1500, 'actual video metadata replaces the estimate in total duration');
assert.equal(currentHook.mediaWaiting, true);
advanceTime(45000);
assert.equal(currentHook.elapsed, 800, 'media progress freezes during buffering');
assert.equal(currentHook.state.frame, 1, 'estimated video duration never acts as a timer');
send({ type: 'pause' });
send({ type: 'media-complete', ...token() });
assert.equal(currentHook.state.frame, 1, 'paused media cannot advance asynchronously');
send({ type: 'resume' });
send({ type: 'media-progress', ...token(), currentTime: 1, duration: 1, waiting: false });
send({ type: 'media-complete', ...token() });
assert.equal(currentHook.state.frame, 2);
assert.equal(currentHook.elapsed, 1200, 'completed media contributes its actual duration');
assert.equal(currentHook.duration, 1500, 'actual media duration remains available after its segment');
send({ type: 'media-complete', ...oldMedia });
assert.equal(currentHook.state.status, 'playing', 'old media callback cannot complete a different frame');
advanceTime(300);
assert.equal(currentHook.state.status, 'ready');
assert.equal(currentHook.elapsed, 1500);

send({ type: 'enter', index: 3, autoplay: true });
const oldRun = token();
send({ type: 'media-progress', ...oldRun, currentTime: 0.2, duration: 2, waiting: false });
send({ type: 'skip' });
assert.equal(currentHook.elapsed, 2000);
assert.equal(currentHook.elapsed, currentHook.duration, 'skip always yields 100 percent');
assert.equal(currentHook.state.status, 'ready');
send({ type: 'media-progress', ...oldRun, currentTime: 0.5, duration: 2 });
assert.equal(currentHook.elapsed, 2000, 'late media progress cannot rewind a skipped cue');
send({ type: 'enter', index: 3, autoplay: true });
send({ type: 'media-complete', ...oldRun });
assert.equal(currentHook.state.status, 'playing', 'replay rejects callbacks from its previous revision');
send({ type: 'media-progress', ...token(), currentTime: 2, duration: 2 });
send({ type: 'media-complete', ...token() });
assert.equal(currentHook.state.status, 'ready');
assert.equal(currentHook.elapsed, 2000);
send({ type: 'enter', index: 2, settled: true });
assert.equal(currentHook.state.status, 'ready');
assert.equal(currentHook.state.frame, 2);
assert.equal(currentHook.elapsed, 30500);
send({ type: 'enter', index: 3 });
send({ type: 'media-progress', ...token(), currentTime: 0, duration: 2 });
send({ type: 'media-complete', ...token() });
assert.equal(currentHook.state.status, 'prepared', 'preloaded video cannot complete before the user starts it');
assert.equal(currentHook.elapsed, 0);
assert.equal(currentHook.duration, 2000);
send({ type: 'enter', index: 4, autoplay: true });
now += 5000; // A blocked/background tab did not run any timer callback.
send({ type: 'tick', ...token() });
assert.equal(currentHook.state.frame, 5, 'a late tick catches up across expired ordinary frames');
assert.equal(currentHook.elapsed, 5000);
assert.equal(currentHook.state.status, 'playing', 'the last frame still receives its remaining hold');
advanceTime(1000);
assert.equal(currentHook.state.status, 'ready');
assert.equal(currentHook.elapsed, 6000);
assert.equal(currentHook.state.index, 4, 'catch-up never crosses a cue boundary');
send({ type: 'enter', index: 5, autoplay: true });
now += 5000;
send({ type: 'tick', ...token() });
assert.equal(currentHook.state.frame, 2, 'catch-up stops at the first unplayed media frame');
assert.equal(currentHook.elapsed, 1000, 'wall-clock overrun never counts as watched media');
advanceTime(5000);
assert.equal(currentHook.state.frame, 2);
send({ type: 'enter', index: 1, autoplay: true });
now += 750;
send({ type: 'pause' });
assert.equal(currentHook.state.frame, 1, 'pause also settles a late ordinary timeline');
assert.equal(currentHook.state.status, 'paused');
assert.equal(currentHook.elapsed, 750);
advanceTime(10000);
assert.equal(currentHook.elapsed, 750);
send({ type: 'resume' });
advanceTime(749);
assert.equal(currentHook.state.status, 'playing');
advanceTime(1);
assert.equal(currentHook.state.status, 'ready');
assert.equal(currentHook.elapsed, 1500);
console.log('PASS: bounded cue playback, final holds, pause/resume, actual media progress, stale events and no automatic cue advance.');
