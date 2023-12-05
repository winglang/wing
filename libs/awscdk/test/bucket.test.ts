import { Match, Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { cloud, simulator } from "@winglang/sdk";
import * as awscdk from "../src";
import { mkdtemp } from "@winglang/sdk/test/util";
import { awscdkSanitize } from "./util";

const CDK_APP_OPTS = {
  stackName: "my-project",
  entrypointDir: __dirname,
};

test("create a bucket", async () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  new cloud.Bucket(app, "my_bucket");
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties(
    "AWS::S3::Bucket",
    Match.objectLike({
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("bucket is public", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  new cloud.Bucket(app, "my_bucket", { public: true });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::S3::Bucket", 1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("bucket with two preflight objects", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const bucket = new cloud.Bucket(app, "my_bucket", { public: true });
  bucket.addObject("file1.txt", "hello world");
  bucket.addObject("file2.txt", "boom bam");
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("Custom::CDKBucketDeployment", 1);
  template.hasResourceProperties(
    "Custom::CDKBucketDeployment",
    Match.objectLike({
      SourceObjectKeys: Match.arrayWith([
        Match.stringLikeRegexp(".zip"),
        Match.stringLikeRegexp(".zip"),
      ]),
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("bucket with two preflight files", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const bucket = new cloud.Bucket(app, "my_bucket", { public: true });
  bucket.addFile("file1.txt", "../test/test-files/test1.txt");
  bucket.addFile("file2.txt", "../test/test-files/test2.txt");
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("Custom::CDKBucketDeployment", 1);
  template.hasResourceProperties(
    "Custom::CDKBucketDeployment",
    Match.objectLike({
      SourceObjectKeys: Match.arrayWith([
        Match.stringLikeRegexp(".zip"),
        Match.stringLikeRegexp(".zip"),
      ]),
    })
  );
  expect(template.toJSON()).toMatchSnapshot();
});

test("bucket with onCreate method", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const bucket = new cloud.Bucket(app, "my_bucket");
  const processor = simulator.Testing.makeHandler(`\
async handle(event) {
  console.log("Received " + event.name);
}`
  );
  bucket.onCreate(processor);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties(
    "Custom::S3BucketNotifications",
    Match.objectLike({
      NotificationConfiguration: {
        LambdaFunctionConfigurations: [
          {
            Events: ["s3:ObjectCreated:Put"],
          },
        ],
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("bucket with onDelete method", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const bucket = new cloud.Bucket(app, "my_bucket");
  const processor = simulator.Testing.makeHandler(`\
async handle(event) {
  console.log("Received " + event.name);
}`
  );
  bucket.onDelete(processor);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties(
    "Custom::S3BucketNotifications",
    Match.objectLike({
      NotificationConfiguration: {
        LambdaFunctionConfigurations: [
          {
            Events: ["s3:ObjectRemoved:*"],
          },
        ],
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("bucket with onUpdate method", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const bucket = new cloud.Bucket(app, "my_bucket");
  const processor = simulator.Testing.makeHandler(`\
async handle(event) {
  console.log("Received " + event.name);
}`
  );
  bucket.onUpdate(processor);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties(
    "Custom::S3BucketNotifications",
    Match.objectLike({
      NotificationConfiguration: {
        LambdaFunctionConfigurations: [
          {
            Events: ["s3:ObjectCreated:Post"],
          },
        ],
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("bucket with onEvent method", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const bucket = new cloud.Bucket(app, "my_bucket");
  const processor = simulator.Testing.makeHandler(`\
async handle(event) {
  console.log("Received " + event.name);
}`
  );
  bucket.onEvent(processor);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties(
    "Custom::S3BucketNotifications",
    Match.objectLike({
      NotificationConfiguration: {
        LambdaFunctionConfigurations: [
          { Events: ["s3:ObjectCreated:Put"] },
          { Events: ["s3:ObjectRemoved:*"] },
          { Events: ["s3:ObjectCreated:Post"] },
        ],
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});
