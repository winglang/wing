import { test, expect } from "vitest";
import { Function } from "../../src/cloud";
import { Testing } from "../../src/simulator";
import * as tfaws from "../../src/target-tf-aws";
import { mkdtemp, sanitizeCode, tfResourcesOf, tfSanitize } from "../util";

test("inflight function uses a logger", () => {
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });

  const inflight = Testing.makeHandler(`async handle() {
      console.log("hello world!");
    }`);

  new Function(app, "Function", inflight);

  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();

  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudwatch_log_group",
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function",
    "aws_s3_bucket",
    "aws_s3_object",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
});
