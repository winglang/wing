import { Construct } from "constructs";
import { Function as SimFunction } from "./function";
import { OnDeploySchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { BaseResourceSchema } from "../simulator";
import { IInflight, IInflightHost, Node, SDK_SOURCE_MODULE } from "../std";

export class OnDeploy extends cloud.OnDeploy {
  private readonly fn: cloud.Function;
  constructor(
    scope: Construct,
    id: string,
    handler: cloud.IOnDeployHandler,
    props: cloud.OnDeployProps = {}
  ) {
    super(scope, id, handler, props);

    this.fn = new cloud.Function(this, "Function", handler as IInflight, props);
    Node.of(this.fn).sourceModule = SDK_SOURCE_MODULE;

    this.node.addDependency(this.fn);
    this.node.addDependency((this.fn as SimFunction).policy);

    for (const c of props.executeBefore ?? []) {
      c.node.addDependency(this);
    }

    for (const c of props.executeAfter ?? []) {
      this.node.addDependency(c);
    }
  }

  public toSimulator(): BaseResourceSchema {
    const schema: OnDeploySchema = {
      type: cloud.ON_DEPLOY_FQN,
      path: this.node.path,
      addr: this.node.addr,
      props: {
        functionHandle: simulatorHandleToken(this.fn),
      },
      attrs: {},
    };
    return schema;
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
