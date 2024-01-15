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

export interface ZoomPaneProviderProps {
  children: ReactNode | ((value: ZoomPaneContextValue) => ReactNode);
}

const MIN_ZOOM_LEVEL = 0.125;
const MAX_ZOOM_LEVEL = 1.5;
const ZOOM_SENSITIVITY = 1.25;
const MOVE_SENSITIVITY = 1.5;
const SCALE_SENSITIVITY = 0.01;

export interface ZoomPaneProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  boundingBox?: { width: number; height: number };
}

export interface ZoomPaneRef {
  zoomToFit(viewport?: Viewport): void;
}

export const ZoomPane = forwardRef<ZoomPaneRef, ZoomPaneProps>((props, ref) => {
  const { boundingBox, children, className } = props;

  const [transform, setTransform] = useState(IDENTITY_TRANSFORM);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = targetRef.current;
    if (!target) {
      throw new Error("target is undefined");
    }
    target.style.transform = `translate(${-transform.x * transform.z}px, ${
      -transform.y * transform.z
    }px) scale(${transform.z})`;
  }, [transform]);

  const toLocal = useCallback(
    (x: number, y: number) => {
      return {
        x: transform.x + x / transform.z,
        y: transform.y + y / transform.z,
      };
    },
    [transform],
  );

  const onWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      const boundingRect = (
        event.currentTarget as HTMLDivElement
      ).getBoundingClientRect();
      setTransform((transform) => {
        if (event.ctrlKey) {
          const localCursor = toLocal(
            event.x - boundingRect.left,
            event.y - boundingRect.top,
          );
          const dx = localCursor.x - transform.x;
          const dy = localCursor.y - transform.y;

          const z = Math.min(
            MAX_ZOOM_LEVEL,
            Math.max(
              MIN_ZOOM_LEVEL,
              transform.z * Math.exp(-event.deltaY * SCALE_SENSITIVITY),
            ),
          );
          const dz = z / transform.z;

          return {
            x: transform.x + dx - dx / dz,
            y: transform.y + dy - dy / dz,
            z: z,
          };
        } else {
          return {
            x: transform.x + (event.deltaX * MOVE_SENSITIVITY) / transform.z,
            y: transform.y + (event.deltaY * MOVE_SENSITIVITY) / transform.z,
            z: transform.z,
          };
        }
      });
    },
    [toLocal],
  );
  useEvent("wheel", onWheel as (event: Event) => void, containerRef.current);

  const zoomIn = useCallback(() => {
    setTransform((transform) => {
      const z = Math.min(MAX_ZOOM_LEVEL, transform.z * ZOOM_SENSITIVITY);
      return {
        ...transform,
        z,
      };
    });
  }, []);

  const zoomOut = useCallback(() => {
    setTransform((transform) => {
      const z = Math.max(MIN_ZOOM_LEVEL, transform.z / ZOOM_SENSITIVITY);
      return {
        ...transform,
        z,
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
      setTransform(() => {
        viewport ??= {
          x: 0,
          y: 0,
          width: boundingBox?.width ?? boundingRect.width,
          height: boundingBox?.height ?? boundingRect.height,
        };

        // Scale contents to fit.
        const zx = boundingRect.width / viewport.width;
        const zy = boundingRect.height / viewport.height;
        const z = Math.min(zx, zy);

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

  return (
    <div
      ref={containerRef}
      className={classNames(className, "relative overflow-hidden")}
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

      {/* <div className="absolute inset-0 z-10 flex justify-around items-center">
        <div>
          <span>The map is out of bounds</span>
          <button onClick={() => zoomToFit()}>Center</button>
        </div>
      </div> */}
    </div>
  );
});
