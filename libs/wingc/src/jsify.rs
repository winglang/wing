mod codemaker;

use aho_corasick::AhoCorasick;
use const_format::formatcp;
use indoc::formatdoc;
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

use sha2::{Digest, Sha256};

use crate::{
	ast::{
		ArgList, BinaryOperator, Class as AstClass, ClassField, Constructor, Expr, ExprKind, FunctionBody,
		FunctionDefinition, InterpolatedStringPart, Literal, Phase, Reference, Scope, Stmt, StmtKind, Symbol,
		TypeAnnotation, UnaryOperator, UserDefinedType,
	},
	diagnostic::{Diagnostic, DiagnosticLevel, Diagnostics},
	type_check::{resolve_user_defined_type, symbol_env::SymbolEnv, ClassLike, Type, TypeRef, VariableInfo},
	utilities::snake_case_to_camel_case,
	visit::{self, Visit},
	MACRO_REPLACE_ARGS, MACRO_REPLACE_SELF, WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE,
};

use self::codemaker::CodeMaker;

const STDLIB: &str = "$stdlib";
const STDLIB_CORE_RESOURCE: &str = formatcp!("{}.{}", STDLIB, WINGSDK_RESOURCE);
const STDLIB_MODULE: &str = WINGSDK_ASSEMBLY_NAME;

const INFLIGHT_CLIENTS_DIR: &str = "clients";
const EXTERN_DIR: &str = "extern";

const TARGET_CODE: &str = r#"
function __app(target) {
	switch (target) {
		case "sim":
			return $stdlib.sim.App;
		case "tfaws":
		case "tf-aws":
			return $stdlib.tfaws.App;
		case "tf-gcp":
			return $stdlib.tfgcp.App;
		case "tf-azure":
			return $stdlib.tfazure.App;
		case "awscdk":
			return $stdlib.awscdk.App;
		default:
			throw new Error(`Unknown WING_TARGET value: "${process.env.WING_TARGET ?? ""}"`);
	}
}
const $AppBase = __app(process.env.WING_TARGET);
"#;

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
	shim: bool,
	app_name: String,
	inflight_counter: RefCell<usize>,
}

impl<'a> JSifier<'a> {
	pub fn new(out_dir: &'a Path, app_name: &str, shim: bool) -> Self {
		Self {
			diagnostics: Diagnostics::new(),
			out_dir,
			shim,
			app_name: app_name.to_string(),
			inflight_counter: RefCell::new(0),
		}
	}

	fn js_resolve_path(path_name: &str) -> String {
		format!("\"./{}\".replace(/\\\\/g, \"/\")", path_name)
	}

	fn render_block(statements: impl IntoIterator<Item = impl core::fmt::Display>) -> String {
		let mut lines = vec![];
		lines.push("{".to_string());

		for statement in statements {
			let statement_str = format!("{}", statement);
			let result = statement_str.split("\n");
			for l in result {
				lines.push(format!("  {}", l));
			}
		}

		lines.push("}".to_string());
		lines.join("\n")
	}

	pub fn jsify(&mut self, scope: &Scope) -> String {
		let mut js = vec![];
		let mut imports = vec![];

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
			let line = self.jsify_statement(scope.env.borrow().as_ref().unwrap(), statement, &jsify_context); // top level statements are always preflight
			if line.is_empty() {
				continue;
			}
			if let StmtKind::Bring {
				identifier: _,
				module_name: _,
			} = statement.kind
			{
				imports.push(line);
			} else {
				js.push(line);
			}
		}

		let mut output = vec![];

		if self.shim {
			output.push(format!("const {} = require('{}');", STDLIB, STDLIB_MODULE));
			output.push(format!("const {} = process.env.WING_SYNTH_DIR ?? \".\";", OUTDIR_VAR));
			output.push(format!(
				"const {} = process.env.WING_IS_TEST === \"true\";",
				ENV_WING_IS_TEST
			));
			output.push(TARGET_CODE.to_owned());
		}

		output.append(&mut imports);

