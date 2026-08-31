'use client';

import { useMemo, useRef, useState, type CSSProperties, type RefObject } from 'react';
import moeStyles from './moe-cinema.module.css';
import moeExhibitStyles from './moe-exhibit.module.css';
import fdeStyles from './fde-cinema.module.css';
import rsiStyles from './rsi-cinema.module.css';
import distillStyles from './distillation-cinema.module.css';
import embodiedStyles from './embodied-cinema.module.css';
import closingStyles from './closing-cinema.module.css';
import openingStyles from './opening-cinema.module.css';
import closingMachineStyles from './closing-machine.module.css';
import openingMachineStyles from './opening-machine.module.css';
import modeStyles from './visual-mode.module.css';
import conceptStyles from './concept-exhibits.module.css';

export type DeckVisualStyle = 'machine' | 'exhibit';

const deckVisualModes = ['machine', 'exhibit'] as const;
const visualModeLabel: Record<DeckVisualStyle, string> = {
  machine: 'Machine',
  exhibit: 'Exhibit',
};

function VisualModeSwitch<T extends DeckVisualStyle>({
  visualStyle,
  onVisualStyleChange,
  className,
  surface,
  modes,
}: {
  visualStyle: T;
  onVisualStyleChange: (style: T) => void;
  className: string;
  surface?: DeckVisualStyle;
  modes: readonly T[];
}) {
  return (
    <div className={className} data-surface={surface} role="group" aria-label="Choose presentation visual mode">
      <span>Visual mode</span>
      {modes.map((mode) => (
        <button key={mode} type="button" aria-pressed={visualStyle === mode} onClick={() => onVisualStyleChange(mode)}>
          {visualModeLabel[mode]}
        </button>
      ))}
    </div>
  );
}

