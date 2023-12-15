import { Construct } from "constructs";
import { makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { BaseResourceSchema } from "../simulator";

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

  public toSimulator(): BaseResourceSchema {
    return {
      type: cloud.DOMAIN_FQN,
      path: this.node.path,
      addr: this.node.addr,
      props: {},
      attrs: {},
    };
  }
}
