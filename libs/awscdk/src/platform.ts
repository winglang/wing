import { App } from "./app";
import { platform } from "@winglang/sdk";

/**
 * AWS CDK Platform
 */
export class Platform implements platform.IPlatform {
  /** Platform model */
  public readonly target = "awscdk";

  public newApp?(appProps: any): any {
    return new App(appProps);
  }
}
