import * as cloud from "../cloud";
import { ISimulatorFactory } from "../testing/simulator";
import { init as initBucket } from "./bucket.sim";
import {
  init as initFunction,
  cleanup as cleanupFunction,
} from "./function.sim";
import { init as initQueue, cleanup as cleanupQueue } from "./queue.sim";

export class DefaultSimulatorFactory implements ISimulatorFactory {
  async init(type: string, props: any): Promise<any> {
    switch (type) {
      case cloud.BUCKET_ID:
        return initBucket(props);
      case cloud.FUNCTION_ID:
        return initFunction(props);
      case cloud.QUEUE_ID:
        return initQueue(props);
      default:
        throw new Error(`Type ${type} not implemented.`);
    }
  }

  async cleanup(type: string, attributes: any): Promise<void> {
    switch (type) {
      case cloud.BUCKET_ID:
        return;
      case cloud.FUNCTION_ID:
        await cleanupFunction(attributes);
        return;
      case cloud.QUEUE_ID:
        await cleanupQueue(attributes);
        return;
      default:
        throw new Error(`Type ${type} not implemented.`);
    }
  }
}
