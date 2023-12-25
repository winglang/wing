import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { WebsiteSchema, FileRoutes } from "./schema-resources";
import { simulatorAttrToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { BaseResourceSchema } from "../simulator/simulator";
import { IInflightHost } from "../std";

/**
 * A static website.
 */
export class Website extends cloud.Website implements ISimulatorResource {
  private fileRoutes: FileRoutes = {};
  private readonly endpoint: cloud.Endpoint;

  constructor(scope: Construct, id: string, props: cloud.WebsiteProps) {
    super(scope, id, props);

    this.endpoint = new cloud.Endpoint(
      this,
      "Endpoint",
      simulatorAttrToken(this, "url"),
      { label: `Website ${this.node.path}`, browserSupport: true }
    );
  }

  protected get _endpoint(): cloud.Endpoint {
    return this.endpoint;
  }

  /** Adds a file to the website during deployment */
  public addFile(
    path: string,
    data: string,
    options?: cloud.AddFileOptions
  ): string {
    this.fileRoutes[path] = {
      data,
      contentType: options?.contentType ?? "text/plain",
    };

    return `${this.url}/${path}`;
  }

  /** Returns sim schema */
  public toSimulator(): BaseResourceSchema {
    const schema: WebsiteSchema = {
      type: cloud.WEBSITE_FQN,
      path: this.node.path,
      addr: this.node.addr,
      props: { staticFilesPath: this.path, fileRoutes: this.fileRoutes },
      attrs: {} as any,
    };
    return schema;
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
