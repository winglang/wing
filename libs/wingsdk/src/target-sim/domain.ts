import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { DomainSchema } from "./schema-resources";
import { makeSimulatorJsClientType, simulatorLiftedFieldsFor } from "./util";
import * as cloud from "../cloud";
import { ToSimulatorOutput } from "../simulator";

/**
 * Simulator implementation of `cloud.Domain`
 */
export class Domain extends cloud.Domain implements ISimulatorResource {
  /** @internal */
  public static _toInflightType(): string {
    return makeSimulatorJsClientType("Domain", cloud.Domain._methods);
  }

  constructor(scope: Construct, id: string, props: cloud.DomainProps) {
    super(scope, id, props);
  }

  public toSimulator(): ToSimulatorOutput {
    const props: DomainSchema = {};
    return {
      type: cloud.DOMAIN_FQN,
      props,
    };
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return simulatorLiftedFieldsFor(this);
  }
}
