import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { ReactWebsiteSchema, REACT_WEBSITE_TYPE } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";
import { IInflightHost } from "../std";
import { BaseResourceSchema } from "../testing/simulator";
import * as ex from "../ex";

export class ReactWebsite
  extends ex.ReactWebsite
  implements ISimulatorResource
{
  constructor(scope: Construct, id: string, props: ex.ReactWebsiteProps) {
    super(scope, id, props);
    if (!this._isDevRun) {
      // In the future we can create an host (proxy like) for the development one if needed
      this._websiteHost = cloud.Website._newWebsite(
        this,
        `${this.node.id}-host`,
        {
          ...this._hostProps,
          path: this._buildPath,
        }
      );

      this.node.addDependency(this._websiteHost);
      core.Connections.of(this).add({
        source: this,
        target: this._websiteHost,
        name: `host`,
      });
    }
  }

  public toSimulator(): BaseResourceSchema {
    const schema: ReactWebsiteSchema = {
      type: REACT_WEBSITE_TYPE,
      path: this.node.path,
      props: {
        path: this._projectPath,
        startCommand: this._startCommand,
        environmentVariables: Object.fromEntries(this._environments.entries()),
        isDevRun: this._isDevRun,
      },
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

  /** @internal */
  public _getInflightOps(): string[] {
    return [];
  }
}
