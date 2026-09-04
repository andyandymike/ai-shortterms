'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from 'react';
import moeStyles from './moe-cinema.module.css';
import moeExhibitStyles from './moe-exhibit.module.css';
import fdeStyles from './fde-cinema.module.css';
import rsiStyles from './rsi-cinema.module.css';
import distillStyles from './distillation-story.module.css';
import distillExhibitStyles from './distillation-cinema.module.css';
import embodiedStyles from './embodied-cinema.module.css';
import worldStyles from './world-model-story.module.css';
import vlaStyles from './vla-story.module.css';
import fdeStoryStyles from './fde-story.module.css';
import rsiStoryStyles from './rsi-story.module.css';
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

function DemoStepRail({
  current,
  total,
  onStepChange,
  labels,
}: {
  current: number;
  total: number;
  onStepChange?: (index: number) => void;
  labels?: readonly string[];
}) {
  const interactive = Boolean(onStepChange);

  return (
    <div
      className="demo-step-rail"
      data-interactive={interactive || undefined}
      role={interactive ? 'navigation' : 'progressbar'}
      aria-label={interactive ? 'Demonstration chapters' : `Demonstration step ${current + 1} of ${total}`}
      {...(!interactive ? {
        'aria-valuemin': 1,
        'aria-valuemax': total,
        'aria-valuenow': current + 1,
      } : {})}
    >
      <div
        className="demo-step-segments"
        style={{ '--demo-step-count': total } as CSSProperties}
      >
        {Array.from({ length: total }, (_, index) => {
          const stepState = index < current ? 'complete' : index === current ? 'current' : 'upcoming';
          if (!onStepChange) return <i key={index} data-step-state={stepState} aria-hidden="true" />;

          return (
            <button
              key={index}
              type="button"
              data-step-state={stepState}
              aria-current={index === current ? 'step' : undefined}
              aria-label={`Go to ${labels?.[index] ?? `step ${index + 1}`}`}
              title={labels?.[index] ?? `Step ${index + 1}`}
              onClick={() => onStepChange(index)}
            />
          );
        })}
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
  intro: 'MoE means Mixture of Experts.',
  'dense-ready': 'In a dense model, every token uses the full compute block.',
  'dense-run': 'Adding dense capacity also adds work to every token.',
  router: 'In MoE, a router selects 8 of 256 available experts for this token.',
  experts: 'Only the 8 selected expert blocks run for this token.',
  mix: 'The 8 selected outputs combine into one result.',
  applications: 'DeepSeek-V3, Qwen3 MoE, and Kimi K2 are examples of MoE models.',
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
        <div className={atlasStyles.moeIntroMark}><strong>MoE</strong><small>MODEL ARCHITECTURE</small></div>
        <div className={atlasStyles.moeIntroExpansion}>
          <p><b>M</b><span>MIXTURE</span></p>
          <p><b>o</b><span>OF</span></p>
          <p><b>E</b><span>EXPERTS</span></p>
        </div>
      </section>

      <div className={atlasStyles.sentenceStrip} aria-label={`Sentence context. Current text fragment: ${currentToken}.`}>
        <small>NEXT-TOKEN PREDICTION</small>
        <p>{xrayTokens.map((token, index) => (
          <span key={`${token}-${index}`} data-current={token === currentToken || undefined}>{token}</span>
        ))}</p>
      </div>

      <div className={atlasStyles.moeToken} key={`atlas-token-${routeVersion}`}>
        <span>CURRENT TOKEN</span>
        <strong>{currentToken}</strong>
        <small>FROM THE CONTEXT ABOVE</small>
      </div>

      <div className={atlasStyles.taskRail} aria-hidden="true"><span>COMPUTE</span><i /></div>

      <section className={atlasStyles.companyAtlas}>
        <header>
          <span>COMPANY ANALOGY</span>
          <strong>MANY TEAMS · ONE TASK</strong>
        </header>

        <div className={atlasStyles.companyBuilding} key={`atlas-company-${routeVersion}`}>
          <div className={atlasStyles.companyNameplate}>
            <span>DENSE</span>
            <strong>FULL TEAM</strong>
            <em>MoE</em>
            <b>SELECTED TEAM</b>
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
            <span>DENSE MODEL</span>
            <strong>FULL<br />BLOCK</strong>
            <p>ONE TOKEN · WHOLE BLOCK</p>
          </section>

          <section className={atlasStyles.growthPanel}>
            <span>SCALING DENSE</span>
            <div><p><small>CAPACITY</small><strong>↑</strong></p><b>+</b><p><small>WORK / TOKEN</small><strong>↑</strong></p></div>
            <footer>MORE CAPACITY ADDS WORK TO EVERY TOKEN</footer>
          </section>

          <section className={atlasStyles.dispatchPanel}>
            <span>ROUTER</span>
            <strong><b>256</b><i>→</i><b>8</b></strong>
            <div><small>AVAILABLE</small><small>SELECTED</small></div>
          </section>

          <section className={atlasStyles.workRoomPanel}>
            <span>ONE SELECTED EXPERT</span>
            <div>
              <p data-ticket><small>TASK IN</small><b>{currentToken}</b></p><i>→</i>
              <p data-work><small>EXPERT BLOCK</small><b>COMPUTE</b></p><i>→</i>
              <p data-note><small>OUTPUT</small><b>RESULT</b></p>
            </div>
          </section>

          <section className={atlasStyles.editorPanel}>
            <span>COMBINE OUTPUTS</span>
            <div className={atlasStyles.noteStack}>
              {Array.from({ length: expertsActivatedPerToken }, (_, index) => (
                <i key={index} style={{ '--atlas-rank': `${index}` } as CSSProperties}>0{index + 1}</i>
              ))}
            </div>
            <b className={atlasStyles.notesArrow}>→</b>
            <p><small>ONE RESULT</small><strong>8 → 1</strong><em>NEXT LAYER</em></p>
          </section>
        </div>
      </section>

      <section className={atlasStyles.moeApplicationsAtlas}>
        <header><span>MODELS USING MoE</span><strong>TOTAL PARAMETERS → ACTIVE / TOKEN</strong></header>
        <div>
          <article data-tone="blue">
            <strong>DEEPSEEK-V3</strong>
            <p><b>671B</b><small>TOTAL</small><i>→</i><b>37B</b><small>ACTIVE</small></p>
          </article>
          <article data-tone="yellow">
            <strong>QWEN3 MoE</strong>
            <p><b>235B</b><small>TOTAL</small><i>→</i><b>22B</b><small>ACTIVE</small></p>
          </article>
          <article data-tone="red">
            <strong>KIMI K2</strong>
            <p><b>1T</b><small>TOTAL</small><i>→</i><b>32B</b><small>ACTIVE</small></p>
          </article>
        </div>
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
      title: 'One model, many expert blocks.',
      detail: 'A model keeps many expert compute blocks available and selects only a few for each token.',
      action: 'Show the dense model',
    },
    'dense-ready': {
      title: 'Dense: every token uses the full compute block.',
      detail: 'In the company analogy, every small task calls the whole team.',
      action: 'Add more capacity',
    },
    'dense-run': {
      title: 'A bigger dense model does more work for every token.',
      detail: 'Every new part of the block joins every task.',
      action: 'Switch to MoE',
    },
    router: {
      title: 'Router: 8 of 256 experts.',
      detail: 'This example keeps 256 available and routes the token to 8.',
      action: 'Open the selected experts',
    },
    experts: {
      title: 'Only those 8 experts run for this token.',
      detail: 'The other experts remain available but do not run for this token.',
      action: 'Combine their outputs',
    },
    mix: {
      title: 'Their outputs combine into one result.',
      detail: 'The model keeps a large capacity pool without using all of it every time.',
      action: 'Show real models',
    },
    applications: {
      title: 'Examples of MoE models.',
      detail: 'DeepSeek-V3, Qwen3 MoE, and Kimi K2 are examples of deployed MoE models.',
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
        {act === 'mix' && visualStyle !== 'atlas' && (
          <div key={`proof-${act}`} className={moeStyles.meaning}>
            <div className={moeStyles.publishedProof}>
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
              labels={visualStyle === 'atlas' ? ['Name', 'Dense', 'Cost', 'Route', 'Run', 'Combine', 'Examples'] : undefined}
              onStepChange={visualStyle === 'atlas' ? (index) => {
                setAct(atlasRouterActOrder[index]);
                setRouteVersion((current) => current + 1);
              } : undefined}
            />
          </div>
        </div>
      </footer>
    </section>
  );
}

type AtlasDistillationAct = 'intro' | 'why' | 'miss' | 'lesson' | 'train' | 'exam' | 'applications';
const atlasDistillationActOrder: AtlasDistillationAct[] = ['intro', 'why', 'miss', 'lesson', 'train', 'exam', 'applications'];

const atlasDistillationCopy: Record<AtlasDistillationAct, { title: string; action: string; phase: string }> = {
  intro: {
    title: 'A large model teaches a smaller model.',
    action: 'Why distill?',
    phase: 'NAME',
  },
  why: {
    title: 'A smaller model is easier to deploy.',
    action: 'Try the student',
    phase: 'WHY',
  },
  miss: {
    title: 'The student mistakes sarcasm for praise.',
    action: 'Ask the teacher',
    phase: 'MISS',
  },
  lesson: {
    title: 'The teacher explains intent, why, and action.',
    action: 'Train on many',
    phase: 'LESSON',
  },
  train: {
    title: 'Many examples update the student.',
    action: 'Remove the teacher',
    phase: 'TRAIN',
  },
  exam: {
    title: 'The student handles a new case alone.',
    action: 'Show real models',
    phase: 'ALONE',
  },
  applications: {
    title: 'Examples of distilled models.',
    action: 'Replay Distill',
    phase: 'EXAMPLES',
  },
};

function AtlasDistillationLab() {
  const visualStyle: DeckVisualStyle = 'atlas';
  const [act, setAct] = useState<AtlasDistillationAct>('intro');
  const actIndex = atlasDistillationActOrder.indexOf(act);
  const copy = atlasDistillationCopy[act];
  const lessonSamples = [
    ['“Perfect. Another forced restart.”', 'COMPLAINT'],
    ['“Great—my build vanished again.”', 'COMPLAINT'],
    ['“Love spending lunch watching a spinner.”', 'COMPLAINT'],
  ];

  const advanceAct = () => {
    if (actIndex === atlasDistillationActOrder.length - 1) {
      setAct('intro');
      return;
    }
    setAct(atlasDistillationActOrder[actIndex + 1]);
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

      <div className={`${distillStyles.sceneCopy} ${visualStyle === 'atlas' ? atlasStyles.demoSceneCopy : ''}`} aria-live="polite" key={act}>
        <strong>{copy.title}</strong>
      </div>

      <main className={distillStyles.storyStage}>
        {act === 'intro' && (
          <section className={distillStyles.introScene} aria-label="Knowledge distillation trains a separate smaller student from lessons produced by a larger teacher before deployment">
            <div className={distillStyles.introTeacher}>
              <span>LARGE TEACHER</span><strong>AI</strong><small>strong · expensive to call</small>
              <div>{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</div>
            </div>
            <div className={distillStyles.introLessons}>
              <span>MAKES</span><div><i /><i /><i /></div><strong>LESSONS</strong><b>→</b>
            </div>
            <div className={distillStyles.introStudent}>
              <span>SMALL STUDENT</span><strong>AI</strong><small>trained separately · runs alone</small>
              <div>{Array.from({ length: 8 }, (_, index) => <i key={index} />)}</div>
            </div>
          </section>
        )}

        {act === 'why' && (
          <section className={distillStyles.whyScene} aria-label="A capable large teacher is useful for creating lessons but is not practical for every device, private environment, or high-volume request">
            <div className={distillStyles.whyTeacher}>
              <span>ONE GREAT MODEL</span><strong>TEACHER</strong>
              <p><b>HIGH CAPABILITY</b><b>HIGH COST / CALL</b></p>
            </div>
            <div className={distillStyles.deployGate}><span>DEPLOYMENT LIMIT</span><i /><strong>×</strong><i /></div>
            <div className={distillStyles.endpointField}>
              <header><span>SMALL STUDENT</span><strong>DEPLOYMENT TARGETS</strong></header>
              <div>
                <article><span>PHONE</span><strong>PRIVATE</strong></article>
                <article><span>LAPTOP</span><strong>OFFLINE</strong></article>
                <article><span>ON-PREM</span><strong>CONTROLLED</strong></article>
                <article><span>1M REQUESTS</span><strong>HIGH VOLUME</strong></article>
              </div>
            </div>
          </section>
        )}

        {act === 'miss' && (
          <section className={distillStyles.missScene} aria-label="A smaller student mistakes a sarcastic VPN complaint for praise because it follows positive keywords literally">
            <article className={distillStyles.ticketSheet}>
              <header><span>VPN SUPPORT TICKET</span><strong>NEW</strong></header>
              <blockquote>
                <mark>Fantastic.</mark><br />
                The VPN disconnected <em>again</em><br />
                during the <em>client demo.</em><br />
                <mark>Love this update.</mark>
              </blockquote>
              <footer><span>SURFACE WORDS</span><b>Fantastic · Love</b><strong>HIDDEN INTENT?</strong></footer>
            </article>
            <div className={distillStyles.literalScanner}>
              <span>SMALL STUDENT</span>
              <div><b>Fantastic</b><b>Love</b></div>
              <b>→</b>
            </div>
            <article className={distillStyles.wrongReply}>
              <header><span>FIRST TRY</span><strong>WRONG</strong></header>
              <p><small>INTENT</small><strong>PRAISE</strong></p>
              <blockquote>“Glad to hear it!”</blockquote>
            </article>
          </section>
        )}

        {act === 'lesson' && (
          <section className={distillStyles.lessonScene} aria-label="The large teacher turns the sarcastic support message into a worked lesson containing intent, explanation, and next action">
            <article className={distillStyles.annotatedTicket}>
              <span>ORIGINAL MESSAGE</span>
              <blockquote><mark>Fantastic</mark> · VPN disconnected <em>again</em> · <mark>Love</mark> this update</blockquote>
              <div><i /><b>positive words</b></div><div><i /><b>repeated failure</b></div>
              <footer>CONTRADICTION = SARCASM</footer>
            </article>
            <article className={distillStyles.workedLesson}>
              <header><span>TEACHER LESSON</span></header>
              <p><span>INTENT</span><strong>FRUSTRATED COMPLAINT</strong></p>
              <p><span>WHY</span><strong>Positive words contradict a repeated failure.</strong></p>
              <p><span>ACTION</span><strong>Apologize · route VPN incident · ask for session ID.</strong></p>
            </article>
          </section>
        )}

        {act === 'train' && (
          <section className={distillStyles.trainScene} aria-label="Many varied teacher-generated lessons are compared with student attempts and collectively change the smaller student's behavior">
            <div className={distillStyles.lessonConveyor}>
              {lessonSamples.map(([message, intent], index) => (
                <article key={message} style={{ '--lesson-index': index } as CSSProperties}>
                  <span>LESSON 0{index + 1}</span><strong>{message}</strong><b>{intent}</b>
                </article>
              ))}
            </div>
            <div className={distillStyles.trainingPress}>
              <span>COMPARE ONE TRY</span>
              <p data-student><small>STUDENT GUESSES</small><strong>PRAISE</strong></p>
              <b>≠</b>
              <p data-teacher><small>TEACHER LESSON</small><strong>COMPLAINT</strong></p>
              <i />
              <strong>SMALL<br />UPDATE ↓</strong>
              <small>repeat with many lessons</small>
            </div>
            <div className={distillStyles.behaviorLedger}>
              <header><span>SMALL STUDENT</span><strong>BEHAVIOR CHANGES</strong></header>
              <p data-before><span>BEFORE</span><strong>POSITIVE WORD → PRAISE</strong></p>
              <b>↓</b>
              <p data-after><span>AFTER MANY LESSONS</span><strong>CONTEXT → CONTRADICTION → INTENT</strong></p>
              <div>{Array.from({ length: 20 }, (_, index) => <i key={index} style={{ '--weight-cell': index } as CSSProperties} />)}</div>
            </div>
          </section>
        )}

        {act === 'exam' && (
          <section className={distillStyles.examScene} aria-label="The teacher is offline while the trained student correctly understands a new sarcastic support complaint">
            <div className={distillStyles.teacherOffline}><span>LARGE TEACHER</span><strong>OFFLINE</strong><small>NO RUNTIME CALL</small></div>
            <article className={distillStyles.examTicket}>
              <header><span>NEW MESSAGE · NEVER SEEN</span><strong>TICKET 7294</strong></header>
              <blockquote>“Wonderful—my reset link arrived after it had already expired.”</blockquote>
            </article>
            <article className={distillStyles.examAnswer}>
              <header><span>SMALL STUDENT</span><strong>RUNS ALONE</strong></header>
              <p><span>INTENT</span><strong>FRUSTRATED COMPLAINT</strong></p>
              <blockquote>“Sorry—the link expired. I&apos;ll issue a new one and investigate the delay.”</blockquote>
              <b>CORRECT READ ✓</b>
            </article>
          </section>
        )}

        {act === 'applications' && (
          <section className={distillStyles.applicationsScene} aria-label="Real model families use distillation for on-device intelligence, efficient open models, and smaller reasoning models">
            <div>
              <article data-tone="red">
                <strong>APPLE FOUNDATION MODEL</strong>
                <p><b>DISTILLED</b><i>→</i><em>~3B</em></p><small>ON-DEVICE</small>
              </article>
              <article data-tone="yellow">
                <strong>GEMMA 2</strong>
                <p><b>27B TEACHER</b><i>→</i><em>2B / 9B</em></p><small>OPEN + EDGE</small>
              </article>
              <article data-tone="blue">
                <strong>DEEPSEEK-R1 DISTILL</strong>
                <p><b>R1 LESSONS</b><i>→</i><em>1.5B–70B</em></p><small>REASONING</small>
              </article>
            </div>
          </section>
        )}
      </main>

      <footer className={`${moeStyles.footer} ${atlasStyles.demoFooter}`}>
        <div className={`${moeStyles.controls} ${atlasStyles.demoControls}`}>
          <button onClick={() => setAct('intro')} aria-label="Reset the distillation demonstration">Reset</button>
          <div className="demo-action-stack">
            <button data-primary onClick={advanceAct}>{copy.action}<b>→</b></button>
            <DemoStepRail
              current={actIndex}
              total={atlasDistillationActOrder.length}
              labels={['Name', 'Why', 'Miss', 'Lesson', 'Train', 'Alone', 'Examples']}
              onStepChange={(index) => setAct(atlasDistillationActOrder[index])}
            />
          </div>
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
          <video ref={vlaVideoRef} muted playsInline preload="auto" poster="/media/unitree-wvla2-proof.png">
            <source src="/media/unitree-wvla2-highlight.mp4" type="video/mp4" />
          </video>
          <p><span>OFFICIAL RECORDING · EDITED EXCERPTS</span><strong>UNITREE WVLA 2.0</strong></p>
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
          <video ref={vlaVideoRef} muted playsInline preload="auto" poster="/media/unitree-wvla2-proof.png">
            <source src="/media/unitree-wvla2-highlight.mp4" type="video/mp4" />
          </video>
          <p><span>OFFICIAL RECORDING · EDITED EXCERPTS</span><strong>UNITREE WVLA 2.0</strong><small>multi-task autonomous operation</small></p>
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

type AtlasWorldAct = 'intro' | 'why' | 'learn' | 'actions' | 'plan' | 'forms' | 'proof';
type AtlasStreetVariant = 'now' | 'left' | 'straight' | 'right' | 'guess' | 'actual';

const atlasWorldActOrder: AtlasWorldAct[] = ['intro', 'why', 'learn', 'actions', 'plan', 'forms', 'proof'];

const atlasWorldCopy: Record<AtlasWorldAct, { title: string; action: string }> = {
  intro: {
    title: 'A World Model predicts what happens next.',
    action: 'Why predict?',
  },
  why: {
    title: 'Seeing the present is not predicting the future.',
    action: 'Watch it learn',
  },
  learn: {
    title: 'Watch. Guess. Check. Adjust.',
    action: 'Try three actions',
  },
  actions: {
    title: 'One scene. Three actions. Three futures.',
    action: 'Plan before moving',
  },
  plan: {
    title: 'Imagine ahead. Move once. Replan.',
    action: 'What does it build?',
  },
  forms: {
    title: 'A useful future can be visible or hidden.',
    action: 'Show real systems',
  },
  proof: {
    title: 'Visible future. Hidden future.',
    action: 'Replay World Model',
  },
};

const atlasStreetPath: Record<AtlasStreetVariant, string> = {
  now: 'M 50 91 C 50 75 50 68 50 60',
  left: 'M 50 91 C 49 72 42 53 24 23',
  straight: 'M 50 91 C 50 68 50 43 50 17',
  right: 'M 50 91 C 54 68 66 49 79 27',
  guess: 'M 50 91 C 52 68 59 48 65 25',
  actual: 'M 50 91 C 51 69 53 47 54 22',
};

function AtlasStreetScene({
  variant,
  label,
  animate = false,
  live = false,
}: {
  variant: AtlasStreetVariant;
  label: string;
  animate?: boolean;
  live?: boolean;
}) {
  return (
    <div
      className={worldStyles.streetScene}
      data-variant={variant}
      data-animate={animate ? true : undefined}
      data-live={live ? true : undefined}
      aria-label={label}
    >
      <span className={worldStyles.goalZone}>GOAL</span>
      <i className={worldStyles.curb}>CURB</i>
      <svg className={worldStyles.streetPath} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d={atlasStreetPath[variant]} pathLength="1" />
      </svg>
      <b className={worldStyles.streetRobot}><span>BOT</span></b>
      <small className={worldStyles.streetLabel}>{label}</small>
    </div>
  );
}

function AtlasWorldLab({ isActive }: { isActive: boolean }) {
  const [act, setAct] = useState<AtlasWorldAct>('intro');
  const videoRef = useRef<HTMLVideoElement>(null);
  const actIndex = atlasWorldActOrder.indexOf(act);
  const copy = atlasWorldCopy[act];

  useEffect(() => {
    const video = videoRef.current;
    video?.pause();
    if (!video || !isActive || act !== 'proof') return;

    let cancelled = false;
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) video.currentTime = 0;
    void video.play().catch((error: unknown) => {
      if (cancelled || (error instanceof DOMException && error.name === 'AbortError')) return;
      video.pause();
      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) video.currentTime = 0;
    });

    return () => {
      cancelled = true;
      video.pause();
    };
  }, [act, isActive]);

  const advanceAct = () => {
    if (actIndex === atlasWorldActOrder.length - 1) {
      setAct('intro');
      return;
    }
    setAct(atlasWorldActOrder[actIndex + 1]);
  };

  return (
    <section
      className={`${embodiedStyles.stage} ${atlasStyles.embodiedHost} ${worldStyles.host}`}
      data-act={act}
      data-phase="world"
      data-visual="atlas"
      aria-label={`Atlas World Model demonstration. ${copy.title}`}
    >
      <ConceptHeader code="WORLD" name="World Model" visualStyle="atlas" />
      <ConceptFolio visualStyle="atlas" number="02" side="A" label={'PREDICTIVE\nSYSTEMS'} />

      <div className={`${embodiedStyles.sceneCopy} ${atlasStyles.demoSceneCopy} ${worldStyles.sceneCopy}`} aria-live="polite" key={act}>
        <strong>{copy.title}</strong>
      </div>

      <main className={worldStyles.storyStage}>
        {act === 'intro' && (
          <section className={worldStyles.introScene} aria-label="Language models predict text, vision models recognize the present, and world models predict how a situation changes">
            <article className={worldStyles.wordPredictor}>
              <span>LANGUAGE MODEL</span><strong>NEXT WORD</strong>
              <p>The robot moves <mark>forward</mark></p>
            </article>
            <article className={worldStyles.visionPredictor}>
              <span>VISION MODEL</span><strong>WHAT IS HERE</strong>
              <AtlasStreetScene variant="now" label="BOT · ROAD · CURB" live />
            </article>
            <article className={worldStyles.situationPredictor}>
              <span>WORLD MODEL</span><strong>WHAT HAPPENS NEXT</strong>
              <div className={worldStyles.worldTransition}>
                <AtlasStreetScene variant="now" label="NOW" />
                <b><small>ACTION</small>↑</b>
                <AtlasStreetScene variant="actual" label="NEXT" animate />
              </div>
            </article>
          </section>
        )}

        {act === 'why' && (
          <section className={worldStyles.whyScene} aria-label="A visual snapshot can describe the present but cannot tell an agent what each action will cause">
            <article className={worldStyles.snapshotPanel}>
              <span>SNAPSHOT</span><strong>WHAT IS HERE?</strong>
              <AtlasStreetScene variant="now" label="ROBOT · ROAD · CURB" />
              <p><b>ROBOT</b><b>ROAD</b><b>CURB</b></p>
            </article>
            <div className={worldStyles.whyGap}><b>?</b><span>AFTER A MOVE</span></div>
            <article className={worldStyles.consequencePanel}>
              <span>CONSEQUENCES</span><strong>WHAT IF I…?</strong>
              <div>
                <p><b>↖</b><span>TURN LEFT</span><strong>?</strong></p>
                <p><b>↑</b><span>GO STRAIGHT</span><strong>?</strong></p>
                <p><b>↗</b><span>TURN RIGHT</span><strong>?</strong></p>
              </div>
            </article>
          </section>
        )}

        {act === 'learn' && (
          <section className={worldStyles.learnScene} aria-label="A world model watches real action and result pairs, predicts the next state, compares it with reality, and adjusts">
            <div className={worldStyles.realTrajectory}>
              <article><span>01 · WATCH</span><AtlasStreetScene variant="now" label="NOW" /></article>
              <b><small>ACTION</small>↑</b>
              <article data-guess><span>02 · GUESS</span><AtlasStreetScene variant="guess" label="PREDICTED" animate /></article>
              <article data-actual><span>03 · CHECK</span><AtlasStreetScene variant="actual" label="REALITY" animate /></article>
            </div>
            <div className={worldStyles.learningCheck}>
              <span>PREDICTION ≠ REALITY</span>
              <strong>04 · ADJUST</strong>
              <p>The next guess moves a little closer.</p>
            </div>
            <div className={worldStyles.learningLoop}>
              <b>↺ REPEAT ACROSS MANY REAL SEQUENCES</b>
            </div>
          </section>
        )}

        {act === 'actions' && (
          <section className={worldStyles.actionsScene} aria-label="From the same current state at t, three candidate actions predict alternative results at t+1, not three steps in sequence. No route has been chosen.">
            <article className={worldStyles.currentState}>
              <span>NOW · t</span>
              <AtlasStreetScene variant="now" label="SAME START" />
              <strong>REALITY HAS NOT MOVED</strong>
            </article>
            <div className={worldStyles.actionFork}>
              {[
                ['↖', 'TURN LEFT', 'left', 'SAFE · OFF GOAL'],
                ['↑', 'GO STRAIGHT', 'straight', 'SAFE · TOWARD GOAL'],
                ['↗', 'TURN RIGHT', 'right', 'CONTACT · CURB'],
              ].map(([symbol, label, variant, result], index) => (
                <article key={label}>
                  <header><b>{symbol}</b><span>{label}</span></header>
                  <AtlasStreetScene variant={variant as AtlasStreetVariant} label={`FUTURE ${index + 1} · t+1`} animate />
                  <footer>{result}</footer>
                </article>
              ))}
            </div>
            <footer className={worldStyles.predictionCaption}>
              <span>THREE POSSIBLE FUTURES · SAME NEXT MOMENT</span>
              <strong>NO ROUTE CHOSEN</strong>
            </footer>
          </section>
        )}

        {act === 'plan' && (
          <section className={worldStyles.planScene} aria-label="A planner predicts several steps along each route and chooses B based on safety and progress to the goal. Only the first segment to t+1 is selected for execution; later steps stay imagined. Look again and replan after that action.">
            <div className={worldStyles.planMap}>
              <span className={worldStyles.planGoal}>GOAL</span>
              <i className={worldStyles.planCurb}>CURB</i>
              <b className={worldStyles.planStart}>BOT · NOW</b>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path data-route="a" d="M50 92 C28 73 23 49 39 14" />
                <path data-route="b" d="M50 92 L50 66 L50 40 L50 14" />
                <path data-route="c" d="M50 92 C66 71 76 52 82 29" />
                <path data-execution="outline" d="M50 92 L50 66" />
                <path data-execution="first" d="M50 92 L50 66" />
              </svg>
              <span className={worldStyles.routeA}>A</span><span className={worldStyles.routeB}>B</span><span className={worldStyles.routeC}>C</span>
              {[66, 40, 14].map((top, index) => (
                <span
                  key={top}
                  className={worldStyles.planStep}
                  style={{ top: `${top}%` }}
                  data-next={index === 0 ? true : undefined}
                  aria-label={`Predicted step ${index + 1}${index === 0 ? ': execute only the first action' : ': still imagined'}`}
                >
                  <b>{index + 1}</b><span>t+{index + 1}</span>
                </span>
              ))}
            </div>
            <div className={worldStyles.routeScores}>
              <header><span>IMAGINED ROUTES</span><strong>GOAL: BLUE ZONE</strong></header>
              <p><b>A</b><span>SAFE · DETOUR</span><strong>GOOD</strong></p>
              <p data-selected><b>B</b><span>SAFE · DIRECT</span><strong>SELECT</strong></p>
              <p data-risk><b>C</b><span>HITS CURB</span><strong>REJECT</strong></p>
              <footer>
                <span>EXECUTE IN REALITY</span>
                <strong>↑ ONE ACTION</strong>
                <small>↺ LOOK AGAIN · REPLAN</small>
              </footer>
            </div>
          </section>
        )}

        {act === 'forms' && (
          <section className={worldStyles.formsScene} aria-label="A world model may render a visible future or keep a compact hidden predictive state">
            <article className={worldStyles.visibleFuture}>
              <span>VISIBLE FUTURE</span><strong>PIXELS / VIDEO</strong>
              <AtlasStreetScene variant="straight" label="A PERSON CAN WATCH IT" animate />
            </article>
            <b className={worldStyles.formsEquals}>=</b>
            <article className={worldStyles.hiddenFuture}>
              <span>HIDDEN FUTURE</span><strong>PREDICTIVE STATE</strong>
              <div className={worldStyles.latentState}>
                <p><b>BOT POSITION</b><i style={{ '--latent-width': '62%' } as CSSProperties} /></p>
                <p><b>CURB DISTANCE</b><i style={{ '--latent-width': '78%' } as CSSProperties} /></p>
                <p><b>GOAL PROGRESS</b><i style={{ '--latent-width': '50%' } as CSSProperties} /></p>
              </div>
              <small>enough state to judge: safe and closer?</small>
            </article>
            <p className={worldStyles.formsQuestion}><span>SAME JOB</span><strong>WILL THIS ACTION REACH THE GOAL SAFELY?</strong></p>
          </section>
        )}

        {act === 'proof' && (
          <section className={worldStyles.proofScene} aria-label="V-JEPA 2 uses an internal world model for robot planning while Genie 3 makes an interactive predicted world visible">
            <article className={worldStyles.genieProof}>
              <header><span>VISIBLE WORLD</span><strong>GENIE 3</strong></header>
              <div className={worldStyles.genieVideoCrop}>
                <video ref={videoRef} loop muted playsInline preload="auto" poster="/media/genie3-proof.png">
                  <source src="/media/genie3-interaction.mp4" type="video/mp4" />
                </video>
              </div>
              <footer><span>INTERACTIVE WORLD</span><strong>SEE THE FUTURE</strong></footer>
            </article>
            <article className={worldStyles.vjepaProof}>
              <header><span>HIDDEN WORLD</span><strong>V-JEPA 2</strong></header>
              <div className={worldStyles.robotPlanProof}>
                <p><span>CURRENT</span><b>●</b></p>
                <p><span>TRY ACTIONS</span><b>↖ ↑ ↗</b></p>
                <p><span>GOAL</span><b>■</b></p>
              </div>
              <footer><span>ROBOT PLANNING</span><strong>NO VIDEO NEEDED</strong></footer>
            </article>
            <div className={worldStyles.worldUses}>
              <p><span>01</span><strong>TRAIN AGENTS SAFELY</strong></p>
              <p><span>02</span><strong>TEST “WHAT IF?”</strong></p>
              <p><span>03</span><strong>PLAN ROBOT ACTIONS</strong></p>
            </div>
          </section>
        )}
      </main>

      <footer className={`${moeStyles.footer} ${atlasStyles.demoFooter}`}>
        <div className={`${moeStyles.controls} ${atlasStyles.demoControls}`}>
          <button onClick={() => setAct('intro')} disabled={act === 'intro'} aria-label="Reset the Atlas World Model demonstration">Reset</button>
          <div className="demo-action-stack">
            <button data-primary onClick={advanceAct}><span>{copy.action}</span><b>→</b></button>
            <DemoStepRail
              current={actIndex}
              total={atlasWorldActOrder.length}
              labels={['Name', 'Why', 'Learn', 'Futures', 'Plan', 'Form', 'Examples']}
              onStepChange={(index) => setAct(atlasWorldActOrder[index])}
            />
          </div>
        </div>
      </footer>
    </section>
  );
}

type AtlasVlaAct = 'intro' | 'why' | 'steps' | 'learn' | 'loop' | 'hard' | 'proof';
type VlaWorkcellVariant = 'start' | 'expert' | 'slip' | 'correct' | 'done' | 'collision';

const atlasVlaActOrder: AtlasVlaAct[] = ['intro', 'why', 'steps', 'learn', 'loop', 'hard', 'proof'];
const atlasVlaCopy: Record<AtlasVlaAct, { title: string; action: string }> = {
  intro: {
    title: 'VLA turns a scene and a goal into movement.',
    action: 'Why is that hard?',
  },
  why: {
    title: 'One sentence hides many physical decisions.',
    action: 'Unpack the task',
  },
  steps: {
    title: 'One goal becomes a chain of movements.',
    action: 'How does it learn?',
  },
  learn: {
    title: 'Watch. Hide. Guess. Check. Adjust.',
    action: 'Let reality answer',
  },
  loop: {
    title: 'Act a little. Look again. Correct.',
    action: 'Why is this harder than chat?',
  },
  hard: {
    title: 'A bad word is editable. A bad motion is already real.',
    action: 'See a real system',
  },
  proof: {
    title: 'Vision. Language. Whole-body action.',
    action: 'Replay VLA',
  },
};

const vlaWorkcellGeometry: Record<VlaWorkcellVariant, {
  elbow: [number, number];
  end: [number, number];
  block: [number, number, number];
  path: string;
}> = {
  start: { elbow: [91, 79], end: [128, 93], block: [167, 135, 0], path: 'M128 93 C145 92 154 107 166 126' },
  expert: { elbow: [102, 78], end: [153, 111], block: [167, 135, 0], path: 'M128 93 C143 96 151 103 158 122' },
  slip: { elbow: [104, 76], end: [158, 106], block: [178, 148, 18], path: 'M128 93 C149 95 158 103 173 137' },
  correct: { elbow: [99, 80], end: [151, 116], block: [162, 135, 0], path: 'M128 93 C142 96 146 108 158 128' },
  done: { elbow: [119, 75], end: [202, 105], block: [222, 132, 0], path: 'M128 93 C162 80 190 91 218 122' },
  collision: { elbow: [114, 78], end: [188, 108], block: [202, 137, 24], path: 'M128 93 C157 92 179 101 198 127' },
};

function VlaWorkcellScene({
  variant,
  label,
  animate = false,
}: {
  variant: VlaWorkcellVariant;
  label: string;
  animate?: boolean;
}) {
  const geometry = vlaWorkcellGeometry[variant];
  const [elbowX, elbowY] = geometry.elbow;
  const [endX, endY] = geometry.end;
  const [blockX, blockY, blockRotation] = geometry.block;

  return (
    <div className={vlaStyles.workcell} data-variant={variant} data-animate={animate || undefined} role="img" aria-label={label}>
      <svg viewBox="0 0 260 175" aria-hidden="true">
        <rect className={vlaStyles.workcellWall} x="0" y="0" width="260" height="175" />
        <path className={vlaStyles.table} d="M0 145 H260 V175 H0 Z" />
        <rect className={vlaStyles.tray} x="211" y="116" width="39" height="29" rx="2" />
        <text className={vlaStyles.trayLabel} x="230" y="133">TRAY</text>
        <rect className={vlaStyles.obstacle} x="186" y="92" width="12" height="53" rx="2" />
        <text className={vlaStyles.obstacleLabel} x="192" y="87">OBSTACLE</text>
        <g className={vlaStyles.robotArm}>
          <rect x="27" y="112" width="39" height="33" rx="3" />
          <circle cx="57" cy="111" r="10" />
          <line x1="57" y1="111" x2={elbowX} y2={elbowY} />
          <circle cx={elbowX} cy={elbowY} r="8" />
          <line x1={elbowX} y1={elbowY} x2={endX} y2={endY} />
          <circle cx={endX} cy={endY} r="6" />
          <g className={vlaStyles.gripper} transform={`translate(${endX} ${endY})`}>
            <path d="M-2 2 l8 8 M2 -2 l9 3" />
          </g>
        </g>
        <path className={vlaStyles.motionPath} d={geometry.path} pathLength="1" />
        <circle className={vlaStyles.motionPulse} cx="0" cy="0" r="5">
          <animateMotion dur="2.4s" repeatCount="indefinite" path={geometry.path} />
        </circle>
        <g className={vlaStyles.blockShape} transform={`rotate(${blockRotation} ${blockX} ${blockY})`}>
          <rect x={blockX - 10} y={blockY - 10} width="20" height="20" rx="2" />
          <text x={blockX} y={blockY + 3}>BLOCK</text>
        </g>
        <circle className={vlaStyles.cameraDot} cx="239" cy="18" r="7" />
        <path className={vlaStyles.cameraSweep} d="M239 24 L210 78 H257 Z" />
      </svg>
      <span className={vlaStyles.workcellLabel}>{label}</span>
    </div>
  );
}

function AtlasVlaLab({ isActive }: { isActive: boolean }) {
  const [act, setAct] = useState<AtlasVlaAct>('intro');
  const videoRef = useRef<HTMLVideoElement>(null);
  const actIndex = atlasVlaActOrder.indexOf(act);
  const copy = atlasVlaCopy[act];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    if (!isActive || act !== 'proof') {
      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) video.currentTime = 0;
      return;
    }

    let cancelled = false;
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) video.currentTime = 0;
    void video.play().catch((error: unknown) => {
      if (cancelled || (error instanceof DOMException && error.name === 'AbortError')) return;
      video.pause();
    });

    return () => {
      cancelled = true;
      video.pause();
    };
  }, [act, isActive]);

  const advanceAct = () => {
    if (actIndex === atlasVlaActOrder.length - 1) {
      setAct('intro');
      return;
    }
    setAct(atlasVlaActOrder[actIndex + 1]);
  };

  return (
    <section
      className={`${embodiedStyles.stage} ${atlasStyles.embodiedHost} ${vlaStyles.host}`}
      data-act={act}
      data-phase="vla"
      data-visual="atlas"
      aria-label={`Atlas VLA demonstration. ${copy.title}`}
    >
      <ConceptHeader code="VLA" name="Vision · Language · Action" visualStyle="atlas" />
      <ConceptFolio visualStyle="atlas" number="02" side="B" label={'EMBODIED\nSYSTEMS'} />

      <div className={`${embodiedStyles.sceneCopy} ${atlasStyles.demoSceneCopy} ${vlaStyles.sceneCopy}`} aria-live="polite" key={act}>
        <strong>{copy.title}</strong>
      </div>

      <main className={vlaStyles.storyStage} key={`vla-${act}`}>
        {act === 'intro' && (
          <section className={vlaStyles.introScene} aria-label="Vision and language are combined to produce a physical action">
            <article className={vlaStyles.introVision}>
              <span>VISION</span>
              <strong>WHAT IS HERE?</strong>
              <VlaWorkcellScene variant="start" label="BLOCK · TRAY · OBSTACLE" animate />
            </article>
            <article className={vlaStyles.introLanguage}>
              <span>LANGUAGE</span>
              <strong>WHAT DO YOU WANT?</strong>
              <blockquote>“Put the orange block in the tray.”</blockquote>
            </article>
            <article className={vlaStyles.introAction}>
              <span>ACTION</span>
              <strong>WHAT SHOULD THE BODY DO?</strong>
              <VlaWorkcellScene variant="expert" label="REACH TOWARD THE BLOCK" animate />
            </article>
            <footer className={vlaStyles.introFormula}>
              <span>V</span><b>+</b><span>L</span><b>→</b><strong>VLA</strong><b>→</b><span>A</span>
            </footer>
          </section>
        )}

        {act === 'why' && (
          <section className={vlaStyles.whyScene} aria-label="A language goal does not specify the physical decisions needed to complete it">
            <article className={vlaStyles.wordsPanel}>
              <span>THE GOAL</span>
              <blockquote>“Put the orange block in the tray.”</blockquote>
              <strong>1 SENTENCE</strong>
            </article>
            <b className={vlaStyles.notEqual}>≠</b>
            <article className={vlaStyles.bodyPanel}>
              <VlaWorkcellScene variant="start" label="THE BODY STILL HAS QUESTIONS" />
              <div className={vlaStyles.bodyQuestions}>
                {[
                  ['01', 'WHICH?', 'find the right object'],
                  ['02', 'HOW?', 'reach around the obstacle'],
                  ['03', 'ENOUGH?', 'grip, move, and know when to stop'],
                ].map(([number, question, detail]) => <p key={number}><span>{number}</span><strong>{question}</strong><small>{detail}</small></p>)}
              </div>
            </article>
            <footer><span>LANGUAGE SAYS</span><strong>WHAT</strong><b>·</b><span>ACTION MUST DECIDE</span><strong>HOW</strong></footer>
          </section>
        )}

        {act === 'steps' && (
          <section className={vlaStyles.stepsScene} aria-label="One language goal unfolds into six coordinated robot movements">
            <article className={vlaStyles.stepsWorkcell}>
              <blockquote>“Put the orange block in the tray.”</blockquote>
              <VlaWorkcellScene variant="done" label="ONE BODY · ONE PHYSICAL TASK" animate />
            </article>
            <ol className={vlaStyles.actionChain}>
              {[
                ['01', 'FIND', 'orange block'],
                ['02', 'REACH', 'avoid obstacle'],
                ['03', 'ALIGN', 'hand + block'],
                ['04', 'GRIP', 'enough force'],
                ['05', 'LIFT', 'hold it'],
                ['06', 'PLACE', 'inside tray'],
              ].map(([number, verb, detail]) => <li key={number}><span>{number}</span><strong>{verb}</strong><small>{detail}</small></li>)}
            </ol>
            <footer><span>1 GOAL</span><b>→</b><strong>6 COORDINATED MOVES</strong></footer>
          </section>
        )}

        {act === 'learn' && (
          <section className={vlaStyles.learnScene} aria-label="A VLA learns from recorded robot demonstrations by hiding and predicting the expert's next move">
            <div className={vlaStyles.lessonTrack}>
              <article className={vlaStyles.lessonWatch}>
                <span>01 · WATCH</span>
                <VlaWorkcellScene variant="start" label="SCENE + GOAL" />
              </article>
              <article className={vlaStyles.lessonHide}>
                <span>02 · HIDE</span>
                <strong>?</strong>
                <small>expert&apos;s next move</small>
              </article>
              <article className={vlaStyles.lessonGuess}>
                <span>03 · GUESS</span>
                <strong>REACH RIGHT</strong>
                <i>model</i>
              </article>
              <article className={vlaStyles.lessonCheck}>
                <span>04 · CHECK</span>
                <strong>REACH UP-RIGHT</strong>
                <i>expert</i>
              </article>
            </div>
            <aside className={vlaStyles.lessonAdjust}>
              <span>05</span>
              <strong>ADJUST</strong>
            </aside>
            <footer><span>GUESS ≠ DEMO</span><b>→</b><strong>ADJUST</strong><b>↺</b><span>MANY ROBOT DEMONSTRATIONS</span></footer>
          </section>
        )}

        {act === 'loop' && (
          <section className={vlaStyles.loopScene} aria-label="An illustrative VLA control loop acts briefly, observes a slipped block, and corrects the next action">
            <article className={vlaStyles.loopFrame} data-fail>
              <span>01 · ACT A LITTLE</span>
              <VlaWorkcellScene variant="slip" label="THE BLOCK SLIPPED" animate />
              <strong>GRASP STABLE? <b>NO</b></strong>
            </article>
            <div className={vlaStyles.realityTurn}>
              <span>NEXT CAMERA FRAME</span>
              <strong>REALITY ANSWERS</strong>
              <b>→</b>
            </div>
            <article className={vlaStyles.loopFrame} data-correct>
              <span>02 · LOOK AGAIN + CORRECT</span>
              <VlaWorkcellScene variant="correct" label="SHIFT LEFT · RE-GRIP" animate />
              <strong>NEXT ACTION <b>CHANGES</b></strong>
            </article>
            <footer><span>ACT</span><b>→</b><span>LOOK</span><b>→</b><span>CORRECT</span><b>↺</b></footer>
          </section>
        )}

        {act === 'hard' && (
          <section className={vlaStyles.hardScene} aria-label="Text errors are easy to edit while robot errors have physical consequences">
            <article className={vlaStyles.wordMistake}>
              <span>BAD WORD</span>
              <p>Pick up <del>teh</del> <mark>the</mark> block.</p>
              <strong>UNDO · TRY AGAIN</strong>
            </article>
            <b className={vlaStyles.hardVs}>VS</b>
            <article className={vlaStyles.motionMistake}>
              <span>BAD MOTION</span>
              <VlaWorkcellScene variant="collision" label="CONTACT · OBSTACLE" animate />
              <strong>CONTACT ALREADY HAPPENED</strong>
            </article>
            <div className={vlaStyles.hardConstraints}>
              {[
                ['01', 'SPACE', 'objects in 3D'],
                ['02', 'TIMING + FORCE', 'gentle + on time'],
                ['03', 'DATA + SAFETY', 'costly + safety-critical'],
              ].map(([number, label, detail]) => <p key={number}><span>{number}</span><strong>{label}</strong><small>{detail}</small></p>)}
            </div>
          </section>
        )}

        {act === 'proof' && (
          <section className={vlaStyles.proofScene} aria-label="Edited excerpts from the official Unitree WVLA 2.0 multi-task autonomous robot demonstration">
            <article className={vlaStyles.proofVideo}>
              <video ref={videoRef} muted playsInline preload="auto" poster="/media/unitree-wvla2-proof.png">
                <source src="/media/unitree-wvla2-highlight.mp4" type="video/mp4" />
              </video>
              <footer><span>OFFICIAL RECORDING · EDITED EXCERPTS</span><strong>UNITREE WVLA 2.0</strong></footer>
            </article>
            <article className={vlaStyles.proofFacts}>
              <p><span>VISION</span><strong>SEE THE SCENE</strong></p>
              <p><span>LANGUAGE</span><strong>FOLLOW THE GOAL</strong></p>
              <p><span>ACTION</span><strong>CONTROL THE BODY</strong></p>
              <aside><span>OFFICIAL DESCRIPTION</span><strong>ONE TAKE</strong><small>Multi-task · fully autonomous · strong interference.</small></aside>
            </article>
            <footer className={vlaStyles.proofUses}>
              <span>TABLETOP TASKS</span><b>·</b><span>ROOM NAVIGATION</span><b>·</b><span>EXTERNAL INTERFERENCE</span>
            </footer>
          </section>
        )}
      </main>

      <footer className={`${moeStyles.footer} ${atlasStyles.demoFooter}`}>
        <div className={`${moeStyles.controls} ${atlasStyles.demoControls}`}>
          <button onClick={() => setAct('intro')} disabled={act === 'intro'} aria-label="Reset the Atlas VLA demonstration">Reset</button>
          <div className="demo-action-stack">
            <button data-primary onClick={advanceAct}><span>{copy.action}</span><b>→</b></button>
            <DemoStepRail
              current={actIndex}
              total={atlasVlaActOrder.length}
              labels={['Name', 'Why', 'Steps', 'Learn', 'Feedback', 'Hard', 'Example']}
              onStepChange={(index) => setAct(atlasVlaActOrder[index])}
            />
          </div>
        </div>
      </footer>
    </section>
  );
}

