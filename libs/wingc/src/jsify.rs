#[macro_use]
pub mod codemaker;
mod tests;
use aho_corasick::AhoCorasick;
use camino::{Utf8Path, Utf8PathBuf};
use const_format::formatcp;
use indexmap::{IndexMap, IndexSet};
use itertools::Itertools;
use parcel_sourcemap::utils::make_relative_path;

use std::{borrow::Borrow, cell::RefCell, cmp::Ordering, collections::BTreeMap, vec};

use crate::{
	ast::{
		AccessModifier, ArgList, AssignmentKind, BinaryOperator, BringSource, CalleeKind, Class as AstClass, Elifs, Enum,
		Expr, ExprKind, FunctionBody, FunctionDefinition, IfLet, InterpolatedStringPart, Literal, New, Phase, Reference,
		Scope, Stmt, StmtKind, Symbol, UnaryOperator, UserDefinedType,
	},
	comp_ctx::{CompilationContext, CompilationPhase},
	dbg_panic,
	diagnostic::{report_diagnostic, Diagnostic, WingSpan},
	file_graph::FileGraph,
	files::Files,
	parser::is_entrypoint_file,
	type_check::{
		is_udt_struct_type,
		lifts::{LiftQualification, Liftable, Lifts},
		resolve_super_method, resolve_user_defined_type,
		symbol_env::SymbolEnv,
		ClassLike, Type, TypeRef, Types, CLASS_INFLIGHT_INIT_NAME,
	},
	visit_context::{VisitContext, VisitorWithContext},
	MACRO_REPLACE_ARGS, MACRO_REPLACE_ARGS_TEXT, MACRO_REPLACE_SELF, WINGSDK_ASSEMBLY_NAME, WINGSDK_AUTOID_RESOURCE,
	WINGSDK_RESOURCE, WINGSDK_STD_MODULE,
};

use self::codemaker::CodeMaker;

const PREFLIGHT_FILE_NAME: &str = "preflight.js";

const STDLIB: &str = "$stdlib";
const STDLIB_CORE: &str = formatcp!("{STDLIB}.core");
const STDLIB_CORE_RESOURCE: &str = formatcp!("{}.{}", STDLIB, WINGSDK_RESOURCE);
const STDLIB_CORE_AUTOID_RESOURCE: &str = formatcp!("{}.{}", STDLIB, WINGSDK_AUTOID_RESOURCE);
const STDLIB_MODULE: &str = WINGSDK_ASSEMBLY_NAME;

const ENV_WING_IS_TEST: &str = "$wing_is_test";
const OUTDIR_VAR: &str = "$outdir";
const PLATFORMS_VAR: &str = "$platforms";
const HELPERS_VAR: &str = "$helpers";

const ROOT_CLASS: &str = "$Root";
const JS_CONSTRUCTOR: &str = "constructor";
const NODE_MODULES_DIR: &str = "node_modules";
const NODE_MODULES_SCOPE_SPECIFIER: &str = "@";

const SUPER_CLASS_INFLIGHT_INIT_NAME: &str = formatcp!("super_{CLASS_INFLIGHT_INIT_NAME}");

pub struct JSifyContext<'a> {
	pub lifts: Option<&'a Lifts>,
	pub visit_ctx: &'a mut VisitContext,
	pub source_path: Option<&'a Utf8Path>,
}

pub struct JSifier<'a> {
	pub types: &'a mut Types,
	/// Store the output files here.
	pub output_files: RefCell<Files>,
	/// Stored struct schemas that are referenced in the code.
	pub referenced_struct_schemas: RefCell<BTreeMap<String, CodeMaker>>,
	/// Counter for generating unique preflight file names.
	preflight_file_counter: RefCell<usize>,

	/// Counter for generating unique inflight file names.
	inflight_file_counter: RefCell<usize>,
	/// Map from source file IDs to safe counters.
	inflight_file_map: RefCell<IndexMap<String, usize>>,

	/// Map from source file paths to the JS file names they are emitted to.
	/// e.g. "bucket.w" -> "preflight.bucket-1.js"
	pub preflight_file_map: RefCell<IndexMap<Utf8PathBuf, String>>,
	source_files: &'a Files,
	source_file_graph: &'a FileGraph,
	/// The path that compilation started at (file or directory)
	compilation_init_path: &'a Utf8Path,
	out_dir: &'a Utf8Path,
}

impl VisitorWithContext for JSifyContext<'_> {
	fn ctx(&mut self) -> &mut VisitContext {
		&mut self.visit_ctx
	}
}

/// Preflight classes have two types of host binding methods:
/// `Type` for binding static fields and methods to the host and
/// `instance` for binding instance fields and methods to the host.
#[derive(PartialEq, Eq)]
enum BindMethod {
	Type,
	Instance,
}

impl<'a> JSifier<'a> {
	pub fn new(
		types: &'a mut Types,
		source_files: &'a Files,
		source_file_graph: &'a FileGraph,
		compilation_init_path: &'a Utf8Path,
		out_dir: &'a Utf8Path,
	) -> Self {
		let output_files = Files::default();
		Self {
			types,
			source_files,
			source_file_graph,
			compilation_init_path,
			out_dir,
			referenced_struct_schemas: RefCell::new(BTreeMap::new()),
			inflight_file_counter: RefCell::new(0),
			inflight_file_map: RefCell::new(IndexMap::new()),
			preflight_file_counter: RefCell::new(0),
			preflight_file_map: RefCell::new(IndexMap::new()),
			output_files: RefCell::new(output_files),
		}
	}

