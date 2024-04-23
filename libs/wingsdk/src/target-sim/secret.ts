import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { SecretSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { ResourceNames } from "../shared/resource-names";
import { ToSimulatorOutput } from "../simulator";
import { IInflightHost } from "../std";

/**
 * Simulator implementation of `cloud.Secret`
 *
 * @inflight `@winglang/sdk.cloud.ISecretClient`
 */
export class Secret extends cloud.Secret implements ISimulatorResource {
  constructor(scope: Construct, id: string, props: cloud.SecretProps = {}) {
    super(scope, id, props);

    this._name =
      props.name ??
      ResourceNames.generateName(this, { disallowedRegex: /[^\w]/g });
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [
      cloud.SecretInflightMethods.VALUE,
      cloud.SecretInflightMethods.VALUE_JSON,
    ];
  }

  public toSimulator(): ToSimulatorOutput {
    const props: SecretSchema = {
      name: this.name!,
    };
    return {
      type: cloud.SECRET_FQN,
      props,
    };
  }
}
