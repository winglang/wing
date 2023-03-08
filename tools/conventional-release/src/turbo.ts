import { spawnSync } from "node:child_process";

import * as colors from "yoctocolors";

const turbo = (arguments_: string[], dryRun: boolean) => {
  if (dryRun) {
    console.log(colors.green("✔"), `running turbo ${arguments_.join(" ")}`);
  } else {
    spawnSync("npx", ["turbo", ...arguments_], {
      stdio: "inherit",
    });
  }
};

export interface TurboBuildOptions {
  // filter: string;
  dryRun: boolean;
}

export const turboCompile = ({
  // filter,
  dryRun,
}: TurboBuildOptions) => {
  turbo(
    [
      "compile", // "--filter", filter
    ],
    dryRun,
  );
};
