
export const benchmark = ((label: string, fn: () => any, times: number = 10) => {
  const timer = [];

  // 多次运行求平均值
  for (let i = 0; i < times; i++) {
    const s = Date.now();

    const result = fn();

    timer.push(Date.now() - s);

    if (times - i === 1) {
      const avg = (timer.reduce((p, i) => p + i, 0) / timer.length).toFixed(2);
      console.log('');
      console.log('Benchmark:', label);
      console.log('------------------------------------');
      console.log('Run Times:', times);
      console.log('Avg Cost time:', avg, 'ms');
      console.log('');

      return result;
    }
  }
});

export const isEqual = (a: any, b: any) => {
  const ta = typeof a;
  const tb = typeof b;

  if (ta !== tb) {
    return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  if (ta === 'object') {
    const entriesA = Object.entries(a);
    const entriesB = Object.entries(b);

    if (entriesA.length !== entriesB.length) {
      return false;
    }

    for (let i = 0; i < entriesA.length; i++) {
      const k = entriesA[i][0];
      if (!isEqual(a[k], b[k])) {
        return false;
      }
    }
    return true;
  }

  return a === b;
};

export const assertEqual = (a: any, b: any) => {
  const equal = isEqual(a, b);

  if (!equal) {
    console.log('Assert Fail: **************');
    console.log('Ouput: ', a);
    console.log('Except:', b);
    console.log('Assert Fail: **************');
  } else {
    console.info('Accept:', a);
  }
};
