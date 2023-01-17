import * as crypto from "crypto";
import { LinuxFunctionApp } from "@cdktf/provider-azurerm/lib/linux-function-app";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { StorageAccount } from "@cdktf/provider-azurerm/lib/storage-account";
import { ServicePlan } from "@cdktf/provider-azurerm/lib/service-plan";
import { StorageContainer } from "@cdktf/provider-azurerm/lib/storage-container";
import { StorageBlob } from "@cdktf/provider-azurerm/lib/storage-blob";
import {} from "@cdktf/provider-azurerm/lib/app-service-plan";
import {DataAzurermStorageAccountSas} from "@cdktf/provider-azurerm/lib/data-azurerm-storage-account-sas";
import { Construct } from "constructs";
// import {} from "fs";
import * as cloud from "../cloud";
import * as core from "../core";
import { App } from "./app";
import { readFileSync } from "fs";
import { TerraformOutput } from "cdktf";


/**
 * Azure implementation of `cloud.Function`.
 * 
 * @inflight `@winglang/wingsdk.cloud.IFunctionClient`
 */
export class Function extends cloud.FunctionBase {
  private readonly function: LinuxFunctionApp;
  private readonly resourceGroup: ResourceGroup;
  private readonly storageAccount: StorageAccount;
  private readonly servicePlan: ServicePlan;
  

  constructor(scope: Construct, id: string, inflight: cloud.IFunctionHandler, props: cloud.FunctionProps) {
    super(scope, id, inflight, props);

    const app = App.of(this);

    this.resourceGroup = new ResourceGroup(this, "ResourceGroup", {
      location: app.location,
      name: this.sanitizeName(this.node.id),
    });

    this.storageAccount = new StorageAccount(this, "StorageAccount", {
      name: this.sanitizeName("functionsalt" + this.node.id + this.node.addr),
      resourceGroupName: this.resourceGroup.name,
      location: this.resourceGroup.location,
      accountTier: "Standard",
      accountReplicationType: "LRS",
    });

    this.servicePlan = new ServicePlan(this, "ServicePlan", {
      name: this.sanitizeName(this.node.id + this.node.addr),
      resourceGroupName: this.resourceGroup.name,
      location: this.resourceGroup.location,
      osType: "Linux",
      skuName: "S1",
    });

    const c = new StorageContainer(this, "StroageContainer", {
      name: "functionstoragecontainer",
      storageAccountName: this.storageAccount.name,
    });

    const b = new StorageBlob(this, "CodeBlob", {
      name: "function.zip",
      storageAccountName: this.storageAccount.name,
      storageContainerName: c.name,
      type: "Block",
      source: "/Users/hasan/repos/monada/samples/azurefunc.zip",
    });

    b;

    const sas = new DataAzurermStorageAccountSas(this, "Sas", {
      connectionString: this.storageAccount.primaryConnectionString,
      expiry: "2023-02-02",
      httpsOnly: true,
      permissions: {
        read: true,
        write: false,
        delete: false,
        list: false,
        add: false,
        create: false,
        update: false,
        process: false,
        filter: false,
        tag: false
      },
      resourceTypes: {
        container: true,
        object: true,
        service: false
      },
      start: "2023-01-01",
      services: {
        blob: true,
        file: true,
        queue: false,
        table: false,
      }
    });
    
    const codeHash = crypto.createHash("sha256").update(readFileSync("/Users/hasan/repos/monada/samples/azurefunc.zip")).digest("hex");

    // console.log("HASHCODE: ", codeHash);
    const e = (str: string):string => Buffer.from(str, 'binary').toString('base64');
    // console.log("BASE64: ", e(codeHash));


    this.function = new LinuxFunctionApp(this, "Function", {
      name: this.sanitizeName("littlesalt"+this.node.id + this.node.addr),
      resourceGroupName: this.resourceGroup.name,
      location: this.resourceGroup.location,
      servicePlanId: this.servicePlan.id,
      storageAccountName: this.storageAccount.name,
      storageAccountAccessKey: this.storageAccount.primaryAccessKey,
      siteConfig: {
        applicationStack: {
          nodeVersion: "14"
        },
      },
      httpsOnly: true,
      appSettings: {
        "WEBSITE_NODE_DEFAULT_VERSION": "~14",
        "FUNCTION_APP_EDIT_MODE": "readonly",
        "HASH": e(codeHash),
        "WEBSITE_RUN_FROM_PACKAGE": `https://${this.storageAccount.name}.blob.core.windows.net/${c.name}/${b.name}${sas.sas}`,
        "FUNCTIONS_WORKER_RUNTIME": "node",
      }
    });

    this.function;
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