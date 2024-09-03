import { TerraformOutput } from "cdktf";
import { Construct } from "constructs";
import { core } from "..";
import * as cloud from "../cloud";
import { CaseConventions, ResourceNames } from "../shared/resource-names";
import { IInflightHost } from "../std";

/**
 * AWS implementation of `cloud.Endpoint`.
 */
export class Endpoint extends cloud.Endpoint {
  /** @internal */
  public static _toInflightType(): string {
    return core.InflightClient.forType(
      __filename
        .replace("target-tf-aws", "shared-aws")
        .replace("endpoint", "endpoint.inflight"),
      "EndpointClient"
    );
  }

  constructor(
    scope: Construct,
    id: string,
    url: string,
    props: cloud.EndpointProps = {}
  ) {
    super(scope, id, url, props);

    new TerraformOutput(this, "Url", {
      value: this.url,
    });
  }

  /** @internal */
  public onLift(host: IInflightHost, ops: string[]): void {
    host.addEnvironment(this.urlEnvName(), this.url);
    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return {
      $url: `process.env["${this.urlEnvName()}"]`,
    };
  }

  private urlEnvName(): string {
    return ResourceNames.generateName(this, {
      disallowedRegex: /[^a-zA-Z0-9_]/,
      sep: "_",
      case: CaseConventions.UPPERCASE,
    });
  }
}
