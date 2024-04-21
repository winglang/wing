import { test, expect } from "vitest";
import { Schedule } from "../../src/cloud";
import * as tfgcp from "../../src/target-tf-gcp";
import { mkdtemp, tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

const GCP_APP_OPTS = {
  projectId: "my-project",
  entrypointDir: __dirname,
  storageLocation: "US",
  region: "us-central1",
  zone: "us-central1",
};

test("create a schedule", () => {
  // GIVEN
  const app = new tfgcp.App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  new Schedule(app, "my-schedule", {
    cron: "* * * * *",
  });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "google_project_service",
    "google_storage_bucket",
    "random_id",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
