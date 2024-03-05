import { execSync, spawn } from "child_process";
import path from "path";
import fetch from "node-fetch";

const globalAny = global as any;
globalAny.fetch = fetch;
globalAny.WebSocket = ws;

import { ExtensionContext, window, workspace } from "vscode";
import ws from "ws";
import { type ConsoleManager, createConsoleManager } from "./console-manager";
import { createClient } from "./services/client";
import { Loggers } from "../logging";

export class WingConsoleManager {
  consoleManager: ConsoleManager;

  wingBin: string | undefined;

  constructor(public readonly context: ExtensionContext) {
    this.consoleManager = createConsoleManager(this.context);

    window.onDidChangeActiveTextEditor(async (editor) => {
      const instanceId = editor?.document.uri.fsPath;
      if (
        this.consoleManager.activeInstances() &&
        this.consoleManager.getActiveInstanceId() !== instanceId
      ) {
        await this.openConsole();
      }
    });

    window.onDidChangeActiveColorTheme(async () => {
      const activeInstanceId = this.consoleManager.getActiveInstanceId();
      if (activeInstanceId) {
        await this.consoleManager.setActiveInstance(activeInstanceId);
      }
    });

    workspace.onDidCloseTextDocument(async (textDocument) => {
      if (textDocument.languageId !== "wing") {
        return;
      }
      const instance = this.consoleManager.getInstance(textDocument.uri.fsPath);
      if (instance) {
        this.consoleManager.closeInstance(instance.id);
      }
    });
  }

  public setWingBin(wingBin: string) {
    this.wingBin = wingBin;
  }

  public async stop() {
    await this.consoleManager.stopAll();
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

    // TODO: Use createConsoleApp from "bin-helper" instead of spawn to open the console after fixing after fixing https://github.com/winglang/wing/issues/3678
    if (!this.wingBin) {
      Loggers.default.appendLine(
        `Unable to open console: no wing binary found`
      );
      return;
    }
    const cp = spawn(
      this.wingBin,
      ["it", "--no-open", "--no-update-check", wingfilePath],
      {
        stdio: ["ignore", "pipe", "pipe"],
        windowsHide: true,
        shell: false,
        detached: process.platform !== "win32",
        env: {
          ...process.env,
          // Ask the Wing Console to not show the sign in prompt.
          NO_SIGN_IN: "true",
        },
      }
    );

    const onDidClose = () => {
      if (process.platform === "win32") {
        try {
          execSync(`taskkill /pid ${cp.pid} /T /F`);
        } catch (error) {
          Loggers.default.appendLine(
            `Failed to kill the process with taskkill: ${error}`
          );

          cp.kill();
        }
      } else {
        if (cp.pid) {
          process.kill(-cp.pid, "SIGTERM");
        }
      }
    };

    cp.on("error", async (err) => {
      Loggers.default.appendLine(err.toString());
      if (err) {
        Loggers.default.appendLine(`Wing Console Closed: ${err}`);
        this.consoleManager.closeInstance(wingfilePath);
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

      await this.consoleManager.addInstance({
        id: wingfilePath,
        wingfile,
        url,
        client: createClient(url),
        onDidClose,
      });
    });

    process.once("exit", onDidClose);
  }

  public async openFile() {
    const activePanelId = this.consoleManager?.getActiveInstanceId();
    if (activePanelId) {
      const document = await workspace.openTextDocument(activePanelId);

      await window.showTextDocument(document);
    }
  }
}
