mod captures;
pub mod codemaker;
mod files;
mod mangling;
use aho_corasick::AhoCorasick;
use const_format::formatcp;
use indexmap::IndexSet;
use itertools::Itertools;

use std::{cmp::Ordering, path::Path, vec};

use crate::{
	ast::{
		ArgList, BinaryOperator, Class as AstClass, ClassField, Expr, ExprKind, FunctionBody, FunctionDefinition,
		InterpolatedStringPart, Literal, Phase, Reference, Scope, Stmt, StmtKind, Symbol, UnaryOperator,
	},
	comp_ctx::{CompilationContext, CompilationPhase},
	dbg_panic, debug,
	diagnostic::{report_diagnostic, Diagnostic},
	type_check::{
		resolve_user_defined_type, symbol_env::SymbolEnv, ClassLike, Type, TypeRef, Types, CLASS_INFLIGHT_INIT_NAME,
		HANDLE_METHOD_NAME,
	},
	MACRO_REPLACE_ARGS, MACRO_REPLACE_SELF, WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE, WINGSDK_STD_MODULE,
};

use self::{
	captures::ClassCaptures,
	codemaker::CodeMaker,
	files::Files,
	mangling::{make_lift_args, mangle, mangle_captures},
};

const PREFLIGHT_FILE_NAME: &str = "preflight.js";

const STDLIB: &str = "$stdlib";
const STDLIB_CORE_RESOURCE: &str = formatcp!("{}.{}", STDLIB, WINGSDK_RESOURCE);
const STDLIB_MODULE: &str = WINGSDK_ASSEMBLY_NAME;

const TARGET_CODE: &str = "const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);";

const ENV_WING_IS_TEST: &str = "$wing_is_test";
const OUTDIR_VAR: &str = "$outdir";

const APP_CLASS: &str = "$App";
const APP_BASE_CLASS: &str = "$AppBase";

const ROOT_CLASS: &str = "$Root";
const JS_CONSTRUCTOR: &str = "constructor";

pub struct JSifyContext {
	pub in_json: bool,
	/// The current execution phase of the AST traversal.
	/// The root of any Wing app starts with the preflight phase, and
	/// the `inflight` keyword specifies scopes that are inflight.
	pub phase: Phase,
}

pub struct JSifier<'a> {
	pub types: &'a Types,
	/// Stores all generated JS files in memory.
	files: Files,
	/// Root of the project, used for resolving extern modules
	absolute_project_root: &'a Path,
	shim: bool,
	app_name: &'a str,
}

/// Preflight classes have two types of host binding methods:
/// `Type` for binding static fields and methods to the host and
/// `instance` for binding instance fields and methods to the host.
enum BindMethod {
	Type,
	Instance,
}

impl<'a> JSifier<'a> {
	pub fn new(types: &'a Types, app_name: &'a str, absolute_project_root: &'a Path, shim: bool) -> Self {
		Self {
			types,
			files: Files::new(),
			shim,
			app_name,
			absolute_project_root,
		}
	}

	fn get_expr_type(&self, expr: &Expr) -> TypeRef {
		// Safety: JSifier is always run after type checking has finished, so all types should be resolved.
		self.types.get_expr_type(expr).unwrap()
	}

	fn js_resolve_path(path_name: &str) -> String {
		format!("\"./{}\"", path_name.replace("\\", "/"))
	}

