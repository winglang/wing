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
    props?: any
  ): IConstruct {
    switch (polyconId) {
      case cloud.BUCKET_ID:
        return new Bucket(scope, id, props);
      case cloud.FUNCTION_ID:
        return new Function(scope, id, props);
      default:
        throw new Error(`Type ${polyconId} not implemented.`);
    }
  }
}
