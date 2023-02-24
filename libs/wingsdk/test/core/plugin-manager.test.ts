import fs from "fs";
import { join, resolve } from "path";
import { IamRole } from "@cdktf/provider-aws/lib/iam-role";
import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";
import * as cdktf from "cdktf";
import { PluginManager } from "../../src/core/plugin-manager";
import * as tfaws from "../../src/target-tf-aws";
import { mkdtemp } from "../../src/util";
import { tfResourcesOfCount } from "../util";

const PLUGIN_CODE = `
var s3_bucket = require("@cdktf/provider-aws/lib/s3-bucket");

exports.preSynth = function(app) {
  new s3_bucket.S3Bucket(app, "PluginBucket", {bucket: "plugin-bucket"})  
};

exports.postSynth = function(config) {
  const buckets = Object.keys(config.resource.aws_s3_bucket);
  for (const bucket of buckets) {
    config.resource.aws_s3_bucket[bucket].tags = { "plugin-tag": "plugin-value" };
  }

  return config;
};

exports.validate = function(config) {
  throw new Error("some validation error");
};
`;

const CREATE_S3_BUCKET_PLUGIN_CODE = `
exports.postSynth = function(config) {
  config.resource = config.resource || {};
  config.resource.aws_s3_bucket = {
    "plugin-bucket": {
      "bucket": "plugin-bucket",
    }
  }
  return config;
};
`;

const DELETE_S3_BUCKET_PLUGIN_CODE = `
exports.postSynth = function(config) {
  config.resource.aws_s3_bucket = {};
  return config;
};
`;

const RETURN_NULL_CONFIG_CODE = `
exports.postSynth = function(config) {
  // no return
};
`;

const ATTEMPT_TO_MODIFY_CONFIG_IN_VALIDATE_CODE = `
exports.validate = function(config) {
  return "something terrible";
}
`;

test("preSynth can add resources to construct tree", () => {
  // GIVEN
  const tmpDir = mkdtemp();
  const pluginFile = join(tmpDir, "plugin.js");
  fs.writeFileSync(pluginFile, PLUGIN_CODE);

  // WHEN
  const app = new tfaws.App({ outdir: tmpDir }); // exclude plugins from constructor for control
  const pm = new PluginManager([pluginFile]);
  pm.preSynth(app);
  const output = app.synth();

  // THEN
  expect(tfResourcesOfCount(output, "aws_s3_bucket")).toEqual(1);
  expect(
    cdktf.Testing.toHaveResourceWithProperties(output, "aws_s3_bucket", {
      bucket: "plugin-bucket",
    })
  ).toEqual(true);
});

test("postSynth can modify terraform config", () => {
  // GIVEN
  const tmpDir = mkdtemp();
  const pluginFile = join(tmpDir, "plugin.js");
  fs.writeFileSync(pluginFile, PLUGIN_CODE);

  // WHEN
  const app = new tfaws.App({ outdir: tmpDir }); // exclude plugins from constructor for control
  const pm = new PluginManager([pluginFile]);
  new tfaws.Bucket(app, "Bucket", {});

  const synthOutput = app.synth();
  const synthesizedStackPath = `${app.terraformManifestPath}`;
  // apply postSynth plugins
  pm.postSynth(JSON.parse(synthOutput), synthesizedStackPath);
  const postSynthOutput = fs.readFileSync(synthesizedStackPath, "utf-8");

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(synthOutput, "aws_s3_bucket", {
      tags: {
        "plugin-tag": "plugin-value",
      },
    })
  ).toEqual(false); // original output should not have tags

  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      postSynthOutput,
      "aws_s3_bucket",
      {
        tags: {
          "plugin-tag": "plugin-value",
        },
      }
    )
  ).toEqual(true); // postSynth output should have tags
});

test("postSynth return is ignored if undefined", () => {
  // GIVEN
  const tmpDir = mkdtemp();
  const pluginFile = join(tmpDir, "plugin.js");
  fs.writeFileSync(pluginFile, RETURN_NULL_CONFIG_CODE);

  // WHEN
  const app = new tfaws.App({ outdir: tmpDir }); // exclude plugins from constructor for control
  const pm = new PluginManager([pluginFile]);
  new tfaws.Bucket(app, "Bucket", {});

  const synthOutput = app.synth();
  const synthesizedStackPath = `${app.terraformManifestPath}`;

  pm.postSynth(JSON.parse(synthOutput), synthesizedStackPath);
  const postSynthOutput = fs.readFileSync(synthesizedStackPath, "utf-8");

  // THEN
  expect(synthOutput).toEqual(postSynthOutput); // nothing should have changed
});

test("validate can throw an error", () => {
  // GIVEN
  const tmpDir = mkdtemp();
  const pluginFile = join(tmpDir, "plugin.js");
  fs.writeFileSync(pluginFile, PLUGIN_CODE);

  // WHEN
  const app = new tfaws.App({ outdir: tmpDir }); // exclude plugins from constructor for control
  const pm = new PluginManager([pluginFile]);

  // THEN
  expect(() => pm.validate(app)).toThrowError("some validation error");
});

