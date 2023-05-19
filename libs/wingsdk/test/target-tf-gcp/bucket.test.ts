import { test, expect } from "vitest";
import { Bucket } from "../../src/cloud";
import * as tfgcp from "../../src/target-tf-gcp";
import {
  mkdtemp,
  tfResourcesOf,
  tfResourcesOfCount,
  tfSanitize,
  treeJsonOf,
} from "../util";

const GCP_APP_OPTS = {
  projectId: "my-project",
  storageLocation: "US",
};

test("create a bucket", () => {
  // GIVEN
  const app = new tfgcp.App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  Bucket._newBucket(app, "my_bucket");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual(["google_storage_bucket", "random_id"]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket is public", () => {
  // GIVEN
  const app = new tfgcp.App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  Bucket._newBucket(app, "my_bucket", { public: true });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "google_storage_bucket",
    "google_storage_bucket_iam_member",
    "random_id",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("two buckets", () => {
  // GIVEN
  const app = new tfgcp.App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  Bucket._newBucket(app, "my_bucket1");
  Bucket._newBucket(app, "my_bucket2");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual(["google_storage_bucket", "random_id"]);
  expect(tfResourcesOfCount(output, "google_storage_bucket")).toEqual(2);
  expect(tfResourcesOfCount(output, "random_id")).toEqual(2);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with two preflight objects", () => {
  // GIVEN
  const app = new tfgcp.App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const bucket = Bucket._newBucket(app, "my_bucket");
  bucket.addObject("file1.txt", "hello world");
  bucket.addObject("file2.txt", "boom bam");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "google_storage_bucket",
    "google_storage_bucket_object",
    "random_id",
  ]);
  expect(tfResourcesOfCount(output, "google_storage_bucket_object")).toEqual(2);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
