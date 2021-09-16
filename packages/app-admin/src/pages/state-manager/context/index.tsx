import RenderTimes from 'component/RenderTimes';
import React, { createContext, useState, useCallback, useContext, memo } from 'react';

function createModel<T, S>(hooks: (defaultValue?: S) => T) {
  const store = createContext<T>({} as any);

  return {
    Provider: ({ defaultValue, children }: { defaultValue?: S; children: React.ReactNode }) => {
      return (
        <store.Provider value={hooks(defaultValue)}>
          {children}
        </store.Provider>
      );
    },
    useModel: () => useContext(store),
  };
};

const store = createModel(() => {
  const [counter, setCounter] = useState(0);

  const incre = useCallback(() => {
    setCounter(c => c + 1);
  }, []);

  const decre = useCallback(() => {
    setCounter(c => c - 1);
  }, []);

  return {
    counter,
    incre,
    decre,
  }
});

const ContextDemo: React.FC = () => {
  const [self, setSelf] = useState(9999);

  return (
    <store.Provider>
      <h2>Context State</h2>
      <div>{self}</div>
      <div><button onClick={() => setSelf(s => s - 1)}>-1</button></div>
      <RenderTimes />
      <ContextChildA />
      <ContextChildB />
      <ContextStaticChild />
    </store.Provider>
  );
};

const ContextChildA = memo(() => {
  const { counter, incre } = store.useModel();

  return (
    <div>
      <h3>State组件A</h3>
      <RenderTimes />
      <p>{counter}</p>
      <button onClick={incre}>increment</button>
    </div>
  );
}, () => true);

const ContextChildB = () => {
  const { counter, decre } = store.useModel();

  return (
    <div>
      <h3>State组件B</h3>
      <RenderTimes />
      <p>{counter}</p>
      <button onClick={decre}>increment</button>
    </div>
  );
}

const ContextStaticChild = () => {
  return (
    <div>
      <h3>Pure组件</h3>
      <RenderTimes />
    </div>
  );
}

export default ContextDemo;

// * 关键问题在于
// 如果修改了context，如何按需渲染
