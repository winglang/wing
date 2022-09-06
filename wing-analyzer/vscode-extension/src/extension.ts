import { writeFile } from "fs/promises";
import { tmpdir } from "os";
import fetch, { HeadersInit } from "node-fetch";
import { Octokit } from "octokit";
import * as vscode from "vscode";

const EXTENSION_NAME = "wing";
const EXTENSION_FILENAME = "vscode-wing.vsix";
const WINGLANG_REPO_NAME = "winglang";
const WINGLANG_REPO_OWNER = "monadahq";
const UPDATE_RATE_LIMIT_MS = 1 * 60 * 60 * 1000; // 1 hour

const CFG_UPDATES_GITHUB_TOKEN = "updates.githubToken";
const CFG_UPDATES_SOURCE_TAG = "updates.sourceTag";
const STATE_INSTALLED_RELEASE_CHECKSUM = "wing.installedReleaseChecksum";
const STATE_LAST_UPDATE_CHECK = "wing.lastUpdateCheck";

export async function activate(context: vscode.ExtensionContext) {
  // TODO activate language server

  // Check for updates
  await checkForUpdates(context);
}

export async function checkForUpdates(context: vscode.ExtensionContext) {
  if (context.extensionMode === vscode.ExtensionMode.Development) {
    void vscode.window.showWarningMessage(
      `[Wing] Skipping updates in development mode`
    );
    return;
  }

  const lastUpdateCheck =
    context.globalState.get<number>(STATE_LAST_UPDATE_CHECK) ?? -1;
  const now = Date.now();

  // Skip update if has been checked before and time diff is less than UPDATE_RATE_LIMIT_MS
  if (lastUpdateCheck >= 0 && now - lastUpdateCheck <= UPDATE_RATE_LIMIT_MS) {
    return;
  }

  const configuration = vscode.workspace.getConfiguration(EXTENSION_NAME);
  const githubToken = configuration.get<string>(CFG_UPDATES_GITHUB_TOKEN);
  const sourceTag = configuration.get<string>(CFG_UPDATES_SOURCE_TAG);

  if (githubToken && sourceTag) {
    const octokit = new Octokit({ auth: githubToken });
    const latestRelease = await octokit.rest.repos.getReleaseByTag({
      owner: WINGLANG_REPO_OWNER,
      repo: WINGLANG_REPO_NAME,
      tag: sourceTag,
    });

    if (latestRelease.status !== 200) {
      void vscode.window.showErrorMessage(
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
          void vscode.window.showWarningMessage(
            `[Wing] Checksum invalid: ${sha1}`
          );
        }
      }
    }

    const installedReleaseChecksum: string | undefined =
      context.globalState.get(STATE_INSTALLED_RELEASE_CHECKSUM);
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
      void vscode.window.showInformationMessage(
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
          void vscode.window.showErrorMessage(
            `[Wing] Could not download update: ${e}`
          );
          return;
        }

        await vscode.commands.executeCommand(
          "workbench.extensions.installExtension",
          vscode.Uri.parse(filePath)
        );

        await context.globalState.update(
          STATE_INSTALLED_RELEASE_CHECKSUM,
          latestReleaseChecksum
        );

        void vscode.window
          .showInformationMessage(
            `[Wing] Reload window for update to take effect?`,
            "Ok"
          )
          .then((selectedAction) => {
            if (selectedAction === "Ok") {
              void vscode.commands.executeCommand(
                "workbench.action.reloadWindow"
              );
            }
          });
      }
    }

    await context.globalState.update(STATE_LAST_UPDATE_CHECK, now);
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
