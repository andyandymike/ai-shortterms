'use client';

import { useGuided } from './guided-state';
import s from './jev-output.module.css';

const teams = [{ name: 'returns', p: .94 }, { name: 'billing', p: .04 }, { name: 'shipping', p: .02 }];

function TeamAnswer({ ready }: { ready: boolean }) {
  return <div className={s.teamAnswer} aria-label="Illustrative probabilities for one Choice answer">
    {teams.map(team => <div key={team.name}><span>{team.name}</span><b>{ready ? team.p.toFixed(2) : '—'}</b><i><em style={{ width: `${ready ? team.p * 100 : 0}%` }} /></i></div>)}
  </div>;
}

export function JevQuestionsScene() {
  const step = useGuided()?.frame.decision?.step ?? 0;
  const two = step >= 3;
  return <div className={s.lesson} data-learning="jev-questions" data-step={step}>
    <div className={s.state}><span>STATE / INPUT</span><strong>“The shoes are too small. Please help me return them.”</strong></div>
    <div className={s.request}>
      <section className={s.questions}>
        <h2>You define the questions.</h2>
        <div className={s.question}><span>01 / CHOICE</span><strong>Which team should handle this?</strong><div className={s.options} aria-label="Options chosen by the developer"><b>returns</b><b>billing</b><b>shipping</b></div></div>
        {two && <div className={s.question} data-new="true"><span>02 / NOUL</span><strong>Does the customer want a return?</strong></div>}
      </section>
      <div className={s.model} aria-label="Send the request to Jev"><b>Jev</b><span aria-hidden="true">→</span></div>
      <section className={s.answers}>
        <h2>{two ? '2 questions → 2 answers' : '1 question → 1 answer'}</h2>
        <div className={s.answer}><span>01 / TEAM{step >= 2 ? ' → returns' : ''}</span><TeamAnswer ready={step >= 2} /></div>
        {two && <div className={`${s.answer} ${s.yesAnswer}`}><div><span>02 / WANTS A RETURN</span><p>Probability of yes</p></div><strong>{step >= 5 ? '0.96' : '—'}</strong></div>}
      </section>
    </div>
    <div className={s.typeShelf} aria-label="Three available answer types, not three required outputs">
      <strong>Choose a type<br />for each question.</strong>
      <div><b>Choice</b><span>Your options</span></div><div><b>Score</b><span>Your rating scale</span></div><div><b>Noul</b><span>Probability of yes</span></div>
    </div>
  </div>;
}

// Readable display chunks, not tokenizer boundaries or measured model outputs.
const fragments = ['{\n  "team": {', '\n    "returns": ', '0.94,', '\n    "billing": 0.04,', '\n    "shipping": 0.02', '\n  },', '\n  "wants_return": ', '0.96', '\n}'];

export function JevOutputScene() {
  const decision = useGuided()?.frame.decision;
  const ready = (decision?.step ?? 0) >= 3;
  const llmStep = decision?.llmStep ?? 0;
  return <div className={s.lesson} data-learning="jev-output">
    <div className={s.state}><span>SAME STATE · SAME 2 QUESTIONS</span><strong>Which team? Does the customer want a return?</strong></div>
    <div className={s.comparison}>
      <section className={s.llm}>
        <span className={s.kicker}>LLM + JSON SCHEMA</span><h2>Generate a sequence.</h2>
        <div className={s.mechanism}>Next token <b>→</b> next token <b>→</b> …</div>
        <pre aria-label="LLM output, shown as readable chunks">{fragments.slice(0, llmStep).join('')}{llmStep < fragments.length && <i className={s.cursor} />}</pre>
        <p>One request can answer both questions.</p>
      </section>
      <section className={s.jev}>
        <span className={s.kicker}>JEV / SYSTEM ONE</span><h2>Compute probabilities.</h2>
        <div className={s.mechanism}>Same state <b>↙ ↘</b> parallel questions</div>
        <div className={s.parallelAnswers} data-ready={ready}>
          <div><span>01 / WHICH TEAM?</span><TeamAnswer ready={ready} /></div>
          <div className={s.yesAnswer}><div><span>02 / WANTS A RETURN?</span><p>Probability of yes</p></div><strong>{ready ? '0.96' : '—'}</strong></div>
        </div>
        <p>The API packages these answers as JSON.</p>
      </section>
    </div>
    <div className={s.conclusion}><strong>JSON is the delivery format.</strong><span>The model’s output process is different.</span></div>
  </div>;
}
