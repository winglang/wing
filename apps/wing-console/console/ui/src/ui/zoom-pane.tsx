import { Button, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { ReactNode } from "react";
import { useEvent } from "react-use";

import { MapControls } from "./map-controls.js";

export interface Viewport {
  x: number;
  y: number;
  width: number;
  height: number;
}

type BoundingBox = Viewport;

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

export const ZoomPane = forwardRef<ZoomPaneRef, ZoomPaneProps>((props, ref) => {
  const { boundingBox, children, className, ...divProps } = props;

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

  const onWheel = useCallback((event: WheelEvent) => {
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

        return {
          x: viewTransform.x + dx - dx / dz,
          y: viewTransform.y + dy - dy / dz,
          z: z,
        };
      } else {
        return {
          x:
            viewTransform.x +
            (event.deltaX * MOVE_SENSITIVITY) / viewTransform.z,
          y:
            viewTransform.y +
            (event.deltaY * MOVE_SENSITIVITY) / viewTransform.z,
          z: viewTransform.z,
        };
      }
    });
  }, []);
  useEvent("wheel", onWheel as (event: Event) => void, containerRef.current);

  const [isDragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  useEvent(
    "mousedown",
    useCallback((event: MouseEvent) => {
      setDragging(true);
      dragStart.current = { x: event.x, y: event.y };
    }, []) as (event: Event) => void,
    containerRef.current,
  );

  useEvent(
    "mousemove",
    useCallback(
      (event: MouseEvent) => {
        if (!isDragging) {
          return;
        }

        const diff = {
          x: dragStart.current.x - event.x,
          y: dragStart.current.y - event.y,
        };
        dragStart.current = { x: event.x, y: event.y };

        setViewTransform((viewTransform) => {
          return {
            x: viewTransform.x + diff.x / viewTransform.z,
            y: viewTransform.y + diff.y / viewTransform.z,
            z: viewTransform.z,
          };
        });
      },
      [isDragging, dragStart],
    ) as (event: Event) => void,
    containerRef.current,
  );

  useEvent(
    "mouseup",
    useCallback((event: MouseEvent) => {
      setDragging(false);
    }, []) as (event: Event) => void,
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
      return {
        x: viewTransform.x + dx - dx / dz,
        y: viewTransform.y + dy - dy / dz,
        z: z,
      };
    });
  }, []);

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
      return {
        x: viewTransform.x + dx - dx / dz,
        y: viewTransform.y + dy - dy / dz,
        z: z,
      };
    });
  }, []);

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
    const container = containerRef.current;
    if (!container) {
      return false;
    }
    const containerBoundingBox = container.getBoundingClientRect();

    if (!boundingBox) {
      return false;
    }

    const viewBoundingBox = {
      x: viewTransform.x,
      y: viewTransform.y,
      width: containerBoundingBox.width / viewTransform.z,
      height: containerBoundingBox.height / viewTransform.z,
    };

    return !boundingBoxOverlap(viewBoundingBox, {
      x: 0,
      y: 0,
      width: boundingBox.width,
      height: boundingBox.height,
    });
  }, [viewTransform, boundingBox]);

  const { theme } = useTheme();

  return (
    <div
      ref={containerRef}
      {...divProps}
      className={classNames(className, "relative overflow-hidden", {
        "cursor-grab": !isDragging,
        "cursor-grabbing": isDragging,
      })}
    >
      <div ref={targetRef} className="absolute inset-0 origin-top-left">
        {children}
      </div>

      <div className="relative z-10 flex">
        <div className="grow"></div>
        <div className="relative cursor-grab bg-slate-50/50 dark:bg-slate-500/50 backdrop-blur">
          <MapControls
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onZoomToFit={zoomToFit}
          />
        </div>
      </div>

      {outOfBounds && (
        <div className="absolute inset-0 z-10 flex justify-around items-center">
          <div
            className={classNames(
              "p-4 rounded flex flex-col justify-around gap-2",
            )}
          >
            <p
              className={classNames(
                theme.text1,
                theme.bg4,
                "px-2 py-0.5 rounded",
              )}
            >
              The map is out of bounds
            </p>
            <div className="flex justify-around">
              <Button onClick={() => zoomToFit()}>Fit map to screen</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
