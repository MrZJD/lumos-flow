// 数组拍到map中
export const flatArr2Map = <T extends Record<string, any>>(source: T[], keyAttr: keyof T, valueAttr: keyof T) => {
  const result: Record<string, any> = {};

  source.forEach(item => {
    result[item[keyAttr] as any as string] = item[valueAttr];
  });

  return result;
};

export default flatArr2Map;