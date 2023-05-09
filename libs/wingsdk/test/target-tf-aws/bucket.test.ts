import * as cdktf from "cdktf";
import { Construct } from "constructs";
import { test, expect } from "vitest";
import { Bucket, IBucketEventHandler } from "../../src/cloud";
import { NodeJsCode, Inflight } from "../../src/core";
import * as tfaws from "../../src/target-tf-aws";
import {
  mkdtemp,
  tfResourcesOf,
  tfResourcesOfCount,
  tfSanitize,
  treeJsonOf,
} from "../util";

class InflightBucketEventHandler
  extends Inflight
  implements IBucketEventHandler
{
  constructor(scope: Construct, id: string) {
    super(scope, id, { code: NodeJsCode.fromInline("null") });
  }
}

test("create a bucket", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  Bucket._newBucket(app, "my_bucket");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_public_access_block", // ensure bucket is private
    "aws_s3_bucket_server_side_encryption_configuration", // server side encryption
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket has force_destroy if App is a test environment", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), isTestEnvironment: true });
  Bucket._newBucket(app, "my_bucket");
  const output = app.synth();

  // THEN
  expect(
    JSON.parse(output).resource.aws_s3_bucket.root_mybucket_E5DAA363
      .force_destroy
  ).toBe(true);
});

test("bucket is public", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  Bucket._newBucket(app, "my_bucket", { public: true });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
    "aws_s3_bucket_server_side_encryption_configuration", // server side encryption
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with two preflight objects", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const bucket = Bucket._newBucket(app, "my_bucket", { public: true });
  bucket.addObject("file1.txt", "hello world");
  bucket.addObject("file2.txt", "boom bam");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
    "aws_s3_bucket_server_side_encryption_configuration", // server side encryption
    "aws_s3_object", // file1.txt
  ]);
  expect(tfResourcesOfCount(output, "aws_s3_object")).toEqual(2);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket prefix valid", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const bucket = Bucket._newBucket(app, "the-uncanny.bucket");
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
  const app = new tfaws.App({ outdir: mkdtemp() });
  const bucket = Bucket._newBucket(app, "The-Uncanny.Bucket");
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
  const app = new tfaws.App({ outdir: mkdtemp() });

  // THEN
  expect(() => Bucket._newBucket(app, "(%?#$The-Uncanny-Bucket.*!@¨)")).toThrow(
    /AWS S3 bucket names must begin with a letter or number/
  );
});

test("bucket prefix can not begining with 'xn--'", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });

  // THEN
  expect(() => Bucket._newBucket(app, "xn--The-Uncanny-Bucket")).toThrow(
    /AWS S3 bucket names cannot begin with 'xn--'/
  );
});

test("bucket with onCreate method", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const bucket = Bucket._newBucket(app, "my_bucket", { public: true });
  const inflightTest = new InflightBucketEventHandler(app, "inflight");
  bucket.onCreate(inflightTest);
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function", // inflight subscriber
    "aws_lambda_permission", // permission of the topic to invoke lambda
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_notification",
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
    "aws_s3_bucket_server_side_encryption_configuration", // server side encryption
    "aws_s3_object",
    "aws_sns_topic", // topic to subscribe to bucket events
    "aws_sns_topic_policy", //permission of the bucket to publish events
    "aws_sns_topic_subscription", // subscription to events
  ]);

  expect(tfResourcesOfCount(output, "aws_sns_topic")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_s3_bucket_notification")).toEqual(1);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with onDelete method", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const bucket = Bucket._newBucket(app, "my_bucket", { public: true });
  const inflightTest = new InflightBucketEventHandler(app, "inflight");
  bucket.onDelete(inflightTest);
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function", // inflight subscriber
    "aws_lambda_permission", // permission of the topic to invoke lambda
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_notification",
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
    "aws_s3_bucket_server_side_encryption_configuration", // server side encryption
    "aws_s3_object",
    "aws_sns_topic", // topic to subscribe to bucket events
    "aws_sns_topic_policy", //permission of the bucket to publish events
    "aws_sns_topic_subscription", // subscription to events
  ]);

  expect(tfResourcesOfCount(output, "aws_sns_topic")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_s3_bucket_notification")).toEqual(1);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with onUpdate method", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const bucket = Bucket._newBucket(app, "my_bucket", { public: true });
  const inflightTest = new InflightBucketEventHandler(app, "inflight");
  bucket.onUpdate(inflightTest);
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function", // inflight subscriber
    "aws_lambda_permission", // permission of the topic to invoke lambda
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_notification",
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
    "aws_s3_bucket_server_side_encryption_configuration", // server side encryption
    "aws_s3_object",
    "aws_sns_topic", // topic to subscribe to bucket events
    "aws_sns_topic_policy", //permission of the bucket to publish events
    "aws_sns_topic_subscription", // subscription to events
  ]);

  expect(tfResourcesOfCount(output, "aws_sns_topic")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_s3_bucket_notification")).toEqual(1);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with onEvent method", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const bucket = Bucket._newBucket(app, "my_bucket", { public: true });
  const inflightTest = new InflightBucketEventHandler(app, "inflight");
  bucket.onEvent(inflightTest);
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function", // inflight subscriber
    "aws_lambda_permission", // permission of the topic to invoke lambda
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_notification",
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
    "aws_s3_bucket_server_side_encryption_configuration", // server side encryption
    "aws_s3_object",
    "aws_sns_topic", // topic to subscribe to bucket events
    "aws_sns_topic_policy", //permission of the bucket to publish events
    "aws_sns_topic_subscription", // subscription to events
  ]);
  expect(tfResourcesOfCount(output, "aws_sns_topic")).toEqual(3); // 3 topics will be created- one per event
  expect(tfResourcesOfCount(output, "aws_s3_bucket_notification")).toEqual(3);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
