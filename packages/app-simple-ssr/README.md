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
