
// 移除
// * sideEffect 在原数据上修改
export const remove = <T>(source: T[], byFn: (item: T) => boolean) => {
  while (true) {
    const index = source.findIndex(item => byFn(item));

    if (index < 0) {
      break;
    }

    source.splice(index, 1);
  }
}

// 去重（根据指定）
export const duplicateBy = <T>(source: T[], handler: (item: T) => any = item => item) => {
  const result: T[] = [];

  source.forEach(item => {
    // 根据指定值比较
    if (result.find(ri => handler(ri) === handler(item))) {
      return;
    }

    result.push(item);
  });

  return result;
}

// 去重
export const duplicate = <T>(source: T[]) => {
  return duplicateBy(source);
}

// 同名函数
// uniq
export const uniq = duplicate;
export const uniqBy = duplicateBy;

// 取并集
export const union = <T>(source: T[], target: T[]) => {
  const result = source.concat(target);

  return duplicate(result);
}

// 取交集
export const intersecation = <T>(source: T[], target: T[]) => {
  const result: T[] = [];

  source.find(si => {
    const exist = target.find(ti => ti === si);

    if (exist) {
      result.push(exist);
    }
  });

  return result;
}
