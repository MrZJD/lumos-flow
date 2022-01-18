import usePlayerListener from "./usePlayerListener";

// 使用player工具集
const usePlayerUtils = (player: any) => {
  return {
    useListener: (evtName: string | string[], handler: any) => usePlayerListener(player, evtName, handler),
  };
};

export default usePlayerUtils;
