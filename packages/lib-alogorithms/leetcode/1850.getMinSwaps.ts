
/**
 * 邻位交换的最小次数
 * 如果某个整数是 num 中各位数字的一个 排列 且它的 值大于 num ，则称这个整数为 妙数 。可能存在很多妙数，但是只需要关注 值最小 的那些
 * 
 * @param {string} num 一个表示大整数的字符串
 * @param {number} k 要得到第 k 个 最小妙数 
 * @returns {number} 需要对 num 执行的 相邻位数字交换的最小次数
 */
// function getMinSwaps(num: string, k: number): number {
//   // for (let i = num.length - 1; i > 1; i--) {
//   //   const curr = num[i];
//   //   // 计算可以交换几次
//   // }

//   const i = num.length - 1;

//   const swap = (source: string, i: number, j: number) => {
//     const result = source.split('');
//     const tmp = result[i];

//     result[i] = result[j];
//     result[j] = tmp;

//     return result.join('');
//   };

//   // 阶乘(计算组合)
//   const factorial = n => {
//     if (n === 0) {
//       return 1;
//     }
//     if (n === 1) {
//       return 1;
//     }
//     return n * factorial(n - 1);
//   };

//   const calcMinSwap = (numStr: string, minInd: number): number => {

//   }

//   let swapCount = 0;
//   let numCount = 0;

//   while(i > 0) {
//     // 当前数大于左边的数 => 可以交换
//     if (num[i] > num[i - 1]) {
//       swapCount++;
//       const result = swap(num, i, i - 1);

//       // 换过之后不一定是最小的
//       // 获取右侧数字排列数量
//       const leftStr = result.slice(i);
//       const leftCombineCount = factorial(leftStr.length);

//       if (numCount + leftCombineCount <= k) {
//         // 要求的最小数在当前序列
//         return swapCount + calcMinSwap(leftStr, k - numCount);
//       } else {
//         // 要求的最小数在下一个序列
//         numCount += leftCombineCount;
//       }
//     }
//   }

//   return 0;
// };

function findLastIndex(num: string, target: string) {
  for (let i = num.length - 1; i >= 0; i--) {
    if (num[i] === target) {
      return i;
    }
  }
  return -1;
}

function swap (source: string, i: number, j: number){
  const result = source.split('');
  const tmp = result[i];

  result[i] = result[j];
  result[j] = tmp;

  return result.join('');
};

// 阶乘(计算组合)
const factorial = (n: number, time: number): number => {
  if (time < 0) {
    return 1;
  }

  if (n === 0) {
    return 1;
  }
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1, time - 1);
};

const uniq = (arr: string[]) => {
  return Array.from(new Set(arr));
};

const getFactorCountInOrder = (source: string): string[] => {
  if (source.length === 1) {
    return [source];
  }

  return uniq(getFactorCountInOrder(source.slice(1))).reduce((prev: string[], curr: string) => {
    if (source[0] <= curr.slice(0, 1)) {
      prev.push(source[0] + curr);
      prev.push(curr + source[0]);
    } else {
      prev.push(curr + source[0]);
      prev.push(source[0] + curr);
    }

    return prev;
  }, [] as string[]);
};

const swapCount = (a: string, b: string): number => {
  if (a.length === 0) {
    return 1;
  }

  if (a[0] === b[0]) {
    return swapCount(a.slice(1), b.slice(1));
  }

  const firstB = b[0];
  const index = a.split('').findIndex(i => i === firstB);

  if (index === -1) {
    return 0;
  }

  const result = firstB + a.slice(0, index - 1) + a.slice(index);

  return index + swapCount(result.slice(1), b.slice(1));
};

// function getMinSwaps(num: string, k: number): number {
//   // 从尾部开始求第k个最小数
//   let totalCount = 0;
//   let target = '';
//   for (let i = num.length - 1; i > 0; i--) {
//     const current = num[i];

//     const leftSpan = num.slice(0, i).split('');

//     for (let j = leftSpan.length - 1; j >= 0; j--) {
//       // 可以交换
//       if (leftSpan[j] < current) {
//         const result = swap(num, i, j);

