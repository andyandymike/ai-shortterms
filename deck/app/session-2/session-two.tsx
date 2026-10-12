'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { chapters, demonstrationNotes } from './content';
import { ChapterScene } from './scenes';
import { LabProvider } from './lab-state';
import { GuidedProvider } from './guided-state';
import { cues, firstCueForBeat } from './cues';
import { useCuePlayer } from './cue-player';
import { presenterChannel, type PresenterMessage, type PresenterSnapshot } from './presenter-bridge';
import s from './session-two.module.css';

const readSession = () => window.sessionStorage.getItem('atlas-session-2') ?? '';
const serverSession = () => '';
const subscribeSession = (notify: () => void) => {
  if (!readSession()) window.sessionStorage.setItem('atlas-session-2', crypto.randomUUID());
  notify();
  return () => {};
};

function readCue(hash: string) {
  const [chapterId, beatId, cueId] = hash.slice(1).split('/');
  const chapter = chapters.find(item => item.id === chapterId) ?? chapters[0];
  const mergedBeats: Record<string, string> = { J7: 'J8', R2: 'R1', R7: 'R6' };
  const beat = chapter.beats.find(item => item.id === (mergedBeats[beatId] ?? beatId)) ?? chapter.beats[0];
  const exact = cues.findIndex(cue => cue.id === cueId && cue.beat === beat.id);
  return exact < 0 ? firstCueForBeat(beat.id) : exact;
}

