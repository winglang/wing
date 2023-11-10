import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { Testing } from "../../src/simulator";
import * as tfaws from "../../src/target-tf-aws";
import {
  getTfDataSource,
  getTfResource,
  mkdtemp,
  tfDataSourcesOfCount,
  tfSanitize,
  treeJsonOf,
} from "../util";

const INFLIGHT_CODE = `async handle() { console.log("Hello world!"); }`;

test("create an OnDeploy", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  new cloud.OnDeploy(app, "my_on_deploy", handler);
  const output = app.synth();

  // THEN
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
  expect(tfDataSourcesOfCount(output, "aws_lambda_invocation")).toBe(1);
});

test("execute OnDeploy after other resources", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const bucket = new cloud.Bucket(app, "my_bucket");
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  new cloud.OnDeploy(app, "my_on_deploy", handler, {
    executeAfter: [bucket],
  });
  const output = app.synth();

  // THEN
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
  expect(tfDataSourcesOfCount(output, "aws_lambda_invocation")).toBe(1);

  const awsLambdaInvocation = getTfDataSource(output, "aws_lambda_invocation");
  expect(awsLambdaInvocation.depends_on).toBeDefined();
  expect(awsLambdaInvocation.depends_on).toContain("aws_s3_bucket.my_bucket");
});

test("execute OnDeploy before other resources", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const bucket = new cloud.Bucket(app, "my_bucket");
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  new cloud.OnDeploy(app, "my_on_deploy", handler, {
    executeBefore: [bucket],
  });
  const output = app.synth();

  // THEN
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
  expect(tfDataSourcesOfCount(output, "aws_lambda_invocation")).toBe(1);

  const awsS3Bucket = getTfResource(output, "aws_s3_bucket", 1);
  expect(awsS3Bucket.depends_on).toBeDefined();
  expect(awsS3Bucket.depends_on).toContain(
    "${data.aws_lambda_invocation.my_on_deploy_Invocation_1A26E3B9}"
  );
});
