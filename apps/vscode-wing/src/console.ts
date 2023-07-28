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
      tests: TestItem[];
    }
  > = {};

  consoleCommands: Record<string, Disposable> = {};

  client: Client | undefined;

  logger: OutputChannel = createLogger({ show: true });

  resourcesExplorer: ResourcesExplorerProvider =
    new ResourcesExplorerProvider();

  testsExplorer: TestsExplorerProvider = new TestsExplorerProvider();

  activeConsolePanel: string | undefined;

  constructor(public readonly context: ExtensionContext) {
    window.createTreeView("consoleExplorer", {
      treeDataProvider: this.resourcesExplorer,
    });

    window.createTreeView("consoleTestsExplorer", {
      treeDataProvider: this.testsExplorer,
    });
  }

  private registerCommand(id: string, callback: (...args: any[]) => any) {
    this.consoleCommands[id]?.dispose();

    const disposable = commands.registerCommand(id, callback);
    this.consoleCommands[id] = disposable;
  }

  private async setupActivePanel(panelId: string) {
    const activePanel = this.consolePanels[panelId];
    if (!activePanel) {
      return;
    }

    if (this.activeConsolePanel !== panelId) {
      activePanel.panel.reveal();
      this.activeConsolePanel = panelId;
    }

    const url = activePanel.url;

    this.client?.close();
    this.client = createTRPCClient(url);

    const client = this.client;
    this.resourcesExplorer.update(await client.listResources());
    this.testsExplorer.update(await client.listTests());

    client.onInvalidateQuery({
      onData: async () => {
        this.resourcesExplorer.update(await client.listResources());
        this.testsExplorer.update(await client.listTests());
      },
      onError: (err) => {
        this.logger.appendLine(err);
      },
    });

    this.registerCommand("wingConsole.openResource", async (resourceId) => {
      await openResource(client, resourceId);
    });

    this.registerCommand("wingConsole.runTest", async (test: TestItem) => {
      await runTest(client, test, this.testsExplorer);
      if (this.consolePanels[panelId]) {
        // @ts-ignore-next-line
        this.consolePanels[panelId].tests = this.testsExplorer.getTests();
      }
    });
  }

  private closePanel(panelId: string) {
    const activePanel = this.consolePanels[panelId];
    if (!activePanel) {
      return;
    }
    delete this.consolePanels[panelId];
    activePanel.panel.dispose();

    if (this.activeConsolePanel === panelId) {
      this.activeConsolePanel = undefined;
    }
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

    const log = (type: string, message: string) => {
      this.logger.appendLine(`[${type}] ${message}`);
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

    this.logger.appendLine(`Wing Console is running at ${url}`);

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
      tests: [],
    };
    this.activeConsolePanel = uri.fsPath;

    panel.onDidChangeViewState(async () => {
      if (panel.active) {
        await this.setupActivePanel(uri.fsPath);
      } else if (this.activeConsolePanel === uri.fsPath) {
        this.activeConsolePanel = undefined;
      }
    });

    panel.onDidDispose(async () => {
      await close();
      this.closePanel(uri.fsPath);
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

    await this.setupActivePanel(uri.fsPath);

    window.onDidChangeActiveTextEditor(async (textEditor) => {
      if (textEditor?.document?.languageId !== "wing") {
        return;
      }
      await this.setupActivePanel(textEditor?.document.uri.fsPath);
    });

    workspace.onDidCloseTextDocument(async (textDocument) => {
      if (textDocument.languageId !== "wing") {
        return;
      }
      this.closePanel(textDocument.uri.fsPath);
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
