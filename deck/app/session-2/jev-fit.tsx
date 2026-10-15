'use client';

import { useGuided } from './guided-state';
import s from './jev-fit.module.css';

const options = ['returns', 'billing', 'shipping'];

function Route({ arrived, review }: { arrived: boolean; review: boolean }) {
  return <div className={s.route} data-arrived={arrived} data-review={review}>
    <span className={s.label}>CODE / NEXT STEP</span>
    <svg viewBox="0 0 360 245" role="img" aria-label={arrived ? review ? 'Ticket sent to human review' : 'Ticket assigned to the returns queue' : 'Waiting for the model decision'}>
      <path className={s.track} d="M22 122h45l50-67h38M67 122l50 68h38" />
      {arrived && <path className={s.activeTrack} d={review ? 'M22 122h45l50 68h38' : 'M22 122h45l50-67h38'} />}
      <rect x="151" y="13" width="202" height="84" className={s.routeBox} data-active={arrived && !review} />
      <text x="252" y="48" textAnchor="middle">Returns queue</text>
      <text x="252" y="77" textAnchor="middle" className={s.routeStatus}>{arrived && !review ? 'Assigned ✓' : 'Auto route'}</text>
      <rect x="151" y="148" width="202" height="84" className={s.routeBox} data-active={arrived && review} />
      <text x="252" y="183" textAnchor="middle">Human review</text>
      <text x="252" y="212" textAnchor="middle" className={s.routeStatus}>{arrived && review ? 'Clarify both issues' : 'If uncertain'}</text>
      <g className={s.parcel} style={{ transform:`translate(${arrived ? 132 : 22}px, ${arrived ? review ? 190 : 55 : 122}px)` }}><rect x="-14" y="-11" width="28" height="22" /><path d="m-13-10 13 11 13-11" /></g>
    </svg>
  </div>;
}

function FitComparison() {
  return <div className={s.fitComparison} data-fit-comparison>
    <div className={s.choices}>
      <section className={s.choice}>
        <span className={s.label}>REPEATED, DEFINED DECISIONS</span>
        <div className={s.manyTickets} aria-label="Many tickets need the same routing decision">{['returns', 'billing', 'shipping'].map(label => <span key={label}><i>↗</i>{label}</span>)}</div>
        <h2>Which team?<br />How urgent?</h2>
        <p>Small answers · many requests</p>
        <strong className={s.recommendation}>↓ Benchmark Jev</strong>
      </section>
      <section className={s.choice}>
        <span className={s.label}>OCCASIONAL LABELS OR FULL REPLIES</span>
        <div className={s.reply}><span>LLM</span><p>“We can help you<br />return the shoes.”</p></div>
        <h2>Need a written answer?</h2>
        <p>LLM → JSON, text, or both</p>
        <strong className={s.recommendation}>↓ Keep it if it meets your needs</strong>
      </section>
    </div>
    <div className={s.evaluation}><strong>Same test tickets</strong><i>→</i><span>Errors &amp; calibration</span><i>→</i><span>Latency &amp; cost</span></div>
  </div>;
}

export function JevFitScene() {
  const step = useGuided()?.frame.decision?.step ?? 0;
  const compare = step >= 6;
  const mixed = step >= 3 && !compare;
  const ready = mixed ? step >= 4 : step >= 1;
  const arrived = mixed ? step >= 5 : step >= 2;
  const values = mixed ? [.61, .35, .04] : [.94, .04, .02];
  return <div className={s.fit} data-learning="jev-fit" data-step={step}>
    {compare ? <FitComparison /> : <>
      <div className={s.question}><span className={s.label}>{mixed ? 'SAME QUESTION · A LESS CLEAR CASE' : 'REPEAT FOR EVERY INCOMING TICKET'}</span><strong>Which team should handle this?</strong></div>
      <div className={s.workflow}>
        <div className={s.ticket} data-mixed={mixed}>
          <span className={s.label}>INCOMING TICKET</span>
          <blockquote>{mixed ? <>“The shoes are too small.<br /><mark>I was also charged twice.</mark>”</> : <>“The shoes are too small.<br />Please help me return them.”</>}</blockquote>
        </div>
        <b className={s.arrow}>→</b>
        <div className={s.decision}><span className={s.label}>JEV / CHOICE</span><div className={s.probabilities} aria-label="Illustrative team probabilities">{options.map((option, i) => <div key={option}><span>{option}</span><strong>{ready ? values[i].toFixed(2) : '—'}</strong><i><b style={{ width:`${ready ? values[i] * 100 : 0}%` }} /></i></div>)}</div></div>
        <b className={s.arrow}>→</b>
        <Route arrived={arrived} review={mixed} />
      </div>
      <div className={s.rule}><span>EXAMPLE RULE</span><p>Top probability ≥ <b>0.90</b> → route<span className={s.ruleDivider}> / </span>otherwise → review</p></div>
    </>}
  </div>;
}
