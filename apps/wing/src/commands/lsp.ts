import {
  createConnection,
  InitializeParams,
  TextDocumentSyncKind,
  InitializeResult,
  CompletionItem,
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

  let connection = createConnection(process.stdin, process.stdout);

  connection.onInitialize((_params: InitializeParams) => {
    const result: InitializeResult = {
      capabilities: {
        textDocumentSync: TextDocumentSyncKind.Full,
        completionProvider: {
          triggerCharacters: ["."],
        },
      },
    };
    return result;
  });

  connection.onDidOpenTextDocument(async (params) => {
    const string = JSON.stringify(params);
    wingcInvoke(wingc, "wingc_on_did_open_text_document", string);
  });
  connection.onDidChangeTextDocument(async (params) => {
    const string = JSON.stringify(params);
    wingcInvoke(wingc, "wingc_on_did_change_text_document", string);
  });
  connection.onCompletion(async (params) => {
    const result = wingcInvoke(
      wingc,
      "wingc_on_completion",
      JSON.stringify(params)
    ) as string;
    return JSON.parse(result) as CompletionItem[];
  });
  connection.languages.semanticTokens.on(async (params) => {
    const result = wingcInvoke(
      wingc,
      "wingc_on_semantic_tokens",
      JSON.stringify(params)
    ) as string;
    return JSON.parse(result) as any;
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
