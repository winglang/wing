import { Polycons } from "@monadahq/polycons";
import * as cdktf from "cdktf";
import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/tf-aws";

test("default bucket behavior", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    new cloud.Bucket(scope, "Bucket");
  });

  expect(cdktf.Testing.toHaveResource(output, "aws_s3_bucket")).toEqual(true);
  expect(
    cdktf.Testing.toHaveResource(
      output,
      "aws_s3_bucket_server_side_encryption_configuration"
    )
  ).toEqual(true);
  expect(
    cdktf.Testing.toHaveResource(output, "aws_s3_bucket_public_access_block")
  ).toEqual(true);
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

  expect(cdktf.Testing.toHaveResource(output, "aws_s3_bucket")).toEqual(true);
  expect(
    cdktf.Testing.toHaveResource(
      output,
      "aws_s3_bucket_server_side_encryption_configuration"
    )
  ).toEqual(true);
  expect(cdktf.Testing.toHaveResource(output, "aws_s3_bucket_policy")).toEqual(
    true
  );
  expect(output).toMatchSnapshot();
});
