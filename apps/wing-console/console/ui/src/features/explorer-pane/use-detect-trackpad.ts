import type { RefObject } from "react";
import { useState, useEffect, useRef, useCallback } from "react";

interface UseDetectTrackpadResult {
  isTrackpad?: boolean;
  isMouseWheel?: boolean;
}

export const useDetectTrackpad = (
  ref: RefObject<HTMLElement>,
): UseDetectTrackpadResult => {
  const [isTrackpad, setIsTrackpad] = useState<boolean>();
  const [isMouseWheel, setIsMouseWheel] = useState<boolean>();

  const isTrackPadRef = useRef<boolean>();
  const eventCountRef = useRef<number>(0);
  const eventCountStartRef = useRef<number>();

  const resetDetection = useCallback(() => {
    isTrackPadRef.current = undefined;
    eventCountRef.current = 0;
    eventCountStartRef.current = undefined;
  }, []);

  const detectTrackpad = useCallback(
    (event_: WheelEvent) => {
      const isTrackPadDefined = isTrackPadRef.current !== undefined;

      if (isTrackPadDefined) {
        return;
      }

      if (eventCountRef.current === 0) {
        eventCountStartRef.current = performance.now();
      }

      eventCountRef.current++;

      if (performance.now() - eventCountStartRef.current! > 66) {
        if (eventCountRef.current > 5) {
          isTrackPadRef.current = true;
          setIsTrackpad(true);
          setIsMouseWheel(false);
        } else {
          isTrackPadRef.current = false;
          setIsTrackpad(false);
          setIsMouseWheel(true);
        }
        setTimeout(resetDetection, 1000);
      }
    },
    [resetDetection],
  );

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => detectTrackpad(event);
    const element = ref.current;

    if (element) {
      element.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (element) {
        element.removeEventListener("wheel", handleWheel);
      }
    };
  }, [ref, detectTrackpad]);

  return { isTrackpad, isMouseWheel };
};
