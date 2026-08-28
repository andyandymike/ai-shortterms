'use client';

import { useMemo, useRef, useState, type CSSProperties } from 'react';
import moeStyles from './moe-cinema.module.css';
import fdeStyles from './fde-cinema.module.css';
import rsiStyles from './rsi-cinema.module.css';
import distillStyles from './distillation-cinema.module.css';
import embodiedStyles from './embodied-cinema.module.css';
import closingStyles from './closing-cinema.module.css';
import openingStyles from './opening-cinema.module.css';

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

export function RouterLab() {
  const [act, setAct] = useState<RouterAct>('dense-ready');
  const [cursor, setCursor] = useState(3);
  const [routeVersion, setRouteVersion] = useState(0);
  const currentToken = xrayTokens[cursor];
  const selectedExperts = useMemo(
    () => illustrativeExpertsForToken(currentToken),
    [currentToken],
  );
  const scoreRows = useMemo(
    () => selectedExperts.map((expert, index) => ({
      expert,
      score: Math.max(0.51, 0.96 - index * 0.057 - (expert % 7) * 0.002),
    })),
    [selectedExperts],
  );

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

  const actCopy: Record<RouterAct, { index: string; title: string; detail: string; action: string }> = {
    'dense-ready': {
      index: '01 · ORDINARY TRANSFORMER',
      title: 'One token meets one fixed FFN.',
      detail: 'Every token crosses the same feed-forward network.',
      action: 'Run this token',
    },
    'dense-run': {
      index: '02 · DENSE COMPUTE',
      title: 'The whole block participates.',
      detail: 'Make this FFN larger, and every token pays for the larger computation.',
      action: 'Swap in MoE',
    },
    router: {
      index: '03 · LEARNED ROUTER',
      title: 'First, rank the alternatives.',
      detail: 'A small learned function scores this token against 256 expert FFNs.',
      action: 'Open the top eight',
    },
    experts: {
      index: '04 · ACTIVATE',
      title: 'Eight FFNs actually run.',
      detail: 'Activation is computation: the token passes through each selected expert’s weights.',
      action: 'Combine their work',
    },
    mix: {
      index: '05 · WEIGHTED MIX',
      title: 'Eight answers become one result.',
      detail: 'Router weights blend the expert outputs before the token continues.',
      action: 'Try another token',
    },
  };

  const copy = actCopy[act];

  return (
    <section
      className={moeStyles.stage}
      data-act={act}
      aria-label="Presenter-led visual comparison of a dense feed-forward layer and a mixture-of-experts layer"
    >
      <div className={moeStyles.lightField} aria-hidden="true" />

      <header className={moeStyles.titlePlate}>
        <span>MODEL X-RAY · 01</span>
        <div><strong>MoE</strong><p>Mixture of Experts</p></div>
      </header>

      <div className={moeStyles.sceneCopy} aria-live="polite" key={act}>
        <span>{copy.index}</span><strong>{copy.title}</strong><p>{copy.detail}</p>
      </div>

      <div className={moeStyles.world}>
        <div className={moeStyles.inputRail}>
          <span>INPUT TOKEN</span>
          <div key={`token-${routeVersion}`} className={moeStyles.token} aria-label={`Current token: ${currentToken}`}>
            <small>token</small><strong>{currentToken}</strong>
          </div>
          <i aria-hidden="true" />
        </div>

        <div className={moeStyles.transformerSlot}>
          <div className={moeStyles.slotLabel}><span>SAME TRANSFORMER SLOT</span><strong>FEED-FORWARD LAYER</strong></div>

          <div className={moeStyles.denseMachine} aria-label="One dense feed-forward network in which the whole block runs for the token">
            <span className={moeStyles.machineLabel}>ONE DENSE FFN</span>
            <div className={moeStyles.denseWeights}>
              {Array.from({ length: 72 }, (_, index) => (
                <i key={index} style={{ '--cell': `${index}` } as CSSProperties} />
              ))}
            </div>
            <div className={moeStyles.denseEquation}><span>token vector</span><b>×</b><span>all FFN weights</span><b>→</b><span>one output</span></div>
            <strong className={moeStyles.denseStatus}>100% OF THIS FFN RUNS</strong>
          </div>

          <div className={moeStyles.moeMachine} aria-label="A learned router scores the token, eight of 256 expert feed-forward networks run, and their outputs are mixed">
            <div className={moeStyles.routerPanel}>
              <div><span>LEARNED ROUTER</span><strong>score({currentToken})</strong><small>ranks 256 expert FFNs</small></div>
              <div className={moeStyles.scoreList} key={`scores-${routeVersion}`}>
                {scoreRows.map(({ expert, score }, index) => (
                  <p key={expert} style={{ '--rank': `${index}`, '--score': `${score}` } as CSSProperties}>
                    <span>E{expert}</span><i><b /></i><strong>{score.toFixed(2)}</strong>
                  </p>
                ))}
              </div>
              <b className={moeStyles.topK}>KEEP TOP-K · K = 8</b>
            </div>

            <div className={moeStyles.expertBank}>
              <div className={moeStyles.bankTitle}><span>CAPACITY</span><strong>256 EXPERT FFNs</strong><small>same structure · different learned weights</small></div>
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
              <div className={moeStyles.lensLabel}><span>X-RAY: EXPERT E{selectedExperts[0]}</span><strong>“ACTIVATE” = EXECUTE THIS FFN</strong></div>
              <div className={moeStyles.lensCompute}>
                <div><span>IN</span>{Array.from({ length: 5 }, (_, index) => <i key={index} />)}</div>
                <b>×</b>
                <div className={moeStyles.lensMatrix}>{Array.from({ length: 25 }, (_, index) => <i key={index} style={{ '--weight-cell': `${index}` } as CSSProperties} />)}</div>
                <b>→</b>
                <div><span>OUT</span>{Array.from({ length: 5 }, (_, index) => <i key={index} />)}</div>
              </div>
              <small>the token vector passes through this expert’s learned weights</small>
            </div>

            <div className={moeStyles.mixStage}>
              <span>ROUTER WEIGHTS</span>
              <div>{scoreRows.slice(0, 4).map(({ expert, score }) => <i key={expert} style={{ '--mix-weight': `${score}` } as CSSProperties}><b>E{expert}</b></i>)}</div>
              <strong>WEIGHTED SUM</strong>
              <p>selected expert outputs<br />become one token representation</p>
            </div>
          </div>
        </div>

        <div className={moeStyles.outputRail}><i aria-hidden="true" /><span>OUTPUT</span><strong>TO NEXT<br />LAYER</strong></div>
      </div>

      <footer className={moeStyles.footer}>
        <div key={`proof-${act}`} className={moeStyles.meaning}>
          {act === 'dense-ready' && <><span>DENSE</span><strong>The route never changes.</strong><small>One token always meets the same FFN.</small></>}
          {act === 'dense-run' && <><span>THE COST</span><strong>More capacity means more work for every token.</strong><small>The entire block participates in this forward pass.</small></>}
          {act === 'router' && <><span>THE CHANGE</span><strong>Decide before spending the compute.</strong><small>The router is learned alongside the experts.</small></>}
          {act === 'experts' && <><span>ACTIVATE</span><strong>Run 8 forward passes; leave 248 unused here.</strong><small>Experts are FFNs—not named human personalities.</small></>}
          {act === 'mix' && (
            <div className={moeStyles.publishedProof}>
              <p><span>TOTAL</span><strong>671B</strong><small>parameters</small></p>
              <i><b /></i>
              <p><span>ACTIVE / TOKEN</span><strong>37B</strong><small>parameters</small></p>
              <p><span>ROUTED</span><strong>8 / 256</strong><small>+ shared expert</small></p>
            </div>
          )}
        </div>

        <div className={moeStyles.controls}>
          <button onClick={reset} aria-label="Reset the MoE demonstration">Reset</button>
          <button onClick={advanceAct}>{copy.action}<b>→</b></button>
        </div>
      </footer>

      <small className={moeStyles.boundary}>DeepSeek-V3 published counts · scores and expert paths are explanatory, not router telemetry</small>
    </section>
  );
}

