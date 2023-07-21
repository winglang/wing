import { createContext } from "react";

import { DefaultLayout, LayoutProps } from "./default-layout.js";
import { PlaygroundLayout } from "./playground-layout.js";
import { TutorialLayout } from "./tutorial-layout.js";
import { VscodeLayout } from "./vscode-layout.js";

export enum LayoutType {
  Default = 1,
  Playground,
  Tutorial,
  Vscode,
}

export const LayoutContext = createContext(LayoutType.Default);

export interface LayoutProviderProps {
  layoutType?: LayoutType;
  layoutProps: LayoutProps;
}

export function LayoutProvider({
  layoutType,
  layoutProps,
}: LayoutProviderProps) {
  let Layout = DefaultLayout;
  switch (layoutType) {
    case LayoutType.Playground: {
      Layout = PlaygroundLayout;

      break;
    }
    case LayoutType.Tutorial: {
      Layout = TutorialLayout;

      break;
    }
    case LayoutType.Vscode: {
      Layout = VscodeLayout;

      break;
    }
  }

  return (
    <LayoutContext.Provider value={layoutType ?? LayoutType.Default}>
      <Layout
        cloudAppState={layoutProps.cloudAppState}
        wingVersion={layoutProps.wingVersion}
      />
    </LayoutContext.Provider>
  );
}
