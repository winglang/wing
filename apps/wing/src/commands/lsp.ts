import {
  createConnection,
  InitializeParams,
  TextDocumentSyncKind,
  InitializeResult,
} from "vscode-languageserver/node";

import { loadWingc, wingcInvoke } from "../wingc";

export async function run_server() {
  const wingc = await loadWingc({
    imports: {
      env: {
        send_log: send_log_notification,
        send_diagnostics: send_diagnostics_notification,
      }
    }
  });

  // Create a connection for the server, using stdio as a transport.
  // Also include all preview / proposed LSP features.
  let connection = createConnection(process.stdin, process.stdout);

  connection.onInitialize((_params: InitializeParams) => {
    const result: InitializeResult = {
      capabilities: {
        textDocumentSync: TextDocumentSyncKind.Full,
        completionProvider: {
          resolveProvider: false,
          triggerCharacters: ["."],
        },
      },
    };
    return result;
  });

  // connection.onInitialized(() => {
  //   connection.window.showInformationMessage("Wing language server initialized");
  // });
  connection.onDidOpenTextDocument(async (params) => {
    const string = JSON.stringify(params);
    await wingcInvoke(wingc, "wingc_on_did_open_text_document", string);
  });
  connection.onDidChangeTextDocument(async (params) => {
    const string = JSON.stringify(params);
    await wingcInvoke(wingc, "wingc_on_did_change_text_document", string);
  });
  connection.onCompletion(async (params) => {
    const result = await wingcInvoke(wingc, "wingc_on_completion", JSON.stringify(params));
    return JSON.parse(result) as any;
  });

  function send_log_notification(ptr: number, len: number) {
    const buf = Buffer.from((wingc.exports.memory as WebAssembly.Memory).buffer, ptr, len);
    const str = new TextDecoder().decode(buf);
    connection.sendNotification("window/logMessage", JSON.parse(str));
  };

  function send_diagnostics_notification(ptr: number, len: number) {
    const buf = Buffer.from((wingc.exports.memory as WebAssembly.Memory).buffer, ptr, len);
    const str = new TextDecoder().decode(buf);
    connection.sendNotification("textDocument/publishDiagnostics", JSON.parse(str));
  }

  // Listen on the connection
  connection.listen();
}