test("validate cannot modify config", () => {
  // GIVEN
  const tmpDir = mkdtemp();
  const pluginFile = join(tmpDir, "plugin.js");
  fs.writeFileSync(pluginFile, ATTEMPT_TO_MODIFY_CONFIG_IN_VALIDATE_CODE);

  // WHEN
  const app = new tfaws.App({ outdir: tmpDir }); // exclude plugins from constructor for control
  const pm = new PluginManager([pluginFile]);
  new tfaws.Bucket(app, "Bucket", {});

  const synthOutput = app.synth();
  const synthesizedStackPath = `${app.terraformManifestPath}`;

  pm.postSynth(JSON.parse(synthOutput), synthesizedStackPath);
  const postSynthOutput = fs.readFileSync(synthesizedStackPath, "utf-8");

  // THEN
  expect(synthOutput).toEqual(postSynthOutput); // nothing should have changed
});

test("plugins are run in order they are passed in", () => {
  // GIVEN
  const tmpDir = mkdtemp();
  const createBucket = join(tmpDir, "create_bucket.js");
  const deleteBuckets = join(tmpDir, "delete_bucket.js");
  fs.writeFileSync(createBucket, CREATE_S3_BUCKET_PLUGIN_CODE);
  fs.writeFileSync(deleteBuckets, DELETE_S3_BUCKET_PLUGIN_CODE);

  // WHEN
  const app = new tfaws.App({
    outdir: tmpDir,
    plugins: [createBucket, deleteBuckets],
  });
  new tfaws.Bucket(app, "Bucket", {});
  app.synth();

  const synthesizedStackPath = `${app.terraformManifestPath}`;
  const postSynthOutput = fs.readFileSync(synthesizedStackPath, "utf-8");

  // THEN
  expect(tfResourcesOfCount(postSynthOutput, "aws_s3_bucket")).toEqual(0);
});

describe("test plugin examples", () => {
  const EXAMPLES_DIR = "../../examples/plugins";

  test("permission-boundary.js - applies permission boundary to IAM Roles", () => {
    // GIVEN
    const tmpDir = mkdtemp();
    const expectedPermissionBoundaryArn = "some:fake:arn:SUPERADMIN";
    const plugin = resolve(
      process.cwd(),
      `${EXAMPLES_DIR}/permission-boundary.js`
    );
    process.env.PERMISSION_BOUNDARY_ARN = expectedPermissionBoundaryArn;

    // WHEN
    const app = new tfaws.App({ outdir: tmpDir });
    const pm = new PluginManager([plugin]);
    new IamRole(app, "SomeRole", {
      name: "some-role",
      assumeRolePolicy: JSON.stringify({}),
    });
    pm.preSynth(app);
    const output = app.synth();

    // THEN
    expect(
      cdktf.Testing.toHaveResourceWithProperties(output, "aws_iam_role", {
        permissions_boundary: expectedPermissionBoundaryArn,
      })
    ).toEqual(true);
  });

  test("replicate-s3.js - replicates s3 buckets and enables versioning", () => {
    // GIVEN
    const tmpDir = mkdtemp();
    const REPLICA_PREFIX = "some-prefix";
    const REPLICA_STORAGE_CLASS = "STANDARD";
    const plugin = resolve(process.cwd(), `${EXAMPLES_DIR}/replicate-s3.js`);
    process.env.REPLICA_PREFIX = REPLICA_PREFIX;
    process.env.REPLICA_STORAGE_CLASS = REPLICA_STORAGE_CLASS;

    // WHEN
    const app = new tfaws.App({ outdir: tmpDir });
    const pm = new PluginManager([plugin]);

    new S3Bucket(app, "BucketA", { bucket: "bucket-a" });
    new S3Bucket(app, "BucketB", { bucket: "bucket-b" });

    pm.preSynth(app);
    const output = app.synth();

    // THEN
    expect(tfResourcesOfCount(output, "aws_s3_bucket")).toEqual(4); // 2 buckets + 2 replicas
    expect(tfResourcesOfCount(output, "aws_s3_bucket_versioning")).toEqual(4); // 2 buckets + 2 replicas
    expect(
      tfResourcesOfCount(output, "aws_s3_bucket_replication_configuration")
    ).toEqual(2); // 2 replica rules
  });

  test("tf-s3-backend.js - creates s3 backend config", () => {
    // GIVEN
    const tmpDir = mkdtemp();
    const TF_BACKEND_BUCKET = "my-wing-bucket";
    const TF_BACKEND_BUCKET_REGION = "us-east-1";
    const STATE_FILE = "some-state-file.tfstate";
    const plugin = resolve(process.cwd(), `${EXAMPLES_DIR}/tf-s3-backend.js`);
    process.env.TF_BACKEND_BUCKET = TF_BACKEND_BUCKET;
    process.env.TF_BACKEND_BUCKET_REGION = TF_BACKEND_BUCKET_REGION;
    process.env.STATE_FILE = STATE_FILE;

    // WHEN
    const app = new tfaws.App({ outdir: tmpDir });
    const pm = new PluginManager([plugin]);

    app.synth();
    const output = fs.readFileSync(app.terraformManifestPath, "utf-8");
    pm.postSynth(JSON.parse(output), app.terraformManifestPath);

    // THEN
    const alteredOutput = JSON.parse(
      fs.readFileSync(app.terraformManifestPath, "utf-8")
    );
    expect(alteredOutput.terraform.backend).toEqual({
      s3: {
        bucket: TF_BACKEND_BUCKET,
        region: TF_BACKEND_BUCKET_REGION,
        key: STATE_FILE,
      },
    });
  });
});
