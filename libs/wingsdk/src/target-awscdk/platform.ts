import { App } from "./app";
import { IPlatform } from "../platform";

/**
 * AWS CDK Platform
 */
export class AWSCDKPlatform implements IPlatform {
  /** Platform model */
  public readonly model = "awscdk";

  public newApp?(appProps: any): any {
    return new App(appProps);
  }
}

export const Platform = AWSCDKPlatform;
