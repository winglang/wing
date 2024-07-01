import {
  useContext,
  createContext,
  type ReactNode,
  createElement,
  type FunctionComponent,
} from "react";

import type { ElkOptions, IntrinsicElements } from "./types.js";

export type PortProps<K extends keyof IntrinsicElements> = {
  elk: ElkOptions;
  as?: K;
  children?: ReactNode;
} & IntrinsicElements[K];

const DefaultComponent = <K extends keyof IntrinsicElements = "div">({
  as,
  children,
  ...props
}: PortProps<K>) => {
  return createElement(as ?? "div", props, children);
};

export const PortContext =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createContext<FunctionComponent<PortProps<any>>>(DefaultComponent);

export const Port = <K extends keyof IntrinsicElements = "div">({
  children,
  ...props
}: PortProps<K>) => {
  const Component = useContext(PortContext);
  return createElement(Component, props, children);
};
