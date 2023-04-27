mod codemaker;

use aho_corasick::AhoCorasick;
use const_format::formatcp;
use itertools::Itertools;

use std::{
	cell::RefCell,
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
		ArgList, BinaryOperator, Class as AstClass, ClassField, Expr, ExprKind, FunctionBody, FunctionBodyRef,
		FunctionDefinition, Initializer, InterpolatedStringPart, Literal, MethodLike, Phase, Reference, Scope, Stmt,
		StmtKind, Symbol, TypeAnnotationKind, UnaryOperator, UserDefinedType, UtilityFunctions,
	},
	debug,
	diagnostic::{Diagnostic, DiagnosticLevel, Diagnostics},
	type_check::{
		resolve_user_defined_type, symbol_env::SymbolEnv, Type, TypeRef, VariableInfo, CLASS_INFLIGHT_INIT_NAME,
	},
	utilities::snake_case_to_camel_case,
	visit::{self, Visit},
	MACRO_REPLACE_ARGS, MACRO_REPLACE_SELF, WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE,
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

const INFLIGHT_OBJ_PREFIX: &str = "$Inflight";

pub struct JSifyContext {
	pub in_json: bool,
	pub phase: Phase,
}

pub struct JSifier<'a> {
	pub diagnostics: Diagnostics,
	pub out_dir: &'a Path,
	absolute_project_root: &'a Path,
	shim: bool,
	app_name: String,
	inflight_counter: RefCell<usize>,
	proc_counter: RefCell<usize>,
}

impl<'a> JSifier<'a> {
	pub fn new(out_dir: &'a Path, app_name: &str, absolute_project_root: &'a Path, shim: bool) -> Self {
		Self {
			diagnostics: Diagnostics::new(),
			out_dir,
			shim,
			app_name: app_name.to_string(),
			inflight_counter: RefCell::new(0),
			proc_counter: RefCell::new(0),
			absolute_project_root,
		}
	}