function DemoStepRail({ current, total }: { current: number; total: number }) {
  return (
    <div
      className="demo-step-rail"
      role="progressbar"
      aria-label={`Demonstration step ${current + 1} of ${total}`}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
    >
      <div
        className="demo-step-segments"
        style={{ '--demo-step-count': total } as CSSProperties}
        aria-hidden="true"
      >
        {Array.from({ length: total }, (_, index) => (
          <i
            key={index}
            data-step-state={index < current ? 'complete' : index === current ? 'current' : 'upcoming'}
          />
        ))}
      </div>
      <span aria-hidden="true">{String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
  );
}

const expertCount = 256;
const expertsActivatedPerToken = 8;

function hashText(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function illustrativeExpertsForToken(token: string) {
  const result: number[] = [];
  let seed = hashText(token.toLowerCase());

  while (result.length < expertsActivatedPerToken) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const candidate = seed % expertCount;
    if (!result.includes(candidate)) result.push(candidate);
  }

  return result;
}

const xrayTokens = ['Snow', 'looks', 'white', 'because', 'it', 'scatters', 'visible', 'light', '.'];

type RouterAct = 'dense-ready' | 'dense-run' | 'router' | 'experts' | 'mix';
type MoeScoreRow = { expert: number; score: number; mixWeight: number };
const routerActOrder: RouterAct[] = ['dense-ready', 'dense-run', 'router', 'experts', 'mix'];

const exhibitPhase: Record<RouterAct, string> = {
  'dense-ready': 'DENSE',
  'dense-run': 'COST',
  router: 'ROUTE',
  experts: 'RUN 8',
  mix: 'MIX 8 → 1',
};

const moeExhibitSummary: Record<RouterAct, string> = {
  'dense-ready': 'A dense model sends every token through one fully active feed-forward network.',
  'dense-run': 'Adding dense capacity makes every token use every added weight, increasing work per token.',
  router: 'A router scores 256 experts for one token and selects 8.',
  experts: 'Only the selected 8 experts process this token; the other 248 stay idle for it.',
  mix: 'The 8 expert outputs are weighted and mixed into one token representation.',
};

function MoeExhibit({
  act,
  currentToken,
  selectedExperts,
  scoreRows,
  routeVersion,
}: {
  act: RouterAct;
  currentToken: string;
  selectedExperts: number[];
  scoreRows: MoeScoreRow[];
  routeVersion: number;
}) {
  return (
    <div className={moeExhibitStyles.exhibit} data-act={act} role="img" aria-label={moeExhibitSummary[act]}>
      <div className={moeExhibitStyles.phaseTag}>
        <span>{String(routerActOrder.indexOf(act) + 1).padStart(2, '0')}</span>
        <strong>{exhibitPhase[act]}</strong>
      </div>

      <div className={moeExhibitStyles.tokenTicket} key={`exhibit-token-${routeVersion}`}>
        <small>JOB TICKET · ONE TOKEN</small>
        <strong>{currentToken}</strong>
        <span>keep this ticket in view</span>
      </div>

      <section className={moeExhibitStyles.denseWorkshop}>
        <header>
          <small>ONE DENSE FFN</small>
          <strong>THE WHOLE WORKSHOP</strong>
        </header>
        <div className={moeExhibitStyles.weightWall}>
          {Array.from({ length: 72 }, (_, index) => (
            <i key={index} style={{ '--exhibit-cell': `${index}` } as CSSProperties} />
          ))}
        </div>
        <div className={moeExhibitStyles.denseClaim}>
          <strong>ALL</strong>
          <span>WEIGHTS<br />ACTIVE</span>
        </div>
        <div className={moeExhibitStyles.costStrip}>
          <span>MORE CAPACITY</span><b>=</b><span>MORE WORK / TOKEN</span>
        </div>
      </section>

      <section className={moeExhibitStyles.dispatchBoard}>
        <small>ROUTER · SAMPLE SCORES</small>
        <strong>DISPATCH</strong>
        <p>score(<b>{currentToken}</b>)</p>
        <div><span>256</span><b>→</b><span>8</span></div>
        <em>PREDICT USEFUL FFNs<br />KEEP TOP 8 · FIXED BUDGET</em>
      </section>

      <section className={moeExhibitStyles.expertWall} key={`exhibit-wall-${routeVersion}`}>
        <header><strong>256</strong><span>EXPERT FFNs</span><small>candidate wall</small></header>
        <div>
          {Array.from({ length: expertCount }, (_, index) => (
            <i
              key={index}
              className={selectedExperts.includes(index) ? moeExhibitStyles.selectedPeg : undefined}
              style={{ '--exhibit-rank': `${selectedExperts.indexOf(index)}` } as CSSProperties}
            />
          ))}
        </div>
        <footer><strong>8 WORK ORDERS SENT</strong><span>248 WORKSTATIONS IDLE FOR THIS TOKEN</span></footer>
      </section>

      <div className={moeExhibitStyles.routeLines}>
        {Array.from({ length: expertsActivatedPerToken }, (_, index) => (
          <i key={index} style={{ '--exhibit-route': `${index}` } as CSSProperties} />
        ))}
      </div>

      <div className={moeExhibitStyles.expertTickets}>
        {scoreRows.map(({ expert, score, mixWeight }, index) => (
          <article
            key={expert}
            style={{
              '--exhibit-rank': `${index}`,
              '--exhibit-weight': `${mixWeight}`,
              '--exhibit-router-top': `${10 + Math.floor(index / 2) * 21}%`,
              '--exhibit-router-left': `${73 + (index % 2) * 11}%`,
              '--exhibit-expert-top': `${16 + Math.floor(index / 4) * 39}%`,
              '--exhibit-expert-left': `${24 + (index % 4) * 11}%`,
              '--exhibit-mix-top': `${14 + index * 8.4}%`,
              '--exhibit-compact-router-left': `${72 + (index % 2) * 12}%`,
              '--exhibit-compact-expert-left': `${23 + (index % 4) * 11.5}%`,
            } as CSSProperties}
          >
            <header><span>#{index + 1} · {score.toFixed(2)}</span><strong>{expert.toString().padStart(3, '0')}</strong></header>
            <div className={moeExhibitStyles.ffnOperator}><b>IN</b><i>RUN OWN W</i><b>OUT</b></div>
            <footer><span>FFN WORKSTATION</span><em>{Math.round(mixWeight * 100)}%</em></footer>
          </article>
        ))}
      </div>

      <section className={moeExhibitStyles.expertCutaway}>
        <small>OPEN ONE EXPERT WORK ORDER</small>
        <strong>ACTIVATE = RUN THIS FFN</strong>
        <div className={moeExhibitStyles.expertWorkOrder}>
          <p><span>INPUT</span><b>token context</b></p>
          <p><span>COMPUTE</span><b>use this expert&apos;s learned weights</b></p>
          <p><span>OUTPUT</span><b>new features for this token</b></p>
        </div>
        <p>THE OTHER 248 FFNs DO NO WORK FOR THIS TOKEN</p>
      </section>

      <section className={moeExhibitStyles.collator}>
        <small>ROUTER WEIGHTS</small>
        <strong>Σ</strong>
        <span>WEIGHTED MIX</span>
      </section>

      <section className={moeExhibitStyles.outputTicket}>
        <small>ONE RESULT TICKET</small>
        <strong>8 → 1</strong>
        <span>ONE TOKEN<br />REPRESENTATION</span>
        <em>continues through the model</em>
      </section>

      <aside className={moeExhibitStyles.boundaryNote}>
        <strong>AVAILABLE ≠ ACTIVE</strong>
        <span>More total capacity; only a slice computes for this token.</span>
      </aside>
    </div>
  );
}

export function RouterLab({
  visualStyle,
  onVisualStyleChange,
}: {
  visualStyle: DeckVisualStyle;
  onVisualStyleChange: (style: DeckVisualStyle) => void;
}) {
  const [act, setAct] = useState<RouterAct>('dense-ready');
  const [cursor, setCursor] = useState(3);
  const [routeVersion, setRouteVersion] = useState(0);
  const currentToken = xrayTokens[cursor];
  const selectedExperts = useMemo(
    () => illustrativeExpertsForToken(currentToken),
    [currentToken],
  );
  const scoreRows = useMemo(() => {
    const rows = selectedExperts.map((expert, index) => ({
      expert,
      score: Math.max(0.51, 0.96 - index * 0.057 - (expert % 7) * 0.002),
    }));
    const scoreTotal = rows.reduce((total, row) => total + row.score, 0);

    return rows.map((row) => ({
      ...row,
      mixWeight: row.score / scoreTotal,
    }));
  }, [selectedExperts]);

  const advanceAct = () => {
    if (act === 'dense-ready') setAct('dense-run');
    else if (act === 'dense-run') setAct('router');
    else if (act === 'router') setAct('experts');
    else if (act === 'experts') setAct('mix');
    else {
      setCursor((current) => (current + 1) % xrayTokens.length);
      setRouteVersion((current) => current + 1);
      setAct('router');
    }
  };

  const reset = () => {
    setCursor(3);
    setRouteVersion((current) => current + 1);
    setAct('dense-ready');
  };

  const actCopy: Record<RouterAct, { title: string; detail: string; action: string }> = {
    'dense-ready': {
      title: 'Dense: every token runs the same whole FFN.',
      detail: 'One token enters one large block; all of its learned weights take part.',
      action: 'Run this token',
    },
    'dense-run': {
      title: 'More dense capacity means more work on every token.',
      detail: 'Making the block bigger also makes every token more expensive to process.',
      action: 'Swap in MoE',
    },
    router: {
      title: 'A learned router ranks 256 FFNs and selects 8.',
      detail: 'The router is a small scoring step: 8 experts work while 248 stay idle.',
      action: 'Open the top eight',
    },
    experts: {
      title: 'Only the selected 8 expert FFNs execute.',
      detail: 'Each expert runs the same FFN operation with its own learned weights.',
      action: 'Combine their work',
    },
    mix: {
      title: 'Router weights mix 8 outputs into one token representation.',
      detail: 'Eight expert results are weighted, added together, and sent onward as one.',
      action: 'Try another token',
    },
  };

  const copy = actCopy[act];

  return (
    <section
      className={`${moeStyles.stage} ${visualStyle === 'exhibit' ? moeExhibitStyles.host : ''}`}
      data-act={act}
      data-visual={visualStyle}
      aria-label={`MoE demonstration for token ${currentToken}. ${copy.title} ${copy.detail}${act === 'mix' ? ' More capacity is available than active for each token.' : ''}`}
    >
      <div className={moeStyles.lightField} aria-hidden="true" />

      <header className={moeStyles.titlePlate}>
        <div><strong>MoE</strong><p>Mixture of Experts</p></div>
        <VisualModeSwitch visualStyle={visualStyle} onVisualStyleChange={onVisualStyleChange} className={moeStyles.visualSwitch} modes={deckVisualModes} />
      </header>

      <div className={moeStyles.sceneCopy} aria-live="polite" key={act}>
        <strong>{copy.title}</strong>
        <p>{copy.detail}</p>
      </div>

      <div className={moeStyles.typeSystem} aria-hidden="true">
        <div className={moeStyles.typeWord}>
          <span className={moeStyles.typeM}>M</span>
          <span className={moeStyles.typeO}>o</span>
          <span className={moeStyles.typeE}>E</span>
        </div>
        <div className={moeStyles.typeRoutes}>
          {Array.from({ length: expertsActivatedPerToken }, (_, index) => (
            <i key={index} style={{ '--type-route': `${index}` } as CSSProperties} />
          ))}
        </div>
      </div>

      {visualStyle === 'exhibit' && (
        <MoeExhibit
          act={act}
          currentToken={currentToken}
          selectedExperts={selectedExperts}
          scoreRows={scoreRows}
          routeVersion={routeVersion}
        />
      )}

      <div className={moeStyles.world}>
        <div className={moeStyles.inputRail}>
          <div key={`token-${routeVersion}`} className={moeStyles.token} aria-label={`Current token: ${currentToken}`}>
            <strong>{currentToken}</strong>
          </div>
          <i aria-hidden="true" />
        </div>

        <div className={moeStyles.transformerSlot}>
          <div className={moeStyles.denseMachine} aria-label="One dense feed-forward network in which the whole block runs for the token">
            <div className={moeStyles.denseWeights}>
              {Array.from({ length: 72 }, (_, index) => (
                <i key={index} style={{ '--cell': `${index}` } as CSSProperties} />
              ))}
            </div>
            <strong className={moeStyles.denseStatus}>100% OF THIS FFN RUNS</strong>
          </div>

          <div className={moeStyles.moeMachine} aria-label="A learned router scores the token, eight of 256 expert feed-forward networks run, and their outputs are mixed">
            <div className={moeStyles.routerPanel}>
              <div><span>LEARNED ROUTER</span><strong>score({currentToken})</strong></div>
              <div className={moeStyles.scoreList} key={`scores-${routeVersion}`}>
                {scoreRows.map(({ expert, score }, index) => (
                  <p key={expert} style={{ '--rank': `${index}`, '--score': `${score}` } as CSSProperties}>
                    <i><b /></i>
                  </p>
                ))}
              </div>
              <b className={moeStyles.topK}>KEEP TOP-K · K = 8</b>
            </div>

            <div className={moeStyles.expertBank}>
              <div className={moeStyles.bankTitle}><strong>256 EXPERT FFNs</strong></div>
              <div className={moeStyles.expertGrid} key={`bank-${routeVersion}`} aria-hidden="true">
                {Array.from({ length: expertCount }, (_, index) => (
                  <i
                    key={index}
                    className={selectedExperts.includes(index) ? moeStyles.isSelected : undefined}
                    style={{ '--expert-order': `${selectedExperts.indexOf(index)}` } as CSSProperties}
                  />
                ))}
              </div>
              <div className={moeStyles.bankCount}><p><strong>8</strong><span>RUN</span></p><i /><p><strong>248</strong><span>IDLE FOR THIS TOKEN</span></p></div>
            </div>

            <div className={moeStyles.expertLens}>
              <div className={moeStyles.lensLabel}><strong>“ACTIVATE” = EXECUTE THIS FFN</strong></div>
              <div className={moeStyles.lensCompute}>
                <div><span>IN</span>{Array.from({ length: 5 }, (_, index) => <i key={index} />)}</div>
                <b>×</b>
                <div className={moeStyles.lensMatrix}>{Array.from({ length: 25 }, (_, index) => <i key={index} style={{ '--weight-cell': `${index}` } as CSSProperties} />)}</div>
                <b>→</b>
                <div><span>OUT</span>{Array.from({ length: 5 }, (_, index) => <i key={index} />)}</div>
              </div>
            </div>

            <div className={moeStyles.mixStage}>
              <span>ROUTER WEIGHTS</span>
              <div>{scoreRows.slice(0, 4).map(({ expert, score }) => <i key={expert} style={{ '--mix-weight': `${score}` } as CSSProperties} />)}</div>
              <strong>WEIGHTED SUM</strong>
            </div>
          </div>
        </div>

        <div className={moeStyles.outputRail}><i aria-hidden="true" /></div>
      </div>

      <footer className={moeStyles.footer}>
        {act === 'mix' && (
          <div key={`proof-${act}`} className={moeStyles.meaning}>
            <div className={moeStyles.publishedProof}>
              <p><span>DEEPSEEK-V3 · TOTAL</span><strong>671B</strong><small>parameters</small></p>
              <i><b /></i>
              <p><span>ACTIVE / TOKEN</span><strong>37B</strong><small>parameters</small></p>
              <p><span>ROUTED</span><strong>8 / 256</strong><small>+ shared expert</small></p>
            </div>
          </div>
        )}

        <div className={moeStyles.controls}>
          <button onClick={reset} aria-label="Reset the MoE demonstration">Reset</button>
          <div className="demo-action-stack">
            <button data-primary onClick={advanceAct}>{copy.action}<b>→</b></button>
            <DemoStepRail current={routerActOrder.indexOf(act)} total={routerActOrder.length} />
          </div>
        </div>
      </footer>
    </section>
  );
}

type DistillationAct = 'prompt' | 'compare' | 'loss' | 'update' | 'scale' | 'exam';
const distillationActOrder: DistillationAct[] = ['prompt', 'compare', 'loss', 'update', 'scale', 'exam'];

const distillationPhase: Record<DistillationAct, string> = {
  prompt: 'ASK',
  compare: 'COMPARE',
  loss: 'MEASURE',
  update: 'UPDATE',
  scale: 'REPEAT',
  exam: 'CLOSED BOOK',
};

const distillationExhibitSummary: Record<DistillationAct, string> = {
  prompt: 'A large teacher creates a worked answer while a smaller student predicts independently.',
  compare: 'The teacher answer is compared with the student output token by token.',
  loss: 'Their difference becomes an error score called loss.',
  update: 'The loss nudges only the student learned settings, called weights.',
  scale: 'The update repeats across 800 thousand curated lessons.',
  exam: 'The teacher is offline and the trained student answers a new question alone.',
};

function DistillationExhibit({ act }: { act: DistillationAct }) {
  const targetTokens = ['120', '÷', '1.5', '=', '80'];
  const studentTokens = ['120', '÷', '1.5', '=', '90'];

  return (
    <div className={`${conceptStyles.exhibit} ${conceptStyles.distillExhibit}`} data-act={act} role="img" aria-label={distillationExhibitSummary[act]}>
      <div className={conceptStyles.phaseTag}>
        <span>{String(distillationActOrder.indexOf(act) + 1).padStart(2, '0')}</span>
        <strong>{distillationPhase[act]}</strong>
      </div>

      <div className={conceptStyles.lessonPrompt}>
        <small>ONE TRAINING QUESTION</small>
        <strong>120 km ÷ 1.5 h = ?</strong>
      </div>

      <section className={conceptStyles.teacherFolder}>
        <header><span>TEACHER · DATA FACTORY</span><strong>DeepSeek-R1</strong></header>
        <div className={conceptStyles.teacherTarget}>
          <small>TEACHER ANSWER (&quot;TARGET&quot;)</small>
          <p>speed = distance ÷ time</p>
          <strong>120 ÷ 1.5 = <b>80 km/h</b></strong>
          <em>worked answer becomes training data</em>
        </div>
        <footer>CREATES THE LESSON · DOES NOT ENTER THE STUDENT</footer>
      </section>

      <section className={conceptStyles.studentFolder}>
        <header><span>SMALLER STUDENT</span><strong>Qwen2.5-32B</strong></header>
        <div className={conceptStyles.studentAttempt}>
          <small>ITS OWN PREDICTION</small>
          <p>speed = distance ÷ time</p>
          <strong>120 ÷ 1.5 = <b>90 km/h?</b></strong>
        </div>
        <div className={conceptStyles.studentWeights}>
          <small>LEARNED SETTINGS (&quot;WEIGHTS&quot;) · THE ONLY THING THAT CHANGES</small>
          <div>{Array.from({ length: 24 }, (_, index) => <i key={index} />)}</div>
        </div>
      </section>

      <section className={conceptStyles.compareBench}>
        <header><span>WHAT THE STUDENT LEARNS FROM</span><strong>TEACHER ANSWER vs STUDENT OUTPUT</strong></header>
        <div className={conceptStyles.tokenRows}>
          <p><small>TEACHER TARGET</small>{targetTokens.map((token, index) => <b key={`exhibit-target-${token}-${index}`} data-different={index === 4}>{token}</b>)}</p>
          <p><small>STUDENT OUTPUT</small>{studentTokens.map((token, index) => <b key={`exhibit-student-${token}-${index}`} data-wrong={index === 4}>{token}</b>)}</p>
        </div>
        <div className={conceptStyles.lossStamp}><span>DIFFERENCE</span><b>→</b><strong>ERROR SCORE (&quot;LOSS&quot;)</strong></div>
        <div className={conceptStyles.learningReceipt}>
          <header><span>AFTER ONE TINY UPDATE</span><strong>WHICH ANSWER BECOMES MORE LIKELY?</strong></header>
          <p data-correct><span>80 km/h · teacher answer</span><b>21%</b><i>→</i><strong>48%</strong></p>
          <p data-wrong><span>90 km/h · student mistake</span><b>62%</b><i>→</i><strong>35%</strong></p>
          <footer>The student did not copy the teacher; its own next-token probabilities changed.</footer>
        </div>
      </section>

      <div className={conceptStyles.updateTrack}>
        <span>ERROR SCORE GIVES A DIRECTION</span><i /><strong>NUDGE LEARNED SETTINGS</strong><b>↗</b>
      </div>

      <section className={conceptStyles.curriculumPress}>
        <div className={conceptStyles.seedLesson}><span>ONE WORKED LESSON</span><strong>question → teacher answer</strong></div>
        <b>×</b>
        <div className={conceptStyles.lessonStack}>
          {Array.from({ length: 36 }, (_, index) => <i key={index} />)}
          <strong>800K</strong><span>CURATED LESSONS</span>
        </div>
        <i>→</i>
        <div className={conceptStyles.trainedBinder}><span>TRAINED STUDENT</span><strong>R1-Distill-Qwen-32B</strong><small>behavior stored in its own weights</small></div>
      </section>

      <section className={conceptStyles.examDesk}>
        <div className={conceptStyles.closedTeacher}><span>TEACHER</span><strong>DeepSeek-R1</strong><b>OFFLINE</b><small>no runtime call</small></div>
        <div className={conceptStyles.examQuestion}><span>NEW QUESTION</span><strong>210 km ÷ 3 h = ?</strong></div>
        <div className={conceptStyles.examStudent}><span>STUDENT · ALONE</span><strong>70 km/h</strong><small>answers from its updated weights</small></div>
      </section>

      <aside className={conceptStyles.distillBoundary}>
        <strong>NOT MODEL COMPRESSION BY COPYING WEIGHTS</strong>
        <span>The student learns from teacher-created targets, then runs by itself.</span>
      </aside>
    </div>
  );
}

export function DistillationLab() {
  const [act, setAct] = useState<DistillationAct>('prompt');

  const advanceAct = () => {
    if (act === 'prompt') setAct('compare');
    else if (act === 'compare') setAct('loss');
    else if (act === 'loss') setAct('update');
    else if (act === 'update') setAct('scale');
    else if (act === 'scale') setAct('exam');
    else setAct('prompt');
  };

  const actCopy: Record<DistillationAct, { title: string; action: string }> = {
    prompt: {
      title: 'Use a large teacher to create lessons; run a smaller student alone.',
      action: 'Ask both models',
    },
    compare: {
      title: 'Compare the student output with the teacher answer.',
      action: 'Measure the difference',
    },
    loss: {
      title: 'The mismatch becomes an error score—called “loss.”',
      action: 'Update the student',
    },
    update: {
      title: 'That score nudges the student’s learned settings—its “weights.”',
      action: 'Repeat at scale',
    },
    scale: {
      title: 'Repeat tiny updates across 800K curated examples.',
      action: 'Close the textbook',
    },
    exam: {
      title: 'At runtime, the teacher is gone; the student answers alone.',
      action: 'Replay the lesson',
    },
  };

  const copy = actCopy[act];
  const studentIsTrained = act === 'scale' || act === 'exam';
  const studentLabel = act === 'update' ? 'STUDENT · 1 TINY UPDATE' : studentIsTrained ? 'TRAINED STUDENT' : 'BASE STUDENT';
  const targetTokens = ['120', '÷', '1.5', '=', '80'];
  const studentTokens = ['120', '÷', '1.5', '=', '90'];

  return (
    <section className={`${distillStyles.stage} ${conceptStyles.host} ${conceptStyles.distillHost}`} data-act={act} aria-label={`Knowledge distillation demonstration. ${copy.title}`}>

      <header className={distillStyles.titlePlate}>
        <div><strong>DISTILL</strong><p>Knowledge Distillation</p></div>
      </header>

      <div className={distillStyles.sceneCopy} aria-live="polite" key={act}>
        <strong>{copy.title}</strong>
      </div>

      <DistillationExhibit act={act} />

      <div className={`${distillStyles.world} ${conceptStyles.legacyWorld}`}>
        <div className={distillStyles.promptStrip}>
          <span>{act === 'exam' ? 'NEW · CLOSED BOOK' : 'TRAINING PROMPT'}</span>
          <strong>{act === 'exam' ? '210 km ÷ 3 h = ?' : '120 km ÷ 1.5 h = ?'}</strong>
        </div>

        <div className={distillStyles.lessonStage}>
          <article className={`${distillStyles.model} ${distillStyles.teacher}`}>
            <div className={distillStyles.modelHead}><span>TEACHER</span><strong>DeepSeek-R1</strong><small>large reasoning model</small></div>
            <div className={distillStyles.outputSheet}>
              <span>GENERATED TARGET</span>
              <p>speed = distance ÷ time</p>
              <strong>120 ÷ 1.5 = <b>80 km/h</b></strong>
              <small>answer + method + check</small>
            </div>
            <b className={distillStyles.offline}>OFFLINE AFTER DATA CREATION</b>
          </article>

          <div className={distillStyles.comparisonRail} aria-hidden="true">
            <i /><b>⇄</b><i />
          </div>

          <article className={`${distillStyles.model} ${distillStyles.student}`}>
            <div className={distillStyles.modelHead}>
              <span>{studentLabel}</span>
              <strong>{studentIsTrained ? 'R1-Distill-Qwen-32B' : 'Qwen2.5-32B'}</strong>
              <small>the smaller model</small>
            </div>
            <div className={distillStyles.studentMind}>
              <div className={distillStyles.outputSheet}>
                <span>STUDENT ATTEMPT</span>
                <p>speed = distance ÷ time</p>
                <strong>120 ÷ 1.5 = <b>90 km/h?</b></strong>
                <small>its own next-token prediction</small>
              </div>
              <div className={distillStyles.weightBank} aria-label="The student's trainable weights">
                <span>STUDENT WEIGHTS</span>
                <div>{Array.from({ length: 24 }, (_, index) => <i key={index} style={{ '--weight-cell': `${index}` } as CSSProperties} />)}</div>
              </div>
            </div>
          </article>

          <div className={distillStyles.lossLens} aria-label="The teacher target and student attempt are compared to produce a training loss">
            <span>TOKEN-BY-TOKEN COMPARISON</span>
            <div className={distillStyles.tokenCompare}>
              <p><small>TARGET</small>{targetTokens.map((token, index) => <b key={`target-${token}-${index}`} className={index === 4 ? distillStyles.targetToken : undefined}>{token}</b>)}</p>
              <p><small>STUDENT</small>{studentTokens.map((token, index) => <b key={`student-${token}-${index}`} className={index === 4 ? distillStyles.wrongToken : undefined}>{token}</b>)}</p>
            </div>
            <div className={distillStyles.probabilityShift}>
              <p><span>P(80)</span><i><b /></i><strong>{act === 'update' ? '23%' : '22%'}</strong></p>
              <p><span>P(90)</span><i><b /></i><strong>{act === 'update' ? '40%' : '41%'}</strong></p>
            </div>
            <div className={distillStyles.lossResult}><span>DIFFERENCE</span><b>→</b><strong>TRAINING LOSS</strong></div>
            <small>one example gives a direction, not instant mastery</small>
          </div>

          <div className={distillStyles.gradientTrack} aria-hidden="true"><span>gradient</span><i /><b>↗</b></div>
        </div>

        <div className={distillStyles.scaleScene} aria-label="One worked example becomes part of 800,000 curated training samples">
          <div className={distillStyles.seedLesson}><span>ONE EXAMPLE</span><strong>prompt → target</strong><small>answer + method</small></div>
          <b className={distillStyles.multiply}>×</b>
          <div className={distillStyles.curriculum}>
            <div>{Array.from({ length: 30 }, (_, index) => <i key={index} style={{ '--sample': `${index}` } as CSSProperties}><b /><b /><b /></i>)}</div>
            <p><span>TEACHER-GENERATED CURRICULUM</span><strong>800K</strong><small>curated samples used to fine-tune the student</small></p>
          </div>
          <div className={distillStyles.trainingArrow}><span>many small gradient steps</span><i /><b>→</b></div>
          <div className={distillStyles.trainedStudent}><span>ONLY THIS MODEL CHANGES</span><strong>R1-Distill-Qwen-32B</strong><small>new behavior stored in its own weights</small></div>
        </div>

        <div className={distillStyles.examScene}>
          <div className={distillStyles.teacherGone}><span>TEACHER</span><strong>DeepSeek-R1</strong><b>OFFLINE</b><small>no runtime call</small></div>
          <div className={distillStyles.closedBook}><span>UPDATED STUDENT</span><strong>210 ÷ 3 = <b>70 km/h</b></strong><small>new question · answer from its own weights</small></div>
        </div>
      </div>

      <footer className={distillStyles.footer}>
        {act === 'exam' && (
          <div className={distillStyles.meaning} key={act}>
            <div className={distillStyles.publishedProof} aria-label="Published AIME 2024 scores">
              <p><span>TEACHER</span><strong>79.8</strong><small>AIME 2024</small></p>
              <i><b /></i>
              <p><span>32B STUDENT</span><strong>72.6</strong><small>AIME 2024</small></p>
              <p><span>SIZE</span><strong>671B → 32B</strong><small>selected behavior, not everything</small></p>
            </div>
          </div>
        )}
        <div className={distillStyles.controls}>
          <button onClick={() => setAct('prompt')} disabled={act === 'prompt'} aria-label="Reset the distillation demonstration">Reset</button>
          <div className="demo-action-stack">
            <button data-primary onClick={advanceAct}><span>{copy.action}</span><b>→</b></button>
            <DemoStepRail current={distillationActOrder.indexOf(act)} total={distillationActOrder.length} />
          </div>
        </div>
      </footer>
    </section>
  );
}

type EmbodiedAct = 'world-now' | 'world-rollout' | 'world-forms' | 'vla-gap' | 'vla-control' | 'vla-proof';
const embodiedActOrder: EmbodiedAct[] = ['world-now', 'world-rollout', 'world-forms', 'vla-gap', 'vla-control', 'vla-proof'];

const embodiedCopy: Record<EmbodiedAct, { title: string; action: string }> = {
  'world-now': {
    title: 'A World Model asks: what changes if I take this action?',
    action: 'Predict one step',
  },
  'world-rollout': {
    title: 'Each simulated future becomes the next input—uncertainty grows.',
    action: 'Show what gets built',
  },
  'world-forms': {
    title: 'World Models predict consequences; VLA is a different system for acting.',
    action: 'Switch to VLA',
  },
  'vla-gap': {
    title: 'A sentence names the goal; a body still needs precise movement.',
    action: 'Ground the instruction',
  },
  'vla-control': {
    title: 'A VLA turns vision + language into action chunks.',
    action: 'Watch a real run',
  },
  'vla-proof': {
    title: 'Physical AI must recover when reality disagrees.',
    action: 'Replay the chapter',
  },
};

const embodiedPhase: Record<EmbodiedAct, string> = {
  'world-now': 'OBSERVE + ACT',
  'world-rollout': 'ROLL FORWARD',
  'world-forms': 'WHAT GETS BUILT',
  'vla-gap': 'WORDS ≠ MOTION',
  'vla-control': 'GROUND + CONTROL',
  'vla-proof': 'ACT + CHECK',
};

function EmbodiedExhibit({
  act,
  worldVideoRef,
  vlaVideoRef,
}: {
  act: EmbodiedAct;
  worldVideoRef: RefObject<HTMLVideoElement | null>;
  vlaVideoRef: RefObject<HTMLVideoElement | null>;
}) {
  const isWorld = act.startsWith('world');

  return (
    <div className={`${conceptStyles.exhibit} ${conceptStyles.embodiedExhibit}`} data-act={act} data-phase={isWorld ? 'world' : 'vla'} role="img" aria-label={embodiedCopy[act].title}>
      <div className={conceptStyles.phaseTag}>
        <span>{String(embodiedActOrder.indexOf(act) + 1).padStart(2, '0')}</span>
        <strong>{embodiedPhase[act]}</strong>
      </div>

      <section className={conceptStyles.worldForecastDesk}>
        <div className={conceptStyles.currentPostcard}>
          <div className={conceptStyles.worldPhoto} />
          <span>CURRENT OBSERVATION · t</span>
          <strong>robot on a street</strong>
        </div>
        <div className={conceptStyles.worldActionTicket}><span>ACTION</span><strong>↑</strong><small>move forward</small></div>
        <div className={conceptStyles.futureFilm}>
          <header><span>WORLD MODEL</span><strong>WHAT COULD HAPPEN NEXT?</strong></header>
          {[
            ['A', 'forward · clear', 'LIKELY'],
            ['B', 'drift · left', 'POSSIBLE'],
            ['C', 'contact · curb', 'RISK'],
          ].map(([id, label, confidence], branch) => (
            <article key={id} data-selected={branch === 0}>
              <b>{id}</b>
              <div>{['t+1', 't+2', 't+3'].map((frame, index) => <i key={frame} style={{ '--frame': index, '--branch': branch } as CSSProperties}><small>{act === 'world-now' ? '?' : frame}</small></i>)}</div>
              <p><strong>{label}</strong><span>{confidence}</span></p>
            </article>
          ))}
          <footer>SIMULATED FUTURES · NOT OBSERVATIONS · UNCERTAINTY GROWS <b>↺</b></footer>
        </div>
      </section>

      <section className={conceptStyles.worldFormsDesk}>
        <div className={conceptStyles.predictionCatalog}>
          <header><span>A WORLD MODEL BUILDS A PREDICTIVE STATE</span><strong>NOT NECESSARILY A VIDEO</strong></header>
          <article className={conceptStyles.pixelRepresentation}><b>01</b><span>PIXELS / VIDEO</span><div>{['t', 't+1', 't+2'].map(frame => <i key={frame}>{frame}</i>)}</div><small>future camera-like frames</small></article>
          <article className={conceptStyles.stateReceipt}><b>02</b><span>INTERNAL STATE</span><dl><div><dt>ROBOT</dt><dd>center lane</dd></div><div><dt>MOTION</dt><dd>forward</dd></div><div><dt>CURB</dt><dd>1.2 m</dd></div></dl><small>numbers a planner can use</small></article>
          <article className={conceptStyles.sceneMap}><b>03</b><span>OBJECTS / GEOMETRY</span><div><i>ROBOT</i><i>ROAD</i><strong>CURB · 1.2 m</strong></div><small>a labeled map for planning</small></article>
        </div>
        <div className={conceptStyles.worldRecording}>
          <video ref={worldVideoRef} autoPlay loop muted playsInline preload="auto" poster="/media/genie3-proof.png">
            <source src="/media/genie3-interaction.mp4" type="video/mp4" />
          </video>
          <p><span>OFFICIAL RECORDING</span><strong>GENIE 3</strong><small>an interactive generated world</small></p>
        </div>
        <aside><strong>PREDICTIVE MAP ≠ PERFECT PHYSICS</strong><span>Useful for planning; still an approximation.</span></aside>
      </section>

      <section className={conceptStyles.vlaGapDesk}>
        <div className={conceptStyles.languageCard}><span>LANGUAGE MODEL</span><strong>“Put the orange block in the tray.”</strong><small>a sentence · not motor control</small></div>
        <b className={conceptStyles.gapMark}>≠</b>
        <div className={conceptStyles.physicalBench}>
          <span>THE BODY STILL NEEDS ANSWERS</span>
          <div className={conceptStyles.groundingPhoto}><b>TARGET</b><i>OBSTACLE</i><strong>TRAY</strong></div>
          <div className={conceptStyles.burdenTickets}>{['WHERE?', 'CLEAR PATH?', 'HOW HARD?', 'WHEN STOP?'].map((item) => <i key={item}>{item}</i>)}</div>
        </div>
      </section>

      <section className={conceptStyles.vlaControlDesk}>
        <div className={conceptStyles.robotObservation}>
          <header><span>OBSERVATION · 01</span><strong>LIVE CAMERA</strong></header>
          <div><b>ORANGE BLOCK</b><i>OBSTACLE</i><strong>TRAY</strong></div>
          <footer><span>GOAL</span><strong>put block in tray</strong></footer>
        </div>
        <div className={conceptStyles.controlWorkOrder}>
          <header><span>VLA CONTROL WORK ORDER</span><strong>ACTION OUTPUT · NOT A SENTENCE</strong></header>
          <ol>{['REACH target', 'ALIGN gripper', 'GRIP block', 'LIFT + move'].map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong><b>{index < 3 ? 'NEXT' : 'CHECK'}</b></li>)}</ol>
          <footer>Each action changes the next camera frame.</footer>
        </div>
        <div className={conceptStyles.robotOutcome}>
          <header><span>OBSERVATION · 02</span><strong>AFTER THE ACTION CHUNK</strong></header>
          <div><b>BLOCK MOVED</b><strong>TRAY</strong></div>
          <footer><span>CHECK RECEIPT</span><p><b>target reached?</b><strong>YES</strong></p><p><b>collision?</b><strong>NO</strong></p></footer>
        </div>
        <div className={conceptStyles.verificationReceipt}><span>NEW CAMERA FRAME + JOINT STATE</span><strong>COMPARE WITH GOAL → CORRECT THE NEXT ACTION</strong><b>↺</b></div>
      </section>

      <section className={conceptStyles.vlaProofDesk}>
        <div className={conceptStyles.vlaRecording}>
          <video ref={vlaVideoRef} autoPlay loop muted playsInline preload="auto" poster="/media/gemini-robotics2-proof.png">
            <source src="/media/gemini-robotics2-wholebody.webm" type="video/webm" />
          </video>
          <p><span>OFFICIAL RECORDING</span><strong>GEMINI ROBOTICS 2</strong></p>
        </div>
        <div className={conceptStyles.recoveryStrip}>
          {['OBSERVE', 'ACT', 'CHECK', 'CORRECT'].map((item, index) => <p key={item}><span>0{index + 1}</span><strong>{item}</strong></p>)}
          <b>↺</b>
        </div>
        <aside><strong>THE HARD PART IS REALITY</strong><span>Objects move, grasps fail, and the model must re-observe instead of finishing a sentence.</span></aside>
      </section>
    </div>
  );
}

