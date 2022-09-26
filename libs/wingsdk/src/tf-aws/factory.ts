import { IPolyconFactory } from "@monadahq/polycons";
import { IConstruct } from "constructs";
import { BUCKET_ID, FUNCTION_ID, QUEUE_ID } from "../cloud";
import { Bucket } from "./bucket";
import { Function } from "./function";
import { Queue } from "./queue";

export class PolyconFactory implements IPolyconFactory {
  public resolve(
    type: string,
    scope: IConstruct,
    id: string,
    ...args: any[]
  ): IConstruct {
    switch (type) {
      case BUCKET_ID:
        return new Bucket(scope, id, args[0]);
      case FUNCTION_ID:
        return new Function(scope, id, args[0], args[1]);
      case QUEUE_ID:
        return new Queue(scope, id, args[0]);
      default:
        throw new Error(`Type ${type} not implemented.`);
    }
  }
}
