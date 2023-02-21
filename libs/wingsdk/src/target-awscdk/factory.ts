import { IConstruct } from "constructs";
import { IPolyconFactory } from "polycons";
import { Bucket } from "./bucket";
import { Logger } from "./logger";
import { BUCKET_TYPE, LOGGER_TYPE } from "../cloud";

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
      case LOGGER_TYPE:
        return new Logger(scope, id);
      default:
        throw new Error(`Type ${type} not implemented for tf-aws target.`);
    }
  }
}
