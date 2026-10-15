'use client';

import { useSyncExternalStore, type CSSProperties } from 'react';
import { useGuided } from './guided-state';
import s from './rsi-training.module.css';

const compactQuery = '(max-width: 850px)';
const subscribeLayout = (notify: () => void) => {
  const query = window.matchMedia(compactQuery);
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
};
const readLayout = () => window.matchMedia(compactQuery).matches;
const serverLayout = () => false;
const at = (point: number[]) => `translate(${point[0]} ${point[1]})`;
const moveTo = (point: number[]) => ({ transform: `translate(${point[0]}px, ${point[1]}px)` });

function Model({ version }: { version: 'A' | 'B' }) {
  return <g className={s.model}>
    <rect x="-60" y="-49" width="120" height="98" rx="23" />
    <circle cx="-19" cy="-8" r="6" /><circle cx="19" cy="-8" r="6" />
    <path d="M-19 14Q0 27 19 14" />
    <text y="85" textAnchor="middle">Model {version}</text>
  </g>;
}

function Sheet({ wrong = false, checked = false, next = false }: { wrong?: boolean; checked?: boolean; next?: boolean }) {
  return <g className={s.sheet} data-wrong={wrong && checked} data-checked={checked && !wrong}>
    <path d="M-47-60H25L47-38V60H-47ZM25-60V-38H47" />
    <text y="-18" textAnchor="middle">{next ? '7 × 3' : wrong ? '5 × 2' : '3 × 4'}</text>
    <text className={s.answer} y="18" textAnchor="middle">{next ? '21' : wrong ? '7' : '12'}</text>
    <path className={s.lines} d="M-26 35H12M-26 46H3" />
    <text className={s.mark} x="28" y="48" textAnchor="middle">{checked ? wrong ? '×' : '✓' : ''}</text>
  </g>;
}

export function SelfTrainingScene() {
  const step = useGuided()?.frame.selection ?? 0;
  const compact = useSyncExternalStore(subscribeLayout, readLayout, serverLayout);
  const checked = step >= 2;
  const training = step >= 3;
  const trained = step >= 4;
  const returned = step >= 5;
  const nextBatch = step >= 6;
  const producer = compact ? [175, 150] : [155, 165];
  const batch = compact ? [160, 485] : [510, 165];
  const train = compact ? [175, 835] : [960, 165];
  const goodPosition = training ? [train[0] - 21, train[1] - 8] : batch;
  const wrongPosition = compact ? [checked ? 295 : 270, checked ? 610 : 485] : [checked ? 755 : 650, checked ? 284 : 165];
  const nextPosition = nextBatch ? batch : compact ? [175, 290] : [300, 165];
  const modelMotion = {
    ...moveTo(returned ? producer : train),
    '--from-x': `${train[0]}px`, '--from-y': `${train[1]}px`,
    '--turn-one-x': `${compact ? 335 : train[0]}px`, '--turn-one-y': `${compact ? train[1] : 325}px`,
    '--turn-two-x': `${compact ? 335 : producer[0]}px`, '--turn-two-y': `${compact ? producer[1] : 325}px`,
    '--to-x': `${producer[0]}px`, '--to-y': `${producer[1]}px`,
  } as CSSProperties;
  const points = [
    'Start with questions and an answer key. Model A writes the solution steps.',
    'The model writes solutions. Some answers are right; some are wrong.',
    'Keep solutions whose final answers match the answer key.',
    'Train the base model on the selected solutions.',
    'Training produces Model B. What does B do next?',
    'Model B comes back to write the next solution steps.',
    'The new model makes the next training material. The cycle can repeat.',
  ];

  return <div className={s.scene} data-method="self-training" data-step={step}>
    <div className={s.statement}>Related idea · STaR</div>
    <div className={s.canvasWrap} data-horizontal-scroll>
      <svg className={s.canvas} viewBox={compact ? '0 0 400 1040' : '0 0 1160 420'} role="img" aria-label={points[step]}>
        <defs><marker id="star-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0 10 5 0 10" fill="none" stroke="currentColor" strokeWidth="1.5" /></marker></defs>
        <text className={s.heading} x={producer[0]} y="32" textAnchor="middle">{returned ? 'Write the next' : 'Write solutions'}</text>
        <text className={s.heading} x={producer[0]} y="62" textAnchor="middle">{returned ? 'solution steps' : ''}</text>
        <text className={s.heading} x={compact ? 200 : 575} y={compact ? 372 : 32} textAnchor="middle">Check final answers</text>
        <text className={s.heading} x={train[0]} y={compact ? 704 : 32} textAnchor="middle">Train the base model</text>

        <g transform={at(producer)} className={s.original} data-retired={returned}><Model version="A" /></g>
        <text className={s.detail} x={producer[0]} y={compact ? 273 : 287} textAnchor="middle">Questions + answer key</text>
        <path className={s.link} data-active={step >= 1} d={compact ? 'M175 302V334' : 'M270 165H390'} markerEnd="url(#star-arrow)" />

        <g className={s.batch} data-active={checked} transform={at(compact ? [200, 485] : [575, 165])}>
          <path d={compact && checked ? 'M-130 65V87H20V65' : 'M-130 65V87H130V65'} />
          <text x={compact && checked ? -40 : 0} y="121" textAnchor="middle">{nextBatch ? 'Next batch to check' : training ? 'Used for training' : checked ? 'Answer checked ✓' : 'Check the answers'}</text>
        </g>
        <g className={s.paperMotion} data-visible={step >= 1 && !training} data-rejected={checked} style={moveTo(wrongPosition)}><g transform={compact && checked ? 'scale(.75)' : undefined}><Sheet wrong checked={checked} /></g></g>
        <text className={s.rejectedLabel} data-visible={checked && !training} x={wrongPosition[0]} y={wrongPosition[1] + 91} textAnchor="middle">Leave out</text>

        <path className={s.link} data-active={training} d={compact ? 'M175 641V674' : 'M735 165H805'} markerEnd="url(#star-arrow)" />
        <g className={s.training} data-active={training} transform={at(train)}>
          <rect x="-125" y="-93" width="250" height="186" rx="12" />
          <path d="M-100-61H-73M73 61H100" />
          <text y="130" textAnchor="middle">{returned ? 'Ready for the next round' : trained ? 'A new model' : 'Learn from selected solutions'}</text>
        </g>
        <g className={s.paperMotion} data-visible={step >= 1} data-used={trained} style={moveTo(goodPosition)}><Sheet checked={checked} /></g>
        <g className={s.returningModel} data-visible={trained} data-returned={returned} style={modelMotion}><Model version="B" /></g>
        <path className={s.returnPath} data-active={returned} d={compact ? 'M310 835H365V150H265' : 'M960 316V385H155V316'} markerEnd="url(#star-arrow)" />
        <text className={s.returnLabel} data-visible={returned} x={compact ? 200 : 555} y={compact ? 1012 : 363} textAnchor="middle">B makes the next training material</text>
        <g className={s.paperMotion} data-visible={nextBatch} style={moveTo(nextPosition)}><Sheet next /></g>
      </svg>
    </div>
    <p className={s.point}>{points[step]}</p>
  </div>;
}
