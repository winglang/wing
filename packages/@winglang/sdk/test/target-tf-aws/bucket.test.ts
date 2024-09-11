import * as cdktf from "cdktf";
import { test, expect } from "vitest";
import { AwsApp } from "./aws-util";
import { Bucket, HttpMethod } from "../../src/cloud";
import { inflight } from "../../src/core";
import { Duration } from "../../src/std";
import {
  tfResourcesOf,
  tfResourcesOfCount,
  tfSanitize,
  treeJsonOf,
  getTfResource,
} from "../util";

test("create a bucket", () => {
  // GIVEN
  const app = new AwsApp();
  new Bucket(app, "my_bucket");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_cors_configuration", // cors configuration
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket has force_destroy if App is a test environment", () => {
  // GIVEN
  const app = new AwsApp({ isTestEnvironment: true });
  new Bucket(app, "my_bucket");
  const output = app.synth();

  // THEN
  expect(
    JSON.parse(output).resource.aws_s3_bucket.my_bucket.force_destroy
  ).toBe(true);
});

test("bucket is public", () => {
  // GIVEN
  const app = new AwsApp();
  new Bucket(app, "my_bucket", { public: true });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_cors_configuration", // cors configuration
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with cors disabled", () => {
  // GIVEN
  const app = new AwsApp();
  new Bucket(app, "my_bucket", { public: true, cors: false });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).not.toContain(
    "aws_s3_bucket_cors_configuration"
  );
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with custom cors in constructor", () => {
  // GIVEN
  const app = new AwsApp();
  new Bucket(app, "my_bucket", {
    public: true,
    cors: true,
    corsOptions: {
      allowedHeaders: ["*"],
      allowedMethods: [HttpMethod.GET],
      allowedOrigins: ["https://example.com"],
      maxAge: Duration.fromSeconds(3600),
    },
  });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_cors_configuration", // cors configuration
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with custom cors via addCorsRule", () => {
  // GIVEN
  const app = new AwsApp();
  const bucket = new Bucket(app, "my_bucket", { public: true, cors: false });
  bucket.addCorsRule({
    allowedHeaders: ["*"],
    allowedMethods: [HttpMethod.GET],
    allowedOrigins: ["https://example.com"],
    maxAge: Duration.fromSeconds(3600),
  });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_cors_configuration", // cors configuration
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with two preflight objects", () => {
  // GIVEN
  const app = new AwsApp();
  const bucket = new Bucket(app, "my_bucket", { public: true });
  bucket.addObject("file1.txt", "hello world");
  bucket.addObject("file2.txt", "boom bam");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_cors_configuration", // cors configuration
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
    "aws_s3_object", // file1.txt
  ]);
  expect(tfResourcesOfCount(output, "aws_s3_object")).toEqual(2);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with two preflight files", () => {
  // GIVEN
  const app = new AwsApp();
  const bucket = new Bucket(app, "my_bucket", { public: true });
  bucket.addFile("file1.txt", "../test-files/test1.txt");
  bucket.addFile("file2.txt", "../test-files/test2.txt");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_cors_configuration", // cors configuration
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
    "aws_s3_object", // file1.txt
  ]);
  expect(tfResourcesOfCount(output, "aws_s3_object")).toEqual(2);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket prefix valid", () => {
  // GIVEN
  const app = new AwsApp();
  const bucket = new Bucket(app, "the-uncanny.bucket");
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(output, "aws_s3_bucket", {
      bucketPrefix: `the-uncanny-bucket-${bucket.node.addr.substring(0, 8)}-`,
    })
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket prefix must be lowercase", () => {
  // GIVEN
  const app = new AwsApp();
  const bucket = new Bucket(app, "The-Uncanny.Bucket");
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(output, "aws_s3_bucket", {
      bucketPrefix: `the-uncanny-bucket-${bucket.node.addr.substring(0, 8)}-`,
    })
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket prefix must begin with an alphanumeric character", () => {
  // GIVEN
  const app = new AwsApp();

  // THEN
  expect(() => new Bucket(app, "(%?#$The-Uncanny-Bucket.*!@¨)")).toThrow(
    /AWS S3 bucket names must begin with a letter or number/
  );
});

test("bucket prefix can not begining with 'xn--'", () => {
  // GIVEN
  const app = new AwsApp();

  // THEN
  expect(() => new Bucket(app, "xn--The-Uncanny-Bucket")).toThrow(
    /AWS S3 bucket names cannot begin with 'xn--'/
  );
});

