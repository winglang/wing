import { Construct } from "constructs";
import * as cloud from "../cloud";
import { core } from "..";

/**
 * Options for AWS `Domain`.
 */
export interface AwsDomain extends cloud.Domain {
  /**
   * AWS Certificate Manager (ACM) certificate arn
   * @default undefined
   */
  readonly acmCertificateArn?: string;
  /**
   * IAM certificate identifier
   * @default undefined
   */
  readonly iamCertificate?: string;
  /**
   * Id of the Route 53 hosted zone
   * @default undefined
   */
  readonly hostedZoneId?: string;
}

/**
 * Simulator implementation of `cloud.Domain`
 * 
 * @inflight `@winglang/sdk.cloud.IDomainClient`
 */
export class Domain extends cloud.Domain {
  protected _hostedZoneId: string;
  protected _iamCertificate?: string;
  protected _acmCertificateArn?: string;

  constructor(scope: Construct, id: string, props: AwsDomain) {
    super(scope, id, props);

    if (props.hostedZoneId) {
      this._hostedZoneId = props.hostedZoneId;
    } else {
      throw new Error(`ERROR: 'hostedZoneId' is missing from ${id}`);
    }

    if (!props.iamCertificate && !props.acmCertificateArn) {
      throw new Error(`ERROR: 'iamCertificate' or 'acmCertificateArn' is missing from ${id}`);
    } else if (props.iamCertificate) {
      this._iamCertificate = props.iamCertificate;
    } else if (props.acmCertificateArn) {
      this._acmCertificateArn = props.acmCertificateArn;
    }
  }

  /**
   * The hosted zone id value.
   */
  public get hostedZoneId(): string {
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
    return core.InflightClient.for(
      __dirname,
      __filename,
      "DomainClient",
      []
    );
  }
}