import { Construct } from "constructs";
import { App } from "./app";
import { Function } from "./function";
import { StorageAccount } from "../.gen/providers/azurerm/storage-account";
import { StorageTable } from "../.gen/providers/azurerm/storage-table";
import * as cloud from "../cloud";
import * as core from "../core";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../shared/resource-names";
import { IInflightHost } from "../std";

/**
 * - Table names must be unique within an account.
 * - Table names may contain only alphanumeric characters.
 * - Table names cannot begin with a numeric character.
 * - Table names are case-insensitive.
 * - Table names must be from 3 to 63 characters long.
 * - Some table names are reserved, including "tables".
 *   Attempting to create a table with a reserved table name returns error code 404 (Bad Request).
 */
const TABLE_NAME_OPTS: NameOptions = {
  maxLen: 63,
  case: CaseConventions.LOWERCASE,
  disallowedRegex: /(^[^a-z])|([^a-z0-9])/g,
  sep: "x",
};

/**
 * Azure bult-in storage account permissions.
 */
export enum StorageAccountPermissions {
  /** Read only permission */
  READ = "Storage Table Data Reader",
  /** Read write permission */
  READ_WRITE = "Storage Table Data Contributor",
}

/**
 * Azure implementation of `cloud.Counter`.
 *
 * @inflight `@winglang/sdk.cloud.ICounterClient`
 */
export class Counter extends cloud.Counter {
  private readonly storageAccount: StorageAccount;
  public readonly storageTable: StorageTable;

  constructor(scope: Construct, id: string, props: cloud.CounterProps = {}) {
    super(scope, id, props);

    const app = App.of(this) as App;
    this.storageAccount = app.storageAccount;

    const storageTableName = ResourceNames.generateName(this, TABLE_NAME_OPTS);

    this.storageTable = new StorageTable(this, "CounterTable", {
      name: storageTableName,
      storageAccountName: this.storageAccount.name,
    });
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [];
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("counters can only be bound by tfazure.Function for now");
    }

    // TODO: investigate customized roles over builtin for finer grained access control
    if (ops.includes(cloud.CounterInflightMethods.PEEK)) {
      host.addPermission(this.storageAccount, {
        scope: this.storageAccount.id,
        roleDefinitionName: StorageAccountPermissions.READ,
      });
    } else if (
      ops.includes(cloud.CounterInflightMethods.INC) ||
      ops.includes(cloud.CounterInflightMethods.DEC) ||
      ops.includes(cloud.CounterInflightMethods.SET)
    ) {
      host.addPermission(this.storageAccount, {
        scope: this.storageAccount.id,
        roleDefinitionName: StorageAccountPermissions.READ_WRITE,
      });
    }

    host.addEnvironment(this.envStorageAccountName(), this.storageAccount.name);
    host.addEnvironment(this.envStorageTableName(), this.storageTable.name);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-azure", "shared-azure"),
      __filename,
      "CounterClient",
      [
        `process.env["${this.envStorageAccountName()}"]`,
        `process.env["${this.envStorageTableName()}"]`,
        `${this.initial}`,
      ]
    );
  }

  private envStorageAccountName(): string {
    return `STORAGE_ACCOUNT_${this.storageTable.node.addr.slice(-8)}`;
  }

  private envStorageTableName(): string {
    return `TABLE_NAME_${this.storageTable.node.addr.slice(-8)}`;
  }
}
