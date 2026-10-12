'use client';

import { createContext, useContext, useState, type Dispatch, type SetStateAction, type ReactNode } from 'react';
import type { Candidate } from './sorting';

type DesktopState = { step: number; interrupted: boolean };
type DecisionState = { step: number; mixed: boolean; llmStep: number; question: 'team' | 'reason' };
type ExperimentState = { candidate: Candidate; input: number; step: number; checked: boolean; kept: Candidate; tested: Candidate[] };
type LabState = {
  desktop: DesktopState; setDesktop: Dispatch<SetStateAction<DesktopState>>;
  decision: DecisionState; setDecision: Dispatch<SetStateAction<DecisionState>>;
  tokens: string[]; setTokens: Dispatch<SetStateAction<string[]>>;
  experiment: ExperimentState; setExperiment: Dispatch<SetStateAction<ExperimentState>>;
};
const Context = createContext<LabState | null>(null);
export function LabProvider({ children }: { children: ReactNode }) {
  const [desktop, setDesktop] = useState<DesktopState>({ step: 0, interrupted: false });
  const [decision, setDecision] = useState<DecisionState>({ step: 0, mixed: false, llmStep: 0, question: 'team' });
  const [tokens, setTokens] = useState<string[]>([]);
  const [experiment, setExperiment] = useState<ExperimentState>({ candidate: 'A', input: 0, step: 0, checked: false, kept: 'A', tested: [] });
  return <Context.Provider value={{ desktop, setDesktop, decision, setDecision, tokens, setTokens, experiment, setExperiment }}>{children}</Context.Provider>;
}
export function useLab() {
  const state = useContext(Context);
  if (!state) throw new Error('The demonstrations need a LabProvider.');
  return state;
}
