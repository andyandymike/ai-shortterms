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
  next: null | { beatId: string; title: string; label: string; say: string; action: string };
};
export type PresenterMessage =
  | { type: 'hello' }
  | { type: 'state'; state: PresenterSnapshot }
  | { type: 'command'; action: 'continue' | 'back' | 'replay' | 'skip'; cueId: string; status: GuidedStatus };
export const presenterChannel = (session: string) => `atlas-session-2-${session}`;
