import { useCallback, useState, useRef, useEffect } from "react";

export interface UseLoadingProps {
  delay?: number;
  duration?: number;
}

/**
 * Loading hook with delay and duration
 */
export const useLoading = ({ delay = 0, duration = 0 }: UseLoadingProps) => {
  const [loading, setLoading] = useState(false);

  const [loadingTime, setLoadingTime] = useState(0);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  const setDelayedLoading = useCallback(
    (value: boolean) => {
      clearTimeout(timeoutIdRef.current);
      if (value) {
        timeoutIdRef.current = setTimeout(() => {
          setLoading(true);
          setLoadingTime(Date.now());
        }, delay);
      } else {
        const time = Date.now() - loadingTime;
        timeoutIdRef.current = setTimeout(() => {
          setLoading(false);
        }, Math.max(0, duration - time));
      }
    },
    [delay, duration, loadingTime],
  );

  useEffect(() => {
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, []);

  return {
    loading,
    setLoading: setDelayedLoading,
  };
};