	pub fn jsify(&mut self, source_path: &Utf8Path, scope: &Scope) {
		CompilationContext::set(CompilationPhase::Jsifying, &scope.span);
		let mut js = CodeMaker::default();
		let mut imports = CodeMaker::default();

		let mut visit_ctx = VisitContext::new();
		let mut jsify_context = JSifyContext {
			visit_ctx: &mut visit_ctx,
			lifts: None,
			source_path: Some(source_path),
		};
		jsify_context.visit_ctx.push_env(self.types.get_scope_env(&scope));
		for statement in scope.statements.iter().sorted_by(|a, b| match (&a.kind, &b.kind) {
			// Put type definitions first so JS won't complain of unknown types
			(StmtKind::Enum(_), StmtKind::Enum(_)) => Ordering::Equal,
			(StmtKind::Enum(_), _) => Ordering::Less,
			(_, StmtKind::Enum(_)) => Ordering::Greater,
			(StmtKind::Class(_), StmtKind::Class(_)) => Ordering::Equal,
			(StmtKind::Class(_), _) => Ordering::Less,
			(_, StmtKind::Class(_)) => Ordering::Greater,
			_ => Ordering::Equal,
		}) {
			let scope_env = self.types.get_scope_env(&scope);
			let s = self.jsify_statement(&scope_env, statement, &mut jsify_context); // top level statements are always preflight
			if let StmtKind::Bring {
				identifier: _,
				source: _,
			} = statement.kind
			{
				imports.add_code(s);
			} else {
				js.add_code(s);
			}
		}

		let mut output = CodeMaker::default();

		let is_compilation_init = source_path == self.compilation_init_path;
		let is_entrypoint = is_entrypoint_file(source_path);
		let is_directory = source_path.is_dir();

		output.line("\"use strict\";");

		output.line(format!("const {} = require('{}');", STDLIB, STDLIB_MODULE));

		if is_entrypoint {
			output.line(format!(
				"const {} = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);",
				PLATFORMS_VAR
			));
			output.line(format!("const {} = process.env.WING_SYNTH_DIR ?? \".\";", OUTDIR_VAR));
			output.line(format!(
				"const {} = process.env.WING_IS_TEST === \"true\";",
				ENV_WING_IS_TEST
			));
		}

		// "std" is implicitly imported
		output.line(format!("const std = {STDLIB}.{WINGSDK_STD_MODULE};"));
		output.line(format!("const {HELPERS_VAR} = {STDLIB}.helpers;"));
		output.add_code(imports);

		if is_entrypoint {
			let mut root_class = CodeMaker::default();
			root_class.open(format!("class {} extends {} {{", ROOT_CLASS, STDLIB_CORE_RESOURCE));
			root_class.open(format!("{JS_CONSTRUCTOR}($scope, $id) {{"));
			root_class.line("super($scope, $id);");
			root_class.add_code(self.jsify_struct_schemas());
			root_class.add_code(js);
			root_class.close("}");
			root_class.close("}");

			output.add_code(root_class);
			output.line(format!(
				"const $PlatformManager = new $stdlib.platform.PlatformManager({{platformPaths: {}}});",
				PLATFORMS_VAR
			));
			let app_name = source_path.file_stem().unwrap();
			output.line(format!(
				"const $APP = $PlatformManager.createApp({{ outdir: {}, name: \"{}\", rootConstruct: {}, isTestEnvironment: {}, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }});",
				OUTDIR_VAR, app_name, ROOT_CLASS, ENV_WING_IS_TEST
			));
			output.line("$APP.synth();".to_string());
		} else if is_directory {
			let directory_children = self.source_file_graph.dependencies_of(source_path);
			let preflight_file_map = self.preflight_file_map.borrow();

			// supposing a directory has two files and two subdirectories in it,
			// we generate code like this:
			// ```
			// module.exports = {
			//   get inner_directory1() { return require("./preflight.inner-directory1.js") },
			//   get inner_directory2() { return require("./preflight.inner-directory2.js") },
			//   ...require("./preflight.inner-file1.js"),
			//   ...require("./preflight.inner-file2.js"),
			// };
			// ```
			output.open("module.exports = {");
			for file in directory_children {
				let preflight_file_name = preflight_file_map.get(file).expect("no emitted JS file found");
				if file.is_dir() {
					let directory_name = file.file_stem().unwrap();
					output.line(format!(
						"get {directory_name}() {{ return require(\"./{preflight_file_name}\") }},"
					));
				} else {
					output.line(format!("...require(\"./{preflight_file_name}\"),"));
				}
			}
			output.close("};");
		} else {
			output.add_code(self.jsify_struct_schemas());
			output.add_code(js);
			let exports = get_public_symbols(&scope);
			output.line(format!(
				"module.exports = {{ {} }};",
				exports.iter().map(ToString::to_string).join(", ")
			));
		}

		// Generate a name for the JS file this preflight code will be written to
		let preflight_file_name = if is_compilation_init {
			PREFLIGHT_FILE_NAME.to_string()
		} else {
			// remove all non-alphanumeric characters
			let sanitized_name = source_path
				.file_stem()
				.unwrap()
				.chars()
				.filter(|c| c.is_alphanumeric())
				.collect::<String>();
			// add a number to the end to avoid name collisions
			let mut preflight_file_counter = self.preflight_file_counter.borrow_mut();
			*preflight_file_counter += 1;
			format!("preflight.{}-{}.js", sanitized_name, preflight_file_counter)
		};

		// Store the file name in a map so if anyone tries to "bring" it as a module,
		// we can look up what JS file needs to be imported.
		self
			.preflight_file_map
			.borrow_mut()
			.insert(source_path.to_path_buf(), preflight_file_name.clone());

		let sourcemap_path = format!("{}.map", preflight_file_name);
		output.line(format!("//# sourceMappingURL={sourcemap_path}"));
		let source_content = self.source_files.get_file(source_path.as_str()).unwrap();

		let output_base = output.to_string();
		let output_sourcemap = output.generate_sourcemap(
			&make_relative_path(self.out_dir.as_str(), source_path.as_str()),
			source_content,
			&preflight_file_name,
		);

		// Emit the file
		match self
			.output_files
			.borrow_mut()
			.add_file(preflight_file_name.clone(), output_base)
		{
			Ok(()) => {}
			Err(err) => report_diagnostic(err.into()),
		}
		match self
			.output_files
			.borrow_mut()
			.add_file(sourcemap_path, output_sourcemap)
		{
			Ok(()) => {}
			Err(err) => report_diagnostic(err.into()),
		}
	}

	fn jsify_struct_schemas(&self) -> CodeMaker {
		// For each struct schema that is referenced in the code
		// (this is determined by the StructSchemaVisitor before jsification starts)
		// we write an inline call to stdlib struct class to instantiate the schema object
		// preflight root class.
		let mut code = CodeMaker::default();
		for (name, schema_code) in self.referenced_struct_schemas.borrow().iter() {
			let flat_name = name.replace(".", "_");

			code.line(format!(
				"const {flat_name} = $stdlib.std.Struct._createJsonSchema({});",
				schema_code.to_string().replace("\n", "").replace(" ", "")
			));
		}
		code
	}

	fn jsify_scope_body(&self, scope: &Scope, ctx: &mut JSifyContext) -> CodeMaker {
		CompilationContext::set(CompilationPhase::Jsifying, &scope.span);
		let mut code = CodeMaker::with_source(&scope.span);

		let scope_env = self.types.get_scope_env(&scope);
		ctx.visit_ctx.push_env(scope_env);
		for statement in scope.statements.iter() {
			let statement_code = self.jsify_statement(&scope_env, statement, ctx);
			code.add_code(statement_code);
		}
		ctx.visit_ctx.pop_env();

		code
	}

	fn jsify_reference(&self, reference: &Reference, ctx: &mut JSifyContext) -> CodeMaker {
		match reference {
			Reference::Identifier(identifier) => new_code!(&identifier.span, &identifier.name),
			Reference::InstanceMember {
				object,
				property,
				optional_accessor,
			} => new_code!(
				&property.span,
				self.jsify_expression(object, ctx),
				if *optional_accessor { "?." } else { "." },
				&property.to_string()
			),
			Reference::TypeMember { type_name, property } => {
				new_code!(
					&property.span,
					self.jsify_user_defined_type(type_name, ctx),
					".",
					&property.name
				)
			}
		}
	}

	fn jsify_arg_list(
		&self,
		arg_list: &ArgList,
		scope: Option<String>,
		id: Option<String>,
		ctx: &mut JSifyContext,
	) -> CodeMaker {
		let mut args = vec![];
		let mut structure_args = vec![];

		if let Some(scope_str) = scope {
			args.push(new_code!(&arg_list.span, scope_str));
		}

		if let Some(id_str) = id {
			args.push(new_code!(&arg_list.span, id_str));
		}

		for arg in arg_list.pos_args.iter() {
			args.push(self.jsify_expression(arg, ctx));
		}

		for arg in arg_list.named_args.iter() {
			structure_args.push(new_code!(
				&arg_list.span,
				&arg.0.name,
				": ",
				self.jsify_expression(arg.1, ctx)
			));
		}

		if !structure_args.is_empty() {
			args.push(new_code!(&arg_list.span, "{ ", structure_args, " }"));
		}

		new_code!(&arg_list.span, args)
	}

	pub fn jsify_type(typ: &Type) -> Option<String> {
		match typ {
			Type::Struct(t) => Some(t.name.name.clone()),
			Type::String => Some("string".to_string()),
			Type::Number => Some("number".to_string()),
			Type::Boolean => Some("boolean".to_string()),
			Type::Array(t) => {
				if let Some(inner) = Self::jsify_type(&t) {
					Some(format!("{}[]", inner))
				} else {
					None
				}
			}
			Type::Optional(t) => {
				if let Some(inner) = Self::jsify_type(&t) {
					Some(format!("{}?", inner))
				} else {
					None
				}
			}
			_ => None,
		}
	}

	pub fn jsify_user_defined_type(&self, udt: &UserDefinedType, ctx: &mut JSifyContext) -> CodeMaker {
		if ctx.visit_ctx.current_phase() == Phase::Inflight {
			if let Some(lifts) = &ctx.lifts {
				if let Some(t) = lifts.token_for_liftable(&Liftable::Type(udt.clone())) {
					return new_code!(&udt.span, t);
				}
			}
		}

		if is_udt_struct_type(udt, ctx.visit_ctx.current_env().unwrap()) {
			// For struct type, we emit the name as a flattened string. I.E. mylib.MyStruct becomes mylib_MyStruct
			return new_code!(&udt.span, udt.full_path_str().replace(".", "_"));
		}
		new_code!(&udt.span, udt.full_path_str())
	}

