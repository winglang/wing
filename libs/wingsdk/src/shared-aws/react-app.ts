import { Domain } from "./domain";
import { ex } from "..";
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

/**
 * A shared interface for AWS react app.
 */
export interface IAwsReactApp {
  /**
   * AWS Bucket arn
   */
  readonly bucketArn: string;

  /**
   * AWS Bucket name
   */
  readonly bucketName: string;
}

/**
 * A helper class for working with AWS react apps.
 */
export class ReactApp {
  /**
   * If the bucket is an AWS Bucket, return a helper interface for
   * working with it.
   * @param react The ex.ReactApp.
   */
  public static from(react: ex.ReactApp): IAwsReactApp | undefined {
    if (this.isAwsReactApp(react)) {
      return react;
    }
    return undefined;
  }

  private static isAwsReactApp(obj: any): obj is IAwsReactApp {
    return (
      typeof obj.bucketArn === "string" && typeof obj.bucketName === "string"
    );
  }
}
