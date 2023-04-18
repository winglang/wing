import { basename } from "path";
import { bench, describe } from "vitest";
import { runWingCommand } from "./utils";
import { benchmarksTestDir, walkdir } from "./paths";

describe("compile benchmarks", async () => {
  const targets = ["sim", "tf-aws"];
  for await (const wingFile of walkdir(benchmarksTestDir)) {
    if (wingFile.endsWith(".w")) {
      for (const target of targets) {
        bench(`${basename(wingFile)} - ${target}`, async () => {
          await runWingCommand({
            cwd: benchmarksTestDir,
            wingFile: wingFile,
            args: ["compile", "--target", target],
            shouldSucceed: true,
          });
        },
        {
          warmupIterations: 1,
          iterations: 5,
        });
      }
    }
  }
});
