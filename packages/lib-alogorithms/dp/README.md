# DP - Dynamic Programming 动态规划

> 将问题分解成不同的部分(子问题) - 重叠子问题 & 最优子结构

* 区别于递归: 自底向上循环迭代完成计算，耗时更优

> 通常思路：穷举 -> 求最值 -> 从后往前找规律

## 重叠子问题 & 最优子结构 & 求最值

**fib数列**

```text
f(n) = 0, n = 0
f(n) = 1, n = 1
f(n) = f(n-1) + f(n-2), n > 1
```

```ts
function fib(n: number) {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}
// Time - O(2^n)
```

**重叠子问题**

> fib(n-1)势必需要先计算 fib(n-2) => 导致重复计算了fib(n-2)

_优化1.时间换空间_

```ts
function fib(n: number) {
  const cache = [0, 1];
  for (let i = 2; i < n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2];
  }
  return cache[n];
}
// O(n)
```

> 实际上不需要记录所有状态，只需要上两次的状态即可

_优化2.状态压缩_

```ts
function fib(n: number) {
  if (n < 2) {
    return n;
  }

  const cache = [0, 1];
  let result = 0;
  for (let i = 2; i < n; i++) {
    const result = cache[0] + cache[1];

    cache[0] = cache[1]
    cache[1] = result;
  }
  return result;
}
// Time - O(n) / Space - O(1)
```

**换硬币问题**

> 有k种面值硬币(面值分别为C1,C2,...Ck)，数量没有限制，求解，需要的最少硬币数量M=>获得指定总金额n，无法获得时-1

```text
dp(n) = -1, n < -1 // 金额小于0时
dp(n) = 0, n = 0 // 金额=0
dp(n) = min{ dp(n - Ck) + 1 }, n > 0 // 金额大于0，求每次集合中的最小硬币数量
```

**递归**

```js
// 伪代码
f(N) = min(
  f(N - C1) + 1,
  f(N - C2) + 1,
  ...,
  f(N - Ck) + 1
);

// 问题1: N-C1会重复计算值相同的部分
//       如C1=1 C2=2时，N=min( f(N-1)+1, f(N-2)+1 ) f(N-1) = min( f(N-2)+1, f(N-3)+1 )
```

**DP**

```ts
function calcMinCoin(coins: number[], amount: number) {
  if (amount < 0) {
    return -1;
  }

  if (amount === 0) {
    return 0;
  }

  const dp = [0];

  for (let i = 1; i <= amount; i++) {
    for (const c of coins) {
      if (i - c < 0) {
        continue;
      }
      dp[i] = dp[i] === undefined ? dp[i - c] + 1 : Math.min(dp[i], dp[i - c] + 1);
    }
  }

  return dp[amount] !== undefined ? dp[amount] : -1;
}
```


## 树形DP

## 线性DP

## 区间DP

## 数位DP

## 状态压缩DP