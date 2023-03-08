import { execSync } from "node:child_process";

import * as colors from "yoctocolors";

const git = (command: string, dryRun: boolean) => {
  if (dryRun) {
    console.log(colors.green("✔"), `running git ${command}`);
  } else {
    execSync(`git ${command}`, {
      stdio: "inherit",
    });
  }
};

export interface GitTagOptions {
  releaseTag: string;
  changelogFile: string;
  dryRun: boolean;
}

export const gitTag = ({
  releaseTag,
  changelogFile,
  dryRun,
}: GitTagOptions) => {
  git(`tag ${releaseTag} -a -F ${changelogFile}`, dryRun);
};

export interface GitPushOptions {
  releaseTag: string;
  dryRun: boolean;
}

export const gitPush = ({ releaseTag, dryRun }: GitPushOptions) => {
  git(`push origin ${releaseTag} ${dryRun ? "--dry-run" : ""}`, dryRun);
};

export const gitAntiTamper = () => {
  git(`push diff --ignore-space-at-eol --exit-code`, false);
};
