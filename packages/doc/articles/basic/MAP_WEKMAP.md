# Map & WeakMap

* [MDN - Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
* [MDN - WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

**Map特性**

> 1. 任意类型的值都可以作为键

**WeakMap区别**

> 1. WeakMap只有对象类型的才可以作为键
> 2. WeakMap引用对象作为键时，保持弱引用（即对象被销毁时自动被GC回收，避免造成内存泄漏）

[关于内存泄漏](./map_weakmap.js)

## 应用

**利用WeakMap解决React & Map中无唯一ID时key的问题**

[key-defender](https://github.com/oychao/key-defender/blob/master/src/main.js)

```js
// key-defender

let idFlag = 0;
const store = new WeakMap();

function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

function k(source: any) {
  const typeSource = typeof source;

  if (!isObject(source)) {
    throw new Error('key source just can be object');
  }

  if (store.has(source)) {
    return store.get(source);
  }
  
  idFlag++;

  keyMap.set(source, `${idFlag}`);

  return idFlag;
};
```

