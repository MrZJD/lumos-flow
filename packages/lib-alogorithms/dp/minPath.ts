import { benchmark } from './utils';
// **最短路径问题**

// > 给定M x N网格，填充非负数，找到一条路径从左上到右下时路径上所有数字相加数字最小

// DFS
function minPathDfs(board: number[][], start = [0, 0]): [number, number[][]] {
  const [sx, sy] = start;

  // 当前节点不存在
  if (!board[sx] || !board[sx][sy]) {
    return [-1, []];
  }

  const curr = board[sx][sy];

  if (sx == board.length - 1 && sy === board[0].length - 1) {
    return [curr, [start]];
  }

  // 向下
  const [btm, btmPath] = minPathDfs(board, [sx+1, sy]);
  // 向右
  const [right, rightPath] = minPathDfs(board, [sx, sy+1]);

  if (btm === -1 && right === -1) {
    return [-1, []];
  }

  if (btm === -1) {
    return [right + curr, [start].concat(rightPath)];
  }

  if (right === -1) {
    return [btm + curr, [start].concat(btmPath)];
  }

  if (right < btm) {
    return [right + curr, [start].concat(rightPath)];
  }

  return [btm + curr, [start].concat(btmPath)];
}

// BFS
function minPathBfs(board: number[][]): [number, number[][]] {
  const [xlen, ylen] = [board.length, board[0].length];

  let nextRound = [{ count: board[0][0], path: [[0, 0]] }];
  let minCount = -1;
  let minPath: number[][] = [];

  while (nextRound.length) {
    const round = nextRound.shift();

    if (!round) {
      continue;
    }

    const [cx, cy] = round.path[round.path.length - 1];

    // 到达最后的节点
    if (cx === xlen - 1 && cy === ylen - 1) {
      if (minCount === -1 || round.count < minCount) {
        minCount = round.count;
        minPath = round.path;
      }

      continue;
    }

    if (cx < xlen && cy + 1 < ylen) {
      nextRound.push({
        count: round.count + board[cx][cy+1],
        path: round.path.concat([[cx, cy + 1]]),
      });
    }

    if (cx + 1 < xlen && cy < ylen) {
      nextRound.push({
        count: round.count + board[cx + 1][cy],
        path: round.path.concat([[cx + 1, cy]])
      });
    }
  }

  return [minCount, minPath]
}

// DP: S[i][j] = min(S[i - 1][j], S[i][j - 1]) + grid[i][j]
function minPathDp(board: number[][]) {
  const [xlen, ylen] = [board.length, board[0].length];

  const dp = [[board[0][0]]];

  for (let x = 0; x < xlen; x++) {
    for (let y = 0; y < ylen; y++) {
      if (x === 0 && y === 0) {
        continue;
      }
      if (!dp[x]) {
        dp[x] = []
      }
      // 左边界
      if (y === 0) {
        dp[x][y] = dp[x-1][y] + board[x][y];
        continue;
      }
      // 上边界
      if (x === 0) {
        dp[x][y] = dp[x][y-1] + board[x][y];
        continue;
      }
      dp[x][y] = Math.min(dp[x-1][y], dp[x][y-1]) + board[x][y];
    }
  }

  return dp[xlen-1][ylen-1];
}

const i1 = [[1], [2], [3]];
const i2 = [
  [1, 1, 5, 10, 100, 10],
  [2, 1, 1, 11, 2, 22],
  [3, 3, 1, 11, 99, 100],
  [3, 3, 1, 4, 10, 2]
]

benchmark('dfs1', () => minPathDfs(i1))
benchmark('dfs2', () => minPathDfs(i2))

benchmark('bfs1', () => minPathBfs(i1))
benchmark('bfs2', () => minPathBfs(i2))

benchmark('dp1', () => minPathDp(i1))
benchmark('dp2', () => minPathDp(i2))
