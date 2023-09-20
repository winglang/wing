import { join } from "path";
import { Construct } from "constructs";
import { Function } from "./function";
import { ISimulatorResource } from "./resource";
import { SERVICE_TYPE, ServiceSchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { convertBetweenHandlers } from "../shared/convert";
import { IInflightHost, Node, SDK_SOURCE_MODULE } from "../std";
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
    Node.of(onStartFunction).title = "onStart()";
    this.onStartHandlerToken = simulatorHandleToken(onStartFunction);

    Node.of(this).addConnection({
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
      Node.of(onStopFunction).title = "onStop()";
      this.onStopHandlerToken = simulatorHandleToken(onStopFunction);

      Node.of(this).addConnection({
        source: this,
        target: onStopFunction,
        name: "onStop()",
      });
    }
  }

  // todo onstrart onstop
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
    Node.of(fn).sourceModule = SDK_SOURCE_MODULE;
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

  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
