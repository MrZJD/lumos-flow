# TypeScript类型体操

> 泛指编写类型的方式

## TypeScript

* [Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### 基础类型

```ts
var a: string;
var b: number;
var c: boolean;
var d: string[]; // T[] // Array<T>
var e: { [x: string]: string };

interface F {
    name: string;
    readonly age: number;
    addr?: string;
}

type Turple = [string, number];

var func: (name: string) => void; // function

var cls: (new (name: string) => Cls); // class

// other types
// void     // var func: () => return; // return type is void
// object   // 除基础类型外的任何类型都可以指定为object
// unknown  // = any // unknown无法做任何操作
// never    // 表示永远不会有值 // 如程序抛出异常或者类型语句走到了不存在的分支
```

### Operator

```ts
// 类型间的组合
type AorB = A | B;
type AandB = A & B; // merge
interface Child extends Parent {}

// 利用类型推断
// typeof
var a = 1;
type TypeA = typeof a;

// keyof
var a = {
    name: 'xxx',
    age: 20
};
type KeyA = keyof a;

// indexed access
type FieldNameOfA = (typeof a)['name'];

// template literal
type Event = 'Click' | 'MouseEnter' | 'Scroll';
type ListenEvent = `on${Event}`;

// 逻辑处理
interface Animal { }
interface Plant { }
interface Tree extends Plant {  }

type E1 = Tree extends Plant ? number : string;
```


### 值与类型

```ts
// 使用TS时，要明确自己操作的是值还是类型，无法在类型推断中使用值 / 或者将类型赋给变量
type A1 = number;
type A2 = 1;

const a: A1 = 1; // ok
const b: A1 = 2; // ok
const c: A2 = 2; // error // A2 type is 2
```

### 泛型

> 实际应用出现需要根据不同的类型来返回特定类型的情况；也是TypeScript类型运算的基础范式。

#### 应用

```ts
// 编写下面这个方法的类型定义
mapBy([
    { name: 'zjd', age: 18, id: '0001' },
    { name: 'x1', age: 1, id: '002' },
    { name: 'y1', age: 2, id: '003' },
    { name: 'z1', age: 3, id: '004' },
], 'id');

mapBy([
    { cityId: 'c1', cityName: '北京' },
    { cityId: 'c2', cityName: '上海' },
    { cityId: 'c3', cityName: '深圳' },
], 'cityId');

type MapByFn = function<T extends Record<string, any>>(list: T[], ind: keyof T): Record<string, T>>
```

#### 类型运算

```ts
type MapByData<T> = Records<string, T>; // 理解一下运算的含义

function isEmpty(data: number | string) {
  if (!data) {
    return true;
  } else {
    return false;
  }
}

const result = isEmpty(0); // boolean
const result2 = isEmpty(1); // boolean
const result3 = isEmpty(""); // boolean
const result4 = isEmpty("123"); // boolean

// 有这样一种类型
type IsEmpty<T extends number | string> = T extends 0 ? true : T extends '' ? true : false;

type IsEmptyA = IsEmpty<0>; // true
type IsEmptyB = IsEmpty<1>; // false
type IsEmptyC = IsEmpty<'123'>; // false
type IsEmptyD = IsEmpty<''>; // true

function isEmpty<T extends number | string>(data: T): IsEmpty<T> {
  if (!data) {
    return true as any;
  } else {
    return false as any;
  }
}

const result = isEmpty(0);
const result2 = isEmpty(1);
const result3 = isEmpty("");
const result4 = isEmpty("123");
```

#### 内置泛型

* [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)


### 类型推断

```ts
// TS会自动根据情况为我们推断类型
// 如下：关于value的推断
var a = 1; // number
var getValue = () => 'xxxx'; // () => string;
var b = getValue(); // string

// 利用infer推断类型
type ArrA = string[];
type TypeItemOfArr<T extends any[]> = T extends Array<infer Item> ? Item : never;
type TypeItem = TypeItemOfArr<ArrA>;
```

# PlayGround

## 示例一：获取async函数的返回值

```ts
interface Res {
  status: number;
  message: string;
  data: {
    list: string[];
    total: number;
  }
}

type GetDataFn = () => Promise<Res>;

type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never;

type PromiseResult<T> = T extends Promise<infer R> ? R : T;

type A = PromiseResult<MyReturnType<GetDataFn>>;
```

* [TS-Playground-Awaited](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgEoQM7IN4ChnIZhxgCuGAXMiKQLYBG0A3PsrZhnAOYRVFSguLAgBMScKngIEANsCJ8wAkFwDaAXWHSwAe2IyqNBs1YBfXOdxgAngAcUAcQhgAIuIBiIZAF5kACgBKHwA+ZAAFKB1aeQgAHnQMYJYrOxQAWWt0MigQABVU2NzkCAAPSBARLD8AOlq4KC5KZDgQaw0g71CW61DfItLyyv9a6vrGqm72kORQGGg0ZAB+BcMIADcTFPtwyOiMCATSGTBC3uR+sogKrAiomNjZ+dRQ5dRkKlzkm22AQR8du77Q7HWIZLKkHL5eyxJyuDwgYJJXBAA)

## 示例二：递增器

```ts
const addOneOld = (n: number) => n + 1;
const r1 = addOneOld(1);

// 使用数组length来做数值计算
type MyArray<L extends number, Arr extends any[] = []> = Arr['length'] extends L ? Arr : MyArray<L, [...Arr, number]>;
// -1
type SubtractOne<N extends number> = MyArray<N> extends [...arr: MyArray<1>, ...rest: infer Rest] ? Rest['length'] : never;
// +1
type PlusOne<N extends number> = [...MyArray<N>, ...MyArray<1>]['length'];

type A = SubtractOne<2>;
type B = PlusOne<A>;

const addOne = <T extends number>(n: T) => n + 1 as PlusOne<typeof n>;
const r2 = addOne(3);
```

* [TS-Playground-数值计算](https://www.typescriptlang.org/play?#code/MYewdgzgLgBAhgEwQeTAU2QGwTAvDACjAC4YwBXAWwCM0AnASjwD4yYBqGARgG4AoUJFh0ueeElQZsBLg358A9ApiB-eUAUroAdTQCN+mNGADmUABaBTc0BaChsA8CoELowOnefKAE8ADmhgBZRwEE6dOI4AeABkYNAAPKD0ECDIqWjoAGhgfOlCIqJi4MEcAbQBdMXzWfBScgHJdA2MygvDIsGiYEIB+ZN8YUk8U-2CknIA6QZSkihp6POZ+JRgAWi4HFzcAZXJqKD9gKEkAgDk0+sbR+OKPb18endY6jJgBwbhfTrO-QK5mJMH+ujRoUgBLMAAM3oMAASj8oAVWuDoOVKoYjDUOmQ0AA3ehTZTseZOVwwAAKmHIEG2e2uDRiR3oJzu-S650Clw+g3pLwCbzycL0CJq8lxbi8YhWaw2W3QAQATJMFniAEJiQnE7ZeaUCcDQcQodBiAIAFX2NypdGYRFIuqYuFYYA43HgMUVJPF-JAgLI0sEGroErEiC1aAIAGY5HwgA)


## 示例三：JSON key - camelcase-keys

```ts
interface Man {
  name: string;
  male: string;
  age: number;
  addrIp: string;
  location: {
    provinceId: number;
    cityId: number;
    countyId: number;
  }
};

type PascalCase<T extends Record<string, any>> = { [K in keyof T as K extends string ? Capitalize<K> : K]: T[K] extends Record<string, any> ? PascalCase<T[K]> : T[K] };

type PMan = PascalCase<Man>;

type PManLocation = PMan['Location'];
```

* [TS-Playground-Pascalcase](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgLJxMg3gKGckOAWwgC5kBnMKUAcwG49ki4AbMy6ux-OWjkAFciAI2g9kcACZSoASQAO5KjRAMmrAPYI4YYJpDlc+fAqiaAbqCRyp5IaPFN8CYGACet+8LFQJLzUFwTzsCHyd8AF8cSMYcDwUUAAU4Ch1WAGFUiAAeABVkCAAPSBApCmQAJQgETSgpHJU6ABpJEHcAPg7kAF5sZABtAGlkUGQAawh3TRhkAtTkEeLS8s5VWmQAfmQshTc2YAAvXKHu8iGAXXI84YvCkogyiura+sauNVaMTq3kFLS2FkKLkbpcznNbshYjh4u5En90Jg+v90kDcoiOnEEslEQAZbS6fRIhEYAYAcnxOj0BjJF0YQA)
