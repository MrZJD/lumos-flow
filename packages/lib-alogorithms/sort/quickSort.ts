import { assertEqual, benchmark } from "../benchmark";

/**
 * 快速排序
 * -------------
 * 选择基准值(第一个值),将所有小值放一边/大值放另一边 => 递归左右两个部分
 */
export default function sort<T>(result: T[], compare: (a: T, b: T) => number, s: number = 0, e: number = result.length): T[] | void {
  if (s >= e) {
    return;
  }

  if (e - s === 1) {
    if (compare(result[s], result[s + 1]) > 0) {
      // swap
      const tmp = result[s];
      result[s] = result[s + 1];
      result[s + 1] = tmp;
    }
    return;
  }

  let head = s;
  let tail = e - 2;
  const pivot = result[e - 1];

  while (head < tail) {
    if (compare(result[head], pivot) < 0) {
      head++;
      continue;
    }
    if (compare(result[tail], pivot) > 0) {
      tail--;
      continue;
    }
    // swap
    const tmp = result[head];
    result[head] = result[tail];
    result[tail] = tmp;
    head++;
    tail--;
  }

  // 如果元素本来就是最后一个，则不需要交换
  if (head >= tail && tail < e - 2) {
    result.splice(e - 1, 1);
    result.splice(head, 0, pivot);
  }

  sort(result, compare, s, head);
  sort(result, compare, head + 1, e - head);

  return result;
};

if (require.main === module) {
  assertEqual(sort([1, 2, 3, 4], (a, b) => a - b), [1, 2, 3, 4]);
  assertEqual(sort([1, 2, 3, 4], (a, b) => b - a), [4, 3, 2, 1]);
  assertEqual(sort([1, 1, 1, 1], (a, b) => b - a), [1, 1, 1, 1]);
  assertEqual(sort([1, 1, 1, 4], (a, b) => b - a), [4, 1, 1, 1]);

  benchmark('quick sort: valid order', () => {
    // 最大全排序耗时
    sort(new Array(10000).fill(0).map((item, idx) => idx), (a, b) => b - a);
  });

  benchmark('quick sort: invalid order', () => {
    // 最小 - 无需排序耗时
    sort(new Array(10000).fill(0).map((item, idx) => idx), (a, b) => a - b);
  });
}