	pub fn jsify_expression(&self, expression: &Expr, ctx: &mut JSifyContext) -> CodeMaker {
		CompilationContext::set(CompilationPhase::Jsifying, &expression.span);
		let expr_span = &expression.span;

		// if we are in inflight and there's a lifting/capturing token associated with this expression
		// then emit the token instead of the expression.
		if ctx.visit_ctx.current_phase() == Phase::Inflight {
			if let Some(lifts) = &ctx.lifts {
				if let Some(t) = lifts.token_for_liftable(&Liftable::Expr(expression.id)) {
					return new_code!(expr_span, t);
				}
			}
		}

		// if we are in preflight phase and we see an inflight expression (which is not "this."), then
		// this is an error. this can happen if we render a lifted preflight expression that references
		// an e.g. variable from inflight (`myarr.get(i)` where `myarr` is preflight and `i` is an
		// inflight variable). in this case we need to bail out.
		if ctx.visit_ctx.current_phase() == Phase::Preflight {
			if let Some(expr_phase) = self.types.get_expr_phase(expression) {
				if expr_phase == Phase::Inflight {
					report_diagnostic(Diagnostic {
						message: "Cannot reference an inflight value from within a preflight expression".to_string(),
						span: Some(expression.span.clone()),
						annotations: vec![],
						hints: vec![],
					});

					return new_code!(expr_span, "<ERROR>");
				}
			}
		}

		let auto_await = match ctx.visit_ctx.current_phase() {
			Phase::Inflight => "await ",
			_ => "",
		};
		match &expression.kind {
			ExprKind::New(new) => {
				let New {
					class,
					obj_id,
					arg_list,
					obj_scope,
				} = new;

				let expression_type = self.types.get_expr_type(&expression);
				let is_preflight_class = expression_type.is_preflight_class();

				let class_type = if let Some(class_type) = expression_type.as_class() {
					class_type
				} else {
					return new_code!(expr_span, "");
				};
				// if we have an FQN, we emit a call to the "new" factory method to allow
				// targets and plugins to inject alternative implementations for types. otherwise (e.g.
				// user-defined types), we simply instantiate the type directly (maybe in the future we will
				// allow customizations of user-defined types as well, but for now we don't).

				let ctor = self.jsify_user_defined_type(class, ctx);

				let scope = if is_preflight_class && class_type.std_construct_args {
					if let Some(scope) = obj_scope {
						Some(self.jsify_expression(scope, ctx).to_string())
					} else {
						Some("this".to_string())
					}
				} else {
					None
				};

				let id = if is_preflight_class && class_type.std_construct_args {
					Some(if let Some(id_exp) = obj_id {
						self.jsify_expression(id_exp, ctx).to_string()
					} else {
						// take only the last part of the fully qualified name (the class name) because any
						// leading parts like the namespace are volatile and can be changed easily by the user
						let s = ctor.to_string();
						let class_name = s.split(".").last().unwrap().to_string();
						format!("\"{}\"", class_name)
					})
				} else {
					None
				};

				let fqn = class_type.fqn.clone();

				let scope_arg = if fqn.is_none() {
					scope.clone()
				} else {
					match scope.clone() {
						None => None,
						Some(scope) => Some(if scope == "this" {
							"this".to_string()
						} else {
							"$scope".to_string()
						}),
					}
				};

				let args = self.jsify_arg_list(&arg_list, scope_arg, id, ctx);

				if let (true, Some(fqn)) = (is_preflight_class, fqn) {
					// determine the scope to use for finding the root object
					let node_scope = if let Some(scope) = scope {
						scope
					} else {
						"this".to_string()
					};

					// if a scope is defined, use it to find the root object, otherwise use "this"
					if node_scope != "this" {
						new_code!(
							expr_span,
							"($scope => $scope.node.root.new(\"",
							fqn,
							"\", ",
							ctor,
							", ",
							args,
							"))(",
							node_scope,
							")"
						)
					} else {
						new_code!(expr_span, "this.node.root.new(\"", fqn, "\", ", ctor, ", ", args, ")")
					}
				} else {
					// If we're inflight and this new expression evaluates to a type with an inflight init (that's not empty)
					// make sure it's called before we return the object.
					if ctx.visit_ctx.current_phase() == Phase::Inflight
						&& expression_type
							.as_class()
							.expect("a class")
							.get_method(&Symbol::global(CLASS_INFLIGHT_INIT_NAME))
							.is_some()
					{
						new_code!(
							expr_span,
							"(await (async () => {const o = new ",
							ctor,
							"(",
							args,
							"); await o.",
							CLASS_INFLIGHT_INIT_NAME,
							"?.(); return o; })())"
						)
					} else {
						new_code!(expr_span, "new ", ctor, "(", args, ")")
					}
				}
			}
			ExprKind::Literal(lit) => match lit {
				Literal::Nil => new_code!(expr_span, "undefined"),
				Literal::String(s) => {
					// Unescape our string interpolation braces because in JS they don't need escaping
					let s = s.replace("\\{", "{");
					// escape newlines
					let s = s.replace("\r", "\\r").replace("\n", "\\n");
					new_code!(expr_span, s)
				}
				Literal::InterpolatedString(s) => {
					let statics = s
						.parts
						.iter()
						.filter_map(|p| match p {
							InterpolatedStringPart::Static(static_string) => {
								// escape any raw newlines in the string because js `"` strings can't contain them
								let escaped = static_string.replace("\r\n", "\\r\\n").replace("\n", "\\n");

								Some(new_code!(expr_span, "\"", escaped, "\""))
							}
							InterpolatedStringPart::Expr(_) => None,
						})
						.collect_vec();
					let exprs = s
						.parts
						.iter()
						.filter_map(|p| match p {
							InterpolatedStringPart::Static(_) => None,
							InterpolatedStringPart::Expr(e) => Some(match *self.types.get_expr_type(e) {
								Type::Json(_) | Type::MutJson => {
									new_code!(expr_span, "JSON.stringify(", self.jsify_expression(e, ctx), ")")
								}
								_ => self.jsify_expression(e, ctx),
							}),
						})
						.collect_vec();

					new_code!(expr_span, "String.raw({ raw: [", statics, "] }, ", exprs, ")")
				}
				Literal::Number(n) => new_code!(expr_span, n.to_string()),
				Literal::Boolean(b) => new_code!(expr_span, (if *b { "true" } else { "false" }).to_string()),
			},
			ExprKind::Range { start, inclusive, end } => new_code!(
				expr_span,
				format!("{HELPERS_VAR}.range("),
				self.jsify_expression(start, ctx),
				",",
				self.jsify_expression(end, ctx),
				",",
				inclusive.unwrap().to_string(),
				")"
			),
			ExprKind::Reference(_ref) => new_code!(expr_span, self.jsify_reference(&_ref, ctx)),
			ExprKind::Call { callee, arg_list } => {
				let function_type = match callee {
					CalleeKind::Expr(expr) => self.types.get_expr_type(expr),
					CalleeKind::SuperCall(method) => {
						resolve_super_method(method, ctx.visit_ctx.current_env().expect("an env"), self.types)
							.expect("valid super method")
							.0
					}
				};
				let is_option = function_type.is_option();
				let function_type = function_type.maybe_unwrap_option();
				let function_sig = function_type.as_function_sig();
				let expr_string = match callee {
					CalleeKind::Expr(expr) => self.jsify_expression(expr, ctx).to_string(),
					CalleeKind::SuperCall(method) => format!("super.{}", method),
				};
				let args_string = self.jsify_arg_list(&arg_list, None, None, ctx).to_string();
				let mut args_text_string = lookup_span(&arg_list.span, &self.source_files);
				if args_text_string.len() > 0 {
					// remove the parens
					args_text_string = args_text_string[1..args_text_string.len() - 1].to_string();
				}
				let args_text_string = escape_javascript_string(&args_text_string);

				if let Some(function_sig) = function_sig {
					if let Some(js_override) = &function_sig.js_override {
						let self_string = match callee {
							CalleeKind::Expr(expr) => match &expr.kind {
								// for "loose" macros, e.g. `print()`, $self$ is the global object
								ExprKind::Reference(Reference::Identifier(_)) => "global".to_string(),
								ExprKind::Reference(Reference::InstanceMember { object, .. }) => {
									self.jsify_expression(&object, ctx).to_string()
								}
								ExprKind::Reference(Reference::TypeMember { property, .. }) => {
									// remove the property name from the expression string
									expr_string.split(".").filter(|s| s != &property.name).join(".")
								}
								_ => expr_string,
							},
							CalleeKind::SuperCall { .. } =>
							// Note: in case of a $self$ macro override of a super call there's no clear definition of what $self$ should be,
							// "this" is a decent option because it'll refer to the object where "super" was used, but depending on how
							// $self$ is used in the macro it might lead to unexpected results if $self$.some_method() is called and is
							// defined differently in the parent class of "this".
							{
								"this".to_string()
							}
						};
						let patterns = &[MACRO_REPLACE_SELF, MACRO_REPLACE_ARGS, MACRO_REPLACE_ARGS_TEXT];
						let replace_with = &[self_string, args_string, args_text_string];
						let ac = AhoCorasick::new(patterns).expect("Failed to create macro pattern");
						return new_code!(expr_span, ac.replace_all(js_override, replace_with));
					}
				}

				let optional_access = if is_option { "?." } else { "" };

				// NOTE: if the expression is a "handle" class, the object itself is callable (see
				// `jsify_class_inflight` below), so we can just call it as-is.
				new_code!(
					expr_span,
					"(",
					auto_await,
					expr_string,
					optional_access,
					"(",
					args_string,
					"))"
				)
			}
			ExprKind::Unary { op, exp } => {
				let js_exp = self.jsify_expression(exp, ctx);
				match op {
					UnaryOperator::Minus => new_code!(expr_span, "(-", js_exp, ")"),
					UnaryOperator::Not => new_code!(expr_span, "(!", js_exp, ")"),
					UnaryOperator::OptionalTest => {
						// We use the abstract inequality operator here because we want to check for null or undefined
						new_code!(expr_span, "((", js_exp, ") != null)")
					}
					UnaryOperator::OptionalUnwrap => {
						new_code!(expr_span, "$helpers.unwrap(", js_exp, ")")
					}
				}
			}
			ExprKind::Binary { op, left, right } => {
				let js_left = self.jsify_expression(left, ctx);
				let js_right = self.jsify_expression(right, ctx);

				let js_op = match op {
					BinaryOperator::AddOrConcat => "+",
					BinaryOperator::Sub => "-",
					BinaryOperator::Mul => "*",
					BinaryOperator::Div => "/",
					BinaryOperator::FloorDiv => return new_code!(expr_span, "Math.trunc(", js_left, " / ", js_right, ")"),
					BinaryOperator::Mod => "%",
					BinaryOperator::Power => "**",
					BinaryOperator::Greater => ">",
					BinaryOperator::GreaterOrEqual => ">=",
					BinaryOperator::Less => "<",
					BinaryOperator::LessOrEqual => "<=",
					BinaryOperator::Equal => return new_code!(expr_span, HELPERS_VAR, ".eq(", js_left, ", ", js_right, ")"),
					BinaryOperator::NotEqual => return new_code!(expr_span, HELPERS_VAR, ".neq(", js_left, ", ", js_right, ")"),
					BinaryOperator::LogicalAnd => "&&",
					BinaryOperator::LogicalOr => "||",
					BinaryOperator::UnwrapOr => {
						// Use JS nullish coalescing operator which treats undefined and null the same
						// this is inline with how wing jsifies optionals
						"??"
					}
				};
				new_code!(expr_span, "(", js_left, " ", js_op, " ", js_right, ")")
			}
			ExprKind::ArrayLiteral { items, .. } => {
				let item_list = items.iter().map(|expr| self.jsify_expression(expr, ctx)).collect_vec();

				new_code!(expr_span, "[", item_list, "]")
			}
			ExprKind::StructLiteral { fields, .. } => {
				new_code!(
					expr_span,
					"({",
					fields
						.iter()
						.map(|(name, expr)| new_code!(expr_span, "\"", &name.name, "\": ", self.jsify_expression(expr, ctx)))
						.collect_vec(),
					"})"
				)
			}
			ExprKind::JsonLiteral { element, .. } => {
				ctx.visit_ctx.push_json();
				let js_out = self.jsify_expression(element, ctx);
				ctx.visit_ctx.pop_json();
				js_out
			}
			ExprKind::JsonMapLiteral { fields } => {
				let f = fields
					.iter()
					.map(|(key, expr)| new_code!(expr_span, "\"", &key.name, "\": ", self.jsify_expression(expr, ctx)))
					.collect_vec();
				new_code!(expr_span, "({", f, "})")
			}
			ExprKind::MapLiteral { fields, .. } => {
				let f = fields
					.iter()
					.map(|(key, value)| {
						let mut kv = new_code!(&key.span, "[", self.jsify_expression(key, ctx), "]: ");
						kv.append(new_code!(&value.span, self.jsify_expression(value, ctx)));
						kv
					})
					.collect_vec();
				new_code!(expr_span, "({", f, "})")
			}
			ExprKind::SetLiteral { items, .. } => {
				let item_list = items.iter().map(|expr| self.jsify_expression(expr, ctx)).collect_vec();
				new_code!(expr_span, "new Set([", item_list, "])")
			}
			ExprKind::FunctionClosure(func_def) => self.jsify_function(None, func_def, true, ctx),
			ExprKind::CompilerDebugPanic => {
				// Handle the debug panic expression (during jsifying)
				dbg_panic!();
				new_code!(expr_span, "")
			}
		}
	}

