import { expect, test } from "vitest";
import * as path from "path";
import fs from "fs-extra";
import { validTestDir } from "./paths";
import {
  runWingCommand,
} from "./utils";

test("tree.json for an app with many resources", async () => {
  const app = "resource.w";
  const appFile = path.join(validTestDir, app);
  const args = ["compile", "--target", "tf-aws"];
  const targetDir = path.join(validTestDir, "target", "resource.tfaws");

  await runWingCommand({
    cwd: validTestDir,
    wingFile: appFile,
    args,
    shouldSucceed: true,
  });

  const treeJson = await fs.readJson(path.join(targetDir, "tree.json"));
  expect(treeJson).toMatchSnapshot();
});