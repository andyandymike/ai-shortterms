import { useCallback, useEffect, useReducer } from 'react';
import { cues } from './cues';
import type { GuidedStatus } from './guided-state';

type State = {
  index: number; phase: number; frame: number; status: GuidedStatus; revision: number;
  elapsedBeforeFrame: number; frameElapsed: number;
  clockStartedAt: number | null; clockNow: number;
  mediaDuration: number | null; mediaWaiting: boolean; mediaUnavailable: boolean;
};
type FrameToken = { revision: number; frame: number };
type Action = (
  | { type: 'enter'; index: number; phase?: number; autoplay?: boolean; settled?: boolean }
  | { type: 'start' | 'pause' | 'resume' | 'skip' }
  | ({ type: 'tick' | 'progress' | 'media-complete' | 'media-unavailable' } & FrameToken)
  | ({ type: 'media-progress'; currentTime: number; duration: number; waiting?: boolean } & FrameToken)
) & { at?: number };

const safeDuration = (duration: number) => Number.isFinite(duration) ? Math.max(0, duration) : 0;
const frameDuration = (index: number, frame: number) => safeDuration(cues[index].timeline[frame].duration);
const durationBefore = (index: number, phase: number, frame: number) => cues[index].timeline.slice(cues[index].phases[phase].start, frame).reduce((sum, item) => sum + safeDuration(item.duration), 0);
const phaseEnd = (state: State) => cues[state.index].phases[state.phase].endFrame;
const currentDuration = (state: State) => state.mediaDuration ?? frameDuration(state.index, state.frame);
const isMedia = (state: State) => !!cues[state.index].timeline[state.frame].media;
const rawPositionAt = (state: State, at: number) => {
  const running = state.status === 'playing' && !isMedia(state) && state.clockStartedAt !== null;
  return state.frameElapsed + (running ? Math.max(0, at - state.clockStartedAt!) : 0);
};
const positionAt = (state: State, at: number) => Math.min(currentDuration(state), rawPositionAt(state, at));

function initialState(): State {
  const phase = cues[0].phases[0];
  const ready = phase.duration === 0;
  return {
    index: 0, phase: 0, frame: ready ? phase.endFrame : phase.start, status: ready ? 'ready' : 'prepared', revision: 0,
    elapsedBeforeFrame: 0, frameElapsed: 0, clockStartedAt: null, clockNow: 0,
    mediaDuration: null, mediaWaiting: false, mediaUnavailable: false,
  };
}

function settlePhase(state: State, at: number): State {
  const last = phaseEnd(state);
  const remainingBeforeLast = cues[state.index].timeline.slice(state.frame, last).reduce((sum, item, offset) =>
    sum + (offset === 0 ? currentDuration(state) : safeDuration(item.duration)), 0);
  return {
    ...state, frame: last, status: 'ready',
    elapsedBeforeFrame: state.elapsedBeforeFrame + remainingBeforeLast,
    frameElapsed: state.frame === last ? currentDuration(state) : frameDuration(state.index, last),
    clockStartedAt: null, clockNow: at, mediaDuration: state.frame === last ? state.mediaDuration : null, mediaWaiting: false,
  };
}

function advanceTimedFrames(state: State, at: number): State {
  let frame = state.frame;
  let elapsedBeforeFrame = state.elapsedBeforeFrame;
  let remaining = rawPositionAt(state, at);
  const timeline = cues[state.index].timeline;
  const last = phaseEnd(state);
  // Background tabs batch timers. Consume elapsed timeline time rather than
  // starting fresh delays. The current teaching phase is a hard stop.
  while (!timeline[frame].media && remaining >= frameDuration(state.index, frame)) {
    const duration = frameDuration(state.index, frame);
    if (frame === last) {
      return { ...state, frame, elapsedBeforeFrame, status: 'ready', frameElapsed: duration, clockStartedAt: null, clockNow: at, mediaDuration: null, mediaWaiting: false };
    }
    remaining -= duration;
    elapsedBeforeFrame += duration;
    frame += 1;
  }
  if (frame === state.frame) return state;
  const media = !!timeline[frame].media;
  return {
    ...state, frame, elapsedBeforeFrame, frameElapsed: 0,
    clockStartedAt: media ? at : at - remaining, clockNow: at,
    mediaDuration: null, mediaWaiting: false,
  };
}

