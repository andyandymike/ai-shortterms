'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useGuided, type GuidedState } from './guided-state';
import s from './blender-case.module.css';

const root = '/media/session-2/';
const sourceEnd = 30;
const rate = 1.25;

function TreeRecording({ guided }: { guided:GuidedState }) {
  const video = useRef<HTMLVideoElement>(null);
  const latest = useRef(guided);
  latest.current = guided;
  const completed = useRef(false);
  const [failed, setFailed] = useState(false);
  const held = guided.status === 'ready';
  const running = ['playing', 'paused'].includes(guided.status) && !failed;

  useEffect(() => {
    const image = new window.Image();
    image.src = `${root}blender-tree-held.webp`;
  }, []);

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
  }, [guided.status, running]);

  return <div className={s.case} data-blender-recording="local-tree">
    <div className={s.task}><p>Create a tree from a reference image.</p><span>24 s · 1.25× · one continuous clip</span></div>
    <div className={s.media}>
      {running ? <video ref={video} className={s.player} playsInline muted preload="auto" src={`${root}blender-tree-demo.mp4`} poster={`${root}blender-tree-start.webp`} aria-label="Blender API workflow: a tree appears, then its editable model is inspected" onError={() => { setFailed(true); guided.onMediaUnavailable(); guided.onComplete(); }} /> : <Image unoptimized className={s.poster} src={`${root}${held || failed ? 'blender-tree-held.webp' : 'blender-tree-start.webp'}`} alt={held || failed ? 'Source recording: tree trunk selected in the editable Blender scene' : 'Source recording: a tree request and reference image in the API Bridge next to Blender'} width={1280} height={720} />}
    </div>
    <div className={s.caption}><p>{failed ? 'Video unavailable · source frame' : 'This example: prompt → Python / API → Blender scene'}</p><a href="https://github.com/jonipwi/blender-mcp" target="_blank" rel="noreferrer">jonipwi / Blender MCP · source recording, 00:00–00:30 ↗</a></div>
  </div>;
}

export function BlenderCase() {
  const guided = useGuided();
  return guided ? <TreeRecording key={guided.cueId} guided={guided} /> : null;
}