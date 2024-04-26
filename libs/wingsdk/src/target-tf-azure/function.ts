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
import { LiftDepsMatrixRaw } from "../core";
import { NotImplementedError } from "../core/errors";
import { createBundle } from "../shared/bundling";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../shared/resource-names";
import { IInflightHost } from "../std";

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
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 */
export class Function extends cloud.Function {
  private readonly function: LinuxFunctionApp;
  private readonly servicePlan: ServicePlan;
  private readonly storageAccount: StorageAccount;
  private readonly resourceGroup: ResourceGroup;
  private readonly applicationInsights: ApplicationInsights;
  private permissions: Map<string, ScopedRoleAssignment> = new Map();
  private readonly functionName: string;
  private assetPath: string | undefined;

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

    this.functionName = ResourceNames.generateName(this, FUNCTION_NAME_OPTS);
    const functionIdentityType = "SystemAssigned";
    const functionRuntime = "node";
    const functionNodeVersion = "20"; // support fetch

    // Create Bucket to store function code
    const functionCodeBucket = new Bucket(this, "FunctionBucket");

    if (props.concurrency != null) {
      throw new NotImplementedError(
        "Function concurrency isn't implemented yet on the current target."
      );
    }

    // throw an error if props.memory is defined for an Azure function
    if (props.memory) {
      throw new NotImplementedError("memory is an invalid parameter on Azure", {
        resource: this.constructor.name,
        operation: "memory",
      });
    }

    // TODO: will be uncommented when fixing https://github.com/winglang/wing/issues/4494
    // const timeout = props.timeout ?? Duration.fromMinutes(1);
    if (props.timeout) {
      throw new NotImplementedError(
        "Function.timeout is not implemented yet on tf-azure target.",
        {
          issue: "https://github.com/winglang/wing/issues/4494",
          resource: this.constructor.name,
          operation: "timeout",
        }
      );
    }

    // Upload zip asset to storage account
    const functionCodeBlob = new StorageBlob(this, "CodeBlob", {
      name: `${this.functionName}.zip`,
      storageAccountName: this.storageAccount.name,
      storageContainerName: functionCodeBucket.storageContainer.name,
      type: "Block",
      source: Lazy.stringValue({
        produce: () => {
          if (!this.assetPath) {
            throw new Error("assetPath was not set");
          }
          return this.assetPath;
        },
      }),
    });

    // Create the function
    this.function = new LinuxFunctionApp(this, "Function", {
      name: this.functionName,
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

    // Apply permissions from bound resources
    for (const key of this.permissions.keys() || []) {
      const scopedRoleAssignment = this.permissions?.get(
        key
      ) as ScopedRoleAssignment;
      new RoleAssignment(this, `RoleAssignment${key}`, {
        scope: scopedRoleAssignment.scope,
        roleDefinitionName: scopedRoleAssignment.roleDefinitionName,
        principalId: this.function.identity.principalId,
      });
    }

    const roleAssignment = {
      principalId: this.function.identity.principalId,
      roleDefinitionName: StorageAccountPermissions.READ,
      scope: this.storageAccount.id,
    };
    // Add permissions to read function code
    new RoleAssignment(this, `ReadLambdaCodeAssignment`, roleAssignment);

    this.permissions.set(
      `${this.storageAccount.node.addr.substring(-8)}_${
        StorageAccountPermissions.READ
      }`,
      roleAssignment
    );
  }

  /** @internal */
  public _preSynthesize(): void {
    super._preSynthesize();

    const bundle = createBundle(this.entrypoint);
    const codeDir = bundle.directory;

    // Package up code in azure expected format
    const outDir = `${codeDir}/${this.functionName}`;

    // Move index.js to function name directory. Every Azure function in a function app
    // must be in its own folder containing an index.js and function.json files
    fs.mkdirSync(`${codeDir}/${this.functionName}`);
    fs.renameSync(bundle.outfilePath, `${outDir}/index.js`);

    // As per documentation "a function must have exactly one trigger" so for now
    // by default a function will support http get requests
    // when we lift other resources like queues or topics this function.json will need to
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

    this.assetPath = asset.path;
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
    scopedResource: Construct,
    scopedRoleAssignment: ScopedRoleAssignment
  ) {
    const uniqueId = scopedResource.node.addr.substring(-8);
    const permissionsKey = `${uniqueId}_${scopedRoleAssignment.roleDefinitionName}`;
    // If the function has already been initialized attach the role assignment directly
    if (this.function) {
      if (this.permissions.has(permissionsKey)) {
        return; // already exists
      }

      new RoleAssignment(this, `RoleAssignment${permissionsKey}`, {
        scope: scopedRoleAssignment.scope,
        roleDefinitionName: scopedRoleAssignment.roleDefinitionName,
        principalId: this.function.identity.principalId,
      });
    }
    this.permissions.set(permissionsKey, scopedRoleAssignment);
  }

  protected _getCodeLines(handler: cloud.IFunctionHandler): string[] {
    const inflightClient = handler._toInflight();
    const lines = new Array<string>();

    lines.push('"use strict";');
    lines.push("module.exports = async function(context, req) {");
    lines.push(
      `  const body = await (${inflightClient}).handle(context.req.body ?? "");`
    );
    lines.push(`  context.res = { body };`);
    lines.push(`};`);

    return lines;
  }

  /** @internal */
  public get _liftMap(): LiftDepsMatrixRaw {
    return {
      [cloud.FunctionInflightMethods.INVOKE]: [],
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    //TODO: add permissions here when changing auth level: https://github.com/winglang/wing/issues/4497
    host.addEnvironment(this.envName(), this.function.name);

    super.onLift(host, ops);
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
