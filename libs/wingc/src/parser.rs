use camino::{Utf8Component, Utf8Path, Utf8PathBuf};
use indexmap::{IndexMap, IndexSet};
use itertools::Itertools;
use phf::{phf_map, phf_set};
use regex::Regex;
use std::cell::RefCell;
use std::collections::HashSet;
use std::ops::Range;
use std::{fs, str, vec};
use tree_sitter::Node;

use crate::ast::{
	AccessModifier, ArgList, AssignmentKind, BinaryOperator, BringSource, CalleeKind, CatchBlock, Class, ClassField,
	ElifBlock, ElifLetBlock, Elifs, Enum, ExplicitLift, Expr, ExprKind, FunctionBody, FunctionDefinition,
	FunctionParameter, FunctionSignature, IfLet, Interface, InterpolatedString, InterpolatedStringPart,
	LiftQualification, Literal, New, Phase, Reference, Scope, Spanned, Stmt, StmtKind, Struct, StructField, Symbol,
	TypeAnnotation, TypeAnnotationKind, UnaryOperator, UserDefinedType,
};
use crate::comp_ctx::{CompilationContext, CompilationPhase};
use crate::diagnostic::{
	report_diagnostic, Diagnostic, DiagnosticResult, WingLocation, WingSpan, ERR_EXPECTED_SEMICOLON,
};
use crate::file_graph::FileGraph;
use crate::files::Files;
use crate::type_check::{CLASS_INFLIGHT_INIT_NAME, CLASS_INIT_NAME};
use crate::{
	dbg_panic, is_absolute_path, TRUSTED_LIBRARY_NPM_NAMESPACE, WINGSDK_BRINGABLE_MODULES, WINGSDK_STD_MODULE,
	WINGSDK_TEST_CLASS_NAME,
};

// A custom struct could be used to better maintain metadata and issue tracking, though ideally
// this is meant to serve as a bandaide to be removed once wing is further developed.
// k=grammar, v=optional_message, example: ("generic", "targed impl: 1.0.0")
static UNIMPLEMENTED_GRAMMARS: phf::Map<&'static str, &'static str> = phf_map! {
	"any" => "https://github.com/winglang/wing/issues/434",
	"Promise" => "https://github.com/winglang/wing/issues/529",
	"storage_modifier" => "https://github.com/winglang/wing/issues/107",
	"internal" => "https://github.com/winglang/wing/issues/4156",
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
	"pub",
	"internal",
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
/// just opened or changed.
///
/// If `init_text` is `None`, then the file will be read from disk. Otherwise, the
/// provided text will be used as the source text for the file. This is useful for
/// the LSP, where the text may not be saved to the disk yet, and for unit tests.
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
	init_text: Option<String>,
	files: &mut Files,
	file_graph: &mut FileGraph,
	tree_sitter_trees: &mut IndexMap<Utf8PathBuf, tree_sitter::Tree>,
	asts: &mut IndexMap<Utf8PathBuf, Scope>,
) -> Vec<Utf8PathBuf> {
	// Parse the initial path (even if we have already seen it before)
	let dependent_wing_paths = match init_path.is_dir() {
		true => parse_wing_directory(&init_path, files, file_graph, tree_sitter_trees, asts),
		false => parse_wing_file(&init_path, init_text, files, file_graph, tree_sitter_trees, asts),
	};

	// Store a stack of files that still need parsing
	let mut unparsed_files = dependent_wing_paths;

	// Parse all remaining files in the project
	while let Some(file_or_dir_path) = unparsed_files.pop() {
		// Skip files that we have already seen before (they should already be parsed)
		if files.contains_file(&file_or_dir_path) {
			assert!(
				tree_sitter_trees.contains_key(&file_or_dir_path),
				"files is not in sync with tree_sitter_trees"
			);
			assert!(asts.contains_key(&file_or_dir_path), "files is not in sync with asts");
			assert!(
				file_graph.contains_file(&file_or_dir_path),
				"files is not in sync with file_graph"
			);
			continue;
		}

		// Parse the file or directory
		let dependent_wing_paths = match file_or_dir_path.is_dir() {
			true => parse_wing_directory(&file_or_dir_path, files, file_graph, tree_sitter_trees, asts),
			false => parse_wing_file(&file_or_dir_path, None, files, file_graph, tree_sitter_trees, asts),
		};

		// Add the dependent files to the stack of files to parse
		unparsed_files.extend(dependent_wing_paths);
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
				annotations: vec![],
				hints: vec![],
			});

			// return a list of all files just so we can continue type-checking
			asts.keys().cloned().collect::<Vec<_>>()
		}
	}
}

fn parse_wing_file(
	source_path: &Utf8Path,
	source_text: Option<String>,
	files: &mut Files,
	file_graph: &mut FileGraph,
	tree_sitter_trees: &mut IndexMap<Utf8PathBuf, tree_sitter::Tree>,
	asts: &mut IndexMap<Utf8PathBuf, Scope>,
) -> Vec<Utf8PathBuf> {
	let source_text = match source_text {
		Some(text) => text,
		None => fs::read_to_string(source_path).expect("read_to_string call failed"),
	};

	// Update our files collection with the new source text. On a fresh compilation,
	// this will be the first time we've seen this file. In the LSP we might already have
	// text from a previous compilation, so we'll replace the contents.
	files.update_file(&source_path, source_text.clone());

	let language = tree_sitter_wing::language();
	let mut tree_sitter_parser = tree_sitter::Parser::new();
	tree_sitter_parser.set_language(&language).unwrap();

	let tree_sitter_tree = match tree_sitter_parser.parse(&source_text.as_bytes(), None) {
		Some(tree) => tree,
		None => {
			panic!("Error parsing source file with tree-sitter: {}", source_path);
		}
	};

	let tree_sitter_root = tree_sitter_tree.root_node();

	// Parse the source text into an AST
	let parser = Parser::new(&source_text.as_bytes(), source_path.to_owned());
	let (scope, dependent_wing_paths) = parser.parse(&tree_sitter_root);

	// Update our collections of trees and ASTs and our file graph
	tree_sitter_trees.insert(source_path.to_owned(), tree_sitter_tree);
	asts.insert(source_path.to_owned(), scope);
	file_graph.update_file(source_path, &dependent_wing_paths);

	dependent_wing_paths
}

