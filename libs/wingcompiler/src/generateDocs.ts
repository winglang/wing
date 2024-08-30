import { normalPath } from "./util";
import * as wingCompiler from "./wingc";

const WINGC_GENERATE_DOCS = "wingc_generate_docs";

export interface GenerateWingDocsOutput {
  docsContents: string;
  diagnostics: wingCompiler.WingDiagnostic[];
}

export async function generateWingDocs(props: {
  projectDir: string;
  color?: boolean;
  log?: (...args: any[]) => void;
}): Promise<GenerateWingDocsOutput> {
  let env: Record<string, string> = {
    RUST_BACKTRACE: "full",
  };
  if (props.color !== undefined) {
    env.CLICOLOR = props.color ? "1" : "0";
  }

  const wingc = await wingCompiler.load({
    env,
    imports: {
      env: {
        send_diagnostic,
      },
    },
  });

  const diagnostics: wingCompiler.WingDiagnostic[] = [];

  function send_diagnostic(data_ptr: number, data_len: number) {
    const data_buf = Buffer.from(
      (wingc.exports.memory as WebAssembly.Memory).buffer,
      data_ptr,
      data_len
    );
    const data_str = new TextDecoder().decode(data_buf);
    diagnostics.push(JSON.parse(data_str));
  }

  const arg = normalPath(props.projectDir);
  props.log?.(`invoking %s with: "%s"`, WINGC_GENERATE_DOCS, arg);
  let docsContents: string = "";
  const result = wingCompiler.invoke(wingc, WINGC_GENERATE_DOCS, arg);
  if (typeof result === "number") {
    // This is a bug in the compiler, indicate a compilation failure.
    // The bug details should be part of the diagnostics handling below.
  } else {
    docsContents = result;
  }

  return {
    docsContents,
    diagnostics,
  };
}
