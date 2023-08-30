use camino::{Utf8Component, Utf8Path, Utf8PathBuf};
use indexmap::{IndexMap, IndexSet};
use phf::{phf_map, phf_set};
use std::cell::RefCell;
use std::collections::HashSet;
use std::{fs, str, vec};
use tree_sitter::Node;
use tree_sitter_traversal::{traverse, Order};

use crate::ast::{
	ArgList, BinaryOperator, BringSource, CalleeKind, CatchBlock, Class, ClassField, ElifBlock, ElifLetBlock, Expr,
	ExprKind, FunctionBody, FunctionDefinition, FunctionParameter, FunctionSignature, Interface, InterpolatedString,
	InterpolatedStringPart, Literal, NewExpr, Phase, Reference, Scope, Stmt, StmtKind, StructField, Symbol,
	TypeAnnotation, TypeAnnotationKind, UnaryOperator, UserDefinedType,
};
use crate::comp_ctx::{CompilationContext, CompilationPhase};
use crate::diagnostic::{report_diagnostic, Diagnostic, DiagnosticResult, WingSpan};
use crate::file_graph::FileGraph;
use crate::files::Files;
use crate::type_check::{CLASS_INFLIGHT_INIT_NAME, CLASS_INIT_NAME};
use crate::{dbg_panic, WINGSDK_STD_MODULE, WINGSDK_TEST_CLASS_NAME};

// A custom struct could be used to better maintain metadata and issue tracking, though ideally
// this is meant to serve as a bandaide to be removed once wing is further developed.
// k=grammar, v=optional_message, example: ("generic", "targed impl: 1.0.0")
static UNIMPLEMENTED_GRAMMARS: phf::Map<&'static str, &'static str> = phf_map! {
	"any" => "https://github.com/winglang/wing/issues/434",
	"Promise" => "https://github.com/winglang/wing/issues/529",
	"storage_modifier" => "https://github.com/winglang/wing/issues/107",
	"access_modifier" => "https://github.com/winglang/wing/issues/108",
	"await_expression" => "https://github.com/winglang/wing/issues/116",
	"defer_expression" => "https://github.com/winglang/wing/issues/116",
};

static RESERVED_WORDS: phf::Set<&'static str> = phf_set! {
	// JS Reserved Words
	"abstract",
	"arguments",
	"await",
	"boolean",
	"break",
	"byte",
	"case",
	"catch",
	"char",
	"class",
	"const",
	"continue",
	"debugger",
	"default",
	"delete",
	"do",
	"double",
	"else",
	"enum",
	"eval",
	"export",
	"extends",
	"false",
	"final",
	"finally",
	"float",
	"for",
	"function",
	"goto",
	"if",
	"implements",
	"import",
	"in",
	"instanceof",
	"int",
	"interface",
	"let",
	"long",
	"native",
	"new",
	"null",
	"package",
	"private",
	"protected",
	"public",
	"return",
	"short",
	"static",
	"super",
	"switch",
	"synchronized",
	"this",
	"throw",
	"throws",
	"transient",
	"true",
	"try",
	"typeof",
	"var",
	"void",
	"volatile",
	"while",
	"with",
	"yield",

	// wing-specific reserved words
	"struct",
	"as",
	"nil",
	"test",
	"inflight",
	"preflight",
	"elif",
	"init",
	"any",
	"num",
	"str",
	"duration",
	"bool",
	"Json",
	"MutJson",
	"Map",
	"MutMap",
	"Set",
	"MutSet",
	"Array",
	"MutArray",

	// nodejs globals used in emitted code
	"require",
	"module",
	"process",
	"Object",
};

/// Parses a Wing file and the transitive closure of all files it depends on.
///
/// Expects an initial Wing file to be parsed. For Wing's CLI, this is usually
/// the file the user asked to compile, and in the case of the LSP, the file that was
/// just opened or changed. The file's path and text can be passed through `init_path` and
/// `init_text`, respectively.
///
/// Internally it parses the initial file, and then recursively parse all of the files that
/// it depends on, storing all results in the `files`, `file_graph`, `tree_sitter_trees`,
/// and `asts` parameters. It skips re-parsing any files that have already been parsed. function assumes all of these collections are kept in sync
/// with each other.
///
/// Returns a topological ordering of all known Wing files, where each file only depends on
/// files that come before it in the ordering.
pub fn parse_wing_project(
	init_path: &Utf8Path,
	init_text: String,
	files: &mut Files,
	file_graph: &mut FileGraph,
	tree_sitter_trees: &mut IndexMap<Utf8PathBuf, tree_sitter::Tree>,
	asts: &mut IndexMap<Utf8PathBuf, Scope>,
) -> Vec<Utf8PathBuf> {
	// Parse the initial file (even if we have already seen it before)
	let (tree_sitter_tree, ast, dependent_wing_files) = parse_wing_file(init_path, &init_text);

	// Update our files collection with the new source text. For a fresh compilation,
	// this will be the first time we've seen this file. In the LSP we might already have
	// text from a previous compilation, so we'll replace the contents.
	files.update_file(&init_path, init_text);

	// Update our collections of trees and ASTs and our file graph
	tree_sitter_trees.insert(init_path.to_owned(), tree_sitter_tree);
	asts.insert(init_path.to_owned(), ast);
	file_graph.update_file(init_path, &dependent_wing_files);

	// Track which files still need parsing
	let mut unparsed_files = dependent_wing_files;

	// Parse all remaining files in the project
	while let Some(file_path) = unparsed_files.pop() {
		// Skip files that we have already seen before (they should already be parsed)
		if files.contains_file(&file_path) {
			assert!(
				tree_sitter_trees.contains_key(&file_path),
				"files is not in sync with tree_sitter_trees"
			);
			assert!(asts.contains_key(&file_path), "files is not in sync with asts");
			assert!(
				file_graph.contains_file(&file_path),
				"files is not in sync with file_graph"
			);
			continue;
		}

		let file_text = fs::read_to_string(&file_path).unwrap_or(String::new());
		files.add_file(&file_path, file_text.clone()).unwrap();
		files.get_file(&file_path).unwrap();

		// Parse the file
		let (tree_sitter_tree, ast, dependent_wing_files) = parse_wing_file(&file_path, &file_text);

		// Update our collections of trees and ASTs and our file graph
		tree_sitter_trees.insert(file_path.clone(), tree_sitter_tree);
		asts.insert(file_path.clone(), ast);
		file_graph.update_file(&file_path, &dependent_wing_files);

		// Add the file's dependencies to the list of files to parse
		unparsed_files.extend(dependent_wing_files);
	}

	// Return the files in the order they should be compiled
	match file_graph.toposort() {
		Ok(files) => files,
		Err(cycle) => {
			let formatted_cycle = cycle.iter().map(|path| format!("- {}\n", path)).collect::<String>();

			report_diagnostic(Diagnostic {
				message: format!(
					"Could not compile \"{}\" due to cyclic bring statements:\n{}",
					init_path,
					formatted_cycle.trim_end()
				),
				span: None,
			});

			// return a list of all files just so we can continue type-checking
			asts.keys().cloned().collect::<Vec<_>>()
		}
	}
}

fn parse_wing_file(source_path: &Utf8Path, source_text: &str) -> (tree_sitter::Tree, Scope, Vec<Utf8PathBuf>) {
	let language = tree_sitter_wing::language();
	let mut tree_sitter_parser = tree_sitter::Parser::new();
	tree_sitter_parser.set_language(language).unwrap();

	let tree_sitter_tree = match tree_sitter_parser.parse(&source_text.as_bytes(), None) {
		Some(tree) => tree,
		None => {
			panic!("Error parsing source file with tree-sitter: {}", source_path);
		}
	};

	let tree_sitter_root = tree_sitter_tree.root_node();

	let parser = Parser::new(&source_text.as_bytes(), source_path.to_string());
	let (scope, dependent_wing_files) = parser.parse(&tree_sitter_root);
	(tree_sitter_tree, scope, dependent_wing_files)
}

/// Parses a single Wing source file.
pub struct Parser<'a> {
	/// Source code of the file being parsed
	pub source: &'a [u8],
	pub source_name: String,
	pub error_nodes: RefCell<HashSet<usize>>,
	// Nesting level within JSON literals, a value larger than 0 means we're currently in a JSON literal
	in_json: RefCell<u64>,
	is_in_mut_json: RefCell<bool>,
	is_in_loop: RefCell<bool>,
	/// Track all file paths that have been found while parsing the current file
	/// These will need to be eventually parsed (or diagnostics will be reported if they don't exist)
	referenced_wing_files: RefCell<Vec<Utf8PathBuf>>,
}

