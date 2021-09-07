
// 浅克隆
export const clone = <T>(source: T): T => {
  if (Array.isArray(source)) {
    // @ts-ignore
    return Array.from(source);
  }

  return Object.assign({}, source);
}

// 深克隆
export const cloneDeep = <T>(source: T): T => {
  // method 1
  // const target = JSON.stringify(source);

  // return JSON.parse(target);

  if (typeof source !== 'object') {
    return source;
  }

  if (Array.isArray(source)) {
    // @ts-ignore
    return source.map(item => cloneDeep(item));
  }

  // @ts-ignore
  return Object.entries(source).reduce((result, [attr, value]) => {
    result[attr] = cloneDeep(value);

    return result;
  }, {});
}
