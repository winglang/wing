#!/usr/bin/env node

import * as changelogen from "changelogen";
import * as semver from "semver";

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

  config.newVersion = newVersion;
  const md = await changelogen.generateMarkDown(parsed, config);

  return {
    lastVersion,
    newVersion,
    bumpType,
    sameVersion: lastVersion === newVersion,
    changelog: md + "\n",
  };
}

const resultObj = await getData();

console.log(resultObj);

if (inAction) {
  // we are running in a github action and we should output some useful stuff
  console.log(
    `'data=${JSON.stringify(resultObj)}' >> ${process.env.GITHUB_OUTPUT}`
  );
  console.log(`'${resultObj.changelog}' >> ${process.env.GITHUB_STEP_SUMMARY}`);
  console.log(
    `PROJEN_BUMP_VERSION=${resultObj.newVersion} >> ${process.env.GITHUB_ENV}`
  );
}
