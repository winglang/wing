import {
  createConnection,
  InitializeParams,
  TextDocumentSyncKind,
  InitializeResult,
  DiagnosticSeverity,
  Diagnostic,
  Range,
} from "vscode-languageserver/node";

import * as wingCompiler from "../wingc";

export async function run_server() {
  let wingc = await wingCompiler.load({
    imports: {
      env: {
        new_diagnostic
      },
    },
  });
  let badState = false;

  const raw_diagnostics: wingCompiler.WingDiagnostic[] = [];

  function new_diagnostic(
    data_ptr: number,
    data_len: number
  ) {
    const data_buf = Buffer.from(
      (wingc.exports.memory as WebAssembly.Memory).buffer,
      data_ptr,
      data_len
    );
    const data_str = new TextDecoder().decode(data_buf);
    raw_diagnostics.push(JSON.parse(data_str));
  }

  const callWing = (func: wingCompiler.WingCompilerFunction, args: any): any | null => {
    if (badState) {
      return null;
    }

    try {
      const result = wingCompiler.invoke(wingc, func, JSON.stringify(args));
      if (typeof result === "number") {
        if (result === 0) {
          return null;
        } else {
          return result;
        }
      } else {
        return JSON.parse(result);
      }
    } catch (e) {
      // set status in ide
      connection.sendDiagnostics({
        uri: args.textDocument.uri,
        diagnostics: [
          {
            severity: DiagnosticSeverity.Error,
            message: `Wing language server crashed and will resume when changes are made. See logs for details.`,
            source: "Wing",
            range: {
              start: {
                line: 0,
                character: 0,
              },
              end: {
                line: 0,
                character: 0,
              },
            },
          },
        ],
      });

      badState = true;
      return null;
    }
  };

  let connection = createConnection(process.stdin, process.stdout);
  connection.onInitialize((_params: InitializeParams) => {
    const result: InitializeResult = {
      capabilities: {
        textDocumentSync: TextDocumentSyncKind.Full,
        completionProvider: {
          triggerCharacters: ["."],
        },
        signatureHelpProvider: {
          triggerCharacters: ["(", ",", ")"],
        },
        hoverProvider: true,
        documentSymbolProvider: true,
        definitionProvider: true,
      },
    };
    return result;
  });

  connection.onDidOpenTextDocument(async (params) => {
    if (badState) {
      wingc = await wingCompiler.load({
        imports: {
          env: {
            new_diagnostic,
          },
        },
      });
      badState = false;
    }
    raw_diagnostics.length = 0;
    callWing("wingc_on_did_open_text_document", params);
    // purposely not awaiting this, notifications are fire-and-forget
    void connection.sendDiagnostics({
      uri: params.textDocument.uri,
      diagnostics: raw_diagnostics.map((rd) => {
        return Diagnostic.create(Range.create(rd.span.start.line, rd.span.start.col, rd.span.end.line, rd.span.end.col), rd.message)
      })
    });
  });
  connection.onDidChangeTextDocument(async (params) => {
    if (badState) {
      wingc = await wingCompiler.load({
        imports: {
          env: {
            new_diagnostic,
          },
        },
      });
      badState = false;
    }

    raw_diagnostics.length = 0;
    callWing("wingc_on_did_change_text_document", params);
    // purposely not awaiting this, notifications are fire-and-forget
    void connection.sendDiagnostics({
      uri: params.textDocument.uri,
      diagnostics: raw_diagnostics.map((rd) => {
        return Diagnostic.create(Range.create(rd.span.start.line, rd.span.start.col, rd.span.end.line, rd.span.end.col), rd.message)
      })
    });
  });
  connection.onCompletion(async (params) => {
    return callWing("wingc_on_completion", params);
  });
  connection.onSignatureHelp(async (params) => {
    return callWing("wingc_on_signature_help", params);
  });
  connection.onDefinition(async (params) => {
    return callWing("wingc_on_goto_definition", params);
  });
  connection.onDocumentSymbol(async (params) => {
    return callWing("wingc_on_document_symbol", params);
  });
  connection.onHover(async (params) => {
    return callWing("wingc_on_hover", params);
  });

  connection.listen();
}
