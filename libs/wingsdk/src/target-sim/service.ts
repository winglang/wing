import { join } from "path";
import { Construct } from "constructs";
import { Function } from "./function";
import { ISimulatorResource } from "./resource";
import { SERVICE_TYPE, ServiceSchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";
import { IInflightHost, Resource } from "../std";
import { BaseResourceSchema } from "../testing";
import { convertBetweenHandlers } from "../utils/convert";

export class Service extends cloud.Service implements ISimulatorResource {
  private readonly autoStart: boolean;
  private onStartHandlerToken: string;
  private onStopHandlerToken?: string;

  constructor(scope: Construct, id: string, props: cloud.ServiceProps) {
    super(scope, id, props);
    this.autoStart = props.autoStart ?? true;

    const onStartFunction = this.createServiceFunction(
      props.onStart,
      "ServiceOnStart"
    );
    this.onStartHandlerToken = simulatorHandleToken(onStartFunction);

    Resource.addConnection({
      from: this,
      to: onStartFunction,
      relationship: "on_start",
    });

    // On Stop Handler
    if (props.onStop) {
      const onStopFunction = this.createServiceFunction(
        props.onStop,
        "ServiceOnStop"
      );
      this.onStopHandlerToken = simulatorHandleToken(onStopFunction);

      Resource.addConnection({
        from: this,
        to: onStopFunction,
        relationship: "on_stop",
      });
    }
  }

  private createServiceFunction(
    handler: cloud.IServiceOnEventHandler,
    id: string
  ): cloud.Function {
    // On Start Handler
    const onStartHash = handler.node.addr.slice(-8);

    const onStartFunctionHandler = convertBetweenHandlers(
      this.node.scope!,
      `${this.node.id}-${id}-${onStartHash}`,
      handler,
      join(__dirname, "service.onevent.inflight.js"),
      "ServiceOnEventHandler"
    );

    const fn = Function._newFunction(
      this.node.scope!,
      `${this.node.id}-${id}${onStartHash}`,
      onStartFunctionHandler,
      {}
    );

    this.node.addDependency(fn);
    return fn;
  }

  toSimulator(): BaseResourceSchema {
    const schema: ServiceSchema = {
      type: SERVICE_TYPE,
      path: this.node.path,
      props: {
        onStartHandler: this.onStartHandlerToken,
        autoStart: this.autoStart,
      },
      attrs: {} as any,
    };
    if (this.onStartHandlerToken) {
      schema.props.onStopHandler = this.onStopHandlerToken;
    }
    return schema;
  }

  public _bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super._bind(host, ops);
  }

  public _toInflight(): core.Code {
    return makeSimulatorJsClient(__filename, this);
  }
}
