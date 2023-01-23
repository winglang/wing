import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { StorageAccount } from "@cdktf/provider-azurerm/lib/storage-account";
import { StorageBlob } from "@cdktf/provider-azurerm/lib/storage-blob";
import { StorageContainer } from "@cdktf/provider-azurerm/lib/storage-container";
import { Construct } from "constructs";
import { App } from "./app";
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
  private readonly storageContainer: StorageContainer;
  private readonly public: boolean;

  constructor(scope: Construct, id: string, props: cloud.BucketProps) {
    super(scope, id, props);

    this.public = props.public ?? false;

    const app = App.of(this);

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
      storageAccountName: app.storageAccount.name,
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
    // TODO: support functions once tfazure functions are implemented
    throw new Error("Azure buckets have can not be bound by anything for now");
  }

  /** @internal */
  public _toInflight(): core.Code {
    throw new Error("Method not implemented.");
  }
}

Bucket._annotateInflight("put", {});
Bucket._annotateInflight("get", {});
Bucket._annotateInflight("delete", {});
Bucket._annotateInflight("list", {});
