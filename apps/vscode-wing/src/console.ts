import { exec } from "child_process";
import path from "path";
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

    const args = await getWingBinAndArgs(this.context);
    if (!args) {
      return;
    }

    const filename = path.basename(uri.fsPath);
    let panel: WebviewPanel;

    const cp = exec(`${args.join(" ")} it --no-open ${uri.fsPath}`, (err) => {
      if (err) {
        if (!err.killed) {
          void window.showErrorMessage(err.message);
        }

        panel?.dispose();
      }
    });
    cp.stdout?.once("data", (data) => {
      // get localhost url from stdout
      const url = data.toString().match(/http:\/\/localhost:\d+/);
      if (!url) {
        // there should be an error message in a different event
        return;
      }

      const port = parseInt(url[0].split(":")[2]);

      panel = window.createWebviewPanel(
        VIEW_TYPE_CONSOLE,
        `${filename} [Console]`,
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

      panel.onDidDispose(() => {
        delete this.consolePanels[uri.fsPath];
        this.activeConsolePanel = undefined;
        cp.kill();
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
        <body><iframe src="${url[0]}/"></iframe></body>
      </html>`;
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
