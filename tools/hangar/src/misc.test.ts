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

  const result = await runWingCommand({
    cwd: workdir,
    wingFile: entrypoint,
    args: ["compile", "--target", "tf-gcp"],
    shouldSucceed: false,
    env: {
      GOOGLE_PROJECT_ID: "test-project",
      GOOGLE_STORAGE_LOCATION: "us-central1",
    },
  });

  expect(sanitizeErrorMessage(result.stderr)).toMatchInlineSnapshot(`
    "Error: ERROR: Unable to create an instance of abstract type \\"@winglang/sdk.cloud.Schedule\\" for this target

    target/test.tfgcp.[REDACTED].tmp/.wing/preflight.js:9
         constructor(scope, id) {
           super(scope, id);
    >>     this.node.root.newAbstract(\\"@winglang/sdk.cloud.Schedule\\",this,\\"cloud.Schedule\\");
         }
       }

        at compile <PATH>"
  `);
});

function sanitizeErrorMessage(inputString: string): string {
  let sanitizedString = inputString
    // Normalize paths
    .replaceAll("\\", "/")
    // Normalize line endings
    .replaceAll("\r\n", "\n")
    // Remove random numbers from generated test artifact folder
    // e.g. "{...}.tfgcp.927822.tmp/{...}" => "{...}.tfgcp.[REDACTED].tmp/{...}"
    .replaceAll(/\.tfgcp\.\d+\.tmp/g, ".tfgcp.[REDACTED].tmp")
    .replaceAll(/\([\/\\A-Za-z.:0-9\-\_]+\)/g, "<PATH>");

  return sanitizedString;
}
