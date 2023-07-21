import { Construct } from "constructs";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";
import { IInflightHost } from "../std";

export class OnDeploy extends cloud.OnDeploy {
  constructor(
    scope: Construct,
    id: string,
    handler: cloud.IOnDeployHandler,
    props: cloud.OnDeployProps = {}
  ) {
    super(scope, id, handler, props);

    cloud.Function._newFunction(this, "Function", handler, props);

    for (const c of props.executeBefore ?? []) {
      c.node.addDependency(this);
    }

    for (const c of props.executeAfter ?? []) {
      this.node.addDependency(c);
    }
  }

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient(__filename, this);
  }
}
