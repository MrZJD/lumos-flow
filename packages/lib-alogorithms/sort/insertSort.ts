import { assertEqual, benchmark } from "../benchmark";

/**
 * 插入排序
 * 时间 O(n^2)
 * 空间 O(1)
 * -----------
 * 扫描整个列表
 * 将当前元素移出后，与插入到有序列表中的对应位置
 * -----------
 * 与选择排序的区别点
 * * 插入排序是遍历有序列表，进行插入 / 选择排序是遍历无序列表，选择最大最小值放入有序列表
 */
export default function sort<T>(source: T[], compare: (a: T, b: T) => number): T[] {
  const result = source.slice();
  const len = result.length;

  for (let i = 1; i < len; i++) {
    const current = result[i];

    for (let j = 0; j < i; j++) {
      if (compare(current, result[j]) < 0) {
        result.splice(i, 1);
        result.splice(j, 0, current);
        break;
      }
    }
  }

  return result;
}

if (require.main === module) {
  assertEqual(sort([1, 2, 3, 4], (a, b) => a - b), [1, 2, 3, 4]);
  assertEqual(sort([1, 2, 3, 4], (a, b) => b - a), [4, 3, 2, 1]);
  assertEqual(sort([1, 1, 1, 1], (a, b) => b - a), [1, 1, 1, 1]);
  assertEqual(sort([1, 1, 1, 4], (a, b) => b - a), [4, 1, 1, 1]);

  benchmark('insert sort: valid order', () => {
    // 最大全排序耗时
    sort(new Array(10000).fill(0).map((item, idx) => idx), (a, b) => b - a);
  });

  benchmark('insert sort: invalid order', () => {
    // 最小 - 无需排序耗时
    sort(new Array(10000).fill(0).map((item, idx) => idx), (a, b) => a - b);
  });
}
