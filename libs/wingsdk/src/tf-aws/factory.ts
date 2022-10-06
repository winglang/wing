import { IPolyconFactory } from "@monadahq/polycons";
import { IConstruct } from "constructs";
import { BUCKET_TYPE, FUNCTION_TYPE, QUEUE_TYPE } from "../cloud";
import { Bucket } from "./bucket";
import { Function } from "./function";
import { Queue } from "./queue";

/**
 * Polycon factory which resolves `cloud` resources into AWS resources.
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
      default:
        throw new Error(`Type ${type} not implemented.`);
    }
  }
}
