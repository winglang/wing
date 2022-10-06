import { IPolyconFactory } from "@monadahq/polycons";
import { IConstruct } from "constructs";
import * as cloud from "../cloud";
import { Bucket } from "./bucket";
import { Function } from "./function";
import { Queue } from "./queue";

/**
 * Polycon factory which resolves cloud resources into AWS resources.
 */
export class PolyconFactory implements IPolyconFactory {
  public resolve(
    type: string,
    scope: IConstruct,
    id: string,
    ...args: any[]
  ): IConstruct {
    switch (type) {
      case cloud.Bucket.TYPE:
        return new Bucket(scope, id, args[0]);
      case cloud.Function.TYPE:
        return new Function(scope, id, args[0], args[1]);
      case cloud.Queue.TYPE:
        return new Queue(scope, id, args[0]);
      default:
        throw new Error(`Type ${type} not implemented.`);
    }
  }
}