type DistillationAct = 'prompt' | 'compare' | 'loss' | 'update' | 'scale' | 'exam';

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

  const actCopy: Record<DistillationAct, { index: string; title: string; detail: string; action: string }> = {
    prompt: {
      index: '01 · ONE TRAINING EXAMPLE',
      title: 'Ask teacher and student the same thing.',
      detail: 'The teacher does not enter the student; it produces a target the student can learn from.',
      action: 'Ask both models',
    },
    compare: {
      index: '02 · TARGET VS ATTEMPT',
      title: 'Teacher says 80. Student says 90.',
      detail: 'The target contains an answer and a worked method; the student predicts its own next tokens.',
      action: 'Measure the difference',
    },
    loss: {
      index: '03 · TRAINING LOSS',
      title: 'Turn the mismatch into a signal.',
      detail: 'Training compares the student’s token probabilities with the target sequence.',
      action: 'Update the student',
    },
    update: {
      index: '04 · GRADIENT STEP',
      title: 'Nudge only the student’s weights.',
      detail: 'One example makes a tiny change—not an instant download of the teacher’s knowledge.',
      action: 'Repeat at scale',
    },
    scale: {
      index: '05 · CURRICULUM',
      title: 'Repeat across many kinds of prompts.',
      detail: 'DeepSeek curated 800K teacher-generated samples to fine-tune the smaller model.',
      action: 'Close the textbook',
    },
    exam: {
      index: '06 · CLOSED BOOK',
      title: 'New question. No teacher call.',
      detail: 'The student must use what its own weights retained.',
      action: 'Replay the lesson',
    },
  };

  const copy = actCopy[act];
  const studentIsTrained = act === 'scale' || act === 'exam';
  const studentLabel = act === 'update' ? 'STUDENT · 1 TINY UPDATE' : studentIsTrained ? 'TRAINED STUDENT' : 'BASE STUDENT';
  const targetTokens = ['120', '÷', '1.5', '=', '80'];
  const studentTokens = ['120', '÷', '1.5', '=', '90'];

  return (
    <section className={distillStyles.stage} data-act={act} aria-label="Presenter-led demonstration of a large teacher model creating data that trains a smaller student model">
      <div className={distillStyles.lightField} aria-hidden="true" />

      <header className={distillStyles.titlePlate}>
        <span>TRAINING X-RAY · 02</span>
        <div><strong>DISTILL</strong><p>Knowledge Distillation</p></div>
      </header>

      <div className={distillStyles.sceneCopy} aria-live="polite" key={act}>
        <span>{copy.index}</span><strong>{copy.title}</strong><p>{copy.detail}</p>
      </div>

      <div className={distillStyles.world}>
        <div className={distillStyles.promptStrip}>
          <span>{act === 'exam' ? 'NEW · CLOSED BOOK' : 'TRAINING PROMPT'}</span>
          <strong>{act === 'exam' ? '210 km ÷ 3 h = ?' : '120 km ÷ 1.5 h = ?'}</strong>
          <small>{act === 'exam' ? 'teacher is not called' : 'the exact same prompt goes to both models'}</small>
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
            <i /><span>SAME PROMPT</span><b>⇄</b><i />
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
        <div className={distillStyles.meaning} key={act}>
          {act !== 'exam' ? (
            <><span>{act === 'prompt' ? 'SETUP' : act === 'compare' ? 'TARGET' : act === 'loss' ? 'SIGNAL' : act === 'update' ? 'LEARNING' : 'SCALE'}</span>
              <strong>{act === 'prompt'
                ? 'Same prompt; separate models.'
                : act === 'compare'
                  ? 'Teacher output becomes training data—not copied weights.'
                  : act === 'loss'
                    ? 'The mismatch tells training which direction to move.'
                    : act === 'update'
                      ? 'A tiny weight change makes the target slightly more likely.'
                      : 'Repeat across 800K curated examples.'}</strong>
              <small>{act === 'update' ? 'The illustrative probability moves by one point, not from wrong to perfect.' : 'The student learns selected behavior through repeated optimization.'}</small></>
          ) : (
            <div className={distillStyles.publishedProof} aria-label="Published AIME 2024 scores">
              <p><span>TEACHER</span><strong>79.8</strong><small>AIME 2024</small></p>
              <i><b /></i>
              <p><span>32B STUDENT</span><strong>72.6</strong><small>AIME 2024</small></p>
              <p><span>SIZE</span><strong>671B → 32B</strong><small>selected behavior, not everything</small></p>
            </div>
          )}
        </div>
        <div className={distillStyles.controls}>
          <button onClick={() => setAct('prompt')} disabled={act === 'prompt'} aria-label="Reset the distillation demonstration">Reset</button>
          <button onClick={advanceAct}><span>{copy.action}</span><b>→</b></button>
        </div>
      </footer>

      <small className={distillStyles.boundary}>Published sample count and scores · lesson, loss and probability shift are explanatory</small>
    </section>
  );
}

