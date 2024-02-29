import { workspace } from "vscode";
import { LanguageClientOptions } from "vscode-languageclient";
import {
  LanguageClient,
  Executable,
  ServerOptions,
} from "vscode-languageclient/node";
import { LANGUAGE_SERVER_ID, LANGUAGE_SERVER_NAME } from "./constants";

export class LanguageServerManager {
  client: LanguageClient | undefined;
  wingBin: string | undefined;

  setWingBin(wingBin: string) {
    this.wingBin = wingBin;
  }

  async stop() {
    await this.client?.stop();
    await this.client?.dispose();
    this.client = undefined;
  }

  async start() {
    await this.stop();
    if (!this.wingBin) {
      return;
    }

    const run: Executable = {
      command: this.wingBin,
      args: ["lsp", "--no-update-check"],
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
      initializationOptions: {
        parameterHints: workspace
          .getConfiguration("editor.parameterHints", {
            languageId: "wing",
          })
          .get<boolean>("enabled", true),
      },
      documentSelector: [
        { scheme: "file", language: "wing", pattern: "**/*.w" },
      ],
    };

    // Create the language client and start the client.
    this.client = new LanguageClient(
      LANGUAGE_SERVER_ID,
      LANGUAGE_SERVER_NAME,
      serverOptions,
      clientOptions,
    );

    await this.client.start();
  }
}
