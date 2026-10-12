import type { Metadata } from 'next';
import PresenterView from './presenter-view';

export const metadata: Metadata = {
  title: '讲者视图 — From Answers to Actions',
  description: '当前讲稿、下一步预告与统一演示控制。',
};

export default function PresenterPage() { return <PresenterView />; }