type EmbodiedAct = 'world-now' | 'world-rollout' | 'world-forms' | 'vla-gap' | 'vla-control' | 'vla-proof';

const embodiedCopy: Record<EmbodiedAct, { index: string; title: string; detail: string; action: string; meaning: string }> = {
  'world-now': {
    index: '01 · THE MISSING VERB',
    title: 'Seeing now is not enough to act next.',
    detail: 'A vision model can describe the frame. An acting AI needs the consequence of a move.',
    action: 'Predict one step',
    meaning: 'A snapshot contains objects—but no answer to “what if?”',
  },
  'world-rollout': {
    index: '02 · IMAGINED FUTURES',
    title: 'Add an action; roll the scene forward.',
    detail: 'The model predicts plausible next states, then uses a chosen state as the new present.',
    action: 'Show what gets built',
    meaning: 'state now + action now → predicted state next',
  },
  'world-forms': {
    index: '03 · THREE CANVASES',
    title: 'Different projects build different kinds of “world.”',
    detail: 'Some predict visible pixels, some compact hidden states, and some explicit objects or geometry.',
    action: 'Give it a body',
    meaning: 'Different representations; the same job: rehearse consequences.',
  },
  'vla-gap': {
    index: '04 · WORDS VS WORK',
    title: 'A plausible sentence is not an executable movement.',
    detail: 'Robots add space, timing, collisions, force, and the limits of a particular body.',
    action: 'Ground the instruction',
    meaning: 'An LLM can describe the task. A robot must survive doing it.',
  },
  'vla-control': {
    index: '05 · CLOSED LOOP',
    title: 'One sentence becomes many body updates.',
    detail: 'Vision grounds the scene, language supplies the goal, and action chunks drive the body.',
    action: 'Watch a real run',
    meaning: 'see → interpret goal → act → see what changed → correct',
  },
  'vla-proof': {
    index: '06 · PHYSICAL PROOF',
    title: 'The output now changes the real world.',
    detail: 'Gemini Robotics 2 turns visual information and instructions into whole-body control.',
    action: 'Replay the chapter',
    meaning: 'Chat can retry words. A robot must recover motion.',
  },
};

