import { TerraformVariable } from "cdktf";
import { test, expect } from "vitest";
import { Testing } from "../../src/simulator";
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

  const inflight = Testing.makeHandler(
    `async handle(event) {
    console.log(this.str, this.num, this.list);
  }`,
    {
      str: {
        obj: api.url,
        ops: [],
      },
      num: {
        obj: numVar.numberValue,
        ops: [],
      },
      list: {
        obj: listVar.listValue,
        ops: [],
      },
    }
  );

  api.get("/", inflight);

  const output = app.synth();

  // THEN
  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
  expect(tfSanitize(output)).toMatchSnapshot();
});
