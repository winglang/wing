mod codemaker;

use aho_corasick::AhoCorasick;
use const_format::formatcp;
use indexmap::{indexmap, indexset, IndexMap, IndexSet};
use itertools::Itertools;

use std::{
	cmp::Ordering,
	collections::{BTreeMap, BTreeSet},
	fmt::Display,
	fs,
	path::Path,
	slice::Iter,
	vec,
};

use crate::{
	ast::{
		ArgList, BinaryOperator, Class as AstClass, ClassField, Expr, ExprKind, FunctionBody, FunctionDefinition,
		InterpolatedStringPart, Literal, Phase, Reference, Scope, Stmt, StmtKind, Symbol, TypeAnnotation,
		TypeAnnotationKind, UnaryOperator, UserDefinedType,
	},
	debug,
	diagnostic::{Diagnostic, Diagnostics, WingSpan},
	type_check::{
		resolve_user_defined_type,
		symbol_env::{LookupResult, SymbolEnv, SymbolEnvRef},
		ClassLike, SymbolKind, Type, TypeRef, UnsafeRef, VariableInfo, CLASS_INFLIGHT_INIT_NAME, HANDLE_METHOD_NAME,
	},
	visit::{self, Visit},
	MACRO_REPLACE_ARGS, MACRO_REPLACE_SELF, WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE, WINGSDK_STD_MODULE,
};

use self::codemaker::CodeMaker;

const STDLIB: &str = "$stdlib";
const STDLIB_CORE_RESOURCE: &str = formatcp!("{}.{}", STDLIB, WINGSDK_RESOURCE);
const STDLIB_MODULE: &str = WINGSDK_ASSEMBLY_NAME;

const INFLIGHT_CLIENTS_DIR: &str = "clients";

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
	pub diagnostics: Diagnostics,
	pub out_dir: &'a Path,
	absolute_project_root: &'a Path,
	shim: bool,
	app_name: String,
}

/// Preflight classes have two types of host binding methods:
/// `Type` for binding static fields and methods to the host and
/// `instance` for binding instance fields and methods to the host.
enum BindMethod {
	Type,
	Instance,
}

impl<'a> JSifier<'a> {
	pub fn new(out_dir: &'a Path, app_name: &str, absolute_project_root: &'a Path, shim: bool) -> Self {
		Self {
			diagnostics: Diagnostics::new(),
			out_dir,
			shim,
			app_name: app_name.to_string(),
			absolute_project_root,
		}
	}

	fn js_resolve_path(path_name: &str) -> String {
		format!("\"./{}\"", path_name.replace("\\", "/"))
	}

	pub fn jsify(&mut self, scope: &Scope) -> String {
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

		output.to_string()
	}

