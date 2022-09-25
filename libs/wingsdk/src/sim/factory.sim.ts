import * as cloud from "../cloud";
import type { ISimulatorFactory } from "../testing";
import { init as initBucket } from "./bucket.sim";
import { init as initFunction } from "./function.sim";
import { init as initQueue } from "./queue.sim";

export class DefaultSimulatorFactory implements ISimulatorFactory {
  async resolve(polyconId: string, props: any): Promise<any> {
    switch (polyconId) {
      case cloud.BUCKET_ID:
        return initBucket(props);
      case cloud.FUNCTION_ID:
        return initFunction(props);
      case cloud.QUEUE_ID:
        return initQueue(props);
      default:
        throw new Error(`Type ${polyconId} not implemented.`);
    }
  }
}
