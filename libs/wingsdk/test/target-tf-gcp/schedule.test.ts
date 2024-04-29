import { test, expect } from "vitest";
import { Schedule } from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { Duration } from "../../src/std";
import * as tfgcp from "../../src/target-tf-gcp";
import { mkdtemp, tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

const GCP_APP_OPTS = {
  projectId: "my-project",
  entrypointDir: __dirname,
  storageLocation: "US",
  region: "us-central1",
  zone: "us-central1",
};

const CODE_LOG_EVENT = `async handle(event) { console.log("Received: ", event); }`;

test("create a schedule", () => {
  // GIVEN
  const app = new tfgcp.App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const fn = Testing.makeHandler(CODE_LOG_EVENT);
  const schedule = new Schedule(app, "Schedule", {
    rate: Duration.fromMinutes(2),
  });
  schedule.onTick(fn);
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "google_cloud_scheduler_job",
    "google_cloudfunctions_function",
    "google_cloudfunctions_function_iam_member",
    "google_project_iam_custom_role",
    "google_project_iam_member",
    "google_project_service",
    "google_service_account",
    "google_storage_bucket",
    "google_storage_bucket_object",
    "random_id",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
