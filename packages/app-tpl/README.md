# 项目模版

**项目结构**

```txt
├── README.md                  //
├── public                     // 静态文件 html / static
└── src                      
    ├── app.ts                 // entry
    ├── context                // 全局状态目录 - 如用户信息等
    ├── common                 // 公共代码
    │   ├── config             // 配置常量等
    │   ├── entity             // 对象实体 NOTICE: 代码中的常量/方法等都需要定义到实体上
    │   ├── helper             // 工具函数
    │   └── lib                // 可复用lib
    ├── components             // 公共组件 - 如用户卡片
    └── pages                  // 页面
        └── xxx              
            ├── xx_container   // 页面模块(结构拍平)
            ├── index.ts       // 页面entry
            └── store.ts       // optional 页面级context
```

## Start

> 前置依赖

> 开发

## 项目介绍

## 开发规范

## 发布流程
