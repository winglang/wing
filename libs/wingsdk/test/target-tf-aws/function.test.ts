import * as cdktf from "cdktf";
import * as cloud from "../../src/cloud";
import { Duration } from "../../src/std";
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

test("function name valid", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  const func = new cloud.Function(app, "The-Mighty_Function-01", inflight);
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(output, "aws_lambda_function", {
      function_name: `The-Mighty_Function-01-${func.node.addr.substring(0, 8)}`,
    })
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("replace invalid character from function name", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  const func = new cloud.Function(app, "The%Mighty$Function", inflight);
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(output, "aws_lambda_function", {
      function_name: `The-Mighty-Function-${func.node.addr.substring(0, 8)}`,
    })
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("basic function with timeout explicitly set", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  new cloud.Function(app, "Function", inflight, {
    timeout: Duration.fromSeconds(30),
  });
  const output = app.synth();

  expect(
    cdktf.Testing.toHaveResourceWithProperties(output, "aws_lambda_function", {
      timeout: 30,
    })
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
