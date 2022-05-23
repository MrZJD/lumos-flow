
function minOf(arr: number[]): number {
  let result = arr[0];

  for (let i = 1, len = arr.length; i < len; i++) {
    if (arr[i] < result) {
      result = arr[i];
    }
  }

  return result;
}

function serial(arr: number[][]): number[][] {
  let result: number[][] = [];

  for (let i = 0, len = arr.length; i < len; i++) {
    const row: number[] = [];
    for (let j = 0, jlen = arr[i].length; j < jlen; j++) {
      const curr = arr[i][j];
      row.push(curr === 0 ? 1 : 0);
    }
    result.push(row);
  }

  for (let i = 0, len = result.length; i < len; i++) {
    for (let j = 0, jlen = result[i].length; j < jlen; j++) {
      const curr = result[i][j];

      if (curr === 1) {
        let flag = false;
        for (let k = j + 1; k < jlen; k++) {
          if (result[i][k] === 1) {
            result[i][k] = -2;
            flag = true;
          }
        }
        for (let k = i + 1; k < len; k++) {
          if (result[k][j] === 1) {
            result[k][j] = -2;
          }
        }
        result[i][j] = 2;
      }
    }
  }

  return result;
}

// 得出盖零线矩阵
function cover(arr: number[][]): number[][] {
  const rows: number[] = [];
  const cols = 
  arr.find((row, ri) => {
    const idp = row.every(item => item !== 2);
  });
  while (1) {
    let cols = [];
    rows.forEach(ri => {
      cols = arr[ri].filter(item => item === -2);
    });
  }
}

export default function hungarian(rect: number[][]) {
  const data: number[][] = JSON.parse(JSON.stringify(rect));
  // -x
  for (let i = 0, len = data.length; i < len; i++) {
    const min = minOf(data[i]);
    data[i] = data[i].map(item => item - min);
  }
  // -y
  for (let j = 0, len = data[0].length; j < len; j++) {
    const min = minOf(data.map(arr => arr[j]));
    data.forEach(arr => {
      arr[j] = arr[j] - min;
    });
  }
  // console.log(data);
  const result = serial(data);
  console.log(result);
}

hungarian([
  [10, 5, 9, 18, 11],
  [13, 19, 6, 12, 14],
  [3, 2, 4, 4, 5],
  [18, 9, 12, 17, 15],
  [11, 6, 14, 19, 10]
]);
