'use client';

import { useGuided } from './guided-state';
import type { CSSProperties } from 'react';
import s from './learning-scenes.module.css';

function Weights({ updated, fixed = false, version = 'v2' }: { updated: boolean; fixed?: boolean; version?: string }) {
  return <div className={s.weights} data-updated={updated} data-fixed={fixed}>
    <div className={s.modelTitle}><span>MODEL</span><strong>{updated ? version : 'v1'}</strong></div>
    <div className={s.weightGrid} aria-label={fixed ? 'Learned weights stay fixed during this task' : updated ? 'Illustration of updated learned weights' : 'Illustration of learned weights'}>{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ '--cell': i, opacity: updated ? .35 + ((i + 2) % 4) * .2 : .2 + (i % 4) * .17 } as CSSProperties} />)}</div>
    <strong>weights</strong><span>{fixed ? 'Stay fixed during use' : 'Learned settings'}</span>
  </div>;
}

function Arrow({ active = false }: { active?: boolean }) { return <b className={s.arrow} data-active={active} aria-hidden="true">→</b>; }

export function ComputerLearningScene() {
  const step = useGuided()?.frame.learning ?? 0;
  const using = step >= 6;
  const titles = ['Try an action.', 'The click ran. The task failed.', 'The result becomes feedback.', 'Practice across many tasks.', 'Feedback guides a weight update.', 'Keep the learned settings.', 'Use the trained model on a new screen.', 'New context. The same weights.'];
  return <div className={s.lesson} data-learning="computer" data-step={step}>
    <div className={s.phase}><span>{using ? 'INFERENCE · USING THE MODEL' : 'TRAINING'}</span><strong>{titles[step]}</strong></div>
    <div className={s.teachingRow} data-using={using}>
      <section className={s.practice} aria-label={using ? 'New interface supplied as context' : 'Practice tasks and action result'}>
        <span className={s.label}>{using ? 'CONTEXT' : step >= 3 ? 'MANY PRACTICE TASKS' : 'GOAL · CREATE A RETURN'}</span>
        {step >= 3 && !using ? <div className={s.taskStack}><div>Open an order <b>✓</b></div><div>Create a return <b>×</b></div><div>Save a receipt <b>✓</b></div></div> : <div className={s.miniScreen} data-new={using}>
          <div className={s.windowBar}>ORDERS / {using ? 'NEW LAYOUT' : 'PRACTICE'}</div>
          <strong>Order #1048</strong><div className={s.field} /><div className={s.screenButtons}><span>Cancel</span><b>Create return</b></div>
          <span className={s.cursor} data-correct={using && step === 7}>↖</span>
          {step >= 1 && !using && <em>No return created ×</em>}
          {step === 7 && <em data-success>Target found in the new screenshot</em>}
        </div>}
      </section>
      <Arrow active={step >= 2} />
      {using && <Weights updated fixed />}
      {using && <Arrow active={step === 7} />}
      <section className={s.feedback} data-active={step >= 2}>
        <span className={s.label}>{using ? 'NEXT ACTION' : 'TASK FEEDBACK'}</span>
        <strong>{using ? 'Find it here.' : step >= 2 ? 'Did it finish?' : 'Check the result.'}</strong>
        <p>{using ? 'The screenshot changes where to click.' : 'Success and failure guide later practice.'}</p>
        <span className={s.signal}>{using ? 'context changes' : step >= 4 ? 'training signal →' : 'checkable outcome'}</span>
      </section>
      {!using && <Arrow active={step >= 4} />}
      {!using && <Weights updated={step >= 5} />}
    </div>
    <p className={s.takeaway}>{using ? 'Updating context is not retraining the model.' : 'Practice → feedback → small updates, repeated across tasks.'}</p>
  </div>;
}

