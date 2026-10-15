'use client';

import { useGuided } from './guided-state';
import s from './rsi-methods.module.css';

function Network({ changed = false }: { changed?: boolean }) {
  return <svg className={s.network} viewBox="0 0 180 130" aria-hidden="true" data-changed={changed}>
    {[25,65,105].flatMap((y, i) => [25,65,105].map((end,j) => <path key={`${i}/${j}`} d={`M30 ${y}L90 ${end}L150 ${y}`} strokeWidth={changed && (i+j)%2 ? 4 : 1.5} />))}
    {[30,90,150].flatMap(x => [25,65,105].map(y => <circle key={`${x}/${y}`} cx={x} cy={y} r="8" />))}
  </svg>;
}

function MethodLabel({ number, name }: { number: string; name: string }) {
  return <div className={s.methodLabel}><b>{number}</b><span>{name}</span></div>;
}

export function AgentImprovementScene() {
  const step = useGuided()?.frame.selection ?? 0;
  const added = step >= 1;
  const testing = step >= 4;
  return <div className={s.method} data-method="agent" data-step={step}>
    <MethodLabel number="01" name="Change the agent’s tools & workflow" />
    <div className={s.agentLayout}>
      <div className={s.fixedModel}><Network /><strong>Same LLM</strong><span>Weights stay fixed</span></div>
      <div className={s.workflow}>
        <div className={s.workflowTitle}><span>AGENT CODE</span><strong>{added ? 'Add a patch check' : 'Editing workflow'}</strong></div>
        <ol className={s.workflowSteps}>
          <li><b>Read the task</b><span>↓</span></li>
          <li><b>Edit the code</b><span>↓</span></li>
          <li className={s.inserted} data-visible={added} aria-hidden={!added}><b>Validate the patch <em>NEW</em></b><span>↓</span></li>
          <li><b>Continue</b></li>
        </ol>
      </div>
      <div className={s.agentResult} aria-live="polite">
        {testing ? <>
          <span className={s.panelLabel}>EVALUATE THE AGENT</span>
          <div className={s.taskStack}><span>Fix another bug</span><span>Edit another file</span><span>Run the checks</span></div>
          <strong>{step >= 5 ? 'Keep tested variants' : 'Try other coding tasks'}</strong>
        </> : <>
          <span className={s.panelLabel}>ONE PATCH</span>
          <div className={s.patch} data-state={step === 2 ? 'failed' : step >= 3 ? 'fixed' : 'waiting'}><code>− old code</code><code>+ new code</code>{step >= 3 && <span className={s.previousError}>First patch: cannot apply ×</span>}<strong>{step === 2 ? 'Cannot apply ×' : step >= 3 ? 'Revised & applied ✓' : 'Will it apply?'}</strong></div>
          <p>{step === 2 ? 'Send the error back to the agent.' : step >= 3 ? 'The check catches a failed edit.' : 'A proposed change still needs checking.'}</p>
        </>}
      </div>
    </div>
    <div className={s.archive} data-visible={testing} aria-hidden={!testing}><span>VERSION ARCHIVE</span><div><b>v1</b><i>↗</i><b data-selected={step >= 5}>v2</b><i>↗</i><b className={s.future}>next ?</b></div><strong data-active={step >= 6}>{step >= 6 ? 'v2 helps build the next variants ↻' : 'Evaluate variants before reusing them'}</strong></div>
    <p className={s.point}>DGM rewrites its own agent code. This illustrates one reported kind of change.</p>
  </div>;
}

