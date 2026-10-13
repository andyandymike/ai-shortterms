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
  const [chapterId, beatId, cueId, checkpoint] = hash.slice(1).split('/');
  const chapter = chapters.find(item => item.id === chapterId) ?? chapters[0];
  const mergedBeats: Record<string, string> = { C2:'C4', C3:'C1', J4:'J3', J6:'J8', J7:'J8', R2:'R1', R3:'R1', R7:'R6' };
  const beat = chapter.beats.find(item => item.id === (mergedBeats[beatId] ?? beatId)) ?? chapter.beats[0];
  const exact = cues.findIndex(cue => cue.id === cueId && cue.beat === beat.id);
  const index = exact < 0 ? firstCueForBeat(beat.id) : exact;
  const phase = Math.max(0, Math.min(cues[index].phases.length - 1, Math.trunc(Number(checkpoint) || 1) - 1));
  return { index, phase };
}

export default function SessionTwo() {
  const { state, dispatch, elapsed, duration, mediaWaiting } = useCuePlayer();
  const cue = cues[state.index];
  const chapterIndex = chapters.findIndex(item => item.beats.some(beat => beat.id === cue.beat));
  const chapter = chapters[chapterIndex];
  const step = chapter.beats.findIndex(item => item.id === cue.beat);
  const beat = chapter.beats[step];
  const slideTitle = beat.term ? `${beat.term.name}${beat.term.fullName ? ` · ${beat.term.fullName}` : ''}` : beat.title;
  const sceneKind = cue.beat === 'R4' ? 'Code experiment' : cue.beat === 'R5' ? 'Reported example' : cue.beat === 'R6' ? 'Hypothetical extension' : ['O1','E1','C6'].includes(cue.beat) ? '' : 'Teaching demo';
  const phase = state.phase;
  const currentPicture = cue.phases[phase];
  const nextIndex = phase + 1 < cue.phases.length ? state.index : state.index + 1;
  const nextPhase = nextIndex === state.index ? phase + 1 : 0;
  const nextCue = cues[nextIndex];
  const isFilm = !!cue.timeline[state.frame].media;
  const primaryLabel = state.status === 'playing' ? isFilm ? 'Pause film' : 'Pause transition' : state.status === 'paused' ? isFilm ? 'Resume film' : 'Resume transition' : state.status === 'prepared' ? state.mediaUnavailable ? 'Show source still' : isFilm ? 'Play source film' : 'Play animation' : nextCue?.beat === cue.beat ? 'Next picture' : 'Next page';
  const picture = cues.slice(0, state.index).filter(item => item.beat === cue.beat).reduce((sum, item) => sum + item.phases.length, 0) + phase + 1;
  const pictures = cues.filter(item => item.beat === cue.beat).reduce((sum, item) => sum + item.phases.length, 0);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const viewport = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<{ x:number; y:number } | null>(null);
  const channel = useRef<BroadcastChannel | null>(null);
  const session = useSyncExternalStore(subscribeSession, readSession, serverSession);
  const snapshot = useRef<PresenterSnapshot | null>(null);
  const command = useRef<(message: Extract<PresenterMessage, { type: 'command' }>) => void>(() => {});
  const lastProceed = useRef(-Infinity);

  useEffect(() => { if (viewport.current) viewport.current.scrollTop = 0; }, [cue.beat]);

  const enter = useCallback((index: number, settled = false, autoplay = false, targetPhase?: number) => {
    const target = cues[Math.max(0, Math.min(cues.length - 1, index))];
    const phase = Math.max(0, Math.min(target.phases.length - 1, targetPhase ?? (settled ? target.phases.length - 1 : 0)));
    const targetChapter = chapters.find(item => item.beats.some(beat => beat.id === target.beat))!;
    window.history.replaceState(null, '', `#${targetChapter.id}/${target.beat}/${target.id}/${phase + 1}`);
    dispatch({ type: 'enter', index, phase, settled, autoplay });
    setSourcesOpen(false);
  }, [dispatch, setSourcesOpen]);

  const go = useCallback((nextChapter: number, nextStep = 0) => {
    lastProceed.current = -Infinity;
    const index = Math.max(0, Math.min(chapters.length - 1, nextChapter));
    const target = chapters[index];
    const targetBeat = target.beats[Math.max(0, Math.min(target.beats.length - 1, nextStep))];
    enter(firstCueForBeat(targetBeat.id));
  }, [enter]);

  const restart = useCallback(() => enter(state.index, false, true, state.phase), [enter, state.index, state.phase]);
  const finish = useCallback(() => dispatch({ type: 'media-complete', revision: state.revision, frame: state.frame }), [dispatch, state.revision, state.frame]);
  const mediaProgress = useCallback((currentTime: number, duration: number, waiting?: boolean) => dispatch({ type:'media-progress', revision:state.revision, frame:state.frame, currentTime, duration, waiting }), [dispatch, state.revision, state.frame]);
  const mediaUnavailable = useCallback(() => dispatch({ type:'media-unavailable', revision:state.revision, frame:state.frame }), [dispatch, state.revision, state.frame]);
  const back = useCallback(() => { if (state.phase > 0) enter(state.index, true, false, state.phase - 1); else if (state.index > 0) enter(state.index - 1, true); }, [enter, state.index, state.phase]);

  const proceed = useCallback(() => {
    // A double click is one intention, including when the next page is static.
    const now = performance.now();
    if (now - lastProceed.current < 350) return;
    lastProceed.current = now;
    setSourcesOpen(false);
    if (state.status === 'playing') dispatch({ type: 'pause' });
    else if (state.status === 'paused') dispatch({ type: 'resume' });
    else if (state.status === 'prepared') dispatch({ type: 'start' });
    // Navigation prepares the next visual; only an explicit play or replay starts it.
    else if (nextIndex < cues.length) enter(nextIndex, false, false, nextPhase);
  }, [state.status, nextIndex, nextPhase, dispatch, enter, setSourcesOpen]);

  useEffect(() => {
    const navigate = () => { lastProceed.current = -Infinity; const target = readCue(window.location.hash); enter(target.index, false, false, target.phase); };
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
    const next = cues[nextIndex];
    const nextPicture = next?.phases[nextPhase];
    const nextBeat = next && chapters.flatMap(chapter => chapter.beats).find(beat => beat.id === next.beat)!;
    snapshot.current = {
      cueId: `${cue.id}/${state.revision}`, index: state.index, total: cues.length,
      beatId: cue.beat, title: slideTitle, label: currentPicture.label[0],
      say: currentPicture.say[0], look: currentPicture.end[0],
      transition: phase === cue.phases.length - 1 ? cue.transition?.[0] ?? '' : '', status: state.status,
      frame: state.frame - currentPicture.start + 1, frames: currentPicture.endFrame - currentPicture.start + 1,
      page: chapters.flatMap(chapter => chapter.beats).findIndex(item => item.id === cue.beat) + 1,
      pages: chapters.flatMap(chapter => chapter.beats).length,
      part: picture, parts: pictures,
      duration, elapsed, waiting: mediaWaiting, unavailable:state.mediaUnavailable,
      phase, phases: cues.filter(item => item.beat === cue.beat).flatMap(item => item.phases.map(part => part.label[0])), end: currentPicture.end[0],
      next: next && nextPicture ? { beatId: next.beat, title: nextBeat.term ? `${nextBeat.term.name}${nextBeat.term.fullName ? ` · ${nextBeat.term.fullName}` : ''}` : nextBeat.title, label: nextPicture.label[0], say: nextPicture.say[0], action: nextPicture.label[0], duration: nextPicture.duration, phases: [nextPicture.label[0]], end: nextPicture.end[0] } : null,
    };
    channel.current?.postMessage({ type: 'state', state: snapshot.current } satisfies PresenterMessage);
  }, [state, cue, slideTitle, proceed, back, restart, dispatch, elapsed, duration, mediaWaiting, phase, currentPicture, nextIndex, nextPhase, picture, pictures]);

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
    <main ref={viewport} className={s.shell} data-accent={chapter.color} data-cue={cue.id} data-status={state.status} data-frame={state.frame} data-phase={state.phase}>
      <section className={s.slide} aria-label={`${chapter.name}, ${beat.id}: ${beat.label}`}
        onTouchStart={(event) => { touchStart.current = (event.target as Element).closest('button, a, video, [data-horizontal-scroll]') ? null : { x:event.touches[0].clientX, y:event.touches[0].clientY }; }}
        onTouchEnd={(event) => { const start = touchStart.current; touchStart.current = null; if (!start) return; const dx = event.changedTouches[0].clientX - start.x; const dy = event.changedTouches[0].clientY - start.y; if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 2) { if (dx < 0) proceed(); else back(); } }}>
        {beat.term ? <div className={s.chapterCover} data-chapter-opening={beat.id}>
          <p className={s.coverIndex}><span>{String(chapterIndex).padStart(2, '0')}</span>CHAPTER</p>
          <div className={s.coverBody}>
            <h1 data-long={beat.term.name.length > 8}>{beat.term.name === 'Computer Use' ? <>Computer<br />Use</> : beat.term.name}</h1>
            <div className={s.coverDefinition}>
              {beat.term.fullName && <p className={s.coverExpansion}>{beat.term.fullName.split(' ').map((word, index, words) => <span key={index}>{word}{index < words.length - 1 && ' '}</span>)}</p>}
              <p className={s.coverMeaning}>{beat.subtitle}</p>
            </div>
          </div>
        </div> : <>
          <div className={s.heading}>
            <p className={s.eyebrow}><span>{beat.id}</span>{chapter.term}{sceneKind && <span className={s.sceneKind}>{sceneKind}</span>}</p>
            <h1>{beat.title}</h1>
          </div>
          <GuidedProvider value={{ frame: cue.frames[state.frame], status: state.status, cueId: `${cue.id}/${state.revision}`, onComplete: finish, onMediaProgress: mediaProgress, onMediaUnavailable: mediaUnavailable }}><LabProvider><div className={s.scene}><ChapterScene id={beat.id} /></div></LabProvider></GuidedProvider>
        </>}
        <div className={s.storyControls}>
          <nav className={s.steps} aria-label={`${chapter.name} steps`}>
            {chapter.beats.map((item, index) => <button key={item.id} onClick={() => go(chapterIndex, index)} aria-current={step === index ? 'step' : undefined} aria-label={`${item.id}: ${item.label}`} title={`${item.id} · ${item.label}`} />)}
            <span>{step + 1} / {chapter.beats.length}</span>
          </nav>
          <div className={s.playbackControls}>
            <div className={s.segmentProgress} title={currentPicture.end[1]}><span>{state.mediaUnavailable ? 'Video unavailable · source still' : `Picture ${picture} / ${pictures} · ${state.status === 'ready' ? 'Holding for explanation' : state.status === 'prepared' ? 'Ready to play' : state.status === 'paused' ? 'Paused' : mediaWaiting ? 'Buffering' : 'Auto-hold at the end'}`}</span>{!state.mediaUnavailable && duration > 0 && ['playing','paused'].includes(state.status) && <progress aria-label="Picture transition progress" max={duration} value={elapsed} />}</div>
            {state.index === cues.length - 1 ? <Link href="/" className={s.primary}>Back to the collection ↗</Link> : <button className={s.primary} onClick={proceed} aria-label={primaryLabel}>{primaryLabel}<span aria-hidden="true">{state.status === 'playing' ? 'Ⅱ' : state.status === 'paused' || state.status === 'prepared' ? '▶' : '→'}</span></button>}
          </div>
        </div>
      </section>
      <footer className={s.footer}>
        <Link href="/" className={s.collection} title="Back to the collection">↖ AI / FIELD NOTES</Link>
        <nav className={s.chapterNav} aria-label="Chapters">{chapters.map((item, index) => <button key={item.id} aria-current={index === chapterIndex ? 'page' : undefined} onClick={() => go(index)}><span>{String(index).padStart(2, '0')}</span>{item.name}</button>)}</nav>
        <div className={s.utility}><a href={`/session-2/presenter?session=${encodeURIComponent(session)}`} target="_blank" rel="noopener" title="Open speaker notes and next action in a new tab">Presenter ↗</a><button onClick={showSources} disabled={!chapter.sources.length} title="Sources (S)" aria-haspopup="dialog">Sources</button><button onClick={back} disabled={state.index === 0 && phase === 0} aria-label="Previous picture">←</button></div>
      </footer>
      <dialog className={s.sources} ref={dialog} onCancel={() => setSourcesOpen(false)} onClose={() => setSourcesOpen(false)} aria-labelledby="sources-title">
        <div className={s.sourceHeading}><h2 id="sources-title">{chapter.name} / Sources</h2><button onClick={() => setSourcesOpen(false)} aria-label="Close sources">×</button></div>
        <h3>{beat.label}</h3>
        <p>{beat.subtitle} {beat.takeaway}</p>
        <p>Teaching notes updated 12 October 2026. Interactive examples are teaching simulations unless explicitly labeled as a source example.</p>
        <h3>About these demonstrations</h3>
        {(demonstrationNotes[chapter.id] ?? []).map(note => <p key={note}>{note}</p>)}
        <h3>Primary sources</h3>
        <ul>{chapter.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul>
        <a href="/notes/session-2/reference.md" target="_blank" rel="noreferrer">Full reference notes and claim boundaries ↗</a>
      </dialog>
    </main>
  );
}
