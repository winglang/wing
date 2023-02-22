import { execSync } from "child_process";
import { env } from "process";
import { ExtensionContext, window, workspace } from "vscode";
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
    .getConfiguration()
    .get<string>(CFG_WING_BIN, "npx");
  let wingBin = env.WING_BIN ?? configuredWingBin;

  if (wingBin !== "npx") {
    // check if wing is installed
    const result = await which(wingBin, { nothrow: true });
    if (!result) {
      const npmInstallOption = `Install globally with npm`;
      const npxOption = `Use npx (not recommended)`;
      const choice = await window.showWarningMessage(
        `"${wingBin}" is not in PATH, please choose one of the following options to use the Wing language server`,
        npmInstallOption,
        npxOption
      );

      if (choice === npmInstallOption) {
        execSync(`npm install -g winglang@${extVersion}`);
        void window.showInformationMessage(
          `Wing v${extVersion} has been installed!`
        );
        wingBin = "wing";
      } else if (choice === npxOption) {
        wingBin = "npx";
      } else {
        // User decided to ignore the warning
        return;
      }
    } else {
      wingBin = result;
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
