/* eslint-disable react-hooks/rules-of-hooks */
import type { ReactNode, ReactPortal } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const createPrependPortal = (
  component: ReactNode,
  container: Element | DocumentFragment,
  key?: string | null,
): ReactPortal => {
  const [portalContainer] = useState(() => document.createElement("div"));

  useEffect(() => {
    container.prepend(portalContainer);
    return () => {
      portalContainer.remove();
    };
  }, [container, portalContainer]);

  return createPortal(component, portalContainer, key);
};
