import { Domain } from "./domain";
import { WebsiteOptions } from "../cloud";

/**
 * Options for AWS `Website`.
 */
export interface AwsWebsiteProps extends WebsiteOptions {
  /**
   * The website's custom domain object.
   * @default - undefined
   */
  readonly domain?: Domain;
}
