import { execSync } from "child_process";
import { existsSync } from "fs";
import { writeFile } from "fs/promises";
import { platform, tmpdir } from "os";
import { dirname } from "path";
import fetch, { HeadersInit } from "node-fetch";
import { Octokit } from "octokit";
import {
  ExtensionContext,
  ExtensionMode,
  Uri,
  commands,
  window,
  workspace,
  ConfigurationTarget,
} from "vscode";
import {
  Executable,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

const EXTENSION_NAME = "wing";
const EXTENSION_FILENAME = "vscode-wing.vsix";
const WINGLANG_REPO_NAME = "wing";
const WINGLANG_REPO_OWNER = "winglang";

const CFG_UPDATES_GITHUB_TOKEN = "updates.githubToken";
const STATE_INSTALLED_RELEASE_CHECKSUM = "wing.installedReleaseChecksum";
const CMD_UPDATES_ADD_TOKEN = "wing.addToken";
const CMD_UPDATES_CHECK = "wing.checkUpdates";

const LANGUAGE_SERVER_NAME = "Wing Language Server";
const LANGUAGE_SERVER_ID = "wing-language-server";

let client: LanguageClient;

export function deactivate() {
  return client?.stop();
}

export async function activate(context: ExtensionContext) {
  await addCommands(context);
  await checkForUpdates(context, false);
  await startLanguageServer(context);
}

async function addCommands(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand(CMD_UPDATES_CHECK, async () => {
      await checkForUpdates(context, true);
    }),
    commands.registerCommand(CMD_UPDATES_ADD_TOKEN, async () => {
      const token = await window.showInputBox({
        prompt:
          "Enter your GitHub PAT (Personal Access Token) with private repo permissions",
        placeHolder: "PAT",
        password: true,
      });
      if (token) {
        await workspace
          .getConfiguration(EXTENSION_NAME)
          .update(CFG_UPDATES_GITHUB_TOKEN, token, ConfigurationTarget.Global);
        await checkForUpdates(context, true);
      }
    })
  );
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

  const wingsdkManifestRoot = dirname(
    require.resolve("@winglang/wingsdk/.jsii")
  );

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

export async function checkForUpdates(
  context: ExtensionContext,
  manual: boolean
) {
  if (context.extensionMode === ExtensionMode.Development) {
    void window.showWarningMessage(
      `[Wing] Skipping updates in development mode`
    );
    return;
  }

  const configuration = workspace.getConfiguration(EXTENSION_NAME);
  const githubToken = configuration.get<string>(CFG_UPDATES_GITHUB_TOKEN);

  if (!githubToken) {
    if (manual) {
      void window.showWarningMessage(
        `[Wing] Unable to check for updates: No GitHub token configured`
      );

      await commands.executeCommand(CMD_UPDATES_ADD_TOKEN);
    }

    return;
  }

  const octokit = new Octokit({ auth: githubToken });
  const latestRelease = await octokit.rest.repos.getLatestRelease({
    owner: WINGLANG_REPO_OWNER,
    repo: WINGLANG_REPO_NAME,
  });

  if (latestRelease.status !== 200) {
    void window.showErrorMessage(
      `[Wing] Could not check for updates: ${latestRelease.data}`
    );
    return;
  }

  let latestHash: string | undefined;
  for (let line of latestRelease.data.body?.split("\n") ?? []) {
    line = line.trim();
    if (line.endsWith("*" + EXTENSION_FILENAME)) {
      // TODO better err handling
      const sha1 = line.split(" ")[0]!;
      if (sha1.length === 40) {
        latestHash = sha1;
        break;
      } else {
        void window.showWarningMessage(`[Wing] Checksum invalid: ${sha1}`);
      }
    }
  }

  const installedReleaseChecksum: string | undefined = context.globalState.get(
    STATE_INSTALLED_RELEASE_CHECKSUM
  );
  const latestReleaseChecksum = latestHash;
  const hasSavedVersion = installedReleaseChecksum !== undefined;
  const doUpdate =
    hasSavedVersion && installedReleaseChecksum !== latestReleaseChecksum;

  if (!hasSavedVersion) {
    await context.globalState.update(
      STATE_INSTALLED_RELEASE_CHECKSUM,
      latestReleaseChecksum
    );
  }

  if (doUpdate) {
    void window.showInformationMessage(
      `[Wing] New version available! Updating automatically...`
    );

    const assetId = latestRelease.data.assets.find(
      (asset) => asset.name === EXTENSION_FILENAME
    )?.id;

    if (assetId) {
      const filePath = `${tmpdir()}/${EXTENSION_FILENAME}`;

      try {
        await fetchAssetFile(octokit, {
          id: assetId,
          outputPath: filePath,
          owner: WINGLANG_REPO_OWNER,
          repo: WINGLANG_REPO_NAME,
          token: githubToken,
        });
      } catch (e) {
        void window.showErrorMessage(`[Wing] Could not download update: ${e}`);
        return;
      }

      await commands.executeCommand(
        "workbench.extensions.installExtension",
        Uri.parse(filePath)
      );

      await context.globalState.update(
        STATE_INSTALLED_RELEASE_CHECKSUM,
        latestReleaseChecksum
      );

      void window
        .showInformationMessage(
          `[Wing] Reload window for update to take effect?`,
          "Ok"
        )
        .then((selectedAction) => {
          if (selectedAction === "Ok") {
            void commands.executeCommand("workbench.action.reloadWindow");
          }
        });
    }
  }
}

// https://github.com/dsaltares/fetch-gh-release-asset/blob/d9376dacd30fd38f49238586cd2e9295a8307f4c/index.ts#L69
const fetchAssetFile = async (
  octokit: Octokit,
  { id, outputPath, owner, repo, token }: any
) => {
  const {
    body,
    headers: { accept, "user-agent": userAgent },
    method,
    url,
  } = octokit.request.endpoint(
    "GET /repos/:owner/:repo/releases/assets/:asset_id",
    {
      asset_id: id,
      headers: {
        accept: "application/octet-stream",
      },
      owner,
      repo,
    }
  );
  let headers: HeadersInit = {
    accept,
    authorization: `token ${token}`,
  };
  if (typeof userAgent !== "undefined")
    headers = { ...headers, "user-agent": userAgent };

  const response = await fetch(url, { body, headers, method });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Invalid response: ${text}`);
  }
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  void (await writeFile(outputPath, new Uint8Array(arrayBuffer)));
};
