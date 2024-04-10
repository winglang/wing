import { test } from "vitest";
import { compatibilityTestFiles, tmpDir, compatibilityTestsDir } from "./paths";
import { runWingCommand } from "./utils";
import { join, relative } from "path";
import { rmSync, readFileSync } from "fs";

compatibilityTestFiles.forEach((wingFile) => {
  test(wingFile, async ({ expect }) => {
    // "@winglang/compatibility-spy" will be installed in the tmpDir
    const platforms = ["sim", "node_modules/@winglang/compatibility-spy/lib"];
    const args = ["test", "-o", "out.json", "--no-stream"];

    const absoluteWingFile = join(compatibilityTestsDir, wingFile);
    const relativeWingFile = relative(tmpDir, absoluteWingFile);

    await runWingCommand({
      cwd: tmpDir,
      wingFile: relativeWingFile,
      platforms,
      args,
      expectFailure: false,
    });

    const usageContext = JSON.parse(
      readFileSync(join(tmpDir, "out.json")).toString()
    );
    // sanitize the output
    usageContext.duration = "<DURATION>";

    for (const testFile in usageContext.results) {
      for (const singleTest in usageContext.results[testFile]) {
        usageContext.results[testFile][singleTest].traces.forEach(
          (trace: Record<string, unknown>) => {
            trace.timestamp = "<TIMESTAMP>";
          }
        );
      }
    }

    rmSync(join(tmpDir, "out.json"), { recursive: true, force: true });

    expect(usageContext).toMatchSnapshot();
  });
});
