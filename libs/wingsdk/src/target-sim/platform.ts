import fs from "fs";
import { join } from "path";
import { App } from "./app";
import { IPlatform } from "../platform";

/**
 * Sim Platform
 */
export class Platform implements IPlatform {
  /** Platform model */
  public readonly target = "sim";

  public newApp(appProps: any): any {
    return new App(appProps);
  }

  public async storeSecrets(secrets: Record<string, string>): Promise<void> {
    let existingSecretsContent = "";
    const envFile = join(process.env.WING_SOURCE_DIR!, ".env");

    try {
      existingSecretsContent = fs.readFileSync(envFile, "utf8");
    } catch (error) {}

    const existingSecrets = existingSecretsContent
      .split("\n")
      .filter((line) => line.trim() !== "")
      .reduce((s, line) => {
        const [key, value] = line.split("=", 2);
        s[key] = value;
        return s;
      }, {} as { [key: string]: string });

    for (const key in secrets) {
      existingSecrets[key] = secrets[key];
    }

    const updatedContent = Object.entries(existingSecrets)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    fs.writeFileSync(envFile, updatedContent);

    console.log(`${Object.keys(secrets).length} secret(s) stored in .env`);
  }
}
