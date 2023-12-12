import * as cdktf from "cdktf";
import { test, expect } from "vitest";
import { Function } from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { Duration } from "../../src/std";
import * as tfgcp from "../../src/target-tf-gcp";
import { mkdtemp, tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

const GCP_APP_OPTS = {
  projectId: "my-project",
  region: "us-central1",
  entrypointDir: __dirname,
  zone: "us-central1",
};

const INFLIGHT_CODE = `async handle(name) { console.log("Hello, " + name); }`;

test("basic function", () => {
  // GIVEN
  const app = new tfgcp.App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const inflight = Testing.makeHandler(INFLIGHT_CODE);

  // WHEN
  new Function(app, "Function", inflight);
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "google_cloudfunctions_function",
    "google_service_account",
    "google_storage_bucket",
    "google_storage_bucket_object",
    "random_id",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("basic function with environment variables", () => {
  // GIVEN
  const app = new tfgcp.App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const inflight = Testing.makeHandler(INFLIGHT_CODE);

  // WHEN
  new Function(app, "Function", inflight, {
    env: {
      FOO: "BAR",
      BOOM: "BAM",
    },
  });
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "google_cloudfunctions_function",
      {
        environment_variables: {
          BOOM: "BAM",
          FOO: "BAR",
        },
      }
    )
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("basic function with timeout explicitly set", () => {
  // GIVEN
  const app = new tfgcp.App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const inflight = Testing.makeHandler(INFLIGHT_CODE);

  // WHEN
  new Function(app, "Function", inflight, {
    timeout: Duration.fromSeconds(30),
  });
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "google_cloudfunctions_function",
      {
        timeout: 30,
      }
    )
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("basic function with timeout beyond the allowed range", () => {
  // GIVEN
  const app = new tfgcp.App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const inflight = Testing.makeHandler(INFLIGHT_CODE);

  // WHEN
  expect(() => {
    new Function(app, "Function", inflight, {
      timeout: Duration.fromSeconds(0),
    });
  }).toThrowErrorMatchingSnapshot();
});

test("basic function with memory size specified", () => {
  // GIVEN
  const app = new tfgcp.App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const inflight = Testing.makeHandler(INFLIGHT_CODE);

  // WHEN
  new Function(app, "Function", inflight, {
    memory: 256,
  });
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "google_cloudfunctions_function",
      {
        available_memory_mb: 256,
      }
    )
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("basic function with memory beyond the allowed range", () => {
  // GIVEN
  const app = new tfgcp.App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const inflight = Testing.makeHandler(INFLIGHT_CODE);

  // WHEN
  expect(() => {
    new Function(app, "Function", inflight, {
      memory: 64,
    });
  }).toThrowErrorMatchingSnapshot();
});
