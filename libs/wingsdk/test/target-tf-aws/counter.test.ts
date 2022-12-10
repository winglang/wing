import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as tfaws from "../../src/target-tf-aws";
import { mkdtemp } from "../../src/util";
import { tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

test("default counter behavior", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  new cloud.Counter(app, "Counter");
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual(["aws_dynamodb_table"]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("counter with initial value", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  new cloud.Counter(app, "Counter", {
    initial: 9991,
  });
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual(["aws_dynamodb_table"]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("function with a counter binding", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  const counter = new cloud.Counter(app, "Counter");
  const inflight = new core.Inflight({
    code: core.NodeJsCode.fromInline(
      `async function $proc($cap, event) {
          const val = await $cap.my_counter.inc(2);
          console.log(val);
        }`
    ),
    bindings: {
      my_counter: {
        resource: counter,
        methods: ["inc"],
      },
    },
    entrypoint: "$proc",
  });
  const fn = new cloud.Function(app, "Function", inflight);
  const output = app.synth();

  expect(core.Testing.inspectPrebundledCode(fn).text).toMatchSnapshot();
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