impl<'s> Parser<'s> {
	pub fn new(source: &'s [u8], source_name: String) -> Self {
		Self {
			source,
			source_name,
			error_nodes: RefCell::new(HashSet::new()),
			is_in_loop: RefCell::new(false),
			// This is similar to what we do in the type_checker, but we need to know 2 things when
			// parsing Json. 1) Are we nested in a Json literal? 2) Are we nested in a mutable Json literal?
			// thus in_json and is_in_mut_json will track the depth of the nesting and whether we should inherit
			// mutability from the root of the Json literal.
			in_json: RefCell::new(0),
			is_in_mut_json: RefCell::new(false),
			referenced_wing_files: RefCell::new(Vec::new()),
		}
	}

	pub fn parse(self, root: &Node) -> (Scope, Vec<Utf8PathBuf>) {
		let scope = match root.kind() {
			"source" => self.build_scope(&root, Phase::Preflight),
			_ => Scope::empty(),
		};

		self.report_unhandled_errors(&root);

		(scope, self.referenced_wing_files.into_inner())
	}

	fn add_error_from_span(&self, message: impl ToString, span: WingSpan) {
		let diag = Diagnostic {
			message: message.to_string(),
			span: Some(span),
		};
		report_diagnostic(diag);
	}

	fn add_error(&self, message: impl ToString, node: &Node) {
		let diag = Diagnostic {
			message: message.to_string(),
			span: Some(self.node_span(node)),
		};
		report_diagnostic(diag);

		// Track that we have produced a diagnostic for this node
		// (note: it may not necessarily refer to a tree-sitter "ERROR" node)
		self.error_nodes.borrow_mut().insert(node.id());
	}

