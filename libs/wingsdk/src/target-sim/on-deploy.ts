import { Construct } from "constructs";
import { ON_DEPLOY_TYPE, OnDeploySchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";
import { IInflightHost } from "../std";
import { BaseResourceSchema } from "../testing";

export class OnDeploy extends cloud.OnDeploy {
  private readonly fn: cloud.Function;
  constructor(
    scope: Construct,
    id: string,
    handler: cloud.IOnDeployHandler,
    props: cloud.OnDeployProps = {}
  ) {
    super(scope, id, handler, props);

    this.fn = cloud.Function._newFunction(this, "Function", handler, props);
    this.node.addDependency(this.fn);

    for (const c of props.executeBefore ?? []) {
      c.node.addDependency(this);
    }

    for (const c of props.executeAfter ?? []) {
      this.node.addDependency(c);
    }
  }

  public toSimulator(): BaseResourceSchema {
    const schema: OnDeploySchema = {
      type: ON_DEPLOY_TYPE,
      path: this.node.path,
      props: {
        functionHandle: simulatorHandleToken(this.fn),
      },
      attrs: {},
    };
    return schema;
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
