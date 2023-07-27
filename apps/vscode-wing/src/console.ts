import path from "path";
import { createConsoleApp } from "@wingconsole/app";

import fetch from "node-fetch";
import ws from "ws";

const globalAny = global as any;
globalAny.fetch = fetch;
globalAny.WebSocket = ws;

import {
  ExtensionContext,
  WebviewPanel,
  Uri,
  ViewColumn,
  window,
  workspace,
  commands,
  Disposable,
  OutputChannel,
} from "vscode";
import { openResource } from "./commands/open-resource";
import { runTest } from "./commands/run-test";
import { VIEW_TYPE_CONSOLE } from "./constants";

import { ResourcesExplorerProvider } from "./ResourcesExplorerProvider";
import { Client, createTRPCClient } from "./services/trpc";
import { TestItem, TestsExplorerProvider } from "./TestsExplorerProvider";

const createLogger = ({ show = false }) => {
  const logger = window.createOutputChannel("Wing Console");
  logger.show(show);
  return logger;
};

export class WingConsoleManager {
  consolePanels: Record<
    string,
    {
      panel: WebviewPanel;
      url: string;
      logs: string[];
      tests: TestItem[];
    }
  > = {};

  consoleCommands: Record<string, Disposable> = {};

  activeConsolePanel: string | undefined;

  constructor(public readonly context: ExtensionContext) {}

  private registerCommands(id: string, callback: (...args: any[]) => any) {
    this.consoleCommands[id]?.dispose();

    const disposable = commands.registerCommand(id, callback);
    this.consoleCommands[id] = disposable;
  }

  public async openConsole() {
    // get the current active file
    const editor = window.activeTextEditor;
    if (!editor) {
      return;
    }
    const document = editor.document;
    if (document.languageId !== "wing") {
      return;
    }
    const uri = document.uri;

    let panel: WebviewPanel;
    let client: Client;
    const logger = createLogger({ show: true });
    let resourcesExplorer: ResourcesExplorerProvider;
    let testsExplorer: TestsExplorerProvider;

    const log = (type: string, message: string) => {
      const line = `[${type}] ${message}`;
      logger.appendLine(line);
      const logs = this.consolePanels[uri.fsPath]?.logs || [];

      if (!this.consolePanels[uri.fsPath]) {
        return;
      }
      // @ts-ignore
      this.consolePanels[uri.fsPath].logs = [...logs, line];
    };

    const existingPanel = this.consolePanels[uri.fsPath];

    if (existingPanel) {
      existingPanel.panel.reveal();
      return;
    }

    const wingfile = path.basename(uri.fsPath);

    const { port, close } = await createConsoleApp({
      wingfile: uri.fsPath,
      hostUtils: {
        openExternal: async (url: string) => {
          //await open(url);
        },
      },
      log: {
        info: (message: string) => {
          log("info", message);
        },
        error: (message: string) => {
          log("error", message);
        },
        verbose: (message: string) => {
          log("verbose", message);
        },
      },
      layoutConfig: {
        header: {
          hide: true,
        },
        leftPanel: {
          hide: true,
        },
        bottomPanel: {
          hide: true,
        },
        statusBar: {
          showThemeToggle: true,
        },
      },
    });

    const url = `localhost:${port}`;

    client = createTRPCClient(url);

    logger.appendLine(`Wing Console is running at ${url}`);

    panel = window.createWebviewPanel(
      VIEW_TYPE_CONSOLE,
      `${wingfile} [Console]`,
      ViewColumn.Beside,
      {
        enableScripts: true,
        enableCommandUris: true,
        portMapping: [{ webviewPort: port, extensionHostPort: port }],
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

    this.consolePanels[uri.fsPath] = {
      panel: panel,
      url: url,
      logs: [],
      tests: [],
    };
    this.activeConsolePanel = uri.fsPath;

    panel.onDidChangeViewState(async () => {
      if (panel.active) {
        this.activeConsolePanel = uri.fsPath;
      } else if (this.activeConsolePanel === uri.fsPath) {
        this.activeConsolePanel = undefined;
      }
    });

    panel.onDidDispose(async () => {
      delete this.consolePanels[uri.fsPath];
      this.activeConsolePanel = undefined;

      Object.keys(this.consoleCommands).forEach((key) => {
        if (this.consoleCommands?.[key]) {
          this.consoleCommands[key]?.dispose();
        }
      });

      await close();
    });
    panel.webview.html = `\
      <!DOCTYPE html>
        <html lang="en"">
        <head>
            <meta charset="UTF-8">
            <style>
              body { margin: 0; padding: 0; }
              iframe { display: block; height: 100vh; width: 100vw; border: none; }
            </style>
        </head>
        <body>
          <iframe src="http://${url}"/>
        </body>
      </html>`;

    resourcesExplorer = new ResourcesExplorerProvider(
      await client.listResources()
    );
    testsExplorer = new TestsExplorerProvider(await client.listTests());

    window.createTreeView("consoleExplorer", {
      treeDataProvider: resourcesExplorer,
    });

    window.createTreeView("consoleTestsExplorer", {
      treeDataProvider: testsExplorer,
    });

    client.onInvalidateQuery({
      onData: async () => {
        resourcesExplorer.update(await client.listResources());
        testsExplorer.update(await client.listTests());
      },
      onError: (err) => {
        logger.appendLine(err);
      },
    });

    this.registerCommands("wingConsole.openResource", async (resourceId) => {
      await openResource(client, resourceId);
    });

    this.registerCommands("wingConsole.runTest", async (test: TestItem) => {
      await runTest(client, test, testsExplorer);
      if (this.consolePanels[uri.fsPath]) {
        // @ts-ignore
        this.consolePanels[uri.fsPath].tests = testsExplorer.getTests();
      }
    });

    window.onDidChangeActiveTextEditor(async (activeEditor) => {
      if (!activeEditor) {
        return;
      }
      const activeDocument = activeEditor.document;
      if (activeDocument.languageId === "wing") {
        const activeUri = activeDocument.uri;
        const panelExists = this.consolePanels[activeUri.fsPath];
        if (!panelExists) {
          return;
        }
        panelExists.panel.reveal();
        client?.close();
        client = createTRPCClient(panelExists.url);

        logger.clear();
        panelExists.logs?.forEach((line) => {
          logger.appendLine(line);
        });

        resourcesExplorer.update(await client.listResources());
        testsExplorer.update(
          this.consolePanels[uri.fsPath]?.tests || (await client.listTests())
        );
        client.onInvalidateQuery({
          onData: async () => {
            resourcesExplorer.update(await client.listResources());
            testsExplorer.update(await client.listTests());
          },
          onError: (err) => {
            logger.appendLine(err);
          },
        });
      }
    });
  }

  public async openFile() {
    if (this.activeConsolePanel) {
      const document = await workspace.openTextDocument(
        this.activeConsolePanel
      );

      await window.showTextDocument(document);
    }
  }
}
