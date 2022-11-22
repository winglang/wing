import { IPolyconFactory } from "@winglang/polycons";
import { IConstruct } from "constructs";
import * as cloud from "../cloud";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { Function } from "./function";
import { Logger } from "./logger";
import { Queue } from "./queue";

/**
 * Polycon factory which resolves polycons in `cloud` into preflight resources
 * for the simulator target.
 */
export class PolyconFactory implements IPolyconFactory {
  resolve(
    polyconId: string,
    scope: IConstruct,
    id: string,
    ...args: any[]
  ): IConstruct {
    switch (polyconId) {
      case cloud.BUCKET_TYPE:
        return new Bucket(scope, id, args[0]);
      case cloud.FUNCTION_TYPE:
        return new Function(scope, id, args[0], args[1]);
      case cloud.QUEUE_TYPE:
        return new Queue(scope, id, args[0]);
      case cloud.LOGGER_TYPE:
        return new Logger(scope, id);
      case cloud.COUNTER_TYPE:
        return new Counter(scope, id, args[0]);
      default:
        throw new Error(`Type ${polyconId} not implemented.`);
    }
  }
}
