import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { StorageAccount } from "@cdktf/provider-azurerm/lib/storage-account";
import { StorageContainer } from "@cdktf/provider-azurerm/lib/storage-container";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../utils/resource-names";
import { App } from "./app";

/**
 * ResourceGroup names are limited to 90 characters.
 * You can use alphanumeric characters, hyphens, and underscores,
 * parentheses and periods.
 */
const RESOURCEGROUP_NAME_OPTS: NameOptions = {
  maxLen: 90,
  disallowedRegEx: /([^a-zA-Z0-9\-\_\(\)\.]+)/g,
};

/**
 * StorageAccount names are limited to 24 characters.
 * You can only use alphanumeric characters.
 */
const STORAGEACCOUNT_NAME_OPTS: NameOptions = {
  maxLen: 24,
  case: CaseConventions.LOWERCASE,
  disallowedRegEx: /([^a-z0-9]+)/g,
  sep: "",
};

/**
 * Bucket names must be between 3 and 63 characters.
 *
 * You can use lowercase alphanumeric characters, dash (-)
 * and two or more consecutive dash characters aren't permitted.
 */
const BUCKET_NAME_OPTS: NameOptions = {
  maxLen: 63,
  case: CaseConventions.LOWERCASE,
  disallowedRegEx: /([^a-z0-9\-]+)|(\-{2,})/g,
};

/**
 * Azure implementation of `cloud.Bucket`.
 *
 * @inflight `@winglang/wingsdk.cloud.IBucketClient`
 */
export class Bucket extends cloud.BucketBase {
  private readonly bucket: StorageContainer;
  private readonly storageAccount: StorageAccount;
  private readonly resourceGroup: ResourceGroup;
  private readonly public: boolean;

  constructor(scope: Construct, id: string, props: cloud.BucketProps) {
    super(scope, id, props);

    this.public = props.public ?? false;

    // names must begin and end with alphanumeric character
    if (this.node.id.match(/(^\W{1,})|(\W{1,}$)/g)?.length) {
      throw new Error(
        "Bucket names must begin and end with alphanumeric character."
      );
    }

    const app = App.of(this);

    this.resourceGroup = new ResourceGroup(this, "ResourceGroup", {
      location: app.location,
      name: ResourceNames.generateName(this, RESOURCEGROUP_NAME_OPTS),
    });

    this.storageAccount = new StorageAccount(this, "StorageAccount", {
      name: ResourceNames.generateName(this, STORAGEACCOUNT_NAME_OPTS),
      resourceGroupName: this.resourceGroup.name,
      location: this.resourceGroup.location,
      accountTier: "Standard",
      accountReplicationType: "LRS",
    });

    this.bucket = new StorageContainer(this, "Bucket", {
      name: ResourceNames.generateName(this, BUCKET_NAME_OPTS),
      storageAccountName: this.storageAccount.name,
      containerAccessType: this.public ? "public" : "private",
    });

    this.bucket;
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
