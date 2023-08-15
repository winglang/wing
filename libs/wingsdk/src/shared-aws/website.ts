import * as cloud from "../cloud";

/**
 * Options for AWS `Website`.
 */
export interface AwsWebsiteProps extends cloud.WebsiteProps {
  /**
   * AWS Certificate Manager (ACM) certificate arn
   */
  readonly acmCertificateArn?: string;
  /**
   * IAM certificate identifier
   */
  readonly iamCertificate?: string;
  /**
   * Id of the Route 53 hosted zone
   */
  readonly hostedZoneId?: string;
}