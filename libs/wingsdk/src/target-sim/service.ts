import { relative } from "path";
import { Construct } from "constructs";
import { ISimulatorInflightHost, ISimulatorResource } from "./resource";
import { ServiceSchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { App, LiftMap } from "../core";
import { PolicyStatement, ToSimulatorOutput } from "../simulator";
import { IInflightHost, IResource } from "../std";

export class Service
  extends cloud.Service
  implements ISimulatorResource, ISimulatorInflightHost
{
  private readonly permissions: Array<[IResource, string]> = [];
  private readonly autoStart: boolean;

  constructor(
    scope: Construct,
    id: string,
    handler: cloud.IServiceHandler,
    props: cloud.ServiceProps = {}
  ) {
    super(scope, id, handler, props);
    this.autoStart = props.autoStart ?? true;
  }

  public addPermission(resource: IResource, op: string): void {
    this.permissions.push([resource, op]);
  }

  public toSimulator(): ToSimulatorOutput {
    const policy: Array<PolicyStatement> = [];
    for (const [resource, operation] of this.permissions) {
      policy.push({
        operation,
        resourceHandle: simulatorHandleToken(resource),
      });
    }
    const props: ServiceSchema = {
      environmentVariables: this.env,
      sourceCodeFile: relative(App.of(this).outdir, this.entrypoint),
      autoStart: this.autoStart,
    };
    return {
      type: cloud.SERVICE_FQN,
      props,
      policy,
    };
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.ServiceInflightMethods.START]: [],
      [cloud.ServiceInflightMethods.STOP]: [],
      [cloud.ServiceInflightMethods.STARTED]: [],
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host, ops);
    super.onLift(host, ops);
  }

  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
