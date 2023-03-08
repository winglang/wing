import { execSync } from "node:child_process";

/**
 * Returns the latest git tag.
 */
export const getLatestTag = () => {
  const listGitTags = [
    "git",
    '-c "versionsort.suffix=-"', // makes sure pre-release versions are listed after the primary version
    "tag",
    '--sort="-version:refname"', // sort as versions and not lexicographically
    "--list",
    // `"${prefixFilter}"`,
  ].join(" ");

  const tags = execSync(listGitTags, {
    stdio: ["inherit", "pipe", "pipe"],
  }).toString("utf8");

  const [latestTag] = tags.split("\n");
  if (!latestTag) {
    return {
      latestTag: "v0.0.0",
      latestVersion: "0.0.0",
    };
  }

  const latestVersion = latestTag?.startsWith("v")
    ? latestTag.slice(1)
    : latestTag;

  return { latestTag, latestVersion };
};
