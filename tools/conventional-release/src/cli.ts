import { bumpFiles } from "./bump-files.js";
import { pack } from "./pack.js";
import { turboBundle, turboCompile } from "./turbo.js";
import { unbumpFiles } from "./unbump-files.js";

const filter = process.argv[2];
if (!filter) {
  throw new Error(
    'Must specify a filter. Eg:\n\tconventional-release "[HEAD^1]"',
  );
}

const dryRun = process.argv.includes("--dry-run");
const force = process.argv.includes("--force");

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

try {
  turboBundle({
    // filter,
    dryRun,
    force,
  });
  await pack();
} finally {
  await unbumpFiles({
    // filter,
    dryRun,
  });
}
