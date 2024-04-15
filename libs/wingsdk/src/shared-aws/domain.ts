import { Construct } from "constructs";
import * as cloud from "../cloud";
import { App } from "../core";
import { NotImplementedError } from "../core/errors";

/**
 * AWS implementation of `cloud.Domain`.
 */
export class Domain extends cloud.Domain {
  /** @internal */
  protected _hostedZoneId?: string;
  /** @internal */
  protected _iamCertificate?: string;
  /** @internal */
  protected _acmCertificateArn?: string;

  constructor(scope: Construct, id: string, props: cloud.DomainProps) {
    super(scope, id, props);

    const parameters = App.of(scope).parameters;

    // Domain requires parameters from the user, so we need to add the parameter schemas to the registrar
    let schema = {
      type: "object",
      oneOf: [
        {
          required: ["iamCertificate"],
        },
        {
          required: ["acmCertificateArn"],
        },
      ],
      required: ["hostedZoneId"],
      properties: {
        iamCertificate: {
          type: "string",
        },
        acmCertificateArn: {
          type: "string",
        },
        hostedZoneId: {
          type: "string",
        },
      },
    };

    parameters.addSchemaAtPath(schema, this.node.path, true);

    const iamCertificate = parameters.value(`${this.node.path}/iamCertificate`);
    const acmCertificateArn = parameters.value(
      `${this.node.path}/acmCertificateArn`
    );
    const hostedZoneId = parameters.value(`${this.node.path}/hostedZoneId`);

    this._iamCertificate = iamCertificate;
    this._hostedZoneId = hostedZoneId;
    this._acmCertificateArn = acmCertificateArn;
  }

  /**
   * The hosted zone id value.
   */
  public get hostedZoneId(): string | undefined {
    return this._hostedZoneId;
  }

  /**
   * The AWS Certificate Manager (ACM) certificate arn value.
   */
  public get acmCertificateArn(): string | undefined {
    return this._acmCertificateArn;
  }

  /**
   * The IAM certificate identifier value.
   */
  public get iamCertificate(): string | undefined {
    return this._iamCertificate;
  }

  /** @internal */
  public _toInflight(): string {
    throw new NotImplementedError(
      "Domain inflight client is not implemented yet on this target."
    );
  }
}
