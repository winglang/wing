import { IConstruct } from "constructs";
import { IPolyconFactory } from "polycons";
import { BUCKET_TYPE } from "../cloud";
import { Bucket } from "./bucket";

export class PolyconFactory implements IPolyconFactory {
  public resolve(
    type: string,
    scope: IConstruct,
    id: string,
    ...args: any[]
  ): IConstruct {
    switch (type) {
      case BUCKET_TYPE:
        // TODO
        return new Bucket(scope, id, args[0]);
      default:
        throw new Error(`Type ${type} not implemented.`);
    }
  }
}
