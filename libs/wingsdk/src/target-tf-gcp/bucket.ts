import { Construct } from "constructs";
import { App } from "./app";
import {
  ActionTypes,
  Function as GCPFunction,
  ResourceTypes,
} from "./function";
import { StorageBucket } from "../.gen/providers/google/storage-bucket";
import { StorageBucketIamMember } from "../.gen/providers/google/storage-bucket-iam-member";
import { StorageBucketObject } from "../.gen/providers/google/storage-bucket-object";
import { Id } from "../.gen/providers/random/id";
import * as cloud from "../cloud";
import { InflightClient } from "../core";
import { NotImplementedError } from "../core/errors";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../shared/resource-names";
import { IInflightHost } from "../std";

/**
 * Bucket names must be between 3 and 63 characters. We reserve 9 characters for
 * a random ID, so the maximum length is 54.
 *
 * You can use lowercase alphanumeric characters, dashes (-), underscores (_),
 * and dots (.). However, names containing dots require verification, so we
 * generate names without dots by default.
 *
 * We skip generating a hash since we need to append a random string to the
 * bucket name to make it globally unique.
 *
 * See: https://cloud.google.com/storage/docs/naming-buckets
 */
const BUCKET_NAME_OPTS: NameOptions = {
  maxLen: 54,
  case: CaseConventions.LOWERCASE,
  disallowedRegex: /([^a-z0-9_\-]+)/g,
  includeHash: false,
};

/**
 * GCP implementation of `cloud.Bucket`.
 *
 * @inflight `@winglang/sdk.cloud.IBucketClient`
 */
export class Bucket extends cloud.Bucket {
  public readonly bucket: StorageBucket;

  constructor(scope: Construct, id: string, props: cloud.BucketProps = {}) {
    super(scope, id, props);

    const bucketName = ResourceNames.generateName(this, BUCKET_NAME_OPTS);

    // GCP bucket names must be globally unique, but the Terraform resource
    // provider doesn't provide a mechanism like `bucketPrefix` as AWS does,
    // so we must generate a random string to append to the bucket name.
    //
    // The random string must be managed in Terraform state so that it doesn't
    // change on every subsequent compile or deployment.
    const randomId = new Id(this, "Id", {
      byteLength: 4, // 4 bytes = 8 hex characters
    });

    const isTestEnvironment = App.of(scope).isTestEnvironment;

    this.bucket = new StorageBucket(this, "Default", {
      name: bucketName + "-" + randomId.hex,
      location: (App.of(this) as App).region,
      // recommended by GCP: https://cloud.google.com/storage/docs/uniform-bucket-level-access#should-you-use
      uniformBucketLevelAccess: true,
      publicAccessPrevention: props.public ? "inherited" : "enforced",
      forceDestroy: !!isTestEnvironment,
    });

    if (props.public) {
      // https://cloud.google.com/storage/docs/access-control/making-data-public#terraform
      new StorageBucketIamMember(this, "PublicAccessIamMember", {
        bucket: this.bucket.name,
        role: ActionTypes.STORAGE_READ,
        member: "allUsers",
      });
    }
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [
      cloud.BucketInflightMethods.DELETE,
      cloud.BucketInflightMethods.GET,
      cloud.BucketInflightMethods.GET_JSON,
      cloud.BucketInflightMethods.LIST,
      cloud.BucketInflightMethods.PUT,
      cloud.BucketInflightMethods.PUT_JSON,
      cloud.BucketInflightMethods.PUBLIC_URL,
      cloud.BucketInflightMethods.EXISTS,
      cloud.BucketInflightMethods.TRY_GET,
      cloud.BucketInflightMethods.TRY_GET_JSON,
      cloud.BucketInflightMethods.TRY_DELETE,
    ];
  }

  public addObject(key: string, body: string): void {
    new StorageBucketObject(this, `Object-${key}`, {
      bucket: this.bucket.id,
      name: key,
      content: body,
    });
  }

