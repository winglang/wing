import { mkdtemp, writeFile } from "fs/promises";
import { join } from "path";
import { test } from "vitest";
import { runWingCommand } from "./utils";
import { tmpDir } from "./paths";

// checks that if a resource is not supported for a certain target an error is emitted
test("unsupported resource in target", async ({ expect }) => {
  const workdir = await mkdtemp(join(tmpDir, "wing-test"));
  const entrypoint = join(workdir, "main.w");

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
    platforms: ["tf-gcp"],
    args: ["compile"],
    expectFailure: true,
    env: {
      GOOGLE_PROJECT_ID: "test-project",
      GOOGLE_STORAGE_LOCATION: "us-central1",
    },
  });

  expect(sanitizeOutput(result.stderr)).toMatchInlineSnapshot('"Error: A Google Cloud region must be specified through the GOOGLE_REGION environment variable."');
});

function sanitizeOutput(inputString: string): string {
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
