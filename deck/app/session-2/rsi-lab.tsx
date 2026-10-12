'use client';

import { useMemo } from 'react';
import { useLab } from './lab-state';
import { useGuided } from './guided-state';
import { Caption, Controls, usePlayback } from './lab-controls';
import { evaluateCandidate, inputs, inspectResult, recipes, sortTrace, type Candidate, type Item } from './sorting';
import s from './labs.module.css';

function NumberTrack({ items, active = [], errors = [], checked = false }: { items: Item[]; active?: number[]; errors?: number[]; checked?: boolean }) {
  return <div className={s.numberTrack} aria-label={`Array: ${items.map(item => item.value).join(', ')}`}>
    {items.map((item, position) => <div key={item.id} className={s.numberSlot} style={{ transform: `translateX(${position * 100}%)` }} data-active={active.includes(item.id)} data-error={errors.includes(item.id)} data-checked={checked}><div className={s.numberBlock} style={{ height: `${86 + (item.value + 1) * 7}px` }}><strong>{item.value}</strong>{(errors.includes(item.id) || checked) && <span>{errors.includes(item.id) ? '×' : '✓'}</span>}</div></div>)}
  </div>;
}

export function SortingLab({ id }: { id: string }) {
  const { experiment: localExperiment, setExperiment } = useLab();
  const guided = useGuided();
  const experiment = guided?.frame.experiment ?? localExperiment;
  const { candidate, input, checked, kept, tested } = experiment;
  const dataset = inputs[input];
  const frames = useMemo(() => sortTrace(candidate, dataset.values), [candidate, dataset]);
  const frame = frames[Math.min(experiment.step, frames.length - 1)];
  const complete = experiment.step >= frames.length - 1;
  const advance = () => setExperiment(value => ({ ...value, step: Math.min(value.step + 1, frames.length - 1) }));
  const { playing, setPlaying } = usePlayback(advance, complete, 320);
  const evaluation = useMemo(() => evaluateCandidate(candidate), [candidate]);
  const baseline = useMemo(() => evaluateCandidate('A'), []);
  const currentCheck = inspectResult(dataset.values, frame.items);
  const firstError = frame.items.findIndex((item, index) => index > 0 && frame.items[index - 1].value > item.value);
  const resetRun = () => { setPlaying(false); setExperiment(value => ({ ...value, step: 0, checked: false })); };
  const run = (next: Candidate) => { setExperiment(value => ({ ...value, candidate: next, step: 0, checked: false })); setPlaying(true); };
  const check = () => {
    setPlaying(false);
    setExperiment(value => ({ ...value, checked: true, tested: [...new Set([...value.tested, candidate])], kept: evaluation.passed && evaluation.operations < evaluateCandidate(value.kept).operations ? candidate : value.kept }));
  };
  const verdict = !checked ? complete ? 'Finished running. Is the result correct?' : experiment.step === 0 ? 'Sort correctly. Use less work.' : frame.caption : !currentCheck.passed && firstError > 0 ? `${frame.items[firstError - 1].value} is still before ${frame.items[firstError].value}. Reject ${candidate}; keep ${kept}.` : !evaluation.passed ? `Another input fails. Reject ${candidate}; keep ${kept}.` : candidate === kept ? `All six checks pass. Keep ${kept}.` : `Correct, but no improvement in work. Keep ${kept}.`;
  return <div className={s.lab} data-lab="sorting">
    <div className={s.sortingStage}>
      <div className={s.sortWorkspace}>
        <div className={s.recipeChoices} role="group" aria-label="Candidate programs">{(['A', 'B', 'C'] as Candidate[]).map(option => <button key={option} disabled={Boolean(guided)} style={guided ? { opacity: 1, cursor: 'default', pointerEvents: 'none' } : undefined} aria-pressed={candidate === option} onClick={() => run(option)}><b>{option}</b><span>{recipes[option].name}</span>{(!guided || tested.includes(option)) && <strong>{tested.includes(option) ? evaluateCandidate(option).passed ? 'Checked ✓' : 'Rejected ×' : `Run ${option} →`}</strong>}</button>)}</div>
        <div className={s.sortingWindow}><div className={s.activeRecipe}><b>PROGRAM {candidate}</b><span>{recipes[candidate].rule}</span></div><NumberTrack items={frame.items} active={frame.active} errors={checked ? currentCheck.errors : []} checked={checked && currentCheck.passed} /><div className={s.operationCounts}><div><strong>{frame.comparisons}</strong><span>comparisons</span></div><b>+</b><div><strong>{frame.writes}</strong><span>array writes</span></div><b>=</b><div className={s.workTotal}><strong>{frame.comparisons + frame.writes}</strong><span>work units</span></div></div></div>
      </div>
      <aside className={s.evaluator}><div className={s.panelLabel}>INDEPENDENT CHECK</div><p className={s.checkQuestion}>Every value.<br />In the right order.</p>{!guided && <button className={s.checkButton} disabled={!complete || checked} onClick={check}>{checked ? 'Checked' : 'Check result →'}</button>}{checked && <><div className={s.checkVerdict} data-passed={evaluation.passed}><strong>{evaluation.passed ? '6 / 6 ✓' : `${evaluation.cases.filter(item => item.passed).length} / 6 ×`}</strong><span>{evaluation.passed ? 'tests passed' : 'not all tests pass'}</span></div><div className={s.suiteCost}><span>WORK ACROSS 6 TESTS</span><p>Baseline A <b>{baseline.operations}</b></p><p data-rejected={!evaluation.passed}>Candidate {candidate} <b>{evaluation.operations}</b></p></div></>}</aside>
    </div>
    <Caption phase={checked ? evaluation.passed ? 'CHECKED' : 'REJECTED' : complete ? 'EVALUATE?' : playing ? 'RUNNING' : 'EXPERIMENT'}>{id === 'R3' && experiment.step === 0 ? 'Propose → run → check → keep. Then try again.' : verdict}</Caption>
    <Controls label="sorting program" note="Code experiment" playing={playing} complete={complete} onPlay={() => { if (complete) setExperiment(value => ({ ...value, step: 0, checked: false })); setPlaying(!playing); }} onStep={() => { setPlaying(false); advance(); }} onReset={resetRun}><button className={s.intervention} onClick={() => { setPlaying(false); setExperiment(value => ({ ...value, input: (value.input + 1) % inputs.length, candidate: value.kept, step: 0, checked: false })); }}>New input · keep {kept} →</button><b className={s.keptBadge}>KEPT {kept} ✓</b></Controls>
  </div>;
}
