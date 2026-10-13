'use client';

import { useState } from 'react';
import { useLab } from './lab-state';
import { useGuided } from './guided-state';
import { Caption, Controls, usePlayback } from './lab-controls';
import s from './labs.module.css';
import j from './jev-refinement.module.css';

type Option = { token: string; probability: number };
function nextOptions(tokens: string[]): Option[] {
  const last = tokens.at(-1);
  if (!last) return [{ token: 'We', probability: .68 }, { token: 'The', probability: .32 }];
  if (last === 'The') return [{ token: 'returns', probability: .72 }, { token: 'support', probability: .28 }];
  if (last === 'We') return [{ token: 'can', probability: .64 }, { token: 'will', probability: .36 }];
  if (last === 'returns' || last === 'support') return [{ token: 'team', probability: last === 'returns' ? .76 : .57 }, { token: 'desk', probability: last === 'returns' ? .24 : .43 }];
  if (last === 'team' || last === 'desk') return [{ token: 'can', probability: last === 'team' ? .61 : .81 }, { token: 'will', probability: last === 'team' ? .39 : .19 }];
  if (last === 'can' || last === 'will') return [{ token: 'help', probability: tokens[0] === 'We' ? .88 : .73 }, { token: 'assist', probability: tokens[0] === 'We' ? .12 : .27 }];
  if (last === 'help' || last === 'assist') return [{ token: '.', probability: .92 }, { token: '!', probability: .08 }];
  return [];
}

export function DecodingLab() {
  const { tokens: localTokens, setTokens } = useLab();
  const guided = useGuided();
  const tokens = guided?.frame.tokens ?? localTokens;
  const options = nextOptions(tokens);
  const previousChoice = tokens.length ? nextOptions(tokens.slice(0, -1)).find(option => option.token === tokens.at(-1)) : undefined;
  const complete = options.length === 0;
  const advance = () => { if (options[0]) setTokens(items => [...items, options[0].token]); };
  const { playing, setPlaying } = usePlayback(advance, complete, 1500);
  return <div className={s.lab} data-lab="decoding">
    <div className={s.decodingStage}>
      <div className={s.contextSheet}><span className={s.panelLabel}>CONTEXT</span><p>“The shoes are too small.”<br /><strong>Write a short reply.</strong></p><div className={s.tokenTray} aria-label="Generated tokens" aria-live="polite">{tokens.map((token, index) => <span key={`${index}-${token}`} className={s.freshToken}>{token}</span>)}{!complete && <i />}</div><div className={s.previousChoice}>{previousChoice && <>Previous choice: <b>{previousChoice.token}</b><span>p = {previousChoice.probability.toFixed(2)}</span></>}</div></div>
      <div className={s.decodeBridge} aria-hidden="true"><span>predict</span><b>→</b><svg viewBox="0 0 120 180"><path d="M90 15v135H15V100" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="7 5" /><path d="m6 112 9-14 9 14" fill="none" stroke="currentColor" strokeWidth="3" /></svg><span>append<br />and repeat</span></div>
      <div className={s.candidates}><h2>{complete ? 'Reply complete ✓' : 'Next token'}</h2>{!complete && <div className={s.optionList}>{options.map((option, index) => <button key={index} disabled={Boolean(guided)} style={guided ? { opacity: 1, cursor: 'default', pointerEvents: 'none' } : undefined} onClick={() => { setPlaying(false); setTokens(items => [...items, option.token]); }} aria-label={`Choose token ${option.token}`}><span>{option.token}</span><i><b style={{ transform: `scaleX(${option.probability})` }} /></i><strong>{option.probability.toFixed(2)}</strong></button>)}</div>}</div>
    </div>
    <Caption phase="DECODING">Choose a token → add it to context → predict again.</Caption>
    <Controls label="decoding" playing={playing} complete={complete} onPlay={() => { if (complete) setTokens([]); setPlaying(!playing); }} onStep={() => { setPlaying(false); advance(); }} onReset={() => { setPlaying(false); setTokens([]); }}><button disabled={!tokens.length} onClick={() => { setPlaying(false); setTokens(items => items.slice(0, -1)); }}>Undo token ←</button></Controls>
  </div>;
}

