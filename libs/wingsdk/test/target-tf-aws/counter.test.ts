import * as cdktf from "cdktf";
import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import { Testing } from "../../src/testing";
import {
  mkdtemp,
  sanitizeCode,
  tfResourcesOf,
  tfSanitize,
  treeJsonOf,
} from "../util";

test("default counter behavior", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  cloud.Counter._newCounter(app, "Counter");
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual(["aws_dynamodb_table"]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("counter with initial value", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  cloud.Counter._newCounter(app, "Counter", {
    initial: 9991,
  });
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual(["aws_dynamodb_table"]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("function with a counter binding", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  const counter = cloud.Counter._newCounter(app, "Counter");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) {
  const val = await this.my_counter.inc(2);
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [cloud.CounterInflightMethods.INC],
      },
    }
  );
  cloud.Function._newFunction(app, "Function", inflight);
  const output = app.synth();

  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
  expect(tfResourcesOf(output)).toEqual([
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
  const app = new tfaws.App({ outdir: mkdtemp() });
  const counter = cloud.Counter._newCounter(app, "Counter");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) {
  const val = await this.my_counter.inc(2);
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [cloud.CounterInflightMethods.INC],
      },
    }
  );
  cloud.Function._newFunction(app, "Function", inflight);
  const output = app.synth();

  expect(tfSanitize(output)).toContain("dynamodb:UpdateItem");
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("dec() policy statement", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  const counter = cloud.Counter._newCounter(app, "Counter");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) {
  const val = await this.my_counter.dec(2);
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [cloud.CounterInflightMethods.DEC],
      },
    }
  );
  cloud.Function._newFunction(app, "Function", inflight);
  const output = app.synth();

  expect(tfSanitize(output)).toContain("dynamodb:UpdateItem");
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("peek() policy statement", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  const counter = cloud.Counter._newCounter(app, "Counter");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) {
  const val = await this.my_counter.peek();
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [cloud.CounterInflightMethods.PEEK],
      },
    }
  );
  cloud.Function._newFunction(app, "Function", inflight);
  const output = app.synth();

  expect(tfSanitize(output)).toContain("dynamodb:GetItem");
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("reset() policy statement", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  const counter = cloud.Counter._newCounter(app, "Counter");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) {
  const val = await this.my_counter.reset();
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [cloud.CounterInflightMethods.RESET],
      },
    }
  );
  cloud.Function._newFunction(app, "Function", inflight);
  const output = app.synth();

  expect(tfSanitize(output)).toContain("dynamodb:UpdateItem");
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("counter name valid", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const counter = cloud.Counter._newCounter(app, "The.Amazing-Counter_01");
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
  const app = new tfaws.App({ outdir: mkdtemp() });
  const counter = cloud.Counter._newCounter(app, "The*Amazing%Counter@01");
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
