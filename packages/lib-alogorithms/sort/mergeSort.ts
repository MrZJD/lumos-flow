import { assertEqual, benchmark } from "../benchmark";

function mergeSort<T>(arr: T[], compare: (a: T, b: T) => number, s: number, e: number): void {
  if (e - s < 2) {
    return;
  }

  if (e - s === 2) {
    if (compare(arr[s], arr[s + 1]) > 0) {
      const tmp = arr[s];
      arr[s] = arr[s + 1];
      arr[s + 1] = tmp;
    }
    return;
  }

  const midLen = (s + e) / 2;
  const midSep = midLen >> 0;
  const isEven = midLen % 2 === 0;

  const mid = isEven ? midLen : midSep;

  mergeSort(arr, compare, s, mid);
  mergeSort(arr, compare, mid, e); 

  let i = s;
  let j = mid;
  let isize = mid;

  while (i < isize && j < e) {
    if (compare(arr[i], arr[j]) > 0) {
      const tmp = arr[j];
      arr.splice(j, 1);
      arr.splice(i, 0, tmp);
      isize++;
    }
    i++;
    j++;
  }
}

/**
 * 归并排序
 * -------------
 * 将列表分为左右两个部分，分别排序 => 递归后得到两个有序数列 进行 合并
 */
export default function sort<T>(source: T[], compare: (a: T, b: T) => number): T[] {
  const result = source.slice();
  mergeSort(result, compare, 0, source.length);
  return result;
};

if (require.main === module) {
  assertEqual(sort([1, 2, 3, 4], (a, b) => a - b), [1, 2, 3, 4]);
  assertEqual(sort([1, 2, 3, 4], (a, b) => b - a), [4, 3, 2, 1]);
  assertEqual(sort([1, 2, 3], (a, b) => b - a), [3, 2, 1]);
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
