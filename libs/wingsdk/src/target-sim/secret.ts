import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { SECRET_TYPE, SecretSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";
import { ResourceNames } from "../core/resource-names";
import { IInflightHost } from "../std";
import { BaseResourceSchema } from "../testing/simulator";

/**
 * Simulator implementation of `cloud.Secret`
 *
 * @inflight `@winglang/sdk.cloud.ISecretClient`
 */
export class Secret extends cloud.Secret implements ISimulatorResource {
  private readonly name: string;
  constructor(scope: Construct, id: string, props: cloud.SecretProps = {}) {
    super(scope, id, props);

    this.name =
      props.name ??
      ResourceNames.generateName(this, { disallowedRegex: /[^\w]/g });
  }

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient(__filename, this);
  }

  public toSimulator(): BaseResourceSchema {
    const schema: SecretSchema = {
      type: SECRET_TYPE,
      path: this.node.path,
      props: {
        name: this.name,
      },
      attrs: {} as any,
    };
    return schema;
  }
}
