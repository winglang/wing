import { ILoggerClient } from "./logger";

export class LoggerClient implements ILoggerClient {
  constructor() {}

  public async print(message: string): Promise<void> {
    // anything console.log'd in a lambda will be logged to cloudwatch
    console.log(message);
  }
}