  /**
   * Run an inflight whenever a file is uploaded to the bucket.
   */
  public onCreate(
    fn: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnCreateProps
  ): void {
    fn;
    opts;
    throw new NotImplementedError(
      "onCreate method isn't implemented yet on the current target."
    );
  }

  /**
   * Run an inflight whenever a file is deleted from the bucket.
   */
  public onDelete(
    fn: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnDeleteProps
  ): void {
    fn;
    opts;
    throw new NotImplementedError(
      "onDelete method isn't implemented yet on the current target."
    );
  }

  /**
   * Run an inflight whenever a file is updated in the bucket.
   */
  public onUpdate(
    fn: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnUpdateProps
  ): void {
    fn;
    opts;
    throw new NotImplementedError(
      "onUpdate method isn't implemented yet on the current target."
    );
  }

  /**
   * Run an inflight whenever a file is uploaded, modified, or deleted from the bucket.
   */
  public onEvent(
    fn: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnEventProps
  ): void {
    fn;
    opts;
    throw new NotImplementedError(
      "onEvent method isn't implemented yet on the current target."
    );
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof GCPFunction)) {
      throw new Error("buckets can only be bound by tfgcp.Function for now");
    }
    if (
      ops.includes(cloud.BucketInflightMethods.GET) ||
      ops.includes(cloud.BucketInflightMethods.GET_JSON) ||
      ops.includes(cloud.BucketInflightMethods.LIST) ||
      ops.includes(cloud.BucketInflightMethods.EXISTS) ||
      ops.includes(cloud.BucketInflightMethods.PUBLIC_URL) ||
      // ops.includes(cloud.BucketInflightMethods.SIGNED_URL) ||
      ops.includes(cloud.BucketInflightMethods.TRY_GET) ||
      ops.includes(cloud.BucketInflightMethods.TRY_GET_JSON)
    ) {
      host.addPermission(this, {
        Action: ActionTypes.STORAGE_READ,
        Resource: ResourceTypes.BUCKET,
      });
    } else if (
      ops.includes(cloud.BucketInflightMethods.DELETE) ||
      ops.includes(cloud.BucketInflightMethods.PUT) ||
      ops.includes(cloud.BucketInflightMethods.PUT_JSON) ||
      ops.includes(cloud.BucketInflightMethods.TRY_DELETE)
    ) {
      host.addPermission(this, {
        Action: ActionTypes.STORAGE_READ_WRITE,
        Resource: ResourceTypes.BUCKET,
      });
    }
    host.addEnvironment(this.envName(), this.bucket.name);

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return InflightClient.for(
      __dirname.replace("target-tf-gcp", "shared-gcp"),
      __filename,
      "BucketClient",
      [`process.env["${this.envName()}"]`]
    );
  }

  private envName(): string {
    return `BUCKET_NAME_${this.node.addr.slice(-8)}`;
  }
}

export const addBucketPermission = (
  scopedConstruct: Construct,
  bucket: Bucket,
  permission: ActionTypes,
  projectId: string
) => {
  try {
    const permissionId = `RoleAssignment-${permission.replace(
      /[.\\\/]/g,
      "-"
    )}-${bucket.node.addr.slice(-8)}-${scopedConstruct.node.addr.slice(-8)}`;

    if (permission === ActionTypes.STORAGE_READ) {
      new StorageBucketIamMember(bucket, permissionId, {
        bucket: bucket.bucket.name,
        role: permission,
        member: `projectViewer:${projectId}`,
      });
    } else if (permission === ActionTypes.STORAGE_READ_WRITE) {
      new StorageBucketIamMember(bucket, permissionId, {
        bucket: bucket.bucket.name,
        role: permission,
        member: `projectEditor:${projectId}`,
      });
    } else {
      throw new Error("Unsupported permission");
    }
  } catch (e) {
    throw new Error(`Failed to add permission to bucket: ${e}`);
  }
};
