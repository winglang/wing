import { readFile, rm, writeFile } from "node:fs/promises";

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
  const buildOptions = {
    publish: process.env.ELECTRON_BUNDLER_PUBLISH ?? "never",
    win: undefined,
    linux: undefined,
    mac: undefined,
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
      asar: false,
      mac: {
        notarize: {
          teamId: "Y97684J7DA",
        },
      },
      dmg: {
        sign: true,
        icon: "electron/resources/icon.icns",
        background: "electron/resources/background.png",
      },
    },
  };
  await build({
    ...buildOptions,
    mac: ["default:arm64", "default:x64"],
  });
  await build({
    ...buildOptions,
    win: ["default:arm64", "default:x64", "default:ia32"],
  });
  await build({
    ...buildOptions,
    linux: ["dir:arm", "dir:arm64", "dir:x64"],
  });
} finally {
  await writeFile("package.json", packageJson);
}
