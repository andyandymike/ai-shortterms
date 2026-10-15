'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useGuided, type GuidedState } from './guided-state';
import s from './blender-case.module.css';

const mediaRoot = '/media/session-2/';
const tutorial = 'https://www.youtube.com/watch?v=eM50HqZ4p7Y';
const shots = [
  { start:94, end:99, poster:'blender-task.png', held:'blender-task.png', name:'The task', source:`${tutorial}&t=94s`, credit:'Kakarot Labs · edited screen recording · 01:34–01:39' },
  { start:100, end:112, poster:'blender-before.png', held:'blender-after.png', name:'The interface actions', source:`${tutorial}&t=100s`, credit:'Kakarot Labs · edited screen recording · 01:40–01:52' },
  { start:0, end:6, poster:'blender-house-start.webp', held:'blender-house-held.webp', name:'A larger project', source:'https://developers.openai.com/blog/architectural-visualization-with-astra', credit:'Thomas Ricouard / OpenAI · separate project · finished render' },
] as const;
type Shot = typeof shots[number];
type MediaCallbacks = { progress:(time:number, waiting?:boolean) => void; complete:() => void; fail:() => void; playback:(playing:boolean) => void };
type YouTubePlayer = {
  mute:() => void; playVideo:() => void; pauseVideo:() => void; destroy:() => void;
  getCurrentTime:() => number; getPlayerState:() => number;
  loadVideoById:(video:{videoId:string;startSeconds:number;endSeconds:number}) => void;
  cueVideoById:(video:{videoId:string;startSeconds:number;endSeconds:number}) => void;
  getIframe:() => HTMLIFrameElement;
};
type YouTubeAPI = { Player:new (element:HTMLElement, options:Record<string,unknown>) => YouTubePlayer };
type YouTubeWindow = Window & { YT?:YouTubeAPI; onYouTubeIframeAPIReady?:() => void };
let youtubeReady:Promise<YouTubeAPI> | undefined;

function loadYouTube() {
  const target = window as YouTubeWindow;
  if (target.YT?.Player) return Promise.resolve(target.YT);
  if (!youtubeReady) youtubeReady = new Promise<YouTubeAPI>((resolve, reject) => {
    const previous = target.onYouTubeIframeAPIReady;
    const script = document.createElement('script');
    const timeout = window.setTimeout(() => fail(), 15000);
    const fail = () => { window.clearTimeout(timeout); script.remove(); youtubeReady = undefined; reject(new Error('Source player unavailable')); };
    target.onYouTubeIframeAPIReady = () => {
      window.clearTimeout(timeout);
      previous?.();
      if (target.YT?.Player) resolve(target.YT); else fail();
    };
    script.src = 'https://www.youtube.com/iframe_api';
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return youtubeReady;
}

function YouTubeExcerpt({ shot, status, callbacks }: { shot:Shot; status:GuidedState['status']; callbacks:MediaCallbacks }) {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<YouTubePlayer | null>(null);
  const expectedState = useRef<number | null>(null);
  const latest = useRef({ status, callbacks });
  latest.current = { status, callbacks };

  useEffect(() => {
    let active = true;
    let timer:number | undefined;
    let lastTime:number = shot.start;
    let lastProgress = performance.now();
    let finished = false;
    const fail = () => {
      if (!active || finished) return;
      finished = true;
      player.current?.pauseVideo?.();
      latest.current.callbacks.fail();
    };
    const complete = () => {
      if (!active || finished) return;
      finished = true;
      player.current?.pauseVideo?.();
      latest.current.callbacks.progress(shot.end - shot.start, false);
      latest.current.callbacks.complete();
    };
    latest.current.callbacks.progress(0, true);
    void loadYouTube().then(api => {
      if (!active || !host.current) return;
      const element = document.createElement('div');
      host.current.appendChild(element);
      player.current = new api.Player(element, {
        videoId:'eM50HqZ4p7Y', width:'100%', height:'100%',
        playerVars:{autoplay:0, controls:0, disablekb:1, playsinline:1, rel:0, fs:0, origin:window.location.origin},
        events:{
          onReady:({target}:{target:YouTubePlayer}) => {
            if (!active) return;
            target.getIframe().title = 'Kakarot Labs: actual Blender interface recording';
            target.mute();
            const clip = { videoId:'eM50HqZ4p7Y', startSeconds:shot.start, endSeconds:shot.end };
            expectedState.current = latest.current.status === 'playing' ? 1 : 5;
            if (latest.current.status === 'playing') target.loadVideoById(clip);
            else target.cueVideoById(clip);
          },
          onStateChange:({data}:{data:number}) => {
            if (!active || finished) return;
            const time = player.current?.getCurrentTime() ?? shot.start;
            if (expectedState.current === data) expectedState.current = null;
            else if (expectedState.current === null && (data === 1 || data === 2)) latest.current.callbacks.playback(data === 1);
            if (latest.current.status !== 'playing') return;
            if (time >= shot.end - .2 && (data === 0 || data === 1)) complete();
            else latest.current.callbacks.progress(Math.max(0, time - shot.start), data !== 1);
          },
          onError:fail,
          onAutoplayBlocked:fail,
        },
      });
    }).catch(fail);
    timer = window.setInterval(() => {
      if (!active || finished) return;
      if (latest.current.status !== 'playing') { lastProgress = performance.now(); return; }
      const time = player.current?.getCurrentTime?.() ?? shot.start;
      if (time >= shot.end - .12) { complete(); return; }
      const waiting = player.current?.getPlayerState?.() !== 1;
      if (time > lastTime + .04) { lastTime = time; lastProgress = performance.now(); }
      if (performance.now() - lastProgress > 20000) { fail(); return; }
      latest.current.callbacks.progress(Math.max(0, time - shot.start), waiting);
    }, 150);
    return () => { active = false; window.clearInterval(timer); player.current?.destroy(); player.current = null; };
  }, [shot]);

  useEffect(() => {
    const target = player.current;
    if (!target?.playVideo) return;
    const desired = status === 'playing' ? 1 : 2;
    if (target.getPlayerState() === desired) { expectedState.current = null; return; }
    expectedState.current = desired;
    if (status === 'playing') target.playVideo(); else target.pauseVideo();
  }, [status]);
  return <div ref={host} className={s.player} data-youtube-excerpt={`${shot.start}-${shot.end}`} />;
}

function LocalExcerpt({ shot, status, callbacks }: { shot:Shot; status:GuidedState['status']; callbacks:MediaCallbacks }) {
  const video = useRef<HTMLVideoElement>(null);
  const latest = useRef(callbacks);
  latest.current = callbacks;
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    let active = true;
    let finished = false;
    if (status === 'playing') void element.play().catch(() => { if (active) latest.current.fail(); });
    else element.pause();
    const timer = window.setInterval(() => {
      if (status !== 'playing' || finished) return;
      latest.current.progress(element.currentTime, element.readyState < 3);
      if (element.currentTime >= shot.end) { finished = true; element.pause(); latest.current.complete(); }
    }, 100);
    return () => { active = false; window.clearInterval(timer); element.pause(); };
  }, [status, shot]);
  return <video ref={video} className={s.player} playsInline muted preload="auto" src={`${mediaRoot}blender-house-tour.webm`} poster={`${mediaRoot}${shot.poster}`} aria-label="Six-second excerpt of a separate Blender architecture render" onError={() => latest.current.fail()} />;
}

