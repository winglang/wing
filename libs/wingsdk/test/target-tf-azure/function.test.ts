import * as cdktf from "cdktf";
import { test, expect } from "vitest";
import { Function } from "../../src/cloud";
import { inflight } from "../../src/core";
import * as tfazure from "../../src/target-tf-azure";
import { mkdtemp, tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

const INFLIGHT_CODE = inflight(async (_, name) => {
  console.log("Hello, " + name);
});

test("basic function", () => {
  // GIVEN
  const app = new tfazure.App({
    outdir: mkdtemp(),
    location: "East US",
    entrypointDir: __dirname,
  });

  // WHEN
  new Function(app, "Function", INFLIGHT_CODE);
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "azurerm_application_insights",
    "azurerm_linux_function_app", // function app
    "azurerm_log_analytics_workspace",
    "azurerm_resource_group", // resource group
    "azurerm_role_assignment", // role assignment for function app
    "azurerm_service_plan", // service plan for function app
    "azurerm_storage_account", // storage account
    "azurerm_storage_blob", // storage blob for code
    "azurerm_storage_container", // storage container for code
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("basic function with environment variables", () => {
  // GIVEN
  const app = new tfazure.App({
    outdir: mkdtemp(),
    location: "East US",
    entrypointDir: __dirname,
  });

  // WHEN
  new Function(app, "Function", INFLIGHT_CODE, {
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
      "azurerm_linux_function_app",
      {
        app_settings: {
          BOOM: "BAM",
          FOO: "BAR",
        },
      }
    )
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("permissions resources are added to function after constructor has been initialized", () => {
  // GIVEN
  const app = new tfazure.App({
    outdir: mkdtemp(),
    location: "East US",
    entrypointDir: __dirname,
  });

  const func = new tfazure.Function(app, "Function", INFLIGHT_CODE, {});

  // WHEN
  func.addPermission(func, {
    scope: "some/scope",
    roleDefinitionName: "some_role",
  });
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "azurerm_role_assignment",
      {
        role_definition_name: "some_role",
      }
    )
  ).toEqual(true);
});

test("replace invalid character from function name", () => {
  // GIVEN
  const app = new tfazure.App({
    outdir: mkdtemp(),
    location: "East US",
    entrypointDir: __dirname,
  });

  // WHEN
  const func = new Function(app, "someFunction01", INFLIGHT_CODE);
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "azurerm_linux_function_app",
      {
        name: `somefunction01-${func.node.addr.substring(0, 8)}`,
      }
    )
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
