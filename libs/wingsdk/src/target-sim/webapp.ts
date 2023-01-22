import { Construct } from "constructs";
import { WebAppBase, WebAppProps, WEBAPP_TYPE } from "../cloud/webapp";
import { Inflight } from "../core";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { WebAppSchema } from "./schema-resources";

export class WebApp extends WebAppBase implements ISimulatorResource {
  constructor(
    scope: Construct,
    id: string,
    client: Inflight,
    props: WebAppProps = {}
  ) {
    super(scope, id, client, props);
  }

  toSimulator(): BaseResourceSchema {
    const schema: WebAppSchema = {
      type: WEBAPP_TYPE,
      path: this.node.path,
      props: {
        dist: this.dist,
      },
      attrs: {} as any,
    };
    return schema;
  }
}
