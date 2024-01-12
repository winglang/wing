import classNames from "classnames";
import { DetailedHTMLProps, HTMLAttributes, useCallback, useRef } from "react";
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
const MOVE_SENSITIVITY = 1.5;
const SCALE_SENSITIVITY = 0.01;

// export const ZoomPaneProvider: FunctionComponent<ZoomPaneProviderProps> = (
//   props,
// ) => {
//   // const targetRef = useRef<HTMLDivElement>(null);
//   const [transform, setTransform] = useState(IDENTITY_TRANSFORM);

//   const zoomToFit = useCallback(
//     (viewport?: Viewport, skipAnimation?: boolean) => {
//       // const node = selection?.node();
//       // if (!selection || !node) {
//       //   return;
//       // }
//       // if (!targetRef.current) {
//       //   return;
//       // }
//       // viewport ??= {
//       //   x: 0,
//       //   y: 0,
//       //   width: targetRef.current.clientWidth,
//       //   height: targetRef.current.clientHeight,
//       // };
//       // const width = node.clientWidth;
//       // const height = node.clientHeight;
//       // const x0 = viewport.x;
//       // const y0 = viewport.y;
//       // const x1 = x0 + viewport.width;
//       // const y1 = y0 + viewport.height;
//       // const defaultScale = 1.25;
//       // const scale = Math.min(
//       //   8,
//       //   0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height),
//       // );
//       // const newTransform = d3Zoom.zoomIdentity
//       //   .translate(width / 2, height / 2)
//       //   .scale(Math.min(defaultScale, scale))
//       //   .translate(-(x0 + x1) / 2, -(y0 + y1) / 2);
//       // if (skipAnimation) {
//       //   zoom.transform(selection, newTransform);
//       // } else {
//       //   selectionTransition(selection, 500).call(zoom.transform, newTransform);
//       // }
//     },
//     [
//       //selection, zoom, targetRef
//     ],
//   );

//   const zoomOut = useCallback(
//     () => {
//       // if (!selection) {
//       //   return;
//       // }
//       // selectionTransition(selection).call(zoom.scaleBy, 0.9);
//     },
//     [
//       //selection, zoom
//     ],
//   );

//   const zoomIn = useCallback(() => {
//     // if (!selection) {
//     //   return;
//     // }
//     // selectionTransition(selection).call(zoom.scaleBy, 1.1);
//     setTransform({
//       ...transform,
//       z: transform.z * 1.1,
//     });
//   }, [
//     transform,
//     setTransform,
//     //selection, zoom
//   ]);

//   // const transformRef = useRef({ x: 0, y: 0, z: 1 });

//   return (
//     <ZoomPanePrivateContext.Provider
//       value={{
//         // transformRef,
//         transform,
//         setTransform,
//       }}
//     >
//       <ZoomPaneContext.Provider
//         value={{
//           zoomIn,
//           zoomOut,
//           zoomToFit,
//         }}
//       >
//         {typeof props.children === "function" ? (
//           props.children({
//             zoomIn,
//             zoomOut,
//             zoomToFit,
//           })
//         ) : (
//           <>{props.children}</>
//         )}
//       </ZoomPaneContext.Provider>
//     </ZoomPanePrivateContext.Provider>
//   );
// };

// export const useZoomPaneContext = () => {
//   return useContext(ZoomPaneContext);
// };

// export interface ZoomPaneProps {
//   transform: Transform;
//   onTransformChange?: (transform: Transform) => void;
// }

export const ZoomPane = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) => {
  const { children, className } = props;

  const transformRef = useRef<Transform>(IDENTITY_TRANSFORM);

  const ref = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const applyTransform = useCallback(() => {
    const target = targetRef.current;
    if (!target) {
      throw new Error("target is undefined");
    }
    const transform = transformRef.current;
    target.style.transform = `translate(${-transform.x * transform.z}px, ${
      -transform.y * transform.z
    }px) scale(${transform.z})`;
  }, []);

  const toLocal = useCallback((x: number, y: number) => {
    const transform = transformRef.current;
    return {
      x: transform.x + x / transform.z,
      y: transform.y + y / transform.z,
    };
  }, []);

  const onWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      const transform = transformRef.current;
      if (event.ctrlKey) {
        const boundingRect = (
          event.currentTarget as HTMLDivElement
        ).getBoundingClientRect();

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

        transform.z = z;
        transform.x += dx - dx / dz;
        transform.y += dy - dy / dz;
      } else {
        transform.x += (event.deltaX * MOVE_SENSITIVITY) / transform.z;
        transform.y += (event.deltaY * MOVE_SENSITIVITY) / transform.z;
      }
      applyTransform();
    },
    [applyTransform, toLocal],
  );
  useEvent("wheel", onWheel as (event: Event) => void, ref.current);

  return (
    <div
      ref={ref}
      className={classNames(className, "relative overflow-hidden")}
    >
      <div ref={targetRef} className="absolute inset-0 origin-top-left">
        {children}
      </div>
      <div className="relative z-10 flex">
        <div className="grow"></div>
        <div className="relative cursor-grab bg-slate-50/50 dark:bg-slate-500/50 backdrop-blur">
          <MapControls />
        </div>
      </div>
    </div>
  );
};
