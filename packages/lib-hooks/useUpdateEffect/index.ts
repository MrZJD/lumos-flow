import { useRef, useEffect } from 'react';

export const useUpdateEffect = (effect, deps) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted) {
      mounted.current = true;
      return;
    }
    
    return effect();
  }, deps);
};

export default useUpdateEffect;
