import { expect, test } from "vitest";
import * as path from "path";
import fs from "fs/promises";
import { validTestDir } from "./paths";
import { runWingCommand } from "./utils";

test("tree.json for an app with many resources", async () => {
  const app = "resource.test.w";
  const appFile = path.join(validTestDir, app);
  const platforms = ["tf-aws"];
  const args = ["compile"];
  const targetDir = path.join(validTestDir, "target", "resource.test.tfaws");

  await runWingCommand({
    cwd: validTestDir,
    wingFile: appFile,
    platforms,
    args,
    expectFailure: false,
  });

  const treeJson = JSON.parse(
    await fs.readFile(path.join(targetDir, "tree.json"), "utf-8")
  );
  expect(treeJson).toMatchSnapshot();
});
