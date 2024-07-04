import type { ElkExtendedEdge, ElkNode } from "elkjs";
import type { FunctionComponent } from "react";

// export type IntrinsicElements = JSX.IntrinsicElements;
export interface IntrinsicElements {
  div: JSX.IntrinsicElements["div"];
}

export interface ElkOptions {
  id: string;
  layoutOptions?: Record<string, string>;
}

export interface EdgeComponentProps {
  edge: ElkExtendedEdge;
  offsetX?: number;
  offsetY?: number;
  graphWidth: number;
  graphHeight: number;
}

export type EdgeComponent = FunctionComponent<EdgeComponentProps>;
