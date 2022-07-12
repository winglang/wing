import { Construct } from "constructs";
import { Process } from "../core";

export interface FunctionProps {
  readonly handler: Process;
}

export class Function extends Construct {
  constructor(scope: Construct, id: string, props: FunctionProps) {
    super(scope, id);
    props;
  }
}
