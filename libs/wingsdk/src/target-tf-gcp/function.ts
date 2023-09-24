import { resolve } from "path";
import { AssetType, TerraformAsset } from "cdktf";
import { Construct } from "constructs";
import { App } from "./app";
import { Bucket } from "./bucket";
import { CloudfunctionsFunction } from "../.gen/providers/google/cloudfunctions-function";
import { StorageBucketObject } from "../.gen/providers/google/storage-bucket-object";
import * as cloud from "../cloud";
import { createBundle } from "../shared/bundling";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../shared/resource-names";
import { IInflightHost } from "../std";

const FUNCTION_NAME_OPTS: NameOptions = {
  maxLen: 32,
  disallowedRegex: /[^a-z0-9]+/g,
  case: CaseConventions.LOWERCASE,
};

/**
 * GCP implementation of `cloud.Function`.
 *
 * @inflight `@winglang/wingsdk.cloud.IFunctionClient`
 */

export class Function extends cloud.Function {
  private readonly function: CloudfunctionsFunction;

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
      environmentVariables: props.env ?? {},
    });
  }

  public get functionName(): string {
    return this.function.name;
  }

  // TODO: implement with https://github.com/winglang/wing/issues/1282
  public _toInflight(): string {
    throw new Error(
      "cloud.Function cannot be used as an Inflight resource on GCP yet"
    );
  }

  public bind(_host: IInflightHost, _ops: string[]): void {
    throw new Error("Method not implemented.");
  }
}
