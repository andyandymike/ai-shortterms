'use client';

import { useCallback, useEffect, useState } from 'react';

const slideCount = 11;

const chapterLabels = [
  'OPENING',
  'THE FRONTIER',
  'EFFICIENCY',
  'EFFICIENCY',
  'DELIBERATION',
  'INCENTIVES',
  'WORLD MODELS',
  'PHYSICAL AI',
  'DEPLOYMENT',
  'THE NEXT LOOP',
  'CLOSING',
];

const slideSources: Record<number, { label: string; url: string }[]> = {
  1: [
    { label: 'HBS — Navigating the Jagged Technological Frontier', url: 'https://www.hbs.edu/ris/download.aspx?name=24-013.pdf' },
  ],
  2: [
    { label: 'Google Research — Mixture-of-Experts with Expert Choice Routing', url: 'https://research.google/blog/mixture-of-experts-with-expert-choice-routing/' },
  ],
  3: [
    { label: 'Google Research — Distilling the Knowledge in a Neural Network', url: 'https://research.google/pubs/distilling-the-knowledge-in-a-neural-network/' },
    { label: 'Microsoft Research — Phi-3 Technical Report', url: 'https://www.microsoft.com/en-us/research/publication/phi-3-technical-report-a-highly-capable-language-model-locally-on-your-phone/' },
  ],
  4: [
    { label: 'OpenAI — Learning to reason with LLMs', url: 'https://openai.com/index/learning-to-reason-with-llms/' },
  ],
  5: [
    { label: 'Anthropic — Towards Understanding Sycophancy', url: 'https://www.anthropic.com/research/towards-understanding-sycophancy-in-language-models' },
    { label: 'Anthropic — Investigating Reward Tampering', url: 'https://www.anthropic.com/research/reward-tampering' },
  ],
  6: [
    { label: 'Google DeepMind — Genie 3 world model', url: 'https://deepmind.google/models/genie/' },
  ],
  7: [
    { label: 'Google DeepMind — Gemini Robotics VLA', url: 'https://deepmind.google/en/models/gemini-robotics/gemini-robotics/' },
  ],
  8: [
    { label: 'OpenAI — Forward Deployed Engineer', url: 'https://openai.com/careers/forward-deployed-engineer-%28fde%29-sf-san-francisco/' },
  ],
  9: [
    { label: 'Anthropic — When AI builds itself', url: 'https://www.anthropic.com/institute/recursive-self-improvement' },
  ],
};

