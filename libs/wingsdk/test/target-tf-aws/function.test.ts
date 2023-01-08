import * as cdktf from "cdktf";
import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import { Testing } from "../../src/testing";
import { mkdtemp } from "../../src/util";
import { tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

const INFLIGHT_CODE = `async handle(name) { console.log("Hello, " + name); }`;

test("basic function", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
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
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("basic function with environment variables", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
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
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("aws function names must be less than 64 characters", async () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  new cloud.Function(
    app,
    "Lorem-Ipsum-is-simply-dummy-text-of-the-printing-and-typesetting-industry",
    inflight
  );

  const output = app.synth();

  expect(
    cdktf.Testing.toHaveResourceWithProperties(output, "aws_lambda_function", {
      function_name:
        "Lorem-Ipsum-is-simply-dummy-text-of-the-printing-and-typesetting",
    })
  ).toEqual(true);

  expect(tfSanitize(output)).toMatchSnapshot();
});

test("WING_FUNCTION_NAME value is the same as Lambda FunctionName", async () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  new cloud.Function(app, "Function", inflight);

  const output = app.synth();

  expect(
    cdktf.Testing.toHaveResourceWithProperties(output, "aws_lambda_function", {
      environment: {
        variables: {
          WING_FUNCTION_NAME: "Function",
        },
      },
      functionName: "Function",
    })
  ).toEqual(true);

  expect(tfSanitize(output)).toMatchSnapshot();
});
