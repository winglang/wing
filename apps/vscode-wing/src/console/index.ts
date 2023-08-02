import { spawn } from "child_process";
import path from "path";
import fetch from "node-fetch";

const globalAny = global as any;
globalAny.fetch = fetch;
globalAny.WebSocket = ws;

import { ExtensionContext, window, workspace, OutputChannel } from "vscode";
import ws from "ws";
import { type ConsoleManager, createConsoleManager } from "./console-manager";
import { createClient } from "./services/client";
import { getWingBinAndArgs } from "../bin-helper";

export class WingConsoleManager {
  consoleManager: ConsoleManager;

  logger: OutputChannel = window.createOutputChannel("Wing Console");

  constructor(public readonly context: ExtensionContext) {
    this.consoleManager = createConsoleManager(this.context, this.logger);

    window.onDidChangeActiveTextEditor(async () => {
      if (this.consoleManager.activeInstances()) {
        await this.openConsole();
      }
    });

    workspace.onDidCloseTextDocument(async (textDocument) => {
      if (textDocument.languageId !== "wing") {
        return;
      }
      const instance = this.consoleManager.getInstance(textDocument.uri.fsPath);
      if (instance) {
        this.log(`Closing Console instance: '${instance.wingfile}'`);
        this.consoleManager.closeInstance(instance.id);
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
    const wingfilePath = document.uri.fsPath;
    const wingfile = path.basename(wingfilePath);

    if (this.consoleManager.getInstance(wingfilePath)) {
      await this.consoleManager.setActiveInstance(wingfilePath);
      return;
    }

    const args = await getWingBinAndArgs(this.context);
    if (!args) {
      return;
    }

    args.push("it", "--no-open", wingfilePath);

    const cp = spawn(args[0]!, args.slice(1), {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
      shell: false,
    });

    cp.on("error", async (err) => {
      if (err) {
        await this.consoleManager.closeInstance(wingfilePath);
      }
    });
    cp.stdout?.once("data", async (data) => {
      // get localhost url from stdout
      const urlMatch = data.toString().match(/localhost:\d+/);
      if (!urlMatch) {
        // there should be an error message in a different event
        return;
      }
      const url = urlMatch[0];

      this.log(`Wing Console is running at ${url}`);
      await this.consoleManager.addInstance({
        id: wingfilePath,
        wingfile,
        url,
        client: createClient(url),
        onDidClose: () => {
          cp.kill();
        },
      });
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
