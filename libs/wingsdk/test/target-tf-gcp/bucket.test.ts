import * as cloud from "../../src/cloud";
import * as tfgcp from "../../src/target-tf-gcp";
import { mkdtemp } from "../../src/util";
import { tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

test("create a bucket", () => {
  // GIVEN
  const app = new tfgcp.App({ outdir: mkdtemp(), projectId: "my-project" });
  new cloud.Bucket(app, "my_bucket");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual(["google_storage_bucket"]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("bucket is public", () => {
  // GIVEN
  const app = new tfgcp.App({ outdir: mkdtemp(), projectId: "my-project" });
  new cloud.Bucket(app, "my_bucket", { public: true });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "google_storage_bucket",
    "google_storage_bucket_iam_member",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
