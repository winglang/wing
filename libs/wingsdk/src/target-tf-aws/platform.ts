import { App } from "./app";
import { IPlatform } from "../platform";

/**
 * AWS Terraform Platform
 */
export class TFAWSPlatform implements IPlatform {
  /** Platform model */
  public readonly model = "tf-aws";

  public newApp?(appProps: any): any {
    return new App(appProps);
  }
}

export const Platform = TFAWSPlatform;
