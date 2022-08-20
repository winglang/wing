import { IPolyconFactory } from "@monadahq/polycons";
import { IConstruct } from "constructs";
import { BUCKET_ID, FUNCTION_ID, QUEUE_ID } from "../cloud";
import { Bucket } from "./bucket";
import { Function } from "./function";
import { Queue } from "./queue";

export class PolyconFactory implements IPolyconFactory {
  public resolve(
    polyconId: string,
    scope: IConstruct,
    id: string,
    props?: any
  ): IConstruct {
    switch (polyconId) {
      case BUCKET_ID:
        return new Bucket(scope, id, props);
      case FUNCTION_ID:
        return new Function(scope, id, props);
      case QUEUE_ID:
        return new Queue(scope, id, props);
      default:
        throw new Error(`Type ${polyconId} not implemented.`);
    }
  }
}
