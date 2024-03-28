import { relative } from "path";
import { Construct } from "constructs";
import { Policy } from "./policy";
import { ISimulatorInflightHost, ISimulatorResource } from "./resource";
import { ServiceHelperSchema, ServiceSchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { fqnForType } from "../constants";
import { App } from "../core";
import { BaseResourceSchema } from "../simulator";
import { IInflightHost, IResource, Resource, Node } from "../std";

export class Service
  extends cloud.Service
  implements ISimulatorResource, ISimulatorInflightHost
{
  public readonly policy: Policy;
  public _liftMap = undefined;

  constructor(
    scope: Construct,
    id: string,
    handler: cloud.IServiceHandler,
    props: cloud.ServiceProps = {}
  ) {
    super(scope, id, handler, props);
    this.policy = new Policy(this, "Policy", { principal: this });

    const autoStarter = new ServiceHelper(this, "AutoStarter", {
      service: this,
      autoStart: props.autoStart ?? true,
    });
    autoStarter.node.addDependency(this);
    autoStarter.node.addDependency(this.policy);
  }

  public addPermission(resource: IResource, op: string): void {
    this.policy.addStatement(resource, op);
  }

  public toSimulator(): BaseResourceSchema {
    const schema: ServiceSchema = {
      type: cloud.SERVICE_FQN,
      path: this.node.path,
      addr: this.node.addr,
      props: {
        environmentVariables: this.env,
        sourceCodeFile: relative(App.of(this).outdir, this.entrypoint),
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [
      cloud.ServiceInflightMethods.START,
      cloud.ServiceInflightMethods.STOP,
      cloud.ServiceInflightMethods.STARTED,
    ];
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host, ops);
    super.onLift(host, ops);
  }

  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}

/** @internal */
export const SERVICE_HELPER_FQN = fqnForType("sim.ServiceHelper");

/** @internal */
export interface ServiceHelperProps {
  readonly service: Service;
  readonly autoStart: boolean;
}

/**
 * This is a helper resource that automatically starts the service after the
 * service is created in the simulator and shuts it down when the simulator
 * stops.
 *
 * Suppose a service puts an object in a bucket when it starts. The policy
 * (sim.Policy) that grants the service bucket permissions only takes effect
 * after the service is created. Because of this, the service needs to be
 * started after both the service and the policy are created. Vice versa, the
 * service needs to be stopped before the policy is deleted.
 *
 * @internal
 */
export class ServiceHelper extends Resource implements ISimulatorResource {
  private readonly service: Service;
  private readonly autoStart: boolean;

  constructor(scope: Construct, id: string, props: ServiceHelperProps) {
    super(scope, id);
    this.service = props.service;
    this.autoStart = props.autoStart;
    Node.of(this).hidden = true;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: ServiceHelperSchema = {
      type: SERVICE_HELPER_FQN,
      path: this.node.path,
      addr: this.node.addr,
      props: {
        service: simulatorHandleToken(this.service),
        autoStart: this.autoStart,
      },
      attrs: {} as any,
    };
    return schema;
  }
}
