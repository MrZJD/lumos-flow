import { assertEqual, benchmark } from "../benchmark";

/**
 * Do not return anything, modify nums in-place instead.
 * 
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 */
function moveZeroes(nums: number[]): void {
  const len = nums.length;
  let i = 0;
  let count = 0;

  while (i + count < len) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      nums.push(0);
      count++;
      continue;
    }
    i++;
  }
};

function wrap(nums: number[]): number[] {
  const result = nums.slice();
  moveZeroes(result);
  return result;
}

if (require.main === module) {
  assertEqual(wrap([0, 0, 0, 0, 0]), [0, 0, 0, 0, 0]);
  assertEqual(wrap([0, 1, 0, 0, 0]), [1, 0, 0, 0, 0]);
  assertEqual(wrap([0, 0, 1, 0, 0]), [1, 0, 0, 0, 0]);
  assertEqual(wrap([0, 0, 0, 1, 0]), [1, 0, 0, 0, 0]);
  assertEqual(wrap([0, 0, 0, 0, 1]), [1, 0, 0, 0, 0]);
  assertEqual(wrap([0, 1, 0, 0, 2]), [1, 2, 0, 0, 0]);

  benchmark('force move', () => {
    wrap(new Array(1000000).map((item, idx) => idx === 10000 - 1 ? 1 : 0));
  });
}