import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { render } from './renderer';

const Renderer = (props: { useModel: any, update?: any }): any => {
  // => call hooks
  const model = props.useModel();

  props.update?.(model);

  return null;
};

let STORE_DATA = {};

function createModel<T>(getModel: () => T) {
  window.addEventListener('storeUpdate', (evt: any) => {
    STORE_DATA = evt.detail;
  });

  const host = document.createElement('div');
  document.body.appendChild(host);

  // render(<Renderer useModel={getModel} update={(value: any) => {
  //   const ev = new CustomEvent('storeUpdate', { detail: value, bubbles: false } as any);
  //   window.dispatchEvent(ev);
  // }} />, '#host-custom-app');

  ReactDOM.render(
    <Renderer
      useModel={getModel}
      update={(value: any) => {
        const ev = new CustomEvent('storeUpdate', { detail: value, bubbles: false } as any);
        window.dispatchEvent(ev);
      }}
    />,
    host
  );

  return {
    useModel: () => {
      const [store, setStore] = useState<T>(STORE_DATA as T);

      useEffect(() => {
        const observer = (evt: any) => {
          setStore(evt.detail)
        };

        window.addEventListener('storeUpdate', observer);

        return () => window.removeEventListener('storeUpdate', observer);
      }, []);

      return store;
    }
  }
}

const useModel = () => {
  const [counter, setCounter] = useState(0);

  return {
    counter,
    setCounter
  }
}

const store = createModel(useModel);

const Reconciler: React.FC = () => {
  const { counter, setCounter } = store.useModel();

  return (
    <div>
      <h3>React Reconciler</h3>
      <div id="host-custom-app"></div>
      <div>{counter}</div>
      <button onClick={() => setCounter((s: any) => s+1)}>add one</button>
    </div>
  );
};

export default Reconciler;
