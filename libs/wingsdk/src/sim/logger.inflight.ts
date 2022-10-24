import { ILoggerClient } from "./logger";

export class LoggerClient implements ILoggerClient {
  print(message: string): Promise<void> {
    console.log(message);
    return new Promise((resolve) => resolve());
  }
}
