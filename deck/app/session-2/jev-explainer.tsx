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

export function JevFitScene() {
  const step = useGuided()?.frame.decision?.step ?? 0;
  const workflow = step >= 4;
  return <div className={s.fit} data-learning="jev-fit" data-step={step}>
    {!workflow ? <>
      <div className={s.sharedInput}><span className={s.label}>WHY JEV CAN BE FASTER</span><strong>Less sequential work when producing the answer.</strong></div>
      <div className={s.workDiagram} aria-label="Output work comparison, not a latency benchmark">
        <div className={s.workLane}>
          <strong>LLM</strong><div className={s.readInput}>Read<br />input</div><b className={s.arrow}>→</b>
          <div className={s.outputWork} data-visible={step >= 1}><span>SEQUENTIAL DECODING</span><div className={s.tokenChain}><b>token</b><i>→</i><b>token</b><i>→</i><b>…</b></div><em>Each next token uses the previous output.</em></div>
          <b className={s.arrow}>→</b><div className={s.delivery}>JSON</div>
        </div>
        <div className={s.workLane}>
          <strong>Jev</strong><div className={s.readInput}>Read<br />input</div><b className={s.arrow}>→</b>
          <div className={`${s.outputWork} ${s.parallelWork}`} data-visible={step >= 2}><span>PARALLEL DECISIONS</span><div className={s.probabilityBlocks}><b>Team probabilities</b><b>Return probability</b></div><em>Answers do not wait for one another.</em></div>
          <b className={s.arrow}>→</b><div className={s.delivery}>JSON</div>
        </div>
      </div>
      <div className={s.speedConclusion} data-visible={step >= 3}><strong>The output work changes. Reading the input still takes time.</strong><span>Mechanism diagram · not a timed race</span></div>
    </> : <>
      <div className={s.sharedInput}><span className={s.label}>A DECISION FOR EVERY INCOMING TICKET</span><strong>“The shoes are too small. Please help me return them.”</strong></div>
      <div className={s.workflow}>
        <div className={s.ticketStack} aria-label="Incoming support tickets"><div /><div /><div><span>NEW TICKET</span><strong>Wrong size.<br />Wants a return.</strong></div></div>
        <b className={s.arrow}>→</b>
        <div className={s.workflowDecision}><span>JEV / DECIDE</span><strong>{step >= 5 ? 'returns' : 'Which team?'}</strong><p>{step >= 5 ? 'p = 0.94' : 'Evaluate the message'}</p></div>
        <b className={s.arrow}>→</b>
        <div className={s.destination} data-active={step >= 6}><span>CODE / ROUTE</span><strong>Returns queue</strong><p>{step >= 6 ? 'Ticket assigned ✓' : 'Await decision'}</p></div>
      </div>
      <div className={s.replyStep} data-visible={step >= 6}><span>NEED A WRITTEN REPLY?</span><strong>LLM → “We can help you return the shoes.”</strong></div>
      <p className={s.fitConclusion}>Frequent decisions: consider Jev. A complete written answer: use an LLM.</p>
    </>}
  </div>;
}
