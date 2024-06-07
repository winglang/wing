import { describe, expect, test } from "vitest";
import * as path from "path";
import fs from "fs";
import { platformsDir, tmpDir } from "./paths";
import {
  runWingCommand,
  sanitize_json_paths,
  tfResourcesOfCount,
} from "./utils";
import { tmpdir } from "os";
import { Testing } from "cdktf";

describe("Multiple platforms", () => {
  const app = "example.main.w";
  const appFile = path.join(platformsDir, app);

  test("only first platform app is used", async () => {
    const args = ["compile"];
    const platforms = ["tf-aws", "tf-azure"];
    const targetDir = path.join(platformsDir, "target", "example.main.tfaws");

    await runWingCommand({
      cwd: tmpDir,
      platforms,
      wingFile: appFile,
      args,
      expectFailure: false,
    });

    const terraformOutput = sanitize_json_paths(
      path.join(targetDir, "main.tf.json")
    );

    const terraformOutputString = JSON.stringify(terraformOutput);

    expect(terraformOutput).toMatchSnapshot();
    // tf-azure does not have a Topic impl, so it falls back to tf-aws
    expect(tfResourcesOfCount(terraformOutputString, "aws_sns_topic")).toEqual(
      1
    );
  });
});

describe("Platform with parameters", () => {
  const platformParameters = {
    type: "object",
    required: ["a", "b", "c"],
    properties: {
      a: { type: "string" },
      b: { type: "number" },
      c: { type: "boolean" },
      optionals: {
        type: "object",
        properties: {
          seeNoEvil: { type: "boolean" },
          hearNoEvil: { type: "boolean" },
          speakNoEvil: {
            type: "boolean",
          },
        },
        allOf: [
          {
            $comment:
              "If see no evil, then we need to know if we hear or speak evil",
            if: { properties: { seeNoEvil: { const: true } } },
            then: { required: ["hearNoEvil", "speakNoEvil"] },
          },
          {
            $comment:
              "If we hear or speak evil, then we need to know if we see or speak evil",
            if: { properties: { hearNoEvil: { const: true } } },
            then: { required: ["seeNoEvil", "speakNoEvil"] },
          },
          {
            $comment:
              "If we see or speak evil, then we need to know if we speak or hear evil",
            if: { properties: { seeNoEvil: { const: true } } },
            then: { required: ["speakNoEvil", "hearNoEvil"] },
          },
        ],
      },
    },
  };

  const platformCode = `
  exports.Platform = class Platform {
    target = "*";
  
    parameters = ${JSON.stringify(platformParameters)};
  }
`;
  const app = "main.w";
  const appFile = path.join(platformsDir, app);
  const tempdir = fs.mkdtempSync(path.join(tmpdir(), "platform-parameters"));
  const platformWithParametersFile = path.join(
    tempdir,
    "platform-with-parameters.js"
  );
  fs.writeFileSync(platformWithParametersFile, platformCode);

  test("will compile if all required parameters are provided", async () => {
    // GIVEN
    const platforms = ["tf-aws", platformWithParametersFile];
    const params = {
      a: "some-value",
      b: 123,
      c: false,
    };
    const paramFile = path.join(tempdir, "params.json");
    fs.writeFileSync(paramFile, JSON.stringify(params));

    const args = ["compile", "--values", paramFile];

    // WHEN
    const output = await runWingCommand({
      cwd: tmpDir,
      platforms,
      wingFile: appFile,
      args,
      expectFailure: false,
    });

    // THEN
    expect(output.stderr).toBe("");
  });

  test("will throw if missing required parameters", async () => {
    // GIVEN
    const args = ["compile"];
    const platforms = ["tf-aws", platformWithParametersFile];

    // WHEN
    const output = await runWingCommand({
      cwd: tmpDir,
      platforms,
      wingFile: appFile,
      args,
      expectFailure: true,
    });

    // THEN
    expect(output.stderr).toContain("Parameter validation errors:");
    expect(output.stderr).toContain("must have required property 'a'");
    expect(output.stderr).toContain("must have required property 'b'");
    expect(output.stderr).toContain("must have required property 'c'");
  });

  test("will throw if missing conditionally required parameters", async () => {
    // GIVEN
    const platforms = ["tf-aws", platformWithParametersFile];
    const params = {
      a: "some-value",
      b: 123,
      c: false,
      optionals: {
        seeNoEvil: true,
      },
    };
    const paramFile = path.join(tempdir, "params.json");
    fs.writeFileSync(paramFile, JSON.stringify(params));
    const args = ["compile", "--values", paramFile];
    // WHEN
    const output = await runWingCommand({
      cwd: tmpDir,
      platforms,
      wingFile: appFile,
      args,
      expectFailure: true,
    });

    // THEN
    expect(output.stderr).toContain("Parameter validation errors:");
    expect(output.stderr).toContain("must have required property 'hearNoEvil'");
    expect(output.stderr).toContain(
      "must have required property 'speakNoEvil'"
    );
  });
});

