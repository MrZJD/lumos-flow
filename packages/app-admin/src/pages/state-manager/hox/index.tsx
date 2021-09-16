import RenderTimes from '@/component/RenderTimes';
import React, { useState, memo } from 'react';
import useModel from './store';

const HoxDemo: React.FC = () => {
  const [self, setSelf] = useState(9999);

  return (
    <div>
      <h2>Hox State</h2>
      <div>{self}</div>
      <div><button onClick={() => setSelf(s => s - 1)}>-1</button></div>
      <RenderTimes />
      <HoxChildA />
      <HoxChildB />
      <HoxStaticChild />
    </div>
  );
};

const HoxChildA: React.FC = memo(() => {
  const { count, increment } = useModel(m => [m.count]);

  return (
    <div>
      <h3>State组件A</h3>
      <p>{count}</p>
      <RenderTimes />
      <button onClick={increment}>increment</button>
    </div>
  );
});

const HoxChildB: React.FC = () => {
  const { count, decrement } = useModel(m => [m.count]);

  return (
    <div>
      <h3>State组件B</h3>
      <p>{count}</p>
      <RenderTimes />
      <button onClick={decrement}>decrement</button>
    </div>
  );
}

const HoxStaticChild: React.FC = () => {
  return (
    <div>
      <h3>Pure组件</h3>
      <RenderTimes />
    </div>
  );
}

export default HoxDemo;
