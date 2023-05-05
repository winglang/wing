import { mkdtemp, writeFile } from "fs-extra";
import { join } from "path";
import { test } from "vitest";
import { runWingCommand } from "./utils";
import { tmpDir } from "./paths";

// checks that if a resource is not supported for a certain target an error is emitted
test("unsupported resource in target", async ({ expect }) => {
  const workdir = await mkdtemp(join(tmpDir, "wing-test"));
  const entrypoint = join(workdir, "test.w");

  // for now, GCP doesn't support schedules. at some point we will need to update this test
  await writeFile(
    entrypoint,
    `
    bring cloud;
    new cloud.Schedule();
  `
  );

  await expect(
    runWingCommand({
      cwd: workdir,
      wingFile: entrypoint,
      args: ["compile", "--target", "tf-gcp"],
      shouldSucceed: true,
      env: {
        GOOGLE_PROJECT_ID: "test-project",
        GOOGLE_STORAGE_LOCATION: "us-central1",
      }
    })
  ).rejects.toThrowErrorMatchingInlineSnapshot('"Unable to create an instance of abstract type \\"@winglang/sdk.cloud.Schedule\\" for this target"');
});
