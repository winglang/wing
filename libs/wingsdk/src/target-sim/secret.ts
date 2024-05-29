import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { SecretSchema } from "./schema-resources";
import {
  bindSimulatorResource,
  makeSimulatorJsClientType,
  simulatorLiftedFieldsFor,
} from "./util";
import * as cloud from "../cloud";
import { LiftMap } from "../core";
import { ResourceNames } from "../shared/resource-names";
import { ToSimulatorOutput } from "../simulator";
import { IInflightHost } from "../std";

/**
 * Simulator implementation of `cloud.Secret`
 *
 * @inflight `@winglang/sdk.cloud.ISecretClient`
 */
export class Secret extends cloud.Secret implements ISimulatorResource {
  /** @internal */
  public static _toInflightType(): string {
    return makeSimulatorJsClientType("Secret", cloud.Secret._methods);
  }

  constructor(scope: Construct, id: string, props: cloud.SecretProps = {}) {
    super(scope, id, props);

    this._name =
      props.name ??
      ResourceNames.generateName(this, { disallowedRegex: /[^\w]/g });
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.SecretInflightMethods.VALUE]: [],
      [cloud.SecretInflightMethods.VALUE_JSON]: [],
    };
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

  /** @internal */
  public _liftedFields(): Record<string, string> {
    return simulatorLiftedFieldsFor(this);
  }
}
