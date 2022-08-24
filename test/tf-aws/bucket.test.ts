import { Polycons } from "@monadahq/polycons";
import * as cdktf from "cdktf";
import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/tf-aws";
import { cdktfResourcesOf } from "../util";

test("default bucket behavior", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    new cloud.Bucket(scope, "Bucket");
  });

  expect(cdktfResourcesOf(output)).toEqual([
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_public_access_block", // ensure bucket is private
    "aws_s3_bucket_server_side_encryption_configuration", // server side encryption
  ]);
  expect(output).toMatchSnapshot();
});

test("bucket is public", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    new cloud.Bucket(scope, "Bucket", {
      public: true,
    });
  });

  expect(cdktfResourcesOf(output)).toEqual([
    "aws_s3_bucket", // main bucket
    "aws_s3_bucket_policy", // resource policy to grant read access to anyone
    "aws_s3_bucket_server_side_encryption_configuration", // server side encryption
  ]);
  expect(output).toMatchSnapshot();
});
