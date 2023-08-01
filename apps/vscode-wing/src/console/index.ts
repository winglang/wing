import { execSync } from "child_process";
import path from "path";

import fetch from "node-fetch";
import open from "open";

const getConsoleAppPath = () => {
  return path.resolve(execSync("wing console-app-path").toString().trim());
};

let createConsoleApp: any;

import(getConsoleAppPath())
  .then((consoleModule) => {
    const { createConsoleApp: absolutePath } = consoleModule;
    createConsoleApp = absolutePath;
  })
  .catch((err) => {
    console.error("Error importing the console module:", err);
  });

const globalAny = global as any;
globalAny.fetch = fetch;
globalAny.WebSocket = ws;

import { ExtensionContext, window, workspace, OutputChannel } from "vscode";
import ws from "ws";
import { ConsoleManager } from "./console-manager";
import { createClient } from "./services/client";

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
        this.log(`Closing Console instance '${instance.wingfile}'`);
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
    const instanceId = document.uri.fsPath;

    const instance = this.consoleManager?.getInstance(instanceId);
    if (instance) {
      this.log(`Opening existing Console instance for'${instance.wingfile}'`);
      await this.consoleManager.setActiveInstance(instanceId);
      return;
    }

    const wingfile = path.basename(instanceId);

    this.log(`Creating a new Console instance for '${wingfile}'`);
    const { port } = await createConsoleApp({
      wingfile: instanceId,
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
    });

    const url = `localhost:${port}`;

    this.log(`Wing Console is running at ${url}`);
    await this.consoleManager.addInstance({
      id: instanceId,
      wingfile,
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