export function EmbodiedLab() {
  const [act, setAct] = useState<EmbodiedAct>('world-now');
  const worldVideoRef = useRef<HTMLVideoElement>(null);
  const vlaVideoRef = useRef<HTMLVideoElement>(null);
  const isWorld = act.startsWith('world');
  const copy = embodiedCopy[act];

  const restartVideo = (video: HTMLVideoElement | null) => {
    if (!video) return;
    video.currentTime = 0;
    void video.play().catch(() => {
      // The poster remains visible when autoplay or decoding is unavailable.
    });
  };

  const advanceAct = () => {
    if (act === 'world-now') setAct('world-rollout');
    else if (act === 'world-rollout') {
      restartVideo(worldVideoRef.current);
      setAct('world-forms');
    } else if (act === 'world-forms') setAct('vla-gap');
    else if (act === 'vla-gap') setAct('vla-control');
    else if (act === 'vla-control') {
      restartVideo(vlaVideoRef.current);
      setAct('vla-proof');
    } else {
      restartVideo(worldVideoRef.current);
      setAct('world-now');
    }
  };

  const reset = () => {
    restartVideo(worldVideoRef.current);
    restartVideo(vlaVideoRef.current);
    setAct('world-now');
  };

  return (
    <section
      className={`${embodiedStyles.stage} ${conceptStyles.host}`}
      data-act={act}
      data-phase={isWorld ? 'world' : 'vla'}
      aria-label="Presenter-led causal x-ray of a world model and a vision-language-action model"
    >
      <header className={embodiedStyles.titlePlate}>
        <div><strong>{isWorld ? 'WORLD' : 'VLA'}</strong><p>{isWorld ? 'World Model' : 'Vision · Language · Action'}</p></div>
      </header>

      <div className={embodiedStyles.sceneCopy} aria-live="polite" key={act}>
        <strong>{copy.title}</strong>
      </div>

      <EmbodiedExhibit act={act} worldVideoRef={worldVideoRef} vlaVideoRef={vlaVideoRef} />

      <div className={`${embodiedStyles.world} ${conceptStyles.legacyWorld}`}>
        <div className={embodiedStyles.worldChapter} aria-hidden={!isWorld}>
          <div className={embodiedStyles.nowScene}>
            <div className={embodiedStyles.currentObservation}>
              <div className={embodiedStyles.observationImage} role="img" aria-label="A generated robot standing in a city street" />
              <span>CURRENT OBSERVATION · t</span>
              <div className={embodiedStyles.visionCaption}><strong>“robot on a street”</strong></div>
            </div>

            <div className={embodiedStyles.actionTicket}><span>ACTION</span><strong>↑</strong><small>move forward</small></div>

            <div className={embodiedStyles.unwrittenFuture}>
              <strong>What changes after ↑ ?</strong>
              <div>{['t + 1', 't + 2', 't + 3'].map((label) => <i key={label}><b>?</b><small>{label}</small></i>)}</div>
            </div>
          </div>

          <div className={embodiedStyles.rolloutScene}>
            <div className={embodiedStyles.rolloutEquation}><span>WORLD MODEL</span><strong>state<sub>t</sub> + action<sub>t</sub></strong><b>→</b><strong>state<sub>t+1</sub></strong></div>
            <div className={embodiedStyles.branchBoard}>
              <div className={embodiedStyles.presentFrame}><span>NOW</span><i /><strong>t</strong></div>
              <div className={embodiedStyles.branchStem} aria-hidden="true"><i /><i /><i /></div>
              {[
                { id: 'A', label: 'forward · clear', confidence: 'LIKELY' },
                { id: 'B', label: 'drift · left', confidence: 'POSSIBLE' },
                { id: 'C', label: 'contact · curb', confidence: 'RISK' },
              ].map((future, index) => (
                <div key={future.id} className={`${embodiedStyles.futureBranch} ${index === 0 ? embodiedStyles.selectedFuture : ''}`} style={{ '--future': `${index}` } as CSSProperties}>
                  <span>FUTURE {future.id}</span>
                  <div>{['t+1', 't+2', 't+3'].map((frame, step) => <i key={frame} style={{ '--step': `${step}` } as CSSProperties}><small>{frame}</small></i>)}</div>
                  <strong>{future.label}</strong><small>{future.confidence}</small>
                </div>
              ))}
            </div>
            <div className={embodiedStyles.worldLoop}><span>↺</span><strong>Chosen prediction becomes the next “now.”</strong></div>
          </div>

          <div className={embodiedStyles.worldForms}>
            <div className={embodiedStyles.formCatalog}>
              <article>
                <span>VISUAL</span><strong>Pixels / video</strong><div className={embodiedStyles.pixelStrip}><i /><i /><i /></div>
              </article>
              <article>
                <span>COMPACT</span><strong>Latent state</strong><div className={embodiedStyles.latentMap}>{Array.from({ length: 24 }, (_, index) => <i key={index} style={{ '--cell': `${index}` } as CSSProperties} />)}</div>
              </article>
              <article>
                <span>STRUCTURED</span><strong>Objects / geometry</strong><div className={embodiedStyles.objectMap}><i /><i /><i /><b /></div>
              </article>
            </div>

            <div className={embodiedStyles.worldProof}>
              <video muted playsInline preload="none" poster="/media/genie3-proof.png" aria-label="Official Genie 3 interactive generated-world recording">
                <source src="/media/genie3-interaction.mp4" type="video/mp4" />
              </video>
              <div><span><i /> OFFICIAL RECORDING</span><strong>GENIE 3</strong><small>an interactive world generated as a person moves</small></div>
            </div>
            <p className={embodiedStyles.worldBoundary}>A useful predictive map—not a perfect copy of reality or guaranteed physics.</p>
          </div>
        </div>

        <div className={embodiedStyles.vlaChapter} aria-hidden={isWorld}>
          <div className={embodiedStyles.vlaGap}>
            <div className={embodiedStyles.chatAnswer}>
              <span>LANGUAGE MODEL</span>
              <p>“Pick up the orange block.”</p>
            </div>

            <div className={embodiedStyles.notEqual}>≠</div>

            <div className={embodiedStyles.physicalTask}>
              <span>PHYSICAL TASK</span>
              <div className={embodiedStyles.workcell}>
                <div className={embodiedStyles.arm}><i /><i /><i /><b /></div>
                <b className={embodiedStyles.orangeBlock}>TARGET</b>
                <b className={embodiedStyles.blueObstacle}>OBSTACLE</b>
                <b className={embodiedStyles.goalTray}>TRAY</b>
              </div>
              <div className={embodiedStyles.burdenRail}>
                {['3D GROUNDING', 'COLLISION', 'FORCE + TIMING', 'BODY LIMITS'].map((item) => <b key={item}>{item}</b>)}
              </div>
            </div>
          </div>

          <div className={embodiedStyles.vlaControl}>
            <div className={embodiedStyles.sensorStack}>
              <div className={embodiedStyles.cameraView}>
                <span>VISION · LIVE CAMERA</span><i className={embodiedStyles.targetBox}>TARGET · x42 y61 z18</i><i className={embodiedStyles.obstacleBox}>OBSTACLE</i>
              </div>
              <div className={embodiedStyles.goalTicket}><span>LANGUAGE GOAL</span><strong>“Put the orange block in the tray.”</strong></div>
            </div>

            <div className={embodiedStyles.vlaCore}><span>GROUND + PLAN</span><strong>VLA</strong><small>scene + goal → action chunk</small><i /><i /><i /></div>

            <div className={embodiedStyles.actionProgram}>
              <span>ACTION OUTPUT · NOT A SENTENCE</span>
              <div>{[
                'REACH',
                'ALIGN',
                'GRIP',
                'LIFT',
              ].map((label, index) => <p key={label} style={{ '--chunk': `${index}` } as CSSProperties}><strong>{label}</strong></p>)}</div>
            </div>

            <div className={embodiedStyles.robotResult}>
              <span>BODY</span><div className={embodiedStyles.controlArm}><i /><i /><i /><b /></div><strong>movement changes the scene</strong>
            </div>

            <div className={embodiedStyles.feedbackTrack}><span>NEW CAMERA FRAME + JOINT STATE</span><i /><b>↺</b><strong>check result · correct next action</strong></div>
          </div>

          <div className={embodiedStyles.vlaProof}>
            <div className={embodiedStyles.vlaRecording}>
              <video muted playsInline preload="none" poster="/media/gemini-robotics2-proof.png" aria-label="Official Gemini Robotics 2 whole-body robot recording">
                <source src="/media/gemini-robotics2-wholebody.webm" type="video/webm" />
              </video>
              <span><i /> OFFICIAL RECORDING · GEMINI ROBOTICS 2</span>
            </div>
            <div className={embodiedStyles.realityChecklist}>
              <span>WHY THIS IS HARDER THAN CHAT</span>
              <p><b>GROUNDING</b><strong>Which object? Where in 3D?</strong></p>
              <p><b>CONTROL</b><strong>Many timed actions—not one answer.</strong></p>
              <p><b>FEEDBACK</b><strong>The next camera frame may disagree.</strong></p>
              <p><b>CONSEQUENCE</b><strong>Errors touch the physical world.</strong></p>
            </div>
          </div>
        </div>
      </div>

      <footer className={embodiedStyles.footer}>
        <div className={embodiedStyles.controls}>
          <button onClick={reset} disabled={act === 'world-now'} aria-label="Reset the World Model and VLA demonstration">Reset</button>
          <div className="demo-action-stack">
            <button data-primary onClick={advanceAct}><span>{copy.action}</span><b>→</b></button>
            <DemoStepRail current={embodiedActOrder.indexOf(act)} total={embodiedActOrder.length} />
          </div>
        </div>
      </footer>
    </section>
  );
}

