import {
  window,
  WebviewPanel,
  commands,
  TreeView,
  ViewColumn,
  Uri,
  ExtensionContext,
  Position,
  Range,
} from "vscode";

import {
  EndpointItem,
  EndpointsExplorerProvider,
} from "./explorer-providers/EndpointsExplorerProvider";
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
import { Loggers } from "../logging";

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
  stopAll: () => Promise<void>;
}

export const createConsoleManager = (
  context: ExtensionContext,
): ConsoleManager => {
  const instances: Record<string, ConsoleInstance> = {};
  const resourcesExplorer = new ResourcesExplorerProvider();
  const testsExplorer = new TestsExplorerProvider();
  const endpointsExplorer = new EndpointsExplorerProvider();

  let activeInstanceId: string | undefined;
  let webviewPanel: WebviewPanel | undefined;
  let explorerView: TreeView<ResourceItem> | undefined;
  let testsExplorerView: TreeView<TestItem> | undefined;
  let endpointsExplorerView: TreeView<EndpointItem> | undefined;

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
        }),
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
        }),
      );
      await activePanel.client.runAllTests();
    });
  };

  const updateLogs = async (instance: ConsoleInstance) => {
    const logs = await instance.client.getLogs({ time: logsTimestamp });

    logs.forEach((log) => {
      Loggers.console.appendLine(`[${log.level}] ${log.message}`);
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
    Loggers.console.appendLine(
      `Wing Console is running at http://${instance.url}`,
    );

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
          endpointsExplorer.update(await instance.client.listEndpoints());
        }, 300);
      },
      onError: (err) => {
        Loggers.console.appendLine(err);
      },
    });

    instance.client.onOpenFileInEditor({
      onData: async (data) => {
        const path = data?.path;
        const line = data?.line - 1 || 0;
        const column = data?.column || 0;

        const openEditor = window.visibleTextEditors.find((editor) => {
          return editor.document.uri.fsPath === path;
        });

        if (!openEditor || !openEditor.viewColumn) {
          await commands.executeCommand(
            "vscode.open",
            Uri.file(path),
            new Position(line, column),
          );
          return;
        }

        await commands.executeCommand("workbench.action.focusFirstEditorGroup");
        for (let i = 0; i < openEditor.viewColumn - 1; i++) {
          await commands.executeCommand("workbench.action.focusNextGroup");
        }
        await window.showTextDocument(openEditor.document, {
          selection: new Range(
            new Position(line, column),
            new Position(line, column),
          ),
        });
      },
      onError: (err) => {
        Loggers.console.appendLine(err);
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
        },
      );

      webviewPanel.iconPath = {
        light: Uri.joinPath(
          context.extensionUri,
          "resources",
          "icon-light.svg",
        ),
        dark: Uri.joinPath(context.extensionUri, "resources", "icon-dark.svg"),
      };

      webviewPanel.onDidDispose(async () => {
        resourcesExplorer.clear();
        testsExplorer.clear();
        endpointsExplorer.clear();
        webviewPanel = undefined;
        activeInstanceId = undefined;

        Object.keys(instances).forEach(async (id) => {
          await closeInstance(id);
        });
      });
      Loggers.console.show();
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

          // Used to force reload the iframe
          const time = "${Date.now()}";

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
    endpointsExplorer.update(await instance.client.listEndpoints());
    await updateLogs(instance);

    explorerView = window.createTreeView("consoleExplorer", {
      treeDataProvider: resourcesExplorer,
    });

    testsExplorerView = window.createTreeView("consoleTestsExplorer", {
      treeDataProvider: testsExplorer,
    });

    endpointsExplorerView = window.createTreeView("consoleEndpointsExplorer", {
      treeDataProvider: endpointsExplorer,
    });

    context.subscriptions.push(
      webviewPanel,
      explorerView,
      testsExplorerView,
      endpointsExplorerView,
    );
    activeInstanceId = instanceId;
  };

  const closeInstance = async (instanceId: string) => {
    const instance = getInstance(instanceId);
    if (!instance) {
      return;
    }
    Loggers.console.appendLine(
      `Closing Console instance: '${instance.wingfile}'`,
    );

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
    stopAll: async () => {
      Object.keys(instances).forEach(async (id) => {
        await closeInstance(id);
      });
    },
  };
};
