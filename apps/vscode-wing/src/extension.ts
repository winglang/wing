import { exec } from "child_process";
import { env } from "process";
import { ExtensionContext, ProgressLocation, window, workspace } from "vscode";
import {
  Executable,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";
import which from "which";

const LANGUAGE_SERVER_NAME = "Wing Language Server";
const LANGUAGE_SERVER_ID = "wing-language-server";

const CFG_WING_BIN = "wing.bin";

let client: LanguageClient;

export function deactivate() {
  return client?.stop();
}

export async function activate(context: ExtensionContext) {
  await startLanguageServer(context);
}

async function startLanguageServer(context: ExtensionContext) {
  const extVersion = context.extension.packageJSON.version;
  const configuredWingBin = workspace
    .getConfiguration("wing")
    .get<string>(CFG_WING_BIN, "wing");
  let wingBin = env.WING_BIN ?? configuredWingBin;

  if (wingBin !== "npx") {
    // check if wing is installed
    const result = which.sync(wingBin, { nothrow: true });
    if (!result) {
      const npmInstallOption = `Install globally with npm`;
      const choice = await window.showWarningMessage(
        `"${wingBin}" is not in PATH, please choose one of the following options to use the Wing language server`,
        npmInstallOption
      );

      if (choice === npmInstallOption) {
        await window.withProgress(
          {
            location: ProgressLocation.Notification,
            cancellable: false,
          },
          async (progress) => {
            progress.report({ message: `Installing Wing v${extVersion}...` });
            return new Promise((resolve, reject) => {
              exec(`npm install -g winglang@${extVersion}`, (error, stdout) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(stdout);
                }
              });
            })
              .then(() => {
                wingBin = "wing";
                void window.showInformationMessage(
                  `Wing v${extVersion} has been installed!`
                );
              })
              .catch((e) => {
                void window.showErrorMessage(
                  `Failed to install Wing v${extVersion}: ${e}`
                );
                wingBin = "npx";
              });
          }
        );
      } else {
        // User decided to ignore the warning
        return;
      }
    }
  }

  const args =
    wingBin === "npx" ? ["-y", "-q", `winglang@${extVersion}`, "lsp"] : ["lsp"];

  const run: Executable = {
    command: wingBin,
    args,
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
