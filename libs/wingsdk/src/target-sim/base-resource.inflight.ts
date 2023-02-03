

import { ISimulatorResourceInstance, ResourceMetadata } from "./resource";

export abstract class BaseResource implements ISimulatorResourceInstance {
  protected metadata: ResourceMetadata | undefined;
  
  public async init(): Promise<void> {
    return;
  }

  public async cleanup(): Promise<void> {
    return;
  }

  public addMetadata(metadata: ResourceMetadata | undefined): void {
    this.metadata = metadata;
  }
}
