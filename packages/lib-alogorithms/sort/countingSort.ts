import { assertEqual, benchmark } from "../benchmark";

/**
 * 堆排序
 * -------------
 * 将列表分为左右两个部分，分别排序 => 递归后得到两个有序数列 进行 合并
 */
export default function sort(source: number[], mode: 'asc' | 'desc'): number[] {
  const result: number[] = [];
  const counting: number[] = [];

  source.forEach(i => {
    if (counting[Number(i)]) {
      counting[Number(i)]++ 
    } else {
      counting[Number(i)] = 1;
    }
  });

  if (mode === 'desc') {
    for (let i = counting.length - 1; i >= 0; i--) {
      if (!counting[i]) {
        continue;
      }

      for (let j = 0; j < counting[i]; j++) {
        result.push(i);
      }
    }
  } else {
    for (let i = 0, len = counting.length; i < len; i++) {
      if (!counting[i]) {
        continue;
      }

      for (let j = 0; j < counting[i]; j++) {
        result.push(i);
      }
    }
  }

  return result;
};

if (require.main === module) {
  assertEqual(sort([1, 2, 3, 4], 'asc'), [1, 2, 3, 4]);
  assertEqual(sort([1, 2, 3, 4], 'desc'), [4, 3, 2, 1]);
  assertEqual(sort([1, 2, 3], 'desc'), [3, 2, 1]);
  assertEqual(sort([1, 1, 1, 1], 'desc'), [1, 1, 1, 1]);
  assertEqual(sort([1, 1, 1, 4], 'desc'), [4, 1, 1, 1]);

  benchmark('quick sort: valid order', () => {
    // 最大全排序耗时
    sort(new Array(10000).fill(0).map((item, idx) => idx), 'asc');
  });

  benchmark('quick sort: invalid order', () => {
    // 最小 - 无需排序耗时
    sort(new Array(10000).fill(0).map((item, idx) => idx), 'desc');
  });
}