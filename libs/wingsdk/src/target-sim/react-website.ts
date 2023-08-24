import { ISimulatorResource } from "./resource";
import { ReactWebsiteSchema, REACT_WEBSITE_TYPE } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";
import { IInflightHost, Resource } from "../std";
import { BaseResourceSchema } from "../testing/simulator";
import { Construct } from "constructs";

export class ReactWebsite
  extends cloud.ReactWebsite
  implements ISimulatorResource
{
  constructor(scope: Construct, id: string, props: cloud.ReactWebsiteProps) {
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
      Resource.addConnection({
        from: this._websiteHost,
        to: this,
        relationship: `website content`,
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
        environments: Object.fromEntries(this._environments.entries()),
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
  public _toInflight(): core.Code {
    return makeSimulatorJsClient(__filename, this);
  }
}
