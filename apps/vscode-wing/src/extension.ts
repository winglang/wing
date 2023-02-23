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

const CFG_WING = "wing";
const CFG_WING_BIN = `${CFG_WING}.bin`;

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

/**
 * Get the absolute location of the wing executable
 *
 * @param command The command to search for, defaults to "wing"
 * @returns The absolute path to the wing executable, or null if not found/installed
 */
function wingBinaryLocation(command?: string) {
  return which.sync(command ?? "wing", { nothrow: true });
}
