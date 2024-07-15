import { test, expect } from "vitest";
import { AwsApp } from "./aws-util";
import * as cloud from "../../src/cloud";
import { tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

test("default secret behavior", () => {
  // GIVEN
  const app = new AwsApp();
  new cloud.Secret(app, "Secret");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual(["aws_secretsmanager_secret"]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("secret with a name", () => {
  // GIVEN
  const app = new AwsApp();
  new cloud.Secret(app, "Secret", {
    name: "my-secret",
  });
  const output = app.synth();

  // THEN
  expect(tfSanitize(output)).toMatchSnapshot();
});
