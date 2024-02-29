import { exec } from "child_process";
import { realpath } from "fs/promises";
import { promisify } from "node:util";
import { basename, join } from "path";
import { env } from "process";
import { StatusBarItem, ProgressLocation, window, workspace } from "vscode";
import which from "which";
import { CFG_WING, CFG_WING_BIN } from "./constants";
import { Loggers } from "./logging";

let STATUS_BAR_ITEM: StatusBarItem;

/**
 * Install wing globally using npm if desired by the user
 *
 * @returns true if wing is successfully installed, false otherwise
 */
async function guidedWingInstallation() {
  return window.withProgress(
    {
      location: ProgressLocation.Notification,
      cancellable: false,
    },
    async (progress) => {
      progress.report({ message: `Installing Wing...` });
      return executeCommand("npm install -g winglang@latest")
        .then(() => {
          void window.showInformationMessage(`Wing has been installed!`);
          return true;
        })
        .catch((e) => {
          void window.showErrorMessage(`Failed to install Wing: ${e}`);
          return false;
        });
    },
  );
}

export async function updateStatusBar(wingBin: string) {
  let version = "not found";
  try {
    version = await executeCommand(`"${wingBin}" -V --no-update-check`);
  } catch (e) {
    Loggers.default.appendLine(
      `Failed to get wing version from ${wingBin}: ${e}`,
    );
  }

  // update status bar
  const status = `Wing (${version})`;
  if (!STATUS_BAR_ITEM) {
    STATUS_BAR_ITEM = window.createStatusBarItem();
  }

  STATUS_BAR_ITEM.text = status;
  STATUS_BAR_ITEM.tooltip = wingBin;
  STATUS_BAR_ITEM.show();

  return version !== "not found";
}

export async function getWingBin(): Promise<string | null> {
  let configuredWingBin =
    env.WING_BIN ??
    workspace.getConfiguration(CFG_WING).get<string>(CFG_WING_BIN);

  if (configuredWingBin) {
    configuredWingBin = configuredWingBin.trim();
    const configuredPath = await resolvePath(configuredWingBin);
    if (configuredPath) {
      // this is already a path, so we can just return it
      return configuredPath;
    }
  } else {
    configuredWingBin = "wing";
  }

  try {
    const whichPath = await which(configuredWingBin);
    Loggers.default.appendLine(
      `"which ${configuredWingBin}" => "${whichPath}"`,
    );
    return await resolvePath(whichPath);
  } catch (e) {
    const choice = await window.showWarningMessage(
      `Unable to find wing from "${configuredWingBin}" (not in PATH). Install globally with \`npm install -g winglang@latest\`? (${e})`,
      "Yes!",
    );

    if (choice === "Yes!") {
      if (await guidedWingInstallation()) {
        return getWingBin();
      } else {
        return null;
      }
    } else {
      // User decided to ignore the warning
      return null;
    }
  }
}

export async function resolvePath(p: string) {
  try {
    const real = await realpath(p);

    if (basename(real) === "volta-shim") {
      // Handle volta shims by resolving the true path
      // https://docs.volta.sh/guide/#how-does-it-work
      const voltaPath = join(real, "..", "volta");
      const vResult = await executeCommand(`"${voltaPath}" which wing`).catch(
        async () => {
          void window.showWarningMessage(
            `Failed to resolve volta from shim: ${real}`,
          );
          return null;
        },
      );

      if (!vResult) {
        return null;
      } else {
        return await resolvePath(vResult);
      }
    }

    return real;
  } catch (e) {
    // the path doesn't exist or is invalid
    return null;
  }
}

export async function executeCommand(command: string): Promise<string> {
  return promisify(exec)(command, {
    encoding: "utf-8",
  }).then((out) => out.stdout.trim());
}
