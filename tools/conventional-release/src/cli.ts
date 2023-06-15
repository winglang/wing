import { bumpFiles } from "./bump-files.js";
import { turboCompile } from "./turbo.js";
import { unbumpFiles } from "./unbump-files.js";

const filter = process.argv[2];
if (!filter) {
  throw new Error(
    'Must specify a filter. Eg:\n\tconventional-release "[HEAD^1]"',
  );
}

const dryRun = process.argv.includes("--dry-run");

const versionFile = "dist/package.json";
const releaseFile = "dist/releasetag.txt";
const changelogFile = "dist/changelog.md";

const { releaseTag } = await bumpFiles({
  filter,
  versionFile,
  releaseFile,
  changelogFile,
  dryRun,
});

turboCompile({
  // filter,
  dryRun,
});

await unbumpFiles({ filter, dryRun });
