import { IConstruct } from "constructs";
import { ResourceSchema } from "./schema";

export interface IResource extends IConstruct {
  /** @internal */
  _toResourceSchema(): ResourceSchema;
}

export interface ResourceSpec {
  readonly kind: string;
  readonly name: string;
  readonly props: any;
}

export function isResource(obj: any): obj is IResource {
  return (
    typeof obj == "object" &&
    typeof (obj as IResource)._toResourceSchema === "function"
  );
}
