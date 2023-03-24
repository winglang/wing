#!/usr/bin/env node

import * as changelogen from "changelogen";
import * as semver from "semver";
import { appendFileSync } from "fs";

const inAction = process.env.GITHUB_ACTIONS === "true";

async function getData() {
  // If we want to generate a version, skip changelogen logic
  if (process.env.GENERATE_VERSION !== "false") {
    let version = "0.0.0";
    if (inAction) {
      const runId = process.env.GITHUB_RUN_ID;
      const runAttempt = process.env.GITHUB_RUN_ATTEMPT;

      version += `-${runId}.${runAttempt}`;
    }

    return {
      lastVersion: version,
      newVersion: version,
      bumpType: "patch",
      sameVersion: true,
      changelog: "Development Version",
    };
  }

  const config = await changelogen.loadChangelogConfig(process.cwd(), {
    types: {
      rfc: {
        title: "👓 RFC",
        semver: "patch",
      },
    },
  });

  const lastTag = await changelogen.getLastGitTag();
  const lastVersion = lastTag.replace("v", "");
  const commits = await changelogen.getGitDiff(
    lastTag,
    await changelogen.getCurrentGitRef()
  );

  const parsed = changelogen.parseCommits(commits, config);

  let bumpType = changelogen.determineSemverChange(parsed, config) ?? "patch";
  if (bumpType === "major" && semver.major(lastVersion) === 0) {
    bumpType = "minor";
  }

  let newVersion =
    commits.length > 0
      ? semver.inc(lastVersion, bumpType) ?? lastVersion
      : lastVersion;
  newVersion = process.env.WING_VERSION ?? newVersion;

  const md = await changelogen.generateMarkDown(parsed, config);

  return {
    lastVersion,
    newVersion,
    bumpType,
    sameVersion: lastVersion === newVersion,
    // Remove the first line of the changelog (the title)
    changelog: md.split("\n").slice(1).join("\n").trimStart() + "\n",
  };
}

const resultObj = await getData();

console.log(resultObj);

if (inAction) {
  // we are running in a github action and we should output some useful stuff
  const githubOutputFile = process.env.GITHUB_OUTPUT;
  const githubStepSummaryFile = process.env.GITHUB_STEP_SUMMARY;
  const githubEnvFile = process.env.GITHUB_ENV;
  if (!githubOutputFile || !githubStepSummaryFile || !githubEnvFile) {
    throw new Error("Missing github action environment variables");
  }

  appendFileSync(githubOutputFile, `data=${JSON.stringify(resultObj)}\n`);
  appendFileSync(githubStepSummaryFile, `${resultObj.changelog}\n`);
  appendFileSync(
    githubEnvFile,
    `PROJEN_BUMP_VERSION=${resultObj.newVersion}\n`
  );
}