function BlenderShot({ index, guided }: { index:number; guided:GuidedState }) {
  const shot = shots[index];
  const [failed, setFailed] = useState(false);
  const [time, setTime] = useState(0);
  useEffect(() => {
    const poster = new window.Image();
    poster.src = `${mediaRoot}${shot.held}`;
  }, [shot]);
  useEffect(() => {
    if (failed && guided.status === 'playing') guided.onComplete();
  }, [failed, guided.status, guided.onComplete]);
  const held = guided.status === 'ready';
  const running = ['playing','paused'].includes(guided.status) && !failed;
  const callbacks:MediaCallbacks = {
    progress:(value, waiting) => { setTime(value); guided.onMediaProgress(value, shot.end - shot.start, waiting); },
    complete:guided.onComplete,
    fail:() => { setFailed(true); guided.onMediaUnavailable(); guided.onComplete(); },
    playback:guided.onMediaPlayback,
  };
  const action = held ? 2 : time >= 8.5 ? 2 : time >= 5 ? 1 : 0;
  return <div className={s.case} data-blender-shot={index}>
    <div className={s.stage}>
      <div className={s.media}>
        {running ? index === 2 ? <LocalExcerpt shot={shot} status={guided.status} callbacks={callbacks} /> : <YouTubeExcerpt shot={shot} status={guided.status} callbacks={callbacks} /> : <Image unoptimized className={s.poster} src={`${mediaRoot}${held || failed ? shot.held : shot.poster}`} alt={index === 0 ? 'Source recording: the user asks Astra to add a UV sphere and raise it' : index === 1 ? held || failed ? 'Source recording: the sphere is raised in the Blender viewport' : 'Source recording: Blender viewport before adding the sphere' : 'Frame from the separate architecture render'} width={1280} height={720} />}
      </div>
      <aside className={s.explanation}>
        <p className={s.label}>0{index + 1} / {shot.name}<span>{shot.end - shot.start} s</span></p>
        {index === 0 ? <div className={s.goal}><span>Remove the cube.</span><strong>Add a sphere.</strong><strong>Move it up.</strong></div> : index === 1 ? <><ol className={s.actions}>{['Search', 'Add sphere', 'Move up'].map((name,i) => <li key={name} data-active={i <= action}><span>0{i+1}</span>{name}</li>)}</ol><div className={s.coordinate}>Z <span>0 → <b>{action === 2 ? '2' : '?'}</b></span></div></> : <div className={s.workflow}><span>SEPARATE CASE</span><div><strong>Python / bpy</strong><p>Build the scene</p></div><div><strong>Computer Use</strong><p>Open & inspect</p></div></div>}
      </aside>
    </div>
    <div className={s.caption}><p>{failed ? 'Video unavailable · verified source frame' : index === 0 ? 'A concrete task in an existing application.' : index === 1 ? 'The result changes inside Blender.' : 'A finished render from a mixed Python + Computer Use workflow.'}</p><a href={shot.source} target="_blank" rel="noreferrer">{shot.credit} ↗</a></div>
  </div>;
}

export function BlenderCase() {
  const guided = useGuided();
  if (!guided) return null;
  const index = Math.max(0, Math.min(2, guided.frame.blender?.clip ?? 0));
  return <BlenderShot key={guided.cueId} index={index} guided={guided} />;
}
