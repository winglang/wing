import fs from "fs";
import path from "path";
import { cwd } from "process";
import { PlatformManager, SECRETS_FILE_NAME } from "@winglang/sdk/lib/platform";
import inquirer from "inquirer";
import { CompileOptions, compile } from "./compile";

export interface SecretsOptions extends CompileOptions {
  readonly list?: boolean;
}

export async function secrets(entrypoint?: string, options?: SecretsOptions): Promise<void> {
  // Compile the program to generate secrets file
  const outdir = await compile(entrypoint, options);
  const secretsFile = path.join(outdir, SECRETS_FILE_NAME);

  let secretNames = fs.existsSync(secretsFile)
    ? JSON.parse(fs.readFileSync(secretsFile, "utf-8"))
    : [];

  process.env.WING_SOURCE_DIR = cwd();

  let secretValues: Record<string, string> = {};
  console.log(`${secretNames.length} secret(s) found\n`);

  if (options?.list) {
    console.log("- " + secretNames.join("\n- "));
    return;
  }

  if (secretNames.length === 0) {
    return;
  }

  for (const secret of secretNames) {
    const response = await inquirer.prompt([
      {
        type: "password",
        name: "value",
        message: `Enter the secret value for ${secret}:`,
      },
    ]);
    secretValues[secret] = response.value;
  }

  const plaformManager = new PlatformManager({ platformPaths: options?.platform });
  await plaformManager.storeSecrets(secretValues);
}
