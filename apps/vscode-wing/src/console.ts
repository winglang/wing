import { spawn } from "child_process";
import { log } from "console";
import path from "path";
import { Trace, createConsoleApp } from "@wingconsole/app";
import {
  ExtensionContext,
  WebviewPanel,
  Uri,
  ViewColumn,
  window,
  workspace,
} from "vscode";
import { getWingBinAndArgs } from "./bin-helper";
import { VIEW_TYPE_CONSOLE } from "./constants";

const getLogger = ({ show = false }) => {
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

    const logger = getLogger({ show: true });

    const { port, close } = await createConsoleApp({
      wingfile: uri.fsPath,
      hostUtils: {
        openExternal: async (url: string) => {
          //await open(url);
        },
      },
      log: {
        info: (message: string) => {
          logger.appendLine(message);
        },
        error: (message: string) => {
          logger.appendLine(message);
        },
        verbose: (message: string) => {
          logger.appendLine(message);
        },
      },
    });

    const url = `http://localhost:${port}/?layout=2`;

    logger.appendLine(`Wing Console is running at ${url}`);

    logger.appendLine(`wingfile: ${wingfile}`);

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
          <iframe src="${url}/"/>
        </body>
      </html>`;
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
