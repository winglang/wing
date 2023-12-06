import { execSync } from "child_process";
import { join } from "path";
import { Construct } from "constructs";
import { Website } from "./website";
import { core } from "..";

import * as cloud from "../cloud";
import { Connections } from "../core";
import * as ex from "../ex";
import * as aws from "../shared-aws";

const INDEX_FILE = "index.html";

/**
 * AWS implementation of `ex.ReactApp`.
 *
 * @inflight `@winglang/sdk.cloud.IReactAppClient`
 */
export class ReactApp extends ex.ReactApp implements aws.IAwsReactApp {
  private _host: cloud.Website;
  constructor(scope: Construct, id: string, props: aws.AwsReactAppProps) {
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

    const host: cloud.Website = new cloud.Website(
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
    this._websiteHost.addFile(
      INDEX_FILE,
      ex.injectWingEnv(join(this._buildPath, "/index.html"), env),
      {
        contentType: "text/html",
      }
    );
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

  public get bucketArn(): string {
    return (this._host as Website).bucket.arn;
  }

  public get bucketName(): string {
    return (this._host as Website).bucket.bucketDomainName;
  }
}
