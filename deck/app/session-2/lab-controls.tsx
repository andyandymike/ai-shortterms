'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useGuided } from './guided-state';
import s from './labs.module.css';

export function usePlayback(tick: () => void, complete: boolean, delay = 850) {
  const guided = useGuided();
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (guided || !playing || complete) return;
    const timer = window.setTimeout(tick, delay);
    return () => window.clearTimeout(timer);
  }, [guided, playing, complete, delay, tick]);
  useEffect(() => {
    const stop = () => setPlaying(false);
    const visibility = () => { if (document.hidden) stop(); };
    window.addEventListener('hashchange', stop);
    document.addEventListener('visibilitychange', visibility);
    return () => { window.removeEventListener('hashchange', stop); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  return { playing: guided ? guided.status === 'playing' : playing && !complete, setPlaying };
}

export function Controls({ playing, complete, onPlay, onStep, onReset, label, note = 'Teaching demo', children }: {
  playing: boolean; complete: boolean; onPlay: () => void; onStep: () => void; onReset: () => void; label: string; note?: string; children?: ReactNode;
}) {
  const guided = useGuided();
  if (guided) return null;
  return <div className={s.controls} role="group" aria-label={`${label} controls`}>
    <button className={s.play} onClick={onPlay} aria-label={`${playing ? 'Pause' : complete ? 'Replay' : 'Play'} ${label}`}>{playing ? 'Ⅱ Pause' : complete ? '↻ Replay' : '▶ Play'}</button>
    <button onClick={onStep} disabled={complete} aria-label={`One step in ${label}`}>Step →</button>
    <button onClick={onReset} aria-label={`Reset ${label}`}>Reset ↺</button>
    {children}
    <span className={s.demoNote}>{note}</span>
  </div>;
}

export function Caption({ phase, children }: { phase: string; children: ReactNode }) {
  return <div className={s.caption} aria-live="polite"><span>{phase}</span><p>{children}</p></div>;
}
