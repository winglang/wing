import { exec } from "child_process";
import path from "path";
import { env } from "process";
import {
  commands,
  ExtensionContext,
  languages,
  ProgressLocation,
  StatusBarItem,
  Uri,
  ViewColumn,
  WebviewPanel,
  window,
  workspace,
} from "vscode";
import {
  Executable,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";
import which from "which";

const LANGUAGE_SERVER_NAME = "Wing Language Server";
const LANGUAGE_SERVER_ID = "wing-language-server";

const CFG_WING = "wing";
const CFG_WING_BIN = `${CFG_WING}.bin`;

let client: LanguageClient;
let STATUS_BAR_ITEM: StatusBarItem;

export function deactivate() {
  return client?.stop();
}

export async function activate(context: ExtensionContext) {
  // For some reason, the word pattern is not set correctly by the language config file
  // https://github.com/microsoft/vscode/issues/42649
  languages.setLanguageConfiguration("wing", {
    wordPattern: /([a-zA-Z_$][A-Za-z_$0-9]*)/,
  });

  await startLanguageServer(context);

  const consolePanels: Record<string, WebviewPanel> = {};
  let activeConsolePanel: string | undefined;

  // add command to preview wing files
  context.subscriptions.push(
    commands.registerCommand("wing.openFile", async () => {
      if (activeConsolePanel) {
        const document = await workspace.openTextDocument(activeConsolePanel);

        await window.showTextDocument(document);
      }
    }),
    commands.registerCommand("wing.openConsole", async () => {
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

      const existingPanel = consolePanels[uri.fsPath];
      if (existingPanel) {
        existingPanel.reveal();
        return;
      }

      const args = await getWingBinAndArgs(context);
      if (!args) {
        return;
      }

      // get random unused port
      const port = await new Promise<number>((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const server = require("net").createServer();
        server.listen(0, () => {
          const p = server.address()?.port;
          if (p) {
            server.close(() => {
              resolve(p);
            });
          } else {
            reject("No port found");
          }
        });
      });

      const filename = path.basename(uri.fsPath);
      let panel: WebviewPanel;

      const cp = exec(
        `${args.join(" ")} it --port ${port} --no-open ${uri.fsPath}`,
        (err) => {
          if (err) {
            if (!err.killed) {
              void window.showErrorMessage(err.message);
            }

            panel?.dispose();
          }
        }
      );
      cp.stdout?.once("data", () => {
        panel = window.createWebviewPanel(
          "wing.console",
          `${filename} [Console]`,
          ViewColumn.One,
          {
            enableScripts: true,
            enableCommandUris: true,
            portMapping: [{ webviewPort: port, extensionHostPort: port }],
          }
        );
        panel.iconPath = {
          light: Uri.joinPath(
            context.extensionUri,
            "resources",
            "icon-light.png"
          ),
          dark: Uri.joinPath(
            context.extensionUri,
            "resources",
            "icon-dark.png"
          ),
        };

        consolePanels[uri.fsPath] = panel;
        activeConsolePanel = uri.fsPath;
        panel.onDidChangeViewState(() => {
          if (panel.active) {
            activeConsolePanel = uri.fsPath;
          } else if (activeConsolePanel === uri.fsPath) {
            activeConsolePanel = undefined;
          }
        });

        panel.onDidDispose(() => {
          delete consolePanels[uri.fsPath];
          activeConsolePanel = undefined;
          cp.kill();
        });
        panel.webview.html = `<!DOCTYPE html>
        <html lang="en"">
        <head>
            <meta charset="UTF-8">
            <style>
              body {
                  margin: 0; /* Remove default margin */
                  padding: 0; /* Remove default padding */
              }
              iframe {      
                  display: block;  /* iframes are inline by default */   
                  height: 100vh;  /* Set height to 100% of the viewport height */   
                  width: 100vw;  /* Set width to 100% of the viewport width */     
                  border: none; /* Remove default border */
              }
            </style>
        </head>
        <body><iframe src="http://localhost:${port}/"></iframe></body>
        </html>`;
      });
    })
  );
}

async function startLanguageServer(context: ExtensionContext) {
  const args = await getWingBinAndArgs(context);

  if (!args) {
    // User doesn't have wing and doesn't want to install it yet
    return;
  }

  args.push("lsp");

  const run: Executable = {
    command: args[0]!,
    args: args.slice(1),
    options: {
      env: {
        ...process.env,
      },
    },
  };
  const serverOptions: ServerOptions = {
    run,
    debug: run,
  };
  let clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "wing", pattern: "**/*.w" }],
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    LANGUAGE_SERVER_ID,
    LANGUAGE_SERVER_NAME,
    serverOptions,
    clientOptions
  );

  await client.start();
}

/**
 * Install wing globally using npm if desired by the user
 *
 * @returns "wing" if wing is successfully installed, "npx" otherwise
 */
async function guidedWingInstallation(version: string) {
  return window.withProgress(
    {
      location: ProgressLocation.Notification,
      cancellable: false,
    },
    async (progress) => {
      progress.report({ message: `Installing Wing v${version}...` });
      return new Promise((resolve, reject) => {
        exec(`npm install -g winglang@${version}`, (error, stdout) => {
          if (error) {
            reject(error);
          } else {
            resolve(stdout);
          }
        });
      })
        .then(() => {
          void window.showInformationMessage(
            `Wing v${version} has been installed!`
          );
          return "wing";
        })
        .catch((e) => {
          void window.showErrorMessage(
            `Failed to install Wing v${version}: ${e}`
          );
          return "npx";
        });
    }
  );
}

async function updateStatusBar(wingBin: string, args?: string[]) {
  let clean_args = args ? [...args] : [];
  clean_args.push("-V");

  // get current wing version
  const version = await new Promise<string>((resolve, reject) => {
    exec(`${wingBin} ${clean_args.join(" ")}`, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  }).catch(() => "unknown");

  if (version === "unknown") {
    return;
  }

  // update status bar
  const status = `Wing v${version}`;
  if (!STATUS_BAR_ITEM) {
    STATUS_BAR_ITEM = window.createStatusBarItem();
  }

  STATUS_BAR_ITEM.text = status;
  STATUS_BAR_ITEM.show();
}

async function getWingBinAndArgs(context: ExtensionContext) {
  const extVersion = context.extension.packageJSON.version;
  const configuredWingBin = workspace
    .getConfiguration(CFG_WING)
    .get<string>(CFG_WING_BIN, "wing");
  let wingBin = env.WING_BIN ?? configuredWingBin;

  if (wingBin !== "npx") {
    const result = wingBinaryLocation(wingBin);
    if (!result) {
      const npmInstallOption = `Install globally with npm`;
      const choice = await window.showWarningMessage(
        `"${wingBin}" is not in PATH, please choose one of the following options to use the Wing language server`,
        npmInstallOption
      );

      if (choice === npmInstallOption) {
        wingBin = await guidedWingInstallation(extVersion);
      } else {
        // User decided to ignore the warning
        return;
      }
    }
  }

  const args =
    wingBin === "npx"
      ? ["-y", "-q", `winglang@${extVersion}`, "--no-update-check"]
      : ["--no-update-check"];

  await updateStatusBar(wingBin, args);

  return [wingBin, ...args];
}

/**
 * Get the absolute location of the wing executable
 *
 * @param command The command to search for, defaults to "wing"
 * @returns The absolute path to the wing executable, or null if not found/installed
 */
function wingBinaryLocation(command?: string) {
  return which.sync(command ?? "wing", { nothrow: true });
}
