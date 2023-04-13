import * as d3Selection from "d3-selection";
import * as d3Zoom from "d3-zoom";
import { useEffect, useRef, useState } from "react";

export interface Transform {
  k: number;
  x: number;
  y: number;
}

export interface UseZoomOptions {
  /**
   * Set the scale extent to the specified array of numbers [k0, k1] where k0 is the minimum allowed scale factor and k1 is the maximum allowed scale factor,
   * and return this zoom behavior.
   *
   * The scale extent restricts zooming in and out. It is enforced on interaction and when using zoom.scaleBy, zoom.scaleTo and zoom.translateBy;
   * however, it is not enforced when using zoom.transform to set the transform explicitly.
   *
   * The default scale extent is [0, infinity].
   *
   * If the user tries to zoom by wheeling when already at the corresponding limit of the scale extent, the wheel events will be ignored and not initiate a zoom gesture.
   * This allows the user to scroll down past a zoomable area after zooming in, or to scroll up after zooming out.
   * If you would prefer to always prevent scrolling on wheel input regardless of the scale extent, register a wheel event listener to prevent the browser default behavior
   *
   * @param extent A scale extent array of two numbers representing the scale boundaries.
   */
  scaleExtent?: [number, number];

  /**
   * Sets the filter to the specified filter function and returns the zoom behavior.
   * The filter function is invoked in the zoom initiating event handlers of each element to which the zoom behavior was applied.
   *
   * If the filter returns falsey, the initiating event is ignored and no zoom gesture is started.
   * Thus, the filter determines which input events are ignored. The default filter ignores mousedown events on secondary buttons,
   * since those buttons are typically intended for other purposes, such as the context menu.
   *
   * @param filter A filter function which is invoked in the zoom initiating event handlers of each element to which the zoom behavior was applied,
   * in order, being passed the current event (event) and datum d, with the this context as the current DOM element.
   * The function returns a boolean value.
   */
  filter?: (event: WheelEvent | MouseEvent) => boolean;

  /**
   * Listen to the transform change event.
   */
  onTransformChange?: (transform: Transform) => void;
}

export const useZoom = <T extends Element>(options?: UseZoomOptions) => {
  const {
    scaleExtent = [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
    filter,
    onTransformChange,
  } = options ?? {};
  const ref = useRef<T>(null);
  const [transform, setTransform] = useState<Transform>({
    k: d3Zoom.zoomIdentity.k,
    x: d3Zoom.zoomIdentity.x,
    y: d3Zoom.zoomIdentity.y,
  });

  const [zoom] = useState(() =>
    d3Zoom
      .zoom<T, unknown>()
      .scaleExtent(scaleExtent)
      .filter((event: WheelEvent | MouseEvent) => {
        return filter?.(event) ?? true;
      })
      .on("zoom", (event) => {
        const newTransform: Transform = {
          k: event.transform.k,
          x: event.transform.x,
          y: event.transform.y,
        };
        setTransform(newTransform);
        onTransformChange?.(newTransform);
      }),
  );
  useEffect(() => {
    if (!ref.current) {
      console.error("The useZoom().ref is not assigned to an element.");
      return;
    }

    const selection = d3Selection.select(ref.current);
    selection.call(zoom);
  }, [zoom]);
  return {
    zoomRef: ref,
    transform,
  };
};
