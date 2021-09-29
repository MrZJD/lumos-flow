import React, { useState, useEffect } from 'react';
import Player from 'xgplayer';
import FPSInfo from './FPSInfo';
// import 'xgplayer-mp4';
// import pluginDemo from './PluginDemo/boostrap';

// Player.install('pluginDemo', pluginDemo);

const XGPlayer: React.FC = () => {
  const [player, setPlayer] = useState<any>();

  useEffect(() => {
    const player = new Player({
      id: 'xg-demo1',
      autoplay: true,
      // volume: 0.3,
      // url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
      // poster: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
      // playsinline: true,
      // thumbnail: {
      //   pic_num: 44,
      //   width: 160,
      //   height: 90,
      //   col: 10,
      //   row: 10,
      //   urls: ['//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo-thumbnail.jpg'],
      // },
      // danmu: {
      //   comments: [
      //     {
      //       duration: 15000,
      //       id: '1',
      //       start: 3000,
      //       txt: '长弹幕长弹幕长弹幕长弹幕长弹幕',
      //       // 弹幕自定义样式
      //       style: {
      //         color: '#ff9500',
      //         fontSize: '20px',
      //         border: 'solid 1px #ff9500',
      //         borderRadius: '50px',
      //         padding: '5px 11px',
      //         backgroundColor: 'rgba(255, 255, 255, 0.1)'
      //       }
      //     }
      //   ],
      //   area: {
      //     start: 0,
      //     end: 1
      //   }
      // },
      // // height: 340,
      // // width: 340,
      // whitelist: ['']
    });

    setPlayer(player);

    return () => player.destroy();
  }, []);

  return (
    <div>
      <h1>多媒体 - Media - xgplayer</h1>

      <div id="xg-demo1"></div>

      <FPSInfo player={player} />
    </div>
  );
};

export default XGPlayer;
