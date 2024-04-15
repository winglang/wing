import { Construct } from "constructs";
import { DomainSchema } from "./schema-resources";
import { makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { ToSimulatorOutput } from "../simulator";

/**
 * Simulator implementation of `cloud.Domain`
 */
export class Domain extends cloud.Domain {
  constructor(scope: Construct, id: string, props: cloud.DomainProps) {
    super(scope, id, props);
  }

  /**
   * @internal
   */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }

  public toSimulator(): ToSimulatorOutput {
    const props: DomainSchema = {};
    return {
      type: cloud.DOMAIN_FQN,
      props,
    };
  }
}
