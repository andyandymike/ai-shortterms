import type { Metadata } from 'next';
import SessionTwo from './session-two';

export const metadata: Metadata = {
  title: '02 — From Answers to Actions',
  description: 'An Atlas field guide to Computer Use, Jev, and Recursive Self-Improvement.',
};

export default function SessionTwoPage() { return <SessionTwo />; }
