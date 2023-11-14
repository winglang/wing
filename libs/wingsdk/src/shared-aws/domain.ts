import { Construct } from "constructs";
import * as cloud from "../cloud";
import { NotImplementedError } from "../core/errors";
import { getPlatformSpecificValues } from "../util/platform-specific";

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

    const values = getPlatformSpecificValues(
      this,
      "iamCertificate||acmCertificateArn",
      "hostedZoneId"
    );

    this._iamCertificate = values.iamCertificate;
    this._hostedZoneId = values.hostedZoneId;
    this._acmCertificateArn = values.acmCertificateArn;
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
