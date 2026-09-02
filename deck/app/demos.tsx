'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from 'react';
import moeStyles from './moe-cinema.module.css';
import moeExhibitStyles from './moe-exhibit.module.css';
import fdeStyles from './fde-cinema.module.css';
import rsiStyles from './rsi-cinema.module.css';
import distillStyles from './distillation-story.module.css';
import distillExhibitStyles from './distillation-cinema.module.css';
import embodiedStyles from './embodied-cinema.module.css';
import closingStyles from './closing-cinema.module.css';
import closingMachineStyles from './closing-machine.module.css';
import openingStoryStyles from './opening-story.module.css';
import conceptStyles from './concept-exhibits.module.css';
import atlasStyles from './atlas.module.css';
import conceptHeaderStyles from './concept-header.module.css';

export type DeckVisualStyle = 'machine' | 'exhibit' | 'atlas';

export const deckVisualModes = ['machine', 'exhibit', 'atlas'] as const;
const visualModeLabel: Record<DeckVisualStyle, string> = {
  machine: 'Machine',
  exhibit: 'Exhibit',
  atlas: 'Atlas',
};

function ConceptHeader({
  code,
  name,
  visualStyle,
  accent = 'red',
}: {
  code: string;
  name: string;
  visualStyle: DeckVisualStyle;
  accent?: 'red' | 'blue';
}) {
  return (
    <header
      className={conceptHeaderStyles.header}
      data-visual={visualStyle}
      data-accent={accent}
      aria-label={`${code}: ${name}`}
    >
      <strong>{code}</strong>
      <span>{name}</span>
    </header>
  );
}

function ConceptFolio({
  visualStyle,
  number,
  side,
  label,
}: {
  visualStyle: DeckVisualStyle;
  number: string;
  side: 'A' | 'B';
  label: string;
}) {
  if (visualStyle !== 'atlas') return null;

  return (
    <aside className={atlasStyles.plateFolio} aria-hidden="true">
      <span>PLATE · {side}</span>
      <strong>{number}</strong>
      <small>{label}</small>
    </aside>
  );
}

