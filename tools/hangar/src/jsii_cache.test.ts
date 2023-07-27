import { assert, expect, test } from "vitest";
import * as path from "path";
import fs from "fs/promises";
import { validTestDir, wingSdkDir } from "./paths";
import { runWingCommand } from "./utils";

test("JSII manifest cache", async () => {
  // Used awscdk test because it has manifest file redirects and uses gzip compression which is a good test case
  // in addtion to regular manifest files
  const app = "bring_awscdk.w";
  const appFile = path.join(validTestDir, app);
  const args = ["compile", "--target", "sim"];
  const manifestCacheExt = ".jsii.bincode";

  const awscdkLibDir = path.join(validTestDir, "node_modules", "aws-cdk-lib");

  // Test manifest with redirect and gzip compression
  await testManifestCache(awscdkLibDir);
  // Test simple manifest file used by all wing apps
  await testManifestCache(wingSdkDir);

  async function testManifestCache(module_dir: string) {
    // Get current time and wait a bit to make sure the cache file will have a different timestamp
    const startTime = new Date();
    await new Promise((resolve) => setTimeout(resolve, 2));

    // Make sure the awscdk lib dir exists and we have access to it (will throw otherwise)
    await fs.access(module_dir, fs.constants.W_OK | fs.constants.R_OK);

    // Remove any existing manifest cache files
    let files = (await fs.readdir(module_dir)).filter((file) => file.endsWith(manifestCacheExt));
    for (const file of files) {
      await fs.rm(path.join(module_dir, file));
    }

    // Compile the example (this should generate the manifest cache)
    await runWingCommand({
      cwd: validTestDir,
      wingFile: appFile,
      args,
      expectFailure: false,
    });

    // Make sure the manifest cache file was generated
    files = (await fs.readdir(module_dir)).filter((file) => file.endsWith(manifestCacheExt));
    assert(files.length === 1);
    let cache_file = files[0];
    let stat = await fs.stat(path.join(module_dir, cache_file));
    assert(stat.size > 0);
    assert(stat.mtime > startTime);

    // Wait a bit to make sure that if (for some reason) the manifest cache file is regenerated, it will have a different timestamp
    await new Promise((resolve) => setTimeout(resolve, 2));

    // Compile the example again (this should use the manifest cache)
    await runWingCommand({
      cwd: validTestDir,
      wingFile: appFile,
      args,
      expectFailure: false,
    });

    // Make sure no new manifest cache file was generated
    files = (await fs.readdir(module_dir)).filter((file) => file.endsWith(manifestCacheExt));
    assert(files.length === 1);
    assert(files[0] === cache_file);
    let stat2 = await fs.stat(path.join(module_dir, cache_file));
    assert(stat.size === stat2.size);
    assert(stat.mtime.getTime() === stat2.mtime.getTime());

    // Wait a bit so touching the manifest file will have a different timestamp and any generated cache file will also have a different timestamp
    await new Promise((resolve) => setTimeout(resolve, 2));

    // Touch the original manifest file and make sure the cache is regenerated
    let manifestFile = path.join(module_dir, ".jsii");
    const manifest = JSON.parse(await fs.readFile(manifestFile, "utf-8"));
    // If this is a redirect the touch the target file instead
    if (manifest.schema === "jsii/file-redirect") {
      manifestFile = path.join(module_dir, manifest.filename);
    }
    await fs.utimes(manifestFile, new Date(), new Date());

    // Compile the example again, this should regenerate the manifest cache and delete the old cache file
    await runWingCommand({
      cwd: validTestDir,
      wingFile: appFile,
      args,
      expectFailure: false,
    });

    // Make sure the manifest cache file was generated and the old one was deleted
    files = (await fs.readdir(module_dir)).filter((file) => file.endsWith(manifestCacheExt));
    assert(files.length === 1);
    assert(files[0] !== cache_file);
    cache_file = files[0];
    stat = await fs.stat(path.join(module_dir, cache_file));
    assert(stat.size > 0);
    assert(stat.mtime > stat2.mtime);
  }
});
