import {
  type FunctionComponent,
  useContext,
  createContext,
  type ReactNode,
  createElement,
} from "react";

import type { ElkOptions, IntrinsicElements } from "./types.js";

export type NodeProps<K extends keyof IntrinsicElements> = {
  elk: ElkOptions;
  as?: K;
  children?: ReactNode;
} & IntrinsicElements[K];

const DefaultComponent = <K extends keyof IntrinsicElements = "div">({
  as,
  children,
  ...props
}: NodeProps<K>) => {
  return createElement(as ?? "div", props, children);
};

export const NodeContext =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createContext<FunctionComponent<NodeProps<any>>>(DefaultComponent);

export const Node = <K extends keyof IntrinsicElements = "div">({
  children,
  ...props
}: NodeProps<K>) => {
  const Component = useContext(NodeContext);
  return createElement(Component, props, children);
};
