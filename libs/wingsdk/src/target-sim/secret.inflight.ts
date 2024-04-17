import * as fs from "fs";
import * as path from "path";
import { SecretAttributes, SecretSchema } from "./schema-resources";
import { ISecretClient, SECRET_FQN } from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator/simulator";
import { Json, TraceType } from "../std";

export class Secret implements ISecretClient, ISimulatorResourceInstance {
  private _context: ISimulatorContext | undefined;
  private readonly secretsFile: string;
  private readonly name: string;

  constructor(props: SecretSchema) {
    this.secretsFile = path.join(process.cwd(), ".env");

    if (!fs.existsSync(this.secretsFile)) {
      throw new Error(
        `No secrets file found at ${this.secretsFile} while looking for secret ${props.name}`
      );
    }

    this.name = props.name;
  }

  private get context(): ISimulatorContext {
    if (!this._context) {
      throw new Error("Cannot access context during class construction");
    }
    return this._context;
  }

  public async init(context: ISimulatorContext): Promise<SecretAttributes> {
    this._context = context;
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async save(): Promise<void> {}

  public async plan() {
    return UpdatePlan.AUTO;
  }

  public async value(): Promise<string> {
    this.context.addTrace({
      data: {
        message: "Get value",
      },
      sourcePath: this.context.resourcePath,
      sourceType: SECRET_FQN,
      type: TraceType.RESOURCE,
      timestamp: new Date().toISOString(),
    });

    const secretsContent = fs.readFileSync(this.secretsFile, "utf-8");
    const secrets = this.parseEnvFile(secretsContent);

    if (!secrets[this.name]) {
      throw new Error(`No secret value for secret ${this.name}`);
    }

    return secrets[this.name];
  }

  public async valueJson(): Promise<Json> {
    return JSON.parse(await this.value());
  }

  private parseEnvFile(contents: string): { [key: string]: string } {
    return contents
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#")) // Ignore empty lines and comments
      .reduce((acc, line) => {
        const [key, value] = line.split("=", 2);
        if (key) {
          acc[key.trim()] = value.trim();
        }
        return acc;
      }, {} as { [key: string]: string });
  }
}