export function EmbodiedLab() {
  const [act, setAct] = useState<EmbodiedAct>('world-now');
  const worldVideoRef = useRef<HTMLVideoElement>(null);
  const vlaVideoRef = useRef<HTMLVideoElement>(null);
  const isWorld = act.startsWith('world');
  const copy = embodiedCopy[act];

  const restartVideo = (video: HTMLVideoElement | null) => {
    if (!video) return;
    video.currentTime = 0;
    void video.play();
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
      className={embodiedStyles.stage}
      data-act={act}
      data-phase={isWorld ? 'world' : 'vla'}
      aria-label="Presenter-led causal x-ray of a world model and a vision-language-action model"
    >
      <div className={embodiedStyles.lightField} aria-hidden="true" />

      <header className={embodiedStyles.titlePlate}>
        <span>EMBODIED AI · 03—04</span>
        <div><strong>{isWorld ? 'WORLD' : 'VLA'}</strong><p>{isWorld ? 'World Model' : 'Vision · Language · Action'}</p></div>
      </header>

      <div className={embodiedStyles.sceneCopy} aria-live="polite" key={act}>
        <span>{copy.index}</span><strong>{copy.title}</strong><p>{copy.detail}</p>
      </div>

      <div className={embodiedStyles.modeRail} aria-label="World Model predicts consequences; VLA commands a body">
        <div className={isWorld ? embodiedStyles.currentMode : undefined}><span>WORLD MODEL</span><strong>Predict consequence</strong><small>What may happen next?</small></div>
        <b>→</b>
        <div className={!isWorld ? embodiedStyles.currentMode : undefined}><span>VLA</span><strong>Command a body</strong><small>What should move now?</small></div>
      </div>

      <div className={embodiedStyles.world}>
        <div className={embodiedStyles.worldChapter} aria-hidden={!isWorld}>
          <div className={embodiedStyles.nowScene}>
            <div className={embodiedStyles.currentObservation}>
              <div className={embodiedStyles.observationImage} role="img" aria-label="A generated robot standing in a city street" />
              <span>CURRENT OBSERVATION · t</span>
              <div className={embodiedStyles.visionCaption}><small>VISION MODEL</small><strong>“robot on a street”</strong><b>describes now</b></div>
            </div>

            <div className={embodiedStyles.actionTicket}><span>ACTION</span><strong>↑</strong><small>move forward</small></div>

            <div className={embodiedStyles.unwrittenFuture}>
              <span>THE MISSING ANSWER</span>
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
            <div className={embodiedStyles.worldLoop}><span>↺</span><strong>Chosen prediction becomes the next “now.”</strong><small>predict again as the action sequence continues</small></div>
          </div>

          <div className={embodiedStyles.worldForms}>
            <div className={embodiedStyles.formCatalog}>
              <article>
                <span>01 · VISIBLE WORLD</span><strong>Pixels / video</strong><div className={embodiedStyles.pixelStrip}><i /><i /><i /></div><small>Generate what the next scene looks like.</small>
              </article>
              <article>
                <span>02 · HIDDEN WORLD</span><strong>Latent state</strong><div className={embodiedStyles.latentMap}>{Array.from({ length: 24 }, (_, index) => <i key={index} style={{ '--cell': `${index}` } as CSSProperties} />)}</div><small>Predict a compact internal map for planning.</small>
              </article>
              <article>
                <span>03 · STRUCTURED WORLD</span><strong>Objects / geometry</strong><div className={embodiedStyles.objectMap}><i /><i /><i /><b /></div><small>Track what exists, where it is, and how it may move.</small>
              </article>
            </div>

            <div className={embodiedStyles.worldProof}>
              <video ref={worldVideoRef} autoPlay loop muted playsInline preload="auto" poster="/media/genie3-proof.png" aria-label="Official Genie 3 interactive generated-world recording">
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
              <strong>Sure—reach, grip, and lift it.</strong>
              <small>OUTPUT · plausible words</small>
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
                {['WHERE IN 3D?', 'NO COLLISION', 'RIGHT FORCE', 'RIGHT TIME', 'THIS BODY'].map((item) => <b key={item}>{item}</b>)}
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
                ['01', 'REACH', 'J2 +4°'],
                ['02', 'ALIGN', 'WRIST −7°'],
                ['03', 'GRIP', 'FORCE 18%'],
                ['04', 'LIFT', 'Z +6 cm'],
              ].map(([number, label, command], index) => <p key={number} style={{ '--chunk': `${index}` } as CSSProperties}><b>{number}</b><strong>{label}</strong><small>{command}</small></p>)}</div>
            </div>

            <div className={embodiedStyles.robotResult}>
              <span>BODY</span><div className={embodiedStyles.controlArm}><i /><i /><i /><b /></div><strong>movement changes the scene</strong>
            </div>

            <div className={embodiedStyles.feedbackTrack}><span>NEW CAMERA FRAME + JOINT STATE</span><i /><b>↺</b><strong>check result · correct next action</strong></div>
          </div>

          <div className={embodiedStyles.vlaProof}>
            <div className={embodiedStyles.vlaRecording}>
              <video ref={vlaVideoRef} autoPlay loop muted playsInline preload="auto" poster="/media/gemini-robotics2-proof.png" aria-label="Official Gemini Robotics 2 whole-body robot recording">
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
        <div className={embodiedStyles.meaning} key={act}><span>{isWorld ? 'SIMULATOR' : 'DRIVER'}</span><strong>{copy.meaning}</strong><small>{isWorld ? 'World Model asks what may happen next.' : 'VLA asks what the body should do now.'}</small></div>
        <div className={embodiedStyles.controls}>
          <button onClick={reset} disabled={act === 'world-now'} aria-label="Reset the World Model and VLA demonstration">Reset</button>
          <button onClick={advanceAct}><span>{copy.action}</span><b>→</b></button>
        </div>
      </footer>

      <small className={embodiedStyles.boundary}>Official Google DeepMind recordings · mechanism diagrams and control values are explanatory</small>
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
    number: '01',
    label: 'DEMO',
    title: 'The model works.',
    note: 'A clean demo quietly removes the company.',
    action: 'Add the company',
  },
  {
    number: '02',
    label: 'COLLISION',
    title: 'Then Monday arrives.',
    note: 'Systems, permissions, workflow and judgement come back.',
    action: 'Find the gap',
  },
  {
    number: '03',
    label: 'FAULT LINE',
    title: 'The hard problem spans two worlds.',
    note: 'A good model is only one side of a working deployment.',
    action: 'Compare the roles',
  },
  {
    number: '04',
    label: 'THE ROLE',
    title: 'FDE owns the crossing.',
    note: 'Same engineering toolbox; a different operating position.',
    action: 'Close the loop',
  },
  {
    number: '05',
    label: 'THE PAYOFF',
    title: 'Field friction becomes product learning.',
    note: 'Deployment evidence can improve this workflow—and the platform.',
    action: 'Next: RSI',
  },
];

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
    <section className={fdeStyles.stage} data-step={safeStep} aria-label="Presenter-led Tax AI field feedback story">
      <div className={fdeStyles.fieldWash} aria-hidden="true" />
      <div className={fdeStyles.vignette} aria-hidden="true" />

      <header className={fdeStyles.identity}>
        <span>FDE</span>
        <p><strong>Forward Deployed Engineer</strong><small>A job, not a model.</small></p>
      </header>

      <div className={fdeStyles.beat} aria-live="polite">
        <span>{act.number} / {act.label}</span>
        <strong>{act.title}</strong>
        <p>{act.note}</p>
      </div>

      <div className={fdeStyles.world}>
        <section className={`${fdeStyles.scene} ${fdeStyles.demoScene}`} aria-hidden={safeStep !== 0}>
          <div className={fdeStyles.labStamp}><i /> CONTROLLED DEMO</div>
          <div className={fdeStyles.cleanPipeline} aria-label="A clean tax document produces a clean answer">
            <article className={fdeStyles.paperInput}>
              <span>INPUT</span><strong>W-2.pdf</strong><small>clean · familiar · complete</small>
            </article>
            <div className={fdeStyles.signalArrow}><i /><i /><i /><b>→</b></div>
            <div className={fdeStyles.aiCore}><span>AI</span><strong>MODEL</strong><small>extract + map</small></div>
            <div className={fdeStyles.signalArrow}><i /><i /><i /><b>→</b></div>
            <article className={fdeStyles.cleanOutput}>
              <span>SCHEDULE E</span><b>PASS</b><strong>All demo fields mapped</strong><small>Looks production-ready.</small>
            </article>
          </div>
          <div className={fdeStyles.removedReality} aria-label="Company context excluded from the demo">
            <span>REMOVED FROM THE DEMO</span>
            {['SYSTEMS', 'PERMISSIONS', 'WORKFLOW', 'DOMAIN JUDGEMENT'].map((item) => <b key={item}>{item}</b>)}
          </div>
          <p className={fdeStyles.sceneThesis}>Perfect—because reality is outside the frame.</p>
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
            <small>The model worked. The deployed system did not—yet.</small>
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
            <small>No one-sided owner closes it.</small>
          </div>
          <div className={`${fdeStyles.worldSide} ${fdeStyles.customerSide}`}>
            <span>CUSTOMER REALITY</span>
            <strong>Make one real workflow succeed</strong>
            <div><b>LEGACY</b><b>ACCESS</b><b>RULES</b><b>ADOPTION</b></div>
            <article className={fdeStyles.sidePerson}><i /><em /><p><b>DOMAIN EXPERT</b><small>owns what “correct” means</small></p></article>
          </div>
          <div className={fdeStyles.bridge} aria-label="FDE bridging product and customer reality">
            <span>DISCOVER</span><i /><b>FDE</b><i /><span>DEPLOY</span>
            <small>codes on both sides · owns the crossing</small>
          </div>
        </section>

        <section className={`${fdeStyles.scene} ${fdeStyles.rolesScene}`} aria-hidden={safeStep !== 3}>
          <div className={fdeStyles.toolbox}><span>SAME ENGINEERING TOOLBOX</span><b>code</b><b>systems</b><b>debugging</b></div>
          <div className={fdeStyles.roleRail}>
            <article className={fdeStyles.productRole}>
              <span>PRODUCT ENGINEER</span>
              <strong>Core product</strong>
              <p><small>OPTIMIZES FOR</small><b>Reusable capability</b></p>
              <p><small>SUCCESS LOOKS LIKE</small><b>Reliability at broad scale</b></p>
            </article>
            <div className={fdeStyles.roleConnector} aria-hidden="true"><i /><b>↔</b><i /></div>
            <article className={fdeStyles.fdeRole}>
              <span>FORWARD DEPLOYED ENGINEER</span>
              <strong>End-to-end outcome</strong>
              <p><small>OWNS</small><b>Discover → build → rollout</b></p>
              <p><small>SUCCESS LOOKS LIKE</small><b>Adoption + workflow impact</b></p>
            </article>
            <div className={fdeStyles.roleConnector} aria-hidden="true"><i /><b>↔</b><i /></div>
            <article className={fdeStyles.domainRole}>
              <span>DOMAIN EXPERT</span>
              <strong>Ground truth</strong>
              <p><small>CONTRIBUTES</small><b>Rules + corrections</b></p>
              <p><small>SUCCESS LOOKS LIKE</small><b>Trusted, correct work</b></p>
            </article>
          </div>
          <p className={fdeStyles.roleThesis}><b>Not “a better engineer.”</b> A different position, scope and success metric.</p>
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
            <div className={fdeStyles.returnPath}><i /><i /><i /><b>REUSABLE PRODUCT SIGNAL ↑</b></div>
            <p><b>One customer failure</b><span>can become</span><strong>a better product primitive</strong></p>
          </div>
          <div className={fdeStyles.caseProof} aria-label="Published Tax AI case results">
            <span>OPENAI × CRETE · PUBLISHED CASE</span>
            <p className={fdeStyles.volume}><small>RETURNS PROCESSED</small><strong>7,000</strong></p>
            <div className={fdeStyles.proofChange}>
              <p><small>RETURNS REACHING ≥75% CORRECT FIELDS</small><strong>25%</strong></p>
              <b>→</b>
              <p><small>AFTER SIX WEEKS</small><strong>86%</strong></p>
            </div>
            <div className={fdeStyles.benefits}><b>DEPLOYED</b><i>→</i><b>ADOPTED</b><i>→</i><b>MEASURED</b><i>→</i><b>REUSED</b></div>
          </div>
        </section>
      </div>

      <footer className={fdeStyles.footer}>
        <div className={fdeStyles.takeaway} key={safeStep}>
          <span>{safeStep === 0 ? 'THE DEMO' : safeStep === 1 ? 'THE COLLISION' : safeStep === 2 ? 'WHY FDE' : safeStep === 3 ? 'THE DIFFERENCE' : 'THE PAYOFF'}</span>
          <strong>
            {safeStep === 0
              ? 'Looks perfect—because the company is missing.'
              : safeStep === 1
                ? 'Production is a system problem, not only a model problem.'
                : safeStep === 2
                  ? 'FDE exists where product meets customer reality.'
                  : safeStep === 3
                    ? 'Same tools. Different position, scope and outcome.'
                    : 'Turn field friction into measurable product learning.'}
          </strong>
        </div>
        <div className={fdeStyles.controls}>
          <button type="button" onClick={onReset} disabled={safeStep === 0}>Reset</button>
          <button type="button" onClick={onAdvance}><span>{act.action}</span><b>→</b></button>
        </div>
      </footer>

      <small className={fdeStyles.boundary}>FDE is a job, not a model · team loop, not a lone hero · published case numbers</small>
    </section>
  );
}

