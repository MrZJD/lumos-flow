// Constrait 'R' 'Y' 'B' 'G' 'W' // 每次可以插入一个球，在两个球中间或者末尾
// Input @string board 一串上述字符组成的字符串，表示排列的一组球，当有三个及以上的相同序列的球出现时即可以移除
// Input @string hand 手上拥有的字符

function getBalls(hand: string, ch: string, count = 1): [boolean, string] {
  for (let i = 0, len = hand.length; i < len; i++) {
    if (hand[i] === ch) {
      count--;
      if (count === 0) {
        return [true, hand.slice(0, i) + hand.slice(i + 1)];
      }
    }
  }
  return [false, hand];
}

function memoFactory<T extends any[], K>(memoFn: (...args: T) => K): (...args: T) => K {
  const cache: Record<string, K> = {};

  return (...args: T) => {
    const key = args.join('_');

    if (!cache[key]) {
      const result = memoFn(...args);
      cache[key] = result;
    }

    return cache[key];
  }
}

function trimSameBalls(balls: string, explode?: boolean) {
  let result = balls;
  let cursor = 0;

  while (cursor < result.length) {
    const curr = result[cursor];
    let end = cursor + 1;
    while (curr === result[end]) {
      end++;
    }

    if (end - cursor >= 3) {
      result = result.slice(0, cursor) + result.slice(end);
      explode && (cursor = 0); // 每次消除后从0开始再次扫一遍
    } else {
      cursor = end;
    }
  }

  return result;
}

let indent = '';

function findMinStepRaw(source: string, hand: string): number {
  // console.log(`${indent}input:`, source, hand, hand.length);
  // indent += '  ';
  if (!source.length) {
    return 0;
  }

  const board = trimSameBalls(source, true);

  if (!board.length) {
    return 0;
  }

  if (!hand.length) {
    return -1;
  }

  let minSteps = -1;

  const cacheMap: Record<string, boolean> = {};

  for (let i = 0, len = hand.length; i < len; i++) {
    const currHandBall = hand[i];
    // 如果球是相同的就不用试了
    if (cacheMap[currHandBall]) {
      continue;
    }

    for (let j = 0, jlen = board.length; j <= jlen; j++) {
      // insert hand[i] -> board[j] // 把手里的球插入序列j之后
      // BRB => B[R]RB BR[R]B => 优化这种情况如果手球和当前球相同skip(表示只能插入到不同的球之后)
      if (board[j + 1] === currHandBall) {
        continue;
      }
      // console.log(`${indent}Insert: ${currHandBall} -> ${board} (${board.slice(0, j) + currHandBall + board.slice(j)}})`)
      const steps = findMinStep(
        board.slice(0, j) + currHandBall + board.slice(j),
        hand.slice(0, i) + hand.slice(i + 1)
      );
      // console.log(`${indent}Insert Output: ${steps}`)

      if (steps === -1) {
        continue;
      }

      minSteps = minSteps === -1 ? steps + 1 : Math.min(minSteps, steps + 1)
    }

    cacheMap[currHandBall] = true;
  }

  // indent = indent.slice(2);
  // console.log(`${indent}output:`, minStep);

  return minSteps;
};

const findMinStep = memoFactory<[string, string], number>(findMinStepRaw);

// ---------

const testcase = [
  {
    input: [
      "RRWWRRBBRR","WB"],
      expect: 2, // https://leetcode.com/problems/zuma-game/discuss/898526/SOLVED-Test-case-missing.-Probably-most-fast-accepted-solutions-are-wrong.
  },
  {
    input: ["WR", "WWRR"],
    expect: 4
  },
  {
    input: ['G', ''],
    expect: -1
  },
  {
    input: ['G', 'G'],
    expect: -1
  },
  {
    input: ['G', 'GGG'],
    expect: 2
  },
  {
    input: ['WW', 'G'],
    expect: -1
  },
  {
    input: ['WW', 'W'],
    expect: 1
  },
  {
    input: ['WW', 'WW'],
    expect: 1
  },
  {
    input: ['WWW', 'WW'],
    expect: 0
  },
  {
    input: ['WWWRR', 'R'],
    expect: 1
  },
  {
    input: ['WRRBBW', 'RB'],
    expect: -1
  },
  {
    input: ['WWRRW', 'R'],
    expect: 1
  },
  {
    input: ['WWRRWW', 'R'],
    expect: 1
  },
  {
    input: ['WWRRBBWW', 'WRBRW'],
    expect: 2
  },
  {
    input: ["RBYYBBRRB", "YRBGB"],
    expect: 3
  },
  {
    input: ["RRGGBBYYWWRRGGBB", "RGBYW"],
    expect: -1, // TIME EXCEED // 思考一下有没有更好的解决方法
  }
];

const runTest = (cases: { input: any[], expect: any }[]) => {
  for (let i = 0, len = cases.length; i < len; i++) {
    console.log(`-------------------- Start: ${i}`);
    const { input, expect } = cases[i];
    const s = Date.now();
    const result = findMinStep.apply(null, input as any);
    const e = Date.now();

    console.log(expect === result ? '✅Success:' : `❌Failed: expect ${expect} result ${result}`);
    console.log(`  idx: ${i}`);
    console.log(`  cost time: ${e - s}`);
    console.log(`--------------------`);

    if (expect !== result) {
      break;
    }
  }
}

runTest(testcase);
