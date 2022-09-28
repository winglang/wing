import { IConstruct } from "constructs";
import { ResourceSchema } from "./schema";

/**
 * Fields shared by all resource implementations for the simulator.
 */
export interface IResource extends IConstruct {
  /** @internal */
  _toResourceSchema(): ResourceSchema;
}

export function isResource(obj: any): obj is IResource {
  return (
    typeof obj == "object" &&
    typeof (obj as IResource)._toResourceSchema === "function"
  );
}
