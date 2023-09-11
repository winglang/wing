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

    const values = getPlatformSpecificValues(
      this.node.path,
      "iamCertificate",
      "acmCertificateArn",
      "hostedZoneId"
    );

    let errors: Array<String> = new Array<String>();
    if (
      !values ||
      (values &&
        !values.iamCertificate &&
        !values.acmCertificateArn &&
        !values.hostedZoneId)
    ) {
      errors.push(
        `\n  - 'iamCertificate' or 'acmCertificateArn' is missing from ${this.node.path}`
      );
      errors.push(`  - 'hostedZoneId' is missing from ${this.node.path}`);
    } else if (!values.iamCertificate && !values.acmCertificateArn) {
      errors.push(
        `\n  - 'iamCertificate' or 'acmCertificateArn' is missing from ${this.node.path}`
      );
    } else if (!values.hostedZoneId) {
      errors.push(`\n  - 'hostedZoneId' is missing from ${this.node.path}`);
    } else if (values.iamCertificate && values.hostedZoneId) {
      this._iamCertificate = values.iamCertificate;
      this._hostedZoneId = values.hostedZoneId;
    } else if (values.acmCertificateArn && values.hostedZoneId) {
      this._acmCertificateArn = values.acmCertificateArn;
      this._hostedZoneId = values.hostedZoneId;
    }

    if (errors.length > 0) {
      errors.push(
        "\nThese are required properties of platform-specific types. You can set these values"
      );
      errors.push(
        `either through '- v | --value' switches or '--values' file.`
      );
      throw new Error(errors.join("\n"));
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
