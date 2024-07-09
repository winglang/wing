import { Button, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { ReactNode } from "react";
import { useEvent } from "react-use";

import { MapControls } from "./map-controls.js";

export interface Viewport {
  x: number;
  y: number;
  width: number;
  height: number;
}

type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface ZoomPaneContextValue {
  zoomIn(): void;
  zoomOut(): void;
  zoomToFit(viewport?: Viewport, skipAnimation?: boolean): void;
}

export interface Transform {
  x: number;
  y: number;
  z: number;
}

export const IDENTITY_TRANSFORM: Transform = { x: 0, y: 0, z: 1 };

/**
 * Convert a point from global coordinates to local coordinates.
 */
const toLocal = (x: number, y: number, transform: Transform) => {
  return {
    x: transform.x + x / transform.z,
    y: transform.y + y / transform.z,
  };
};

/**
 * Whether the bounding boxes overlap.
 */
const boundingBoxOverlap = (a: BoundingBox, b: BoundingBox) => {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
};
const MIN_ZOOM_LEVEL = 0.125;
const MAX_ZOOM_LEVEL = 1.5;
const ZOOM_SENSITIVITY = 1.35;
const MOVE_SENSITIVITY = 1.5;
const WHEEL_SENSITIVITY = 0.01;

export interface ZoomPaneProviderProps {
  children: ReactNode | ((value: ZoomPaneContextValue) => ReactNode);
}

export interface ZoomPaneProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  boundingBox?: { width: number; height: number };
}

export interface ZoomPaneRef {
  zoomToFit(viewport?: Viewport): void;
}

const context = createContext({
  viewTransform: IDENTITY_TRANSFORM,
});

export const useZoomPane = () => {
  return useContext(context);
};

const boundaryPadding = 64 + 24;

