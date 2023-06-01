import {
  createConnection,
  InitializeParams,
  TextDocumentSyncKind,
  InitializeResult,
  DiagnosticSeverity,
} from "vscode-languageserver/node";

import * as wingCompiler from "../wingc";

export async function run_server() {
  let wingc = await wingCompiler.load({
    imports: {
      env: {
        send_notification,
      },
    },
  });
  let badState = false;

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
            send_notification,
          },
        },
      });
      badState = false;
    }

    callWing("wingc_on_did_open_text_document", params);
  });
  connection.onDidChangeTextDocument(async (params) => {
    if (badState) {
      wingc = await wingCompiler.load({
        imports: {
          env: {
            send_notification,
          },
        },
      });
      badState = false;
    }

    callWing("wingc_on_did_change_text_document", params);
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

  /**
   * This function is called by the WASM code to immediately
   * send a notification to the client.
   */
  function send_notification(
    type_ptr: number,
    type_len: number,
    data_ptr: number,
    data_len: number
  ) {
    const type_buf = Buffer.from(
      (wingc.exports.memory as WebAssembly.Memory).buffer,
      type_ptr,
      type_len
    );
    const type_str = new TextDecoder().decode(type_buf);

    const data_buf = Buffer.from(
      (wingc.exports.memory as WebAssembly.Memory).buffer,
      data_ptr,
      data_len
    );
    const data_str = new TextDecoder().decode(data_buf);

    // purposely not awaiting this, notifications are fire-and-forget
    void connection.sendNotification(type_str, JSON.parse(data_str));
  }

  connection.listen();
}
