import child_process from "child_process";
import { resolve } from "path";
import { test, expect, vi, afterAll, describe } from "vitest";
import * as ex from "../../src/ex";
import * as tfaws from "../../src/target-tf-aws";
import {
  mkdtemp,
  tfResourcesOf,
  tfResourcesOfCount,
  tfResourcesWithProperty,
  tfSanitize,
  treeJsonOf,
} from "../util";

describe("Testing ReactWebsite", () => {
  const execMock = vi.spyOn(child_process, "execSync");

  afterAll(() => {
    execMock.mockReset();
  });

  test("default react website behavior", () => {
    // GIVEN
    const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
    // this isn't a react website, but a website with a package json and a build command
    ex.ReactWebsite._newReactWebsite(app, "Website", {
      projectPath: "../test-files/react-website",
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
    expect(tfResourcesOfCount(output, "aws_s3_object")).toEqual(2);
    expect(
      tfResourcesWithProperty(output, "aws_s3_object", {
        key: "/index.html",
      })
    ).not.toBeUndefined();
    expect(
      tfResourcesWithProperty(output, "aws_s3_object", { key: ex.WING_JS })
        ?.content
    ).toBe("window.wingEnv = {};");
    expect(tfSanitize(output)).toMatchSnapshot();
    expect(treeJsonOf(app.outdir)).toMatchSnapshot();
    expect(execMock).toBeCalledWith("npm run build", {
      cwd: resolve(__dirname, "../test-files/react-website"),
      maxBuffer: 10485760,
    });
  });

  test("react website with invalid path should throw error", () => {
    // GIVEN
    expect(() => {
      const app = new tfaws.App({
        outdir: mkdtemp(),
        entrypointDir: __dirname,
      });
      ex.ReactWebsite._newReactWebsite(app, "Website", {
        projectPath: "/absolute/non-existent",
      });
      app.synth();
      // THEN
    }).toThrowError("non existent directory '/absolute/non-existent'");
  });

  test("website with addEnvironment", () => {
    // GIVEN
    const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
    // this isn't a react website, but a website with a package json and a build command
    const website = ex.ReactWebsite._newReactWebsite(app, "Website", {
      projectPath: "../test-files/react-website",
    });

    website.addEnvironment("key", "value");

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
    expect(tfResourcesOfCount(output, "aws_s3_object")).toEqual(2);
    expect(
      tfResourcesWithProperty(output, "aws_s3_object", {
        key: "/index.html",
      })
    ).not.toBeUndefined();
    expect(tfSanitize(output)).toMatchSnapshot();
    expect(treeJsonOf(app.outdir)).toMatchSnapshot();
    expect(
      tfResourcesWithProperty(output, "aws_s3_object", { key: ex.WING_JS })
        ?.content
    ).toBe(`window.wingEnv = {
  "key": "value"
};`);

    expect(execMock).toBeCalledWith("npm run build", {
      cwd: resolve(__dirname, "../test-files/react-website"),
      maxBuffer: 10485760,
    });
  });

  test("website with isDevRun=true still uses build command", () => {
    // GIVEN
    const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
    // this isn't a react website, but a website with a package json and a build command
    const website = ex.ReactWebsite._newReactWebsite(app, "Website", {
      projectPath: "../test-files/react-website",
      isDevRun: true,
    });

    // THEN

    expect(execMock).toBeCalledWith("npm run build", {
      cwd: resolve(__dirname, "../test-files/react-website"),
      maxBuffer: 10485760,
    });
  });

  test("website with custom build path", () => {
    // GIVEN
    const CUSTOM_COMMAND = "echo 'custom command'";
    const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
    // this isn't a react website, but a website with a package json and a build command
    ex.ReactWebsite._newReactWebsite(app, "Website", {
      projectPath: "../test-files/react-website",
      buildCommand: CUSTOM_COMMAND,
    });

    // THEN

    expect(execMock).toBeCalledWith(CUSTOM_COMMAND, {
      cwd: resolve(__dirname, "../test-files/react-website"),
      maxBuffer: 10485760,
    });
  });
});
