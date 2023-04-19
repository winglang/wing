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
  private readonly secretValue: string;
  private readonly context: ISimulatorContext;

  constructor(props: SecretSchema["props"], context: ISimulatorContext) {
    this.context = context;
    this.secretValue = props.secretValue;
  }

  public async init(): Promise<SecretAttributes> {
    return {};
  }

  public async cleanup(): Promise<void> {}

  async value(): Promise<string> {
    this.context.addTrace({
      data: {
        message: "Get value",
      },
      sourcePath: this.context.resourcePath,
      sourceType: SECRET_TYPE,
      type: TraceType.RESOURCE,
      timestamp: new Date().toISOString(),
    });
    return this.secretValue;
  }

  async valueJson(): Promise<Json> {
    return JSON.parse(await this.value());
  }
}
