import classNames from "classnames";
import * as d3Selection from "d3-selection";
import * as d3Zoom from "d3-zoom";
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
  zoom: ZoomBehavior;
  selection: Selection | undefined;
  select(node: HTMLDivElement): void;
  transform: d3Zoom.ZoomTransform;
  targetRef: RefObject<HTMLDivElement>;
}

const ZoomPaneContext = createContext<ZoomPaneContextValue | undefined>(
  undefined,
);

export interface ZoomPaneProviderProps {
  children: ReactNode;
}

export const ZoomPaneProvider: FunctionComponent<ZoomPaneProviderProps> = (
  props,
) => {
  const [transform, setTransform] = useState<d3Zoom.ZoomTransform>(
    () => d3Zoom.zoomIdentity,
  );
  const [zoom] = useState(() =>
    d3Zoom
      .zoom<HTMLDivElement, unknown>()
      .scaleExtent([Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY])
      .on("zoom", (event) => {
        setTransform(event.transform);
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
  const targetRef = useRef<HTMLDivElement>(null);
  return (
    <ZoomPaneContext.Provider
      value={{ zoom, selection, select, transform, targetRef }}
    >
      {props.children}
    </ZoomPaneContext.Provider>
  );
};

export const useZoomPaneContext = () => {
  const context = useContext(ZoomPaneContext);
  if (!context) {
    throw new Error("useZoomPaneContext must be used within ZoomPaneProvider");
  }
  return context;
};

export const ZoomPane: FunctionComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  const context = useContext(ZoomPaneContext);
  if (!context) {
    return <>{props.children}</>;
  }

  const { select, transform, targetRef } = context;

  return (
    <div
      ref={select}
      {...props}
      className={classNames(props.className, "overflow-hidden")}
    >
      <div
        ref={targetRef}
        className="inline-block origin-top-left"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`,
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
