import RenderTimes from '@/component/RenderTimes';
import React, { createContext, useEffect, useRef, useState } from 'react';

const useModel = () => {
  const [counter, setCounter] = useState(0);
  const [counterB, setCounterB] = useState(0);

  return {
    counter,
    setCounter,
    counterB,
    setCounterB,
  };
};

const sampleEqual = (arr1: any[], arr2: any[]) => {
  if (!arr1 || !arr2) {
    return false;
  }
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0, len = arr1.length; i < len; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

const placeholder = {};
const INIT_DEP: any[] = [];

let STORE_DATA = placeholder;

function createModel<T>(useModelHooks: () => T) {
  // const CommonContext = createContext({});
  // const SpecContext = createContext({});

  return {
    Provider: ({ children }: { children: JSX.Element }) => {
      const state = useModelHooks();

      // console.log('update 1', state);
      // STORE_DATA = state;

      useEffect(() => {
        // console.log('state', state);
        STORE_DATA = state;
        const ev = new CustomEvent('storeUpdate', { detail: STORE_DATA, bubbles: false } as any);
        window.dispatchEvent(ev);
      });

      return children;

      // return (
      //   // <CommonContext.Provider value={{}}>
      //   //   <SpecContext.Provider value={{}}>
      //       <>{children}</>
      //   //   </SpecContext.Provider>
      //   // </CommonContext.Provider>
      // );
    },
    useModel: (getDep?: (model: T) => any[]) => {
      const [store, setStore] = useState<T>(STORE_DATA as T);

      const prevDep = useRef(INIT_DEP);

      useEffect(() => {
        // 绑定通知
        const observer = (evt: any) => {
          // console.log('lisnter', evt)
          if (prevDep.current === INIT_DEP) {
            setStore(evt.detail);
            prevDep.current = getDep ? getDep(evt.detail) : [];
            return;
          }

          if (!getDep) {
            setStore(evt.detail);
            return
          }

          // 这里就可以做依赖的比较来判断是否需要更新子组件
          if (!sampleEqual(prevDep.current, getDep(evt.detail))) {
            setStore(evt.detail);
            prevDep.current = getDep(evt.detail);
            return
          }
        };

        window.addEventListener('storeUpdate', observer);

        return () => window.removeEventListener('storeUpdate', observer);
      }, []);

      return store;
    },
  }
};

const store = createModel(useModel);

const AceStateManager: React.FC = () => {
  return (
    <store.Provider>
      <div>
        <ChildA />
        <ChildB />
      </div>
    </store.Provider>
  );
};

const ChildA: React.FC = () => {
  const { counter, setCounter } = store.useModel((m) => [m.counter]);

  return (
    <div>
      <h4>state A</h4>
      <p>{counter}</p>
      <RenderTimes />
      <button onClick={() => setCounter((c: number) => c + 1)}>incre + 1</button>
    </div>
  );
}

const ChildB: React.FC = () => {
  const { counter, counterB, setCounter, setCounterB } = store.useModel();

  return (
    <div>
      <h4>state B</h4>
      <p>{counter}</p>
      <RenderTimes />
      <button onClick={() => setCounter((c: number) => c - 1)}>decre - 1</button>
      <p>{counterB}</p>
      <button onClick={() => setCounterB((c: number) => c + 1)}>B: incre + 1</button>
    </div>
  );
}

export default AceStateManager;
