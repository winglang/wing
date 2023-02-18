import { Match, Template } from "aws-cdk-lib/assertions";
import * as cloud from "../../src/cloud";
import * as awscdk from "../../src/target-awscdk";
import { mkdtemp } from "../../src/util";
import { ResourceNames } from "../../src/utils/resource-names";

test("create a bucket", async () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp() });
  const bucket = new cloud.Bucket(app, "my_bucket");
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties("AWS::S3::Bucket", Match.objectLike({
    BucketName: ResourceNames.generateName(bucket, awscdk.BUCKET_PREFIX_OPTS),
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: true,
      BlockPublicPolicy: true,
      IgnorePublicAcls: true,
      RestrictPublicBuckets: true,
    },
  }));
  expect(template.toJSON()).toMatchSnapshot();
});

test("bucket is public", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp() });
  const bucket = new cloud.Bucket(app, "my_bucket", { public: true });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties("AWS::S3::Bucket", Match.objectLike({
    BucketName: ResourceNames.generateName(bucket, awscdk.BUCKET_PREFIX_OPTS),
  }));
  expect(template.toJSON()).toMatchSnapshot();
});