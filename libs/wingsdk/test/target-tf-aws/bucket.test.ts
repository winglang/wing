import * as cdktf from "cdktf";
import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import { mkdtemp } from "../../src/util";
import {
  tfResourcesOf,
  tfResourcesOfCount,
  tfSanitize,
  treeJsonOf,
} from "../util";

test("create a bucket", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  new cloud.Bucket(app, "my_bucket");
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

test("bucket is public", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  new cloud.Bucket(app, "my_bucket", { public: true });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_server_side_encryption_configuration", // server side encryption
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket with two preflight objects", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const bucket = new cloud.Bucket(app, "my_bucket", { public: true });
  bucket.addObject("file1.txt", "hello world");
  bucket.addObject("file2.txt", "boom bam");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
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
  const bucket = new cloud.Bucket(app, "the-uncanny.bucket");
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
  const bucket = new cloud.Bucket(app, "The-Uncanny.Bucket");
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
  expect(() => new cloud.Bucket(app, "(%?#$The-Uncanny-Bucket.*!@¨)")).toThrow(
    /AWS S3 bucket names must begin with a letter or number/
  );
});

test("bucket prefix can not begining with 'xn--'", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });

  // THEN
  expect(() => new cloud.Bucket(app, "xn--The-Uncanny-Bucket")).toThrow(
    /AWS S3 bucket names cannot begin with 'xn--'/
  );
});