fn dir_contains_wing_file(dir_path: &Utf8Path) -> bool {
	for entry in fs::read_dir(dir_path).unwrap() {
		let entry = entry.unwrap().path();
		let path = Utf8Path::from_path(&entry).unwrap();

		if path.is_dir() {
			if dir_contains_wing_file(&path) {
				return true;
			}
		} else if path.extension() == Some("w") {
			return true;
		}
	}
	false
}

fn contains_non_symbolic(str: &str) -> bool {
	// uses the same regex pattern from grammar.js for valid identifiers
	let re = Regex::new(r"^([A-Za-z_][A-Za-z_0-9]*|[A-Z][A-Z0-9_]*)$").unwrap();
	!re.is_match(str)
}

fn check_valid_wing_dir_name(dir_path: &Utf8Path) {
	if contains_non_symbolic(dir_path.file_name().unwrap()) {
		report_diagnostic(Diagnostic {
			message: format!(
				"Cannot bring Wing directories that contain invalid characters: \"{}\"",
				dir_path.file_name().unwrap()
			),
			span: None,
			annotations: vec![],
			hints: vec![],
		});
	}
}

fn parse_wing_directory(
	source_path: &Utf8Path,
	files: &mut Files,
	file_graph: &mut FileGraph,
	tree_sitter_trees: &mut IndexMap<Utf8PathBuf, tree_sitter::Tree>,
	asts: &mut IndexMap<Utf8PathBuf, Scope>,
) -> Vec<Utf8PathBuf> {
	// Collect a list of all files and subdirectories in the directory
	let mut files_and_dirs = Vec::new();

	if source_path.is_dir() && !dir_contains_wing_file(&source_path) {
		report_diagnostic(Diagnostic {
			message: format!(
				"Cannot explicitly bring directory with no Wing files \"{}\"",
				source_path.file_name().unwrap()
			),
			span: None,
			annotations: vec![],
			hints: vec![],
		})
	}

	for entry in fs::read_dir(&source_path).expect("read_dir call failed") {
		let entry = entry.unwrap();
		let path = Utf8PathBuf::from_path_buf(entry.path()).expect("invalid utf8 path");

		// If it's a directory and its name is not node_modules or .git or ending in .tmp, add it
		// or if it's a file and its extension is .w, add it
		if (path.is_dir()
			&& path.file_name() != Some("node_modules")
			&& path.file_name() != Some(".git")
			&& path.extension() != Some("tmp"))
			&& dir_contains_wing_file(&path)
			|| path.extension() == Some("w") && !is_entrypoint_file(&path)
		{
			// before we add the path, we need to check that directory names are valid
			if path.is_dir() {
				check_valid_wing_dir_name(&path);
			}
			files_and_dirs.push(path);
		}
	}

	// Sort the files and directories so that we always visit them in the same order
	files_and_dirs.sort();

	// Create a fake AST (since the directory doesn't have any source code to parse)
	let mut tree_sitter_parser = tree_sitter::Parser::new();
	tree_sitter_parser.set_language(&tree_sitter_wing::language()).unwrap();
	let tree_sitter_tree = tree_sitter_parser.parse("", None).unwrap();
	let scope = Scope::empty();
	let dependent_wing_paths = files_and_dirs;

	// Update our collections of trees and ASTs and our file graph
	files.update_file(&source_path, "".to_string());
	tree_sitter_trees.insert(source_path.to_owned(), tree_sitter_tree);
	asts.insert(source_path.to_owned(), scope);
	file_graph.update_file(source_path, &dependent_wing_paths);

	dependent_wing_paths
}

/// Parses a single Wing source file.
pub struct Parser<'a> {
	/// Source code of the file being parsed
	pub source: &'a [u8],
	pub source_name: Utf8PathBuf,
	pub error_nodes: RefCell<HashSet<usize>>,
	// Nesting level within JSON literals, a value larger than 0 means we're currently in a JSON literal
	in_json: RefCell<u64>,
	is_in_mut_json: RefCell<bool>,
	is_in_loop: RefCell<bool>,
	/// Track all file paths that have been found while parsing the current file
	/// These will need to be eventually parsed (or diagnostics will be reported if they don't exist)
	referenced_wing_paths: RefCell<Vec<Utf8PathBuf>>,
}

struct ParseErrorBuilder<'s> {
	node: &'s Node<'s>,
	diag: Diagnostic,
	parser: &'s Parser<'s>,
}

impl<'a> ParseErrorBuilder<'a> {
	fn new(message: impl ToString, node: &'a Node, parser: &'a Parser) -> Self {
		Self {
			node,
			diag: Diagnostic::new(message, &parser.node_span(node)),
			parser,
		}
	}

	fn with_annotation(mut self, message: impl ToString, span: impl Spanned) -> Self {
		self.diag.add_anotation(message, span);
		self
	}

	fn report(self) {
		self.diag.report();
		self.parser.error_nodes.borrow_mut().insert(self.node.id());
	}
}

