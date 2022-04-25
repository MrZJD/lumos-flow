import { assertEqual, benchmark } from "../benchmark";
import quickSort from '../sort/quickSort';
import bubbleSort from '../sort/bubbleSort';

function countingSort(source: string[], mode: 'asc' | 'desc'): string[] {
  const result: string[] = [];
  const counting: number[] = [];

  source.forEach(i => {
    const n = Number(i);
    if (counting[n]) {
      counting[n]++ 
    } else {
      counting[n] = 1;
    }
  });

  if (mode === 'desc') {
    for (let i = counting.length - 1; i >= 0; i--) {
      if (!counting[i]) {
        continue;
      }

      for (let j = 0; j < counting[i]; j++) {
        result.push(`${i}`);
      }
    }
  } else {
    for (let i = 0, len = counting.length; i < len; i++) {
      if (!counting[i]) {
        continue;
      }

      for (let j = 0; j < counting[i]; j++) {
        result.push(`${i}`);
      }
    }
  }

  return result;
};

/**
 * 邻位交换的最小次数
 * 如果某个整数是 num 中各位数字的一个 排列 且它的 值大于 num ，则称这个整数为 妙数 。可能存在很多妙数，但是只需要关注 值最小 的那些
 * 
 * @param {string} num 一个表示大整数的字符串
 * @param {number} k 要得到第 k 个 最小妙数 
 * @returns {number} 需要对 num 执行的 相邻位数字交换的最小次数
 */
const swapCount = (a: string, b: string): number => {
  if (a.length === 0) {
    return 0;
  }

  let i = 0;
  while (a[i] === b[i] && i < a.length) {
    i++;
  }

  const firstB = b[i];
  const ta = a.split('').slice(i);
  const index = ta.findIndex(t => t === firstB);

  if (index === -1) {
    return 0;
  }

  const begin = i + index;
  const result = a.slice(0, i) + firstB + a.slice(i, begin) + a.slice(begin + 1);

  return index + swapCount(result.slice(i + 1), b.slice(i + 1));
};

// leetcode.31 next_permutation
// k为第k个
function nextPermutation(nums: string[]): void {
  // 右侧排序最小值(冒泡)
  // 冒泡耗时比较高，可以优化
  const sort = (start: number) => {
    const result = countingSort(
      nums.slice(start),
      'asc'
    );

    nums.splice(start, nums.length - start, ...result);

    // bubble sort
    // const next = nums.slice(start);
    // const result = bubbleSort(next, (a: string, b: string) => Number(a) - Number(b));
    // nums.splice(start, next.length, ...result);
  }

  let si = nums.length - 1;
  let st = -1;

  // 从后向前扫描
  // 先找到一个最大数
  for (let i = nums.length - 1; i > 0; i--) {
    const current = nums[i];

    // 优化点1. 如果相邻的两个数相等，则直接进入一下轮，避免重复无效扫描找
    if (nums[i - 1] === current) {
      continue;
    }

    // 从后向前扫描，选择最靠近i && 小于当前数的值
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] < current) {
        if (j > st) {
          si = i;
          st = j;
        }
        break;
      }
    }
  }

  if (st === -1) {
    sort(0);
    return;
  }

  const tmp = nums[si];
  nums[si] = nums[st];
  nums[st] = tmp;

  // 右侧排序最小值
  sort(st + 1);

  return;
};

function getMinSwaps(num: string, k: number): number {

  const next = num.split('');

  for (let i = 0; i < k; i++) {
    nextPermutation(next);
  }

  const target = next.join('');

  // 从原始字符串到目标字符串需要swap的步数
  let i = 0, j = num.length;
  while (i < j) {
    if (num[j] === target[j]) {
      j--;
      continue;
    }
    if (num[i] === target[i]) {
      i++;
      continue;
    }

    break;
  }

  // console.log('target', num, '->', target);

  return swapCount(num.slice(i, j + 1), target.slice(i, j + 1));
};

// 788785540

// 845787508

if (require.main === module) {
  assertEqual(getMinSwaps('5489355142', 4), 0);
  assertEqual(getMinSwaps('11112', 4), 4);
  assertEqual(getMinSwaps('00123', 1), 1);
  assertEqual(getMinSwaps('059', 5), 3);

  assertEqual(
    getMinSwaps('788785540', 891),
    13
  );

  assertEqual(
    getMinSwaps('555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555556', 983),
    983
  );
}
