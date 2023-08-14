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

  let timeout: NodeJS.Timeout | undefined;
  let logsTimestamp: number = 0;

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

  const updateLogs = async (instance: ConsoleInstance) => {
    const logs = await instance.client.getLogs({ time: logsTimestamp });

    logs.forEach((log) => {
      logger.appendLine(`[${log.level}] ${log.message}`);
    });
    logsTimestamp = Date.now();
  };

  const getTheme = () => {
    const theme = window.activeColorTheme.kind;
    if (theme === 1) {
      return "light";
    }
    return "dark";
  };

  const getInstance = (instanceId: string) => {
    if (!instanceId) {
      return;
    }
    return instances[instanceId];
  };

  const addInstance = async (instance: ConsoleInstance) => {
    logger.appendLine(`Wing Console is running at http://${instance.url}`);

    instance.client.onInvalidateQuery({
      onData: async (key) => {
        if (activeInstanceId !== instance.id) {
          return;
        }
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(async () => {
          if (!key || key === "app.logs") {
            await updateLogs(instance);
          }
          resourcesExplorer.update(await instance.client.listResources());
          testsExplorer.update(await instance.client.listTests());
        }, 300);
      },
      onError: (err) => {
        logger.appendLine(err);
      },
    });
    instances[instance.id] = instance;

    await setActiveInstance(instance.id);
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

        Object.keys(instances).forEach(async (id) => {
          await closeInstance(id);
        });
      });
      logger.show();
    }

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
        <script>
          const instanceUrl = "${instance.url}";
          const layout = 4;
          const theme = "${getTheme()}";
          const t = "${Date.now()}";
          const color = getComputedStyle(document.documentElement).getPropertyValue('--vscode-menu-background').replace("#", "");
          document.addEventListener('DOMContentLoaded', () => {
            const iframe = document.querySelector('iframe');
            const iframeSrc = \`http://\${instanceUrl}?layout=\${layout}&theme=\${theme}&color=\${color}\`;
            iframe.src = iframeSrc;
          });
      </script>
      <body>
        <iframe src=""/>
      </body>
      </html>`;

    resourcesExplorer.update(await instance.client.listResources());
    testsExplorer.update(await instance.client.listTests());
    await updateLogs(instance);

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
    logger.appendLine(`Closing Console instance: '${instance.wingfile}'`);

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
