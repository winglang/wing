import {
  window,
  WebviewPanel,
  commands,
  OutputChannel,
  TreeView,
} from "vscode";

import {
  ResourceItem,
  ResourcesExplorerProvider,
} from "./explorer-providers/ResourcesExplorerProvider";
import {
  TestItem,
  TestsExplorerProvider,
} from "./explorer-providers/TestsExplorerProvider";
import { Client } from "./services/trpc";

export interface ConsolePanel {
  id: string;
  panel: WebviewPanel;
  client: Client;
  selectedNode: string | undefined;
}

export class PanelsManager {
  private consolePanels: Record<string, ConsolePanel> = {};

  private activeConsolePanel: string | undefined;

  private resourcesExplorer: ResourcesExplorerProvider;

  private testsExplorer: TestsExplorerProvider;

  private logger: OutputChannel | undefined;

  private explorerView: TreeView<ResourceItem>;

  constructor(
    logger: OutputChannel,
    resourcesExplorer: ResourcesExplorerProvider,
    testsExplorer: TestsExplorerProvider
  ) {
    this.logger = logger;
    this.resourcesExplorer = resourcesExplorer;
    this.testsExplorer = testsExplorer;
    this.registerCommands();

    this.explorerView = window.createTreeView("consoleExplorer", {
      treeDataProvider: resourcesExplorer,
    });

    window.createTreeView("consoleTestsExplorer", {
      treeDataProvider: testsExplorer,
    });
  }

  public getActiveConsolePanel() {
    if (!this.activeConsolePanel) {
      return;
    }
    return this.consolePanels[this.activeConsolePanel];
  }

  public getActiveConsolePanelId() {
    return this.activeConsolePanel;
  }

  private registerCommands() {
    commands.registerCommand("wingConsole.openResource", async (resourceId) => {
      const activePanel = this.getActiveConsolePanel();
      if (!activePanel) {
        return;
      }
      await activePanel.client.setSelectedNode(resourceId);
      activePanel.selectedNode = resourceId;
    });

    commands.registerCommand("wingConsole.runTest", async (test: TestItem) => {
      const activePanel = this.getActiveConsolePanel();
      if (!activePanel) {
        return;
      }
      const tests = this.testsExplorer.getTests();
      this.testsExplorer.update(
        tests.map((testItem) => {
          if (testItem.id === test.id) {
            return {
              ...test,
              status: "running",
            };
          }
          return testItem;
        })
      );
      await activePanel.client.runTest(test.id);
    });

    commands.registerCommand("wingConsole.runAllTests", async () => {
      const activePanel = this.getActiveConsolePanel();
      if (!activePanel) {
        return;
      }
      const tests = this.testsExplorer.getTests();
      this.testsExplorer.update(
        tests.map((testItem) => {
          return {
            ...testItem,
            status: "running",
          };

          return testItem;
        })
      );
      await activePanel.client.runAllTests();
    });
  }

  public addConsolePanel(consolePanel: ConsolePanel) {
    consolePanel.client.onInvalidateQuery({
      onData: async () => {
        if (this.activeConsolePanel !== consolePanel.id) {
          return;
        }

        this.resourcesExplorer.update(
          await consolePanel.client.listResources()
        );
        this.testsExplorer.update(await consolePanel.client.listTests());
      },
      onError: (err) => {
        this.logger?.appendLine(err);
      },
    });
    this.consolePanels[consolePanel.id] = consolePanel;
  }

  public closeConsolePanel(panelId: string) {
    const activePanel = this.consolePanels[panelId];
    if (!activePanel) {
      return;
    }
    delete this.consolePanels[panelId];
    activePanel.panel.dispose();
    activePanel.client.close();

    if (this.activeConsolePanel === panelId) {
      this.activeConsolePanel = undefined;
    }
  }

  public getConsolePanel(panelId: string) {
    return this.consolePanels[panelId];
  }

  public async setActiveConsolePanel(panelId: string) {
    const consolePanel = this.consolePanels[panelId];
    if (!consolePanel) {
      return;
    }

    if (this.activeConsolePanel !== panelId) {
      consolePanel.panel.reveal();
      this.activeConsolePanel = panelId;
    }

    const node = await consolePanel.client.listResources();
    this.resourcesExplorer.update(node);

    const resourceId = consolePanel.selectedNode || "root";
    await this.explorerView.reveal(
      new ResourceItem({
        id: resourceId,
      })
    );
    await consolePanel.client.setSelectedNode(resourceId);

    this.testsExplorer.update(await consolePanel.client.listTests());
  }
}
