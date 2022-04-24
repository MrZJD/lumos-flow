import { assertEqual, benchmark } from "../benchmark";

/**
 * 堆排序
 * -------------
 * 将列表分为左右两个部分，分别排序 => 递归后得到两个有序数列 进行 合并
 */
export default function sort<T>(source: T[], compare: (a: T, b: T) => number): T[] {
  const result = source.slice();
  return result;
};

if (require.main === module) {
  assertEqual(sort([1, 2, 3, 4], (a, b) => a - b), [1, 2, 3, 4]);
  // assertEqual(sort([1, 2, 3, 4], (a, b) => b - a), [4, 3, 2, 1]);
  // assertEqual(sort([1, 2, 3], (a, b) => b - a), [3, 2, 1]);
  // assertEqual(sort([1, 1, 1, 1], (a, b) => b - a), [1, 1, 1, 1]);
  // assertEqual(sort([1, 1, 1, 4], (a, b) => b - a), [4, 1, 1, 1]);

  // benchmark('quick sort: valid order', () => {
  //   // 最大全排序耗时
  //   sort(new Array(10000).fill(0).map((item, idx) => idx), (a, b) => b - a);
  // });

  // benchmark('quick sort: invalid order', () => {
  //   // 最小 - 无需排序耗时
  //   sort(new Array(10000).fill(0).map((item, idx) => idx), (a, b) => a - b);
  // });
}