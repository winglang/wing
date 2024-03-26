import { relative } from "path";
import { Construct } from "constructs";
import { Policy } from "./policy";
import { ISimulatorInflightHost, ISimulatorResource } from "./resource";
import { ServiceAutoStarterSchema, ServiceSchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { fqnForType } from "../constants";
import { App } from "../core";
import { BaseResourceSchema } from "../simulator";
import { IInflightHost, IResource, Resource } from "../std";

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

    if (props.autoStart ?? true) {
      const autoStarter = new ServiceAutoStarter(this, "AutoStarter", {
        service: this,
      });
      autoStarter.node.addDependency(this);
      autoStarter.node.addDependency(this.policy);
    }
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
export const SERVICE_AUTO_STARTER_FQN = fqnForType("sim.ServiceAutoStarter");

/** @internal */
export interface ServiceAutoStarterProps {
  readonly service: Service;
}

/**
 * This is a helper resource that automatically starts the service after the
 * service is created in the simulator.
 *
 * Suppose a service puts an object in a bucket when it starts. The policy
 * (sim.Policy) that grants the service bucket permissions only takes effect
 * after the service is created. Because of this, the service needs to be
 * started after both the service and the policy are created.
 *
 * @internal
 */
export class ServiceAutoStarter extends Resource implements ISimulatorResource {
  private readonly service: Service;
  constructor(scope: Construct, id: string, props: ServiceAutoStarterProps) {
    super(scope, id);
    this.service = props.service;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: ServiceAutoStarterSchema = {
      type: SERVICE_AUTO_STARTER_FQN,
      path: this.node.path,
      addr: this.node.addr,
      props: {
        service: simulatorHandleToken(this.service),
      },
      attrs: {} as any,
    };
    return schema;
  }
}
