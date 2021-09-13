
export const flatten = <T>(source: Array<T | T[]>): T[] => {
  return source.reduce<T[]>((result, curr) => {
    if (Array.isArray(curr)) {
      result.push(...curr);
    } else {
      result.push(curr);
    }

    return result;
  }, [] as T[]);
};

export default flatten;
