# 工具集

## 目录说明

```text
- packages/app-admin # PC端项目template
- packages/app-mobile # Mobile端项目template
- packages/app-cli # 构建工具
- packages/lib-alogorithms # 算法
- packages/lib-components # 组件物料
- packages/lib-hooks # react hooks物料
- packages/lib-scripts # 工具脚本
- packages/lib-utils # 工具方法物料
```



## 工程化

```bash
yarn workspace app-a start # dev
```

或者进入项目中执行

```bash
cd ./packages/app-admin/
yarn start
```

### Yarn Workspace管理依赖

添加公共依赖

```bash
# 根目录下
yarn add modules -W
```

单独给某个仓库添加依赖

```bash
yarn workspace app-a add modules
```

子仓之间的交叉依赖

```bash
yarn workspace app-a add lib-components@1.0.0 # 需要添加版本号
```

### 子仓

* 应用仓
  * 包含应用独立运行的所有配置（除从主仓继承的依赖外）
* 公用代码仓
  * 只包含源码，不应该配置其他内容

### 应用仓配置

需要把babel includes加上其他模块，便于交叉引用

**公用代码仓无法使用alias，因为是通过应用仓进行启动，配置都在应用仓内**

应用仓 `carco.config.js` 配置参考

```js
module.exports = {
  webpack: {
    alias: {
      '@': pathResolve('src'), // 配置@ （同时还要配置tsconfig，如下）
    },
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.module.rules = webpackConfig.module.rules.map(item => {
        if (item.oneOf) {
          return {
            ...item,
            oneOf: item.oneOf.map(rules => {
              // => 这里需要把resolve的模块都添加进来
              if (rules.loader && rules.loader.includes('babel-loader')) {
                return {
                  ...rules,
                  include: pathResolve('../'),
                  exclude: /node_modules/
                }
              }
              return rules;
            })
          };
        }
        
        return item;
      });

      return webpackConfig;
    }
  }
}
```