describe("Platform examples", () => {
  const app = "main.w";
  const appFile = path.join(platformsDir, app);

  describe("External platform", () => {
    const args = ["compile"];
    const basePlatforms = ["@winglang/platform-awscdk"];
    const targetDir = path.join(platformsDir, "target", "main.tfaws");

    test("compile awscdk", async () => {
      process.env.CDK_STACK_NAME = "platform-test";
      await runWingCommand({
        cwd: tmpDir,
        platforms: [...basePlatforms],
        wingFile: appFile,
        args,
        expectFailure: false,
      });
    });
  });

  describe("Platform folder with relative dependencies", () => {
    const args = ["compile"];
    const basePlatforms = ["tf-aws"];

    test("compile local package from folder", async () => {
      const platform = path.join(platformsDir, "local-package");
      await runWingCommand({
        cwd: tmpDir,
        platforms: [...basePlatforms, platform],
        wingFile: appFile,
        args,
        expectFailure: false,
      });
    });

    test("compile local package from file", async () => {
      const platform = path.join(platformsDir, "local-package", "index.js");
      await runWingCommand({
        cwd: tmpDir,
        platforms: [...basePlatforms, platform],
        wingFile: appFile,
        args,
        expectFailure: false,
      });
    });
  });

  describe("AWS target platform", () => {
    const args = ["compile"];
    const basePlatforms = ["tf-aws"];
    const targetDir = path.join(platformsDir, "target", "main.tfaws");

    test("permission-boundary.js", async () => {
      const platform = path.join(platformsDir, "permission-boundary.js");

      const expectedPermissionBoundaryArn = "some:fake:arn:SUPERADMIN";
      process.env.PERMISSION_BOUNDARY_ARN = expectedPermissionBoundaryArn;
      await runWingCommand({
        cwd: tmpDir,
        platforms: [...basePlatforms, platform],
        wingFile: appFile,
        args,
        expectFailure: false,
      });

      const terraformOutput = sanitize_json_paths(
        path.join(targetDir, "main.tf.json")
      );
      const terraformOutputString = JSON.stringify(terraformOutput);

      expect(terraformOutput).toMatchSnapshot();
      expect(
        Testing.toHaveResourceWithProperties(
          terraformOutputString,
          "aws_iam_role",
          {
            permissions_boundary: expectedPermissionBoundaryArn,
          }
        )
      ).toEqual(true);
    });

    test("replicate-s3.js", async () => {
      const platform = path.join(platformsDir, "replicate-s3.js");

      const replicaPrefix = "some-prefix";
      const replicaStorageClass = "STANDARD";
      process.env.REPLICA_PREFIX = replicaPrefix;
      process.env.REPLICA_STORAGE_CLASS = replicaStorageClass;

      await runWingCommand({
        cwd: tmpDir,
        platforms: [...basePlatforms, platform],
        wingFile: appFile,
        args,
        expectFailure: false,
      });

      const terraformOutput = sanitize_json_paths(
        path.join(targetDir, "main.tf.json")
      );
      const terraformOutputString = JSON.stringify(terraformOutput);

      expect(terraformOutput).toMatchSnapshot();
      expect(
        tfResourcesOfCount(terraformOutputString, "aws_s3_bucket")
      ).toEqual(4); // 2 buckets + 2 replicas
      expect(
        tfResourcesOfCount(terraformOutputString, "aws_s3_bucket_versioning")
      ).toEqual(4); // 2 buckets + 2 replicas
      expect(
        tfResourcesOfCount(
          terraformOutputString,
          "aws_s3_bucket_replication_configuration"
        )
      ).toEqual(2); // 2 replica rules
    });

    describe("tf-backend.js", () => {
      const tfBackendPluginName = "tf-backend.js";
      test("s3 backend", async () => {
        const platform = path.join(platformsDir, tfBackendPluginName);

        const tfBackend = "s3";
        const tfBackendBucket = "my-wing-bucket";
        const tfBackendBucketRegion = "us-east-1";
        const stateFile = "some-state-file.tfstate";
        process.env.TF_BACKEND = tfBackend;
        process.env.TF_BACKEND_BUCKET = tfBackendBucket;
        process.env.TF_BACKEND_BUCKET_REGION = tfBackendBucketRegion;
        process.env.STATE_FILE = stateFile;

        await runWingCommand({
          cwd: tmpDir,
          platforms: [...basePlatforms, platform],
          wingFile: appFile,
          args,
          expectFailure: false,
        });

        const tfPath = path.join(targetDir, "main.tf.json");
        const terraformOutput = sanitize_json_paths(tfPath);
        const unsanitizedTerraformOutput = JSON.parse(
          fs.readFileSync(tfPath, "utf-8")
        );

        expect(terraformOutput).toMatchSnapshot();
        expect(unsanitizedTerraformOutput.terraform.backend).toEqual({
          s3: {
            bucket: tfBackendBucket,
            region: tfBackendBucketRegion,
            key: stateFile,
          },
        });
      });

      test("gcp backend", async () => {
        const platform = path.join(platformsDir, tfBackendPluginName);

        const tfBackend = "gcs";
        const tfBackendBucket = "my-wing-bucket";
        const stateFile = "some-state-file.tfstate";
        process.env.TF_BACKEND = tfBackend;
        process.env.TF_BACKEND_BUCKET = tfBackendBucket;
        process.env.STATE_FILE = stateFile;

        await runWingCommand({
          cwd: tmpDir,
          platforms: [...basePlatforms, platform],
          wingFile: appFile,
          args,
          expectFailure: false,
        });

        const tfPath = path.join(targetDir, "main.tf.json");
        const terraformOutput = sanitize_json_paths(tfPath);
        const unsanitizedTerraformOutput = JSON.parse(
          fs.readFileSync(tfPath, "utf-8")
        );

        expect(terraformOutput).toMatchSnapshot();
        expect(unsanitizedTerraformOutput.terraform.backend).toEqual({
          gcs: {
            bucket: tfBackendBucket,
            prefix: stateFile,
          },
        });
      });

      test("azurerm backend", async () => {
        const platform = path.join(platformsDir, tfBackendPluginName);

        const tfBackend = "azurerm";
        const tfBackendStorageAccountName = "my-wing-storage-account";
        const tfBackendContainerName = "my-wing-container";
        const tfBackendResourceGroupName = "my-wing-resource-group";
        const tfBackendBucket = "my-wing-bucket";
        const stateFile = "some-state-file.tfstate";
        process.env.TF_BACKEND = tfBackend;
        process.env.TF_BACKEND_BUCKET = tfBackendBucket;
        process.env.TF_BACKEND_STORAGE_ACCOUNT_NAME =
          tfBackendStorageAccountName;
        process.env.TF_BACKEND_CONTAINER_NAME = tfBackendContainerName;
        process.env.TF_BACKEND_RESOURCE_GROUP_NAME = tfBackendResourceGroupName;
        process.env.STATE_FILE = stateFile;

        await runWingCommand({
          cwd: tmpDir,
          wingFile: appFile,
          platforms: [...basePlatforms, platform],
          args,
          expectFailure: false,
        });

        const tfPath = path.join(targetDir, "main.tf.json");
        const terraformOutput = sanitize_json_paths(tfPath);
        const unsanitizedTerraformOutput = JSON.parse(
          fs.readFileSync(tfPath, "utf-8")
        );

        expect(terraformOutput).toMatchSnapshot();
        expect(unsanitizedTerraformOutput.terraform.backend).toEqual({
          azurerm: {
            resource_group_name: tfBackendResourceGroupName,
            storage_account_name: tfBackendStorageAccountName,
            container_name: tfBackendContainerName,
            key: stateFile,
          },
        });
      });
    });
  });
});

