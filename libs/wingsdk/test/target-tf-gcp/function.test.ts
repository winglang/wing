import { test, expect } from "vitest";
import { Function } from "../../src/cloud";
import * as tfgcp from "../../src/target-tf-gcp";
import { Testing } from "../../src/testing";
import { mkdtemp, tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

const INFLIGHT_CODE = `async handle(name) { console.log("Hello, " + name); }`;

const GCP_APP_OPTS = {
  projectId: "my-project",
  storageLocation: "US",
  entrypointDir: __dirname,
};

test("basic function", () => {
  const app = new tfgcp.App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  Function._newFunction(app, "Function", inflight);
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual(["google_cloudfunctions_function"]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
