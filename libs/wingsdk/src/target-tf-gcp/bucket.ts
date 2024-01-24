import { Construct } from "constructs";
import { App } from "./app";
import { Function as GCPFunction } from "./function";
import { calculateBucketPermissions } from "./permissions";
import { ProjectService } from "../.gen/providers/google/project-service";
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

    // Enable `IAM Service Account Credentials API` for the project
    // This is disabled by default, but required for generating presigned URLs
    const iamServiceAccountCredentialsApi = new ProjectService(
      this,
      "IamServiceAccountCredentialsApi",
      {
        service: "iamcredentials.googleapis.com",
        disableDependentServices: false,
        disableOnDestroy: false,
      }
    );

    this.bucket = new StorageBucket(this, "Default", {
      name: bucketName + "-" + randomId.hex,
      location: (App.of(this) as App).region,
      // recommended by GCP: https://cloud.google.com/storage/docs/uniform-bucket-level-access#should-you-use
      uniformBucketLevelAccess: true,
      publicAccessPrevention: props.public ? "inherited" : "enforced",
      forceDestroy: !!isTestEnvironment,
      dependsOn: [iamServiceAccountCredentialsApi],
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
      cloud.BucketInflightMethods.METADATA,
      cloud.BucketInflightMethods.COPY,
      cloud.BucketInflightMethods.RENAME,
      cloud.BucketInflightMethods.SIGNED_URL,
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
    opts?: cloud.BucketOnCreateOptions
  ): void {
    fn;
    opts;
    throw new NotImplementedError(
      "onCreate method isn't implemented yet on the current target.",
      {
        resource: this.constructor.name,
        operation: cloud.BucketEventType.CREATE,
      }
    );
  }

  /**
   * Run an inflight whenever a file is deleted from the bucket.
   */
  public onDelete(
    fn: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnDeleteOptions
  ): void {
    fn;
    opts;
    throw new NotImplementedError(
      "onDelete method isn't implemented yet on the current target.",
      {
        resource: this.constructor.name,
        operation: cloud.BucketEventType.DELETE,
      }
    );
  }

  /**
   * Run an inflight whenever a file is updated in the bucket.
   */
  public onUpdate(
    fn: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnUpdateOptions
  ): void {
    fn;
    opts;
    throw new NotImplementedError(
      "onUpdate method isn't implemented yet on the current target.",
      {
        resource: this.constructor.name,
        operation: cloud.BucketEventType.UPDATE,
      }
    );
  }

  /**
   * Run an inflight whenever a file is uploaded, modified, or deleted from the bucket.
   */
  public onEvent(
    fn: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnEventOptions
  ): void {
    fn;
    opts;
    throw new NotImplementedError(
      "onEvent method isn't implemented yet on the current target.",
      { resource: this.constructor.name, operation: "onEvent" }
    );
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof GCPFunction)) {
      throw new Error("buckets can only be bound by tfgcp.Function for now");
    }

    const permissions = calculateBucketPermissions(ops);
    host.addPermissions(permissions);

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