type RsiAct = 'mirror' | 'builder' | 'selection' | 'impact' | 'recursive';

export function RsiLab() {
  const [act, setAct] = useState<RsiAct>('mirror');

  const advance = () => {
    if (act === 'mirror') setAct('builder');
    else if (act === 'builder') setAct('selection');
    else if (act === 'selection') setAct('impact');
    else if (act === 'impact') setAct('recursive');
    else setAct('mirror');
  };

  const copy: Record<RsiAct, { index: string; title: string; detail: string; action: string }> = {
    mirror: {
      index: '01 / NOT YET',
      title: 'Fixing an answer is not RSI.',
      detail: 'The output changed. The system that built the AI did not.',
      action: 'Open the builder',
    },
    builder: {
      index: '02 / BOUNDED LOOP',
      title: 'Improvement needs a score.',
      detail: 'Humans lock the goal and evaluator; AI searches inside.',
      action: 'Release candidates',
    },
    selection: {
      index: '03 / EVOLUTION',
      title: 'Generate. Test. Select. Repeat.',
      detail: 'Automatic evaluators let many ideas compete without trusting their claims.',
      action: 'Install the winner',
    },
    impact: {
      index: '04 / REAL EFFECT',
      title: 'A tool improved—not the whole mind.',
      detail: 'A faster training kernel saves time and compute; the boundary stays visible.',
      action: 'Ask what recurses',
    },
    recursive: {
      index: '05 / FULL RSI?',
      title: 'The successor must improve its successor.',
      detail: 'That wider, self-sustaining loop remains unproven and is not inevitable.',
      action: 'Replay',
    },
  };

  const current = copy[act];

  return (
    <section className={rsiStyles.stage} data-act={act} aria-label="Presenter-led AI workshop showing bounded improvement and full recursive self-improvement">
      <div className={rsiStyles.workshopGlow} aria-hidden="true" />
      <div className={rsiStyles.vignette} aria-hidden="true" />

      <header className={rsiStyles.identity}>
        <span>RSI</span>
        <p><strong>Recursive Self-Improvement</strong><small>Today&apos;s loop is smaller than the name.</small></p>
      </header>

      <div className={rsiStyles.beat} aria-live="polite">
        <span>{current.index}</span><strong>{current.title}</strong><p>{current.detail}</p>
      </div>

      <div className={rsiStyles.world}>
        <section className={`${rsiStyles.scene} ${rsiStyles.mirrorScene}`} aria-hidden={act !== 'mirror'}>
          <div className={rsiStyles.aiSubject} aria-label="The same AI revises one answer">
            <div className={rsiStyles.aiHead}><i /><i /><i /><b>AI</b><span /></div>
            <strong>SAME MODEL</strong>
            <small>weights unchanged</small>
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
            <strong>The next model is built the same way.</strong>
          </div>
          <p className={rsiStyles.mirrorThesis}><b>Self-correction</b> changes an output. <strong>RSI</strong> would change the builder.</p>
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
            <p className={rsiStyles.frameNote}>AI may choose the method. Humans still choose the destination and the test.</p>
          </div>
        </section>

        <section className={`${rsiStyles.scene} ${rsiStyles.selectionScene}`} aria-hidden={act !== 'selection'}>
          <div className={rsiStyles.selectionHeader}>
            <span>CREATIVE SEARCH</span><i>→</i><span>AUTOMATIC VERIFICATION</span><i>→</i><span>SELECTION</span>
          </div>
          <div className={rsiStyles.candidateRace} aria-label="Three candidate patches pass through correctness and speed gates">
            <div className={rsiStyles.raceGates} aria-hidden="true"><span>CORRECT?</span><span>FASTER?</span></div>
            <article className={rsiStyles.candidateBase}><span>BASELINE</span><strong>100 ms</strong><small>correct</small><b>SEED</b></article>
            <article className={rsiStyles.candidateOkay}><span>PATCH A</span><strong>94 ms</strong><small>correct</small><b>PASS</b></article>
            <article className={rsiStyles.candidateWrong}><span>PATCH B</span><strong>69 ms</strong><small>wrong answer</small><b>REJECT</b></article>
            <article className={rsiStyles.candidateWinner}><span>PATCH C</span><strong>86 ms</strong><small>correct</small><b>NEW BEST</b></article>
            <div className={rsiStyles.correctnessGate}><i /><strong>GATE 1</strong><small>same result?</small></div>
            <div className={rsiStyles.speedGate}><i /><strong>GATE 2</strong><small>lower time?</small></div>
          </div>
          <div className={rsiStyles.selectionReturn}><span>the winner becomes the next seed</span><i /><i /><i /><b>↺</b></div>
          <p className={rsiStyles.selectionThesis}>Generate widely. <b>Trust the evaluator.</b> Keep only measured improvement.</p>
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
            <em>Real, deployed improvement</em>
          </div>
          <div className={rsiStyles.rAndDLadder} aria-label="Where AI currently helps in AI research and development">
            <span>AI R&amp;D LADDER · TODAY</span>
            <p><b>01</b><strong>Write code + run infrastructure</strong><small>working now</small></p>
            <p><b>02</b><strong>Execute a specified experiment</strong><small>strong and growing</small></p>
            <p><b>03</b><strong>Choose what research matters</strong><small>human bottleneck</small></p>
          </div>
          <p className={rsiStyles.impactBoundary}><b>Important:</b> a faster tool can accelerate AI development without making the current model “self-aware” or independently smarter.</p>
        </section>

        <section className={`${rsiStyles.scene} ${rsiStyles.recursiveScene}`} aria-hidden={act !== 'recursive'}>
          <div className={rsiStyles.recursiveLoop} aria-label="A hypothetical successor loop required for full recursive self-improvement">
            <article className={rsiStyles.generationModel}>
              <span>MODEL N</span><div className={rsiStyles.generationHead}><i /><i /><b>AI</b></div><small>current builder-helper</small>
            </article>
            <div className={rsiStyles.loopArrow}><span>IMPROVES</span><i /><i /><i /><b>→</b></div>
            <article className={rsiStyles.builderCore}>
              <span>AI BUILDER</span><div><i /><i /><i /></div><strong>data · code · training · evals</strong><small>the process itself changes</small>
            </article>
            <div className={rsiStyles.loopArrow}><span>BUILDS</span><i /><i /><i /><b>→</b></div>
            <article className={`${rsiStyles.generationModel} ${rsiStyles.nextModel}`}>
              <span>MODEL N+1</span><div className={rsiStyles.generationHead}><i /><i /><b>AI+</b></div><small>must inherit the improvement</small>
            </article>
            <div className={rsiStyles.compoundReturn}><span>must become better at improving the next builder</span><b>↺</b></div>
          </div>
          <div className={rsiStyles.recursiveConditions}>
            <span>THE RECURSIVE LEAP REQUIRES ALL THREE</span>
            <p><b>01</b><strong>LASTING</strong><small>the builder changes</small></p>
            <p><b>02</b><strong>INHERITED</strong><small>the successor benefits</small></p>
            <p><b>03</b><strong>COMPOUNDING</strong><small>the successor improves again</small></p>
          </div>
          <div className={rsiStyles.unprovenStamp}><span>FULL RSI</span><strong>UNPROVEN</strong><small>not inevitable · direction and verification still matter</small></div>
        </section>
      </div>

      <footer className={rsiStyles.footer}>
        <div className={rsiStyles.takeaway} key={act}>
          <span>{act === 'mirror' ? 'NOT RSI' : act === 'builder' ? 'THE BOX' : act === 'selection' ? 'THE METHOD' : act === 'impact' ? 'THE EFFECT' : 'THE BOUNDARY'}</span>
          <strong>
            {act === 'mirror'
              ? 'Changing an answer does not change the builder.'
              : act === 'builder'
                ? 'Humans still choose the goal and the test.'
                : act === 'selection'
                  ? 'The evaluator—not self-belief—decides what survives.'
                  : act === 'impact'
                    ? 'Useful self-improvement can still be narrow and bounded.'
                    : 'Full RSI requires a compounding successor loop.'}
          </strong>
        </div>
        <div className={rsiStyles.controls}>
          <button onClick={() => setAct('mirror')} disabled={act === 'mirror'}>Reset</button>
          <button onClick={advance}><span>{current.action}</span><b>→</b></button>
        </div>
      </footer>

      <small className={rsiStyles.boundary}>Candidate runtimes are illustrative · AlphaEvolve result shown separately · full RSI remains unproven</small>
    </section>
  );
}