function SharedEmbodiedLab({
  isActive,
  visualStyle,
  concept,
  onComplete,
  nextLabel = 'FDE',
}: {
  isActive: boolean;
  visualStyle: DeckVisualStyle;
  concept: 'world' | 'vla';
  onComplete?: () => void;
  nextLabel?: string;
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
      else onComplete?.();
      return;
    }

    if (act === 'vla-gap') setAct('vla-control');
    else if (act === 'vla-control') setAct('vla-proof');
    else onComplete?.();
  };

  const reset = () => {
    setAct(initialAct);
  };

  const actOffset = isWorld ? 0 : 3;
  const localActIndex = embodiedActOrder.indexOf(act) - actOffset;
  const actionLabel =
    act === 'world-forms'
      ? 'Next: VLA'
      : act === 'vla-proof'
        ? `Next: ${nextLabel}`
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
              <video muted playsInline preload="none" poster="/media/unitree-wvla2-proof.png" aria-label="Edited excerpts from the official Unitree WVLA 2.0 robot recording">
                <source src="/media/unitree-wvla2-highlight.mp4" type="video/mp4" />
              </video>
              <span><i /> OFFICIAL RECORDING · UNITREE WVLA 2.0 · EXCERPTS</span>
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

export function EmbodiedLab(props: {
  isActive: boolean;
  visualStyle: DeckVisualStyle;
  concept: 'world' | 'vla';
  onComplete?: () => void;
  nextLabel?: string;
}) {
  if (props.visualStyle === 'atlas' && props.concept === 'world') {
    return <AtlasWorldLab isActive={props.isActive} />;
  }

  if (props.visualStyle === 'atlas' && props.concept === 'vla') {
    return <AtlasVlaLab isActive={props.isActive} />;
  }

  return <SharedEmbodiedLab {...props} />;
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
        <small>Toy parser + motion · not Unitree WVLA 2.0</small>
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
        <small>Real example · Unitree WVLA 2.0 shows multi-task autonomous robot operation.</small>
      </div>
    </div>
  );
}

