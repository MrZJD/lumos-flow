import React, { useEffect, useRef } from 'react';

const RenderTimes = () => {
  const countTimes = useRef(0);

  useEffect(() => {
    countTimes.current += 1;
  });

  return (
    <div>组件渲染次数：{countTimes.current}</div>
  );
};

export default RenderTimes;