impl<'s> Parser<'s> {
	pub fn new(source: &'s [u8], source_name: Utf8PathBuf) -> Self {
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
			referenced_wing_paths: RefCell::new(Vec::new()),
		}
	}

	pub fn parse(self, root: &Node) -> (Scope, Vec<Utf8PathBuf>) {
		let scope = match root.kind() {
			"source" => self.build_scope(&root, Phase::Preflight),
			_ => Scope::empty(),
		};

		// Module files can only have certain kinds of statements
		if !is_entrypoint_file(&self.source_name) {
			for stmt in &scope.statements {
				if !is_valid_module_statement(&stmt) {
					Diagnostic::new(
						"Module files cannot have statements besides classes, interfaces, enums, and structs. Rename the file to end with `.main.w` or `.test.w` to make this an entrypoint file.",
						stmt,
					).report();
				}
			}
		}

		self.report_unhandled_errors(&root);

		(scope, self.referenced_wing_paths.into_inner())
	}

	fn add_error(&self, message: impl ToString, node: &Node) {
		self.build_error(message, node).report();
	}

	fn build_error<'a>(&'a self, message: impl ToString, node: &'a Node) -> ParseErrorBuilder {
		ParseErrorBuilder::new(message, node, self)
	}

	fn with_error<T>(&self, message: impl ToString, node: &Node) -> Result<T, ()> {
		self.with_error_builder::<T>(self.build_error(message, node))
	}

	fn with_error_builder<T>(&self, error_builder: ParseErrorBuilder) -> Result<T, ()> {
		error_builder.report();

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

	fn node_text_from_range(&self, byte_range: Range<usize>) -> &str {
		return str::from_utf8(&self.source[byte_range]).unwrap();
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
		let child = get_actual_child_by_field_name(checked_node, field);
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
				arg_list: ArgList::new(
					vec![Expr::new(ExprKind::Literal(Literal::Number(seconds)), span.clone())],
					IndexMap::new(),
					span.clone(),
				),
			},
			span.clone(),
		))
	}

	fn node_span(&self, node: &Node) -> WingSpan {
		let node_range = node.range();
		WingSpan {
			start: node_range.start_point.into(),
			end: node_range.end_point.into(),
			file_id: self.source_name.to_string(),
			start_offset: node_range.start_byte,
			end_offset: node_range.end_byte,
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
			"variable_assignment_statement" => {
				let kind = match self.node_text(&statement_node.child_by_field_name("operator").unwrap()) {
					"=" => AssignmentKind::Assign,
					"+=" => AssignmentKind::AssignIncr,
					"-=" => AssignmentKind::AssignDecr,
					other => return self.report_unimplemented_grammar(other, "assignment operator", statement_node),
				};

				self.build_assignment_statement(statement_node, phase, kind)?
			}
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
			"class_definition" => self.build_class_statement(statement_node, phase)?,
			"interface_definition" => self.build_interface_statement(statement_node, phase)?,
			"enum_definition" => self.build_enum_statement(statement_node)?,
			"try_catch_statement" => self.build_try_catch_statement(statement_node, phase)?,
			"struct_definition" => self.build_struct_definition_statement(statement_node, phase)?,
			"test_statement" => self.build_test_statement(statement_node)?,
			"compiler_dbg_env" => StmtKind::CompilerDebugEnv,
			"super_constructor_statement" => self.build_super_constructor_statement(statement_node, phase, idx)?,
			"lift_statement" => self.build_lift_statement(statement_node, phase)?,
			"ERROR" => return self.with_error("Expected statement", statement_node),
			other => return self.report_unimplemented_grammar(other, "statement", statement_node),
		};

		Ok(Stmt {
			kind: stmt_kind,
			span,
			idx,
		})
	}

	fn build_lift_statement(&self, statement_node: &Node, phase: Phase) -> DiagnosticResult<StmtKind> {
		// Lift statements are only legal in inflight
		if phase != Phase::Inflight {
			return self.with_error("Lift statements are only legal in inflight phase", statement_node);
		}

		let lift_qualifications_node = statement_node.child_by_field_name("lift_qualifications").unwrap();
		let statements = self.build_scope(&statement_node.child_by_field_name("block").unwrap(), phase);

		let mut qualifications = vec![];

		let mut qual_cursor = lift_qualifications_node
			.child_by_field_name("qualifications")
			.unwrap()
			.walk();

		for qual_node in lift_qualifications_node.named_children(&mut qual_cursor) {
			let Expr {
				kind: ExprKind::Reference(obj),
				..
			} = self.build_reference(&qual_node.child_by_field_name("obj").unwrap(), phase)?
			else {
				panic!("expected obj in lift qualification to be a reference");
			};
			let ops = if let Some(op_node) = qual_node.child_by_field_name("op") {
				vec![self.node_symbol(&op_node)?]
			} else if let Some(ops_node) = qual_node.child_by_field_name("ops") {
				let mut ops = vec![];
				let mut ops_cursor = ops_node.walk();
				for op_node in ops_node.named_children(&mut ops_cursor) {
					ops.push(self.node_symbol(&op_node)?);
				}
				ops
			} else {
				panic!("expected ops in lift qualification");
			};
			qualifications.push(LiftQualification { obj, ops });
		}

		Ok(StmtKind::ExplicitLift(ExplicitLift {
			qualifications,
			statements,
		}))
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
		for node in statement_node.children(&mut cursor) {
			match node.kind() {
				"elif_let_block" => {
					let statements = self.build_scope(&node.child_by_field_name("block").unwrap(), phase);
					let value = self.build_expression(&node.child_by_field_name("value").unwrap(), phase)?;
					let name = self.check_reserved_symbol(&node.child_by_field_name("name").unwrap())?;
					let elif = Elifs::ElifLetBlock(ElifLetBlock {
						reassignable: node.child_by_field_name("reassignable").is_some(),
						statements: statements,
						value: value,
						var_name: name,
					});
					elif_vec.push(elif);
				}
				"elif_block" => {
					let conditions = self.build_expression(&node.child_by_field_name("condition").unwrap(), phase);
					let statements = self.build_scope(&node.child_by_field_name("block").unwrap(), phase);
					let elif = Elifs::ElifBlock(ElifBlock {
						condition: conditions.unwrap(),
						statements: statements,
					});
					elif_vec.push(elif);
				}
				_ => {}
			}
		}

		let else_block = if let Some(else_block) = statement_node.child_by_field_name("else_block") {
			Some(self.build_scope(&else_block, phase))
		} else {
			None
		};
		Ok(StmtKind::IfLet(IfLet {
			var_name: name,
			reassignable,
			value,
			statements: if_block,
			elif_statements: elif_vec,
			else_statements: else_block,
		}))
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

	fn build_assignment_statement(
		&self,
		statement_node: &Node,
		phase: Phase,
		kind: AssignmentKind,
	) -> DiagnosticResult<StmtKind> {
		let reference = self.build_reference(&statement_node.child_by_field_name("name").unwrap(), phase)?;

		if let ExprKind::Reference(r) = reference.kind {
			Ok(StmtKind::Assignment {
				kind: kind,
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
		for super_node in get_actual_children_by_field_name(*statement_node, "extends") {
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

		let access_modifier_node = statement_node.child_by_field_name("access_modifier");
		let access = self.build_access_modifier(&access_modifier_node);
		if access == AccessModifier::Protected {
			self.with_error::<Node>(
				"Structs must be public (\"pub\") or private",
				&access_modifier_node.expect("access modifier node"),
			)?;
		}

		Ok(StmtKind::Struct(Struct {
			name,
			extends,
			fields: members,
			access,
		}))
	}

	fn build_variable_def_statement(&self, statement_node: &Node, phase: Phase) -> DiagnosticResult<StmtKind> {
		let type_ = if let Some(type_node) = get_actual_child_by_field_name(*statement_node, "type") {
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
		let Some(module_name_node) = statement_node.child_by_field_name("module_name") else {
			return self.with_error(
				"Expected module specification (see https://www.winglang.io/docs/libraries)",
				&statement_node
					.child(statement_node.child_count() - 1)
					.unwrap_or(*statement_node),
			);
		};

		let module_name = self.node_symbol(&module_name_node)?;
		let alias = if let Some(identifier) = statement_node.child_by_field_name("alias") {
			Some(self.check_reserved_symbol(&identifier)?)
		} else {
			None
		};

		let module_path = if module_name.name.len() > 1 {
			Utf8Path::new(&module_name.name[1..module_name.name.len() - 1])
		} else {
			Utf8Path::new(&module_name.name)
		};

		if is_absolute_path(&module_path) {
			return self.with_error(
				format!("Cannot bring \"{}\" since it is not a relative path", module_path),
				&module_name_node,
			);
		}

		if module_name.name.starts_with("\".") && module_name.name.ends_with("\"") {
			let source_path = normalize_path(module_path, Some(&Utf8Path::new(&self.source_name)));
			if source_path == Utf8Path::new(&self.source_name) {
				return self.with_error("Cannot bring a module into itself", &module_name_node);
			}
			if !source_path.exists() {
				return self.with_error(format!("Cannot find module \"{}\"", module_path), &module_name_node);
			}

			// case: .w file
			if is_entrypoint_file(&source_path) {
				return self.with_error(
					format!("Cannot bring module \"{}\" since it is an entrypoint file", module_path),
					&module_name_node,
				);
			}

			if source_path.is_file() {
				if source_path.extension() != Some("w") {
					return self.with_error(
						format!("Cannot bring \"{}\": not a recognized file type", module_path),
						&module_name_node,
					);
				}

				self.referenced_wing_paths.borrow_mut().push(source_path.clone());

				// parse error if no alias is provided
				let module = if let Some(alias) = alias {
					Ok(StmtKind::Bring {
						source: BringSource::WingFile(source_path),
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

			// case: directory
			if source_path.is_dir() {
				self.referenced_wing_paths.borrow_mut().push(source_path.clone());

				// parse error if no alias is provided
				let module = if let Some(alias) = alias {
					Ok(StmtKind::Bring {
						source: BringSource::Directory(source_path),
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

			// case: path does not satisfy is_file or is_dir (is this possible?)
			return self.with_error(
				format!("Cannot bring \"{}\": not a recognized file type", module_path),
				&module_name_node,
			);
		}

		if module_name.name.starts_with("\"") && module_name.name.ends_with("\"") {
			// we need to inspect the npm dependency to figure out if it's a JSII library or a Wing library
			// first, find where the package.json is located
			let module_name_parsed = module_name.name[1..module_name.name.len() - 1].to_string();
			let source_dir = Utf8Path::new(&self.source_name).parent().unwrap();
			let module_dir = wingii::util::package_json::find_dependency_directory(&module_name_parsed, &source_dir)
				.ok_or_else(|| {
					self
						.with_error::<Node>(
							format!(
								"Unable to load {}: Module not found in \"{}\"",
								module_name, self.source_name
							),
							&statement_node,
						)
						.err();
				})?;

			// If the package.json has a `wing` field, then we treat it as a Wing library
			if is_wing_library(&Utf8Path::new(&module_dir)) {
				return if let Some(alias) = alias {
					// make sure the Wing library is also parsed
					self.referenced_wing_paths.borrow_mut().push(module_dir.clone());

					Ok(StmtKind::Bring {
						source: BringSource::WingLibrary(
							Symbol {
								name: module_name_parsed,
								span: module_name.span,
							},
							module_dir,
						),
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

			// otherwise, we treat it as a JSII library
			return if let Some(alias) = alias {
				Ok(StmtKind::Bring {
					source: BringSource::JsiiModule(Symbol {
						name: module_name_parsed,
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

		if WINGSDK_BRINGABLE_MODULES.contains(&module_name.name.as_str()) || module_name.name == WINGSDK_STD_MODULE {
			return Ok(StmtKind::Bring {
				source: BringSource::BuiltinModule(module_name),
				identifier: alias,
			});
		}

		// check if a trusted library exists with this name
		let source_dir = Utf8Path::new(&self.source_name).parent().unwrap();
		let module_dir = wingii::util::package_json::find_dependency_directory(
			&format!("{}/{}", TRUSTED_LIBRARY_NPM_NAMESPACE, module_name.name),
			&source_dir,
		)
		.ok_or_else(|| {
			self
				.with_error::<Node>(
					format!(
						"Could not find a trusted library \"{}/{}\" installed. Did you mean to run `npm i {}/{}`?",
						TRUSTED_LIBRARY_NPM_NAMESPACE, module_name, TRUSTED_LIBRARY_NPM_NAMESPACE, module_name
					),
					&statement_node,
				)
				.err();
		})?;

		self.referenced_wing_paths.borrow_mut().push(module_dir.clone());
		// make sure the trusted library is also parsed
		self.referenced_wing_paths.borrow_mut().push(module_dir.clone());

		Ok(StmtKind::Bring {
			source: BringSource::TrustedModule(
				Symbol {
					name: module_name.name,
					span: module_name.span,
				},
				module_dir,
			),
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

		let access_modifier_node = statement_node.child_by_field_name("access_modifier");
		let access = self.build_access_modifier(&access_modifier_node);
		if access == AccessModifier::Protected {
			self.with_error::<Node>(
				"Enums must be public (\"pub\") or private",
				&access_modifier_node.expect("access modifier node"),
			)?;
		}

		Ok(StmtKind::Enum(Enum {
			name: name.unwrap(),
			values,
			access,
		}))
	}

	fn get_modifier<'a>(&'a self, modifier: &str, maybe_modifiers: &'a Option<Node>) -> DiagnosticResult<Option<Node>> {
		let modifiers_node = if let Some(modifiers_node) = maybe_modifiers {
			modifiers_node
		} else {
			return Ok(None);
		};

		let found_modifiers = modifiers_node
			.children(&mut modifiers_node.walk())
			.filter(|node| node.kind() == modifier)
			.collect_vec();

		if found_modifiers.len() > 1 {
			let mut err = self.build_error("Multiple or ambiguous modifiers found", modifiers_node);
			for m in found_modifiers.iter() {
				err = err.with_annotation("possible redundant modifier", self.node_span(m));
			}

			self.with_error_builder::<_>(err)
		} else {
			Ok(found_modifiers.first().map(|x| *x))
		}
	}

	fn build_class_statement(&self, statement_node: &Node, class_phase: Phase) -> DiagnosticResult<StmtKind> {
		let class_modifiers = statement_node.child_by_field_name("modifiers");
		let class_phase = if self.get_modifier("inflight_specifier", &class_modifiers)?.is_some() {
			Phase::Inflight
		} else {
			class_phase
		};
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
				"method_definition" => {
					let Ok(method_name) = self.node_symbol(&class_element.child_by_field_name("name").unwrap()) else {
						continue;
					};

					let Ok(func_def) =
						self.build_function_definition(Some(method_name.clone()), &class_element, class_phase, false)
					else {
						continue;
					};

					// make sure all the parameters have type annotations
					for param in &func_def.signature.parameters {
						if matches!(param.type_annotation.kind, TypeAnnotationKind::Inferred) {
							Diagnostic::new("Missing required type annotation for method signature", &param.name).report();
						}
					}

					methods.push((method_name, func_def))
				}
				"class_field" => {
					let Ok(class_field) = self.build_class_field(class_element, class_phase) else {
						continue;
					};

					fields.push(class_field)
				}
				"initializer" => {
					// the initializer is considered an inflight initializer if either the class is inflight
					// (and then everything inside it is inflight by definition) or if there's an "inflight"
					// modifier.
					let is_inflight = class_phase == Phase::Inflight || class_element.child_by_field_name("inflight").is_some();
					if initializer.is_some() && !is_inflight {
						self
							.with_error::<Node>(
								format!("Multiple constructors defined in class {}", name.name),
								&class_element,
							)
							.err();
					} else if inflight_initializer.is_some() && is_inflight {
						self
							.with_error::<Node>(
								format!("Multiple inflight constructors defined in class {}", name.name),
								&class_element,
							)
							.err();
					}
					let parameters_node = class_element.child_by_field_name("parameter_list").unwrap();
					let parameters = self.build_parameter_list(&parameters_node, class_phase, false)?;
					if !parameters.is_empty() && is_inflight && class_phase == Phase::Preflight {
						self
							.with_error::<Node>("Inflight constructors cannot have parameters", &parameters_node)
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
							access: AccessModifier::Public,
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
							access: AccessModifier::Public,
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
				Diagnostic::new(
					"Reserved method name. Constructors are declared with a method named \"new\"",
					&method.0,
				)
				.report();
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
							span: name.span(),
						}),
						span: name.span(),
					}),
					phase: Phase::Preflight,
				},
				body: FunctionBody::Statements(Scope::new(vec![], name.span())),
				is_static: false,
				span: name.span(),
				access: AccessModifier::Public,
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
							span: name.span(),
						}),
						span: name.span(),
					}),
					phase: Phase::Inflight,
				},
				body: FunctionBody::Statements(Scope::new(vec![], name.span())),
				is_static: false,
				span: name.span(),
				access: AccessModifier::Public,
			},
		};

		let parent = if let Some(parent_node) = get_actual_child_by_field_name(*statement_node, "parent") {
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
		for type_node in get_actual_children_by_field_name(*statement_node, "implements") {
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

		let access = self.get_access_modifier(&class_modifiers)?;
		if access == AccessModifier::Protected {
			self.with_error::<Node>(
				"Classes must be public (\"pub\") or private",
				&class_modifiers.expect("access modifier node"),
			)?;
		}

		let span = self.node_span(statement_node);

		Ok(StmtKind::Class(Class {
			name,
			span,
			fields,
			methods,
			parent,
			implements,
			initializer,
			phase: class_phase,
			inflight_initializer,
			access,
			auto_id: false,
		}))
	}

	fn build_class_field(&self, class_element: Node<'_>, class_phase: Phase) -> Result<ClassField, ()> {
		let modifiers = class_element.child_by_field_name("modifiers");
		let is_static = self.get_modifier("static", &modifiers)?.is_some();
		if is_static {
			report_diagnostic(Diagnostic {
				message: "Static class fields not supported yet, see https://github.com/winglang/wing/issues/1668".to_string(),
				span: Some(self.node_span(&class_element)),
				annotations: vec![],
				hints: vec![],
			});
		}
		let phase = match self.get_modifier("inflight_specifier", &modifiers)? {
			None => class_phase,
			Some(_) => Phase::Inflight,
		};
		Ok(ClassField {
			name: self.node_symbol(&class_element.child_by_field_name("name").unwrap())?,
			member_type: self.build_type_annotation(get_actual_child_by_field_name(class_element, "type"), phase)?,
			reassignable: self.get_modifier("reassignable", &modifiers)?.is_some(),
			is_static,
			phase,
			access: self.get_access_modifier(&class_element.child_by_field_name("modifiers"))?,
		})
	}

	fn build_interface_statement(&self, statement_node: &Node, phase: Phase) -> DiagnosticResult<StmtKind> {
		let mut cursor = statement_node.walk();
		let mut extends = vec![];
		let mut methods = vec![];

		let interface_modifiers = statement_node.child_by_field_name("modifiers");
		let phase = if self.get_modifier("inflight_specifier", &interface_modifiers)?.is_some() {
			Phase::Inflight
		} else {
			phase
		};

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
					if let Ok((method_name, func_sig)) = self.build_interface_method(interface_element, phase) {
						methods.push((method_name, func_sig))
					}
				}
				"inflight_method_signature" => {
					if let Ok((method_name, func_sig)) = self.build_interface_method(interface_element, Phase::Inflight) {
						methods.push((method_name, func_sig))
					}
				}
				"class_field" => {
					// Interface method signatures can't have access modifiers like 'pub'
					if let Some(first_child_node) = interface_element.child(0) {
						if let "field_modifiers" = first_child_node.kind() {
							self
								.with_error::<Node>("Access modifiers are not allowed in interfaces", &interface_element)
								.err();
							continue;
						}
					}
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

		let access = self.get_access_modifier(&interface_modifiers)?;
		if access == AccessModifier::Protected {
			self.with_error::<Node>(
				"Interfaces must be public (\"pub\") or private",
				&interface_modifiers.expect("access modifier node"),
			)?;
		}

		Ok(StmtKind::Interface(Interface {
			name,
			methods,
			extends,
			access,
			phase,
		}))
	}

	fn build_interface_method(
		&self,
		interface_element: Node,
		phase: Phase,
	) -> DiagnosticResult<(Symbol, FunctionSignature)> {
		let name = interface_element.child_by_field_name("name").unwrap();
		let method_name = self.node_symbol(&name)?;
		let func_sig = self.build_function_signature(&interface_element, phase, true)?;
		Ok((method_name, func_sig))
	}

	fn build_function_signature(
		&self,
		func_sig_node: &Node,
		phase: Phase,
		require_annotations: bool,
	) -> DiagnosticResult<FunctionSignature> {
		let parameters = self.build_parameter_list(
			&func_sig_node.child_by_field_name("parameter_list").unwrap(),
			phase,
			require_annotations,
		)?;
		let return_type = if let Some(rt) = get_actual_child_by_field_name(*func_sig_node, "type") {
			self.build_type_annotation(Some(rt), phase)?
		} else {
			if require_annotations {
				self.add_error("Expected function return type", &func_sig_node);
			}
			let func_sig_kind = func_sig_node.kind();
			if func_sig_kind == "closure" {
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
		self.build_function_definition(None, anon_closure_node, phase, false)
	}

	fn build_function_definition(
		&self,
		name: Option<Symbol>,
		func_def_node: &Node,
		phase: Phase,
		require_annotations: bool,
	) -> DiagnosticResult<FunctionDefinition> {
		let modifiers = func_def_node.child_by_field_name("modifiers");

		let phase = match self.get_modifier("inflight_specifier", &modifiers)? {
			Some(_) => Phase::Inflight,
			None => phase,
		};

		let is_static = self.get_modifier("static", &modifiers)?.is_some();

		let signature = self.build_function_signature(func_def_node, phase, require_annotations)?;
		let statements = if let Some(external) = self.get_modifier("extern_modifier", &modifiers)? {
			let node_text = self.node_text(&external.named_child(0).unwrap());
			let file_path = Utf8Path::new(&node_text[1..node_text.len() - 1]);
			let file_path = normalize_path(file_path, Some(&Utf8Path::new(&self.source_name)));
			if !file_path.exists() {
				self.add_error(format!("File not found: {}", node_text), &external);
			}

			// Make sure there's no statements block for extern functions
			if let Some(body) = &func_def_node.child_by_field_name("block") {
				self
					.build_error("Extern functions cannot have a body", &external)
					.with_annotation("Body defined here", self.node_span(body))
					.report();
			}

			FunctionBody::External(file_path)
		} else {
			FunctionBody::Statements(self.build_scope(&self.get_child_field(func_def_node, "block")?, phase))
		};

		Ok(FunctionDefinition {
			name,
			body: statements,
			signature,
			is_static,
			span: self.node_span(func_def_node),
			access: self.get_access_modifier(&modifiers)?,
		})
	}

	/// Builds a vector of all parameters defined in `parameter_list_node`.
	///
	/// # Returns
	/// A vector of tuples for each parameter in the list. The tuples are the name, type and a bool letting
	/// us know whether the parameter is reassignable or not respectively.
	fn build_parameter_list(
		&self,
		parameter_list_node: &Node,
		phase: Phase,
		require_annotations: bool,
	) -> DiagnosticResult<Vec<FunctionParameter>> {
		let mut res = vec![];
		let mut cursor = parameter_list_node.walk();
		for definition_node in parameter_list_node.named_children(&mut cursor) {
			if definition_node.is_extra() {
				continue;
			}

			let param = FunctionParameter {
				name: self.check_reserved_symbol(&definition_node.child_by_field_name("name").unwrap())?,
				type_annotation: self.build_type_annotation(get_actual_child_by_field_name(definition_node, "type"), phase)?,
				reassignable: definition_node.child_by_field_name("reassignable").is_some(),
				variadic: definition_node.child_by_field_name("variadic").is_some(),
			};

			if require_annotations && matches!(param.type_annotation.kind, TypeAnnotationKind::Inferred) {
				self.add_error("Expected type annotation", &definition_node);
			}

			res.push(param);
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

	/// Get the access modifier an elements (closure/class/field/method) modifiers node (from a list of multiple modifiers)
	fn get_access_modifier(&self, modifiers: &Option<Node>) -> DiagnosticResult<AccessModifier> {
		Ok(self.build_access_modifier(&self.get_modifier("access_modifier", modifiers)?))
	}

	/// Given an access modifier node build the correct access modifier, defaulting to private
	fn build_access_modifier(&self, maybe_access_modifer: &Option<Node>) -> AccessModifier {
		match maybe_access_modifer {
			Some(access_modifier) => match self.node_text(access_modifier) {
				"pub" => AccessModifier::Public,
				"protected" => AccessModifier::Protected,
				other => panic!("Unexpected access modifier {}", other),
			},
			None => AccessModifier::Private,
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
				let inner_type = self.build_type_annotation(type_node.named_child(0), phase)?;
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

				Ok(TypeAnnotation {
					kind: TypeAnnotationKind::Function(FunctionSignature {
						parameters,
						return_type: Box::new(self.build_type_annotation(
							Some(get_actual_child_by_field_name(*type_node, "return_type").unwrap()),
							phase,
						)?),
						phase: if type_node.child_by_field_name("inflight").is_some() {
							Phase::Inflight
						} else {
							phase // inherit from scope
						},
					}),
					span,
				})
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
				let element_type = get_actual_child_by_field_name(*type_node, "type_parameter");
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
			"structured_access_expression" => Ok(self.build_structured_access_expression(&actual_node, phase)?),
			other => self.with_error(format!("Expected reference, got {other}"), &actual_node),
		}
	}

	fn build_structured_access_expression(&self, structured_access_node: &Node, phase: Phase) -> DiagnosticResult<Expr> {
		let object_expr = structured_access_node.named_child(0).unwrap();
		let object_expr = self.build_expression(&object_expr, phase)?;

		let index_expr = structured_access_node.named_child(1).unwrap();
		let index_expr = self.build_expression(&index_expr, phase)?;

		Ok(Expr::new(
			ExprKind::Reference(Reference::ElementAccess {
				object: Box::new(object_expr),
				index: Box::new(index_expr),
			}),
			self.node_span(structured_access_node),
		))
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

		Ok(ArgList::new(pos_args, named_args, span))
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
					Ok(ArgList::new_empty(WingSpan::default()))
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
					ExprKind::New(New {
						class: class_udt,
						obj_id,
						arg_list: arg_list?,
						obj_scope,
					}),
					expression_span,
				))
			}
			"binary_expression" | "unwrap_or" => Ok(Expr::new(
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
			"non_interpolated_string" => {
				// skipping the first #
				let byte_range = (expression_node.start_byte() + 1)..expression_node.end_byte();
				Ok(Expr::new(
					ExprKind::Literal(Literal::NonInterpolatedString(
						self.node_text_from_range(byte_range).into(),
					)),
					expression_span,
				))
			}
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
				ExprKind::Literal(Literal::Number(parse_number(self.node_text(&expression_node)))),
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
			"closure" => Ok(Expr::new(
				ExprKind::FunctionClosure(self.build_anonymous_closure(&expression_node, phase)?),
				expression_span,
			)),
			"array_literal" => {
				let array_type = if let Some(type_node) = get_actual_child_by_field_name(*expression_node, "type") {
					self.build_type_annotation(Some(type_node), phase).ok()
				} else {
					None
				};

				// check if the array type is annotated as a Set/MutSet
				// if so, we should build a set literal instead
				if let Some(TypeAnnotation { kind, .. }) = &array_type {
					if matches!(kind, TypeAnnotationKind::Set(_) | TypeAnnotationKind::MutSet(_)) {
						return self.build_set_literal(expression_node, phase);
					}
				}

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
				let fields = self.build_json_map_fields(expression_node, phase)?;
				Ok(Expr::new(ExprKind::JsonMapLiteral { fields }, expression_span))
			}
			"map_literal" => {
				let map_type = if let Some(type_node) = get_actual_child_by_field_name(*expression_node, "type") {
					self.build_type_annotation(Some(type_node), phase).ok()
				} else {
					None
				};

				let fields = self.build_map_fields(expression_node, phase)?;

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
			"struct_literal" => {
				let type_ = self.build_type_annotation(get_actual_child_by_field_name(*expression_node, "type"), phase);
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
			"optional_unwrap" => {
				let expression = self.build_expression(&expression_node.named_child(0).unwrap(), phase);
				Ok(Expr::new(
					ExprKind::Unary {
						op: UnaryOperator::OptionalUnwrap,
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

	fn build_json_map_fields(&self, expression_node: &Node<'_>, phase: Phase) -> Result<IndexMap<Symbol, Expr>, ()> {
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

	fn build_map_fields(&self, expression_node: &Node<'_>, phase: Phase) -> Result<Vec<(Expr, Expr)>, ()> {
		let mut fields = vec![];
		let mut cursor = expression_node.walk();
		for field_node in expression_node.children_by_field_name("member", &mut cursor) {
			if field_node.is_extra() {
				continue;
			}
			let key_node = field_node.named_child(0).unwrap();
			let value_node = field_node.named_child(1).unwrap();
			fields.push((
				self.build_expression(&key_node, phase)?,
				self.build_expression(&value_node, phase)?,
			));
		}
		Ok(fields)
	}

	fn build_set_literal(&self, expression_node: &Node, phase: Phase) -> Result<Expr, ()> {
		let expression_span = self.node_span(expression_node);
		let set_type = if let Some(type_node) = get_actual_child_by_field_name(*expression_node, "type") {
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
		let mut sibling = node.prev_sibling();
		while let Some(s) = sibling {
			if !s.is_extra() {
				break;
			}
			sibling = s.prev_sibling();
		}

		return sibling.unwrap_or(node);
	}

	fn report_unhandled_errors(&self, root: &Node) {
		let iterator = crate::ts_traversal::PostOrderIter::new(root);
		for node in iterator {
			if node.kind() == "AUTOMATIC_SEMICOLON" {
				let target_node = Self::last_non_extra(node).range();
				let end_byte = target_node.end_byte;
				let end_point: WingLocation = target_node.end_point.into();

				let diag = Diagnostic {
					message: ERR_EXPECTED_SEMICOLON.to_string(),
					span: Some(WingSpan {
						start: end_point,
						end: end_point,
						end_offset: end_byte,
						start_offset: end_byte,
						file_id: self.source_name.to_string(),
					}),
					annotations: vec![],
					hints: vec![],
				};
				report_diagnostic(diag);
			} else if node.kind() == "AUTOMATIC_BLOCK" {
				let target_node = Self::last_non_extra(node).range();
				let end_byte = target_node.end_byte;
				let end_point: WingLocation = target_node.end_point.into();

				let diag = Diagnostic {
					message: "Expected block".to_string(),
					span: Some(WingSpan {
						start: end_point,
						end: end_point,
						end_offset: end_byte,
						start_offset: end_byte,
						file_id: self.source_name.to_string(),
					}),
					annotations: vec![],
					hints: vec![],
				};
				report_diagnostic(diag);
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
						span: Some(self.node_span(&target_node)),
						annotations: vec![],
						hints: vec![],
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
				access: AccessModifier::Public,
			}),
			statements_span.clone(),
		);

		let type_span = self.node_span(&statement_node.child(0).unwrap());
		Ok(StmtKind::Expression(Expr::new(
			ExprKind::New(New {
				class: UserDefinedType {
					root: Symbol::global(WINGSDK_STD_MODULE),
					fields: vec![Symbol::global(WINGSDK_TEST_CLASS_NAME)],
					span: type_span.clone(),
				},
				obj_id: Some(test_id),
				obj_scope: None,
				arg_list: ArgList::new(vec![inflight_closure], IndexMap::new(), type_span.clone()),
			}),
			span,
		)))
	}
}

/// Get actual child by field name when multiple children exist because of extra nodes.
/// It should be safe to use this instead of `node.get_child_by_field_name`
/// in cases where there's doubt.
fn get_actual_child_by_field_name<'a>(node: Node<'a>, field_name: &str) -> Option<Node<'a>> {
	get_actual_children_by_field_name(node, field_name).into_iter().next()
}

/// Get actual children by field name when the children might contain extra nodes.
/// It should be safe to use this instead of `node.get_children_by_field_name`
/// in cases where there's doubt.
fn get_actual_children_by_field_name<'a>(node: Node<'a>, field_name: &str) -> Vec<Node<'a>> {
	let mut cursor = node.walk();
	let mut children = Vec::new();

	for child_node in node.children_by_field_name(field_name, &mut cursor) {
		if child_node.is_extra() {
			continue;
		}
		if !child_node.is_named() {
			continue;
		}
		children.push(child_node);
	}
	children
}

/// Check if the package.json in the given directory has a `wing` field
fn is_wing_library(module_dir: &Utf8Path) -> bool {
	let package_json_path = Utf8Path::new(module_dir).join("package.json");
	if !package_json_path.exists() {
		return false;
	}

	let package_json = match fs::read_to_string(package_json_path) {
		Ok(package_json) => package_json,
		Err(_) => return false,
	};

	let package_json: serde_json::Value = match serde_json::from_str(&package_json) {
		Ok(package_json) => package_json,
		Err(_) => return false,
	};

	match package_json.get("wing") {
		Some(_) => true,
		None => false,
	}
}

pub fn is_entrypoint_file(path: &Utf8Path) -> bool {
	path
		.file_name()
		.map(|s| s == "main.w" || s.ends_with(".main.w") || s.ends_with(".test.w"))
		.unwrap_or(false)
}

fn is_valid_module_statement(stmt: &Stmt) -> bool {
	match stmt.kind {
		// --- these are all cool ---
		StmtKind::Bring { .. } => true,
		StmtKind::Class(_) => true,
		StmtKind::Interface(_) => true,
		StmtKind::Struct { .. } => true,
		StmtKind::Enum { .. } => true,
		StmtKind::CompilerDebugEnv => true,
		// --- these are all uncool ---
		StmtKind::SuperConstructor { .. } => false,
		StmtKind::If { .. } => false,
		StmtKind::ForLoop { .. } => false,
		StmtKind::While { .. } => false,
		StmtKind::IfLet { .. } => false,
		StmtKind::Break => false,
		StmtKind::Continue => false,
		StmtKind::Return(_) => false,
		StmtKind::Throw(_) => false,
		StmtKind::Expression(_) => false,
		StmtKind::Assignment { .. } => false,
		StmtKind::Scope(_) => false,
		StmtKind::TryCatch { .. } => false,
		StmtKind::ExplicitLift(_) => false,
		// TODO: support constants https://github.com/winglang/wing/issues/3606
		// TODO: support test statements https://github.com/winglang/wing/issues/3571
		StmtKind::Let { .. } => false,
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

fn parse_number(s: &str) -> f64 {
	// remove all underscores from the string
	let s = s.replace("_", "");
	return s.parse().expect("Number string");
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn filter_unnamed_nodes() {
		// Test get_actual_children_by_field_name
		let language = tree_sitter_wing::language();
		let mut tree_sitter_parser = tree_sitter::Parser::new();
		tree_sitter_parser.set_language(&language).unwrap();

		let tree_sitter_tree = tree_sitter_parser
			.parse("let x: ((num)) = 1;".as_bytes(), None)
			.unwrap();
		let stmt_node = tree_sitter_tree.root_node().named_child(0).expect("a statement node");

		// We expect 5 sibling nodes because of the parentheses nodes
		let mut cursor = stmt_node.walk();
		let unnamed_type_nodes = stmt_node.children_by_field_name("type", &mut cursor);
		assert!(unnamed_type_nodes.count() == 5);

		// get_actual_children_by_field_name should filter out the unnamed nodes leaving us with the actual type node
		let type_node = get_actual_children_by_field_name(stmt_node, "type");
		assert!(type_node.len() == 1);
	}

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

	#[test]
	fn test_contains_non_symbolic() {
		assert_eq!(true, contains_non_symbolic("wow%zer"));
		assert_eq!(true, contains_non_symbolic("w.owzer"));
		assert_eq!(true, contains_non_symbolic("#wowzer"));
		assert_eq!(true, contains_non_symbolic("wow-zer"));
		assert_eq!(true, contains_non_symbolic("$wowzer"));
		assert_eq!(false, contains_non_symbolic("_wowzer"));
		assert_eq!(false, contains_non_symbolic("wowzer"));
	}
}
