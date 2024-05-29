import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { EndpointSchema } from "./schema-resources";
import { makeSimulatorJsClientType, simulatorLiftedFieldsFor } from "./util";
import * as cloud from "../cloud";
import { ToSimulatorOutput } from "../simulator";

/**
 * Simulator implementation of `cloud.Endpoint`
 */
export class Endpoint extends cloud.Endpoint implements ISimulatorResource {
  /** @internal */
  public static _toInflightType(): string {
    return makeSimulatorJsClientType("Endpoint", cloud.Endpoint._methods);
  }

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

  /** @internal */
  public _liftedFields(): Record<string, string> {
    return simulatorLiftedFieldsFor(this);
  }
}
