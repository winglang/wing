import { exec, execSync } from "child_process";
import { env } from "process";
import {
  StatusBarItem,
  ExtensionContext,
  ProgressLocation,
  window,
  workspace,
} from "vscode";
import which from "which";
import { CFG_WING, CFG_WING_BIN } from "./constants";

let STATUS_BAR_ITEM: StatusBarItem;

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

async function updateStatusBar(wingBin: string, args?: string[]) {
  let clean_args = args ? [...args] : [];
  clean_args.push("-V");

  // get current wing version
  const version = await new Promise<string>((resolve, reject) => {
    exec(`${wingBin} ${clean_args.join(" ")}`, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  }).catch(() => "unknown");

  if (version === "unknown") {
    return;
  }

  // update status bar
  const status = `Wing v${version}`;
  if (!STATUS_BAR_ITEM) {
    STATUS_BAR_ITEM = window.createStatusBarItem();
  }

  STATUS_BAR_ITEM.text = status;
  STATUS_BAR_ITEM.show();
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

export async function getWingBinAndArgs(context: ExtensionContext) {
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
    wingBin === "npx"
      ? ["-y", "-q", `winglang@${extVersion}`, "--no-update-check"]
      : ["--no-update-check"];

  await updateStatusBar(wingBin, args);

  return [wingBin, ...args];
}

export const importCreateConsoleApp = () => {
  const packagePath = execSync("wing console-app-path").toString().trim();

  const createConsoleApp =
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require(packagePath) as typeof import("@wingconsole/app");

  return createConsoleApp;
};
