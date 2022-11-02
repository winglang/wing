import { IConstruct } from "constructs";
import { BaseResourceSchema } from "./schema";

/**
 * Fields shared by all resource implementations for the simulator.
 */
export interface IResource extends IConstruct {
  /** @internal */
  _addCallers(...callers: string[]): void;
  /** @internal */
  _toResourceSchema(): BaseResourceSchema;
}

export function isResource(obj: any): obj is IResource {
  return (
    typeof obj == "object" &&
    typeof (obj as IResource)._toResourceSchema === "function"
  );
}
