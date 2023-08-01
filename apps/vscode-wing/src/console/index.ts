import fetch from "node-fetch";
import open from "open";

export const { createConsoleApp } = importConsoleApp();

import type { CreateConsoleAppOptions } from "@wingconsole/app";

const globalAny = global as any;
globalAny.fetch = fetch;
globalAny.WebSocket = ws;

import { ExtensionContext, window, workspace, OutputChannel } from "vscode";
import ws from "ws";
import { ConsoleManager } from "./console-manager";
import { createClient } from "./services/client";
import { importConsoleApp } from "../bin-helper";

export class WingConsoleManager {
  consoleManager: ConsoleManager;

  logger: OutputChannel = window.createOutputChannel("Wing Console");

  constructor(public readonly context: ExtensionContext) {
    this.consoleManager = new ConsoleManager(this.context, this.logger);

    window.onDidChangeActiveTextEditor(async () => {
      if (this.consoleManager.getActiveInstanceId()) {
        await this.openConsole();
      }
    });

    workspace.onDidCloseTextDocument(async (textDocument) => {
      if (textDocument.languageId !== "wing") {
        return;
      }
      const instance = this.consoleManager?.getInstance(
        textDocument.uri.fsPath
      );
      if (instance) {
        this.log(`Closing Console instance '${instance.id}'`);
        await this.consoleManager.closeInstance(instance.id);
      }
    });
  }

  private log(message: string, type: string = "info") {
    this.logger.appendLine(`[${type}] ${message}`);
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
    const wingfile = document.uri.fsPath;

    if (this.consoleManager?.getInstance(wingfile)) {
      this.log(`Activating Console instance '${wingfile}'`);
      await this.consoleManager.setActiveInstance(wingfile);
      return;
    }

    const { port } = await createConsoleApp({
      wingfile,
      hostUtils: {
        openExternal: async (url: string) => {
          await open(url);
        },
      },
      log: {
        info: (message: string) => {
          this.log(message, "info");
        },
        error: (message: string) => {
          this.log(message, "error");
        },
        verbose: (message: string) => {
          this.log(message, "verbose");
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
    } as CreateConsoleAppOptions);

    const url = `localhost:${port}`;

    this.log(`Wing Console is running at ${url}`);
    await this.consoleManager.addInstance({
      id: wingfile,
      url,
      client: createClient(url),
    });
  }

  public async openFile() {
    const activePanelId = this.consoleManager?.getActiveInstanceId();
    if (activePanelId) {
      const document = await workspace.openTextDocument(activePanelId);

      await window.showTextDocument(document);
    }
  }
}
