import { test, expect } from "vitest";
import { Table, ColumnType } from "../../src/ex";
import { mkdtemp, tfResourcesOf, tfSanitize, createTFGCPApp } from "../util";

const GCP_APP_OPTS = {
  projectId: "my-project",
  storageLocation: "US",
  entrypointDir: __dirname,
  region: "us-central1",
  zone: "us-central1-a",
};

test("create a table", () => {
  const app = createTFGCPApp({ outdir: mkdtemp(), ...GCP_APP_OPTS });
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