export function DecisionLearningScene() {
  const step = useGuided()?.frame.calibration ?? 0;
  const exam = step >= 6;
  return <div className={s.lesson} data-learning="decision" data-step={step}>
    <div className={s.phase}><span>{exam ? 'HELD-OUT EVALUATION' : 'TRAINING · RLCD'}</span><strong>{exam ? 'Now check on separate cases.' : step >= 3 ? 'Feedback changes how it will judge.' : 'A confident answer can still be wrong.'}</strong></div>
    {!exam ? <div className={s.teachingRow}>
      <section className={s.practice}><span className={s.label}>{step >= 3 ? 'VARIED TRAINING CASES' : 'TRAINING CASE'}</span>{step >= 3 ? <div className={s.taskStack}><div>Wrong size <b>returns</b></div><div>Charged twice <b>billing</b></div><div>Parcel missing <b>shipping</b></div></div> : <><blockquote>“Charged twice.<br />I’m keeping the shoes.”</blockquote><div className={s.prediction}><span>MODEL v1</span><strong>returns {step >= 1 && <b>×</b>}</strong><span>p = 0.95</span></div></>}</section>
      <Arrow active={step >= 1} />
      <section className={s.feedback} data-active={step >= 1}><span className={s.label}>{step >= 3 ? 'COMPARE WITH OUTCOMES' : 'KNOWN ANSWER'}</span><strong>{step >= 3 ? 'Correct decision? Honest probability?' : step >= 1 ? 'billing ✓' : '?'}</strong><p>{step >= 3 ? 'Many judgments contribute training feedback.' : 'The customer wants a billing correction.'}</p><span className={s.signal}>{step >= 4 ? 'training signal →' : 'feedback'}</span></section>
      <Arrow active={step >= 4} /><Weights updated={step >= 5} />
    </div> : <div className={s.examRow}>
      <Weights updated fixed />
      <Arrow active />
      <section className={s.exam}><span className={s.label}>SEPARATE CASES · SAME PROBABILITY BAND</span><div className={s.examTitle}><strong>p ≈ 0.80</strong><span>{step >= 7 ? 'Compare with what actually happened.' : 'Reveal the outcomes.'}</span></div><div className={s.outcomes}>{[true,true,false,true,true,true,false,true,true,true].map((correct,i) => <b key={i} data-revealed={step >= 7} data-correct={correct}>{step >= 7 ? correct ? '✓' : '×' : '?'}</b>)}</div><p>{step >= 7 ? 'Illustration: 8 correct out of 10.' : 'These cases did not supply the training feedback.'}</p></section>
    </div>}
    <p className={s.takeaway}>{exam ? 'Calibration compares probabilities with outcomes across many unseen cases.' : 'Repeated feedback updates weights: train decisions and their probabilities.'}</p>
  </div>;
}

export function RecursiveLearningScene() {
  const step = useGuided()?.frame.successor ?? 0;
  const statements = ['A proposes a change to the training recipe.', 'Include failed experiments and their diagnoses.', 'Use the new recipe to train successor B.', 'Practice + feedback update B’s weights.', 'Test B on separate research tasks.', 'Can B find better changes for the next round?'];
  return <div className={s.lesson} data-learning="successor" data-step={step}>
    <div className={s.phase}><span>HYPOTHETICAL TRAINING EXAMPLE</span><strong>{statements[step]}</strong></div>
    <div className={s.recursiveRow}>
      <section className={s.researcher}><span className={s.label}>AI A</span><strong>Find a gap.</strong><p>Training cases show successes, but few failures.</p><div className={s.recipe} data-active={step >= 1}><span>RECIPE CHANGE</span><b>＋ Failed experiments<br />＋ Why they failed</b></div></section>
      <Arrow active={step >= 2} />
      <section className={s.build} data-active={step >= 2}><span className={s.label}>BUILD SUCCESSOR B</span><div className={s.buildSteps}><span data-active={step >= 2}>Try examples</span><b>↓</b><span data-active={step >= 3}>Compare → loss</span><b>↓</b><span data-active={step >= 3}>Update weights</span></div><div className={s.trainingWeights} data-updated={step >= 3} aria-label="Illustrative weights change after training feedback">{Array.from({length:8},(_,i)=><i key={i} style={{opacity:step >= 3 ? .35 + ((i+2)%4)*.2 : .2+(i%4)*.17}} />)}</div></section>
      <Arrow active={step >= 4} />
      <section className={s.researchExam} data-active={step >= 4}><span className={s.label}>INDEPENDENT RESEARCH TASKS</span><strong>Better at improving?</strong><p>Diagnose a failure.<br />Propose a useful experiment.</p><b className={s.questionResult}>A vs B ?</b></section>
    </div>
    <div className={s.returnLoop} data-active={step >= 5}><span aria-hidden="true">↶</span><strong>{step >= 5 ? 'Only if that ability improves: B helps build C.' : 'A better recipe does not guarantee a better researcher.'}</strong></div>
    <p className={s.takeaway}>People set the objective, evaluation, permissions and stop rule.</p>
  </div>;
}
