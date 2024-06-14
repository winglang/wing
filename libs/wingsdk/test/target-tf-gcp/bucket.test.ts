import { test, expect } from "vitest";
import { GcpApp } from "./gcp-util";
import { Bucket } from "../../src/cloud";
import {
  tfResourcesOf,
  tfResourcesOfCount,
  tfSanitize,
  treeJsonOf,
} from "../util";

test("create a bucket", () => {
  // GIVEN
  const app = new GcpApp();
  new Bucket(app, "my_bucket");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "google_project_service",
    "google_storage_bucket",
    "random_id",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket is public", () => {
  // GIVEN
  const app = new GcpApp();
  new Bucket(app, "my_bucket", { public: true });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "google_project_service",
    "google_storage_bucket",
    "google_storage_bucket_iam_member",
    "random_id",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("two buckets", () => {
  // GIVEN
  const app = new GcpApp();
  new Bucket(app, "my_bucket1");
  new Bucket(app, "my_bucket2");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "google_project_service",
    "google_storage_bucket",
    "random_id",
  ]);
  expect(tfResourcesOfCount(output, "google_project_service")).toEqual(2);
  expect(tfResourcesOfCount(output, "google_storage_bucket")).toEqual(2);
  expect(tfResourcesOfCount(output, "random_id")).toEqual(2);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with two preflight objects", () => {
  // GIVEN
  const app = new GcpApp();
  const bucket = new Bucket(app, "my_bucket");
  bucket.addObject("file1.txt", "hello world");
  bucket.addObject("file2.txt", "boom bam");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "google_project_service",
    "google_storage_bucket",
    "google_storage_bucket_object",
    "random_id",
  ]);
  expect(tfResourcesOfCount(output, "google_storage_bucket_object")).toEqual(2);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with two preflight files", () => {
  // GIVEN
  const app = new GcpApp();
  const bucket = new Bucket(app, "my_bucket");
  bucket.addFile("file1.txt", "../test-files/test1.txt");
  bucket.addFile("file2.txt", "../test-files/test2.txt");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "google_project_service",
    "google_storage_bucket",
    "google_storage_bucket_object",
    "random_id",
  ]);
  expect(tfResourcesOfCount(output, "google_storage_bucket_object")).toEqual(2);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
