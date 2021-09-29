import React from 'react';
import ReactDOM from 'react-dom';
import PluginApp from './App';

const pluginDemo = function() {
  // @ts-ignore
  const player = this; // 拿到player实例

  const container = document.createElement('div');
  container.id = 'plugin-demo';

  player.on('ready', () => {
    player.root.appendChild(container);

    ReactDOM.render((
      <PluginApp player={player} />
    ), container);
  });

  player.on('destory', () => {
    ReactDOM.unmountComponentAtNode(container)
  });
};

export default pluginDemo;
