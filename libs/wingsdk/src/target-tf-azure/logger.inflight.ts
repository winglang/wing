import * as util from "util";
import { ILoggerClient } from "../cloud";

export class LoggerClient implements ILoggerClient {
  constructor() {}

  public log(message: string): void {
    message;
    process.stdout.write(util.format.apply(this, arguments as any) + "\n");
  }
}
