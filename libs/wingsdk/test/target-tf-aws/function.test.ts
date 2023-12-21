import * as cdktf from "cdktf";
import { test, expect } from "vitest";
import { Function } from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { Duration } from "../../src/std";
import * as tfaws from "../../src/target-tf-aws";
import { mkdtemp, tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

const INFLIGHT_CODE = `async handle(name) { console.log("Hello, " + name); }`;

test("basic function", () => {
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const inflight = Testing.makeHandler(INFLIGHT_CODE);
  new Function(app, "Function", inflight);
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudwatch_log_group", // log group for Lambda
    "aws_iam_role", // role for Lambda
    "aws_iam_role_policy", // policy for role
    "aws_iam_role_policy_attachment", // execution policy for role
    "aws_lambda_function", // Lambda
    "aws_s3_bucket", // S3 bucket for code
    "aws_s3_object", // S3 object for code
  ]);
  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "aws_cloudwatch_log_group",
      {
        retention_in_days: 30,
      }
    )
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("basic function with environment variables", () => {
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const inflight = Testing.makeHandler(INFLIGHT_CODE);
  new Function(app, "Function", inflight, {
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
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const inflight = Testing.makeHandler(INFLIGHT_CODE);
  const func = new Function(app, "The-Mighty_Function-01", inflight);
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
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const inflight = Testing.makeHandler(INFLIGHT_CODE);
  const func = new Function(app, "The%Mighty$Function", inflight);
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
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const inflight = Testing.makeHandler(INFLIGHT_CODE);
  new Function(app, "Function", inflight, {
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

test("basic function with memory size specified", () => {
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const inflight = Testing.makeHandler(INFLIGHT_CODE);
  new Function(app, "Function", inflight, { memory: 512 });
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudwatch_log_group", // log group for Lambda
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

test("basic function with custom log retention", () => {
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const inflight = Testing.makeHandler(INFLIGHT_CODE);
  new Function(app, "Function", inflight, { logRetentionDays: 7 });
  const output = app.synth();

  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "aws_cloudwatch_log_group",
      {
        retention_in_days: 7,
      }
    )
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("basic function with infinite log retention", () => {
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const inflight = Testing.makeHandler(INFLIGHT_CODE);
  new Function(app, "Function", inflight, { logRetentionDays: -1 });
  const output = app.synth();

  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "aws_cloudwatch_log_group"
    )
  ).toEqual(false);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("asset path is stripped of spaces", () => {
  // GIVEN
  const some_name = "I have a space in my name";
  const expectedReplacement = "i_have_a_space_in_my_name";
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const inflight = Testing.makeHandler(INFLIGHT_CODE);
  const f = new Function(app, some_name, inflight);
  // WHEN
  app.synth();
  // THEN
  expect(f.entrypoint).toContain(expectedReplacement);
});

test("vpc permissions are added even if there is no policy", () => {
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const inflight = Testing.makeHandler(INFLIGHT_CODE);
  const f = new tfaws.Function(app, "Function", inflight);

  f.addNetworkConfig({
    securityGroupIds: ["sg-1234567890"],
    subnetIds: ["subnet-1234567890"],
  });

  const output = app.synth();
  const policy =
    tfSanitize(output).resource.aws_iam_role_policy
      .Function_IamRolePolicy_E3B26607.policy;

  expect(JSON.parse(policy).Statement).toStrictEqual([
    {
      Action: [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DeleteNetworkInterface",
        "ec2:DescribeSubnets",
        "ec2:DescribeSecurityGroups",
      ],
      Resource: ["*"],
      Effect: "Allow",
    },
  ]);
});
