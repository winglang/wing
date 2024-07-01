import * as cdktf from "cdktf";
import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { lift } from "../../src/core";
import * as tfaws from "../../src/target-tf-aws";
import {
  mkdtemp,
  sanitizeCode,
  tfResourcesOf,
  tfSanitize,
  treeJsonOf,
} from "../util";

test("default counter behavior", () => {
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  new cloud.Counter(app, "Counter");
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual(["aws_dynamodb_table"]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("counter with initial value", () => {
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  new cloud.Counter(app, "Counter", {
    initial: 9991,
  });
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual(["aws_dynamodb_table"]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("function with a counter binding", () => {
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const counter = new cloud.Counter(app, "Counter");

  const handler = lift({ my_counter: counter })
    .grant({ my_counter: [cloud.CounterInflightMethods.INC] })
    .inflight(async (ctx) => {
      const val = await ctx.my_counter.inc(2);
      console.log(val);
    });

  new cloud.Function(app, "Function", handler);

  const output = app.synth();

  expect(sanitizeCode(handler._toInflight())).toMatchSnapshot();
  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudwatch_log_group", // log group for function
    "aws_dynamodb_table", // table for the counter
    "aws_iam_role", // role for function
    "aws_iam_role_policy", // policy for role
    "aws_iam_role_policy_attachment", // execution policy for role
    "aws_lambda_function", // processor function
    "aws_s3_bucket", // S3 bucket for code
    "aws_s3_object", // S3 object for code
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("inc() policy statement", () => {
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const counter = new cloud.Counter(app, "Counter");
  const handler = lift({ my_counter: counter })
    .grant({ my_counter: [cloud.CounterInflightMethods.INC] })
    .inflight(async (ctx) => {
      const val = await ctx.my_counter.inc(2);
      console.log(val);
    });
  new cloud.Function(app, "Function", handler);
  const output = app.synth();

  expect(output).toContain("dynamodb:UpdateItem");
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("dec() policy statement", () => {
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const counter = new cloud.Counter(app, "Counter");
  const handler = lift({ my_counter: counter })
    .grant({ my_counter: [cloud.CounterInflightMethods.DEC] })
    .inflight(async (ctx) => {
      const val = await ctx.my_counter.dec(2);
      console.log(val);
    });

  new cloud.Function(app, "Function", handler);
  const output = app.synth();

  expect(output).toContain("dynamodb:UpdateItem");
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("peek() policy statement", () => {
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const counter = new cloud.Counter(app, "Counter");
  const handler = lift({ my_counter: counter })
    .grant({ my_counter: [cloud.CounterInflightMethods.PEEK] })
    .inflight(async (ctx) => {
      const val = await ctx.my_counter.peek();
      console.log(val);
    });
  new cloud.Function(app, "Function", handler);
  const output = app.synth();

  expect(output).toContain("dynamodb:GetItem");
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("set() policy statement", () => {
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const counter = new cloud.Counter(app, "Counter");
  const handler = lift({ my_counter: counter })
    .grant({ my_counter: [cloud.CounterInflightMethods.SET] })
    .inflight(async (ctx) => {
      const val = await ctx.my_counter.set(1);
      console.log(val);
    });
  new cloud.Function(app, "Function", handler);
  const output = app.synth();
  expect(output).toContain("dynamodb:UpdateItem");
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("counter name valid", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const counter = new cloud.Counter(app, "The.Amazing-Counter_01");
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(output, "aws_dynamodb_table", {
      name: `wing-counter-The.Amazing-Counter_01-${counter.node.addr.substring(
        0,
        8
      )}`,
    })
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("replace invalid character from counter name", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const counter = new cloud.Counter(app, "The*Amazing%Counter@01");
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(output, "aws_dynamodb_table", {
      name: `wing-counter-The-Amazing-Counter-01-${counter.node.addr.substring(
        0,
        8
      )}`,
    })
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
