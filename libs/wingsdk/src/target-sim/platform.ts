import { App } from "./app";
import { IPlatform } from "../platform";
import fs from "fs";

/**
 * Sim Platform
 */
export class Platform implements IPlatform {
  /** Platform model */
  public readonly target = "sim";

  public newApp(appProps: any): any {
    return new App(appProps);
  }

  public async storeSecrets(secrets: { [key: string]: string }): Promise<string> {
    let existingSecretsContent = "";
    try {
      existingSecretsContent = fs.readFileSync('./.env', 'utf8');
    } catch (error) {}
  
    const existingSecrets = existingSecretsContent.split('\n')
      .filter(line => line.trim() !== '')
      .reduce((s, line) => {
        const [key, value] = line.split('=', 2);
        s[key] = value;
        return s;
      }, {} as { [key: string]: string });
  
    for (const key in secrets) {
      existingSecrets[key] = secrets[key];
    }
  
    const updatedContent = Object.entries(existingSecrets)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    fs.writeFileSync('./.env', updatedContent);
    
    return "Secrets created/updated for sim platform";
  }
}
