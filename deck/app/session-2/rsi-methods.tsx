'use client';

import { useSyncExternalStore } from 'react';
import { useGuided } from './guided-state';
import s from './rsi-methods.module.css';

export { SelfTrainingScene } from './rsi-training';

const query = '(max-width: 850px)';
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
};
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => false;
const move = (p: number[]) => ({ transform: `translate(${p[0]}px, ${p[1]}px)` });

function Assistant({ version, improved = false, future = false }: { version: string; improved?: boolean; future?: boolean }) {
  return <g className={s.assistant} data-improved={improved} data-future={future}>
    <rect className={s.body} x="-66" y="-62" width="132" height="126" rx="18" />
    <circle className={s.eye} cx="-23" cy="-20" r="7" /><circle className={s.eye} cx="23" cy="-20" r="7" />
    <path className={s.mouth} d="M-22 8H22" />
    <text className={s.version} textAnchor="middle" y="46">{version}</text>
    {improved && <g className={s.toolBadge}><rect x="-74" y="74" width="148" height="36" rx="2" /><text x="0" y="99" textAnchor="middle">Check ✓</text></g>}
  </g>;
}

function Arrow({ id }: { id: string }) {
  return <defs><marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 9 5 1 9" fill="none" stroke="currentColor" strokeWidth="1.6" /></marker></defs>;
}

export function AgentImprovementScene() {
  const step = useGuided()?.frame.selection ?? 0;
  const compact = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const a = compact ? [175, 145] : [145, 180];
  const tool = compact ? [175, 450] : [575, 180];
  const result = compact ? [175, 825] : [1000, 180];
  const b = step < 6 ? result : step === 6 ? (compact ? [330, 825] : [1000, 370]) : step === 7 ? (compact ? [330, 145] : [145, 370]) : a;
  const check = step < 2 ? (compact ? [175, 270] : [285, 320]) : [tool[0], tool[1] + 15];
  const returning = step >= 6;
  const title = step <= 3 ? 'A changes its own tool.' : step <= 5 ? 'Try the new helper on other tasks.' : 'B takes over the next change.';
  return <div className={s.scene} data-rsi="own-tool" data-step={step}>
    <div className={s.statement}><span>DGM · ILLUSTRATED EXAMPLE</span><strong>{title}</strong></div>
    <div className={s.canvasWrap}>
      <svg className={s.canvas} viewBox={compact ? '0 0 400 1030' : '0 0 1160 480'} role="img" aria-label={`A changes its own editing tool, adding a check. After evaluation, B keeps that tool and moves back to do the next change. ${title}`}>
        <Arrow id="own-tool-arrow" />
        <text className={s.label} x={a[0]} y="40" textAnchor="middle">{returning ? 'DOES THE NEXT CHANGE' : 'DOES THE CHANGING'}</text>
        <text className={s.label} x={tool[0]} y={compact ? 315 : 40} textAnchor="middle">{step >= 8 ? 'ITS OWN TOOL, AGAIN' : 'ITS OWN EDITING TOOL'}</text>
        <text className={s.label} x={result[0]} y={compact ? 665 : 40} textAnchor="middle">{step >= 8 ? 'ANOTHER VERSION?' : step >= 4 ? 'TEST BEFORE REUSE' : 'THE NEW HELPER'}</text>
        <path className={s.link} data-active={step >= 1} d={compact ? 'M175 283V305' : 'M250 180H413'} markerEnd="url(#own-tool-arrow)" />
        <path className={s.link} data-active={step >= 4} d={compact ? 'M175 592V635' : 'M730 180H885'} markerEnd="url(#own-tool-arrow)" />
        <g className={s.actor} data-visible={!returning} style={move(a)}><Assistant version="A" /></g>
        <g transform={`translate(${tool[0]} ${tool[1]})`} className={s.tool}>
          <rect className={s.toolFrame} x="-135" y="-105" width="270" height="235" />
          <rect className={s.toolRow} x="-105" y="-79" width="210" height="46" /><text x="0" y="-48" textAnchor="middle">Edit</text>
          <path className={s.smallArrow} d="M0-28V-16M-5-21 0-16 5-21" />
          <rect className={s.emptySlot} x="-105" y="-8" width="210" height="46" />
          <path className={s.smallArrow} d="M0 44V56M-5 51 0 56 5 51" />
          <rect className={s.toolRow} x="-105" y="62" width="210" height="46" /><text x="0" y="93" textAnchor="middle">Use the edit</text>
          {step >= 8 && <g className={s.nextChange}><rect x="-120" y="144" width="240" height="43" /><text x="0" y="173" textAnchor="middle">Next change ?</text></g>}
        </g>
        <g className={s.movingCheck} data-visible={step >= 1} style={move(check)}><rect x="-105" y="-23" width="210" height="46" /><text x="0" y="8" textAnchor="middle">Check first ✓</text></g>
        <g className={s.testTasks} data-visible={step === 4} transform={`translate(${result[0]} ${result[1]})`}>
          <rect x="-112" y="-78" width="224" height="63" /><text x="0" y="-39" textAnchor="middle">Other files</text>
          <rect x="-112" y="8" width="224" height="63" /><text x="0" y="47" textAnchor="middle">Other fixes</text>
        </g>
        <g className={s.placeholder} data-visible={step < 4} transform={`translate(${result[0]} ${result[1]})`}><Assistant version="B ?" future /></g>
        <path className={s.returnPath} data-active={returning} d={compact ? 'M264 825H370V145H260' : 'M1000 305V420H145V305'} markerEnd="url(#own-tool-arrow)" />
        <g className={s.movingAssistant} data-visible={step >= 5} style={move(b)}><Assistant version="B" improved /></g>
        <g className={s.placeholder} data-visible={step >= 8} transform={`translate(${result[0]} ${result[1]})`}><Assistant version="C ?" future /></g>
        <text className={s.returnLabel} data-visible={returning} x={compact ? 200 : 580} y={compact ? 1000 : 465} textAnchor="middle">{compact ? (step >= 8 ? 'B now does the improving.' : 'B comes back.') : (step >= 8 ? 'The improved helper is now doing the improving.' : 'Bring the improved helper back.')}</text>
        <text className={s.detail} data-visible={step === 3} x={compact ? 175 : 575} y={compact ? 575 : 350} textAnchor="middle">The change belongs to the helper itself.</text>
      </svg>
    </div>
    <p className={s.point}>{step <= 3 ? 'Self: it changes a tool it uses itself.' : step <= 5 ? 'A useful change must work on other tasks too.' : 'Recursive: the improved helper works on itself again.'}</p>
  </div>;
}

