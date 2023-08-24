import { Construct } from "constructs";
import { core } from "..";

import * as cloud from "../cloud";
import { S3Object } from "../.gen/providers/aws/s3-object";
import { promisify } from "util";
import { exec } from "child_process";
import { Resource } from "../std";
import { Website } from "./website";
import { unlinkSync } from "fs";
import { join } from "path";

/**
 * AWS implementation of `cloud.ReactWebsite`.
 *
 * @inflight `@winglang/sdk.cloud.IReactWebsiteClient`
 */
export class ReactWebsite extends cloud.ReactWebsite {
  constructor(scope: Construct, id: string, props: cloud.ReactWebsiteProps) {
    super(scope, id, props);
  }

  async _preSynthesize() {
    const { stderr } = await promisify(exec)(this._startCommand, {
      cwd: this._projectPath,
      maxBuffer: 10 * 1024 * 1024,
    });
    if (stderr) {
      throw new Error(stderr);
    }

    unlinkSync(join(this._buildPath, "/wing.js"));

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
      from: this,
      to: this._websiteHost,
      relationship: `host`,
    });

    const env = Object.fromEntries(this._environments.entries());
    const content = `window.wingEnv = ${JSON.stringify(env, null, 2)};`;

    new S3Object(this._websiteHost, `File--wing.js`, {
      dependsOn: [(this._websiteHost as Website).bucket],
      content,
      bucket: (this._websiteHost as Website).bucket.bucket,
      contentType: "text/javascript",
      key: "wing.js",
    });
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "ReactWebsiteClient",
      []
    );
  }
}
