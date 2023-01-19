import * as util from "util";
import { ILoggerClient } from "../cloud";

export class LoggerClient implements ILoggerClient {
  constructor() {}

  public print(message: string): void {
    // anything console.log'd in a lambda will be logged to cloudwatch
    message;
    process.stdout.write(util.format.apply(this, arguments as any) + "\n");
  }
}
