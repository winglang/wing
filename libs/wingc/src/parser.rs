use indexmap::{IndexMap, IndexSet};
use phf::phf_map;
use std::cell::RefCell;
use std::collections::HashSet;
use std::{str, vec};
use tree_sitter::Node;
use tree_sitter_traversal::{traverse, Order};

use crate::ast::{
	ArgList, BinaryOperator, CatchBlock, Class, ClassField, ElifBlock, Expr, ExprKind, FunctionBody, FunctionDefinition,
	FunctionParameter, FunctionSignature, FunctionTypeAnnotation, Initializer, Interface, InterpolatedString,
	InterpolatedStringPart, Literal, Phase, Reference, Scope, Stmt, StmtKind, StructField, Symbol, TypeAnnotation,
	TypeAnnotationKind, UnaryOperator, UserDefinedType,
};
use crate::diagnostic::{Diagnostic, DiagnosticResult, Diagnostics, WingSpan};
use crate::WINGSDK_STD_MODULE;

pub struct Parser<'a> {
	pub source: &'a [u8],
	pub source_name: String,
	pub error_nodes: RefCell<HashSet<usize>>,
	pub diagnostics: RefCell<Diagnostics>,
	is_in_loop: RefCell<bool>,
}

// A custom struct could be used to better maintain metadata and issue tracking, though ideally
// this is meant to serve as a bandaide to be removed once wing is further developed.
// k=grammar, v=optional_message, example: ("generic", "targed impl: 1.0.0")
static UNIMPLEMENTED_GRAMMARS: phf::Map<&'static str, &'static str> = phf_map! {
	"any" => "see https://github.com/winglang/wing/issues/434",
	"Promise" => "see https://github.com/winglang/wing/issues/529",
	"preflight_closure" => "see https://github.com/winglang/wing/issues/474",
	"pure_closure" => "see https://github.com/winglang/wing/issues/474",
	"storage_modifier" => "see https://github.com/winglang/wing/issues/107",
	"access_modifier" => "see https://github.com/winglang/wing/issues/108",
	"await_expression" => "see https://github.com/winglang/wing/issues/116",
	"defer_expression" => "see https://github.com/winglang/wing/issues/116",
	"=>" => "see https://github.com/winglang/wing/issues/474",
};

impl<'s> Parser<'s> {
	pub fn new(source: &'s [u8], source_name: String) -> Self {
		Self {
			source,
			source_name,
			error_nodes: RefCell::new(HashSet::new()),
			diagnostics: RefCell::new(Diagnostics::new()),
			is_in_loop: RefCell::new(false),
		}
	}

	pub fn wingit(&self, root: &Node) -> Scope {
		let scope = match root.kind() {
			"source" => self.build_scope(&root),
			_ => Scope {
				env: RefCell::new(None),
				span: Default::default(),
				statements: vec![],
			},
		};

		self.report_unhandled_errors(&root);

		scope
	}

	fn add_error<T>(&self, message: impl ToString, node: &Node) -> Result<T, ()> {
		let diag = Diagnostic {
			message: message.to_string(),
			span: Some(self.node_span(node)),
		};
		// TODO terrible to clone here to avoid move
		self.diagnostics.borrow_mut().push(diag);

		// Track that we have produced a diagnostic for this node
		// (note: it may not necessarily refer to a tree-sitter "ERROR" node)
		self.error_nodes.borrow_mut().insert(node.id());

		// TODO: Seems to me like we should avoid using Rust's Result and `?` semantics here since we actually just want to "log"
		// the error and continue parsing.
		Err(())
	}

	fn report_unimplemented_grammar<T>(
		&self,
		grammar_element: &str,
		grammar_context: &str,
		node: &Node,
	) -> DiagnosticResult<T> {
		if let Some(entry) = UNIMPLEMENTED_GRAMMARS.get(&grammar_element) {
			self.add_error(
				format!(
					"{} \"{}\" is not supported yet {}",
					grammar_context, grammar_element, entry
				),
				node,
			)?
		} else {
			self.add_error(format!("Unexpected {} \"{}\"", grammar_context, grammar_element), node)?
		}
	}

