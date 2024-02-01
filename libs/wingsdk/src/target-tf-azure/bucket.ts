import { Construct } from "constructs";
import { App } from "./app";
import { Function } from "./function";
import { StorageAccount } from "../.gen/providers/azurerm/storage-account";
import { StorageBlob } from "../.gen/providers/azurerm/storage-blob";
import { StorageContainer } from "../.gen/providers/azurerm/storage-container";
import * as cloud from "../cloud";
import {
  BucketOnDeleteOptions,
  BucketOnEventOptions,
  BucketOnUpdateOptions,
  BucketOnCreateOptions,
  IBucketEventHandler,
} from "../cloud";
import * as core from "../core";
import { NotImplementedError } from "../core/errors";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../shared/resource-names";
import { IInflightHost } from "../std";

/**
 * Bucket names must be between 3 and 63 characters.
 *
 * You can use lowercase alphanumeric characters, dash (-)
 * and two or more consecutive dash characters aren't permitted.
 */
const BUCKET_NAME_OPTS: NameOptions = {
  maxLen: 63,
  case: CaseConventions.LOWERCASE,
  disallowedRegex: /([^a-z0-9\-]+)|(\-{2,})/g,
};

/**
 * Azure bult-in storage account permissions.
 */
export enum StorageAccountPermissions {
  /** Read only permission */
  READ = "Storage Blob Data Reader",
  /** Read write permission */
  READ_WRITE = "Storage Blob Data Contributor",
}

/**
 * Azure implementation of `cloud.Bucket`.
 *
 * @inflight `@winglang/sdk.cloud.IBucketClient`
 */
export class Bucket extends cloud.Bucket {
  /** Storage container */
  public readonly storageContainer: StorageContainer;
  private readonly public: boolean;
  private readonly storageAccount: StorageAccount;

  constructor(scope: Construct, id: string, props: cloud.BucketProps = {}) {
    super(scope, id, props);

    this.public = props.public ?? false;

    const app = App.of(this) as App;
    this.storageAccount = app.storageAccount;

    const storageContainerName = ResourceNames.generateName(
      this,
      BUCKET_NAME_OPTS
    );

    // name must begin and end with alphanumeric character
    if (storageContainerName.match(/(^\W{1,})|(\W{1,}$)/g)?.length) {
      throw new Error(
        "Bucket names must begin and end with alphanumeric character."
      );
    }

    this.storageContainer = new StorageContainer(this, "Bucket", {
      name: storageContainerName,
      storageAccountName: this.storageAccount.name,
      containerAccessType: this.public ? "blob" : "private",
    });
  }

  public addObject(key: string, body: string): void {
    // Blob naming conventions:
    // https://learn.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata#blob-names
    const blobName = key
      .split("/")
      .map((s) => encodeURIComponent(s))
      .join("/");

    new StorageBlob(this, `Blob-${key}`, {
      name: blobName,
      storageAccountName: this.storageAccount.name,
      storageContainerName: this.storageContainer.name,
      type: "Block",
      sourceContent: body,
    });
  }

  /** @internal */
  public _supportedOps(): string[] {
    // TODO: After fixing the tests we realized that nothing is working-https://github.com/winglang/wing/issues/5123
    return [];
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("buckets can only be bound by tfazure.Function for now");
    }

    // TODO: investigate customized roles over builtin for finer grained access control: https://github.com/winglang/wing/issues/5598
    if (
      ops.includes(cloud.BucketInflightMethods.DELETE) ||
      ops.includes(cloud.BucketInflightMethods.TRY_DELETE) ||
      ops.includes(cloud.BucketInflightMethods.PUT) ||
      ops.includes(cloud.BucketInflightMethods.PUT_JSON)
    ) {
      host.addPermission(this.storageAccount, {
        scope: this.storageAccount.id,
        roleDefinitionName: StorageAccountPermissions.READ_WRITE,
      });
    } else if (
      ops.includes(cloud.BucketInflightMethods.GET) ||
      ops.includes(cloud.BucketInflightMethods.LIST) ||
      ops.includes(cloud.BucketInflightMethods.GET_JSON) ||
      ops.includes(cloud.BucketInflightMethods.PUBLIC_URL) ||
      ops.includes(cloud.BucketInflightMethods.TRY_GET) ||
      ops.includes(cloud.BucketInflightMethods.TRY_GET_JSON) ||
      ops.includes(cloud.BucketInflightMethods.EXISTS)
    ) {
      host.addPermission(this.storageAccount, {
        scope: this.storageAccount.id,
        roleDefinitionName: StorageAccountPermissions.READ,
      });
    }

    host.addEnvironment(this.envName(), this.storageContainer.name);
    host.addEnvironment(this.envStorageAccountName(), this.storageAccount.name);
    super.onLift(host, ops);
  }

  /**
   * Run an inflight whenever a file is uploaded to the bucket.
   */
  public onCreate(fn: IBucketEventHandler, opts?: BucketOnCreateOptions): void {
    fn;
    opts;
    throw new NotImplementedError(
      "onCreate method isn't implemented yet on the current target.",
      {
        issue: "https://github.com/winglang/wing/issues/1954",
        resource: this.constructor.name,
        operation: cloud.BucketEventType.CREATE,
      }
    );
  }

  /**
   * Run an inflight whenever a file is deleted from the bucket.
   */
  public onDelete(fn: IBucketEventHandler, opts?: BucketOnDeleteOptions): void {
    fn;
    opts;
    throw new NotImplementedError(
      "onDelete method isn't implemented yet on the current target.",
      {
        issue: "https://github.com/winglang/wing/issues/1954",
        resource: this.constructor.name,
        operation: cloud.BucketEventType.DELETE,
      }
    );
  }

  /**
   * Run an inflight whenever a file is updated in the bucket.
   */
  public onUpdate(fn: IBucketEventHandler, opts?: BucketOnUpdateOptions): void {
    fn;
    opts;
    throw new NotImplementedError(
      "onUpdate method isn't implemented yet on the current target.",
      {
        issue: "https://github.com/winglang/wing/issues/1954",
        resource: this.constructor.name,
        operation: cloud.BucketEventType.UPDATE,
      }
    );
  }

  /**
   * Run an inflight whenever a file is uploaded, modified, or deleted from the bucket.
   */
  public onEvent(fn: IBucketEventHandler, opts?: BucketOnEventOptions): void {
    fn;
    opts;
    throw new NotImplementedError(
      "onEvent method isn't implemented yet on the current target.",
      {
        issue: "https://github.com/winglang/wing/issues/1954",
        resource: this.constructor.name,
        operation: "onEvent",
      }
    );
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-azure", "shared-azure"),
      __filename,
      "BucketClient",
      [
        `process.env["${this.envName()}"]`,
        `process.env["${this.envStorageAccountName()}"]`,
      ]
    );
  }

  private envName(): string {
    return `BUCKET_NAME_${this.storageContainer.node.addr.slice(-8)}`;
  }

  private envStorageAccountName(): string {
    return `STORAGE_ACCOUNT_${this.storageContainer.node.addr.slice(-8)}`;
  }
}
