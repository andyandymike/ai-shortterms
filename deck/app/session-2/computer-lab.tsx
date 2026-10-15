'use client';

import { useLab } from './lab-state';
import { useGuided } from './guided-state';
import { Caption, Controls, usePlayback } from './lab-controls';
import s from './labs.module.css';

type Screen = 'empty' | 'filled' | 'popup' | 'receipt';
type Moment = { phase: string; text: string; action: string; x: number; y: number; field?: string; target?: 'order' | 'reason' | 'submit' | 'close'; screen?: Screen; capture?: Screen; menu?: boolean; blocked?: boolean };
const start: Moment[] = [
  { phase: 'READY', text: 'What should the agent look at first?', action: 'Goal received', x: 560, y: 310 },
  { phase: 'OBSERVE', text: 'The empty form enters context as a screenshot.', action: 'screenshot() → screen 01', x: 560, y: 310, capture: 'empty' },
  { phase: 'GROUND', text: '“Order number” becomes a location on the screen.', action: 'Model requests: click the order field', x: 160, y: 146, target: 'order' },
  { phase: 'ACT', text: 'The tool types. The old screenshot is now out of date.', action: 'type("#1048")', x: 160, y: 146, target: 'order', field: '#' },
  { phase: 'ACT', text: 'The tool is still entering the order number.', action: 'type("#1048") · in progress', x: 160, y: 146, target: 'order', field: '#10' },
  { phase: 'ACT', text: 'The order number is entered. Now choose the reason.', action: 'type("#1048") · completed', x: 160, y: 146, field: '#1048' },
  { phase: 'ACT', text: 'The tool opens the reason menu.', action: 'click("Reason")', x: 290, y: 224, target: 'reason', menu: true },
  { phase: 'OBSERVE', text: 'A fresh screenshot confirms the fields. There is still no receipt.', action: 'choose("Wrong size") → screenshot()', x: 250, y: 244, screen: 'filled', capture: 'filled' },
];
const finish: Moment[] = [
  { phase: 'ACT', text: 'The tool clicks Create return using the latest screen.', action: 'click("Create return")', x: 420, y: 300, target: 'submit', screen: 'filled' },
  { phase: 'WAIT', text: 'The application is processing the request. A click is not a receipt.', action: 'Waiting for the application', x: 420, y: 300, screen: 'filled' },
  { phase: 'RESULT', text: 'The application displays a receipt. It has not been inspected yet.', action: 'Application changed → receipt R-204', x: 530, y: 300, screen: 'receipt' },
  { phase: 'VERIFY', text: 'The new screenshot contains R-204. Now the goal is verified.', action: 'screenshot() → receipt R-204 ✓', x: 530, y: 300, screen: 'receipt', capture: 'receipt' },
];
const recovery: Moment[] = [
  { phase: 'INTERRUPT', text: 'A product tour covers the form. Context still holds the old screenshot.', action: 'Application changed after screen 02', x: 420, y: 300, screen: 'popup' },
  { phase: 'BLOCKED', text: 'The old click lands on the overlay. No return was created.', action: 'click(old submit position) → no receipt', x: 420, y: 300, screen: 'popup', blocked: true },
  { phase: 'OBSERVE', text: 'A new screenshot exposes the obstruction. The next action must change.', action: 'screenshot() → screen 03: popup', x: 420, y: 300, screen: 'popup', capture: 'popup' },
  { phase: 'REPLAN', text: 'Ground the Close tour button in the new screen.', action: 'Model requests: click("Close tour")', x: 423, y: 240, target: 'close', screen: 'popup' },
  { phase: 'ACT', text: 'The tool closes the tour. The entered order remains.', action: 'click("Close tour") → form visible', x: 423, y: 240, screen: 'filled' },
  { phase: 'OBSERVE', text: 'Inspect the restored form before trying Submit again.', action: 'screenshot() → screen 04: form', x: 423, y: 240, screen: 'filled', capture: 'filled' },
];
const boxes = { order: [42, 120, 556, 49], reason: [42, 199, 556, 48], submit: [42, 277, 556, 46], close: [330, 218, 160, 38] };

