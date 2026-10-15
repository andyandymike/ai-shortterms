'use client';

import { DesktopLab } from './computer-lab';
import { BlenderCase } from './blender-case';
import { DecodingLab, DecisionLab } from './jev-lab';
import { ComputerLearningScene } from './learning-scenes';
import { JevTrainingScene, JevFitScene } from './jev-explainer';
import { JevQuestionsScene, JevOutputScene } from './jev-output';
import { AlphaEvolveStory } from './rsi-story';
import { AgentImprovementScene, SelfTrainingScene, RecursiveRoutesScene } from './rsi-methods';
import { SortingLab } from './rsi-lab';
import { useGuided } from './guided-state';
import s from './session-two.module.css';
import c from './concept-scenes.module.css';

function Cursor() { return <svg viewBox="0 0 80 90" aria-hidden="true"><path d="M12 7v66l18-16 14 27 15-8-14-25 24-5Z" fill="currentColor" stroke="#f2ecdc" strokeWidth="4" /></svg>; }

function MapScene({ closing = false }: { closing?: boolean }) {
  return <div className={s.map}>
    <div className={s.mapColumn}><div className={`${s.mapArt} ${s.actArt}`}><div className={s.miniWindow}><i /><i /><i /><div /><div /><b>Done ✓</b></div><div className={s.bigCursor}><Cursor /></div></div><p>01 / ACT</p><h2>Computer<br />Use</h2><span>{closing ? 'Did the application reach the goal?' : 'Use the interface to get work done.'}</span></div>
    <div className={s.mapColumn}><div className={`${s.mapArt} ${s.decideArt}`}><span>?</span><div><b>A</b><b className={s.chosen}>B ✓</b><b>C</b></div></div><p>02 / DECIDE</p><h2>Jev</h2><span>{closing ? 'Is the decision useful and reliable?' : 'Return the decision the workflow needs.'}</span></div>
    <div className={s.mapColumn}><div className={`${s.mapArt} ${s.improveArt}`}><span>v1</span><b>↗</b><span>v2</span><b>↗</b><span>?</span></div><p>03 / IMPROVE</p><h2>RSI</h2><span>{closing ? 'Can a better successor improve again?' : 'Ask how improvement can repeat.'}</span></div>
  </div>;
}

function ComputerScene({ id }: { id:string }) {
  if (id === 'C1') return <ApiRouteScene />;
  if (['C1', 'C2', 'C4', 'C5'].includes(id)) return <DesktopLab id={id} />;
  if (id === 'C6') return <BlenderCase />;
  if (id === 'C7') return <ComputerLearningScene />;
  return null;
}

function JevScene({ id }: { id:string }) {
  if (id === 'J1') return <JevQuestionsScene />;
  if (id === 'J2') return <DecodingLab />;
  if (id === 'J3') return <JevOutputScene />;
  if (id === 'J5') return <JevTrainingScene />;
  if (id === 'J8') return <JevFitScene />;
  return <DecisionLab id={id} />;
}

function ApiRouteScene() {
  return <div className={c.apiScene}>
    <div className={c.sharedGoal}><span>SAME GOAL</span><strong>Create a return for order 1048.</strong></div>
    <div className={c.apiLane}>
      <div className={c.routeLabel}><span>SUITABLE API</span><strong>Request directly</strong></div>
      <div className={c.apiRequest}><span>REQUEST</span><code>create_return(1048)</code></div>
      <span className={c.routeArrow} aria-hidden="true">→</span>
      <div className={c.routeReceipt}><span>CHECK RESPONSE</span><strong>Return R-204 ✓</strong></div>
    </div>
    <div className={c.uiLane}>
      <div className={c.routeLabel}><span>NO SUITABLE API</span><strong>Use the interface</strong></div>
      <div className={c.uiJourney}>
        <div className={c.uiStep}><span>01 / SCREENSHOT</span><div className={c.tinyWindow}><div className={c.windowBar}><i /><i /><i /></div><strong>Order 1048</strong><div className={c.formLine} /><div className={c.formLine} /></div></div>
        <span className={c.routeArrow} aria-hidden="true">→</span>
        <div className={c.uiStep}><span>02 / CLICK</span><div className={c.tinyWindow}><div className={c.windowBar}><i /><i /><i /></div><strong className={c.returnButton}>Create return</strong><div className={c.routeCursor}><Cursor /></div></div></div>
        <span className={c.routeArrow} aria-hidden="true">→</span>
        <div className={c.uiStep}><span>03 / CHECK</span><div className={`${c.tinyWindow} ${c.receiptWindow}`}><div className={c.windowBar}><i /><i /><i /></div><strong>Return R-204</strong><b>Created ✓</b></div></div>
      </div>
    </div>
    <div className={c.mixLine}><span aria-hidden="true">↔</span> One workflow can combine APIs and interface actions.</div>
  </div>;
}

