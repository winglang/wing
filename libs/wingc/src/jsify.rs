pub mod codemaker;
mod tests;
use aho_corasick::AhoCorasick;
use camino::{Utf8Path, Utf8PathBuf};
use const_format::formatcp;
use indexmap::{IndexMap, IndexSet};
use itertools::Itertools;

use std::{borrow::Borrow, cell::RefCell, cmp::Ordering, vec};

use crate::{
	ast::{
		ArgList, BinaryOperator, BringSource, CalleeKind, Class as AstClass, ElifLetBlock, Expr, ExprKind, FunctionBody,
		FunctionDefinition, InterpolatedStringPart, Literal, NewExpr, Phase, Reference, Scope, Stmt, StmtKind, StructField,
		Symbol, TypeAnnotationKind, UnaryOperator, UserDefinedType,
	},
	comp_ctx::{CompilationContext, CompilationPhase},
	dbg_panic, debug,
	diagnostic::{report_diagnostic, Diagnostic, WingSpan},
	files::Files,
	type_check::{
		lifts::{Liftable, Lifts},
		resolve_super_method, resolve_user_defined_type,
		symbol_env::SymbolEnv,
		ClassLike, Type, TypeRef, Types, VariableKind, CLASS_INFLIGHT_INIT_NAME,
	},
	visit_context::VisitContext,
	MACRO_REPLACE_ARGS, MACRO_REPLACE_ARGS_TEXT, MACRO_REPLACE_SELF, WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE,
	WINGSDK_STD_MODULE,
};

use self::codemaker::CodeMaker;

const PREFLIGHT_FILE_NAME: &str = "preflight.js";

const STDLIB: &str = "$stdlib";
const STDLIB_CORE_RESOURCE: &str = formatcp!("{}.{}", STDLIB, WINGSDK_RESOURCE);
const STDLIB_MODULE: &str = WINGSDK_ASSEMBLY_NAME;

const ENV_WING_IS_TEST: &str = "$wing_is_test";
const OUTDIR_VAR: &str = "$outdir";
const PLUGINS_VAR: &str = "$plugins";

const ROOT_CLASS: &str = "$Root";
const JS_CONSTRUCTOR: &str = "constructor";

pub struct JSifyContext<'a> {
	pub lifts: Option<&'a Lifts>,
	pub visit_ctx: &'a mut VisitContext,
}

pub struct JSifier<'a> {
	pub types: &'a mut Types,
	/// Store the output files here.
	pub output_files: RefCell<Files>,
	/// Counter for generating unique preflight file names.
	preflight_file_counter: RefCell<usize>,

	/// Counter for generating unique inflight file names.
	inflight_file_counter: RefCell<usize>,
	/// Map from source file IDs to safe counters.
	inflight_file_map: RefCell<IndexMap<String, usize>>,

	/// Map from source file paths to the JS file names they are emitted to.
	/// e.g. "bucket.w" -> "preflight.bucket-1.js"
	preflight_file_map: RefCell<IndexMap<Utf8PathBuf, String>>,
	source_files: &'a Files,
	/// Root of the project, used for resolving extern modules
	absolute_project_root: &'a Utf8Path,
	/// The entrypoint file of the Wing application.
	entrypoint_file_path: &'a Utf8Path,
}

/// Preflight classes have two types of host binding methods:
/// `Type` for binding static fields and methods to the host and
/// `instance` for binding instance fields and methods to the host.
enum BindMethod {
	Type,
	Instance,
}

