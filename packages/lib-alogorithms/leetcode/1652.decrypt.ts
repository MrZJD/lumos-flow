/**
 * 题解：
 * input: code为一个一维数组，意义上代表一串可以循环的数字
 * input: k为解谜关键数
 * 
 * k === 0，所有数替换为0
 * k > 0, 每一个数替换为接下来的k个数之和
 * k < 0, 每一个数替换为之前的k个数之和
 */

function decrypt(code: number[], k: number): number[] {
  const len = code.length;
  const direction = k > 0 ? 1 : -1;
  const count = Math.abs(k);

  if (k === 0) {
    return new Array(len).fill(0);
  }

  return code.map((_, si) => {
    let result = 0;
    for (let i = 1; i <= count; i++) {
      const ni = (si + direction * i) % len;
      result += code[ni < 0 ? ni + len : ni];
    }
    return result;
  });
};

console.log(decrypt([5,7,1,4], 3));
console.log(decrypt([1,2,3,4], 0));
console.log(decrypt([2,4,9,3], -2));
