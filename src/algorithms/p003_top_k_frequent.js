// TODO(학습): topKFrequent를 직접 구현해보세요.
// - 빈도맵 생성
// - min-heap(또는 버킷)으로 상위 k개 추출

class MinHeap {
  constructor() {
    this.arr = [];
  }

  size() {
    return this.arr.length;
  }

  peek() {
    return this.arr[0] ?? null;
  }

  push(item) {
    this.arr.push(item);
    this.#bubbleUp(this.arr.length - 1);
  }

  pop() {
    if (this.arr.length === 0) return null;
    if (this.arr.length === 1) return this.arr.pop();

    const top = this.arr[0];
    this.arr[0] = this.arr.pop();
    this.#bubbleDown(0);
    return top;
  }

  #bubbleUp(index) {
    let i = index;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.arr[parent].count <= this.arr[i].count) break;
      [this.arr[parent], this.arr[i]] = [this.arr[i], this.arr[parent]];
      i = parent;
    }
  }

  #bubbleDown(index) {
    let i = index;
    const n = this.arr.length;

    while (true) {
      const left = i * 2 + 1;
      const right = i * 2 + 2;
      let smallest = i;

      if (left < n && this.arr[left].count < this.arr[smallest].count) smallest = left;
      if (right < n && this.arr[right].count < this.arr[smallest].count) smallest = right;
      if (smallest === i) break;

      [this.arr[i], this.arr[smallest]] = [this.arr[smallest], this.arr[i]];
      i = smallest;
    }
  }
}

function topKFrequent(nums, k) {
  const safeNums = Array.isArray(nums) ? nums.map((v) => Number(v)) : [];
  const safeK = Math.max(0, Number(k) || 0);
  if (safeK === 0 || safeNums.length === 0) return [];

  const freq = new Map();
  safeNums.forEach((num) => freq.set(num, (freq.get(num) || 0) + 1));

  const heap = new MinHeap();
  for (const [num, count] of freq.entries()) {
    heap.push({ num, count });
    if (heap.size() > safeK) heap.pop();
  }

  const result = [];
  while (heap.size() > 0) {
    result.push(heap.pop().num);
  }

  return result.reverse();
}

module.exports = {
  topKFrequent,
};
