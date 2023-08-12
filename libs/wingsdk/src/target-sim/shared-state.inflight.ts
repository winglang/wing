import { SharedStateAttributes, SharedStateSchema } from "./schema-resources";
import { ISharedStateClient } from "../std";
import { ISimulatorContext, ISimulatorResourceInstance } from "../testing";

export class SharedState
  implements ISharedStateClient, ISimulatorResourceInstance
{
  private value: any;
  private readonly context: ISimulatorContext;

  public constructor(
    props: SharedStateSchema["props"],
    context: ISimulatorContext
  ) {
    this.value = props.initialValue;
    this.context = context;
  }

  public async init(): Promise<SharedStateAttributes> {
    return {};
  }

  public async cleanup(): Promise<void> {
    return;
  }

  public async get(): Promise<any> {
    return this.context.withTrace({
      message: `Get.`,
      activity: async () => {
        return this.value;
      },
    });
  }

  public async set(value: any): Promise<void> {
    return this.context.withTrace({
      message: `Set.`,
      activity: async () => {
        this.value = value;
      },
    });
  }
}
