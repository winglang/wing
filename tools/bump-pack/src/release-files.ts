import * as changelogen from "changelogen";
import * as semver from "semver";
import { execSync } from "node:child_process";

/**
 * Gets the release data for the current release.
 *
 * This is based on git tags and commit messages in conventional-commit format.
 */
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

  let commits = await changelogen.getGitDiff(lastTag, currentRef);

  // if we have any merge commits, we want to squash them in the changelog
  const mergeCommits = commits.filter((c) =>
    c.message.startsWith("Merge branch '")
  );
  for (const commit of mergeCommits) {
    if (!commits.some((c) => c.shortHash === commit.shortHash)) {
      // this commit has already been removed from the list of commits
      continue;
    }

    // determine all the commits that were part of this merge commit
    const shortHash = commit.shortHash;
    const mergeCommit = execSync(
      `git log --pretty=format:%h ${shortHash}^..${shortHash}`,
      {
        encoding: "utf8",
      }
    );
    const subCommits = mergeCommit
      .split("\n")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    // remove the subCommits from the list of commits
    commits = commits.filter((c) => !subCommits.includes(c.shortHash));

    commits.push({
      ...commit,
      message: `feat: ${commit.message} (${subCommits.length} commits)`,
    });
  }

  const parsed = changelogen.parseCommits(commits, config);

  let bumpType = changelogen.determineSemverChange(parsed, config) ?? "patch";
  if (
    mergeCommits.length > 0 ||
    (bumpType === "major" && semver.major(lastVersion) === 0)
  ) {
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
