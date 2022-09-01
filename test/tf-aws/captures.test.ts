import { Polycons } from "@monadahq/polycons";
import * as cdktf from "cdktf";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as tfaws from "../../src/tf-aws";
import { tfResourcesOf, tfSanitize } from "../util";

test("function captures some primitives", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    const inflight = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, event) {
          console.log("Hello, " + $cap.string);
          console.log("My favorite number is " + $cap.num);
          console.log("The order is " + JSON.stringify($cap.order));
        }`
      ),
      entrypoint: "$proc",
      captures: {
        num: {
          obj: 5,
        },
        string: {
          obj: "world",
        },
        map: {
          obj: true,
        },
      },
    });
    const fn = new cloud.Function(scope, "Function", inflight);

    const code = core.Testing.inspectPrebundledCode(fn);
    expect(code.text).toMatchSnapshot();
  });

  expect(tfResourcesOf(output)).toEqual([
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function",
    "aws_s3_bucket",
    "aws_s3_object",
  ]);
  expect(output).toMatchSnapshot();
});

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
    const fn = new cloud.Function(scope, "Function", inflight);

    const code = core.Testing.inspectPrebundledCode(fn);
    expect(code.text).toMatchSnapshot();
  });

  expect(tfResourcesOf(output)).toEqual([
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function",
    "aws_s3_bucket",
    "aws_s3_bucket_public_access_block",
    "aws_s3_bucket_server_side_encryption_configuration",
    "aws_s3_object",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("two functions reusing the same inflight", () => {
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
    const fn1 = new cloud.Function(scope, "Function1", inflight);
    const fn2 = new cloud.Function(scope, "Function2", inflight);

    expect(core.Testing.inspectPrebundledCode(fn1).text).toMatchSnapshot();
    expect(core.Testing.inspectPrebundledCode(fn2).text).toMatchSnapshot();
  });

  expect(tfResourcesOf(output)).toEqual([
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function",
    "aws_s3_bucket",
    "aws_s3_bucket_public_access_block",
    "aws_s3_bucket_server_side_encryption_configuration",
    "aws_s3_object",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
});
