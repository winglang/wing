import { Construct } from "constructs";
import * as cloud from "../cloud";
import { NotImplementedError } from "../core/errors";
import { PlatformParameter } from "../platform";
import { App } from "../core";

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

    const registrar = App.of(scope).platformParameterRegistrar;

    const iamCertificate = new PlatformParameter(registrar, `${this.node.addr.slice(-8)}IAMCertificate`, {
      path: `${this.node.path}/iamCertificate`,
    })

    const acmCertificateArn = new PlatformParameter(registrar, `${this.node.addr.slice(-8)}ACMCertificateArn`, {
      path: `${this.node.path}/acmCertificateArn`,
    })

    registrar.addOrDependency([iamCertificate, acmCertificateArn]);

    const hostedZoneId = new PlatformParameter(registrar, `${this.node.addr.slice(-8)}HostedZoneId`, {
      path: `${this.node.path}/hostedZoneId`,
      required: true,
    })

    this._iamCertificate = iamCertificate.value;
    this._hostedZoneId = hostedZoneId.value;
    this._acmCertificateArn = acmCertificateArn.value;
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