		if self.shim {
			let mut root_class = CodeMaker::default();
			root_class.open(format!("class {} extends {} {{", ROOT_CLASS, STDLIB_CORE_RESOURCE));
			root_class.open("constructor(scope, id) {");
			root_class.line(format!("super(scope, id);"));
			root_class.add_lines(js);
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
			app_wrapper.line("const $test_runner = this.testRunner;".to_string());
			app_wrapper.line("const $tests = $test_runner.findTests();".to_string());
			app_wrapper.open("for (let $i = 1; $i < $tests.length; $i++) {");
			app_wrapper.line(format!("new {}(this, \"env\" + $i);", ROOT_CLASS));
			app_wrapper.close("}");
			app_wrapper.close("} else {");
			app_wrapper.indent();
			app_wrapper.line(format!("new {}(this, \"Default\");", ROOT_CLASS));
			app_wrapper.close("}");
			app_wrapper.close("}");
			app_wrapper.close("}");

			output.push(root_class.to_string());
			output.push(app_wrapper.to_string());

			output.push(format!("new {}().synth();", APP_CLASS));
		} else {
			output.append(&mut js);
		}

		output.join("\n")
	}

	fn jsify_scope(&mut self, scope: &Scope, context: &JSifyContext) -> String {
		let mut lines = vec![];
		lines.push("{".to_string());

		for statement in scope.statements.iter() {
			let statement_str = self.jsify_statement(scope.env.borrow().as_ref().unwrap(), statement, context);
			let result = statement_str.split("\n");
			for l in result {
				lines.push(format!("  {}", l));
			}
		}

		lines.push("}".to_string());
		lines.join("\n")
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
				self.jsify_type(&TypeAnnotation::UserDefined(type_.clone())) + "." + &symbolize(self, property)
			}
		}
	}

	fn jsify_symbol_case_converted(&self, symbol: &Symbol) -> String {
		let mut result = symbol.name.clone();
		result = snake_case_to_camel_case(&result);
		return format!("{}", result);
	}

	fn jsify_symbol(&self, symbol: &Symbol) -> String {
		return format!("{}", symbol.name);
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
						in_json: context.in_json.clone(),
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

	fn jsify_type(&self, typ: &TypeAnnotation) -> String {
		match typ {
			TypeAnnotation::UserDefined(user_defined_type) => self.jsify_user_defined_type(user_defined_type),
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

				let ctor = self.jsify_type(class);

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
				Literal::String(s) => format!("{}", s),
				Literal::InterpolatedString(s) => format!(
					"`{}`",
					s.parts
						.iter()
						.map(|p| match p {
							InterpolatedStringPart::Static(l) => format!("{}", l),
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
				Literal::Boolean(b) => format!("{}", if *b { "true" } else { "false" }),
			},
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
								self.jsify_expression(object, context).clone()
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
				let op = match op {
					UnaryOperator::Minus => "-",
					UnaryOperator::Not => "!",
				};
				format!("({}{})", op, self.jsify_expression(exp, context))
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
				format!(
					"{{\n{}}}\n",
					fields
						.iter()
						.map(|(name, expr)| format!("\"{}\": {},", name.name, self.jsify_expression(expr, context)))
						.collect::<Vec<String>>()
						.join("\n")
				)
			}
			ExprKind::JsonLiteral { is_mut, element } => {
				let json_context = &JSifyContext {
					in_json: true,
					phase: context.phase.clone(),
				};
				let js_out = match &element.kind {
					ExprKind::MapLiteral { .. } => {
						if *is_mut {
							format!("{}", self.jsify_expression(element, json_context))
						} else {
							format!("Object.freeze({})", self.jsify_expression(element, json_context))
						}
					}
					_ => format!("{}", self.jsify_expression(element, json_context)),
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
				Phase::Inflight => self.jsify_inflight_function(func_def, context),
				Phase::Independent => unimplemented!(),
				Phase::Preflight => self.jsify_function(None, func_def, context),
			},
			ExprKind::OptionalTest { optional } => {
				// We use the abstract inequality operator here because we want to check for null or undefined
				format!("(({}) != null)", self.jsify_expression(optional, context))
			}
		}
	}

	fn jsify_statement(&mut self, env: &SymbolEnv, statement: &Stmt, context: &JSifyContext) -> String {
		match &statement.kind {
			StmtKind::Bring {
				module_name,
				identifier,
			} => {
				format!(
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
				)
			}
			StmtKind::VariableDef {
				reassignable,
				var_name,
				initial_value,
				type_: _,
			} => {
				let initial_value = self.jsify_expression(initial_value, context);
				return if *reassignable {
					format!("let {} = {};", self.jsify_symbol(var_name), initial_value)
				} else {
					format!("const {} = {};", self.jsify_symbol(var_name), initial_value)
				};
			}
			StmtKind::ForLoop {
				iterator,
				iterable,
				statements,
			} => format!(
				"for (const {} of {}) {}",
				self.jsify_symbol(iterator),
				self.jsify_expression(iterable, context),
				self.jsify_scope(statements, context)
			),
			StmtKind::While { condition, statements } => {
				format!(
					"while ({}) {}",
					self.jsify_expression(condition, context),
					self.jsify_scope(statements, context),
				)
			}
			StmtKind::Break => "break;".into(),
			StmtKind::Continue => "continue;".into(),
			StmtKind::If {
				condition,
				statements,
				elif_statements,
				else_statements,
			} => {
				let mut if_statement = format!(
					"if ({}) {}",
					self.jsify_expression(condition, context),
					self.jsify_scope(statements, context),
				);

				for elif_block in elif_statements {
					let elif_statement = format!(
						" else if ({}) {}",
						self.jsify_expression(&elif_block.condition, context),
						self.jsify_scope(&elif_block.statements, context),
					);
					if_statement.push_str(&elif_statement);
				}

				if let Some(else_scope) = else_statements {
					let else_statement = format!(" else {}", self.jsify_scope(else_scope, context));
					if_statement.push_str(&else_statement);
				}

				if_statement
			}
			StmtKind::Expression(e) => format!("{};", self.jsify_expression(e, context)),
			StmtKind::Assignment { variable, value } => {
				format!(
					"{} = {};",
					self.jsify_reference(&variable, None, context),
					self.jsify_expression(value, context)
				)
			}
			StmtKind::Scope(scope) => self.jsify_scope(scope, context),
			StmtKind::Return(exp) => {
				if let Some(exp) = exp {
					format!("return {};", self.jsify_expression(exp, context))
				} else {
					"return;".into()
				}
			}
			StmtKind::Class(class) => self.jsify_class(env, class, context),
			StmtKind::Interface { .. } => {
				// This is a no-op in JS
				format!("")
			}
			StmtKind::Struct { .. } => {
				// This is a no-op in JS
				format!("")
			}
			StmtKind::Enum { name, values } => {
				let name = self.jsify_symbol(name);
				let mut value_index = 0;
				format!(
					"const {} = Object.freeze((function ({}) {{\n{}\n  return {};\n}})({{}}));",
					name,
					name,
					values
						.iter()
						.map(|value| {
							let text = format!(
								"  {}[{}[\"{}\"] = {}] = \"{}\";",
								name, name, value.name, value_index, value.name
							);
							value_index = value_index + 1;
							text
						})
						.collect::<Vec<String>>()
						.join("\n"),
					name,
				)
			}
			StmtKind::TryCatch {
				try_statements,
				catch_block,
				finally_statements,
			} => {
				let try_block = self.jsify_scope(try_statements, context);
				let mut catch_statements = "".to_string();
				let mut js_exception_var = "".to_string();
				let mut exception_var_conversion = "".to_string();
				if let Some(catch_block) = catch_block {
					catch_statements = self.jsify_scope(&catch_block.statements, context);
					if let Some(exception_var_symbol) = &catch_block.exception_var {
						let exception_var_str = self.jsify_symbol(exception_var_symbol);
						js_exception_var = format!("($error_{exception_var_str})");
						exception_var_conversion = format!("const {exception_var_str} = $error_{exception_var_str}.message;");
					}
				}
				let finally_block = if let Some(finally_statements) = finally_statements {
					format!("{};", self.jsify_scope(finally_statements, context))
				} else {
					"".to_string()
				};
				formatdoc!(
					"
					try {{
						{try_block}
					}} catch {js_exception_var} {{
						{exception_var_conversion}
						{catch_statements}
					}} finally {{
						{finally_block}
					}}"
				)
			}
		}
	}

	fn jsify_inflight_function(&mut self, func_def: &FunctionDefinition, context: &JSifyContext) -> String {
		let parameters = func_def.parameters.iter().map(|p| &p.0.name).join(", ");

		let block = match &func_def.body {
			FunctionBody::Statements(scope) => self.jsify_scope(
				scope,
				&JSifyContext {
					in_json: context.in_json.clone(),
					phase: Phase::Inflight,
				},
			),
			FunctionBody::External(_) => format!("{{ throw new Error(\"extern with closures is not supported\") }}"),
		};

		let procid = base16ct::lower::encode_string(&Sha256::new().chain_update(&block).finalize());
		let mut bindings = vec![];
		let mut capture_names = vec![];

		for capture in func_def.captures.borrow().as_ref().unwrap().iter() {
			capture_names.push(capture.symbol.name.clone());

			bindings.push(format!(
				"{}: {},",
				capture.symbol.name,
				Self::render_block([
					format!("obj: {},", capture.symbol.name),
					format!(
						"ops: [{}]",
						capture.ops.iter().map(|x| format!("\"{}\"", x.member)).join(",")
					)
				])
			));
		}
		let mut proc_source = vec![];
		let body = format!("{{ const {{ {} }} = this; {} }}", capture_names.join(", "), block);
		proc_source.push(format!("async handle({parameters}) {body};"));
		let proc_dir = format!("{}/proc.{}", self.out_dir.to_string_lossy(), procid);
		fs::create_dir_all(&proc_dir).expect("Creating inflight proc dir");
		let file_path = format!("{}/index.js", proc_dir);
		let relative_file_path = format!("proc.{}/index.js", procid);
		fs::write(&file_path, proc_source.join("\n")).expect("Writing inflight proc source");
		let props_block = Self::render_block([
			format!(
				"code: {}.core.NodeJsCode.fromFile(require.resolve({})),",
				STDLIB,
				Self::js_resolve_path(&relative_file_path)
			),
			format!("bindings: {}", Self::render_block(&bindings)),
		]);
		let mut inflight_counter = self.inflight_counter.borrow_mut();
		*inflight_counter += 1;
		let inflight_obj_id = format!("{}{}", INFLIGHT_OBJ_PREFIX, inflight_counter);
		format!(
			"new {}.core.Inflight(this, \"{}\", {})",
			STDLIB, inflight_obj_id, props_block
		)
	}

	fn jsify_constructor(&mut self, name: Option<&str>, func_def: &Constructor, context: &JSifyContext) -> String {
		let mut parameter_list = vec![];

		for p in func_def.parameters.iter() {
			parameter_list.push(self.jsify_symbol(&p.0));
		}

		let (name, arrow) = match name {
			Some(name) => (name, ""),
			None => ("", "=> "),
		};

		let parameters = parameter_list.iter().map(|x| x.as_str()).collect::<Vec<_>>().join(", ");
		let body = self.jsify_scope(&func_def.statements, context);

		formatdoc!(
			"
		{name}({parameters}) {arrow} {{
			{body}
		}}"
		)
	}

	fn jsify_function(&mut self, name: Option<&str>, func_def: &FunctionDefinition, context: &JSifyContext) -> String {
		let mut parameter_list = vec![];

		for p in func_def.parameters.iter() {
			parameter_list.push(self.jsify_symbol(&p.0));
		}

		let (name, arrow) = match name {
			Some(name) => (name, ""),
			None => ("", "=> "),
		};

		let parameters = parameter_list.iter().map(|x| x.as_str()).collect::<Vec<_>>().join(", ");

		let body = match &func_def.body {
			FunctionBody::Statements(scope) => self.jsify_scope(scope, context),
			FunctionBody::External(external_spec) => {
				let new_path = self.prepare_extern(
					matches!(func_def.signature.phase, Phase::Inflight),
					external_spec,
					&func_def.span.file_id,
				);
				format!("return require({new_path})[\"{name}\"]({parameters})")
			}
		};
		let mut modifiers = vec![];
		if func_def.is_static {
			modifiers.push("static")
		}
		if matches!(func_def.signature.phase, Phase::Inflight) {
			modifiers.push("async")
		}
		let modifiers = modifiers.join(" ");

		formatdoc!(
			"
			{modifiers} {name}({parameters}) {arrow} {{
				{body}
			}}"
		)
	}

	/// Retrieves the contents of the extern file and copies it to the intermediate directory.
	/// Returns the path to the copied file
	fn prepare_extern(&self, is_inflight: bool, path: &String, current_wing_file: &String) -> String {
		let current_wing_file_dir = Path::new(current_wing_file).parent().unwrap();
		let path_relative_to_wing = current_wing_file_dir.join(&path);
		let path_relative_to_wing = path_relative_to_wing.to_str().expect("Converting path to string");

		let contents = std::fs::read_to_string(path_relative_to_wing).expect("Copying extern file");

		let id = base16ct::lower::encode_string(&Sha256::new().chain_update(&contents).finalize());
		let id_file = format!("{}.js", id);
		let extern_id_path = Path::new(EXTERN_DIR).join(&id_file);

		let final_dir = self.out_dir.join(EXTERN_DIR);
		let final_path = self.out_dir.join(&extern_id_path);
		fs::create_dir_all(final_dir).expect("Creating extern dir");
		std::fs::write(&final_path, contents).expect("Copying extern file");

		if is_inflight {
			let relative_path = Path::new("..").join(&extern_id_path);
			format!("\"{}\"", relative_path.to_str().expect("Converting path to string"))
		} else {
			Self::js_resolve_path(&extern_id_path.to_str().expect("Converting path to string").to_string())
		}
	}

	fn jsify_class_member(&mut self, member: &ClassField) -> String {
		format!("{};", self.jsify_symbol(&member.name))
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
	fn jsify_resource(&mut self, env: &SymbolEnv, class: &AstClass, context: &JSifyContext) -> String {
		assert!(context.phase == Phase::Preflight);

		// Lookup the resource type
		let resource_type = env.lookup(&class.name, None).unwrap().as_type().unwrap();

		// Get all references between inflight methods and preflight fields
		let refs = self.find_inflight_references(class);

		// Get fields to be captured by resource's client
		let captured_fields = self.get_captures(resource_type);

		// Jsify inflight client
		let inflight_methods = class
			.methods
			.iter()
			.filter(|(_, m)| m.signature.phase == Phase::Inflight)
			.collect::<Vec<_>>();
		self.jsify_resource_client(
			env,
			&class.name,
			&captured_fields,
			&inflight_methods,
			&class.parent,
			context,
		);

		// Get all preflight methods to be jsified to the preflight class
		let preflight_methods = class
			.methods
			.iter()
			.filter(|(_, m)| m.signature.phase != Phase::Inflight)
			.collect::<Vec<_>>();

		let toinflight_method = self.jsify_toinflight_method(&class.name, &captured_fields);

		// Jsify class
		let resource_class = formatdoc!(
			"
			class {}{} {{
				{}
				{}
				{toinflight_method}
			}}",
			self.jsify_symbol(&class.name),
			if let Some(parent) = &class.parent {
				format!(" extends {}", self.jsify_user_defined_type(parent))
			} else {
				format!(" extends {}", STDLIB_CORE_RESOURCE)
			},
			self.jsify_resource_constructor(&class.constructor, class.parent.is_none(), context),
			preflight_methods
				.iter()
				.map(|(n, m)| self.jsify_function(Some(&n.name), &m, context))
				.collect::<Vec<String>>()
				.join("\n"),
		);

		// go over all bindings and produce inflight annotations
		let mut inflight_annotations = vec![];
		for (method_name, refs) in refs {
			inflight_annotations.push(format!(
				"{}._annotateInflight(\"{}\", {{{}}});",
				class.name.name,
				method_name,
				refs
					.iter()
					.map(|(field, ops)| format!(
						"\"{}\": {{ ops: [{}] }}",
						field,
						ops.iter().map(|op| format!("\"{}\"", op)).join(",")
					))
					.join(",")
			));
		}

		// Return the preflight resource class
		return format!("{}\n{}", resource_class, inflight_annotations.join("\n"));
	}

	fn jsify_resource_constructor(
		&mut self,
		constructor: &Constructor,
		no_parent: bool,
		context: &JSifyContext,
	) -> String {
		format!(
			"constructor(scope, id, {}) {{\n{}\n{}\n}}",
			constructor
				.parameters
				.iter()
				.map(|(name, _)| name.name.clone())
				.collect::<Vec<_>>()
				.join(", "),
			// If there's no parent then this resource is derived from the base resource class (core.Resource) and we need
			// to manually call its super
			if no_parent { "	super(scope, id);" } else { "" },
			self.jsify_scope(
				&constructor.statements,
				&JSifyContext {
					in_json: context.in_json.clone(),
					phase: Phase::Preflight,
				}
			)
		)
	}

	fn jsify_toinflight_method(
		&mut self,
		resource_name: &Symbol,
		captured_fields: &[(String, TypeRef, Vec<String>)],
	) -> String {
		let inner_clients = captured_fields
			.iter()
			.map(|(inner_member_name, _, _)| {
				format!(
					"const {}_client = this._lift(this.{});",
					inner_member_name, inner_member_name,
				)
			})
			.collect_vec()
			.join("\n");

		let client_path = Self::js_resolve_path(&format!("{}/{}.inflight.js", INFLIGHT_CLIENTS_DIR, resource_name.name));
		let captured_fields = captured_fields
			.iter()
			.map(|(inner_member_name, _, _)| format!("{}: ${{{}_client}}", inner_member_name, inner_member_name))
			.join(", ");
		formatdoc!("
			_toInflight() {{
				{inner_clients}
				const self_client_path = {client_path};
				return {STDLIB}.core.NodeJsCode.fromInline(`(new (require(\"${{self_client_path}}\")).{resource_name}({{{captured_fields}}}))`);
			}}",
			resource_name = resource_name.name,
		)
	}

	// Write a client class for a file for the given resource
	fn jsify_resource_client(
		&mut self,
		env: &SymbolEnv,
		name: &Symbol,
		captured_fields: &[(String, TypeRef, Vec<String>)],
		inflight_methods: &[&(Symbol, FunctionDefinition)],
		parent: &Option<UserDefinedType>,
		context: &JSifyContext,
	) {
		// Handle parent class: Need to call super and pass its captured fields (we assume the parent client is already written)
		let mut parent_captures = vec![];
		if let Some(parent) = parent {
			let parent_type = resolve_user_defined_type(parent, env, 0).unwrap();
			parent_captures.extend(self.get_captures(parent_type));
		}

		// Get the fields that are captured by this resource but not by its parent, they will be initialized in the generated constructor
		let my_captures = captured_fields
			.iter()
			.filter(|(name, _, _)| !parent_captures.iter().any(|(n, _, _)| n == name))
			.collect_vec();

		let super_call = if parent.is_some() {
			format!(
				"  super({});",
				parent_captures
					.iter()
					.map(|(name, _, _)| name.clone())
					.collect_vec()
					.join(", ")
			)
		} else {
			"".to_string()
		};

		// TODO jsify inflight fields: https://github.com/winglang/wing/issues/864

		let client_constructor = format!(
			"constructor({{ {} }}) {{\n{}\n{}\n}}",
			captured_fields
				.iter()
				.map(|(name, _, _)| { name.clone() })
				.collect_vec()
				.join(", "),
			super_call,
			my_captures
				.iter()
				.map(|(name, _, _)| { format!("  this.{} = {};", name, name) })
				.collect_vec()
				.join("\n")
		);

		let client_methods = inflight_methods
			.iter()
			.map(|(name, def)| {
				self.jsify_function(
					Some(&name.name),
					&def,
					&JSifyContext {
						in_json: context.in_json.clone(),
						phase: def.signature.phase,
					},
				)
			})
			.collect_vec();

		let client_source = format!(
			"class {} {} {{\n{}\n{}}}\nexports.{} = {};",
			name.name,
			if let Some(parent) = parent {
				format!("extends {}", self.jsify_user_defined_type(parent))
			} else {
				"".to_string()
			},
			client_constructor,
			client_methods.join("\n"),
			name.name,
			name.name
		);

		let clients_dir = format!("{}/clients", self.out_dir.to_string_lossy());
		fs::create_dir_all(&clients_dir).expect("Creating inflight clients");
		let client_file_name = format!("{}.inflight.js", name.name);
		let relative_file_path = format!("{}/{}", clients_dir, client_file_name);
		fs::write(&relative_file_path, client_source).expect("Writing client inflight source");
	}

	fn jsify_class(&mut self, env: &SymbolEnv, class: &AstClass, context: &JSifyContext) -> String {
		if class.is_resource {
			return self.jsify_resource(env, class, context);
		}

		format!(
			"class {}{}\n{{\n{}\n{}\n{}\n}}",
			self.jsify_symbol(&class.name),
			if let Some(parent) = &class.parent {
				format!(" extends {}", self.jsify_user_defined_type(parent))
			} else {
				"".to_string()
			},
			self.jsify_constructor(Some("constructor"), &class.constructor, context),
			class
				.fields
				.iter()
				.map(|m| self.jsify_class_member(m))
				.collect::<Vec<String>>()
				.join("\n"),
			class
				.methods
				.iter()
				.map(|(n, m)| self.jsify_function(Some(&n.name), &m, context))
				.collect::<Vec<String>>()
				.join("\n")
		)
	}

	/// Get the type and capture info for fields that are captured in the client of the given resource
	/// Returns a map from method name to a map from field name to a set of operations
	fn find_inflight_references(
		&mut self,
		resource_class: &AstClass,
	) -> Vec<(String, BTreeMap<String, BTreeSet<String>>)> {
		let inflight_methods = resource_class
			.methods
			.iter()
			.filter(|(_, m)| m.signature.phase == Phase::Inflight);

		let mut result = vec![];

		for (method_name, function_def) in inflight_methods {
			// visit statements of method and find all references to fields ("this.xxx")
			let visitor = FieldReferenceVisitor::new(&function_def);
			let (refs, find_diags) = visitor.find_refs();

			self.diagnostics.extend(find_diags);

			// add the references to the result
			result.push((method_name.name.clone(), refs));
		}

		return result;
	}

	// Get the type and capture info for fields that are captured in the client of the given resource
	fn get_captures(&self, resource_type: TypeRef) -> Vec<(String, TypeRef, Vec<String>)> {
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
			.map(|(name, kind, _)| {
				let _type = kind.as_variable().unwrap().type_;
				// TODO: For now we collect all the inflight methods in the resource (in the future we
				// we'll need to analyze each inflight method to see what it does with the captured resource)
				let methods = if _type.as_resource().is_some() {
					_type
						.as_resource()
						.unwrap()
						.methods(true)
						.filter_map(|(name, sig)| {
							if sig.as_function_sig().unwrap().phase == Phase::Inflight {
								Some(name)
							} else {
								None
							}
						})
						.collect_vec()
				} else {
					vec![]
				};

				(name, _type, methods)
			})
			.collect_vec()
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

	diagnostics: Diagnostics,
}

impl<'a> FieldReferenceVisitor<'a> {
	pub fn new(function_def: &'a FunctionDefinition) -> Self {
		Self {
			references: BTreeMap::new(),
			diagnostics: Diagnostics::new(),
			function_def,
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

		if !is_field_reference {
			visit::visit_expr(self, node);
			return;
		}

		let mut index = 1; // we know i[0] is "this" and that we have at least 2 parts

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

		let fmt = |x: Iter<&Component>| x.map(|f| format!("{}", f.text)).collect_vec();
		let key = format!("this.{}", fmt(capture.iter()).join("."));
		let ops = fmt(qualification);

		self.references.entry(key.to_string()).or_default().extend(ops);
	}
}

#[derive(Clone, Debug)]

struct Component<'a> {
	expr: &'a Expr,
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
				return vec![Component {
					expr: node,
					text: x.name.to_string(),
					variable: None,
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
