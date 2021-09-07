
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

  return source;
}
