import { ExtensionContext } from "vscode";
import { LanguageClientOptions } from "vscode-languageclient";
import {
  LanguageClient,
  Executable,
  ServerOptions,
} from "vscode-languageclient/node";
import { getWingBinAndArgs } from "./bin-helper";
import { LANGUAGE_SERVER_ID, LANGUAGE_SERVER_NAME } from "./constants";

export class LanguageServerManager {
  client: LanguageClient | undefined;

  constructor(public readonly context: ExtensionContext) {}

  async stop() {
    await this.client?.stop();
  }

  async start() {
    const args = await getWingBinAndArgs(this.context);

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
      documentSelector: [
        { scheme: "file", language: "wing", pattern: "**/*.w" },
      ],
    };

    // Create the language client and start the client.
    this.client = new LanguageClient(
      LANGUAGE_SERVER_ID,
      LANGUAGE_SERVER_NAME,
      serverOptions,
      clientOptions
    );

    await this.client.start();
  }
}
