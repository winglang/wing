import { writeFileSync } from "fs";
import { join, basename } from "path";
import { AssetType, Lazy, TerraformAsset, Fn } from "cdktf";
import { Construct } from "constructs";
import { App } from "./app";
import { Bucket } from "./bucket";
import { core } from "..";
import { CloudfunctionsFunction } from "../.gen/providers/google/cloudfunctions-function";
import { CloudfunctionsFunctionIamMember } from "../.gen/providers/google/cloudfunctions-function-iam-member";
import { ProjectIamCustomRole } from "../.gen/providers/google/project-iam-custom-role";
import { ProjectIamMember } from "../.gen/providers/google/project-iam-member";
import { ServiceAccount } from "../.gen/providers/google/service-account";
import { StorageBucketObject } from "../.gen/providers/google/storage-bucket-object";
import * as cloud from "../cloud";
import { LiftMap } from "../core";
import { NotImplementedError } from "../core/errors";
import { createBundle } from "../shared/bundling";
import { DEFAULT_MEMORY_SIZE } from "../shared/function";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../shared/resource-names";
import { IInflightHost } from "../std";

const FUNCTION_NAME_OPTS: NameOptions = {
  maxLen: 28,
  disallowedRegex: /[^a-z0-9]+/g,
  case: CaseConventions.LOWERCASE,
};

/**
 * Interface for GCP Cloud Function
 */
export interface IGcpFunction {
  /**
   * GCP Function Name
   */
  readonly name: string;
  /**
   * GCP HTTPS Trigger URL
   */
  readonly httpsTriggerUrl: string;
}

/**
 * GCP implementation of `cloud.Function`.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 */
export class Function extends cloud.Function {
  /**
   * Attempts to cast an IInflightHost to an IGcpFunction if it is one.
   * @param host The IInflightHost instance to check and cast.
   * @returns An IGcpFunction if the host is a GCP function, undefined otherwise.
   */
  public static from(host: IInflightHost): IGcpFunction | undefined {
    if (this.isGcpFunction(host)) {
      return host;
    }
    return undefined;
  }

  /**
   * Checks if the given object is an instance of IGcpFunction.
   * @param obj The object to check.
   * @returns true if the object is an IGcpFunction, false otherwise.
   */
  private static isGcpFunction(obj: any): obj is IGcpFunction {
    return (
      typeof obj.name === "string" && typeof obj.httpsTriggerUrl === "string"
    );
  }

  private readonly function: CloudfunctionsFunction;
  private readonly functionServiceAccount: ServiceAccount;
  private readonly functionCustomRole: ProjectIamCustomRole;
  private readonly permissions: Set<string> = new Set([
    "cloudfunctions.functions.get",
  ]);

