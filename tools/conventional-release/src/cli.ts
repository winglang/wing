import { pack } from "./pack.js";
import { parseArgs } from "node:util";
import { appendFile } from "node:fs/promises";
import { getReleaseData } from "./release-files.js";
import { setPackageVersion } from "./bump.js";

const parsedArgs = parseArgs({
  options: {
    dryRun: {
      type: "boolean",
      short: "d",
      default: false,
    },
    bumpPackage: {
      type: "boolean",
      short: "b",
    },
  },
});

const packageDir = parsedArgs.values.bumpPackage ? process.cwd() : undefined;
const releaseData = await getReleaseData();
const dryRun = parsedArgs.values.dryRun ?? false;

if (packageDir !== undefined) {
  // We want to make sure a package is versioned and is pointing to the correct dep versions

  const originalVersions = await setPackageVersion({
    packageDir,
    dryRun,
    version: releaseData.newVersion,
  });

  try {
    await pack({
      packageDir,
      dryRun,
    });
  } finally {
    await setPackageVersion({
      packageDir,
      dryRun,
      version: originalVersions,
    });
  }
} else {
  // We just want to output the useful release data
  console.log(releaseData);

  if (!!process.env.GITHUB_ACTIONS) {
    // we are running in a github action and we should output some useful stuff
    const githubOutputFile = process.env.GITHUB_OUTPUT;
    const githubStepSummaryFile = process.env.GITHUB_STEP_SUMMARY;
    const githubEnvFile = process.env.GITHUB_ENV;
    if (!githubOutputFile || !githubStepSummaryFile || !githubEnvFile) {
      throw new Error("Missing github action environment variables");
    }

    appendFile(githubOutputFile, `data=${JSON.stringify(releaseData)}\n`);
    appendFile(githubStepSummaryFile, `${releaseData.changelog}\n`);
    appendFile(
      githubEnvFile,
      `PROJEN_BUMP_VERSION=${releaseData.newVersion}\n`
    );
  }
}