export function cueReducer(state: State, action: Action): State {
  const at = action.at ?? state.clockNow;
  if (action.type === 'enter') {
    const index = Math.max(0, Math.min(cues.length - 1, action.index));
    const phase = Math.max(0, Math.min(cues[index].phases.length - 1, action.phase ?? (action.settled ? cues[index].phases.length - 1 : 0)));
    const target = cues[index].phases[phase];
    const settled = !!action.settled || target.duration === 0;
    const frame = settled ? target.endFrame : target.start;
    const status: GuidedStatus = settled ? 'ready' : action.autoplay ? 'playing' : 'prepared';
    return {
      index, phase, frame, status, revision: state.revision + 1,
      elapsedBeforeFrame: settled ? durationBefore(index, phase, frame) : 0,
      frameElapsed: settled ? frameDuration(index, frame) : 0,
      clockStartedAt: status === 'playing' ? at : null, clockNow: at,
      mediaDuration: null, mediaWaiting: false, mediaUnavailable: false,
    };
  }
  if (action.type === 'start' || action.type === 'resume') {
    const expected = action.type === 'start' ? 'prepared' : 'paused';
    return state.status === expected ? { ...state, status: 'playing', clockStartedAt: at, clockNow: at } : state;
  }
  if (action.type === 'pause') {
    if (state.status !== 'playing') return state;
    const current = isMedia(state) ? state : advanceTimedFrames(state, at);
    return current.status === 'ready' ? current : {
      ...current, status: 'paused', frameElapsed: positionAt(current, at), clockStartedAt: null, clockNow: at,
    };
  }
  if (action.type === 'skip') return settlePhase(state, at);
  if (!('revision' in action) || action.revision !== state.revision || action.frame !== state.frame) return state;
  if (action.type === 'media-unavailable') return isMedia(state) && state.status !== 'ready' ? { ...state, mediaUnavailable:true, mediaWaiting:false } : state;
  if (action.type === 'media-progress') {
    if (!isMedia(state) || state.status === 'ready') return state;
    const mediaDuration = Number.isFinite(action.duration) && action.duration > 0 ? action.duration * 1000 : state.mediaDuration;
    const position = Number.isFinite(action.currentTime) ? Math.max(0, action.currentTime * 1000) : state.frameElapsed;
    const frameElapsed = Math.min(mediaDuration ?? frameDuration(state.index, state.frame), position);
    const mediaWaiting = action.waiting ?? state.mediaWaiting;
    if (state.mediaDuration === mediaDuration && state.frameElapsed === frameElapsed && state.mediaWaiting === mediaWaiting) return state;
    return { ...state, frameElapsed, mediaDuration, mediaWaiting, clockNow: at };
  }
  if (state.status !== 'playing') return state;
  if (action.type === 'media-complete') return isMedia(state) ? settlePhase(state, at) : state;
  if (isMedia(state)) return state;
  if (action.type === 'progress') return { ...state, clockNow: at };
  // A queued tick from before a pause cannot complete a resumed frame early.
  if (action.type === 'tick') return advanceTimedFrames(state, at);
  return state;
}

export function useCuePlayer() {
  const [state, reduce] = useReducer(cueReducer, undefined, initialState);
  const dispatch = useCallback((action: Action) => reduce({ ...action, at: action.at ?? performance.now() }), []);
  const { index, frame, status, revision, frameElapsed, clockStartedAt } = state;

  useEffect(() => {
    const current = cues[index].timeline[frame];
    if (status !== 'playing' || current.media) return;
    const duration = safeDuration(current.duration);
    const position = () => frameElapsed + (clockStartedAt === null ? 0 : Math.max(0, performance.now() - clockStartedAt));
    const pulse = () => dispatch({ type: position() >= duration ? 'tick' : 'progress', revision, frame });
    const timer = window.setTimeout(pulse, Math.ceil(Math.max(0, duration - position())));
    const progress = window.setInterval(pulse, 100);
    return () => { window.clearTimeout(timer); window.clearInterval(progress); };
  }, [index, frame, status, revision, frameElapsed, clockStartedAt, dispatch]);

  // Progress measures this picture transition, never time allowed for speaking.
  const duration = state.elapsedBeforeFrame + currentDuration(state) + cues[index].timeline.slice(frame + 1, phaseEnd(state) + 1).reduce((sum, item) => sum + safeDuration(item.duration), 0);
  const elapsed = Math.min(duration, state.elapsedBeforeFrame + positionAt(state, state.clockNow));
  return { state, dispatch, elapsed, duration, mediaWaiting: state.mediaWaiting };
}
