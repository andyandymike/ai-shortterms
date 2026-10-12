import { useEffect, useReducer, useRef } from 'react';
import { cues } from './cues';
import type { GuidedStatus } from './guided-state';

type State = { index: number; frame: number; status: GuidedStatus; revision: number };
type Action = { type: 'enter'; index: number; settled?: boolean } | { type: 'tick' | 'pause' | 'resume' | 'skip' };
export function cueReducer(state: State, action: Action): State {
  if (action.type === 'enter') {
    const index = Math.max(0, Math.min(cues.length - 1, action.index));
    const last = cues[index].frames.length - 1;
    return { index, frame: action.settled ? last : 0, status: action.settled || last === 0 ? 'ready' : 'playing', revision: state.revision + 1 };
  }
  if (action.type === 'pause') return state.status === 'playing' ? { ...state, status: 'paused' } : state;
  if (action.type === 'resume') return state.status === 'paused' ? { ...state, status: 'playing' } : state;
  const last = cues[state.index].frames.length - 1;
  if (action.type === 'skip') return { ...state, frame: last, status: 'ready' };
  if (state.status !== 'playing') return state;
  const frame = Math.min(last, state.frame + 1);
  return { ...state, frame, status: frame === last ? 'ready' : 'playing' };
}

export function useCuePlayer() {
  const [state, dispatch] = useReducer(cueReducer, { index: 0, frame: 0, status: 'ready', revision: 0 });
  const remaining = useRef({ key: '', milliseconds: 0 });
  useEffect(() => {
    const key = `${state.revision}/${state.frame}`;
    if (remaining.current.key !== key) remaining.current = { key, milliseconds: cues[state.index].delay };
    if (state.status !== 'playing' || cues[state.index].scene.kind === 'film') return;
    const deadline = performance.now() + remaining.current.milliseconds;
    const timer = window.setTimeout(() => dispatch({ type: 'tick' }), remaining.current.milliseconds);
    return () => {
      window.clearTimeout(timer);
      remaining.current.milliseconds = Math.max(0, deadline - performance.now());
    };
  }, [state.index, state.frame, state.status, state.revision]);
  return { state, dispatch };
}