	// To avoid a performance penalty when evaluating assignments made in the elif statement,
	// it was necessary to nest the if statements.
	//
	// Thus, this code in Wing:
	//
	// if let x = tryA() {
	//  ...
	// } elif let x = tryB() {
	// 	 ...
	// } elif let x = TryC() {
	// 	 ...
	// } else {
	// 	...
	// }
	//
	// In JavaScript, will become this:
	//
	// const $if_let_value = tryA();
	// if ($if_let_value !== undefined) {
	// 	...
	// } else {
	// 	let $elif_let_value0 = tryB();
	// 	if ($elif_let_value0 !== undefined) {
	// 		 ...
	// 	} else {
	// 		 let $elif_let_value1 = tryC();
	// 		 if ($elif_let_value1 !== undefined) {
	// 				...
	// 		 } else {
	// 				...
	// 		 }
	// 	}
	// }
	fn jsify_elif_statements(
		&self,
		code: &mut CodeMaker,
		elif_statements: &Vec<Elifs>,
		index: usize,
		else_statements: &Option<Scope>,
		ctx: &mut JSifyContext,
	) {
		match elif_statements.get(index).unwrap() {
			Elifs::ElifLetBlock(elif_let_to_jsify) => {
				// Emit a JavaScript "else {" for each Wing "elif_let_block",
				// and emit the closing "}" bracket in jsify_statement()'s StmtKind::IfLet match case
				code.open("else {");
				let elif_let_value = "$elif_let_value";

				let value = format!("{}{}", elif_let_value, index);

				code.line(new_code!(
					&elif_let_to_jsify.value.span,
					"const ",
					value,
					" = ",
					self.jsify_expression(&elif_let_to_jsify.value, ctx),
					";"
				));
				let value = format!("{}{}", elif_let_value, index);
				code.open(format!("if ({value} != undefined) {{"));
				if elif_let_to_jsify.reassignable {
					code.line(format!("let {} = {};", elif_let_to_jsify.var_name, value));
				} else {
					code.line(format!("const {} = {};", elif_let_to_jsify.var_name, value));
				}

				code.add_code(self.jsify_scope_body(&elif_let_to_jsify.statements, ctx));
				code.close("}");
			}
			Elifs::ElifBlock(elif_to_jsify) => {
				let condition = self.jsify_expression(&elif_to_jsify.condition, ctx);
				// TODO: this puts the "else if" in a separate line from the closing block but
				// technically that shouldn't be a problem, its just ugly
				code.open(new_code!(&elif_to_jsify.condition.span, "else if (", condition, ") {"));
				code.add_code(self.jsify_scope_body(&elif_to_jsify.statements, ctx));
				code.close("}");
			}
		}
		if index < elif_statements.len() - 1 {
			self.jsify_elif_statements(code, elif_statements, index + 1, else_statements, ctx);
		} else if let Some(else_scope) = else_statements {
			code.open("else {");
			code.add_code(self.jsify_scope_body(else_scope, ctx));
			code.close("}");
		}
		return;
	}

