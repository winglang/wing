import { IConstruct } from "constructs";

export interface IApp extends IConstruct {
  readonly outdir: string;
  synth(): void;
}
