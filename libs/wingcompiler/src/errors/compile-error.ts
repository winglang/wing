import { WingDiagnostic } from "../wingc";

export class CompileError extends Error {
  constructor(public readonly diagnostics: WingDiagnostic[]) {
    super("comliation error");
  }
}