	fn jsify_statement(&self, env: &SymbolEnv, statement: &Stmt, ctx: &mut JSifyContext) -> CodeMaker {
		let mut code = CodeMaker::with_source(&statement.span);

		CompilationContext::set(CompilationPhase::Jsifying, &statement.span);
		ctx.visit_ctx.push_stmt(statement.idx);
		match &statement.kind {
			StmtKind::Bring { source, identifier } => match source {
				BringSource::BuiltinModule(name) => {
					let var_name = identifier.as_ref().unwrap_or(&name);

					code.line(format!("const {var_name} = {STDLIB}.{name};"))
				}
				BringSource::TrustedModule(name, module_dir) => {
					let preflight_file_map = self.preflight_file_map.borrow();
					let preflight_file_name = preflight_file_map.get(module_dir).unwrap();
					let var_name = identifier.as_ref().unwrap_or(&name);
					code.line(format!("const {var_name} = require(\"./{preflight_file_name}\");"))
				}
				BringSource::JsiiModule(name) => {
					// checked during type checking
					let var_name = identifier.as_ref().unwrap_or(&name);
					code.line(format!("const {var_name} = require(\"{name}\");"))
				}
				BringSource::WingLibrary(_, module_dir) => {
					// checked during type checking
					let var_name = identifier.as_ref().expect("bring wing library requires an alias");
					let preflight_file_map = self.preflight_file_map.borrow();
					let preflight_file_name = preflight_file_map.get(module_dir).unwrap();
					code.line(format!("const {var_name} = require(\"./{preflight_file_name}\");"))
				}
				BringSource::WingFile(path) => {
					// checked during type checking
					let var_name = identifier.as_ref().expect("bring wing file requires an alias");
					let preflight_file_map = self.preflight_file_map.borrow();
					let preflight_file_name = preflight_file_map.get(path).unwrap();
					code.line(format!("const {var_name} = require(\"./{preflight_file_name}\");"))
				}
				BringSource::Directory(path) => {
					// checked during type checking
					let preflight_file_map = self.preflight_file_map.borrow();
					let preflight_file_name = preflight_file_map.get(path).unwrap();
					let var_name = identifier.as_ref().expect("bring wing directory requires an alias");
					code.line(format!("const {var_name} = require(\"./{preflight_file_name}\");"))
				}
			},
			StmtKind::SuperConstructor { arg_list } => {
				let args = self.jsify_arg_list(&arg_list, None, None, ctx);
				match parent_class_phase(ctx) {
					Phase::Inflight => code.line(new_code!(
						&arg_list.span,
						"await this.super_",
						CLASS_INFLIGHT_INIT_NAME,
						"?.(",
						args,
						");"
					)),
					Phase::Preflight => code.line(new_code!(&arg_list.span, "super($scope, $id, ", args, ");")),
					Phase::Independent => {
						// If our parent is phase independent then we don't call its super, instead a call to its super will be
						// generated in `jsify_inflight_init` when we generate the inflight init for this class.
						// Note: this is only true for inflight clases which are the only type of classes that can have a phase independent parent.
						// when/if this changes we'll need to be move verbose here.
					}
				}
			}
			StmtKind::Let {
				reassignable,
				var_name,
				initial_value,
				type_: _,
			} => {
				let initial_value = self.jsify_expression(initial_value, ctx);
				if *reassignable {
					code.line(new_code!(
						&statement.span,
						"let ",
						jsify_symbol(&var_name),
						" = ",
						initial_value,
						";"
					))
				} else {
					let new_thing = new_code!(
						&statement.span,
						"const ",
						jsify_symbol(&var_name),
						" = ",
						initial_value,
						";"
					);
					code.line(new_thing)
				}
			}
			StmtKind::ForLoop {
				iterator,
				iterable,
				statements,
			} => {
				code.open(new_code!(
					&statement.span,
					"for (const ",
					jsify_symbol(&iterator),
					" of ",
					self.jsify_expression(iterable, ctx),
					") {"
				));
				code.add_code(self.jsify_scope_body(statements, ctx));
				code.close("}");
			}
			StmtKind::While { condition, statements } => {
				code.open(new_code!(
					&condition.span,
					"while (",
					self.jsify_expression(condition, ctx),
					") {"
				));
				code.add_code(self.jsify_scope_body(statements, ctx));
				code.close("}");
			}
			StmtKind::Break => code.line("break;"),
			StmtKind::Continue => code.line("continue;"),
			StmtKind::IfLet(IfLet {
				reassignable,
				value,
				statements,
				var_name,
				elif_statements,
				else_statements,
			}) => {
				// To enable shadowing variables in if let statements, the following does some scope trickery
				// take for example the following wing code:
				// let x: str? = "hello";
				// if let x = x {
				//   log(x);
				// }
				//
				// If we attempted to just do the following JS code
				//
				// const x = "hello"
				// if (x != undefined) {
				//   const x = x;  <== Reference error, "Cannot access 'x' before initialization"
				//   log(x);
				// }
				//
				// To work around this, we can generate a temporary scope, then use an intermediate variable to carry the
				// shadowed value, like so:
				// const x = "hello"
				// {
				//  const $IF_LET_VALUE = x; <== intermediate variable that expires at the end of the scope
				//  if ($IF_LET_VALUE != undefined) {
				//    const x = $IF_LET_VALUE;
				//    log(x);
				//  }
				// }
				// The temporary scope is created so that intermediate variables created by consecutive `if let` clauses
				// do not interfere with each other.
				code.open("{");
				let if_let_value = "$if_let_value";
				code.line(new_code!(
					&var_name.span,
					"const ",
					if_let_value,
					" = ",
					self.jsify_expression(value, ctx),
					";"
				));

				code.open(format!("if ({if_let_value} != undefined) {{"));
				if *reassignable {
					code.line(format!("let {} = {};", var_name, if_let_value));
				} else {
					code.line(format!("const {} = {};", var_name, if_let_value));
				}
				code.add_code(self.jsify_scope_body(statements, ctx));
				code.close("}");

				if elif_statements.len() > 0 {
					self.jsify_elif_statements(&mut code, elif_statements, 0, else_statements, ctx);
					for elif_statement in elif_statements {
						if let Elifs::ElifLetBlock(_) = elif_statement {
							// "elif_let_block" statements emit "else {" in jsify_elif_statements(),
							//  but no closing bracket "}". The closing brackets are emitted here instead to
							// deal with properly nesting "elif_let_block", "elif_block", and "else" statements
							code.close("}");
						}
					}
				} else if let Some(else_scope) = else_statements {
					code.open("else {");
					code.add_code(self.jsify_scope_body(else_scope, ctx));
					code.close("}");
				}

				code.close("}");
			}
			StmtKind::If {
				condition,
				statements,
				elif_statements,
				else_statements,
			} => {
				code.open(new_code!(
					&condition.span,
					"if (",
					self.jsify_expression(condition, ctx),
					") {"
				));
				code.add_code(self.jsify_scope_body(statements, ctx));
				code.close("}");

				for elif_block in elif_statements {
					let condition = self.jsify_expression(&elif_block.condition, ctx);
					// TODO: this puts the "else if" in a separate line from the closing block but
					// technically that shouldn't be a problem, its just ugly
					code.open(new_code!(&elif_block.condition.span, "else if (", condition, ") {"));
					code.add_code(self.jsify_scope_body(&elif_block.statements, ctx));
					code.close("}");
				}

				if let Some(else_scope) = else_statements {
					code.open("else {");
					code.add_code(self.jsify_scope_body(else_scope, ctx));
					code.close("}");
				}
			}
			StmtKind::Expression(e) => code.line(new_code!(&e.span, self.jsify_expression(e, ctx), ";")),

			StmtKind::Assignment { kind, variable, value } => {
				let operator = match kind {
					AssignmentKind::Assign => "=",
					AssignmentKind::AssignIncr => "+=",
					AssignmentKind::AssignDecr => "-=",
				};

				code.line(new_code!(
					&statement.span,
					self.jsify_reference(variable, ctx),
					" ",
					operator,
					" ",
					self.jsify_expression(value, ctx),
					";"
				));
			}
			StmtKind::Scope(scope) => {
				if !scope.statements.is_empty() {
					code.open("{");
					code.add_code(self.jsify_scope_body(scope, ctx));
					code.close("}");
				}
			}
			StmtKind::Return(exp) => {
				if let Some(exp) = exp {
					code.line(new_code!(&exp.span, "return ", self.jsify_expression(exp, ctx), ";"))
				} else {
					code.line("return;")
				}
			}
			StmtKind::Throw(exp) => code.line(new_code!(
				&statement.span,
				"throw new Error(",
				self.jsify_expression(exp, ctx),
				");"
			)),
			StmtKind::Class(class) => code.add_code(self.jsify_class(env, class, ctx)),
			StmtKind::Interface { .. } => {
				// This is a no-op in JS
			}
			StmtKind::Struct(_) => {
				// Struct schemas are emitted before jsification phase
			}
			StmtKind::Enum(enu) => {
				let Enum {
					name,
					values,
					access: _,
				} = enu;
				code.open(format!("const {name} ="));
				code.add_code(self.jsify_enum(name, values));
				code.close(";");
			}
			StmtKind::TryCatch {
				try_statements,
				catch_block,
				finally_statements,
			} => {
				code.open("try {");
				code.add_code(self.jsify_scope_body(try_statements, ctx));
				code.close("}");

				if let Some(catch_block) = catch_block {
					if let Some(exception_var_symbol) = &catch_block.exception_var {
						code.open(format!("catch ($error_{exception_var_symbol}) {{"));
						code.line(format!(
							"const {exception_var_symbol} = $error_{exception_var_symbol}.message;"
						));
					} else {
						code.open("catch {");
					}

					code.add_code(self.jsify_scope_body(&catch_block.statements, ctx));
					code.close("}");
				}

				if let Some(finally_statements) = finally_statements {
					code.open("finally {");
					code.add_code(self.jsify_scope_body(finally_statements, ctx));
					code.close("}");
				}
			}
			StmtKind::CompilerDebugEnv => {}
		};
		ctx.visit_ctx.pop_stmt();
		code
	}

