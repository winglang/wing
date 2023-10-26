import { resolve } from "path";
import { AssetType, Lazy, TerraformAsset } from "cdktf";
import { Construct } from "constructs";
import { App } from "./app";
import { Bucket, addBucketPermission } from "./bucket";
import { CloudfunctionsFunction } from "../.gen/providers/google/cloudfunctions-function";
import { StorageBucketObject } from "../.gen/providers/google/storage-bucket-object";
import * as cloud from "../cloud";
import { NotImplementedError } from "../core/errors";
import { createBundle } from "../shared/bundling";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../shared/resource-names";
import { IInflightHost, IResource } from "../std";

const FUNCTION_NAME_OPTS: NameOptions = {
  maxLen: 32,
  disallowedRegex: /[^a-z0-9]+/g,
  case: CaseConventions.LOWERCASE,
};

export enum ResourceTypes {
  BUCKET = "Bucket",
  FUNCTION = "Function",
}

export enum ActionTypes {
  STORAGE_READ = "roles/storage.objectViewer",
  STORAGE_READ_WRITE = "roles/storage.objectUser",
  FUNCTION_INVOKER = "roles/cloudfunctions.invoker",
  FUNCTION_VIEWER = "roles/cloudfunctions.viewer",
}

interface IFunctionPermissions {
  Action: ActionTypes;
  Resource: ResourceTypes;
}

/**
 * GCP implementation of `cloud.Function`.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 */

export class Function extends cloud.Function {
  private readonly function: CloudfunctionsFunction;
  private permissions: Map<string, Set<IFunctionPermissions>> = new Map();

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps = {}
  ) {
    super(scope, id, inflight, props);

    // app is a property of the `cloud.Function` class
    const app = App.of(this) as App;

    // bundled code is guaranteed to be in a fresh directory
    const bundle = createBundle(this.entrypoint);

    // Create Cloud Function executable
    const asset = new TerraformAsset(this, "Asset", {
      path: resolve(bundle.directory),
      type: AssetType.ARCHIVE,
    });

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
        source: asset.path,
      }
    );

    // create the cloud function
    this.function = new CloudfunctionsFunction(this, "DefaultFunction", {
      name: ResourceNames.generateName(this, FUNCTION_NAME_OPTS),
      description: "This function was created by Wing",
      project: app.projectId,
      region: app.region,
      runtime: "nodejs16",
      availableMemoryMb: props.memory ?? 128,
      sourceArchiveBucket: FunctionBucket.bucket.name,
      sourceArchiveObject: FunctionObjectBucket.name,
      entryPoint: "handler",
      triggerHttp: true,
      timeout: props.timeout?.seconds ?? 60,
      environmentVariables: Lazy.anyValue({
        produce: () => this.env ?? {},
      }) as any,
    });
  }

  public get functionName(): string {
    return this.function.name;
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [];
  }

  // TODO: implement with https://github.com/winglang/wing/issues/4403
  public _toInflight(): string {
    throw new Error(
      "cloud.Function cannot be used as an Inflight resource on GCP yet"
    );
  }

  public addPermission(
    scopedResource: IResource,
    permissions: IFunctionPermissions
  ): void {
    const uniqueId = scopedResource.node.addr.substring(-8);

    if (
      this.permissions.has(uniqueId) &&
      this.permissions.get(uniqueId)?.has(permissions)
    ) {
      return; // already exists
    }
    const app = App.of(this) as App;
    // TODO: add support for other resource types
    switch (permissions.Resource) {
      case ResourceTypes.BUCKET:
        addBucketPermission(
          this,
          scopedResource as Bucket,
          permissions.Action,
          app.projectId
        );
        break;
      case ResourceTypes.FUNCTION:
        throw new NotImplementedError(
          "Function permissions not implemented yet"
        );
      default:
        throw new Error(`Unsupported resource type ${permissions.Resource}`);
    }
    const roleDefinitions = this.permissions.get(uniqueId) ?? new Set();
    roleDefinitions.add(permissions);
    this.permissions.set(uniqueId, roleDefinitions);
  }

  public onLift(_host: IInflightHost, _ops: string[]): void {
    throw new Error("Method not implemented.");
  }
}
