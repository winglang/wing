import { useRef, useCallback, useEffect } from "react";

/**
 * A hook that returns a throttled version of the provided callback that uses
 * `requestAnimationFrame` to throttle the callback.
 */
export const useRafThrottle = <ArgumentsType extends any[]>(
  callback: (...arguments_: ArgumentsType) => void,
): ((...arguments_: ArgumentsType) => void) => {
  const requestRef = useRef<number | undefined>(undefined);
  const callbackRef = useRef(callback);

  // Update the callback reference whenever it changes.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const throttledCallback = useCallback<(...arguments_: ArgumentsType) => void>(
    (...arguments_) => {
      if (!requestRef.current) {
        requestRef.current = requestAnimationFrame(() => {
          callbackRef.current(...arguments_);
          requestRef.current = undefined;
        });
      }
    },
    [],
  );

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return throttledCallback;
};
