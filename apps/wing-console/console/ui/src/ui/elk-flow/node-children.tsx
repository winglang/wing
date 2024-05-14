import {
  type FunctionComponent,
  useContext,
  createContext,
  type ReactNode,
  createElement,
} from "react";

import type { IntrinsicElements } from "./types.js";

export type NodeChildrenProps<K extends keyof IntrinsicElements> = {
  as?: K;
  children?: ReactNode;
} & IntrinsicElements[K];

const DefaultComponent = <K extends keyof IntrinsicElements = "div">({
  as,
  children,
  ...props
}: NodeChildrenProps<K>) => {
  return createElement(as ?? "div", props, children);
};

export const NodeChildrenContext =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createContext<FunctionComponent<NodeChildrenProps<any>>>(DefaultComponent);

export const NodeChildren = <K extends keyof IntrinsicElements = "div">({
  children,
  ...props
}: NodeChildrenProps<K>) => {
  const Component = useContext(NodeChildrenContext);
  return createElement(Component, props, children);
};
