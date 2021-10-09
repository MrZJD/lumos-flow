# [React]基于hooks的状态管理 - 实现原理

## 参考

**源码**

- [hox](https://github.com/umijs/hox/blob/master/src)
- @byted-ace/state

> * Context已经可以很好的解决状态共享的问题
> * 但是Context中状态发生变化时，会刷新整个子组件树，无法自动根据依赖按需渲染组件（当然手动通过useMemo / memo可以）

## 方案说明

```tsx
// 1. 创建store
// createModel
// store(本质是一个observer + eventemitter：拿到状态变化 => 下发给组件)

// 2. 创建监听
// useModel
// 添加监听

// 3. 整体逻辑
// observer（监听store中hooks的变化）
// useModel (创建store中hooks的副本) => 这里就可以判断依赖按需渲染
// [state, setState] => observer => emit event => useModel => state changes(副本变化)

// 下面两个方案整体都是整个思路，有部分区别
// hox: createModel => 创建observer
// ace: Provider实例化 => 创建observer

// 重点：observer如何拿到hooks变化（hox/ace的根本区别）
```


### 1. React.Reconciler

```tsx
// 通过reconciler实现observer(创建一个react app副本 => 副本中调用hooks)
```


### 2. 利用React 组件模型

```tsx
// 逻辑和方案1一模一样，区别在于observer的实现不同

// 1. 区别点
// 局部state，基于Provider创建observer

// 2. 通过组件模型，很巧妙的实现了Observer

const observer;

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storeHooks = modelCreator(); // store hooks
    
    useEffect(() => {
        // emit hooks change
        observer.emit();
    });
    
    // 巧妙 => 这里storehooks change时children并不会重新渲染
    return (children);
}; 

const useModel = (getDeps: (store: T) => any[]) => {
    const [store, setStore] = useState(); // store hooks 副本
    
    useEffect(() => {
        // 监听
        observer.listen();
        
        return observer.remove();
    }, []);
    
    return (<div>...</div>);
};
```

# React其他一些状态管理方案

* Redux




