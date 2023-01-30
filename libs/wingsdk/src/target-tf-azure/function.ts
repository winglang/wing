import * as fs from "fs";
import { resolve } from "path";
import { LinuxFunctionApp } from "@cdktf/provider-azurerm/lib/linux-function-app";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { RoleAssignment } from "@cdktf/provider-azurerm/lib/role-assignment";
import { ServicePlan } from "@cdktf/provider-azurerm/lib/service-plan";
import { StorageAccount } from "@cdktf/provider-azurerm/lib/storage-account";
import { StorageBlob } from "@cdktf/provider-azurerm/lib/storage-blob";
import { AssetType, TerraformAsset } from "cdktf";
import { Construct } from "constructs";
import { App } from "./app";
import { Bucket } from "./bucket";
import * as cloud from "../cloud";
import * as core from "../core";
import { NameOptions, ResourceNames } from "../utils/resource-names";

/**
 * Function names are limited to 32 characters.
 * You can use alphanumeric characters.
 * https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/resource-name-rules#microsoftweb
 */
const FUNCTION_NAME_OPTS: NameOptions = {
  maxLen: 32,
  disallowedRegex: /[^a-z0-9]+/g,
};

/**
 * Azure implementation of `cloud.Function`.
 *
 * @inflight `@winglang/wingsdk.cloud.IFunctionClient`
 */
export class Function extends cloud.FunctionBase {
  private readonly function: LinuxFunctionApp;
  private readonly app: App;
  private readonly servicePlan: ServicePlan;
  private readonly storageAccount: StorageAccount;
  private readonly resourceGroup: ResourceGroup;
  private permissions?: Map<string, string[]>;

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps
  ) {
    super(scope, id, inflight, props);

    this.app = App.of(this);
    this.storageAccount = this.app.storageAccount;
    this.resourceGroup = this.app.resourceGroup;

    const functionName = ResourceNames.generateName(this, FUNCTION_NAME_OPTS);

    // Create service plan for function using dynamic sku
    // https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/service_plan#sku_name
    this.servicePlan = new ServicePlan(this, "ServicePlan", {
      name: `serviceplan${functionName}`,
      resourceGroupName: this.resourceGroup.name,
      location: this.resourceGroup.location,
      osType: "Linux",
      skuName: "Y1",
    });

    // Create Bucket to store function code
    const functionCodeBucket = new Bucket(this, "FunctionBucket");

    // Package up code in azure expected format
    const codeDir = resolve(this.assetPath, "..");
    const outDir = `${codeDir}/${functionName}`;

    // Move index.js to function name directory. Every Azure function in a function app
    // must be in its own folder containing an index.js and function.json files
    fs.mkdirSync(`${codeDir}/${functionName}`);
    fs.renameSync(`${codeDir}/index.js`, `${outDir}/index.js`);

    // As per documentation "a function must have exactly one trigger" so for now
    // by default a function will support http get requests
    // when we bind other resources like queues or topics this function.json will need to
    // be overwritten with the correct trigger
    // https://learn.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings?tabs=csharp
    fs.writeFileSync(
      `${outDir}/function.json`,
      JSON.stringify({
        bindings: [
          {
            authLevel: "anonymous",
            type: "httpTrigger",
            direction: "in",
            name: "req",
            methods: ["get"],
          },
          {
            type: "http",
            direction: "out",
            name: "res",
          },
        ],
      })
    );

    // Create zip asset from function code
    const asset = new TerraformAsset(this, "Asset", {
      path: `${codeDir}`,
      type: AssetType.ARCHIVE,
    });

    // Upload zip asset to storage account
    const functionCodeBlob = new StorageBlob(this, "CodeBlob", {
      name: `${functionName}.zip`,
      storageAccountName: this.storageAccount.name,
      storageContainerName: functionCodeBucket.storageContainer.name,
      type: "Block",
      source: asset.path,
    });

    // Create the function
    this.function = new LinuxFunctionApp(this, "Function", {
      name: functionName,
      resourceGroupName: this.resourceGroup.name,
      location: this.resourceGroup.location,
      servicePlanId: this.servicePlan.id,
      storageAccountName: this.storageAccount.name,
      identity: {
        type: "SystemAssigned",
      },
      storageAccountAccessKey: this.storageAccount.primaryAccessKey,
      siteConfig: {
        applicationStack: {
          nodeVersion: "16",
        },
      },
      httpsOnly: true,
      appSettings: {
        ...this.env,
        FUNCTION_APP_EDIT_MODE: "readonly",
        WEBSITE_RUN_FROM_PACKAGE: `https://${this.storageAccount.name}.blob.core.windows.net/${functionCodeBucket.storageContainer.name}/${functionCodeBlob.name}`,
        FUNCTIONS_WORKER_RUNTIME: "node",
      },
    });

    // Add permissions to read function code
    new RoleAssignment(this, `ReadLambdaCodeAssignment`, {
      principalId: this.function.identity.principalId,
      roleDefinitionName: "Storage Blob Data Reader",
      scope: this.storageAccount.id,
    });

    // Apply permissions from bound resources
    for (const permissionScope of this.permissions?.keys() || []) {
      for (const roleDefinitionName of this.permissions?.get(permissionScope) ??
        []) {
        new RoleAssignment(this, `RoleAssignment${roleDefinitionName}`, {
          scope: permissionScope,
          roleDefinitionName,
          principalId: this.function.identity.principalId,
        });
      }
    }
  }

  // Adds role to function for given azure scope
  public addPermission(scope: string, roleDefinitionName: string) {
    if (!this.permissions) {
      this.permissions = new Map();
    }
    const existingPermissions = this.permissions.get(scope) ?? [];
    this.permissions.set(scope, [...existingPermissions, roleDefinitionName]);
  }

  /** @internal */
  public _toInflight(): core.Code {
    throw new Error("Method not implemented.");
  }
}