const decisionCaptions = [
  ['READY', 'Where should this message go?'],
  ['STATE', 'State = the message + relevant records and context.'],
  ['ASK', 'Each question has a predefined answer type.'],
  ['DECIDE', 'One answer for each question.'],
  ['INSPECT', 'How clear is the answer?'],
  ['ROUTE', 'Ordinary code uses the decision to choose the next step.'],
];
// These are readable display fragments, not a claim about a model's tokenizer.
const llmFragments = ['{', '"team"', ':', '"returns"', ',', '"urgency": 1.4', ',', '"wants_return": true', '}'];
const choiceOptions = [{ label: 'returns', value: .94 }, { label: 'billing', value: .04 }, { label: 'shipping', value: .02 }];
const rubric = [
  { label: 'Routine', value: .10 }, { label: 'Soon', value: .50 },
  { label: 'Same day', value: .30 }, { label: 'Urgent', value: .10 }, { label: 'Critical', value: 0 },
];

function TypedResults({ ready, active, mixed, single = false, simultaneous = false }: { ready: boolean; active: boolean; mixed: boolean; single?: boolean; simultaneous?: boolean }) {
  const cards = [
    { type: 'CHOICE', ask: 'Which team?', answer: 'returns', detail: `p = ${mixed ? '0.61' : '0.94'}` },
    { type: 'SCORE', ask: 'Urgency? 0–4', answer: mixed ? '2.1' : '1.4', detail: 'expected score' },
    { type: 'NOUL', ask: 'Wants a return?', answer: '0.96', detail: 'proposition probability' },
  ];
  return <div className={`${s.typedResults} ${simultaneous ? j.simultaneous : ''}`} data-active={active} data-single={single}>
    {(single ? cards.slice(0, 1) : cards).map((card, index) => <div key={card.type} className={s.typedCard} data-ready={ready} style={{ '--order': simultaneous ? 0 : index } as React.CSSProperties}>
      <span>{card.type}</span><p>{card.ask}</p><strong>{ready ? card.answer : '—'}</strong>
      {simultaneous && <small>{ready ? card.detail : 'predefined type'}</small>}
    </div>)}
  </div>;
}

function TypeTeaching({ selection }: { selection: number }) {
  if (selection === 1) return <div className={j.typeStage} data-type="score">
    <div className={j.typeQuestion}><span>SCORE</span><h2>How urgent<br />is this ticket?</h2><p>An ordered rubric.</p><div className={j.expected}><span>EXPECTED SCORE</span><strong>1.4</strong></div></div>
    <div className={j.scoreChart}>
      <div className={j.rubric}>{rubric.map((item, index) => <div key={item.label}><strong>{item.value.toFixed(2)}</strong><div className={j.rubricBar}><i style={{ height: `${item.value * 200}%` }} /></div><b>{index}</b><span>{item.label}</span></div>)}</div>
      <p className={j.weightedMean}>0×.10 + 1×.50 + 2×.30 + 3×.10 + 4×0 = <b>1.4</b></p>
    </div>
  </div>;
  if (selection === 2) return <div className={j.typeStage} data-type="noul">
    <div className={j.typeQuestion}><span>NOUL</span><h2>Does the user<br />want a return?</h2><p>A proposition to assess.</p></div>
    <div className={j.noul}><span>P(wants_return)</span><strong>0.96</strong><div className={j.propositionBar}><b /><i /></div><p>The output is a probability.</p></div>
  </div>;
  return <div className={j.typeStage} data-type="choice">
    <div className={j.typeQuestion}><span>CHOICE</span><h2>Which team<br />should handle it?</h2><p>A predefined set of options.</p></div>
    <div className={j.choiceChart}>{choiceOptions.map(item => <div key={item.label} data-leading={item.label === 'returns'}><span>{item.label}</span><i><b style={{ transform: `scaleX(${item.value})` }} /></i><strong>{item.value.toFixed(2)}</strong></div>)}</div>
  </div>;
}

function RoutingTrack({ mixed, arrived }: { mixed: boolean; arrived: boolean }) {
  return <div className={s.routingTrack}>
    <svg viewBox="0 0 740 210" role="img" aria-label={arrived ? mixed ? 'Ticket moved to human review' : 'Ticket moved to the reply workflow' : 'Awaiting a routing decision'}>
      <path d="M80 104h170l140-68h280M250 104l140 68h280" fill="none" stroke="#bdb9ad" strokeWidth="3" />
      {arrived && <path d={mixed ? 'M80 104h170l140 68h280' : 'M80 104h170l140-68h280'} fill="none" stroke={mixed ? '#b68d16' : '#287e6e'} strokeWidth="5" />}
      <rect x="390" y="2" width="300" height="68" fill={arrived && !mixed ? '#287e6e' : '#e4dece'} /><text x="540" y="44" textAnchor="middle" fontSize="24" fontWeight="800" fill={arrived && !mixed ? '#f2ecdc' : '#66665a'}>LLM · Draft reply</text>
      <rect x="390" y="138" width="300" height="68" fill={arrived && mixed ? '#efc84a' : '#e4dece'} /><text x="540" y="180" textAnchor="middle" fontSize="24" fontWeight="800" fill="#121518">Person · Clarify</text>
      <g className={s.routingParcel} style={{ transform: `translate(${arrived ? 365 : 78}px, ${arrived ? mixed ? 172 : 36 : 104}px)` }}><rect x="-22" y="-16" width="44" height="32" fill="#e3482d" stroke="#121518" /><path d="m-21-15 21 17 21-17" fill="none" stroke="#121518" /></g>
      <text x="48" y="152" fontSize="18" fontWeight="800">CODE · BRANCH</text>
    </svg>
  </div>;
}

