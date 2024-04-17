import { OnDeployAttributes, OnDeploySchema } from "./schema-resources";
import { IFunctionClient, IOnDeployClient } from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator/simulator";

export class OnDeploy implements IOnDeployClient, ISimulatorResourceInstance {
  private functionHandle: string;

  public constructor(props: OnDeploySchema) {
    this.functionHandle = props.functionHandle;
  }

  public async init(context: ISimulatorContext): Promise<OnDeployAttributes> {
    const functionClient = context.getClient(
      this.functionHandle,
      true
    ) as IFunctionClient;
    await context.withTrace({
      message: "OnDeploy invoked.",
      activity: async () => {
        return functionClient.invoke();
      },
    });
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async save(): Promise<void> {}

  public async plan() {
    // OnDeploy runs on every deployment, so always replace
    return UpdatePlan.REPLACE;
  }
}
