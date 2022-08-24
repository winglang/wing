import { Polycons } from "@monadahq/polycons";
import * as cdktf from "cdktf";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as tfaws from "../../src/tf-aws";
import { cdktfResourcesOf } from "../util";

test("function captures a bucket", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    const bucket = new cloud.Bucket(scope, "Bucket");
    const inflight = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, event) {
          console.log("Hello, " + event.name);
          await $cap.bucket.put("hello.txt", JSON.stringify(event));
        }`
      ),
      entrypoint: "$proc",
      captures: {
        bucket: {
          obj: bucket,
          methods: ["put"],
        },
      },
    });
    new cloud.Function(scope, "Function", inflight);
  });

  expect(cdktfResourcesOf(output)).toEqual([
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function",
    "aws_s3_bucket",
    "aws_s3_bucket_public_access_block",
    "aws_s3_bucket_server_side_encryption_configuration",
    "aws_s3_object",
  ]);
  expect(output).toMatchSnapshot();
});
