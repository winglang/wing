import { createContext } from "react";

import { PlaygroundLayout } from "../components/PlaygroundLayout.js";
import { TutorialLayout } from "../components/TutorialLayout.js";
import { VscodeLayout, LayoutProps } from "../components/VscodeLayout.js";

export enum LayoutType {
  Vscode = 1,
  Playground,
  Tutorial,
}

const LayoutContext = createContext(LayoutType.Vscode);

export interface LayoutProviderProps {
  layoutType?: LayoutType;
  layoutProps: LayoutProps;
}

export function LayoutProvider({
  layoutType,
  layoutProps,
}: LayoutProviderProps) {
  let Layout = VscodeLayout;
  if (layoutType === LayoutType.Playground) {
    Layout = PlaygroundLayout;
  } else if (layoutType === LayoutType.Tutorial) {
    Layout = TutorialLayout;
  }

  return (
    <LayoutContext.Provider value={layoutType ?? LayoutType.Vscode}>
      <Layout
        cloudAppState={layoutProps.cloudAppState}
        wingVersion={layoutProps.wingVersion}
      />
    </LayoutContext.Provider>
  );
}
