import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { WebsiteSchema, WEBSITE_TYPE } from "./schema-resources";
import { simulatorAttrToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";
import { IInflightHost, Json } from "../std";
import { BaseResourceSchema } from "../testing/simulator";

export class Website extends cloud.Website implements ISimulatorResource {
  private jsonRoutes: Record<string, Json> = {};

  constructor(scope: Construct, id: string, props: cloud.WebsiteProps) {
    super(scope, id, props);
  }

  public get url(): string {
    return simulatorAttrToken(this, "url");
  }

  public addJson(filePath: string, obj: Json): string {
    if (!filePath.endsWith(".json")) {
      throw new Error(
        `key must have a .json suffix: ${filePath.split(".").pop()}`
      );
    }
    this.jsonRoutes[filePath] = obj;

    return `${this.url}/${filePath}`;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: WebsiteSchema = {
      type: WEBSITE_TYPE,
      path: this.node.path,
      props: { staticFilesPath: this.path, jsonRoutes: this.jsonRoutes },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient(__filename, this);
  }
}
