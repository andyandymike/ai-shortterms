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
  const baselineResult = useMemo(() => sortTrace('A', dataset.values).at(-1)!, [dataset]);
  const showBaseline = id === 'R4' && candidate !== 'A' && tested.includes('A');
  const currentCheck = inspectResult(dataset.values, frame.items);
  const firstError = frame.items.findIndex((item, index) => index > 0 && frame.items[index - 1].value > item.value);
  const resetRun = () => { setPlaying(false); setExperiment(value => ({ ...value, step: 0, checked: false })); };
  const run = (next: Candidate) => { setExperiment(value => ({ ...value, candidate: next, step: 0, checked: false })); setPlaying(true); };
  const check = () => {
    setPlaying(false);
    setExperiment(value => ({ ...value, checked: true, tested: [...new Set([...value.tested, candidate])], kept: evaluation.passed && evaluation.operations < evaluateCandidate(value.kept).operations ? candidate : value.kept }));
  };
  const verdict = !checked ? complete ? 'Finished running. Is the result correct?' : experiment.step === 0 ? 'Sort correctly. Use less work.' : frame.caption : !currentCheck.passed && firstError > 0 ? `${frame.items[firstError - 1].value} is still before ${frame.items[firstError].value}. Reject ${candidate}; keep ${kept}.` : !evaluation.passed ? `Another input fails. Reject ${candidate}; keep ${kept}.` : candidate === kept ? `All six checks pass. Keep ${kept}.` : `Correct, but no improvement in work. Keep ${kept}.`;
  const storyVerdict = !checked ? verdict : candidate === 'A' ? 'Start with A. Now try to improve it.' : candidate === 'B' ? 'First attempt failed. Keep using A.' : 'A → C: the program improved. This alone is not RSI.';
  return <div className={s.lab} data-lab="sorting">
    <div className={s.sortingStage}>
      <div className={s.sortWorkspace}>
        {guided ? <ol className={s.experimentTrail} aria-label="Improvement attempts in time order">{(['A','B','C'] as Candidate[]).map((option,index) => <li key={option} data-current={candidate === option} data-rejected={option === 'B' && tested.includes('B')} data-future={!tested.includes(option) && candidate !== option} aria-current={candidate === option ? 'step' : undefined}><span>{['START','1ST ATTEMPT','2ND ATTEMPT'][index]}</span><b>{option}</b><strong>{option === 'B' && tested.includes('B') ? 'Rejected ×' : option === 'C' && kept === 'C' ? 'Adopted ✓' : ['Original','Try less work','Try another way'][index]}</strong></li>)}</ol> : <div className={s.recipeChoices} role="group" aria-label="Candidate programs">{(['A', 'B', 'C'] as Candidate[]).map(option => <button key={option} aria-pressed={candidate === option} onClick={() => run(option)}><b>{option}</b><span>{recipes[option].name}</span><strong>{tested.includes(option) ? evaluateCandidate(option).passed ? 'Checked ✓' : 'Rejected ×' : `Run ${option} →`}</strong></button>)}</div>}
        <div className={s.sortingWindow}>{showBaseline && <div className={s.baselineResult} aria-label="Verified baseline A on the same input"><b>A · Verified ✓</b><div aria-label={`Baseline output: ${baselineResult.items.map(item => item.value).join(', ')}`}>{baselineResult.items.map(item => <span key={item.id}>{item.value}</span>)}</div><strong>{baselineResult.comparisons + baselineResult.writes}<span>work units</span></strong></div>}<div className={s.activeRecipe}><b>PROGRAM {candidate}</b><span>{recipes[candidate].rule}</span></div><NumberTrack items={frame.items} active={frame.active} errors={checked ? currentCheck.errors : []} checked={checked && currentCheck.passed} /><div className={s.operationCounts}><div><strong>{frame.comparisons}</strong><span>comparisons</span></div><b>+</b><div><strong>{frame.writes}</strong><span>array writes</span></div><b>=</b><div className={s.workTotal}><strong>{frame.comparisons + frame.writes}</strong><span>work units</span></div></div></div>
      </div>
      <aside className={s.evaluator}>{guided ? <div className={s.currentProgram} data-current-program={kept}><span>IN USE</span><strong>{kept}</strong></div> : <p className={s.checkQuestion}>Every value.<br />In the right order.</p>}<div className={s.panelLabel}>INDEPENDENT CHECK</div>{!guided && <button className={s.checkButton} disabled={!complete || checked} onClick={check}>{checked ? 'Checked' : 'Check result →'}</button>}{checked && <><div className={s.checkVerdict} data-passed={evaluation.passed}><strong>{evaluation.passed ? '6 / 6 ✓' : `${evaluation.cases.filter(item => item.passed).length} / 6 ×`}</strong><span>{evaluation.passed ? 'tests passed' : 'not all tests pass'}</span></div><div className={s.suiteCost}><span>WORK ACROSS 6 TESTS</span><p>Original A <b>{baseline.operations}</b></p><p data-rejected={!evaluation.passed}>Attempt {candidate} <b>{evaluation.operations}</b></p></div></>}</aside>
    </div>
    <Caption phase={checked ? evaluation.passed ? 'CHECKED' : 'REJECTED' : complete ? 'EVALUATE?' : playing ? 'RUNNING' : 'EXPERIMENT'}>{id === 'R4' && guided ? storyVerdict : verdict}</Caption>
    <Controls label="sorting program" note="Code experiment" playing={playing} complete={complete} onPlay={() => { if (complete) setExperiment(value => ({ ...value, step: 0, checked: false })); setPlaying(!playing); }} onStep={() => { setPlaying(false); advance(); }} onReset={resetRun}><button className={s.intervention} onClick={() => { setPlaying(false); setExperiment(value => ({ ...value, input: (value.input + 1) % inputs.length, candidate: value.kept, step: 0, checked: false })); }}>New input · keep {kept} →</button><b className={s.keptBadge}>KEPT {kept} ✓</b></Controls>
  </div>;
}
