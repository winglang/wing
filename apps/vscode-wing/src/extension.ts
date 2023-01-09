import { execSync } from "child_process";
import { existsSync } from "fs";
import { platform } from "os";
import { dirname } from "path";
import { ExtensionContext, window } from "vscode";
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
  let serverPath = process.env.WING_LSP_SERVER_PATH;
  if (!serverPath) {
    serverPath = context.asAbsolutePath(
      "resources/native/wing-language-server"
    );
    // typically for local debug
    if (serverPath && existsSync(serverPath)) {
      void window.showInformationMessage(
        `[Wing] Using local language server at ${serverPath}`
      );
    } else {
      // TODO The excessive nesting is pretty ugly
      // TODO workflow should place these in ways that make more sense
      switch (platform()) {
        case "darwin":
          // Currently, we only have darwin x64 builds. Users must have rosetta available to run this on arm64.
          serverPath = context.asAbsolutePath(
            "resources/wing-language-server-macos-latest-x64/wing-language-server"
          );
          break;
        case "linux":
          serverPath = context.asAbsolutePath(
            "resources/wing-language-server-ubuntu-latest-x64/wing-language-server"
          );
          break;
        default:
          throw new Error("Unsupported platform");
      }
    }
  }

  if (!existsSync(serverPath)) {
    void window.showWarningMessage(
      `[Wing] Language server not found at ${serverPath}`
    );
    return;
  }

  if (platform() !== "win32") {
    // This feels ugly, but I'm not sure it's reasonably avoidable
    execSync(`chmod +x ${serverPath}`);
  }

  const wingsdkManifestRoot = context.asAbsolutePath("resources/wingsdk");

  const run: Executable = {
    command: serverPath,
    options: {
      env: {
        ...process.env,
        WINGSDK_MANIFEST_ROOT: wingsdkManifestRoot,
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
