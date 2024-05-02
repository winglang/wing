import * as cdktf from "cdktf";
import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import * as tfazure from "../../src/target-tf-azure";
import { mkdtemp, sanitizeCode, tfResourcesOf, tfSanitize } from "../util";
// TODO: uncomment everything when fixing -https://github.com/winglang/wing/issues/5123

test("function with a bucket binding requiring read_write", () => {
  //   // GIVEN
  //   const app = new tfazure.App({
  //     outdir: mkdtemp(),
  //     location: "East US",
  //     entrypointDir: __dirname,
  //   });
  //   const bucket = new cloud.Bucket(app, "Bucket");
  //   const handler = lift({ bucket }).grant({ bucket: ["put"] }).inflight(async (ctx) => { await ctx.bucket.put("hello.txt", event); });
  //   // WHEN
  //   new cloud.Function(app, "Function", handler);
  //   const output = app.synth();
  //   // THEN
  //   expect(
  //     cdktf.Testing.toHaveResourceWithProperties(
  //       output,
  //       "azurerm_role_assignment",
  //       {
  //         role_definition_name: tfazure.StorageAccountPermissions.READ_WRITE,
  //       }
  //     )
  //   ).toEqual(true);
  //   expect(sanitizeCode(handler._toInflight())).toMatchSnapshot();
  //   expect(tfResourcesOf(output)).toEqual([
  //     "azurerm_application_insights",
  //     "azurerm_linux_function_app",
  //     "azurerm_log_analytics_workspace",
  //     "azurerm_resource_group",
  //     "azurerm_role_assignment",
  //     "azurerm_service_plan",
  //     "azurerm_storage_account",
  //     "azurerm_storage_blob",
  //     "azurerm_storage_container",
  //   ]);
  //   expect(tfSanitize(output)).toMatchSnapshot();
});

test("function with a bucket binding requiring only read", () => {
  //   // GIVEN
  //   const app = new tfazure.App({
  //     outdir: mkdtemp(),
  //     location: "East US",
  //     entrypointDir: __dirname,
  //   });
  //   const bucket = new cloud.Bucket(app, "Bucket");
  //   const handler = lift({ bucket }).grant({ bucket: ["get"] }).inflight(async (ctx) => { await ctx.bucket.get("hello.txt"); });
  //   // WHEN
  //   new cloud.Function(app, "Function", handler);
  //   const output = app.synth();
  //   // THEN
  //   expect(
  //     cdktf.Testing.toHaveResourceWithProperties(
  //       output,
  //       "azurerm_role_assignment",
  //       {
  //         role_definition_name: tfazure.StorageAccountPermissions.READ,
  //       }
  //     )
  //   ).toEqual(true);
  //   expect(
  //     cdktf.Testing.toHaveResourceWithProperties(
  //       output,
  //       "azurerm_role_assignment",
  //       {
  //         role_definition_name: tfazure.StorageAccountPermissions.READ_WRITE,
  //       }
  //     )
  //   ).toEqual(false);
  //   expect(sanitizeCode(handler._toInflight())).toMatchSnapshot();
  //   expect(tfResourcesOf(output)).toEqual([
  //     "azurerm_application_insights",
  //     "azurerm_linux_function_app",
  //     "azurerm_log_analytics_workspace",
  //     "azurerm_resource_group",
  //     "azurerm_role_assignment",
  //     "azurerm_service_plan",
  //     "azurerm_storage_account",
  //     "azurerm_storage_blob",
  //     "azurerm_storage_container",
  //   ]);
  //   expect(tfSanitize(output)).toMatchSnapshot();
});
