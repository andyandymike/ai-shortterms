'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { presenterChannel, type PresenterMessage, type PresenterSnapshot } from '../presenter-bridge';
import styles from './presenter.module.css';

const subscribeLocation = (notify: () => void) => {
  window.addEventListener('popstate', notify);
  return () => window.removeEventListener('popstate', notify);
};
const readSession = () => new URLSearchParams(window.location.search).get('session');
const serverSession = () => null;

type Command = Extract<PresenterMessage, { type: 'command' }>['action'];
type Connection = 'waiting' | 'connected' | 'lost' | 'unavailable';

function ConnectionHelp({ missing = false, unavailable = false }: { missing?: boolean; unavailable?: boolean }) {
  return (
    <section className={styles.empty}>
      <span className={styles.eyebrow}>ATLAS / 讲者视图</span>
      <h1>{missing ? '从演示中打开讲者视图。' : unavailable ? '这个浏览器暂时无法连接。' : '正在连接观众画面…'}</h1>
      <p>{missing ? '先打开演示，再点击底部的 Presenter。两个窗口会对应到同一场演示。' : '请保留观众窗口，并在同一个浏览器中使用这两个窗口。'}</p>
      <a className={styles.openDeck} href="/session-2">打开演示 <span aria-hidden="true">↗</span></a>
    </section>
  );
}

