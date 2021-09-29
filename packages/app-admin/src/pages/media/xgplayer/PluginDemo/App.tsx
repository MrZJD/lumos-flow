import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const PluginApp: React.FC<{ player: any }> = ({ player }) => {
  const [playerInfo, setPlayerInfo] = useState(() => ({
    src: player.src,
    currentTime: player.currentTime,
  }));

  useEffect(() => {
    player.on('playing', () => {
      console.log('[playing]');
    })

    player.on('timeupdate', () => {
      console.log('[timeupdate]', player.currentTime);

      setPlayerInfo({
        src: player.src,
        currentTime: player.currentTime
      })
    });

    player.on('SEI_PARSED', (data: any) => {
      if (data.code === 100 && data.content) {
        try {
          let str = String.fromCharCode.apply(null, data.content);
          const start = str.indexOf('{');
          const end = str.lastIndexOf('}');
          str = str.substr(start, end - start + 1);
          const seiJson = JSON.parse(str);
          console.log('seiJson', seiJson);
        } catch (e) {
          console.error(e);
        }
      }
    })
  }, []);

  return (
    <div className={styles.pluginDemo}>
      <div>src: {playerInfo.src}</div>
      <div>currentTime: {playerInfo.currentTime}</div>
    </div>
  );
};

export default PluginApp;
