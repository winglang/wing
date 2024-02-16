import fs from "fs";
import path from "path";
import { test, expect, describe, beforeEach } from "vitest";
import { Function } from "../../src/cloud";
import { PlatformManager } from "../../src/platform";
import { Testing } from "../../src/simulator";
import { mkdtemp } from "../util";

describe("tf-aws platform parameters", () => {
  let platformManager;
  let tempdir;
  let wingParametersFile;

  beforeEach(() => {
    platformManager = new PlatformManager({ platformPaths: ["tf-aws"] });
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
    const app = platformManager.createApp({
      outdir: tempdir,
      entrypointDir: tempdir,
    });

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
    const app = platformManager.createApp({
      outdir: tempdir,
      entrypointDir: tempdir,
    });

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
    const app = platformManager.createApp({
      outdir: tempdir,
      entrypointDir: tempdir,
    });
    // THEN
    expect(() => app.synth()).toThrow(
      /must have required property 'private_subnet_ids'/
    );
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
    const app = platformManager.createApp({
      outdir: tempdir,
      entrypointDir: tempdir,
    });
    // THEN
    expect(() => app.synth()).not.toThrow();
  });

  test("all private subnets are used when creating functions", () => {
    // GIVEN
    const providedParameters = {
      "tf-aws": {
        vpc: "existing",
        vpc_id: "vpc-123",
        private_subnet_ids: ["subnet-123", "subnet-456"],
        vpc_lambda: true,
      },
    };
    fs.writeFileSync(wingParametersFile, JSON.stringify(providedParameters));

    // WHEN
    const app = platformManager.createApp({
      outdir: tempdir,
      entrypointDir: tempdir,
    });
    const inflight = Testing.makeHandler("");
    new Function(app, "Function", inflight);

    // THEN
    const output = app.synth();
    const tfFunction = JSON.parse(output).resource.aws_lambda_function.Function;
    expect(tfFunction.vpc_config.subnet_ids.length).toEqual(2);
  });
});
