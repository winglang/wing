import * as crypto from "crypto";
import { LinuxFunctionApp } from "@cdktf/provider-azurerm/lib/linux-function-app";
import { ServicePlan } from "@cdktf/provider-azurerm/lib/service-plan";
import { StorageBlob } from "@cdktf/provider-azurerm/lib/storage-blob";
import { StorageContainer } from "@cdktf/provider-azurerm/lib/storage-container";
import { ApplicationInsights } from "@cdktf/provider-azurerm/lib/application-insights";
import { DataAzurermStorageAccountSas } from "@cdktf/provider-azurerm/lib/data-azurerm-storage-account-sas";
import { DataAzurermSubscription } from "@cdktf/provider-azurerm/lib/data-azurerm-subscription";
import { Construct } from "constructs";
import JSZip from "jszip";
import * as cloud from "../cloud";
import * as core from "../core";
import { App } from "./app";
import { readFileSync } from "fs";
import { resolve } from "path";
import * as fs from "fs";
import { RoleAssignment } from "@cdktf/provider-azurerm/lib/role-assignment";

/**
 * Azure implementation of `cloud.Function`.
 *
 * @inflight `@winglang/wingsdk.cloud.IFunctionClient`
 */
export class Function extends cloud.FunctionBase {
  private readonly function: LinuxFunctionApp;
  private readonly app: App;
  private readonly servicePlan: ServicePlan;
  private permissions?: Map<string, string[]>;

  public addPermission(principalId: string, role_definition_name: string) {
    if (!this.permissions) {
      this.permissions = new Map();
    }
    // TODO: append dont overwrite
    this.permissions.set(principalId, [role_definition_name]);
  }  

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps
  ) {
    super(scope, id, inflight, props);
    console.log('Function constructor called');
    
    this.app = App.of(this);

    this.servicePlan = new ServicePlan(this, "ServicePlan", {
      name: this.sanitizeName(this.node.id + this.node.addr),
      resourceGroupName: this.app.resourceGroup.name,
      location: this.app.resourceGroup.location,
      osType: "Linux",
      skuName: "Y1",
    });

    const c = new StorageContainer(this, "StroageContainer", {
      name: "functionstoragecontainer",
      storageAccountName: this.app.storageAccount.name,
    });

    // calculate a md5 hash of the contents of asset.path
    const codeHash = crypto
      .createHash("md5")
      .update(readFileSync(this.assetPath))
      .digest("hex");

    const codeDir = resolve(this.assetPath, "..");
    console.log("CODEDIR: ", codeDir);

    const objectKey = `asset.${this.node.addr}.${codeHash}.zip`;
    console.log("OBJECTKEY: ", objectKey);

    fs.writeFileSync(
      codeDir + "/package.json",
      JSON.stringify({
        name: "myfun",
        version: "1.0.0",
      })
    );

    fs.writeFileSync(
      codeDir + "/host.json",
      JSON.stringify({
        version: "2.0",
        logging: {
          applicationInsights: {
            samplingSettings: {
              isEnabled: true,
              excludedTypes: "Request",
            },
          },
        },
        extensionBundle: {
          id: "Microsoft.Azure.Functions.ExtensionBundle",
          version: "[2.*, 3.0.0)",
        },
      })
    );

    fs.mkdirSync(codeDir + "/HttpT");

    fs.renameSync(codeDir + "/index.js", codeDir + "/HttpT/index.js");
    fs.writeFileSync(
      codeDir + "/HttpT/function.json",
      JSON.stringify({
        bindings: [
          {
            authLevel: "anonymous",
            type: "httpTrigger", // TODO: determine best trigger...
            direction: "in",
            name: "req",
            methods: ["get", "post"],
          },
          {
            type: "http",
            direction: "out",
            name: "res",
          },
        ],
      })
    );

    const funczipPath = "/Users/hasan/repos/monada/samples/superplugin123456788.zip";

    const zip = new JSZip();

    zip.file("package.json", fs.readFileSync(codeDir + "/package.json"));
    zip.file("host.json", fs.readFileSync(codeDir + "/host.json"));

    const httpFolder = zip.folder("HttpT");

    httpFolder!.file("index.js", fs.readFileSync(codeDir + "/HttpT/index.js"));
    httpFolder!.file(
      "function.json",
      fs.readFileSync(codeDir + "/HttpT/function.json")
    );

    // TODO: wait on zip to finish, right now bug will happen on first creation
    // of zip folder where it will not be created before storage blob checks for it.
    zip.generateNodeStream({ type: "nodebuffer", streamFiles: true }).pipe(
      fs.createWriteStream(funczipPath).on("finish", function () {
        console.log("CODE_DIR: ", codeDir);
        console.log("Azure function zipped!");
      })
    );

    this.servicePlan; // TODO: remove this line

    const b = new StorageBlob(this, "CodeBlob", {
      name: "function.zip",
      storageAccountName: this.app.storageAccount.name,
      storageContainerName: c.name,
      type: "Block",
      source: funczipPath,
    });

    const sas = new DataAzurermStorageAccountSas(this, "Sas", {
      connectionString: this.app.storageAccount.primaryConnectionString,
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
        tag: false,
      },
      resourceTypes: {
        container: true,
        object: true,
        service: false,
      },
      start: "2023-01-01",
      services: {
        blob: true,
        file: true,
        queue: false,
        table: false,
      },
    });

    const hash = crypto
      .createHash("sha256")
      .update(readFileSync(funczipPath))
      .digest("hex");
    const e = (str: string): string =>
      Buffer.from(str, "binary").toString("base64");

    const appInsight = new ApplicationInsights(this, "AppInsights", {
      name: this.sanitizeName("hasantest" + this.node.id + this.node.addr),
      resourceGroupName: this.app.resourceGroup.name,
      location: this.app.resourceGroup.location,
      applicationType: "Node.JS",
    });

    const subscription = new DataAzurermSubscription(this, "Subscription", {});
    subscription;

    this.function = new LinuxFunctionApp(this, "Function", {
      name: this.sanitizeName("hasantest" + this.node.id + this.node.addr),
      resourceGroupName: this.app.resourceGroup.name,
      location: this.app.resourceGroup.location,
      servicePlanId: this.servicePlan.id,
      storageAccountName: this.app.storageAccount.name,
      identity: {
        type: "SystemAssigned",
      },
      storageAccountAccessKey: this.app.storageAccount.primaryAccessKey,
      siteConfig: {
        applicationStack: {
          nodeVersion: "14",
        },
      },
      httpsOnly: true,
      appSettings: {
        WEBSITE_NODE_DEFAULT_VERSION: "~14",
        FUNCTION_APP_EDIT_MODE: "readonly",
        HASH: e(hash),
        WEBSITE_RUN_FROM_PACKAGE: `https://${this.app.storageAccount.name}.blob.core.windows.net/${c.name}/${b.name}${sas.sas}`,
        FUNCTIONS_WORKER_RUNTIME: "node",
        APPINSIGHTS_INSTRUMENTATIONKEY: appInsight.instrumentationKey,
        STORAGE_ACCOUNT: "hasantestbucketc8ceac0b",
        BUCKET: "hasan-test-bucket-c8ceac0b"
      },
    });

    // Apply permissions
    for (const permission of this.permissions?.keys() || []) {
      permission;
      new RoleAssignment(this, `RoleAssignment`, {
        principalId: this.function.identity.principalId,
        roleDefinitionName: this.permissions?.get(permission)![0] || "",
        scope: permission
      });
    }

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
