import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { WebsiteSchema, WEBSITE_TYPE } from "./schema-resources";
import { simulatorAttrToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { BaseResourceSchema } from "../simulator/simulator";
import { IInflightHost, Json } from "../std";

export class Website extends cloud.Website implements ISimulatorResource {
  private jsonRoutes: Record<string, Json> = {};

  constructor(scope: Construct, id: string, props: cloud.WebsiteProps) {
    super(scope, id, props);
  }

  public get url(): string {
    return simulatorAttrToken(this, "url");
  }

  public addJson(path: string, data: Json): string {
    if (!path.endsWith(".json")) {
      throw new Error(
        `key must have a .json suffix: (current: "${path.split(".").pop()}")}`
      );
    }
    this.jsonRoutes[path] = data;

    return `${this.url}/${path}`;
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

  public bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.bind(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