type WorldAction = -1 | 0 | 1;

const actionCopy: Record<WorldAction, string> = {
  [-1]: 'PUSH LEFT',
  [0]: 'WAIT',
  [1]: 'PUSH RIGHT',
};

export function WorldLab() {
  const [position, setPosition] = useState(0.46);
  const [action, setAction] = useState<WorldAction>(1);
  const [selectedFuture, setSelectedFuture] = useState(1);
  const [turn, setTurn] = useState(0);
  const [fallen, setFallen] = useState(false);

  const futures = useMemo(() => {
    const force = action * 0.19;
    return [-0.055, 0, 0.055].map((variation, index) => {
      const next = position + force + variation;
      return {
        index,
        position: next,
        fallen: next < 0.04 || next > 0.96,
        label: index === 0 ? 'LOW' : index === 1 ? 'LIKELY' : 'HIGH',
      };
    });
  }, [action, position]);

  const currentX = 80 + Math.min(1, Math.max(0, position)) * 640;
  const commit = () => {
    if (fallen) return;
    const future = futures[selectedFuture];
    setPosition(Math.min(0.99, Math.max(0.01, future.position)));
    setFallen(future.fallen);
    setTurn((current) => current + 1);
  };

  const reset = () => {
    setPosition(0.46);
    setAction(1);
    setSelectedFuture(1);
    setTurn(0);
    setFallen(false);
  };

  return (
    <div className="live-lab world-lab" aria-label="Interactive toy dynamics lab">
      <div className="lab-head">
        <div><span>LIVE LAB</span><strong>Toy world model</strong></div>
        <small>Real calculations in-browser · not a trained AI model</small>
      </div>

      <div className="world-controls" role="group" aria-label="Choose an action">
        {([-1, 0, 1] as WorldAction[]).map((value) => (
          <button
            key={value}
            aria-pressed={action === value}
            onClick={() => {
              setAction(value);
              setSelectedFuture(1);
            }}
            disabled={fallen}
          >
            {actionCopy[value]}
          </button>
        ))}
      </div>

      <div className="world-canvas">
        <svg viewBox="0 0 800 260" role="img" aria-label="Current object position and three computed future positions">
          <line className="table-line" x1="80" y1="152" x2="720" y2="152" />
          <line className="table-edge" x1="80" y1="152" x2="80" y2="184" />
          <line className="table-edge" x1="720" y1="152" x2="720" y2="184" />
          <text className="svg-label" x="80" y="34">STATE t={turn}</text>
          {!fallen && futures.map((future, index) => {
            const clamped = Math.min(1, Math.max(0, future.position));
            const futureX = 80 + clamped * 640;
            const futureY = future.fallen ? 214 : 152;
            return (
              <g key={`${turn}-${action}-${index}`} className={selectedFuture === index ? 'predicted-path is-selected' : 'predicted-path'}>
                <path d={`M ${currentX} 138 Q ${(currentX + futureX) / 2} ${72 + index * 18} ${futureX} ${futureY - 14}`} />
                <circle cx={futureX} cy={futureY - 14} r="14" />
              </g>
            );
          })}
          <circle className={fallen ? 'current-object is-fallen' : 'current-object'} cx={currentX} cy={fallen ? 214 : 138} r="19" />
        </svg>
        {fallen ? <p className="world-alert">The object fell. The consequence is now part of the state.</p> : null}
      </div>

      <div className="future-picker" role="group" aria-label="Choose a predicted future to commit">
        {futures.map((future, index) => (
          <button
            key={future.label}
            aria-pressed={selectedFuture === index}
            onClick={() => setSelectedFuture(index)}
            disabled={fallen}
          >
            <span>{future.label}</span>
            <strong>{future.fallen ? 'FALL' : `${Math.round(future.position * 100)}%`}</strong>
          </button>
        ))}
      </div>

      <div className="lab-foot world-foot">
        <button className="lab-action" onClick={commit} disabled={fallen}>Commit selected future</button>
        <button className="lab-secondary" onClick={reset}>Reset world</button>
        <small>Real example · Genie 3 generates interactive worlds; this toy only explains the planning idea.</small>
      </div>
    </div>
  );
}