export default function Home() {
  const [active, setActive] = useState(0);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const move = useCallback((direction: number) => {
    setSourcesOpen(false);
    setActive((current) =>
      Math.min(slideCount - 1, Math.max(0, current + direction)),
    );
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        move(1);
      }
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        move(-1);
      }
      if (event.key === 'Home') setActive(0);
      if (event.key === 'End') setActive(slideCount - 1);
      if (event.key.toLowerCase() === 's' && slideSources[active]?.length) {
        setSourcesOpen((current) => !current);
      }
      if (event.key === 'Escape') setSourcesOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, move]);

  return (
    <main
      className="deck-shell"
      aria-label="AI vocabulary presentation"
      onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const distance = event.changedTouches[0].clientX - touchStart;
        if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1);
        setTouchStart(null);
      }}
    >
      <header className="deck-chrome">
        <p>AI / FIELD NOTES</p>
        <p className="chapter-label">{chapterLabels[active]}</p>
      </header>

      <section className={`slide title-slide ${active === 0 ? 'is-active' : ''}`} aria-hidden={active !== 0}>
        <div className="title-copy">
          <p className="eyebrow">A field guide to AI&apos;s new vocabulary</p>
          <h1>
            <span>Beyond</span>
            Bigger Models
          </h1>
          <p className="subtitle">
            What new AI terms reveal about how models specialize, think, act—and game the rules.
          </p>
        </div>
        <div className="title-mark" aria-hidden="true">
          <span>A</span>
          <span>I</span>
        </div>
        <div className="verb-line" aria-label="Four themes">
          <span>Specialize</span>
          <span>Think</span>
          <span>Act</span>
          <span>Improve?</span>
        </div>
      </section>

      <section className={`slide jagged-slide ${active === 1 ? 'is-active' : ''}`} aria-hidden={active !== 1}>
        <div className="section-index">00</div>
        <div className="jagged-head">
          <p className="eyebrow">AJI before AGI?</p>
          <h2>AI gets better unevenly.</h2>
        </div>
        <div className="jagged-example">
          <p className="example-good">A difficult synthesis?</p>
          <p className="answer-good">Remarkably good.</p>
          <p className="example-bad">A nearby simple constraint?</p>
          <p className="answer-bad">Surprisingly brittle.</p>
        </div>
        <div className="jagged-definition">
          <p className="term">Jagged Intelligence</p>
          <p>
            Similar-looking tasks can sit on opposite sides of AI&apos;s capability boundary.
          </p>
        </div>
        <div className="jagged-cut" aria-hidden="true" />
      </section>

      <section className={`slide moe-slide ${active === 2 ? 'is-active' : ''}`} aria-hidden={active !== 2}>
        <div className="section-index">01</div>
        <div className="moe-title">
          <p className="eyebrow">Efficiency / architecture</p>
          <h2>Bigger—but not all at once.</h2>
        </div>
        <div className="acronym-block">
          <p className="acronym">MoE</p>
          <p className="expansion">Mixture of Experts</p>
        </div>
        <div className="expert-field" aria-label="A few active experts among many available experts">
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index} className={index === 1 || index === 6 || index === 9 ? 'active-expert' : ''}>
              {String(index + 1).padStart(2, '0')}
            </span>
          ))}
        </div>
        <div className="moe-explainer">
          <p>A router activates only a few learned expert subnetworks for each token.</p>
          <div className="capacity-contrast">
            <span>Huge total capacity</span>
            <span>Small active slice</span>
          </div>
        </div>
      </section>

      <section className={`slide distill-slide ${active === 3 ? 'is-active' : ''}`} aria-hidden={active !== 3}>
        <div className="section-index">01</div>
        <div className="distill-title">
          <p className="eyebrow">Efficiency / compression</p>
          <h2>The second route is to become truly small.</h2>
        </div>
        <div className="teacher-student" aria-label="Knowledge distillation from a larger teacher model to a smaller student model">
          <div className="model-orb teacher-orb">
            <span>TEACHER</span>
            <strong>Large</strong>
          </div>
          <div className="distill-arrow" aria-hidden="true">
            <span>selected behavior</span>
            <b>→</b>
          </div>
          <div className="model-orb student-orb">
            <span>STUDENT</span>
            <strong>Small</strong>
          </div>
        </div>
        <div className="distill-copy">
          <p className="term-pair"><span>Distillation</span> is a method.</p>
          <p className="term-pair"><span>SLM</span> is a size class.</p>
          <p className="fine-note">Distillation can help create a capable Small Language Model—but the two terms are not synonyms.</p>
        </div>
      </section>

      <section className={`slide ttc-slide ${active === 4 ? 'is-active' : ''}`} aria-hidden={active !== 4}>
        <div className="section-index">02</div>
        <div className="ttc-title">
          <p className="eyebrow">Deliberation / inference</p>
          <h2>Hard problems now get a bigger thinking budget.</h2>
        </div>
        <div className="ttc-acronym">
          <p>TTC</p>
          <span>Test-Time Compute</span>
        </div>
        <div className="thinking-sequence">
          <div><b>01</b><span>Generate</span></div>
          <i>→</i>
          <div><b>02</b><span>Check</span></div>
          <i>→</i>
          <div><b>03</b><span>Compare</span></div>
          <i>→</i>
          <div><b>04</b><span>Answer</span></div>
        </div>
        <div className="scratch-paper">
          <span>THE SIMPLE VERSION</span>
          <p>Give the model more scratch paper before it commits to an answer.</p>
        </div>
      </section>

      <section className={`slide incentives-slide ${active === 5 ? 'is-active' : ''}`} aria-hidden={active !== 5}>
        <div className="section-index">02</div>
        <div className="incentives-title">
          <p className="eyebrow">The plot twist</p>
          <h2>Better optimization can still target the wrong thing.</h2>
        </div>
        <div className="failure-mode reward-mode">
          <p className="failure-term">Reward Hacking</p>
          <p className="failure-line">Hit the metric.<br /><em>Miss the point.</em></p>
          <div className="code-example">
            <span>Asked:</span> Fix the bug
            <span>Shortcut:</span> Weaken the test
          </div>
        </div>
        <div className="failure-mode sycophancy-mode">
          <p className="failure-term">Sycophancy</p>
          <p className="failure-line">Win approval.<br /><em>Lose the truth.</em></p>
          <blockquote>“You&apos;re absolutely right…”</blockquote>
        </div>
        <p className="incentive-question">The new question is not only “How smart is it?”—but “What did we teach it to optimize?”</p>
      </section>

      <section className={`slide world-slide ${active === 6 ? 'is-active' : ''}`} aria-hidden={active !== 6}>
        <div className="section-index">03</div>
        <div className="world-copy">
          <p className="eyebrow">Prediction / planning</p>
          <h2>Before acting, AI needs a model of what happens next.</h2>
          <div className="world-definition">
            <p className="world-term">World Model</p>
            <p>Learns how an environment changes, so an agent can predict consequences and plan.</p>
          </div>
        </div>
        <div className="state-sequence" aria-label="Current state, action, and predicted next state">
          <div className="state-frame state-now">
            <span>STATE / t</span>
            <i className="scene-object" />
            <i className="scene-goal" />
          </div>
          <div className="state-action"><span>ACTION</span><b>→</b></div>
          <div className="state-frame state-next">
            <span>STATE / t+1</span>
            <i className="scene-object" />
            <i className="scene-goal" />
          </div>
          <p className="prediction-caption">Not just “What does this look like?”<br /><strong>“What happens if I do this?”</strong></p>
        </div>
      </section>

      <section className={`slide vla-slide ${active === 7 ? 'is-active' : ''}`} aria-hidden={active !== 7}>
        <div className="section-index">03</div>
        <div className="vla-title">
          <p className="eyebrow">Physical AI</p>
          <h2>Action becomes another output modality.</h2>
        </div>
        <div className="vla-letters">
          <div><b>V</b><span>Vision</span><p>What is here?</p></div>
          <div><b>L</b><span>Language</span><p>What do you want?</p></div>
          <div><b>A</b><span>Action</span><p>What should move?</p></div>
        </div>
        <div className="vla-equation">
          <span>visual observation</span>
          <i>+</i>
          <span>language instruction</span>
          <i>→</i>
          <strong>motor command</strong>
        </div>
      </section>

      <section className={`slide fde-slide ${active === 8 ? 'is-active' : ''}`} aria-hidden={active !== 8}>
        <div className="section-index">04</div>
        <div className="fde-title">
          <p className="eyebrow">Deployment / organization</p>
          <h2>The last mile is now a feedback loop.</h2>
        </div>
        <div className="fde-acronym">
          <p>FDE</p>
          <span>Forward Deployed Engineer</span>
        </div>
        <div className="field-loop" aria-label="Deployment feedback loop">
          <div><b>01</b><span>Frontier model</span></div>
          <i>→</i>
          <div><b>02</b><span>Real workflow</span></div>
          <i>→</i>
          <div><b>03</b><span>Failures & evals</span></div>
          <i>→</i>
          <div><b>04</b><span>Product roadmap</span></div>
        </div>
        <p className="fde-definition">An FDE turns research breakthroughs into production systems—and carries field learning back upstream.</p>
      </section>

      <section className={`slide rsi-slide ${active === 9 ? 'is-active' : ''}`} aria-hidden={active !== 9}>
        <div className="section-index">04</div>
        <div className="rsi-title">
          <p className="eyebrow">The frontier question</p>
          <h2>Can AI improve the process that builds the next AI?</h2>
        </div>
        <div className="rsi-mark" aria-hidden="true">
          <span>RSI</span><span>RSI</span><span>RSI</span>
        </div>
        <div className="rsi-levels">
          <div>
            <p className="level-label">TODAY</p>
            <p>Humans set the goal.<br />AI writes code and runs experiments.</p>
          </div>
          <div>
            <p className="level-label">FULL RSI</p>
            <p>A stronger successor improves the next cycle with minimal human input.</p>
          </div>
        </div>
        <p className="rsi-status">Recursive Self-Improvement: not achieved, not inevitable.</p>
      </section>

      <section className={`slide close-slide ${active === 10 ? 'is-active' : ''}`} aria-hidden={active !== 10}>
        <div className="close-kicker">The words changed because the bottlenecks moved.</div>
        <h2>AI progress is expanding beyond scale.</h2>
        <div className="closing-steps">
          <div><span>01</span><b>Specialize</b><small>MoE · SLM</small></div>
          <div><span>02</span><b>Think</b><small>TTC · incentives</small></div>
          <div><span>03</span><b>Act</b><small>World Model · VLA</small></div>
          <div><span>04</span><b>Close the loop</b><small>FDE · RSI?</small></div>
        </div>
        <p className="closing-line">The new vocabulary is not the story.<br /><strong>The shifting bottlenecks are.</strong></p>
      </section>

      <footer className="deck-controls">
        <div className="progress" aria-label={`Slide ${active + 1} of ${slideCount}`}>
          {Array.from({ length: slideCount }, (_, index) => (
            <button
              key={index}
              className={index === active ? 'current' : ''}
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        {slideSources[active]?.length ? (
          <button className="source-toggle" onClick={() => setSourcesOpen((current) => !current)} aria-expanded={sourcesOpen}>
            Sources <kbd>S</kbd>
          </button>
        ) : <span className="source-spacer" />}
        <div className="arrow-controls">
          <button onClick={() => move(-1)} disabled={active === 0} aria-label="Previous slide">←</button>
          <span>{String(active + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}</span>
          <button onClick={() => move(1)} disabled={active === slideCount - 1} aria-label="Next slide">→</button>
        </div>
      </footer>

      <aside className={`source-drawer ${sourcesOpen ? 'is-open' : ''}`} aria-hidden={!sourcesOpen}>
        <button className="source-close" onClick={() => setSourcesOpen(false)} aria-label="Close sources">×</button>
        <p className="source-eyebrow">Sources / slide {String(active + 1).padStart(2, '0')}</p>
        <h3>Primary references</h3>
        <ol>
          {(slideSources[active] ?? []).map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>
            </li>
          ))}
        </ol>
      </aside>
    </main>
  );
}
