import classNames from "classnames";
import * as d3Selection from "d3-selection";
import * as d3Zoom from "d3-zoom";
import throttle from "lodash.throttle";
import { useEffect } from "react";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  RefObject,
  useCallback,
  useRef,
} from "react";
import {
  FunctionComponent,
  ReactNode,
  createContext,
  useState,
  useContext,
} from "react";

export type Selection = d3Selection.Selection<
  HTMLDivElement,
  unknown,
  null,
  undefined
>;

export type ZoomBehavior = d3Zoom.ZoomBehavior<HTMLDivElement, unknown>;

export interface Viewport {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ZoomPaneContextValue {
  transform: d3Zoom.ZoomTransform;
  zoomIn(): void;
  zoomOut(): void;
  zoomToFit(viewport?: Viewport): void;
}

const ZoomPaneContext = createContext<ZoomPaneContextValue>({
  transform: d3Zoom.zoomIdentity,
  zoomIn() {},
  zoomOut() {},
  zoomToFit() {},
});

interface ZoomPanePrivateContextValue {
  zoom: ZoomBehavior;
  selection: Selection | undefined;
  select(node: HTMLDivElement): void;
  targetRef: RefObject<HTMLDivElement>;
}

const ZoomPanePrivateContext = createContext<
  ZoomPanePrivateContextValue | undefined
>(undefined);

export interface ZoomPaneProviderProps {
  children: ReactNode | ((value: ZoomPaneContextValue) => ReactNode);
}

const selectionTransition = (selection: Selection, duration?: number) => {
  const newSelection = (selection as any).transition();
  if (duration) {
    return newSelection.duration(duration) as Selection;
  }
  return newSelection as Selection;
};

const MIN_ZOOM_LEVEL = 0.5;
const MAX_ZOOM_LEVEL = 2;

export const ZoomPaneProvider: FunctionComponent<ZoomPaneProviderProps> = (
  props,
) => {
  const [transform, setTransform] = useState(() => d3Zoom.zoomIdentity);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setTransformThrottled = useCallback(throttle(setTransform, 200), []);

  const targetRef = useRef<HTMLDivElement>(null);
  const [zoom] = useState(() =>
    d3Zoom
      .zoom<HTMLDivElement, unknown>()
      .scaleExtent([MIN_ZOOM_LEVEL, MAX_ZOOM_LEVEL])
      .clickDistance(30)
      .on("zoom", (event) => {
        const { transform } = event;
        if (targetRef.current) {
          targetRef.current.style.transform = `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`;
        }
        setTransformThrottled(transform);
      }),
  );
  const [selection, setSelection] = useState<Selection | undefined>();
  const select = useCallback(
    (node: HTMLDivElement) => {
      const selection = d3Selection.select(node);
      selection.call(zoom);
      setSelection(selection);
    },
    [zoom],
  );

  const zoomToFit = useCallback(
    (viewport?: Viewport) => {
      const node = selection?.node();
      if (!selection || !node) {
        return;
      }

      if (!targetRef.current) {
        return;
      }

      viewport ??= {
        x: 0,
        y: 0,
        width: targetRef.current.clientWidth,
        height: targetRef.current.clientHeight,
      };

      const width = node.clientWidth;
      const height = node.clientHeight;
      const x0 = viewport.x;
      const y0 = viewport.y;
      const x1 = x0 + viewport.width;
      const y1 = y0 + viewport.height;

      const defaultScale = 1.25;

      const scale = Math.min(
        8,
        0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height),
      );

      selectionTransition(selection, 800).call(
        zoom.transform,
        d3Zoom.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(Math.min(defaultScale, scale))
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
      );
    },
    [selection, zoom, targetRef],
  );

  const zoomOut = useCallback(() => {
    if (!selection) {
      return;
    }
    selectionTransition(selection).call(zoom.scaleBy, 0.9);
  }, [selection, zoom]);

  const zoomIn = useCallback(() => {
    if (!selection) {
      return;
    }
    selectionTransition(selection).call(zoom.scaleBy, 1.1);
  }, [selection, zoom]);

  return (
    <ZoomPanePrivateContext.Provider
      value={{ zoom, selection, select, targetRef }}
    >
      <ZoomPaneContext.Provider
        value={{ transform, zoomIn, zoomOut, zoomToFit }}
      >
        {typeof props.children === "function" ? (
          props.children({ transform, zoomIn, zoomOut, zoomToFit })
        ) : (
          <>{props.children}</>
        )}
      </ZoomPaneContext.Provider>
    </ZoomPanePrivateContext.Provider>
  );
};

export const useZoomPaneContext = () => {
  return useContext(ZoomPaneContext);
};

export const ZoomPane: FunctionComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  const context = useContext(ZoomPanePrivateContext);

  if (!context) {
    return <>{props.children}</>;
  }

  const { select, targetRef } = context;

  return (
    <div
      ref={select}
      {...props}
      className={classNames(props.className, "overflow-hidden")}
    >
      <div ref={targetRef} className="inline-block origin-top-left">
        {props.children}
      </div>
    </div>
  );
};