const vlaCommands = [
  { id: 'banana', sentence: 'Put the banana in the basket.', object: 'BANANA', destination: 'BASKET' },
  { id: 'cube', sentence: 'Move the blue cube to the tray.', object: 'BLUE CUBE', destination: 'TRAY' },
] as const;

export function VlaLab() {
  const [commandIndex, setCommandIndex] = useState(0);
  const [executed, setExecuted] = useState(false);
  const command = vlaCommands[commandIndex];

  const chooseCommand = (index: number) => {
    setCommandIndex(index);
    setExecuted(false);
  };

  return (
    <div className="live-lab vla-live-lab" aria-label="Interactive toy vision language action lab">
      <div className="lab-head">
        <div><span>LIVE LAB</span><strong>Instruction → scene state</strong></div>
        <small>Toy parser + motion · not Gemini Robotics</small>
      </div>

      <div className="command-switch" role="group" aria-label="Choose a robot instruction">
        {vlaCommands.map((item, index) => (
          <button key={item.id} aria-pressed={commandIndex === index} onClick={() => chooseCommand(index)}>
            {item.sentence}
          </button>
        ))}
      </div>

      <div className="vla-live-body">
        <div className="vla-inspector">
          <div><span>VISION</span><p>banana · cube<br />basket · tray</p></div>
          <div><span>LANGUAGE</span><p>object: <b>{command.object}</b><br />goal: <b>{command.destination}</b></p></div>
          <div className={executed ? 'is-complete' : ''}><span>ACTION</span><p>{executed ? 'executed' : 'ready to run'}</p></div>
        </div>

        <div className="vla-live-scene" aria-label="Robot work surface with two objects and two destinations">
          <span className={`vla-live-object live-banana ${executed && command.id === 'banana' ? 'to-basket' : ''}`}>BANANA</span>
          <span className={`vla-live-object live-cube ${executed && command.id === 'cube' ? 'to-tray' : ''}`}>CUBE</span>
          <span className="vla-destination live-basket">BASKET</span>
          <span className="vla-destination live-tray">TRAY</span>
          <span className={`live-gripper ${executed ? `follow-${command.id}` : ''}`} aria-hidden="true" />
        </div>
      </div>

      <div className="lab-foot vla-live-foot">
        <button className="lab-action" onClick={() => setExecuted(true)} disabled={executed}>Execute action</button>
        <button className="lab-secondary" onClick={() => setExecuted(false)}>Reset scene</button>
        <small>Real example · Gemini Robotics turns visual information and instructions into motor commands.</small>
      </div>
    </div>
  );
}

const fdeActs = [
  {
    title: 'Looks perfect because the company is outside the frame.',
    action: 'Add the company',
  },
  {
    title: 'Production is a system problem—not only a model problem.',
    action: 'Find the gap',
  },
  {
    title: 'FDE owns the crossing from product to customer reality.',
    action: 'Compare the roles',
  },
  {
    title: 'Same tools; FDE owns a different scope: the end-to-end outcome.',
    action: 'Close the loop',
  },
  {
    title: 'Field friction becomes product learning: trace, test, fix, reuse.',
    action: 'Next: RSI',
  },
];

const fdePhase = ['DEMO FRAME', 'REAL COMPANY', 'BRIDGE', 'OWNERSHIP', 'FIELD → PRODUCT'];

