import * as wingCompiler from "@winglang/compiler";
import {
  createConnection,
  InitializeParams,
  TextDocumentSyncKind,
  InitializeResult,
  DiagnosticSeverity,
  Diagnostic,
  Range,
  DocumentUri,
  Location,
} from "vscode-languageserver/node";

export async function lsp() {
  let wingc = await wingCompiler.load({
    imports: {
      env: {
        send_diagnostic,
      },
    },
  });
  let badState = false;

  const seenFiles = new Set<DocumentUri>();

  const raw_diagnostics: wingCompiler.WingDiagnostic[] = [];

  function send_diagnostic(data_ptr: number, data_len: number) {
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
      void connection.sendDiagnostics({
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
          triggerCharacters: [".", ":"],
        },
        signatureHelpProvider: {
          triggerCharacters: ["(", ",", ")"],
        },
        codeActionProvider: true,
        hoverProvider: true,
        documentSymbolProvider: true,
        definitionProvider: true,
      },
    };
    return result;
  });

  async function handle_event_and_update_diagnostics(
    wingc_handler_name: wingCompiler.WingCompilerFunction,
    params: any,
    _uri: DocumentUri
  ) {
    if (badState) {
      wingc = await wingCompiler.load({
        imports: {
          env: {
            send_diagnostic,
          },
        },
      });
      badState = false;
    }
    // Reset diagnostics list
    raw_diagnostics.length = 0;
    // Call wingc handler
    callWing(wingc_handler_name, params);

    const allDiagnostics = new Map<DocumentUri, Diagnostic[]>();

    // set empty list of diagnostics for files that have been seen before
    // this way even if we don't get a diagnostic for a file, we clear out the old ones
    for (const uri of seenFiles) {
      allDiagnostics.set(uri, []);
    }

    for (const rd of raw_diagnostics) {
      if (rd.span) {
        const diagnosticUri = "file://" + rd.span.file_id;
        const diag = Diagnostic.create(
          Range.create(rd.span.start.line, rd.span.start.col, rd.span.end.line, rd.span.end.col),
          `${rd.message}\n${rd.hints.map((hint) => `hint: ${hint}`).join("\n")}`,
          undefined,
          undefined,
          undefined,
          rd.annotations.map((a) => ({
            location: Location.create(
              "file://" + a.span.file_id,
              Range.create(a.span.start.line, a.span.start.col, a.span.end.line, a.span.end.col)
            ),
            message: a.message,
          }))
        );

        // Add annotations as notes hinting back to the original diagnostic
        const extraNotes = rd.annotations.map((a) =>
          Diagnostic.create(
            Range.create(a.span.start.line, a.span.start.col, a.span.end.line, a.span.end.col),
            a.message,
            DiagnosticSeverity.Hint,
            undefined,
            undefined,
            [
              {
                location: Location.create(diagnosticUri, diag.range),
                message: `(source) ${diag.message}`,
              },
            ]
          )
        );

        if (!allDiagnostics.has(diagnosticUri)) {
          allDiagnostics.set(diagnosticUri, []);
          seenFiles.add(diagnosticUri);
        }
        allDiagnostics.get(diagnosticUri)!.push(diag, ...extraNotes);
      } else {
        // skip if diagnostic is not associated with any file
      }
    }

    // purposely not awaiting these calls, notifications are fire-and-forget
    for (const [uri, diagnostics] of allDiagnostics.entries()) {
      void connection.sendDiagnostics({ uri, diagnostics });
    }
  }

  connection.onDidOpenTextDocument(async (params) => {
    void handle_event_and_update_diagnostics(
      "wingc_on_did_open_text_document",
      params,
      params.textDocument.uri
    );
  });
  connection.onDidChangeTextDocument(async (params) => {
    void handle_event_and_update_diagnostics(
      "wingc_on_did_change_text_document",
      params,
      params.textDocument.uri
    );
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
  connection.onCodeAction(async (params) => {
    return callWing("wingc_on_code_action", params);
  });

  connection.listen();
}
