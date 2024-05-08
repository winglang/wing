import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { WebsiteSchema, FileRoutes } from "./schema-resources";
import { simulatorcreateToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { ToSimulatorOutput } from "../simulator";
import { IInflightHost, Node } from "../std";

/**
 * A static website.
 */
export class Website extends cloud.Website implements ISimulatorResource {
  private fileRoutes: FileRoutes = {};
  private readonly endpoint: cloud.Endpoint;
  private readonly errorDocument?: string;

  constructor(scope: Construct, id: string, props: cloud.WebsiteProps) {
    super(scope, id, props);

    this.endpoint = new cloud.Endpoint(
      this,
      "Endpoint",
      simulatorcreateToken(this, "url"),
      { label: `Website ${this.node.path}`, browserSupport: true }
    );

    Node.of(this.endpoint).hidden = true;

    this.errorDocument = props.errorDocument;
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
  public toSimulator(): ToSimulatorOutput {
    const props: WebsiteSchema = {
      staticFilesPath: this.path,
      fileRoutes: this.fileRoutes,
      errorDocument: this.errorDocument,
    };
    return {
      type: cloud.WEBSITE_FQN,
      props,
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
