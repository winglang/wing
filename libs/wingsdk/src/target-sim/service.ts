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

    // On Start Handler
    const onStartHash = props.onStart.node.addr.slice(-8);

    const onStartFunctionHandler = convertBetweenHandlers(
      this.node.scope!,
      `${this.node.id}-ServiceOnStartHandler-${onStartHash}`,
      props.onStart,
      join(__dirname, "service.onevent.inflight.js"),
      "ServiceOnEventHandler"
    );

    const fn = Function._newFunction(
      this.node.scope!,
      `${this.node.id}-ServiceOnStart${onStartHash}`,
      onStartFunctionHandler,
      {}
    );

    Resource.addConnection({
      from: this,
      to: fn,
      relationship: "on_start",
    });

    this.onStartHandlerToken = simulatorHandleToken(fn);
    this.node.addDependency(fn);

    // On Stop Handler
    if (props.onStop) {
      const onStopHash = props.onStart.node.addr.slice(-8);
      const onStopFunctionHandler = convertBetweenHandlers(
        this.node.scope!,
        `${this.node.id}-ServiceOnStopHandler-${onStopHash}`,
        props.onStop,
        join(__dirname, "service.onevent.inflight.js"),
        "ServiceOnEventHandler"
      );

      const stopFn = Function._newFunction(
        this.node.scope!,
        `${this.node.id}-ServiceOnStop${onStopHash}`,
        onStopFunctionHandler,
        {}
      );

      Resource.addConnection({
        from: this,
        to: stopFn,
        relationship: "on_stop",
      });

      this.onStopHandlerToken = simulatorHandleToken(stopFn);
      this.node.addDependency(stopFn);
    }
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
