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

function Model({ label }: { label: string }) {
  return <g className={s.model}>
    <rect x="-69" y="-60" width="138" height="116" rx="15" />
    <circle cx="-22" cy="-14" r="7" /><circle cx="22" cy="-14" r="7" />
    <path d="M-22 14Q0 30 22 14" />
    <text y="101" textAnchor="middle">{label}</text>
  </g>;
}

function ComputeStep() {
  return <g className={s.kernel}>
    <path d="M-70-55H45L70-30V55H-70ZM45-55V-30H70" />
    <text x="0" y="-5" textAnchor="middle">Compute</text>
    <text x="0" y="24" textAnchor="middle">step</text>
    <path d="M-30 39H30" />
  </g>;
}

function Training({ active }: { active: boolean }) {
  return <g className={s.training} data-active={active}>
    <rect x="-137" y="-90" width="274" height="180" rx="3" />
    <path d="M-114-60H-70M-114-42H-83M70-60H114M83-42H114M-114 60H-70M70 60H114" />
    <rect className={s.slot} x="-76" y="-61" width="152" height="122" />
    <path className={s.repeat} d="M-102 10V-20Q-102-31-91-31M102-10V20Q102 31 91 31M-91-31-99-37M91 31 99 37" />
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
    'Related idea · AlphaEvolve',
    'Find a faster way to do one repeated calculation.',
    'Same result. Less time.',
    'Put that faster step into AI training.',
  ];
  return <div className={s.story} data-rsi="reported" data-step={step}>
    <div className={s.statement}>{statements[step]}</div>
    <div className={s.canvasWrap} data-horizontal-scroll>
      <svg className={s.canvas} viewBox={compact ? '0 0 400 970' : '0 0 1160 365'} role="img" aria-label="Gemini proposes a faster compute step. Check that it gives the same result in less time. The same compute step moves into Gemini training, making training faster.">
        <defs><marker id="reported-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0 10 5 0 10" fill="none" stroke="currentColor" strokeWidth="1.5" /></marker></defs>
        <text className={s.heading} x={ai[0]} y="30" textAnchor="middle">Suggest a change</text>
        <text className={s.heading} x={kernel[0]} y={compact ? 340 : 30} textAnchor="middle">Check it</text>
        <text className={s.heading} x={train[0]} y={compact ? 660 : 30} textAnchor="middle">Train Gemini</text>
        <g transform={at(ai)}><Model label="Gemini" /></g>
        <path className={s.link} data-active={step >= 1} d={compact ? 'M200 285V315' : 'M258 155H445'} markerEnd="url(#reported-arrow)" />
        <g className={s.kernelBench} data-tested={step >= 2} transform={at(kernel)}>
          <rect x="-104" y="-88" width="208" height="176" rx="3" />
          <text x="0" y="132" textAnchor="middle">{step >= 2 ? 'Same result ✓   Faster ✓' : 'Same result?   Faster?'}</text>
          <g className={s.leftBehind} data-visible={installed}><ComputeStep /></g>
        </g>
        <path className={s.link} data-active={installed} d={compact ? 'M200 595V635' : 'M697 155H827'} markerEnd="url(#reported-arrow)" />
        <g transform={at(train)}><Training active={installed} /></g>
        <g className={s.movingKernel} data-installed={installed} data-visible={step >= 1} style={{ transform: `translate(${moving[0]}px,${moving[1]}px)` }}><ComputeStep /></g>
        <text className={s.detail} x={ai[0]} y={compact ? 270 : 302} textAnchor="middle">inside AlphaEvolve</text>
        <text className={s.detail} x={train[0]} y={compact ? 907 : 287} textAnchor="middle">Use the faster step</text>
        <text className={s.detail} x={train[0]} y={compact ? 935 : 315} textAnchor="middle">throughout training</text>
      </svg>
    </div>
    <div className={s.evidence} data-visible={installed} aria-hidden={!installed}>
      <span>REPORTED RESULT</span><p><strong>23%</strong> average compute-step speedup</p><b>→</b><p><strong>≈1%</strong> less total training time</p>
    </div>
    <p className={s.point}>{installed ? 'Training got faster. This does not show the next AI becoming better at improving AI.' : 'One small calculation happens many times. Making it faster can speed up training.'}</p>
  </div>;
}
