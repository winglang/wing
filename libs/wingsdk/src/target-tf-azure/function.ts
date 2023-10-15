import * as fs from "fs";
import { AssetType, Lazy, TerraformAsset } from "cdktf";
import { Construct } from "constructs";
import { App } from "./app";
import { Bucket, StorageAccountPermissions } from "./bucket";
import { core } from "..";
import { ApplicationInsights } from "../.gen/providers/azurerm/application-insights";
import { LinuxFunctionApp } from "../.gen/providers/azurerm/linux-function-app";
import { ResourceGroup } from "../.gen/providers/azurerm/resource-group";
import { RoleAssignment } from "../.gen/providers/azurerm/role-assignment";
import { ServicePlan } from "../.gen/providers/azurerm/service-plan";
import { StorageAccount } from "../.gen/providers/azurerm/storage-account";
import { StorageBlob } from "../.gen/providers/azurerm/storage-blob";
import * as cloud from "../cloud";
import { createBundle } from "../shared/bundling";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../shared/resource-names";
import { IInflightHost, IResource } from "../std";

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
 * Azure scoped role assignment.
 */
export interface ScopedRoleAssignment {
  /** The azure scope ie. /subscription/xxxxx/yyyyy/zzz */
  readonly scope: string;
  /** Role definition to assign */
  readonly roleDefinitionName: string;
}

/**
 * Azure implementation of `cloud.Function`.
 *
 * @inflight `@winglang/wingsdk.cloud.IFunctionClient`
 */
