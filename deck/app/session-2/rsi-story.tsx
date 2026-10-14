'use client';

import { useGuided } from './guided-state';
import { useSyncExternalStore } from 'react';
import s from './rsi-story.module.css';

const compactQuery = '(max-width: 850px)';
const subscribeLayout = (notify: () => void) => {
  const query = window.matchMedia(compactQuery);
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
};
const readLayout = () => window.matchMedia(compactQuery).matches;
const serverLayout = () => false;
const at = (point: number[]) => `translate(${point[0]} ${point[1]})`;

function Model({ label, future = false }: { label: string; future?: boolean }) {
  return <g className={s.model} data-future={future}>
    <rect x="-69" y="-60" width="138" height="116" rx="15" />
    <path d="M-39-26 0-38 39-26M-39-26 0 1 39-26M-39 26 0 1 39 26M0-38V1M-39-26V26M39-26V26" />
    {[[-39,-26],[0,-38],[39,-26],[-39,26],[0,1],[39,26]].map(([x,y]) => <circle key={`${x}/${y}`} cx={x} cy={y} r="7" />)}
    <text y="101" textAnchor="middle">{label}</text>
  </g>;
}

function Kernel({ next = false }: { next?: boolean }) {
  return <g className={s.kernel}>
    <path d="M-43-55H22L43-34V55H-43ZM22-55V-34H43" />
    <text x="0" y="0" textAnchor="middle">{next ? 'K₂' : 'K'}</text>
    <path d="M-23 18H23M-23 29H23M-23 40H7" />
  </g>;
}

function Training({ active }: { active: boolean }) {
  return <g className={s.training} data-active={active}>
    <rect x="-137" y="-90" width="274" height="180" rx="3" />
    <path d="M-114-60H-70M-114-42H-83M70-60H114M83-42H114M-114 60H-70M70 60H114" />
    <rect className={s.slot} x="-47" y="-59" width="94" height="118" />
    <path className={s.repeat} d="M-75 10V-20Q-75-31-64-31M75-10V20Q75 31 64 31M-64-31-72-37M64 31 72 37" />
  </g>;
}

export function AlphaEvolveStory() {
  const step = useGuided()?.frame.selection ?? 0;
  const compact = useSyncExternalStore(subscribeLayout, readLayout, serverLayout);
  const installed = step >= 3;
  const ai = compact ? [200,135] : [155,155];
  const kernel = compact ? [200,445] : [570,155];
  const train = compact ? [200,775] : [985,155];
  const moving = installed ? train : kernel;
  const statements = [
    'Same improvement loop. Now the program is a training kernel.',
    'Gemini proposes a change to the kernel.',
    'Keep the change only after testing it.',
    'Use the improved code to train Gemini.',
  ];
  return <div className={s.story} data-rsi="reported" data-step={step}>
    <div className={s.statement}>{statements[step]}</div>
    <div className={s.canvasWrap} data-horizontal-scroll>
      <svg className={s.canvas} viewBox={compact ? '0 0 400 970' : '0 0 1160 365'} role="img" aria-label="Gemini proposes a kernel change. An evaluator checks correctness and speed. The improved kernel moves into the process used to train Gemini.">
        <defs><marker id="reported-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0 10 5 0 10" fill="none" stroke="currentColor" strokeWidth="1.5" /></marker></defs>
        <text className={s.heading} x={ai[0]} y="30" textAnchor="middle">Propose</text>
        <text className={s.heading} x={kernel[0]} y={compact ? 340 : 30} textAnchor="middle">Test the kernel</text>
        <text className={s.heading} x={train[0]} y={compact ? 660 : 30} textAnchor="middle">Train Gemini</text>
        <g transform={at(ai)}><Model label="Gemini" /></g>
        <path className={s.link} data-active={step >= 1} d={compact ? 'M200 285V315' : 'M258 155H445'} markerEnd="url(#reported-arrow)" />
        <g className={s.kernelBench} data-tested={step >= 2} transform={at(kernel)}>
          <rect x="-104" y="-88" width="208" height="176" rx="3" />
          <text x="0" y="132" textAnchor="middle">{step >= 2 ? 'Correct ✓   Faster ✓' : 'Correct?   Faster?'}</text>
          <g className={s.leftBehind} data-visible={installed}><Kernel /></g>
        </g>
        <path className={s.link} data-active={installed} d={compact ? 'M200 595V635' : 'M697 155H827'} markerEnd="url(#reported-arrow)" />
        <g transform={at(train)}><Training active={installed} /></g>
        <g className={s.movingKernel} data-installed={installed} data-visible={step >= 1} style={{ transform: `translate(${moving[0]}px,${moving[1]}px)` }}><Kernel /></g>
        <text className={s.detail} x={ai[0]} y={compact ? 270 : 302} textAnchor="middle">inside AlphaEvolve</text>
        <text className={s.detail} x={train[0]} y={compact ? 907 : 287} textAnchor="middle">Repeat this computation</text>
        <text className={s.detail} x={train[0]} y={compact ? 935 : 315} textAnchor="middle">throughout training</text>
      </svg>
    </div>
    <div className={s.evidence} data-visible={installed} aria-hidden={!installed}>
      <span>REPORTED RESULT</span><p><strong>23%</strong> faster kernel</p><b>→</b><p><strong>≈1%</strong> less total training time</p>
    </div>
    <p className={s.point}>{installed ? 'AI helped improve AI training. A better AI researcher is still unproven.' : 'Kernel = a small compute routine used repeatedly during training.'}</p>
  </div>;
}

