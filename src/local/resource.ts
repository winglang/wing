import type { ResourceSchema } from "@monadahq/wing-local";
import { IConstruct } from "constructs";

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
