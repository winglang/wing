import { Construct } from "constructs";
import { makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { BaseResourceSchema } from "../simulator";

/**
 * Simulator implementation of `cloud.Endpoint`
 */
export class Endpoint extends cloud.Endpoint {
  constructor(scope: Construct, id: string, url: string) {
    super(scope, id, url);
  }

  /**
   * @internal
   */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }

  public toSimulator(): BaseResourceSchema {
    return {
      type: cloud.ENDPOINT_FQN,
      path: this.node.path,
      props: {
        url: this.url,
      },
      attrs: {},
    };
  }
}
