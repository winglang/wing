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
import { type Client } from "./services/client";
import { VIEW_TYPE_CONSOLE } from "../constants";

export interface ConsoleInstance {
  id: string;
  wingfile: string;
  url: string;
  client: Client;
  onDidClose: () => void;
}

export interface ConsoleManager {
  addInstance: (instance: ConsoleInstance) => Promise<void>;
  getInstance: (instanceId: string) => ConsoleInstance | undefined;
  closeInstance: (instanceId: string) => void;
  setActiveInstance: (instanceId: string) => Promise<void>;
  activeInstances: () => boolean;
  getActiveInstanceId: () => string | undefined;
}

export const createConsoleManager = (
  context: ExtensionContext,
  logger: OutputChannel
): ConsoleManager => {
  const instances: Record<string, ConsoleInstance> = {};
  const resourcesExplorer = new ResourcesExplorerProvider();
  const testsExplorer = new TestsExplorerProvider();

  let activeInstanceId: string | undefined;
  let webviewPanel: WebviewPanel | undefined;
  let explorerView: TreeView<ResourceItem> | undefined;
  let testsExplorerView: TreeView<TestItem> | undefined;

  const registerCommands = () => {
    commands.registerCommand("wingConsole.openResource", async (resourceId) => {
      if (!activeInstanceId) {
        return;
      }
      const activePanel = getInstance(activeInstanceId);
      if (!activePanel) {
        return;
      }
      await activePanel.client.setSelectedNode(resourceId);
    });

    commands.registerCommand("wingConsole.runTest", async (test: TestItem) => {
      if (!activeInstanceId) {
        return;
      }
      const activePanel = getInstance(activeInstanceId);
      if (!activePanel) {
        return;
      }
      const tests = testsExplorer.getTests();
      testsExplorer.update(
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
      if (!activeInstanceId) {
        return;
      }
      const activePanel = getInstance(activeInstanceId);
      if (!activePanel) {
        return;
      }
      const tests = testsExplorer.getTests();
      testsExplorer.update(
        tests.map((testItem) => {
          return {
            ...testItem,
            status: "running",
          };
        })
      );
      await activePanel.client.runAllTests();
    });
  };

  const addInstance = async (instance: ConsoleInstance) => {
    instance.client.onInvalidateQuery({
      onData: async () => {
        if (activeInstanceId !== instance.id) {
          return;
        }
        resourcesExplorer.update(await instance.client.listResources());
        testsExplorer.update(await instance.client.listTests());
      },
      onError: (err) => {
        logger.appendLine(err);
      },
    });
    instances[instance.id] = instance;

    await setActiveInstance(instance.id);
  };

  const getInstance = (instanceId: string) => {
    if (!instanceId) {
      return;
    }
    return instances[instanceId];
  };

  const setActiveInstance = async (instanceId: string) => {
    const instance = getInstance(instanceId);
    if (!instance) {
      return;
    }

    if (!webviewPanel) {
      webviewPanel = window.createWebviewPanel(
        VIEW_TYPE_CONSOLE,
        `Console`,
        ViewColumn.Beside,
        {
          enableScripts: true,
          enableCommandUris: true,
        }
      );

      webviewPanel.iconPath = {
        light: Uri.joinPath(
          context.extensionUri,
          "resources",
          "icon-light.png"
        ),
        dark: Uri.joinPath(context.extensionUri, "resources", "icon-dark.png"),
      };

      webviewPanel.onDidDispose(async () => {
        resourcesExplorer.clear();
        testsExplorer.clear();
        webviewPanel = undefined;
        activeInstanceId = undefined;
      });
      logger.show();
    }

    if (activeInstanceId !== instance.id) {
      webviewPanel.title = `${instance.wingfile} - [console]`;
      webviewPanel.webview.html = `
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
          <iframe src="http://${instance.url}?layout=4"/>
        </body>
      </html>`;
    }

    explorerView = window.createTreeView("consoleExplorer", {
      treeDataProvider: resourcesExplorer,
    });

    testsExplorerView = window.createTreeView("consoleTestsExplorer", {
      treeDataProvider: testsExplorer,
    });

    context.subscriptions.push(webviewPanel, explorerView, testsExplorerView);

    const node = await resourcesExplorer.getChildren();
    if (node[0]?.id) {
      await explorerView?.reveal(new ResourceItem(node[0].id));
    }

    activeInstanceId = instanceId;
  };

  const closeInstance = async (instanceId: string) => {
    const instance = getInstance(instanceId);
    if (!instance) {
      return;
    }
    instance.client.close();
    instance.onDidClose();
    resourcesExplorer.clear();
    testsExplorer.clear();
    activeInstanceId = undefined;
    delete instances[instanceId];

    if (Object.keys(instances).length === 0) {
      webviewPanel?.dispose();
      webviewPanel = undefined;
    }
  };

  registerCommands();

  return {
    addInstance,
    getInstance,
    closeInstance,
    setActiveInstance,
    activeInstances: () => {
      return Object.keys(instances).length > 0;
    },
    getActiveInstanceId: () => {
      return activeInstanceId;
    },
  };
};