//         // 获取换位后的右边字符串
//         const rightSpan = result.slice(j + 1);
//         const rightSpanUniq = uniq(rightSpan.split(''));
//         const composeCount = factorial(rightSpanUniq.length, rightSpan.length);
//         const delta = k - totalCount;

//         // console.log('totalCount', totalCount, composeCount);
//         totalCount += composeCount;

//         // 不在寻找的范围内
//         if (totalCount < k) {
//           continue;
//         }

//         // 在范围内
//         // console.log(getFactorCountInOrder(rightSpan));
//         const list = getFactorCountInOrder(rightSpan).filter(item => item !== num.slice(j));
//         target = result.slice(0, j + 1) + list[delta - 1];
//         break;
//       }
//     }

//     if (target) {
//       break;
//     }
//   }

//   console.log('target', target);

//   // 从原始字符串到目标字符串需要swap的步数
//   let i = 0, j = num.length;
//   while (i < j) {
//     if (num[j] === target[j]) {
//       j--;
//       continue;
//     }
//     if (num[i] === target[i]) {
//       i++;
//       continue;
//     }

//     break;
//   }

//   return swapCount(num.slice(i, j + 1), target.slice(i, j + 1));
// };

function getMinSwaps(num: string, k: number): string {
  // const times = uniq(num.split('')).length;

  // let i = 1;
  // for (; i < num.length; i++) {
  //   const count = factorial(i, times);

  //   if (count >= k) {
  //     break;
  //   }
  // }

  // // 需要修改最后n位数
  // return i;

  const minMap: string[] = [];

  let str = num.slice();
  // 冒泡排序
  // 1. 轮数
  // 把最小的移到后面
  for (let i = 0, len = num.length; i < len; i++) {
    // 2. swap
    for (let j = len - 1; j > i; j--) {
      if (str[j - 1] < str[j]) {
        str = swap(str, j, j - 1);

        minMap.push(str);

      } else {
        continue;
      }
    }
  }

  const minSorted = minMap.sort((a, b) => Number(a) - Number(b));

  console.log(minMap);

  return minSorted[k];
  
  //   console.log('target', target);

  //   // 从原始字符串到目标字符串需要swap的步数
  //   let i = 0, j = num.length;
  //   while (i < j) {
  //     if (num[j] === target[j]) {
  //       j--;
  //       continue;
  //     }
  //     if (num[i] === target[i]) {
  //       i++;
  //       continue;
  //     }
  
  //     break;
  //   }
  
  //   return swapCount(num.slice(i, j + 1), target.slice(i, j + 1));
}


console.log(getMinSwaps('5489355142', 1) === '5489355214'); // 142 => 241 => 214
// console.log(getMinSwaps('5489355142', 2) === '5489355241');
// console.log(getMinSwaps('5489355142', 3) === '5489355412');
// console.log(getMinSwaps('5489355142', 4) === '5489355421');
// 5489355142
// 5489355421
// console.log(getMinSwaps('5489355142', 4) === 2); // 142 => 241 => 214
// console.log(getMinSwaps('11112', 4) === 4);
// console.log(getMinSwaps('00123', 1) === 1);
// console.log(getMinSwaps("059", 5)); // 059 -> 095 | 905 | 950 | 509 | 590

// 059 -> 095 -> 509 -> 590 -> 905 -> 950
// 1. 如果后两位承载不了 n! / m! => 排列数量

// console.log(swapCount('123', '321'));


// 1234

// 10 -> 9

// 109
// 910

// 90 -> 1
// 901
// 109

// 21 // 求第n个最小数要交换的次数 12
// 123 // 0 -> 0
// 132 // 

// 1234
// 从最后一位开始
// -> 1243 // 将最小位的数，与左边第一个比他小的值交换位置 交换一次
// -> 1243 -> 1423 // 交换两次
// -> 1243 -> 1423 -> 1432 // 交换三次

// 从第二位开始
// -> 1324 // 交换一次

// 边界1231
// 最后一位1 <= 左侧所有数 // 无法交换出大值
// 1321
// 1312 => 交换两次

// 边界1031
// 左边只有一个数比他小
// 1031 -> 1013 -> 1103 -> 1130
// -> 1130 // ❌ 交换次数
// -> 1301 // k = 1
// -> 1310
// -> 
