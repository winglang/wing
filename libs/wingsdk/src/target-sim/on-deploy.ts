import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { OnDeploySchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import {
  bindSimulatorResource,
  makeSimulatorJsClientType,
  simulatorLiftedFieldsFor,
} from "./util";
import * as cloud from "../cloud";
import { ToSimulatorOutput } from "../simulator";
import { IInflight, IInflightHost, Node, SDK_SOURCE_MODULE } from "../std";

export class OnDeploy extends cloud.OnDeploy implements ISimulatorResource {
  /** @internal */
  public static _toInflightType(): string {
    return makeSimulatorJsClientType("OnDeploy", cloud.OnDeploy._methods);
  }

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

    for (const c of props.executeBefore ?? []) {
      c.node.addDependency(this);
    }

    for (const c of props.executeAfter ?? []) {
      this.node.addDependency(c);
    }
  }

  public toSimulator(): ToSimulatorOutput {
    const props: OnDeploySchema = {
      functionHandle: simulatorHandleToken(this.fn),
    };
    return {
      type: cloud.ON_DEPLOY_FQN,
      props,
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedFields(): Record<string, string> {
    return simulatorLiftedFieldsFor(this);
  }
}
