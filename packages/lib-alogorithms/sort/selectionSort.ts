import { assertEqual, benchmark } from "../benchmark";

/**
 * 选择排序
 * 
 * 将无序列表中最大或者最小的选择，配置到有序列表的开头或结尾
 */
export default function sort<T>(source: T[], compare: (a: T, b: T) => number): T[] {
  const result = source.slice();
  const len = result.length;
  for (let i = 0; i < len; i++) {
    // 在剩下的列表中找到compare的目标最大/最小值，放到最前面
    let target = result[i];
    let idx = i;
    for (let j = i + 1; j < len; j++) {
      if (compare(target, result[j]) < 0) {
        target = result[j];
        idx = j;
      }
    }
    result.splice(idx, 1);
    result.unshift(target);
  }
  return result;
}

if (require.main === module) {
  assertEqual(sort([1, 2, 3, 4], (a, b) => a - b), [1, 2, 3, 4]);
  assertEqual(sort([1, 2, 3, 4], (a, b) => b - a), [4, 3, 2, 1]);
  assertEqual(sort([1, 1, 1, 1], (a, b) => b - a), [1, 1, 1, 1]);
  assertEqual(sort([1, 1, 1, 4], (a, b) => b - a), [4, 1, 1, 1]);

  benchmark('selection sort: valid order', () => {
    // 最大全排序耗时
    sort(new Array(10000).fill(0).map((item, idx) => idx), (a, b) => b - a);
  });

  benchmark('selection sort: invalid order', () => {
    // 最小 - 无需排序耗时
    sort(new Array(10000).fill(0).map((item, idx) => idx), (a, b) => a - b);
  });
}
