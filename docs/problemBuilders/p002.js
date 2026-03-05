export function buildMergeIntervalsSteps(input) {
  const intervals = Array.isArray(input?.intervals)
    ? input.intervals.filter((it) => Array.isArray(it) && it.length >= 2).map((it) => [Number(it[0]), Number(it[1])])
    : [];

  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const steps = [
    { kind: 'state', payload: { intervals, sorted, merged: [], index: null }, meta: { label: 'init' } },
  ];

  if (sorted.length === 0) {
    steps.push({ kind: 'state', payload: { intervals, sorted, merged: [] }, meta: { label: 'done' } });
    return steps;
  }

  const merged = [[...sorted[0]]];
  steps.push({ kind: 'visit', payload: { sorted, merged: merged.map((x) => [...x]), index: 0 }, meta: { label: 'seed first interval' } });

  for (let i = 1; i < sorted.length; i += 1) {
    const current = sorted[i];
    const last = merged[merged.length - 1];

    steps.push({ kind: 'compare', payload: { sorted, merged: merged.map((x) => [...x]), index: i, current, last }, meta: { label: `compare i=${i}` } });

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
      steps.push({ kind: 'state', payload: { sorted, merged: merged.map((x) => [...x]), index: i, action: 'merge' }, meta: { label: `merge i=${i}` } });
    } else {
      merged.push([...current]);
      steps.push({ kind: 'visit', payload: { sorted, merged: merged.map((x) => [...x]), index: i, action: 'append' }, meta: { label: `append i=${i}` } });
    }
  }

  steps.push({ kind: 'state', payload: { sorted, merged }, meta: { label: 'done' } });
  return steps;
}