	fn jsify_enum(&self, name: &Symbol, values: &IndexSet<Symbol>) -> CodeMaker {
		let mut code = CodeMaker::with_source(&name.span);
		let mut value_index = 0;

		code.open("(function (tmp) {");

		for value in values {
			code.line(new_code!(
				&value.span,
				"tmp[\"",
				jsify_symbol(value),
				"\"] = \"",
				jsify_symbol(value),
				"\";"
			));

			value_index = value_index + 1;
		}

		code.line("return tmp;");

		code.close("})({})");
		code
	}

	fn jsify_inflight_init(
		&self,
		func_def: &FunctionDefinition,
		class_phase: Phase,
		ctx: &mut JSifyContext,
	) -> CodeMaker {
		assert!(ctx.visit_ctx.current_phase() == Phase::Inflight);

		let FunctionBody::Statements(body_scope) = &func_def.body else {
			panic!("inflight init must have a scope body")
		};

		// Create the async init function that'll capture the ctor's args
		let mut async_init_body_code = CodeMaker::with_source(&func_def.span);
		// Define this as a closure if we're inside a regulat ctor (inflight class)
		async_init_body_code.open(if class_phase == Phase::Inflight {
			// A closure that'll capture the ctor args
			format!("this.{CLASS_INFLIGHT_INIT_NAME} = async () => {{")
		} else {
			// Preflight class's inflight inits have no args
			format!("async {CLASS_INFLIGHT_INIT_NAME}() {{")
		});
		async_init_body_code.add_code(self.jsify_scope_body(body_scope, ctx));
		async_init_body_code.close("}");

		// If this is an inflight init of an inflight class then we also need to generate a normal ctor, if it's a preflight class
		// then we generate a binding ctor seperately see `jsify_inflight_binding_constructor`
		let code = if class_phase == Phase::Inflight {
			// let mut code = CodeMaker::with_source(&func_def.span);

			let mut code = new_code!(
				&func_def.span,
				JS_CONSTRUCTOR,
				"(",
				jsify_function_parameters(func_def),
				"){"
			);
			code.indent();

			// Issue a call to the parent class's regular ctor
			if let Some(Stmt {
				kind: StmtKind::SuperConstructor { arg_list },
				..
			}) = body_scope.statements.iter().next()
			{
				let args = self.jsify_arg_list(&arg_list, None, None, ctx);
				code.line("super(");
				code.append(args);
				code.append(");");

				// If our parent's phase in inflight then backup a reference to the paren't inflight init to be used in the super ctor call
				if parent_class_phase(ctx) == Phase::Inflight {
					code.line(format!(
						"this.{SUPER_CLASS_INFLIGHT_INIT_NAME} = this.{CLASS_INFLIGHT_INIT_NAME};"
					));
				}
			}

			code.add_code(async_init_body_code);

			code.close("}");
			code
		} else {
			assert!(func_def.signature.parameters.is_empty());
			async_init_body_code
		};

		code
	}

	fn jsify_function(
		&self,
		class: Option<&AstClass>,
		func_def: &FunctionDefinition,
		is_closure: bool,
		ctx: &mut JSifyContext,
	) -> CodeMaker {
		let parameters = jsify_function_parameters(func_def);

		let (name, arrow) = match &func_def.name {
			Some(name) => (name.name.clone(), " ".to_string()),
			None => ("".to_string(), " => ".to_string()),
		};

		let body = match &func_def.body {
			FunctionBody::Statements(scope) => self.jsify_scope_body(scope, ctx),
			FunctionBody::External(extern_path) => {
				let entrypoint_is_file = self.compilation_init_path.is_file();
				let entrypoint_dir = if entrypoint_is_file {
					self.compilation_init_path.parent().unwrap()
				} else {
					self.compilation_init_path
				};

				if !entrypoint_is_file {
					// We are possibly compiling a package, so we need to make sure all externs
					// are actually contained in this directory to make sure it gets packaged

					if !extern_path.starts_with(entrypoint_dir) {
						report_diagnostic(Diagnostic {
							message: format!("{extern_path} must be a sub directory of {entrypoint_dir}"),
							annotations: vec![],
							hints: vec![],
							span: Some(func_def.span.clone()),
						});
						return CodeMaker::default();
					}
				}

				let rel_path = make_relative_path(entrypoint_dir.as_str(), extern_path.as_str());
				let rel_path = Utf8PathBuf::from(rel_path);

				let mut path_components = rel_path.components();

				// check if the first part of the path is the node module directory
				let require_path =
					if path_components.next().expect("extern path must not be empty").as_str() == NODE_MODULES_DIR {
						// We are loading an extern from a node module, so we want that path to be relative to the package itself
						// e.g. require("../node_modules/@winglibs/blah/util.js") should be require("@winglibs/blah/util.js") instead

						// the second part of the path will either be the package name or the package scope
						let second_component = path_components
							.next()
							.expect("extern path in node module must have at least two components")
							.as_str();

						let module_name = if second_component.starts_with(NODE_MODULES_SCOPE_SPECIFIER) {
							// scoped package, prepend the scope to the next part of the path
							format!(
								"{second_component}/{}",
								path_components
									.next()
									.expect("extern path in scoped node module must have at least three components")
							)
						} else {
							// regular package
							second_component.to_string()
						};

						// combine the module name with the rest of the iterator to get the full import path
						format!("{module_name}/{}", path_components.join("/"))
					} else {
						// go from the out_dir to the entrypoint dir
						let up_dirs = "../".repeat(self.out_dir.components().count() - entrypoint_dir.components().count());

						format!("{up_dirs}{rel_path}")
					};

				new_code!(
					&func_def.span,
					format!("return (require(\"{require_path}\")[\"{name}\"])("),
					parameters.clone(),
					")"
				)
			}
		};
		let mut prefix = vec![];

		if func_def.is_static && class.is_some() {
			prefix.push("static")
		}

		// if this is "constructor" it cannot be async
		if name != JS_CONSTRUCTOR && matches!(func_def.signature.phase, Phase::Inflight) {
			prefix.push("async")
		}

		if !name.is_empty() {
			prefix.push(name.borrow());
		} else if !prefix.is_empty() {
			prefix.push("");
		}

		let func_prefix = prefix.join(" ");
		let mut code = new_code!(&func_def.span, func_prefix, "(", parameters.clone(), ")", arrow, "{");
		code.indent();

		code.add_code(body);
		code.close("}");

		// if the function is a closure, we need to wrap it in `(`, `)`
		if is_closure {
			new_code!(&func_def.span, "(", code, ")")
		} else {
			code
		}
	}

	fn jsify_class(&self, env: &SymbolEnv, class: &AstClass, ctx: &mut JSifyContext) -> CodeMaker {
		ctx.with_class(class, |ctx| {
			// lookup the class type
			let class_type = env.lookup(&class.name, None).unwrap().as_type().unwrap();

			// find the nearest lifts object. this could be in the current scope (in which case there will
			// be a `lifts` fields in the `class_type` or the parent scope.
			let lifts = if let Some(lifts) = &class_type.as_class().unwrap().lifts {
				Some(lifts)
			} else {
				ctx.lifts
			};

			let ctx = &mut JSifyContext {
				lifts,
				visit_ctx: &mut ctx.visit_ctx,
				source_path: ctx.source_path,
			};

			// emit the inflight side of the class into a separate file
			let inflight_class_code = self.jsify_class_inflight(&class, ctx);

			// if this is inflight/independent, class, just emit the inflight class code inline and move on
			// with your life.
			if ctx.visit_ctx.current_phase() != Phase::Preflight {
				return inflight_class_code;
			}

			// emit the inflight file
			self.emit_inflight_file(&class, inflight_class_code, ctx);

			// lets write the code for the preflight side of the class
			// TODO: why would we want to do this for inflight classes?? maybe return here in that case?
			let mut code = new_code!(&class.span, "class ", jsify_symbol(&class.name));

			if let Some(parent) = &class.parent {
				// If this is an imported type (with a package fqn) attemp to go through the stdlib target dep-injection mechanism
				let parent_type = env
					.lookup_nested_str(&parent.full_path_str(), None)
					.unwrap()
					.0
					.as_type()
					.unwrap();
				if let Some(fqn) = &parent_type.as_class().unwrap().fqn {
					code.append(new_code!(
						&class.name.span,
						" extends (this?.node?.root?.typeForFqn(\"",
						fqn,
						"\") ?? ",
						self.jsify_user_defined_type(parent, ctx),
						")"
					));
				} else {
					code.append(new_code!(
						&class.name.span,
						" extends ",
						self.jsify_user_defined_type(parent, ctx)
					));
				}
			} else {
				// default base class for preflight classes is `core.Resource`
				code.append(new_code!(
					&class.name.span,
					" extends ",
					if class.auto_id {
						STDLIB_CORE_AUTOID_RESOURCE
					} else {
						STDLIB_CORE_RESOURCE
					}
				));
			};

			code.append(" {");
			code.indent();

			// TODO Hack to make sure closures match the IInflight contract from wingsdk
			if class_type.is_closure() {
				code.line(format!("_id = {STDLIB_CORE}.closureId();"))
			}

			// emit the preflight constructor
			code.add_code(self.jsify_preflight_constructor(&class, ctx));

			// emit preflight methods
			for m in class.preflight_methods(false) {
				code.line(self.jsify_function(Some(class), m, false, ctx));
			}

			// emit the `_toInflight` and `_toInflightType` methods (TODO: renamed to `_liftObject` and
			// `_liftType`).
			code.add_code(self.jsify_to_inflight_type_method(&class, ctx));
			code.add_code(self.jsify_to_inflight_method(&class.name, ctx));

			// emit `onLift` and `onLiftType` to bind permissions and environment variables to inflight hosts
			code.add_code(self.jsify_register_bind_method(class, class_type, BindMethod::Instance, ctx));
			code.add_code(self.jsify_register_bind_method(class, class_type, BindMethod::Type, ctx));

			code.close("}");
			code
		})
	}

