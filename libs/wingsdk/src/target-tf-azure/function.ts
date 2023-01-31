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
import { Bucket, StorageAccountPermissions } from "./bucket";
import * as cloud from "../cloud";
import * as core from "../core";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../utils/resource-names";

/**
 * Function names are limited to 32 characters.
 * You can use alphanumeric characters.
 * https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/resource-name-rules#microsoftweb
 */
const FUNCTION_NAME_OPTS: NameOptions = {
  maxLen: 32,
  disallowedRegex: /[^a-z0-9]+/g,
  case: CaseConventions.LOWERCASE,
};

/**
 * Azure implementation of `cloud.Function`.
 *
 * @inflight `@winglang/wingsdk.cloud.IFunctionClient`
 */
export class Function extends cloud.FunctionBase {
  private readonly function: LinuxFunctionApp;
  private readonly servicePlan: ServicePlan;
  private readonly storageAccount: StorageAccount;
  private readonly resourceGroup: ResourceGroup;
  private permissions?: Map<string, Set<string>>;

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps
  ) {
    super(scope, id, inflight, props);

    const app = App.of(this);
    this.storageAccount = app.storageAccount;
    this.resourceGroup = app.resourceGroup;
    this.servicePlan = app.servicePlan;

    const functionName = ResourceNames.generateName(this, FUNCTION_NAME_OPTS);
    const functionIdentityType = "SystemAssigned";
    const functionRuntime = "node";
    const functionNodeVersion = "16";

    // Create Bucket to store function code
    // TODO: can we share a bucket for all functions?  https://github.com/winglang/wing/issues/178
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
            authLevel: "anonymous", // TODO: this auth level will be changed with https://github.com/winglang/wing/issues/1371
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

    if (props.timeout) {
      // Write host.json file to set function timeout (must be set in root of function app)
      // https://learn.microsoft.com/en-us/azure/azure-functions/functions-host-json
      // this means that timeout is set for all functions in the function app
      fs.writeFileSync(
        `${codeDir}/host.json`,
        JSON.stringify({
          functionTimeout: `${props.timeout.hours}:${props.timeout.minutes}:${props.timeout.seconds}`,
        })
      );
    }

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
        type: functionIdentityType,
      },
      storageAccountAccessKey: this.storageAccount.primaryAccessKey,
      siteConfig: {
        applicationStack: {
          nodeVersion: functionNodeVersion,
        },
      },
      httpsOnly: true,
      appSettings: {
        ...this.env,
        WEBSITE_RUN_FROM_PACKAGE: `https://${this.storageAccount.name}.blob.core.windows.net/${functionCodeBucket.storageContainer.name}/${functionCodeBlob.name}`,
        FUNCTIONS_WORKER_RUNTIME: functionRuntime,
      },
    });

    // Add permissions to read function code
    new RoleAssignment(this, `ReadLambdaCodeAssignment`, {
      principalId: this.function.identity.principalId,
      roleDefinitionName: StorageAccountPermissions.READ,
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

  /**
   *  Adds role to function for given azure scope
   *
   * @param scope - The azure permission scope of the role assignment to create.
   * @param roleDefinitionName - The name of the role definition to use in the role assignment.
   */
  public addPermission(scope: string, roleDefinitionName: string) {
    if (!this.permissions) {
      this.permissions = new Map();
    }

    // If the function has already been initialized attach the role assignment directly
    if (this.function) {
      if (
        this.permissions.has(scope) &&
        this.permissions.get(scope)?.has(roleDefinitionName)
      ) {
        return; // already exists
      }

      new RoleAssignment(this, `RoleAssignment${roleDefinitionName}`, {
        scope,
        roleDefinitionName,
        principalId: this.function.identity.principalId,
      });
    }

    const roleDefinitions = this.permissions.get(scope) ?? new Set();
    roleDefinitions.add(roleDefinitionName);
    this.permissions.set(scope, roleDefinitions);
  }

  /** @internal */
  public _toInflight(): core.Code {
    throw new Error("Method not implemented.");
  }
}
