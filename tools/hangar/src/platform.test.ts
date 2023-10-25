import { describe, expect, test } from "vitest";
import * as path from "path";
import fs from "fs";
import { platformsDir, tmpDir } from "./paths";
import {
  runWingCommand,
  sanitize_json_paths,
  tfResourcesOfCount,
} from "./utils";
import { Testing } from "cdktf";

describe("Platform examples", () => {
  const app = "main.w";
  const appFile = path.join(platformsDir, app);

  describe("AWS target platform", () => {
    const args = ["compile"];
    const platforms = ["tf-aws"]
    const targetDir = path.join(platformsDir, "target", "main.tfaws");

    test("permission-boundary.js", async () => {
      const plugin = path.join(platformsDir, "permission-boundary.js");
      platforms.push(plugin);

      const expectedPermissionBoundaryArn = "some:fake:arn:SUPERADMIN";
      process.env.PERMISSION_BOUNDARY_ARN = expectedPermissionBoundaryArn;
      await runWingCommand({
        cwd: tmpDir,
        platforms,
        wingFile: appFile,
        args,
        expectFailure: false
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
      const plugin = path.join(platformsDir, "replicate-s3.js");
      platforms.push(plugin);
      const replicaPrefix = "some-prefix";
      const replicaStorageClass = "STANDARD";
      process.env.REPLICA_PREFIX = replicaPrefix;
      process.env.REPLICA_STORAGE_CLASS = replicaStorageClass;

      await runWingCommand({
        cwd: tmpDir,
        platforms,
        wingFile: appFile,
        args,
        expectFailure: false
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
        const plugin = path.join(platformsDir, tfBackendPluginName);
        platforms.push(plugin);
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
          platforms,
          wingFile: appFile,
          args,
          expectFailure: false
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
        const plugin = path.join(platformsDir, tfBackendPluginName);
        platforms.push(plugin);
        const tfBackend = "gcs";
        const tfBackendBucket = "my-wing-bucket";
        const stateFile = "some-state-file.tfstate";
        process.env.TF_BACKEND = tfBackend;
        process.env.TF_BACKEND_BUCKET = tfBackendBucket;
        process.env.STATE_FILE = stateFile;

        await runWingCommand({
          cwd: tmpDir,
          platforms,
          wingFile: appFile,
          args,
          expectFailure: false
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
        const plugin = path.join(platformsDir, tfBackendPluginName);
        platforms.push(plugin);
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
          platforms,
          args,
          expectFailure: false
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
