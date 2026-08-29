'use client';

import { useCallback, useEffect, useState } from 'react';
import { ClosingLab, DistillationLab, EmbodiedLab, FdeLab, OpeningLab, RouterLab, RsiLab } from './demos';

const slideCount = 7;

const lastStepBySlide = [0, 0, 0, 0, 4, 0, 0];

const slideSources: Record<number, { label: string; url: string }[]> = {
  1: [
    { label: 'DeepSeek — DeepSeek-V3 Technical Report', url: 'https://arxiv.org/abs/2412.19437' },
    { label: 'DeepSeek — DeepSeek-V3 671B inference config', url: 'https://github.com/deepseek-ai/DeepSeek-V3/blob/main/inference/configs/config_671B.json' },
  ],
  2: [
    { label: 'Google Research — Distilling the Knowledge in a Neural Network', url: 'https://research.google/pubs/distilling-the-knowledge-in-a-neural-network/' },
    { label: 'DeepSeek — DeepSeek-R1 models and evaluation', url: 'https://github.com/deepseek-ai/DeepSeek-R1' },
  ],
  3: [
    { label: 'Google DeepMind — Genie 3 world model', url: 'https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/' },
    { label: 'Google DeepMind — Gemini Robotics 2 VLA', url: 'https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/' },
  ],
  4: [
    { label: 'OpenAI — Forward Deployed Engineer', url: 'https://openai.com/careers/forward-deployed-engineer-%28fde%29-sf-san-francisco/' },
    { label: 'OpenAI — Building self-improving tax agents with Codex', url: 'https://openai.com/index/building-self-improving-tax-agents-with-codex/' },
  ],
  5: [
    { label: 'Anthropic — When AI builds itself', url: 'https://www.anthropic.com/institute/recursive-self-improvement' },
    { label: 'Google DeepMind — AlphaEvolve', url: 'https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/' },
  ],
};

export default function Home() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [demoResetKey, setDemoResetKey] = useState(0);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const move = useCallback((direction: number) => {
    setSourcesOpen(false);

    if (direction > 0) {
      if (step < lastStepBySlide[active]) {
        setStep((current) => current + 1);
        return;
      }

      if (active < slideCount - 1) {
        setActive((current) => current + 1);
        setStep(0);
      }
      return;
    }

    if (step > 0) {
      setStep((current) => current - 1);
      return;
    }

    if (active > 0) {
      const previous = active - 1;
      setActive(previous);
      setStep(lastStepBySlide[previous]);
    }
  }, [active, step]);

  const jumpTo = useCallback((slide: number) => {
    setSourcesOpen(false);
    setActive(slide);
    setStep(0);
  }, []);

  const resetCurrentDemo = useCallback(() => {
    setStep(0);
    setDemoResetKey((current) => current + 1);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLInputElement
        || target instanceof HTMLTextAreaElement
        || target instanceof HTMLSelectElement
        || (target instanceof HTMLElement && target.isContentEditable)
      ) {
        if (event.key === 'Escape') target.blur();
        return;
      }

      if (event.key === ' ' && target instanceof HTMLButtonElement) return;

      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        move(1);
      }
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        move(-1);
      }
      if (event.key === 'Home') jumpTo(0);
      if (event.key === 'End') jumpTo(slideCount - 1);
      if (event.key.toLowerCase() === 'r') resetCurrentDemo();
      if (event.key.toLowerCase() === 's' && slideSources[active]?.length) {
        setSourcesOpen((current) => !current);
      }
      if (event.key === 'Escape') setSourcesOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, jumpTo, move, resetCurrentDemo]);

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
      <section className={`slide opening-cinema-slide ${active === 0 ? 'is-active' : ''}`} aria-hidden={active !== 0}>
        <OpeningLab />
      </section>

      <section
        className={`slide moe-evidence-slide ${active === 1 ? 'is-active' : ''}`}
        aria-hidden={active !== 1}
      >
        <RouterLab key={`router-${demoResetKey}`} />
      </section>

      <section
        className={`slide distill-evidence-slide ${active === 2 ? 'is-active' : ''}`}
        aria-hidden={active !== 2}
      >
        <DistillationLab key={`distillation-${demoResetKey}`} />
      </section>

      <section
        className={`slide embodied-slide ${active === 3 ? 'is-active' : ''}`}
        aria-hidden={active !== 3}
      >
        <EmbodiedLab key={`embodied-${demoResetKey}`} />
      </section>

      <section
        className={`slide fde-slide ${active === 4 ? 'is-active' : ''}`}
        aria-hidden={active !== 4}
        data-step={active === 4 ? step : 0}
      >
        <FdeLab step={step} onAdvance={() => move(1)} onReset={resetCurrentDemo} />
      </section>

      <section
        className={`slide rsi-cinema-slide ${active === 5 ? 'is-active' : ''}`}
        aria-hidden={active !== 5}
      >
        <RsiLab key={`rsi-${demoResetKey}`} />
      </section>

      <section className={`slide closing-cinema-slide ${active === 6 ? 'is-active' : ''}`} aria-hidden={active !== 6}>
        <ClosingLab />
      </section>

      <footer className="deck-controls">
        <div className="progress" aria-label={`Slide ${active + 1} of ${slideCount}`}>
          {Array.from({ length: slideCount }, (_, index) => (
            <button
              key={index}
              className={index === active ? 'current' : ''}
              onClick={() => jumpTo(index)}
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
          <button onClick={() => move(-1)} disabled={active === 0 && step === 0} aria-label="Previous step">←</button>
          <span>{String(active + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}</span>
          <button onClick={() => move(1)} disabled={active === slideCount - 1 && step === lastStepBySlide[active]} aria-label="Next step">→</button>
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
