import { benchmark } from "../benchmark";

export default function countingSort(source: string[], mode: 'asc' | 'desc'): string {
  let result = '';
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
        result += i;
      }
    }
  } else {
    for (let i = 0, len = counting.length; i < len; i++) {
      if (!counting[i]) {
        continue;
      }

      for (let j = 0; j < counting[i]; j++) {
        result += i;
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
  const index = a.split('').slice(i).findIndex(t => t === firstB);

  if (index === -1) {
    return 0;
  }

  const result = firstB + a.slice(i, index) + a.slice(index + 1);

  return index + swapCount(result.slice(i + 1), b.slice(i + 1));
};

// leetcode.31 next_permutation
// k为第k个
function nextPermutation(nums: string[], step: number): void {
  // 右侧排序最小值(冒泡)
  // 冒泡耗时比较高，可以优化
  const sort = (start: number) => {
    const result = countingSort(
      nums.slice(start),
      'asc'
    );

    nums.splice(start, nums.length - start, result);
  }

  let si = nums.length - 1;
  let st = -1;

  // 从后向前扫描
  for (let i = nums.length - 1; i > 0; i--) {
    const current = nums[i];

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

  // benchmark('nextPermutation', () => {
  //   for (let i = 0; i < k; i++) {
  //     nextPermutation(next, k);
  //     // console.log('next --->', next.join(''));
  //   }
  // }, 1);

  const target = next.join('');
  // console.log('num', num);
  // console.log('target', target);

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

  return swapCount(num.slice(i, j + 1), target.slice(i, j + 1));
};

// console.log(getMinSwaps('5489355142', 1) === '5489355214'); // 142 => 241 => 214
// console.log(getMinSwaps('5489355142', 2) === '5489355241');
// console.log(getMinSwaps('5489355142', 3) === '5489355412');
// console.log(getMinSwaps('5489355142', 4) === '5489355421');
// 5489355142
// 5489355421
// console.log(getMinSwaps('5489355142', 4) === 2); // 142 => 241 => 214
// console.log(getMinSwaps('11112', 4) === 4);
// console.log(getMinSwaps('00123', 1) === 1);
// console.log(getMinSwaps("059", 5) === 3); // 059 -> 095 | 509 | 590 | 905 | 950

console.log(
  getMinSwaps(
    "555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555556",
    983
  )
);

// 耗时待优化 -> nextPermutation 一个一个找过于耗时
