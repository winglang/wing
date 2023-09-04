import { Construct } from "constructs";
import { makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";

/**
 * Simulator implementation of `cloud.Domain`
 */
export class Domain extends cloud.Domain {
  constructor(scope: Construct, id: string, props: cloud.DomainProps) {
    super(scope, id, props);
  }

  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
