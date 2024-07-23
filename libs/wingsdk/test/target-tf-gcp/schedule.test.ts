import { test, expect } from "vitest";
import { GcpApp } from "./gcp-util";
import { Schedule } from "../../src/cloud";
import { inflight } from "../../src/core";
import { Duration } from "../../src/std";
import { tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

const GCP_APP_OPTS = {
  projectId: "my-project",
  entrypointDir: __dirname,
  storageLocation: "US",
  region: "us-central1",
  zone: "us-central1",
};

const CODE_LOG_EVENT = inflight(async (_, event) =>
  console.log("Received: ", event)
);

test("create a schedule", () => {
  // GIVEN
  const app = new GcpApp();
  const schedule = new Schedule(app, "Schedule", {
    rate: Duration.fromMinutes(2),
  });
  schedule.onTick(CODE_LOG_EVENT);
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "google_cloud_scheduler_job",
    "google_cloudfunctions_function",
    "google_cloudfunctions_function_iam_member",
    "google_project_service",
    "google_service_account",
    "google_storage_bucket",
    "google_storage_bucket_object",
    "random_id",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