	fn jsify_scope_body(&mut self, scope: &Scope, ctx: &JSifyContext) -> CodeMaker {
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
			Reference::TypeMember { type_, property } => {
				self.jsify_type(&TypeAnnotationKind::UserDefined(type_.clone())) + "." + &property.to_string()
			}
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

	fn jsify_type(&self, typ: &TypeAnnotationKind) -> String {
		match typ {
			TypeAnnotationKind::UserDefined(user_defined_type) => self.jsify_user_defined_type(user_defined_type),
			_ => todo!(),
		}
	}

	fn jsify_user_defined_type(&self, user_defined_type: &UserDefinedType) -> String {
		if user_defined_type.fields.is_empty() {
			return user_defined_type.root.to_string();
		} else {
			format!(
				"{}.{}",
				user_defined_type.root,
				user_defined_type
					.fields
					.iter()
					.map(|f| f.to_string())
					.collect_vec()
					.join(".")
			)
		}
	}

	fn jsify_expression(&mut self, expression: &Expr, ctx: &JSifyContext) -> String {
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
				let expression_type = expression.evaluated_type.borrow();
				let is_preflight_class = if let Some(evaluated_type) = expression_type.as_ref() {
					evaluated_type.is_preflight_class()
				} else {
					// TODO Hack: This object type is not known. How can we tell if it's a resource or not?
					true
				};

				let is_abstract = if let Some(cls) = expression_type.unwrap().as_class() {
					cls.is_abstract
				} else {
					false
				};

				// if we have an FQN, we emit a call to the "new" (or "newAbstract") factory method to allow
				// targets and plugins to inject alternative implementations for types. otherwise (e.g.
				// user-defined types), we simply instantiate the type directly (maybe in the future we will
				// allow customizations of user-defined types as well, but for now we don't).

				let ctor = self.jsify_type(&class.kind);

				let scope = if is_preflight_class { Some("this") } else { None };

				let id = if is_preflight_class {
					Some(obj_id.as_ref().unwrap_or(&ctor).as_str())
				} else {
					None
				};

				let args = self.jsify_arg_list(&arg_list, scope, id, ctx);

				let fqn = expression_type.expect("expression").as_class().expect("class").fqn.clone();
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
								match *e.evaluated_type.borrow().expect("Should have type") {
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
				let function_type = callee.evaluated_type.borrow().unwrap();
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

				if is_mutable_collection(expression) || ctx.in_json {
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

				if is_mutable_collection(expression) || ctx.in_json {
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

				if is_mutable_collection(expression) {
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
		}
	}

	fn jsify_statement(&mut self, env: &SymbolEnv, statement: &Stmt, ctx: &JSifyContext) -> CodeMaker {
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
							self.diagnostics.push(Diagnostic {
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
		let inflight_methods = class
			.methods
			.iter()
			.filter(|(_, m)| m.signature.phase == Phase::Inflight)
			.collect_vec();

		let inflight_fields = class.fields.iter().filter(|f| f.phase == Phase::Inflight).collect_vec();

		// Find all free variables in the class, and return a list of their symbols
		let (captured_types, captured_vars) = self.scan_captures(class, &inflight_methods);

		// Get all references between inflight methods and preflight values
		let mut refs = self.find_inflight_references(class, &captured_vars);

		// Get fields to be captured by resource's client
		let captured_fields = self.get_capturable_field_names(class_type);

		// Add bindings for the inflight init
		self.add_inflight_init_refs(&mut refs, &captured_fields, &captured_vars);

		// emit the inflight side of the class into a separate file
		self.jsify_class_inflight(
			env,
			&class,
			&captured_fields,
			&inflight_methods,
			captured_vars.iter().chain(captured_types.iter().map(|(n, _)| n)),
			ctx,
		);

		// if our class is declared within a preflight scope, then we emit the preflight class
		if ctx.phase == Phase::Preflight {
			let mut code = CodeMaker::default();

			// default base class for preflight classes is `core.Resource`
			let extends = if let Some(parent) = &class.parent {
				format!(" extends {}", self.jsify_user_defined_type(parent))
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
			code.add_code(self.jsify_to_inflight_type_method(&class, &captured_vars, &captured_types));

			// emit the `_toInflight` instance method
			code.add_code(self.jsify_toinflight_method(&class.name, &captured_fields));

			// call `_registerBindObject` to register the class's host binding methods (for type & instance binds).
			code.add_code(self.jsify_register_bind_method(class, &refs, class_type, BindMethod::Instance));
			code.add_code(self.jsify_register_bind_method(class, &refs, class_type, BindMethod::Type));

			code.close("}");

			code
		} else {
			// this is the case where a class was declared within an inflight scope in this case we just
			// emit a const with the same name that `require`s the inflight client code.
			let mut code = CodeMaker::default();

			let client = Self::js_resolve_path(&inflight_filename(class));

			// capture list is basically the union of type and var capture names
			let mut captures = captured_vars.iter().collect_vec();
			captures.extend(captured_types.iter().map(|f| f.0).collect_vec());

			let captures = captures.iter().join(",");

			code.line(format!(
				"const {} = require({client})({{{captures}}});",
				class.name.name
			));

			code
		}
	}

	fn jsify_constructor(
		&mut self,
		constructor: &FunctionDefinition,
		no_parent: bool,
		inflight_methods: &[&(Symbol, FunctionDefinition)],
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

	fn jsify_to_inflight_type_method(
		&mut self,
		class: &AstClass,
		free_inflight_variables: &IndexSet<String>,
		referenced_preflight_types: &IndexMap<String, TypeRef>,
	) -> CodeMaker {
		let client_path = Self::js_resolve_path(&format!("{INFLIGHT_CLIENTS_DIR}/{}", inflight_filename(class)));

		let mut code = CodeMaker::default();

		code.open("static _toInflightType(context) {"); // TODO: consider removing the context and making _lift a static method

		code.line(format!("const self_client_path = {client_path};"));

		// create an inflight client for each object that is captured from the environment
		for var_name in free_inflight_variables {
			code.line(format!("const {var_name}_client = context._lift({var_name});",));
		}

		// create an inflight type for each referenced preflight type
		for (n, t) in referenced_preflight_types {
			match &**t {
				Type::Class(_) => {
					code.line(format!("const {n}Client = {n}._toInflightType(context);"));
				}
				Type::Enum(e) => {
					code.open(format!("const {n}Client = {STDLIB}.core.NodeJsCode.fromInline(`"));
					code.add_code(self.jsify_enum(&e.values));
					code.close("`);");
				}
				_ => panic!("Unexpected type: \"{t}\" referenced inflight"),
			}
		}

		code.open(format!("return {STDLIB}.core.NodeJsCode.fromInline(`"));

		code.open("require(\"${self_client_path}\")({");
		for var_name in free_inflight_variables {
			code.line(format!("{var_name}: ${{{var_name}_client}},"));
		}
		for (type_name, _) in referenced_preflight_types {
			code.line(format!("{type_name}: ${{{type_name}Client.text}},"));
		}
		code.close("})");

		code.close("`);");

		code.close("}");
		code
	}

	fn jsify_toinflight_method(&mut self, resource_name: &Symbol, captured_fields: &[String]) -> CodeMaker {
		let mut code = CodeMaker::default();

		code.open("_toInflight() {");

		// create an inflight client for each "child" object
		for inner_member_name in captured_fields {
			code.line(format!(
				"const {}_client = this._lift(this.{});",
				inner_member_name, inner_member_name,
			));
		}

		code.open(format!("return {STDLIB}.core.NodeJsCode.fromInline(`"));

		code.open("(await (async () => {");

		code.line(format!(
			"const {}Client = ${{{}._toInflightType(this).text}};",
			resource_name.name, resource_name.name,
		));

		code.open(format!("const client = new {}Client({{", resource_name.name));

		for inner_member_name in captured_fields {
			code.line(format!("{inner_member_name}: ${{{inner_member_name}_client}},"));
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

	/// Scan all inflight methods in a class and extract the names of all the types and variables that
	/// are defined outside of this method.
	fn scan_captures(
		&mut self,
		class: &AstClass,
		inflight_methods: &[&(Symbol, FunctionDefinition)],
	) -> (IndexMap<String, TypeRef>, IndexSet<String>) {
		let mut types = indexmap![];
		let mut vars = indexset![];

		for (_, m) in inflight_methods {
			if let FunctionBody::Statements(scope) = &m.body {
				let mut visitor = CaptureScanner::new(scope);
				visitor.scan();

				types.extend(visitor.captured_types);
				vars.extend(visitor.captured_vars);
				self.diagnostics.extend(visitor.diagnostics);
			}
		}
		// Remove myself from the list of referenced preflight types because I don't need to import myself
		types.remove(&class.name.name);
		(types, vars)
	}

	// Write a class's inflight to a file
	fn jsify_class_inflight(
		&mut self,
		env: &SymbolEnv,
		class: &AstClass,
		captured_fields: &[String],
		inflight_methods: &[&(Symbol, FunctionDefinition)],
		input_symbols: impl Iterator<Item = impl Display>,
		ctx: &JSifyContext,
	) {
		// Handle parent class: Need to call super and pass its captured fields (we assume the parent client is already written)
		let mut parent_captures = vec![];
		if let Some(parent) = &class.parent {
			let parent_type = resolve_user_defined_type(parent, env, 0).unwrap();
			parent_captures.extend(self.get_capturable_field_names(parent_type));
		}

		// Get the fields that are captured by this resource but not by its parent, they will be initialized in the generated constructor
		let my_captures = captured_fields
			.iter()
			.filter(|name| !parent_captures.iter().any(|n| n == *name))
			.collect_vec();

		let mut class_code = CodeMaker::default();

		let name = &class.name.name;
		class_code.open(format!(
			"class {name}{} {{",
			if let Some(parent) = &class.parent {
				format!(" extends {}", self.jsify_user_defined_type(parent))
			} else {
				"".to_string()
			}
		));

		// if this is a preflight class, emit the binding constructor
		if class.phase == Phase::Preflight {
			class_code.open(format!(
				"{JS_CONSTRUCTOR}({{ {} }}) {{",
				captured_fields
					.iter()
					.map(|name| { name.clone() })
					.collect_vec()
					.join(", ")
			));

			if class.parent.is_some() {
				class_code.line(format!(
					"super({});",
					parent_captures.iter().map(|name| name.clone()).collect_vec().join(", ")
				));
			}

			for name in &my_captures {
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

		let inflight_init_name = if class.phase == Phase::Preflight {
			CLASS_INFLIGHT_INIT_NAME
		} else {
			JS_CONSTRUCTOR
		};

		class_code.add_code(self.jsify_function(
			Some(inflight_init_name),
			&class.inflight_initializer,
			true,
			&JSifyContext {
				in_json: ctx.in_json,
				phase: class.inflight_initializer.signature.phase,
			},
		));

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
		let inputs = input_symbols.map(|i| format!("{}", i)).collect_vec().join(", ");
		code.open(format!("module.exports = function({{ {inputs} }}) {{"));
		code.add_code(class_code);
		code.line(format!("return {name};"));
		code.close("}");

		let clients_dir = format!("{}/{INFLIGHT_CLIENTS_DIR}", self.out_dir.to_string_lossy());
		fs::create_dir_all(&clients_dir).expect("Creating inflight clients");
		let client_file_name = inflight_filename(class);
		let relative_file_path = format!("{}/{}", clients_dir, client_file_name);
		fs::write(&relative_file_path, code.to_string()).expect("Writing client inflight source");
	}

	/// Get the type and capture info for fields that are captured in the client of the given resource
	/// Returns a map from method name to a map from field name to a set of operations
	fn find_inflight_references(
		&mut self,
		resource_class: &AstClass,
		free_vars: &IndexSet<String>,
	) -> BTreeMap<String, BTreeMap<String, BTreeSet<String>>> {
		let inflight_methods = resource_class
			.methods
			.iter()
			.filter(|(_, m)| m.signature.phase == Phase::Inflight);

		let mut result = BTreeMap::new();

		for (method_name, function_def) in inflight_methods {
			// visit statements of method and find all references to fields ("this.xxx")
			let visitor = FieldReferenceVisitor::new(&function_def, free_vars);
			let (refs, find_diags) = visitor.find_refs();

			self.diagnostics.extend(find_diags);

			// add the references to the result
			result.insert(method_name.name.clone(), refs);
		}

		// Also add field rerferences from the inflight initializer
		let visitor = FieldReferenceVisitor::new(&resource_class.inflight_initializer, free_vars);
		let (refs, find_diags) = visitor.find_refs();

		self.diagnostics.extend(find_diags);

		result.insert(CLASS_INFLIGHT_INIT_NAME.to_string(), refs);

		return result;
	}

	// Get the type and capture info for fields that are captured in the client of the given resource
	fn get_capturable_field_names(&self, resource_type: TypeRef) -> Vec<String> {
		resource_type
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
		refs: &BTreeMap<String, BTreeMap<String, BTreeSet<String>>>,
		class_type: TypeRef,
		bind_method_kind: BindMethod,
	) -> CodeMaker {
		let mut bind_method = CodeMaker::default();
		let (modifier, bind_method_name) = match bind_method_kind {
			BindMethod::Type => ("static ", "_registerTypeBind"),
			BindMethod::Instance => ("", "_registerBind"),
		};

		let class_name = class.name.to_string();
		let refs = refs
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

	fn add_inflight_init_refs(
		&self,
		refs: &mut BTreeMap<String, BTreeMap<String, BTreeSet<String>>>,
		captured_fields: &[String],
		free_vars: &IndexSet<String>,
	) {
		let init_refs_entry = refs.entry(CLASS_INFLIGHT_INIT_NAME.to_string()).or_default();

		// All captured fields are needed in the inflight init method
		for field in captured_fields {
			init_refs_entry.entry(format!("this.{field}")).or_default();
		}

		// All free variables are needed in the inflight init method
		for free_var in free_vars {
			init_refs_entry.entry(free_var.clone()).or_default();
		}
	}
}

fn is_mutable_collection(expression: &Expr) -> bool {
	if let Some(evaluated_type) = expression.evaluated_type.borrow().as_ref() {
		evaluated_type.is_mutable_collection()
	} else {
		false
	}
}

/// Analysizes a resource inflight method and returns a list of fields that are referenced from the
/// method and which operations are performed on them.
struct FieldReferenceVisitor<'a> {
	/// The key is field name, value is a list of operations performed on this field
	references: BTreeMap<String, BTreeSet<String>>,

	/// The resource type's symbol env (used to resolve field types)
	function_def: &'a FunctionDefinition,

	/// A list of free variables preloaded into the visitor. Whenever the visitor encounters a
	/// reference to a free variable, it will be added to list of references since the
	/// resource needs to bind to it.
	free_vars: &'a IndexSet<String>,

	/// The current symbol env, option just so we can initialize it to None
	env: Option<SymbolEnvRef>,

	/// The current statement index
	statement_index: usize,

	diagnostics: Diagnostics,
}

impl<'a> FieldReferenceVisitor<'a> {
	pub fn new(function_def: &'a FunctionDefinition, free_vars: &'a IndexSet<String>) -> Self {
		Self {
			references: BTreeMap::new(),
			function_def,
			diagnostics: Diagnostics::new(),
			env: None,
			free_vars,
			statement_index: 0,
		}
	}

	pub fn find_refs(mut self) -> (BTreeMap<String, BTreeSet<String>>, Diagnostics) {
		if let FunctionBody::Statements(statements) = &self.function_def.body {
			self.visit_scope(statements);
		}
		(self.references, self.diagnostics)
	}
}

impl<'ast> Visit<'ast> for FieldReferenceVisitor<'ast> {
	fn visit_scope(&mut self, node: &'ast Scope) {
		let backup_env = self.env;
		self.env = Some(node.env.borrow().as_ref().unwrap().get_ref());
		visit::visit_scope(self, node);
		self.env = backup_env;
	}

	fn visit_stmt(&mut self, node: &'ast Stmt) {
		self.statement_index = node.idx;
		visit::visit_stmt(self, node);
	}

	fn visit_expr(&mut self, node: &'ast Expr) {
		let parts = self.analyze_expr(node);

		let is_field_reference = match parts.first() {
			Some(first) => first.text == "this" && parts.len() > 1,
			None => false,
		};

		let is_free_var = match parts.first() {
			// TODO: chnge this "==" to make sure first.symbol is the same variable definition as something in free_vars
			// todo this i'll need to have a "unique id" on the variable definition stored in the environment and then
			// do a lookup for first.symbol and compare the id's
			Some(first) => self.free_vars.iter().any(|v| *v == first.text),
			None => false,
		};

		let is_type_reference = match parts.first() {
			Some(first) => matches!(first.kind, ComponentKind::ClassType(_)),
			None => false,
		};

		if !is_field_reference && !is_free_var && !is_type_reference {
			visit::visit_expr(self, node);
			return;
		}

		let mut index = if is_field_reference {
			// we know i[0] is "this" and that we have at least 2 parts
			1
		} else {
			0
		};

		// iterate over the components of the expression and determine
		// what are we capturing from preflight.
		let mut capture = vec![];

		while index < parts.len() {
			let curr = parts.get(index).unwrap();

			match &curr.kind {
				ComponentKind::Member(variable) => {
					// we have lift off (reached an inflight component)! break our search.
					if variable.phase == Phase::Inflight {
						break;
					}

					// now we need to verify that the component can be captured.
					// (1) non-reassignable
					// (2) capturable type (immutable/resource).

					// if the variable is reassignable, bail out
					if variable.reassignable {
						self.diagnostics.push(Diagnostic {
							message: format!("Cannot capture reassignable field '{curr}'"),
							span: Some(curr.span.clone()),
						});

						return;
					}

					// if this type is not capturable, bail out
					if !variable.type_.is_capturable() {
						self.diagnostics.push(Diagnostic {
							message: format!(
								"Cannot capture field '{curr}' with non-capturable type '{}'",
								variable.type_
							),
							span: Some(curr.span.clone()),
						});

						return;
					}

					// okay, so we have a non-reassignable, capturable type.
					// one more special case is collections. we currently only support
					// collections which do not include resources because we cannot
					// qualify the capture.
					if let Some(inner_type) = variable.type_.collection_item_type() {
						if inner_type.is_preflight_class() {
							self.diagnostics.push(Diagnostic {
								message: format!(
									"Capturing collection of preflight classes is not supported yet (type is '{}')",
									variable.type_,
								),
								span: Some(curr.span.clone()),
							});

							return;
						}
					}

					// accumulate "curr" into capture
					capture.push(curr);
					index = index + 1;

					// if "curr" is a collection, break here because the following
					// components are going to be simple identifiers (TODO: is this a bug in
					// how we model the API of collections?)
					if variable.type_.collection_item_type().is_some() {
						break;
					}
				}
				ComponentKind::ClassType(_) => {
					capture.push(curr);
					index = index + 1;
				}
				ComponentKind::Unsupported => panic!("all components should be valid at this point"),
			}
		}

		// if capture is empty, it means this is a reference to an inflight field, so we can just move
		// on
		if capture.is_empty() {
			return;
		}

		// now that we have "capture", the rest of the expression
		// is the "qualification" of the capture
		let binding = parts.iter().collect::<Vec<_>>();
		let qualification = binding.split_at(index).1.iter();

		let fmt = |x: Iter<&Component>| x.map(|f| f.text.to_string()).collect_vec();
		let mut key = fmt(capture.iter()).join(".");
		if is_field_reference {
			key = format!("this.{}", key);
		}

		if let Some(c) = capture.last() {
			if let ComponentKind::Member(v) = &c.kind {
				// if our last captured component is a non-handler preflight class and we don't have a
				// qualification for it, it's currently an error.
				if v.type_.is_preflight_class() && !v.type_.is_handler_preflight_class() && qualification.len() == 0 {
					self.diagnostics.push(Diagnostic {
						message: format!(
							"Unable to qualify which operations are performed on '{}' of type '{}'. This is not supported yet.",
							key, v.type_,
						),
						span: Some(node.span.clone()),
					});

					return;
				}

				// if this reference refers to an inflight function or handler resource,
				// we need to give permission to the "handle" operation
				if v.type_.is_inflight_function() || v.type_.is_handler_preflight_class() {
					self
						.references
						.entry(key)
						.or_default()
						.insert(HANDLE_METHOD_NAME.to_string());
					return;
				}
			}
		}

		let ops = fmt(qualification);

		self.references.entry(key).or_default().extend(ops);
	}
}

#[derive(Clone, Debug)]
struct Component {
	text: String,
	span: WingSpan,
	kind: ComponentKind,
}

#[derive(Clone, Debug)]
enum ComponentKind {
	Member(VariableInfo),
	ClassType(TypeRef),
	Unsupported,
}

impl Display for Component {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}", self.text)
	}
}

impl<'a> FieldReferenceVisitor<'a> {
	fn analyze_expr(&self, node: &'a Expr) -> Vec<Component> {
		let ExprKind::Reference(ref_expr) = &node.kind else {
			return vec![];
		};

		match ref_expr {
			Reference::Identifier(x) => {
				let env = self.env.unwrap();

				let lookup = env.lookup_ext(&x, Some(self.statement_index));

				// if the reference is already defined later in this scope, skip it
				if let LookupResult::DefinedLater = lookup {
					return vec![];
				}

				let LookupResult::Found(kind, _) = lookup else {
					panic!("reference to undefined symbol");
				};

				let var = kind.as_variable().expect("variable");

				// If the reference isn't a preflight (lifted) variable then skip it
				if var.phase != Phase::Preflight {
					return vec![];
				}

				return vec![Component {
					text: x.name.clone(),
					span: x.span.clone(),
					kind: ComponentKind::Member(var),
				}];
			}
			Reference::InstanceMember {
				object,
				property,
				optional_accessor: _optional_chain,
			} => {
				let obj_type = object.evaluated_type.borrow().unwrap();
				let prop = if let Some(component_kind) = self.determine_component_kind_from_type(obj_type, property) {
					vec![Component {
						text: property.name.clone(),
						span: property.span.clone(),
						kind: component_kind,
					}]
				} else {
					vec![]
				};

				let obj = self.analyze_expr(&object);
				return [obj, prop].concat();
			}
			Reference::TypeMember { type_, property } => {
				let env = self.env.unwrap();

				// Get the type we're accessing a member of
				let t = resolve_user_defined_type(type_, &env, self.statement_index).expect("covered by type checking");

				// If the type we're referencing isn't a preflight class then skip it
				let Some(class) = t.as_preflight_class() else {
					return vec![];
				};

				// To obtain information about the variable we're referencing (like its type and
				// whether it's reassignable), we look it up in the class's env.
				let var = class
					.env
					.lookup(&property, None)
					.expect("lookup")
					.as_variable()
					.expect("variable");

				return vec![
					Component {
						text: format!("{type_}"),
						span: type_.span.clone(),
						kind: ComponentKind::ClassType(t),
					},
					Component {
						text: property.name.clone(),
						span: property.span.clone(),
						kind: ComponentKind::Member(var),
					},
				];
			}
		}
	}

	fn determine_component_kind_from_type(&self, obj_type: UnsafeRef<Type>, property: &Symbol) -> Option<ComponentKind> {
		match &*obj_type {
			Type::Void => unreachable!("cannot reference a member of void"),
			Type::Function(_) => unreachable!("cannot reference a member of a function"),
			Type::Optional(t) => self.determine_component_kind_from_type(*t, property),
			// all fields / methods / values of these types are phase-independent so we can skip them
			Type::Anything
			| Type::Number
			| Type::String
			| Type::Duration
			| Type::Boolean
			| Type::Json
			| Type::MutJson
			| Type::Nil
			| Type::Enum(_) => return None,
			// TODO: collection types are unsupported for now
			Type::Array(_) | Type::MutArray(_) | Type::Map(_) | Type::MutMap(_) | Type::Set(_) | Type::MutSet(_) => {
				Some(ComponentKind::Unsupported)
			}
			Type::Class(cls) => Some(ComponentKind::Member(
				cls
					.env
					.lookup(&property, None)
					.expect("covered by type checking")
					.as_variable()
					.unwrap(),
			)),
			Type::Interface(iface) => Some(ComponentKind::Member(
				iface
					.env
					.lookup(&property, None)
					.expect("covered by type checking")
					.as_variable()
					.unwrap(),
			)),
			Type::Struct(st) => Some(ComponentKind::Member(
				st.env
					.lookup(&property, None)
					.expect("covered by type checking")
					.as_variable()
					.unwrap(),
			)),
		}
	}
}

/// Visitor that finds all the types and variables used within an inflight method but defined in its
/// parent environment
struct CaptureScanner<'a> {
	/// Set of user types referenced inside the method
	captured_types: IndexMap<String, TypeRef>,

	/// The set of free variables referenced by the method
	captured_vars: IndexSet<String>,

	/// The root scope of the function we're analyzing
	function_scope: &'a Scope,

	/// The method env, used to lookup the type
	method_env: SymbolEnvRef,

	/// The current environment (tracked via the visitor)
	current_env: SymbolEnvRef,

	/// The index of the last visited statement.
	current_index: usize,

	/// Compilation errors emitted by the visitor
	diagnostics: Diagnostics,
}

impl<'a> CaptureScanner<'a> {
	pub fn new(function_scope: &'a Scope) -> Self {
		let env = function_scope.env.borrow().as_ref().unwrap().get_ref();
		Self {
			captured_types: IndexMap::new(),
			captured_vars: IndexSet::new(),
			function_scope,
			method_env: env,
			current_env: env,
			current_index: 0,
			diagnostics: Diagnostics::new(),
		}
	}

	pub fn scan(&mut self) {
		self.visit_scope(self.function_scope);
	}

	fn consider_reference(&mut self, path: &[&Symbol]) {
		let fullname = path.iter().map(|s| s.name.clone()).collect_vec().join(".");

		let lookup = self.current_env.lookup_nested(path, Some(self.current_index));

		// if the symbol is defined later in the current environment, it means we can't capture a
		// reference to a symbol with the same name from a parent so bail out.
		if let LookupResult::DefinedLater = lookup {
			let sym = path.first().unwrap();

			self.diagnostics.push(Diagnostic {
				span: Some(sym.span.clone()),
				message: format!(
					"Cannot capture symbol \"{fullname}\" because it is shadowed by another symbol with the same name"
				),
			});

			return;
		}

		// any other lookup failure is likely a bug in the compiler
		let LookupResult::Found(kind, symbol_info) = lookup else {
			panic!("unable to find symbol in current environment");
		};

		// now, we need to determine if the environment this symbol is defined in is a parent of the
		// method's environment. if it is, we need to capture it.
		if !symbol_info.env.is_parent_of(&self.method_env) {
			return;
		}

		match kind {
			SymbolKind::Type(t) => {
				self.captured_types.insert(fullname, *t);
			}
			SymbolKind::Variable(var) => {
				// skip macro functions (like "log" and "assert")
				if let Type::Function(f) = &*var.type_ {
					if f.js_override.is_some() {
						return;
					}
				}

				self.captured_vars.insert(fullname);
			}
			SymbolKind::Namespace(_) => todo!(),
		}
	}
}

impl<'ast> Visit<'ast> for CaptureScanner<'ast> {
	fn visit_expr_new(
		&mut self,
		node: &'ast Expr,
		class: &'ast TypeAnnotation,
		obj_id: &'ast Option<String>,
		obj_scope: &'ast Option<Box<Expr>>,
		arg_list: &'ast ArgList,
	) {
		// we want to only capture the type annotation in the case of "new X" because
		// other cases of type annotation are actually erased in the javascript code.
		if let TypeAnnotationKind::UserDefined(u) = &class.kind {
			self.consider_reference(&u.full_path().iter().collect_vec());
		}

		visit::visit_expr_new(self, node, class, obj_id, obj_scope, arg_list);
	}

	fn visit_reference(&mut self, node: &'ast Reference) {
		match node {
			Reference::Identifier(symb) => {
				// skip "this"
				if symb.name == "this" {
					return;
				}

				self.consider_reference(&[symb]);
			}
			Reference::TypeMember { type_, .. } => {
				self.consider_reference(&type_.full_path().iter().collect_vec());
			}

			// this is the case of "object.property". if we need to capture "object", it will be captured
			// as an identifier, so we can skip it here.
			Reference::InstanceMember { .. } => {}
		}

		visit::visit_reference(self, node);
	}

	fn visit_scope(&mut self, node: &'ast Scope) {
		let backup_env = self.current_env;
		self.current_env = node.env.borrow().as_ref().unwrap().get_ref();
		visit::visit_scope(self, node);
		self.current_env = backup_env;
	}

	fn visit_stmt(&mut self, node: &'ast Stmt) {
		self.current_index = node.idx;
		visit::visit_stmt(self, node);
	}
}

fn inflight_filename(class: &AstClass) -> String {
	format!("{}.inflight.js", class.name.name)
}
