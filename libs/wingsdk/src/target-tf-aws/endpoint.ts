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
  constructor(
    scope: Construct,
    id: string,
    url: string,
    props: cloud.EndpointProps = {},
  ) {
    super(scope, id, url, props);

    new TerraformOutput(this, "Url", {
      value: this.url,
    });
  }

  /** @internal */
  public onLift(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("endpoints can only be bound by tfaws.Function for now");
    }

    host.addEnvironment(this.urlEnvName(), this.url);

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "EndpointClient",
      [`process.env["${this.urlEnvName()}"]`],
    );
  }

  private urlEnvName(): string {
    return ResourceNames.generateName(this, {
      disallowedRegex: /[^a-zA-Z0-9_]/,
      sep: "_",
      case: CaseConventions.UPPERCASE,
    });
  }
}
