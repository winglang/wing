import { assert, expect, test } from "vitest";
import * as path from "path";
import fs from "fs/promises";
import { validTestDir, wingSdkDir } from "./paths";
import { runWingCommand } from "./utils";

test("JSII manifest cache", async () => {
  // Use awscdk test because it has manifest file redirects and uses gzip compression which is a good test case
  // in addtion to regular manifest files
  const app = "bring_awscdk.test.w";
  const appFile = path.join(validTestDir, app);
  const platforms = ["sim"];
  const args = ["compile"];
  const manifestCacheExt = ".jsii.speedy";

  const awscdkLibDir = path.join(validTestDir, "node_modules", "aws-cdk-lib");

  // Test manifest with redirect and gzip compression
  await testManifestCache(awscdkLibDir);
  // Test simple manifest file used by all wing apps
  await testManifestCache(wingSdkDir);

  async function testManifestCache(module_dir: string) {
    // Make sure the module lib dir exists and we have access to it (will throw otherwise)
    await fs.access(module_dir, fs.constants.W_OK | fs.constants.R_OK);

    // Compile the example (this should generate the manifest cache)
    await runWingCommand({
      cwd: validTestDir,
      wingFile: appFile,
      platforms,
      args,
      expectFailure: false,
    });

    // Make sure the manifest cache file was generated
    let files = (await fs.readdir(module_dir)).filter((file) =>
      file.endsWith(manifestCacheExt)
    );
    assert(
      files.length === 1,
      `Expected 1 manifest cache file in ${module_dir}, found ${files.length}: ${files}`
    );
    let cache_file = files[0];
    let stat = await fs.stat(path.join(module_dir, cache_file));
    assert(stat.size > 0);
  }
});
