import { OnDeployAttributes, OnDeploySchema } from "./schema-resources";
import { IFunctionClient, IOnDeployClient } from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../simulator/simulator";

export class OnDeploy implements IOnDeployClient, ISimulatorResourceInstance {
  private functionHandle: string;
  private readonly context: ISimulatorContext;

  public constructor(
    props: OnDeploySchema["props"],
    context: ISimulatorContext,
  ) {
    this.functionHandle = props.functionHandle;
    this.context = context;
  }

  public async init(): Promise<OnDeployAttributes> {
    const functionClient = this.context.findInstance(
      this.functionHandle,
    ) as IFunctionClient & ISimulatorResourceInstance;
    await this.context.withTrace({
      message: "OnDeploy invoked.",
      activity: async () => {
        return functionClient.invoke();
      },
    });
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async save(): Promise<void> {}
}
