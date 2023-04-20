import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import {
  SECRET_TYPE,
  SecretAttributes,
  SecretSchema,
} from "./schema-resources";
import { ISecretClient, TraceType } from "../cloud";
import { Json } from "../std";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../testing/simulator";

export class Secret implements ISecretClient, ISimulatorResourceInstance {
  private readonly context: ISimulatorContext;
  private readonly secretsFile: string;
  private readonly name: string;

  constructor(props: SecretSchema["props"], context: ISimulatorContext) {
    this.context = context;

    this.secretsFile = path.join(os.homedir(), ".wing", "secrets.json");
    if (!fs.existsSync(this.secretsFile)) {
      throw new Error(
        `No secrets file found at ${this.secretsFile} while looking for secret ${props.name}`
      );
    }

    this.name = props.name;
  }

  public async init(): Promise<SecretAttributes> {
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async value(): Promise<string> {
    this.context.addTrace({
      data: {
        message: "Get value",
      },
      sourcePath: this.context.resourcePath,
      sourceType: SECRET_TYPE,
      type: TraceType.RESOURCE,
      timestamp: new Date().toISOString(),
    });

    const secrets = JSON.parse(fs.readFileSync(this.secretsFile, "utf-8"));

    if (!secrets[this.name]) {
      throw new Error(`No secret value for secret ${this.name}`);
    }

    return secrets[this.name];
  }

  public async valueJson(): Promise<Json> {
    return JSON.parse(await this.value());
  }
}
