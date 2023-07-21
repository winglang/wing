import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import { Testing } from "../../src/testing";
import {
  getTfDataSource,
  mkdtemp,
  tfDataSourcesOfCount,
  tfSanitize,
  treeJsonOf,
} from "../util";

const INFLIGHT_CODE = `async handle() { console.log("Hello world!"); }`;

test("create an OnDeploy", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  cloud.OnDeploy._newOnDeploy(app, "my_on_deploy", handler);
  const output = app.synth();

  // THEN
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
  expect(tfDataSourcesOfCount(output, "aws_lambda_invocation")).toBe(1);
});

test("execute OnDeploy after other resources", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const bucket = cloud.Bucket._newBucket(app, "my_bucket");
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  cloud.OnDeploy._newOnDeploy(app, "my_on_deploy", handler, {
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
