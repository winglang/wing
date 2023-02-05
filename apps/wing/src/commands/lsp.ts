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
        send_notification,
      },
    },
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
    const result = await wingcInvoke(
      wingc,
      "wingc_on_completion",
      JSON.stringify(params)
    );
    return JSON.parse(result) as any;
  });

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

    connection.sendNotification(type_str, JSON.parse(data_str));
  }

  // Listen on the connection
  connection.listen();
}