impl<'a> JSifier<'a> {
	pub fn new(
		types: &'a mut Types,
		source_files: &'a Files,
		entrypoint_file_path: &'a Utf8Path,
		absolute_project_root: &'a Utf8Path,
	) -> Self {
		let output_files = Files::default();
		Self {
			types,
			source_files,
			entrypoint_file_path,
			absolute_project_root,
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
		};
		jsify_context.visit_ctx.push_env(self.types.get_scope_env(&scope));
		for statement in scope.statements.iter().sorted_by(|a, b| match (&a.kind, &b.kind) {
			// Put type definitions first so JS won't complain of unknown types
			(StmtKind::Class(AstClass { .. }), StmtKind::Class(AstClass { .. })) => Ordering::Equal,
			(StmtKind::Class(AstClass { .. }), _) => Ordering::Less,
			(_, StmtKind::Class(AstClass { .. })) => Ordering::Greater,
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

		let is_entrypoint_file = source_path == self.entrypoint_file_path;

		if is_entrypoint_file {
			output.line(format!("const {} = require('{}');", STDLIB, STDLIB_MODULE));
			output.line(format!(
				"const {} = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);",
				PLUGINS_VAR
			));
			output.line(format!("const {} = process.env.WING_SYNTH_DIR ?? \".\";", OUTDIR_VAR));
			output.line(format!(
				"const {} = process.env.WING_IS_TEST === \"true\";",
				ENV_WING_IS_TEST
			));
		} else {
			output.open(format!("module.exports = function({{ {} }}) {{", STDLIB));
		}

		// "std" is implicitly imported
		output.line(format!("const std = {STDLIB}.{WINGSDK_STD_MODULE};"));
		output.add_code(imports);

		if is_entrypoint_file {
			let mut root_class = CodeMaker::default();
			root_class.open(format!("class {} extends {} {{", ROOT_CLASS, STDLIB_CORE_RESOURCE));
			root_class.open(format!("{JS_CONSTRUCTOR}(scope, id) {{"));
			root_class.line("super(scope, id);");
			root_class.add_code(js);
			root_class.close("}");
			root_class.close("}");

			output.add_code(root_class);
			output.line("const $App = $stdlib.core.App.for(process.env.WING_TARGET);".to_string());
			let app_name = self.entrypoint_file_path.file_stem().unwrap();
			output.line(format!(
				"new $App({{ outdir: {}, name: \"{}\", rootConstruct: {}, plugins: {}, isTestEnvironment: {}, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }}).synth();",
				OUTDIR_VAR, app_name, ROOT_CLASS, PLUGINS_VAR, ENV_WING_IS_TEST
			));
		} else {
			output.add_code(js);
			let exports = get_public_symbols(&scope);
			output.line(format!(
				"return {{ {} }};",
				exports.iter().map(ToString::to_string).join(", ")
			));
			output.close("};");
		}

		// Generate a name for the JS file this preflight code will be written to
		let preflight_file_name = if is_entrypoint_file {
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

		// Emit the file
		match self
			.output_files
			.borrow_mut()
			.add_file(preflight_file_name, output.to_string())
		{
			Ok(()) => {}
			Err(err) => report_diagnostic(err.into()),
		}
	}

	fn jsify_scope_body(&self, scope: &Scope, ctx: &mut JSifyContext) -> CodeMaker {
		CompilationContext::set(CompilationPhase::Jsifying, &scope.span);
		let mut code = CodeMaker::default();

		let scope_env = self.types.get_scope_env(&scope);
		ctx.visit_ctx.push_env(scope_env);
		for statement in scope.statements.iter() {
			let statement_code = self.jsify_statement(&scope_env, statement, ctx);
			code.add_code(statement_code);
		}
		ctx.visit_ctx.pop_env();

		code
	}

	fn jsify_reference(&self, reference: &Reference, ctx: &mut JSifyContext) -> String {
		match reference {
			Reference::Identifier(identifier) => identifier.to_string(),
			Reference::InstanceMember {
				object,
				property,
				optional_accessor,
			} => self.jsify_expression(object, ctx) + (if *optional_accessor { "?." } else { "." }) + &property.to_string(),
			Reference::TypeMember { type_name, property } => {
				let typename = self.jsify_user_defined_type(type_name, ctx);
				typename + "." + &property.to_string()
			}
		}
	}

	fn jsify_arg_list(
		&self,
		arg_list: &ArgList,
		scope: Option<String>,
		id: Option<String>,
		ctx: &mut JSifyContext,
	) -> String {
		let mut args = vec![];
		let mut structure_args = vec![];

		if let Some(scope_str) = scope {
			args.push(scope_str.to_string());
		}

		if let Some(id_str) = id {
			args.push(id_str);
		}

		for arg in arg_list.pos_args.iter() {
			args.push(self.jsify_expression(arg, ctx));
		}

		for arg in arg_list.named_args.iter() {
			structure_args.push(format!("{}: {}", arg.0.name.clone(), self.jsify_expression(arg.1, ctx)));
		}

		if !structure_args.is_empty() {
			args.push(format!("{{ {} }}", structure_args.join(", ")));
		}

		if args.is_empty() {
			"".to_string()
		} else {
			args.join(",")
		}
	}

	fn jsify_type(&self, typ: &TypeAnnotationKind, ctx: &mut JSifyContext) -> Option<String> {
		match typ {
			TypeAnnotationKind::UserDefined(t) => Some(self.jsify_user_defined_type(&t, ctx)),
			TypeAnnotationKind::String => Some("string".to_string()),
			TypeAnnotationKind::Number => Some("number".to_string()),
			TypeAnnotationKind::Bool => Some("boolean".to_string()),
			TypeAnnotationKind::Array(t) => {
				if let Some(inner) = self.jsify_type(&t.kind, ctx) {
					Some(format!("{}[]", inner))
				} else {
					None
				}
			}
			TypeAnnotationKind::Optional(t) => {
				if let Some(inner) = self.jsify_type(&t.kind, ctx) {
					Some(format!("{}?", inner))
				} else {
					None
				}
			}
			_ => None,
		}
	}

	fn jsify_struct_field_to_json_schema_type(&self, typ: &TypeAnnotationKind, ctx: &mut JSifyContext) -> String {
		match typ {
			TypeAnnotationKind::Bool | TypeAnnotationKind::Number | TypeAnnotationKind::String => {
				format!("type: \"{}\"", self.jsify_type(typ, ctx).unwrap())
			}
			TypeAnnotationKind::UserDefined(udt) => {
				format!("\"$ref\": \"#/$defs/{}\"", udt.root.name)
			}
			TypeAnnotationKind::Json => "type: \"object\"".to_string(),
			TypeAnnotationKind::Map(t) => {
				let map_type = self.jsify_type(&t.kind, ctx);
				// Ensure all keys are of some type
				format!(
					"type: \"object\", patternProperties: {{ \".*\": {{ type: \"{}\" }} }}",
					map_type.unwrap_or("null".to_string())
				)
			}
			TypeAnnotationKind::Array(t) | TypeAnnotationKind::Set(t) => {
				format!(
					"type: \"array\", {} items: {{ {} }}",
					match typ {
						TypeAnnotationKind::Set(_) => "uniqueItems: true,".to_string(),
						_ => "".to_string(),
					},
					self.jsify_struct_field_to_json_schema_type(&t.kind, ctx)
				)
			}
			TypeAnnotationKind::Optional(t) => self.jsify_struct_field_to_json_schema_type(&t.kind, ctx),
			_ => "type: \"null\"".to_string(),
		}
	}

	pub fn jsify_user_defined_type(&self, udt: &UserDefinedType, ctx: &mut JSifyContext) -> String {
		if ctx.visit_ctx.current_phase() == Phase::Inflight {
			if let Some(lifts) = &ctx.lifts {
				if let Some(t) = lifts.token_for_liftable(&Liftable::Type(udt.clone())) {
					return t.clone();
				}
			}
		}
		udt.full_path_str()
	}

	pub fn jsify_expression(&self, expression: &Expr, ctx: &mut JSifyContext) -> String {
		CompilationContext::set(CompilationPhase::Jsifying, &expression.span);

		// if we are in inflight and there's a lifting/capturing token associated with this expression
		// then emit the token instead of the expression.
		if ctx.visit_ctx.current_phase() == Phase::Inflight {
			if let Some(lifts) = &ctx.lifts {
				if let Some(t) = lifts.token_for_liftable(&Liftable::Expr(expression.id)) {
					return t.clone();
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
					});

					return "<ERROR>".to_string();
				}
			}
		}

		let auto_await = match ctx.visit_ctx.current_phase() {
			Phase::Inflight => "await ",
			_ => "",
		};
		match &expression.kind {
			ExprKind::New(new_expr) => {
				let NewExpr { class, obj_id, arg_list, obj_scope } = new_expr;

				let expression_type = self.types.get_expr_type(&expression);
				let is_preflight_class = expression_type.is_preflight_class();

				let class_type = if let Some(class_type) = expression_type.as_class() { class_type } else {
					return "".to_string();
				};
				let is_abstract = class_type.is_abstract;

				// if we have an FQN, we emit a call to the "new" (or "newAbstract") factory method to allow
				// targets and plugins to inject alternative implementations for types. otherwise (e.g.
				// user-defined types), we simply instantiate the type directly (maybe in the future we will
				// allow customizations of user-defined types as well, but for now we don't).

				let ctor = self.jsify_user_defined_type(class, ctx);

				let scope = if is_preflight_class && class_type.std_construct_args {
					if let Some(scope) = obj_scope {
						Some(self.jsify_expression(scope, ctx))
					} else {
						Some("this".to_string()) 
					}
				} else {
					None
			 	};

				let id = if is_preflight_class && class_type.std_construct_args {
					Some(if let Some(id_exp) = obj_id {
						self.jsify_expression(id_exp, ctx)
					} else {
						format!("\"{ctor}\"")
					})
				} else {
					None
				};

				let args = self.jsify_arg_list(&arg_list, scope, id, ctx);

				let fqn = class_type.fqn.clone();
				if let (true, Some(fqn)) = (is_preflight_class, fqn) {
					if is_abstract {
						format!("this.node.root.newAbstract(\"{}\",{})", fqn, args)
					} else {
						format!("this.node.root.new(\"{}\",{},{})", fqn, ctor, args)
					}
				} else {
					format!("new {}({})", ctor, args)
				}
			}
			ExprKind::Literal(lit) => match lit {
				Literal::Nil => "undefined".to_string(),
				Literal::String(s) => s.to_string(),
				Literal::InterpolatedString(s) => {
					let comma_separated_statics = s
						.parts
						.iter()
						.filter_map(|p| match p {
							InterpolatedStringPart::Static(static_string) => {
								// escape any raw newlines in the string because js `"` strings can't contain them
								let escaped = static_string
								.replace("\r\n", "\\r\\n")
								.replace("\n", "\\n");

								Some(format!("\"{escaped}\""))
							},
							InterpolatedStringPart::Expr(_) => None,
						})
						.collect::<Vec<String>>()
						.join(", ");
					let comma_separated_exprs = s
						.parts
						.iter()
						.filter_map(|p| match p {
							InterpolatedStringPart::Static(_) => None,
							InterpolatedStringPart::Expr(e) => Some(match *self.types.get_expr_type(e) {
								Type::Json(_) | Type::MutJson => {
									format!("JSON.stringify({})", self.jsify_expression(e, ctx))
								}
								_ => self.jsify_expression(e, ctx),
							})
						})
						.collect::<Vec<String>>()
						.join(", ");
					format!("String.raw({{ raw: [{}] }}, {})", comma_separated_statics, comma_separated_exprs)
				},
				Literal::Number(n) => format!("{}", n),
				Literal::Boolean(b) => (if *b { "true" } else { "false" }).to_string(),
			},
			ExprKind::Range { start, inclusive, end } => {
				match ctx.visit_ctx.current_phase() {
					Phase::Inflight => format!(
						"((s,e,i) => {{ function* iterator(start,end,inclusive) {{ let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }}; return iterator(s,e,i); }})({},{},{})",
						self.jsify_expression(start, ctx),
						self.jsify_expression(end, ctx),
						inclusive.unwrap()
					),
					_ => format!(
						"{}.std.Range.of({}, {}, {})",
						STDLIB,
						self.jsify_expression(start, ctx),
						self.jsify_expression(end, ctx),
						inclusive.unwrap()
					)
				}
			}
			ExprKind::Reference(_ref) => self.jsify_reference(&_ref, ctx),
			ExprKind::Call { callee, arg_list } => {

				let function_type = match callee {
					CalleeKind::Expr(expr) => self.types.get_expr_type(expr),
					CalleeKind::SuperCall(method) => resolve_super_method(method, ctx.visit_ctx.current_env().expect("an env"), self.types).expect("valid super method").0
				};
				let is_option = function_type.is_option();
				let function_type = function_type.maybe_unwrap_option();
				let function_sig = function_type.as_function_sig();
				let expr_string = match callee {
					CalleeKind::Expr(expr) => self.jsify_expression(expr, ctx),
					CalleeKind::SuperCall(method) => format!("super.{}", method),
				};
				let args_string = self.jsify_arg_list(&arg_list, None, None, ctx);
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
									self.jsify_expression(&object, ctx)
								},
                ExprKind::Reference(Reference::TypeMember { property, .. }) => {
                  // remove the property name from the expression string
                  expr_string.split(".").filter(|s| s != &property.name).join(".")
                },
								_ => expr_string,
							}
							CalleeKind::SuperCall{..} =>
								// Note: in case of a $self$ macro override of a super call there's no clear definition of what $self$ should be,
								// "this" is a decent option because it'll refer to the object where "super" was used, but depending on how 
								// $self$ is used in the macro it might lead to unexpected results if $self$.some_method() is called and is
								// defined differently in the parent class of "this".
								"this".to_string(),
						};
						let patterns = &[MACRO_REPLACE_SELF, MACRO_REPLACE_ARGS, MACRO_REPLACE_ARGS_TEXT];
						let replace_with = &[self_string, args_string, args_text_string];
						let ac = AhoCorasick::new(patterns);
						return ac.replace_all(js_override, replace_with);
					}
				}

				let optional_access = if is_option {
					"?."
				} else {
					""
				};

				// NOTE: if the expression is a "handle" class, the object itself is callable (see
				// `jsify_class_inflight` below), so we can just call it as-is.
				format!("({auto_await}{expr_string}{optional_access}({args_string}))")
			}
			ExprKind::Unary { op, exp } => {
				let js_exp = self.jsify_expression(exp, ctx);
				match op {
					UnaryOperator::Minus => format!("(-{})", js_exp),
					UnaryOperator::Not => format!("(!{})", js_exp),
					UnaryOperator::OptionalTest => {
						// We use the abstract inequality operator here because we want to check for null or undefined
						format!("(({}) != null)", js_exp)
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
					BinaryOperator::FloorDiv => {
						return format!("Math.trunc({} / {})", js_left, js_right);
					}
					BinaryOperator::Mod => "%",
					BinaryOperator::Power => "**",
					BinaryOperator::Greater => ">",
					BinaryOperator::GreaterOrEqual => ">=",
					BinaryOperator::Less => "<",
					BinaryOperator::LessOrEqual => "<=",
					BinaryOperator::Equal => {
						return format!("(((a,b) => {{ try {{ return require('assert').deepStrictEqual(a,b) === undefined; }} catch {{ return false; }} }})({},{}))", js_left, js_right)
					},
					BinaryOperator::NotEqual => {
						return format!("(((a,b) => {{ try {{ return require('assert').notDeepStrictEqual(a,b) === undefined; }} catch {{ return false; }} }})({},{}))", js_left, js_right)
					},
					BinaryOperator::LogicalAnd => "&&",
					BinaryOperator::LogicalOr => "||",
					BinaryOperator::UnwrapOr => {
						// Use JS nullish coalescing operator which treats undefined and null the same
						// this is inline with how wing jsifies optionals
						"??"
					}
				};
				format!("({} {} {})", js_left, js_op, js_right)
			}
			ExprKind::ArrayLiteral { items, .. } => {
				let item_list = items
					.iter()
					.map(|expr| self.jsify_expression(expr, ctx))
					.collect::<Vec<String>>()
					.join(", ");

				format!("[{}]", item_list)
			}
			ExprKind::StructLiteral { fields, .. } => {
				format!(
					"({{{}}})",
					fields
						.iter()
						.map(|(name, expr)| format!("\"{}\": {}", name.name, self.jsify_expression(expr, ctx)))
						.collect::<Vec<String>>()
						.join(",")
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
					.map(|(key, expr)| format!("\"{}\": {}", key, self.jsify_expression(expr, ctx)))
					.collect::<Vec<String>>()
					.join(",");
				format!("({{{}}})", f)
			}
			ExprKind::MapLiteral { fields, .. } => {
				let f = fields
					.iter()
					.map(|(key, expr)| format!("\"{}\": {}", key, self.jsify_expression(expr, ctx)))
					.collect::<Vec<String>>()
					.join(",");
				format!("({{{}}})", f)
			}
			ExprKind::SetLiteral { items, .. } => {
				let item_list = items
					.iter()
					.map(|expr| self.jsify_expression(expr, ctx))
					.collect::<Vec<String>>()
					.join(", ");
				format!("new Set([{}])", item_list)
			}
			ExprKind::FunctionClosure(func_def) => self.jsify_function(None, func_def, ctx).to_string(),
			ExprKind::CompilerDebugPanic => {
				// Handle the debug panic expression (during jsifying)
				dbg_panic!();
				"".to_string()
			},
		}
	}

	pub fn jsify_struct_properties(
		&self,
		fields: &Vec<StructField>,
		extends: &Vec<UserDefinedType>,
		ctx: &mut JSifyContext,
	) -> CodeMaker {
		let mut code = CodeMaker::default();

		// Any parents we need to get their properties
		for e in extends {
			code.line(format!(
				"...require(\"{}\")().jsonSchema().properties,",
				struct_filename(&e.root.name)
			))
		}

		for field in fields {
			code.line(format!(
				"{}: {{ {} }},",
				field.name.name,
				self.jsify_struct_field_to_json_schema_type(&field.member_type.kind, ctx)
			));
		}

		code
	}

	pub fn jsify_struct(
		&self,
		name: &Symbol,
		fields: &Vec<StructField>,
		extends: &Vec<UserDefinedType>,
		_env: &SymbolEnv,
		ctx: &mut JSifyContext,
	) -> CodeMaker {
		// To allow for struct validation at runtime this will generate a JS class that has a static
		// getValidator method that will create a json schema validator.
		let mut code = CodeMaker::default();

		code.open("module.exports = function(stdStruct) {".to_string());
		code.open(format!("class {} {{", name));

		// create schema
		let mut required: Vec<String> = vec![]; // fields that are required
		let mut dependencies: Vec<String> = vec![]; // schemas that need added to validator

		code.open("static jsonSchema() {".to_string());
		code.open("return {");
		code.line(format!("id: \"/{}\",", name));
		code.line("type: \"object\",".to_string());

		code.open("properties: {");

		code.add_code(self.jsify_struct_properties(fields, extends, ctx));

		// determine which fields are required, and which schemas need to be added to validator
		for field in fields {
			let dep = extract_struct_field_schema_dependency(&field.member_type.kind, &field.name.name);
			if let Some(req) = dep.0 {
				required.push(req);
			}
			if let Some(dep) = dep.1 {
				dependencies.push(dep);
			}
		}
		code.close("},");

		// Add all required field names to schema
		code.open("required: [");
		for name in required {
			code.line(format!("\"{}\",", name));
		}

		// pull in all required fields from parent structs
		for e in extends {
			code.line(format!(
				"...require(\"{}\")().jsonSchema().required,",
				struct_filename(&e.root.name)
			));
		}

		code.close("],");

		// create definitions for sub schemas
		code.open("$defs: {");
		for dep in &dependencies {
			code.line(format!(
				"\"{}\": {{ type: \"object\", \"properties\": require(\"{}\")().jsonSchema().properties }},",
				dep,
				struct_filename(&dep)
			));
		}
		for e in extends {
			code.line(format!(
				"...require(\"{}\")().jsonSchema().$defs,",
				struct_filename(&e.root.name)
			));
		}
		code.close("}");

		code.close("}");
		code.close("}");

		// create _validate() function
		code.open("static fromJson(obj) {");
		code.line("return stdStruct._validate(obj, this.jsonSchema())");
		code.close("}");

		// create _toInflightType function that just requires the generated struct file
		code.open("static _toInflightType(context) {".to_string());
		code.line(format!(
			"return `require(\"{}\")(${{ context._lift(stdStruct) }})`;",
			struct_filename(&name.name)
		));
		code.close("}");
		code.close("}");
		code.line(format!("return {};", name));
		code.close("};");

		code
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
		elif_statements: &Vec<ElifLetBlock>,
		index: usize,
		else_statements: &Option<Scope>,
		ctx: &mut JSifyContext,
	) {
		let elif_let_value = "$elif_let_value";

		let value = format!("{}{}", elif_let_value, index);
		code.line(format!(
			"const {} = {};",
			value,
			self.jsify_expression(&elif_statements.get(index).unwrap().value, ctx)
		));
		let value = format!("{}{}", elif_let_value, index);
		code.open(format!("if ({value} != undefined) {{"));
		let elif_block = elif_statements.get(index).unwrap();
		if elif_block.reassignable {
			code.line(format!("let {} = {};", elif_block.var_name, value));
		} else {
			code.line(format!("const {} = {};", elif_block.var_name, value));
		}
		code.add_code(self.jsify_scope_body(&elif_block.statements, ctx));
		code.close("}");

		if index < elif_statements.len() - 1 {
			code.open("else {");
			self.jsify_elif_statements(code, elif_statements, index + 1, else_statements, ctx);
			code.close("}");
		} else if let Some(else_scope) = else_statements {
			code.open("else {");
			code.add_code(self.jsify_scope_body(else_scope, ctx));
			code.close("}");
		}
		return;
	}

	fn jsify_statement(&self, env: &SymbolEnv, statement: &Stmt, ctx: &mut JSifyContext) -> CodeMaker {
		CompilationContext::set(CompilationPhase::Jsifying, &statement.span);
		ctx.visit_ctx.push_stmt(statement.idx);
		let code = match &statement.kind {
			StmtKind::Bring { source, identifier } => match source {
				BringSource::BuiltinModule(name) => CodeMaker::one_line(format!("const {} = {}.{};", name, STDLIB, name)),
				BringSource::JsiiModule(name) => CodeMaker::one_line(format!(
					"const {} = require(\"{}\");",
					// checked during type checking
					identifier.as_ref().expect("bring jsii module requires an alias"),
					name
				)),
				BringSource::WingFile(name) => {
					let preflight_file_map = self.preflight_file_map.borrow();
					let preflight_file_name = preflight_file_map.get(Utf8Path::new(&name.name)).unwrap();
					CodeMaker::one_line(format!(
						"const {} = require(\"./{}\")({{ {} }});",
						// checked during type checking
						identifier.as_ref().expect("bring wing file requires an alias"),
						preflight_file_name,
						STDLIB,
					))
				}
			},
			StmtKind::SuperConstructor { arg_list } => {
				let args = self.jsify_arg_list(&arg_list, None, None, ctx);
				match ctx.visit_ctx.current_phase() {
					Phase::Preflight => CodeMaker::one_line(format!("super(scope,id,{});", args)),
					_ => CodeMaker::one_line(format!("super({});", args)),
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
					CodeMaker::one_line(format!("let {var_name} = {initial_value};"))
				} else {
					CodeMaker::one_line(format!("const {var_name} = {initial_value};"))
				}
			}
			StmtKind::ForLoop {
				iterator,
				iterable,
				statements,
			} => {
				let mut code = CodeMaker::default();
				code.open(format!(
					"for (const {iterator} of {}) {{",
					self.jsify_expression(iterable, ctx)
				));
				code.add_code(self.jsify_scope_body(statements, ctx));
				code.close("}");
				code
			}
			StmtKind::While { condition, statements } => {
				let mut code = CodeMaker::default();
				code.open(format!("while ({}) {{", self.jsify_expression(condition, ctx)));
				code.add_code(self.jsify_scope_body(statements, ctx));
				code.close("}");
				code
			}
			StmtKind::Break => CodeMaker::one_line("break;"),
			StmtKind::Continue => CodeMaker::one_line("continue;"),
			StmtKind::IfLet {
				reassignable,
				value,
				statements,
				var_name,
				elif_statements,
				else_statements,
			} => {
				let mut code = CodeMaker::default();
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
				let if_let_value = "$if_let_value".to_string();
				code.line(format!(
					"const {} = {};",
					if_let_value,
					self.jsify_expression(value, ctx)
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
					code.open("else {");
					self.jsify_elif_statements(&mut code, elif_statements, 0, else_statements, ctx);
					code.close("}");
				} else if let Some(else_scope) = else_statements {
					code.open("else {");
					code.add_code(self.jsify_scope_body(else_scope, ctx));
					code.close("}");
				}

				code.close("}");
				code
			}
			StmtKind::If {
				condition,
				statements,
				elif_statements,
				else_statements,
			} => {
				let mut code = CodeMaker::default();

				code.open(format!("if ({}) {{", self.jsify_expression(condition, ctx)));
				code.add_code(self.jsify_scope_body(statements, ctx));
				code.close("}");

				for elif_block in elif_statements {
					let condition = self.jsify_expression(&elif_block.condition, ctx);
					// TODO: this puts the "else if" in a separate line from the closing block but
					// technically that shouldn't be a problem, its just ugly
					code.open(format!("else if ({}) {{", condition));
					code.add_code(self.jsify_scope_body(&elif_block.statements, ctx));
					code.close("}");
				}

				if let Some(else_scope) = else_statements {
					code.open("else {");
					code.add_code(self.jsify_scope_body(else_scope, ctx));
					code.close("}");
				}

				code
			}
			StmtKind::Expression(e) => CodeMaker::one_line(format!("{};", self.jsify_expression(e, ctx))),
			StmtKind::Assignment { variable, value } => CodeMaker::one_line(format!(
				"{} = {};",
				self.jsify_reference(variable, ctx),
				self.jsify_expression(value, ctx)
			)),
			StmtKind::Scope(scope) => {
				let mut code = CodeMaker::default();
				if !scope.statements.is_empty() {
					code.open("{");
					code.add_code(self.jsify_scope_body(scope, ctx));
					code.close("}");
				}
				code
			}
			StmtKind::Return(exp) => {
				if let Some(exp) = exp {
					CodeMaker::one_line(format!("return {};", self.jsify_expression(exp, ctx)))
				} else {
					CodeMaker::one_line("return;")
				}
			}
			StmtKind::Throw(exp) => CodeMaker::one_line(format!("throw new Error({});", self.jsify_expression(exp, ctx))),
			StmtKind::Class(class) => self.jsify_class(env, class, ctx),
			StmtKind::Interface { .. } => {
				// This is a no-op in JS
				CodeMaker::default()
			}
			StmtKind::Struct { name, fields, extends } => {
				let mut code = self.jsify_struct(name, fields, extends, env, ctx);
				// Emits struct class file
				self.emit_struct_file(name, code, ctx);

				// Reset the code maker for code to be inserted in preflight.js
				code = CodeMaker::default();
				code.line(format!(
					"const {} = require(\"{}\")({}.std.Struct);",
					name,
					struct_filename(&name.name),
					STDLIB
				));
				code
			}
			StmtKind::Enum { name, values } => {
				let mut code = CodeMaker::default();
				code.open(format!("const {name} ="));
				code.add_code(self.jsify_enum(values));
				code.close(";");
				code
			}
			StmtKind::TryCatch {
				try_statements,
				catch_block,
				finally_statements,
			} => {
				let mut code = CodeMaker::default();

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

				code
			}
			StmtKind::CompilerDebugEnv => CodeMaker::default(),
		};
		ctx.visit_ctx.pop_stmt();
		code
	}

	fn jsify_enum(&self, values: &IndexSet<Symbol>) -> CodeMaker {
		let mut code = CodeMaker::default();
		let mut value_index = 0;

		code.open("(function (tmp) {");

		for value in values {
			code.line(format!(
				"tmp[tmp[\"{}\"] = {}] = \"{}\";",
				value.name, value_index, value.name
			));

			value_index = value_index + 1;
		}

		code.line("return tmp;");

		code.close("})({})");
		code
	}

	fn jsify_function(&self, class: Option<&AstClass>, func_def: &FunctionDefinition, ctx: &mut JSifyContext) -> String {
		let mut parameter_list = vec![];

		for p in &func_def.signature.parameters {
			if p.variadic {
				parameter_list.push("...".to_string() + &p.name.to_string());
			} else {
				parameter_list.push(p.name.to_string());
			}
		}

		let (name, arrow) = match &func_def.name {
			Some(name) => {
				let mut result = name.name.clone();

				// if this is an inflight class, we need to rename the constructor to "constructor" because
				// it's "just a class" basically.
				if let Some(class) = class {
					if result == CLASS_INFLIGHT_INIT_NAME && class.phase == Phase::Inflight {
						result = JS_CONSTRUCTOR.to_string();
					}
				}

				(result, " ".to_string())
			}
			None => ("".to_string(), " => ".to_string()),
		};

		let parameters = parameter_list.iter().map(|x| x.as_str()).collect::<Vec<_>>().join(", ");

		let body = match &func_def.body {
			FunctionBody::Statements(scope) => {
				let mut code = CodeMaker::default();
				code.add_code(self.jsify_scope_body(scope, ctx));
				code
			}
			FunctionBody::External(external_spec) => {
				debug!(
					"Resolving extern \"{}\" from \"{}\"",
					external_spec, self.absolute_project_root
				);
				let resolved_path =
					match wingii::node_resolve::resolve_from(&external_spec, Utf8Path::new(&self.absolute_project_root)) {
						Ok(resolved_path) => resolved_path.to_string().replace("\\", "/"),
						Err(err) => {
							report_diagnostic(Diagnostic {
								message: format!("Failed to resolve extern \"{external_spec}\": {err}"),
								span: Some(func_def.span.clone()),
							});
							format!("/* unresolved: \"{external_spec}\" */")
						}
					};
				CodeMaker::one_line(format!(
					"return (require(\"{resolved_path}\")[\"{name}\"])({parameters})"
				))
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

		let mut code = CodeMaker::default();
		code.open(format!("{}({parameters}){arrow}{{", prefix.join(" ")));
		code.add_code(body);
		code.close("}");

		// if prefix is empty it means this is a closure, so we need to wrap it in `(`, `)`.
		if prefix.is_empty() {
			format!("({})", code.to_string().trim().to_string())
		} else {
			code.to_string()
		}
	}

	fn jsify_class(&self, env: &SymbolEnv, class: &AstClass, ctx: &mut JSifyContext) -> CodeMaker {
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
		let mut code = CodeMaker::default();

		// default base class for preflight classes is `core.Resource`
		let extends = if let Some(parent) = &class.parent {
			format!(" extends {}", self.jsify_user_defined_type(parent, ctx))
		} else {
			format!(" extends {}", STDLIB_CORE_RESOURCE)
		};

		code.open(format!("class {}{extends} {{", class.name));

		// emit the preflight constructor
		code.add_code(self.jsify_preflight_constructor(&class, ctx));

		// emit preflight methods
		for m in class.preflight_methods(false) {
			code.line(self.jsify_function(Some(class), m, ctx));
		}

		// emit the `_toInflight` and `_toInflightType` methods (TODO: renamed to `_liftObject` and
		// `_liftType`).
		code.add_code(self.jsify_to_inflight_type_method(&class, ctx));
		code.add_code(self.jsify_to_inflight_method(&class.name, ctx));
		code.add_code(self.jsify_get_inflight_ops_method(&class));

		// emit `_registerBindObject` to register bindings (for type & instance binds)
		code.add_code(self.jsify_register_bind_method(class, class_type, BindMethod::Instance, ctx));
		code.add_code(self.jsify_register_bind_method(class, class_type, BindMethod::Type, ctx));

		code.close("}");
		code
	}

	fn jsify_preflight_constructor(&self, class: &AstClass, ctx: &mut JSifyContext) -> CodeMaker {
		let mut code = CodeMaker::default();
		code.open(format!(
			"constructor(scope, id, {}) {{",
			class
				.initializer
				.signature
				.parameters
				.iter()
				.map(|p| p.name.to_string())
				.collect_vec()
				.join(", "),
		));

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

		let mut body_code = CodeMaker::default();

		// we always need a super() call because even if the class doesn't have an explicit parent, it
		// will inherit from core.Resource.
		if !super_called {
			body_code.line("super(scope, id);");
		}
		body_code.add_code(self.jsify_scope_body(&init_statements, ctx));

		code.add_code(body_code);

		code.close("}");
		code
	}

	fn jsify_get_inflight_ops_method(&self, class: &AstClass) -> CodeMaker {
		let mut code = CodeMaker::default();

		code.open("_getInflightOps() {");

		let mut ops = vec![];
		for field in class.inflight_fields() {
			ops.push(format!("\"{}\"", field.name.name));
		}
		for method in class.inflight_methods(true) {
			ops.push(format!("\"{}\"", method.name.as_ref().unwrap().name));
		}

		code.line(format!("return [{}];", ops.join(", ")));
		code.close("}");
		code
	}

	fn jsify_to_inflight_type_method(&self, class: &AstClass, ctx: &JSifyContext) -> CodeMaker {
		let client_path = self.inflight_filename(class);

		let mut code = CodeMaker::default();

		code.open("static _toInflightType(context) {"); // TODO: consider removing the context and making _lift a static method

		code.open("return `");

		code.open(format!("require(\"{client_path}\")({{"));

		if let Some(lifts) = &ctx.lifts {
			for (token, capture) in lifts.captures.iter().filter(|(_, cap)| !cap.is_field) {
				let lift_type = format!("context._lift({})", capture.code);
				code.line(format!("{}: ${{{}}},", token, lift_type));
			}
		}

		code.close("})");

		code.close("`;");

		code.close("}");
		code
	}

	fn jsify_to_inflight_method(&self, resource_name: &Symbol, ctx: &JSifyContext) -> CodeMaker {
		let mut code = CodeMaker::default();

		code.open("_toInflight() {");

		code.open("return `");

		code.open("(await (async () => {");

		code.line(format!(
			"const {}Client = ${{{}._toInflightType(this)}};",
			resource_name.name, resource_name.name,
		));

		code.open(format!("const client = new {}Client({{", resource_name.name));

		if let Some(lifts) = &ctx.lifts {
			for (token, obj) in lifts.lifted_fields() {
				code.line(format!("{token}: ${{this._lift({obj})}},"));
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

		let mut class_code = CodeMaker::default();

		let name = &class.name.name;
		class_code.open(format!(
			"class {name}{} {{",
			if let Some(parent) = &class.parent {
				format!(" extends {}", self.jsify_user_defined_type(&parent, ctx))
			} else {
				"".to_string()
			}
		));

		// if this is a preflight class, emit the binding constructor
		if class.phase == Phase::Preflight {
			self.jsify_inflight_binding_constructor(class, &mut class_code, &ctx);
		}

		for def in class.inflight_methods(false) {
			class_code.line(self.jsify_function(Some(class), def, &mut ctx));
		}

		// emit the $inflight_init function (if it has a body).
		if let FunctionBody::Statements(s) = &class.inflight_initializer.body {
			if !s.statements.is_empty() {
				class_code.line(self.jsify_function(Some(class), &class.inflight_initializer, &mut ctx));
			}
		}

		class_code.close("}");
		ctx.visit_ctx.pop_phase();
		class_code
	}

	fn emit_struct_file(&self, name: &Symbol, struct_code: CodeMaker, _ctx: &mut JSifyContext) {
		let mut code = CodeMaker::default();
		code.add_code(struct_code);
		match self
			.output_files
			.borrow_mut()
			.add_file(struct_filename(&name.name), code.to_string())
		{
			Ok(()) => {}
			Err(err) => report_diagnostic(err.into()),
		}
	}

	fn emit_inflight_file(&self, class: &AstClass, inflight_class_code: CodeMaker, ctx: &mut JSifyContext) {
		let name = &class.name.name;
		let mut code = CodeMaker::default();

		let inputs = if let Some(lifts) = &ctx.lifts {
			lifts
				.captures
				.iter()
				.filter_map(|(token, cap)| if !cap.is_field { Some(token) } else { None })
				.join(", ")
		} else {
			Default::default()
		};

		code.open(format!("module.exports = function({{ {inputs} }}) {{"));
		code.add_code(inflight_class_code);
		code.line(format!("return {name};"));
		code.close("}");

		// emit the inflight class to a file
		match self
			.output_files
			.borrow_mut()
			.add_file(self.inflight_filename(class), code.to_string())
		{
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
		let mut bind_method = CodeMaker::default();
		let (modifier, bind_method_name) = match bind_method_kind {
			BindMethod::Type => ("static ", "_registerTypeBind"),
			BindMethod::Instance => ("", "_registerBind"),
		};

		let class_name = class.name.to_string();

		let Some(lifts) = ctx.lifts else {
			return bind_method;
		};

		let lift_qualifications = lifts
			.lifts_qualifications
			.iter()
			.filter(|(m, _)| {
				let var_kind = &class_type
					.as_class()
					.unwrap()
					.get_method(&m.as_str().into())
					.as_ref()
					.expect(&format!("method \"{m}\" doesn't exist in {class_name}"))
					.kind;
				let is_static = matches!(var_kind, VariableKind::StaticMember);
				(*m == CLASS_INFLIGHT_INIT_NAME || !is_static) ^ (matches!(bind_method_kind, BindMethod::Type))
			})
			.collect_vec();

		// Skip jsifying this method if there are no lifts (in this case we'll use super's register bind method)
		if lift_qualifications.is_empty() {
			return bind_method;
		}

		bind_method.open(format!("{modifier}{bind_method_name}(host, ops) {{"));
		for (method_name, method_qual) in lift_qualifications {
			bind_method.open(format!("if (ops.includes(\"{method_name}\")) {{"));
			for (code, method_lift_qual) in method_qual {
				let ops_strings = method_lift_qual.ops.iter().map(|op| format!("\"{}\"", op)).join(", ");

				bind_method.line(format!(
					"{class_name}._registerBindObject({code}, host, [{ops_strings}]);",
				));
			}
			bind_method.close("}");
		}
		bind_method.line(format!("super.{bind_method_name}(host, ops);"));
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
		format!("./inflight.{}-{}.js", class.name.name, id)
	}
}

// This helper determines what requirement and dependency to add to the struct schema based
// on the type annotation of the field.
// I.E. if a struct has a field named "foo" with a type "OtherStruct", then we want to add
// the field "foo" as a required  and the struct "OtherStruct" as a dependency. so the result is
// a tuple (required, dependency)
fn extract_struct_field_schema_dependency(
	typ: &TypeAnnotationKind,
	field_name: &String,
) -> (Option<String>, Option<String>) {
	match typ {
		TypeAnnotationKind::UserDefined(udt) => (Some(field_name.clone()), Some(udt.root.name.clone())),
		TypeAnnotationKind::Array(t) | TypeAnnotationKind::Set(t) | TypeAnnotationKind::Map(t) => {
			extract_struct_field_schema_dependency(&t.kind, field_name)
		}
		TypeAnnotationKind::Optional(t) => {
			let deps = extract_struct_field_schema_dependency(&t.kind, field_name);
			// We never want to add an optional to the required block
			(None, deps.1)
		}
		_ => (Some(field_name.clone()), None),
	}
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
			StmtKind::IfLet { .. } => {}
			StmtKind::If { .. } => {}
			StmtKind::Break => {}
			StmtKind::Continue => {}
			StmtKind::Return(_) => {}
			StmtKind::Throw(_) => {}
			StmtKind::Expression(_) => {}
			StmtKind::Assignment { .. } => {}
			StmtKind::Scope(_) => {}
			StmtKind::Class(class) => {
				symbols.push(class.name.clone());
			}
			// interfaces are bringable, but there's nothing to emit
			StmtKind::Interface(_) => {}
			StmtKind::Struct { name, .. } => {
				symbols.push(name.clone());
			}
			StmtKind::Enum { name, .. } => {
				symbols.push(name.clone());
			}
			StmtKind::TryCatch { .. } => {}
			StmtKind::CompilerDebugEnv => {}
		}
	}

	symbols
}

fn struct_filename(s: &String) -> String {
	format!("./{}.Struct.js", s)
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