  private assetPath: string | undefined; // posix path

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps = {}
  ) {
    super(scope, id, inflight, props);

    // app is a property of the `cloud.Function` class
    const app = App.of(this) as App;

    if (props.concurrency != null) {
      throw new NotImplementedError(
        "Function concurrency isn't implemented yet on the current target."
      );
    }

    // memory limits must be between 128 and 8192 MB
    if (props?.memory && (props.memory < 128 || props.memory > 8192)) {
      throw new Error(
        "Memory must be between 128 and 8192 MB for GCP Cloud Functions"
      );
    }

    // timeout must be between 1 and 540 seconds
    if (
      props?.timeout &&
      (props.timeout.seconds < 1 || props.timeout.seconds > 540)
    ) {
      throw new Error(
        "Timeout must be between 1 and 540 seconds for GCP Cloud Functions"
      );
    }

    // create a bucket to store the function executable
    const FunctionBucket = new Bucket(this, "FunctionBucket");

    // put the executable in the bucket as an object
    const FunctionObjectBucket = new StorageBucketObject(
      this,
      "FunctionObjectBucket",
      {
        name: "objects",
        bucket: FunctionBucket.bucket.name,
        source: Lazy.stringValue({
          produce: () => {
            if (!this.assetPath) {
              throw new Error("assetPath was not set");
            }
            return this.assetPath;
          },
        }),
      }
    );

    // Step 1: Create Custom Service Account
    this.functionServiceAccount = new ServiceAccount(
      this,
      `ServiceAccount${this.node.addr.substring(-8)}`,
      {
        accountId: ResourceNames.generateName(this, FUNCTION_NAME_OPTS),
        displayName: `Custom Service Account for Cloud Function ${this.node.addr.substring(
          -8
        )}`,
      }
    );
    // Step 2: Create Custom Role
    this.functionCustomRole = new ProjectIamCustomRole(
      this,
      `CustomRole${this.node.addr.substring(-8)}`,
      {
        roleId: `cloudfunctions.custom${this.node.addr.substring(-8)}`,
        title: `Custom Role for Cloud Function ${this.node.addr.substring(-8)}`,
        permissions: Lazy.listValue({
          produce: () => Array.from(this.permissions),
        }),
      }
    );
    // Step 3: Grant Custom Role to Custom Service Account on the Project
    new ProjectIamMember(this, "ProjectIamMember", {
      project: app.projectId,
      role: `projects/${app.projectId}/roles/${this.functionCustomRole.roleId}`,
      member: `serviceAccount:${this.functionServiceAccount.email}`,
    });
    // Step 4: Create the Cloud Function with Custom Service Account
    this.function = new CloudfunctionsFunction(this, "DefaultFunction", {
      name: ResourceNames.generateName(this, FUNCTION_NAME_OPTS),
      description: "This function was created by Wing",
      project: app.projectId,
      region: app.region,
      runtime: "nodejs20",
      availableMemoryMb: props.memory ?? DEFAULT_MEMORY_SIZE,
      sourceArchiveBucket: FunctionBucket.bucket.name,
      sourceArchiveObject: FunctionObjectBucket.name,
      entryPoint: "handler",
      triggerHttp: true,
      httpsTriggerSecurityLevel: "SECURE_ALWAYS",
      // It takes around 1 minutes to the function invocation permissions to be established -
      // therefore, the timeout is higher than in other targets
      timeout: props.timeout?.seconds ?? 120,
      serviceAccountEmail: this.functionServiceAccount.email,
      environmentVariables: Lazy.anyValue({
        produce: () => this.env ?? {},
      }) as any,
    });
  }

  /**
   * @internal
   * @param handler IFunctionHandler
   * @returns the function code lines as strings
   */
  protected _getCodeLines(handler: cloud.IFunctionHandler): string[] {
    const inflightClient = handler._toInflight();
    const lines = new Array<string>();

    lines.push('"use strict";');

    inflightClient;
    lines.push(
      "const functions = require('@google-cloud/functions-framework');\n"
    );
    lines.push(`functions.http('handler', async (req, res) => {`);
    lines.push("  res.set('Access-Control-Allow-Origin', '*')");
    lines.push("  res.set('Access-Control-Allow-Methods', 'GET, POST')");

    lines.push("  try {");
    lines.push(`
      const result = await (${inflightClient}).handle(req.body || undefined)`);
    lines.push(`  res.send(result);`);
    lines.push(`  } catch (error) {`);
    lines.push(`  res.status(500).send(error.message);`);
    lines.push("}});");

    return lines;
  }

  /** @internal */
  public _preSynthesize(): void {
    super._preSynthesize();

    // bundled code is guaranteed to be in a fresh directory
    const bundle = createBundle(this.entrypoint, [
      "@google-cloud/functions-framework",
      "@google-cloud/datastore",
    ]);

    const packageJson = join(bundle.directory, "package.json");

    writeFileSync(
      packageJson,
      JSON.stringify(
        {
          main: basename(bundle.outfilePath),
          dependencies: {
            "@google-cloud/functions-framework": "^3.0.0",
            "@google-cloud/datastore": "8.4.0",
          },
        },
        null,
        2
      )
    );

    const asset = new TerraformAsset(this, "Asset", {
      path: bundle.directory,
      type: AssetType.ARCHIVE,
    });

    this.assetPath = asset.path;
  }

  public get functionName(): string {
    return this.function.name;
  }

  public get serviceAccountEmail(): string {
    return this.function.serviceAccountEmail;
  }

  public get project(): string {
    return this.function.project;
  }

  public get region(): string {
    return this.function.region;
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.FunctionInflightMethods.INVOKE]: [[this.handler, ["handle"]]],
    };
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-gcp", "shared-gcp"),
      __filename,
      "FunctionClient",
      [
        `process.env["${this.envName()}"]`,
        `process.env["${this.projectEnv()}"]`,
        `process.env["${this.regionEnv()}"]`,
      ]
    );
  }

  public addPermissions(permissions: string[]): void {
    permissions.forEach((permission) => {
      this.permissions.add(permission);
    });
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error(
        "tfgcp.Function can only be bound by tfgcp.Function for now"
      );
    }

    if (ops.includes(cloud.FunctionInflightMethods.INVOKE)) {
      host.addPermissions(["cloudfunctions.functions.invoke"]);
    }

    const { region, projectId } = App.of(this) as App;
    host.addEnvironment(this.envName(), this.function.name);
    host.addEnvironment(this.projectEnv(), projectId);
    host.addEnvironment(this.regionEnv(), region);

    super.onLift(host, ops);
  }

  /**
   * Grants the given service account permission to invoke this function.
   * @param serviceAccount The service account to grant invoke permissions to.
   * @internal
   */
  public _addPermissionToInvoke(serviceAccount: ServiceAccount): void {
    const hash = Fn.sha256(serviceAccount.email).slice(-8);

    new CloudfunctionsFunctionIamMember(this, `invoker-permission-${hash}`, {
      project: this.function.project,
      region: this.function.region,
      cloudFunction: this.function.name,
      role: "roles/cloudfunctions.invoker",
      member: `serviceAccount:${serviceAccount.email}`,
    });
  }

  /** @internal */
  public _getHttpsTriggerUrl(): string {
    return this.function.httpsTriggerUrl;
  }

  private envName(): string {
    return `FUNCTION_NAME_${this.node.addr.slice(-8)}`;
  }

  private regionEnv(): string {
    return `REGION_${this.node.addr.slice(-8)}`;
  }

  private projectEnv(): string {
    return `PROJECT_${this.node.addr.slice(-8)}`;
  }
}
