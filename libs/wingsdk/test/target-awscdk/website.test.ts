import path from "path";
import { Match, Template } from "aws-cdk-lib/assertions";
import { expect, test } from "vitest";
import { Website } from "../../src/cloud";
import * as awscdk from "../../src/target-awscdk";
import { awscdkSanitize, mkdtemp } from "../util";

const CDK_APP_OPTS = {
  stackName: "my-project",
  entrypointDir: __dirname,
};

test("default website behaviour", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  Website._newWebsite(app, "Website", {
    path: path.resolve(__dirname, "website"),
  });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::S3::Bucket", 1);
  template.resourceCountIs("AWS::CloudFront::Distribution", 1);
  template.resourceCountIs(
    "AWS::CloudFront::CloudFrontOriginAccessIdentity",
    1
  );
  template.resourceCountIs("Custom::CDKBucketDeployment", 1);

  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("website with invalid path should throw error", () => {
  // GIVEN
  expect(() => {
    const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
    Website._newWebsite(app, "Website", {
      path: path.resolve(__dirname, "/absolute/non-existent"),
    });
    app.synth();
  }).toThrowError("Cannot find asset at /absolute/non-existent");
});

test("website with addJson", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const website = Website._newWebsite(app, "Website", {
    path: path.resolve(__dirname, "website"),
  });
  website.addJson("config.json", Object({ version: "8.31.0" }));
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::S3::Bucket", 1);
  template.resourceCountIs("AWS::CloudFront::Distribution", 1);
  template.resourceCountIs(
    "AWS::CloudFront::CloudFrontOriginAccessIdentity",
    1
  );
  template.resourceCountIs("Custom::CDKBucketDeployment", 2);

  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("website with addFile", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const website = Website._newWebsite(app, "Website", {
    path: path.resolve(__dirname, "website"),
  });
  website.addFile("addition.html", "<html>Hello world!</html>", "text/html");
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::S3::Bucket", 1);
  template.resourceCountIs("AWS::CloudFront::Distribution", 1);
  template.resourceCountIs(
    "AWS::CloudFront::CloudFrontOriginAccessIdentity",
    1
  );
  template.resourceCountIs("Custom::CDKBucketDeployment", 2);

  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("website with invalid path should throw error", () => {
  // GIVEN
  expect(() => {
    const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
    const website = Website._newWebsite(app, "Website", {
      path: path.resolve(__dirname, "website"),
    });
    website.addJson(
      "not ending with dot json.txt",
      Object({ version: "8.31.0" })
    );
    app.synth();
  }).toThrowError('key must have a .json suffix. (current: "txt")');
});
