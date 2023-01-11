import { readFile, writeFile } from "node:fs/promises";

import { notarize } from "@electron/notarize";
import { build, Platform } from "electron-builder";

import { WING_PROTOCOL_SCHEME } from "../electron/main/protocol.js";

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

const buildVersion = await readFile("dist/version.txt", "utf8");
const packageJson = await readFile("package.json", "utf8");
await writeFile(
  "package.json",
  `${JSON.stringify(
    { ...JSON.parse(packageJson), version: buildVersion },
    undefined,
    2,
  )}\n`,
);

try {
  await build({
    targets: Platform.MAC.createTarget(),
    // eslint-disable-next-line unicorn/no-null
    publish: process.env.CI ? "always" : null,
    config: {
      appId: "co.monada.WingConsole",
      productName: "Wing Console",
      publish: [
        {
          provider: "s3",
          bucket: "a1bnbufeqmg-km85vfnen3",
        },
      ],
      protocols: [{ name: "Wing Console", schemes: [WING_PROTOCOL_SCHEME] }],
      fileAssociations: [{ ext: "wsim", name: "Wing Sim File" }],
      directories: {
        output: "release",
        buildResources: "electron/resources",
      },
      files: ["dist/vite"],

      mac: {
        target: {
          target: "default",
          arch: ["x64", "arm64"],
        },
      },
      dmg: {
        sign: true,
        icon: "electron/resources/icon.icns",
        background: "electron/resources/background.png",
      },
      afterSign: async (context) => {
        if (context.electronPlatformName === "darwin") {
          try {
            const values = getEnvironmentValues(
              "APPLE_ID",
              "APPLE_ID_PASSWORD",
            );
            const appPath = `${context.appOutDir}/${context.packager.appInfo.productFilename}.app`;
            console.log(`  • notarizing app=${appPath}`);
            await notarize({
              appBundleId: context.packager.appInfo.macBundleIdentifier,
              appleId: values.APPLE_ID,
              appleIdPassword: values.APPLE_ID_PASSWORD,
              appPath,
            });
            console.log(`  • notarization successful`);
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
} finally {
  await writeFile("package.json", packageJson);
}
