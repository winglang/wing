import { WebviewPanel, commands, OutputChannel } from "vscode";

import { openResource } from "./commands/open-resource";
import { runAllTests } from "./commands/run-all-test";
import { runTest } from "./commands/run-test";
import { ResourcesExplorerProvider } from "./explorer-providers/ResourcesExplorerProvider";
import {
  TestItem,
  TestsExplorerProvider,
} from "./explorer-providers/TestsExplorerProvider";
import { Client } from "./services/trpc";

export interface ConsolePanel {
  id: string;
  panel: WebviewPanel;
  client: Client;
}

export class PanelsManager {
  private consolePanels: Record<string, ConsolePanel> = {};

  private activeConsolePanel: string | undefined;

  private resourcesExplorer: ResourcesExplorerProvider;

  private testsExplorer: TestsExplorerProvider;

  private logger: OutputChannel | undefined;

  constructor(
    logger: OutputChannel,
    resourcesExplorer: ResourcesExplorerProvider,
    testsExplorer: TestsExplorerProvider
  ) {
    this.logger = logger;
    this.resourcesExplorer = resourcesExplorer;
    this.testsExplorer = testsExplorer;
    this.registerCommands();
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
      await openResource(activePanel.client, resourceId);
    });

    commands.registerCommand("wingConsole.runTest", async (test: TestItem) => {
      const activePanel = this.getActiveConsolePanel();
      if (!activePanel) {
        return;
      }
      await runTest(activePanel.client, test, this.testsExplorer);
    });

    commands.registerCommand("wingConsole.runAllTests", async () => {
      const activePanel = this.getActiveConsolePanel();
      if (!activePanel) {
        return;
      }
      await runAllTests(activePanel.client, this.testsExplorer);
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
    this.resourcesExplorer.update(await consolePanel.client.listResources());
    this.testsExplorer.update(await consolePanel.client.listTests());
  }
}