export class Function extends cloud.Function {
  private readonly function: LinuxFunctionApp;
  private readonly servicePlan: ServicePlan;
  private readonly storageAccount: StorageAccount;
  private readonly resourceGroup: ResourceGroup;
  private readonly applicationInsights: ApplicationInsights;
  private permissions?: Map<string, Set<ScopedRoleAssignment>>;

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps = {}
  ) {
    super(scope, id, inflight, props);

    const app = App.of(this) as App;
    this.storageAccount = app.storageAccount;
    this.resourceGroup = app.resourceGroup;
    this.servicePlan = app.servicePlan;
    this.applicationInsights = app.applicationInsights;

    const functionName = ResourceNames.generateName(this, FUNCTION_NAME_OPTS);
    const functionIdentityType = "SystemAssigned";
    const functionRuntime = "node";
    const functionNodeVersion = "18"; // support fetch

    // Create Bucket to store function code
    const functionCodeBucket = new Bucket(this, "FunctionBucket");

    const bundle = createBundle(this.entrypoint);
    const codeDir = bundle.directory;

    // Package up code in azure expected format
    const outDir = `${codeDir}/${functionName}`;

    // Move index.js to function name directory. Every Azure function in a function app
    // must be in its own folder containing an index.js and function.json files
    fs.mkdirSync(`${codeDir}/${functionName}`);
    fs.renameSync(bundle.entrypointPath, `${outDir}/index.js`);

    // throw an error if props.memory is defined for an Azure function
    if (props.memory) {
      throw new Error("memory is an invalid parameter on Azure");
    }

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
            authLevel: "anonymous", // TODO: this auth level will be changed with https://github.com/winglang/wing/issues/4497
            type: "httpTrigger",
            direction: "in",
            name: "req",
            methods: ["get", "post"],
          },
          {
            type: "http",
            direction: "out",
            name: "res",
          },
        ],
      })
    );
    // TODO: will be uncommented when fixing https://github.com/winglang/wing/issues/4494
    // const timeout = props.timeout ?? Duration.fromMinutes(1);

    // Write host.json file to set function timeout (must be set in root of function app)
    // https://learn.microsoft.com/en-us/azure/azure-functions/functions-host-json
    // this means that timeout is set for all functions in the function app
    fs.writeFileSync(
      `${codeDir}/host.json`,
      JSON.stringify({
        version: "2.0",
        //TODO: need to read the documentation and parse the number in the right way,
        // while not surpassing the limits, since it will be resulted in a hard to detect error
        functionTimeout: `00:01:00`,
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
        type: functionIdentityType,
      },
      storageAccountAccessKey: this.storageAccount.primaryAccessKey,
      siteConfig: {
        applicationStack: {
          nodeVersion: functionNodeVersion,
        },
        applicationInsightsConnectionString:
          this.applicationInsights.connectionString,
        applicationInsightsKey: this.applicationInsights.instrumentationKey,
      },
      httpsOnly: true,
      appSettings: Lazy.anyValue({
        produce: () => ({
          ...this.env,
          WEBSITE_RUN_FROM_PACKAGE: `https://${this.storageAccount.name}.blob.core.windows.net/${functionCodeBucket.storageContainer.name}/${functionCodeBlob.name}`,
          FUNCTIONS_WORKER_RUNTIME: functionRuntime,
        }),
      }) as any,
    });

    // Add permissions to read function code
    new RoleAssignment(this, `ReadLambdaCodeAssignment`, {
      principalId: this.function.identity.principalId,
      roleDefinitionName: StorageAccountPermissions.READ,
      scope: this.storageAccount.id,
    });

    // Apply permissions from bound resources
    for (const key of this.permissions?.keys() || []) {
      for (const scopedRoleAssignment of this.permissions?.get(key) ?? []) {
        new RoleAssignment(
          this,
          `RoleAssignment${key}${scopedRoleAssignment.roleDefinitionName}`,
          {
            scope: scopedRoleAssignment.scope,
            roleDefinitionName: scopedRoleAssignment.roleDefinitionName,
            principalId: this.function.identity.principalId,
          }
        );
      }
    }
  }

  /**
   * Function name, used for invocation
   */
  get name(): string {
    return this.function.name;
  }

  /**
   *  Adds role to function for given azure scope
   *
   * @param scopedResource - The resource to which the role assignment will be scoped.
   * @param scopedRoleAssignment - The mapping of azure scope to role definition name.
   */
  public addPermission(
    scopedResource: IResource,
    scopedRoleAssignment: ScopedRoleAssignment
  ) {
    if (!this.permissions) {
      this.permissions = new Map();
    }
    const uniqueId = scopedResource.node.addr.substring(-8);
    // If the function has already been initialized attach the role assignment directly
    if (this.function) {
      if (
        this.permissions.has(uniqueId) &&
        this.permissions.get(uniqueId)?.has(scopedRoleAssignment)
      ) {
        return; // already exists
      }

      new RoleAssignment(
        this,
        `RoleAssignment${uniqueId}${scopedRoleAssignment.roleDefinitionName}`,
        {
          scope: scopedRoleAssignment.scope,
          roleDefinitionName: scopedRoleAssignment.roleDefinitionName,
          principalId: this.function.identity.principalId,
        }
      );
    }
    const roleDefinitions = this.permissions.get(uniqueId) ?? new Set();
    roleDefinitions.add(scopedRoleAssignment);
    this.permissions.set(uniqueId, roleDefinitions);
  }

  protected _getCodeLines(handler: cloud.IFunctionHandler): string[] {
    const inflightClient = handler._toInflight();
    const lines = new Array<string>();

    lines.push("module.exports = async function(context, req) {");
    lines.push(
      `  const body = await (${inflightClient}).handle(context.req.body ?? "");`
    );
    lines.push(`  context.res = { body };`);
    lines.push(`};`);

    return lines;
  }

  public bind(host: IInflightHost, ops: string[]): void {
    //TODO: add permissions here when changing auth level: https://github.com/winglang/wing/issues/4497
    host.addEnvironment(this.envName(), this.function.name);

    super.bind(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-azure", "shared-azure"),
      __filename,
      "FunctionClient",
      [`process.env["${this.envName()}"]`]
    );
  }

  private envName(): string {
    return `FUNCTION_NAME_${this.node.addr.slice(-8)}`;
  }
}
