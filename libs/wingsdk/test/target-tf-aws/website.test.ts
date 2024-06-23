import path from "path";
import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import {
  getTfResource,
  mkdtemp,
  tfResourcesOf,
  tfResourcesOfCount,
  tfResourcesWithProperty,
  tfSanitize,
  treeJsonOf,
} from "../util";

test("default website behavior", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  new cloud.Website(app, "Website", {
    path: path.resolve(__dirname, "../test-files/website"),
  });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudfront_distribution",
    "aws_cloudfront_origin_access_control",
    "aws_s3_bucket",
    "aws_s3_bucket_policy",
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
    tfResourcesWithProperty(output, "aws_s3_object", { key: "/index.html" })
  ).not.toBeUndefined();
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("website with invalid path should throw error", () => {
  // GIVEN
  expect(() => {
    const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
    new cloud.Website(app, "Website", {
      path: "/absolute/non-existent",
    });
    app.synth();
  }).toThrowError(
    "ENOENT: no such file or directory, scandir '/absolute/non-existent'"
  );

  // THEN
});

test("website with addFile", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const website = new cloud.Website(app, "Website", {
    path: path.resolve(__dirname, "../test-files/website"),
  });
  website.addFile("addition.html", "<html>Hello world!</html>", "text/html");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudfront_distribution",
    "aws_cloudfront_origin_access_control",
    "aws_s3_bucket",
    "aws_s3_bucket_policy",
    "aws_s3_bucket_website_configuration",
    "aws_s3_object",
  ]);
  expect(tfResourcesOfCount(output, "aws_s3_object")).toEqual(4);
  expect(
    tfResourcesWithProperty(output, "aws_s3_object", {
      key: "/inner-folder/a.html",
    })
  ).not.toBeUndefined();
  expect(
    tfResourcesWithProperty(output, "aws_s3_object", { key: "/b.html" })
  ).not.toBeUndefined();
  expect(
    tfResourcesWithProperty(output, "aws_s3_object", { key: "/index.html" })
  ).not.toBeUndefined();
  expect(
    tfResourcesWithProperty(output, "aws_s3_object", { key: "addition.html" })
  ).not.toBeUndefined();
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("website with addJson", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const website = new cloud.Website(app, "Website", {
    path: path.resolve(__dirname, "../test-files/website"),
  });
  website.addJson("config.json", Object({ version: "8.31.0" }));
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudfront_distribution",
    "aws_cloudfront_origin_access_control",
    "aws_s3_bucket",
    "aws_s3_bucket_policy",
    "aws_s3_bucket_website_configuration",
    "aws_s3_object",
  ]);
  expect(tfResourcesOfCount(output, "aws_s3_object")).toEqual(4);
  expect(
    tfResourcesWithProperty(output, "aws_s3_object", {
      key: "/inner-folder/a.html",
    })
  ).not.toBeUndefined();
  expect(
    tfResourcesWithProperty(output, "aws_s3_object", { key: "/b.html" })
  ).not.toBeUndefined();
  expect(
    tfResourcesWithProperty(output, "aws_s3_object", { key: "/index.html" })
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
    const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
    const website = new cloud.Website(app, "Website", {
      path: path.resolve(__dirname, "../test-files/website"),
    });
    website.addJson(
      "not ending with dot json.txt",
      Object({ version: "8.31.0" })
    );
    app.synth();
  }).toThrowError('key must have a .json suffix. (current: "txt")');
});

test("custom error page", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  new cloud.Website(app, "Website", {
    path: path.resolve(__dirname, "../test-files/website"),
    errorDocument: "b.html",
  });
  const output = app.synth();

  // THEN
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(
    getTfResource(output, "aws_cloudfront_distribution", 0)
      .custom_error_response
  ).toEqual([
    {
      error_code: 404,
      response_code: 200,
      response_page_path: "/b.html",
    },
    {
      error_code: 403,
      response_code: 200,
      response_page_path: "/b.html",
    },
  ]);
});
