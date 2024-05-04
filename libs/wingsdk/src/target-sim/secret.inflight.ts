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

  constructor(props: SecretSchema) {
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

    const secretValue = process.env[this.name];

    if (!secretValue) {
      throw new Error(
        `No value for secret ${this.name}\n(hint: try running the "wing secrets -t TARGET" to store secret)`
      );
    }

    return secretValue;
  }

  public async valueJson(): Promise<Json> {
    return JSON.parse(await this.value());
  }
}
