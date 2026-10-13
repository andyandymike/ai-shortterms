const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('../deck/node_modules/typescript');
function makeCue(groups) {
  const timeline = [], phases = [];
  for (const [phase, group] of groups.entries()) {
    const start = timeline.length;
    timeline.push(...group.map((frame) => ({ ...frame, phase })));
    phases.push({ start, endFrame: timeline.length - 1, duration: group.reduce((sum, item) => sum + item.duration, 0), label: ['画面', 'Picture'], end: ['停住', 'Hold'], say: ['讲解', 'Explain'] });
  }
  return { frames: timeline.map(() => ({})), timeline, phases, duration: timeline.reduce((sum, frame) => sum + frame.duration, 0) };
}
const ordinary = (...durations) => durations.map((duration) => ({ duration }));
const cues = [
  makeCue([ordinary(0)]),
  makeCue([ordinary(500, 1000), ordinary(400, 600), ordinary(0)]),
  makeCue([ordinary(200), [{ duration: 30000, media: true }], ordinary(300)]),
  makeCue([ordinary(1000, 1000, 1000, 1000, 1000, 1000), ordinary(500)]),
  makeCue([ordinary(0), ordinary(0)]),
];
const source = fs.readFileSync('deck/app/session-2/cue-player.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const exportsObject = {};
let now = 0, hooks = [], hookIndex = 0, effectQueue = [], currentHook, nextTimer = 0;
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
function holdsForSpeaking() {
  const before = [currentHook.state.index, currentHook.state.phase, currentHook.state.frame, currentHook.elapsed, currentHook.duration];
  assert.equal(currentHook.state.status, 'ready');
  advanceTime(30000);
  assert.deepEqual([currentHook.state.index, currentHook.state.phase, currentHook.state.frame, currentHook.elapsed, currentHook.duration], before);
  assert.equal(timers.size, 0, 'there is no automatic continuation while the speaker talks');
}

renderHook();
assert.equal(currentHook.duration, 0);
holdsForSpeaking();
send({ type: 'enter', index: 1 });
assert.equal(currentHook.state.phase, 0);
assert.equal(currentHook.state.status, 'prepared');
assert.equal(currentHook.duration, 1500, 'only the current phase contributes to the time display');
advanceTime(10000);
assert.equal(currentHook.elapsed, 0);
send({ type: 'start' });
advanceTime(200);
assert.equal(currentHook.elapsed, 200, '100ms updates do not reset the clock');
advanceTime(50);
send({ type: 'pause' });
assert.equal(currentHook.elapsed, 250);
advanceTime(10000);
assert.equal(currentHook.elapsed, 250);
send({ type: 'resume' });
send({ type: 'tick', ...token() });
assert.equal(currentHook.state.frame, 0, 'queued ticks cannot prematurely complete a resumed frame');
advanceTime(250);
assert.equal(currentHook.state.frame, 1);
assert.equal(currentHook.state.status, 'playing');
advanceTime(999);
assert.equal(currentHook.state.status, 'playing', 'the last frame has a real remaining transition duration');
advanceTime(1);
assert.equal(currentHook.elapsed, 1500);
holdsForSpeaking();
send({ type: 'enter', index: 1, phase: 1, autoplay: true });
assert.equal(currentHook.state.frame, 2);
assert.equal(currentHook.elapsed, 0, 'phase entry resets progress instead of counting previous phases');
assert.equal(currentHook.duration, 1000);
advanceTime(1000);
assert.equal(currentHook.state.frame, 3);
holdsForSpeaking();
send({ type: 'enter', index: 1, phase: 2, autoplay: true });
assert.equal(currentHook.duration, 0, 'a static picture has no fixed speaking allowance');
holdsForSpeaking();

send({ type: 'enter', index: 1, phase: 0, autoplay: true });
const oldPhaseToken = token();
advanceTime(100);
send({ type: 'skip' });
assert.equal(currentHook.state.phase, 0);
assert.equal(currentHook.state.frame, 1, 'skip stops at this phase, not the end of the cue');
assert.equal(currentHook.elapsed, currentHook.duration);
holdsForSpeaking();
send({ type: 'enter', index: 1, phase: 0, autoplay: true });
assert.ok(currentHook.state.revision > oldPhaseToken.revision, 'replay gets a new event identity');
send({ type: 'tick', ...oldPhaseToken, at: now + 5000 });
assert.equal(currentHook.state.frame, 0);
send({ type: 'enter', index: 1, phase: 1, settled: true });
assert.equal(currentHook.state.frame, 3);
assert.equal(currentHook.elapsed, 1000, 'back to a phase shows just that completed phase');
holdsForSpeaking();
send({ type: 'enter', index: 1, settled: true });
assert.equal(currentHook.state.phase, 2, 'legacy settled entry defaults to the final phase');
assert.equal(currentHook.state.frame, 4);
assert.equal(currentHook.elapsed, 0);
holdsForSpeaking();

send({ type: 'enter', index: 1, phase: 0, autoplay: true });
now += 5000;
send({ type: 'tick', ...token() });
assert.equal(currentHook.state.phase, 0);
assert.equal(currentHook.state.frame, 1, 'a five-second late tick cannot cross a phase boundary');
holdsForSpeaking();
send({ type: 'enter', index: 3, autoplay: true });
now += 5000;
send({ type: 'tick', ...token() });
assert.equal(currentHook.state.frame, 5);
assert.equal(currentHook.elapsed, 5000);
assert.equal(currentHook.state.status, 'playing');
advanceTime(1000);
holdsForSpeaking();
assert.equal(currentHook.state.phase, 0);
send({ type: 'enter', index: 1, phase: 0, autoplay: true });
now += 750;
send({ type: 'pause' });
assert.equal(currentHook.state.frame, 1);
assert.equal(currentHook.elapsed, 750);
advanceTime(10000);
send({ type: 'resume' });
advanceTime(750);
holdsForSpeaking();

send({ type: 'enter', index: 2, phase: 1 });
assert.equal(currentHook.state.status, 'prepared', 'a single-frame film waits for explicit play');
send({ type: 'media-progress', ...token(), currentTime: 0, duration: 2 });
assert.equal(currentHook.duration, 2000);
send({ type: 'media-complete', ...token() });
assert.equal(currentHook.state.status, 'prepared');
send({ type: 'start' });
const oldVideoToken = token();
send({ type: 'media-progress', ...token(), currentTime: 0.6, duration: 2, waiting: true });
assert.equal(currentHook.elapsed, 600);
advanceTime(45000);
assert.equal(currentHook.elapsed, 600, 'buffering never consumes an estimated video timer');
assert.equal(currentHook.mediaWaiting, true);
send({ type: 'pause' });
send({ type: 'media-complete', ...token() });
assert.equal(currentHook.state.status, 'paused');
send({ type: 'resume' });
send({ type: 'media-progress', ...token(), currentTime: 2, duration: 2, waiting: false });
send({ type: 'media-complete', ...token() });
assert.equal(currentHook.state.phase, 1);
assert.equal(currentHook.state.frame, 1, 'film completion stops its own phase');
assert.equal(currentHook.elapsed, 2000);
holdsForSpeaking();
send({ type: 'enter', index: 2, phase: 2, autoplay: true });
send({ type: 'media-unavailable', ...oldVideoToken });
send({ type: 'media-complete', ...oldVideoToken });
assert.equal(currentHook.state.mediaUnavailable, false, 'old video failure cannot mark the next phase');
assert.equal(currentHook.state.status, 'playing');
assert.equal(currentHook.duration, 300, 'a following phase does not inherit video duration');
advanceTime(300);
holdsForSpeaking();
send({ type: 'enter', index: 2, phase: 1, autoplay: true });
send({ type: 'media-unavailable', ...oldVideoToken });
assert.equal(currentHook.state.mediaUnavailable, false, 'replayed video rejects failures from the previous revision');
send({ type: 'media-unavailable', ...token() });
assert.equal(currentHook.state.mediaUnavailable, true);
send({ type: 'media-complete', ...token() });
assert.equal(currentHook.state.mediaUnavailable, true, 'failure remains visible on the held fallback frame');
holdsForSpeaking();
send({ type: 'enter', index: 2, phase: 1 });
send({ type: 'media-progress', ...token(), currentTime: 0, duration: 2 });
send({ type: 'skip' });
assert.equal(currentHook.elapsed, 2000);
assert.equal(currentHook.duration, 2000);
holdsForSpeaking();
for (const phase of [0, 1]) {
  send({ type: 'enter', index: 4, phase, autoplay: true });
  assert.equal(currentHook.duration, 0);
  holdsForSpeaking();
}
console.log('PASS: every teaching phase holds indefinitely; phase-only progress; late timers, skip, replay, back, pause/resume and video/error tokens respect phase boundaries.');
