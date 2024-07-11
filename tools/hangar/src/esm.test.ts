import { expect, it } from "vitest";
import { join } from "path";
import { validTestDir } from "./paths";
import { runWingCommand } from "./utils";

it("tests module package type", async () => {
  const appFile = join(validTestDir, "esm", "module_type.test.w");

  const out = await runWingCommand({
    cwd: validTestDir,
    wingFile: join(validTestDir, "esm", "module_type.test.w"),
    platforms: ["sim"],
    args: ["test"],
    expectFailure: false,
  });

  expect(out.stdout).toMatchSnapshot();
});
