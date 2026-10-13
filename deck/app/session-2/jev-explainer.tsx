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
      {['Make a decision', 'Check the answer', 'Update weights', 'Test new cases'].map((label, i) => <span key={label} data-active={phase === i}><b>{i + 1}</b>{label}</span>)}
    </div>
    <div className={s.trainingStage}>
      <section className={s.message}>
        <span className={s.label}>{testing ? 'NEW CASE · NOT USED IN TRAINING' : 'TRAINING CASE'}</span>
        <blockquote>{testing ? <>“The payment for order #2062 went through <mark>twice</mark>.”</> : <>“<mark>Charged twice.</mark><br />I’m keeping the shoes.”</>}</blockquote>
        {testing ? <p>New wording.<br />Learned weights stay fixed.</p> : step >= 3 ? <div className={s.moreCases}><span>More labeled examples</span><p>Wrong size <b>→ returns</b></p><p>Parcel missing <b>→ shipping</b></p></div> : <p>Question: which team<br />should handle this?</p>}
      </section>
      <section className={s.prediction}>
        <div className={s.predictionTitle}><span className={s.label}>MODEL PREDICTION</span><b>{updated ? 'v2' : 'v1'}</b></div>
        <Probabilities values={values} answer={revealed ? 'billing' : undefined} />
        <p className={s.verdict} data-correct={updated}>{testing ? 'billing · p = 0.80' : updated ? 'billing · after repeated training' : step >= 2 ? 'returns · wrong, with p = 0.95' : 'returns · p = 0.95'}</p>
      </section>
      <section className={s.feedback}>
        <span className={s.label}>KNOWN ANSWER</span>
        <strong data-visible={revealed}>{revealed ? 'billing ✓' : '?'}</strong>
        <p>{revealed ? 'A duplicate payment needs a billing correction.' : testing ? 'Keep the answer hidden until after the prediction.' : 'Compare the prediction with the correct label.'}</p>
        {!testing && <div className={s.update} data-active={step >= 4}><span>{step >= 3 ? 'Feedback from many examples' : 'Decision + probability feedback'}</span><b>{step >= 5 ? 'weights v1 → v2 ✓' : step >= 4 ? 'updating weights…' : '→ weights update'}</b></div>}
      </section>
    </div>
    {testing ? <div className={s.calibration}>
      <div><strong>Calibration</strong><span>Many new predictions near p = 0.80</span></div>
      <div className={s.outcomes} aria-label={step === 7 ? 'Illustration: eight correct predictions and two wrong predictions' : 'Test outcomes have not been revealed'}>{[true, true, false, true, true, true, false, true, true, true].map((correct, i) => <b key={i} data-revealed={step === 7} data-correct={correct}>{step === 7 ? correct ? '✓' : '×' : '?'}</b>)}</div>
      <p>{step === 7 ? 'Illustration: 8 / 10 correct. Check the pattern across many cases.' : 'Do the probabilities match how often the predictions are correct?'}</p>
    </div> : <div className={s.trainingSummary}><strong>{step >= 3 ? 'RLCD · Reinforcement Learning for Calibrated Decisions' : 'Predict → compare with the answer → learn from feedback.'}</strong><span>Illustrative training · not a measured Jev run</span></div>}
  </div>;
}

const exampleJson = '{\n  "returns": 0.61,\n  "billing": 0.35,\n  "shipping": 0.04\n}';
const tickets = [
  { message: 'Wrong size. Please arrange a return.', team: 'returns', probability: '0.94', route: 'Returns team' },
  { message: 'Charged twice. I’m keeping the shoes.', team: 'billing', probability: '0.93', route: 'Billing team' },
  { message: 'Wrong size, and charged twice.', team: 'returns', probability: '0.61', route: 'Human review' },
];

export function JevFitScene() {
  const step = useGuided()?.frame.decision?.step ?? 0;
  const workflow = step >= 3;
  return <div className={s.fit} data-learning="jev-fit" data-step={step}>
    {!workflow ? <>
      <div className={s.sharedInput}><span className={s.label}>SAME INPUT · SAME QUESTION: WHICH TEAM?</span><strong>“The shoes are too small. I was also charged twice.”</strong></div>
      <div className={s.jsonComparison}>
        {['LLM + JSON Schema', 'Jev'].map((model, i) => <section key={model}>
          <h2>{model}</h2>
          <pre aria-label={`${model} illustrative output`}>{step >= 1 ? exampleJson : '{ … }'}</pre>
          <div className={s.jsonMeaning} data-visible={step >= 2}><b>Valid JSON ✓</b><strong>{i === 0 ? 'Schema constrains the format.' : 'RLCD trains decisions + probabilities.'}</strong><p>{i === 0 ? 'A numeric field alone does not establish calibration.' : 'Calibration still needs testing on your tasks.'}</p></div>
        </section>)}
      </div>
      <p className={s.annotation}>Illustrative outputs in a common display format · no model calls</p>
    </> : <>
      <div className={s.queueHeader}><div><span className={s.label}>REPEATED SUPPORT ROUTING</span><strong>The same question, ticket after ticket.</strong></div><span>Either model can drive this workflow.</span></div>
      <div className={s.queue} aria-label="Three support tickets evaluated by the same routing policy">
        <div className={s.queueLabels}><span>CUSTOMER MESSAGE</span><span>TOP CHOICE / PROBABILITY</span><span>CODE CHOOSES THE ROUTE</span></div>
        {tickets.map((ticket, i) => <div className={s.ticket} key={ticket.message} data-review={i === 2} data-routed={step >= 5}>
          <p>{ticket.message}</p><strong>{step >= 4 ? <>{ticket.team} <b>{ticket.probability}</b></> : '—'}</strong><span><b aria-hidden="true">→</b><em>{step >= 5 ? ticket.route : 'Await decision'}</em></span>
        </div>)}
      </div>
      <p className={s.policy}>Illustrative rule: top probability ≥ 0.80 → route; otherwise → human review.</p>
      <div className={s.fitChoices} data-visible={step >= 5}>
        <div><span>CONSIDER JEV</span><strong>Frequent, bounded decisions.</strong><p>Specialized training; probabilities for code.</p></div>
        <div><span>LLM JSON MAY BE ENOUGH</span><strong>Occasional decisions or written replies.</strong><p>Keep the generation capability you need.</p></div>
      </div>
      <p className={s.measure}>Compare on the same test set: <b>errors · calibration · latency · cost</b></p>
    </>}
  </div>;
}
