import { core } from "..";
import { cloud } from "..";
import { CaseConventions } from "../shared/resource-names";
import { IInflightHost } from "../std";
import { ResourceNames } from "../shared/resource-names";

/**
 * AWS implementation of `cloud.Endpoint`.
 */
export class Endpoint extends cloud.Endpoint {
  /** @internal */
  public static _toInflightType(): string {
    return core.InflightClient.forType(
      __filename.replace("endpoint", "endpoint.inflight"),
      "EndpointClient"
    );
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
