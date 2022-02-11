
/**
 * 获取实例的构造函数
 */
export const getConstructor = (cls: any): any => {
  return Object.getPrototypeOf(cls).constructor;
};

/**
 * 获取实例构造方法的静态属性flag
 * @param cls 
 */
export const getClassStr = (cls: any): string | undefined => {
  return getConstructor(cls).toString();
};