	fn jsify_preflight_constructor(&self, class: &AstClass, ctx: &mut JSifyContext) -> CodeMaker {
		let mut code = new_code!(
			&class.name.span,
			JS_CONSTRUCTOR,
			"($scope, $id, ",
			jsify_function_parameters(&class.initializer),
			") {"
		);
		code.indent();

		let init_statements = match &class.initializer.body {
			FunctionBody::Statements(s) => s,
			FunctionBody::External(_) => panic!("'init' cannot be 'extern'"),
		};

		// Check if the first statement is a super constructor call, if not we need to add one
		let super_called = if let Some(s) = init_statements.statements.first() {
			matches!(s.kind, StmtKind::SuperConstructor { .. })
		} else {
			false
		};

		let mut body_code = CodeMaker::with_source(&class.name.span);

		// we always need a super() call because even if the class doesn't have an explicit parent, it
		// will inherit from core.Resource.
		if !super_called {
			body_code.line("super($scope, $id);");
		}
		body_code.add_code(self.jsify_scope_body(&init_statements, ctx));

		code.add_code(body_code);

		code.close("}");
		code
	}

	fn jsify_to_inflight_type_method(&self, class: &AstClass, ctx: &JSifyContext) -> CodeMaker {
		let client_path = self.inflight_filename(class);

		let mut code = CodeMaker::with_source(&class.name.span);

		code.open("static _toInflightType() {");

		code.open("return `");

		code.open(format!(
			"require(\"${{{HELPERS_VAR}.normalPath(__dirname)}}/{client_path}\")({{"
		));

		if let Some(lifts) = &ctx.lifts {
			for (token, capture) in lifts.captures.iter().filter(|(_, cap)| !cap.is_field) {
				let lift_type = format!("{STDLIB_CORE}.liftObject({})", capture.code);
				code.line(format!("{}: ${{{}}},", token, lift_type));
			}
		}

		code.close("})");

		code.close("`;");

		code.close("}");
		code
	}

	fn jsify_to_inflight_method(&self, resource_name: &Symbol, ctx: &JSifyContext) -> CodeMaker {
		let mut code = CodeMaker::with_source(&resource_name.span);

		code.open("_toInflight() {");

		code.open("return `");

		code.open("(await (async () => {");

		code.line(format!(
			"const {}Client = ${{{}._toInflightType()}};",
			resource_name.name, resource_name.name,
		));

		code.open(format!("const client = new {}Client({{", resource_name.name));

		if let Some(lifts) = &ctx.lifts {
			for (token, obj) in lifts.lifted_fields() {
				code.line(format!("{token}: ${{{STDLIB_CORE}.liftObject({obj})}},"));
			}
		}

		code.close("});");

		code.line(format!(
			"if (client.{CLASS_INFLIGHT_INIT_NAME}) {{ await client.{CLASS_INFLIGHT_INIT_NAME}(); }}"
		));
		code.line("return client;");

		code.close("})())");

		code.close("`;");

		code.close("}");
		code
	}

	// Write a class's inflight to a file
	fn jsify_class_inflight(&self, class: &AstClass, mut ctx: &mut JSifyContext) -> CodeMaker {
		ctx.visit_ctx.push_phase(Phase::Inflight);

		let mut class_code = new_code!(&class.name.span, "class ", &class.name.name);

		if let Some(parent) = &class.parent {
			class_code.append(" extends ");
			class_code.append(self.jsify_user_defined_type(&parent, ctx));
		}

		class_code.append(" {");
		class_code.indent();

		// if this is a preflight class, emit the binding constructor
		if class.phase == Phase::Preflight {
			self.jsify_inflight_binding_constructor(class, &mut class_code, &ctx);
		}

		for def in class.inflight_methods(false) {
			class_code.line(self.jsify_function(Some(class), def, false, ctx));
		}

		// emit the $inflight_init function (if it has a body).
		if let FunctionBody::Statements(s) = &class.inflight_initializer.body {
			if !s.statements.is_empty() {
				class_code.line(self.jsify_inflight_init(&class.inflight_initializer, class.phase, &mut ctx));
			}
		}

		class_code.close("}");
		ctx.visit_ctx.pop_phase();
		class_code
	}

	pub fn add_referenced_struct_schema(&self, struct_name: String, schema: CodeMaker) {
		let mut struct_schemas = self.referenced_struct_schemas.borrow_mut();
		struct_schemas.insert(struct_name, schema);
	}

	fn emit_inflight_file(&self, class: &AstClass, inflight_class_code: CodeMaker, ctx: &mut JSifyContext) {
		let name = &class.name.name;
		let mut code = CodeMaker::with_source(&class.name.span);

		let inputs = if let Some(lifts) = &ctx.lifts {
			lifts
				.captures
				.iter()
				.filter_map(|(token, cap)| if !cap.is_field { Some(token) } else { None })
				.join(", ")
		} else {
			Default::default()
		};

		let filename = self.inflight_filename(class);
		let sourcemap_file = format!("{}.map", filename);

		code.line("\"use strict\";");
		code.line(format!("const {HELPERS_VAR} = require(\"@winglang/sdk/lib/helpers\");"));
		code.open(format!("module.exports = function({{ {inputs} }}) {{"));
		code.add_code(inflight_class_code);
		code.line(format!("return {name};"));
		code.close("}");
		code.line(format!("//# sourceMappingURL={sourcemap_file}"));

		let root_source = ctx.source_path.unwrap().to_string();

		// emit the inflight class to a file
		match self
			.output_files
			.borrow_mut()
			.add_file(filename.clone(), code.to_string())
		{
			Ok(()) => {}
			Err(err) => report_diagnostic(err.into()),
		}

		match self.output_files.borrow_mut().add_file(
			sourcemap_file,
			code.generate_sourcemap(
				&make_relative_path(self.out_dir.as_str(), &root_source),
				self.source_files.get_file(root_source.as_str()).unwrap(),
				filename.as_str(),
			),
		) {
			Ok(()) => {}
			Err(err) => report_diagnostic(err.into()),
		}
	}

	fn jsify_inflight_binding_constructor(&self, class: &AstClass, class_code: &mut CodeMaker, ctx: &JSifyContext) {
		// Get the fields that are lifted by this class but not by its parent, they will be initialized
		// in the generated constructor
		let lifted_fields = if let Some(lifts) = &ctx.lifts {
			lifts.lifted_fields().keys().map(|f| f.clone()).collect_vec()
		} else {
			vec![]
		};

		let parent_fields = if let Some(parent) = &class.parent {
			let parent_type = resolve_user_defined_type(
				parent,
				ctx.visit_ctx.current_env().expect("an env"),
				ctx.visit_ctx.current_stmt_idx(),
			)
			.expect("resolved type");
			if let Some(parent_lifts) = &parent_type.as_class().unwrap().lifts {
				parent_lifts.lifted_fields().keys().map(|f| f.clone()).collect_vec()
			} else {
				vec![]
			}
		} else {
			vec![]
		};

		class_code.open(format!(
			"{JS_CONSTRUCTOR}({{ {} }}) {{",
			lifted_fields
				.iter()
				.merge(parent_fields.iter())
				.map(|token| { token.clone() })
				.collect_vec()
				.join(", ")
		));

		if class.parent.is_some() {
			class_code.line(format!("super({{ {} }});", parent_fields.join(", ")));
		}

		for token in &lifted_fields {
			class_code.line(format!("this.{} = {};", token, token));
		}

		// if this class has a "handle" method, we are going to turn it into a callable function
		// so that instances of this class can also be called like regular functions
		if let Some(handle) = class.closure_handle_method() {
			class_code.line(format!(
				"const $obj = (...args) => this.{}(...args);",
				handle.name.clone().unwrap()
			));
			class_code.line("Object.setPrototypeOf($obj, this);");
			class_code.line("return $obj;");
		}

		class_code.close("}");
	}

