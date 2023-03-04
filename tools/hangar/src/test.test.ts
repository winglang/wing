import * as fs from "fs-extra";
import * as path from "path";
import { describe, test } from "vitest";
import { tmpDir, validTestDir, validWingFiles } from "./paths";
import { runWingCommand } from "./utils";

describe.each(validWingFiles)("%s", (wingFile) => {
  test.concurrent(
    "wing test --target sim",
    async ({ expect }) => {
      const args = ["test"];
      const testDir = path.join(tmpDir, `${wingFile}_sim`);
      fs.mkdirpSync(testDir);

      const out = await runWingCommand(
        testDir,
        path.join(validTestDir, wingFile),
        args,
        true
      );

      expect(out.all).toMatchSnapshot("stdout");

      // TODO snapshot .wsim contents
    },
  );
});
