pub mod codemaker;
mod tests;
use aho_corasick::AhoCorasick;
use const_format::formatcp;
use indexmap::IndexSet;
use itertools::Itertools;

use std::{borrow::Borrow, cmp::Ordering, path::Path, vec};

use crate::{
	ast::{
		ArgList, BinaryOperator, Class as AstClass, Expr, ExprKind, FunctionBody, FunctionDefinition,
		InterpolatedStringPart, Literal, Phase, Reference, Scope, Stmt, StmtKind, Symbol, TypeAnnotationKind,
		UnaryOperator, UserDefinedType,
	},
	comp_ctx::{CompilationContext, CompilationPhase},
	dbg_panic, debug,
	diagnostic::{report_diagnostic, Diagnostic, WingSpan},
	files::Files,
	type_check::{
		lifts::Lifts, symbol_env::SymbolEnv, ClassLike, Type, TypeRef, Types, VariableKind, CLASS_INFLIGHT_INIT_NAME,
	},
	MACRO_REPLACE_ARGS, MACRO_REPLACE_ARGS_TEXT, MACRO_REPLACE_SELF, WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE,
	WINGSDK_STD_MODULE,
};

use self::codemaker::CodeMaker;

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

pub struct JSifyContext<'a> {
	pub in_json: bool,
	/// The current execution phase of the AST traversal.
	/// The root of any Wing app starts with the preflight phase, and
	/// the `inflight` keyword specifies scopes that are inflight.
	pub phase: Phase,
	pub files: &'a mut Files,
	pub tokens: &'a Lifts,
}

