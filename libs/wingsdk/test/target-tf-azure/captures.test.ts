import * as cdktf from "cdktf";
import * as cloud from "../../src/cloud";
import * as tfazure from "../../src/target-tf-azure";
import { Testing } from "../../src/testing";
import { mkdtemp, sanitizeCode } from "../../src/util";
import { tfResourcesOf, tfSanitize } from "../util";

test("function with a bucket binding requiring read_write", () => {
  // GIVEN
  const app = new tfazure.App({ outdir: mkdtemp(), location: "East US" });
  const bucket = new cloud.Bucket(app, "Bucket");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) { await this.bucket.put("hello.txt", event); }`,
    {
      resources: {
        bucket: {
          resource: bucket,
          ops: [cloud.BucketInflightMethods.PUT],
        },
      },
    }
  );

  // WHEN
  new cloud.Function(app, "Function", inflight);
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "azurerm_role_assignment",
      {
        role_definition_name: tfazure.StorageAccountPermissions.READ_WRITE,
      }
    )
  ).toEqual(true);
  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
  expect(tfResourcesOf(output)).toEqual([
    "azurerm_linux_function_app",
    "azurerm_resource_group",
    "azurerm_role_assignment",
    "azurerm_service_plan",
    "azurerm_storage_account",
    "azurerm_storage_blob",
    "azurerm_storage_container",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("function with a bucket binding requiring only read", () => {
  // GIVEN
  const app = new tfazure.App({ outdir: mkdtemp(), location: "East US" });
  const bucket = new cloud.Bucket(app, "Bucket");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) { await this.bucket.get("hello.txt"); }`,
    {
      resources: {
        bucket: {
          resource: bucket,
          ops: [cloud.BucketInflightMethods.GET],
        },
      },
    }
  );

  // WHEN
  new cloud.Function(app, "Function", inflight);
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "azurerm_role_assignment",
      {
        role_definition_name: tfazure.StorageAccountPermissions.READ,
      }
    )
  ).toEqual(true);

  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "azurerm_role_assignment",
      {
        role_definition_name: tfazure.StorageAccountPermissions.READ_WRITE,
      }
    )
  ).toEqual(false);

  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
  expect(tfResourcesOf(output)).toEqual([
    "azurerm_linux_function_app",
    "azurerm_resource_group",
    "azurerm_role_assignment",
    "azurerm_service_plan",
    "azurerm_storage_account",
    "azurerm_storage_blob",
    "azurerm_storage_container",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
});
