import { ILoggerClient } from "../cloud";

export class LoggerClient implements ILoggerClient {
  constructor() {}

  public print(message: string): void {
    console.log(message);
  }
}
