import * as cloud from "../cloud";
import { ISimulatorFactory, ISimulatorContext } from "../testing/simulator";
import { Bucket } from "./bucket.sim";
import { Counter } from "./counter.sim";
import { Function } from "./function.sim";
import { Logger } from "./logger.sim";
import { Queue } from "./queue.sim";
import { ISimulatorResource } from "./resource";

export class DefaultSimulatorFactory implements ISimulatorFactory {
  public resolve(
    type: string,
    props: any,
    context: ISimulatorContext
  ): ISimulatorResource {
    switch (type) {
      case cloud.BUCKET_TYPE:
        return new Bucket(props, context);
      case cloud.FUNCTION_TYPE:
        return new Function(props, context);
      case cloud.QUEUE_TYPE:
        return new Queue(props, context);
      case cloud.LOGGER_TYPE:
        return new Logger(props, context);
      case cloud.COUNTER_TYPE:
        return new Counter(props, context);
      default:
        throw new Error(`Type ${type} not implemented.`);
    }
  }
}
