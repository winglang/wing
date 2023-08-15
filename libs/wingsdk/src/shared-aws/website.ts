import * as cloud from "../cloud";

/**
 * Options for AWS `Website`.
 */
export interface AwsWebsiteProps extends cloud.WebsiteProps {
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