function useSelection() {
  const guided = useGuided();
  return Math.min(3, Math.max(0, guided?.frame.selection ?? 0));
}

function Candidate({ label, x, y, visible = true, state = 'waiting' }: { label: string; x: number; y: number; visible?: boolean; state?: 'waiting' | 'rejected' | 'kept' }) {
  return <g className={c.candidate} data-state={state} style={{ transform: `translate(${x}px, ${y}px)`, opacity: visible ? 1 : 0 }} aria-hidden="true">
    <rect width="150" height="60" rx="3" /><path d="M15 18h25m-25 10h42m-42 10h31" /><text x="77" y="38">{label}</text><text className={c.candidateMark} x="124" y="38">{state === 'kept' ? '✓' : state === 'rejected' ? '×' : ''}</text>
  </g>;
}

function ResearchBottleneckScene() {
  const stage = useSelection();
  const captions = ['Start with one idea.', 'Ideas multiply. Experiment slots stay limited.', 'AI proposes, implements and tests candidates.', 'Keep a tested method. Reuse it in the next search.'];
  const slots = [82, 157, 232];
  return <div className={c.searchScene} data-stage={stage} data-horizontal-scroll>
    <div className={c.sceneStatement} aria-live="polite">{captions[stage]}</div>
    <svg className={c.processCanvas} viewBox="0 0 1160 355" role="img" aria-label={`${captions[stage]} An illustrative search: six candidates compete for three experiment slots; a tested candidate is retained.`}>
      <text className={c.columnHeading} x="30" y="35">CANDIDATE IDEAS</text><text className={c.columnHeading} x="455" y="35">EXPERIMENTS</text><text className={c.columnHeading} x="858" y="35">REUSABLE METHOD</text>
      <path className={c.processConnector} d="M360 187H428m-16-11 16 11-16 11M685 187h125m-16-11 16 11-16 11" />
      {slots.map((y, index) => <g key={y}><rect className={c.experimentSlot} x="450" y={y - 4} width="220" height="68" rx="4" />{(stage < 2 || (stage === 3 && index === 2)) && <text className={c.slotLabel} x="560" y={y + 37} textAnchor="middle">test</text>}</g>)}
      <rect className={c.retainSlot} x="825" y="78" width="295" height="222" rx="4" />
      <text className={c.slotLabel} x="970" y="122" textAnchor="middle">{stage === 3 ? 'KEEP' : 'After evaluation'}</text>
      <text className={c.reuseLabel} x="970" y="266" textAnchor="middle">{stage === 3 ? '↻  Next search' : 'Only tested changes'}</text>
      {['A', 'B', 'C', 'D', 'E', 'F'].map((label, index) => {
        const tested = stage >= 2 && index < 3;
        const kept = stage === 3 && index === 2;
        return <Candidate key={label} label={label} x={kept ? 895 : tested ? 484 : 30 + (index % 2) * 170} y={kept ? 158 : tested ? slots[index] : slots[Math.floor(index / 2)]} visible={stage > 0 || index === 0} state={tested ? index === 2 ? 'kept' : 'rejected' : 'waiting'} />;
      })}
    </svg>
    <div className={c.researchWork} data-active={stage >= 2}><span>AI research work</span><strong>Propose <b>→</b> Implement <b>→</b> Test</strong><span>{stage === 3 ? 'The retained method feeds the next round.' : 'Evaluation decides what survives.'}</span></div>
  </div>;
}

function RsiScene({ id }: { id:string }) {
  if (id === 'R3') return <ResearchBottleneckScene />;
  if (id === 'R4') return <SortingLab id={id} />;
  if (id === 'R5') return <AlphaEvolveStory />;
  if (id === 'R6') return <RecursiveRoutesScene />;
  if (id === 'R8') return <AgentImprovementScene />;
  if (id === 'R9') return <SelfTrainingScene />;
  return null;
}

export function ChapterScene({ id }: { id:string }) {
  if (id === 'O1') return <MapScene />;
  if (id === 'E1') return <MapScene closing />;
  if (id.startsWith('C')) return <ComputerScene id={id} />;
  if (id.startsWith('J')) return <JevScene id={id} />;
  return <RsiScene id={id} />;
}


