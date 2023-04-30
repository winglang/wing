import { Match, Template } from "aws-cdk-lib/assertions";
import { Construct } from "constructs";
import { test, expect } from "vitest";
import { Bucket, IBucketEventHandler } from "../../src/cloud";
import { NodeJsCode, Inflight } from "../../src/core";
import * as awscdk from "../../src/target-awscdk";
import { mkdtemp } from "../../src/util";

const CDK_APP_OPTS = {
  stackName: "my-project",
};

class InflightBucketEventHandler
  extends Inflight
  implements IBucketEventHandler
{
  public stateful: boolean;
  constructor(scope: Construct, id: string) {
    super(scope, id, { code: NodeJsCode.fromInline("null") });
  }
}

test("create a bucket", async () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  Bucket._newBucket(app, "my_bucket");
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
  expect(template.toJSON()).toMatchSnapshot();
});

test("bucket is public", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  Bucket._newBucket(app, "my_bucket", { public: true });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::S3::Bucket", 1);
  expect(template.toJSON()).toMatchSnapshot();
});

test("bucket with two preflight objects", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const bucket = Bucket._newBucket(app, "my_bucket", { public: true });
  bucket.addObject("file1.txt", "hello world");
  bucket.addObject("file2.txt", "boom bam");
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("Custom::CDKBucketDeployment", 2);
  expect(template.toJSON()).toMatchSnapshot();
});

test("bucket with onCreate method", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const bucket = Bucket._newBucket(app, "my_bucket");
  const inflightTest = new InflightBucketEventHandler(app, "inflight");
  bucket.onCreate(inflightTest);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::SNS::Topic", 1);
  template.resourceCountIs("AWS::SNS::Subscription", 1);
  template.hasResourceProperties(
    "Custom::S3BucketNotifications",
    Match.objectLike({
      NotificationConfiguration: {
        TopicConfigurations: [
          {
            Events: ["s3:ObjectCreated:Put"],
          },
        ],
      },
    })
  );
  expect(template.toJSON()).toMatchSnapshot();
});

test("bucket with onDelete method", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const bucket = Bucket._newBucket(app, "my_bucket");
  const inflightTest = new InflightBucketEventHandler(app, "inflight");
  bucket.onDelete(inflightTest);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::SNS::Topic", 1);
  template.resourceCountIs("AWS::SNS::Subscription", 1);
  template.hasResourceProperties(
    "Custom::S3BucketNotifications",
    Match.objectLike({
      NotificationConfiguration: {
        TopicConfigurations: [
          {
            Events: ["s3:ObjectRemoved:*"],
          },
        ],
      },
    })
  );
  expect(template.toJSON()).toMatchSnapshot();
});

test("bucket with onUpdate method", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const bucket = Bucket._newBucket(app, "my_bucket");
  const inflightTest = new InflightBucketEventHandler(app, "inflight");
  bucket.onUpdate(inflightTest);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::SNS::Topic", 1);
  template.resourceCountIs("AWS::SNS::Subscription", 1);
  template.hasResourceProperties(
    "Custom::S3BucketNotifications",
    Match.objectLike({
      NotificationConfiguration: {
        TopicConfigurations: [
          {
            Events: ["s3:ObjectCreated:Post"],
          },
        ],
      },
    })
  );
  expect(template.toJSON()).toMatchSnapshot();
});

test("bucket with onEvent method", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const bucket = Bucket._newBucket(app, "my_bucket");
  const inflightTest = new InflightBucketEventHandler(app, "inflight");
  bucket.onEvent(inflightTest);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::SNS::Topic", 3);
  template.resourceCountIs("AWS::SNS::Subscription", 3);
  template.hasResourceProperties(
    "Custom::S3BucketNotifications",
    Match.objectLike({
      NotificationConfiguration: {
        TopicConfigurations: [
          { Events: ["s3:ObjectCreated:Put"] },
          { Events: ["s3:ObjectCreated:Post"] },
          { Events: ["s3:ObjectRemoved:*"] },
        ],
      },
    })
  );
  expect(template.toJSON()).toMatchSnapshot();
});
