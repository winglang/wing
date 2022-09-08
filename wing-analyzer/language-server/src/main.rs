use completions::completions_from_ast;
use dashmap::DashMap;
use errors::errors_from_ast;
use prep::{parse_text, ParseResult};
use ropey::Rope;
use semantic_token::{semantic_token_from_ast, AbsoluteSemanticToken, LEGEND_TYPE};
use tower_lsp::jsonrpc::Result;
use tower_lsp::lsp_types::*;
use tower_lsp::{Client, LanguageServer, LspService, Server};

pub mod completions;
pub mod errors;
pub mod prep;
pub mod semantic_token;

#[derive(Debug)]
struct Backend {
    client: Client,
    ast_map: DashMap<String, ParseResult>,
    document_map: DashMap<String, Rope>,
    semantic_token_map: DashMap<String, Vec<AbsoluteSemanticToken>>,
}

#[tower_lsp::async_trait]
impl LanguageServer for Backend {
    async fn initialize(&self, _: InitializeParams) -> Result<InitializeResult> {
        Ok(InitializeResult {
            server_info: None,
            capabilities: ServerCapabilities {
                text_document_sync: Some(TextDocumentSyncCapability::Kind(
                    TextDocumentSyncKind::FULL,
                )),
                completion_provider: Some(CompletionOptions {
                    resolve_provider: Some(false),
                    trigger_characters: Some(vec![".".to_string()]),
                    work_done_progress_options: Default::default(),
                    all_commit_characters: None,
                }),
                semantic_tokens_provider: Some(
                    SemanticTokensServerCapabilities::SemanticTokensRegistrationOptions(
                        SemanticTokensRegistrationOptions {
                            text_document_registration_options: {
                                TextDocumentRegistrationOptions {
                                    document_selector: Some(vec![DocumentFilter {
                                        language: Some("wing".to_string()),
                                        scheme: Some("file".to_string()),
                                        pattern: Some("**/*.w".to_string()),
                                    }]),
                                }
                            },
                            semantic_tokens_options: SemanticTokensOptions {
                                work_done_progress_options: WorkDoneProgressOptions::default(),
                                legend: SemanticTokensLegend {
                                    token_types: LEGEND_TYPE.clone().into(),
                                    token_modifiers: vec![],
                                },
                                range: Some(false),
                                full: Some(SemanticTokensFullOptions::Bool(true)),
                            },
                            static_registration_options: StaticRegistrationOptions::default(),
                        },
                    ),
                ),
                ..ServerCapabilities::default()
            },
        })
    }
    async fn semantic_tokens_full(
        &self,
        params: SemanticTokensParams,
    ) -> Result<Option<SemanticTokensResult>> {
        let uri = params.text_document.uri.to_string();
        let absolute_tokens = self.semantic_token_map.get(&uri).unwrap();
        let mut last_line = 0;
        let mut last_char = 0;

        // convert absolute tokens to relative tokens
        // this logic is specific to this endpoint for perf reasons
        let mut relative_tokens: Vec<SemanticToken> = Vec::new();
        for token in absolute_tokens.iter() {
            let line = token.start.row - last_line;
            let char;
            if line == 0 {
                char = token.start.column - last_char;
            } else {
                char = token.start.column;
            }
            relative_tokens.push(SemanticToken {
                delta_line: line as u32,
                delta_start: char as u32,
                length: token.length as u32,
                token_type: token.token_type as u32,
                token_modifiers_bitset: 0,
            });
            last_line = token.start.row;
            last_char = token.start.column;
        }

        if relative_tokens.len() == 0 {
            return Ok(None);
        }

        return Ok(Some(SemanticTokensResult::Tokens(SemanticTokens {
            result_id: None,
            data: relative_tokens,
        })));
    }

