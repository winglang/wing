import { Construct } from "constructs";
import { App } from "./app";
import { StorageBucket } from "../.gen/providers/google/storage-bucket";
import { StorageBucketIamMember } from "../.gen/providers/google/storage-bucket-iam-member";
import { StorageBucketObject } from "../.gen/providers/google/storage-bucket-object";
import { Id } from "../.gen/providers/random/id";
import * as cloud from "../cloud";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../shared/resource-names";
import { IInflightHost } from "../std";
import { Function as GCPFunction } from "./function";

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

enum StorageBucketPermissions {
  READ = "roles/storage.objectViewer",
  READWRITE = "roles/storage.objectAdmin",
}

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

    this.bucket = new StorageBucket(this, "Default", {
      name: bucketName + "-" + randomId.hex,
      location: (App.of(this) as App).region,
      // recommended by GCP: https://cloud.google.com/storage/docs/uniform-bucket-level-access#should-you-use
      uniformBucketLevelAccess: true,
      publicAccessPrevention: props.public ? "inherited" : "enforced",
    });

    if (props.public) {
      // https://cloud.google.com/storage/docs/access-control/making-data-public#terraform
      new StorageBucketIamMember(this, "PublicAccessIamMember", {
        bucket: this.bucket.name,
        role: "roles/storage.objectViewer",
        member: "allUsers",
      });
    }
  }

  public addObject(key: string, body: string): void {
    new StorageBucketObject(this, `Object-${key}`, {
      bucket: this.bucket.id,
      name: key,
      content: body,
    });
  }

  public bind(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof GCPFunction)) {
      throw new Error("buckets can only be bound by tfgcp.Function for now");
    }

    if (ops.includes(cloud.BucketInflightMethods.GET) ||
      ops.includes(cloud.BucketInflightMethods.LIST) ||
      ops.includes(cloud.BucketInflightMethods.GET_JSON)) {
      host.addBucketPermission(this, StorageBucketPermissions.READ);
    }
    else if (ops.includes(cloud.BucketInflightMethods.DELETE) ||
      ops.includes(cloud.BucketInflightMethods.PUT) ||
      ops.includes(cloud.BucketInflightMethods.PUT_JSON)) {
      host.addBucketPermission(this, StorageBucketPermissions.READWRITE);
    }

    super.bind(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    throw new Error("Method not implemented.");
  }
}