	pub fn jsify(&mut self, scope: &Scope) {
		CompilationContext::set(CompilationPhase::Jsifying, &scope.span);
		let mut js = CodeMaker::default();
		let mut imports = CodeMaker::default();

		for statement in scope.statements.iter().sorted_by(|a, b| match (&a.kind, &b.kind) {
			// Put type definitions first so JS won't complain of unknown types
			(StmtKind::Class(AstClass { .. }), StmtKind::Class(AstClass { .. })) => Ordering::Equal,
			(StmtKind::Class(AstClass { .. }), _) => Ordering::Less,
			(_, StmtKind::Class(AstClass { .. })) => Ordering::Greater,
			_ => Ordering::Equal,
		}) {
			let jsify_context = JSifyContext {
				in_json: false,
				phase: Phase::Preflight,
			};
			let s = self.jsify_statement(scope.env.borrow().as_ref().unwrap(), statement, &jsify_context); // top level statements are always preflight
			if let StmtKind::Bring {
				identifier: _,
				module_name: _,
			} = statement.kind
			{
				imports.add_code(s);
			} else {
				js.add_code(s);
			}
		}

		let mut output = CodeMaker::default();

		if self.shim {
			output.line(format!("const {} = require('{}');", STDLIB, STDLIB_MODULE));
			output.line(format!("const {} = process.env.WING_SYNTH_DIR ?? \".\";", OUTDIR_VAR));
			// "std" is implicitly imported
			output.line(format!("const std = {STDLIB}.{WINGSDK_STD_MODULE};"));
			output.line(format!(
				"const {} = process.env.WING_IS_TEST === \"true\";",
				ENV_WING_IS_TEST
			));
			output.line(TARGET_CODE.to_owned());
		}

		output.add_code(imports);

		if self.shim {
			let mut root_class = CodeMaker::default();
			root_class.open(format!("class {} extends {} {{", ROOT_CLASS, STDLIB_CORE_RESOURCE));
			root_class.open(format!("{JS_CONSTRUCTOR}(scope, id) {{"));
			root_class.line("super(scope, id);");
			root_class.add_code(js);
			root_class.close("}");
			root_class.close("}");

			let mut app_wrapper = CodeMaker::default();
			app_wrapper.open(format!("class {} extends {} {{", APP_CLASS, APP_BASE_CLASS));
			app_wrapper.open(format!("{JS_CONSTRUCTOR}() {{"));
			app_wrapper.line(format!(
				"super({{ outdir: {}, name: \"{}\", plugins: $plugins, isTestEnvironment: {} }});",
				OUTDIR_VAR, self.app_name, ENV_WING_IS_TEST
			));
			app_wrapper.open(format!("if ({}) {{", ENV_WING_IS_TEST));
			app_wrapper.line(format!("new {}(this, \"env0\");", ROOT_CLASS));
			app_wrapper.line("const $test_runner = this.testRunner;");
			app_wrapper.line("const $tests = $test_runner.findTests();");
			app_wrapper.open("for (let $i = 1; $i < $tests.length; $i++) {");
			app_wrapper.line(format!("new {}(this, \"env\" + $i);", ROOT_CLASS));
			app_wrapper.close("}");
			app_wrapper.close("} else {");
			app_wrapper.indent();
			app_wrapper.line(format!("new {}(this, \"Default\");", ROOT_CLASS));
			app_wrapper.close("}");
			app_wrapper.close("}");
			app_wrapper.close("}");

			output.add_code(root_class);
			output.add_code(app_wrapper);

			output.line(format!("new {}().synth();", APP_CLASS));
		} else {
			output.add_code(js);
		}

		match self.files.add_file(PREFLIGHT_FILE_NAME, output.to_string()) {
			Ok(()) => {}
			Err(err) => report_diagnostic(err.into()),
		}
	}

	/// Write all files to the output directory
	pub fn emit_files(&mut self, out_dir: &Path) {
		match self.files.emit_files(out_dir) {
			Ok(()) => {}
			Err(err) => report_diagnostic(err.into()),
		}
	}

	fn jsify_scope_body(&mut self, scope: &Scope, ctx: &JSifyContext) -> CodeMaker {
		CompilationContext::set(CompilationPhase::Jsifying, &scope.span);
		let mut code = CodeMaker::default();

		for statement in scope.statements.iter() {
			let statement_code = self.jsify_statement(scope.env.borrow().as_ref().unwrap(), statement, ctx);
			code.add_code(statement_code);
		}

		code
	}

	fn jsify_reference(&mut self, reference: &Reference, ctx: &JSifyContext) -> String {
		match reference {
			Reference::Identifier(identifier) => identifier.to_string(),
			Reference::InstanceMember {
				object,
				property,
				optional_accessor: _,
			} => self.jsify_expression(object, ctx) + "." + &property.to_string(),
			Reference::TypeMember { type_, property } => type_.full_path_str() + "." + &property.to_string(),
		}
	}

