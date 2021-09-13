import { flatten } from '../array/flatten';

// 解析路径
// a.b[1].c.d => ['a', 'b', 1, 'c', 'd']
const parsePath = (path: string) => {
  const items = path.trim().split('.');

  return (
    flatten(
      items.map(i => {
        const arri = i.indexOf('[');
        const arre = i.indexOf(']');
        // 中括号取值方式
        if (arri > -1 && arre > -1) {
          const idx = i.slice(arri + 1, arre);
    
          // 空取值 || 非数字 
          if (!idx || Number.isNaN(Number(idx))) {
            throw new Error('[utils][object][byPath]: path cannot contain no-number index getter');
          }
    
          return [i.slice(0, arri), Number(idx)];
        }
        return i;
      })
    )
  );
}

// lodash.get
export const byPath = (obj: Record<string, any>, pathStr: string) => {
  let target = obj;
  let path = parsePath(pathStr);

  for (let i = 0, len = path.length; i < len; i++) {
    const attr = path[i];

    // 无法再取值
    if (!target) {
      return undefined;
    }

    // 取值
    target = target[attr];
  }

  return target;
}

export default byPath;

