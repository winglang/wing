import { readFile, rm, writeFile } from "node:fs/promises";

import { notarize } from "@electron/notarize";
import { build } from "electron-builder";

const WING_PROTOCOL_SCHEME = "wing-console";

const buildVersion = await readFile("../../dist/releasetag.txt", "utf8");
const packageJson = await readFile("package.json", "utf8");
await writeFile(
  "package.json",
  `${JSON.stringify(
    {
      ...JSON.parse(packageJson),
      version: buildVersion.slice(1),
      main: "dist/vite/electron/main/index.js",
    },
    undefined,
    2,
  )}\n`,
);

try {
  await rm("release", { force: true, recursive: true });
  await build({
    publish: process.env.ELECTRON_BUNDLER_PUBLISH ?? "never",
    mac: ["dir:arm64", "dir:x64", "dmg:arm64", "dmg:x64"],
    win: ["dir:arm64", "dir:ia32", "dir:x64", "nsis:arm64", "nsis:x64"],
    linux: ["dir:arm", "dir:arm64", "dir:x64"],
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
      directories: {
        output: "release",
        buildResources: "electron/resources",
      },
      files: ["dist/vite"],
      dmg: {
        sign: true,
        icon: "electron/resources/icon.icns",
        background: "electron/resources/background.png",
      },
      afterSign: async (context) => {
        if (context.electronPlatformName === "darwin") {
          try {
            const { APPLE_ID, APPLE_ID_PASSWORD } = process.env;
            if (!APPLE_ID || !APPLE_ID_PASSWORD) {
              console.log(
                `  • skipped macOS application notarization  reason=${`The environment variables [process.env.APPLE_ID] and [process.env.APPLE_ID_PASSWORD] must have a value`}`,
              );
              return;
            }
            const appPath = `${context.appOutDir}/${context.packager.appInfo.productFilename}.app`;
            console.log(`  • notarizing app=${appPath}`);
            await notarize({
              appBundleId: context.packager.appInfo.macBundleIdentifier,
              appleId: APPLE_ID,
              appleIdPassword: APPLE_ID_PASSWORD,
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