    async fn completion(&self, params: CompletionParams) -> Result<Option<CompletionResponse>> {
        let uri = params.text_document_position.text_document.uri;
        let position = params.text_document_position.position;

        let rope = self.document_map.get(&uri.to_string());
        let ast = self.ast_map.get(&uri.to_string());
        if rope.is_none() || ast.is_none() {
            return Ok(None);
        }

        let completions = completions_from_ast(
            rope.unwrap().to_string().as_str(),
            &ast.unwrap().tree,
            position,
        );
        let mut ret = Vec::with_capacity(completions.len());
        for item in completions {
            // It's not using the offset
            let text = item.text.as_str();
            ret.push(CompletionItem {
                label: text.to_string(),
                insert_text: Some(text.to_string()),
                kind: Some(item.kind),
                detail: item.detail,
                ..Default::default()
            });
        }

        Ok(Some(CompletionResponse::Array(ret)))
    }

    async fn initialized(&self, _: InitializedParams) {
        self.client
            .log_message(MessageType::INFO, "initialized!")
            .await;
    }

    async fn shutdown(&self) -> Result<()> {
        Ok(())
    }

    async fn did_change_workspace_folders(&self, _: DidChangeWorkspaceFoldersParams) {
        self.client
            .log_message(MessageType::INFO, "workspace folders changed!")
            .await;
    }

    async fn did_change_configuration(&self, _: DidChangeConfigurationParams) {
        self.client
            .log_message(MessageType::INFO, "configuration changed!")
            .await;
    }

    async fn did_change_watched_files(&self, _: DidChangeWatchedFilesParams) {
        self.client
            .log_message(MessageType::INFO, "watched files have changed!")
            .await;
    }

    async fn did_open(&self, params: DidOpenTextDocumentParams) {
        self.client
            .log_message(MessageType::INFO, "file opened!")
            .await;
        self.on_change(TextDocumentItem {
            uri: params.text_document.uri,
            text: params.text_document.text,
            version: params.text_document.version,
        })
        .await
    }

    async fn did_change(&self, mut params: DidChangeTextDocumentParams) {
        self.on_change(TextDocumentItem {
            uri: params.text_document.uri,
            text: std::mem::take(&mut params.content_changes[0].text),
            version: params.text_document.version,
        })
        .await
    }

    async fn did_save(&self, _: DidSaveTextDocumentParams) {
        self.client
            .log_message(MessageType::INFO, "file saved!")
            .await;
    }

    async fn did_close(&self, _: DidCloseTextDocumentParams) {
        self.client
            .log_message(MessageType::INFO, "file closed!")
            .await;
    }
}

struct TextDocumentItem {
    uri: Url,
    text: String,
    version: i32,
}

impl Backend {
    async fn on_change(&self, params: TextDocumentItem) {
        let rope = ropey::Rope::from_str(&params.text);
        self.document_map
            .insert(params.uri.to_string(), rope.clone());

        // TODO NOTE: This can still panic
        let parse_result = parse_text(params.uri.to_string().as_str(), &params.text.as_bytes());

        self.client
            .log_message(MessageType::INFO, format!("Parsed!"))
            .await;

        let semantic_tokens = semantic_token_from_ast(&parse_result.tree);
        let errors = errors_from_ast(&parse_result.tree);

        let diagnostics = errors
            .into_iter()
            .filter_map(|item| {
                let diagnostic = || -> Option<Diagnostic> {
                    let start_position = Position {
                        line: item.start.row as u32,
                        character: item.start.column as u32,
                    };
                    let end_position = Position {
                        line: item.end.row as u32,
                        character: item.end.column as u32,
                    };
                    Some(Diagnostic::new_simple(
                        Range::new(start_position, end_position),
                        "Parse Error".to_string(),
                    ))
                }();
                diagnostic
            })
            .collect::<Vec<_>>();

        self.client
            .publish_diagnostics(params.uri.clone(), diagnostics, Some(params.version))
            .await;

        self.ast_map.insert(params.uri.to_string(), parse_result);

        self.semantic_token_map
            .insert(params.uri.to_string(), semantic_tokens);
    }
}

#[tokio::main]
async fn main() {
    env_logger::init();

    let stdin = tokio::io::stdin();
    let stdout = tokio::io::stdout();

    let (service, socket) = LspService::build(|client| Backend {
        client,
        ast_map: DashMap::new(),
        document_map: DashMap::new(),
        semantic_token_map: DashMap::new(),
    })
    .finish();
    Server::new(stdin, stdout, socket).serve(service).await;
}
