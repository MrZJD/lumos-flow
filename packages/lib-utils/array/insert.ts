import { isEqual } from 'lodash';

enum EInsertMode {
  before = 1,
  after = 2,
}

export function insertByOffset<T>(
  arr: Array<T>,
  offset: T,
  target: T,
  mode: EInsertMode = EInsertMode.before
): Array<T> {
  return arr.reduce((prev, curr) => {
    const flag = isEqual(curr, offset);

    if (flag && mode === EInsertMode.before) {
      prev.push(target);
    }

    prev.push(curr);

    if (flag && mode === EInsertMode.after) {
      prev.push(target);
    }

    return prev;
  }, [] as Array<T>);
}

export function insertBefore<T>(arr: Array<T>, offset: T, target: T): Array<T> {
  return insertByOffset(arr, offset, target, EInsertMode.before);
}

export function insertAfter<T>(arr: Array<T>, offset: T, target: T): Array<T> {
  return insertByOffset(arr, offset, target, EInsertMode.after);
}