	fn js_resolve_path(path_name: &str) -> String {
		format!("\"./{}\".replace(/\\\\/g, \"/\")", path_name)
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
			root_class.open("constructor(scope, id) {");
			root_class.line("super(scope, id);");
			root_class.add_code(js);
			root_class.close("}");
			root_class.close("}");

			let mut app_wrapper = CodeMaker::default();
			app_wrapper.open(format!("class {} extends {} {{", APP_CLASS, APP_BASE_CLASS));
			app_wrapper.open("constructor() {");
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

	fn jsify_scope_body(&mut self, scope: &Scope, context: &JSifyContext) -> CodeMaker {
		let mut code = CodeMaker::default();

		for statement in scope.statements.iter() {
			let statement_code = self.jsify_statement(scope.env.borrow().as_ref().unwrap(), statement, context);
			code.add_code(statement_code);
		}

		code
	}

	fn jsify_reference(&mut self, reference: &Reference, case_convert: Option<bool>, context: &JSifyContext) -> String {
		let symbolize = if case_convert.unwrap_or(false) {
			Self::jsify_symbol_case_converted
		} else {
			Self::jsify_symbol
		};
		match reference {
			Reference::Identifier(identifier) => symbolize(self, identifier),
			Reference::InstanceMember { object, property } => {
				self.jsify_expression(object, context) + "." + &symbolize(self, property)
			}
			Reference::TypeMember { type_, property } => {
				self.jsify_type(&TypeAnnotationKind::UserDefined(type_.clone())) + "." + &symbolize(self, property)
			}
		}
	}

	fn jsify_symbol_case_converted(&self, symbol: &Symbol) -> String {
		let result = symbol.name.clone();
		return snake_case_to_camel_case(&result);
	}

	fn jsify_symbol(&self, symbol: &Symbol) -> String {
		return symbol.name.to_string();
	}

	fn jsify_arg_list(
		&mut self,
		arg_list: &ArgList,
		scope: Option<&str>,
		id: Option<&str>,
		case_convert: bool,
		context: &JSifyContext,
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
			args.push(self.jsify_expression(arg, &context));
		}

		for arg in arg_list.named_args.iter() {
			// convert snake to camel case
			structure_args.push(format!(
				"{}: {}",
				if case_convert {
					snake_case_to_camel_case(&arg.0.name)
				} else {
					arg.0.name.clone()
				},
				self.jsify_expression(
					arg.1,
					&JSifyContext {
						in_json: context.in_json,
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
			return self.jsify_symbol(&user_defined_type.root);
		} else {
			format!(
				"{}.{}",
				self.jsify_symbol(&user_defined_type.root),
				user_defined_type
					.fields
					.iter()
					.map(|f| self.jsify_symbol(f))
					.collect::<Vec<String>>()
					.join(".")
			)
		}
	}

	fn jsify_expression(&mut self, expression: &Expr, context: &JSifyContext) -> String {
		let auto_await = match context.phase {
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
				let is_resource = if let Some(evaluated_type) = expression_type.as_ref() {
					evaluated_type.as_resource().is_some()
				} else {
					// TODO Hack: This object type is not known. How can we tell if it's a resource or not?
					true
				};
				let should_case_convert = if let Some(cls) = expression_type.expect("expression type").as_class_or_resource() {
					cls.should_case_convert_jsii
				} else {
					// This should only happen in the case of `any`, which are almost certainly JSII imports.
					true
				};
				let is_abstract = if let Some(cls) = expression_type.unwrap().as_class_or_resource() {
					cls.is_abstract
				} else {
					false
				};

				// if we have an FQN, we emit a call to the "new" (or "newAbstract") factory method to allow
				// targets and plugins to inject alternative implementations for types. otherwise (e.g.
				// user-defined types), we simply instantiate the type directly (maybe in the future we will
				// allow customizations of user-defined types as well, but for now we don't).

				let ctor = self.jsify_type(&class.kind);

				let scope = if is_resource { Some("this") } else { None };

				let id = if is_resource {
					Some(obj_id.as_ref().unwrap_or(&ctor).as_str())
				} else {
					None
				};

				let args = self.jsify_arg_list(&arg_list, scope, id, should_case_convert, context);

				let fqn = if is_resource {
					expression_type
						.expect("expected expression")
						.as_resource()
						.expect("expected resource")
						.fqn
						.clone()
				} else {
					None
				};

				if let (true, Some(fqn)) = (is_resource, fqn) {
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
										format!("${{JSON.stringify({}, null, 2)}}", self.jsify_expression(e, context))
									}
									_ => format!("${{{}}}", self.jsify_expression(e, context)),
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
				match context.phase {
					Phase::Inflight => format!(
						"((s,e,i) => {{ function* iterator(start,end,inclusive) {{ let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }}; return iterator(s,e,i); }})({},{},{})",
						self.jsify_expression(start, context),
						self.jsify_expression(end, context),
						inclusive.unwrap()
					),
					_ => format!(
						"{}.std.Range.of({}, {}, {})",
						STDLIB,
						self.jsify_expression(start, context),
						self.jsify_expression(end, context),
						inclusive.unwrap()
					)
				}
			}
			ExprKind::Reference(_ref) => self.jsify_reference(&_ref, None, context),
			ExprKind::Call { function, arg_list } => {
				let function_type = function.evaluated_type.borrow().unwrap();
				let function_sig = function_type.as_function_sig();
				assert!(
					function_sig.is_some() || function_type.is_anything(),
					"Expected expression to be callable"
				);
				let mut needs_case_conversion = false;

				let expr_string = match &function.kind {
					ExprKind::Reference(reference) => {
						if let Reference::InstanceMember { object, .. } = reference {
							let object_type = object.evaluated_type.borrow().unwrap();
							if let Some(class) = object_type.as_class_or_resource() {
								needs_case_conversion = class.should_case_convert_jsii;
							} else {
								// TODO I think in this case we shouldn't convert tye case but originally we had code that
								// set `needs_case_conversion` to true for `any` and builtin types, and I'm not sure why..
								needs_case_conversion = false;
							}
						}
						self.jsify_reference(reference, Some(needs_case_conversion), context)
					}
					_ => format!("({})", self.jsify_expression(function, context)),
				};
				let arg_string = self.jsify_arg_list(&arg_list, None, None, needs_case_conversion, context);

				if let Some(function_sig) = function_sig {
					if let Some(js_override) = &function_sig.js_override {
						let self_string = &match &function.kind {
							// for "loose" macros, e.g. `print()`, $self$ is the global object
							ExprKind::Reference(Reference::Identifier(_)) => "global".to_string(),
							ExprKind::Reference(Reference::InstanceMember { object, .. }) => {
								self.jsify_expression(object, context)
							}

							_ => expr_string,
						};
						let patterns = &[MACRO_REPLACE_SELF, MACRO_REPLACE_ARGS];
						let replace_with = &[self_string, &arg_string];
						let ac = AhoCorasick::new(patterns);
						return ac.replace_all(js_override, replace_with);
					}
				}

				format!("({}{}({}))", auto_await, expr_string, arg_string)
			}
			ExprKind::Unary { op, exp } => {
				let js_exp = self.jsify_expression(exp, context);
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
				let js_left = self.jsify_expression(left, context);
				let js_right = self.jsify_expression(right, context);

				let js_op = match op {
					BinaryOperator::Add => "+",
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
					.map(|expr| self.jsify_expression(expr, context))
					.collect::<Vec<String>>()
					.join(", ");

				if is_mutable_collection(expression) || context.in_json {
					// json arrays dont need frozen at nested level
					format!("[{}]", item_list)
				} else {
					format!("Object.freeze([{}])", item_list)
				}
			}
			ExprKind::StructLiteral { fields, .. } => {
        let st_type = expression.evaluated_type.borrow().unwrap();
        let st = st_type.as_struct().unwrap();

				format!(
					"{{\n{}}}\n",
					fields
						.iter()
						.map(|(name, expr)| format!("\"{}\": {},", {
              if st.should_case_convert_jsii {
                snake_case_to_camel_case(&name.name)
              } else {
                name.name.clone()
              }
            }, self.jsify_expression(expr, context)))
						.collect::<Vec<String>>()
						.join("\n")
				)
			}
			ExprKind::JsonLiteral { is_mut, element } => {
				let json_context = &JSifyContext {
					in_json: true,
					phase: context.phase,
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
					.map(|(key, expr)| format!("\"{}\":{}", key, self.jsify_expression(expr, context)))
					.collect::<Vec<String>>()
					.join(",");

				if is_mutable_collection(expression) || context.in_json {
					// json maps dont need frozen in the nested level
					format!("{{{}}}", f)
				} else {
					format!("Object.freeze({{{}}})", f)
				}
			}
			ExprKind::SetLiteral { items, .. } => {
				let item_list = items
					.iter()
					.map(|expr| self.jsify_expression(expr, context))
					.collect::<Vec<String>>()
					.join(", ");

				if is_mutable_collection(expression) {
					format!("new Set([{}])", item_list)
				} else {
					format!("Object.freeze(new Set([{}]))", item_list)
				}
			}
			ExprKind::FunctionClosure(func_def) => match func_def.signature.phase {
				Phase::Inflight => self.jsify_inflight_function(func_def, context).to_string(),
				Phase::Independent => unimplemented!(),
				Phase::Preflight => self.jsify_function(None, func_def, context).to_string(),
			},
		}
	}

	fn jsify_statement(&mut self, env: &SymbolEnv, statement: &Stmt, context: &JSifyContext) -> CodeMaker {
		match &statement.kind {
			StmtKind::Bring {
				module_name,
				identifier,
			} => {
				CodeMaker::one_line(format!(
					"const {} = {};",
					self.jsify_symbol(if let Some(identifier) = identifier {
						// use alias
						identifier
					} else {
						module_name
					}),
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
			StmtKind::VariableDef {
				reassignable,
				var_name,
				initial_value,
				type_: _,
			} => {
				let initial_value = self.jsify_expression(initial_value, context);
				return if *reassignable {
					CodeMaker::one_line(format!("let {} = {};", self.jsify_symbol(var_name), initial_value))
				} else {
					CodeMaker::one_line(format!("const {} = {};", self.jsify_symbol(var_name), initial_value))
				};
			}
			StmtKind::ForLoop {
				iterator,
				iterable,
				statements,
			} => {
				let mut code = CodeMaker::default();
				code.open(format!(
					"for (const {} of {}) {{",
					self.jsify_symbol(iterator),
					self.jsify_expression(iterable, context)
				));
				code.add_code(self.jsify_scope_body(statements, context));
				code.close("}");
				code
			}
			StmtKind::While { condition, statements } => {
				let mut code = CodeMaker::default();
				code.open(format!("while ({}) {{", self.jsify_expression(condition, context)));
				code.add_code(self.jsify_scope_body(statements, context));
				code.close("}");
				code
			}
			StmtKind::Break => CodeMaker::one_line("break;"),
			StmtKind::Continue => CodeMaker::one_line("continue;"),
			StmtKind::If {
				condition,
				statements,
				elif_statements,
				else_statements,
			} => {
				let mut code = CodeMaker::default();

				code.open(format!("if ({}) {{", self.jsify_expression(condition, context)));
				code.add_code(self.jsify_scope_body(statements, context));
				code.close("}");

				for elif_block in elif_statements {
					let condition = self.jsify_expression(&elif_block.condition, context);
					// TODO: this puts the "else if" in a separate line from the closing block but
					// technically that shouldn't be a problem, its just ugly
					code.open(format!("else if ({}) {{", condition));
					code.add_code(self.jsify_scope_body(&elif_block.statements, context));
					code.close("}");
				}

				if let Some(else_scope) = else_statements {
					code.open("else {");
					code.add_code(self.jsify_scope_body(else_scope, context));
					code.close("}");
				}

				code
			}
			StmtKind::Expression(e) => CodeMaker::one_line(format!("{};", self.jsify_expression(e, context))),
			StmtKind::Assignment { variable, value } => CodeMaker::one_line(format!(
				"{} = {};",
				self.jsify_reference(&variable, None, context),
				self.jsify_expression(value, context)
			)),
			StmtKind::Scope(scope) => {
				let mut code = CodeMaker::default();
				code.open("{");
				code.add_code(self.jsify_scope_body(scope, context));
				code.close("}");
				code
			}
			StmtKind::Return(exp) => {
				if let Some(exp) = exp {
					CodeMaker::one_line(format!("return {};", self.jsify_expression(exp, context)))
				} else {
					CodeMaker::one_line("return;")
				}
			}
			StmtKind::Class(class) => self.jsify_class(env, class, context),
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
				let name = self.jsify_symbol(name);
				let mut value_index = 0;

				code.open(format!("const {} = Object.freeze((function ({}) {{", name, name));

				for value in values {
					code.line(format!(
						"{}[{}[\"{}\"] = {}] = \"{}\";",
						name, name, value.name, value_index, value.name
					));

					value_index = value_index + 1;
				}

				code.line(format!("return {};", name));

				code.close("})({}));".to_string());
				code
			}
			StmtKind::TryCatch {
				try_statements,
				catch_block,
				finally_statements,
			} => {
				let mut code = CodeMaker::default();

				code.open("try {");
				code.add_code(self.jsify_scope_body(try_statements, context));
				code.close("}");

				if let Some(catch_block) = catch_block {
					if let Some(exception_var_symbol) = &catch_block.exception_var {
						let exception_var_str = self.jsify_symbol(exception_var_symbol);
						code.open(format!("catch ($error_{exception_var_str}) {{"));
						code.line(format!(
							"const {exception_var_str} = $error_{exception_var_str}.message;"
						));
					} else {
						code.open("catch {");
					}

					code.add_code(self.jsify_scope_body(&catch_block.statements, context));
					code.close("}");
				}

				if let Some(finally_statements) = finally_statements {
					code.open("finally {");
					code.add_code(self.jsify_scope_body(finally_statements, context));
					code.close("}");
				}

				code
			}
		}
	}

	fn jsify_inflight_function(&mut self, func_def: &FunctionDefinition, context: &JSifyContext) -> CodeMaker {
		let parameters = func_def
			.parameters()
			.iter()
			.map(|p| self.jsify_symbol(&p.name))
			.join(", ");

		let block = match &func_def.body {
			FunctionBody::Statements(scope) => self.jsify_scope_body(
				scope,
				&JSifyContext {
					in_json: context.in_json,
					phase: Phase::Inflight,
				},
			),
			FunctionBody::External(_) => CodeMaker::one_line("throw new Error(\"extern with closures is not supported\");"),
		};

		let mut bindings = vec![];
		let mut capture_names = vec![];

		for capture in func_def.captures.borrow().as_ref().unwrap().iter() {
			capture_names.push(capture.symbol.name.clone());

			let mut binding = CodeMaker::default();
			binding.open(format!("{}: {{", capture.symbol.name));
			binding.line(format!("obj: {},", capture.symbol.name));
			binding.line(format!(
				"ops: [{}]",
				capture.ops.iter().map(|x| format!("\"{}\"", x.member)).join(",")
			));
			binding.close("},");
			bindings.push(binding);
		}

		let mut proc_source = CodeMaker::default();
		proc_source.open(format!("async handle({parameters}) {{"));
		proc_source.line(format!("const {{ {} }} = this;", capture_names.join(", ")));
		proc_source.add_code(block);
		proc_source.close("}");

		let mut proc_counter = self.proc_counter.borrow_mut();
		*proc_counter += 1;
		let proc_dir = format!("{}/proc{}", self.out_dir.to_string_lossy(), proc_counter);
		fs::create_dir_all(&proc_dir).expect("Creating inflight proc dir");
		let file_path = format!("{}/index.js", proc_dir);
		let relative_file_path = format!("proc{}/index.js", proc_counter);
		fs::write(&file_path, proc_source.to_string()).expect("Writing inflight proc source");

		let mut props_block = CodeMaker::default();
		props_block.line(format!(
			"code: {}.core.NodeJsCode.fromFile(require.resolve({})),",
			STDLIB,
			Self::js_resolve_path(&relative_file_path)
		));
		props_block.open("bindings: {");
		for binding in bindings {
			props_block.add_code(binding);
		}
		props_block.close("}");

		let mut inflight_counter = self.inflight_counter.borrow_mut();
		*inflight_counter += 1;
		let inflight_obj_id = format!("{}{}", INFLIGHT_OBJ_PREFIX, inflight_counter);

		let mut code = CodeMaker::default();
		code.open(format!(
			"new {}.core.Inflight(this, \"{}\", {{",
			STDLIB, inflight_obj_id
		));
		code.add_code(props_block);
		code.close("})");

		code
	}

	fn jsify_constructor(&mut self, name: Option<&str>, func_def: &Initializer, context: &JSifyContext) -> CodeMaker {
		let mut parameter_list = vec![];

		for p in func_def.parameters() {
			parameter_list.push(self.jsify_symbol(&p.name));
		}

		let (name, arrow) = match name {
			Some(name) => (name, ""),
			None => ("", "=> "),
		};

		let parameters = parameter_list.iter().map(|x| x.as_str()).collect::<Vec<_>>().join(", ");

		let mut code = CodeMaker::default();
		code.open(format!("{name}({parameters}) {arrow} {{"));
		code.add_code(self.jsify_scope_body(&func_def.statements, context));
		code.close("}");

		code
	}

	fn jsify_function(
		&mut self,
		name: Option<&str>,
		func_def: &impl MethodLike<'a>,
		context: &JSifyContext,
	) -> CodeMaker {
		let mut parameter_list = vec![];

		for p in func_def.parameters() {
			parameter_list.push(self.jsify_symbol(&p.name));
		}

		let (name, arrow) = match name {
			Some(name) => (name, ""),
			None => ("", "=> "),
		};

		let parameters = parameter_list.iter().map(|x| x.as_str()).collect::<Vec<_>>().join(", ");

		let body = match &func_def.body() {
			FunctionBodyRef::Statements(scope) => {
				let mut code = CodeMaker::default();
				code.open("{");
				code.add_code(self.jsify_scope_body(scope, context));
				code.close("}");
				code
			}
			FunctionBodyRef::External(external_spec) => {
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
								span: Some(func_def.span()),
								level: DiagnosticLevel::Error,
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
		if func_def.is_static() {
			modifiers.push("static")
		}
		if matches!(func_def.signature().phase, Phase::Inflight) {
			modifiers.push("async")
		}
		let modifiers = modifiers.join(" ");

		let mut code = CodeMaker::default();
		code.open(format!("{modifiers} {name}({parameters}) {arrow} {{"));
		code.add_code(body);
		code.close("}");

		code
	}

	fn jsify_class_member(&mut self, member: &ClassField) -> CodeMaker {
		CodeMaker::one_line(format!("{};", self.jsify_symbol(&member.name)))
	}

	/// Jsify a resource
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
	fn jsify_resource(&mut self, env: &SymbolEnv, class: &AstClass, context: &JSifyContext) -> CodeMaker {
		assert!(context.phase == Phase::Preflight);

		// Lookup the resource type
		let resource_type = env.lookup(&class.name, None).unwrap().as_type().unwrap();

		// Find all free variables in the resource, and return a list of their symbols
		let free_vars = self.find_free_vars(class);

		// Get all references between inflight methods and preflight values
		let mut refs = self.find_inflight_references(class, &free_vars);

		// After calling find_inflight_references, we don't really need the exact symbols anymore, only their names
		let free_vars: BTreeSet<String> = free_vars.iter().map(|s| s.name.clone()).into_iter().collect();

		// Get fields to be captured by resource's client
		let captured_fields = self.get_capturable_field_names(resource_type);

		// Add inflight init's refs
		// By default all captured fields are needed in the inflight init method
		let init_refs = BTreeMap::from_iter(captured_fields.iter().map(|f| (format!("this.{f}"), BTreeSet::new())));
		// Check what's actually used in the init method
		let init_refs_entry = refs.entry(CLASS_INFLIGHT_INIT_NAME.to_string()).or_default();
		// Add the init refs to the refs map
		for (k, v) in init_refs {
			if !init_refs_entry.contains_key(&k) {
				init_refs_entry.insert(k, v);
			}
		}

		// Jsify inflight client
		let inflight_methods = class
			.methods
			.iter()
			.filter(|(_, m)| m.signature.phase == Phase::Inflight)
			.collect_vec();
		self.jsify_resource_client(env, &class, &captured_fields, &inflight_methods, &free_vars, context);

		// Get all preflight methods to be jsified to the preflight class
		let preflight_methods = class
			.methods
			.iter()
			.filter(|(_, m)| m.signature.phase != Phase::Inflight)
			.collect_vec();

		let mut code = CodeMaker::default();

		let extends = if let Some(parent) = &class.parent {
			format!(" extends {}", self.jsify_user_defined_type(parent))
		} else {
			format!(" extends {}", STDLIB_CORE_RESOURCE)
		};

		code.open(format!("class {}{} {{", self.jsify_symbol(&class.name), extends));
		code.add_code(self.jsify_resource_constructor(
			&class.initializer,
			class.parent.is_none(),
			&inflight_methods,
			context,
		));

		for (n, m) in preflight_methods {
			code.add_code(self.jsify_function(Some(&n.name), m, context));
		}

		code.add_code(self.jsify_toinflight_method(&class.name, &captured_fields, &free_vars));

		let mut bind_method = CodeMaker::default();
		bind_method.open("_registerBind(host, ops) {");
		for (method_name, method_refs) in refs {
			bind_method.open(format!("if (ops.includes(\"{method_name}\")) {{"));
			for (field, ops) in method_refs {
				let ops_strings = ops.iter().map(|op| format!("\"{}\"", op)).join(", ");
				bind_method.line(format!("this._registerBindObject({field}, host, [{ops_strings}]);",));
			}
			bind_method.close("}");
		}
		bind_method.line("super._registerBind(host, ops);".to_string());
		bind_method.close("}");

		code.add_code(bind_method);

		code.close("}");

		// Return the preflight resource class
		code
	}

	fn jsify_resource_constructor(
		&mut self,
		constructor: &Initializer,
		no_parent: bool,
		inflight_methods: &[&(Symbol, FunctionDefinition)],
		context: &JSifyContext,
	) -> CodeMaker {
		let mut code = CodeMaker::default();
		code.open(format!(
			"constructor(scope, id, {}) {{",
			constructor
				.parameters()
				.iter()
				.map(|p| self.jsify_symbol(&p.name))
				.collect::<Vec<_>>()
				.join(", "),
		));

		if no_parent {
			code.line("super(scope, id);");
		}

		if inflight_methods.len() > 0 {
			let inflight_ops_string = inflight_methods
				.iter()
				.map(|(name, _)| format!("\"{}\"", name.name))
				.join(", ");
			code.line(format!("this._addInflightOps({inflight_ops_string});"));
		}

		code.add_code(self.jsify_scope_body(
			&constructor.statements,
			&JSifyContext {
				in_json: context.in_json,
				phase: Phase::Preflight,
			},
		));

		code.close("}");
		code
	}

	fn jsify_toinflight_method(
		&mut self,
		resource_name: &Symbol,
		captured_fields: &[String],
		free_inflight_variables: &BTreeSet<String>,
	) -> CodeMaker {
		let client_path = Self::js_resolve_path(&format!("{}/{}.inflight.js", INFLIGHT_CLIENTS_DIR, resource_name.name));

		let mut code = CodeMaker::default();

		code.open("_toInflight() {");

		// create an inflight client for each "child" object
		for inner_member_name in captured_fields {
			code.line(format!(
				"const {}_client = this._lift(this.{});",
				inner_member_name, inner_member_name,
			));
		}

		// create an inflight client for each object that is captured from the environment
		for var_name in free_inflight_variables {
			code.line(format!("const {var_name}_client = this._lift({var_name});",));
		}

		code.line(format!("const self_client_path = {client_path};"));

		code.open(format!("return {STDLIB}.core.NodeJsCode.fromInline(`"));

		code.open("(await (async () => {");
		code.line("const mod = require(\"${{self_client_path}}\")");

		code.open("mod.setupGlobals({");

		for var_name in free_inflight_variables {
			code.line(format!("{var_name}: ${{{var_name}_client}},"));
		}

		code.close("});");

		code.open(format!("const client = new mod.{}({{", resource_name.name));

		for inner_member_name in captured_fields {
			code.line(format!("{}: ${{{}_client}},", inner_member_name, inner_member_name));
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

	// Write a client class to a file for the given resource
	fn jsify_resource_client(
		&mut self,
		env: &SymbolEnv,
		resource: &AstClass,
		captured_fields: &[String],
		inflight_methods: &[&(Symbol, FunctionDefinition)],
		free_variables: &BTreeSet<String>,
		context: &JSifyContext,
	) {
		// Handle parent class: Need to call super and pass its captured fields (we assume the parent client is already written)
		let mut parent_captures = vec![];
		if let Some(parent) = &resource.parent {
			let parent_type = resolve_user_defined_type(parent, env, 0).unwrap();
			parent_captures.extend(self.get_capturable_field_names(parent_type));
		}

		// Get the fields that are captured by this resource but not by its parent, they will be initialized in the generated constructor
		let my_captures = captured_fields
			.iter()
			.filter(|name| !parent_captures.iter().any(|n| n == *name))
			.collect_vec();

		let mut code = CodeMaker::default();

		let name = &resource.name.name;
		code.open(format!(
			"class {} {name} {{",
			if let Some(parent) = &resource.parent {
				format!("extends {}", self.jsify_user_defined_type(parent))
			} else {
				"".to_string()
			}
		));

		code.open(format!(
			"constructor({{ {} }}) {{",
			captured_fields
				.iter()
				.map(|name| { name.clone() })
				.collect_vec()
				.join(", ")
		));

		if resource.parent.is_some() {
			code.line(format!(
				"super({});",
				parent_captures.iter().map(|name| name.clone()).collect_vec().join(", ")
			));
		}

		for name in &my_captures {
			code.line(format!("this.{} = {};", name, name));
		}

		code.close("}");

		if let Some(inflight_init) = &resource.inflight_initializer {
			code.add_code(self.jsify_function(
				Some(CLASS_INFLIGHT_INIT_NAME),
				inflight_init,
				&JSifyContext {
					in_json: context.in_json,
					phase: inflight_init.signature.phase,
				},
			));
		}

		for (name, def) in inflight_methods {
			code.add_code(self.jsify_function(
				Some(&name.name),
				def,
				&JSifyContext {
					in_json: context.in_json,
					phase: def.signature.phase,
				},
			));
		}

		code.close("}");

		// export all classes from this file
		code.line(format!("exports.{name} = {name};"));

		// Add a function that can be used to inject free variables
		for var in free_variables {
			code.line(format!("let {};", var));
		}
		code.open("exports.setupGlobals = function(globals) {");
		for var in free_variables {
			code.line(format!("{} = globals[\"{}\"];", var, var));
		}
		code.close("};");

		let clients_dir = format!("{}/clients", self.out_dir.to_string_lossy());
		fs::create_dir_all(&clients_dir).expect("Creating inflight clients");
		let client_file_name = format!("{name}.inflight.js");
		let relative_file_path = format!("{}/{}", clients_dir, client_file_name);
		fs::write(&relative_file_path, code.to_string()).expect("Writing client inflight source");
	}

	fn jsify_class(&mut self, env: &SymbolEnv, class: &AstClass, context: &JSifyContext) -> CodeMaker {
		if class.is_resource {
			return self.jsify_resource(env, class, context);
		}

		let mut code = CodeMaker::default();
		code.open(format!(
			"class {}{} {{",
			self.jsify_symbol(&class.name),
			if let Some(parent) = &class.parent {
				format!(" extends {}", self.jsify_user_defined_type(parent))
			} else {
				"".to_string()
			},
		));

		code.add_code(self.jsify_constructor(Some("constructor"), &class.initializer, context));

		for m in class.fields.iter() {
			code.add_code(self.jsify_class_member(&m));
		}

		for (n, m) in class.methods.iter() {
			code.add_code(self.jsify_function(Some(&n.name), m, context));
		}

		code.close("}");
		code
	}

	/// Get the type and capture info for fields that are captured in the client of the given resource
	/// Returns a map from method name to a map from field name to a set of operations
	fn find_inflight_references(
		&mut self,
		resource_class: &AstClass,
		free_vars: &[Symbol],
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
		if let Some(inflight_init) = &resource_class.inflight_initializer {
			let visitor = FieldReferenceVisitor::new(inflight_init, free_vars);
			let (refs, find_diags) = visitor.find_refs();

			self.diagnostics.extend(find_diags);

			result.insert(CLASS_INFLIGHT_INIT_NAME.to_string(), refs);
		}

		return result;
	}

	// Get the type and capture info for fields that are captured in the client of the given resource
	fn get_capturable_field_names(&self, resource_type: TypeRef) -> Vec<String> {
		resource_type
			.as_resource()
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

	fn find_free_vars(&self, class: &AstClass) -> Vec<Symbol> {
		let mut scanner = FreeVariableScanner::new(vec![
			Symbol::global(UtilityFunctions::Log.to_string()),
			Symbol::global(UtilityFunctions::Assert.to_string()),
			Symbol::global(UtilityFunctions::Throw.to_string()),
			Symbol::global(UtilityFunctions::Panic.to_string()),
			Symbol::global("this".to_string()),
		]);
		scanner.visit_class(class);
		scanner.free_vars
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
	free_vars: &'a [Symbol],

	diagnostics: Diagnostics,
}

impl<'a> FieldReferenceVisitor<'a> {
	pub fn new(function_def: &'a FunctionDefinition, free_vars: &'a [Symbol]) -> Self {
		Self {
			references: BTreeMap::new(),
			function_def,
			free_vars,
			diagnostics: Diagnostics::new(),
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
	fn visit_expr(&mut self, node: &'ast Expr) {
		let parts = self.analyze_expr(node);

		let is_field_reference = match parts.first() {
			Some(first) => first.text == "this" && parts.len() > 1,
			None => false,
		};

		let is_free_var = match parts.first() {
			Some(first) => self.free_vars.iter().any(|v| v.same(&first.symbol)),
			None => false,
		};

		if !is_field_reference && !is_free_var {
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

			let Some(variable) = &curr.variable else {
				panic!("unexpected - all components should have a variable at this point");
			};

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
					level: DiagnosticLevel::Error,
					message: format!("Cannot capture reassignable field '{}'", curr.text),
					span: Some(curr.expr.span.clone()),
				});

				return;
			}

			// if this type is not capturable, bail out
			if !variable.type_.is_capturable() {
				self.diagnostics.push(Diagnostic {
					level: DiagnosticLevel::Error,
					message: format!(
						"Cannot capture field '{}' with non-capturable type '{}'",
						curr.text, variable.type_
					),
					span: Some(curr.expr.span.clone()),
				});

				return;
			}

			// okay, so we have a non-reassignable, capturable type.
			// one more special case is collections. we currently only support
			// collections which do not include resources because we cannot
			// qualify the capture.
			if let Some(inner_type) = variable.type_.collection_item_type() {
				if inner_type.as_resource().is_some() {
					self.diagnostics.push(Diagnostic {
						level: DiagnosticLevel::Error,
						message: format!(
							"Capturing collection of resources is not supported yet (type is '{}')",
							variable.type_,
						),
						span: Some(curr.expr.span.clone()),
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

		// if capture is empty, it means this is a reference to an inflight field, so we can just move
		// on
		if capture.is_empty() {
			return;
		}

		// now that we have "capture", the rest of the expression
		// is the "qualification" of the capture
		let binding = parts.iter().collect::<Vec<_>>();
		let qualification = binding.split_at(index).1.iter();

		// if our last captured component is a resource and we don't have
		// a qualification for it, it's currently an error.
		if let Some(c) = capture.last() {
			if let Some(v) = &c.variable {
				if v.type_.as_resource().is_some() {
					if qualification.len() == 0 {
						self.diagnostics.push(Diagnostic {
							level: DiagnosticLevel::Error,
							message: format!(
								"Unable to qualify which operations are performed on 'this.{}' of type '{}'. This is not supported yet.",
								c.text, v.type_,
							),
							span: Some(c.expr.span.clone()),
						});

						return;
					}
				}
			}
		}

		let fmt = |x: Iter<&Component>| x.map(|f| f.text.to_string()).collect_vec();
		let mut key = fmt(capture.iter()).join(".");
		if is_field_reference {
			key = format!("this.{}", key);
		}
		let ops = fmt(qualification);

		self.references.entry(key).or_default().extend(ops);
	}
}

#[derive(Clone, Debug)]

struct Component<'a> {
	expr: &'a Expr,
	symbol: Symbol,
	text: String,
	variable: Option<VariableInfo>,
}

impl Display for Component<'_> {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}", self.text)
	}
}

impl<'a> FieldReferenceVisitor<'a> {
	fn analyze_expr(&self, node: &'a Expr) -> Vec<Component> {
		match &node.kind {
			ExprKind::Reference(Reference::Identifier(x)) => {
				let scope = match &self.function_def.body {
					FunctionBody::Statements(scope) => scope,
					FunctionBody::External(_) => panic!("unexpected expression inside body of extern functions"),
				};
				let env = scope.env.borrow();
				let env = env.as_ref().expect("scope should have an env");
				let var = env
					.lookup(&x, None)
					.expect("covered by type checking")
					.as_variable()
					.expect("reference to a non-variable");
				return vec![Component {
					expr: node,
					symbol: x.clone(),
					text: x.name.to_string(),
					variable: Some(var),
				}];
			}

			ExprKind::Reference(Reference::InstanceMember { object, property }) => {
				let obj_type = object.evaluated_type.borrow().unwrap();
				let var = if let Some(cls) = obj_type.as_class_or_resource() {
					Some(
						cls
							.env
							.lookup(&property, None)
							.expect("covered by type checking")
							.as_variable()
							.unwrap(),
					)
				} else if let Some(iface) = obj_type.as_interface() {
					Some(
						iface
							.env
							.lookup(&property, None)
							.expect("covered by type checking")
							.as_variable()
							.unwrap(),
					)
				} else if let Some(s) = obj_type.as_struct() {
					Some(
						s.env
							.lookup(&property, None)
							.expect("covered by type checking")
							.as_variable()
							.unwrap(),
					)
				} else {
					None
				};

				let prop = vec![Component {
					expr: node,
					symbol: property.clone(),
					variable: var,
					text: property.name.to_string(),
				}];

				let obj = self.analyze_expr(&object);
				return [obj, prop].concat();
			}

			_ => vec![],
		}
	}
}

struct FreeVariableScanner {
	bound_vars: Vec<Symbol>,
	free_vars: Vec<Symbol>,
}

impl FreeVariableScanner {
	pub fn new(globals: Vec<Symbol>) -> Self {
		Self {
			bound_vars: globals,
			free_vars: Vec::new(),
		}
	}
}

impl Visit<'_> for FreeVariableScanner {
	fn visit_reference(&mut self, node: &Reference) {
		if let Reference::Identifier(ref x) = node {
			// check if there is already a bound variable with the same name
			if !self.bound_vars.contains(x) {
				self.free_vars.push(x.clone());
			}
		};

		return visit::visit_reference(self, node);
	}

	// invariant: adds net zero bound variables
	fn visit_scope(&mut self, scope: &Scope) {
		let old_bound_vars = self.bound_vars.clone();
		visit::visit_scope(self, scope);
		// remove the bound variables that were introduced in this scope
		self.bound_vars = old_bound_vars;
	}

	fn visit_stmt(&mut self, stmt: &Stmt) {
		match &stmt.kind {
			// this statement introduces bound variables!
			StmtKind::Bring {
				module_name,
				identifier,
			} => {
				self.visit_symbol(&module_name);

				// bring cloud;
				if !(module_name.name.starts_with('"') && module_name.name.ends_with('"')) {
					// add `cloud` to the list of bound variables
					self.bound_vars.push(module_name.clone());
				}

				// bring "foo" as bar;
				if let Some(ref id) = identifier {
					self.visit_symbol(&id);

					// add `bar` to the list of bound variables
					self.bound_vars.push(id.clone());
				}
			}
			// this statement introduces bound variables!
			StmtKind::VariableDef {
				reassignable: _,
				var_name,
				initial_value,
				type_,
			} => {
				self.visit_symbol(&var_name);
				self.visit_expr(&initial_value);
				if let Some(type_) = type_ {
					self.visit_type_annotation(&type_);
				}
				self.bound_vars.push(var_name.clone());
			}
			// invariant: adds net zero bound variables
			StmtKind::ForLoop {
				iterator,
				iterable,
				statements,
			} => {
				self.visit_symbol(&iterator);
				self.visit_expr(&iterable);
				self.bound_vars.push(iterator.clone());
				self.visit_scope(&statements);
				self.bound_vars.pop();
			}
			// invariant: adds net zero bound variables
			StmtKind::TryCatch {
				try_statements,
				catch_block,
				finally_statements,
			} => {
				self.visit_scope(&try_statements);

				if let Some(cb) = catch_block {
					if let Some(ref var) = cb.exception_var {
						self.visit_symbol(&var);
						self.bound_vars.push(var.clone());
					}
					self.visit_scope(&cb.statements);
					if cb.exception_var.is_some() {
						self.bound_vars.pop();
					}
				}

				if let Some(ref finally_statements) = finally_statements {
					self.visit_scope(&finally_statements);
				}
			}

			_ => return visit::visit_stmt(self, stmt),
		};
	}

	// invariant: adds net zero bound variables
	fn visit_constructor(&mut self, node: &Initializer) {
		let Initializer {
			signature,
			statements,
			span: _,
		} = node;

		for param in &signature.parameters {
			self.bound_vars.push(param.name.clone());
		}

		self.visit_scope(statements);

		for _ in &signature.parameters {
			self.bound_vars.pop();
		}
	}

	// invariant: adds net zero bound variables
	fn visit_function_definition(&mut self, node: &FunctionDefinition) {
		let FunctionDefinition {
			signature,
			body,
			captures: _,
			is_static: _,
			span: _,
		} = node;

		for param in &signature.parameters {
			self.bound_vars.push(param.name.clone());
		}

		self.visit_function_signature(signature);

		let _new_body = match body {
			FunctionBody::Statements(statements) => {
				self.visit_scope(statements);
			}
			FunctionBody::External(_) => {}
		};

		for _ in &signature.parameters {
			self.bound_vars.pop();
		}
	}
}
