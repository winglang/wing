import { test } from "vitest";
import { compatibilityTestFiles, tmpDir, compatibilityTestsDir } from "./paths";
import { runWingCommand } from "./utils";
import { join, relative, basename } from "path";
import { rmSync, readFileSync } from "fs";

compatibilityTestFiles.forEach((wingFile) => {
  test(wingFile, async ({ expect }) => {
    const platforms = ["sim", "../../../libs/compatibility-spy/lib"];
    const args = ["test", "--no-clean"];

    const absoluteWingFile = join(compatibilityTestsDir, wingFile);
    const relativeWingFile = relative(tmpDir, absoluteWingFile);

    const targetDir = join(
      compatibilityTestsDir,
      "target/test",
      `${basename(wingFile).replace(".w", "")}.wsim`
    );

    await runWingCommand({
      cwd: tmpDir,
      wingFile: relativeWingFile,
      platforms,
      args,
      expectFailure: false,
    });

    const usageContext = readFileSync(
      join(targetDir, "usage_context.json")
    ).toString();

    rmSync(targetDir, { recursive: true, force: true });

    expect(usageContext).toMatchSnapshot();
  });
});
