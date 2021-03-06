import React from 'react';
import Tab, { Item } from '@/component/Tab';
import ContextDemo from './context';
import HoxDemo from './hox';
import AceStateDemo from './ace-state';
import ReduxApp from './redux';

const StatePage: React.FC = () => {
  return (
    <div>
      状态管理说明

      <p>基于hooks的管理方案</p>

      <AceStateDemo />

      <p>基于Redux的管理方案</p>

      <ReduxApp />

      {/* <Tab defaultKey="context">
        <Item tabKey="hox" title="Hox Demo">
          <HoxDemo />
        </Item>
        <Item tabKey="context" title="Context Demo">
          <ContextDemo />
        </Item>
      </Tab> */}
    </div>
  );
}

export default StatePage;