pub struct JSifier<'a> {
	pub types: &'a Types,
	source_files: &'a Files,
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
	pub fn new(
		types: &'a Types,
		source_files: &'a Files,
		app_name: &'a str,
		absolute_project_root: &'a Path,
		shim: bool,
	) -> Self {
		Self {
			types,
			source_files,
			shim,
			app_name,
			absolute_project_root,
		}
	}

	fn get_expr_type(&self, expr: &Expr) -> TypeRef {
		// Safety: JSifier is always run after type checking has finished, so all types should be resolved.
		self.types.get_expr_type(expr).unwrap()
	}

	pub fn jsify(&mut self, scope: &Scope) -> Files {
		CompilationContext::set(CompilationPhase::Jsifying, &scope.span);
		let mut files = Files::default();
		let mut js = CodeMaker::default();
		let mut imports = CodeMaker::default();

		for statement in scope.statements.iter().sorted_by(|a, b| match (&a.kind, &b.kind) {
			// Put type definitions first so JS won't complain of unknown types
			(StmtKind::Class(AstClass { .. }), StmtKind::Class(AstClass { .. })) => Ordering::Equal,
			(StmtKind::Class(AstClass { .. }), _) => Ordering::Less,
			(_, StmtKind::Class(AstClass { .. })) => Ordering::Greater,
			_ => Ordering::Equal,
		}) {
			let mut jsify_context = JSifyContext {
				in_json: false,
				phase: Phase::Preflight,
				files: &mut files,
				tokens: &Lifts::disabled(),
			};
			let s = self.jsify_statement(scope.env.borrow().as_ref().unwrap(), statement, &mut jsify_context); // top level statements are always preflight
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

		match files.add_file(PREFLIGHT_FILE_NAME, output.to_string()) {
			Ok(()) => {}
			Err(err) => report_diagnostic(err.into()),
		}

		files
	}

	// /// Write all files to the output directory
	// pub fn emit_files(&mut self, out_dir: &Path) {
	// 	match self.emitted_files.emit_files(out_dir) {
	// 		Ok(()) => {}
	// 		Err(err) => report_diagnostic(err.into()),
	// 	}
	// }

	fn jsify_scope_body(&self, scope: &Scope, ctx: &mut JSifyContext) -> CodeMaker {
		CompilationContext::set(CompilationPhase::Jsifying, &scope.span);
		let mut code = CodeMaker::default();

		for statement in scope.statements.iter() {
			let statement_code = self.jsify_statement(scope.env.borrow().as_ref().unwrap(), statement, ctx);
			code.add_code(statement_code);
		}

		code
	}

	pub fn jsify_reference(&self, reference: &Reference, ctx: &mut JSifyContext) -> String {
		match reference {
			Reference::Identifier(identifier) => identifier.to_string(),
			Reference::InstanceMember {
				object,
				property,
				optional_accessor: _,
			} => self.jsify_expression(object, ctx) + "." + &property.to_string(),
			Reference::TypeReference(udt) => self.jsify_type(&TypeAnnotationKind::UserDefined(udt.clone())),
			Reference::TypeMember { typeobject, property } => {
				let typename = self.jsify_expression(typeobject, ctx);
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

	fn jsify_type(&self, typ: &TypeAnnotationKind) -> String {
		match typ {
			TypeAnnotationKind::UserDefined(t) => self.jsify_user_defined_type(&t),
			_ => todo!(),
		}
	}

	fn jsify_user_defined_type(&self, udt: &UserDefinedType) -> String {
		udt.full_path_str()
	}

	pub fn jsify_expression(&self, expression: &Expr, ctx: &mut JSifyContext) -> String {
		CompilationContext::set(CompilationPhase::Jsifying, &expression.span);

		// if we are in inflight and there's a lifting/capturing token associated with this expression
		// then emit the token instead of the expression.
		if ctx.phase == Phase::Inflight {
			if let Some(t) = ctx.tokens.token_for_expr(&expression.id) {
				return t.clone();
			}
		}

		// if we are in preflight phase and we see an inflight expression (which is not "this."), then
		// this is an error. this can happen if we render a lifted preflight expression that references
		// an e.g. variable from inflight (`myarr.get(i)` where `myarr` is preflight and `i` is an
		// inflight variable). in this case we need to bail out.
		if ctx.phase == Phase::Preflight {
			if let Some(expr_phase) = self.types.get_expr_phase(expression) {
				if expr_phase == Phase::Inflight && !self.is_this(expression) {
					report_diagnostic(Diagnostic {
						message: "Cannot reference an inflight value from within a preflight expression".to_string(),
						span: Some(expression.span.clone()),
					});

					return "<ERROR>".to_string();
				}
			}
		}

		let auto_await = match ctx.phase {
			Phase::Inflight => "await ",
			_ => "",
		};
		match &expression.kind {
			ExprKind::New {
				class,
				obj_id,
				arg_list,
				obj_scope
			} => {
				let expression_type = self.get_expr_type(&expression);
				let is_preflight_class = expression_type.is_preflight_class();

				let class_type = if let Some(class_type) = expression_type.as_class() { class_type } else {
					return "".to_string();
				};
				let is_abstract = class_type.is_abstract;

				// if we have an FQN, we emit a call to the "new" (or "newAbstract") factory method to allow
				// targets and plugins to inject alternative implementations for types. otherwise (e.g.
				// user-defined types), we simply instantiate the type directly (maybe in the future we will
				// allow customizations of user-defined types as well, but for now we don't).

				let ctor = self.jsify_expression(class, ctx);

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
							InterpolatedStringPart::Expr(e) => Some(match *self.get_expr_type(e) {
								Type::Json | Type::MutJson => {
									format!("((e) => typeof e === 'string' ? e : JSON.stringify(e, null, 2))({})", self.jsify_expression(e, ctx))
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
				let expr_string = self.jsify_expression(callee, ctx);
				let args_string = self.jsify_arg_list(&arg_list, None, None, ctx);
				let mut args_text_string = lookup_span(&arg_list.span, &self.source_files);
				if args_text_string.len() > 0 {
					// remove the parens
					args_text_string = args_text_string[1..args_text_string.len() - 1].to_string();
				}
				let args_text_string = escape_javascript_string(&args_text_string);

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
						let patterns = &[MACRO_REPLACE_SELF, MACRO_REPLACE_ARGS, MACRO_REPLACE_ARGS_TEXT];
						let replace_with = &[self_string, &args_string, &args_text_string];
						let ac = AhoCorasick::new(patterns);
						return ac.replace_all(js_override, replace_with);
					}
				}

				// NOTE: if the expression is a "handle" class, the object itself is callable (see
				// `jsify_class_inflight` below), so we can just call it as-is.
				format!("({auto_await}{expr_string}({args_string}))")
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
				let json_context = &mut JSifyContext {
					in_json: true,
					phase: ctx.phase,
					files: ctx.files,
					tokens: ctx.tokens,
				};
				let js_out = match &element.kind {
					ExprKind::JsonMapLiteral { .. } => {
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
      ExprKind::JsonMapLiteral { fields } => {
        let f = fields
					.iter()
					.map(|(key, expr)| format!("\"{}\":{}", key, self.jsify_expression(expr, ctx)))
					.collect::<Vec<String>>()
					.join(",");

        format!("{{{}}}", f)
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
			ExprKind::FunctionClosure(func_def) => self.jsify_function(None, func_def, false, ctx).to_string(),
			ExprKind::CompilerDebugPanic => {
				// Handle the debug panic expression (during jsifying)
				dbg_panic!();
				"".to_string()
			},
		}
	}

	fn jsify_statement(&self, env: &SymbolEnv, statement: &Stmt, ctx: &mut JSifyContext) -> CodeMaker {
		CompilationContext::set(CompilationPhase::Jsifying, &statement.span);
		match &statement.kind {
			StmtKind::SuperConstructor { arg_list } => {
				let args = self.jsify_arg_list(&arg_list, None, None, ctx);
				match ctx.phase {
					Phase::Preflight => CodeMaker::one_line(format!("super(scope,id,{});", args)),
					_ => CodeMaker::one_line(format!("super({});", args)),
				}
			}
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
				self.jsify_expression(variable, ctx),
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
			StmtKind::CompilerDebugEnv => CodeMaker::default(),
		}
	}

	fn jsify_enum(&self, values: &IndexSet<Symbol>) -> CodeMaker {
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
		&self,
		class: Option<&AstClass>,
		func_def: &FunctionDefinition,
		is_static: bool,
		ctx: &mut JSifyContext,
	) -> String {
		let mut parameter_list = vec![];

		for p in &func_def.signature.parameters {
			parameter_list.push(p.name.to_string());
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
		let mut prefix = vec![];

		if func_def.is_static && is_static {
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

		// is prefix is empty it means this is a closure, so we need to wrap it in `(`, `)`.
		if prefix.is_empty() {
			format!("({})", code.to_string().trim().to_string())
		} else {
			code.to_string()
		}
	}

	fn jsify_class(&self, env: &SymbolEnv, class: &AstClass, ctx: &mut JSifyContext) -> CodeMaker {
		let ctx = &mut JSifyContext {
			in_json: ctx.in_json,
			phase: ctx.phase,
			files: ctx.files,
			tokens: &class.lifts,
		};

		// Lookup the class type
		let class_type = env.lookup(&class.name, None).unwrap().as_type().unwrap();

		// emit the inflight side of the class into a separate file
		self.jsify_class_inflight(&class, ctx);

		// if our class is declared within a preflight scope, then we emit the preflight class
		if ctx.phase == Phase::Preflight {
			let mut code = CodeMaker::default();

			// default base class for preflight classes is `core.Resource`
			let extends = if let Some(parent) = &class.parent {
				let base = if let Some(udt) = parent.as_type_reference() {
					self.jsify_user_defined_type(udt)
				} else {
					// this is likely a bug in the compiler, but we'll just emit the name as-is
					self.jsify_expression(parent, ctx)
				};

				format!(" extends {}", base)
			} else {
				format!(" extends {}", STDLIB_CORE_RESOURCE)
			};

			code.open(format!("class {}{extends} {{", class.name.name));

			// emit the preflight constructor
			code.add_code(self.jsify_preflight_constructor(&class, ctx));

			// emit preflight methods
			for m in class.preflight_methods(false) {
				code.line(self.jsify_function(Some(class), m, true, ctx));
			}

			// emit the `_toInflightType` static method
			code.add_code(self.jsify_to_inflight_type_method(&class, &class.lifts));

			// emit the `_toInflight` instance method
			code.add_code(self.jsify_to_inflight_method(&class.name, &class.lifts));

			// call `_registerBindObject` to register the class's host binding methods (for type & instance binds).
			code.add_code(self.jsify_register_bind_method(class, &class.lifts, class_type, BindMethod::Instance));
			code.add_code(self.jsify_register_bind_method(class, &class.lifts, class_type, BindMethod::Type));

			code.close("}");

			code
		} else {
			// this is the case where a class was declared within an inflight scope in this case we just
			// emit a const with the same name that `require`s the inflight client code.
			let mut code = CodeMaker::default();

			let client = inflight_filename(class);

			code.line(format!(
				"const {} = require(\"{client}\")({{{}}});",
				class.name.name,
				class.lifts.all_capture_tokens().iter().join(", "),
			));

			code
		}
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

		// we always need a super() call because even if the class doesn't have an explicit parent, it
		// will inherit from core.Resource.
		if !super_called {
			code.line("super(scope, id);");
		}

		// We must jsify the statements in the constructor before adding any additional code blew
		// this is to ensure if there are calls to super constructor within the statements,
		// they will be jsified before any attempts to call `this` are made.
		code.add_code(self.jsify_scope_body(&init_statements, ctx));

		let inflight_fields = class.inflight_fields();
		let inflight_methods = class.inflight_methods(true);

		if inflight_fields.len() + inflight_methods.len() > 0 {
			let inflight_method_names = inflight_methods
				.iter()
				.filter_map(|m| m.name.clone())
				.map(|s| s.name)
				.collect_vec();

			let inflight_field_names = inflight_fields.iter().map(|f| f.name.name.clone()).collect_vec();
			let inflight_ops_string = inflight_method_names
				.iter()
				.chain(inflight_field_names.iter())
				.map(|name| format!("\"{}\"", name))
				.join(", ");
			code.line(format!("this._addInflightOps({inflight_ops_string});"));
		}

		code.close("}");
		code
	}

	fn jsify_to_inflight_type_method(&self, class: &AstClass, icc: &Lifts) -> CodeMaker {
		let client_path = inflight_filename(class);

		let mut code = CodeMaker::default();

		code.open("static _toInflightType(context) {"); // TODO: consider removing the context and making _lift a static method

		code.open(format!("return {STDLIB}.core.NodeJsCode.fromInline(`"));

		code.open(format!("require(\"{client_path}\")({{"));

		for capture in icc.captures() {
			let preflight = capture.code.clone();
			let lift_type = format!("context._lift({})", preflight);
			code.line(format!("{}: ${{{}}},", capture.inflight, lift_type));
		}

		code.close("})");

		code.close("`);");

		code.close("}");
		code
	}

	fn jsify_to_inflight_method(&self, resource_name: &Symbol, icc: &Lifts) -> CodeMaker {
		let captured_fields = icc.lifted_fields();
		let mut code = CodeMaker::default();

		code.open("_toInflight() {");

		code.open(format!("return {STDLIB}.core.NodeJsCode.fromInline(`"));

		code.open("(await (async () => {");

		code.line(format!(
			"const {}Client = ${{{}._toInflightType(this).text}};",
			resource_name.name, resource_name.name,
		));

		code.open(format!("const client = new {}Client({{", resource_name.name));

		for (field, obj) in captured_fields {
			code.line(format!("{field}: ${{this._lift({obj})}},"));
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
	fn jsify_class_inflight(&self, class: &AstClass, ctx: &mut JSifyContext) {
		let mut ctx = JSifyContext {
			phase: Phase::Inflight,
			in_json: false,
			files: ctx.files,
			tokens: ctx.tokens,
		};

		let mut class_code = CodeMaker::default();

		let name = &class.name.name;
		class_code.open(format!(
			"class {name}{} {{",
			if let Some(parent) = &class.parent {
				format!(" extends {}", self.jsify_expression(&parent, &mut ctx))
			} else {
				"".to_string()
			}
		));

		for def in class.inflight_methods(false) {
			class_code.line(self.jsify_function(Some(class), def, true, &mut ctx));
		}

		// if this is a preflight class, emit the binding constructor
		if class.phase == Phase::Preflight {
			self.jsify_inflight_binding_constructor(class, &mut class_code);
		}

		// emit the $inflight_init function (if it has a body).
		if let FunctionBody::Statements(s) = &class.inflight_initializer.body {
			if !s.statements.is_empty() {
				class_code.line(self.jsify_function(Some(class), &class.inflight_initializer, true, &mut ctx));
			}
		}

		class_code.close("}");

		let all_captures = class.lifts.all_capture_tokens();

		// export the main class from this file
		let mut code = CodeMaker::default();
		let inputs = all_captures.iter().join(", ");
		code.open(format!("module.exports = function({{ {inputs} }}) {{"));
		code.add_code(class_code);
		code.line(format!("return {name};"));
		code.close("}");

		let fname = inflight_filename(class);
		match ctx.files.add_file(fname, code.to_string()) {
			Ok(()) => {}
			Err(err) => report_diagnostic(err.into()),
		}
	}

	fn jsify_inflight_binding_constructor(&self, class: &AstClass, class_code: &mut CodeMaker) {
		let lifted_by_parent: Vec<String> = vec![];
		// // Add bindings for the inflight init
		// self.add_inflight_init_lifts(&mut icc, &lifted_fields);

		// Get the fields that are lifted by this class but not by its parent, they will be initialized
		// in the generated constructor
		let lifted_fields = class.lifts.lifted_fields();
		let my_captures = lifted_fields
			.iter()
			.map(|(f, _)| f)
			.filter(|name| !lifted_by_parent.iter().any(|n| *n == **name))
			.collect_vec();

		class_code.open(format!(
			"{JS_CONSTRUCTOR}({{ {} }}) {{",
			lifted_fields
				.iter()
				.map(|(name, _)| { name.clone() })
				.collect_vec()
				.join(", ")
		));

		if class.parent.is_some() {
			class_code.line(format!(
				"super({{{}}});",
				lifted_by_parent
					.iter()
					.map(|name| name.clone())
					.collect_vec()
					.join(", ")
			));
		}

		for name in &my_captures {
			class_code.line(format!("this.{} = {};", name, name));
		}

		// if this class has a "handle" method, we are going to turn it into a callable function
		// so that instances of this class can also be called like regular functions
		if let Some(handle) = class.handle_method() {
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
		icc: &Lifts,
		class_type: TypeRef,
		bind_method_kind: BindMethod,
	) -> CodeMaker {
		let mut bind_method = CodeMaker::default();
		let (modifier, bind_method_name) = match bind_method_kind {
			BindMethod::Type => ("static ", "_registerTypeBind"),
			BindMethod::Instance => ("", "_registerBind"),
		};

		let class_name = class.name.to_string();

		let lifts_per_method = icc.lifts_per_method();
		let lifts = lifts_per_method
			.iter()
			.filter(|(m, _)| {
				let var_kind = class_type
					.as_class()
					.unwrap()
					.get_method(&m.as_str().into())
					.expect(&format!("method {m} doesn't exist in {class_name}"))
					.kind;
				let is_static = matches!(var_kind, VariableKind::StaticMember);
				(*m == CLASS_INFLIGHT_INIT_NAME || !is_static) ^ (matches!(bind_method_kind, BindMethod::Type))
			})
			.collect_vec();

		// Skip jsifying this method if there are no lifts (in this case we'll use super's register bind method)
		if icc.lifts().is_empty() {
			return bind_method;
		}

		bind_method.open(format!("{modifier}{bind_method_name}(host, ops) {{"));
		for (method_name, method_lifts) in lifts {
			bind_method.open(format!("if (ops.includes(\"{method_name}\")) {{"));
			for lift in method_lifts {
				let ops_strings = lift.ops.iter().map(|op| format!("\"{}\"", op)).join(", ");
				let field = lift.code.clone();

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
	fn is_this(&self, expression: &Expr) -> bool {
		let ExprKind::Reference(ref r) = expression.kind else {
			return false;
		};

		let Reference::Identifier(i) = r else {
			return false;
		};

		i.name == "this"
	}
}

fn inflight_filename(class: &AstClass) -> String {
	format!("./inflight.{}.js", class.name.name)
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
