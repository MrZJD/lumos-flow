import { useState, useEffect, useCallback } from 'react';

export const useRequest = <T, P extends unknown[]>(
  fn: (...params: P) => Promise<T>,
  config?: {
    auto?: boolean;
    defaultValue?: P;
    depKey?: any[];
  }
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const handler = useCallback(
    async (...args: P) => {
      setLoading(true);
      try {
        const data = await fn(...args);

        setData(data);

        return data;
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    config.auto && handler(...config.defaultValue);
  }, config.depKey || []);

  return {
    data,
    error,
    loading,
    run: handler,
  };
}

export default useRequest;
