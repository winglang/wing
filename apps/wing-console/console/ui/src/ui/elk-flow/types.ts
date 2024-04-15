import type { ElkExtendedEdge } from "elkjs";
import type { FunctionComponent } from "react";

// export type IntrinsicElements = JSX.IntrinsicElements;
export interface IntrinsicElements {
  div: JSX.IntrinsicElements["div"];
}

export interface ElkOptions {
  id: string;
  layoutOptions?: Record<string, string>;
}

export type EdgeComponent = FunctionComponent<{ edge: ElkExtendedEdge }>;
