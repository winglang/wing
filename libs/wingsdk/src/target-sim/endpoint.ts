import { Construct } from "constructs";
import { EndpointSchema } from "./schema-resources";
import { makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";

/**
 * Simulator implementation of `cloud.Endpoint`
 */
export class Endpoint extends cloud.Endpoint {
  constructor(
    scope: Construct,
    id: string,
    url: string,
    props: cloud.EndpointProps = {}
  ) {
    super(scope, id, url, props);
  }

  /**
   * @internal
   */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }

  public toSimulator(): EndpointSchema {
    return {
      type: cloud.ENDPOINT_FQN,
      path: this.node.path,
      addr: this.node.addr,
      props: {
        url: this.url,
        label: this.label,
        browserSupport: this.browserSupport,
      },
      attrs: {},
      dependencies: this.node.dependencies.map((d) => d.node.path),
    };
  }
}
