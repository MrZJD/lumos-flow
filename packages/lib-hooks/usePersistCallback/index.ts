import { useRef, useCallback } from 'react';

export const usePersistCallback = <T extends Function>(callback?: T) => {
  const ref = useRef(callback);

  ref.current = callback;

  // @ts-ignore
  return useCallback<T>(
    (...args) => {
      return ref.current?.(...args);
    },
    [ref],
  );
};

export default usePersistCallback;
