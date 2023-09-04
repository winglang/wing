import { Domain } from "./domain";

/**
 * Options for AWS `Website`.
 */
export interface AwsWebsiteProps {
  /**
   * Local path to the website's static files, relative to the Wing source file or absolute.
   * @example "./dist"
   */
  readonly path: string;

  /**
   * The website's custom domain object.
   * @default - undefined
   */
  readonly domain?: Domain;
}
