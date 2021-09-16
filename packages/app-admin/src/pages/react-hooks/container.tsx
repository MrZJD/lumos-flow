import RenderTimes from '@/component/RenderTimes';
import React, { useEffect, useState, Children, cloneElement } from 'react';

export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('effect', counter);
  });

  return (
    <>
      <div>{counter}</div>
      <button onClick={() => setCounter(c => c + 1)}>add + 1</button>
      <RenderTimes />
      {/* counter更新时children并不会渲染 */}
      {children}
      {/* counter更新这里会更新变化 */}
      {
        Children.map(children, (child) => {
          return cloneElement(child as any);
        })
      }
    </>
  );
}

const ChildA: React.FC = () => {
  return (
    <div>
      子组件
      <RenderTimes />
    </div>
  )
};

const ContainerDemo: React.FC = () => {
  return (
    <Container>
      <ChildA />
    </Container>
  )
}

export default ContainerDemo;