import * as changelogen from "changelogen";
import * as semver from "semver";
import { execSync } from "node:child_process";

export async function getReleaseData() {
  // If we want to generate a version, skip changelogen logic
  if (process.env.GENERATE_VERSION !== "false") {
    const version = "0.0.0";

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
      feat: {
        title: "🚀 Features",
        semver: "patch",
      },
      revert: {
        title: "⏪ Reverts",
        semver: "patch",
      },
    },
  });

  const lastTag = execSync("git tag --sort=committerdate | tail -1", {
    encoding: "utf8",
  }).trim();
  const lastVersion = lastTag.replace("v", "");

  let currentRef = await changelogen.getCurrentGitRef();
  // if the current Ref is multiple lines (multiple tags), get the last (latest) one
  currentRef = currentRef.split("\n").pop() ?? currentRef;

  const commits = await changelogen.getGitDiff(lastTag, currentRef);

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
