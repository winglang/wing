import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { WebsiteSchema, WEBSITE_TYPE } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";
import { BaseResourceSchema } from "../testing/simulator";
import { simulatorAttrToken } from "./tokens";

export class Website extends cloud.Website implements ISimulatorResource {
  constructor(scope: Construct, id: string, props: cloud.WebsiteProps) {
    super(scope, id, props);
  }

  public get url(): string {
    return simulatorAttrToken(this, "url");
  }

  public toSimulator(): BaseResourceSchema {
    const schema: WebsiteSchema = {
      type: WEBSITE_TYPE,
      path: this.node.path,
      props: { path: this.path },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient(__filename, this);
  }
}
