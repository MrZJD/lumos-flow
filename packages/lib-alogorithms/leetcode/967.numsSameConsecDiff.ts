import { assertEqual } from "../benchmark";

/**
 * 连续差相同的数字:
 * 返回所有长度为 n 且满足其每两个连续位上的数字之间的差的绝对值为 k 的 非负整数
 * 
 * n = 3 k = 7
 * 070 => 无效
 * 181 => 有效
 * 结果集顺序不需要固定
 * 
 * @param n 
 * @param k 
 */
function numsSameConsecDiff(n: number, k: number): number[] {
  let result: number[][] = [];
  for (let i = 0; i < n; i++) {
    // 总共有n位
    if (i === 0) {
      (new Array(9).fill(0)).forEach((_, idx) => {
        result.push([idx + 1]);
      });
      continue;
    }

    const next: number[][] = [];
    result.forEach(comb => {
      const last = comb[comb.length - 1];

      if (k === 0) {
        next.push(comb.concat([last]));
      } else {
        const big = last + k;
        const small = last - k;

        big < 10 && next.push(comb.concat([big]));
        small >= 0 && next.push(comb.concat([small]));
      }
    });
    result = next;
  }

  return result.map(item => item.reduce((p, c) => p * 10 + c, 0))
};

if (require.main === module) {
  assertEqual(numsSameConsecDiff(3, 7), [181,292,707,818,929]);
  assertEqual(numsSameConsecDiff(1, 7), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assertEqual(numsSameConsecDiff(2, 7), [18, 29, 70, 81, 92]);
  assertEqual(numsSameConsecDiff(2, 0), [11, 22, 33, 44, 55, 66, 77, 88, 99]);
}