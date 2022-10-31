import * as cdktf from "cdktf";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as tfaws from "../../src/tf-aws";
import { mkdtemp } from "../../src/util";
import { tfResourcesOf, tfSanitize } from "../util";

test("basic function", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  const inflight = new core.Inflight({
    code: core.NodeJsCode.fromInline(
      `exports.greeter = async (name) => { console.log("Hello, " + name); } `
    ),
    entrypoint: "exports.greeter",
  });
  new cloud.Function(app, "Function", inflight);
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual([
    "aws_iam_role", // role for Lambda
    "aws_iam_role_policy", // policy for role
    "aws_iam_role_policy_attachment", // execution policy for role
    "aws_lambda_function", // Lambda
    "aws_s3_bucket", // S3 bucket for code
    "aws_s3_object", // S3 object for code
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("basic function with environment variables", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  const inflight = new core.Inflight({
    code: core.NodeJsCode.fromInline(
      `exports.greeter = async (name) => { console.log("Hello, " + name); } `
    ),
    entrypoint: "exports.greeter",
  });
  new cloud.Function(app, "Function", inflight, {
    env: {
      FOO: "BAR",
      BOOM: "BAM",
    },
  });
  const output = app.synth();

  expect(
    cdktf.Testing.toHaveResourceWithProperties(output, "aws_lambda_function", {
      environment: {
        variables: {
          BOOM: "BAM",
          FOO: "BAR",
        },
      },
    })
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
});