export const ZoomPane = forwardRef<ZoomPaneRef, ZoomPaneProps>((props, ref) => {
  const { boundingBox, children, className, onClick, ...divProps } = props;

  const [viewTransform, setViewTransform] = useState(IDENTITY_TRANSFORM);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = targetRef.current;
    if (!target) {
      throw new Error("target is undefined");
    }
    target.style.transform = `translate(${
      -viewTransform.x * viewTransform.z
    }px, ${-viewTransform.y * viewTransform.z}px) scale(${viewTransform.z})`;
  }, [viewTransform]);

  const restrict = useCallback(
    (transform: Transform) => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const boundingBoxWidth = boundingBox?.width ?? 0;
      const x = Math.min(
        Math.max(transform.x, -containerWidth / transform.z + boundaryPadding),
        boundingBoxWidth - boundaryPadding,
      );

      const containerHeight = containerRef.current?.clientHeight ?? 0;
      const boundingBoxHeight = boundingBox?.height ?? 0;
      const y = Math.min(
        Math.max(
          transform.y,
          -(containerHeight - boundaryPadding * transform.z) / transform.z,
        ),
        boundingBoxHeight - boundaryPadding,
      );
      return {
        x,
        y,
        z: transform.z,
      };
    },
    [boundingBox?.height, boundingBox?.width],
  );

  const onWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      const boundingRect = (
        event.currentTarget as HTMLDivElement
      ).getBoundingClientRect();
      setViewTransform((viewTransform) => {
        if (event.ctrlKey) {
          const localCursor = toLocal(
            event.x - boundingRect.left,
            event.y - boundingRect.top,
            viewTransform,
          );
          const dx = localCursor.x - viewTransform.x;
          const dy = localCursor.y - viewTransform.y;

          const z = Math.min(
            MAX_ZOOM_LEVEL,
            Math.max(
              MIN_ZOOM_LEVEL,
              viewTransform.z * Math.exp(-event.deltaY * WHEEL_SENSITIVITY),
            ),
          );
          const dz = z / viewTransform.z;

          return restrict({
            x: viewTransform.x + dx - dx / dz,
            y: viewTransform.y + dy - dy / dz,
            z: z,
          });
        } else {
          return restrict({
            x:
              viewTransform.x +
              (event.deltaX * MOVE_SENSITIVITY) / viewTransform.z,
            y:
              viewTransform.y +
              (event.deltaY * MOVE_SENSITIVITY) / viewTransform.z,
            z: viewTransform.z,
          });
        }
      });
    },
    [restrict],
  );
  useEvent("wheel", onWheel as (event: Event) => void, containerRef.current, {
    // Use passive: false to prevent the default behavior of scrolling the page.
    passive: false,
  });

  const [isDragging, setDragging] = useState(false);

  // Use ref to keep track of whether the user was dragging,
  // and stop emitting `onClick` events if the user was dragging.
  const wasDragging = useRef(false);

  // Keep track of whether the space key is pressed so we can show the user the grab cursor.
  // The map is draggable using click only when space is pressed.
  const [isSpacePressed, setSpacePressed] = useState(false);
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      // Pressing option+cmd+i on Mac (which is used to open the devtools) fires a keydown event with key " " on Chrome.
      if (event.altKey) {
        return;
      }

      if (event.key === " ") {
        setSpacePressed(event.type === "keydown");
      }
    };
    window.addEventListener("keydown", listener);
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keydown", listener);
      window.removeEventListener("keyup", listener);
    };
  }, []);

  const dragStart = useRef({ x: 0, y: 0 });
  useEvent(
    "mousedown",
    useCallback(
      (event: MouseEvent) => {
        if (!isSpacePressed) {
          return;
        }

        setDragging(true);
        dragStart.current = { x: event.x, y: event.y };
        wasDragging.current = false;
      },
      [isSpacePressed],
    ) as (event: Event) => void,
    containerRef.current,
  );

  useEvent(
    "mousemove",
    useCallback(
      (event: MouseEvent) => {
        if (!isSpacePressed) {
          return;
        }

        wasDragging.current = true;

        if (!isDragging) {
          return;
        }

        const diff = {
          x: dragStart.current.x - event.x,
          y: dragStart.current.y - event.y,
        };
        dragStart.current = { x: event.x, y: event.y };

        setViewTransform((viewTransform) => {
          return restrict({
            x: viewTransform.x + diff.x / viewTransform.z,
            y: viewTransform.y + diff.y / viewTransform.z,
            z: viewTransform.z,
          });
        });
      },
      [isSpacePressed, isDragging, restrict],
    ) as (event: Event) => void,
  );

  useEvent(
    "mouseup",
    useCallback(() => {
      setDragging(false);
    }, []),
  );

  useEvent(
    "click",
    useCallback(
      (event: any): void => {
        if (isSpacePressed) {
          return;
        }
        onClick?.(event);
        wasDragging.current = false;
      },
      [isSpacePressed, onClick],
    ),
    containerRef.current,
  );

  const zoomIn = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const boundingRect = container.getBoundingClientRect();
    setViewTransform((viewTransform) => {
      const localCursor = toLocal(
        boundingRect.width / 2,
        boundingRect.height / 2,
        viewTransform,
      );
      const dx = localCursor.x - viewTransform.x;
      const dy = localCursor.y - viewTransform.y;

      const z = Math.min(
        MAX_ZOOM_LEVEL,
        Math.max(MIN_ZOOM_LEVEL, viewTransform.z * ZOOM_SENSITIVITY),
      );
      const dz = z / viewTransform.z;
      return restrict({
        x: viewTransform.x + dx - dx / dz,
        y: viewTransform.y + dy - dy / dz,
        z: z,
      });
    });
  }, [restrict]);

  const zoomOut = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const boundingRect = container.getBoundingClientRect();
    setViewTransform((viewTransform) => {
      const localCursor = toLocal(
        boundingRect.width / 2,
        boundingRect.height / 2,
        viewTransform,
      );
      const dx = localCursor.x - viewTransform.x;
      const dy = localCursor.y - viewTransform.y;
      const z = Math.min(
        MAX_ZOOM_LEVEL,
        Math.max(MIN_ZOOM_LEVEL, viewTransform.z / ZOOM_SENSITIVITY),
      );
      const dz = z / viewTransform.z;
      return restrict({
        x: viewTransform.x + dx - dx / dz,
        y: viewTransform.y + dy - dy / dz,
        z: z,
      });
    });
  }, [restrict]);

  const zoomToFit = useCallback(
    (viewport?: Viewport) => {
      const container = containerRef.current;
      if (!container) {
        return;
      }
      const boundingRect = container.getBoundingClientRect();
      setViewTransform(() => {
        viewport ??= {
          x: 0,
          y: 0,
          width: boundingBox?.width ?? boundingRect.width,
          height: boundingBox?.height ?? boundingRect.height,
        };

        // Scale contents to fit.
        const zx = boundingRect.width / viewport.width;
        const zy = boundingRect.height / viewport.height;
        const z = Math.min(
          MAX_ZOOM_LEVEL,
          Math.max(MIN_ZOOM_LEVEL, Math.min(zx, zy)),
        );

        // Center contents.
        const dx = (boundingRect.width - viewport.width * z) / 2 / z;
        const dy = (boundingRect.height - viewport.height * z) / 2 / z;

        return {
          x: viewport.x - dx,
          y: viewport.y - dy,
          z,
        };
      });
    },
    [boundingBox],
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        zoomToFit,
      };
    },
    [zoomToFit],
  );

  // Whether the bounding box is out of bounds of the transform view.
  const outOfBounds = useMemo(() => {
    if (!boundingBox) {
      return false;
    }

    const container = containerRef.current;
    if (!container) {
      return false;
    }
    const containerBoundingBox = container.getBoundingClientRect();

    const viewBoundingBox = {
      x: viewTransform.x,
      y: viewTransform.y,
      width: containerBoundingBox.width / viewTransform.z,
      height: containerBoundingBox.height / viewTransform.z,
    };

    // Add some extra padding to trigger the out of bounds warning sooner.
    const padding = boundaryPadding + 24;
    return !boundingBoxOverlap(viewBoundingBox, {
      x: padding,
      y: padding,
      width: boundingBox.width - padding * 2,
      height: boundingBox.height - padding * 2,
    });
  }, [viewTransform, boundingBox]);

  const { theme } = useTheme();

  return (
    <div
      ref={containerRef}
      {...divProps}
      className={classNames(className, "relative overflow-hidden")}
    >
      <div ref={targetRef} className="absolute inset-0 origin-top-left">
        <context.Provider value={{ viewTransform }}>
          <div className="relative inline-block">
            <AnimatePresence>
              {outOfBounds && (
                <motion.div
                  className={classNames(
                    "absolute inset-0 w-full h-full rounded-lg shadow-lg bg-slate-250 dark:bg-slate-500 animate-pulse",
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                />
              )}
            </AnimatePresence>
            {children}
          </div>
        </context.Provider>
      </div>

      <AnimatePresence>
        {outOfBounds && (
          <motion.div
            className="absolute inset-0 z-10 flex justify-around items-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className={classNames(
                "p-4 rounded flex flex-col justify-around gap-2",
              )}
            >
              <p className={classNames(theme.text1, "px-2 py-0.5 rounded")}>
                The map is out of bounds
              </p>
              <div className="flex justify-around pointer-events-auto">
                <Button onClick={() => zoomToFit()}>Fit map to screen</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isSpacePressed && (
        <div
          className={classNames("absolute inset-0 z-10", {
            "cursor-grab": !isDragging,
            "cursor-grabbing": isDragging,
          })}
        ></div>
      )}
      <div className="relative z-10 flex">
        <div className="absolute cursor-grab backdrop-blur right-0">
          <MapControls
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onZoomToFit={zoomToFit}
          />
        </div>
      </div>
    </div>
  );
});
