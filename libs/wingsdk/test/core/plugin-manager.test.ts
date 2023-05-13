import fs from "fs";
import { join } from "path";
import * as cdktf from "cdktf";
import { test, expect } from "vitest";
import { PluginManager } from "../../src/core/plugin-manager";
import * as tfaws from "../../src/target-tf-aws";
import { tfResourcesOfCount, mkdtemp } from "../util";

const PLUGIN_CODE = `
var s3_bucket = require("../.gen/providers/aws/s3-bucket");

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
