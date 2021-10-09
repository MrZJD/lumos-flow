// import merge from '../../object/merge';

// 通常在一些封装逻辑中，将可插拔的一系列逻辑单独拎出来独立成一个个的小插件，通过排列组合的方式使用
// eg. jquery plugin
// eg. webpack plugin
interface IAppOption {}

type TPlugin = (rawData: IAppOption) => IAppOption;

// const pluginA = (rawData: IAppOption) => {
//   // 修改rawData

//   // 返回新的data
//   return merge(rawData, {});
// }

// const pluginB = (rawData: IAppOption) => {
//   // 修改rawData

//   // 返回新的data
//   return merge(rawData, {});
// }

export const usePlugin = (rawData: IAppOption, plugins: TPlugin[]) => {
  return plugins.reduce((prev, handler) => {
    return handler(prev);
  }, rawData);
};
