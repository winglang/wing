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
import { runAllTests } from "./commands/run-all-test";
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

export interface ConsolePanel {
  panel: WebviewPanel;
  client: Client;
}
export class WingConsoleManager {
  consolePanels: Record<string, ConsolePanel> = {};

  consoleCommands: Record<string, Disposable> = {};

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

    window.onDidChangeActiveTextEditor(async (textEditor) => {
      if (textEditor?.document?.languageId !== "wing") {
        return;
      }
      await this.loadConsolePanel(textEditor?.document.uri.fsPath);
    });

    workspace.onDidCloseTextDocument(async (textDocument) => {
      if (textDocument.languageId !== "wing") {
        return;
      }
      this.closeConsolePanel(textDocument.uri.fsPath);
    });

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

  private addConsolePanel(id: string, consolePanel: ConsolePanel) {
    consolePanel.client.onInvalidateQuery({
      onData: async () => {
        if (this.activeConsolePanel !== id) {
          return;
        }

        this.resourcesExplorer.update(
          await consolePanel.client.listResources()
        );
        this.testsExplorer.update(await consolePanel.client.listTests());
      },
      onError: (err) => {
        this.logger.appendLine(err);
      },
    });
    this.consolePanels[id] = consolePanel;
  }

  private getConsolePanel(panelId: string): ConsolePanel | undefined {
    return this.consolePanels[panelId];
  }

  private getActiveConsolePanel(): ConsolePanel | undefined {
    if (!this.activeConsolePanel) {
      return;
    }
    const activePanel = this.consolePanels[this.activeConsolePanel];
    if (!activePanel) {
      return;
    }
    return activePanel;
  }

  private async loadConsolePanel(panelId: string) {
    const activePanel = this.consolePanels[panelId];
    if (!activePanel) {
      return;
    }

    if (this.activeConsolePanel !== panelId) {
      activePanel.panel.reveal();
      this.activeConsolePanel = panelId;
    }
    this.resourcesExplorer.update(await activePanel.client.listResources());
    this.testsExplorer.update(await activePanel.client.listTests());
  }

  private closeConsolePanel(panelId: string) {
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

  public async openConsole() {
    this.logger.appendLine("Opening Wing Console");
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

    const log = (type: string, message: string) => {
      this.logger.appendLine(`[${type}] ${message}`);
    };

    if (this.getConsolePanel(uri.fsPath)) {
      this.logger.appendLine(`Wing Console is already running`);
      await this.loadConsolePanel(uri.fsPath);
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

    const panel: WebviewPanel = window.createWebviewPanel(
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

    panel.onDidChangeViewState(async () => {
      if (panel.active) {
        await this.loadConsolePanel(uri.fsPath);
      }
    });

    panel.onDidDispose(async () => {
      await close();
      this.closeConsolePanel(uri.fsPath);
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

    const client = createTRPCClient(url);
    this.addConsolePanel(uri.fsPath, {
      panel: panel,
      client: client,
    });
    await this.loadConsolePanel(uri.fsPath);
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
