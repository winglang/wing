import * as cloud from "../cloud";
import { ISimulatorFactory } from "../testing/simulator";
import { init as initBucket, cleanup as cleanupBucket } from "./bucket.sim";
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

  async cleanup(type: string, attrs: any): Promise<void> {
    switch (type) {
      case cloud.BUCKET_ID:
        await cleanupBucket(attrs);
        return;
      case cloud.FUNCTION_ID:
        await cleanupFunction(attrs);
        return;
      case cloud.QUEUE_ID:
        await cleanupQueue(attrs);
        return;
      default:
        throw new Error(`Type ${type} not implemented.`);
    }
  }
}
