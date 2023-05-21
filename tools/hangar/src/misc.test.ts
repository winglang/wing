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
      },
    }).then((result) => (result.stdout = sanitizeErrorMessage(result.stdout)))
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    sanitizeErrorMessage(`
    "ERROR: Unable to create an instance of abstract type \\"@winglang/sdk.cloud.Schedule\\" for this target

    target/test.tfgcp.872059.tmp/.wing/preflight.js:8
         constructor(scope, id) {
           super(scope, id);
    >>     this.node.root.newAbstract(\\"@winglang/sdk.cloud.Schedule\\",this,\\"cloud.Schedule\\");
         }
       }
    "
  `)
  );
});

// Remove random numbers from generated test artifact folder
// e.g. "{...}.tfgcp.927822.tmp/{...}" => "{...}.tfgcp.[REDACTED].tmp/{...}"
function sanitizeErrorMessage(inputString: string): string {
  return inputString.replaceAll(/\.tfgcp\.\d+\.tmp/g, ".tfgcp.[REDACTED].tmp");
}
