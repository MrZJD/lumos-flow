import { useEffect } from "react";

export const usePlayerListener = (player: any, evtName: string | string[], handler: any) => {
  useEffect(() => {
    if (!player) {
      return;
    }

    const evts = Array.isArray(evtName) ? evtName : [evtName];

    evts.forEach((item) => {
      player.on(item, handler);
    });

    return () => evts.forEach(item => player.off(evtName, handler));
  }, [player]);
};

export default usePlayerListener;
