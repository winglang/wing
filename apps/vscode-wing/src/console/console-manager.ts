import {
  window,
  WebviewPanel,
  commands,
  OutputChannel,
  TreeView,
  ViewColumn,
  Uri,
  ExtensionContext,
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
import { VIEW_TYPE_CONSOLE } from "../constants";

export interface ConsoleInstance {
  id: string;
  wingfile: string;
  url: string;
  client: Client;
}

export class ConsoleManager {
  private consoleInstances: Record<string, ConsoleInstance> = {};

  private activeInstanceId: string | undefined;

  private context: ExtensionContext;

  private webviewPanel: WebviewPanel | undefined;

  private resourcesExplorer: ResourcesExplorerProvider;

  private testsExplorer: TestsExplorerProvider;

  private logger: OutputChannel | undefined;

  private explorerView: TreeView<ResourceItem> | undefined;

  constructor(context: ExtensionContext, logger: OutputChannel) {
    this.context = context;
    this.logger = logger;
    this.resourcesExplorer = new ResourcesExplorerProvider();
    this.testsExplorer = new TestsExplorerProvider();
    this.registerCommands();
  }

  private registerCommands() {
    commands.registerCommand("wingConsole.openResource", async (resourceId) => {
      const activePanel = this.getActiveInstance();
      if (!activePanel) {
        return;
      }
      await activePanel.client.setSelectedNode(resourceId);
    });

    commands.registerCommand("wingConsole.runTest", async (test: TestItem) => {
      const activePanel = this.getActiveInstance();
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
      const activePanel = this.getActiveInstance();
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

  private openWebview() {
    if (this.webviewPanel) {
      this.webviewPanel.reveal();
      return;
    }

    this.explorerView = window.createTreeView("consoleExplorer", {
      treeDataProvider: this.resourcesExplorer,
    });

    window.createTreeView("consoleTestsExplorer", {
      treeDataProvider: this.testsExplorer,
    });

    const panel: WebviewPanel = window.createWebviewPanel(
      VIEW_TYPE_CONSOLE,
      `Console`,
      ViewColumn.Beside,
      {
        enableScripts: true,
        enableCommandUris: true,
      }
    );

    panel.iconPath = {
      light: Uri.joinPath(
        this.context.extensionUri,
        "resources",
        "icon-light.png"
      ),
      dark: Uri.joinPath(
        this.context.extensionUri,
        "resources",
        "icon-dark.png"
      ),
    };

    this.webviewPanel = panel;

    panel.onDidDispose(async () => {
      this.webviewPanel = undefined;
      this.activeInstanceId = undefined;
      this.resourcesExplorer.clear();
      this.testsExplorer.clear();
    });
  }

  public getActiveInstance() {
    if (!this.activeInstanceId) {
      return;
    }
    return this.consoleInstances[this.activeInstanceId];
  }

  public getActiveInstanceId() {
    return this.activeInstanceId;
  }

  public addInstance(consoleInstance: ConsoleInstance) {
    consoleInstance.client.onInvalidateQuery({
      onData: async () => {
        if (this.activeInstanceId !== consoleInstance.id) {
          return;
        }

        this.resourcesExplorer.update(
          await consoleInstance.client.listResources()
        );
        this.testsExplorer.update(await consoleInstance.client.listTests());
      },
      onError: (err) => {
        this.logger?.appendLine(err);
      },
    });
    this.consoleInstances[consoleInstance.id] = consoleInstance;
  }

  public getConsoleInstance(instanceId: string) {
    return this.consoleInstances[instanceId];
  }

  public async setActiveInstance(instanceId: string) {
    const consoleInstance = this.consoleInstances[instanceId];
    if (!consoleInstance) {
      return;
    }

    this.openWebview();
    if (!this.webviewPanel) {
      return;
    }
    this.activeInstanceId = instanceId;
    this.webviewPanel.title = `${consoleInstance.wingfile} - [console]`;
    this.webviewPanel.webview.html = `
      <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
              body { margin: 0; padding: 0; }
              iframe { display: block; height: 100vh; width: 100vw; border: none; }
            </style>
        </head>
        <body>
          <iframe src="http://${consoleInstance.url}"/>
        </body>
      </html>`;

    const node = await consoleInstance.client.listResources();
    this.resourcesExplorer.update(node);

    await this.explorerView?.reveal(
      new ResourceItem({
        id: "root",
      })
    );

    this.testsExplorer.update(await consoleInstance.client.listTests());
  }
}
