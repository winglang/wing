import { useCallback, useEffect, useRef } from "react";

export const useEventListener = <K extends keyof WindowEventMap>(
  type: K,
  listener: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions,
) => {
  const listenerRef = useRef(listener);
  const listenerWrapper: typeof listener = useCallback(
    (event) => listenerRef.current(event),
    [],
  );

  useEffect(() => {
    const target = element ?? window;
    target.addEventListener(type, listenerWrapper, options);
    return () => {
      target.removeEventListener(type, listenerWrapper, options);
    };
  }, [type, listenerWrapper, element, options]);
};
