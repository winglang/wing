import type { ElkExtendedEdge, ElkNode } from "elkjs";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type DetailedHTMLProps,
  type FunctionComponent,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";

import { MapBackground } from "../map-background.js";
import type { ZoomPaneRef } from "../zoom-pane.js";
import { ZoomPane } from "../zoom-pane.js";

import { GraphGenerator } from "./graph-generator.js";
import { GraphRenderer } from "./graph-renderer.js";
import type { EdgeComponent, ElkOptions } from "./types.js";

export interface GraphProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  elk: ElkOptions;
  edges?: ElkExtendedEdge[];
  edgeComponent?: EdgeComponent;
}

export const Graph: FunctionComponent<PropsWithChildren<GraphProps>> = memo(
  (props) => {
    const { elk, edges, edgeComponent, ...divProps } = props;

    const [initialZoomToFit, setInitialZoomToFit] = useState(true);
    const [graph, setGraph] = useState<ElkNode>();

    const zoomPaneRef = useRef<ZoomPaneRef>(null);

    const mapSize = useMemo(() => {
      if (!graph) {
        return;
      }

      return {
        width: graph.width!,
        height: graph.height!,
      };
    }, [graph]);

    // Zoom to fit the first time
    useEffect(() => {
      if (!graph) {
        return;
      }

      if (!initialZoomToFit) {
        zoomPaneRef.current?.zoomToFit();
      }
      setInitialZoomToFit(true);
    }, [graph, initialZoomToFit]);

    const mapBackgroundRef = useRef<HTMLDivElement>(null);

    return (
      <>
        {createPortal(
          <div className="fixed pointer-events-none invisible size-0">
            <GraphGenerator elk={elk} edges={edges} onGraph={setGraph}>
              {props.children}
            </GraphGenerator>
          </div>,
          document.body,
        )}

        <div ref={mapBackgroundRef}></div>

        <ZoomPane
          ref={zoomPaneRef}
          boundingBox={mapSize}
          className="w-full h-full"
          data-testid="map-pane"
        >
          {mapBackgroundRef.current &&
            createPortal(<MapBackground hideDots />, mapBackgroundRef.current)}

          <div {...divProps}>
            {graph && (
              <GraphRenderer graph={graph} edgeComponent={edgeComponent}>
                {props.children}
              </GraphRenderer>
            )}
          </div>
        </ZoomPane>
      </>
    );
  },
);
