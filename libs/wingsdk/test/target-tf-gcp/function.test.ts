import { Testing } from "../../src/testing";
import { test, expect } from "vitest";
import * as tfgcp from "../../src/target-tf-gcp";
import { mkdtemp, tfResourcesOf, tfSanitize, treeJsonOf } from "../util";
import { Function } from "../../src/cloud";

const INFLIGHT_CODE = `async handle(name) { console.log("Hello, " + name); }`;

const GCP_APP_OPTS = {
  projectId: "my-project",
  storageLocation: "US",
  entrypointDir: __dirname,
};

test("basic function", () => {
  const app = new tfgcp.App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE)
  Function._newFunction(app, "Function", inflight);
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual([]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
})