function FdeExhibit({ step }: { step: number }) {
  return (
    <div className={`${conceptStyles.exhibit} ${conceptStyles.fdeExhibit}`} data-step={step} role="img" aria-label={fdeActs[step]?.title ?? 'Forward deployed engineering demonstration'}>
      <div className={conceptStyles.phaseTag}>
        <span>{String(step + 1).padStart(2, '0')}</span>
        <strong>{fdePhase[step]}</strong>
      </div>

      <section className={conceptStyles.demoFrame}>
        <header><span>THE DEMO FRAME</span><strong>clean input → clean answer</strong></header>
        <div className={conceptStyles.demoPipeline}>
          <article><small>INPUT</small><strong>W-2.pdf</strong><span>complete</span></article>
          <i>→</i><div><strong>AI</strong><small>extract + map</small></div><i>→</i>
          <article><small>SCHEDULE E</small><strong>ALL FIELDS MAPPED</strong><b>PASS</b></article>
        </div>
        <footer>FORWARD DEPLOYED = CLOSE TO THE CUSTOMER&apos;S LIVE WORKFLOW</footer>
      </section>

      <div className={conceptStyles.hiddenCompany}>
        <span>MASKED OUT OF THE DEMO</span>
        {['SYSTEMS', 'PERMISSIONS', 'WORKFLOW', 'DOMAIN JUDGEMENT'].map((item) => <b key={item}>{item}</b>)}
      </div>

      <section className={conceptStyles.companyBlueprint}>
        <header><span>MONDAY · CUSTOMER REALITY</span><strong>THE INPUT IS A WORKFLOW</strong></header>
        <div className={conceptStyles.realityTickets}>
          <article><span>EMAIL</span><strong>“See my note…”</strong><small>context in prose</small></article>
          <article><span>SHEET</span><strong>RENTAL.xlsx</strong><small>multiple properties</small></article>
          <article><span>LEGACY API</span><strong>READ ONLY</strong><small>permission denied</small></article>
          <article><span>HANDWRITTEN</span><strong>rental days: 46</strong><small>domain judgement</small></article>
        </div>
        <div className={conceptStyles.productionReceipt}>
          <span>TAX AI · PRODUCTION</span>
          <p><b>Rental income</b><strong>MAPPED</strong></p>
          <p><b>Other expenses</b><strong>MAPPED</strong></p>
          <p data-missing><b>Fair-rental-day field</b><strong>MISSING</strong></p>
          <em>“The source says 46 days.”</em>
        </div>
        <footer><span>MODEL</span><b>×</b><span>DATA</span><b>×</b><span>ACCESS</span><b>×</b><span>WORKFLOW</span><b>×</b><span>PEOPLE</span></footer>
      </section>

      <section className={conceptStyles.fdeBridgeDesk}>
        <div className={conceptStyles.productCrate}><span>PRODUCT RELEASE KIT</span><strong>TAX AI · 4.2</strong><p><b>MODEL</b><b>API</b><b>PLATFORM</b><b>BASE EVALS</b></p><footer>BUILT ONCE FOR MANY</footer></div>
        <section className={conceptStyles.fieldCaseFile}>
          <header><span>FDE FIELD CASE · CRETE</span><strong>MAKE THIS LIVE WORKFLOW SUCCEED</strong></header>
          <div className={conceptStyles.caseProblem}><span>CUSTOMER ISSUE</span><strong>“Fair-rental-day field is missing.”</strong><small>production trace · source says 46 days</small></div>
          <ol>
            <li><span>01</span><strong>OBSERVE</strong><small>sit with the real workflow</small></li>
            <li><span>02</span><strong>INTEGRATE</strong><small>connect access + data</small></li>
            <li><span>03</span><strong>DEPLOY</strong><small>train, test, earn adoption</small></li>
          </ol>
          <footer><span>RETURN TO PRODUCT</span><strong>NEW EVAL + INTEGRATION PATTERN + PR</strong></footer>
        </section>
        <div className={conceptStyles.customerDesk}><span>CUSTOMER WORKFLOW</span><p><b>EMAIL</b><b>SHEET</b><b>LEGACY API</b><b>DOMAIN RULE</b></p><strong>46 DAYS</strong><footer>WORKS IN PRODUCTION</footer></div>
      </section>

      <section className={conceptStyles.roleBlueprint}>
        <header><span>SAME TOOLS · DIFFERENT OWNERSHIP</span><strong>WHO IS ACCOUNTABLE FOR WHAT?</strong></header>
        <article><span>PRODUCT ENGINEER</span><strong>Reusable capability</strong><div><b>PATCH</b><b>TARGETED EVAL</b></div><small>turns the 46-day miss into a reusable product change</small></article>
        <article data-fde><span>FORWARD DEPLOYED ENGINEER</span><strong>End-to-end outcome</strong><div><b>PRODUCTION TRACE</b><b>INTEGRATION</b><b>DEPLOY CHECK</b></div><small>gets the live customer workflow working</small><b>OWNS THE CROSSING</b></article>
        <article><span>DOMAIN EXPERT</span><strong>Ground truth</strong><div><b>SOURCE · 46 DAYS</b><b>CORRECT ✓</b></div><small>signs off what the right answer means</small></article>
      </section>

      <section className={conceptStyles.fieldLoopDesk}>
        <div className={conceptStyles.fieldEvidence}><span>FIELD EVIDENCE</span><strong>46 days was missed</strong><small>correction + production trace</small></div>
        <ol>
          {[
            ['01', 'TRACE', 'what happened?'],
            ['02', 'PATTERN', 'does it repeat?'],
            ['03', 'TARGETED EVAL', 'make it testable'],
            ['04', 'FIX → PRODUCT', 'review · deploy back'],
          ].map(([number, label, detail]) => <li key={label}><span>{number}</span><strong>{label}</strong><small>{detail}</small></li>)}
        </ol>
        <div className={conceptStyles.fdeProof}><span>OPENAI × CRETE · PUBLISHED CASE</span><p><strong>25%</strong><b>→</b><strong>86%</strong></p><small>returns reaching ≥75% correct fields · six weeks</small></div>
      </section>
    </div>
  );
}

export function FdeLab({
  step,
  onAdvance,
  onReset,
}: {
  step: number;
  onAdvance: () => void;
  onReset: () => void;
}) {
  const safeStep = Math.min(Math.max(step, 0), fdeActs.length - 1);
  const act = fdeActs[safeStep];

  return (
    <section className={`${fdeStyles.stage} ${conceptStyles.host} ${conceptStyles.fdeHost}`} data-step={safeStep} aria-label="Presenter-led Tax AI field feedback story">

      <header className={fdeStyles.identity}>
        <span>FDE</span>
        <p><strong>Forward Deployed Engineer</strong><small>Works beside the live customer workflow.</small></p>
      </header>

      <div className={fdeStyles.beat} aria-live="polite">
        <strong>{act.title}</strong>
      </div>

      <FdeExhibit step={safeStep} />

      <div className={`${fdeStyles.world} ${conceptStyles.legacyWorld}`}>
        <section className={`${fdeStyles.scene} ${fdeStyles.demoScene}`} aria-hidden={safeStep !== 0}>
          <div className={fdeStyles.cleanPipeline} aria-label="A clean tax document produces a clean answer">
            <article className={fdeStyles.paperInput}>
              <span>INPUT</span><strong>W-2.pdf</strong><small>clean · familiar · complete</small>
            </article>
            <div className={fdeStyles.signalArrow}><i /><i /><i /><b>→</b></div>
            <div className={fdeStyles.aiCore}><span>AI</span><strong>MODEL</strong><small>extract + map</small></div>
            <div className={fdeStyles.signalArrow}><i /><i /><i /><b>→</b></div>
            <article className={fdeStyles.cleanOutput}>
              <span>SCHEDULE E</span><b>PASS</b><strong>All demo fields mapped</strong>
            </article>
          </div>
          <div className={fdeStyles.removedReality} aria-label="Company context excluded from the demo">
            <span>REMOVED FROM THE DEMO</span>
            {['SYSTEMS', 'PERMISSIONS', 'WORKFLOW', 'DOMAIN JUDGEMENT'].map((item) => <b key={item}>{item}</b>)}
          </div>
        </section>

        <section className={`${fdeStyles.scene} ${fdeStyles.collisionScene}`} aria-hidden={safeStep !== 1}>
          <span className={fdeStyles.mondayWord} aria-hidden="true">MONDAY</span>
          <div className={fdeStyles.sourcePile} aria-label="Real customer inputs">
            <article><span>EMAIL</span><strong>“See my note…”</strong><small>context in prose</small></article>
            <article><span>SHEET</span><strong>RENTAL.xlsx</strong><small>multiple properties</small></article>
            <article><span>LEGACY API</span><strong>READ ONLY</strong><small>permission denied</small></article>
            <article><span>HANDWRITTEN</span><strong>rental days: 46</strong><small>domain judgement</small></article>
          </div>
          <div className={fdeStyles.collisionPath} aria-hidden="true"><i /><i /><i /><b>→</b></div>
          <div className={fdeStyles.productionOutput} aria-label="Tax AI production result with a missing field">
            <header><span>TAX AI · PRODUCTION</span><b>REVIEW</b></header>
            <p><span>Rental income</span><b>MAPPED</b></p>
            <p><span>Other expenses</span><b>MAPPED</b></p>
            <p className={fdeStyles.missingField}><span>Fair-rental-day field</span><b>MISSING</b></p>
          </div>
          <div className={fdeStyles.impactFlash} aria-hidden="true">!</div>
          <div className={fdeStyles.fieldTicket}>
            <span>PRACTITIONER CORRECTION</span>
            <strong>“The source says 46 days.”</strong>
          </div>
          <div className={fdeStyles.realityRail}>
            <span>MODEL</span><b>×</b><span>DATA</span><b>×</b><span>ACCESS</span><b>×</b><span>WORKFLOW</span><b>×</b><span>PEOPLE</span>
          </div>
        </section>

        <section className={`${fdeStyles.scene} ${fdeStyles.faultScene}`} aria-hidden={safeStep !== 2}>
          <div className={`${fdeStyles.worldSide} ${fdeStyles.productSide}`}>
            <span>PRODUCT CORE</span>
            <strong>Build once for many customers</strong>
            <div><b>MODEL</b><b>API</b><b>PLATFORM</b><b>EVALS</b></div>
            <article className={fdeStyles.sidePerson}><i /><em /><p><b>PRODUCT ENGINEER</b><small>owns reusable capability</small></p></article>
          </div>
          <div className={fdeStyles.faultLine} aria-label="The last-mile gap between product and customer reality">
            <i /><i /><i />
            <span>THE LAST MILE</span>
          </div>
          <div className={`${fdeStyles.worldSide} ${fdeStyles.customerSide}`}>
            <span>CUSTOMER REALITY</span>
            <strong>Make one real workflow succeed</strong>
            <div><b>LEGACY</b><b>ACCESS</b><b>RULES</b><b>ADOPTION</b></div>
            <article className={fdeStyles.sidePerson}><i /><em /><p><b>DOMAIN EXPERT</b><small>owns what “correct” means</small></p></article>
          </div>
          <div className={fdeStyles.bridge} aria-label="FDE bridging product and customer reality">
            <span>DISCOVER</span><i /><b>FDE</b><i /><span>DEPLOY</span>
          </div>
        </section>

        <section className={`${fdeStyles.scene} ${fdeStyles.rolesScene}`} aria-hidden={safeStep !== 3}>
          <div className={fdeStyles.roleRail}>
            <article className={fdeStyles.productRole}>
              <span>PRODUCT ENGINEER</span>
              <strong>Reusable capability</strong>
            </article>
            <div className={fdeStyles.roleConnector} aria-hidden="true"><i /><b>↔</b><i /></div>
            <article className={fdeStyles.fdeRole}>
              <span>FORWARD DEPLOYED ENGINEER</span>
              <strong>End-to-end outcome</strong>
              <p><b>Adoption + workflow impact</b></p>
            </article>
            <div className={fdeStyles.roleConnector} aria-hidden="true"><i /><b>↔</b><i /></div>
            <article className={fdeStyles.domainRole}>
              <span>DOMAIN EXPERT</span>
              <strong>Ground truth</strong>
            </article>
          </div>
        </section>

        <section className={`${fdeStyles.scene} ${fdeStyles.payoffScene}`} aria-hidden={safeStep !== 4}>
          <div className={fdeStyles.learningLoop} aria-label="A field correction becomes reusable product learning">
            <div className={fdeStyles.evidenceTicket}><span>FIELD EVIDENCE</span><strong>46 days was missed</strong><small>correction + production trace</small></div>
            <ol>
              {[
                ['01', 'TRACE', 'What happened?'],
                ['02', 'PATTERN', 'Does it repeat?'],
                ['03', 'TARGETED EVAL', 'Make it testable'],
                ['04', 'FIX + REVIEW', 'Prove before rollout'],
              ].map(([number, label, detail]) => (
                <li key={label}><span>{number}</span><b>{label}</b><small>{detail}</small></li>
              ))}
            </ol>
          </div>
          <div className={fdeStyles.caseProof} aria-label="Published Tax AI case results">
            <span>OPENAI × CRETE · PUBLISHED CASE</span>
            <p className={fdeStyles.volume}><small>RETURNS PROCESSED</small><strong>7,000</strong></p>
            <div className={fdeStyles.proofChange}>
              <p><small>RETURNS REACHING ≥75% CORRECT FIELDS</small><strong>25%</strong></p>
              <b>→</b>
              <p><small>AFTER SIX WEEKS</small><strong>86%</strong></p>
            </div>
          </div>
        </section>
      </div>

      <footer className={fdeStyles.footer}>
        <div className={fdeStyles.controls}>
          <button type="button" onClick={onReset} disabled={safeStep === 0}>Reset</button>
          <div className="demo-action-stack">
            <button data-primary type="button" onClick={onAdvance}><span>{act.action}</span><b>→</b></button>
            <DemoStepRail current={safeStep} total={fdeActs.length} />
          </div>
        </div>
      </footer>
    </section>
  );
}

type RsiAct = 'mirror' | 'builder' | 'selection' | 'impact' | 'recursive';
const rsiActOrder: RsiAct[] = ['mirror', 'builder', 'selection', 'impact', 'recursive'];

const rsiPhase: Record<RsiAct, string> = {
  mirror: 'OUTPUT ≠ BUILDER',
  builder: 'SEARCH INSIDE A BOX',
  selection: 'TEST + SELECT',
  impact: 'INSTALL ONE WINNER',
  recursive: 'WHAT MUST RECURSE?',
};

