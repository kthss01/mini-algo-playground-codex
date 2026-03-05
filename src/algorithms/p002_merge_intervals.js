// TODO(학습): mergeIntervals를 직접 구현해보세요.
// - start 기준 정렬
// - 마지막 병합 구간과 겹침 여부로 push/merge 분기

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
