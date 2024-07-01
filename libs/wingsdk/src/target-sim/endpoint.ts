import { Construct } from "constructs";
import { EndpointSchema } from "./schema-resources";
import { makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { ToSimulatorOutput } from "../simulator";

/**
 * Simulator implementation of `cloud.Endpoint`
 */
export class Endpoint extends cloud.Endpoint {
  private readonly _inputUrl: string;
  constructor(
    scope: Construct,
    id: string,
    url: string,
    props: cloud.EndpointProps = {}
  ) {
    super(scope, id, url, props);
    this._inputUrl = url;
  }

  /**
   * @internal
   */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }

  public toSimulator(): ToSimulatorOutput {
    const props: EndpointSchema = {
      inputUrl: this._inputUrl,
      url: this.url,
      label: this.label,
      browserSupport: this.browserSupport,
    };
    return {
      type: cloud.ENDPOINT_FQN,
      props,
    };
  }
}