const fdeExhibitActs = [
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

const fdeExhibitPhase = ['DEMO', 'FIELD', 'TRACE', 'EVAL + FIX', 'REPLAY'];

function FdeExhibit({ step }: { step: number }) {
  return (
    <div className={`${conceptStyles.exhibit} ${conceptStyles.fdeExhibit}`} data-step={step} role="img" aria-label={fdeExhibitActs[step]?.title ?? 'Forward deployed engineering demonstration'}>
      <div className={conceptStyles.phaseTag}>
        <span>{String(step + 1).padStart(2, '0')}</span>
        <strong>{fdeExhibitPhase[step]}</strong>
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

type AtlasFdeAct = 'intro' | 'why' | 'field' | 'evidence' | 'roles' | 'memory' | 'proof';

const atlasFdeActOrder: AtlasFdeAct[] = ['intro', 'why', 'field', 'evidence', 'roles', 'memory', 'proof'];
const atlasFdeCopy: Record<AtlasFdeAct, { title: string; action: string }> = {
  intro: {
    title: 'FDE is a job: Forward Deployed Engineer.',
    action: 'Why does AI need one?',
  },
  why: {
    title: 'The model works. The workflow does not.',
    action: 'Enter the real workflow',
  },
  field: {
    title: 'The bug can live anywhere along the workflow.',
    action: 'Follow one failure',
  },
  evidence: {
    title: '“AI failed” is not yet a fixable bug.',
    action: 'Who owns what?',
  },
  roles: {
    title: 'Same problem. Different ownership.',
    action: 'Make the lesson reusable',
  },
  memory: {
    title: 'A good FDE leaves a reusable system behind.',
    action: 'See a real deployment',
  },
  proof: {
    title: 'From pilot to measurable improvement.',
    action: 'Replay FDE',
  },
};

function AtlasFdeLab() {
  const [act, setAct] = useState<AtlasFdeAct>('intro');
  const actIndex = atlasFdeActOrder.indexOf(act);
  const copy = atlasFdeCopy[act];

  const advanceAct = () => {
    if (actIndex === atlasFdeActOrder.length - 1) {
      setAct('intro');
      return;
    }
    setAct(atlasFdeActOrder[actIndex + 1]);
  };

  return (
    <section
      className={`${fdeStyles.stage} ${atlasStyles.fdeHost} ${fdeStoryStyles.host}`}
      data-act={act}
      data-step={actIndex}
      data-visual="atlas"
      aria-label={`Atlas FDE demonstration. ${copy.title}`}
    >
      <ConceptHeader key={`fde-header-${act}`} code="FDE" name="Forward Deployed Engineer" visualStyle="atlas" />
      <ConceptFolio key={`fde-folio-${act}`} visualStyle="atlas" number="03" side="A" label={'FIELD\nENGINEERING'} />

      <div className={`${fdeStyles.beat} ${atlasStyles.demoSceneCopy} ${fdeStoryStyles.sceneCopy}`} aria-live="polite" key={act}>
        <strong>{copy.title}</strong>
      </div>

      <main className={fdeStoryStyles.storyStage} key={`fde-${act}`}>
        {act === 'intro' && (
          <section className={fdeStoryStyles.introScene} aria-label="FDE is a human engineering role embedded in an organization's real workflow">
            <article className={fdeStoryStyles.productSide}>
              <span>AI PRODUCT</span>
              <strong>MODEL + TOOLS</strong>
              <p>Built to work for many customers.</p>
            </article>
            <article className={fdeStoryStyles.fdeBridge}>
              <span>FORWARD DEPLOYED ENGINEER</span>
              <strong>FDE</strong>
              <b>↔</b>
              <p>Works with both sides.</p>
            </article>
            <article className={fdeStoryStyles.companySide}>
              <span>LIVE COMPANY</span>
              <strong>DATA + PERMISSIONS + PEOPLE</strong>
              <p>One workflow that must actually run.</p>
            </article>
            <footer><span>JOB · NOT A MODEL</span><strong>MOVE CLOSER TO WHERE THE WORK BREAKS</strong></footer>
          </section>
        )}

        {act === 'why' && (
          <section className={fdeStoryStyles.whyScene} aria-label="A clean AI demo answer collides with enterprise access, approval, workflow, and ownership barriers">
            <article className={fdeStoryStyles.demoMachine}>
              <span>DEMO</span>
              <div><b>ONE FILE</b><i>→</i><strong>AI</strong><i>→</i><mark>GOOD ANSWER ✓</mark></div>
              <small>clean input · no real systems</small>
            </article>
            <div className={fdeStoryStyles.answerPacket}><span>GOOD ANSWER</span><strong>→</strong></div>
            <div className={fdeStoryStyles.realityWall}>
              <span>REALITY WALL</span>
              {['ACCESS', 'APPROVAL', 'WORKFLOW', 'OWNER'].map((item) => <b key={item}>{item}</b>)}
            </div>
            <article className={fdeStoryStyles.liveCompany}>
              <span>LIVE COMPANY</span>
              <strong>ANSWER NOT IN THE WORKFLOW</strong>
              <div><b>EMAIL</b><b>API</b><b>REVIEW</b><b>WRITE-BACK</b></div>
            </article>
            <footer><span>THE MODEL ANSWERED</span><strong>THE COMPANY STILL CANNOT USE IT</strong></footer>
          </section>
        )}

        {act === 'field' && (
          <section className={fdeStoryStyles.fieldScene} aria-label="An FDE follows one value through an illustrative end-to-end company workflow and finds where it disappears">
            <div className={fdeStoryStyles.workflowRoute}>
              {[
                ['01', 'EMAIL', 'PAY IN 46 DAYS'],
                ['02', 'SPREADSHEET', '46'],
                ['03', 'AI', '46 ✓'],
                ['04', 'APPROVAL', 'APPROVED'],
                ['05', 'LIVE SYSTEM', 'BLANK'],
              ].map(([number, label, value], index) => (
                <article key={number} data-break={index === 4 || undefined}>
                  <span>{number}</span><strong>{label}</strong><b>{value}</b>
                </article>
              ))}
            </div>
            <div className={fdeStoryStyles.fieldTrace}>
              <strong>FDE</strong><i /><span>FOLLOWS THE WORK END TO END</span>
            </div>
            <div className={fdeStoryStyles.fieldResult}>
              <article><span>SOURCE</span><strong>46</strong></article>
              <b>≠</b>
              <article data-miss><span>PRODUCTION</span><strong>BLANK</strong></article>
            </div>
            <footer><span>THE AI FOUND 46</span><strong>THE LIVE WORKFLOW DROPPED IT</strong></footer>
          </section>
        )}

        {act === 'evidence' && (
          <section className={fdeStoryStyles.evidenceScene} aria-label="Source value, system output, and expert confirmation combine into a reproducible product case">
            <article className={fdeStoryStyles.complaintPanel}>
              <span>FIELD COMPLAINT</span>
              <blockquote>“The AI got it wrong.”</blockquote>
              <strong>NOT REPRODUCIBLE</strong>
            </article>
            <b className={fdeStoryStyles.evidenceArrow}>→</b>
            <div className={fdeStoryStyles.evidenceParts}>
              <article data-kind="source"><span>01 · SOURCE</span><strong>46</strong></article>
              <article data-kind="system"><span>02 · OUTPUT</span><strong>BLANK</strong></article>
              <article data-kind="expert"><span>03 · EXPERT</span><strong>46 ✓</strong></article>
            </div>
            <article className={fdeStoryStyles.caseFolder}>
              <span>REPRODUCIBLE CASE</span>
              <strong>IF SOURCE = 46, OUTPUT MUST INCLUDE 46.</strong>
            </article>
            <footer><span>FIELD FAILURE</span><b>→</b><strong>FIXABLE PRODUCT SIGNAL</strong></footer>
          </section>
        )}

        {act === 'roles' && (
          <section className={fdeStoryStyles.rolesScene} aria-label="Product engineers, forward deployed engineers, and domain experts own different outcomes around the same production problem">
            <div className={fdeStoryStyles.roleStage}>
              <article data-role="product">
                <span>PRODUCT ENGINEER</span>
                <strong>BUILD THE PRODUCT</strong>
                <p>Reusable for many customers.</p>
                <b>FINISH LINE · CAPABILITY</b>
              </article>
              <article data-role="fde">
                <span>FORWARD DEPLOYED ENGINEER</span>
                <strong>MAKE THIS WORKFLOW WORK</strong>
                <p>Connect, deploy, and drive adoption.</p>
                <b>FINISH LINE · OUTCOME</b>
              </article>
              <article data-role="expert">
                <span>DOMAIN EXPERT</span>
                <strong>DEFINE CORRECT</strong>
                <p>Supply judgement and ground truth.</p>
                <b>FINISH LINE · QUALITY</b>
              </article>
            </div>
            <div className={fdeStoryStyles.ownershipRoute}><span>DISCOVER</span><b>→</b><span>CONNECT</span><b>→</b><span>DEPLOY</span><b>→</b><span>ADOPT</span></div>
            <footer><span>PARTNERS · NOT A RANKING</span><strong>FDE OWNS THE CROSSING</strong></footer>
          </section>
        )}

        {act === 'memory' && (
          <section className={fdeStoryStyles.memoryScene} aria-label="A field failure becomes a reusable product test and a new customer succeeds without another rescue">
            <article className={fdeStoryStyles.oldCustomer}>
              <span>FIELD CASE</span>
              <p><b>46</b><i>→</i><strong>BLANK</strong></p>
              <small>one failure</small>
            </article>
            <div className={fdeStoryStyles.memoryFactory}>
              <span>BACK TO THE PRODUCT</span>
              <div><p><b>01</b><strong>CASE</strong></p><i>→</i><p><b>02</b><strong>TEST</strong></p><i>→</i><p><b>03</b><strong>FIX</strong></p></div>
              <footer>REUSABLE LESSON ✓</footer>
            </div>
            <article className={fdeStoryStyles.newCustomer}>
              <span>NEXT SIMILAR CASE</span>
              <p><b>52</b><i>→</i><strong>52 ✓</strong></p>
              <small>works without another rescue</small>
            </article>
            <footer><span>GOOD FORWARD DEPLOYMENT</span><strong>LEAVES A SYSTEM · NOT A PERMANENT HUMAN PATCH</strong></footer>
          </section>
        )}

        {act === 'proof' && (
          <section className={fdeStoryStyles.proofScene} aria-label="Published OpenAI, Thrive, and Crete Tax AI deployment results">
            <article className={fdeStoryStyles.proofScale}>
              <span>TAX RETURNS IN THE PILOT</span>
              <strong>7,000</strong>
              <small>ACROSS PARTICIPATING CRETE FIRMS</small>
            </article>
            <article className={fdeStoryStyles.proofMetric}>
              <span>RETURNS WITH ≥75% CORRECT FIELDS</span>
              <div><strong>25%</strong><b>→</b><strong>86%</strong></div>
              <small>AT LAUNCH · WITHIN SIX WEEKS</small>
            </article>
            <div className={fdeStoryStyles.teamLoop}>
              {['PRACTITIONERS', 'FIELD DATA', 'EVALS', 'ENGINEERING'].map((item) => <b key={item}>{item}</b>)}
            </div>
            <aside><span>PUBLISHED CASE · MAY 27, 2026</span><strong>OPENAI + THRIVE + CRETE PRACTITIONERS</strong></aside>
            <footer><span>MEASURABLE IMPROVEMENT</span><strong>TEAM LOOP · NOT ONE HERO</strong></footer>
          </section>
        )}
      </main>

      <footer className={`${moeStyles.footer} ${atlasStyles.demoFooter}`}>
        <div className={`${moeStyles.controls} ${atlasStyles.demoControls}`}>
          <button type="button" onClick={() => setAct('intro')} disabled={act === 'intro'} aria-label="Reset the Atlas FDE demonstration">Reset</button>
          <div className="demo-action-stack">
            <button data-primary type="button" onClick={advanceAct}><span>{copy.action}</span><b>→</b></button>
            <DemoStepRail
              current={actIndex}
              total={atlasFdeActOrder.length}
              labels={['Name', 'Why', 'Workflow', 'Evidence', 'Roles', 'Reuse', 'Example']}
              onStepChange={(index) => setAct(atlasFdeActOrder[index])}
            />
          </div>
        </div>
      </footer>
    </section>
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
  if (visualStyle === 'atlas') {
    return <AtlasFdeLab />;
  }

  const safeStep = Math.min(Math.max(step, 0), fdeExhibitActs.length - 1);
  const act = fdeExhibitActs[safeStep];

  return (
    <section
      className={`${fdeStyles.stage} ${conceptStyles.host} ${conceptStyles.fdeHost}`}
      data-step={safeStep}
      data-visual={visualStyle}
      aria-label="Presenter-led Tax AI field feedback story"
    >

      <ConceptHeader code="FDE" name="Forward Deployed Engineer" visualStyle={visualStyle} />
      <ConceptFolio visualStyle={visualStyle} number="03" side="A" label={'FIELD\nENGINEERING'} />

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
            <DemoStepRail current={safeStep} total={fdeExhibitActs.length} />
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

type AtlasRsiAct = 'intro' | 'not-rsi' | 'method' | 'proof' | 'judgment' | 'successor';

const atlasRsiActOrder: AtlasRsiAct[] = ['intro', 'not-rsi', 'method', 'proof', 'judgment', 'successor'];
const atlasRsiCopy: Record<AtlasRsiAct, { phase: string; title: string; action: string }> = {
  intro: {
    phase: 'MEET RSI',
    title: 'What if AI could help build its next version?',
    action: 'Show what must change',
  },
  'not-rsi': {
    phase: 'ANSWER ≠ RECIPE',
    title: 'Fixing one answer does not change how the next AI is built.',
    action: "Run today's loop",
  },
  method: {
    phase: "TODAY'S LOOP",
    title: 'AI runs the tryouts; an external test picks the winner.',
    action: 'See a real result',
  },
  proof: {
    phase: 'REAL RESULT',
    title: 'A real win—on one part of the process.',
    action: 'Find the human boundary',
  },
  judgment: {
    phase: 'HUMAN BOUNDARY',
    title: "Today's AI explores inside a human-made box.",
    action: 'Test full RSI',
  },
  successor: {
    phase: 'FULL RSI TEST',
    title: 'Full RSI begins only when the successor continues the loop.',
    action: 'Replay RSI',
  },
};

function AtlasRsiLab() {
  const [act, setAct] = useState<AtlasRsiAct>('intro');
  const currentIndex = atlasRsiActOrder.indexOf(act);
  const current = atlasRsiCopy[act];

  const advance = () => {
    if (currentIndex === atlasRsiActOrder.length - 1) {
      setAct('intro');
      return;
    }
    setAct(atlasRsiActOrder[currentIndex + 1]);
  };

  return (
    <section
      className={`${rsiStyles.stage} ${atlasStyles.rsiHost} ${rsiStoryStyles.host}`}
      data-act={act}
      data-step={currentIndex}
      data-visual="atlas"
      aria-label={`Atlas RSI demonstration. ${current.title}`}
    >
      <ConceptHeader code="RSI" name="Recursive Self-Improvement" visualStyle="atlas" />
      <ConceptFolio visualStyle="atlas" number="03" side="B" label={'IMPROVEMENT\nSYSTEMS'} />

      <div className={rsiStoryStyles.phaseTag}>
        <span>{String(currentIndex + 1).padStart(2, '0')}</span>
        <strong>{current.phase}</strong>
      </div>

      <div className={`${rsiStyles.beat} ${atlasStyles.demoSceneCopy} ${rsiStoryStyles.sceneCopy}`} aria-live="polite" key={act}>
        <strong>{current.title}</strong>
      </div>

      <main className={rsiStoryStyles.body} key={`rsi-${act}`}>
        {act === 'intro' && (
          <section className={rsiStoryStyles.introScene} aria-label="RSI means recursive self-improvement: an AI helps improve the recipe used to build a successor AI">
            <div className={rsiStoryStyles.acronymStack}>
              <article><b>R</b><p><strong>RECURSIVE</strong><span>the next AI repeats the cycle</span></p></article>
              <article><b>S</b><p><strong>SELF</strong><span>here: the AI-building loop</span></p></article>
              <article><b>I</b><p><strong>IMPROVEMENT</strong><span>its recipe gets better</span></p></article>
            </div>
            <div className={rsiStoryStyles.recipeLoop}>
              <article className={rsiStoryStyles.modelCard}><span>CURRENT</span><strong>AI · N</strong></article>
              <b className={rsiStoryStyles.flowArrow}>→</b>
              <article className={rsiStoryStyles.recipeBook}>
                <span>RECIPE</span><strong>HOW TO BUILD<br />THE NEXT AI</strong>
                <div>{['CODE', 'DATA', 'TRAIN', 'TEST'].map(item => <i key={item}>{item}</i>)}</div>
              </article>
              <b className={rsiStoryStyles.flowArrow}>→</b>
              <article className={`${rsiStoryStyles.modelCard} ${rsiStoryStyles.nextModelCard}`}><span>NEXT</span><strong>AI · N+1</strong></article>
              <div className={rsiStoryStyles.openLoop}><i /><b>?</b><span>CAN N+1 IMPROVE THE RECIPE AGAIN?</span></div>
            </div>
            <footer className={rsiStoryStyles.paperCaption}><span>PLAIN ENGLISH</span><strong>AI helps improve how the next AI is built.</strong></footer>
          </section>
        )}

        {act === 'not-rsi' && (
          <section className={rsiStoryStyles.notRsiScene} aria-label="Correcting one answer changes an output but leaves the recipe for building the next AI unchanged">
            <div className={rsiStoryStyles.answerPress}>
              <article><span>ANSWER · V1</span><strong>WRONG</strong><small>one output</small></article>
              <b>→</b>
              <article data-pass><span>ANSWER · V2</span><strong>FIXED</strong><small>one output</small></article>
              <p>THE ANSWER CHANGED</p>
            </div>
            <b className={rsiStoryStyles.notEqual}>≠</b>
            <article className={rsiStoryStyles.unchangedRecipe}>
              <span>BUILD RECIPE</span><strong>STILL · v1</strong>
              <div>{['CODE', 'DATA', 'TRAIN', 'TEST'].map(item => <b key={item}>{item}</b>)}</div>
              <p>UNCHANGED</p>
            </article>
            <footer className={rsiStoryStyles.paperCaption}><span>USEFUL SELF-CORRECTION</span><strong>But the way we build the next AI did not improve.</strong></footer>
          </section>
        )}

        {act === 'method' && (
          <section className={rsiStoryStyles.methodScene} aria-label="People set a goal and an external test; AI tries many variants and the verified winner becomes the next starting point">
            <div className={rsiStoryStyles.humanPins}>
              <article><span>PEOPLE SET</span><strong>GOAL</strong><p>same correct result</p></article>
              <article><span>PEOPLE SET</span><strong>TEST</strong><p>less time</p></article>
            </div>
            <div className={rsiStoryStyles.trialLoop}>
              <article className={rsiStoryStyles.tryDeck}>
                <span>AI</span><strong>TRY MANY</strong>
                <div>
                  <b><i>A</i><em>94 ms · ✓</em></b>
                  <b data-reject><i>B</i><em>69 ms · ×</em></b>
                  <b data-winner><i>C</i><em>86 ms · ★</em></b>
                </div>
              </article>
              <b className={rsiStoryStyles.flowArrow}>→</b>
              <article className={rsiStoryStyles.testGate}><span>EXTERNAL TEST</span><strong>CHECK</strong><div><b>1 · CORRECT?</b><b>2 · FASTER?</b></div></article>
              <b className={rsiStoryStyles.flowArrow}>→</b>
              <article className={rsiStoryStyles.winnerCard}><span>KEEP</span><strong>WINNER C</strong><small>next starting point</small></article>
              <div className={rsiStoryStyles.cycleArrow}><i /><b>↺</b><span>REPEAT</span></div>
            </div>
            <footer className={rsiStoryStyles.paperCaption}><span>TRY → TEST → KEEP → REPEAT</span><strong>The fastest idea loses if it fails the test.</strong></footer>
          </section>
        )}

        {act === 'proof' && (
          <section className={rsiStoryStyles.proofScene} aria-label="Google DeepMind reports that AlphaEvolve sped up one Gemini matrix multiplication kernel by 23 percent, reducing overall Gemini training time by one percent">
            <div className={rsiStoryStyles.proofSource}><span>GOOGLE DEEPMIND</span><strong>ALPHA<br />EVOLVE</strong></div>
            <div className={rsiStoryStyles.kernelStack}>
              <div className={rsiStoryStyles.stackBars}>{Array.from({ length: 8 }, (_, index) => <i key={index} data-focus={index === 5 || undefined} />)}</div>
              <article><span>ONE REPEATED MATH ROUTINE</span><strong>+23%</strong><b>FASTER</b></article>
            </div>
            <div className={rsiStoryStyles.impactArrow} aria-label="The local speedup reduces the time for the whole training run"><b>→</b></div>
            <article className={rsiStoryStyles.runImpact}>
              <span>WHOLE GEMINI TRAINING RUN</span><strong>−1%</strong><b>TIME</b>
              <div><i /><i /></div>
            </article>
            <footer className={rsiStoryStyles.paperCaption}><span>REAL · USEFUL · NARROW</span><strong>One tool improved—not a self-building AI.</strong></footer>
          </section>
        )}

        {act === 'judgment' && (
          <section className={rsiStoryStyles.judgmentScene} aria-label="Current AI can explore inside a human-defined research box, while people still choose the direction, test, and deployment decision">
            <div className={rsiStoryStyles.boundaryFrame}>
              <header><span>PEOPLE DEFINE THE BOX</span><strong>HUMAN</strong></header>
              <div className={rsiStoryStyles.humanDecisions}>
                <article><b>01</b><span>DIRECTION</span><strong>What should improve?</strong></article>
                <article><b>02</b><span>TEST</span><strong>What counts as better?</strong></article>
                <article><b>03</b><span>GO / STOP</span><strong>May it be used?</strong></article>
              </div>
              <article className={rsiStoryStyles.aiSearchZone}>
                <span>AI</span><strong>EXPLORES INSIDE</strong>
                <div>{Array.from({ length: 12 }, (_, index) => <i key={index} style={{ '--rsi-dot': index } as CSSProperties} />)}</div>
              </article>
            </div>
            <footer className={rsiStoryStyles.paperCaption}><span>TODAY</span><strong>AI searches. People still choose and authorize the loop.</strong></footer>
          </section>
        )}

        {act === 'successor' && (
          <section className={rsiStoryStyles.successorScene} aria-label="Full RSI would require a successor AI to continue improving the process that built it; that loop has not been demonstrated">
            <span className={rsiStoryStyles.hypothesisLabel}>HYPOTHETICAL FULL-RSI LOOP</span>
            <div className={rsiStoryStyles.successorLoop}>
              <article className={rsiStoryStyles.modelN}><span>01 · CURRENT</span><strong>AI · N</strong><small>would change the recipe</small></article>
              <b className={rsiStoryStyles.forwardArrow}>→</b>
              <article className={rsiStoryStyles.builderV2}><span>02 · NEW RECIPE</span><strong>v1 → v2</strong><div>{['CODE', 'DATA', 'TRAIN', 'TEST'].map(item => <b key={item}>{item}</b>)}</div><small>would build the successor</small></article>
              <b className={rsiStoryStyles.forwardArrow}>→</b>
              <article className={rsiStoryStyles.modelNext}><span>03 · SUCCESSOR</span><strong>AI · N+1</strong><small>would inherit the new recipe</small></article>
              <div className={rsiStoryStyles.returnCable}>
                <em>○</em><b>◀</b><i /><span>CAN N+1 IMPROVE THE RECIPE AGAIN?</span><strong>?</strong>
              </div>
            </div>
            <div className={rsiStoryStyles.successorChecks}>
              <p data-pass><strong>RECIPE MUST CHANGE</strong><small>required</small></p>
              <p data-pass><strong>N+1 MUST INHERIT IT</strong><small>required</small></p>
              <p data-open><strong>N+1 MUST REPEAT IT</strong><small>not demonstrated</small></p>
            </div>
            <aside className={rsiStoryStyles.boundaryStamp}><span>FULL RSI</span><strong>NOT DEMONSTRATED</strong><small>NOT INEVITABLE</small></aside>
            <footer className={rsiStoryStyles.paperCaption}><span>IF THE LOOP CLOSES</span><strong>AI R&amp;D could accelerate—but this is a possibility, not a forecast.</strong></footer>
          </section>
        )}
      </main>

      <footer className={`${rsiStyles.footer} ${atlasStyles.demoFooter} ${rsiStoryStyles.footer}`}>
        <div className={`${rsiStyles.controls} ${atlasStyles.demoControls} ${rsiStoryStyles.controls}`}>
          <button type="button" onClick={() => setAct('intro')} disabled={currentIndex === 0} aria-label="Reset the Atlas RSI demonstration">Reset</button>
          <div className="demo-action-stack">
            <button data-primary type="button" onClick={advance}><span>{current.action}</span><b>{act === 'successor' ? '↺' : '→'}</b></button>
            <DemoStepRail
              current={currentIndex}
              total={atlasRsiActOrder.length}
              labels={['Name', 'Difference', 'Method', 'Result', 'Boundary', 'Full RSI']}
              onStepChange={(index) => setAct(atlasRsiActOrder[index])}
            />
          </div>
        </div>
      </footer>
    </section>
  );
}

export function RsiLab({ visualStyle }: { visualStyle: DeckVisualStyle; onComplete?: () => void }) {
  const [act, setAct] = useState<RsiAct>('mirror');

  if (visualStyle === 'atlas') {
    return <AtlasRsiLab />;
  }

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
      className={`${rsiStyles.stage} ${conceptStyles.host}`}
      data-act={act}
      data-visual={visualStyle}
      aria-label={`RSI workshop. ${current.title}`}
    >

      <ConceptHeader code="RSI" name="Recursive Self-Improvement" visualStyle={visualStyle} />
      <ConceptFolio visualStyle={visualStyle} number="03" side="B" label={'IMPROVEMENT\nSYSTEMS'} />

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

const closingShifts = [
  { number: '01', tone: 'teal', terms: 'MOE · DISTILLATION', text: 'BIGGER → SMARTER' },
  { number: '02', tone: 'red', terms: 'WORLD MODEL · VLA', text: 'ANSWERS → ACTIONS' },
];

export function ClosingLab({
  visualStyle,
}: {
  visualStyle: DeckVisualStyle;
}) {
  if (visualStyle === 'machine') {
    return (
      <section className={closingMachineStyles.stage} aria-label="Closing summary: four AI terms form two shifts">
        <div className={closingMachineStyles.ambient} aria-hidden="true" />
        <div className={closingMachineStyles.grid} aria-hidden="true" />

        <header className={closingMachineStyles.heading}>
          <h2>Four terms. Two shifts.</h2>
          <p>Use capability more efficiently—then move from answers toward action.</p>
        </header>

        <main className={closingMachineStyles.questionGrid}>
          {closingShifts.map((shift) => (
            <article className={closingMachineStyles.question} data-tone={shift.tone} key={shift.number}>
              <span>{shift.number}</span><small>{shift.terms}</small><strong>{shift.text}</strong>
            </article>
          ))}
        </main>
        <footer className={closingMachineStyles.questionFooter}><span>THANK YOU</span></footer>
      </section>
    );
  }

  if (visualStyle === 'atlas') {
    return (
      <section className={`${atlasStyles.stage} ${atlasStyles.closingStage}`} aria-label="Closing summary: four AI terms form two shifts">
        <aside className={atlasStyles.coverFolio}><span>FIELD GUIDE</span><strong>END</strong></aside>
        <header className={atlasStyles.closingHeading}>
          <span>END OF FIELD GUIDE</span>
          <h2>Four terms.<br /><em>Two shifts.</em></h2>
          <p>Use capability more efficiently—then move from answers toward action.</p>
        </header>
        <main className={atlasStyles.closingQuestions}>
          {closingShifts.map((shift) => (
            <article data-tone={shift.tone} key={shift.number}><span>{shift.number}</span><small>{shift.terms}</small><strong>{shift.text}</strong></article>
          ))}
        </main>
        <footer className={atlasStyles.closingFooter}><span>THANK YOU</span></footer>
      </section>
    );
  }

  return (
    <section className={closingStyles.stage} aria-label="Closing summary: four AI terms form two shifts">
      <header className={closingStyles.heading}>
        <h2>Four terms. Two shifts.</h2>
        <p>Use capability more efficiently—then move from answers toward action.</p>
      </header>

      <main className={closingStyles.questionGrid}>
        {closingShifts.map((shift) => (
          <article className={closingStyles.question} data-tone={shift.tone} key={shift.number}>
            <span>{shift.number}</span><small>{shift.terms}</small><strong>{shift.text}</strong>
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

// Keep the third chapter available as backup without showing it in the 30-minute route.
const visibleOpeningChapters = openingChapters.filter((chapter) => chapter.number !== '03');

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
    <section className={openingStoryStyles.stage} data-visual={visualStyle} aria-label="Four AI terms resolving into two shifts">
      <div className={openingStoryStyles.surface} aria-hidden="true" />
      <aside className={openingStoryStyles.folio} aria-hidden="true">
        <span>FIELD GUIDE</span><strong>AI</strong><small>04 TERMS<br />02 SHIFTS</small>
      </aside>

      <header className={openingStoryStyles.hero}>
        <span className={openingStoryStyles.kicker}>AI KEEPS INVENTING NEW TERMS.</span>
        <h1><span>Four terms.</span> <em>Two shifts.</em></h1>
        <p>Don’t memorize the acronyms. Follow the shift.</p>
      </header>

      <div className={openingStoryStyles.noiseField} aria-hidden="true">
        {openingNoiseTerms.map((term, index) => (
          <span key={term} style={{ '--noise-index': index } as CSSProperties}>{term}</span>
        ))}
      </div>

      <main className={openingStoryStyles.shiftMap} data-track-count={visibleOpeningChapters.length} aria-label="Two AI shifts containing four selected terms">
        {visibleOpeningChapters.map((chapter, chapterIndex) => (
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
                    data-two-word={term.includes(' ') || undefined}
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
