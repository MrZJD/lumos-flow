const path = require('path');

const pathResolve = pathUrl => path.join(__dirname, pathUrl);

module.exports = {
  style: {
    modules: {
      localIdentName: '[local]___[hash:base64:5]'
    },
  },
  scss: {
    loaderOptions: {
      implementation: require('sass')
    },
  },
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