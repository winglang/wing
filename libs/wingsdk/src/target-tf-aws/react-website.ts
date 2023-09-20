import { execSync } from "child_process";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import { Website } from "./website";
import { core } from "..";

import { S3Object } from "../.gen/providers/aws/s3-object";
import * as cloud from "../cloud";
import { Connections } from "../core";
import * as ex from "../ex";

/**
 * AWS implementation of `ex.ReactWebsite`.
 *
 * @inflight `@winglang/sdk.cloud.IReactWebsiteClient`
 */
export class ReactWebsite extends ex.ReactWebsite {
  constructor(scope: Construct, id: string, props: ex.ReactWebsiteProps) {
    super(scope, id, props);
    this._createWebsiteHost();
  }

  private _createWebsiteHost() {
    execSync(this._startCommand, {
      cwd: this._projectPath,
      maxBuffer: 10 * 1024 * 1024,
    });

    if (existsSync(join(this._buildPath, ex.WING_JS))) {
      unlinkSync(join(this._buildPath, ex.WING_JS));
    }

    this._websiteHost = cloud.Website._newWebsite(
      this,
      `${this.node.id}-host`,
      {
        ...this._hostProps,
        path: this._buildPath,
      }
    );

    this.node.addDependency(this._websiteHost);
    Connections.of(this).add({
      source: this,
      target: this._websiteHost as Website,
      name: `host`,
    });
  }

  public _preSynthesize(): void {
    const env = Object.fromEntries(this._environmentVariables.entries());
    const content = `window.wingEnv = ${JSON.stringify(env, null, 2)};`;

    new S3Object(this._websiteHost as Website, `File--${ex.WING_JS}`, {
      dependsOn: [(this._websiteHost as Website).bucket],
      content,
      bucket: (this._websiteHost as Website).bucket.bucket,
      contentType: "text/javascript",
      key: ex.WING_JS,
    });
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "ReactWebsiteClient",
      []
    );
  }
}
