import { StorageAccount } from "@cdktf/provider-azurerm/lib/storage-account";
import { StorageBlob } from "@cdktf/provider-azurerm/lib/storage-blob";
import { StorageContainer } from "@cdktf/provider-azurerm/lib/storage-container";
import { Construct } from "constructs";
import { App } from "./app";
import { Function } from "./function";
import * as cloud from "../cloud";
import * as core from "../core";
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
 * Azure implementation of `cloud.Bucket`.
 *
 * @inflight `@winglang/sdk.cloud.IBucketClient`
 */
export class Bucket extends cloud.BucketBase {
  /** Storage container */
  public readonly storageContainer: StorageContainer;
  private readonly public: boolean;
  private readonly storageAccount: StorageAccount;
  private app: App;

  constructor(scope: Construct, id: string, props: cloud.BucketProps = {}) {
    super(scope, id, props);

    this.public = props.public ?? false;

    this.app = App.of(this);
    this.storageAccount = this.app.storageAccount;

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
  public _bind(host: core.IInflightHost, ops: string[]): void {
    host;
    ops;
    if (!(host instanceof Function)) {
      throw new Error("buckets can only be bound by tfazure.Function for now");
    }

    // TODO: investigate customized roles over builtin for finer grained access control
    if (
      ops.includes(cloud.BucketInflightMethods.DELETE) ||
      ops.includes(cloud.BucketInflightMethods.PUT)
    ) {
      // "Storage Blob Data Contributor" Allows for read, write and delete access to Azure Storage blob containers and data
      host.addPermission(
        `${this.storageAccount.id}`,
        "Storage Blob Data Contributor"
      );
    } else if (
      ops.includes(cloud.BucketInflightMethods.GET) ||
      ops.includes(cloud.BucketInflightMethods.LIST)
    ) {
      // "Storage Blob Data Reader" Allows for read access to Azure Storage blob containers and data
      host.addPermission(
        `${this.storageAccount.id}`,
        "Storage Blob Data Reader"
      );
    }

    host.addEnvironment(this.envName(), this.storageContainer.name);
    host.addEnvironment(this.envStorageAccountName(), this.storageAccount.name);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(__filename, "BucketClient", [
      `process.env["${this.envName()}"]`,
      `process.env["${this.envStorageAccountName()}"]`,
    ]);
  }

  private envName(): string {
    return `BUCKET_NAME`;
  }

  private envStorageAccountName(): string {
    return `STORAGE_ACCOUNT`;
  }
}

Bucket._annotateInflight("put", {});
Bucket._annotateInflight("get", {});
Bucket._annotateInflight("delete", {});
Bucket._annotateInflight("list", {});
