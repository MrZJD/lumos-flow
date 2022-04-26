# Simple SSR方案 (WIP)

* SSR目标为提高站点站点的加载速度 + SEO
* 不使用vue / react作为页面方案 -> 通常此类站点 与 SPA应用的功能区别明显，本身站点复杂度不高，不需要依赖响应式MVVM框架来降低应用的代码复杂度
* 路由SSR优化明显后 可以直接使用浏览器路由刷新

## 如何去优化网页的响应速度

* webpack without MVVM
* SSR without MVVM

nodejs -> template -> custom synatx compile(ejs)

* entry.js -> user complie
* ---> 如果页面响应足够快 ---> location href change页面变更将不昂贵

```ts
class Wiget {
  #ele: HTMLElement;
  #parentEle: HTMLElement;

  construtor(parentEle: HTMLElement) {

  }

  destory() {}

  update() {}

  render() {}
}
```

## 架构设计

SSR: http url request -> Server(Route) -> query cache -?-> generate html -?-> save cache -> response

CSR: render page & scripting(based on dom, 不需要执行初始化render)

SSR Fallback: 检查没有dom节点时执行初始化render

### Server + cache缓存系统

### 模版引擎

> 1. JSX + Diff
> 2. ejs
> 3. 调研...

### 前端组件化

1. 组件系统
2. 全局GlobalNotifier
3. ....


### UI编程演进

1. 一阶段 绘图API
2. 二阶段 DSL => HTML / CSS
3. 现代阶段 DSL => JSX => HTML DOM

* [JSX2DOM](https://github.com/cuzfinal/JSX2DOM/blob/master/src/element.ts)

## 思路

## 我们为什么需要SSR

> 从浏览器输入URL到页面展示 经历了哪些阶段

1. 更快的触达用户展示
2. 更好的搜索引擎&网络爬虫的理解
3. 更快速的页面性能

## 目标

1. 用户首屏 去除网络因素后 TTI < 1s

## SSG对比SSR

1. 不需要全量应用SSR，只需要将首屏关键数据渲染。

## 架构设计

1. APP级别注入数据
2. Page级别注入数据

1. 构建模版时注入
  - 优点：不需要每次请求注入数据
2. 运行时注入
  - 优点：动态性好
3. ISR: incremental-static-regeneration
  - 综合1/2，设置过期时间/webhooks动态打包
4. 服务渲染组件(Server Components)
  - [next.js](https://nextjs.org/docs/advanced-features/react-18/server-components)


## 适配器 React
