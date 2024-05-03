import { TerraformVariable } from "cdktf";
import { test, expect } from "vitest";
import { lift } from "../../src/core";
import * as tfaws from "../../src/target-tf-aws";
import { Api } from "../../src/target-tf-aws";
import { mkdtemp, tfSanitize, sanitizeCode } from "../util";

test("captures tokens", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");
  const numVar = new TerraformVariable(app, "Number", {
    type: "Number",
    default: 123,
  });
  const listVar = new TerraformVariable(app, "List", {
    type: "List<Number>",
    default: [1, 2, 3],
  });
  const handler = lift({
    str: api.url,
    num: numVar.numberValue,
    list: listVar.listValue,
  }).inflight(async (ctx) => {
    console.log(ctx.str, ctx.num, ctx.list);
    return undefined;
  });

  api.get("/", handler);

  const output = app.synth();

  // THEN
  expect(sanitizeCode(handler._toInflight())).toMatchSnapshot();
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("captures tokens inside plain objects", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");
  const numVar = new TerraformVariable(app, "Number", {
    type: "Number",
    default: 123,
  });

  const handler = lift({
    foo: { str: api.url, num: numVar.numberValue },
  }).inflight(async (ctx) => {
    console.log(ctx.foo.str, ctx.foo.num);
  });

  api.get("/", handler);

  const output = app.synth();

  // THEN
  expect(sanitizeCode(handler._toInflight())).toMatchSnapshot();
  expect(tfSanitize(output)).toMatchSnapshot();
});