const rsiExhibitSummary: Record<RsiAct, string> = {
  mirror: 'Self-correction changes one answer but leaves the AI-building process unchanged.',
  builder: 'In a demonstrated bounded system, humans lock the goal and evaluator while AI searches candidate code changes.',
  selection: 'Candidates must remain correct before a faster candidate can become the next seed.',
  impact: 'AlphaEvolve improved one training kernel by 23 percent, reducing whole-run time by about 1 percent.',
  recursive: 'Full recursive self-improvement would require lasting, inherited, compounding gains across successor models and remains unproven.',
};

function RsiExhibit({ act }: { act: RsiAct }) {
  return (
    <div className={`${conceptStyles.exhibit} ${conceptStyles.rsiExhibit}`} data-act={act} role="img" aria-label={rsiExhibitSummary[act]}>
      <div className={conceptStyles.phaseTag}>
        <span>{String(rsiActOrder.indexOf(act) + 1).padStart(2, '0')}</span>
        <strong>{rsiPhase[act]}</strong>
      </div>

      <div className={conceptStyles.rsiStatusBar}>
        <span>BOUNDED OPTIMIZATION · DEMONSTRATED</span>
        <strong>FULL RSI · UNPROVEN</strong>
      </div>

      <section className={conceptStyles.rsiMirrorDesk}>
        <div className={conceptStyles.sameModelToken}><span>SAME MODEL</span><strong>AI</strong></div>
        <div className={conceptStyles.answerCards}>
          <article><span>ANSWER · V1</span><strong>42 days</strong><small>CHECK</small></article><i>→</i>
          <article><span>ANSWER · V2</span><strong>46 days</strong><small>FIXED</small></article>
        </div>
        <b className={conceptStyles.rsiNotEqual}>≠</b>
        <div className={conceptStyles.builderBlueprint}><span>AI BUILDER · VERSION 1</span><div>{['training.py', 'data pipeline', 'eval suite', 'model recipe'].map(item => <p key={item}><b>{item}</b><small>UNCHANGED</small></p>)}</div><strong>BUILDER FILES DID NOT CHANGE</strong><small>A corrected answer is useful—but it is not a new way to build the next model.</small></div>
      </section>

      <section className={conceptStyles.builderLabDesk}>
        <header><span>HUMAN-DEFINED BOX</span><strong>AI SEARCHES · EVALUATOR DECIDES</strong></header>
        <div className={conceptStyles.fixedLocks}>
          <article><b>LOCKED</b><span>GOAL</span><strong>Make training code faster</strong></article>
          <article><b>LOCKED</b><span>EVALUATOR</span><strong>Same answer + lower time</strong></article>
        </div>
        <div className={conceptStyles.patchPress}>
          <div><span>AI GENERATES</span><strong>many code ideas</strong></div><i>→</i>
          <p><b>PATCH 01</b><b>PATCH 02</b><b>PATCH 03</b></p><i>→</i>
          <div><span>AUTO EVALUATOR</span><strong>run · verify · time</strong></div>
        </div>
        <footer>OBJECTIVE SIGNAL · NOT THE AI&apos;S OPINION</footer>
      </section>

      <section className={conceptStyles.selectionBench}>
        <header><span>ILLUSTRATIVE TEST BENCH</span><strong>CORRECT FIRST · THEN FASTER</strong></header>
        <div className={conceptStyles.gateLabels}><span>CORRECT?</span><span>FASTER?</span></div>
        <div className={conceptStyles.patchCards}>
          <article><span>BASELINE</span><strong>100 ms</strong><small>correct</small><b>SEED</b></article>
          <article><span>PATCH A</span><strong>94 ms</strong><small>correct</small><b>PASS</b></article>
          <article data-reject><span>PATCH B</span><strong>69 ms</strong><small>wrong answer</small><b>REJECT</b></article>
          <article data-winner><span>PATCH C</span><strong>86 ms</strong><small>correct</small><b>NEW BEST</b></article>
        </div>
        <footer>WINNER BECOMES THE NEXT SEED <b>↺</b></footer>
      </section>

      <section className={conceptStyles.impactBench}>
        <div className={conceptStyles.winningPatch}><span>WINNING PATCH</span><strong>install into one training kernel</strong><b>↓</b></div>
        <div className={conceptStyles.kernelBlock}><span>TRAINING</span><strong>KERNEL</strong><small>one tool inside the AI factory</small></div>
        <div className={conceptStyles.jobOutcome}><span>SAME TRAINING JOB</span><strong>LESS TIME + COMPUTE</strong></div>
        <div className={conceptStyles.rsiProof}><span>GOOGLE DEEPMIND · ALPHAEVOLVE</span><p><b>ONE KERNEL</b><strong>+23%</strong><small>faster</small></p><i>→</i><p><b>WHOLE RUN</b><strong>−1%</strong><small>time</small></p></div>
      </section>

      <section className={conceptStyles.recursiveRig}>
        <article className={conceptStyles.modelRelease}>
          <header><span>MODEL RELEASE</span><b>N</b></header>
          <strong>AI · N</strong>
          <p><span>answers tasks</span><b>YES</b></p>
          <p><span>builder changed</span><b>NO</b></p>
        </article>
        <section className={conceptStyles.builderLedger}>
          <header><span>VERSIONED BUILDER MANUAL</span><strong>BUILDER · v1</strong></header>
          <div>{['TRAINING CODE', 'DATA PROCESS', 'EVALS', 'MODEL RECIPE'].map((item) => <b key={item}>{item}</b>)}</div>
          <article><span>WINNING CHANGE INSTALLED</span><strong>builder v1 → v2</strong><small>lasting only if the build process itself changes</small></article>
          <footer>MODEL N+1 IS BUILT FROM THIS NEW VERSION</footer>
        </section>
        <article className={conceptStyles.successorRelease}>
          <header><span>MODEL RELEASE</span><b>N+1</b></header>
          <strong>AI · N+1</strong>
          <p><span>inherits builder v2</span><b>YES</b></p>
          <aside><span>NEXT CHANGE REQUEST</span><strong>Can N+1 improve builder v2 again?</strong></aside>
        </article>
        <footer className={conceptStyles.recursiveCriteria}>{['LASTING', 'INHERITED', 'COMPOUNDING'].map((item) => <p key={item}><strong>{item}</strong><small>{item === 'LASTING' ? 'builder version changes' : item === 'INHERITED' ? 'successor uses it' : 'successor improves it again'}</small></p>)}</footer>
      </section>
    </div>
  );
}

export function RsiLab() {
  const [act, setAct] = useState<RsiAct>('mirror');

  const advance = () => {
    if (act === 'mirror') setAct('builder');
    else if (act === 'builder') setAct('selection');
    else if (act === 'selection') setAct('impact');
    else if (act === 'impact') setAct('recursive');
    else setAct('mirror');
  };

  const copy: Record<RsiAct, { title: string; action: string }> = {
    mirror: {
      title: 'Self-correction changes one answer; full RSI would change the builder.',
      action: 'Open the builder',
    },
    builder: {
      title: 'In demonstrated systems, humans lock the goal and evaluator.',
      action: 'Release candidates',
    },
    selection: {
      title: 'Generate → test → select → repeat.',
      action: 'Install the winner',
    },
    impact: {
      title: 'AlphaEvolve improved one training tool—not the whole model.',
      action: 'Ask what recurses',
    },
    recursive: {
      title: 'Full RSI must compound across successors—and remains unproven.',
      action: 'Replay',
    },
  };

  const current = copy[act];

  return (
    <section className={`${rsiStyles.stage} ${conceptStyles.host}`} data-act={act} aria-label={`RSI workshop. ${current.title}`}>

      <header className={rsiStyles.identity}>
        <span>RSI</span>
        <p><strong>Recursive Self-Improvement</strong></p>
      </header>

      <div className={rsiStyles.beat} aria-live="polite">
        <strong>{current.title}</strong>
      </div>

      <RsiExhibit act={act} />

      <div className={`${rsiStyles.world} ${conceptStyles.legacyWorld}`}>
        <section className={`${rsiStyles.scene} ${rsiStyles.mirrorScene}`} aria-hidden={act !== 'mirror'}>
          <div className={rsiStyles.aiSubject} aria-label="The same AI revises one answer">
            <div className={rsiStyles.aiHead}><i /><i /><i /><b>AI</b><span /></div>
            <strong>SAME MODEL</strong>
          </div>
          <div className={rsiStyles.answerStack}>
            <article><span>ANSWER · V1</span><strong>42 days</strong><b>CHECK</b></article>
            <i>→</i>
            <article><span>ANSWER · V2</span><strong>46 days</strong><b>FIXED</b></article>
          </div>
          <div className={rsiStyles.notEqual}>≠</div>
          <div className={rsiStyles.sealedBuilder} aria-label="The AI-building process did not change">
            <div><i /><i /><i /><b>AI<br />BUILDER</b></div>
            <span>NO LASTING CHANGE</span>
          </div>
        </section>

        <section className={`${rsiStyles.scene} ${rsiStyles.builderScene}`} aria-hidden={act !== 'builder'}>
          <div className={rsiStyles.humanFrame}>
            <div className={rsiStyles.frameLabel}>HUMAN-DEFINED BOX</div>
            <div className={`${rsiStyles.humanLock} ${rsiStyles.goalLock}`}><i /><p><span>GOAL</span><strong>Make training code faster</strong></p></div>
            <div className={`${rsiStyles.humanLock} ${rsiStyles.evalLock}`}><i /><p><span>EVALUATOR</span><strong>Same answer + lower time</strong></p></div>
            <div className={rsiStyles.factory} aria-label="AI generates candidates that a fixed evaluator can test">
              <div className={rsiStyles.factoryAi}><div className={rsiStyles.miniHead}><i /><i /><b>AI</b></div><span>GENERATE</span><small>many code ideas</small></div>
              <div className={rsiStyles.candidateBelt}><i /><b>PATCH 01</b><b>PATCH 02</b><b>PATCH 03</b><i /></div>
              <div className={rsiStyles.evaluatorCore}><span>AUTO</span><strong>EVALUATOR</strong><small>run · verify · time</small></div>
              <div className={rsiStyles.scoreOutlet}><span>SCORE</span><strong>objective signal</strong><small>not the AI&apos;s opinion</small></div>
            </div>
          </div>
        </section>

        <section className={`${rsiStyles.scene} ${rsiStyles.selectionScene}`} aria-hidden={act !== 'selection'}>
          <div className={rsiStyles.selectionHeader}>
            <span>ILLUSTRATIVE RUNTIMES</span>
          </div>
          <div className={rsiStyles.candidateRace} aria-label="Three candidate patches pass through correctness and speed gates">
            <div className={rsiStyles.raceGates} aria-hidden="true"><span>CORRECT?</span><span>FASTER?</span></div>
            <article className={rsiStyles.candidateBase}><span>BASELINE</span><strong>100 ms</strong><small>correct</small><b>SEED</b></article>
            <article className={rsiStyles.candidateOkay}><span>PATCH A</span><strong>94 ms</strong><small>correct</small><b>PASS</b></article>
            <article className={rsiStyles.candidateWrong}><span>PATCH B</span><strong>69 ms</strong><small>wrong answer</small><b>REJECT</b></article>
            <article className={rsiStyles.candidateWinner}><span>PATCH C</span><strong>86 ms</strong><small>correct</small><b>NEW BEST</b></article>
            <div className={rsiStyles.correctnessGate}><i /></div>
            <div className={rsiStyles.speedGate}><i /></div>
          </div>
          <div className={rsiStyles.selectionReturn}><span>the winner becomes the next seed</span><i /><i /><i /><b>↺</b></div>
        </section>

        <section className={`${rsiStyles.scene} ${rsiStyles.impactScene}`} aria-hidden={act !== 'impact'}>
          <div className={rsiStyles.impactWorkshop}>
            <div className={rsiStyles.installedPatch}><span>WINNING PATCH</span><strong>install into training kernel</strong><i>↓</i></div>
            <div className={rsiStyles.kernelMachine} aria-label="A code patch improves one training kernel">
              <i /><i /><i />
              <span>TRAINING</span><strong>KERNEL</strong><small>one tool inside the AI factory</small>
            </div>
            <div className={rsiStyles.trainingOutcome}><span>SAME TRAINING JOB</span><i>→</i><strong>LESS TIME + COMPUTE</strong></div>
          </div>
          <div className={rsiStyles.realProof} aria-label="Reported AlphaEvolve training result">
            <span>GOOGLE DEEPMIND · ALPHAEVOLVE</span>
            <p><small>ONE GEMINI TRAINING KERNEL</small><strong>+23%</strong><b>FASTER</b></p>
            <i>→</i>
            <p><small>WHOLE TRAINING RUN</small><strong>−1%</strong><b>TIME</b></p>
          </div>
        </section>

        <section className={`${rsiStyles.scene} ${rsiStyles.recursiveScene}`} aria-hidden={act !== 'recursive'}>
          <div className={rsiStyles.recursiveLoop} aria-label="A hypothetical successor loop required for full recursive self-improvement">
            <article className={rsiStyles.generationModel}>
              <span>MODEL N</span><div className={rsiStyles.generationHead}><i /><i /><b>AI</b></div>
            </article>
            <div className={rsiStyles.loopArrow}><span>IMPROVES</span><i /><i /><i /><b>→</b></div>
            <article className={rsiStyles.builderCore}>
              <span>AI BUILDER</span><div><i /><i /><i /></div>
            </article>
            <div className={rsiStyles.loopArrow}><span>BUILDS</span><i /><i /><i /><b>→</b></div>
            <article className={`${rsiStyles.generationModel} ${rsiStyles.nextModel}`}>
              <span>MODEL N+1</span><div className={rsiStyles.generationHead}><i /><i /><b>AI+</b></div>
            </article>
            <div className={rsiStyles.compoundReturn}><span>must become better at improving the next builder</span><b>↺</b></div>
          </div>
          <div className={rsiStyles.recursiveConditions}>
            <p><strong>LASTING</strong><small>the builder changes</small></p>
            <p><strong>INHERITED</strong><small>the successor benefits</small></p>
            <p><strong>COMPOUNDING</strong><small>the successor improves again</small></p>
          </div>
          <div className={rsiStyles.unprovenStamp}><span>FULL RSI</span><strong>UNPROVEN</strong></div>
        </section>
      </div>

      <footer className={rsiStyles.footer}>
        <div className={rsiStyles.controls}>
          <button onClick={() => setAct('mirror')} disabled={act === 'mirror'}>Reset</button>
          <div className="demo-action-stack">
            <button data-primary onClick={advance}><span>{current.action}</span><b>→</b></button>
            <DemoStepRail current={rsiActOrder.indexOf(act)} total={rsiActOrder.length} />
          </div>
        </div>
      </footer>
    </section>
  );
}