export function DecisionLab({ id }: { id: string }) {
  const { decision: localDecision, setDecision } = useLab();
  const guided = useGuided();
  const decision = guided?.frame.decision ?? localDecision;
  const [localLane, setLane] = useState<'llm' | 'jev'>('jev');
  const [localType, setLocalType] = useState(0);
  const selection = guided?.frame.selection ?? localType;
  const lane = guided?.frame.decision?.lane ?? localLane;
  const compare = id === 'J3';
  const routing = id === 'J8';
  const activeLane = compare ? lane : 'jev';
  const { step, llmStep, question } = decision;
  const mixed = routing || decision.mixed;
  const jevEnd = compare || id === 'J1' || id === 'J4' ? 3 : id === 'J6' ? 4 : 5;
  const complete = activeLane === 'jev' ? step >= jevEnd : llmStep >= llmFragments.length;
  const advance = () => setDecision(value => activeLane === 'jev' ? { ...value, step: Math.min(value.step + 1, jevEnd) } : { ...value, llmStep: Math.min(value.llmStep + 1, llmFragments.length) });
  const { playing, setPlaying } = usePlayback(advance, complete, activeLane === 'jev' ? 1300 : 550);
  const ready = step >= 3;
  const reason = !routing && question === 'reason';
  const distribution = reason ? [{ label: 'wrong_size', value: 1 }, { label: 'other', value: 0 }] : mixed ? [{ label: 'returns', value: .61 }, { label: 'billing', value: .35 }, { label: 'shipping', value: .04 }] : choiceOptions;
  const reset = () => { setPlaying(false); setDecision(value => ({ ...value, step: 0, llmStep: 0 })); };
  const follow = (nextLane: 'llm' | 'jev') => { setLane(nextLane); setDecision(value => nextLane === 'llm' ? { ...value, llmStep: 0 } : { ...value, step: 0 }); setPlaying(true); };
  const caption = id === 'J4' ? ['Choice returns a distribution over predefined options.', 'Score is the expected value on an ordered rubric.', 'Noul returns a proposition’s probability.'][selection]
    : routing ? step >= 5 ? 'Jev helps choose the path; an LLM can write the reply.' : 'Two issues. Which path should the workflow take?'
    : compare ? 'Jev uses predefined answer types; no answer chaining or free-form string generation.'
    : id === 'J1' ? 'State = the input message + relevant records and context.'
    : id === 'J6' ? 'Adapted example: option probability and distribution confidence are different.'
    : step >= 5 && mixed ? 'Two issues → ordinary code sends the ticket to a person.'
    : decisionCaptions[Math.min(step, jevEnd)][1];
  return <div className={`${s.lab} ${j.decisionLab}`} data-lab="decision" data-focus={id}>
    <div className={s.sharedMessage} data-reading={step === 1}><span>SHARED STATE</span><p>The shoes are too small. Please help me return order #1048.{mixed && <mark className={s.addedIssue}> I was also charged twice.</mark>}</p>{id === 'J1' && <div className={j.record}><span>RELEVANT RECORD</span><b>Order #1048</b></div>}</div>
    {routing ? <div className={j.ambiguousRoute} data-route-ready={step >= 5}>
      <div className={j.routingChoice}><span>JEV · CHOICE</span><h2>Which team?</h2><div className={s.distributionBars} aria-label="Team probabilities">{distribution.map(item => <div key={item.label}><span>{item.label}</span><i><b style={{ transform: `scaleX(${ready ? item.value : 0})` }} /></i><strong>{ready ? item.value.toFixed(2) : '—'}</strong></div>)}</div></div>
      <div className={j.routingResult}><h2>{step >= 5 ? 'Clarify both issues.' : 'Choose the next step.'}</h2><RoutingTrack mixed={mixed} arrived={step >= 5} /></div>
    </div> : id === 'J4' ? <TypeTeaching selection={selection} /> : compare ? <div className={`${s.mechanismComparison} ${j.comparison}`}>
      <div className={s.llmLane}><div className={s.laneHeader}><span>GENERATIVE LLM</span>{!guided && <button onClick={() => follow('llm')}>Follow LLM →</button>}</div><h2>Generate text or JSON.</h2><div className={s.serialPath}><span>Context + instructions</span><b>↓ Decoding · sequential output</b></div><div className={s.jsonOutput} aria-label="LLM generated structured answer, shown as readable fragments">{llmFragments.slice(0, llmStep).map((fragment, index) => <span className={s.freshToken} key={index}>{mixed && index === 5 ? '"urgency": 2.1' : fragment}</span>)}{llmStep < llmFragments.length && <i />}</div><p>One call can answer several questions.</p></div>
      <div className={s.jevLane}><div className={s.laneHeader}><span>JEV / SYSTEM ONE</span>{!guided && <button onClick={() => follow('jev')}>Follow Jev →</button>}</div><h2>Answer defined questions.</h2><div className={j.fanLabel}>Parallel questions · shared state</div><div className={s.sharedFan} data-active={step >= 2}><svg viewBox="0 0 600 38" preserveAspectRatio="none" aria-hidden="true"><path d="M300 0v15H100v23M300 15v23M300 15h200v23" /></svg></div><TypedResults ready={ready} active={step >= 2} mixed={mixed} simultaneous /><p>Each answer uses the state, not another answer.</p></div>
    </div> : <div className={s.decisionStage}>
      {id !== 'J6' && <div className={s.questionWorkbench}><div className={s.sharedFan} data-active={step >= 2}><svg viewBox="0 0 600 38" preserveAspectRatio="none" aria-hidden="true"><path d={id === 'J1' ? 'M300 0v38' : 'M300 0v15H100v23M300 15v23M300 15h200v23'} /></svg></div><TypedResults ready={ready} active={step >= 2} mixed={mixed} single={id === 'J1'} /></div>}
      {id === 'J6' && <aside className={s.distributionPanel}><div className={s.questionSwitch} role="group" aria-label="Question to inspect"><button disabled={Boolean(guided)} style={guided ? { opacity: 1, cursor: 'default', pointerEvents: 'none' } : undefined} aria-pressed={!reason} onClick={() => setDecision(value => ({ ...value, question: 'team' }))}>Team</button><button disabled={Boolean(guided)} style={guided ? { opacity: 1, cursor: 'default', pointerEvents: 'none' } : undefined} aria-pressed={reason} onClick={() => setDecision(value => ({ ...value, question: 'reason' }))}>Return reason</button></div><div className={s.distributionBody}><div><span className={s.panelLabel}>PROBABILITY / EACH OPTION</span><div className={s.distributionBars}>{distribution.map((item, index) => <div key={index}><span>{item.label}</span><i><b style={{ transform: `scaleX(${ready ? item.value : 0})` }} /></i><strong>{ready ? item.value.toFixed(2) : '—'}</strong></div>)}</div></div>{ready && (reason || mixed) && <div className={s.confidence}><span>CONFIDENCE / DISTRIBUTION</span><strong>{reason ? '1.00' : '0.42'}</strong><p>{reason ? 'One clear answer.' : 'Split across teams.'}</p></div>}</div></aside>}
    </div>}
    <Caption phase={id === 'J4' ? ['CHOICE', 'SCORE', 'NOUL'][selection] : routing ? step >= 5 ? 'CLARIFY' : 'DECISION' : compare ? 'OUTPUT DESIGN' : decisionCaptions[Math.min(step, jevEnd)][0]}>{caption}</Caption>
    <Controls label={activeLane === 'llm' ? 'LLM path' : 'decision path'} note={compare ? 'Mechanism illustration · untimed' : 'Teaching demo'} playing={playing} complete={complete} onPlay={() => { if (complete) setDecision(value => activeLane === 'llm' ? { ...value, llmStep: 0 } : { ...value, step: 0 }); setPlaying(!playing); }} onStep={() => { setPlaying(false); advance(); }} onReset={reset}>
      {id === 'J4' ? ['Choice', 'Score', 'Noul'].map((type, index) => <button key={type} aria-pressed={selection === index} onClick={() => setLocalType(index)}>{type}</button>) : !routing && <button className={s.intervention} aria-pressed={mixed} onClick={() => { setPlaying(false); setDecision(value => ({ ...value, mixed: !value.mixed, step: 0, llmStep: 0 })); }}>{mixed ? '− Remove the second issue' : '＋ Add “charged twice”'}</button>}
    </Controls>
  </div>;
}