export function RecursiveImprovementStory() {
  const step = useGuided()?.frame.successor ?? 0;
  const compact = useSyncExternalStore(subscribeLayout, readLayout, serverLayout);
  const handedOver = step >= 6;
  const nextRound = step >= 7;
  const researcher = compact ? [235,140] : [155,157];
  const train = compact ? [235,440] : [580,157];
  const successor = compact ? [235,760] : [1005,157];
  const position = handedOver ? researcher : step === 5 ? compact ? [70,140] : [155,363] : step === 4 ? compact ? [70,760] : [1005,363] : successor;
  const statements = step >= 4 ? 'If v2 is better at improving AI, let it take over.' : step === 3 ? 'Test the new AI on new improvement tasks.' : 'Suppose the saving helps develop AI v2.';
  return <div className={s.recursion} data-rsi="hypothetical" data-step={step}>
    <div className={s.statement}>{statements}</div>
    <div className={s.canvasWrap} data-horizontal-scroll>
      <svg className={`${s.canvas} ${s.loopCanvas}`} viewBox={compact ? '0 0 400 1080' : '0 0 1160 485'} role="img" aria-label={handedOver ? 'Hypothetical handoff: AI v2 has moved back into AI v1’s research role. It proposes another training improvement that could help develop AI v3.' : 'Hypothetical loop: AI v1 improves training, which could help develop AI v2. Test v2 on new tasks before letting it take over the next improvement round.'}>
        <defs><marker id="recursive-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0 10 5 0 10" fill="none" stroke="currentColor" strokeWidth="1.5" /></marker></defs>
        <text className={s.heading} x={researcher[0]} y="29" textAnchor="middle">Do the research</text>
        <text className={s.heading} x={train[0]} y={compact ? 315 : 29} textAnchor="middle">Improve training</text>
        <text className={s.heading} x={successor[0]} y={compact ? 665 : 29} textAnchor="middle">Develop the next AI</text>
        <g className={s.original} data-retired={handedOver} transform={at(researcher)}><Model label="AI v1" /></g>
        <path className={s.link} data-active={step >= 1} d={compact ? 'M235 265V290' : 'M255 157H417'} markerEnd="url(#recursive-arrow)" />
        <g transform={at(train)}><Training active={step >= 1} /><g className={s.improvedKernel} data-visible={step >= 1}><Kernel next={nextRound} /></g></g>
        <text className={s.detail} x={train[0]} y={compact ? 573 : 290} textAnchor="middle">{nextRound ? 'Next improvement' : compact ? 'Use saved compute' : 'Use saved compute for more training'}</text>
        {compact && !nextRound && <text className={s.detail} x={train[0]} y="600" textAnchor="middle">for more training</text>}
        <path className={s.link} data-active={step >= 2} d={compact ? 'M235 615V640' : 'M743 157H899'} markerEnd="url(#recursive-arrow)" />
        <g className={s.nextModel} data-visible={nextRound} transform={at(successor)}><Model label="AI v3 ?" future /></g>
        <path className={s.returnPath} data-active={step >= 4} d={compact ? 'M135 760H95Q70 760 70 735V165Q70 140 95 140H135' : 'M1005 285V320Q1005 363 962 363H198Q155 363 155 320V285'} markerEnd="url(#recursive-arrow)" />
        <g className={s.evaluation} data-visible={step === 3} transform={compact ? 'translate(200 960)' : 'translate(580 364)'}>
          <rect x={compact ? -184 : -219} y="-54" width={compact ? 368 : 438} height="108" />
          <text className={s.testTitle} y="-15" textAnchor="middle">v1 vs v2</text>
          <text y="18" textAnchor="middle">New tasks · Same budget</text>
          <text className={s.testQuestion} y="88" textAnchor="middle">{compact ? 'Correct and useful changes?' : 'Correct changes? Useful improvements?'}</text>
        </g>
        <g className={s.movingModel} data-ai-token="v2" data-visible={step >= 2} data-role={handedOver ? 'researcher' : 'successor'} style={{ transform: `translate(${position[0]}px,${position[1]}px) scale(${compact && (step === 4 || step === 5) ? .5 : 1})` }}><Model label={handedOver ? 'AI v2' : 'AI v2 ?'} future={!handedOver} /></g>
        {step < 3 && <text className={s.returnQuestion} x={compact ? 200 : 580} y={compact ? 965 : 400} textAnchor="middle">{compact ? 'Can v2 take over?' : 'Can the new AI take over this work?'}</text>}
        {handedOver && <text className={s.returnLabel} x={compact ? 200 : 580} y={compact ? 965 : 407} textAnchor="middle">{compact ? 'v2 takes over the next round.' : 'The new AI becomes the next improver.'}</text>}
      </svg>
    </div>
    <p className={s.point}>{nextRound ? 'That handoff is the recursive step. Every new generation must be tested again.' : step === 3 ? 'Test improvement ability, not just the time saved in training.' : 'A possible next step — not a result demonstrated by the Google case.'}</p>
  </div>;
}
