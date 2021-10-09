function isVoid(val) {
  return val === undefined || val === null;
}

function mergeArray <T>(source: T[], target: T[]): T[] {
  const len = Math.max(source.length, target.length);
  const result: T[] = [];

  for (let i = 0; i<len; i++) {
    result[i] = merge(source[i], target[i]);
  }

  return result;
};

// TODO: 测试用例
export const merge = <T>(source: T, target: T): T => {
  const stype = typeof source;
  const ttype = typeof target;

  if (isVoid(source) || isVoid(target)) {
    return source || target;
  }

  // 类型不同
  if (stype !== ttype) {
    return target;
  }

  // 不是复杂类型
  if (stype !== 'object') {
    return target;
  }

  // 数组类型
  if (Array.isArray(target)) {
    // @ts-ignore
    return mergeArray(source, target);
  }

  // 对象类型
  const result = {};

  Object.entries(source).forEach(([name, value]) => {
    result[name] = merge(value, target[name]);
  });

  Object.entries(target).forEach(([name, value]) => {
    // 重复逻辑escape
    if (name in source) {
      return;
    }

    result[name] = value;
  });

  return result as T;
};

export default merge;
