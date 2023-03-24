#!/usr/bin/env node

import * as changelogen from "changelogen";
import * as semver from "semver";

const config = await changelogen.loadChangelogConfig(process.cwd(), {
  types: {
    rfc: {
      title: "👓 RFC",
      semver: "patch",
    }
  }
});

const lastTag = await changelogen.getLastGitTag();
const lastVersion = lastTag.replace("v", "");
const commits = await changelogen.getGitDiff(lastTag, await changelogen.getCurrentGitRef());

const parsed = changelogen.parseCommits(commits, config);

let bumpType = changelogen.determineSemverChange(parsed, config) ?? "patch";
if (bumpType === "major" && semver.major(lastVersion) === 0) {
    bumpType = "minor";
}

const newVersion = parsed.length > 0 ? (semver.inc(lastVersion, bumpType) ?? lastVersion) : lastVersion;

config.newVersion = newVersion;
const md = await changelogen.generateMarkDown(parsed, config);

const resultObj = {
  lastVersion,
  newVersion,
  bumpType,
  sameVersion: lastVersion === newVersion,
  changelog: md,
}

console.log(JSON.stringify(resultObj));