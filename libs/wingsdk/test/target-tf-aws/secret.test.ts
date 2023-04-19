import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import { mkdtemp } from "../../src/util";
import { tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

test("default secret behavior", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  cloud.Secret._newSecret(app, "Secret");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual(["aws_secretsmanager_secret"]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
