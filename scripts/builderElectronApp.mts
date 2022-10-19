import { readFile } from "node:fs/promises";

import { build, Platform } from "electron-builder";
import { notarize } from "electron-notarize";

class MissingEnvironmentVariable extends Error {
  constructor(public readonly key: string) {
    super(`The environment variable [process.env.${key}] must have a value`);
  }
}

function getEnvironmentValues<T extends string>(...keys: T[]) {
  let values = {};
  for (const key of keys) {
    const value = process.env[key];
    if (!value) {
      throw new MissingEnvironmentVariable(key);
    }

    values = {
      ...values,
      [key]: value,
    };
  }

  return values as {
    [key in T]: string;
  };
}

await build({
  targets: Platform.MAC.createTarget(),
  config: {
    appId: "co.monada.WingConsole",
    buildVersion: await readFile("dist/releasetag.txt", "utf8"),
    directories: {
      output: "release",
      buildResources: "electron/resources",
    },
    files: ["dist/vite"],
    publish: "never",

    mac: {
      target: "dmg",
    },
    dmg: {
      sign: true,
      icon: "electron/resources/icon.icns",
      background: "electron/resources/background.png",
    },

    afterSign: async (context) => {
      if (context.electronPlatformName === "darwin") {
        try {
          const values = getEnvironmentValues("APPLE_ID", "APPLE_ID_PASSWORD");
          const appPath = `${context.appOutDir}/${context.packager.appInfo.sanitizedName}.app`;
          await notarize({
            appBundleId: context.packager.appInfo.macBundleIdentifier,
            appleId: values.APPLE_ID,
            appleIdPassword: values.APPLE_ID_PASSWORD,
            appPath,
          });
        } catch (error) {
          if (error instanceof MissingEnvironmentVariable) {
            console.log(
              `  • skipped macOS application notarization  reason=${error.message}`,
            );
          } else {
            throw error;
          }
        }
      }
    },
  },
});
