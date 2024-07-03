import exp from "constants";
import { test, expect } from "vitest";
import { Service } from "../../src/cloud";
import { inflight } from "../../src/core";
import * as tfaws from "../../src/target-tf-aws";
import { mkdtemp, tfResourcesOfCount, tfSanitize, treeJsonOf } from "../util";

const INFLIGHT_CODE = inflight(async (_, name) => {
  console.log("Hello " + name);
});

test("multiple services", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });

  new Service(app, "Service1", INFLIGHT_CODE);
  new Service(app, "Service2", INFLIGHT_CODE);

  // WHEN
  const output = app.synth();

  // THEN
  // Only one cluster should be created (all services share the same cluster)
  expect(tfResourcesOfCount(output, "aws_ecs_cluster")).toBe(1);
  expect(tfResourcesOfCount(output, "aws_ecs_service")).toBe(2);
  expect(tfResourcesOfCount(output, "aws_ecs_task_definition")).toBe(2);
  expect(tfResourcesOfCount(output, "aws_cloudwatch_log_group")).toBe(2);

  // Only one ECR repository should be created (all services share the same repository)
  expect(tfResourcesOfCount(output, "aws_ecr_repository")).toBe(1);

  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
