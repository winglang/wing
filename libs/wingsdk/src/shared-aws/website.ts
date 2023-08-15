import * as cloud from "../cloud";

/**
 * Options for AWS `Website`.
 */
export interface AwsWebsiteProps extends cloud.WebsiteProps {
  /**
   * AWS Certificate Manager certificate arn
   */
  readonly acmCertificateArn?: string;
  /**
   * IAM certificate identifier of the custom viewer certificate
   */
  readonly iamCertificate?: string;
  readonly hostedZoneId?: string;
}