import { createContext } from "react";

import type { LayoutProps } from "./default-layout.js";
import { DefaultLayout } from "./default-layout.js";

export enum LayoutType {
  Default = 1,
  Playground,
  Tutorial,
  Vscode,
  WingCloud,
  Map,
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
  let layoutConfig = layoutProps.layoutConfig;
  let Layout = DefaultLayout;

  switch (layoutType) {
    case LayoutType.Playground: {
      layoutConfig = {
        leftPanel: {
          hide: true,
        },
        bottomPanel: {
          components: [
            {
              type: "tests",
            },
            {
              type: "logs",
            },
          ],
        },
        statusBar: {
          showThemeToggle: false,
        },
      };

      break;
    }
    case LayoutType.Tutorial: {
      layoutConfig = {
        leftPanel: {
          hide: true,
        },
        bottomPanel: {
          size: "small",
          components: [
            {
              type: "logs",
            },
          ],
        },
        errorScreen: {
          position: "bottom",
          displayLinks: false,
        },
        statusBar: {
          hide: true,
        },
      };
      break;
    }
    case LayoutType.Vscode: {
      layoutConfig = {
        leftPanel: {
          hide: true,
        },
        bottomPanel: {
          hide: true,
        },
        statusBar: {
          hide: true,
        },
      };
      break;
    }
    case LayoutType.WingCloud: {
      layoutConfig = {
        statusBar: {
          hide: true,
        },
      };
      break;
    }
    case LayoutType.Map: {
      layoutConfig = {
        leftPanel: {
          hide: true,
        },
        bottomPanel: {
          hide: true,
        },
        statusBar: {
          hide: true,
        },
        rightPanel: {
          hide: true,
        },
      };
      break;
    }
  }

  return (
    <LayoutContext.Provider value={layoutType ?? LayoutType.Default}>
      <Layout
        cloudAppState={layoutProps.cloudAppState}
        wingVersion={layoutProps.wingVersion}
        layoutConfig={layoutConfig}
      />
    </LayoutContext.Provider>
  );
}