	fn jsify_arg_list(
		&mut self,
		arg_list: &ArgList,
		scope: Option<&str>,
		id: Option<&str>,
		ctx: &JSifyContext,
	) -> String {
		let mut args = vec![];
		let mut structure_args = vec![];

		if let Some(scope_str) = scope {
			args.push(scope_str.to_string());
		}

		if let Some(id_str) = id {
			args.push(format!("\"{}\"", id_str));
		}

		for arg in arg_list.pos_args.iter() {
			args.push(self.jsify_expression(arg, &ctx));
		}

		for arg in arg_list.named_args.iter() {
			// convert snake to camel case
			structure_args.push(format!(
				"{}: {}",
				arg.0.name.clone(),
				self.jsify_expression(
					arg.1,
					&JSifyContext {
						in_json: ctx.in_json,
						phase: Phase::Independent,
					}
				)
			));
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

	fn jsify_expression(&mut self, expression: &Expr, ctx: &JSifyContext) -> String {
		CompilationContext::set(CompilationPhase::Jsifying, &expression.span);
		let auto_await = match ctx.phase {
			Phase::Inflight => "await ",
			_ => "",
		};
		match &expression.kind {
			ExprKind::New {
				class,
				obj_id,
				arg_list,
				obj_scope: _, // TODO
			} => {
				let expression_type = self.get_expr_type(&expression);
				let is_preflight_class = expression_type.is_preflight_class();

				let class_type = expression_type.as_class().expect("type to be a class");
				let is_abstract = class_type.is_abstract;

				// if we have an FQN, we emit a call to the "new" (or "newAbstract") factory method to allow
				// targets and plugins to inject alternative implementations for types. otherwise (e.g.
				// user-defined types), we simply instantiate the type directly (maybe in the future we will
				// allow customizations of user-defined types as well, but for now we don't).
				let ctor = class.kind.to_string();
				let scope = if is_preflight_class { Some("this") } else { None };

				let id = if is_preflight_class {
					Some(obj_id.as_ref().unwrap_or(&ctor).as_str())
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
				Literal::InterpolatedString(s) => format!(
					"`{}`",
					s.parts
						.iter()
						.map(|p| match p {
							InterpolatedStringPart::Static(l) => l.to_string(),
							InterpolatedStringPart::Expr(e) => {
								match *self.get_expr_type(e) {
									Type::Json | Type::MutJson => {
										format!("${{JSON.stringify({}, null, 2)}}", self.jsify_expression(e, ctx))
									}
									_ => format!("${{{}}}", self.jsify_expression(e, ctx)),
								}
							}
						})
						.collect::<Vec<String>>()
						.join("")
				),
				Literal::Number(n) => format!("{}", n),
				Literal::Duration(sec) => format!("{}.std.Duration.fromSeconds({})", STDLIB, sec),
				Literal::Boolean(b) => (if *b { "true" } else { "false" }).to_string(),
			},
			ExprKind::Range { start, inclusive, end } => {
				match ctx.phase {
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
				let function_type = self.get_expr_type(callee);
				let function_sig = function_type.as_function_sig();
				assert!(
					function_sig.is_some() || function_type.is_anything() || function_type.is_handler_preflight_class(),
					"Expected expression to be callable"
				);

				let expr_string = match &callee.kind {
					ExprKind::Reference(reference) => self.jsify_reference(reference, ctx),
					_ => format!("({})", self.jsify_expression(callee, ctx)),
				};
				let arg_string = self.jsify_arg_list(&arg_list, None, None, ctx);

				if let Some(function_sig) = function_sig {
					if let Some(js_override) = &function_sig.js_override {
						let self_string = &match &callee.kind {
							// for "loose" macros, e.g. `print()`, $self$ is the global object
							ExprKind::Reference(Reference::Identifier(_)) => "global".to_string(),
							ExprKind::Reference(Reference::InstanceMember { object, .. }) => {
								self.jsify_expression(object, ctx)
							}

							_ => expr_string,
						};
						let patterns = &[MACRO_REPLACE_SELF, MACRO_REPLACE_ARGS];
						let replace_with = &[self_string, &arg_string];
						let ac = AhoCorasick::new(patterns);
						return ac.replace_all(js_override, replace_with);
					}
				}

				// NOTE: if the expression is a "handle" class, the object itself is callable (see
				// `jsify_class_inflight` below), so we can just call it as-is.
				format!("({auto_await}{expr_string}({arg_string}))")
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
					BinaryOperator::Equal => "===",
					BinaryOperator::NotEqual => "!==",
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

				if self.get_expr_type(expression).is_mutable_collection() || ctx.in_json {
					// json arrays dont need frozen at nested level
					format!("[{}]", item_list)
				} else {
					format!("Object.freeze([{}])", item_list)
				}
			}
			ExprKind::StructLiteral { fields, .. } => {
				format!(
					"{{\n{}}}\n",
					fields
						.iter()
						.map(|(name, expr)| format!("\"{}\": {},", name.name, self.jsify_expression(expr, ctx)))
						.collect::<Vec<String>>()
						.join("\n")
				)
			}
			ExprKind::JsonLiteral { is_mut, element } => {
				let json_context = &JSifyContext {
					in_json: true,
					phase: ctx.phase,
				};
				let js_out = match &element.kind {
					ExprKind::MapLiteral { .. } => {
						if *is_mut {
							self.jsify_expression(element, json_context)
						} else {
							format!("Object.freeze({})", self.jsify_expression(element, json_context))
						}
					}
					_ => self.jsify_expression(element, json_context)
				};
				js_out
			}
			ExprKind::MapLiteral { fields, .. } => {
				let f = fields
					.iter()
					.map(|(key, expr)| format!("\"{}\":{}", key, self.jsify_expression(expr, ctx)))
					.collect::<Vec<String>>()
					.join(",");

				if self.get_expr_type(expression).is_mutable_collection() || ctx.in_json {
					// json maps dont need frozen in the nested level
					format!("{{{}}}", f)
				} else {
					format!("Object.freeze({{{}}})", f)
				}
			}
			ExprKind::SetLiteral { items, .. } => {
				let item_list = items
					.iter()
					.map(|expr| self.jsify_expression(expr, ctx))
					.collect::<Vec<String>>()
					.join(", ");

				if self.get_expr_type(expression).is_mutable_collection() {
					format!("new Set([{}])", item_list)
				} else {
					format!("Object.freeze(new Set([{}]))", item_list)
				}
			}
			ExprKind::FunctionClosure(func_def) => match func_def.signature.phase {
				Phase::Inflight => {
					assert!(ctx.phase == Phase::Inflight, "inflight closures should have been transformed into preflight handler classes in the closure_transform compiler phase");
					self.jsify_function(None, func_def, false, ctx).to_string()
				},
				Phase::Independent => unimplemented!(),
				Phase::Preflight => self.jsify_function(None, func_def, false, ctx).to_string(),
			},
    	ExprKind::CompilerDebugPanic => {
				// Handle the debug panic expression (during jsifying)
				dbg_panic!();
				"".to_string()
			},
		}
	}

	fn jsify_statement(&mut self, env: &SymbolEnv, statement: &Stmt, ctx: &JSifyContext) -> CodeMaker {
		CompilationContext::set(CompilationPhase::Jsifying, &statement.span);
		match &statement.kind {
			StmtKind::Bring {
				module_name,
				identifier,
			} => {
				CodeMaker::one_line(format!(
					"const {} = {};",
					if let Some(identifier) = identifier {
						// use alias
						identifier
					} else {
						module_name
					},
					if module_name.name.starts_with("\"") {
						// TODO so many assumptions here, would only work with a JS file, see:
						// https://github.com/winglang/wing/issues/477
						// https://github.com/winglang/wing/issues/478
						// https://github.com/winglang/wing/issues/1027
						format!("require({})", module_name.name)
					} else {
						format!("require('{}').{}", STDLIB_MODULE, module_name.name)
					}
				))
			}
			StmtKind::Let {
				reassignable,
				var_name,
				initial_value,
				type_: _,
			} => {
				let initial_value = self.jsify_expression(initial_value, ctx);
				return if *reassignable {
					CodeMaker::one_line(format!("let {var_name} = {initial_value};"))
				} else {
					CodeMaker::one_line(format!("const {var_name} = {initial_value};"))
				};
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
				value,
				statements,
				var_name,
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
				let if_let_value = "$IF_LET_VALUE".to_string();
				code.line(format!(
					"const {} = {};",
					if_let_value,
					self.jsify_expression(value, ctx)
				));
				code.open(format!("if ({if_let_value} != undefined) {{"));
				code.line(format!("const {} = {};", var_name, if_let_value));
				code.add_code(self.jsify_scope_body(statements, ctx));
				code.close("}");

				if let Some(else_scope) = else_statements {
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
				self.jsify_reference(&variable, ctx),
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
			StmtKind::Class(class) => self.jsify_class(env, class, ctx),
			StmtKind::Interface { .. } => {
				// This is a no-op in JS
				CodeMaker::default()
			}
			StmtKind::Struct { .. } => {
				// This is a no-op in JS
				CodeMaker::default()
			}
			StmtKind::Enum { name, values } => {
				let mut code = CodeMaker::default();
				code.open(format!("const {name} = "));
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
		}
	}

	fn jsify_enum(&mut self, values: &IndexSet<Symbol>) -> CodeMaker {
		let mut code = CodeMaker::default();
		let mut value_index = 0;

		code.open("Object.freeze((function (tmp) {");

		for value in values {
			code.line(format!(
				"tmp[tmp[\"{}\"] = {}] = \"{}\";",
				value.name, value_index, value.name
			));

			value_index = value_index + 1;
		}

		code.line("return tmp;");

		code.close("})({}))");
		code
	}

	fn jsify_function(
		&mut self,
		name: Option<&str>,
		func_def: &FunctionDefinition,
		is_class_member: bool,
		ctx: &JSifyContext,
	) -> CodeMaker {
		let mut parameter_list = vec![];

		for p in &func_def.signature.parameters {
			parameter_list.push(p.name.to_string());
		}

		let (name, arrow) = match name {
			Some(name) => (name, ""),
			None => ("", "=> "),
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
					external_spec,
					self.absolute_project_root.display()
				);
				let resolved_path =
					match wingii::node_resolve::resolve_from(&external_spec, Path::new(&self.absolute_project_root)) {
						Ok(resolved_path) => resolved_path
							.to_str()
							.expect("Converting extern path to string")
							.replace("\\", "/"),
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
		let mut modifiers = vec![];

		if func_def.is_static && is_class_member {
			modifiers.push("static")
		}

		// if this is "constructor" it cannot be async
		if name != JS_CONSTRUCTOR && matches!(func_def.signature.phase, Phase::Inflight) {
			modifiers.push("async")
		}

		let modifiers = modifiers.join(" ");

		let mut code = CodeMaker::default();
		code.open(format!("{modifiers} {name}({parameters}) {arrow} {{"));
		code.add_code(body);
		code.close("}");

		code
	}

	/// Jsify a class
	/// This performs two things:
	/// 1) It returns the JS code for the resource which includes:
	/// 	- A JS class which inherits from `core.Resource` with all the preflight code of the resource.
	/// 	- A `_toInflight` method in that class that creates inflight client for the resource. This code creates inflight
	///     clients for all inner resources and passes them to the inflight client constructor.
	///   - Calls to `core.Resource._annotateInflight` to annotate the inflight client's methods with binding information.
	///     * Note that at this point the binding information includes ALL methods of all the captured resources. For all
	///       client methods. In the future this needs to be generated based on the compiler's capture usage analysis
	/// 		  in capture.rs. (see https://github.com/winglang/wing/issues/76, https://github.com/winglang/wing/issues/1449).
	/// 2) It generates the JS code for the resource's inflight client and writes it to a JS file.
	///
	/// # Example
	///
	///  ```wing
	/// bring cloud;
	/// resource Foo {
	///   init() {
	/// 	  this.b = new cloud.Bucket();
	///   }
	///   inflight my_put() {
	/// 	  this.b.put("foo", "bar");
	/// 	}
	/// }
	/// ```
	/// Will produce the following **preflight** JS code:
	/// ```js
	/// class Foo extends core.Resource {
	///  constructor(scope, id) {
	/// 	 super(scope, id);
	/// 	 this.b = new cloud.Bucket(scope, id);
	/// 	}
	/// }
	/// _toInflight() {
	/// 	const b_client = this._lift(b);
	///  	const self_client_path = require('path').resolve(__dirname, "clients/MyResource.inflight.js");
	///   return $stdlib.core.NodeJsCode.fromInline(`(new (require("${self_client_path}")).MyResource_inflight({b: ${b_client}}))`);
	/// }
	/// MyResource._annotateInflight("my_put", {"this.b": { ops: ["put"]}});
	/// ```
	/// And generated Foo client will go into a file called `clients/Foo.inflight.js` that'll look like this:
	/// ```js
	/// export class Foo_inflight {
	///   constructor({ b }) {
	///     this.b = b;
	///   }
	///   async my_put() {
	///     await this.b.put("foo","bar");
	///   }
	/// }
	/// ```
	fn jsify_class(&mut self, env: &SymbolEnv, class: &AstClass, ctx: &JSifyContext) -> CodeMaker {
		// Lookup the class type
		let class_type = env.lookup(&class.name, None).unwrap().as_type().unwrap();

		// Jsify the inflight side of the class
		let mut inflight_methods = class
			.methods
			.iter()
			.filter(|(_, m)| m.signature.phase == Phase::Inflight)
			.map(|(n, m)| (n, m))
			.collect_vec();

		// add the $inflight_init method to the list of inflight methods
		let inflight_init_name = if class.phase == Phase::Preflight {
			CLASS_INFLIGHT_INIT_NAME
		} else {
			JS_CONSTRUCTOR
		};

		let inflight_init = (&Symbol::global(inflight_init_name), &class.inflight_initializer);
		inflight_methods.push(inflight_init);

		let inflight_fields = class.fields.iter().filter(|f| f.phase == Phase::Inflight).collect_vec();

		// Find all free variables in the class, and return a list of their symbols
		let mut captures = ClassCaptures::scan(&self.types, class);

		if let Some(parent) = &class.parent {
			let parent_type = resolve_user_defined_type(&parent, env, 0).unwrap();
			captures.capture_type(parent.full_path_str_vec(), parent_type);
		}

		// Add bindings for the inflight init
		self.add_inflight_init_refs(&mut captures);

		// create a list of all captured symbols (vars and types).
		let mut all_captures = vec![];

		for v in &captures.free() {
			all_captures.push(v.clone());
		}

		for (f, _) in captures.fields() {
			all_captures.push(f);
		}

		// emit the inflight side of the class into a separate file
		self.jsify_class_inflight(env, &class, &mut captures, &inflight_methods, ctx);

		// if our class is declared within a preflight scope, then we emit the preflight class
		if ctx.phase == Phase::Preflight {
			let mut code = CodeMaker::default();

			// default base class for preflight classes is `core.Resource`
			let extends = if let Some(parent) = &class.parent {
				format!(" extends {}", parent.full_path_str())
			} else {
				format!(" extends {}", STDLIB_CORE_RESOURCE)
			};

			code.open(format!("class {}{extends} {{", class.name.name));

			// emit the preflight constructor
			code.add_code(self.jsify_constructor(
				&class.initializer,
				class.parent.is_none(),
				&inflight_methods,
				&inflight_fields,
				ctx,
			));

			// emit preflight methods
			let preflight_methods = class
				.methods
				.iter()
				.filter(|(_, m)| m.signature.phase != Phase::Inflight)
				.collect_vec();

			for (n, m) in preflight_methods {
				code.add_code(self.jsify_function(Some(&n.name), m, true, ctx));
			}

			// emit the `_toInflightType` static method
			code.add_code(self.jsify_to_inflight_type_method(&class, &captures));

			// emit the `_toInflight` instance method
			code.add_code(self.jsify_to_inflight_instance_method(&class.name, &captures));

			// call `_registerBindObject` to register the class's host binding methods (for type & instance binds).
			code.add_code(self.jsify_register_bind_method(class, &captures, class_type, BindMethod::Instance));
			code.add_code(self.jsify_register_bind_method(class, &captures, class_type, BindMethod::Type));

			code.close("}");

			code
		} else {
			// this is the case where a class was declared within an inflight scope in this case we just
			// emit a const with the same name that `require`s the inflight client code.
			let mut code = CodeMaker::default();

			let client = Self::js_resolve_path(&inflight_filename(class));

			code.line(format!(
				"const {} = require({client})({{{}}});",
				class.name.name,
				all_captures.iter().join(", "),
			));

			code
		}
	}

	fn jsify_constructor(
		&mut self,
		constructor: &FunctionDefinition,
		no_parent: bool,
		inflight_methods: &[(&Symbol, &FunctionDefinition)],
		inflight_fields: &[&ClassField],
		ctx: &JSifyContext,
	) -> CodeMaker {
		let mut code = CodeMaker::default();
		code.open(format!(
			"constructor(scope, id, {}) {{",
			constructor
				.signature
				.parameters
				.iter()
				.map(|p| p.name.to_string())
				.collect_vec()
				.join(", "),
		));

		if no_parent {
			code.line("super(scope, id);");
		}

		if inflight_methods.len() + inflight_fields.len() > 0 {
			let inflight_method_names = inflight_methods.iter().map(|(name, _)| name.name.clone()).collect_vec();
			let inflight_field_names = inflight_fields.iter().map(|f| f.name.name.clone()).collect_vec();
			let inflight_ops_string = inflight_method_names
				.iter()
				.chain(inflight_field_names.iter())
				.map(|name| format!("\"{}\"", name))
				.join(", ");
			code.line(format!("this._addInflightOps({inflight_ops_string});"));
		}

		let init_statements = match &constructor.body {
			FunctionBody::Statements(s) => s,
			FunctionBody::External(_) => panic!("'init' cannot be 'extern'"),
		};

		code.add_code(self.jsify_scope_body(
			&init_statements,
			&JSifyContext {
				in_json: ctx.in_json,
				phase: Phase::Preflight,
			},
		));

		code.close("}");
		code
	}

	/// Emits the `_toInflightType()` static method
	///
	/// Parameters:
	/// - `class` is the class that is being jsified.
	/// - `lifted_objects` is a map from object names to the set of properties that are accessed on that object.
	/// - `captured_types` is the list of types that are referenced in the inflight class.
	fn jsify_to_inflight_type_method(&mut self, class: &AstClass, captures: &ClassCaptures) -> CodeMaker {
		let client_path = Self::js_resolve_path(&inflight_filename(class));

		let mut code = CodeMaker::default();

		code.open("static _toInflightType(context) {"); // TODO: consider removing the context and making _lift a static method

		code.open(format!("return {STDLIB}.core.NodeJsCode.fromInline(`"));

		code.open(format!("require({client_path})({{"));

		// create a _lift() calls for each referenced preflight object
		let lifts = make_lift_args(captures.free_vars());

		for args in lifts {
			code.line(format!(
				"{}: ${{context._lift({}, {})}},",
				args.key, args.field, args.ops
			));
		}

		for (type_name, t) in captures.free_types() {
			let key = mangle(&type_name);
			match &*t {
				Type::Class(_) => {
					code.line(format!("{key}: {type_name}._toInflightType(context);"));
				}
				Type::Enum(e) => {
					code.open(format!("{key}: {STDLIB}.core.NodeJsCode.fromInline(`"));
					code.add_code(self.jsify_enum(&e.values));
					code.close("`),");
				}
				_ => panic!("Unexpected type: \"{t}\" referenced inflight"),
			}
		}

		code.close("})");

		code.close("`);");

		code.close("}");
		code
	}

	fn jsify_to_inflight_instance_method(&mut self, resource_name: &Symbol, captures: &ClassCaptures) -> CodeMaker {
		let mut code = CodeMaker::default();

		code.open("_toInflight() {");

		code.open(format!("return {STDLIB}.core.NodeJsCode.fromInline(`"));

		code.open("(await (async () => {");

		code.line(format!(
			"const {}Client = ${{{}._toInflightType(this).text}};",
			resource_name.name, resource_name.name,
		));

		code.open(format!("const client = new {}Client({{", resource_name.name));

		for args in make_lift_args(captures.fields()) {
			// remove the "this." prefix from the field name
			// let key = field.strip_prefix("this.").unwrap_or(&field);
			code.line(format!("{}: ${{this._lift({}, {})}},", args.key, args.field, args.ops));
		}

		code.close("});");

		code.line(format!(
			"if (client.{CLASS_INFLIGHT_INIT_NAME}) {{ await client.{CLASS_INFLIGHT_INIT_NAME}(); }}"
		));
		code.line("return client;");

		code.close("})())");

		code.close("`);");

		code.close("}");
		code
	}

	// Write a class's inflight to a file
	fn jsify_class_inflight(
		&mut self,
		env: &SymbolEnv,
		class: &AstClass,
		captures: &mut ClassCaptures,
		inflight_methods: &[(&Symbol, &FunctionDefinition)],
		ctx: &JSifyContext,
	) {
		// Handle parent class: Need to call super and pass its captured fields (we assume the parent client is already written)
		let mut lifted_by_parent = vec![];
		if let Some(parent) = &class.parent {
			let parent_type = resolve_user_defined_type(parent, env, 0).unwrap();
			lifted_by_parent.extend(self.get_lifted_fields(parent_type));
		}

		// Get the fields that are lifted by this class but not by its parent, they will be initialized
		// in the generated constructor
		let fields = captures.fields_without_this();
		let field_list = fields.iter().map(|(name, _)| name.clone()).collect_vec().join(", ");
		let my_captures = fields
			.iter()
			.filter(|(name, _)| !lifted_by_parent.iter().any(|n| n == *name))
			.collect_vec();

		let mut class_code = CodeMaker::default();

		let name = &class.name.name;
		class_code.open(format!(
			"class {name}{} {{",
			if let Some(parent) = &class.parent {
				format!(" extends {}", &parent.full_path_str())
			} else {
				"".to_string()
			}
		));

		// if this is a preflight class, emit the binding constructor
		if class.phase == Phase::Preflight {
			class_code.open(format!("{JS_CONSTRUCTOR}({{ {} }}) {{", field_list));

			if class.parent.is_some() {
				class_code.line(format!(
					"super({});",
					lifted_by_parent
						.iter()
						.map(|name| name.clone())
						.collect_vec()
						.join(", ")
				));
			}

			for (name, _) in &my_captures {
				class_code.line(format!("this.{} = {};", name, name));
			}

			// if this class has a "handle" method, we are going to turn it into a callable function
			// so that instances of this class can also be called like regular functions
			if inflight_methods.iter().any(|(name, _)| name.name == HANDLE_METHOD_NAME) {
				class_code.line(format!("const $obj = (...args) => this.{HANDLE_METHOD_NAME}(...args);"));
				class_code.line("Object.setPrototypeOf($obj, this);");
				class_code.line("return $obj;");
			}

			class_code.close("}");
		}

		// class_code.add_code(self.jsify_function(
		// 	Some(inflight_init_name),
		// 	&class.inflight_initializer,
		// 	true,
		// 	&JSifyContext {
		// 		in_json: ctx.in_json,
		// 		phase: class.inflight_initializer.signature.phase,
		// 	},
		// ));

		for (name, def) in inflight_methods {
			class_code.add_code(self.jsify_function(
				Some(&name.name),
				def,
				true,
				&JSifyContext {
					in_json: ctx.in_json,
					phase: def.signature.phase,
				},
			));
		}

		class_code.close("}");

		// export the main class from this file
		let mut code = CodeMaker::default();
		// let inputs = captures.free().iter().join(", ");

		let r = mangle_captures(captures.free());

		code.open(format!("module.exports = function({{ {} }}) {{", r.keys.join(", ")));
		if !r.javascript.is_empty() {
			code.line(r.javascript);
		}

		// destructure captrures into objects that can be referenced cannonically

		code.add_code(class_code);
		code.line(format!("return {name};"));
		code.close("}");

		match self.files.add_file(inflight_filename(class), code.to_string()) {
			Ok(()) => {}
			Err(err) => report_diagnostic(err.into()),
		}
	}

	// Get the type and capture info for fields that are captured in the client of the given resource
	fn get_lifted_fields(&self, class: TypeRef) -> Vec<String> {
		class
			.as_class()
			.unwrap()
			.env
			.iter(true)
			.filter(|(_, kind, _)| {
				let var = kind.as_variable().unwrap();
				// We capture preflight non-reassignable fields
				var.phase != Phase::Inflight && !var.reassignable && var.type_.is_capturable()
			})
			.map(|(name, ..)| name)
			.collect_vec()
	}

	fn jsify_register_bind_method(
		&self,
		class: &AstClass,
		captures: &ClassCaptures,
		class_type: TypeRef,
		bind_method_kind: BindMethod,
	) -> CodeMaker {
		let mut bind_method = CodeMaker::default();
		let (modifier, bind_method_name) = match bind_method_kind {
			BindMethod::Type => ("static ", "_registerTypeBind"),
			BindMethod::Instance => ("", "_registerBind"),
		};

		let class_name = class.name.to_string();
		let all_refs = &captures.refs();
		let refs = all_refs
			.iter()
			.filter(|(m, _)| {
				(*m == CLASS_INFLIGHT_INIT_NAME
					|| !class_type
						.as_class()
						.unwrap()
						.get_method(&m.as_str().into())
						.expect(&format!("method {m} doesn't exist in {class_name}"))
						.is_static)
					^ (matches!(bind_method_kind, BindMethod::Type))
			})
			.collect_vec();

		// Skip jsifying this method if there are no references (in this case we'll use super's register bind method)
		if refs.is_empty() {
			return bind_method;
		}

		bind_method.open(format!("{modifier}{bind_method_name}(host, ops) {{"));
		for (method_name, method_refs) in refs {
			bind_method.open(format!("if (ops.includes(\"{method_name}\")) {{"));
			for (field, ops) in method_refs {
				let ops_strings = ops.iter().map(|op| format!("\"{}\"", op)).join(", ");
				bind_method.line(format!(
					"{class_name}._registerBindObject({field}, host, [{ops_strings}]);",
				));
			}
			bind_method.close("}");
		}
		bind_method.line(format!("super.{bind_method_name}(host, ops);"));
		bind_method.close("}");
		bind_method
	}

	fn add_inflight_init_refs(&self, captures: &mut ClassCaptures) {
		for (var, ops) in captures.vars() {
			for op in ops {
				captures.capture_var(CLASS_INFLIGHT_INIT_NAME, &var, Some(op));
			}
		}
	}
}

fn inflight_filename(class: &AstClass) -> String {
	format!("inflight.{}.js", class.name.name)
}
