import path from "path";
import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import { mkdtemp } from "../../src/util";
import {
  tfResourcesOf,
  tfResourcesOfCount,
  tfResourcesWithProperty,
  tfSanitize,
  treeJsonOf,
} from "../util";

test("default website behavior", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  cloud.Website._newWebsite(app, "Website", {
    path: path.resolve(__dirname, "website"),
  });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudfront_distribution",
    "aws_s3_bucket",
    "aws_s3_bucket_policy",
    "aws_s3_bucket_server_side_encryption_configuration",
    "aws_s3_bucket_website_configuration",
    "aws_s3_object",
  ]);
  expect(tfResourcesOfCount(output, "aws_s3_object")).toEqual(2);
  expect(
    tfResourcesWithProperty(output, "aws_s3_object", {
      key: "/inner-folder/a.html",
    })
  ).not.toBeUndefined();
  expect(
    tfResourcesWithProperty(output, "aws_s3_object", { key: "/b.html" })
  ).not.toBeUndefined();
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("website with invalid path should throw error", () => {
  // GIVEN
  expect(() => {
    const app = new tfaws.App({ outdir: mkdtemp() });
    cloud.Website._newWebsite(app, "Website", {
      path: "/absolute/non-existent",
    });
    app.synth();
  }).toThrowError(
    "ENOENT: no such file or directory, scandir '/absolute/non-existent'"
  );

  // THEN
});

test("website with add_json", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const website = cloud.Website._newWebsite(app, "Website", {
    path: path.resolve(__dirname, "website"),
  });
  website.addJson("config.json", Object({ version: "8.31.0" }));
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudfront_distribution",
    "aws_s3_bucket",
    "aws_s3_bucket_policy",
    "aws_s3_bucket_server_side_encryption_configuration",
    "aws_s3_bucket_website_configuration",
    "aws_s3_object",
  ]);
  expect(tfResourcesOfCount(output, "aws_s3_object")).toEqual(3);
  expect(
    tfResourcesWithProperty(output, "aws_s3_object", {
      key: "/inner-folder/a.html",
    })
  ).not.toBeUndefined();
  expect(
    tfResourcesWithProperty(output, "aws_s3_object", { key: "/b.html" })
  ).not.toBeUndefined();
  expect(
    tfResourcesWithProperty(output, "aws_s3_object", { key: "config.json" })
  ).not.toBeUndefined();
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("website with invalid path should throw error", () => {
  // GIVEN
  expect(() => {
    const app = new tfaws.App({ outdir: mkdtemp() });
    const website = cloud.Website._newWebsite(app, "Website", {
      path: path.resolve(__dirname, "website"),
    });
    website.addJson(
      "not ending with dot json.txt",
      Object({ version: "8.31.0" })
    );
    app.synth();
  }).toThrowError('key must have a .json suffix. (current: "txt")');

  // THEN
});