describe("Implicit platform files", () => {
  const platformParameters = {
    type: "object",
    properties: {
      foo: {
        type: "string",
      },
    },
    required: ["foo"],
  };

  // Simple platform with a required parameter
  const platformCode = `
  exports.Platform = class Platform {
    target = "*";
    parameters = ${JSON.stringify(platformParameters)};
  }
  `;

  describe("can be defined", () => {
    test("in the source directory", async () => {
      // GIVEN
      const wingCode = `
        bring cloud;

        let b = new cloud.Bucket();
      `;
      const args = ["compile"];
      const tempdir = fs.mkdtempSync(
        path.join(tmpdir(), "platform-parameters")
      );

      fs.writeFileSync(path.join(tempdir, "main.w"), wingCode);
      fs.writeFileSync(path.join(tempdir, "wplatform.js"), platformCode);

      // WHEN
      const output = await runWingCommand({
        cwd: tempdir,
        wingFile: path.join(tempdir, "main.w"),
        args,
        expectFailure: true,
      });

      // THEN
      expect(output.stderr).toContain("Parameter validation errors:");
      expect(output.stderr).toContain("- must have required property 'foo'");
    });

    test("with a .wplatform.js extension", async () => {
      // GIVEN
      const wingCode = `
        bring cloud;

        let b = new cloud.Bucket();
      `;
      const args = ["compile"];
      const tempdir = fs.mkdtempSync(
        path.join(tmpdir(), "platform-parameters")
      );

      fs.writeFileSync(path.join(tempdir, "main.w"), wingCode);
      fs.writeFileSync(
        path.join(tempdir, "whatever.wplatform.js"),
        platformCode
      );

      // WHEN
      const output = await runWingCommand({
        cwd: tempdir,
        wingFile: path.join(tempdir, "main.w"),
        args,
        expectFailure: true,
      });

      console.log("STDOUT: ", output.stdout);
      console.log("STDERR: ", output.stderr);

      // THEN
      expect(output.stderr).toContain("Parameter validation errors:");
      expect(output.stderr).toContain("- must have required property 'foo'");
    });

    test("imported directory", async () => {
      // GIVEN
      const wingCode = `
        bring cloud;
        bring "./lib" as myLib;

        let b = new cloud.Bucket();
      `;

      const args = ["compile"];
      const tempdir = fs.mkdtempSync(
        path.join(tmpdir(), "platform-parameters")
      );
      fs.mkdirSync(path.join(tempdir, "lib"));
      fs.writeFileSync(path.join(tempdir, "main.w"), wingCode);
      fs.writeFileSync(path.join(tempdir, "lib", "dummy.w"), "");
      fs.writeFileSync(path.join(tempdir, "lib", "wplatform.js"), platformCode);

      // WHEN
      const output = await runWingCommand({
        cwd: tempdir,
        wingFile: path.join(tempdir, "main.w"),
        args,
        expectFailure: true,
      });

      // THEN
      expect(output.stderr).toContain("Parameter validation errors:");
      expect(output.stderr).toContain("- must have required property 'foo'");
    });

    test("in multiple imported directories", async () => {
      // GIVEN
      const wingCode = `
        bring cloud;
        bring "./lib" as myLib;
        bring "./lib2" as myLib2;

        let b = new cloud.Bucket();
      `;
      const otherPlatformCode = `
        exports.Platform = class Platform {
          target = "*";
          parameters = {
            type: "object",
            properties: {
              bar: {
                type: "string",
              }
            },
            required: ["bar"]
          }
        }
      `;
      const args = ["compile"];
      const tempdir = fs.mkdtempSync(
        path.join(tmpdir(), "platform-parameters")
      );
      fs.mkdirSync(path.join(tempdir, "lib"));
      fs.mkdirSync(path.join(tempdir, "lib2"));
      fs.writeFileSync(path.join(tempdir, "main.w"), wingCode);
      fs.writeFileSync(path.join(tempdir, "lib", "dummy.w"), "");
      fs.writeFileSync(path.join(tempdir, "lib", "wplatform.js"), platformCode);
      fs.writeFileSync(path.join(tempdir, "lib2", "dummy.w"), "");
      fs.writeFileSync(
        path.join(tempdir, "lib2", "wplatform.js"),
        otherPlatformCode
      );

      // WHEN
      const output = await runWingCommand({
        cwd: tempdir,
        wingFile: path.join(tempdir, "main.w"),
        args,
        expectFailure: true,
      });

      // THEN
      expect(output.stderr).toContain("Parameter validation errors:");
      expect(output.stderr).toContain("- must have required property 'foo'");
      expect(output.stderr).toContain("- must have required property 'bar'");
    });
  });
});
