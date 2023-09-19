import { resolve } from "path";
import { AssetType, TerraformAsset } from "cdktf";
import { Construct } from "constructs";
import { App } from "./app";
import { CloudfunctionsFunction } from "../.gen/providers/google/cloudfunctions-function";
import { CloudfunctionsFunctionIamMember } from "../.gen/providers/google/cloudfunctions-function-iam-member";
import { StorageBucket } from "../.gen/providers/google/storage-bucket";
import { StorageBucketObject } from "../.gen/providers/google/storage-bucket-object";
import { Id } from "../.gen/providers/random/id";
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

const BUCKET_NAME_OPTS: NameOptions = {
  maxLen: 54,
  case: CaseConventions.LOWERCASE,
  disallowedRegex: /([^a-z0-9_\-]+)/g,
  includeHash: false,
};
/**
 * GCP implementation of `cloud.Function`.
 *
 * @inflight `@winglang/wingsdk.cloud.IFunctionClient`
 */

export class Function extends cloud.Function {
  private readonly function: CloudfunctionsFunction;
  private readonly bucket: StorageBucket;
  private readonly bucketObject: StorageBucketObject;

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

    // create a bucket with unique name
    const bucketName = ResourceNames.generateName(this, BUCKET_NAME_OPTS);
    // GCP bucket names must be globally unique, but the Terraform resource
    // provider doesn't provide a mechanism like `bucketPrefix` as AWS does,
    // so we must generate a random string to append to the bucket name.

    // The random string must be managed in Terraform state so that it doesn't
    // change on every subsequent compile or deployment.
    const randomId = new Id(this, "Id", {
      byteLength: 4, // 4 bytes = 8 hex characters
    });

    // create the bucket
    this.bucket = new StorageBucket(this, "Function_Bucket", {
      name: bucketName + "-" + randomId.hex,
      location: app.storageLocation,
    });

    // put the executable in the bucket as an object
    this.bucketObject = new StorageBucketObject(
      this,
      "Function_Object_Bucket",
      {
        name: "objects",
        bucket: this.bucket.name,
        source: asset.path,
      }
    );

    // create the cloud function
    this.function = new CloudfunctionsFunction(this, "Default_Function", {
      name: ResourceNames.generateName(this, FUNCTION_NAME_OPTS),
      description: "This function was created by Wing",
      runtime: "nodejs16",
      availableMemoryMb: props.memory ?? 128,
      sourceArchiveBucket: this.bucket.name,
      sourceArchiveObject: this.bucketObject.name,
      entryPoint: "handler",
      triggerHttp: true,
      timeout: props.timeout?.seconds ?? 60,
      environmentVariables: props.env ?? {},
    });

    // create the permissions
    new CloudfunctionsFunctionIamMember(this, "Function_IAM_Member", {
      project: app.projectId,
      region: app.storageLocation,
      cloudFunction: this.function.name,
      role: "roles/cloudfunctions.invoker",
      member: "allUsers",
    });
  }

  // TODO: implement
  public _toInflight(): string {
    throw new Error("cloud.Function cannot be used as an Inflight resource on GCP yet");
  }


  public bind(_host: IInflightHost, _ops: string[]): void {
    throw new Error("Method not implemented.");
  }
}