test("bucket with onCreate method", () => {
  // GIVEN
  const app = new AwsApp();
  const bucket = new Bucket(app, "my_bucket", { public: true });
  bucket.onCreate(inflight(async () => {}));
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudwatch_log_group", // log group for subscriber
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function", // inflight subscriber
    "aws_lambda_permission", // permission of the topic to invoke lambda
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_cors_configuration", // cors configuration
    "aws_s3_bucket_notification",
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
    "aws_s3_object",
    "aws_sns_topic", // topic to subscribe to bucket events
    "aws_sns_topic_policy", //permission of the bucket to publish events
    "aws_sns_topic_subscription", // subscription to events
  ]);

  expect(tfResourcesOfCount(output, "aws_sns_topic")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_s3_bucket_notification")).toEqual(1);
  const bucketNotification = getTfResource(
    output,
    "aws_s3_bucket_notification"
  );
  expect(bucketNotification.depends_on.length).toEqual(1);
  expect(bucketNotification.topic.length).toEqual(1);
  expect(bucketNotification.topic.every((item) => !!item.id)).toBe(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with onDelete method", () => {
  // GIVEN
  const app = new AwsApp();
  const bucket = new Bucket(app, "my_bucket", { public: true });
  bucket.onDelete(inflight(async () => {}));
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudwatch_log_group", // log group for subscriber
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function", // inflight subscriber
    "aws_lambda_permission", // permission of the topic to invoke lambda
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_cors_configuration", // cors configuration
    "aws_s3_bucket_notification",
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
    "aws_s3_object",
    "aws_sns_topic", // topic to subscribe to bucket events
    "aws_sns_topic_policy", //permission of the bucket to publish events
    "aws_sns_topic_subscription", // subscription to events
  ]);

  expect(tfResourcesOfCount(output, "aws_sns_topic")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_s3_bucket_notification")).toEqual(1);
  const bucketNotification = getTfResource(
    output,
    "aws_s3_bucket_notification"
  );
  expect(bucketNotification.depends_on.length).toEqual(1);
  expect(bucketNotification.topic.length).toEqual(1);
  expect(bucketNotification.topic.every((item) => !!item.id)).toBe(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with onUpdate method", () => {
  // GIVEN
  const app = new AwsApp();
  const bucket = new Bucket(app, "my_bucket", { public: true });
  bucket.onUpdate(inflight(async () => {}));
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudwatch_log_group", // log group for subscriber
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function", // inflight subscriber
    "aws_lambda_permission", // permission of the topic to invoke lambda
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_cors_configuration", // cors configuration
    "aws_s3_bucket_notification",
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
    "aws_s3_object",
    "aws_sns_topic", // topic to subscribe to bucket events
    "aws_sns_topic_policy", //permission of the bucket to publish events
    "aws_sns_topic_subscription", // subscription to events
  ]);

  expect(tfResourcesOfCount(output, "aws_sns_topic")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_s3_bucket_notification")).toEqual(1);
  const bucketNotification = getTfResource(
    output,
    "aws_s3_bucket_notification"
  );
  expect(bucketNotification.depends_on.length).toEqual(1);
  expect(bucketNotification.topic.length).toEqual(1);
  expect(bucketNotification.topic.every((item) => !!item.id)).toBe(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with onEvent method", () => {
  // GIVEN
  const app = new AwsApp();
  const bucket = new Bucket(app, "my_bucket", { public: true });
  bucket.onEvent(inflight(async () => {}));
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudwatch_log_group", // log group for subscriber
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function", // inflight subscriber
    "aws_lambda_permission", // permission of the topic to invoke lambda
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_cors_configuration", // cors configuration
    "aws_s3_bucket_notification",
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
    "aws_s3_object",
    "aws_sns_topic", // topic to subscribe to bucket events
    "aws_sns_topic_policy", //permission of the bucket to publish events
    "aws_sns_topic_subscription", // subscription to events
  ]);
  expect(tfResourcesOfCount(output, "aws_sns_topic")).toEqual(3); // 3 topics will be created- one per event
  expect(tfResourcesOfCount(output, "aws_s3_bucket_notification")).toEqual(1);
  const bucketNotification = getTfResource(
    output,
    "aws_s3_bucket_notification"
  );
  expect(bucketNotification.depends_on.length).toEqual(3);
  expect(bucketNotification.topic.length).toEqual(3);
  expect(bucketNotification.topic.every((item) => !!item.id)).toBe(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
