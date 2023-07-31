import path from "path";
import { createConsoleApp } from "@wingconsole/app";

import fetch from "node-fetch";
import ws from "ws";
import open from "open";

const globalAny = global as any;
globalAny.fetch = fetch;
globalAny.WebSocket = ws;

import { ExtensionContext, window, workspace, OutputChannel } from "vscode";
import { ConsoleManager } from "./console-manager";
import { createTRPCClient } from "./services/trpc";

export class WingConsoleManager {
  consoleManager: ConsoleManager;

  logger: OutputChannel = window.createOutputChannel("Wing Console");

  constructor(public readonly context: ExtensionContext) {
    this.consoleManager = new ConsoleManager(this.context, this.logger);

    window.onDidChangeActiveTextEditor(async (textEditor) => {
      if (textEditor?.document?.languageId !== "wing") {
        return;
      }
      if (this.consoleManager.getActiveInstance()) {
        await this.openConsole();
      }
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

    if (this.consoleManager.getConsoleInstance(uri.fsPath)) {
      this.logger.appendLine(`Wing Console is already running`);
      await this.consoleManager.setActiveInstance(uri.fsPath);
      return;
    }

    const wingfile = path.basename(uri.fsPath);

    const { port } = await createConsoleApp({
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

    this.consoleManager.addInstance({
      id: uri.fsPath,
      wingfile,
      url,
      client: createTRPCClient(url),
    });

    await this.consoleManager.setActiveInstance(uri.fsPath);
  }

  public async openFile() {
    const activePanelId = this.consoleManager?.getActiveInstanceId();
    if (activePanelId) {
      const document = await workspace.openTextDocument(activePanelId);

      await window.showTextDocument(document);
    }
  }
}
