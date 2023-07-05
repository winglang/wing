import { execFile } from "child_process";

export interface Data {
  [key: string]: any;
}

export abstract class Collector {
  abstract canCollect(): Promise<boolean>;
  abstract collect(): Promise<Data>;

  async runCommand(cmd: string, args: string[]): Promise<any> {
    try {
      const raw = await new Promise((resolve, reject) => {
        execFile(cmd, args, (error, stdout, stderr) => {
          if (error) {
            stderr;
            reject(error);
          }
          resolve(stdout);
        });
      });
      return raw;
    } catch (error) {
      // We dont want this to cause any issues for users if something failed
      // so we just return an empty string
      return "";
    }
  }
}