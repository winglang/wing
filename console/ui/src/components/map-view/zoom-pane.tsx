import classNames from "classnames";
import * as d3Selection from "d3-selection";
import * as d3Zoom from "d3-zoom";
import throttle from "lodash.throttle";
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

export interface ZoomPaneContextValue {
  transform: d3Zoom.ZoomTransform;
  zoomToFit(): void;
  zoomOut(): void;
  zoomIn(): void;
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
  children: ReactNode;
}

const selectionTransition = (selection: Selection, duration?: number) => {
  const newSelection = (selection as any).transition();
  if (duration) {
    return newSelection.duration(duration) as Selection;
  }
  return newSelection as Selection;
};

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
      .scaleExtent([Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY])
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

  const zoomToFit = useCallback(() => {
    const node = selection?.node();
    if (!selection || !node) {
      return;
    }

    if (!targetRef.current) {
      return;
    }

    const width = node.clientWidth;
    const height = node.clientHeight;
    const x0 = 0;
    const y0 = 0;
    const x1 = targetRef.current.clientWidth;
    const y1 = targetRef.current.clientHeight;
    selectionTransition(selection, 800).call(
      zoom.transform,
      d3Zoom.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(
          Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)),
        )
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
    );
  }, [selection, zoom, targetRef]);

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
        {props.children}
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
