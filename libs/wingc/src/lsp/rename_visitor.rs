use std::sync::Mutex;

use lsp_types::{Position, Range, TextEdit};

use crate::diagnostic::WingLocation;
use crate::parser::RESERVED_WORDS;
use crate::type_check::symbol_env::LookupResult;
use crate::type_check::{SymbolKind, Types};
use crate::visit::{visit_scope, Visit};
use crate::visit_context::{VisitContext, VisitorWithContext};
use crate::{ast::*, visit_context};
pub struct LinkedSymbol<'a> {
	symbol: Symbol,
	references: Mutex<Vec<&'a Symbol>>,
}
pub struct RenameVisitor<'a> {
	types: &'a Types,
	linked_symbols: Vec<LinkedSymbol<'a>>,
	ctx: VisitContext,
}

impl<'a> RenameVisitor<'a> {
	pub fn new(types: &'a Types) -> Self {
		Self {
			types,
			linked_symbols: vec![],
			ctx: VisitContext::new(),
		}
	}

	fn is_symbol_linked(&mut self, symbol: &'a Symbol) -> bool {
		self
			.linked_symbols
			.iter()
			.find(|s: &&LinkedSymbol<'a>| symbol.same(&s.symbol))
			.is_some()
	}

	fn add_reference_symbol(&mut self, symbol: &'a Symbol) {
		// symbols that appear in let/if lef statements will point to a prev declaration of a variable of the same name if exists
		// this is why we add them in advance during visit_statement
		// the other condition is for "this" that points to the "new" keyword for some reason
		if self.is_symbol_linked(symbol) || RESERVED_WORDS.contains(&symbol.name) {
			return;
		}
		if let Some(env) = self.ctx.current_env() {
			match env.lookup_ext(symbol, None) {
				LookupResult::Found(symbol_kind, lookup_info) | LookupResult::NotPublic(symbol_kind, lookup_info) => {
					// TODO: remove to support rename-refactor of namespaces - after adjusting the edit
					if matches!(symbol_kind, &SymbolKind::Namespace(_)) {
						// as their rename include " as ___"
						return;
					}
					if let Some(linked) = self.linked_symbols.iter().find(|s| lookup_info.span.eq(&s.symbol.span)) {
						linked.references.lock().unwrap().push(symbol);
					} else {
						self.linked_symbols.push(LinkedSymbol {
							symbol: Symbol {
								name: symbol.name.clone(),
								span: lookup_info.span.clone(),
							},
							references: if lookup_info.span.eq(&symbol.span) {
								Mutex::new(vec![])
							} else {
								Mutex::new(vec![symbol])
							},
						});
					}
				}
				_ => {}
			}
		}
	}

	pub fn create_text_edits(&mut self, position: Position, new_text: String) -> Vec<TextEdit> {
		let location = WingLocation {
			line: position.line,
			col: position.character,
		};
		for symbol in &self.linked_symbols {
			if symbol.symbol.span.contains_location(&location) {
				return format_references_to_edit(symbol, new_text);
			}

			let mut is_found = false;
			// to remove the lock we must get out of the for loop
			for child in symbol.references.lock().unwrap().iter() {
				if child.span.contains_location(&location) {
					is_found = true;
					break;
				}
			}
			if is_found {
				return format_references_to_edit(symbol, new_text);
			}
		}
		vec![]
	}
}

impl<'a> VisitorWithContext for RenameVisitor<'a> {
	fn ctx(&mut self) -> &mut visit_context::VisitContext {
		&mut self.ctx
	}
}

impl<'a> Visit<'a> for RenameVisitor<'a> {
	fn visit_scope(&mut self, node: &'a Scope) {
		self.ctx.push_env(self.types.get_scope_env(&node));
		visit_scope(self, node);
		self.ctx.pop_env();
	}

	fn visit_symbol(&mut self, node: &'a Symbol) {
		self.add_reference_symbol(node);
		crate::visit::visit_symbol(self, node);
	}

	fn visit_stmt(&mut self, stmt: &'a Stmt) {
		match &stmt.kind {
			StmtKind::IfLet(IfLet { var_name, .. }) => self.linked_symbols.push(LinkedSymbol {
				symbol: var_name.clone(),
				references: Mutex::new(vec![]),
			}),
			StmtKind::Let { var_name, .. } => self.linked_symbols.push(LinkedSymbol {
				symbol: var_name.clone(),
				references: Mutex::new(vec![]),
			}),
			_ => {}
		}
		crate::visit::visit_stmt(self, stmt);
	}
}

fn format_references_to_edit(linked: &LinkedSymbol, new_text: String) -> Vec<TextEdit> {
	let mut edits = vec![];
	edits.push(TextEdit {
		new_text: String::from(&new_text),
		range: Range {
			start: Position {
				line: linked.symbol.span.start.line,
				character: linked.symbol.span.start.col,
			},
			end: Position {
				line: linked.symbol.span.end.line,
				character: linked.symbol.span.end.col,
			},
		},
	});

	for child in linked.references.lock().unwrap().iter() {
		edits.push(TextEdit {
			new_text: String::from(&new_text),
			range: Range {
				start: Position {
					line: child.span.start.line,
					character: child.span.start.col,
				},
				end: Position {
					line: child.span.end.line,
					character: child.span.end.col,
				},
			},
		});
	}

	edits
}
