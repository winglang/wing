import { IConstruct } from "constructs";
import { IPolyconFactory } from "polycons";
import { BUCKET_TYPE, LOGGER_TYPE } from "../cloud";
import { Bucket } from "./bucket";
import { Logger } from "./logger";

/**
 * Polycon factory which resolves polycons in `cloud` into preflight resources
 * for the Azure target.
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
        throw new Error(`Type ${type} not implemented.`);
    }
  }
}
