import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

/**
 * A hook that observes the resize of an element.
 */
export const useResizeObserver = (
  callback: ResizeObserverCallback,
  ref: RefObject<Element | null>,
) => {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const [observer] = useState(
    () =>
      new ResizeObserver((entries, observer) => {
        callbackRef.current(entries, observer);
      }),
  );

  useEffect(() => {
    const current = ref.current;
    if (!current) {
      return;
    }

    observer.observe(current);

    return () => {
      observer.unobserve(current);
    };
  }, [observer, ref]);
};
