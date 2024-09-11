use lsp_types::{Position, PrepareRenameResponse, Range, TextEdit};

use crate::diagnostic::WingLocation;
use crate::type_check::symbol_env::{LookupResult, SymbolEnv};
use crate::type_check::{
	resolve_super_method, SymbolKind, Types, UnsafeRef, CLASS_INFLIGHT_INIT_NAME, CLASS_INIT_NAME,
};
use crate::visit::{visit_scope, Visit};
use crate::visit_context::{VisitContext, VisitorWithContext};
use crate::{ast::*, visit_context};
pub struct LinkedSymbol<'a> {
	symbol: Symbol,
	references: Vec<&'a Symbol>,
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
			.any(|s: &LinkedSymbol<'a>| symbol.same(&s.symbol) || s.references.iter().any(|r| symbol.same(r)))
	}

	fn add_reference_symbol(&mut self, symbol: &'a Symbol, symbol_env: Option<&UnsafeRef<SymbolEnv>>) {
		// symbols that appear in let/if lef statements will point to a prev declaration of a variable of the same name if exists
		// this is why we add them in advance during visit_statement
		// the other condition is for "this" that points to the "new" keyword for some reason
		if self.is_symbol_linked(symbol) || symbol.name == "this" {
			return;
		}
		if let Some(env) = symbol_env.or(self.ctx.current_env()) {
			match env.lookup_ext(symbol, None) {
				LookupResult::Found(symbol_kind, lookup_info) | LookupResult::NotPublic(symbol_kind, lookup_info) => {
					// TODO: remove to support rename-refactor of namespaces - after adjusting the edit
					if matches!(symbol_kind, &SymbolKind::Namespace(_)) {
						// as their rename include " as ___"
						return;
					}
					// Default spans are either generated or global, so we don't want to rename them
					if lookup_info.span.is_default() {
						return;
					}
					if let Some(linked) = self
						.linked_symbols
						.iter_mut()
						.find(|s| lookup_info.span.eq(&s.symbol.span))
					{
						linked.references.push(symbol);
					} else {
						self.linked_symbols.push(LinkedSymbol {
							symbol: Symbol {
								name: symbol.name.clone(),
								span: lookup_info.span.clone(),
							},
							references: if lookup_info.span.eq(&symbol.span) {
								vec![]
							} else {
								vec![symbol]
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
		for symbol in &mut self.linked_symbols {
			if symbol.symbol.span.contains_location(&location) {
				return format_references_to_edit(symbol, new_text);
			}

			let mut is_found = false;
			// to remove the lock we must get out of the for loop
			for child in symbol.references.iter_mut() {
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

	fn prepare_symbol_rename(&self, symbol: &Symbol) -> PrepareRenameResponse {
		return PrepareRenameResponse::RangeWithPlaceholder {
			range: Range {
				start: Position {
					line: symbol.span.start.line,
					character: symbol.span.start.col,
				},
				end: Position {
					line: symbol.span.end.line,
					character: symbol.span.end.col,
				},
			},
			placeholder: symbol.name.clone(),
		};
	}

	pub fn prepare_rename(&mut self, position: Position) -> PrepareRenameResponse {
		let location = WingLocation {
			line: position.line,
			col: position.character,
		};
		for symbol in &self.linked_symbols {
			if symbol.symbol.span.contains_location(&location) {
				return self.prepare_symbol_rename(&symbol.symbol);
			}

			// to remove the lock we must get out of the for loop
			for child in symbol.references.iter() {
				if child.span.contains_location(&location) {
					return self.prepare_symbol_rename(child);
				}
			}
		}
		PrepareRenameResponse::DefaultBehavior {
			default_behavior: false,
		}
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
		self.add_reference_symbol(node, None);
		crate::visit::visit_symbol(self, node);
	}

	fn visit_expr(&mut self, node: &'a Expr) {
		match &node.kind {
			ExprKind::JsonMapLiteral { fields, .. } => {
				let type_ = self.types.maybe_unwrap_inference(self.types.get_expr_type(node));
				let type_ = *if let Some(type_) = self.types.get_type_from_json_cast(node.id) {
					*type_
				} else {
					type_
				}
				.maybe_unwrap_option();

				if let Some(c) = type_.as_struct() {
					for (field, ..) in fields {
						self.add_reference_symbol(field, Some(&UnsafeRef::from(&c.env)));
					}
				}
			}
			ExprKind::Call { arg_list, callee } => {
				let Some(env) = self.ctx.current_env() else {
					// usually the env will exist, if not- we cannot use it to resolve the super method.
					// it's the same as used here: packages/@winglang/wingc/src/lsp/symbol_locator.rs
					return;
				};
				// we need to get the struct from the callee - to get the right env
				let callee_type = match callee {
					CalleeKind::Expr(expr) => self.types.get_expr_type(expr),
					CalleeKind::SuperCall(method) => resolve_super_method(method, &env, &self.types)
						.ok()
						.map_or(self.types.error(), |t| t.0),
				}
				.maybe_unwrap_option()
				.to_owned();

				if let Some(func) = callee_type.as_function_sig() {
					if let Some(arg) = func.parameters.last() {
						let struct_type = arg.typeref.maybe_unwrap_option().as_struct();
						if let Some(s) = struct_type {
							for (arg, ..) in &arg_list.named_args {
								self.add_reference_symbol(arg, Some(&UnsafeRef::from(&s.env)));
							}
						}
					}
				}
			}
			_ => {}
		}
		crate::visit::visit_expr(self, node);
	}

	fn visit_reference(&mut self, node: &'a Reference) {
		match node {
			Reference::InstanceMember { property, object, .. } => {
				let object_type = self.types.get_expr_id_type_ref(object.id);
				if let Some(inner_env) = object_type.as_env() {
					self.add_reference_symbol(property, Some(&UnsafeRef::from(inner_env)));
				}
			}
			_ => {}
		}

		crate::visit::visit_reference(self, node);
	}

	fn visit_stmt(&mut self, stmt: &'a Stmt) {
		match &stmt.kind {
			StmtKind::IfLet(IfLet { var_name, .. }) => self.linked_symbols.push(LinkedSymbol {
				symbol: var_name.clone(),
				references: vec![],
			}),
			StmtKind::Let { var_name, .. } => self.linked_symbols.push(LinkedSymbol {
				symbol: var_name.clone(),
				references: vec![],
			}),
			//TODO: to be handled in a following PR, renaming interface fields is not supported yet
			// StmtKind::Interface(c) => {
			// for field in &c.methods {
			// 	self.linked_symbols.push(LinkedSymbol {
			// 		symbol: field.0.clone(),
			// 		references: vec![],
			// 	})
			// }
			// }
			StmtKind::Struct(s) => {
				for field in &s.fields {
					self.linked_symbols.push(LinkedSymbol {
						symbol: field.name.clone(),
						references: vec![],
					})
				}
			}
			StmtKind::Class(c) => {
				for (m, ..) in &c.methods {
					if m.name == CLASS_INIT_NAME || m.name == CLASS_INFLIGHT_INIT_NAME {
						continue;
					}
					self.linked_symbols.push(LinkedSymbol {
						symbol: m.clone(),
						references: vec![],
					})
				}
				for f in &c.fields {
					self.linked_symbols.push(LinkedSymbol {
						symbol: f.name.clone(),
						references: vec![],
					})
				}
			}
			_ => {}
		}
		crate::visit::visit_stmt(self, stmt);
	}
}

fn format_references_to_edit(linked: &mut LinkedSymbol, new_text: String) -> Vec<TextEdit> {
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

	for child in linked.references.iter_mut() {
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
