import {describe, expect, test} from "vitest"
import * as path from "path";
import fs from "fs-extra";
import { pluginsDir, tmpDir } from "./paths";
import { runWingCommand, tfResourcesOfCount } from "./utils";
import * as cdktf from "cdktf";

describe("Plugin examples", () => {
  const app = "app.w";
  const appFile = path.join(pluginsDir, app);

  describe("AWS target plugins", () => {
    const args = ["compile", "--target", "tf-aws"];
    const targetDir = path.join(pluginsDir, "target", "app.tfaws");

    test("permission-boundary.js", async () => {
      const plugin = path.join(pluginsDir, "permission-boundary.js");
      
      const expectedPermissionBoundaryArn = "some:fake:arn:SUPERADMIN";
      process.env.PERMISSION_BOUNDARY_ARN = expectedPermissionBoundaryArn;
      
      await runWingCommand({
        cwd: tmpDir,
        wingFile: appFile,
        args,
        shouldSucceed: true,
        plugins: [plugin],
      });
  
      const terraformOutput = fs.readFileSync(path.join(targetDir, "main.tf.json"), "utf-8");
  
      expect(JSON.parse(terraformOutput)).toMatchSnapshot();
      expect(
        cdktf.Testing.toHaveResourceWithProperties(terraformOutput, "aws_iam_role", {
          permissions_boundary: expectedPermissionBoundaryArn,
        })
      ).toEqual(true);
    });
  
    test("replicate-s3.js", async () => {
      const plugin = path.join(pluginsDir, "replicate-s3.js");
      const replicaPrefix = "some-prefix";
      const replicaStorageClass = "STANDARD";
      process.env.REPLICA_PREFIX = replicaPrefix;
      process.env.REPLICA_STORAGE_CLASS = replicaStorageClass;

      await runWingCommand({
        cwd: tmpDir,
        wingFile: appFile,
        args,
        shouldSucceed: true,
        plugins: [plugin],
      });

      const terraformOutput = fs.readFileSync(path.join(targetDir, "main.tf.json"), "utf-8");
  
      expect(JSON.parse(terraformOutput)).toMatchSnapshot();
      expect(tfResourcesOfCount(terraformOutput, "aws_s3_bucket")).toEqual(4); // 2 buckets + 2 replicas
      expect(tfResourcesOfCount(terraformOutput, "aws_s3_bucket_versioning")).toEqual(4); // 2 buckets + 2 replicas
      expect(
        tfResourcesOfCount(terraformOutput, "aws_s3_bucket_replication_configuration")
      ).toEqual(2); // 2 replica rules
    });

    test("tf-s3-backend.js", async () => {
      const plugin = path.join(pluginsDir, "tf-s3-backend.js");
      const tfBackendBucket = "my-wing-bucket";
      const tfBackendBucketRegion = "us-east-1";
      const stateFile = "some-state-file.tfstate";
      process.env.TF_BACKEND_BUCKET = tfBackendBucket;
      process.env.TF_BACKEND_BUCKET_REGION = tfBackendBucketRegion;
      process.env.STATE_FILE = stateFile;

      await runWingCommand({
        cwd: tmpDir,
        wingFile: appFile,
        args,
        shouldSucceed: true,
        plugins: [plugin],
      });
      
      const terraformOutput = fs.readJsonSync(path.join(targetDir, "main.tf.json"), "utf-8");

      expect(terraformOutput).toMatchSnapshot();
      expect(terraformOutput.terraform.backend).toEqual({
        s3: {
          bucket: tfBackendBucket,
          region: tfBackendBucketRegion,
          key: stateFile,
        },
      });
    });
  });
  
});
