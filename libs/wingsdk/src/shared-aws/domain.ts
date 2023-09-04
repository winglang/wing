import { Construct } from "constructs";
import { core } from "..";
import * as cloud from "../cloud";
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

    const iamCertificate = getPlatformSpecificValues(
      this.node.path,
      "iamCertificate"
    );
    const acmCertificateArn = getPlatformSpecificValues(
      this.node.path,
      "acmCertificateArn"
    );
    const hostedZoneId = getPlatformSpecificValues(
      this.node.path,
      "hostedZoneId"
    );

    if (!iamCertificate && !acmCertificateArn && !hostedZoneId) {
      throw new Error(
        `'iamCertificate' or 'acmCertificateArn' is missing from ${this.node.path}
ERROR: 'hostedZoneId' is missing from ${this.node.path}

These are required properties of platform-specific types. You can set these values
either through '- v | --value' switches or '--values' file.
        `
      );
    } else if (!iamCertificate && !acmCertificateArn) {
      throw new Error(
        `'iamCertificate' or 'acmCertificateArn' is missing from ${this.node.path}

These are required properties of platform-specific types. You can set these values
either through '- v | --value' switches or '--values' file.
        `
      );
    } else if (!hostedZoneId) {
      throw new Error(
        `'hostedZoneId' is missing from ${this.node.path}

These are required properties of platform-specific types. You can set these values
either through '- v | --value' switches or '--values' file.
        `
      );
    } else if (iamCertificate && hostedZoneId) {
      this._iamCertificate = iamCertificate;
      this._hostedZoneId = hostedZoneId;
    } else if (acmCertificateArn && hostedZoneId) {
      this._acmCertificateArn = acmCertificateArn;
      this._hostedZoneId = hostedZoneId;
    }
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
    return core.InflightClient.for(__dirname, __filename, "DomainClient", []);
  }
}
