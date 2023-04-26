import { StorageAccount } from "@cdktf/provider-azurerm/lib/storage-account";
import { StorageBlob } from "@cdktf/provider-azurerm/lib/storage-blob";
import { StorageContainer } from "@cdktf/provider-azurerm/lib/storage-container";
import { Construct } from "constructs";
import { App } from "./app";
import { Function } from "./function";
import * as cloud from "../cloud";
import {
  BucketOnDeleteProps,
  BucketOnEventProps,
  BucketOnUpdateProps,
  BucketOnCreateProps,
  IBucketEventHandler,
} from "../cloud";
import * as core from "../core";
import { IInflightHost } from "../std";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../utils/resource-names";

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
      containerAccessType: this.public ? "public" : "private",
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
  public _bind(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("buckets can only be bound by tfazure.Function for now");
    }

    // TODO: investigate customized roles over builtin for finer grained access control
    if (
      ops.includes(cloud.BucketInflightMethods.DELETE) ||
      ops.includes(cloud.BucketInflightMethods.PUT) ||
      ops.includes(cloud.BucketInflightMethods.PUT_JSON)
    ) {
      host.addPermission(this, {
        scope: `${this.storageAccount.id}`,
        roleDefinitionName: StorageAccountPermissions.READ_WRITE,
      });
    } else if (
      ops.includes(cloud.BucketInflightMethods.GET) ||
      ops.includes(cloud.BucketInflightMethods.LIST) ||
      ops.includes(cloud.BucketInflightMethods.GET_JSON)
    ) {
      host.addPermission(this, {
        scope: `${this.storageAccount.id}`,
        roleDefinitionName: StorageAccountPermissions.READ,
      });
    }

    host.addEnvironment(this.envName(), this.storageContainer.name);
    host.addEnvironment(this.envStorageAccountName(), this.storageAccount.name);
    host.addEnvironment(this.isPublicEnvName(), `${this.public}`);
    super._bind(host, ops);
  }

  /**
   * Run an inflight whenever a file is uploaded to the bucket.
   */
  public onCreate(fn: IBucketEventHandler, opts?: BucketOnCreateProps): void {
    fn;
    opts;
    throw new Error(
      "on_create method isn't implemented yet on the current target."
    );
  }

  /**
   * Run an inflight whenever a file is deleted from the bucket.
   */
  public onDelete(fn: IBucketEventHandler, opts?: BucketOnDeleteProps): void {
    fn;
    opts;
    throw new Error(
      "on_delete method isn't implemented yet on the current target."
    );
  }

  /**
   * Run an inflight whenever a file is updated in the bucket.
   */
  public onUpdate(fn: IBucketEventHandler, opts?: BucketOnUpdateProps): void {
    fn;
    opts;
    throw new Error(
      "on_update method isn't implemented yet on the current target."
    );
  }

  /**
   * Run an inflight whenever a file is uploaded, modified, or deleted from the bucket.
   */
  public onEvent(fn: IBucketEventHandler, opts?: BucketOnEventProps): void {
    fn;
    opts;
    throw new Error(
      "on_event method isn't implemented yet on the current target."
    );
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(__dirname, __filename, "BucketClient", [
      `process.env["${this.envName()}"]`,
      `process.env["${this.envStorageAccountName()}"]`,
      `process.env["${this.isPublicEnvName()}"]`,
    ]);
  }
  private isPublicEnvName(): string {
    return `${this.envName()}_IS_PUBLIC`;
  }

  private envName(): string {
    return `BUCKET_NAME_${this.storageContainer.node.addr.slice(-8)}`;
  }

  private envStorageAccountName(): string {
    return `STORAGE_ACCOUNT_${this.storageContainer.node.addr.slice(-8)}`;
  }
}
