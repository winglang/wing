import { test, expect } from "vitest";
import { Table, ColumnType } from "../../src/ex";
import * as tfgcp from "../../src/target-tf-gcp";
import { mkdtemp, tfResourcesOf, tfSanitize } from "../util";

const GCP_APP_OPTS = {
  projectId: "my-project",
  storageLocation: "US",
  entrypointDir: __dirname,
  region: "us-central1",
};

test("create a table", () => {
  const app = new tfgcp.App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  new Table(app, "my_table", {
    primaryKey: "id",
    columns: { name: ColumnType.STRING },
    name: "simple-table",
  });
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual([
    "google_bigtable_instance",
    "google_bigtable_table",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
});
