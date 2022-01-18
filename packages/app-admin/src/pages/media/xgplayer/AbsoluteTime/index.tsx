import usePersistCallback from 'lib-hooks/usePersistCallback';
import React, { useState } from 'react';
import usePlayerUtils from '../utils';
import usePlayerListener from '../utils/usePlayerListener';

// 进度条展示绝对时间
const AbsoluteTimeProgress: React.FC<{ player: any }> = ({ player }) => {
  const [cache, setCache] = useState(0);
  const [progress, setProgress] = useState(0);
  const [canPlayed, setCanPlayed] = useState(false);

  const { useListener } = usePlayerUtils(player);

  const onCacheUpdate = usePersistCallback(() => {
    let { buffered } = player;
    if (buffered && buffered.length > 0) {
      let end = buffered.end(buffered.length - 1);
      for (let i = 0, len = buffered.length; i < len; i++) {
        if (player.currentTime >= buffered.start(i) && player.currentTime <= buffered.end(i)) {
          end = buffered.end(i);
          for (let j = i + 1; j < buffered.length; j++) {
            if (buffered.start(j) - buffered.end(j - 1) >= 2) {
              end = buffered.end(j - 1);
              break;
            }
          }
          break;
        }
      }
      // cache.style.width = `${(end / player.duration) * 100}%`;
    }
  });

  useListener(['bufferedChange', 'cacheupdate', 'ended', 'timeupdate'], onCacheUpdate);

  useListener('srcChange', () => { setProgress(0); });

  useListener('currentTimeChange', () => { setProgress(player.currentTime * 100) });

  useListener('canplay', () => {
    setCanPlayed(true);
  });

  // function parseSEI(data) {
  //   if (data.code === 100 && data.content) {
  //     try {
  //       let str = String.fromCharCode.apply(null, data.content);
  //       const start = str.indexOf('{');
  //       const end = str.lastIndexOf('}');
  //       str = str.substr(start, end - start + 1);
  //       const seiJson = JSON.parse(str);
  //       if (seiJson.ts) {
  //         !absoluteStartTime && (absoluteStartTime = seiJson.ts);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // }

  // player.on('SEI_PARSED', parseSEI); // xgplayer-hls.js不触发这个

  // let onTimeupdate = function () {
  //   if (player.maxPlayedTime === undefined) {
  //     player.maxPlayedTime = 0;
  //   }
  //   if (player.maxPlayedTime < player.currentTime) {
  //     player.maxPlayedTime = player.currentTime;
  //   }
  //   if (!containerWidth && container) {
  //     containerWidth = container.getBoundingClientRect().width;
  //   }
  //   if (player.videoConfig.mediaType !== 'audio' || !player.isProgressMoving || !player.dash) {
  //     const precent = player.currentTime / player.duration;
  //     const prevPrecent = Number(progress.style.width.replace('%', '') || '0') / Number(container.style.width || '100');
  //     if (Math.abs(precent - prevPrecent) <= 1) {
  //       progress.style.width = `${(player.currentTime * 100) / player.duration}%`;
  //     }
  //   }
  // };
  // player.on('timeupdate', onTimeupdate);


  // function dotEvent(dotItem, text) {
  //   dotItem.addEventListener('mouseenter', function (e) {
  //     if (text) {
  //       util.addClass(dotItem, 'xgplayer-progress-dot-show');
  //       util.addClass(container, 'xgplayer-progress-dot-active');
  //     }
  //   });
  //   dotItem.addEventListener('mouseleave', function (e) {
  //     if (text) {
  //       util.removeClass(dotItem, 'xgplayer-progress-dot-show');
  //       util.removeClass(container, 'xgplayer-progress-dot-active');
  //     }
  //   });
  //   dotItem.addEventListener('touchend', function (e) {
  //     // e.preventDefault()
  //     e.stopPropagation();
  //     if (text) {
  //       if (!util.hasClass(dotItem, 'xgplayer-progress-dot-show')) {
  //         Object.keys(player.dotArr).forEach(function (key) {
  //           if (player.dotArr[key]) {
  //             util.removeClass(player.dotArr[key], 'xgplayer-progress-dot-show');
  //           }
  //         });
  //       }
  //       util.toggleClass(dotItem, 'xgplayer-progress-dot-show');
  //       util.toggleClass(container, 'xgplayer-progress-dot-active');
  //     }
  //   });
  // }
  // function onCanplay() {
  //   if (player.config.progressDot && util.typeOf(player.config.progressDot) === 'Array') {
  //     player.config.progressDot.forEach(item => {
  //       if (item.time >= 0 && item.time <= player.duration) {
  //         let dot = util.createDom(
  //           'xg-progress-dot',
  //           item.text ? `<span class="xgplayer-progress-tip">${item.text}</span>` : '',
  //           {},
  //           'xgplayer-progress-dot'
  //         );
  //         dot.style.left = `${(item.time / player.duration) * 100}%`;
  //         if (item.duration >= 0) {
  //           dot.style.width = `${(Math.min(item.duration, player.duration - item.time) / player.duration) * 100}%`;
  //         }
  //         outer.appendChild(dot);
  //         player.dotArr[item.time] = dot;
  //         dotEvent(dot, item.text);
  //       }
  //     });
  //   }
  // }

  // player.removeProgressDot = function (time) {
  //   if (time >= 0 && time <= player.duration && player.dotArr[time]) {
  //     let dot = player.dotArr[time];
  //     dot.parentNode.removeChild(dot);
  //     dot = null;
  //     player.dotArr[time] = null;
  //   }
  // };
  // player.removeAllProgressDot = function () {
  //   Object.keys(player.dotArr).forEach(function (key) {
  //     if (player.dotArr[key]) {
  //       let dot = player.dotArr[key];
  //       dot.parentNode.removeChild(dot);
  //       dot = null;
  //       player.dotArr[key] = null;
  //     }
  //   });
  // };

  return (
    <div>
      <div></div>
    </div>
  );
};

export default AbsoluteTimeProgress;
