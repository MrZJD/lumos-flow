import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';

const html = (dom: any, appendText: string) => {
  if (!dom) {
    return;
  }
  dom.innerHTML += appendText;
}

const sleep = (ms = 1e9) => {
  let val = 0
  for (let i = ms; i > 0; i--) {
    val += 1;
  }
  return val;
}

interface IProps {}

const EffectDemo: React.FC<IProps> = () => {
  const [state, setState] = useState(1);
  const [effectVal, setEffectVal] = useState(String(state));
  const [layoutEffectVal, setLayoutEffectVal] = useState(String(state));

  const addOne = useCallback(() => {
    setState(s => s + 1);
  }, []);

  useEffect(() => {
    // effect执行函数的时机是在dom加载之后哦
    // ** 执行时异步不阻塞paint
    console.log(`[Effect]`, document.querySelector('#text')?.innerHTML);
    sleep(); // 这里会闪一下再出现变化（先渲染state变化，再执行下面的操作）
    html(document.querySelector('#effect'), ' sync change');
  }, [state]);

  useLayoutEffect(() => {
    // effect执行函数的时机是在dom加载之后哦
    // * 执行时同步阻塞paint => 用来paint再次修改dom
    console.log(`[Layout Effect]`, document.querySelector('#text')?.innerHTML);
    sleep(1e8); // 这里会阻塞state的变化
    html(document.querySelector('#layout-effect'), ' sync change');
  }, [state]);

  return (
    <div id="home">
      Home Page
      <p id="text">{state}</p>
      <p id="effect" style={{ color: 'green' }}>{effectVal}</p>
      <p id="layout-effect" style={{ color: 'blue' }}>{layoutEffectVal}</p>
      <button onClick={addOne}>add 1</button>
    </div>
  );
};

export default EffectDemo;
