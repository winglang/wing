import { PlatformManager } from "@winglang/sdk/lib/platform";
import { CompileOptions, compile } from "./compile";
import fs from "fs";
import path from "path";
import { cwd } from "process";
import inquirer from "inquirer";

export interface SecretsOptions extends CompileOptions {}

export async function secrets(entrypoint?: string, options?: SecretsOptions): Promise<void> {
  // Compile the program to generate secrets file
  const outdir = await compile(entrypoint, options);
  const secretsFile = path.join(outdir, "secrets.json");

  let secrets = fs.existsSync(secretsFile) ? JSON.parse(fs.readFileSync(path.join(outdir, "secrets.json"), "utf-8")) : [];

  process.env.WING_SOURCE_DIR = cwd();
  let secretValues: any = {};
  console.log(`${secrets.length} secret(s) found in ${entrypoint}\n`);

  if (secrets.length === 0) {
    return;
  }

  for (const secret of secrets) {
    const response = await inquirer.prompt([
      {
        type: "password",
        name: "value",
        message: `Enter the secret value for ${secret}:`,
      },
    ]);
    secretValues[secret] = response.value;
  }

  const plaformManager = new PlatformManager({platformPaths: options?.platform})
  await plaformManager.storeSecrets(secretValues);
}