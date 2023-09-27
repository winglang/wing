import * as cdktf from "cdktf";
import { test, expect } from "vitest";
import { Bucket } from "../../src/cloud";
import { Testing } from "../../src/simulator";
import * as tfazure from "../../src/target-tf-azure";
import {
  mkdtemp,
  tfResourcesOf,
  tfResourcesOfCount,
  tfSanitize,
  treeJsonOf,
} from "../util";

const AZURE_APP_OPTS = {
  location: "East US",
  entrypointDir: __dirname,
};

test("create a bucket", () => {
  // GIVEN
  const app = new tfazure.App({ outdir: mkdtemp(), ...AZURE_APP_OPTS });
  Bucket._newBucket(app, "my_bucket");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "azurerm_resource_group",
    "azurerm_storage_account",
    "azurerm_storage_container",
  ]);
  expect(tfResourcesOfCount(output, "azurerm_storage_container")).toEqual(1);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("create multiple buckets", () => {
  // GIVEN
  const app = new tfazure.App({ outdir: mkdtemp(), ...AZURE_APP_OPTS });
  Bucket._newBucket(app, "my_bucket");
  Bucket._newBucket(app, "my_bucket2");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "azurerm_resource_group",
    "azurerm_storage_account",
    "azurerm_storage_container",
  ]);
  expect(tfResourcesOfCount(output, "azurerm_storage_container")).toEqual(2);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket is public", () => {
  // GIVEN
  const app = new tfazure.App({ outdir: mkdtemp(), ...AZURE_APP_OPTS });
  Bucket._newBucket(app, "my_bucket", { public: true });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "azurerm_resource_group",
    "azurerm_storage_account",
    "azurerm_storage_container",
  ]);
  expect(tfResourcesOfCount(output, "azurerm_storage_container")).toEqual(1);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with two preflight objects", () => {
  // GIVEN
  const app = new tfazure.App({ outdir: mkdtemp(), ...AZURE_APP_OPTS });
  const bucket = Bucket._newBucket(app, "my_bucket", { public: true });
  bucket.addObject("file1.txt", "hello world");
  bucket.addObject("file2.txt", "boom bam");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "azurerm_resource_group",
    "azurerm_storage_account",
    "azurerm_storage_blob",
    "azurerm_storage_container",
  ]);
  expect(tfResourcesOfCount(output, "azurerm_storage_blob")).toEqual(2);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with two preflight files", () => {
  // GIVEN
  const app = new tfazure.App({ outdir: mkdtemp(), ...AZURE_APP_OPTS });
  const bucket = Bucket._newBucket(app, "my_bucket", { public: true });
  bucket.addFile("file1.txt", "../test-files/test1.txt");
  bucket.addFile("file2.txt", "../test-files/test2.txt");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "azurerm_resource_group",
    "azurerm_storage_account",
    "azurerm_storage_blob",
    "azurerm_storage_container",
  ]);
  expect(tfResourcesOfCount(output, "azurerm_storage_blob")).toEqual(2);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket name valid", () => {
  // GIVEN
  const app = new tfazure.App({ outdir: mkdtemp(), ...AZURE_APP_OPTS });
  const bucket = Bucket._newBucket(app, "The-Uncanny-Bucket");
  const output = app.synth();

  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "azurerm_resource_group",
      {
        name: `Default-${app.node.addr.substring(0, 8)}`,
      }
    )
  ).toEqual(true);

  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "azurerm_storage_account",
      {
        name: `default${app.node.addr.substring(0, 8)}`,
      }
    )
  ).toEqual(true);

  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "azurerm_storage_container",
      {
        name: `the-uncanny-bucket-${bucket.node.addr.substring(0, 8)}`,
      }
    )
  ).toEqual(true);

  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket onEvent is not implemented yet", () => {
  // GIVEN
  let error;
  try {
    const app = new tfazure.App({ outdir: mkdtemp(), ...AZURE_APP_OPTS });
    const bucket = Bucket._newBucket(app, "my_bucket", { public: true });
    const testInflight = Testing.makeHandler(app, "bucket-inflight", "null");
    bucket.onEvent(testInflight);
    app.synth();
  } catch (err) {
    error = err.message;
  }

  // THEN
  expect(error).toBe(
    "on_event method isn't implemented yet on the current target."
  );
});
