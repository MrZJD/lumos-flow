# MatchManager

> 在大型项目维护的过程会发现很多switch-case | map映射数据变得越来越大，难以维护。为解决这个问题，将匹配逻辑泛化成模型。

**（before）使用Map映射数据**

```ts
// before(use map)
const userMap = {
  'user-a': 60,
  'user-b': 80,
  'user-c': 100,
};

const r1 = userMap['user-a'] || 0;
```

**（before）使用switch-case映射逻辑**

```ts
const getResult = (input: string) => {
  switch (input) {
    case 'user-a':
      return 60;
    case 'user-b':
      return 80;
    case 'user-c':
      return 100;
    default:
      return 0;
  }
};
```

**使用Manager分离逻辑维护**

```tsx
// after
const manager = new MatchManager<string, number>(0);

manager.add('user-a', () => 60);
manager.add('user-b', () => 80);
manager.add('user-c', () => 100);

const r2 = manager.resolve('user-a');
```

**更复杂的示例**

```ts
// commonly we write jsx like this
// 我们通常在JSX中这样编写逻辑
const Example = () => {
  const someVar: number = 1;

  return (
    <div>
      {
        someVar < 0 && (
          <div>input lower than 0</div>
        )
      }
      {
        someVar >= 0 && someVar < 10 && (
          <div>input in range 0~10</div>
        )
      }
      {
        someVar >= 10 && (
          <div>input bigger than 10</div>
        )
      }
    </div>
  );
};

// 使用manager之后，看似逻辑变复杂了，但是易于大型项目维护，组件逻辑都拆分隔离开的
// JSX场景下的其他优化策略
// 1. 抽离Controller
const jsxManager = new MatchManager<number, JSX.Element>(null);

jsxManager.add(
  input => input < 0,
  () => (
    <div>input lower than 0</div>
  )
);

jsxManager.add(
  input => input >= 0 && input < 10,
  () => (
    <div>input in range 0~10</div>
  )
);

jsxManager.add(
  input => input >= 10,
  () => (
    <div>input bigger than 10</div>
  )
);

const ExampleUseManagaer = () => {
  const someVar: number = 1;

  return (
    <div>
      { jsxManager.resolve(someVar, otherDeps) }
    </div>
  );
};
```