function MiniScreen({ screen }: { screen?: Screen }) {
  return <svg viewBox="0 0 160 85" className={s.miniScreen} role="img" aria-label={screen ? `Observed ${screen} screen` : 'No screenshot yet'}>
    <rect x="1" y="1" width="158" height="83" fill="#fbf7ec" stroke="currentColor" />
    <path d="M1 13h158" stroke="currentColor" />
    {screen === 'receipt' ? <><path d="m62 42 13 13 24-25" stroke="#287e6e" strokeWidth="6" fill="none" /><text x="80" y="74" textAnchor="middle" fontSize="10">R-204 ✓</text></> : <><rect x="16" y="25" width="127" height="13" fill="#e4dece" /><rect x="16" y="44" width="127" height="13" fill="#e4dece" /><rect x="16" y="65" width="127" height="8" fill="#125f9f" />{screen === 'filled' && <text x="23" y="35" fontSize="9">#1048</text>}{screen === 'popup' && <><rect x="1" y="14" width="158" height="70" fill="#12151866" /><rect x="31" y="25" width="98" height="45" fill="#efc84a" /><text x="80" y="50" fontSize="10" textAnchor="middle">POP-UP</text></>}</>}
    {!screen && <rect x="1" y="14" width="158" height="70" fill="#e4dece" />}
  </svg>;
}

export function DesktopLab({ id }: { id: string }) {
  const { desktop: localDesktop, setDesktop } = useLab();
  const guided = useGuided();
  const desktop = guided?.frame.desktop ?? localDesktop;
  const moments = [...start, ...(desktop.interrupted ? recovery : []), ...finish];
  const step = Math.min(desktop.step, moments.length - 1);
  const frame = moments[step];
  const complete = step === moments.length - 1;
  const advance = () => setDesktop(value => ({ ...value, step: Math.min(value.step + 1, moments.length - 1) }));
  const { playing, setPlaying } = usePlayback(advance, complete, frame.phase === 'BLOCKED' || frame.capture ? 1400 : 850);
  const reset = () => { setPlaying(false); setDesktop({ step: 0, interrupted: false }); };
  const observed = moments.slice(0, step + 1).filter(item => item.capture);
  const latest = observed.at(-1);
  const screen = frame.screen ?? (step >= 7 ? 'filled' : step >= 3 ? 'editing' : 'empty');
  const stale = screen !== latest?.capture;
  const field = frame.field ?? (step >= 5 ? '#1048' : '');
  const focus = frame.target ? boxes[frame.target] : null;
  return <div className={s.lab} data-lab="desktop">
    <div className={s.desktopStage}>
      <div className={s.desktopViewport}>
        <svg viewBox="0 0 640 360" className={s.desktopSvg} role="img" aria-label={`Return desk: ${screen}. ${frame.text}`}>
          <rect x="1" y="1" width="638" height="358" fill="#fbf7ec" stroke="#121518" strokeWidth="2" />
          <path d="M1 30h638" stroke="#121518" /><rect x="2" y="2" width="636" height="27" fill="#e4dece" />
          <text x="15" y="20" fontSize="10">● ● ●</text><text x="320" y="20" textAnchor="middle" fontSize="10" fontWeight="800">ORDERS / RETURN DESK</text>
          {screen === 'receipt' ? <g className={s.receiptArrival}><rect x="282" y="83" width="76" height="64" fill="#287e6e" /><path d="m302 113 12 14 26-29" fill="none" stroke="#f2ecdc" strokeWidth="6" /><text x="320" y="198" textAnchor="middle" fontSize="32" fontWeight="800">Return created</text><text x="320" y="231" textAnchor="middle" fontSize="18">Order #1048 · Request R-204</text><text x="320" y="282" textAnchor="middle" fill={complete ? '#287e6e' : '#646458'} fontSize="13" fontWeight="800">{complete ? 'VERIFIED IN A FRESH SCREENSHOT ✓' : 'VISIBLE IN THE APP · WAITING FOR INSPECTION'}</text></g> : <>
            <text x="44" y="79" fontSize="25" fontWeight="800">Create a return.</text>
            <text x="44" y="111" fontSize="11">Order number</text><rect x="44" y="122" width="552" height="45" fill="#f2ecdc" stroke="#bdb9ad" />
            <text x="59" y="151" fontSize="20" fontFamily="monospace" fill={field ? '#121518' : '#87877c'}>{field || 'Enter order number'}</text>
            {step >= 3 && step <= 4 && <path d="M143 133v26" stroke="#125f9f" strokeWidth="2" />}
            <text x="44" y="190" fontSize="11">Reason</text><rect x="44" y="201" width="552" height="44" fill="#f2ecdc" stroke="#bdb9ad" />
            <text x="59" y="229" fontSize="18" fill={step >= 7 ? '#121518' : '#87877c'}>{step >= 7 ? 'Wrong size' : 'Choose a reason'}</text><text x="566" y="229" fontSize="18">⌄</text>
            <rect x="44" y="279" width="552" height="42" fill="#125f9f" /><text x="61" y="306" fill="#f2ecdc" fontSize="16" fontWeight="700">{frame.phase === 'WAIT' ? 'Creating return…' : 'Create return →'}</text>
            {frame.menu && <g><rect x="45" y="246" width="550" height="66" fill="#fbf7ec" stroke="#121518" /><rect x="47" y="248" width="546" height="30" fill="#efc84a" /><text x="59" y="269" fontSize="16">Wrong size ✓</text><text x="59" y="299" fontSize="16">Damaged item</text></g>}
          </>}
          {screen === 'popup' && <g className={s.popupArrival}><rect x="2" y="31" width="636" height="327" fill="#12151888" /><rect x="151" y="100" width="355" height="177" fill="#efc84a" stroke="#121518" strokeWidth="2" /><text x="176" y="143" fontSize="27" fontWeight="800">What’s new</text><text x="176" y="180" fontSize="16">A product tour covers the form.</text><rect x="331" y="219" width="158" height="36" fill="#f2ecdc" stroke="#121518" /><text x="410" y="242" textAnchor="middle" fontSize="14" fontWeight="700">Close tour ×</text></g>}
          {focus && <rect x={focus[0]} y={focus[1]} width={focus[2]} height={focus[3]} stroke="#e3482d" strokeWidth="3" fill="none" strokeDasharray="6 4" />}
          <g className={s.cursor} style={{ transform: `translate(${frame.x}px, ${frame.y}px)` }}><path d="M0 0v29l8-7 6 12 7-4-6-11 14-1Z" fill={frame.blocked ? '#e3482d' : '#121518'} stroke="#fbf7ec" strokeWidth="2" />{frame.blocked && <circle r="21" fill="none" stroke="#e3482d" strokeWidth="3" />}</g>
        </svg>
        <div className={s.toolStrip}><b>{frame.phase === 'GROUND' || frame.phase === 'REPLAN' ? 'MODEL' : 'TOOL / APP'}</b><code>{frame.action}</code></div>
      </div>
      <aside className={s.contextPanel}>
        <div className={s.panelLabel}>CONTEXT</div>
        <p className={s.goal}>Create a return for order <b>#1048</b>.</p>
        <div className={s.screenInContext} key={observed.length}><MiniScreen screen={latest?.capture} /><div><b>{latest ? `SCREEN ${String(observed.length).padStart(2, '0')}` : 'NO SCREEN YET'}</b>{latest && <small data-stale={stale}>{stale ? 'Screen has changed' : 'Up to date ✓'}</small>}</div></div>
        {observed.length > 0 && <div className={s.history}><span>RECENT HISTORY</span>{observed.slice(-3).map((item, index) => <p key={index}>{item.capture === 'empty' ? 'Form empty' : item.capture === 'filled' ? 'Fields confirmed · no receipt' : item.capture === 'popup' ? 'Tour blocks the action' : 'Receipt R-204 verified ✓'}</p>)}</div>}
      </aside>
    </div>
    <Caption phase={frame.phase === 'GROUND' ? 'UI GROUNDING' : frame.phase}>{id === 'C1' && step === 0 ? 'Computer Use = acting through an app’s interface.' : id === 'C2' && step <= 1 ? 'Context = the information available for the next decision.' : frame.text}</Caption>
    <Controls label="desktop loop" playing={playing} complete={complete} onPlay={() => { if (complete) setDesktop(value => ({ ...value, step: 0 })); setPlaying(!playing); }} onStep={() => { setPlaying(false); advance(); }} onReset={reset}>
      <button className={s.intervention} aria-label="Insert a pop-up" onClick={() => { setPlaying(false); setDesktop({ step: 8, interrupted: true }); }}>＋ Insert a pop-up</button>
    </Controls>
  </div>;
}
