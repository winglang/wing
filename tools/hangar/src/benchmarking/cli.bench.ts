import { basename } from "path";
import { bench, describe } from "vitest";
import { runWingCommand } from "../utils";
import { benchmarksTestDir, walkdir } from "../paths";

describe("compile", async () => {
  bench("version", async () => {
    await runWingCommand({
      cwd: benchmarksTestDir,
      args: ["-V"],
      expectFailure: false,
    });
  });

  const targets = ["sim", "tf-aws"];
  const files = [];
  for await (const wingFile of walkdir(benchmarksTestDir)) {
    if (wingFile.endsWith(".w")) {
      files.push(wingFile);
    }
  }
  for (const wingFile of files) {
    for (const target of targets) {
      bench(
        `${basename(wingFile)} -t ${target}`,
        async () => {
          await runWingCommand({
            cwd: benchmarksTestDir,
            wingFile: wingFile,
            platforms: [target],
            args: ["compile"],
            expectFailure: false,
          });
        },
        {
          warmupIterations: 1,
          iterations: 10,
          time: 0,
          setup: async (f) => {
            f.opts.beforeEach = async () => {
              // wait for the system to settle and close cp handles
              await new Promise((resolve) => setTimeout(resolve, 100));
            };
          },
        }
      );
    }
  }
});
