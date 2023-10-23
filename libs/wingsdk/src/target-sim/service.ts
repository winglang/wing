import { relative } from "path";
import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { SERVICE_TYPE, ServiceSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { App } from "../core";
import { BaseResourceSchema } from "../simulator";
import { IInflightHost } from "../std";

export class Service extends cloud.Service implements ISimulatorResource {
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

  public toSimulator(): BaseResourceSchema {
    const schema: ServiceSchema = {
      type: SERVICE_TYPE,
      path: this.node.path,
      props: {
        environmentVariables: this.env,
        sourceCodeFile: relative(App.of(this).outdir, this.entrypoint),
        autoStart: this.autoStart,
      },
      attrs: {} as any,
    };
    return schema;
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.onLift(host, ops);
  }

  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
