import { IResourceClient, IResourceContext } from "./resource";
import { makeSimulatorClient } from "../simulator";

export class Resource implements IResourceClient {
  constructor(handle: string) {
    const simulatorUrl = process.env.WING_SIMULATOR_URL;
    if (!simulatorUrl) {
      throw new Error("Missing environment variable: WING_SIMULATOR_URL");
    }
    return makeSimulatorClient(simulatorUrl, handle);
  }
  public start(_context: IResourceContext): Promise<void> {
    throw new Error("start() can only be called internally by the simulator.");
  }
  public stop(): Promise<void> {
    throw new Error("stop() can only be called internally by the simulator.");
  }
}
