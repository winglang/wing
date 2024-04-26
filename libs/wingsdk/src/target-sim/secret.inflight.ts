import * as fs from "fs";
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
  private readonly name: string;
  private readonly secretValue: string;

  constructor(props: SecretSchema) {
    if (!fs.existsSync(props.secretFile)) {
      throw new Error(
        `No secrets file found at ${props.secretFile} while looking for secret ${props.name}`
      );
    }

    // TODO: Reading the secrets file is just a work around until https://github.com/winglang/wing/issues/6346 is resolved
    // Ideally we should be able to read the secrets from the environment, however at .env files are only loaded in when
    // compiling from source code directory
    const secrets = fs
      .readFileSync(props.secretFile, "utf-8")
      .split("\n")
      .filter((line) => line.trim() !== "")
      .reduce((s, line) => {
        const [key, value] = line.split("=", 2).map((v) => v.trim());
        s[key] = value;
        return s;
      }, {} as { [key: string]: string });

    this.name = props.name;
    this.secretValue = secrets[this.name];
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

    if (!this.secretValue) {
      throw new Error(`No secret value for secret ${this.name}`);
    }

    return this.secretValue;
  }

  public async valueJson(): Promise<Json> {
    return JSON.parse(await this.value());
  }
}
