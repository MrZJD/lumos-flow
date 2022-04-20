/**
 * 最大网络秩
 * 
 * input:n 有n个节点
 * input:roads 表示节点与节点之前的链接
 * 
 * output: 输出对 其中两座城市 直接相连的道路总数 => 最大网络秩
 */

function maximalNetworkRank(n: number, roads: number[][]): number {
  // 输出n个城市取2个的组合数
  // 计算直接链接这个城市的道路，去重

  let result = 0;
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      const count = roads.filter(item => item.includes(i) || item.includes(j)).length;

      if (count > result) {
        result = count;
      }
    }
  }

  return result;
};

// 第二种做法是，记录每个节点的道路下标，然后两两取并集

console.log(maximalNetworkRank(4, [[0,1],[0,3],[1,2],[1,3]]));
console.log(maximalNetworkRank(5, [[0,1],[0,3],[1,2],[1,3],[2,3],[2,4]]));
console.log(maximalNetworkRank(8, [[0,1],[1,2],[2,3],[2,4],[5,6],[5,7]]));
