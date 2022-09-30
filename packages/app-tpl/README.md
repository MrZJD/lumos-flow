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
    │   └── lib                // 可复用lib - 如Request封装
    ├── components             // 公共组件 - 如用户卡片
    ├── service                // 服务
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

## Demo

```tsx

function createElement(tagName | component, attributes, children) {

}

// 还是通过App组件树来渲染DOM
function App() {
    return (
        <div>
            <p>{a}</p>
            <button onclick={increment}>add 1</button>
        </div>
    );
}

function AppStore() {
    let a = 1;

    const increment = () => {
        a += 1;
    };

    return {
        a,
        increment
    };
}

// JSX -> 创建真实的dom -> 寻找依赖 connect store
// no vdom -> dom <-> store state
```
