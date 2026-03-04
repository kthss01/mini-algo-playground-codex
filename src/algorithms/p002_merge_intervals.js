function mergeIntervals(intervals) {
  const safeIntervals = Array.isArray(intervals)
    ? intervals
        .filter((it) => Array.isArray(it) && it.length >= 2)
        .map((it) => [Number(it[0]), Number(it[1])])
    : [];

  if (safeIntervals.length === 0) return [];

  safeIntervals.sort((a, b) => a[0] - b[0]);
  const merged = [safeIntervals[0]];

  for (let i = 1; i < safeIntervals.length; i += 1) {
    const [start, end] = safeIntervals[i];
    const last = merged[merged.length - 1];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }

  return merged;
}

module.exports = {
  mergeIntervals,
};