function ConnectedPresenter({ session }: { session: string }) {
  const [snapshot, setSnapshot] = useState<PresenterSnapshot | null>(null);
  const [connection, setConnection] = useState<Connection>('waiting');
  const channel = useRef<BroadcastChannel | null>(null);
  const lastUpdate = useRef(0);
  const consolePanel = useRef<HTMLElement | null>(null);
  const currentPanel = useRef<HTMLElement | null>(null);
  const nextPanel = useRef<HTMLElement | null>(null);

  useEffect(() => {
    consolePanel.current?.scrollTo(0, 0);
    currentPanel.current?.scrollTo(0, 0);
    nextPanel.current?.scrollTo(0, 0);
  }, [snapshot?.cueId, snapshot?.phase]);

  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') {
      const timer = window.setTimeout(() => setConnection('unavailable'), 0);
      return () => window.clearTimeout(timer);
    }
    const current = new BroadcastChannel(presenterChannel(session));
    channel.current = current;
    let active = true;
    const hello = () => { if (active) current.postMessage({ type: 'hello' } satisfies PresenterMessage); };
    current.onmessage = (event: MessageEvent<PresenterMessage>) => {
      if (event.data?.type !== 'state') return;
      lastUpdate.current = Date.now();
      setSnapshot(event.data.state);
      setConnection('connected');
    };
    hello();
    const reconnect = window.setInterval(hello, 2000);
    const watchdog = window.setInterval(() => {
      if (lastUpdate.current && Date.now() - lastUpdate.current > 6000) setConnection('lost');
    }, 1000);
    window.addEventListener('focus', hello);
    return () => {
      active = false;
      window.clearInterval(reconnect);
      window.clearInterval(watchdog);
      window.removeEventListener('focus', hello);
      current.onmessage = null;
      current.close();
      if (channel.current === current) channel.current = null;
    };
  }, [session]);

  const send = useCallback((action: Command) => {
    if (!snapshot || connection !== 'connected' || !channel.current) return;
    channel.current.postMessage({ type: 'command', action, cueId: snapshot.cueId, status: snapshot.status } satisfies PresenterMessage);
  }, [snapshot, connection]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select, video, summary'))) return;
      if ([' ', 'ArrowRight', 'PageDown', 'n', 'N'].includes(event.key)) {
        event.preventDefault();
        send('continue');
      } else if (['ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        send('back');
      } else if (event.key.toLowerCase() === 'r') {
        event.preventDefault();
        send('replay');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [send]);

  if (!snapshot) return <main className={styles.console} lang="zh-CN"><ConnectionHelp unavailable={connection === 'unavailable'} /></main>;

  const connected = connection === 'connected';
  const playing = snapshot.status === 'playing';
  const paused = snapshot.status === 'paused';
  const prepared = snapshot.status === 'prepared';
  const ended = !snapshot.next && snapshot.status === 'ready';
  const nextChangesPage = snapshot.next && snapshot.next.beatId !== snapshot.beatId;
  const primary = playing ? '暂停播放' : paused ? '继续这次变化' : ended ? '演示结束' : prepared ? snapshot.unavailable ? '显示替代静帧' : snapshot.beatId === 'C6' ? '播放影片' : '播放动画' : nextChangesPage ? '下一页' : '下一画面';
  const status = !connected ? '连接中断 · 正在重连' : snapshot.unavailable ? '视频不可用 · 已显示静帧' : playing ? snapshot.waiting ? '视频缓冲中' : '变化结束会自动停住' : paused ? '已手动暂停' : prepared ? '等待点击播放' : '画面已停住 · 讲完再继续';
  const accent = snapshot.beatId.startsWith('J') ? 'red' : snapshot.beatId.startsWith('R') ? 'green' : 'blue';

  return (
    <main ref={consolePanel} className={styles.console} lang="zh-CN" data-accent={accent}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>ATLAS / 讲者视图 <span>{snapshot.beatId}</span></p>
          <h1>{snapshot.title}</h1>
        </div>
        <div className={styles.connection} data-connected={connected}>
          <span className={styles.status} role="status">{status}</span>
          <span>第 {snapshot.page} / {snapshot.pages} 页 · 画面 {snapshot.part} / {snapshot.parts}</span>
        </div>
      </header>

      {!connected && <p className={styles.connectionWarning} role="alert">观众画面暂时没有响应，控制已停用。请确认观众窗口仍然打开；连接恢复后会自动同步。</p>}

      <section className={styles.playback} aria-label="当前讲解画面">
        <div className={styles.playbackHeading}><strong>{snapshot.unavailable ? '视频不可用，改用案例静帧' : prepared ? '点击播放后，本段结束会停住' : snapshot.status === 'ready' ? '这幅画面会一直保留' : snapshot.waiting ? '等待视频缓冲' : paused ? '暂停在变化途中' : '正在抵达讲解画面'}</strong><span>讲解不限时</span></div>
        <p><b>{snapshot.status === 'ready' ? '当前画面' : '将停在'}</b> {snapshot.end}</p>
        {!snapshot.unavailable && (playing || paused) && snapshot.duration > 0 && <progress aria-label="画面过渡进度" value={snapshot.elapsed} max={snapshot.duration} />}
      </section>

      <div className={styles.content}>
        <section ref={currentPanel} className={styles.current} aria-labelledby="current-cue-title">
          <div className={styles.sectionHeading}>
            <h2 id="current-cue-title">{playing || paused || prepared ? '停住后讲这些' : '现在讲'}</h2>
            <span>{snapshot.label}</span>
          </div>
          <p className={styles.speech}>{snapshot.say}</p>
          {snapshot.transition && <div className={styles.transition}><h3>本页讲完后转场</h3><p>{snapshot.transition}</p></div>}
        </section>

        <aside ref={nextPanel} className={styles.next} aria-labelledby="next-cue-title">
          <div className={styles.sectionHeading}>
            <h2 id="next-cue-title">接下来的画面</h2>
            {snapshot.next && <span className={styles.change}>{nextChangesPage ? '下一页' : '留在这一页'}</span>}
          </div>
          {snapshot.next ? <>
            <h3>{snapshot.next.action}</h3>
            <p className={styles.nextTitle}>{snapshot.next.title}</p>
            <p className={styles.nextRange}>{snapshot.next.duration > 0 ? '进入后等待播放；播放后停在：' : '画面：'}{snapshot.next.end}</p>
            <details key={`${snapshot.cueId}-${snapshot.phase}`} className={styles.nextPreview}>
              <summary>预看下一段讲稿</summary>
              <p className={styles.nextSpeech}>{snapshot.next.say}</p>
            </details>
          </> : <>
            <h3>演示到这里结束。</h3>
            <p className={styles.nextSpeech}>可以留在这张总结画面，进入交流。</p>
          </>}
          {(playing || paused) && <p className={styles.playbackNote}>当前变化结束后自动停住；讲完再继续，才会进入这里。</p>}
        </aside>
      </div>

      <footer className={styles.footer}>
        <div className={styles.secondaryControls}>
          <button type="button" onClick={() => send('back')} disabled={!connected || (snapshot.index === 0 && snapshot.phase === 0)}>← 上一画面</button>
          <button type="button" onClick={() => send('replay')} disabled={!connected}>重放这次变化</button>
          {(playing || paused || prepared) && <button type="button" onClick={() => send('skip')} disabled={!connected}>直接到讲解画面</button>}
        </div>
        <div className={styles.primaryControls}>
          <span className={styles.keyboardHint}>空格 / → 与主按钮相同</span>
          <button className={styles.primary} type="button" onClick={() => send('continue')} disabled={!connected || ended}>{primary}<span aria-hidden="true">{playing ? 'Ⅱ' : paused ? '▷' : '→'}</span></button>
        </div>
      </footer>
    </main>
  );
}

export default function PresenterView() {
  const session = useSyncExternalStore(subscribeLocation, readSession, serverSession);
  return session ? <ConnectedPresenter key={session} session={session} /> : <main className={styles.console} lang="zh-CN"><ConnectionHelp missing /></main>;
}