export function RecursiveRoutesScene() {
  const step = useGuided()?.frame.selection ?? 0;
  const compact = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const left = compact ? [165, 140] : [145, 175];
  const right = compact ? [165, 740] : [1000, 175];
  const gate = compact ? [165, 430] : [575, 175];
  const b = step < 4 ? right : step === 4 ? (compact ? [330, 740] : [1000, 365]) : step === 5 ? (compact ? [330, 140] : [145, 365]) : left;
  const returning = step >= 4;
  return <div className={s.scene} data-rsi="recap" data-step={step}>
    {step === 0 ? <>
      <div className={s.statement}><strong>What did each example show?</strong></div>
      <div className={s.comparison}>
        <div><span className={s.caseName}>DGM</span><div className={s.caseMotion} aria-hidden="true"><b>A</b><span>→</span><b className={s.filled}>B</b><span>↶</span></div><p>An improved helper<br /><strong>works on itself again.</strong></p></div>
        <div><span className={s.caseName}>STaR</span><div className={s.caseMotion} aria-hidden="true"><b>B</b><span>→</span><span className={s.paperIcon}>✓</span></div><p>A new model<br /><strong>writes the next training solutions.</strong></p></div>
        <div><span className={s.caseName}>AlphaEvolve</span><div className={s.caseMotion} aria-hidden="true"><span className={s.clockIcon}>↗</span><span className={s.missing}>?</span></div><p>Training gets faster.<br /><strong>The next round is not shown.</strong></p></div>
      </div>
      <p className={s.point}>They show different parts of self-improvement.</p>
    </> : <>
      <div className={s.statement}><span>THE IDEA · EACH CHANGE NEEDS EVIDENCE</span><strong>{step >= 6 ? 'The result becomes the next improver.' : 'Follow the new helper back to the start.'}</strong></div>
      <div className={s.canvasWrap}>
        <svg className={s.canvas} viewBox={compact ? '0 0 400 965' : '0 0 1160 480'} role="img" aria-label="A changes itself and is evaluated. If B is better, B moves back to the starting position to try the next improvement. C is a possibility, not a promised result.">
          <Arrow id="recap-arrow" />
          <text className={s.label} x={left[0]} y="40" textAnchor="middle">DOES THE IMPROVING</text>
          <text className={s.label} x={right[0]} y={compact ? 625 : 40} textAnchor="middle">{step >= 7 ? 'NEXT POSSIBILITY' : 'IF THE CHANGE HELPS'}</text>
          <path className={s.link} data-active={step >= 2} d={compact ? 'M165 260V310' : 'M245 175H410'} markerEnd="url(#recap-arrow)" />
          <path className={s.link} data-active={step >= 3} d={compact ? 'M165 550V590' : 'M740 175H880'} markerEnd="url(#recap-arrow)" />
          <g className={s.actor} data-visible={!returning} style={move(left)}><Assistant version="A" /></g>
          <g transform={`translate(${gate[0]} ${gate[1]})`} className={s.gate} data-active={step >= 2}>
            <rect x="-135" y="-90" width="270" height="180" /><text className={s.gateTitle} x="0" y="-33" textAnchor="middle">Change itself</text><path d="M-100-12H100" /><text x="0" y="24" textAnchor="middle">Test on new tasks</text><text x="0" y="60" textAnchor="middle">Keep the same budget</text>
          </g>
          <g className={s.placeholder} data-visible={step < 3} transform={`translate(${right[0]} ${right[1]})`}><Assistant version="B ?" future /></g>
          <path className={s.returnPath} data-active={returning} d={compact ? 'M254 740H370V140H250' : 'M1000 300V420H145V300'} markerEnd="url(#recap-arrow)" />
          <g className={s.movingAssistant} data-visible={step >= 3} style={move(b)}><Assistant version="B" improved /></g>
          <g className={s.placeholder} data-visible={step >= 7} transform={`translate(${right[0]} ${right[1]})`}><Assistant version="C ?" future /></g>
          <text className={s.returnLabel} x={compact ? 200 : 575} y={compact ? 930 : 465} textAnchor="middle">{compact ? (returning ? 'B takes over. Test the next change.' : 'Can the improved helper improve again?') : (returning ? 'B takes over. The next improvement still needs testing.' : 'Will the improved system help improve itself again?')}</text>
        </svg>
      </div>
      <p className={s.point}>That return is the recursive step. Progress is not guaranteed.</p>
    </>}
  </div>;
}
