import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { WebsiteSchema, WEBSITE_TYPE, FileRoutes } from "./schema-resources";
import { simulatorAttrToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { BaseResourceSchema } from "../simulator/simulator";
import { IInflightHost } from "../std";

export class Website extends cloud.Website implements ISimulatorResource {
  private fileRoutes: FileRoutes = {};

  constructor(scope: Construct, id: string, props: cloud.WebsiteProps) {
    super(scope, id, props);
  }

  public get url(): string {
    return simulatorAttrToken(this, "url");
  }

  public addFile(path: string, data: string, contentType: string): string {
    this.fileRoutes[path] = { data, contentType };

    return `${this.url}/${path}`;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: WebsiteSchema = {
      type: WEBSITE_TYPE,
      path: this.node.path,
      props: { staticFilesPath: this.path, fileRoutes: this.fileRoutes },
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
