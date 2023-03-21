import { Api } from "./api.inflight";
import { Bucket } from "./bucket.inflight";
import { Counter } from "./counter.inflight";
import { Function } from "./function.inflight";
import { Logger } from "./logger.inflight";
import { Queue } from "./queue.inflight";
import { ISimulatorResourceInstance } from "./resource";
import {
  API_TYPE,
  BUCKET_TYPE,
  COUNTER_TYPE,
  FUNCTION_TYPE,
  LOGGER_TYPE,
  QUEUE_TYPE,
  TABLE_TYPE,
  TOPIC_TYPE,
} from "./schema-resources";
import { Table } from "./table.inflight";
import { Topic } from "./topic.inflight";
import { ISimulatorFactory, ISimulatorContext } from "../testing/simulator";

export class DefaultSimulatorFactory implements ISimulatorFactory {
  /**
   * Creates a new simulator runtime resource
   * @param type type id
   * @param props resource properties
   * @param context simulator context
   * @returns a new instance
   */
  public resolve(
    type: string,
    props: any,
    context: ISimulatorContext
  ): ISimulatorResourceInstance {
    switch (type) {
      case API_TYPE:
        return new Api(props, context);
      case BUCKET_TYPE:
        return new Bucket(props, context);
      case FUNCTION_TYPE:
        return new Function(props, context);
      case QUEUE_TYPE:
        return new Queue(props, context);
      case LOGGER_TYPE:
        return new Logger(props, context);
      case COUNTER_TYPE:
        return new Counter(props, context);
      case TABLE_TYPE:
        return new Table(props, context);
      case TOPIC_TYPE:
        return new Topic(props, context);
      default:
        throw new Error(`Type ${type} not implemented.`);
    }
  }
}