export function VisualModeSwitch<T extends DeckVisualStyle>({
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
type AtlasRouterAct = 'intro' | RouterAct | 'applications';
type MoeScoreRow = { expert: number; score: number; mixWeight: number };
const routerActOrder: RouterAct[] = ['dense-ready', 'dense-run', 'router', 'experts', 'mix'];
const atlasRouterActOrder: AtlasRouterAct[] = ['intro', 'dense-ready', 'dense-run', 'router', 'experts', 'mix', 'applications'];

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

const moeAtlasSummary: Record<AtlasRouterAct, string> = {
  intro: 'MoE means Mixture of Experts: one large model keeps many compute teams available and calls in only a few for each text fragment.',
  'dense-ready': 'A small text fragment arrives and the entire dense block works, like an all-hands meeting for one tiny task.',
  'dense-run': 'The company grows, but every new desk still joins every task, so capacity and cost rise together.',
  router: 'MoE keeps 256 expert teams available while a dispatcher calls in only 8 for this text fragment.',
  experts: 'The 8 selected teams perform the work while the other 248 stay quiet.',
  mix: 'Eight working notes combine into one result: the company stays big while the meeting gets small.',
  applications: 'MoE already powers public chat, open-model, and agentic systems including DeepSeek-V3, Qwen3, and Kimi K2.',
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

function MoeAtlas({
  act,
  currentToken,
  selectedExperts,
  routeVersion,
}: {
  act: AtlasRouterAct;
  currentToken: string;
  selectedExperts: number[];
  routeVersion: number;
}) {
  return (
    <div className={atlasStyles.moeAtlas} data-act={act} role="img" aria-label={moeAtlasSummary[act]}>
      <section className={atlasStyles.moeIntroAtlas}>
        <header><span>NEW TERM / COMPUTE ARCHITECTURE</span><strong>THE IDEA IN ONE FRAME</strong></header>
        <div className={atlasStyles.moeIntroMark}><strong>MoE</strong><small>NOT THREE CHATBOTS</small></div>
        <div className={atlasStyles.moeIntroExpansion}>
          <p><b>M</b><span>MIXTURE</span></p>
          <p><b>o</b><span>OF</span></p>
          <p><b>E</b><span>EXPERTS</span></p>
        </div>
        <footer><span>ONE LARGE COMPANY.</span><strong>A SMALL TEAM FOR EACH TASK.</strong></footer>
      </section>

      <div className={atlasStyles.sentenceStrip} aria-label={`Sentence context. Current text fragment: ${currentToken}.`}>
        <small>ONE SENTENCE</small>
        <p>{xrayTokens.map((token, index) => (
          <span key={`${token}-${index}`} data-current={token === currentToken || undefined}>{token}</span>
        ))}</p>
      </div>

      <div className={atlasStyles.moeToken} key={`atlas-token-${routeVersion}`}>
        <span>ONE TEXT PIECE</span>
        <strong>{currentToken}</strong>
        <small>FROM THE SENTENCE ABOVE</small>
      </div>

      <div className={atlasStyles.taskRail} aria-hidden="true"><span>DISPATCH</span><i /></div>

      <section className={atlasStyles.companyAtlas}>
        <header>
          <span>MODEL AS A COMPANY</span>
          <strong>ONE BUILDING · MANY POSSIBLE TEAMS</strong>
        </header>

        <div className={atlasStyles.companyBuilding} key={`atlas-company-${routeVersion}`}>
          <div className={atlasStyles.companyNameplate}>
            <span>DENSE</span>
            <strong>ALL-HANDS CO.</strong>
            <em>MoE</em>
            <b>EXPERT COMPANY</b>
          </div>
          <div className={atlasStyles.officeGrid}>
            {Array.from({ length: expertCount }, (_, index) => (
              <i
                key={index}
                data-selected={selectedExperts.includes(index) || undefined}
                data-new-wing={index % 16 >= 12 || undefined}
                style={{
                  '--atlas-cell': `${index}`,
                  '--atlas-rank': `${selectedExperts.indexOf(index)}`,
                } as CSSProperties}
              />
            ))}
          </div>
          <footer>
            <span className={atlasStyles.denseAttendance}><b>ALL</b> CALLED IN</span>
            <span className={atlasStyles.moeAttendance}><b>8</b> CALLED IN · <strong>248</strong> QUIET</span>
          </footer>
        </div>

        <div className={atlasStyles.companyPanels}>
          <section className={atlasStyles.allHandsPanel}>
            <span>THE DENSE RULE</span>
            <strong>ALL<br />HANDS</strong>
            <p>ONE SMALL TASK.<br />THE WHOLE BLOCK WORKS.</p>
          </section>

          <section className={atlasStyles.growthPanel}>
            <span>THE BILL</span>
            <div><p><small>CAPACITY</small><strong>↑</strong></p><b>+</b><p><small>WORK / TASK</small><strong>↑</strong></p></div>
            <footer>EVERY NEW DESK JOINS EVERY TASK</footer>
          </section>

          <section className={atlasStyles.dispatchPanel}>
            <span>MoE / DISPATCH DESK</span>
            <strong><b>256</b><i>→</i><b>8</b></strong>
            <div><small>AVAILABLE</small><small>CALLED IN</small></div>
            <footer>ONLY EIGHT GET THE CALL.</footer>
          </section>

          <section className={atlasStyles.workRoomPanel}>
            <span>OPEN ONE CALLED-IN ROOM</span>
            <div>
              <p data-ticket><small>TASK IN</small><b>{currentToken}</b></p><i>→</i>
              <p data-work><small>TEAM 04</small><b>DOES THE WORK</b></p><i>→</i>
              <p data-note><small>NOTE OUT</small><b>NEW<br />SIGNAL</b></p>
            </div>
            <footer><b>8 WORKING</b><strong>248 QUIET</strong></footer>
          </section>

          <section className={atlasStyles.editorPanel}>
            <span>EDITOR&apos;S DESK</span>
            <div className={atlasStyles.noteStack}>
              {Array.from({ length: expertsActivatedPerToken }, (_, index) => (
                <i key={index} style={{ '--atlas-rank': `${index}` } as CSSProperties}>0{index + 1}</i>
              ))}
            </div>
            <b className={atlasStyles.notesArrow}>→</b>
            <p><small>ONE RESULT</small><strong>8 → 1</strong><em>CONTINUE</em></p>
          </section>
        </div>

        <footer className={atlasStyles.companyLedger}>
          <span>AVAILABLE CAPACITY</span><strong>256</strong><i>·</i><span>WORKING NOW</span><b>8</b>
        </footer>
      </section>

      <aside className={atlasStyles.companyAha}>
        <span>THE COMPANY STAYS BIG.</span><strong>THE MEETING GETS SMALL.</strong>
      </aside>

      <section className={atlasStyles.moeApplicationsAtlas}>
        <header><span>WHERE MoE ALREADY WORKS</span><strong>PUBLIC MODELS · REAL PRODUCTS</strong></header>
        <div>
          <article data-tone="blue">
            <span>CHAT + API</span><strong>DEEPSEEK-V3</strong>
            <p><b>671B</b><small>TOTAL</small><i>→</i><b>37B</b><small>ACTIVE</small></p>
          </article>
          <article data-tone="yellow">
            <span>OPEN MODELS</span><strong>QWEN3 MoE</strong>
            <p><b>235B</b><small>TOTAL</small><i>→</i><b>22B</b><small>ACTIVE</small></p>
          </article>
          <article data-tone="red">
            <span>AGENTIC MODEL</span><strong>KIMI K2</strong>
            <p><b>1T</b><small>TOTAL</small><i>→</i><b>32B</b><small>ACTIVE</small></p>
          </article>
        </div>
        <footer><span>YOU DO NOT CLICK “MoE”.</span><strong>IT IS THE ENGINE UNDER THE PRODUCT.</strong></footer>
      </section>
    </div>
  );
}

export function RouterLab({
  visualStyle,
}: {
  visualStyle: DeckVisualStyle;
}) {
  const [act, setAct] = useState<AtlasRouterAct>(visualStyle === 'atlas' ? 'intro' : 'dense-ready');
  const [cursor, setCursor] = useState(3);
  const [routeVersion, setRouteVersion] = useState(0);
  const currentToken = xrayTokens[cursor];
  const mechanismAct: RouterAct = act === 'intro' ? 'dense-ready' : act === 'applications' ? 'mix' : act;
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
    if (visualStyle === 'atlas') {
      const currentIndex = atlasRouterActOrder.indexOf(act);
      if (currentIndex < atlasRouterActOrder.length - 1) {
        setAct(atlasRouterActOrder[currentIndex + 1]);
      } else {
        setCursor(3);
        setRouteVersion((current) => current + 1);
        setAct('intro');
      }
      return;
    }

    if (mechanismAct === 'dense-ready') setAct('dense-run');
    else if (mechanismAct === 'dense-run') setAct('router');
    else if (mechanismAct === 'router') setAct('experts');
    else if (mechanismAct === 'experts') setAct('mix');
    else {
      setCursor((current) => (current + 1) % xrayTokens.length);
      setRouteVersion((current) => current + 1);
      setAct('router');
    }
  };

  const reset = () => {
    setCursor(3);
    setRouteVersion((current) => current + 1);
    setAct(visualStyle === 'atlas' ? 'intro' : 'dense-ready');
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

  const atlasActCopy: Record<AtlasRouterAct, { title: string; detail: string; action: string }> = {
    intro: {
      title: 'Meet MoE.',
      detail: 'Mixture of Experts: many compute teams, only a few called in for each text fragment.',
      action: 'Why do we need it?',
    },
    'dense-ready': {
      title: 'A tiny task. An all-hands meeting.',
      detail: 'In a dense block, the whole company works on every text fragment.',
      action: 'Make it bigger',
    },
    'dense-run': {
      title: 'Bigger company. Bigger bill.',
      detail: 'Adding capacity also adds work to every task.',
      action: 'Introduce MoE',
    },
    router: {
      title: 'Same company. Smaller team.',
      detail: 'MoE keeps 256 expert teams available and calls in only 8.',
      action: 'Open one room',
    },
    experts: {
      title: 'Only the called-in teams work.',
      detail: '“Active” simply means those selected teams actually do the computation.',
      action: 'Combine the notes',
    },
    mix: {
      title: 'Big company. Small meeting.',
      detail: 'Their work is combined while most of the company stays quiet.',
      action: 'See where it ships',
    },
    applications: {
      title: 'MoE is already shipping.',
      detail: 'You meet it in chat, open deployment, and agentic work—not as a feature button, but as the engine underneath.',
      action: 'Replay MoE',
    },
  };

  const copy = visualStyle === 'atlas' ? atlasActCopy[act] : actCopy[mechanismAct];

  return (
    <section
      className={`${moeStyles.stage} ${visualStyle === 'exhibit' ? moeExhibitStyles.host : ''} ${visualStyle === 'atlas' ? atlasStyles.moeHost : ''}`}
      data-act={visualStyle === 'atlas' ? act : mechanismAct}
      data-visual={visualStyle}
      aria-label={`MoE demonstration for token ${currentToken}. ${copy.title} ${copy.detail}${act === 'mix' ? ' More capacity is available than active for each token.' : ''}`}
    >
      <div className={`${moeStyles.lightField} ${visualStyle === 'atlas' ? atlasStyles.atlasHidden : ''}`} aria-hidden="true" />

      <ConceptHeader code="MoE" name="Mixture of Experts" visualStyle={visualStyle} />
      <ConceptFolio visualStyle={visualStyle} number="01" side="A" label={'COMPUTE\nARCHITECTURE'} />

      <div className={`${moeStyles.sceneCopy} ${visualStyle === 'atlas' ? atlasStyles.demoSceneCopy : ''}`} aria-live="polite" key={act}>
        <strong>{copy.title}</strong>
        <p>{copy.detail}</p>
      </div>

      <div className={`${moeStyles.typeSystem} ${visualStyle === 'atlas' ? atlasStyles.atlasHidden : ''}`} aria-hidden="true">
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
          act={mechanismAct}
          currentToken={currentToken}
          selectedExperts={selectedExperts}
          scoreRows={scoreRows}
          routeVersion={routeVersion}
        />
      )}

      {visualStyle === 'atlas' && (
        <MoeAtlas
          act={act}
          currentToken={currentToken}
          selectedExperts={selectedExperts}
          routeVersion={routeVersion}
        />
      )}

      <div className={`${moeStyles.world} ${visualStyle === 'atlas' ? atlasStyles.atlasHidden : ''}`}>
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

      <footer className={`${moeStyles.footer} ${visualStyle === 'atlas' ? atlasStyles.demoFooter : ''}`}>
        {act === 'mix' && (
          <div key={`proof-${act}`} className={moeStyles.meaning}>
            <div className={`${moeStyles.publishedProof} ${visualStyle === 'atlas' ? atlasStyles.atlasProof : ''}`}>
              <p><span>DEEPSEEK-V3 · TOTAL</span><strong>671B</strong><small>parameters</small></p>
              <i><b /></i>
              <p><span>ACTIVE / TOKEN</span><strong>37B</strong><small>parameters</small></p>
              <p><span>ROUTED</span><strong>8 / 256</strong><small>+ shared expert</small></p>
            </div>
          </div>
        )}

        <div className={`${moeStyles.controls} ${visualStyle === 'atlas' ? atlasStyles.demoControls : ''}`}>
          <button onClick={reset} aria-label="Reset the MoE demonstration">Reset</button>
          <div className="demo-action-stack">
            <button data-primary onClick={advanceAct}>{copy.action}<b>→</b></button>
            <DemoStepRail
              current={visualStyle === 'atlas' ? atlasRouterActOrder.indexOf(act) : routerActOrder.indexOf(mechanismAct)}
              total={visualStyle === 'atlas' ? atlasRouterActOrder.length : routerActOrder.length}
            />
          </div>
        </div>
      </footer>
    </section>
  );
}

type AtlasDistillationAct = 'before' | 'lesson' | 'train' | 'exam';
const atlasDistillationActOrder: AtlasDistillationAct[] = ['before', 'lesson', 'train', 'exam'];

const atlasDistillationCopy: Record<AtlasDistillationAct, { title: string; action: string; phase: string }> = {
  before: {
    title: 'The query looks right. Two users still disappear.',
    action: 'Ask the teacher',
    phase: 'THE MISS',
  },
  lesson: {
    title: 'The teacher supplies the missing rule—not just the fix.',
    action: 'Train on lessons',
    phase: 'WORKED LESSON',
  },
  train: {
    title: 'Compare, update, repeat—until the rule lives in the student.',
    action: 'Disconnect teacher',
    phase: 'TRAIN × MANY',
  },
  exam: {
    title: 'New query. Same hidden trap. The student solves it alone.',
    action: 'Replay',
    phase: 'RUN ALONE',
  },
};

function AtlasDistillationLab() {
  const visualStyle: DeckVisualStyle = 'atlas';
  const [act, setAct] = useState<AtlasDistillationAct>('before');
  const actIndex = atlasDistillationActOrder.indexOf(act);
  const copy = atlasDistillationCopy[act];
  const userRows = [
    ['ADA', 'PAID'],
    ['BO', 'NULL'],
    ['CY', 'PAID'],
    ['DEE', 'NULL'],
  ];

  const advanceAct = () => {
    setAct(atlasDistillationActOrder[(actIndex + 1) % atlasDistillationActOrder.length]);
  };

  return (
    <section
      className={`${distillStyles.stage} ${visualStyle === 'atlas' ? atlasStyles.distillHost : ''}`}
      data-act={act}
      data-visual={visualStyle}
      aria-label={`Knowledge distillation demonstration. ${copy.title}`}
    >
      <div className={distillStyles.surface} aria-hidden="true" />

      <ConceptHeader code="DISTILL" name="Knowledge Distillation" visualStyle={visualStyle} accent="blue" />
      <ConceptFolio visualStyle={visualStyle} number="01" side="B" label={'KNOWLEDGE\nTRANSFER'} />

      <div className={distillStyles.phaseTag}>
        <span>{String(actIndex + 1).padStart(2, '0')}</span>
        <strong>{copy.phase}</strong>
      </div>

      <div className={`${distillStyles.sceneCopy} ${visualStyle === 'atlas' ? atlasStyles.demoSceneCopy : ''}`} aria-live="polite" key={act}>
        <strong>{copy.title}</strong>
      </div>

      <main className={distillStyles.storyStage}>
        {act === 'before' && (
          <section className={distillStyles.beforeScene} aria-label="A student SQL query unexpectedly drops users who have no paid order">
            <article className={distillStyles.querySheet}>
              <header><span>STUDENT · FIRST DRAFT</span><strong>32B</strong></header>
              <h3>“Show every user—even if they have no order.”</h3>
              <pre><code>LEFT JOIN orders o ON …{`\n`}WHERE o.status = &apos;paid&apos;</code></pre>
              <p>“LEFT JOIN should keep everyone.”</p>
            </article>

            <article className={distillStyles.resultSheet}>
              <header><span>ACTUAL RESULT</span><strong>4 → 2 ROWS</strong></header>
              <div className={distillStyles.resultRows}>
                {userRows.map(([name, status]) => (
                  <p key={name} data-dropped={status === 'NULL' || undefined}>
                    <strong>{name}</strong><span>{status}</span><b>{status === 'NULL' ? 'DROPPED' : 'KEPT'}</b>
                  </p>
                ))}
              </div>
              <footer>BO + DEE VANISHED</footer>
            </article>
          </section>
        )}

        {act === 'lesson' && (
          <section className={distillStyles.lessonScene} aria-label="The teacher explains why a WHERE filter removes NULL rows after a LEFT JOIN">
            <header className={distillStyles.lessonHeading}><span>TEACHER-GENERATED WORKED LESSON</span><strong>WHY → FIX</strong></header>
            <div className={distillStyles.joinPipeline}>
              <article>
                <span>LEFT JOIN</span>
                <div>{userRows.map(([name, status]) => <p key={name}><strong>{name}</strong><b>{status}</b></p>)}</div>
                <footer>4 ROWS</footer>
              </article>
              <b>→</b>
              <article className={distillStyles.whereGate}>
                <span>WHERE</span><strong>o.status = &apos;paid&apos;</strong><small>NULL fails here</small>
              </article>
              <b>→</b>
              <article>
                <span>RESULT</span>
                <div>{userRows.filter(([, status]) => status === 'PAID').map(([name, status]) => <p key={name}><strong>{name}</strong><b>{status}</b></p>)}</div>
                <footer>2 ROWS</footer>
              </article>
            </div>
            <div className={distillStyles.ruleReveal}>
              <strong>WHERE rejects NULL.</strong>
              <p>The join kept the users; the later filter removed them.</p>
            </div>
            <div className={distillStyles.fixReveal}><span>FIX</span><code>Move o.status = &apos;paid&apos; into ON</code></div>
          </section>
        )}

        {act === 'train' && (
          <section className={distillStyles.trainScene} aria-label="Teacher-generated worked lessons are compared with student drafts and repeatedly update only the student">
            <header><span>ONE VISIBLE LESSON REPRESENTS MANY</span><strong>The student learns the rule—not this query.</strong></header>
            <div className={distillStyles.lessonDeck} aria-hidden="true">
              <article>
                <header>WORKED LESSON</header>
                <p><span>QUERY</span><strong>LEFT JOIN</strong></p>
                <p><span>WHY</span><strong>NULL FILTER</strong></p>
                <p><span>FIX</span><strong>MOVE TO ON</strong></p>
              </article>
            </div>
            <div className={distillStyles.trainingCore}>
              <p><span>STUDENT DRAFT</span><b>≠</b><span>TEACHER LESSON</span></p>
              <strong>COMPARE → LOSS → UPDATE</strong>
              <small>Only the student changes.</small>
            </div>
            <div className={distillStyles.studentCore}>
              <span>STUDENT WEIGHTS</span><strong>32B</strong>
              <div>{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--weight-cell': index } as CSSProperties} />)}</div>
            </div>
            <footer><strong>× 800K</strong><span>curated samples with DeepSeek-R1</span></footer>
          </section>
        )}

        {act === 'exam' && (
          <section className={distillStyles.examScene} aria-label="The teacher is offline and the trained student identifies the same SQL trap in a new query">
            <div className={distillStyles.teacherOffline}><span>TEACHER</span><strong>OFFLINE</strong></div>
            <article className={distillStyles.examQuery}>
              <header><span>NEW QUERY</span><strong>NO TEACHER CALL</strong></header>
              <h3>“Show every device—even if it has no alert.”</h3>
              <pre><code>LEFT JOIN alerts a ON …{`\n`}WHERE a.level = &apos;critical&apos;</code></pre>
            </article>
            <article className={distillStyles.examAnswer}>
              <header><span>32B STUDENT</span><strong>RUNS ALONE</strong></header>
              <blockquote>“WHERE will remove the NULL alert rows.”</blockquote>
              <code>Move the filter into ON.</code>
            </article>
            <aside className={distillStyles.realProof}><span>REAL CASE · DEEPSEEK-R1</span><strong>32B · 72.6</strong><small>AIME 2024 · 800K curated samples</small></aside>
          </section>
        )}
      </main>

      <footer className={distillStyles.footer}>
        <button onClick={() => setAct('before')} disabled={act === 'before'} aria-label="Reset the distillation demonstration">Reset</button>
        <div className="demo-action-stack">
          <button data-primary onClick={advanceAct}><span>{copy.action}</span><b>→</b></button>
          <DemoStepRail current={actIndex} total={atlasDistillationActOrder.length} />
        </div>
      </footer>
    </section>
  );
}

type ExhibitDistillationAct = 'prompt' | 'compare' | 'loss' | 'update' | 'scale' | 'exam';
const exhibitDistillationActOrder: ExhibitDistillationAct[] = ['prompt', 'compare', 'loss', 'update', 'scale', 'exam'];

const exhibitDistillationPhase: Record<ExhibitDistillationAct, string> = {
  prompt: 'ASK',
  compare: 'COMPARE',
  loss: 'MEASURE',
  update: 'UPDATE',
  scale: 'REPEAT',
  exam: 'CLOSED BOOK',
};

const exhibitDistillationSummary: Record<ExhibitDistillationAct, string> = {
  prompt: 'A large teacher creates a worked answer while a smaller student predicts independently.',
  compare: 'The teacher answer is compared with the student output token by token.',
  loss: 'Their difference becomes an error score called loss.',
  update: 'The loss nudges only the student learned settings, called weights.',
  scale: 'The update repeats across 800 thousand curated lessons.',
  exam: 'The teacher is offline and the trained student answers a new question alone.',
};

function DistillationExhibit({ act }: { act: ExhibitDistillationAct }) {
  const targetTokens = ['120', '÷', '1.5', '=', '80'];
  const studentTokens = ['120', '÷', '1.5', '=', '90'];

  return (
    <div
      className={`${conceptStyles.exhibit} ${conceptStyles.distillExhibit}`}
      data-act={act}
      role="img"
      aria-label={exhibitDistillationSummary[act]}
    >
      <div className={conceptStyles.phaseTag}>
        <span>{String(exhibitDistillationActOrder.indexOf(act) + 1).padStart(2, '0')}</span>
        <strong>{exhibitDistillationPhase[act]}</strong>
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
          <p data-correct><span>80 km/h · teacher answer</span><b>22%</b><i>→</i><strong>23%</strong></p>
          <p data-wrong><span>90 km/h · student mistake</span><b>41%</b><i>→</i><strong>40%</strong></p>
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

const exhibitDistillationCopy: Record<ExhibitDistillationAct, { title: string; action: string }> = {
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

function ExhibitDistillationLab() {
  const [act, setAct] = useState<ExhibitDistillationAct>('prompt');
  const actIndex = exhibitDistillationActOrder.indexOf(act);
  const copy = exhibitDistillationCopy[act];

  const advanceAct = () => {
    setAct(exhibitDistillationActOrder[(actIndex + 1) % exhibitDistillationActOrder.length]);
  };

  return (
    <section
      className={`${distillExhibitStyles.stage} ${conceptStyles.host} ${conceptStyles.distillHost}`}
      data-act={act}
      data-visual="exhibit"
      aria-label={`Knowledge distillation demonstration. ${copy.title}`}
    >
      <header className={distillExhibitStyles.titlePlate}>
        <div><strong>DISTILL</strong><p>Knowledge Distillation</p></div>
      </header>

      <div className={distillExhibitStyles.sceneCopy} aria-live="polite" key={act}>
        <strong>{copy.title}</strong>
      </div>

      <DistillationExhibit act={act} />

      <footer className={distillExhibitStyles.footer}>
        {act === 'exam' && (
          <div className={distillExhibitStyles.meaning} key={act}>
            <div className={distillExhibitStyles.publishedProof} aria-label="Published AIME 2024 scores">
              <p><span>TEACHER</span><strong>79.8</strong><small>AIME 2024</small></p>
              <i><b /></i>
              <p><span>32B STUDENT</span><strong>72.6</strong><small>AIME 2024</small></p>
              <p><span>SIZE</span><strong>671B → 32B</strong><small>selected behavior, not everything</small></p>
            </div>
          </div>
        )}
        <div className={distillExhibitStyles.controls}>
          <button onClick={() => setAct('prompt')} disabled={act === 'prompt'} aria-label="Reset the distillation demonstration">Reset</button>
          <div className="demo-action-stack">
            <button data-primary onClick={advanceAct}><span>{copy.action}</span><b>→</b></button>
            <DemoStepRail current={actIndex} total={exhibitDistillationActOrder.length} />
          </div>
        </div>
      </footer>
    </section>
  );
}

export function DistillationLab({ visualStyle }: { visualStyle: DeckVisualStyle }) {
  // Mode isolation contract: Atlas owns separate markup, state, and CSS.
  // Machine currently falls back to the frozen Exhibit implementation in page.tsx.
  return visualStyle === 'atlas' ? <AtlasDistillationLab /> : <ExhibitDistillationLab />;
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
    title: 'A World Model builds a predictive state—not necessarily a video.',
    action: 'Switch to VLA',
  },
  'vla-gap': {
    title: 'A sentence names the goal; a body still needs precise movement.',
    action: 'Ground the instruction',
  },
  'vla-control': {
    title: 'A VLA acts, checks reality, and corrects the next action.',
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
  'vla-control': 'ACT + CHECK + CORRECT',
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
        <span>{String((embodiedActOrder.indexOf(act) % 3) + 1).padStart(2, '0')}</span>
        <strong>{embodiedPhase[act]}</strong>
      </div>

      {isWorld ? <>
      <section className={conceptStyles.worldForecastDesk} aria-hidden={act !== 'world-now' && act !== 'world-rollout'}>
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

      <section className={conceptStyles.worldFormsDesk} aria-hidden={act !== 'world-forms'}>
        <div className={conceptStyles.predictionCatalog}>
          <header><span>A WORLD MODEL BUILDS A PREDICTIVE STATE</span><strong>NOT NECESSARILY A VIDEO</strong></header>
          <article className={conceptStyles.pixelRepresentation}><b>01</b><span>PIXELS / VIDEO</span><div>{['t', 't+1', 't+2'].map(frame => <i key={frame}>{frame}</i>)}</div><small>future camera-like frames</small></article>
          <article className={conceptStyles.stateReceipt}><b>02</b><span>INTERNAL STATE</span><dl><div><dt>ROBOT</dt><dd>center lane</dd></div><div><dt>MOTION</dt><dd>forward</dd></div><div><dt>CURB</dt><dd>1.2 m</dd></div></dl><small>numbers a planner can use</small></article>
          <article className={conceptStyles.sceneMap}><b>03</b><span>OBJECTS / GEOMETRY</span><div><i>ROBOT</i><i>ROAD</i><strong>CURB · 1.2 m</strong></div><small>a labeled map for planning</small></article>
        </div>
        <div className={conceptStyles.worldRecording}>
          <video ref={worldVideoRef} loop muted playsInline preload="auto" poster="/media/genie3-proof.png">
            <source src="/media/genie3-interaction.mp4" type="video/mp4" />
          </video>
          <p><span>OFFICIAL RECORDING</span><strong>GENIE 3</strong><small>an interactive generated world</small></p>
        </div>
        <aside><strong>PREDICTIVE MAP ≠ PERFECT PHYSICS</strong><span>Useful for planning; still an approximation.</span></aside>
      </section>

      </> : <>
      <section className={conceptStyles.vlaGapDesk} aria-hidden={act !== 'vla-gap'}>
        <div className={conceptStyles.languageCard}><span>LANGUAGE MODEL</span><strong>“Put the orange block in the tray.”</strong><small>a sentence · not motor control</small></div>
        <b className={conceptStyles.gapMark}>≠</b>
        <div className={conceptStyles.physicalBench}>
          <span>THE BODY STILL NEEDS ANSWERS</span>
          <div className={conceptStyles.groundingPhoto}><b>TARGET</b><i>OBSTACLE</i><strong>TRAY</strong></div>
          <div className={conceptStyles.burdenTickets}>{['WHERE?', 'CLEAR PATH?', 'HOW HARD?', 'WHEN STOP?'].map((item) => <i key={item}>{item}</i>)}</div>
        </div>
      </section>

      <section className={conceptStyles.vlaControlDesk} aria-hidden={act !== 'vla-control'}>
        <div className={conceptStyles.robotObservation}>
          <header><span>OBSERVATION · 01</span><strong>LIVE CAMERA</strong></header>
          <div><b>ORANGE BLOCK</b><i>OBSTACLE</i><strong>TRAY</strong></div>
          <footer><span>GOAL</span><strong>put block in tray</strong></footer>
        </div>
        <div className={conceptStyles.controlWorkOrder}>
          <header><span>VLA CONTROL WORK ORDER</span><strong>ACTION OUTPUT · NOT A SENTENCE</strong></header>
          <ol>{['REACH target', 'ALIGN gripper', 'GRIP block', 'LIFT + move'].map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong><b>{index < 3 ? 'NEXT' : 'CHECK'}</b></li>)}</ol>
          <footer>The new camera frame becomes the next control input.</footer>
        </div>
        <div className={conceptStyles.robotOutcome}>
          <header><span>OBSERVATION · 02</span><strong>AFTER THE ACTION CHUNK</strong></header>
          <div><b>BLOCK SLIPPED</b><i className={conceptStyles.correctionPath}><span>RE-GRIP 4 CM LEFT</span></i><strong>TRAY</strong></div>
          <footer><span>CHECK RECEIPT</span><p data-failed><b>target reached?</b><strong>NO</strong></p><p data-failed><b>grasp stable?</b><strong>NO</strong></p></footer>
        </div>
        <div className={conceptStyles.verificationReceipt}><span>OBSERVATION 02 · CHECK FAILED</span><strong>RE-GRIP 4 CM LEFT → TRY AGAIN</strong><b>↺</b></div>
      </section>

      <section className={conceptStyles.vlaProofDesk} aria-hidden={act !== 'vla-proof'}>
        <div className={conceptStyles.vlaRecording}>
          <video ref={vlaVideoRef} loop muted playsInline preload="auto" poster="/media/gemini-robotics2-proof.png">
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
      </>}
    </div>
  );
}

function EmbodiedAtlas({
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
    <div className={atlasStyles.embodiedAtlas} data-act={act} data-phase={isWorld ? 'world' : 'vla'} role="img" aria-label={embodiedCopy[act].title}>
      {isWorld ? <>
      <section className={atlasStyles.worldForecastAtlas} aria-hidden={act !== 'world-now' && act !== 'world-rollout'}>
        <div className={atlasStyles.atlasObservation}>
          <header><span>OBSERVATION</span><strong>t</strong></header>
          <div /><footer>robot on a street</footer>
        </div>
        <div className={atlasStyles.atlasAction}>
          <span>ACTION</span><strong>↑</strong><small>move forward</small>
        </div>
        <div className={atlasStyles.atlasFutures}>
          <header><span>PREDICT NEXT STATE</span><strong>THREE POSSIBLE FUTURES</strong></header>
          {[
            ['A', 'FORWARD · CLEAR', 'LIKELY'],
            ['B', 'DRIFT · LEFT', 'POSSIBLE'],
            ['C', 'CONTACT · CURB', 'RISK'],
          ].map(([id, label, confidence], branch) => (
            <article key={id} data-selected={branch === 0}>
              <b>{id}</b>
              <div>{['t+1', 't+2', 't+3'].map((frame, index) => {
                const markerY = branch === 0 ? 50 : branch === 1 ? 50 - index * 10 : 50 + index * 10;
                return (
                  <i
                    key={frame}
                    data-impact={branch === 2 && index === 2 ? true : undefined}
                    style={{
                      '--atlas-frame': `${index}`,
                      '--atlas-branch': `${branch}`,
                      '--atlas-marker-x': `${25 + index * 20}%`,
                      '--atlas-marker-y': `${markerY}%`,
                    } as CSSProperties}
                  >
                    {act === 'world-now' ? '?' : frame}
                  </i>
                );
              })}</div>
              <p><strong>{label}</strong><span>{confidence}</span></p>
            </article>
          ))}
          <footer><b>↺</b><span>ONE PREDICTION BECOMES THE NEXT INPUT</span><small>uncertainty compounds</small></footer>
        </div>
      </section>

      <section className={atlasStyles.worldFormsAtlas} aria-hidden={act !== 'world-forms'}>
        <div className={atlasStyles.representationIndex}>
          <header><span>WHAT DOES A WORLD MODEL BUILD?</span><strong>A PREDICTIVE STATE</strong></header>
          <article><b>01</b><div><strong>PIXELS / VIDEO</strong><span>future camera-like frames</span></div><i data-kind="pixels" /></article>
          <article><b>02</b><div><strong>INTERNAL STATE</strong><span>numbers a planner can use</span></div><i data-kind="state" /></article>
          <article><b>03</b><div><strong>OBJECTS / GEOMETRY</strong><span>a labeled spatial map</span></div><i data-kind="map" /></article>
        </div>
        <div className={atlasStyles.atlasRecording}>
          <video ref={worldVideoRef} loop muted playsInline preload="auto" poster="/media/genie3-proof.png">
            <source src="/media/genie3-interaction.mp4" type="video/mp4" />
          </video>
          <p><span>OFFICIAL RECORDING</span><strong>GENIE 3</strong><small>interactive generated world</small></p>
        </div>
        <aside><strong>PREDICTIVE MAP ≠ PERFECT PHYSICS</strong><span>Useful for planning; still an approximation.</span></aside>
      </section>

      </> : <>
      <section className={atlasStyles.vlaGapAtlas} aria-hidden={act !== 'vla-gap'}>
        <div className={atlasStyles.languageAtlas}>
          <span>LANGUAGE MODEL</span>
          <strong>“Put the orange block<br />in the tray.”</strong>
        </div>
        <b className={atlasStyles.atlasNotEqual}>≠</b>
        <div className={atlasStyles.bodyAtlas}>
          <header><span>PHYSICAL WORLD</span><strong>THE BODY STILL NEEDS ANSWERS</strong></header>
          <div className={atlasStyles.bodyPhoto}><b>TARGET</b><i>OBSTACLE</i><strong>TRAY</strong></div>
          <ol>{['WHERE?', 'CLEAR PATH?', 'HOW HARD?', 'WHEN STOP?'].map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong></li>)}</ol>
        </div>
      </section>

      <section className={atlasStyles.vlaControlAtlas} aria-hidden={act !== 'vla-control'}>
        <header><span>VLA / CLOSED-LOOP CONTROL</span><strong>ACT. LOOK AGAIN. CORRECT.</strong></header>
        <div className={atlasStyles.controlTimeline}>
          <article data-kind="observe"><span>01 · OBSERVE</span><strong>camera + goal</strong><div><b>BLOCK</b><i>OBSTACLE</i><em>TRAY</em></div></article>
          <b>→</b>
          <article data-kind="act"><span>02 · ACTION CHUNK</span><ol>{['REACH', 'ALIGN', 'GRIP', 'LIFT'].map(item => <li key={item}>{item}</li>)}</ol><small>motor commands · not a sentence</small></article>
          <b>→</b>
          <article data-kind="check"><span>03 · CHECK</span><strong>BLOCK SLIPPED</strong><div className={atlasStyles.failedObservation}><b>BLOCK ↓</b><small>OBSERVATION · 02</small></div><p><i>target reached?</i><b>NO</b></p><p><i>grasp stable?</i><b>NO</b></p></article>
          <b>→</b>
          <article data-kind="correct"><span>04 · CORRECT</span><strong>RE-GRIP<br />4 CM LEFT</strong><small>then observe again ↺</small></article>
        </div>
        <aside><div><strong>THE NEXT CAMERA FRAME MAY DISAGREE.</strong><span>The system cannot simply finish its sentence.</span></div><b>↺ CORRECT → OBSERVE AGAIN</b></aside>
      </section>

      <section className={atlasStyles.vlaProofAtlas} aria-hidden={act !== 'vla-proof'}>
        <div className={atlasStyles.atlasRecording}>
          <video ref={vlaVideoRef} loop muted playsInline preload="auto" poster="/media/gemini-robotics2-proof.png">
            <source src="/media/gemini-robotics2-wholebody.webm" type="video/webm" />
          </video>
          <p><span>OFFICIAL RECORDING</span><strong>GEMINI ROBOTICS 2</strong><small>whole-body robot control</small></p>
        </div>
        <div className={atlasStyles.recoveryAtlas}>
          <header><span>PHYSICAL AI / RECOVERY LOOP</span><strong>THE HARD PART IS REALITY</strong></header>
          <ol>{['OBSERVE', 'ACT', 'CHECK', 'CORRECT ↺ OBSERVE'].map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong></li>)}</ol>
          <p>Objects move. Grasps fail. The system must re-observe and adapt.</p>
        </div>
      </section>
      </>}
    </div>
  );
}

export function EmbodiedLab({
  isActive,
  visualStyle,
  concept,
}: {
  isActive: boolean;
  visualStyle: DeckVisualStyle;
  concept: 'world' | 'vla';
}) {
  const initialAct: EmbodiedAct = concept === 'world' ? 'world-now' : 'vla-gap';
  const [act, setAct] = useState<EmbodiedAct>(initialAct);
  const worldVideoRef = useRef<HTMLVideoElement>(null);
  const vlaVideoRef = useRef<HTMLVideoElement>(null);
  const isWorld = concept === 'world';
  const copy = embodiedCopy[act];

  useEffect(() => {
    const worldVideo = worldVideoRef.current;
    const vlaVideo = vlaVideoRef.current;

    worldVideo?.pause();
    vlaVideo?.pause();

    const visibleVideo =
      isActive && act === 'world-forms'
        ? worldVideo
        : isActive && act === 'vla-proof'
          ? vlaVideo
          : null;

    if (!visibleVideo) return;

    let cancelled = false;

    if (visibleVideo.readyState >= HTMLMediaElement.HAVE_METADATA) {
      visibleVideo.currentTime = 0;
    }

    void visibleVideo.play().catch((error: unknown) => {
      if (cancelled || (error instanceof DOMException && error.name === 'AbortError')) return;

      // Keep the poster visible when playback or decoding is unavailable.
      visibleVideo.pause();
      if (visibleVideo.readyState >= HTMLMediaElement.HAVE_METADATA) {
        visibleVideo.currentTime = 0;
      }
    });

    return () => {
      cancelled = true;
      visibleVideo.pause();
    };
  }, [act, isActive, visualStyle]);

  const advanceAct = () => {
    if (concept === 'world') {
      if (act === 'world-now') setAct('world-rollout');
      else if (act === 'world-rollout') setAct('world-forms');
      else setAct('world-now');
      return;
    }

    if (act === 'vla-gap') setAct('vla-control');
    else if (act === 'vla-control') setAct('vla-proof');
    else setAct('vla-gap');
  };

  const reset = () => {
    setAct(initialAct);
  };

  const actOffset = isWorld ? 0 : 3;
  const localActIndex = embodiedActOrder.indexOf(act) - actOffset;
  const actionLabel =
    act === 'world-forms'
      ? 'Replay World Model'
      : act === 'vla-proof'
        ? 'Replay VLA'
        : copy.action;

  return (
    <section
      className={`${embodiedStyles.stage} ${visualStyle === 'exhibit' ? conceptStyles.host : ''} ${visualStyle === 'atlas' ? atlasStyles.embodiedHost : ''}`}
      data-act={act}
      data-phase={isWorld ? 'world' : 'vla'}
      data-visual={visualStyle}
      aria-label={isWorld ? 'Presenter-led World Model demonstration' : 'Presenter-led Vision-Language-Action demonstration'}
    >
      <ConceptHeader
        code={isWorld ? 'WORLD' : 'VLA'}
        name={isWorld ? 'World Model' : 'Vision · Language · Action'}
        visualStyle={visualStyle}
      />
      <ConceptFolio
        visualStyle={visualStyle}
        number="02"
        side={isWorld ? 'A' : 'B'}
        label={isWorld ? 'PREDICTIVE\nSYSTEMS' : 'EMBODIED\nSYSTEMS'}
      />

      <div className={`${embodiedStyles.sceneCopy} ${visualStyle === 'atlas' ? atlasStyles.demoSceneCopy : ''}`} aria-live="polite" key={act}>
        <strong>{copy.title}</strong>
      </div>

      {visualStyle === 'atlas'
        ? <EmbodiedAtlas act={act} worldVideoRef={worldVideoRef} vlaVideoRef={vlaVideoRef} />
        : <EmbodiedExhibit act={act} worldVideoRef={worldVideoRef} vlaVideoRef={vlaVideoRef} />}

      <div className={`${embodiedStyles.world} ${conceptStyles.legacyWorld} ${visualStyle === 'atlas' ? atlasStyles.atlasHidden : ''}`}>
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

      <footer className={`${embodiedStyles.footer} ${visualStyle === 'atlas' ? atlasStyles.demoFooter : ''}`}>
        <div className={`${embodiedStyles.controls} ${visualStyle === 'atlas' ? atlasStyles.demoControls : ''}`}>
          <button onClick={reset} disabled={act === initialAct} aria-label={`Reset the ${isWorld ? 'World Model' : 'VLA'} demonstration`}>Reset</button>
          <div className="demo-action-stack">
            <button data-primary onClick={advanceAct}><span>{actionLabel}</span><b>→</b></button>
            <DemoStepRail current={localActIndex} total={3} />
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
    title: 'The demo passed. The company was not in it.',
    action: 'Enter the field',
  },
  {
    title: 'In production, the input is a workflow.',
    action: 'Open the trace',
  },
  {
    title: 'FDE turns a failure into evidence.',
    action: 'Make it testable',
  },
  {
    title: 'Evidence becomes a test—and a fix.',
    action: 'Replay on a new case',
  },
  {
    title: 'Next customer: correct on the first run.',
    action: 'Next: RSI',
  },
];

const fdePhase = ['DEMO', 'FIELD', 'TRACE', 'EVAL + FIX', 'REPLAY'];

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

function FdeAtlas({ step }: { step: number }) {
  const replay = step === 4;

  return (
    <div className={`${atlasStyles.fdeAtlas} ${atlasStyles.fdeContinuumAtlas}`} data-step={step} role="img" aria-label={fdeActs[step]?.title ?? 'Forward deployed engineering demonstration'}>
      <nav className={atlasStyles.fdeStoryRailAtlas} aria-label="FDE case progression">
        {fdePhase.map((label, index) => <span key={label} data-current={index === step} data-complete={index < step}>{label}</span>)}
      </nav>

      <section className={atlasStyles.fdeFieldAtlas}>
        <header className={atlasStyles.fdeCaseHeaderAtlas}>
          <span>FRD-0042 · ILLUSTRATIVE</span>
        </header>

        <div className={atlasStyles.fdePersistentStageAtlas}>
          <section className={`${atlasStyles.fdeZoneAtlas} ${atlasStyles.fdeProductZoneAtlas}`}>
            <header><strong>PRODUCT</strong></header>
            <div className={atlasStyles.fdeProductPipelineAtlas}>
              <article className={atlasStyles.fdeInputAtlas}>
                <strong>{replay ? 'PROPERTY-B' : step === 0 ? 'W-2.pdf' : 'FRD-0042'}</strong>
              </article>
              <b>→</b>
              <article className={atlasStyles.fdeCoreAtlas}><strong>AI</strong></article>
              <b>→</b>
              <article className={atlasStyles.fdeOutputAtlas} data-state={step === 0 || replay ? 'pass' : step === 3 ? 'fixed' : 'missing'}>
                <strong>{step === 0 ? 'PASS ✓' : replay ? '52 ✓' : step === 3 ? '46 ✓' : 'NULL'}</strong>
              </article>
            </div>

            <div className={atlasStyles.fdeEvalBenchAtlas} data-visible={step >= 3}>
              <header><strong>PRODUCT MEMORY</strong></header>
              <div><p><span>EXPECTED</span><strong>46</strong></p><p><span>EVAL</span><strong>✓</strong></p><p><span>REGRESSION</span><strong>✓</strong></p><p><span>REVIEW</span><strong>✓</strong></p></div>
            </div>
          </section>

          <section className={atlasStyles.fdeBoundaryZoneAtlas}>
            <header><span>FIELD ↔ PRODUCT</span></header>
            <i className={atlasStyles.fdeBoundaryLineAtlas} />
            <div className={atlasStyles.fdePersonAtlas} data-position={step}>
              <strong>FDE</strong>
            </div>
            <div className={atlasStyles.fdeEvidencePacketAtlas} data-visible={step >= 2} data-returned={step >= 3} data-consumed={replay}>
              <span>EVIDENCE</span><strong>FRD-0042</strong><small>46 · #913 · ✓</small>
            </div>
            <div className={atlasStyles.fdeCapabilityPacketAtlas} data-visible={replay}>
              <strong>FIX + TEST ✓</strong>
            </div>
          </section>

          <section className={`${atlasStyles.fdeZoneAtlas} ${atlasStyles.fdeCustomerZoneAtlas}`} data-active={step >= 1}>
            <header><strong>{replay ? 'NEW CUSTOMER' : 'CUSTOMER'}</strong></header>
            <div className={atlasStyles.fdeSiteSourcesAtlas}>
              <article><strong>EMAIL</strong></article>
              <article><strong>SHEET</strong></article>
              <article><strong>API</strong></article>
              <article data-truth><strong>NOTE · {replay ? '52' : '46'}</strong></article>
            </div>
            <div className={atlasStyles.fdeLiveReceiptAtlas} data-pass={replay}>
              <span>LIVE OUTPUT</span>
              <p><strong>{step === 0 ? '—' : replay ? '52 ✓' : 'NULL'}</strong></p>
            </div>
            <div className={atlasStyles.fdePractitionerAtlas} data-visible={step >= 1 && !replay}>
              <span>EXPERT</span><strong>46 ✓</strong>
            </div>
          </section>

          <div className={atlasStyles.fdeTraceAtlas} data-visible={step === 2}>
            {[
              ['CASE', 'FRD-0042'],
              ['TRACE', '#913'],
              ['OUTPUT', 'NULL'],
              ['SOURCE', '46 ✓'],
            ].map(([label, value], index) => <div className={atlasStyles.fdeTraceStopAtlas} key={label} style={{ '--trace-rank': index } as CSSProperties}><article><span>{label}</span><strong>{value}</strong></article>{index < 3 && <i />}</div>)}
          </div>
        </div>

        <aside className={atlasStyles.fdeProofStripAtlas} data-visible={replay}>
          <strong>7,000</strong><b>25% → 86%</b>
        </aside>
      </section>
    </div>
  );
}

export function FdeLab({
  step,
  onAdvance,
  onReset,
  visualStyle,
}: {
  step: number;
  onAdvance: () => void;
  onReset: () => void;
  visualStyle: DeckVisualStyle;
}) {
  const safeStep = Math.min(Math.max(step, 0), fdeActs.length - 1);
  const act = fdeActs[safeStep];

  return (
    <section
      className={`${fdeStyles.stage} ${visualStyle === 'exhibit' ? `${conceptStyles.host} ${conceptStyles.fdeHost}` : ''} ${visualStyle === 'atlas' ? atlasStyles.fdeHost : ''}`}
      data-step={safeStep}
      data-visual={visualStyle}
      aria-label="Presenter-led Tax AI field feedback story"
    >

      <ConceptHeader code="FDE" name="Forward Deployed Engineer" visualStyle={visualStyle} />
      <ConceptFolio visualStyle={visualStyle} number="03" side="A" label={'FIELD\nENGINEERING'} />

      <div className={`${fdeStyles.beat} ${visualStyle === 'atlas' ? atlasStyles.demoSceneCopy : ''}`} aria-live="polite">
        <strong>{act.title}</strong>
      </div>

      {visualStyle === 'atlas' ? <FdeAtlas step={safeStep} /> : <FdeExhibit step={safeStep} />}

      <div className={`${fdeStyles.world} ${conceptStyles.legacyWorld} ${visualStyle === 'atlas' ? atlasStyles.atlasHidden : ''}`}>
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

      <footer className={`${fdeStyles.footer} ${visualStyle === 'atlas' ? atlasStyles.demoFooter : ''}`}>
        <div className={`${fdeStyles.controls} ${visualStyle === 'atlas' ? atlasStyles.demoControls : ''}`}>
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
        <div className={conceptStyles.recursiveReturn} aria-label="Model N plus 1 proposes the next improvement to builder version 2">
          <strong>BUILDER · v2</strong><i>←</i><span>AI · N+1 PROPOSES THE NEXT CHANGE</span>
        </div>
        <footer className={conceptStyles.recursiveCriteria}>{['LASTING', 'INHERITED', 'COMPOUNDING'].map((item) => <p key={item}><strong>{item}</strong><small>{item === 'LASTING' ? 'builder version changes' : item === 'INHERITED' ? 'successor uses it' : 'successor improves it again'}</small></p>)}</footer>
      </section>
    </div>
  );
}

function RsiAtlas({ act }: { act: RsiAct }) {
  return (
    <div className={atlasStyles.rsiAtlas} data-act={act} role="img" aria-label={rsiExhibitSummary[act]}>
      <div className={atlasStyles.rsiBoundaryRail}>
        <span data-zone="answer"><strong>SELF-CORRECTION</strong><small>one answer changes</small></span>
        <span data-zone="bounded"><strong>BOUNDED OPTIMIZATION</strong><small>AI searches inside a human-defined test</small></span>
        <span data-zone="recursive"><strong>FULL RSI</strong><small>builder improves builder across successors · unproven</small></span>
      </div>

      <section className={atlasStyles.rsiMirrorAtlas} aria-hidden={act !== 'mirror'}>
        <header><span>OUTPUT / SAME MODEL</span><strong>A BETTER ANSWER IS NOT A BETTER BUILDER</strong></header>
        <div className={atlasStyles.answerRevisionAtlas}>
          <article><span>ANSWER · V1</span><strong>42 days</strong><small>CHECK</small></article><b>→</b>
          <article data-fixed><span>ANSWER · V2</span><strong>46 days</strong><small>FIXED</small></article>
        </div>
        <b className={atlasStyles.rsiNotEqualAtlas}>≠</b>
        <div className={atlasStyles.builderUnchangedAtlas}>
          <header><span>AI BUILDER</span><strong>VERSION 1</strong></header>
          {['TRAINING CODE', 'DATA PIPELINE', 'EVAL SUITE', 'MODEL RECIPE'].map(item => <p key={item}><span>{item}</span><b>UNCHANGED</b></p>)}
          <footer>THE PROCESS THAT BUILDS THE NEXT MODEL DID NOT CHANGE.</footer>
        </div>
      </section>

      <section className={atlasStyles.rsiBuilderAtlas} aria-hidden={act !== 'builder'}>
        <header><span>DEMONSTRATED TODAY / SEARCH INSIDE A BOX</span><strong>HUMANS LOCK THE TEST</strong></header>
        <div className={atlasStyles.rsiLocksAtlas}>
          <article><b>LOCKED</b><span>GOAL</span><strong>Make training code faster</strong></article>
          <article><b>LOCKED</b><span>EVALUATOR</span><strong>Same answer + lower time</strong></article>
        </div>
        <div className={atlasStyles.patchFactoryAtlas}>
          <article><span>AI GENERATES</span><strong>MANY CODE IDEAS</strong></article><b>→</b>
          <div>{['PATCH 01', 'PATCH 02', 'PATCH 03', 'PATCH 04'].map((item, index) => <i key={item} style={{ '--atlas-rank': `${index}` } as CSSProperties}>{item}</i>)}</div><b>→</b>
          <article data-evaluator><span>AUTO EVALUATOR</span><strong>RUN · VERIFY · TIME</strong></article>
        </div>
        <footer>OBJECTIVE SIGNAL · NOT THE AI&apos;S OPINION</footer>
      </section>

      <section className={atlasStyles.rsiSelectionAtlas} aria-hidden={act !== 'selection'}>
        <header><span>CANDIDATE TEST BENCH</span><strong>CORRECT FIRST. THEN FASTER.</strong></header>
        <div className={atlasStyles.selectionGatesAtlas}><span>CORRECT?</span><span>FASTER?</span><span>DECISION</span></div>
        <div className={atlasStyles.patchLedgerAtlas}>
          {[
            ['BASELINE', '100 ms', 'YES', '—', 'SEED'],
            ['PATCH A', '94 ms', 'YES', 'YES', 'PASS'],
            ['PATCH B', '69 ms', 'NO', 'YES', 'REJECT'],
            ['PATCH C', '86 ms', 'YES', 'YES', 'NEW BEST'],
          ].map(([name, time, correct, faster, decision], index) => (
            <article key={name} data-reject={decision === 'REJECT' || undefined} data-winner={decision === 'NEW BEST' || undefined} style={{ '--atlas-rank': `${index}` } as CSSProperties}>
              <span>{name}</span><strong>{time}</strong><b>{correct}</b><b>{faster}</b><em>{decision}</em>
            </article>
          ))}
        </div>
        <footer><span>WINNER BECOMES THE NEXT SEED</span><strong>↺</strong></footer>
      </section>

      <section className={atlasStyles.rsiImpactAtlas} aria-hidden={act !== 'impact'}>
        <header><span>INSTALL ONE WINNER</span><strong>LOCAL IMPROVEMENT · MEASURABLE EFFECT</strong></header>
        <div className={atlasStyles.winningPatchAtlas}><span>WINNING PATCH</span><strong>PATCH C</strong><small>correct + faster</small></div>
        <b className={atlasStyles.impactArrowAtlas}>↓</b>
        <div className={atlasStyles.kernelAtlas}><span>ONE TOOL IN THE AI FACTORY</span><strong>TRAINING KERNEL</strong><small>same job · less time + compute</small></div>
        <aside className={atlasStyles.alphaProofAtlas}>
          <span>GOOGLE DEEPMIND / ALPHAEVOLVE</span>
          <p><small>ONE KERNEL</small><strong>+23%</strong><b>FASTER</b></p>
          <i>→</i>
          <p><small>WHOLE TRAINING RUN</small><strong>−1%</strong><b>TIME</b></p>
          <footer>USEFUL SELF-IMPROVEMENT — BUT THE MODEL-BUILDING PROCESS DID NOT RECUR.</footer>
        </aside>
      </section>

      <section className={atlasStyles.rsiRecursiveAtlas} aria-hidden={act !== 'recursive'}>
        <header><span>FULL RSI / SUCCESSOR TEST</span><strong>WHAT WOULD ACTUALLY HAVE TO RECUR?</strong></header>
        <article className={atlasStyles.releaseNAtlas}><span>MODEL RELEASE</span><strong>AI · N</strong><p>built by <b>BUILDER v1</b></p></article>
        <div className={atlasStyles.builderVersionAtlas}>
          <header><span>VERSIONED BUILDER</span><strong>v1 → v2</strong></header>
          <p>{['TRAINING CODE', 'DATA PROCESS', 'EVALS', 'MODEL RECIPE'].map(item => <b key={item}>{item}</b>)}</p>
          <footer>ONE WINNING CHANGE BECOMES PART OF THE BUILD PROCESS</footer>
        </div>
        <article className={atlasStyles.releaseNextAtlas}><span>SUCCESSOR</span><strong>AI · N+1</strong><p>inherits <b>BUILDER v2</b></p></article>
        <div className={atlasStyles.recursiveReturnAtlas}><span>N+1 PROPOSES THE NEXT BUILDER CHANGE</span><i /><b>↩</b></div>
        <footer className={atlasStyles.rsiCriteriaAtlas}><span className={atlasStyles.rsiCriteriaNote}>OPEN RESEARCH QUESTION · NOT YET DEMONSTRATED</span>{[
          ['LASTING', 'the builder itself changes'],
          ['INHERITED', 'the successor is built with it'],
          ['COMPOUNDING', 'the successor improves the builder again'],
        ].map(([label, detail]) => <p key={label}><strong>{label}</strong><small>{detail}</small></p>)}</footer>
      </section>
    </div>
  );
}

export function RsiLab({ visualStyle }: { visualStyle: DeckVisualStyle }) {
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
    <section
      className={`${rsiStyles.stage} ${visualStyle === 'exhibit' ? conceptStyles.host : ''} ${visualStyle === 'atlas' ? atlasStyles.rsiHost : ''}`}
      data-act={act}
      data-visual={visualStyle}
      aria-label={`RSI workshop. ${current.title}`}
    >

      <ConceptHeader code="RSI" name="Recursive Self-Improvement" visualStyle={visualStyle} />
      <ConceptFolio visualStyle={visualStyle} number="03" side="B" label={'IMPROVEMENT\nSYSTEMS'} />

      <div className={`${rsiStyles.beat} ${visualStyle === 'atlas' ? atlasStyles.demoSceneCopy : ''}`} aria-live="polite">
        <strong>{current.title}</strong>
      </div>

      {visualStyle === 'atlas' ? <RsiAtlas act={act} /> : <RsiExhibit act={act} />}

      <div className={`${rsiStyles.world} ${conceptStyles.legacyWorld} ${visualStyle === 'atlas' ? atlasStyles.atlasHidden : ''}`}>
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

      <footer className={`${rsiStyles.footer} ${visualStyle === 'atlas' ? atlasStyles.demoFooter : ''}`}>
        <div className={`${rsiStyles.controls} ${visualStyle === 'atlas' ? atlasStyles.demoControls : ''}`}>
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

const closingPrompts = [
  { number: '01', tone: 'teal', text: 'WHAT IS IT?' },
  { number: '02', tone: 'red', text: 'WHY NOW?' },
  { number: '03', tone: 'yellow', text: 'SO WHAT?' },
];

export function ClosingLab({
  visualStyle,
}: {
  visualStyle: DeckVisualStyle;
}) {
  if (visualStyle === 'machine') {
    return (
      <section className={closingMachineStyles.stage} aria-label="Closing thought: AI terms will change, but three useful questions remain">
        <div className={closingMachineStyles.ambient} aria-hidden="true" />
        <div className={closingMachineStyles.grid} aria-hidden="true" />

        <header className={closingMachineStyles.heading}>
          <h2>The terms will change. The questions won’t.</h2>
          <p>Use the same three questions for the next acronym.</p>
        </header>

        <main className={closingMachineStyles.questionGrid}>
          {closingPrompts.map((prompt) => (
            <article className={closingMachineStyles.question} data-tone={prompt.tone} key={prompt.number}>
              <span>{prompt.number}</span><strong>{prompt.text}</strong>
            </article>
          ))}
        </main>
        <footer className={closingMachineStyles.questionFooter}><span>THANK YOU</span></footer>
      </section>
    );
  }

  if (visualStyle === 'atlas') {
    return (
      <section className={`${atlasStyles.stage} ${atlasStyles.closingStage}`} aria-label="Closing thought: AI terms will change, but three useful questions remain">
        <aside className={atlasStyles.coverFolio}><span>FIELD GUIDE</span><strong>END</strong></aside>
        <header className={atlasStyles.closingHeading}>
          <span>END OF FIELD GUIDE</span>
          <h2>The terms will change.<br /><em>The questions won’t.</em></h2>
          <p>Use the same three questions for the next acronym.</p>
        </header>
        <main className={atlasStyles.closingQuestions}>
          {closingPrompts.map((prompt) => (
            <article data-tone={prompt.tone} key={prompt.number}><span>{prompt.number}</span><strong>{prompt.text}</strong></article>
          ))}
        </main>
        <footer className={atlasStyles.closingFooter}><span>THANK YOU</span></footer>
      </section>
    );
  }

  return (
    <section className={closingStyles.stage} aria-label="Closing thought: AI terms will change, but three useful questions remain">
      <header className={closingStyles.heading}>
        <h2>The terms will change. The questions won’t.</h2>
        <p>Use the same three questions for the next acronym.</p>
      </header>

      <main className={closingStyles.questionGrid}>
        {closingPrompts.map((prompt) => (
          <article className={closingStyles.question} data-tone={prompt.tone} key={prompt.number}>
            <span>{prompt.number}</span><strong>{prompt.text}</strong>
          </article>
        ))}
      </main>
      <footer className={closingStyles.questionFooter}><span>THANK YOU</span></footer>
    </section>
  );
}

const openingChapters: Array<{
  number: string;
  axis: string;
  from: string;
  to: string;
  terms: string[];
}> = [
  {
    number: '01',
    axis: 'COMPUTE',
    from: 'BIGGER',
    to: 'SMARTER',
    terms: ['MoE', 'DISTILLATION'],
  },
  {
    number: '02',
    axis: 'ACTION',
    from: 'ANSWERS',
    to: 'ACTIONS',
    terms: ['WORLD MODEL', 'VLA'],
  },
  {
    number: '03',
    axis: 'LEARNING',
    from: 'SHIPPING',
    to: 'LEARNING',
    terms: ['FDE', 'RSI'],
  },
];

const openingNoiseTerms = ['RAG', 'RLHF', 'DPO', 'GRPO', 'JEPA', 'PRM', 'C2PA', 'SLM', 'TTC', 'VLM', 'MCP', 'A2A'];

const openingSignalStarts = [
  { x: '22vw', y: '14vh', tilt: '-7deg' },
  { x: '-12vw', y: '8vh', tilt: '5deg' },
  { x: '16vw', y: '-10vh', tilt: '-4deg' },
  { x: '-18vw', y: '4vh', tilt: '8deg' },
  { x: '24vw', y: '-16vh', tilt: '4deg' },
  { x: '-22vw', y: '-9vh', tilt: '-6deg' },
];

export function OpeningLab({
  visualStyle,
}: {
  visualStyle: DeckVisualStyle;
}) {
  return (
    <section className={openingStoryStyles.stage} data-visual={visualStyle} aria-label="Six AI terms resolving into three shifts">
      <div className={openingStoryStyles.surface} aria-hidden="true" />
      <aside className={openingStoryStyles.folio} aria-hidden="true">
        <span>FIELD GUIDE</span><strong>AI</strong><small>06 TERMS<br />03 SHIFTS</small>
      </aside>

      <header className={openingStoryStyles.hero}>
        <span className={openingStoryStyles.kicker}>AI KEEPS INVENTING NEW TERMS.</span>
        <h1><span>Six terms.</span> <em>Three shifts.</em></h1>
        <p>Don’t memorize the acronyms. Follow the shift.</p>
      </header>

      <div className={openingStoryStyles.noiseField} aria-hidden="true">
        {openingNoiseTerms.map((term, index) => (
          <span key={term} style={{ '--noise-index': index } as CSSProperties}>{term}</span>
        ))}
      </div>

      <main className={openingStoryStyles.shiftMap} aria-label="Three AI shifts containing six selected terms">
        {openingChapters.map((chapter, chapterIndex) => (
          <article className={openingStoryStyles.track} key={chapter.number} style={{ '--track-index': chapterIndex } as CSSProperties}>
            <header><b>{chapter.number}</b><span>{chapter.axis}</span></header>
            <div className={openingStoryStyles.shiftWords}>
              <span>{chapter.from}</span><b>→</b><strong>{chapter.to}</strong>
            </div>
            <div className={openingStoryStyles.signalTerms}>
              {chapter.terms.map((term, termIndex) => {
                const signalIndex = chapterIndex * 2 + termIndex;
                const start = openingSignalStarts[signalIndex];
                return (
                  <strong
                    className={openingStoryStyles.signalTerm}
                    key={term}
                    style={{
                      '--signal-index': signalIndex,
                      '--from-x': start.x,
                      '--from-y': start.y,
                      '--tilt': start.tilt,
                    } as CSSProperties}
                  >
                    <span>0{termIndex + 1}</span>{term}
                  </strong>
                );
              })}
            </div>
          </article>
        ))}
      </main>
    </section>
  );
}
