import { env } from "process";
import { ExtensionContext } from "vscode";
import {
  Executable,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

const LANGUAGE_SERVER_NAME = "Wing Language Server";
const LANGUAGE_SERVER_ID = "wing-language-server";

let client: LanguageClient;

export function deactivate() {
  return client?.stop();
}

export async function activate(context: ExtensionContext) {
  await startLanguageServer(context);
}

async function startLanguageServer(context: ExtensionContext) {
  // Allow the user to override the path, otherwise just use npx
  const wingBin = env.WING_BIN ?? "npx";
  const args = env.WING_BIN
    ? ["lsp"]
    : ["-y", "-q", `winglang@${context.extension.packageJSON.version}`, "lsp"];

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
