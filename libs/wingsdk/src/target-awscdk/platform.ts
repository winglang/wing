import { App } from "./app";
import { IPlatform } from "../platform";

/**
 * AWS CDK Platform
 */
export class Platform implements IPlatform {
  /** Platform model */
  public readonly model = "awscdk";

  public newApp?(appProps: any): any {
    return new App(appProps);
  }
}