const closingShifts = [
  {
    index: '01',
    label: 'SCALE BETTER',
    action: 'ROUTE · COMPRESS',
    terms: 'MoE + DISTILLATION',
  },
  {
    index: '02',
    label: 'TOUCH THE WORLD',
    action: 'PREDICT · ACT',
    terms: 'WORLD MODEL + VLA',
  },
  {
    index: '03',
    label: 'CLOSE THE LOOP',
    action: 'DEPLOY · IMPROVE?',
    terms: 'FDE + RSI',
  },
];

const scannerQuestions = [
  { index: '01', label: 'PROBLEM', question: 'What bottleneck created it?' },
  { index: '02', label: 'PROOF', question: 'What works today?' },
  { index: '03', label: 'BOUNDARY', question: 'What is still missing?' },
];

const scannerTerms = ['MoE', 'DISTILL', 'WORLD', 'VLA', 'FDE', 'RSI'];

export function ClosingLab() {
  return (
    <section className={closingStyles.stage} aria-label="A reusable scanner for understanding new AI acronyms">
      <div className={closingStyles.ambient} aria-hidden="true" />
      <div className={closingStyles.grid} aria-hidden="true" />

      <header className={closingStyles.heading}>
        <div className={closingStyles.titleBlock}>
          <span>ONE LAST TOOL · SIX TERMS, THREE SHIFTS</span>
          <h2>The bottleneck<br />keeps moving.</h2>
          <p>When the next acronym arrives, scan the idea—not the letters.</p>
        </div>

        <div className={closingStyles.shiftRail} aria-label="Three shifts across the six AI concepts">
          {closingShifts.map((shift) => (
            <article key={shift.index}>
              <span>{shift.index}</span>
              <div>
                <small>{shift.label}</small>
                <strong>{shift.action}</strong>
                <em>{shift.terms}</em>
              </div>
            </article>
          ))}
          <i className={closingStyles.railPulse} aria-hidden="true" />
        </div>
      </header>

      <div className={closingStyles.scanner}>
        <div className={closingStyles.intake}>
          <span>INCOMING</span>
          <div className={closingStyles.mysteryTerm}>
            <small>NEW AI TERM</small>
            <strong>XYZ</strong>
          </div>
          <p>Looks impressive.<br />Meaning unknown.</p>
        </div>

        <div className={closingStyles.scanTunnel}>
          <div className={closingStyles.tunnelLabel}><span>ACRONYM SCANNER</span><i>LIVE</i></div>
          <div className={closingStyles.conveyor} aria-hidden="true">
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
          </div>
          <div className={closingStyles.gates}>
            {scannerQuestions.map((item) => (
              <article key={item.index}>
                <span>{item.index}</span>
                <strong>{item.label}</strong>
                <p>{item.question}</p>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>
          <div className={closingStyles.termStream} aria-hidden="true">
            {scannerTerms.map((term, index) => (
              <b key={term} style={{ '--term-index': index } as CSSProperties}>{term}</b>
            ))}
          </div>
          <div className={closingStyles.scanBeam} aria-hidden="true" />
        </div>

        <div className={closingStyles.output}>
          <span>IF YOU CAN ANSWER ALL THREE</span>
          <div className={closingStyles.understoodStamp}>
            <small>CONCEPT</small>
            <strong>UNDERSTOOD</strong>
          </div>
          <p>You can explain it<br />without the acronym.</p>
        </div>
      </div>

      <footer className={closingStyles.takeaway}>
        <span>THE ACRONYM IS THE LABEL.</span>
        <strong>The bottleneck is the story.</strong>
        <i aria-hidden="true">PROBLEM → PROOF → BOUNDARY</i>
      </footer>
    </section>
  );
}

const openingCases = [
  { problem: 'TOO MUCH MODEL', detail: 'for every answer', term: 'MoE', action: 'ROUTE' },
  { problem: 'MODEL TOO LARGE', detail: 'for the job', term: 'DISTILL', action: 'COMPRESS' },
  { problem: 'WHAT HAPPENS NEXT?', detail: 'before AI acts', term: 'WORLD', action: 'PREDICT' },
  { problem: 'LANGUAGE NEEDS HANDS', detail: 'a robot must move', term: 'VLA', action: 'ACT' },
  { problem: 'DEMO MEETS REALITY', detail: 'inside a company', term: 'FDE', action: 'DEPLOY' },
  { problem: 'CAN THE BUILDER IMPROVE?', detail: 'the process itself', term: 'RSI', action: 'IMPROVE?' },
];

export function OpeningLab() {
  return (
    <section className={openingStyles.stage} aria-label="The AI vocabulary factory">
      <div className={openingStyles.ambient} aria-hidden="true" />
      <div className={openingStyles.grid} aria-hidden="true" />

      <header className={openingStyles.statusBar}>
        <div className={openingStyles.identity}>
          <span>AI</span>
          <p><strong>VOCABULARY FACTORY</strong><small>research · product · job title</small></p>
        </div>
        <div className={openingStyles.factoryStatus}><i />FACTORY ONLINE</div>
        <div className={openingStyles.counter}>
          <small>DAYS SINCE<br />LAST NEW TERM</small>
          <strong>00</strong>
        </div>
      </header>

      <div className={openingStyles.hero}>
        <span>A FIELD GUIDE TO AI&apos;S ACRONYM HABIT</span>
        <h1>AI moves fast.<br /><em>Its vocabulary moves faster.</em></h1>
        <p>Six labels worth decoding—not memorizing.</p>
      </div>

      <div className={openingStyles.factory} aria-label="A new AI bottleneck enters a naming machine and leaves as a new term">
        <section className={openingStyles.inputStation}>
          <div className={openingStyles.stationLabel}><span>01 · INPUT</span><strong>NEW BOTTLENECK</strong></div>
          <div className={openingStyles.hopper} aria-hidden="true"><i /><i /><i /></div>
          <div className={openingStyles.problemFeed}>
            {openingCases.map((item, index) => (
              <article
                key={item.term}
                style={{ '--case-delay': `${index * 2}s` } as CSSProperties}
              >
                <span>AI HITS A LIMIT</span>
                <strong>{item.problem}</strong>
                <small>{item.detail}</small>
              </article>
            ))}
          </div>
        </section>

        <div className={openingStyles.feedArrow} aria-hidden="true"><i /><i /><i /><b>→</b></div>

        <section className={openingStyles.namingStation}>
          <div className={openingStyles.stationLabel}><span>02 · PROCESS</span><strong>NAME THE THING</strong></div>
          <div className={openingStyles.pressFrame} aria-hidden="true">
            <div className={openingStyles.pressHeader}><span>PAPER / PRODUCT</span><i>NAME DEPT.</i></div>
            <div className={openingStyles.piston} />
            <div className={openingStyles.stamp}>ABBREVIATE</div>
            <div className={openingStyles.paper}><span>new mechanism</span><strong>NEEDS A LABEL</strong></div>
            <div className={openingStyles.impactFlash} />
          </div>
          <small className={openingStyles.namingJoke}>CAPITAL LETTERS OPTIONAL · CONFIDENCE MANDATORY</small>
        </section>

        <div className={openingStyles.feedArrow} aria-hidden="true"><i /><i /><i /><b>→</b></div>

        <section className={openingStyles.outputStation}>
          <div className={openingStyles.stationLabel}><span>03 · OUTPUT</span><strong>NEW TERM</strong></div>
          <div className={openingStyles.outputFeed}>
            {openingCases.map((item, index) => (
              <article
                key={item.term}
                style={{ '--case-delay': `${index * 2 + 0.42}s` } as CSSProperties}
              >
                <span>NOW SHIPPING</span>
                <strong>{item.term}</strong>
                <small>{item.action}</small>
              </article>
            ))}
          </div>
          <div className={openingStyles.outputSlot} aria-hidden="true"><i /><i /><i /></div>
        </section>
      </div>

      <div className={openingStyles.termShelf} aria-label="The six concepts covered in this field guide">
        {openingCases.map((item, index) => (
          <div key={item.term} style={{ '--shelf-index': index } as CSSProperties}>
            <span>{item.action}</span><strong>{item.term}</strong>
          </div>
        ))}
      </div>

      <footer className={openingStyles.takeaway}>
        <span>THE RULE</span>
        <strong>New vocabulary usually points to a new bottleneck.</strong>
        <i>LET&apos;S DECODE SIX →</i>
      </footer>
    </section>
  );
}
