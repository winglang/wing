import { test, expect } from "vitest";
import { AwsApp } from "./aws-util";
import { Function } from "../../src/cloud";
import { inflight } from "../../src/core";
import { sanitizeCode, tfResourcesOf, tfSanitize } from "../util";

test("inflight function uses a logger", () => {
  const app = new AwsApp();

  const handler = inflight(async () => console.log("hello world!"));

  new Function(app, "Function", handler);

  expect(sanitizeCode(handler._toInflight())).toMatchSnapshot();

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