	fn node_text<'a>(&'a self, node: &Node) -> &'a str {
		return str::from_utf8(&self.source[node.byte_range()]).unwrap();
	}

	fn check_error<'a>(&'a self, node: Node<'a>, expected: &str) -> DiagnosticResult<Node> {
		if node.is_error() {
			self.add_error(format!("Expected {}", expected), &node)
		} else {
			Ok(node)
		}
	}

	fn get_child_field<'a>(&'a self, node: &'a Node<'a>, field: &str) -> DiagnosticResult<Node> {
		let checked_node = self.check_error(*node, field)?;
		let child = checked_node.child_by_field_name(field);
		if let Some(child) = child {
			self.check_error(child, field)
		} else {
			self.add_error(format!("Expected {}", field), &node)
		}
	}

	fn node_symbol(&self, node: &Node) -> DiagnosticResult<Symbol> {
		let checked_node = self.check_error(*node, "symbol")?;
		Ok(Symbol {
			span: self.node_span(&checked_node),
			name: self.node_text(&checked_node).to_string(),
		})
	}

	fn build_duration(&self, node: &Node) -> DiagnosticResult<Literal> {
		let value = self.check_error(node.named_child(0).unwrap(), "duration")?;
		let value_text = self.node_text(&self.get_child_field(&value, "value")?);

		match value.kind() {
			"seconds" => Ok(Literal::Duration(value_text.parse().expect("Duration string"))),
			"minutes" => Ok(Literal::Duration(
				// Specific "Minutes" duration needed here
				value_text.parse::<f64>().expect("Duration string") * 60_f64,
			)),
			"hours" => Ok(Literal::Duration(
				value_text.parse::<f64>().expect("Duration string") * 3600_f64,
			)),
			"ERROR" => self.add_error("Expected duration type", &node),
			other => self.report_unimplemented_grammar(other, "duration type", node),
		}
	}

	fn node_span(&self, node: &Node) -> WingSpan {
		let node_range = node.range();
		WingSpan {
			start: node_range.start_point.into(),
			end: node_range.end_point.into(),
			// TODO: Implement multi-file support
			file_id: self.source_name.to_string(),
		}
	}

	fn build_scope(&self, scope_node: &Node) -> Scope {
		let mut cursor = scope_node.walk();

		Scope {
			statements: scope_node
				.named_children(&mut cursor)
				.filter(|child| !child.is_extra() && child.kind() != "AUTOMATIC_BLOCK")
				.enumerate()
				.filter_map(|(i, st_node)| self.build_statement(&st_node, i).ok())
				.collect(),
			env: RefCell::new(None), // env should be set later when scope is type-checked
			span: self.node_span(scope_node),
		}
	}

	fn build_statement(&self, statement_node: &Node, idx: usize) -> DiagnosticResult<Stmt> {
		let stmt_kind = match statement_node.kind() {
			"short_import_statement" => self.build_bring_statement(statement_node)?,

			"variable_definition_statement" => self.build_variable_def_statement(statement_node)?,
			"variable_assignment_statement" => self.build_assignment_statement(statement_node)?,

			"expression_statement" => StmtKind::Expression(self.build_expression(&statement_node.named_child(0).unwrap())?),
			"block" => StmtKind::Scope(self.build_scope(statement_node)),
			"if_statement" => self.build_if_statement(statement_node)?,
			"if_let_statement" => self.build_if_let_statement(statement_node)?,
			"for_in_loop" => self.build_for_statement(statement_node)?,
			"while_statement" => self.build_while_statement(statement_node)?,
			"break_statement" => self.build_break_statement(statement_node)?,
			"continue_statement" => self.build_continue_statement(statement_node)?,
			"return_statement" => self.build_return_statement(statement_node)?,
			"class_definition" => self.build_class_statement(statement_node, false)?,
			"resource_definition" => self.build_class_statement(statement_node, true)?,
			"interface_definition" => self.build_interface_statement(statement_node)?,
			"enum_definition" => self.build_enum_statement(statement_node)?,
			"try_catch_statement" => self.build_try_catch_statement(statement_node)?,
			"struct_definition" => self.build_struct_definition_statement(statement_node)?,
			"test_statement" => self.build_test_statement(statement_node)?,
			"ERROR" => return self.add_error("Expected statement", statement_node),
			other => return self.report_unimplemented_grammar(other, "statement", statement_node),
		};

		Ok(Stmt {
			kind: stmt_kind,
			span: self.node_span(statement_node),
			idx,
		})
	}

	fn build_try_catch_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		let try_statements = self.build_scope(&statement_node.child_by_field_name("block").unwrap());
		let catch_block = if let Some(catch_block) = statement_node.child_by_field_name("catch_block") {
			Some(CatchBlock {
				statements: self.build_scope(&catch_block),
				exception_var: if let Some(exception_var_node) = statement_node.child_by_field_name("exception_identifier") {
					Some(self.node_symbol(&exception_var_node)?)
				} else {
					None
				},
			})
		} else {
			None
		};

		let finally_statements = if let Some(finally_node) = statement_node.child_by_field_name("finally_block") {
			Some(self.build_scope(&finally_node))
		} else {
			None
		};

		// If both catch and finally are missing, report an error
		if catch_block.is_none() && finally_statements.is_none() {
			return self.add_error::<StmtKind>(
				String::from("Missing `catch` or `finally` blocks for this try statement"),
				&statement_node,
			);
		}

		Ok(StmtKind::TryCatch {
			try_statements,
			catch_block,
			finally_statements,
		})
	}

	fn build_return_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		Ok(StmtKind::Return(
			if let Some(return_expression_node) = statement_node.child_by_field_name("expression") {
				Some(self.build_expression(&return_expression_node)?)
			} else {
				None
			},
		))
	}

	/// Builds scope statements for a loop (while/for), and maintains the is_in_loop flag
	/// for the duration of the loop. So that later break statements inside can be validated
	/// without traversing the AST.
	fn build_in_loop_scope(&self, scope_node: &Node) -> Scope {
		let prev_is_in_loop = *self.is_in_loop.borrow();
		*self.is_in_loop.borrow_mut() = true;
		let scope = self.build_scope(scope_node);
		*self.is_in_loop.borrow_mut() = prev_is_in_loop;
		scope
	}

	fn build_while_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		Ok(StmtKind::While {
			condition: self.build_expression(&statement_node.child_by_field_name("condition").unwrap())?,
			statements: self.build_in_loop_scope(&statement_node.child_by_field_name("block").unwrap()),
		})
	}

	fn build_for_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		Ok(StmtKind::ForLoop {
			iterator: self.node_symbol(&statement_node.child_by_field_name("iterator").unwrap())?,
			iterable: self.build_expression(&statement_node.child_by_field_name("iterable").unwrap())?,
			statements: self.build_in_loop_scope(&statement_node.child_by_field_name("block").unwrap()),
		})
	}

	fn build_break_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		if !*self.is_in_loop.borrow() {
			return self.add_error::<StmtKind>(
				"Expected break statement to be inside of a loop (while/for)",
				statement_node,
			);
		}
		Ok(StmtKind::Break)
	}

	fn build_continue_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		if !*self.is_in_loop.borrow() {
			return self.add_error::<StmtKind>(
				"Expected continue statement to be inside of a loop (while/for)",
				statement_node,
			);
		}
		Ok(StmtKind::Continue)
	}

	fn build_if_let_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		let if_block = self.build_scope(&statement_node.child_by_field_name("block").unwrap());
		let value = self.build_expression(&statement_node.child_by_field_name("value").unwrap())?;
		let name = self.node_symbol(&statement_node.child_by_field_name("name").unwrap())?;
		let else_block = if let Some(else_block) = statement_node.child_by_field_name("else_block") {
			Some(self.build_scope(&else_block))
		} else {
			None
		};
		Ok(StmtKind::IfLet {
			var_name: name,
			value,
			statements: if_block,
			else_statements: else_block,
		})
	}

	fn build_if_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		let if_block = self.build_scope(&statement_node.child_by_field_name("block").unwrap());
		let mut elif_vec = vec![];
		let mut cursor = statement_node.walk();
		for node in statement_node.children_by_field_name("elif_block", &mut cursor) {
			let conditions = self.build_expression(&node.child_by_field_name("condition").unwrap());
			let statements = self.build_scope(&node.child_by_field_name("block").unwrap());
			let elif = ElifBlock {
				condition: conditions.unwrap(),
				statements: statements,
			};
			elif_vec.push(elif);
		}
		let else_block = if let Some(else_block) = statement_node.child_by_field_name("else_block") {
			Some(self.build_scope(&else_block))
		} else {
			None
		};
		Ok(StmtKind::If {
			condition: self.build_expression(&statement_node.child_by_field_name("condition").unwrap())?,
			statements: if_block,
			elif_statements: elif_vec,
			else_statements: else_block,
		})
	}

	fn build_assignment_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		let reference = self.build_reference(&statement_node.child_by_field_name("name").unwrap())?;
		if let ExprKind::Reference(r) = reference.kind {
			Ok(StmtKind::Assignment {
				variable: r,
				value: self.build_expression(&statement_node.child_by_field_name("value").unwrap())?,
			})
		} else {
			self.add_error(
				"Expected a reference on the left hand side of an assignment",
				statement_node,
			)
		}
	}

	fn build_struct_definition_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		let name = self.node_symbol(&self.get_child_field(&statement_node, "name")?)?;

		let mut cursor = statement_node.walk();
		let mut members = vec![];

		for field_node in statement_node.children_by_field_name("field", &mut cursor) {
			let identifier = self.node_symbol(&self.get_child_field(&field_node, "name")?)?;
			let type_ = &self.get_child_field(&field_node, "type")?;
			let f = StructField {
				name: identifier,
				member_type: self.build_type_annotation(&type_)?,
			};
			members.push(f);
		}

		let mut extends = vec![];
		for super_node in statement_node.children_by_field_name("extends", &mut cursor) {
			let super_type = self.build_type_annotation(&super_node)?;
			match super_type.kind {
				TypeAnnotationKind::UserDefined(t) => {
					extends.push(t);
				}
				_ => {
					self.add_error::<Node>(
						format!("Extended type must be a user defined type, found {}", super_type),
						&super_node,
					)?;
				}
			}
		}

		Ok(StmtKind::Struct {
			name,
			extends,
			fields: members,
		})
	}

	fn build_variable_def_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		let type_ = if let Some(type_node) = statement_node.child_by_field_name("type") {
			Some(self.build_type_annotation(&type_node)?)
		} else {
			None
		};
		Ok(StmtKind::Let {
			reassignable: statement_node.child_by_field_name("reassignable").is_some(),
			var_name: self.node_symbol(&statement_node.child_by_field_name("name").unwrap())?,
			initial_value: self.build_expression(&statement_node.child_by_field_name("value").unwrap())?,
			type_,
		})
	}

	fn build_bring_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		Ok(StmtKind::Bring {
			module_name: self.node_symbol(&statement_node.child_by_field_name("module_name").unwrap())?,
			identifier: if let Some(identifier) = statement_node.child_by_field_name("alias") {
				Some(self.node_symbol(&identifier)?)
			} else {
				None
			},
		})
	}

	fn build_enum_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		let name = self.node_symbol(&statement_node.child_by_field_name("enum_name").unwrap());
		if name.is_err() {
			self
				.add_error::<Node>(String::from("Invalid enum name"), &statement_node)
				.err();
		}

		let mut cursor = statement_node.walk();
		let mut values = IndexSet::<Symbol>::new();
		for node in statement_node.named_children(&mut cursor) {
			if node.kind() != "enum_field" {
				continue;
			}

			let diagnostic = self.node_symbol(&node);
			if diagnostic.is_err() {
				self.add_error::<Node>(String::from("Invalid enum value"), &node).err();
				continue;
			}

			let symbol = diagnostic.unwrap();
			let success = values.insert(symbol.clone());
			if !success {
				self
					.add_error::<Node>(format!("Duplicated enum value {}", symbol.name), &node)
					.err();
			}
		}

		Ok(StmtKind::Enum {
			name: name.unwrap(),
			values,
		})
	}

	fn build_class_statement(&self, statement_node: &Node, is_resource: bool) -> DiagnosticResult<StmtKind> {
		let mut cursor = statement_node.walk();
		let mut fields = vec![];
		let mut methods = vec![];
		let mut initializer = None;
		let mut inflight_initializer = None;
		let name = self.node_symbol(&statement_node.child_by_field_name("name").unwrap())?;
		for class_element in statement_node
			.child_by_field_name("implementation")
			.unwrap()
			.named_children(&mut cursor)
		{
			if class_element.is_extra() {
				continue;
			}
			match (class_element.kind(), is_resource) {
				("method_definition", true) => {
					let method_name = self.node_symbol(&class_element.child_by_field_name("name").unwrap());
					let is_static = class_element.child_by_field_name("static").is_some();
					let func_def = self.build_function_definition(&class_element, Phase::Preflight, is_static);
					match (method_name, func_def) {
						(Ok(method_name), Ok(func_def)) => methods.push((method_name, func_def)),
						_ => {}
					}
				}
				("inflight_method_definition", _) => {
					let method_name = self.node_symbol(&class_element.child_by_field_name("name").unwrap());
					let is_static = class_element.child_by_field_name("static").is_some();
					let func_def = self.build_function_definition(&class_element, Phase::Inflight, is_static);
					match (method_name, func_def) {
						(Ok(method_name), Ok(func_def)) => methods.push((method_name, func_def)),
						_ => {}
					}
				}
				("class_field", _) => {
					let is_static = class_element.child_by_field_name("static").is_some();
					if is_static {
						self.diagnostics.borrow_mut().push(Diagnostic {
							message: "Static class fields not supported yet, see https://github.com/winglang/wing/issues/1668"
								.to_string(),
							span: Some(self.node_span(&class_element)),
						});
					}

					fields.push(ClassField {
						name: self.node_symbol(&class_element.child_by_field_name("name").unwrap())?,
						member_type: self.build_type_annotation(&class_element.child_by_field_name("type").unwrap())?,
						reassignable: class_element.child_by_field_name("reassignable").is_some(),
						is_static,
						phase: match class_element.child_by_field_name("phase_modifier") {
							Some(n) => {
								if !is_resource {
									self.add_error::<Node>("Class cannot have inflight fields", &n).err();
								}
								Phase::Inflight
							}
							None => Phase::Preflight,
						},
					})
				}
				("initializer", _) => {
					let is_inflight = class_element.child_by_field_name("inflight").is_some();
					if initializer.is_some() && !is_inflight {
						self
							.add_error::<Node>(
								format!("Multiple initializers defined in class {}", name.name),
								&class_element,
							)
							.err();
					} else if inflight_initializer.is_some() && is_inflight {
						self
							.add_error::<Node>(
								format!("Multiple inflight initializers defined in class {}", name.name),
								&class_element,
							)
							.err();
					}
					if !is_resource && is_inflight {
						self
							.add_error::<Node>("Class cannot have an inflight initializers", &class_element)
							.err();
					}
					let parameters_node = class_element.child_by_field_name("parameter_list").unwrap();
					let parameters = self.build_parameter_list(&parameters_node)?;
					if !parameters.is_empty() && is_inflight {
						self
							.add_error::<Node>("Inflight initializers cannot have parameters", &parameters_node)
							.err();
					}
					if is_inflight {
						inflight_initializer = Some(FunctionDefinition {
							body: FunctionBody::Statements(self.build_scope(&class_element.child_by_field_name("block").unwrap())),
							signature: FunctionSignature {
								parameters: vec![], // Inflight initializers cannot have parameters
								return_type: None,
								phase: Phase::Inflight,
							},
							is_static: false,
							span: self.node_span(&class_element),
						})
					} else {
						initializer = Some(Initializer {
							statements: self.build_scope(&class_element.child_by_field_name("block").unwrap()),
							signature: FunctionSignature {
								parameters,
								return_type: Some(Box::new(TypeAnnotation {
									kind: TypeAnnotationKind::UserDefined(UserDefinedType {
										root: name.clone(),
										fields: vec![],
										span: name.span.clone(),
									}),
									span: self.node_span(&class_element),
								})),
								phase: if is_resource { Phase::Preflight } else { Phase::Inflight },
							},
							span: self.node_span(&class_element),
						})
					}
				}
				("ERROR", _) => {
					self
						.add_error::<Node>("Expected class element node", &class_element)
						.err();
				}
				(other, _) => {
					panic!("Unexpected class element node type {} || {:#?}", other, class_element);
				}
			}
		}

		let initializer = match initializer {
			Some(init) => init,
			// add a default initializer if none is defined
			None => Initializer {
				signature: FunctionSignature {
					parameters: vec![],
					return_type: Some(Box::new(TypeAnnotation {
						kind: TypeAnnotationKind::UserDefined(UserDefinedType {
							root: name.clone(),
							fields: vec![],
							span: name.span.clone(),
						}),
						span: name.span.clone(),
					})),
					phase: if is_resource { Phase::Preflight } else { Phase::Inflight },
				},
				statements: Scope {
					env: RefCell::new(None),
					statements: vec![],
					span: name.span.clone(),
				},
				span: name.span.clone(),
			},
		};

		let parent = if let Some(parent_node) = statement_node.child_by_field_name("parent") {
			let parent_type = self.build_type_annotation(&parent_node)?;
			match parent_type.kind {
				TypeAnnotationKind::UserDefined(parent_type) => Some(parent_type),
				_ => {
					self.add_error::<Node>(
						format!("Parent type must be a user defined type, found {}", parent_type),
						&parent_node,
					)?;
					None
				}
			}
		} else {
			None
		};

		let mut implements = vec![];
		for type_node in statement_node.children_by_field_name("implements", &mut cursor) {
			// ignore comments
			if type_node.is_extra() {
				continue;
			}

			// ignore commas
			if !type_node.is_named() {
				continue;
			}

			let interface_type = self.build_type_annotation(&type_node)?;
			match interface_type.kind {
				TypeAnnotationKind::UserDefined(interface_type) => implements.push(interface_type),
				_ => {
					self.add_error::<Node>(
						format!(
							"Implemented interface must be a user defined type, found {}",
							interface_type
						),
						&type_node,
					)?;
				}
			}
		}

		Ok(StmtKind::Class(Class {
			name,
			fields,
			methods,
			parent,
			implements,
			initializer,
			is_resource,
			inflight_initializer,
		}))
	}

	fn build_interface_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		let mut cursor = statement_node.walk();
		let mut extends = vec![];
		let mut methods = vec![];
		let name = self.node_symbol(&statement_node.child_by_field_name("name").unwrap())?;

		for interface_element in statement_node
			.child_by_field_name("implementation")
			.unwrap()
			.named_children(&mut cursor)
		{
			if interface_element.is_extra() {
				continue;
			}
			match interface_element.kind() {
				"method_signature" => {
					self.build_interface_method(interface_element, &mut methods, Phase::Preflight);
				}
				"inflight_method_signature" => {
					self.build_interface_method(interface_element, &mut methods, Phase::Inflight);
				}
				"ERROR" => {
					self
						.add_error::<Node>("Expected interface element node", &interface_element)
						.err();
				}
				other => {
					panic!(
						"Unexpected interface element node type {} || {:#?}",
						other, interface_element
					);
				}
			}
		}

		for extend in statement_node.children_by_field_name("extends", &mut cursor) {
			// ignore comments
			if extend.is_extra() {
				continue;
			}

			// ignore commas
			if !extend.is_named() {
				continue;
			}

			if let Ok(TypeAnnotation {
				kind: TypeAnnotationKind::UserDefined(interface_type),
				..
			}) = self.build_udt_annotation(&extend)
			{
				extends.push(interface_type);
			}
		}

		Ok(StmtKind::Interface(Interface { name, methods, extends }))
	}

	fn build_interface_method(
		&self,
		interface_element: Node,
		methods: &mut Vec<(Symbol, FunctionSignature)>,
		phase: Phase,
	) {
		let name = interface_element.child_by_field_name("name").unwrap();
		let method_name = self.node_symbol(&name);
		let func_sig = self.build_function_signature(&interface_element, phase);
		match (method_name, func_sig) {
			(Ok(method_name), Ok(func_sig)) => {
				// interface methods are not strictly function types so verify return type exists
				match func_sig.return_type {
					Some(_) => methods.push((method_name, func_sig)),
					None => _ = self.add_error::<()>("Expected method return type".to_string(), &interface_element),
				}
			}
			_ => {}
		}
	}

	fn build_function_signature(&self, func_sig_node: &Node, phase: Phase) -> DiagnosticResult<FunctionSignature> {
		let parameters = self.build_parameter_list(&func_sig_node.child_by_field_name("parameter_list").unwrap())?;
		let return_type = if let Some(rt) = func_sig_node.child_by_field_name("type") {
			Some(Box::new(self.build_type_annotation(&rt)?))
		} else {
			None
		};
		Ok(FunctionSignature {
			parameters,
			return_type,
			phase,
		})
	}

	fn build_anonymous_closure(&self, anon_closure_node: &Node, phase: Phase) -> DiagnosticResult<FunctionDefinition> {
		self.build_function_definition(anon_closure_node, phase, true)
	}

	fn build_function_definition(
		&self,
		func_def_node: &Node,
		phase: Phase,
		is_static: bool,
	) -> DiagnosticResult<FunctionDefinition> {
		let signature = self.build_function_signature(func_def_node, phase)?;
		let statements = if let Some(external) = func_def_node.child_by_field_name("extern_modifier") {
			let node_text = self.node_text(&external.named_child(0).unwrap());
			let node_text = &node_text[1..node_text.len() - 1];
			FunctionBody::External(node_text.to_string())
		} else {
			FunctionBody::Statements(self.build_scope(&self.get_child_field(func_def_node, "block")?))
		};

		Ok(FunctionDefinition {
			body: statements,
			signature,
			is_static,
			span: self.node_span(func_def_node),
		})
	}

	/// Builds a vector of all parameters defined in `parameter_list_node`.
	///
	/// # Returns
	/// A vector of tuples for each parameter in the list. The tuples are the name, type and a bool letting
	/// us know whether the parameter is reassignable or not respectively.
	fn build_parameter_list(&self, parameter_list_node: &Node) -> DiagnosticResult<Vec<FunctionParameter>> {
		let mut res = vec![];
		let mut cursor = parameter_list_node.walk();
		for parameter_definition_node in parameter_list_node.named_children(&mut cursor) {
			if parameter_definition_node.is_extra() {
				continue;
			}

			res.push(FunctionParameter {
				name: self.node_symbol(&parameter_definition_node.child_by_field_name("name").unwrap())?,
				type_annotation: self.build_type_annotation(&parameter_definition_node.child_by_field_name("type").unwrap())?,
				reassignable: parameter_definition_node.child_by_field_name("reassignable").is_some(),
			});
		}

		Ok(res)
	}

	fn build_type_annotation(&self, type_node: &Node) -> DiagnosticResult<TypeAnnotation> {
		let span = self.node_span(type_node);
		match type_node.kind() {
			"builtin_type" => match self.node_text(type_node) {
				"num" => Ok(TypeAnnotation {
					kind: TypeAnnotationKind::Number,
					span,
				}),
				"str" => Ok(TypeAnnotation {
					kind: TypeAnnotationKind::String,
					span,
				}),
				"bool" => Ok(TypeAnnotation {
					kind: TypeAnnotationKind::Bool,
					span,
				}),
				"duration" => Ok(TypeAnnotation {
					kind: TypeAnnotationKind::Duration,
					span,
				}),
				"void" => Ok(TypeAnnotation {
					kind: TypeAnnotationKind::Void,
					span,
				}),
				"ERROR" => self.add_error("Expected builtin type", type_node),
				other => return self.report_unimplemented_grammar(other, "builtin", type_node),
			},
			"optional" => {
				let inner_type = self.build_type_annotation(&type_node.named_child(0).unwrap()).unwrap();
				Ok(TypeAnnotation {
					kind: TypeAnnotationKind::Optional(Box::new(inner_type)),
					span,
				})
			}
			"custom_type" => Ok(self.build_udt_annotation(&type_node)?),
			"function_type" => {
				let param_type_list_node = type_node.child_by_field_name("parameter_types").unwrap();
				let mut cursor = param_type_list_node.walk();
				let param_types = param_type_list_node
					.named_children(&mut cursor)
					.filter_map(|param_type| self.build_type_annotation(&param_type).ok())
					.collect::<Vec<TypeAnnotation>>();
				match type_node.child_by_field_name("return_type") {
					Some(return_type) => match self.build_type_annotation(&return_type) {
						Ok(return_type) => Ok(TypeAnnotation {
							kind: TypeAnnotationKind::Function(FunctionTypeAnnotation {
								param_types,
								return_type: Box::new(return_type),
								phase: if type_node.child_by_field_name("inflight").is_some() {
									Phase::Inflight
								} else {
									Phase::Preflight
								},
							}),
							span,
						}),
						Err(error) => Err(error),
					},
					None => self.add_error("Expected function return type".to_string(), &type_node),
				}
			}
			"json_container_type" => {
				let container_type = self.node_text(&type_node);
				match container_type {
					"Json" => Ok(TypeAnnotation {
						kind: TypeAnnotationKind::Json,
						span,
					}),
					"MutJson" => Ok(TypeAnnotation {
						kind: TypeAnnotationKind::MutJson,
						span,
					}),
					other => self.add_error(format!("invalid json container type {}", other), &type_node),
				}
			}
			"mutable_container_type" | "immutable_container_type" => {
				let container_type = self.node_text(&type_node.child_by_field_name("collection_type").unwrap());
				let element_type = type_node.child_by_field_name("type_parameter").unwrap();
				match container_type {
					"Map" => Ok(TypeAnnotation {
						kind: TypeAnnotationKind::Map(Box::new(self.build_type_annotation(&element_type)?)),
						span,
					}),
					"MutMap" => Ok(TypeAnnotation {
						kind: TypeAnnotationKind::MutMap(Box::new(self.build_type_annotation(&element_type)?)),
						span,
					}),
					"Array" => Ok(TypeAnnotation {
						kind: TypeAnnotationKind::Array(Box::new(self.build_type_annotation(&element_type)?)),
						span,
					}),
					"MutArray" => Ok(TypeAnnotation {
						kind: TypeAnnotationKind::MutArray(Box::new(self.build_type_annotation(&element_type)?)),
						span,
					}),
					"Set" => Ok(TypeAnnotation {
						kind: TypeAnnotationKind::Set(Box::new(self.build_type_annotation(&element_type)?)),
						span,
					}),
					"MutSet" => Ok(TypeAnnotation {
						kind: TypeAnnotationKind::MutSet(Box::new(self.build_type_annotation(&element_type)?)),
						span,
					}),
					"ERROR" => self.add_error("Expected builtin container type", type_node)?,
					other => self.report_unimplemented_grammar(other, "builtin container type", type_node),
				}
			}
			"ERROR" => self.add_error("Expected type", type_node),
			other => self.report_unimplemented_grammar(other, "type", type_node),
		}
	}

	fn build_nested_identifier(&self, nested_node: &Node) -> DiagnosticResult<Expr> {
		if nested_node.has_error() {
			return self.add_error("Syntax error", &nested_node);
		}

		let object_expr = self.get_child_field(nested_node, "object")?;

		if let Some(property) = nested_node.child_by_field_name("property") {
			let object_expr = if object_expr.kind() == "json_container_type" {
				Expr {
					kind: ExprKind::Reference(Reference::TypeMember {
						type_: UserDefinedType {
							root: Symbol {
								name: WINGSDK_STD_MODULE.to_string(),
								span: Default::default(),
							},
							fields: vec![self.node_symbol(&object_expr)?],
							span: self.node_span(&object_expr),
						},
						property: self.node_symbol(&property)?,
					}),
					span: self.node_span(&object_expr),
					evaluated_type: RefCell::new(None),
				}
			} else {
				self.build_expression(&object_expr)?
			};
			Ok(Expr {
				kind: ExprKind::Reference(Reference::InstanceMember {
					object: Box::new(object_expr),
					property: self.node_symbol(&property)?,
				}),
				span: self.node_span(&nested_node),
				evaluated_type: RefCell::new(None),
			})
		} else {
			// we are missing the last property, but we can still parse the rest of the expression
			let err = self.add_error(
				"Expected property",
				&nested_node
					.child(nested_node.child_count() - 1)
					.expect("Nested identifier should have at least one child"),
			);
			if object_expr.kind() == "reference" {
				self.build_reference(&object_expr)
			} else {
				err
			}
		}
	}

	fn build_udt_annotation(&self, nested_node: &Node) -> DiagnosticResult<TypeAnnotation> {
		// check if last node is a "."
		let last_child = nested_node
			.child(nested_node.child_count() - 1)
			.expect("If node is a custom type, it will have at least one child");
		if last_child.kind() == "." {
			// even though we're missing a field, we can still parse the rest of the type
			let _ = self.add_error::<()>("Expected namespaced type", &last_child);
		}

		let mut cursor = nested_node.walk();
		let kind = TypeAnnotationKind::UserDefined(UserDefinedType {
			root: self.node_symbol(&nested_node.child_by_field_name("object").unwrap())?,
			fields: nested_node
				.children_by_field_name("fields", &mut cursor)
				.map(|n| self.node_symbol(&n).unwrap())
				.collect(),
			span: self.node_span(&nested_node),
		});
		Ok(TypeAnnotation {
			kind,
			span: self.node_span(&nested_node),
		})
	}

	fn build_reference(&self, reference_node: &Node) -> DiagnosticResult<Expr> {
		let actual_node = reference_node.named_child(0).unwrap();
		let actual_node_span = self.node_span(&actual_node);
		match actual_node.kind() {
			"reference_identifier" => Ok(Expr {
				kind: ExprKind::Reference(Reference::Identifier(self.node_symbol(&actual_node)?)),
				span: actual_node_span,
				evaluated_type: RefCell::new(None),
			}),
			"nested_identifier" => Ok(self.build_nested_identifier(&actual_node)?),
			"structured_access_expression" => {
				self.report_unimplemented_grammar("structured_access_expression", "reference", &actual_node)
			}
			other => self.add_error(format!("Expected reference, got {other}"), &actual_node),
		}
	}

	fn build_arg_list(&self, arg_list_node: &Node) -> DiagnosticResult<ArgList> {
		let mut pos_args = vec![];
		let mut named_args = IndexMap::new();

		let mut cursor = arg_list_node.walk();
		let mut seen_keyword_args = false;
		for child in arg_list_node.named_children(&mut cursor) {
			if child.is_extra() {
				continue;
			}
			match child.kind() {
				"positional_argument" => {
					if seen_keyword_args {
						self.add_error("Positional arguments must come before named arguments", &child)?;
					}
					pos_args.push(self.build_expression(&child)?);
				}
				"keyword_argument" => {
					seen_keyword_args = true;
					let arg_name_node = &child.named_child(0).unwrap();
					let arg_name = self.node_symbol(arg_name_node)?;
					if named_args.contains_key(&arg_name) {
						_ = self.add_error::<ArgList>("Duplicate argument name", arg_name_node);
					} else {
						named_args.insert(arg_name, self.build_expression(&child.named_child(1).unwrap())?);
					}
				}
				"ERROR" => {
					self.add_error::<ArgList>("Invalid argument(s)", &child)?;
				}
				other => panic!("Unexpected argument type {} || {:#?}", other, child),
			}
		}

		Ok(ArgList { pos_args, named_args })
	}

	fn build_expression(&self, exp_node: &Node) -> DiagnosticResult<Expr> {
		let expression_node = &self.check_error(*exp_node, "expression")?;
		let expression_span = self.node_span(expression_node);
		match expression_node.kind() {
			"new_expression" => {
				let class = self.build_type_annotation(&expression_node.child_by_field_name("class").unwrap())?;

				let arg_list = if let Ok(args_node) = self.get_child_field(expression_node, "args") {
					self.build_arg_list(&args_node)
				} else {
					Ok(ArgList::new())
				};

				let obj_id = expression_node.child_by_field_name("id").map(|n| {
					let id_str = self.node_text(&n.named_child(0).unwrap());
					id_str[1..id_str.len() - 1].to_string()
				});
				let obj_scope = if let Some(scope_expr_node) = expression_node.child_by_field_name("scope") {
					Some(Box::new(self.build_expression(&scope_expr_node)?))
				} else {
					None
				};
				Ok(Expr::new(
					ExprKind::New {
						class,
						obj_id,
						arg_list: arg_list?,
						obj_scope,
					},
					expression_span,
				))
			}
			"binary_expression" => Ok(Expr::new(
				ExprKind::Binary {
					left: Box::new(self.build_expression(&expression_node.child_by_field_name("left").unwrap())?),
					right: Box::new(self.build_expression(&expression_node.child_by_field_name("right").unwrap())?),
					op: match self.node_text(&expression_node.child_by_field_name("op").unwrap()) {
						"+" => BinaryOperator::AddOrConcat,
						"-" => BinaryOperator::Sub,
						"==" => BinaryOperator::Equal,
						"!=" => BinaryOperator::NotEqual,
						">" => BinaryOperator::Greater,
						">=" => BinaryOperator::GreaterOrEqual,
						"<" => BinaryOperator::Less,
						"<=" => BinaryOperator::LessOrEqual,
						"&&" => BinaryOperator::LogicalAnd,
						"||" => BinaryOperator::LogicalOr,
						"%" => BinaryOperator::Mod,
						"*" => BinaryOperator::Mul,
						"/" => BinaryOperator::Div,
						"\\" => BinaryOperator::FloorDiv,
						"**" => BinaryOperator::Power,
						"??" => BinaryOperator::UnwrapOr,
						"ERROR" => self.add_error::<BinaryOperator>("Expected binary operator", expression_node)?,
						other => return self.report_unimplemented_grammar(other, "binary operator", expression_node),
					},
				},
				expression_span,
			)),
			"unary_expression" => Ok(Expr::new(
				ExprKind::Unary {
					op: match self.node_text(&expression_node.child_by_field_name("op").unwrap()) {
						"-" => UnaryOperator::Minus,
						"!" => UnaryOperator::Not,
						"ERROR" => self.add_error::<UnaryOperator>("Expected unary operator", expression_node)?,
						other => return self.report_unimplemented_grammar(other, "unary operator", expression_node),
					},
					exp: Box::new(self.build_expression(&expression_node.child_by_field_name("arg").unwrap())?),
				},
				expression_span,
			)),
			"string" => {
				if expression_node.named_child_count() == 0 {
					Ok(Expr::new(
						ExprKind::Literal(Literal::String(self.node_text(&expression_node).into())),
						expression_span,
					))
				} else {
					// We must go over the string and separate it into parts (static and expr)
					let mut cursor = expression_node.walk();
					let mut parts = Vec::new();

					// Skip first and last quote
					let end = expression_node.end_byte() - 1;
					let start = expression_node.start_byte() + 1;
					let mut last_start = start;
					let mut last_end = end;
					let mut start_from = last_end;

					for interpolation_node in expression_node.named_children(&mut cursor) {
						if interpolation_node.is_extra() {
							continue;
						}
						let interpolation_start = interpolation_node.start_byte();
						let interpolation_end = interpolation_node.end_byte();

						if start == last_start && interpolation_start < last_end {
							start_from = last_start;
						}

						if interpolation_start != last_start {
							parts.push(InterpolatedStringPart::Static(
								str::from_utf8(&self.source[start_from..interpolation_start])
									.unwrap()
									.into(),
							));
						}

						parts.push(InterpolatedStringPart::Expr(
							self.build_expression(&interpolation_node.named_child(0).unwrap())?,
						));

						last_start = interpolation_start;
						last_end = interpolation_end;
						start_from = last_end;
					}

					if last_end != end {
						parts.push(InterpolatedStringPart::Static(
							str::from_utf8(&self.source[last_end..end]).unwrap().into(),
						));
					}

					Ok(Expr::new(
						ExprKind::Literal(Literal::InterpolatedString(InterpolatedString { parts })),
						expression_span,
					))
				}
			}
			"loop_range" => {
				let inclusive = if expression_node.child_by_field_name("inclusive").is_some() {
					Some(true)
				} else {
					Some(false)
				};
				Ok(Expr::new(
					ExprKind::Range {
						start: Box::new(
							self.build_expression(
								&expression_node
									.child_by_field_name("start")
									.expect("range expression should always include start"),
							)?,
						),
						inclusive: inclusive,
						end: Box::new(
							self.build_expression(
								&expression_node
									.child_by_field_name("end")
									.expect("range expression should always include end"),
							)?,
						),
					},
					expression_span,
				))
			}
			"number" => Ok(Expr::new(
				ExprKind::Literal(Literal::Number(
					self.node_text(&expression_node).parse().expect("Number string"),
				)),
				expression_span,
			)),
			"nil_value" => Ok(Expr::new(ExprKind::Literal(Literal::Nil), expression_span)),
			"bool" => Ok(Expr::new(
				ExprKind::Literal(Literal::Boolean(match self.node_text(&expression_node) {
					"true" => true,
					"false" => false,
					"ERROR" => self.add_error::<bool>("Expected boolean literal", expression_node)?,
					other => return self.report_unimplemented_grammar(other, "boolean literal", expression_node),
				})),
				expression_span,
			)),
			"duration" => Ok(Expr::new(
				ExprKind::Literal(self.build_duration(&expression_node)?),
				expression_span,
			)),
			"reference" => self.build_reference(&expression_node),
			"positional_argument" => self.build_expression(&expression_node.named_child(0).unwrap()),
			"keyword_argument_value" => self.build_expression(&expression_node.named_child(0).unwrap()),
			"call" => Ok(Expr::new(
				ExprKind::Call {
					callee: Box::new(self.build_expression(&expression_node.child_by_field_name("caller").unwrap())?),
					arg_list: self.build_arg_list(&expression_node.child_by_field_name("args").unwrap())?,
				},
				expression_span,
			)),
			"parenthesized_expression" => self.build_expression(&expression_node.named_child(0).unwrap()),
			"preflight_closure" => Ok(Expr::new(
				ExprKind::FunctionClosure(self.build_anonymous_closure(&expression_node, Phase::Preflight)?),
				expression_span,
			)),
			"inflight_closure" => Ok(Expr::new(
				ExprKind::FunctionClosure(self.build_anonymous_closure(&expression_node, Phase::Inflight)?),
				expression_span,
			)),
			"pure_closure" => self.add_error("Pure phased anonymous closures not implemented yet", expression_node),
			"array_literal" => {
				let array_type = if let Some(type_node) = expression_node.child_by_field_name("type") {
					Some(self.build_type_annotation(&type_node)?)
				} else {
					None
				};

				let mut items = Vec::new();
				let mut cursor = expression_node.walk();
				for element_node in expression_node.children_by_field_name("element", &mut cursor) {
					items.push(self.build_expression(&element_node)?);
				}

				Ok(Expr::new(
					ExprKind::ArrayLiteral {
						items,
						type_: array_type,
					},
					expression_span,
				))
			}
			"map_literal" => {
				let map_type = if let Some(type_node) = expression_node.child_by_field_name("type") {
					Some(self.build_type_annotation(&type_node)?)
				} else {
					None
				};

				let mut fields = IndexMap::new();
				let mut cursor = expression_node.walk();
				for field_node in expression_node.children_by_field_name("member", &mut cursor) {
					if field_node.is_extra() {
						continue;
					}
					let key_node = field_node.named_child(0).unwrap();
					let key = match key_node.kind() {
						"string" => {
							let s = self.node_text(&key_node);
							// Remove quotes, we assume this is a valid key for a map
							s[1..s.len() - 1].to_string()
						}
						"identifier" => self.node_text(&key_node).to_string(),
						other => panic!("Unexpected map key type {} at {:?}", other, key_node),
					};
					let value_node = field_node.named_child(1).unwrap();
					if fields.contains_key(&key) {
						_ = self.add_error::<()>(format!("Duplicate key {} in map literal", key), &key_node);
					} else {
						fields.insert(key, self.build_expression(&value_node)?);
					}
				}

				// Special case: empty {} (which is detected as map by tree-sitter) -
				// if it is annotated as a Set/MutSet we should treat it as a set literal
				if let Some(TypeAnnotation { kind, .. }) = &map_type {
					if matches!(kind, TypeAnnotationKind::Set(_) | TypeAnnotationKind::MutSet(_)) && fields.is_empty() {
						return self.build_set_literal(expression_node);
					}
				}

				Ok(Expr::new(
					ExprKind::MapLiteral {
						fields,
						type_: map_type,
					},
					expression_span,
				))
			}
			"json_literal" => {
				let type_node = expression_node
					.child_by_field_name("type")
					.expect("Json literal should always have type node");
				let is_mut = match self.node_text(&type_node) {
					"MutJson" => true,
					_ => false,
				};

				let element_node = expression_node
					.child_by_field_name("element")
					.expect("Should always have element");

				let named_element_child = element_node.named_child(0);
				let exp = if element_node.kind() == "reference"
					&& named_element_child
						.expect("references always have a child")
						.is_missing()
				{
					_ = self.add_error::<()>("Json literal must have an element", &named_element_child.unwrap());
					Expr {
						evaluated_type: RefCell::new(None),
						kind: ExprKind::Literal(Literal::Number(0.0)),
						span: self.node_span(&element_node),
					}
				} else {
					self.build_expression(&element_node)?
				};

				let element = Box::new(exp);

				Ok(Expr::new(ExprKind::JsonLiteral { is_mut, element }, expression_span))
			}
			"set_literal" => self.build_set_literal(expression_node),
			"struct_literal" => {
				let type_ = self.build_type_annotation(&expression_node.child_by_field_name("type").unwrap());
				let mut fields = IndexMap::new();
				let mut cursor = expression_node.walk();
				for field in expression_node.children_by_field_name("fields", &mut cursor) {
					if !field.is_named() || field.is_extra() {
						continue;
					}
					let field_name = self.node_symbol(&field.named_child(0).unwrap());
					let field_value = self.build_expression(&field.named_child(1).unwrap());
					// Add fields to our struct literal, if some are missing or aren't part of the type we'll fail on type checking
					if let (Ok(k), Ok(v)) = (field_name, field_value) {
						if fields.contains_key(&k) {
							// TODO: ugly, we need to change add_error to not return anything and have a wrapper `raise_error` that returns a Result
							_ = self.add_error::<()>(format!("Duplicate field {} in struct literal", k), expression_node);
						} else {
							fields.insert(k, v);
						}
					}
				}
				Ok(Expr::new(
					ExprKind::StructLiteral { type_: type_?, fields },
					expression_span,
				))
			}
			"optional_test" => {
				let expression = self.build_expression(&expression_node.named_child(0).unwrap());
				Ok(Expr::new(
					ExprKind::Unary {
						op: UnaryOperator::OptionalTest,
						exp: Box::new(expression?),
					},
					expression_span,
				))
			}
			other => self.report_unimplemented_grammar(other, "expression", expression_node),
		}
	}

	fn build_set_literal(&self, expression_node: &Node) -> Result<Expr, ()> {
		let expression_span = self.node_span(expression_node);
		let set_type = if let Some(type_node) = expression_node.child_by_field_name("type") {
			Some(self.build_type_annotation(&type_node)?)
		} else {
			None
		};
		let mut items = Vec::new();
		let mut cursor = expression_node.walk();
		for element_node in expression_node.children_by_field_name("element", &mut cursor) {
			items.push(self.build_expression(&element_node)?);
		}
		Ok(Expr::new(
			ExprKind::SetLiteral { items, type_: set_type },
			expression_span,
		))
	}

	fn report_unhandled_errors(&self, root: &Node) {
		let iter = traverse(root.walk(), Order::Pre);
		for node in iter {
			if node.kind() == "AUTOMATIC_SEMICOLON" {
				_ = self.add_error::<()>("Expected ';'", &node);
			} else if node.kind() == "AUTOMATIC_BLOCK" {
				_ = self.add_error::<()>("Expected block", &node);
			} else if !self.error_nodes.borrow().contains(&node.id()) {
				if node.is_error() {
					if node.named_child_count() == 0 {
						_ = self.add_error::<()>(String::from("Unknown parser error"), &node);
					} else {
						let mut cursor = node.walk();
						let children = node.named_children(&mut cursor);
						for child in children {
							_ = self.add_error::<()>(format!("Unexpected '{}'", child.kind()), &child);
						}
					}
				} else if node.is_missing() {
					_ = self.add_error::<()>(format!("Expected '{}'", node.kind()), &node);
				}
			}
		}
	}

	fn build_test_statement(&self, statement_node: &Node) -> Result<StmtKind, ()> {
		let name_node = statement_node.child_by_field_name("name").unwrap();
		let name_text = self.node_text(&name_node);
		let test_id = format!("test:{}", &name_text[1..name_text.len() - 1]);
		let statements = self.build_scope(&statement_node.child_by_field_name("block").unwrap());

		let inflight_closure = Expr {
			kind: ExprKind::FunctionClosure(FunctionDefinition {
				body: FunctionBody::Statements(statements),
				signature: FunctionSignature {
					parameters: vec![],
					return_type: None,
					phase: Phase::Inflight,
				},
				is_static: true,
				span: WingSpan::default(),
			}),
			span: WingSpan::default(),
			evaluated_type: RefCell::new(None),
		};

		Ok(StmtKind::Expression(Expr {
			kind: ExprKind::New {
				class: TypeAnnotation {
					kind: TypeAnnotationKind::UserDefined(UserDefinedType {
						root: Symbol::global("cloud"),
						fields: vec![Symbol::global("Test")],
						span: WingSpan::default(),
					}),
					span: WingSpan::default(),
				},
				obj_id: Some(test_id),
				obj_scope: None,
				arg_list: ArgList {
					pos_args: vec![inflight_closure],
					named_args: IndexMap::new(),
				},
			},
			span: self.node_span(statement_node),
			evaluated_type: RefCell::new(None),
		}))
	}
}
