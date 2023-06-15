import { exec } from "node:child_process";
import util from "node:util";

export const getWingVersion = async (): Promise<string | undefined> => {
  try {
    const { stdout } = await util.promisify(exec)("wing -V");

    return stdout.replace(/(\n)/gm, "");
  } catch {
    return;
  }
};
