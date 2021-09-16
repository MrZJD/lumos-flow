import { useState, useEffect, useCallback } from 'react';

const isNil = (value?: any): boolean => value === undefined || value === null;

export const useControlled = <T>(value?: T, onChange?: (val: T) => void, defaultValue?: T): [T, (val: T) => any] => {
  const [state, setState] = useState(defaultValue);

  const result = isNil(value) ? state : value;
  const resultChange = onChange || setState;

  return [
    result as T,
    resultChange
  ]
}

export default useControlled;
