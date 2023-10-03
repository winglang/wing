import { exec } from "src/util";

export async function checkNpmVersion(): Promise<string> {
  try {
    return exec("npm --version");
  } catch (e) {
    if (process.env.DEBUG) {
      console.error(e);
    }
    throw new Error(
      `npm is not installed. Install it from https://docs.npmjs.com/downloading-and-installing-node-js-and-npm.`
    );
  }
}