	fn jsify_register_bind_method(
		&self,
		class: &AstClass,
		class_type: TypeRef,
		bind_method_kind: BindMethod,
		ctx: &JSifyContext,
	) -> CodeMaker {
		let mut bind_method = CodeMaker::with_source(&class.span);
		let (modifier, bind_method_name) = match bind_method_kind {
			BindMethod::Type => ("static ", "_liftTypeMap"),
			BindMethod::Instance => ("", "_liftMap"),
		};

		let class_name = class.name.to_string();

		let Some(lifts) = ctx.lifts else {
			return bind_method;
		};

		let mut lift_qualifications: Vec<(&String, &BTreeMap<String, LiftQualification>)> = vec![];
		let empty_map = BTreeMap::new();

		// Collect all the methods and fields that are accessible inflight on this class
		// and their lift qualifications, if any.
		// Even if a method does not require any other permissions (for example, it just
		// logs something), it is still included in the map as a way of indicating
		// it's a supported operation.
		//
		// Methods on the parent class are not included here, as they are inherited
		// and will be included in the parent's _liftMap or _liftTypeMap instead
		for m in class.all_methods(true) {
			let name = m.name.as_ref().unwrap();
			let method = class_type.as_class().unwrap().get_method(&name);
			let var_info = method.expect(&format!("method \"{name}\" doesn't exist in {class_name}"));

			let is_static = m.is_static;
			let is_inflight = var_info.phase == Phase::Inflight;
			let filter = match bind_method_kind {
				BindMethod::Instance => is_inflight && !is_static,
				BindMethod::Type => is_inflight && is_static && name.name != CLASS_INFLIGHT_INIT_NAME,
			};
			if filter {
				if let Some(quals) = lifts.lifts_qualifications.get(&name.name) {
					lift_qualifications.push((&name.name, quals));
				} else {
					lift_qualifications.push((&name.name, &empty_map));
				}
			}
		}

		for m in class.inflight_fields() {
			let name = &m.name;
			let is_static = m.is_static;
			let filter = match bind_method_kind {
				BindMethod::Instance => !is_static,
				BindMethod::Type => is_static,
			};
			if filter {
				if let Some(quals) = lifts.lifts_qualifications.get(&name.name) {
					lift_qualifications.push((&name.name, quals));
				} else {
					lift_qualifications.push((&name.name, &empty_map));
				}
			}
		}

		// Skip jsifying this method if there are no lifts (in this case we'll use super's lifting methods)
		if lift_qualifications.is_empty() {
			return bind_method;
		}

		bind_method.open(format!("{modifier}get {bind_method_name}() {{"));

		if !lift_qualifications.is_empty() {
			if bind_method_kind == BindMethod::Instance && class.parent.is_some() {
				// mergeLiftDeps is a helper method that combines the lift deps of the parent class with the
				// lift deps of this class
				bind_method.open(format!("return {STDLIB_CORE}.mergeLiftDeps(super._liftMap, {{"));
			} else {
				bind_method.open("return ({".to_string());
			}

			for (method_name, method_qual) in lift_qualifications {
				bind_method.open(format!("\"{method_name}\": [",));
				for (code, method_lift_qual) in method_qual {
					let ops = method_lift_qual.ops.iter().join(", ");
					// To keep the code concise treat no ops, single op and multiple ops differenly here, although the multiple ops is the generic case
					if method_lift_qual.ops.len() == 0 {
						bind_method.line(format!("[{code}, []],"));
					} else if method_lift_qual.ops.len() == 1 {
						bind_method.line(format!("[{code}, {ops}],"));
					} else {
						bind_method.line(format!("[{code}, [].concat({ops})],"));
					}
				}
				bind_method.close("],");
			}

			bind_method.close("});");
		}

		bind_method.close("}");
		bind_method
	}

	fn inflight_filename(&self, class: &AstClass) -> String {
		let mut file_map = self.inflight_file_map.borrow_mut();
		let id: usize = if file_map.contains_key(&class.name.span.file_id) {
			file_map[&class.name.span.file_id]
		} else {
			let mut id = self.inflight_file_counter.borrow_mut();
			*id += 1;
			file_map.insert(class.name.span.file_id.clone(), *id);
			*id
		};
		format!("inflight.{}-{}.js", class.name.name, id)
	}
}

fn jsify_function_parameters(func_def: &FunctionDefinition) -> CodeMaker {
	let mut parameter_list = vec![];

	for p in &func_def.signature.parameters {
		if p.variadic {
			parameter_list.push(new_code!(&func_def.span, "...", jsify_symbol(&p.name)));
		} else {
			parameter_list.push(jsify_symbol(&p.name));
		}
	}

	new_code!(&func_def.span, parameter_list)
}

fn jsify_symbol(symbol: &Symbol) -> CodeMaker {
	new_code!(&symbol.span, &symbol.name)
}

fn parent_class_phase(ctx: &JSifyContext<'_>) -> Phase {
	let current_class_type = resolve_user_defined_type(
		ctx.visit_ctx.current_class().expect("a class"),
		ctx.visit_ctx.current_env().expect("an env"),
		ctx.visit_ctx.current_stmt_idx(),
	)
	.expect("a class type");
	let parent_class_phase = current_class_type
		.as_class()
		.expect("a class")
		.parent
		.expect("a parent class")
		.as_class()
		.expect("a class")
		.phase;
	parent_class_phase
}

fn get_public_symbols(scope: &Scope) -> Vec<Symbol> {
	let mut symbols = Vec::new();

	for stmt in &scope.statements {
		match &stmt.kind {
			StmtKind::Bring { .. } => {}
			StmtKind::SuperConstructor { .. } => {}
			StmtKind::Let { .. } => {}
			StmtKind::ForLoop { .. } => {}
			StmtKind::While { .. } => {}
			StmtKind::IfLet(IfLet { .. }) => {}
			StmtKind::If { .. } => {}
			StmtKind::Break => {}
			StmtKind::Continue => {}
			StmtKind::Return(_) => {}
			StmtKind::Throw(_) => {}
			StmtKind::Expression(_) => {}
			StmtKind::Assignment { .. } => {}
			StmtKind::Scope(_) => {}
			StmtKind::Class(class) => {
				if class.access == AccessModifier::Public {
					symbols.push(class.name.clone());
				}
			}
			// interfaces are bringable, but there's nothing to emit
			StmtKind::Interface(_) => {}
			// structs are bringable, but we don't emit anything for them
			// unless a static method is called on them
			StmtKind::Struct(_) => {}
			StmtKind::Enum(enu) => {
				if enu.access == AccessModifier::Public {
					symbols.push(enu.name.clone());
				}
			}
			StmtKind::TryCatch { .. } => {}
			StmtKind::CompilerDebugEnv => {}
		}
	}

	symbols
}

fn lookup_span(span: &WingSpan, files: &Files) -> String {
	let source = files
		.get_file(&span.file_id)
		.expect(&format!("failed to find source file with id {}", span.file_id));
	let lines = source.lines().collect_vec();

	let start_line = span.start.line as usize;
	let end_line = span.end.line as usize;

	let start_col = span.start.col as usize;
	let end_col = span.end.col as usize;

	let mut result = String::new();

	if start_line == end_line {
		result.push_str(&lines[start_line][start_col..end_col]);
	} else {
		result.push_str(&lines[start_line][start_col..]);
		result.push('\n');

		for line in lines[start_line + 1..end_line].iter() {
			result.push_str(line);
			result.push('\n');
		}

		result.push_str(&lines[end_line][..end_col]);
	}

	result
}

fn escape_javascript_string(s: &str) -> String {
	let mut result = String::new();

	// escape all escapable characters -- see the section "Escape sequences" in
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#literals
	for c in s.chars() {
		match c {
			'\0' => result.push_str("\\0"),
			'\'' => result.push_str("\\'"),
			'"' => result.push_str("\\\""),
			'\\' => result.push_str("\\\\"),
			'\n' => result.push_str("\\n"),
			'\r' => result.push_str("\\r"),
			'\t' => result.push_str("\\t"),
			_ => result.push(c),
		}
	}

	result
}
