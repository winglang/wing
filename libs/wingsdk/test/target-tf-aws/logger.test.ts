import { test, expect } from "vitest";
import { Function } from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import { Testing } from "../../src/testing";
import { mkdtemp, sanitizeCode, tfResourcesOf, tfSanitize } from "../util";

test("inflight function uses a logger", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });

  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle() {
      console.log("hello world!");
    }`
  );

  Function._newFunction(app, "Function", inflight);

  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();

  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual([
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function",
    "aws_s3_bucket",
    "aws_s3_object",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
});
