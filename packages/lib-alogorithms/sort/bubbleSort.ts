import { assertEqual, benchmark } from "../benchmark";

/**
 * 冒泡排序
 * 时间 O(n^2)
 * 空间 O(1)
 * ----------
 * 扫描整个列表
 * 将范围内的 "最小数" 通过两两换位的方式，移动到最边上
 * 循环直到范围为空
 */
export default function sort<T>(source: T[], compare: (a: T, b: T) => number): T[] {
  const result = source.slice();
  const len = result.length;
  const loop = len - 1;
  for (let j = 0; j < loop; j++) {
    let swaped = false;
    for (let k = 0; k < len - j; k++) {
      if (compare(result[k], result[k + 1]) > 0) {
        const sortTmp = result[k];
        result[k] = result[k + 1];
        result[k + 1] = sortTmp;
        swaped = true;
      }
    }
    // 优化点: 这一轮没有交换过元素，表示无需再排序
    if (!swaped) {
      break;
    }
  }
  return result;
};

if (require.main === module) {
  assertEqual(sort([1, 2, 3, 4], (a, b) => a - b), [1, 2, 3, 4]);
  assertEqual(sort([1, 2, 3, 4], (a, b) => b - a), [4, 3, 2, 1]);
  assertEqual(sort([1, 1, 1, 1], (a, b) => b - a), [1, 1, 1, 1]);
  assertEqual(sort([1, 1, 1, 4], (a, b) => b - a), [4, 1, 1, 1]);

  benchmark('bubble sort: valid order', () => {
    // 最大全排序耗时
    sort(new Array(10000).fill(0).map((item, idx) => idx), (a, b) => b - a);
  });

  benchmark('bubble sort: invalid order', () => {
    // 最小 - 无需排序耗时
    sort(new Array(10000).fill(0).map((item, idx) => idx), (a, b) => a - b);
  });
}
