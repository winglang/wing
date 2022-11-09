import { Polycons } from "@winglang/polycons";
import * as cdktf from "cdktf";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as tfaws from "../../src/tf-aws";
import { tfResourcesOf, tfSanitize } from "../util";

test("default counter behavior", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    new cloud.Counter(scope, "Counter");
  });

  expect(tfResourcesOf(output)).toEqual(["aws_dynamodb_table"]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("counter with initial value", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    new cloud.Counter(scope, "Counter", {
      initialValue: 9991,
    });
  });

  expect(tfResourcesOf(output)).toEqual(["aws_dynamodb_table"]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("counter captured by a function", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    const counter = new cloud.Counter(scope, "Counter");

    const inflight = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, event) {
          const val = await $cap.my_counter.inc(2);
          console.log(val);
        }`
      ),
      captures: {
        my_counter: {
          resource: counter,
          methods: ["inc"],
        },
      },
      entrypoint: "$proc",
    });

    const fn = new cloud.Function(scope, "Function", inflight);

    expect(core.Testing.inspectPrebundledCode(fn).text).toMatchSnapshot();
  });

  expect(tfResourcesOf(output)).toEqual([
    "aws_dynamodb_table", // table for the counter
    "aws_iam_role", // role for function
    "aws_iam_role_policy", // policy for role
    "aws_iam_role_policy_attachment", // execution policy for role
    "aws_lambda_function", // processor function
    "aws_s3_bucket", // S3 bucket for code
    "aws_s3_object", // S3 object for code
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
});
