import { Match, Template } from "aws-cdk-lib/assertions";
import * as cloud from "../../src/cloud";
import * as cdk from "../../src/target-cdk";
import { mkdtemp } from "../../src/util";
import { ResourceNames } from "../../src/utils/resource-names";

test("create a bucket", async () => {
  // GIVEN
  const app = new cdk.App({ outdir: mkdtemp() });
  const bucket = new cloud.Bucket(app, "my_bucket");
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties("AWS::S3::Bucket", Match.objectLike({
    BucketName: ResourceNames.generateName(bucket, cdk.BUCKET_PREFIX_OPTS),
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: true,
      BlockPublicPolicy: true,
      IgnorePublicAcls: true,
      RestrictPublicBuckets: true,
    },
  }));
});

test("bucket is public", () => {
  // GIVEN
  const app = new cdk.App({ outdir: mkdtemp() });
  const bucket = new cloud.Bucket(app, "my_bucket", { public: true });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties("AWS::S3::Bucket", Match.objectLike({
    BucketName: ResourceNames.generateName(bucket, cdk.BUCKET_PREFIX_OPTS),
  }));
});