const fieldKitQuestions = [
  { number: '01', label: 'WHY NOW?', question: 'What bottleneck created it?', tone: 'red' },
  { number: '02', label: 'MECHANISM', question: 'What actually changes?', tone: 'teal' },
  { number: '03', label: 'PROOF', question: 'Where does it work today?', tone: 'yellow' },
  { number: '04', label: 'BOUNDARY', question: 'What still does not work?', tone: 'ink' },
];

export function ClosingLab({
  visualStyle,
  onVisualStyleChange,
}: {
  visualStyle: DeckVisualStyle;
  onVisualStyleChange: (style: DeckVisualStyle) => void;
}) {
  if (visualStyle === 'machine') {
    return (
      <section className={closingMachineStyles.stage} aria-label="A machine-mode decoder for understanding the next AI acronym">
        <VisualModeSwitch key="visual-mode-switch" visualStyle={visualStyle} onVisualStyleChange={onVisualStyleChange} className={modeStyles.switcher} surface="machine" modes={deckVisualModes} />
        <div className={closingMachineStyles.ambient} aria-hidden="true" />
        <div className={closingMachineStyles.grid} aria-hidden="true" />

        <header className={closingMachineStyles.heading}>
          <span>AI TERM DECODER</span>
          <h2>How to read the next AI acronym.</h2>
          <p>Scan the change—not the letters.</p>
        </header>

        <main className={closingMachineStyles.scanner}>
          <article className={closingMachineStyles.intake}>
            <span>INCOMING TERM</span><strong>XYZ</strong><small>LABEL ONLY</small>
          </article>
          <section className={closingMachineStyles.scanTunnel} aria-label="Four checks for decoding a new AI term">
            {fieldKitQuestions.map((item) => (
              <article key={item.number} data-tone={item.tone}>
                <span>{item.number}</span><strong>{item.label}</strong><p>{item.question}</p><b>CHECK</b>
              </article>
            ))}
            <i aria-hidden="true" />
          </section>
          <aside className={closingMachineStyles.output}>
            <span>OUTPUT</span><strong>EXPLAINED</strong><p>Why it exists.<br />What changes.<br />Where it works.<br />What remains.</p><em>NO INITIALS NEEDED</em>
          </aside>
        </main>
      </section>
    );
  }

  return (
    <section className={closingStyles.stage} aria-label="A field kit for understanding the next AI acronym">
      <VisualModeSwitch key="visual-mode-switch" visualStyle={visualStyle} onVisualStyleChange={onVisualStyleChange} className={modeStyles.switcher} surface="exhibit" modes={deckVisualModes} />
      <header className={closingStyles.heading}>
        <span>TAKE-HOME FIELD KIT</span>
        <h2>The next acronym will arrive soon.</h2>
        <p>Do not memorize the letters. Inspect the change.</p>
      </header>

      <main className={closingStyles.inspectionDesk}>
        <article className={closingStyles.incomingFolder}>
          <header><span>INCOMING TERM</span><b>UNSORTED</b></header>
          <strong>XYZ</strong>
          <p>A new label is not yet an explanation.</p>
          <footer>OPEN THE FILE →</footer>
        </article>

        <section className={closingStyles.fieldChecklist} aria-label="Four questions for inspecting a new AI term">
          {fieldKitQuestions.map((item) => (
            <article key={item.number} data-tone={item.tone}>
              <span>{item.number}</span>
              <div><strong>{item.label}</strong><p>{item.question}</p></div>
              <b>CHECK</b>
            </article>
          ))}
        </section>

        <aside className={closingStyles.passCard}>
          <span>THE UNDERSTANDING TEST</span>
          <strong>Explain it without the initials.</strong>
          <p>Then you understand the idea—not just its name.</p>
          <em>FIELD GUIDE · COMPLETE</em>
        </aside>
      </main>
    </section>
  );
}

type OpeningArtifactKind = 'route' | 'lesson' | 'world' | 'robot' | 'field' | 'builder';

const openingChapters: Array<{
  number: string;
  shift: string;
  question: string;
  terms: Array<{ term: string; label: string; kind: OpeningArtifactKind }>;
}> = [
  {
    number: '01',
    shift: 'SCALE SMARTER',
    question: 'How can AI use less while doing more?',
    terms: [
      { term: 'MoE', label: 'DISPATCH TICKET', kind: 'route' },
      { term: 'DISTILLATION', label: 'CLASS NOTES', kind: 'lesson' },
    ],
  },
  {
    number: '02',
    shift: 'TOUCH THE WORLD',
    question: 'How does AI predict and act beyond text?',
    terms: [
      { term: 'WORLD MODEL', label: 'FUTURE FILM', kind: 'world' },
      { term: 'VLA', label: 'ROBOT WORK ORDER', kind: 'robot' },
    ],
  },
  {
    number: '03',
    shift: 'CLOSE THE LOOP',
    question: 'How does deployment become learning?',
    terms: [
      { term: 'FDE', label: 'FIELD BADGE', kind: 'field' },
      { term: 'RSI', label: 'BUILDER MANUAL', kind: 'builder' },
    ],
  },
];

function OpeningSpecimen({ kind }: { kind: OpeningArtifactKind }) {
  if (kind === 'route') return <div className={openingStyles.routeTicket}><span>ONE TOKEN</span><strong>256 → 8</strong><small>dispatch only what runs</small></div>;
  if (kind === 'lesson') return <div className={openingStyles.lessonNotes}><b>TEACHER</b><i>worked answers</i><strong>STUDENT</strong></div>;
  if (kind === 'world') return <div className={openingStyles.worldStill}><span>t</span><b>t+1</b><strong>t+2?</strong></div>;
  if (kind === 'robot') return <div className={openingStyles.robotOrder}><span>GOAL</span><strong>BLOCK → TRAY</strong><small>vision · action · check</small></div>;
  if (kind === 'field') return <div className={openingStyles.fieldBadge}><span>ON SITE</span><strong>FDE</strong><small>DISCOVER · DEPLOY</small></div>;
  return <div className={openingStyles.builderManual}><span>BUILDER v1</span><strong>MODEL N → N+1</strong><b>UNPROVEN LOOP</b></div>;
}

export function OpeningLab({
  visualStyle,
  onVisualStyleChange,
}: {
  visualStyle: DeckVisualStyle;
  onVisualStyleChange: (style: DeckVisualStyle) => void;
}) {
  if (visualStyle === 'machine') {
    return (
      <section className={openingMachineStyles.stage} aria-label="Six AI terms in machine visual mode">
        <VisualModeSwitch key="visual-mode-switch" visualStyle={visualStyle} onVisualStyleChange={onVisualStyleChange} className={modeStyles.switcher} surface="machine" modes={deckVisualModes} />
        <div className={openingMachineStyles.ambient} aria-hidden="true" />
        <div className={openingMachineStyles.grid} aria-hidden="true" />

        <main className={openingMachineStyles.story}>
          <header className={openingMachineStyles.hero}>
            <span>AI KEEPS INVENTING NEW TERMS.</span>
            <h1>Six terms.<br /><em>Three real shifts.</em></h1>
            <p>A system map of what is actually changing.</p>
          </header>
          <section className={openingMachineStyles.route} aria-label="Three system shifts containing six AI terms">
            {openingChapters.map((chapter) => (
              <article className={openingMachineStyles.chapter} key={chapter.number}>
                <header><span>{chapter.number}</span><strong>{chapter.shift}</strong></header>
                <p>{chapter.question}</p>
                <div className={openingMachineStyles.terms}>{chapter.terms.map(item => <strong key={item.term}>{item.term}</strong>)}</div>
              </article>
            ))}
          </section>
        </main>
      </section>
    );
  }

  return (
    <section className={openingStyles.stage} aria-label="Six AI terms that explain where AI is going next">
      <VisualModeSwitch key="visual-mode-switch" visualStyle={visualStyle} onVisualStyleChange={onVisualStyleChange} className={modeStyles.switcher} surface="exhibit" modes={deckVisualModes} />
      <header className={openingStyles.hero}>
        <span>AI KEEPS INVENTING NEW TERMS.</span>
        <h1>Six terms.<br /><em>Three real shifts.</em></h1>
        <p>A field guide to what is actually changing.</p>
      </header>

      <main className={openingStyles.exhibitTable} aria-label="Three exhibit tables containing six AI concepts">
          {openingChapters.map((chapter) => (
            <article className={openingStyles.chapter} key={chapter.number}>
              <header>
                <span>{chapter.number}</span>
                <div><strong>{chapter.shift}</strong><p>{chapter.question}</p></div>
              </header>
              <div className={openingStyles.artifactPair}>
                {chapter.terms.map((item) => (
                  <section className={openingStyles.artifact} data-kind={item.kind} key={item.term}>
                    <OpeningSpecimen kind={item.kind} />
                    <footer><span>{item.label}</span><strong>{item.term}</strong></footer>
                  </section>
                ))}
              </div>
            </article>
          ))}
      </main>
    </section>
  );
}
