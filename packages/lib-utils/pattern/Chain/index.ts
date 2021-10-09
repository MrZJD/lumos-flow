// 通常是通过class来实现，这里提供函数式的实现方法

// 将方法链式化
export const chainify = <S, T extends {}>(handlers: any[]) => {
  const _this = { current: undefined };

  const _target: T = handlers.reduce((prev, func) => {
    // @ts-ignore
    func._this = _this; // attch this attribute

    prev[func.name] = (...args) => {
      _this.current = func(_this.current, ...args);

      return _target;
    };

    return prev;
  }, {
    value: () => _this.current
  });

  const caller = (payload: S) => {
    _this.current = payload;

    return _target;
  };

  caller.toString = () => _this.current;

  // curry
  return caller;
};

type TPayload = number;
type THandlers = {
  add: (...args: number[]) => TPayload;
  minus: (...args: number[]) => TPayload;
  plus: (...args: number[]) => TPayload;
  divide: (...args: number[]) => TPayload;
}

function add(_this: number, ...args: number[]) {
  return args.reduce((prev, val) => prev + val, _this);
}

function minus(_this: number, ...args: number[]) {
  return args.reduce((prev, val) => prev - val, _this);
}

function plus(_this: number, ...args: number[]) {
  return args.reduce((prev, val) => prev * val, _this);
}

function divide(_this: number, ...args: number[]) {
  return args.reduce((prev, val) => {
    if (!val) {
      return prev;
    }
    return prev / val;
  }, _this);
}

export const calculator = chainify<TPayload, THandlers>([
  add,
  minus,
  plus,
  divide
]);
