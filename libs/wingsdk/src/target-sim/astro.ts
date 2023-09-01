import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { AstroSchema, ASTRO_TYPE } from "./schema-resources";
import { simulatorAttrToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as ex from "../ex";
import { IInflightHost } from "../std";
import { BaseResourceSchema } from "../testing/simulator";

export class Astro extends ex.Astro implements ISimulatorResource {
  constructor(scope: Construct, id: string, props: ex.AstroProps) {
    super(scope, id, props);
  }

  public get url(): string {
    return simulatorAttrToken(this, "url");
  }

  public toSimulator(): BaseResourceSchema {
    const schema: AstroSchema = {
      type: ASTRO_TYPE,
      path: this.node.path,
      props: { root: this.root },
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
