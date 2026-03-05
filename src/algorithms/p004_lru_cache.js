// TODO(학습): LRUCache 동작을 직접 구현/검증해보세요.
// - get/put 시 최근 사용 순서 갱신
// - capacity 초과 시 LRU eviction

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = Math.max(1, Number(capacity) || 1);
    this.map = new Map();
    this.head = new Node('__head__', 0);
    this.tail = new Node('__tail__', 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  #add(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  #remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.prev = null;
    node.next = null;
  }

  #moveToFront(node) {
    this.#remove(node);
    this.#add(node);
  }

  #evictLRU() {
    const lru = this.tail.prev;
    if (lru === this.head) return null;
    this.#remove(lru);
    this.map.delete(lru.key);
    return lru;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this.#moveToFront(node);
    return node.value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this.#moveToFront(node);
      return;
    }

    const node = new Node(key, value);
    this.map.set(key, node);
    this.#add(node);

    if (this.map.size > this.capacity) {
      this.#evictLRU();
    }
  }

  snapshot() {
    const order = [];
    let cur = this.head.next;
    while (cur !== this.tail) {
      order.push({ key: cur.key, value: cur.value });
      cur = cur.next;
    }
    return {
      capacity: this.capacity,
      size: this.map.size,
      order,
      map: Object.fromEntries(order.map((x) => [x.key, x.value])),
    };
  }
}

function runLRUScenario(input) {
  const capacity = Math.max(1, Number(input?.capacity) || 1);
  const ops = Array.isArray(input?.ops) ? input.ops : [];
  const cache = new LRUCache(capacity);
  const outputs = [];

  ops.forEach((op) => {
    if (op?.type === 'put') {
      cache.put(Number(op.key), Number(op.value));
    } else if (op?.type === 'get') {
      outputs.push(cache.get(Number(op.key)));
    }
  });

  return outputs;
}

module.exports = {
  LRUCache,
  runLRUScenario,
};
