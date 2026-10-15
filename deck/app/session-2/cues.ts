import plan from './cue-plan.json';
import type { GuidedFrame } from './guided-state';
import { evaluateCandidate, inputs, sortTrace, type Candidate } from './sorting';

type SceneSpec = {
  kind: string; from?: number; to?: number; interrupted?: boolean;
  tokens?: string[]; mixed?: boolean; question?: string; llmStep?: number;
  selection?: number; candidate?: string; input?: number; run?: boolean; checked?: boolean;
  segments?: SceneSpec[]; label?: [string, string]; end?: [string, string]; say?: [string, string]; delay?: number; hold?: number;
};
type CueSpec = {
  id: string; beat: string; label: string; action: string; scene: SceneSpec;
  say?: string[]; look?: string[]; transition?: string[];
};
export type Cue = CueSpec & {
  frames: GuidedFrame[];
  timeline: { duration: number; phase: number; media?: boolean }[];
  duration: number;
  phases: { label: [string, string]; end: [string, string]; say: string[]; start: number; endFrame: number; duration: number }[];
};
const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

function animate(scene: SceneSpec): { frames: GuidedFrame[]; delay: number } {
  const steps = range(scene.from ?? 0, scene.to ?? 0);
  switch (scene.kind) {
    case 'desktop': return { frames: steps.map(step => ({ desktop: { step, interrupted: !!scene.interrupted } })), delay: 750 };
    case 'blender': return { frames: steps.map(step => ({ blender: { step } })), delay: 1100 };
    // The media player reports completion at the configured source timestamp.
    case 'film': return { frames: [{ blender: { step: 6, film: true, clip: scene.selection ?? 2 } }], delay: scene.delay ?? 30000 };
    case 'tokens': return { frames: steps.map(step => ({ tokens: (scene.tokens ?? []).slice(0, step) })), delay: 1100 };
    case 'decision': return { frames: steps.map(step => ({ selection: scene.selection ?? 0, decision: { step, mixed: !!scene.mixed, llmStep: scene.llmStep ?? 0, question: scene.question === 'reason' ? 'reason' : 'team', lane: 'jev' } })), delay: 800 };
    case 'llm': return { frames: steps.map(llmStep => ({ decision: { step: 0, mixed: false, llmStep, question: 'team', lane: 'llm' } })), delay: 450 };
    case 'calibration': return { frames: steps.map(calibration => ({ calibration })), delay: 1200 };
    case 'learning': return { frames: steps.map(learning => ({ learning })), delay: 1200 };
    case 'successor': return { frames: steps.map(successor => ({ successor })), delay: 1400 };
    case 'selection': return { frames: [{ selection: scene.selection ?? 0 }], delay: 0 };
    case 'research': return { frames: steps.map(selection => ({ selection })), delay: 1100 };
    case 'sort': {
      const candidate = scene.candidate as Candidate;
      const input = scene.input ?? 0;
      const trace = sortTrace(candidate, inputs[input].values);
      const kept: Candidate = input > 0 ? 'C' : 'A';
      const tested: Candidate[] = input > 0 ? ['A', 'B', 'C'] : candidate === 'C' ? ['A', 'B'] : candidate === 'B' ? ['A'] : [];
      const state = (step: number, checked: boolean): GuidedFrame => {
        const result = evaluateCandidate(candidate);
        // The teaching route runs real programs and retains only a verified improvement.
        const retained = checked && result.passed && result.operations < evaluateCandidate(kept).operations ? candidate : kept;
        return { experiment: { candidate, input, step, checked, kept: retained, tested: checked ? [...new Set([...tested, candidate])] : tested } };
      };
      const frames = scene.run ? trace.map((_, step) => state(step, false)) : [state(scene.checked ? trace.length - 1 : 0, !!scene.checked)];
      if (scene.run && scene.checked) frames.push(state(trace.length - 1, true));
      return { frames, delay: 190 };
    }
    default: return { frames: [{}], delay: 0 };
  }
}

export const cues: Cue[] = (plan as unknown as CueSpec[]).map(spec => {
  const segments = spec.scene.segments ?? [spec.scene];
  const frames: GuidedFrame[] = [];
  const timeline: Cue['timeline'] = [];
  const phases: Cue['phases'] = [];
  for (const [phase, segment] of segments.entries()) {
    const animation = animate(segment);
    const delay = segment.delay ?? animation.delay;
    const start = frames.length;
    frames.push(...animation.frames);
    timeline.push(...animation.frames.map((_, index) => ({
      phase, media: segment.kind === 'film',
      duration: segment.kind === 'film' ? delay : index === animation.frames.length - 1 ? segment.hold ?? (delay ? 900 : 0) : delay,
    })));
    phases.push({
      label: segment.label ?? [spec.label, spec.label], end: segment.end ?? [spec.look?.[0] ?? spec.label, spec.look?.[1] ?? spec.label],
      say: segment.say ?? spec.say ?? [spec.label,spec.label], start, endFrame: frames.length - 1,
      duration: timeline.slice(start).reduce((sum, frame) => sum + frame.duration, 0),
    });
  }
  return { ...spec, frames, timeline, phases, duration: timeline.reduce((sum, item) => sum + item.duration, 0) };
});
export const firstCueForBeat = (beat: string) => Math.max(0, cues.findIndex(cue => cue.beat === beat));
