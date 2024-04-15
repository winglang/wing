import type { ElkExtendedEdge, ElkNode } from "elkjs";
import {
  useState,
  type DetailedHTMLProps,
  type FunctionComponent,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";

import { GraphGenerator } from "./graph-generator.js";
import { GraphRenderer } from "./graph-renderer.js";
import type { EdgeComponent, ElkOptions } from "./types.js";

export interface GraphProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  elk: ElkOptions;
  edges?: ElkExtendedEdge[];
  edgeComponent?: EdgeComponent;
}

export const Graph: FunctionComponent<PropsWithChildren<GraphProps>> = (
  props,
) => {
  const { elk, edges, edgeComponent, ...divProps } = props;

  const [graph, setGraph] = useState<ElkNode>();

  return (
    <>
      {createPortal(
        <div className="absolute pointer-events-none invisible size-0">
          <GraphGenerator elk={elk} edges={edges} onGraph={setGraph}>
            {props.children}
          </GraphGenerator>
        </div>,
        document.body,
      )}

      <div {...divProps}>
        {graph && (
          <GraphRenderer graph={graph} edgeComponent={edgeComponent}>
            {props.children}
          </GraphRenderer>
        )}
      </div>
    </>
  );
};
