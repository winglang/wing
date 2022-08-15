import {
  ExtensionContext,
  window,
} from "vscode";

import {
  Executable,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

const server_name = "Wing Language Server";
const server_id = "wing-language-server";

let client: LanguageClient;

export async function activate(_context: ExtensionContext) {

  const traceOutputChannel = window.createOutputChannel(server_name);
  traceOutputChannel.show()
  const command = process.env.SERVER_PATH || server_id;
  const run: Executable = {
    command,
    options: {
      env: {
        ...process.env,
        RUST_LOG: "debug",
      },
    },
  };
  const serverOptions: ServerOptions = {
    run,
    debug: run,
  };
  let clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "wing", pattern: "**/*.w" }],
    traceOutputChannel,
  };

  // Create the language client and start the client.
  client = new LanguageClient(server_id, server_name, serverOptions, clientOptions);
  client.start();
}

export function deactivate() {
  return client?.stop();
}
