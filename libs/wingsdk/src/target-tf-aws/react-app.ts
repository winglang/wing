import { execSync } from "child_process";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import { core } from "..";

import * as cloud from "../cloud";
import { Connections } from "../core";
import * as ex from "../ex";

/**
 * AWS implementation of `ex.ReactApp`.
 *
 * @inflight `@winglang/sdk.cloud.IReactAppClient`
 */
export class ReactApp extends ex.ReactApp {
  private _host: cloud.Website;
  constructor(scope: Construct, id: string, props: ex.ReactAppProps) {
    super(scope, id, props);
    this._host = this._createWebsiteHost(
      props.buildCommand ?? ex.DEFAULT_REACT_APP_BUILD_COMMAND
    );
  }

  protected get _websiteHost(): cloud.Website {
    return this._host;
  }

  private _createWebsiteHost(command: string): cloud.Website {
    execSync(command, {
      cwd: this._projectPath,
      maxBuffer: 10 * 1024 * 1024,
    });

    if (existsSync(join(this._buildPath, ex.WING_JS))) {
      unlinkSync(join(this._buildPath, ex.WING_JS));
    }

    const host: cloud.Website = cloud.Website._newWebsite(
      this,
      `${this.node.id}-host`,
      {
        ...this._hostProps,
        path: this._buildPath,
      }
    );

    this.node.addDependency(host);
    Connections.of(this).add({
      source: this,
      target: host,
      name: `host`,
    });

    return host;
  }

  public _preSynthesize(): void {
    const env = Object.fromEntries(this._environmentVariables.entries());
    const content = `// This file is generated by wing\nwindow.wingEnv = ${JSON.stringify(
      env,
      null,
      2
    )};`;
    this._websiteHost.addFile(ex.WING_JS, content, {
      contentType: "text/javascript",
    });
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "ReactAppClient",
      []
    );
  }
}
