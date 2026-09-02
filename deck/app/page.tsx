'use client';

import { useCallback, useEffect, useState } from 'react';
import { ClosingLab, DistillationLab, EmbodiedLab, FdeLab, OpeningLab, RouterLab, RsiLab, VisualModeSwitch, deckVisualModes, type DeckVisualStyle } from './demos';

const slideCount = 8;
const fdeLastStep = 4;
const contentVisualModes = ['exhibit', 'atlas'] as const;

const slideSources: Record<number, { label: string; url: string }[]> = {
  1: [
    { label: 'DeepSeek — DeepSeek-V3 Technical Report', url: 'https://arxiv.org/abs/2412.19437' },
    { label: 'DeepSeek — DeepSeek-V3 671B inference config', url: 'https://github.com/deepseek-ai/DeepSeek-V3/blob/main/inference/configs/config_671B.json' },
    { label: 'Qwen — Qwen3 MoE model release', url: 'https://qwenlm.github.io/blog/qwen3/' },
    { label: 'Moonshot AI — Kimi K2 agentic MoE model', url: 'https://moonshotai.github.io/Kimi-K2/' },
  ],
  2: [
    { label: 'Google Research — Distilling the Knowledge in a Neural Network', url: 'https://research.google/pubs/distilling-the-knowledge-in-a-neural-network/' },
    { label: 'Google Research — Distilling Step-by-Step', url: 'https://research.google/blog/distilling-step-by-step-outperforming-larger-language-models-with-less-training-data-and-smaller-model-sizes/' },
    { label: 'DeepSeek — DeepSeek-R1 models and evaluation', url: 'https://github.com/deepseek-ai/DeepSeek-R1' },
  ],
  3: [
    { label: 'Google DeepMind — Genie 3 world model', url: 'https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/' },
  ],
  4: [
    { label: 'Google DeepMind — Gemini Robotics 2 VLA', url: 'https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/' },
  ],
  5: [
    { label: 'OpenAI — Forward Deployed Engineer', url: 'https://openai.com/careers/forward-deployed-engineer-%28fde%29-sf-san-francisco/' },
    { label: 'OpenAI — Building self-improving tax agents with Codex', url: 'https://openai.com/index/building-self-improving-tax-agents-with-codex/' },
  ],
  6: [
    { label: 'Anthropic — When AI builds itself', url: 'https://www.anthropic.com/institute/recursive-self-improvement' },
    { label: 'Google DeepMind — AlphaEvolve', url: 'https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/' },
  ],
};

export default function Home() {
  const [active, setActive] = useState(0);
  const [visualStyle, setVisualStyle] = useState<DeckVisualStyle>('exhibit');
  const [step, setStep] = useState(0);
  const [demoResetKey, setDemoResetKey] = useState(0);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const supportsMachineStyle = active === 0 || active === 1 || active === 7;
  const contentVisualStyle: DeckVisualStyle = visualStyle === 'machine' ? 'exhibit' : visualStyle;
  const activeVisualStyle = supportsMachineStyle ? visualStyle : contentVisualStyle;

  const moveSlide = useCallback((direction: number) => {
    setSourcesOpen(false);
    setActive((current) => Math.min(Math.max(current + direction, 0), slideCount - 1));
    setStep(0);
  }, []);

  const advanceFde = useCallback(() => {
    setSourcesOpen(false);
    if (step < fdeLastStep) {
      setStep((current) => current + 1);
      return;
    }
    moveSlide(1);
  }, [moveSlide, step]);

  const jumpTo = useCallback((slide: number) => {
    setSourcesOpen(false);
    setActive(slide);
    setStep(0);
  }, []);

  const resetCurrentDemo = useCallback(() => {
    setStep(0);
    setDemoResetKey((current) => current + 1);
  }, []);

  const changeVisualStyle = useCallback((nextStyle: DeckVisualStyle) => {
    if (nextStyle === visualStyle) return;

    setVisualStyle(nextStyle);
    setStep(0);
    setDemoResetKey((current) => current + 1);
  }, [visualStyle]);

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
        moveSlide(1);
      }
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        moveSlide(-1);
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
  }, [active, jumpTo, moveSlide, resetCurrentDemo]);

  return (
    <main
      className="deck-shell"
      aria-label="AI vocabulary presentation"
      onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const distance = event.changedTouches[0].clientX - touchStart;
        if (Math.abs(distance) > 50) moveSlide(distance < 0 ? 1 : -1);
        setTouchStart(null);
      }}
    >
      <section className={`slide opening-cinema-slide ${active === 0 ? 'is-active' : ''}`} aria-hidden={active !== 0}>
        <OpeningLab key={`opening-${visualStyle}-${demoResetKey}`} visualStyle={visualStyle} />
      </section>

      <section
        className={`slide moe-evidence-slide ${active === 1 ? 'is-active' : ''}`}
        aria-hidden={active !== 1}
      >
        <RouterLab key={`router-${demoResetKey}`} visualStyle={visualStyle} />
      </section>

      <section
        className={`slide distill-evidence-slide ${active === 2 ? 'is-active' : ''}`}
        aria-hidden={active !== 2}
      >
        <DistillationLab key={`distillation-${demoResetKey}`} visualStyle={contentVisualStyle} />
      </section>

      <section
        className={`slide embodied-slide world-model-cinema-slide ${active === 3 ? 'is-active' : ''}`}
        aria-hidden={active !== 3}
      >
        <EmbodiedLab
          key={`world-model-${demoResetKey}`}
          concept="world"
          isActive={active === 3}
          visualStyle={contentVisualStyle}
        />
      </section>

      <section
        className={`slide embodied-slide vla-cinema-slide ${active === 4 ? 'is-active' : ''}`}
        aria-hidden={active !== 4}
      >
        <EmbodiedLab
          key={`vla-${demoResetKey}`}
          concept="vla"
          isActive={active === 4}
          visualStyle={contentVisualStyle}
        />
      </section>

      <section
        className={`slide fde-slide ${active === 5 ? 'is-active' : ''}`}
        aria-hidden={active !== 5}
        data-step={active === 5 ? step : 0}
      >
        <FdeLab step={step} onAdvance={advanceFde} onReset={resetCurrentDemo} visualStyle={contentVisualStyle} />
      </section>

      <section
        className={`slide rsi-cinema-slide ${active === 6 ? 'is-active' : ''}`}
        aria-hidden={active !== 6}
      >
        <RsiLab key={`rsi-${demoResetKey}`} visualStyle={contentVisualStyle} />
      </section>

      <section className={`slide closing-cinema-slide ${active === 7 ? 'is-active' : ''}`} aria-hidden={active !== 7}>
        <ClosingLab visualStyle={visualStyle} />
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
        <VisualModeSwitch
          visualStyle={activeVisualStyle}
          onVisualStyleChange={changeVisualStyle}
          className="deck-visual-switch"
          surface={activeVisualStyle}
          modes={supportsMachineStyle ? deckVisualModes : contentVisualModes}
        />
        {slideSources[active]?.length ? (
          <button className="source-toggle" onClick={() => setSourcesOpen((current) => !current)} aria-expanded={sourcesOpen}>
            Sources <kbd>S</kbd>
          </button>
        ) : <span className="source-spacer" />}
        <div className="arrow-controls">
          <button onClick={() => moveSlide(-1)} disabled={active === 0} aria-label="Previous slide">←</button>
          <span>{String(active + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}</span>
          <button onClick={() => moveSlide(1)} disabled={active === slideCount - 1} aria-label="Next slide">→</button>
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
