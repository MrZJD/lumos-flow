// **换硬币问题**

// > 有k种面值硬币(面值分别为C1,C2,...Ck)，数量没有限制，求解，需要的最少硬币数量M=>获得指定总金额n，无法获得时-1

// dp(n) = -1, n < -1 // 金额小于0时
// dp(n) = 0, n = 0 // 金额=0
// dp(n) = min{ dp(n - Ck) + 1 }, n > 0 // 金额大于0，求每次集合中的最小硬币数量

// 递归 O(n*n)
function calcMinCoin(coins: number[], amount: number) {
  if (amount < 0) {
    return -1;
  }

  if (amount === 0) {
    return 0;
  }

  let minCoin = -1;
  for (let c of coins) {
    const a = amount - c;

    if (a < 0) {
      continue;
    }

    const res = calcMinCoin(coins, a);
    minCoin = minCoin === -1 ? res : Math.min(minCoin, res);
  }

  return minCoin;
}

// DP
function calcMinCoin2(coins: number[], amount: number) {
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