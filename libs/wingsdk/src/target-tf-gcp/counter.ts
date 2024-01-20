import { Construct } from "constructs";
import { App } from "./app";
import { Function as GCPFunction } from "./function";
import { calculateCounterPermissions } from "./permissions";
import { FirestoreDatabase } from "../.gen/providers/google/firestore-database";
import * as cloud from "../cloud";
import * as core from "../core";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../shared/resource-names";
import { IInflightHost } from "../std";

/**
 * Valid database IDs include `(default)` and IDs that conform to the following:
 * - Includes only letters, numbers, and hyphen (-) characters.
 * - The first character must be a letter.
 * - The last character must be a letter or number.
 * - Minimum of 4 characters.
 * - Maximum of 63 characters.
 */
const NAME_OPTS: NameOptions = {
  maxLen: 63,
  case: CaseConventions.LOWERCASE,
  disallowedRegex: /[^a-zA-Z0-9\-]+/g,
  prefix: "wing-counter-",
};

/**
 * GCP implementation of `cloud.Counter`.
 *
 * @inflight `@winglang/sdk.cloud.ICounterClient`
 */
export class Counter extends cloud.Counter {
  private readonly database: FirestoreDatabase;

  constructor(scope: Construct, id: string, props: cloud.CounterProps = {}) {
    super(scope, id, props);

    this.database = new FirestoreDatabase(this, "Default", {
      name: ResourceNames.generateName(this, NAME_OPTS),
      locationId: (App.of(this) as App).region,
      type: "DATASTORE_MODE",
      concurrencyMode: "OPTIMISTIC",
      appEngineIntegrationMode: "DISABLED",
      pointInTimeRecoveryEnablement: "POINT_IN_TIME_RECOVERY_DISABLED",
      deleteProtectionState: "DELETE_PROTECTION_DISABLED",
      deletionPolicy: "DELETE",
    });
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [
      cloud.CounterInflightMethods.PEEK,
      cloud.CounterInflightMethods.INC,
      cloud.CounterInflightMethods.DEC,
      cloud.CounterInflightMethods.SET,
    ];
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof GCPFunction)) {
      throw new Error("counters can only be bound by tfgcp.Function for now");
    }

    const permissions = calculateCounterPermissions(ops);
    host.addPermissions(permissions);

    host.addEnvironment(this.envName(), this.database.name);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-gcp", "shared-gcp"),
      __filename,
      "CounterClient",
      [`process.env["${this.envName()}"]`, `${this.initial}`]
    );
  }

  private envName(): string {
    return `FIRESTORE_DATABASE_NAME_${this.node.addr.slice(-8)}`;
  }
}
