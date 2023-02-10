import * as fs from "fs-extra";
import * as path from "path";
import { expect, test } from "vitest";
import * as walk from "walkdir";
import { tmpDir, validTestDir, validWingFiles } from "./paths";
import { runWingCommand, sanitize_json_paths } from "./utils";

test.each(validWingFiles)(
  "wing compile --target tf-aws %s",
  async (wingFile) => {
    const args = ["compile", "--target", "tf-aws"];
    const testDir = path.join(tmpDir, `${wingFile}_cdktf`);
    const targetDir = path.join(
      testDir,
      "target",
      `${path.basename(wingFile, ".w")}.tfaws`
    );
    const tf_json = path.join(targetDir, "main.tf.json");

    fs.mkdirpSync(testDir);

    await runWingCommand(
      testDir,
      path.join(validTestDir, wingFile),
      args,
      true
    );

    const npx_tfJson = sanitize_json_paths(tf_json);

    expect(npx_tfJson).toMatchSnapshot("main.tf.json");

    // get all files in .wing dir
    const dotWingFiles = walk.sync(path.join(targetDir, ".wing"), {
      return_object: true,
    });
    for (const irFile in dotWingFiles) {
      if (dotWingFiles[irFile].isFile()) {
        expect(fs.readFileSync(irFile, "utf8")).toMatchSnapshot(
          path.basename(irFile)
        );
      }
    }
  },
  {
    timeout: 1000 * 120,
  }
);
