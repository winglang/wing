import { pack } from "./pack.js";
import { parseArgs } from "node:util";
import { appendFile } from "node:fs/promises";
import { getReleaseData } from "./release-files.js";

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

const packageDir = process.cwd();
const dryRun = parsedArgs.values.dryRun ?? false;
const bumpPackage = parsedArgs.values.bumpPackage ?? false;

if (bumpPackage) {
  await pack({
    packageDir,
    dryRun,
  });
} else {
  // We just want to output the useful release data
  const releaseData = await getReleaseData();
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
