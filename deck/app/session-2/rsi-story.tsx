'use client';

import { useGuided } from './guided-state';
import s from './rsi-story.module.css';

function Kernel({ future = false }: { future?: boolean }) {
  return <span className={s.kernel} data-future={future} aria-label={future ? 'A possible next kernel' : 'The optimized kernel'}><b>K{future && '?'}</b><i /><i /><i /></span>;
}

function Arrow({ active, hypothetical = false }: { active: boolean; hypothetical?: boolean }) {
  return <span className={s.arrow} data-active={active} data-hypothetical={hypothetical} aria-hidden="true">→</span>;
}

export function AlphaEvolveStory() {
  const step = useGuided()?.frame.selection ?? 0;
  const actions = ['Start with the AI helping do the research.', 'Propose a faster kernel.', 'Check correctness and speed.', 'Use the improved kernel in Gemini training.'];
  return <div className={s.story} data-rsi="reported" data-step={step}>
    <div className={s.statement}>{actions[step]}</div>
    <div className={s.reportedStage}>
      <section className={s.origin}>
        <span className={s.label}>AI INSIDE ALPHAEVOLVE</span>
        <strong>Gemini</strong>
        <p>Suggest code changes.</p>
      </section>
      <Arrow active={step >= 1} />
      <section className={s.kernelWork}>
        <h2>Improve a kernel</h2>
        <div className={s.kernelSlot} data-ready={step >= 1}><span aria-hidden="true">K</span></div>
        <p>A small compute routine,<br />repeated during training.</p>
        <div className={s.checks} data-tested={step >= 2}><span>{step >= 2 ? 'Correct ✓' : 'Correct?'}</span><span>{step >= 2 ? 'Faster ✓' : 'Faster?'}</span></div>
      </section>
      <Arrow active={step >= 3} />
      <section className={s.training} data-active={step >= 3}>
        <h2>Train Gemini</h2>
        <div className={s.trainingTrack}><i /><span className={s.trainingSlot} /><i /></div>
        <p>The improved routine<br />enters the training process.</p>
      </section>
      <div className={s.movingKernel} data-visible={step >= 1} data-installed={step >= 3}><Kernel /></div>
    </div>
    <div className={s.reportedEvidence} data-visible={step >= 3}>
      <span>DEEPMIND REPORTED</span>
      <p><strong>23%</strong> faster matrix kernel</p><b aria-hidden="true">→</b><p><strong>≈1%</strong> less total training time</p>
    </div>
    <p className={s.point}>Gemini helps improve the tools used to train Gemini.</p>
  </div>;
}

export function RecursiveImprovementStory() {
  const step = useGuided()?.frame.successor ?? 0;
  const handoff = step >= 4;
  return <div className={s.recursion} data-rsi="hypothetical" data-step={step}>
    <div className={s.carryover}><Kernel /><div><span className={s.label}>FROM THE REPORTED CASE</span><strong>An improved kernel makes training more efficient.</strong></div></div>
    <div className={s.futureStage}>
      <section className={s.reinvest} data-active={step >= 1}><span className={s.label}>POSSIBLE USE OF THE SAVING</span><h2>Reinvest the compute</h2><p>More training<br />or more experiments.</p></section>
      <Arrow active={step >= 1} hypothetical />
      <section className={s.successor} data-active={step >= 2}><span className={s.label}>TRAIN A SUCCESSOR</span><strong>B<span>?</span></strong><p>A new version.<br />Is it a better improver?</p></section>
      <Arrow active={step >= 3} hypothetical />
      <section className={s.evaluation} data-active={step >= 3}><span className={s.label}>TEST ON NEW TASKS</span><h2>A vs B</h2><p>Improve another kernel.</p><div className={s.testTerms}><b>Same task + budget</b><span>Correct result? Useful speedup?</span></div></section>
    </div>
    <div className={s.nextCycle} data-visible={handoff}>
      <span className={s.condition}>{handoff ? 'IF B IS BETTER AT THIS WORK' : 'THE NEXT CYCLE DEPENDS ON THE TEST'}</span>
      <div className={s.handoff} data-complete={step >= 5}>
        <div className={s.newResearcher}><strong>AI B</strong><span>Proposes the next change</span></div>
        <Arrow active={step >= 5} hypothetical />
        <div className={s.nextKernel}><Kernel future /><span>Next kernel?</span></div>
        <Arrow active={step >= 5} hypothetical />
        <div className={s.nextModel}><strong>Train C?</strong><span>Test its ability again</span></div>
      </div>
    </div>
    <p className={s.point}>{handoff ? 'The improved AI takes over the work of improving the next AI.' : step >= 3 ? 'Training faster is one result. A better AI researcher still needs evidence.' : 'Saved compute creates an opportunity. Better capability still needs evidence.'}</p>
  </div>;
}