export function SelfTrainingScene() {
  const step = useGuided()?.frame.selection ?? 0;
  const generated = step >= 1;
  const checked = step >= 2;
  const repaired = step >= 3;
  const trained = step >= 5;
  return <div className={s.method} data-method="weights" data-step={step}>
    <MethodLabel number="02" name="Learn from generated solutions · STaR" />
    <div className={s.trainingLayout}>
      <div className={s.solutions}>
        <span className={s.panelLabel}>GENERATE · TWO EXAMPLE TASKS</span>
        <div className={s.solution} data-state={checked ? 'accepted' : 'waiting'}><p>3 boxes, 4 apples each.</p><strong>{generated ? '4 + 4 + 4 = 12' : 'How many apples?'}</strong><b>{checked ? 'Answer matches ✓' : 'Model’s solution'}</b></div>
        <div className={s.solution} data-state={repaired ? 'accepted' : checked ? 'rejected' : 'waiting'}><p>5 bags, 2 apples each.</p>{repaired && <span className={s.previousError}><del>5 + 2 = 7</del> → Given answer: 10</span>}<strong>{repaired ? '2 + 2 + 2 + 2 + 2 = 10' : generated ? '5 + 2 = 7' : 'How many apples?'}</strong><b>{repaired ? 'Retry matches ✓' : checked ? 'Wrong × · Given answer: 10' : 'Model’s solution'}</b></div>
      </div>
      <div className={s.filterStage} data-active={repaired}><span className={s.panelLabel}>FILTER</span><div className={s.filterIcon} aria-hidden="true"><span>✓</span><span>✓</span><i>↓</i><b>Training set</b></div><p>Keep solutions whose<br />answers match the key.</p></div>
      <div className={s.trainModel} data-active={step >= 4}>
        <span className={s.panelLabel}>FINE-TUNE</span><Network changed={trained} /><strong>{trained ? 'Updated weights' : 'Base checkpoint'}</strong><p>{step >= 6 ? 'Generate the next batch ↻' : step >= 4 ? 'Train on many selected examples' : 'Training changes the model’s parameters'}</p>
        <div className={s.newQuestion} data-visible={step >= 6} aria-hidden={step < 6}>Next task: 7 boxes × 3 apples = ?</div>
      </div>
    </div>
    <p className={s.point}>{repaired ? 'The answer key supplies feedback. Correct answers alone do not prove good reasoning.' : 'Start with existing questions and answers. The model writes the solution steps.'}</p>
  </div>;
}

export function RecursiveRoutesScene() {
  const step = useGuided()?.frame.selection ?? 0;
  const handedOver = step >= 4;
  return <div className={s.method} data-method="recursion" data-step={step}>
    {step === 0 ? <>
      <div className={s.routes}>
        <div><span className={s.panelLabel}>DGM</span><div className={s.routeArt}><span>Read</span><i>↓</i><b>Check patch</b><i>↓</i><span>Continue</span></div><h2>Agent code</h2><p>Change how it works.</p></div>
        <div><span className={s.panelLabel}>STaR</span><div className={s.routeArt}><Network changed /></div><h2>Model weights</h2><p>Train on selected solutions.</p></div>
        <div><span className={s.panelLabel}>ALPHAEVOLVE</span><div className={s.routeArt}><div className={s.kernelIcon}>K <b>↻</b></div></div><h2>Training tools</h2><p>Make repeated work cheaper.</p></div>
      </div>
      <p className={s.point}>Three places to make an improvement. What happens in the next round?</p>
    </> : <>
      <div className={s.loopStatement}>Can the improved system do the next improvement?</div>
      <div className={s.recursiveLoop}>
        <div className={s.systemSlot}><span>DO THE IMPROVING</span><div className={s.system} data-retired={handedOver}><Network /><strong>System v1</strong></div>{handedOver && <div className={`${s.system} ${s.successorAtWork}`}><Network changed /><strong>System v2</strong></div>}</div>
        <b className={s.flowArrow}>→</b>
        <div className={s.testGate} data-active={step >= 2}><strong>Change & test</strong><div><span>New tasks</span><span>Same budget</span><span>Better at improving?</span></div><b>{step >= 3 ? 'Only if the evidence supports it' : 'A new version must be evaluated'}</b></div>
        <b className={s.flowArrow}>→</b>
        <div className={s.systemSlot}><span>THE RESULT</span><div className={s.system} data-future="true"><Network changed={step >= 3} /><strong>{step >= 5 ? 'System v3 ?' : handedOver ? 'Next version ?' : 'System v2 ?'}</strong></div></div>
        <div className={s.returnArrow} data-active={handedOver}><span>←</span><strong>{handedOver ? 'The improved system takes over the next round' : 'A conditional handoff'}</strong><span>↵</span></div>
      </div>
      <p className={s.point}>A bounded feedback loop is not evidence of unlimited self-improvement.</p>
    </>}
  </div>;
}
