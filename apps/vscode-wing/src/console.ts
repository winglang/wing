import path from "path";
import { createConsoleApp } from "@wingconsole/app";

import fetch from "node-fetch";

const globalAny = global as any;
globalAny.fetch = fetch;

import {
  ExtensionContext,
  WebviewPanel,
  Uri,
  ViewColumn,
  window,
  workspace,
  commands,
} from "vscode";
import { VIEW_TYPE_CONSOLE } from "./constants";

import { ResourcesExplorerProvider } from "./ResourcesExplorerProvider";
import { createTRPCClient } from "./services/trpc";
import { TestsExplorerProvider } from "./TestsExplorerProvider";
import { log } from "console";

const createLogger = ({ show = false }) => {
  const logger = window.createOutputChannel("Wing Console");
  logger.show(show);
  return logger;
};

export class WingConsoleManager {
  consolePanels: Record<string, WebviewPanel> = {};
  activeConsolePanel: string | undefined;

  constructor(public readonly context: ExtensionContext) {}

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

    const existingPanel = this.consolePanels[uri.fsPath];
    if (existingPanel) {
      existingPanel.reveal();
      return;
    }

    const wingfile = path.basename(uri.fsPath);
    let panel: WebviewPanel;

    const logger = createLogger({ show: true });

    const { port, close } = await createConsoleApp({
      wingfile: uri.fsPath,
      hostUtils: {
        openExternal: async (url: string) => {
          //await open(url);
        },
      },
      // log: {
      //   info: (message: string) => {
      //     logger.appendLine(message);
      //   },
      //   error: (message: string) => {
      //     logger.appendLine(message);
      //   },
      //   verbose: (message: string) => {
      //     logger.appendLine(message);
      //   },
      // },
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

    const url = `http://localhost:${port}`;

    const client = createTRPCClient(url);

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

    this.consolePanels[uri.fsPath] = panel;
    this.activeConsolePanel = uri.fsPath;
    panel.onDidChangeViewState(() => {
      if (panel.active) {
        this.activeConsolePanel = uri.fsPath;
      } else if (this.activeConsolePanel === uri.fsPath) {
        this.activeConsolePanel = undefined;
      }
    });

    panel.onDidDispose(async () => {
      delete this.consolePanels[uri.fsPath];
      this.activeConsolePanel = undefined;
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
          <iframe src="${url}"/>
        </body>
      </html>`;

    const tree = await client["app.explorerTree"].query();
    const selectedNode = await client["app.selectedNode"].query();

    logger.appendLine(`Selected node ${selectedNode}`);
    const tests = await client["test.list"].query();

    commands.registerCommand("wingConsole.openResource", async (resourceId) => {
      logger.appendLine(`Selecting resource ${resourceId}`);

      await client["app.selectNode"].mutate({
        path: resourceId,
      });
    });

    window.registerTreeDataProvider(
      "consoleExplorer",
      new ResourcesExplorerProvider(tree)
    );

    window.registerTreeDataProvider(
      "consoleTestsExplorer",
      new TestsExplorerProvider(tests)
    );
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
