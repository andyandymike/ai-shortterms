'use client';

import { useGuided } from './guided-state';
import s from './jev-explainer.module.css';

const teams = ['returns', 'billing', 'shipping'];

function Probabilities({ values, answer }: { values: number[]; answer?: string }) {
  return <div className={s.probabilities} aria-label="Illustrative team probabilities">
    {teams.map((team, i) => <div key={team} data-answer={team === answer}>
      <span>{team}</span><strong>{values[i].toFixed(2)}</strong>
      <i><b style={{ width: `${values[i] * 100}%` }} /></i>
    </div>)}
  </div>;
}

export function JevTrainingScene() {
  const step = useGuided()?.frame.calibration ?? 0;
  const testing = step >= 6;
  const updated = step >= 5;
  const revealed = testing ? step === 7 : step >= 1;
  const values = testing ? [.12, .80, .08] : updated ? [.10, .88, .02] : [.95, .04, .01];
  const phase = testing ? 3 : step >= 3 ? 2 : step >= 1 ? 1 : 0;
  return <div className={s.lesson} data-learning="jev" data-step={step}>
    <div className={s.steps} aria-label="Training and evaluation stages">
      {['Try', 'Check', 'Train', 'Test new cases'].map((label, i) => <span key={label} data-active={phase === i}><b>{i + 1}</b>{label}</span>)}
    </div>
    <div className={s.trainingStage}>
      <section className={s.message}>
        <span className={s.label}>{testing ? 'NEW CASE · NOT USED IN TRAINING' : 'TRAINING CASE'}</span>
        <blockquote>{testing ? <>“The payment for order #2062 went through <mark>twice</mark>.”</> : <>“<mark>Charged twice.</mark><br />I’m keeping the shoes.”</>}</blockquote>
        {testing ? <p>New wording.<br />Weights stay fixed.</p> : step >= 3 ? <div className={s.moreCases}><span>Practice with many examples</span><p>Wrong size <b>→ returns</b></p><p>Parcel missing <b>→ shipping</b></p></div> : <p>Which team should<br />handle this?</p>}
      </section>
      <section className={s.prediction}>
        <div className={s.predictionTitle}><span className={s.label}>MODEL PREDICTION</span><b>{updated ? 'v2' : 'v1'}</b></div>
        <Probabilities values={values} answer={revealed ? 'billing' : undefined} />
        <p className={s.verdict} data-correct={updated}>{testing ? 'New case → billing' : updated ? 'Same case → billing' : step >= 2 ? 'Wrong answer · 95% probability' : 'Prediction: returns'}</p>
      </section>
      <section className={s.feedback}>
        <span className={s.label}>KNOWN ANSWER</span>
        <strong data-visible={revealed}>{revealed ? 'billing ✓' : '?'}</strong>
        <p>{revealed ? 'The problem is a duplicate charge.' : 'Check against the known answer.'}</p>
        {!testing && step >= 3 && <div className={s.update} data-active={step >= 4}><span>Use feedback to adjust weights</span><b>{step >= 5 ? 'v1 → v2 ✓' : step >= 4 ? 'Updating…' : 'Feedback → update'}</b></div>}
      </section>
    </div>
    {testing ? <div className={s.calibration}>
      <div><strong>Calibration</strong><span>When it says “80%”…</span></div>
      <div className={s.outcomes} aria-label={step === 7 ? 'Illustration: eight correct predictions and two wrong predictions' : 'Test outcomes have not been revealed'}>{[true, true, false, true, true, true, false, true, true, true].map((correct, i) => <b key={i} data-revealed={step === 7} data-correct={correct}>{step === 7 ? correct ? '✓' : '×' : '?'}</b>)}</div>
      <p>{step === 7 ? '…is it right about 80% of the time? Check across many new cases.' : 'Compare its predictions with the answers.'}</p>
    </div> : <div className={s.trainingSummary}><strong>RLCD · Learn to choose well, and express uncertainty.</strong><span>Training illustration</span></div>}
  </div>;
}

export { JevFitScene } from './jev-fit';
