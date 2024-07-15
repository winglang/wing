import { test, expect } from "vitest";
import { GcpApp } from "./gcp-util";
import { Table, ColumnType } from "../../src/ex";
import { tfResourcesOf, tfSanitize } from "../util";

test("create a table", () => {
  const app = new GcpApp();
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
