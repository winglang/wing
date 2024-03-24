import { Construct } from "constructs";
import { Resource } from "./resource";

export class Bundler extends Resource {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }
}
