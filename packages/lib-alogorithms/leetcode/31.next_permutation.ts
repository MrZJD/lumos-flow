/**
 * Do not return anything, modify nums in-place instead.
 * 
 * * 寻找下一个排列
 */
function nextPermutation(nums: number[]): void {
  // 右侧排序最小值
  const sort = (start: number) => {
    const len = nums.length;
    const loop = len - start - 1;
    for (let j = 0; j < loop; j++) {
      for (let k = start; k < len - j; k++) {
        if (nums[k] > nums[k + 1]) {
          const sortTmp = nums[k];
          nums[k] = nums[k + 1];
          nums[k + 1] = sortTmp;
        }
      }
    }
  }

  let si = nums.length - 1;
  let st = -1;

  for (let i = nums.length - 1; i > 0; i--) {
    const current = nums[i];

    for (let j = 0; j < i; j++) {
      if (nums[j] < current && j > st) {
        si = i;
        st = j;
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

const a = [1,2,3];
console.log(nextPermutation(a), a);

const b = [3,2,1];
console.log(nextPermutation(b), b);

const c = [1,1,5];
console.log(nextPermutation(c), c);

const d = [1,3,2]; // -> 2 1 3
console.log(nextPermutation(d), d);

const e = [5,4,7,5,3,2]; // [5,4,7,5,3,2] -> 547532 -> 557432 -> 552347
console.log(nextPermutation(e), e);

const f = [2,2,0,4,3,1];
console.log(nextPermutation(f), f);

const x = [4,2,0,2,3,2,0];
console.log(nextPermutation(x), x);