	fn with_error<T>(&self, message: impl ToString, node: &Node) -> Result<T, ()> {
		self.add_error(message, node);

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
			self.with_error(
				format!(
					"{} \"{}\" is not supported yet - see {}",
					grammar_context, grammar_element, entry
				),
				node,
			)?
		} else {
			self.with_error(format!("Unexpected {} \"{}\"", grammar_context, grammar_element), node)?
		}
	}

	fn node_text<'a>(&'a self, node: &Node) -> &'a str {
		return str::from_utf8(&self.source[node.byte_range()]).unwrap();
	}

	fn check_error<'a>(&'a self, node: Node<'a>, expected: &str) -> DiagnosticResult<Node> {
		if node.is_error() {
			self.with_error(format!("Expected {}", expected), &node)
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
			self.with_error(format!("Expected {}", field), &node)
		}
	}

	fn node_symbol(&self, node: &Node) -> DiagnosticResult<Symbol> {
		let checked_node = self.check_error(*node, "symbol")?;
		Ok(Symbol {
			span: self.node_span(&checked_node),
			name: self.node_text(&checked_node).to_string(),
		})
	}

	fn build_duration(&self, node: &Node) -> DiagnosticResult<Expr> {
		let value = self.check_error(node.named_child(0).unwrap(), "duration")?;
		let value_literal = self
			.node_text(&self.get_child_field(&value, "value")?)
			.parse::<f64>()
			.expect("Duration string");

		let seconds = match value.kind() {
			"milliseconds" => value_literal / 1000_f64,
			"seconds" => value_literal,
			"minutes" => value_literal * 60_f64,
			"hours" => value_literal * 3600_f64,
			"days" => value_literal * 86400_f64,
			"months" => value_literal * 2628000_f64,
			"years" => value_literal * 31536000_f64,
			"ERROR" => self.with_error("Expected duration type", &node)?,
			other => self.report_unimplemented_grammar(other, "duration type", node)?,
		};
		let span = self.node_span(node);
		// represent duration literals as the AST equivalent of `duration.fromSeconds(value)`
		Ok(Expr::new(
			ExprKind::Call {
				callee: CalleeKind::Expr(Box::new(Expr::new(
					ExprKind::Reference(Reference::InstanceMember {
						object: Box::new(Expr::new(
							ExprKind::Reference(Reference::Identifier(Symbol {
								name: "duration".to_string(),
								span: span.clone(),
							})),
							span.clone(),
						)),
						property: Symbol {
							name: "fromSeconds".to_string(),
							span: span.clone(),
						},
						optional_accessor: false,
					}),
					span.clone(),
				))),
				arg_list: ArgList {
					pos_args: vec![Expr::new(ExprKind::Literal(Literal::Number(seconds)), span.clone())],
					named_args: IndexMap::new(),
					span: span.clone(),
				},
			},
			span.clone(),
		))
	}

	fn node_span(&self, node: &Node) -> WingSpan {
		let node_range = node.range();
		WingSpan {
			start: node_range.start_point.into(),
			end: node_range.end_point.into(),
			file_id: self.source_name.clone(),
		}
	}

	fn build_scope(&self, scope_node: &Node, phase: Phase) -> Scope {
		let span = self.node_span(scope_node);
		CompilationContext::set(CompilationPhase::Parsing, &span);
		let mut cursor = scope_node.walk();

		let statements = scope_node
			.named_children(&mut cursor)
			.filter(|child| !child.is_extra() && child.kind() != "AUTOMATIC_BLOCK")
			.enumerate()
			.filter_map(|(i, st_node)| self.build_statement(&st_node, i, phase).ok())
			.collect();
		Scope::new(statements, span)
	}

	fn build_statement(&self, statement_node: &Node, idx: usize, phase: Phase) -> DiagnosticResult<Stmt> {
		let span = self.node_span(statement_node);
		CompilationContext::set(CompilationPhase::Parsing, &span);
		let stmt_kind = match statement_node.kind() {
			"import_statement" => self.build_bring_statement(statement_node)?,

			"variable_definition_statement" => self.build_variable_def_statement(statement_node, phase)?,
			"variable_assignment_statement" => self.build_assignment_statement(statement_node, phase)?,

			"expression_statement" => {
				StmtKind::Expression(self.build_expression(&statement_node.named_child(0).unwrap(), phase)?)
			}
			"block" => StmtKind::Scope(self.build_scope(statement_node, phase)),
			"if_statement" => self.build_if_statement(statement_node, phase)?,
			"if_let_statement" => self.build_if_let_statement(statement_node, phase)?,
			"for_in_loop" => self.build_for_statement(statement_node, phase)?,
			"while_statement" => self.build_while_statement(statement_node, phase)?,
			"break_statement" => self.build_break_statement(statement_node)?,
			"continue_statement" => self.build_continue_statement(statement_node)?,
			"return_statement" => self.build_return_statement(statement_node, phase)?,
			"throw_statement" => self.build_throw_statement(statement_node, phase)?,
			"class_definition" => self.build_class_statement(statement_node, Phase::Inflight)?, // `inflight class` is always "inflight"
			"resource_definition" => self.build_class_statement(statement_node, phase)?, // `class` without a modifier inherits from scope
			"interface_definition" => self.build_interface_statement(statement_node, phase)?,
			"enum_definition" => self.build_enum_statement(statement_node)?,
			"try_catch_statement" => self.build_try_catch_statement(statement_node, phase)?,
			"struct_definition" => self.build_struct_definition_statement(statement_node, phase)?,
			"test_statement" => self.build_test_statement(statement_node)?,
			"compiler_dbg_env" => StmtKind::CompilerDebugEnv,
			"super_constructor_statement" => self.build_super_constructor_statement(statement_node, phase, idx)?,
			"ERROR" => return self.with_error("Expected statement", statement_node),
			other => return self.report_unimplemented_grammar(other, "statement", statement_node),
		};

		Ok(Stmt {
			kind: stmt_kind,
			span,
			idx,
		})
	}

	fn build_try_catch_statement(&self, statement_node: &Node, phase: Phase) -> DiagnosticResult<StmtKind> {
		let try_statements = self.build_scope(&statement_node.child_by_field_name("block").unwrap(), phase);
		let catch_block = if let Some(catch_block) = statement_node.child_by_field_name("catch_block") {
			Some(CatchBlock {
				statements: self.build_scope(&catch_block, phase),
				exception_var: if let Some(exception_var_node) = statement_node.child_by_field_name("exception_identifier") {
					Some(self.check_reserved_symbol(&exception_var_node)?)
				} else {
					None
				},
			})
		} else {
			None
		};

		let finally_statements = if let Some(finally_node) = statement_node.child_by_field_name("finally_block") {
			Some(self.build_scope(&finally_node, phase))
		} else {
			None
		};

		// If both catch and finally are missing, report an error
		if catch_block.is_none() && finally_statements.is_none() {
			return self.with_error::<StmtKind>(
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

	fn build_return_statement(&self, statement_node: &Node, phase: Phase) -> DiagnosticResult<StmtKind> {
		Ok(StmtKind::Return(
			if let Some(return_expression_node) = statement_node.child_by_field_name("expression") {
				Some(self.build_expression(&return_expression_node, phase)?)
			} else {
				None
			},
		))
	}

	fn build_throw_statement(&self, statement_node: &Node, phase: Phase) -> DiagnosticResult<StmtKind> {
		let expr = self.build_expression(&statement_node.child_by_field_name("expression").unwrap(), phase)?;
		Ok(StmtKind::Throw(expr))
	}

	/// Builds scope statements for a loop (while/for), and maintains the is_in_loop flag
	/// for the duration of the loop. So that later break statements inside can be validated
	/// without traversing the AST.
	fn build_in_loop_scope(&self, scope_node: &Node, phase: Phase) -> Scope {
		let prev_is_in_loop = *self.is_in_loop.borrow();
		*self.is_in_loop.borrow_mut() = true;
		let scope = self.build_scope(scope_node, phase);
		*self.is_in_loop.borrow_mut() = prev_is_in_loop;
		scope
	}

	fn build_while_statement(&self, statement_node: &Node, phase: Phase) -> DiagnosticResult<StmtKind> {
		Ok(StmtKind::While {
			condition: self.build_expression(&statement_node.child_by_field_name("condition").unwrap(), phase)?,
			statements: self.build_in_loop_scope(&statement_node.child_by_field_name("block").unwrap(), phase),
		})
	}

	fn build_for_statement(&self, statement_node: &Node, phase: Phase) -> DiagnosticResult<StmtKind> {
		Ok(StmtKind::ForLoop {
			iterator: self.check_reserved_symbol(&statement_node.child_by_field_name("iterator").unwrap())?,
			iterable: self.build_expression(&statement_node.child_by_field_name("iterable").unwrap(), phase)?,
			statements: self.build_in_loop_scope(&statement_node.child_by_field_name("block").unwrap(), phase),
		})
	}

	fn build_break_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		if !*self.is_in_loop.borrow() {
			return self.with_error::<StmtKind>(
				"Expected break statement to be inside of a loop (while/for)",
				statement_node,
			);
		}
		Ok(StmtKind::Break)
	}

	fn build_continue_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		if !*self.is_in_loop.borrow() {
			return self.with_error::<StmtKind>(
				"Expected continue statement to be inside of a loop (while/for)",
				statement_node,
			);
		}
		Ok(StmtKind::Continue)
	}

	fn build_if_let_statement(&self, statement_node: &Node, phase: Phase) -> DiagnosticResult<StmtKind> {
		let if_block = self.build_scope(&statement_node.child_by_field_name("block").unwrap(), phase);
		let reassignable = statement_node.child_by_field_name("reassignable").is_some();
		let value = self.build_expression(&statement_node.child_by_field_name("value").unwrap(), phase)?;
		let name = self.check_reserved_symbol(&statement_node.child_by_field_name("name").unwrap())?;

		let mut elif_vec = vec![];
		let mut cursor = statement_node.walk();
		for node in statement_node.children_by_field_name("elif_let_block", &mut cursor) {
			let statements = self.build_scope(&node.child_by_field_name("block").unwrap(), phase);
			let value = self.build_expression(&node.child_by_field_name("value").unwrap(), phase)?;
			let name = self.check_reserved_symbol(&statement_node.child_by_field_name("name").unwrap())?;
			let elif = ElifLetBlock {
				reassignable: node.child_by_field_name("reassignable").is_some(),
				statements: statements,
				value: value,
				var_name: name,
			};
			elif_vec.push(elif);
		}

		let else_block = if let Some(else_block) = statement_node.child_by_field_name("else_block") {
			Some(self.build_scope(&else_block, phase))
		} else {
			None
		};
		Ok(StmtKind::IfLet {
			var_name: name,
			reassignable,
			value,
			statements: if_block,
			elif_statements: elif_vec,
			else_statements: else_block,
		})
	}

	fn build_if_statement(&self, statement_node: &Node, phase: Phase) -> DiagnosticResult<StmtKind> {
		let if_block = self.build_scope(&statement_node.child_by_field_name("block").unwrap(), phase);
		let mut elif_vec = vec![];
		let mut cursor = statement_node.walk();
		for node in statement_node.children_by_field_name("elif_block", &mut cursor) {
			let conditions = self.build_expression(&node.child_by_field_name("condition").unwrap(), phase);
			let statements = self.build_scope(&node.child_by_field_name("block").unwrap(), phase);
			let elif = ElifBlock {
				condition: conditions.unwrap(),
				statements: statements,
			};
			elif_vec.push(elif);
		}
		let else_block = if let Some(else_block) = statement_node.child_by_field_name("else_block") {
			Some(self.build_scope(&else_block, phase))
		} else {
			None
		};
		Ok(StmtKind::If {
			condition: self.build_expression(&statement_node.child_by_field_name("condition").unwrap(), phase)?,
			statements: if_block,
			elif_statements: elif_vec,
			else_statements: else_block,
		})
	}

	fn build_assignment_statement(&self, statement_node: &Node, phase: Phase) -> DiagnosticResult<StmtKind> {
		let reference = self.build_reference(&statement_node.child_by_field_name("name").unwrap(), phase)?;
		if let ExprKind::Reference(r) = reference.kind {
			Ok(StmtKind::Assignment {
				variable: r,
				value: self.build_expression(&statement_node.child_by_field_name("value").unwrap(), phase)?,
			})
		} else {
			self.with_error(
				"Expected a reference on the left hand side of an assignment",
				statement_node,
			)
		}
	}

	fn build_struct_definition_statement(&self, statement_node: &Node, phase: Phase) -> DiagnosticResult<StmtKind> {
		let name = self.check_reserved_symbol(&self.get_child_field(&statement_node, "name")?)?;

		let mut cursor = statement_node.walk();
		let mut members = vec![];

		for field_node in statement_node.children_by_field_name("field", &mut cursor) {
			let identifier = self.node_symbol(&self.get_child_field(&field_node, "name")?)?;
			let type_ = self.get_child_field(&field_node, "type").ok();
			let f = StructField {
				name: identifier,
				member_type: self.build_type_annotation(type_, phase)?,
			};
			members.push(f);
		}

		let mut extends = vec![];
		for super_node in statement_node.children_by_field_name("extends", &mut cursor) {
			let super_type = self.build_type_annotation(Some(super_node), phase)?;
			match super_type.kind {
				TypeAnnotationKind::UserDefined(t) => {
					extends.push(t);
				}
				_ => {
					self.with_error::<Node>(
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

	fn build_variable_def_statement(&self, statement_node: &Node, phase: Phase) -> DiagnosticResult<StmtKind> {
		let type_ = if let Some(type_node) = statement_node.child_by_field_name("type") {
			Some(self.build_type_annotation(Some(type_node), phase)?)
		} else {
			None
		};
		Ok(StmtKind::Let {
			reassignable: statement_node.child_by_field_name("reassignable").is_some(),
			var_name: self.check_reserved_symbol(&statement_node.child_by_field_name("name").unwrap())?,
			initial_value: self.build_expression(&statement_node.child_by_field_name("value").unwrap(), phase)?,
			type_,
		})
	}

	fn build_bring_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		let module_name = self.node_symbol(&statement_node.child_by_field_name("module_name").unwrap())?;
		let alias = if let Some(identifier) = statement_node.child_by_field_name("alias") {
			Some(self.check_reserved_symbol(&identifier)?)
		} else {
			None
		};

		// if the module name is a path ending in .w, create a new Parser to parse it as a new Scope,
		// and create a StmtKind::Module instead
		if module_name.name.starts_with("\"") && module_name.name.ends_with(".w\"") {
			let module_path = Utf8Path::new(&module_name.name[1..module_name.name.len() - 1]);
			let source_path = normalize_path(module_path, Some(&Utf8Path::new(&self.source_name)));
			if source_path == Utf8Path::new(&self.source_name) {
				return self.with_error("Cannot bring a module into itself", statement_node);
			}
			if !source_path.exists() {
				return self.with_error(format!("Cannot find module \"{}\"", source_path), statement_node);
			}
			if !source_path.is_file() {
				return self.with_error(
					format!("Cannot bring module \"{}\": not a file", source_path),
					statement_node,
				);
			}
			self.referenced_wing_files.borrow_mut().push(source_path.clone());

			// parse error if no alias is provided
			let module = if let Some(alias) = alias {
				Ok(StmtKind::Bring {
					source: BringSource::WingFile(Symbol {
						name: source_path.to_string(),
						span: module_name.span,
					}),
					identifier: Some(alias),
				})
			} else {
				self.with_error::<StmtKind>(
					format!(
						"bring {} must be assigned to an identifier (e.g. bring \"foo\" as foo)",
						module_name
					),
					statement_node,
				)
			};

			return module;
		}

		if module_name.name.starts_with("\"") && module_name.name.ends_with("\"") {
			return if let Some(alias) = alias {
				Ok(StmtKind::Bring {
					source: BringSource::JsiiModule(Symbol {
						name: module_name.name[1..module_name.name.len() - 1].to_string(),
						span: module_name.span,
					}),
					identifier: Some(alias),
				})
			} else {
				self.with_error::<StmtKind>(
					format!(
						"bring {} must be assigned to an identifier (e.g. bring \"foo\" as foo)",
						module_name
					),
					statement_node,
				)
			};
		}

		Ok(StmtKind::Bring {
			source: BringSource::BuiltinModule(module_name),
			identifier: alias,
		})
	}

	fn build_enum_statement(&self, statement_node: &Node) -> DiagnosticResult<StmtKind> {
		let name = self.check_reserved_symbol(&statement_node.child_by_field_name("enum_name").unwrap());
		if name.is_err() {
			self
				.with_error::<Node>(String::from("Invalid enum name"), &statement_node)
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
				self.with_error::<Node>(String::from("Invalid enum value"), &node).err();
				continue;
			}

			let symbol = diagnostic.unwrap();
			let success = values.insert(symbol.clone());
			if !success {
				self
					.with_error::<Node>(format!("Duplicated enum value {}", symbol.name), &node)
					.err();
			}
		}

		Ok(StmtKind::Enum {
			name: name.unwrap(),
			values,
		})
	}

	fn build_class_statement(&self, statement_node: &Node, class_phase: Phase) -> DiagnosticResult<StmtKind> {
		let mut cursor = statement_node.walk();
		let mut fields = vec![];
		let mut methods = vec![];
		let mut initializer = None;
		let mut inflight_initializer = None;
		let name = self.check_reserved_symbol(&statement_node.child_by_field_name("name").unwrap())?;
		for class_element in statement_node
			.child_by_field_name("implementation")
			.unwrap()
			.named_children(&mut cursor)
		{
			if class_element.is_extra() {
				continue;
			}
			match class_element.kind() {
				"method_definition" | "inflight_method_definition" => {
					let mut phase = class_phase;
					if class_element.kind() == "inflight_method_definition" {
						phase = Phase::Inflight;
					}

					let is_static = class_element.child_by_field_name("static").is_some();
					let Ok(method_name) = self.node_symbol(&class_element.child_by_field_name("name").unwrap()) else {
						continue;
					};

					let Ok(func_def) = self.build_function_definition(Some(method_name.clone()), &class_element, phase, is_static) else {
						continue;
					};

					// make sure all the parameters have type annotations
					for param in &func_def.signature.parameters {
						if matches!(param.type_annotation.kind, TypeAnnotationKind::Inferred) {
							self.add_error_from_span(
								"Missing required type annotation for method signature",
								param.name.span.clone(),
							);
						}
					}

					methods.push((method_name, func_def))
				}
				"class_field" => {
					let is_static = class_element.child_by_field_name("static").is_some();
					if is_static {
						report_diagnostic(Diagnostic {
							message: "Static class fields not supported yet, see https://github.com/winglang/wing/issues/1668"
								.to_string(),
							span: Some(self.node_span(&class_element)),
						});
					}

					// if there is no "phase_modifier", then inherit from the class phase
					// currently "phase_modifier" can only be "inflight".
					let phase = match class_element.child_by_field_name("phase_modifier") {
						None => class_phase,
						Some(_) => Phase::Inflight,
					};

					fields.push(ClassField {
						name: self.node_symbol(&class_element.child_by_field_name("name").unwrap())?,
						member_type: self.build_type_annotation(class_element.child_by_field_name("type"), phase)?,
						reassignable: class_element.child_by_field_name("reassignable").is_some(),
						is_static,
						phase,
					})
				}
				"initializer" => {
					// the initializer is considered an inflight initializer if either the class is inflight
					// (and then everything inside it is inflight by definition) or if there's an "inflight"
					// modifier.
					let is_inflight = class_phase == Phase::Inflight || class_element.child_by_field_name("inflight").is_some();
					if initializer.is_some() && !is_inflight {
						self
							.with_error::<Node>(
								format!("Multiple initializers defined in class {}", name.name),
								&class_element,
							)
							.err();
					} else if inflight_initializer.is_some() && is_inflight {
						self
							.with_error::<Node>(
								format!("Multiple inflight initializers defined in class {}", name.name),
								&class_element,
							)
							.err();
					}
					let parameters_node = class_element.child_by_field_name("parameter_list").unwrap();
					let parameters = self.build_parameter_list(&parameters_node, class_phase)?;
					if !parameters.is_empty() && is_inflight && class_phase == Phase::Preflight {
						self
							.with_error::<Node>("Inflight initializers cannot have parameters", &parameters_node)
							.err();
					}

					let init_return_type = Box::new(TypeAnnotation {
						kind: TypeAnnotationKind::UserDefined(UserDefinedType {
							root: name.clone(),
							fields: vec![],
							span: name.span.clone(),
						}),
						span: self.node_span(&class_element),
					});

					if is_inflight {
						inflight_initializer = Some(FunctionDefinition {
							name: Some(CLASS_INFLIGHT_INIT_NAME.into()),
							body: FunctionBody::Statements(
								self.build_scope(&class_element.child_by_field_name("block").unwrap(), Phase::Inflight),
							),
							signature: FunctionSignature {
								parameters,
								return_type: init_return_type,
								phase: Phase::Inflight,
							},
							is_static: false,
							span: self.node_span(&class_element),
						})
					} else {
						initializer = Some(FunctionDefinition {
							name: Some(CLASS_INIT_NAME.into()),
							body: FunctionBody::Statements(
								self.build_scope(&class_element.child_by_field_name("block").unwrap(), Phase::Preflight),
							),
							is_static: false,
							signature: FunctionSignature {
								parameters,
								return_type: init_return_type,
								phase: Phase::Preflight,
							},
							span: self.node_span(&class_element),
						})
					}
				}
				"ERROR" => {
					self
						.with_error::<Node>("Expected class element node", &class_element)
						.err();
				}
				other => {
					panic!("Unexpected class element node type {} || {:#?}", other, class_element);
				}
			}
		}

		for method in &methods {
			if method.0.name == "constructor" {
				self.add_error_from_span(
					"Reserved method name. Initializers are declared with \"init\"",
					method.0.span.clone(),
				)
			}
		}

		let initializer = match initializer {
			Some(init) => init,
			// add a default initializer if none is defined
			None => FunctionDefinition {
				name: Some(CLASS_INIT_NAME.into()),
				signature: FunctionSignature {
					parameters: vec![],
					return_type: Box::new(TypeAnnotation {
						kind: TypeAnnotationKind::UserDefined(UserDefinedType {
							root: name.clone(),
							fields: vec![],
							span: WingSpan::default(),
						}),
						span: WingSpan::default(),
					}),
					phase: Phase::Preflight,
				},
				body: FunctionBody::Statements(Scope::new(vec![], WingSpan::default())),
				is_static: false,
				span: WingSpan::default(),
			},
		};

		let inflight_initializer = match inflight_initializer {
			Some(init) => init,

			// add a default inflight initializer if none is defined
			None => FunctionDefinition {
				name: Some(CLASS_INFLIGHT_INIT_NAME.into()),
				signature: FunctionSignature {
					parameters: vec![],
					return_type: Box::new(TypeAnnotation {
						kind: TypeAnnotationKind::UserDefined(UserDefinedType {
							root: name.clone(),
							fields: vec![],
							span: WingSpan::default(),
						}),
						span: WingSpan::default(),
					}),
					phase: Phase::Inflight,
				},
				body: FunctionBody::Statements(Scope::new(vec![], WingSpan::default())),
				is_static: false,
				span: WingSpan::default(),
			},
		};

		let parent = if let Some(parent_node) = statement_node.child_by_field_name("parent") {
			let parent_type = self.build_type_annotation(Some(parent_node), class_phase)?;
			match parent_type.kind {
				TypeAnnotationKind::UserDefined(parent_type) => Some(parent_type),
				_ => {
					self.with_error::<Node>(
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

			let interface_type = self.build_type_annotation(Some(type_node), class_phase)?;
			match interface_type.kind {
				TypeAnnotationKind::UserDefined(interface_type) => implements.push(interface_type),
				_ => {
					self.with_error::<Node>(
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
			phase: class_phase,
			inflight_initializer,
		}))
	}

	fn build_interface_statement(&self, statement_node: &Node, phase: Phase) -> DiagnosticResult<StmtKind> {
		let mut cursor = statement_node.walk();
		let mut extends = vec![];
		let mut methods = vec![];
		let name = self.check_reserved_symbol(&statement_node.child_by_field_name("name").unwrap())?;

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
					let method_name = self.node_symbol(&interface_element.child_by_field_name("name").unwrap());
					let func_sig = self.build_function_signature(&interface_element, phase);
					match (method_name, func_sig) {
						(Ok(method_name), Ok(func_sig)) => methods.push((method_name, func_sig)),
						_ => {}
					}
				}
				"inflight_method_signature" => {
					if let Ok((method_name, func_sig)) = self.build_interface_method(interface_element, Phase::Inflight) {
						methods.push((method_name, func_sig))
					}
				}
				"class_field" => {
					self
						.with_error::<Node>("Properties are not supported in interfaces", &interface_element)
						.err();
				}
				"ERROR" => {
					self
						.with_error::<Node>("Expected interface element node", &interface_element)
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
		phase: Phase,
	) -> DiagnosticResult<(Symbol, FunctionSignature)> {
		let name = interface_element.child_by_field_name("name").unwrap();
		let method_name = self.node_symbol(&name)?;
		let func_sig = self.build_function_signature(&interface_element, phase)?;
		Ok((method_name, func_sig))
	}

	fn build_function_signature(&self, func_sig_node: &Node, phase: Phase) -> DiagnosticResult<FunctionSignature> {
		let parameters = self.build_parameter_list(&func_sig_node.child_by_field_name("parameter_list").unwrap(), phase)?;
		let return_type = if let Some(rt) = func_sig_node.child_by_field_name("type") {
			self.build_type_annotation(Some(rt), phase)?
		} else {
			let func_sig_kind = func_sig_node.kind();
			if func_sig_kind == "inflight_closure" || func_sig_kind == "preflight_closure" {
				TypeAnnotation {
					kind: TypeAnnotationKind::Inferred,
					span: Default::default(),
				}
			} else {
				TypeAnnotation {
					kind: TypeAnnotationKind::Void,
					span: Default::default(),
				}
			}
		};

		Ok(FunctionSignature {
			parameters,
			return_type: Box::new(return_type),
			phase,
		})
	}

	fn build_anonymous_closure(&self, anon_closure_node: &Node, phase: Phase) -> DiagnosticResult<FunctionDefinition> {
		self.build_function_definition(None, anon_closure_node, phase, true)
	}

	fn build_function_definition(
		&self,
		name: Option<Symbol>,
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
			FunctionBody::Statements(self.build_scope(&self.get_child_field(func_def_node, "block")?, phase))
		};

		Ok(FunctionDefinition {
			name,
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
	fn build_parameter_list(&self, parameter_list_node: &Node, phase: Phase) -> DiagnosticResult<Vec<FunctionParameter>> {
		let mut res = vec![];
		let mut cursor = parameter_list_node.walk();
		for definition_node in parameter_list_node.named_children(&mut cursor) {
			if definition_node.is_extra() {
				continue;
			}

			res.push(FunctionParameter {
				name: self.check_reserved_symbol(&definition_node.child_by_field_name("name").unwrap())?,
				type_annotation: self.build_type_annotation(definition_node.child_by_field_name("type"), phase)?,
				reassignable: definition_node.child_by_field_name("reassignable").is_some(),
				variadic: definition_node.child_by_field_name("variadic").is_some(),
			});
		}

		Ok(res)
	}
	fn build_udt(&self, type_node: &Node) -> DiagnosticResult<UserDefinedType> {
		match type_node.kind() {
			"custom_type" => {
				// check if last node is a "."
				let last_child = type_node
					.child(type_node.child_count() - 1)
					.expect("If node is a custom type, it will have at least one child");

				if last_child.kind() == "." {
					// even though we're missing a field, we can still parse the rest of the type
					self.add_error("Expected namespaced type", &last_child);
				}

				let mut cursor = type_node.walk();
				let udt = UserDefinedType {
					root: self.node_symbol(&type_node.child_by_field_name("object").unwrap())?,
					fields: type_node
						.children_by_field_name("fields", &mut cursor)
						.map(|n| self.node_symbol(&n).unwrap())
						.collect(),
					span: self.node_span(&type_node),
				};

				Ok(udt)
			}
			"mutable_container_type" | "immutable_container_type" => {
				let container_type = self.node_text(&type_node.child_by_field_name("collection_type").unwrap());
				match container_type {
					"ERROR" => self.with_error("Expected builtin container type", type_node)?,
					builtin => {
						let udt = UserDefinedType {
							root: Symbol::global(WINGSDK_STD_MODULE),
							fields: vec![Symbol {
								name: builtin.to_string(),
								span: self.node_span(&type_node),
							}],
							span: self.node_span(&type_node),
						};
						Ok(udt)
					}
				}
			}
			other => self.with_error(format!("Expected class. Found {}", other), type_node),
		}
	}

	fn build_type_annotation(&self, type_node: Option<Node>, phase: Phase) -> DiagnosticResult<TypeAnnotation> {
		let type_node = &match type_node {
			Some(node) => node,
			None => {
				return Ok(TypeAnnotation {
					kind: TypeAnnotationKind::Inferred,
					span: Default::default(),
				})
			}
		};

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
				"ERROR" => self.with_error("Expected builtin type", type_node),
				other => return self.report_unimplemented_grammar(other, "builtin", type_node),
			},
			"optional" => {
				let inner_type = self.build_type_annotation(type_node.named_child(0), phase).unwrap();
				Ok(TypeAnnotation {
					kind: TypeAnnotationKind::Optional(Box::new(inner_type)),
					span,
				})
			}
			"custom_type" => Ok(self.build_udt_annotation(&type_node)?),
			"function_type" => {
				let param_type_list_node = type_node.child_by_field_name("parameter_types").unwrap();
				let mut cursor = param_type_list_node.walk();

				let mut parameters = vec![];
				for param_type in param_type_list_node.named_children(&mut cursor) {
					let t = self.build_type_annotation(Some(param_type), phase)?;

					parameters.push(FunctionParameter {
						name: "".into(),
						type_annotation: t,
						reassignable: false,
						variadic: false,
					})
				}

				match type_node.child_by_field_name("return_type") {
					Some(return_type) => Ok(TypeAnnotation {
						kind: TypeAnnotationKind::Function(FunctionSignature {
							parameters,
							return_type: Box::new(self.build_type_annotation(Some(return_type), phase)?),
							phase: if type_node.child_by_field_name("inflight").is_some() {
								Phase::Inflight
							} else {
								phase // inherit from scope
							},
						}),
						span,
					}),
					None => self.with_error("Expected function return type".to_string(), &type_node),
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
					other => self.with_error(format!("invalid json container type {}", other), &type_node),
				}
			}
			"mutable_container_type" | "immutable_container_type" => {
				let container_type = self.node_text(&type_node.child_by_field_name("collection_type").unwrap());
				let element_type = type_node.child_by_field_name("type_parameter");
				match container_type {
					"Map" => Ok(TypeAnnotation {
						kind: TypeAnnotationKind::Map(Box::new(self.build_type_annotation(element_type, phase)?)),
						span,
					}),
					"MutMap" => Ok(TypeAnnotation {
						kind: TypeAnnotationKind::MutMap(Box::new(self.build_type_annotation(element_type, phase)?)),
						span,
					}),
					"Array" => Ok(TypeAnnotation {
						kind: TypeAnnotationKind::Array(Box::new(self.build_type_annotation(element_type, phase)?)),
						span,
					}),
					"MutArray" => Ok(TypeAnnotation {
						kind: TypeAnnotationKind::MutArray(Box::new(self.build_type_annotation(element_type, phase)?)),
						span,
					}),
					"Set" => Ok(TypeAnnotation {
						kind: TypeAnnotationKind::Set(Box::new(self.build_type_annotation(element_type, phase)?)),
						span,
					}),
					"MutSet" => Ok(TypeAnnotation {
						kind: TypeAnnotationKind::MutSet(Box::new(self.build_type_annotation(element_type, phase)?)),
						span,
					}),
					"ERROR" => self.with_error("Expected builtin container type", type_node)?,
					other => self.report_unimplemented_grammar(other, "builtin container type", type_node),
				}
			}
			"ERROR" => self.with_error("Expected type", type_node),
			other => self.report_unimplemented_grammar(other, "type", type_node),
		}
	}

	fn build_nested_identifier(&self, nested_node: &Node, phase: Phase) -> DiagnosticResult<Expr> {
		if nested_node.has_error() {
			return self.with_error("Syntax error", &nested_node);
		}

		let object_expr = self.get_child_field(nested_node, "object")?;

		if let Some(property) = nested_node.child_by_field_name("property") {
			if object_expr.kind() == "json_container_type" {
				Ok(Expr::new(
					ExprKind::Reference(Reference::TypeMember {
						type_name: UserDefinedType {
							root: Symbol::global(WINGSDK_STD_MODULE),
							fields: vec![self.node_symbol(&object_expr)?],
							span: self.node_span(&object_expr),
						},
						property: self.node_symbol(&property)?,
					}),
					self.node_span(&object_expr),
				))
			} else {
				let object_expr = self.build_expression(&object_expr, phase)?;
				let accessor_sym = self.node_symbol(&self.get_child_field(nested_node, "accessor_type")?)?;
				let optional_accessor = match accessor_sym.name.as_str() {
					"?." => true,
					_ => false,
				};
				Ok(Expr::new(
					ExprKind::Reference(Reference::InstanceMember {
						object: Box::new(object_expr),
						property: self.node_symbol(&property)?,
						optional_accessor,
					}),
					self.node_span(&nested_node),
				))
			}
		} else {
			// we are missing the last property, but we can still parse the rest of the expression
			self.add_error(
				"Expected property",
				&nested_node
					.child(nested_node.child_count() - 1)
					.expect("Nested identifier should have at least one child"),
			);
			self.build_expression(&object_expr, phase)
		}
	}

	fn build_udt_annotation(&self, nested_node: &Node) -> DiagnosticResult<TypeAnnotation> {
		// check if last node is a "."
		let last_child = nested_node
			.child(nested_node.child_count() - 1)
			.expect("If node is a custom type, it will have at least one child");
		if last_child.kind() == "." {
			// even though we're missing a field, we can still parse the rest of the type
			self.add_error("Expected namespaced type", &last_child);
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

	fn build_reference(&self, reference_node: &Node, phase: Phase) -> DiagnosticResult<Expr> {
		let actual_node = reference_node.named_child(0).unwrap();
		let actual_node_span = self.node_span(&actual_node);
		match actual_node.kind() {
			"reference_identifier" => Ok(Expr::new(
				ExprKind::Reference(Reference::Identifier(self.node_symbol(&actual_node)?)),
				actual_node_span,
			)),
			"nested_identifier" => Ok(self.build_nested_identifier(&actual_node, phase)?),
			"structured_access_expression" => {
				self.report_unimplemented_grammar("structured_access_expression", "reference", &actual_node)
			}
			other => self.with_error(format!("Expected reference, got {other}"), &actual_node),
		}
	}

	fn build_arg_list(&self, arg_list_node: &Node, phase: Phase) -> DiagnosticResult<ArgList> {
		let span = self.node_span(arg_list_node);
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
						self.add_error("Positional arguments must come before named arguments", &child);
					}
					pos_args.push(self.build_expression(&child, phase)?);
				}
				"keyword_argument" => {
					seen_keyword_args = true;
					let arg_name_node = &child.named_child(0).unwrap();
					let arg_name = self.node_symbol(arg_name_node)?;
					if named_args.contains_key(&arg_name) {
						self.add_error("Duplicate argument name", arg_name_node);
					} else {
						named_args.insert(arg_name, self.build_expression(&child.named_child(1).unwrap(), phase)?);
					}
				}
				"ERROR" => {
					self.with_error::<ArgList>("Invalid argument(s)", &child)?;
				}
				other => panic!("Unexpected argument type {} || {:#?}", other, child),
			}
		}

		Ok(ArgList {
			pos_args,
			named_args,
			span,
		})
	}

	fn build_expression(&self, exp_node: &Node, phase: Phase) -> DiagnosticResult<Expr> {
		let expression_span = self.node_span(exp_node);
		CompilationContext::set(CompilationPhase::Parsing, &expression_span);
		let expression_node = &self.check_error(*exp_node, "expression")?;
		match expression_node.kind() {
			"new_expression" => {
				let class_udt = self.build_udt(&expression_node.child_by_field_name("class").unwrap())?;

				let arg_list = if let Ok(args_node) = self.get_child_field(expression_node, "args") {
					self.build_arg_list(&args_node, phase)
				} else {
					Ok(ArgList::new(WingSpan::default()))
				};

				let obj_id = if let Some(id_node) = expression_node.child_by_field_name("id") {
					Some(Box::new(self.build_expression(&id_node, phase)?))
				} else {
					None
				};
				let obj_scope = if let Some(scope_expr_node) = expression_node.child_by_field_name("scope") {
					Some(Box::new(self.build_expression(&scope_expr_node, phase)?))
				} else {
					None
				};

				Ok(Expr::new(
					ExprKind::New(NewExpr {
						class: class_udt,
						obj_id,
						arg_list: arg_list?,
						obj_scope,
					}),
					expression_span,
				))
			}
			"binary_expression" => Ok(Expr::new(
				ExprKind::Binary {
					left: Box::new(self.build_expression(&expression_node.child_by_field_name("left").unwrap(), phase)?),
					right: Box::new(self.build_expression(&expression_node.child_by_field_name("right").unwrap(), phase)?),
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
						"ERROR" => self.with_error::<BinaryOperator>("Expected binary operator", expression_node)?,
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
						"ERROR" => self.with_error::<UnaryOperator>("Expected unary operator", expression_node)?,
						other => return self.report_unimplemented_grammar(other, "unary operator", expression_node),
					},
					exp: Box::new(self.build_expression(&expression_node.child_by_field_name("arg").unwrap(), phase)?),
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

						parts.push(InterpolatedStringPart::Static(
							str::from_utf8(&self.source[start_from..interpolation_start])
								.unwrap()
								.into(),
						));

						parts.push(InterpolatedStringPart::Expr(
							self.build_expression(&interpolation_node.named_child(0).unwrap(), phase)?,
						));

						last_start = interpolation_start;
						last_end = interpolation_end;
						start_from = last_end;
					}

					parts.push(InterpolatedStringPart::Static(
						str::from_utf8(&self.source[last_end..end]).unwrap().into(),
					));

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
								phase,
							)?,
						),
						inclusive: inclusive,
						end: Box::new(
							self.build_expression(
								&expression_node
									.child_by_field_name("end")
									.expect("range expression should always include end"),
								phase,
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
					"ERROR" => self.with_error::<bool>("Expected boolean literal", expression_node)?,
					other => return self.report_unimplemented_grammar(other, "boolean literal", expression_node),
				})),
				expression_span,
			)),
			"duration" => self.build_duration(&expression_node),
			"reference" => self.build_reference(&expression_node, phase),
			"positional_argument" => self.build_expression(&expression_node.named_child(0).unwrap(), phase),
			"keyword_argument_value" => self.build_expression(&expression_node.named_child(0).unwrap(), phase),
			"call" => {
				let caller_node = expression_node.child_by_field_name("caller").unwrap();
				let callee = if caller_node.kind() == "super_call" {
					CalleeKind::SuperCall(self.node_symbol(&caller_node.child_by_field_name("method").unwrap())?)
				} else {
					CalleeKind::Expr(Box::new(self.build_expression(&caller_node, phase)?))
				};
				Ok(Expr::new(
					ExprKind::Call {
						callee,
						arg_list: self.build_arg_list(&expression_node.child_by_field_name("args").unwrap(), phase)?,
					},
					expression_span,
				))
			}
			"parenthesized_expression" => self.build_expression(&expression_node.named_child(0).unwrap(), phase),
			"preflight_closure" => Ok(Expr::new(
				ExprKind::FunctionClosure(self.build_anonymous_closure(&expression_node, phase)?),
				expression_span,
			)),
			"inflight_closure" => Ok(Expr::new(
				ExprKind::FunctionClosure(self.build_anonymous_closure(&expression_node, Phase::Inflight)?),
				expression_span,
			)),
			"array_literal" => {
				let array_type = if let Some(type_node) = expression_node.child_by_field_name("type") {
					self.build_type_annotation(Some(type_node), phase).ok()
				} else {
					None
				};

				let mut items = Vec::new();
				let mut cursor = expression_node.walk();
				for element_node in expression_node.children_by_field_name("element", &mut cursor) {
					items.push(self.build_expression(&element_node, phase)?);
				}

				Ok(Expr::new(
					ExprKind::ArrayLiteral {
						items,
						type_: array_type,
					},
					expression_span,
				))
			}
			"json_map_literal" => {
				let fields = self.build_map_fields(expression_node, phase)?;
				Ok(Expr::new(ExprKind::JsonMapLiteral { fields }, expression_span))
			}
			"map_literal" => {
				let map_type = if let Some(type_node) = expression_node.child_by_field_name("type") {
					self.build_type_annotation(Some(type_node), phase).ok()
				} else {
					None
				};

				let fields = self.build_map_fields(expression_node, phase)?;

				// Special case: empty {} (which is detected as map by tree-sitter) -
				// if it is annotated as a Set/MutSet we should treat it as a set literal
				if let Some(TypeAnnotation { kind, .. }) = &map_type {
					if matches!(kind, TypeAnnotationKind::Set(_) | TypeAnnotationKind::MutSet(_)) && fields.is_empty() {
						return self.build_set_literal(expression_node, phase);
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
				let type_node = expression_node.child_by_field_name("type");
				*self.in_json.borrow_mut() += 1;

				let mut is_mut = *self.is_in_mut_json.borrow();

				if let Some(type_node) = type_node {
					is_mut = match self.node_text(&type_node) {
						"MutJson" => {
							*self.is_in_mut_json.borrow_mut() = true;
							true
						}
						_ => false,
					};
				}

				let element_node = expression_node
					.child_by_field_name("element")
					.expect("Should always have element");

				let named_element_child = element_node.named_child(0);
				let exp = if element_node.kind() == "reference"
					&& named_element_child
						.expect("references always have a child")
						.is_missing()
				{
					self.add_error("Json literal must have an element", &named_element_child.unwrap());
					Expr::new(ExprKind::Literal(Literal::Number(0.0)), self.node_span(&element_node))
				} else {
					self.build_expression(&element_node, phase)?
				};

				*self.in_json.borrow_mut() -= 1;

				// Only set mutability back to false if we are no longer parsing nested json
				if *self.in_json.borrow() == 0 {
					*self.is_in_mut_json.borrow_mut() = false;
				}

				// avoid unnecessary wrapping of json elements
				if matches!(exp.kind, ExprKind::JsonLiteral { .. }) {
					return Ok(exp);
				}

				let element = Box::new(exp);
				Ok(Expr::new(ExprKind::JsonLiteral { is_mut, element }, expression_span))
			}
			"set_literal" => self.build_set_literal(expression_node, phase),
			"struct_literal" => {
				let type_ = self.build_type_annotation(expression_node.child_by_field_name("type"), phase);
				let mut fields = IndexMap::new();
				let mut cursor = expression_node.walk();
				for field in expression_node.children_by_field_name("fields", &mut cursor) {
					if !field.is_named() || field.is_extra() {
						continue;
					}
					let field_name = self.node_symbol(&field.named_child(0).unwrap());
					let field_value = self.build_expression(&field.named_child(1).unwrap(), phase);
					// Add fields to our struct literal, if some are missing or aren't part of the type we'll fail on type checking
					if let (Ok(k), Ok(v)) = (field_name, field_value) {
						if fields.contains_key(&k) {
							self.add_error(format!("Duplicate field {} in struct literal", k), expression_node);
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
				let expression = self.build_expression(&expression_node.named_child(0).unwrap(), phase);
				Ok(Expr::new(
					ExprKind::Unary {
						op: UnaryOperator::OptionalTest,
						exp: Box::new(expression?),
					},
					expression_span,
				))
			}
			"compiler_dbg_panic" => {
				// Handle the debug panic expression (during parsing)
				dbg_panic!();
				Ok(Expr::new(ExprKind::CompilerDebugPanic, expression_span))
			}
			other => self.report_unimplemented_grammar(other, "expression", expression_node),
		}
	}

	fn build_map_fields(&self, expression_node: &Node<'_>, phase: Phase) -> Result<IndexMap<Symbol, Expr>, ()> {
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
					let s = s[1..s.len() - 1].to_string();
					Symbol::new(s, self.node_span(&key_node))
				}
				"identifier" => self.node_symbol(&key_node)?,
				other => panic!("Unexpected map key type {} at {:?}", other, key_node),
			};
			let value_node = field_node.named_child(1).unwrap();
			if fields.contains_key(&key) {
				self.add_error(format!("Duplicate key {} in map literal", key), &key_node);
			} else {
				fields.insert(key, self.build_expression(&value_node, phase)?);
			}
		}
		Ok(fields)
	}

	fn build_set_literal(&self, expression_node: &Node, phase: Phase) -> Result<Expr, ()> {
		let expression_span = self.node_span(expression_node);
		let set_type = if let Some(type_node) = expression_node.child_by_field_name("type") {
			self.build_type_annotation(Some(type_node), phase).ok()
		} else {
			None
		};

		let mut items = Vec::new();
		let mut cursor = expression_node.walk();
		for element_node in expression_node.children_by_field_name("element", &mut cursor) {
			items.push(self.build_expression(&element_node, phase)?);
		}
		Ok(Expr::new(
			ExprKind::SetLiteral { items, type_: set_type },
			expression_span,
		))
	}

	/// Build a Symbol from a node, add error diagnostic if the node is a reserved word
	fn check_reserved_symbol(&self, node: &Node) -> DiagnosticResult<Symbol> {
		let node_symbol = self.node_symbol(node);
		if let Ok(sym) = &node_symbol {
			if RESERVED_WORDS.contains(&sym.name) {
				self.add_error("Reserved word", node);
			}
		}

		node_symbol
	}
	/// Given a node, returns the last non-extra node before it.
	fn last_non_extra(node: Node) -> Node {
		let parent = node.parent();
		if let Some(parent) = parent {
			if parent.is_extra() {
				return Self::last_non_extra(parent);
			}
		}
		if node.is_extra() {
			let mut sibling = node.prev_sibling();
			while let Some(s) = sibling {
				if !s.is_extra() {
					break;
				}
				sibling = s.prev_sibling();
			}

			return sibling.unwrap_or(node);
		} else {
			return node;
		}
	}

	fn report_unhandled_errors(&self, root: &Node) {
		let iter = traverse(root.walk(), Order::Pre);
		for node in iter {
			if node.kind() == "AUTOMATIC_SEMICOLON" {
				let target_node = Self::last_non_extra(node);
				let diag = Diagnostic {
					message: "Expected ';'".to_string(),
					span: Some(WingSpan {
						start: target_node.end_position().into(),
						end: target_node.end_position().into(),
						file_id: self.source_name.clone(),
					}),
				};
				report_diagnostic(diag);
			} else if node.kind() == "AUTOMATIC_BLOCK" {
				self.add_error("Expected block".to_string(), &Self::last_non_extra(node));
			} else if !self.error_nodes.borrow().contains(&node.id()) {
				if node.is_error() {
					if node.named_child_count() == 0 {
						self.add_error(String::from("Unknown parser error"), &node);
					} else {
						let mut cursor = node.walk();
						let children = node.named_children(&mut cursor);
						for child in children {
							self.add_error(format!("Unexpected '{}'", child.kind()), &child);
						}
					}
				} else if node.is_missing() {
					let target_node = Self::last_non_extra(node);
					let diag = Diagnostic {
						message: format!("Expected '{}'", node.kind()),
						span: Some(WingSpan {
							start: target_node.end_position().into(),
							end: target_node.end_position().into(),
							file_id: self.source_name.clone(),
						}),
					};
					report_diagnostic(diag);
				}
			}
		}
	}

	fn build_super_constructor_statement(&self, statement_node: &Node, phase: Phase, idx: usize) -> Result<StmtKind, ()> {
		// Calls to super constructor can only occur in specific scenario:
		// 1. We are in a derived class' constructor
		// 2. The statement is the first statement in the block
		let parent_block = statement_node.parent();
		if let Some(p) = parent_block {
			let parent_block_context = p.parent();

			if let Some(context) = parent_block_context {
				match context.kind() {
					"initializer" | "inflight_initializer" => {
						// Check that call to super constructor was first in statement block
						if idx != 0 {
							self.with_error(
								"Call to super constructor must be first statement in constructor",
								statement_node,
							)?;
						};

						// Check that the class has a parent
						let class_node = context.parent().unwrap().parent().unwrap();
						let parent_class = class_node.child_by_field_name("parent");

						if let None = parent_class {
							self.with_error(
								"Call to super constructor can only be made from derived classes",
								statement_node,
							)?;
						}
					}
					_ => {
						// super constructor used outside of an initializer IE:
						// class B extends A {
						//   someMethod() {super()};
						// }
						self.with_error(
							"Call to super constructor can only be done from within class constructor",
							statement_node,
						)?;
					}
				}
			} else {
				// No parent block found this probably means super() call was found in top level statements
				self.with_error(
					"Call to super constructor can only be done from within a class constructor",
					statement_node,
				)?;
			}
		}

		let arg_node = statement_node.child_by_field_name("args").unwrap();
		let arg_list = self.build_arg_list(&arg_node, phase)?;

		Ok(StmtKind::SuperConstructor { arg_list })
	}

	fn build_test_statement(&self, statement_node: &Node) -> Result<StmtKind, ()> {
		let name_node = statement_node.child_by_field_name("name").unwrap();
		let name_text = self.node_text(&name_node);
		let test_id = Box::new(Expr::new(
			ExprKind::Literal(Literal::String(format!(
				"\"test:{}\"",
				&name_text[1..name_text.len() - 1]
			))),
			self.node_span(&name_node),
		));
		let statements = self.build_scope(&statement_node.child_by_field_name("block").unwrap(), Phase::Inflight);
		let statements_span = statements.span.clone();
		let span = self.node_span(statement_node);

		let inflight_closure = Expr::new(
			ExprKind::FunctionClosure(FunctionDefinition {
				name: None,
				body: FunctionBody::Statements(statements),
				signature: FunctionSignature {
					parameters: vec![],
					return_type: Box::new(TypeAnnotation {
						kind: TypeAnnotationKind::Void,
						span: Default::default(),
					}),
					phase: Phase::Inflight,
				},
				is_static: true,
				span: statements_span.clone(),
			}),
			statements_span.clone(),
		);

		let type_span = self.node_span(&statement_node.child(0).unwrap());
		Ok(StmtKind::Expression(Expr::new(
			ExprKind::New(NewExpr {
				class: UserDefinedType {
					root: Symbol::global(WINGSDK_STD_MODULE),
					fields: vec![Symbol::global(WINGSDK_TEST_CLASS_NAME)],
					span: type_span.clone(),
				},
				obj_id: Some(test_id),
				obj_scope: None,
				arg_list: ArgList {
					pos_args: vec![inflight_closure],
					named_args: IndexMap::new(),
					span: type_span.clone(),
				},
			}),
			span,
		)))
	}
}

// TODO: this function seems fragile
// use inodes as source of truth instead https://github.com/winglang/wing/issues/3627
pub fn normalize_path(path: &Utf8Path, relative_to: Option<&Utf8Path>) -> Utf8PathBuf {
	let path = if path.is_absolute() {
		// if the path is absolute, we ignore "relative_to"
		path.to_path_buf()
	} else {
		relative_to
			.map(|p| p.parent().unwrap_or_else(|| Utf8Path::new(".")).join(path))
			.unwrap_or_else(|| path.to_path_buf())
	};

	// Remove excess components like `/./` and `/../`.
	// This is tricky because ".." usually means we pop the last component
	// but if a path starts with ".." or looks like "a/../../b" we need to track
	// how many components we've popped and add them later.
	let mut normalized = Utf8PathBuf::new();
	let mut extra_pops = Utf8PathBuf::new();
	for part in path.components() {
		match part {
			Utf8Component::Prefix(ref prefix) => {
				normalized.push(prefix.as_str());
			}
			Utf8Component::RootDir => {
				normalized.push("/");
			}
			Utf8Component::ParentDir => {
				let popped = normalized.pop();
				if !popped {
					extra_pops.push("..");
				}
			}
			Utf8Component::CurDir => {
				// Nothing
			}
			Utf8Component::Normal(name) => {
				if extra_pops.components().next().is_some() {
					normalized = extra_pops;
					extra_pops = Utf8PathBuf::new();
					normalized.push(name);
				} else {
					normalized.push(name);
				}
			}
		}
	}

	normalized
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn normalize_path_relative_to_nothing() {
		let file_path = Utf8Path::new("/a/b/c/d/e.f");
		assert_eq!(normalize_path(file_path, None), file_path);

		let file_path = Utf8Path::new("/a/b/./c/../d/e.f");
		assert_eq!(normalize_path(file_path, None), Utf8Path::new("/a/b/d/e.f"));

		let file_path = Utf8Path::new("a/b/c/d/e.f");
		assert_eq!(normalize_path(file_path, None), Utf8Path::new("a/b/c/d/e.f"));

		let file_path = Utf8Path::new("a/b/./c/../d/e.f");
		assert_eq!(normalize_path(file_path, None), Utf8Path::new("a/b/d/e.f"));

		let file_path = Utf8Path::new("a/../e.f");
		assert_eq!(normalize_path(file_path, None), Utf8Path::new("e.f"));

		let file_path = Utf8Path::new("a/../../../e.f");
		assert_eq!(normalize_path(file_path, None), Utf8Path::new("../../e.f"));

		let file_path = Utf8Path::new("./e.f");
		assert_eq!(normalize_path(file_path, None), Utf8Path::new("e.f"));

		let file_path = Utf8Path::new("../e.f");
		assert_eq!(normalize_path(file_path, None), Utf8Path::new("../e.f"));

		let file_path = Utf8Path::new("../foo/.././e.f");
		assert_eq!(normalize_path(file_path, None), Utf8Path::new("../e.f"));
	}

	#[test]
	fn normalize_path_relative_to_something() {
		// If the path is absolute, we ignore "relative_to"
		let file_path = Utf8Path::new("/a/b/c/d/e.f");
		let relative_to = Utf8Path::new("/g/h/i");
		assert_eq!(normalize_path(file_path, Some(relative_to)), file_path);

		let file_path = Utf8Path::new("a/b/c/d/e.f");
		let relative_to = Utf8Path::new("/g/h/i");
		assert_eq!(
			normalize_path(file_path, Some(relative_to)),
			Utf8Path::new("/g/h/a/b/c/d/e.f")
		);

		let file_path = Utf8Path::new("a/b/c/d/e.f");
		let relative_to = Utf8Path::new("g/h/i");
		assert_eq!(
			normalize_path(file_path, Some(relative_to)),
			Utf8Path::new("g/h/a/b/c/d/e.f")
		);

		let file_path = Utf8Path::new("../foo.w");
		let relative_to = Utf8Path::new("subdir/bar.w");
		assert_eq!(normalize_path(file_path, Some(relative_to)), Utf8Path::new("foo.w"));
	}
}
