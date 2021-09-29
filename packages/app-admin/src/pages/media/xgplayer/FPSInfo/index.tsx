import React, { useCallback, useEffect, useRef, useState } from 'react';
import usePersistCallback from 'lib-hooks/usePersistCallback';

interface IProps {
  player: any; // xgplayer instance
}

const usePlayerListener = (player: any, evtName: string, handler: any) => {
  useEffect(() => {
    if (!player) {
      return;
    }

    player.on(evtName, handler);

    return () => player.off(evtName, handler);
  }, [player]);
}

const useListener = (dom: HTMLElement, evtName: string, handler: any) => {
  useEffect(() => {
    if (!dom) {
      return;
    }

    dom.addEventListener(evtName, handler);

    return () => dom.addEventListener(evtName, handler);
  }, [dom]);
}

const FPSInfo: React.FC<IProps> = ({ player }) => {
  const frameCount = useRef(0);
  const currTime = useRef(0);

  const [fps, setFps] = useState('0');

  const timeUpdate = useCallback((evt) => {
    const spendTime = evt.currentTime - currTime.current;

    setFps(!spendTime ? '0' : String((frameCount.current / spendTime) >> 0));

    currTime.current = evt.currentTime;
    frameCount.current = 0;
  }, []);

  const handleVideoFrame = usePersistCallback((now: number) => {
    frameCount.current++;
    player.video.requestVideoFrameCallback(handleVideoFrame);
  });

  usePlayerListener(player, 'timeupdate', timeUpdate);
  // useListener(player?.root, 'requestVideoFrameCallback', handleVideoFrame);

  useEffect(() => {
    if (!player?.video?.requestVideoFrameCallback) {
      return;
    }

    player.video.requestVideoFrameCallback(handleVideoFrame);
  }, [player]);

  if (!player) {
    return null;
  }

  return (
    <div>
      FPS: {fps}
    </div>
  );
};

export default FPSInfo;
