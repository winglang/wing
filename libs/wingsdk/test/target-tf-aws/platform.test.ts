import fs from "fs";
import path from "path";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
  CreateSecretCommand,
  UpdateSecretCommand,
} from "@aws-sdk/client-secrets-manager";
import { mockClient } from "aws-sdk-client-mock";
import { test, expect, describe, beforeEach } from "vitest";
import { Function } from "../../src/cloud";
import { inflight } from "../../src/core";
import { PlatformManager } from "../../src/platform";
import * as tfaws from "../../src/target-tf-aws/platform";
import { mkdtemp } from "../util";
import "aws-sdk-client-mock-jest";

const secretsManagerClientMock = mockClient(SecretsManagerClient);

describe("tf-aws platform parameters", () => {
  let platformManager;
  let tempdir;
  let wingParametersFile;
  let classFactory;

  beforeEach(() => {
    platformManager = new PlatformManager({ platformPaths: ["tf-aws"] });
    tempdir = mkdtemp();
    wingParametersFile = path.join(tempdir, "wing.json");
    process.env.WING_VALUES_FILE = wingParametersFile;
    classFactory = platformManager.createClassFactory();
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
      classFactory,
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
      classFactory,
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
      classFactory,
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
      classFactory,
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
      classFactory,
    });

    new Function(
      app,
      "Function",
      inflight(async () => {
        return undefined;
      })
    );

    // THEN
    const output = app.synth();
    const tfFunction = JSON.parse(output).resource.aws_lambda_function.Function;
    expect(tfFunction.vpc_config.subnet_ids.length).toEqual(2);
  });
});

describe("tf-aws platoform storeSecrets", async () => {
  beforeEach(() => {
    secretsManagerClientMock.reset();
    secretsManagerClientMock.on(CreateSecretCommand).callsFake((command) => {
      return {};
    });

    secretsManagerClientMock.on(UpdateSecretCommand).callsFake((command) => {
      return {};
    });
  });

  describe("when secret does not exist", () => {
    beforeEach(() => {
      secretsManagerClientMock.on(GetSecretValueCommand).rejects({
        name: "ResourceNotFoundException",
        message: "Secret does not exist",
      });
    });

    test("stores secrets in plain text", async () => {
      // GIVEN
      const platform = new tfaws.Platform();
      const secrets = { secret1: "value1" };

      // WHEN
      await platform.storeSecrets(secrets);

      // THEN
      expect(secretsManagerClientMock).toHaveReceivedCommandTimes(
        CreateSecretCommand,
        1
      );
      expect(secretsManagerClientMock).toHaveReceivedCommandWith(
        CreateSecretCommand,
        { SecretString: "value1" }
      );
    });
  });

  describe("when secret exists", () => {
    beforeEach(() => {
      secretsManagerClientMock.on(GetSecretValueCommand).resolves({});
    });

    test("updates existing secrets", async () => {
      // GIVEN
      const platform = new tfaws.Platform();
      const secrets = { secret1: "value1" };

      // WHEN
      await platform.storeSecrets(secrets);

      // THEN
      expect(secretsManagerClientMock).toHaveReceivedCommandTimes(
        UpdateSecretCommand,
        1
      );
      expect(secretsManagerClientMock).toHaveReceivedCommandWith(
        UpdateSecretCommand,
        { SecretString: "value1" }
      );
    });
  });
});
