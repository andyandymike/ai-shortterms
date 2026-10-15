import type { GuidedStatus } from './guided-state';

export type PresenterSnapshot = {
  cueId: string;
  index: number;
  total: number;
  beatId: string;
  title: string;
  label: string;
  say: string;
  look: string;
  transition: string;
  status: GuidedStatus;
  frame: number;
  frames: number;
  page: number;
  pages: number;
  part: number;
  parts: number;
  duration: number;
  elapsed: number;
  waiting: boolean;
  unavailable: boolean;
  mediaSwitchable: boolean;
  phase: number;
  phases: string[];
  end: string;
  next: null | { beatId: string; title: string; label: string; say: string; action: string; duration: number; phases: string[]; end: string };
};
export type PresenterMessage =
  | { type: 'hello' }
  | { type: 'state'; state: PresenterSnapshot }
  | { type: 'command'; action: 'continue' | 'back' | 'replay' | 'skip' | 'select-media' | 'exit-media'; phase?: number; cueId: string; status: GuidedStatus };
export const presenterChannel = (session: string) => `atlas-session-2-${session}`;
