import { IPolyconFactory } from "@monadahq/polycons";
import { IConstruct } from "constructs";
import * as cloud from "../cloud";
import { Bucket } from "./bucket";
import { Function } from "./function";

export class PolyconFactory implements IPolyconFactory {
  resolve(
    polyconId: string,
    scope: IConstruct,
    id: string,
    ...args: any[]
  ): IConstruct {
    switch (polyconId) {
      case cloud.BUCKET_ID:
        return new Bucket(scope, id, args[0]);
      case cloud.FUNCTION_ID:
        return new Function(scope, id, args[0], args[1]);
      default:
        throw new Error(`Type ${polyconId} not implemented.`);
    }
  }
}
