import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { StorageAccount } from "@cdktf/provider-azurerm/lib/storage-account";
import { StorageContainer } from "@cdktf/provider-azurerm/lib/storage-container";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { App } from "./app";

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

    const app = App.of(this);

    this.resourceGroup = new ResourceGroup(this, "ResourceGroup", {
      location: app.location,
      name: this.sanitizeName(this.node.id),
    });

    this.storageAccount = new StorageAccount(this, "StorageAccount", {
      name: this.sanitizeName(this.node.id + this.node.addr),
      resourceGroupName: this.resourceGroup.name,
      location: this.resourceGroup.location,
      accountTier: "Standard",
      accountReplicationType: "LRS",
    });

    this.bucket = new StorageContainer(this, "Bucket", {
      name: this.sanitizeName(this.node.id + this.node.addr),
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

  /**
   * Temporary workaround to use node.id in storage resources names.
   * Valid names must be lowercase letters and numbers only between 3-24 characters long
   *
   * Should be deprecated by https://github.com/winglang/wing/discussions/861 (Name Generator)
   */
  private sanitizeName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .substring(0, 24);
  }
}

Bucket._annotateInflight("put", {});
Bucket._annotateInflight("get", {});
Bucket._annotateInflight("delete", {});
Bucket._annotateInflight("list", {});
