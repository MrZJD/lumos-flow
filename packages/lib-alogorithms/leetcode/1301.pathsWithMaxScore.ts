/**
 * 题解:
 * 1. input => 二维数组，约定右下角为Start，左上角为End，其他节点要么是number or 'X'
 * 2. output => 从右上角走到左上角 [路径上的数累加的最大值, 满足最大值路径的数量 对 10^9 + 7 取模]
 * @param board 
 * 
 * 1. 二维数组 遍历点到点
 * 2. 大数据加一个memo存储（递归优化策略）
 */

interface INode {
  x: number;
  y: number;
}

interface IPath {
  count: number;
  paths: INode[];
}

function pathsWithMaxScore1(board: string[]): number[] {
  const startNode: INode = {
    y: board.length - 1,
    x: board[0].length - 1,
  };

  const getVal = (node: INode) => {
    const v = board[node.y][node.x];
    if (v === 'S' || v === 'E' || v === 'X') {
      return v;
    }
    return Number(v);
  };
  const last = (arr: any[]) => arr[arr.length - 1];
  const getUp = (node: INode) => node.y === 0 ? undefined : ({ y: node.y - 1, x: node.x });
  const getLeft = (node: INode) => node.x === 0 ? undefined : ({ y: node.y, x: node.x - 1 });
  const getDiag = (node: INode) => node.x === 0 || node.y === 0 ? undefined : ({ y: node.y - 1, x: node.x - 1 });

  const getNextPath = (currPath: IPath, node: INode) => {
    if (!node) {
      return;
    }

    const val = getVal(node);

    if (val === 'E') {
      return {
        count: currPath.count,
        paths: currPath.paths.concat(node),
        isDone: true
      };
    }

    if (typeof val === 'number') {
      return {
        count: currPath.count + Number(val),
        paths: currPath.paths.concat(node)
      };
    }

    return;
  };

  // walk - 深度 or 广度
  let paths: IPath[] = [{
    count: 0,
    paths: [{ x: startNode.x, y: startNode.y }]
  }];

  const result: IPath[] = [];

  const pushNode = (currPath: IPath, nextNode?: INode) => {
    if (!nextNode) {
      return;
    }

    // go up
    const nextPath = getNextPath(currPath, nextNode);
    nextPath && nextPath.isDone && result.push(nextPath);

    return nextPath;
  }

  while (paths.length) {
    const nextPaths = [];

    // 增强所有path
    for (let i = 0, len = paths.length; i < len; i++) {
      const currPath = paths[i];

      const currNode = last(currPath.paths);
      const currVal = getVal(currNode);

      if (currVal === 'S' || typeof currVal === 'number') {
        // go up
        const nextPathUp = pushNode(currPath, getUp(currNode));
        nextPathUp && nextPaths.push(nextPathUp);
        // left up
        const nextPathLeft = pushNode(currPath, getLeft(currNode));
        nextPathLeft && nextPaths.push(nextPathLeft);
        // left up
        const nextPathDiag = pushNode(currPath, getDiag(currNode));
        nextPathDiag && nextPaths.push(nextPathDiag);
      }
    }

    paths = nextPaths;
  }

  return result.reduce((prev, curr) => {
    if (curr.count > prev[0]) {
      return [curr.count, 1];
    } 
    if (curr.count === prev[0]) {
      return [curr.count, prev[1] + 1];
    }
    return prev;
  }, [0, 0]);
};

/**
 * 递归优化逻辑
 * but time exceed
 */
function pathsWithMaxScore2(board: string[]): number[] {
  function walkWithIndex(x: number, y: number): number[] | undefined {
    if (x < 0 || y < 0) {
      return;
    }

    const val = board[y][x];

    if (val === 'X') {
      return;
    }

    if (val === 'E') {
      return [0, 1];
    }

    const num = val === 'S' ? 0 : +val;

    // 过滤掉空值 => 无效路径
    return [
      walkWithIndex(x - 1, y),
      walkWithIndex(x - 1, y - 1),
      walkWithIndex(x, y - 1)
    ].filter(item => !!item).reduce((prev: number[], curr: any) => {
      const result = prev || [0, 0];
      const count = curr[0] + num;

      if (count === result[0]) {
        return [result[0], result[1] + curr[1]];
      }
      if (count > result[0]) {
        return [count, curr[1]];
      }
      return result;
    }, undefined as any as number[]) as any;
  }

  const sx = board[0].length - 1;
  const sy = board.length - 1;

  return walkWithIndex(sx, sy) || [0, 0];
}

// with memorize
function pathsWithMaxScore(board: string[]): number[] {
  const sx = board[0].length - 1;
  const sy = board.length - 1;
  const memoBoard = new Array(board.length).fill(0).map(_ => new Array(board.length).fill(-1));

  const mod = 10 ** 9 + 7;

  function memorize(x: number, y: number): number[] | undefined {
    if (x < 0 || y < 0) {
      return;
    }

    if (memoBoard[y][x] !== -1) {
      return memoBoard[y][x];
    }

    const result = walkWithIndex(x, y);

    memoBoard[y][x] = result;

    return result;
  }

  function walkWithIndex(x: number, y: number): number[] | undefined {
    if (x < 0 || y < 0) {
      return;
    }

    const val = board[y][x];

    if (val === 'X') {
      return;
    }

    if (val === 'E') {
      return [0, 1];
    }

    const num = val === 'S' ? 0 : +val;

    // 过滤掉空值 => 无效路径
    return [
      memorize(x - 1, y),
      memorize(x - 1, y - 1),
      memorize(x, y - 1)
    ].filter(item => !!item).reduce((prev: number[], curr: any) => {
      const result = prev || [0, 0];
      const count = curr[0] + num;

      if (count === result[0]) {
        return [result[0], (result[1] + curr[1]) % mod];
      }
      if (count > result[0]) {
        return [count, curr[1]];
      }
      return result;
    }, undefined as any as number[]) as any;
  }

  return memorize(sx, sy) || [0, 0];
}
