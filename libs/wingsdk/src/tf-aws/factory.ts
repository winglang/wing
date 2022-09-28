import { IPolyconFactory } from "@monadahq/polycons";
import { IConstruct } from "constructs";
import { BUCKET_ID, FUNCTION_ID, QUEUE_ID } from "../cloud";
import { Bucket } from "./bucket";
import { Function } from "./function";
import { Queue } from "./queue";

/**
 * Polycon factory which resolves `cloud` resources into AWS resources.
 */
export class PolyconFactory implements IPolyconFactory {
  public resolve(
    polyconId: string,
    scope: IConstruct,
    id: string,
    ...args: any[]
  ): IConstruct {
    switch (polyconId) {
      case BUCKET_ID:
        return new Bucket(scope, id, args[0]);
      case FUNCTION_ID:
        return new Function(scope, id, args[0], args[1]);
      case QUEUE_ID:
        return new Queue(scope, id, args[0]);
      default:
        throw new Error(`Type ${polyconId} not implemented.`);
    }
  }
}
