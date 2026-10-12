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
  }, [snapshot?.cueId]);

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
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select, video'))) return;
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
  const ended = !snapshot.next && snapshot.status === 'ready';
  const primary = playing ? '暂停动画' : paused ? '继续播放' : ended ? '演示结束' : '下一步';
  const nextChangesPage = snapshot.next && snapshot.next.beatId !== snapshot.beatId;
  const status = !connected ? '连接中断 · 正在重连' : playing ? '动画播放中' : paused ? '动画已暂停' : '停在讲解点';
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
          <span>{snapshot.index + 1} / {snapshot.total} 个讲解点</span>
        </div>
      </header>

      {!connected && <p className={styles.connectionWarning} role="alert">观众画面暂时没有响应，控制已停用。请确认观众窗口仍然打开；连接恢复后会自动同步。</p>}

      <div className={styles.content}>
        <section ref={currentPanel} className={styles.current} aria-labelledby="current-cue-title">
          <div className={styles.sectionHeading}>
            <h2 id="current-cue-title">{playing ? '动画结束后讲' : paused ? '续播结束后讲' : '现在讲'}</h2>
            <span>{snapshot.label}</span>
          </div>
          <p className={styles.speech}>{snapshot.say}</p>
          {snapshot.look && <div className={styles.look}><h3>观众看这里</h3><p>{snapshot.look}</p></div>}
          {snapshot.transition && <div className={styles.transition}><h3>接下去这样讲</h3><p>{snapshot.transition}</p></div>}
        </section>

        <aside ref={nextPanel} className={styles.next} aria-labelledby="next-cue-title">
          <div className={styles.sectionHeading}>
            <h2 id="next-cue-title">下一步</h2>
            {snapshot.next && <span className={styles.change}>{nextChangesPage ? '换到下一页' : '留在这一页'}</span>}
          </div>
          {snapshot.next ? <>
            <h3>{snapshot.next.action}</h3>
            <p className={styles.nextTitle}>{snapshot.next.title}</p>
            <p className={styles.nextSpeech}>{snapshot.next.say}</p>
          </> : <>
            <h3>演示到这里结束。</h3>
            <p className={styles.nextSpeech}>可以留在这张总结画面，进入交流。</p>
          </>}
          {(playing || paused) && <p className={styles.playbackNote}>{playing ? '动画会自动停在这个讲解点；播放中点击主按钮可以暂停。' : '点击“继续播放”，会先完成当前动画。'}</p>}
        </aside>
      </div>

      <footer className={styles.footer}>
        <div className={styles.secondaryControls}>
          <button type="button" onClick={() => send('back')} disabled={!connected || snapshot.index === 0}>← 上一步</button>
          <button type="button" onClick={() => send('replay')} disabled={!connected}>重播当前段</button>
          {(playing || paused) && <button type="button" onClick={() => send('skip')} disabled={!connected}>直接看结果</button>}
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
