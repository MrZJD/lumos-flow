
const cxJoin = (cxArr: string[]) => cxArr.filter(item => Boolean(item)).join(' ');

// html class name
export const cx = (...cxs: (string | string[] | Record<string, boolean>)[]) => {
  const result = cxs.map(cxItem => {
    if (typeof cxItem === 'string') {
      return cxItem;
    }
  
    if (Array.isArray(cxItem)) {
      return cxJoin(cxItem);
    }
  
    return cxJoin(
      Object.entries(cxItem).map(([name, value]) => {
        if (value) {
          return name;
        }
        return undefined;
      })
    );
  });

  return cxJoin(result);
};
