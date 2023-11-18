import { Domain } from "./domain";
import { ReactAppOptions } from "../ex";

/**
 * Options for AWS `ReactApp`.
 */
export interface AwsReactAppProps extends ReactAppOptions {
  /**
   * The website's custom domain object.
   * @default - undefined
   */
  readonly domain?: Domain;
}
