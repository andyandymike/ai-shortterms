// These programs really execute. The trace slows their operations down for the stage.
export type Candidate = 'A' | 'B' | 'C';
export type Item = { id: number; value: number };
export type SortFrame = { items: Item[]; active: number[]; comparisons: number; writes: number; caption: string };
export const inputs = [
  { name: 'Two tangled groups', values: [1, 4, 3, 2, 5, 8, 7, 6] },
  { name: 'A different order', values: [5, 2, 4, 1, 8, 3, 7, 6] },
  { name: 'All backwards', values: [8, 7, 6, 5, 4, 3, 2, 1] },
  { name: 'Duplicates + a negative', values: [3, -1, 3, 0, 2, 2, 1, 0] },
];
export const recipes: Record<Candidate, { name: string; rule: string }> = {
  A: { name: 'Repeat the passes', rule: 'Compare neighbors; swap if needed. Repeat for the full array.' },
  B: { name: 'Try just one pass', rule: 'Compare neighbors and swap, but stop after a single pass.' },
  C: { name: 'Insert into place', rule: 'Keep a sorted left side. Move each next item into its place.' },
};

export function sortTrace(candidate: Candidate, values: number[]): SortFrame[] {
  const items = values.map((value, id) => ({ id, value }));
  let comparisons = 0, writes = 0;
  const frames: SortFrame[] = [];
  const record = (caption: string, active: number[] = []) => frames.push({ items: items.map(item => ({ ...item })), active, comparisons, writes, caption });
  record('Same input. Which method should we keep?');
  if (candidate === 'A' || candidate === 'B') {
    const passes = candidate === 'B' ? Math.min(1, items.length - 1) : items.length - 1;
    for (let pass = 0; pass < passes; pass++) {
      for (let i = 0; i < items.length - 1 - pass; i++) {
        const pair = [items[i].id, items[i + 1].id];
        comparisons++;
        record(`Compare ${items[i].value} and ${items[i + 1].value}.`, pair);
        if (items[i].value > items[i + 1].value) {
          [items[i], items[i + 1]] = [items[i + 1], items[i]];
          writes += 2;
          record('Swap the neighbors.', pair);
        }
      }
    }
  } else {
    // In-place insertion by rotation. Each moved array slot counts as a write.
    for (let i = 1; i < items.length; i++) {
      const item = items[i];
      let target = i;
      for (let j = i - 1; j >= 0; j--) {
        comparisons++;
        record(`Where does ${item.value} belong in the sorted left side?`, [item.id, items[j].id]);
        if (items[j].value <= item.value) break;
        target = j;
      }
      if (target !== i) {
        for (let j = i; j > target; j--) items[j] = items[j - 1];
        items[target] = item;
        writes += i - target + 1;
        record(`Insert ${item.value}; shift the intervening items right.`, [item.id]);
      }
    }
  }
  record('Program stopped. Now let an independent check inspect the result.');
  return frames;
}

export function inspectResult(original: number[], result: Item[]) {
  const errors: number[] = [];
  for (let i = 1; i < result.length; i++) {
    if (result[i - 1].value > result[i].value) errors.push(result[i - 1].id, result[i].id);
  }
  // Ordering alone is insufficient: the program must also preserve every input value.
  const expected = [...original].sort((a, b) => a - b);
  const actual = result.map(item => item.value).sort((a, b) => a - b);
  const preserved = expected.length === actual.length && expected.every((value, i) => value === actual[i]);
  return { passed: errors.length === 0 && preserved, errors: [...new Set(errors)], preserved };
}

export function evaluateCandidate(candidate: Candidate) {
  const cases = [...inputs, { name: 'Empty input', values: [] }, { name: 'One item', values: [1] }].map(input => {
    const frames = sortTrace(candidate, input.values);
    const last = frames[frames.length - 1];
    return { name: input.name, ...inspectResult(input.values, last.items), operations: last.comparisons + last.writes };
  });
  return { cases, passed: cases.every(item => item.passed), operations: cases.reduce((sum, item) => sum + item.operations, 0) };
}
