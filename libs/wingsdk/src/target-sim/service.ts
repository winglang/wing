import { join } from "path";
import { Construct } from "constructs";
import { Function } from "./function";
import { ISimulatorResource } from "./resource";
import { SERVICE_TYPE, ServiceSchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";
import { Connections } from "../core";
import { convertBetweenHandlers } from "../shared/convert";
import { Display, IInflightHost } from "../std";
import { BaseResourceSchema } from "../testing";

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

    Connections.of(this).add({
      source: this,
      target: onStartFunction,
      name: "onStart()",
    });

    // On Stop Handler
    if (props.onStop) {
      const onStopFunction = this.createServiceFunction(
        props.onStop,
        "ServiceOnStop"
      );
      this.onStopHandlerToken = simulatorHandleToken(onStopFunction);

      Connections.of(this).add({
        source: this,
        target: onStopFunction,
        name: "onStop()",
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
      this,
      `${this.node.id}-${id}-${onStartHash}`,
      handler,
      join(__dirname, "service.onevent.inflight.js"),
      "ServiceOnEventHandler"
    );

    const fn = Function._newFunction(
      this,
      `${this.node.id}-${id}${onStartHash}`,
      onStartFunctionHandler,
      {}
    );
    fn.display.sourceModule = Display.SDK_SOURCE_MODULE;
    fn.display.title = "onStart()";

    this.node.addDependency(fn);
    return fn;
  }

  public toSimulator(): BaseResourceSchema {
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

  public bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.bind(host, ops);
  }

  public _toInflight(): core.Code {
    return makeSimulatorJsClient(__filename, this);
  }
}
