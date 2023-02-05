import { IConstruct } from "constructs";
import { IPolyconFactory } from "polycons";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { Function } from "./function";
import { Logger } from "./logger";
import { Queue } from "./queue";
import { Schedule } from "./schedule";
import { Topic } from "./topic";
import {
  BUCKET_TYPE,
  COUNTER_TYPE,
  FUNCTION_TYPE,
  LOGGER_TYPE,
  QUEUE_TYPE,
  TOPIC_TYPE,
  SCHEDULE_TYPE,
} from "../cloud";

/**
 * Polycon factory which resolves polycons in `cloud` into preflight resources
 * for the AWS target.
 */
export class PolyconFactory implements IPolyconFactory {
  public resolve(
    type: string,
    scope: IConstruct,
    id: string,
    ...args: any[]
  ): IConstruct {
    switch (type) {
      case BUCKET_TYPE:
        return new Bucket(scope, id, args[0]);
      case FUNCTION_TYPE:
        return new Function(scope, id, args[0], args[1]);
      case QUEUE_TYPE:
        return new Queue(scope, id, args[0]);
      case LOGGER_TYPE:
        return new Logger(scope, id);
      case COUNTER_TYPE:
        return new Counter(scope, id, args[0]);
      case TOPIC_TYPE:
        return new Topic(scope, id, args[0]);
      case SCHEDULE_TYPE:
        return new Schedule(scope, id, args[0]);
      default:
        throw new Error(`Type ${type} not implemented for tf-aws target.`);
    }
  }
}
