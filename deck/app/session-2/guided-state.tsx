'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Candidate } from './sorting';

export type GuidedFrame = {
  desktop?: { step: number; interrupted: boolean };
  blender?: { step: number; film?: boolean };
  tokens?: string[];
  decision?: { step: number; mixed: boolean; llmStep: number; question: 'team' | 'reason'; lane?: 'llm' | 'jev' };
  calibration?: number;
  learning?: number;
  successor?: number;
  experiment?: { candidate: Candidate; input: number; step: number; checked: boolean; kept: Candidate; tested: Candidate[] };
  selection?: number;
};
export type GuidedStatus = 'playing' | 'paused' | 'ready';
export type GuidedState = { frame: GuidedFrame; status: GuidedStatus; cueId: string; onComplete: () => void };
const Context = createContext<GuidedState | null>(null);
export function GuidedProvider({ value, children }: { value: GuidedState; children: ReactNode }) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useGuided() { return useContext(Context); }
