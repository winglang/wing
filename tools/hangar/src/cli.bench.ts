import { basename } from "path";
import { bench, describe } from "vitest";
import { runWingCommand } from "./utils";
import { benchmarksTestDir, walkdir } from "./paths";

const targets = ["sim", "tf-aws"];
const files: string[] = [];
for await (const wingFile of walkdir(benchmarksTestDir)) {
  if (wingFile.endsWith(".w")) {
    files.push(wingFile);
  }
}

describe("compile", async () => {
  for (const wingFile of files) {
    for (const target of targets) {
      bench(
        `${basename(wingFile)} | ${target}`,
        async () => {
          await runWingCommand({
            cwd: benchmarksTestDir,
            wingFile: wingFile,
            args: ["compile", "--target", target],
            shouldSucceed: true,
          });
        },
        {
          warmupIterations: 1,
          iterations: 2,
        }
      );
    }
  }
});
