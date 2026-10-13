import Link from 'next/link';
import styles from './directory.module.css';

export default function Directory() {
  return (
    <main className={styles.directory}>
      <header className={styles.masthead}><span>AI / FIELD NOTES</span><span>THE ATLAS COLLECTION</span></header>
      <div className={styles.intro}>
        <div><p className={styles.kicker}>A FIELD GUIDE TO AI PROGRESS</p><h1>New words.<br /><span>Clear ideas.</span></h1></div>
        <p className={styles.description}>Two talks. One visual language.<br />Explore the ideas through diagrams,<br />small experiments, and real examples.</p>
      </div>
      <div className={styles.sessions}>
        <article className={styles.session}>
          <div className={styles.number}>01<span>THE FOUNDATIONS</span></div>
          <div className={styles.copy}><p className={styles.talkTitle}>Beyond Bigger Models</p><h2><span>MoE</span> · <span>Distillation</span><br /><span>World Model</span> · <span>VLA</span></h2></div>
          <Link className={styles.enter} href="/session-1">Enter talk 01 <span aria-hidden="true">↗</span></Link>
        </article>
        <article className={`${styles.session} ${styles.current}`}>
          <div className={styles.number}>02<span>THE NEXT MOVES</span></div>
          <div className={styles.copy}><p className={styles.talkTitle}>From Answers to Actions</p><h2><span>Computer Use</span> · <span>Jev</span> · <span>RSI</span></h2></div>
          <Link className={styles.enter} href="/session-2">Enter talk 02 <span aria-hidden="true">↗</span></Link>
        </article>
      </div>
      <footer className={styles.foot}><span>INDEPENDENT TALKS / SHARED ATLAS STYLE</span><a href="/notes/session-2/index.md" target="_blank" rel="noreferrer">Talk 02 · Speaker notes ↗</a></footer>
    </main>
  );
}