export default function SessionTwo() {
  const { state, dispatch } = useCuePlayer();
  const cue = cues[state.index];
  const chapterIndex = chapters.findIndex(item => item.beats.some(beat => beat.id === cue.beat));
  const chapter = chapters[chapterIndex];
  const step = chapter.beats.findIndex(item => item.id === cue.beat);
  const beat = chapter.beats[step];
  const sceneKind = cue.scene.kind === 'sort' ? 'Code experiment' : cue.scene.kind === 'film' ? '' : ['C3','J4','R3','R5'].includes(cue.beat) || ['desktop', 'blender', 'tokens', 'decision', 'llm', 'calibration', 'learning', 'successor'].includes(cue.scene.kind) ? 'Teaching demo' : '';
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<{ x:number; y:number } | null>(null);
  const channel = useRef<BroadcastChannel | null>(null);
  const session = useSyncExternalStore(subscribeSession, readSession, serverSession);
  const snapshot = useRef<PresenterSnapshot | null>(null);
  const command = useRef<(message: Extract<PresenterMessage, { type: 'command' }>) => void>(() => {});

  const enter = useCallback((index: number, settled = false) => {
    const target = cues[Math.max(0, Math.min(cues.length - 1, index))];
    const targetChapter = chapters.find(item => item.beats.some(beat => beat.id === target.beat))!;
    window.history.replaceState(null, '', `#${targetChapter.id}/${target.beat}/${target.id}`);
    dispatch({ type: 'enter', index, settled });
    setSourcesOpen(false);
  }, [dispatch, setSourcesOpen]);

  const go = useCallback((nextChapter: number, nextStep = 0) => {
    const index = Math.max(0, Math.min(chapters.length - 1, nextChapter));
    const target = chapters[index];
    const targetBeat = target.beats[Math.max(0, Math.min(target.beats.length - 1, nextStep))];
    enter(firstCueForBeat(targetBeat.id));
  }, [enter]);

  const restart = useCallback(() => enter(state.index), [enter, state.index]);
  const finish = useCallback(() => dispatch({ type: 'skip' }), [dispatch]);
  const back = useCallback(() => { if (state.index > 0) enter(state.index - 1, true); }, [enter, state.index]);

  const proceed = useCallback(() => {
    setSourcesOpen(false);
    if (state.status === 'playing') dispatch({ type: 'pause' });
    else if (state.status === 'paused') dispatch({ type: 'resume' });
    else if (state.index < cues.length - 1) enter(state.index + 1);
  }, [state.status, state.index, dispatch, enter, setSourcesOpen]);

  useEffect(() => {
    const navigate = () => enter(readCue(window.location.hash));
    navigate();
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, [enter]);

  useEffect(() => {
    command.current = (message) => {
      // Commands refer to the state the presenter actually saw; delayed clicks cannot skip a cue.
      if (message.cueId !== `${cue.id}/${state.revision}` || message.status !== state.status) return;
      if (message.action === 'continue') proceed();
      if (message.action === 'back') back();
      if (message.action === 'replay') restart();
      if (message.action === 'skip') dispatch({ type: 'skip' });
    };
    const next = cues[state.index + 1];
    const nextBeat = next && chapters.flatMap(chapter => chapter.beats).find(beat => beat.id === next.beat)!;
    snapshot.current = {
      cueId: `${cue.id}/${state.revision}`, index: state.index, total: cues.length,
      beatId: cue.beat, title: beat.title, label: cue.label,
      say: cue.say?.[0] ?? cue.label, look: cue.look?.[0] ?? cue.action,
      transition: cue.transition?.[0] ?? '', status: state.status,
      frame: state.frame + 1, frames: cue.frames.length,
      next: next ? { beatId: next.beat, title: nextBeat.title, label: next.label, say: next.say?.[0] ?? next.label, action: next.action } : null,
    };
    channel.current?.postMessage({ type: 'state', state: snapshot.current } satisfies PresenterMessage);
  }, [state, cue, beat.title, proceed, back, restart, dispatch]);

  useEffect(() => {
    if (!session) return;
    const bridge = new BroadcastChannel(presenterChannel(session));
    channel.current = bridge;
    let active = true;
    const publish = () => { if (active && snapshot.current) bridge.postMessage({ type: 'state', state: snapshot.current } satisfies PresenterMessage); };
    bridge.onmessage = (event: MessageEvent<PresenterMessage>) => {
      if (event.data?.type === 'hello') publish();
      else if (event.data?.type === 'command') command.current(event.data);
    };
    const heartbeat = window.setInterval(publish, 2000);
    publish();
    return () => { active = false; window.clearInterval(heartbeat); bridge.onmessage = null; bridge.close(); if (channel.current === bridge) channel.current = null; };
  }, [session]);

  const showSources = () => { dispatch({ type: 'pause' }); setSourcesOpen(true); };

  useEffect(() => {
    const element = dialog.current;
    if (sourcesOpen && element && !element.open) element.showModal();
    if (!sourcesOpen && element?.open) element.close();
  }, [sourcesOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('input, textarea, select, [contenteditable="true"], video')) return;
      if (sourcesOpen) {
        if (event.key.toLowerCase() === 's') { event.preventDefault(); setSourcesOpen(false); }
        return;
      }
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
      if (['ArrowRight', 'PageDown', ' ', 'n', 'N'].includes(event.key)) { event.preventDefault(); proceed(); }
      else if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); back(); }
      else if (event.key === 'Home') { event.preventDefault(); go(0); }
      else if (event.key === 'End') { event.preventDefault(); go(chapters.length - 1); }
      else if (event.key.toLowerCase() === 'r') { event.preventDefault(); restart(); }
      else if (event.key.toLowerCase() === 's' && chapter.sources.length) { event.preventDefault(); dispatch({ type: 'pause' }); setSourcesOpen(true); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [chapter.sources.length, go, proceed, back, restart, sourcesOpen, dispatch]);

  return (
    <main className={s.shell} data-accent={chapter.color} data-cue={cue.id} data-status={state.status} data-frame={state.frame}>
      <section className={s.slide} aria-label={`${chapter.name}, ${beat.id}: ${beat.label}`}
        onTouchStart={(event) => { touchStart.current = (event.target as Element).closest('button, a, video, [data-horizontal-scroll]') ? null : { x:event.touches[0].clientX, y:event.touches[0].clientY }; }}
        onTouchEnd={(event) => { const start = touchStart.current; touchStart.current = null; if (!start) return; const dx = event.changedTouches[0].clientX - start.x; const dy = event.changedTouches[0].clientY - start.y; if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 2) { if (dx < 0) proceed(); else back(); } }}>
        <div className={s.heading}>
          <p className={s.eyebrow}><span>{beat.id}</span>{chapter.term}{sceneKind && <span className={s.sceneKind}>{sceneKind}</span>}</p>
          <h1>{beat.title}</h1>
        </div>
        <GuidedProvider value={{ frame: cue.frames[state.frame], status: state.status, cueId: `${cue.id}/${state.revision}`, onComplete: finish }}><LabProvider><div className={s.scene}><ChapterScene id={beat.id} /></div></LabProvider></GuidedProvider>
        <div className={s.storyControls}>
          <nav className={s.steps} aria-label={`${chapter.name} steps`}>
            {chapter.beats.map((item, index) => <button key={item.id} onClick={() => go(chapterIndex, index)} aria-current={step === index ? 'step' : undefined} aria-label={`${item.id}: ${item.label}`} title={`${item.id} · ${item.label}`} />)}
            <span>{step + 1} / {chapter.beats.length}</span>
          </nav>
          {state.index === cues.length - 1 ? <Link href="/" className={s.primary}>Back to the collection ↗</Link> : <button className={s.primary} onClick={proceed} aria-label={state.status === 'playing' ? 'Pause animation' : state.status === 'paused' ? 'Resume animation' : 'Continue presentation'}>{state.status === 'playing' ? 'Pause' : state.status === 'paused' ? 'Resume' : 'Continue'}<span aria-hidden="true">{state.status === 'playing' ? 'Ⅱ' : state.status === 'paused' ? '▶' : '→'}</span></button>}
        </div>
      </section>
      <footer className={s.footer}>
        <Link href="/" className={s.collection} title="Back to the collection">↖ AI / FIELD NOTES</Link>
        <nav className={s.chapterNav} aria-label="Chapters">{chapters.map((item, index) => <button key={item.id} aria-current={index === chapterIndex ? 'page' : undefined} onClick={() => go(index)}><span>{String(index).padStart(2, '0')}</span>{item.name}</button>)}</nav>
        <div className={s.utility}><a href={`/session-2/presenter?session=${encodeURIComponent(session)}`} target="_blank" rel="noopener" title="Open speaker notes and next action in a new tab">Presenter ↗</a><button onClick={showSources} disabled={!chapter.sources.length} title="Sources (S)" aria-haspopup="dialog">Sources</button><button onClick={back} disabled={state.index === 0} aria-label="Previous cue">←</button></div>
      </footer>
      <dialog className={s.sources} ref={dialog} onCancel={() => setSourcesOpen(false)} onClose={() => setSourcesOpen(false)} aria-labelledby="sources-title">
        <div className={s.sourceHeading}><h2 id="sources-title">{chapter.name} / Sources</h2><button onClick={() => setSourcesOpen(false)} aria-label="Close sources">×</button></div>
        <h3>{beat.label}</h3>
        <p>{beat.subtitle} {beat.takeaway}</p>
        <p>Teaching notes updated 3 October 2026. Interactive examples are teaching simulations unless explicitly labeled as a source example.</p>
        <h3>About these demonstrations</h3>
        {(demonstrationNotes[chapter.id] ?? []).map(note => <p key={note}>{note}</p>)}
        <h3>Primary sources</h3>
        <ul>{chapter.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul>
        <a href="/notes/session-2/reference.md" target="_blank" rel="noreferrer">Full reference notes and claim boundaries ↗</a>
      </dialog>
    </main>
  );
}
