import { expect, test } from "vitest";
import * as path from "path";
import fs from "fs/promises";
import { validTestDir } from "./paths";
import { runWingCommand } from "./utils";

test("tree.json for an app with many resources", async () => {
  const app = "resource.test.w";
  const appFile = path.join(validTestDir, app);
  const args = ["compile", "--target", "tf-aws"];
  const targetDir = path.join(validTestDir, "target", "resource.test.tfaws");

  await runWingCommand({
    cwd: validTestDir,
    wingFile: appFile,
    args,
    expectFailure: false,
  });

  const treeJson = JSON.parse(
    await fs.readFile(path.join(targetDir, "tree.json"), "utf-8")
  );
  expect(treeJson).toMatchSnapshot();
});
