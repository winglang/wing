import path from "path";
import { createConsoleApp } from "@wingconsole/app";

import fetch from "node-fetch";
import ws from "ws";
import open from "open";

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
  OutputChannel,
} from "vscode";
import { ResourcesExplorerProvider } from "./explorer-providers/ResourcesExplorerProvider";
import { TestsExplorerProvider } from "./explorer-providers/TestsExplorerProvider";
import { PanelsManager } from "./panels-manager";
import { createTRPCClient } from "./services/trpc";
import { VIEW_TYPE_CONSOLE } from "../constants";

export class WingConsoleManager {
  panelsManager: PanelsManager;

  logger: OutputChannel = window.createOutputChannel("Wing Console");

  constructor(public readonly context: ExtensionContext) {
    const resourcesExplorer = new ResourcesExplorerProvider();

    const testsExplorer = new TestsExplorerProvider();

    this.panelsManager = new PanelsManager(
      this.logger,
      resourcesExplorer,
      testsExplorer
    );

    window.createTreeView("consoleExplorer", {
      treeDataProvider: resourcesExplorer,
    });

    window.createTreeView("consoleTestsExplorer", {
      treeDataProvider: testsExplorer,
    });

    window.onDidChangeActiveTextEditor(async (textEditor) => {
      if (textEditor?.document?.languageId !== "wing") {
        return;
      }

      await this.panelsManager.setActiveConsolePanel(
        textEditor.document.uri.fsPath
      );

      // Use Console as a singleton
      // const currentPanel = this.panelsManager.getActiveConsolePanelId();
      // if (currentPanel) {
      //   this.panelsManager.closeConsolePanel(currentPanel);
      //   await this.openConsole();
      // }
    });

    workspace.onDidCloseTextDocument(async (textDocument) => {
      if (textDocument.languageId !== "wing") {
        return;
      }
      this.panelsManager.closeConsolePanel(textDocument.uri.fsPath);
    });
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

    if (this.panelsManager.getConsolePanel(uri.fsPath)) {
      this.logger.appendLine(`Wing Console is already running`);
      await this.panelsManager.setActiveConsolePanel(uri.fsPath);
      return;
    }

    const wingfile = path.basename(uri.fsPath);

    const { port, close } = await createConsoleApp({
      wingfile: uri.fsPath,
      hostUtils: {
        openExternal: async (url: string) => {
          await open(url);
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
        await this.panelsManager?.setActiveConsolePanel(uri.fsPath);
      }
    });

    panel.onDidDispose(async () => {
      await close();
      this.panelsManager?.closeConsolePanel(uri.fsPath);
    });

    panel.webview.html = `
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
          <iframe src="http://${url}"/>
        </body>
      </html>`;

    this.panelsManager.addConsolePanel({
      id: uri.fsPath,
      panel: panel,
      client: createTRPCClient(url),
    });

    await this.panelsManager.setActiveConsolePanel(uri.fsPath);
  }

  public async openFile() {
    const activePanel = this.panelsManager?.getActiveConsolePanelId();
    if (activePanel) {
      const document = await workspace.openTextDocument(activePanel);

      await window.showTextDocument(document);
    }
  }
}
