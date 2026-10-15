'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useGuided, type GuidedState } from './guided-state';
import s from './blender-case.module.css';

const root = '/media/session-2/';
const recordings = [
  { id:'local-tree', label:'Operation recording', file:'blender-tree-demo.mp4', poster:'blender-tree-start.webp', held:'blender-tree-held.webp', end:30, rate:1.25, duration:'24 s · 1.25×', task:'Create a tree from a reference image.', caption:'This example: prompt → Python / API → Blender scene', source:'https://github.com/jonipwi/blender-mcp', credit:'jonipwi / Blender MCP · source recording, 00:00–00:30', alt:'Blender API workflow: a tree appears, then its editable model is inspected', posterAlt:'Source recording: a tree request and reference image in the API Bridge next to Blender', heldAlt:'Source recording: tree trunk selected in the editable Blender scene' },
  { id:'local-house', label:'Finished render', file:'blender-house-tour.webm', poster:'blender-house-start.webp', held:'blender-house-end.webp', end:30, rate:1, duration:'30 s', task:'Atelier House · a separate project', caption:'Finished render · a Python + Computer Use workflow', source:'https://developers.openai.com/blog/architectural-visualization-with-astra', credit:'Thomas Ricouard / OpenAI · architecture render', alt:'Atelier House: a finished Blender camera-tour render, not an agent-action recording', posterAlt:'Atelier House: living room at the start of the source film', heldAlt:'Atelier House: bedroom at the end of the source film' },
] as const;

function LocalRecording({ guided, index }: { guided:GuidedState; index:number }) {
  const shot = recordings[index];
  const sourceEnd = shot.end;
  const rate = shot.rate;
  const video = useRef<HTMLVideoElement>(null);
  const latest = useRef(guided);
  latest.current = guided;
  const completed = useRef(false);
  const [failed, setFailed] = useState(false);
  const held = guided.status === 'ready';
  const running = ['playing', 'paused'].includes(guided.status) && !failed;

  useEffect(() => {
    const image = new window.Image();
    image.src = `${root}${shot.held}`;
  }, [shot]);

  useEffect(() => {
    if (failed && guided.status === 'playing') guided.onComplete();
  }, [failed, guided.status, guided.onComplete]);

  useEffect(() => {
    const element = video.current;
    if (!element || !running) return;
    let active = true;
    let lastTime = element.currentTime;
    let lastProgress = performance.now();
    element.playbackRate = rate;
    const fail = () => {
      if (!active || completed.current) return;
      element.pause();
      setFailed(true);
      latest.current.onMediaUnavailable();
      latest.current.onComplete();
    };
    if (guided.status === 'playing') void element.play().catch(fail);
    else element.pause();
    const timer = window.setInterval(() => {
      if (latest.current.status !== 'playing' || completed.current) return;
      const time = element.currentTime;
      if (time >= sourceEnd - .05) {
        completed.current = true;
        element.pause();
        latest.current.onMediaProgress(sourceEnd / rate, sourceEnd / rate, false);
        latest.current.onComplete();
        return;
      }
      if (time > lastTime + .04) { lastTime = time; lastProgress = performance.now(); }
      if (performance.now() - lastProgress > 10000) { fail(); return; }
      latest.current.onMediaProgress(time / rate, sourceEnd / rate, element.readyState < 3);
    }, 100);
    return () => { active = false; window.clearInterval(timer); element.pause(); };
  }, [guided.status, running, sourceEnd, rate]);

  return <div className={s.case} data-blender-recording={shot.id}>
    <nav className={s.switcher} aria-label="Blender videos" onKeyDown={event => { if ([' ', 'Enter'].includes(event.key)) event.stopPropagation(); }}>
      <div className={s.choices}>{recordings.map((item, phase) => <button type="button" key={item.id} aria-pressed={phase === index} onClick={() => guided.onMediaSelect?.(phase)}>{item.label}</button>)}</div>
      <button type="button" className={s.exit} onClick={guided.onMediaExit}>Next page →</button>
    </nav>
    <div className={s.task}><p>{shot.task}</p><span>{shot.duration} · switch anytime</span></div>
    <div className={s.media}>
      {running ? <video ref={video} className={s.player} playsInline muted preload="auto" src={`${root}${shot.file}`} poster={`${root}${shot.poster}`} aria-label={shot.alt} onEnded={() => { if (guided.status === 'playing' && !completed.current) { completed.current = true; guided.onComplete(); } }} onError={() => { setFailed(true); guided.onMediaUnavailable(); guided.onComplete(); }} /> : <Image unoptimized className={s.poster} src={`${root}${held || failed ? shot.held : shot.poster}`} alt={held || failed ? shot.heldAlt : shot.posterAlt} width={1280} height={720} />}
    </div>
    <div className={s.caption}><p>{failed ? 'Video unavailable · source frame' : shot.caption}</p><a href={shot.source} target="_blank" rel="noreferrer">{shot.credit} ↗</a></div>
  </div>;
}

export function BlenderCase() {
  const guided = useGuided();
  const index = Math.max(0, Math.min(recordings.length - 1, guided?.frame.blender?.clip ?? 0));
  return guided ? <LocalRecording key={guided.cueId} guided={guided} index={index} /> : null;
}
