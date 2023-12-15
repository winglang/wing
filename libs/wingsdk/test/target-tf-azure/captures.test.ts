import * as cdktf from "cdktf";
import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { Testing } from "../../src/simulator";
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
  //   const inflight = Testing.makeHandler(
  //     `async handle(event) { await this.bucket.put("hello.txt", event); }`,
  //     {
  //       bucket: {
  //         obj: bucket,
  //         ops: [cloud.BucketInflightMethods.PUT],
  //       },
  //     }
  //   );
  //   // WHEN
  //   new cloud.Function(app, "Function", inflight);
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
  //   expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
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
  //   const inflight = Testing.makeHandler(
  //     `async handle(event) { await this.bucket.get("hello.txt"); }`,
  //     {
  //       bucket: {
  //         obj: bucket,
  //         ops: [cloud.BucketInflightMethods.GET],
  //       },
  //     }
  //   );
  //   // WHEN
  //   new cloud.Function(app, "Function", inflight);
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
  //   expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
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
