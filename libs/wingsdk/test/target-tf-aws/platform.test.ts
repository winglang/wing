import { test, expect, describe, beforeEach } from "vitest";
import fs from "fs";
import path from "path";
import { mkdtemp } from "../util";
import { PlatformManager } from "../../src/platform";

describe("tf-aws platform parameters", () => {
  let platformManager;
  let tempdir;
  let wingParametersFile;
  
  beforeEach(() => {
    platformManager = new PlatformManager({platformPaths: ["tf-aws"]});
    tempdir = mkdtemp();
    wingParametersFile = path.join(tempdir, "wing.json");
    process.env.WING_VALUES_FILE = wingParametersFile;
  });

  test("throws if private subnet ids are not an array", () => {
    // GIVEN
    const providedParameters = {
      "tf-aws": {
        vpc: "existing",
        vpc_id: "vpc-123",
        private_subnet_ids: "subnet-123",
      },
    };
    fs.writeFileSync(wingParametersFile, JSON.stringify(providedParameters));

    // WHEN
    const app = platformManager.createApp({ outdir: tempdir, entrypointDir: tempdir });

    // THEN
    expect(() => app.synth()).toThrow(/must be array/);
  });

  test("does not throw if private subnet ids are an array", () => {
    // GIVEN
    const providedParameters = {
      "tf-aws": {
        vpc: "existing",
        vpc_id: "vpc-123",
        private_subnet_ids: ["subnet-123"],
      },
    };
    fs.writeFileSync(wingParametersFile, JSON.stringify(providedParameters));

    // WHEN
    const app = platformManager.createApp({ outdir: tempdir, entrypointDir: tempdir });

    // THEN
    expect(() => app.synth()).not.toThrow();
  });

  test("require private subnet ids, when vpc = existing", () => {
    // GIVEN
    const providedParameters = {
      "tf-aws": {
        vpc: "existing",
        vpc_api_gateway: true,
        vpc_lambda: true,
      },
    };
    fs.writeFileSync(wingParametersFile, JSON.stringify(providedParameters));
    
    // WHEN
    const app = platformManager.createApp({ outdir: tempdir, entrypointDir: tempdir });
    
    // THEN
    expect(() => app.synth()).toThrow(/must have required property 'private_subnet_ids'/);

  });

  test("does not require public subnet ids, when vpc = existing", () => {
    // GIVEN
    const providedParameters = {
      "tf-aws": {
        vpc: "existing",
        vpc_id: "vpc-123",
        private_subnet_ids: ["subnet-123"],
      },
    };
    fs.writeFileSync(wingParametersFile, JSON.stringify(providedParameters));
    
    // WHEN
    const app = platformManager.createApp({ outdir: tempdir, entrypointDir: tempdir });
    
    // THEN
    expect(() => app.synth()).not.toThrow();
  });
})