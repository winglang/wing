import { WingDiagnostic } from "../wingc";

export class CompileError extends Error {
  constructor(message: string, public readonly diagnostics: WingDiagnostic[]) {
    super(message);
  }
}
