use aho_corasick::AhoCorasick;
use indoc::formatdoc;
use itertools::Itertools;
use std::{cell::RefCell, cmp::Ordering, fs, path::Path, vec};

use sha2::{Digest, Sha256};

use crate::{
	ast::{
		ArgList, BinaryOperator, Class as AstClass, ClassField, Constructor, Expr, ExprKind, FunctionDefinition,
		InterpolatedStringPart, Literal, Phase, Reference, Scope, Stmt, StmtKind, Symbol, TypeAnnotation, UnaryOperator,
		UserDefinedType,
	},
	type_check::{resolve_user_defined_type, symbol_env::SymbolEnv, TypeRef},
	utilities::snake_case_to_camel_case,
	MACRO_REPLACE_ARGS, MACRO_REPLACE_SELF, WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE,
};

const STDLIB: &str = "$stdlib";
const STDLIB_MODULE: &str = WINGSDK_ASSEMBLY_NAME;
const INFLIGHT_CLIENTS_DIR: &str = "clients";

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
		default:
			throw new Error(`Unknown WING_TARGET value: "${process.env.WING_TARGET ?? ""}"`);
	}
}
const $App = __app(process.env.WING_TARGET);
"#;
const TARGET_APP: &str = "$App";

const INFLIGHT_OBJ_PREFIX: &str = "$Inflight";

pub struct JSifier<'a> {
	pub out_dir: &'a Path,
	shim: bool,
	app_name: String,
	inflight_counter: RefCell<usize>,
}

impl<'a> JSifier<'a> {
	pub fn new(out_dir: &'a Path, app_name: &str, shim: bool) -> Self {
		Self {
			out_dir,
			shim,
			app_name: app_name.to_string(),
			inflight_counter: RefCell::new(0),
		}
	}

	fn js_resolve_path(path_name: &str) -> String {
		format!(
			"require('path').resolve(__dirname, \"{}\").replace(/\\\\/g, \"/\")",
			path_name
		)
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

	pub fn jsify(&self, scope: &Scope) -> String {
		let mut js = vec![];
		let mut imports = vec![];

		for statement in scope.statements.iter().sorted_by(|a, b| match (&a.kind, &b.kind) {
			// Put type definitions first so JS won't complain of unknown types
			(StmtKind::Class(AstClass { .. }), StmtKind::Class(AstClass { .. })) => Ordering::Equal,
			(StmtKind::Class(AstClass { .. }), _) => Ordering::Less,
			(_, StmtKind::Class(AstClass { .. })) => Ordering::Greater,
			_ => Ordering::Equal,
		}) {
			let line = self.jsify_statement(scope.env.borrow().as_ref().unwrap(), statement, Phase::Preflight); // top level statements are always preflight
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
			output.push(format!("const $outdir = process.env.WINGSDK_SYNTH_DIR ?? \".\";"));
			output.push(TARGET_CODE.to_owned());
		}

		output.append(&mut imports);

		if self.shim {
			js.insert(
				0,
				format!(
					"super({{ outdir: $outdir, name: \"{}\", plugins: $plugins }});\n",
					self.app_name
				),
			);
			output.push(format!(
				"class MyApp extends {} {{\nconstructor() {}\n}}",
				TARGET_APP,
				JSifier::render_block(js)
			));
			output.push(format!("new MyApp().synth();"));
		} else {
			output.append(&mut js);
		}
		output.join("\n")
	}

	fn jsify_scope(&self, scope: &Scope, phase: Phase) -> String {
		let mut lines = vec![];
		lines.push("{".to_string());

		for statement in scope.statements.iter() {
			let statement_str = self.jsify_statement(scope.env.borrow().as_ref().unwrap(), statement, phase);
			let result = statement_str.split("\n");
			for l in result {
				lines.push(format!("  {}", l));
			}
		}

		lines.push("}".to_string());
		lines.join("\n")
	}

	fn jsify_reference(&self, reference: &Reference, case_convert: Option<bool>, phase: Phase) -> String {
		let symbolize = if case_convert.unwrap_or(false) {
			Self::jsify_symbol_case_converted
		} else {
			Self::jsify_symbol
		};
		match reference {
			Reference::Identifier(identifier) => symbolize(self, identifier),
			Reference::NestedIdentifier { object, property } => {
				self.jsify_expression(object, phase) + "." + &symbolize(self, property)
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
		&self,
		arg_list: &ArgList,
		scope: Option<&str>,
		id: Option<&str>,
		case_convert: bool,
		phase: Phase,
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
			args.push(self.jsify_expression(arg, phase));
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
				self.jsify_expression(arg.1, Phase::Independent)
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

	fn jsify_expression(&self, expression: &Expr, phase: Phase) -> String {
		let auto_await = match phase {
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
				let is_resource = if let Some(evaluated_type) = expression.evaluated_type.borrow().as_ref() {
					evaluated_type.as_resource().is_some()
				} else {
					// TODO Hack: This object type is not known. How can we tell if it's a resource or not?
					true
				};
				let should_case_convert = if let Some(cls) = expression_type.unwrap().as_class_or_resource() {
					cls.should_case_convert_jsii
				} else {
					// This should only happen in the case of `any`, which are almost certainly JSII imports.
					true
				};

				// If this is a resource then add the scope and id to the arg list
				if is_resource {
					format!(
						"new {}({})",
						self.jsify_type(class),
						self.jsify_arg_list(
							&arg_list,
							Some("this"),
							Some(&format!("{}", obj_id.as_ref().unwrap_or(&self.jsify_type(class)))),
							should_case_convert,
							phase
						)
					)
				} else {
					format!(
						"new {}({})",
						self.jsify_type(&class),
						self.jsify_arg_list(&arg_list, None, None, should_case_convert, phase)
					)
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
							InterpolatedStringPart::Expr(e) => format!("${{{}}}", self.jsify_expression(e, phase)),
						})
						.collect::<Vec<String>>()
						.join("")
				),
				Literal::Number(n) => format!("{}", n),
				Literal::Duration(sec) => format!("{}.std.Duration.fromSeconds({})", STDLIB, sec),
				Literal::Boolean(b) => format!("{}", if *b { "true" } else { "false" }),
			},
			ExprKind::Reference(_ref) => self.jsify_reference(&_ref, None, phase),
			ExprKind::Call { function, arg_list } => {
				let function_type = function.evaluated_type.borrow().unwrap();
				let function_sig = function_type
					.as_function_sig()
					.expect("Expected expression to be callable");
				let mut needs_case_conversion = false;

				let expr_string = match &function.kind {
					ExprKind::Reference(reference) => {
						if let Reference::NestedIdentifier { object, .. } = reference {
							let object_type = object.evaluated_type.borrow().unwrap();
							if let Some(class) = object_type.as_class_or_resource() {
								needs_case_conversion = class.should_case_convert_jsii;
							} else {
								// TODO I think in this case we shouldn't convert tye case but originally we had code that
								// set `needs_case_conversion` to true for `any` and builtin types, and I'm not sure why..
								needs_case_conversion = false;
							}
						}
						self.jsify_reference(reference, Some(needs_case_conversion), phase)
					}
					_ => format!("({})", self.jsify_expression(function, phase)),
				};
				let arg_string = self.jsify_arg_list(&arg_list, None, None, needs_case_conversion, phase);

				if let Some(js_override) = &function_sig.js_override {
					let self_string = &match &function.kind {
						// for "loose" macros, e.g. `print()`, $self$ is the global object
						ExprKind::Reference(Reference::Identifier(_)) => "global".to_string(),
						ExprKind::Reference(Reference::NestedIdentifier { object, .. }) => {
							self.jsify_expression(object, phase).clone()
						}

						_ => expr_string,
					};
					let patterns = &[MACRO_REPLACE_SELF, MACRO_REPLACE_ARGS];
					let replace_with = &[self_string, &arg_string];
					let ac = AhoCorasick::new(patterns);
					return ac.replace_all(js_override, replace_with);
				}

				format!("({}{}({}))", auto_await, expr_string, arg_string)
			}
			ExprKind::Unary { op, exp } => {
				let op = match op {
					UnaryOperator::Minus => "-",
					UnaryOperator::Not => "!",
				};
				format!("({}{})", op, self.jsify_expression(exp, phase))
			}
			ExprKind::Binary { op, left, right } => {
				let op = match op {
					BinaryOperator::Add => "+",
					BinaryOperator::Sub => "-",
					BinaryOperator::Mul => "*",
					BinaryOperator::Div => "/",
					BinaryOperator::Mod => "%",
					BinaryOperator::Exponent => "**",
					BinaryOperator::Greater => ">",
					BinaryOperator::GreaterOrEqual => ">=",
					BinaryOperator::Less => "<",
					BinaryOperator::LessOrEqual => "<=",
					BinaryOperator::Equal => "===",
					BinaryOperator::NotEqual => "!==",
					BinaryOperator::LogicalAnd => "&&",
					BinaryOperator::LogicalOr => "||",
				};
				format!(
					"({} {} {})",
					self.jsify_expression(left, phase),
					op,
					self.jsify_expression(right, phase)
				)
			}
			ExprKind::ArrayLiteral { items, .. } => {
				let item_list = items
					.iter()
					.map(|expr| self.jsify_expression(expr, phase))
					.collect::<Vec<String>>()
					.join(", ");

				if is_mutable_collection(expression) {
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
						.map(|(name, expr)| format!("\"{}\": {},", name.name, self.jsify_expression(expr, phase)))
						.collect::<Vec<String>>()
						.join("\n")
				)
			}
			ExprKind::MapLiteral { fields, .. } => {
				format!(
					"Object.freeze(new Map([{}]))",
					fields
						.iter()
						.map(|(key, expr)| format!("[ \"{}\", {} ]", key, self.jsify_expression(expr, phase)))
						.collect::<Vec<String>>()
						.join(", ")
				)
			}
			ExprKind::SetLiteral { items, .. } => {
				let item_list = items
					.iter()
					.map(|expr| self.jsify_expression(expr, phase))
					.collect::<Vec<String>>()
					.join(", ");

				if is_mutable_collection(expression) {
					format!("new Set([{}])", item_list)
				} else {
					format!("Object.freeze(new Set([{}]))", item_list)
				}
			}
			ExprKind::FunctionClosure(func_def) => match func_def.signature.flight {
				Phase::Inflight => self.jsify_inflight_function(func_def),
				Phase::Independent => unimplemented!(),
				Phase::Preflight => self.jsify_function(None, &func_def.parameters, &func_def.statements, phase),
			},
		}
	}

	fn jsify_statement(&self, env: &SymbolEnv, statement: &Stmt, phase: Phase) -> String {
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
				let initial_value = self.jsify_expression(initial_value, phase);
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
				self.jsify_expression(iterable, phase),
				self.jsify_scope(statements, phase)
			),
			StmtKind::While { condition, statements } => {
				format!(
					"while ({}) {}",
					self.jsify_expression(condition, phase),
					self.jsify_scope(statements, phase),
				)
			}
			StmtKind::If {
				condition,
				statements,
				elif_statements,
				else_statements,
			} => {
				let mut if_statement = format!(
					"if ({}) {}",
					self.jsify_expression(condition, phase),
					self.jsify_scope(statements, phase),
				);

				for elif_block in elif_statements {
					let elif_statement = format!(
						" else if ({}) {}",
						self.jsify_expression(&elif_block.condition, phase),
						self.jsify_scope(&elif_block.statements, phase),
					);
					if_statement.push_str(&elif_statement);
				}

				if let Some(else_scope) = else_statements {
					let else_statement = format!(" else {}", self.jsify_scope(else_scope, phase));
					if_statement.push_str(&else_statement);
				}

				if_statement
			}
			StmtKind::Expression(e) => format!("{};", self.jsify_expression(e, phase)),
			StmtKind::Assignment { variable, value } => {
				format!(
					"{} = {};",
					self.jsify_reference(&variable, None, phase),
					self.jsify_expression(value, phase)
				)
			}
			StmtKind::Scope(scope) => self.jsify_scope(scope, phase),
			StmtKind::Return(exp) => {
				if let Some(exp) = exp {
					format!("return {};", self.jsify_expression(exp, phase))
				} else {
					"return;".into()
				}
			}
			StmtKind::Class(class) => self.jsify_class(env, class, phase),
			StmtKind::Struct { name, extends, members } => {
				format!(
					"interface {}{} {{\n{}\n}}",
					self.jsify_symbol(name),
					if !extends.is_empty() {
						format!(
							" extends {}",
							extends
								.iter()
								.map(|s| self.jsify_symbol(s))
								.collect::<Vec<String>>()
								.join(", ")
						)
					} else {
						"".to_string()
					},
					members
						.iter()
						.map(|m| self.jsify_class_member(m))
						.collect::<Vec<String>>()
						.join("\n")
				)
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
				let try_block = self.jsify_scope(try_statements, phase);
				let mut catch_statements = "".to_string();
				let mut js_exception_var = "".to_string();
				let mut exception_var_conversion = "".to_string();
				if let Some(catch_block) = catch_block {
					catch_statements = self.jsify_scope(&catch_block.statements, phase);
					if let Some(exception_var_symbol) = &catch_block.exception_var {
						let exception_var_str = self.jsify_symbol(exception_var_symbol);
						js_exception_var = format!("($error_{exception_var_str})");
						exception_var_conversion = format!("const {exception_var_str} = $error_{exception_var_str}.message;");
					}
				}
				let finally_block = if let Some(finally_statements) = finally_statements {
					format!("{};", self.jsify_scope(finally_statements, phase))
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

	fn jsify_inflight_function(&self, func_def: &FunctionDefinition) -> String {
		let mut parameter_list = vec![];
		for p in func_def.parameters.iter() {
			parameter_list.push(p.0.name.clone());
		}
		let block = self.jsify_scope(&func_def.statements, Phase::Inflight);
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
		proc_source.push(format!("async handle({}) {};", parameter_list.join(", "), body));
		let proc_dir = format!("{}/proc.{}", self.out_dir.to_string_lossy(), procid);
		fs::create_dir_all(&proc_dir).expect("Creating inflight proc dir");
		let file_path = format!("{}/index.js", proc_dir);
		let relative_file_path = format!("proc.{}/index.js", procid);
		fs::write(&file_path, proc_source.join("\n")).expect("Writing inflight proc source");
		let props_block = Self::render_block([
			format!(
				"code: {}.core.NodeJsCode.fromFile({}),",
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

	fn jsify_function(&self, name: Option<&str>, parameters: &[(Symbol, bool)], body: &Scope, phase: Phase) -> String {
		let mut parameter_list = vec![];
		for p in parameters.iter() {
			parameter_list.push(self.jsify_symbol(&p.0));
		}

		let (name, arrow) = match name {
			Some(name) => (name, ""),
			None => ("", "=> "),
		};

		format!(
			"{}({}) {}{}",
			name,
			parameter_list.iter().map(|x| x.as_str()).collect::<Vec<_>>().join(", "),
			arrow,
			self.jsify_scope(body, phase)
		)
	}

	fn jsify_class_member(&self, member: &ClassField) -> String {
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
	fn jsify_resource(&self, env: &SymbolEnv, class: &AstClass, phase: Phase) -> String {
		assert!(phase == Phase::Preflight);

		// Lookup the resource type
		let resource_type = env.lookup(&class.name, None).unwrap().as_type().unwrap();

		// Get fields to be captured by resource's client
		let captured_fields = self.get_captures(resource_type);

		// Jsify inflight client
		let inflight_methods = class
			.methods
			.iter()
			.filter(|(_, m)| m.signature.flight == Phase::Inflight)
			.collect::<Vec<_>>();
		self.jsify_resource_client(env, &class.name, &captured_fields, &inflight_methods, &class.parent);

		// Get all preflight methods to be jsified to the preflight class
		let preflight_methods = class
			.methods
			.iter()
			.filter(|(_, m)| m.signature.flight != Phase::Inflight)
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
				format!(" extends {}.{}", STDLIB, WINGSDK_RESOURCE)
			},
			self.jsify_resource_constructor(&class.constructor, class.parent.is_none()),
			preflight_methods
				.iter()
				.map(|(n, m)| format!(
					"{} = {}",
					n.name,
					self.jsify_function(None, &m.parameters, &m.statements, phase)
				))
				.collect::<Vec<String>>()
				.join("\n"),
		);

		// For each inflight methods generate an annotation which includes a list of all the captured
		// fields and all the ops they provide.
		// TODO: in the future we should only pass the relevant captured fields and ops to each method.
		let default_annotation = captured_fields
			.iter()
			.map(|(name, _, ops)| {
				format!(
					"\"this.{}\": {{ ops: [{}]}}",
					name,
					ops.iter().map(|op| format!("\"{}\"", op)).collect_vec().join(", ")
				)
			})
			.collect_vec()
			.join(", ");
		let inflight_annotations = inflight_methods
			.iter()
			.map(|(method_name, ..)| {
				format!(
					"{}._annotateInflight(\"{}\", {{{}}});",
					class.name.name, method_name.name, default_annotation
				)
			})
			.collect_vec();

		// Return the preflight resource class
		return format!("{}\n{}", resource_class, inflight_annotations.join("\n"));
	}

	fn jsify_resource_constructor(&self, constructor: &Constructor, no_parent: bool) -> String {
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
			self.jsify_scope(&constructor.statements, Phase::Preflight)
		)
	}

	fn jsify_toinflight_method(
		&self,
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
				return {STDLIB}.core.NodeJsCode.fromInline(`(new (require(\"${{self_client_path}}\")).{resource_name}_inflight({{{captured_fields}}}))`);
			}}",
			resource_name = resource_name.name,
		)
	}

	// Write a client class for a file for the given resource
	fn jsify_resource_client(
		&self,
		env: &SymbolEnv,
		name: &Symbol,
		captured_fields: &[(String, TypeRef, Vec<String>)],
		inflight_methods: &[&(Symbol, FunctionDefinition)],
		parent: &Option<UserDefinedType>,
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
				format!(
					"async {}",
					self.jsify_function(Some(&name.name), &def.parameters, &def.statements, def.signature.flight)
				)
			})
			.collect_vec();

		let client_source = format!(
			"export class {}_inflight {} {{\n{}\n{}}}",
			name.name,
			if let Some(parent) = parent {
				format!("extends {}_inflight", self.jsify_user_defined_type(parent))
			} else {
				"".to_string()
			},
			client_constructor,
			client_methods.join("\n")
		);

		let clients_dir = format!("{}/clients", self.out_dir.to_string_lossy());
		fs::create_dir_all(&clients_dir).expect("Creating inflight clients");
		let client_file_name = format!("{}.inflight.js", name.name);
		let relative_file_path = format!("{}/{}", clients_dir, client_file_name);
		fs::write(&relative_file_path, client_source).expect("Writing client inflight source");
	}

	fn jsify_class(&self, env: &SymbolEnv, class: &AstClass, phase: Phase) -> String {
		if class.is_resource {
			return self.jsify_resource(env, class, phase);
		}

		format!(
			"class {}{}\n{{\n{}\n{}\n{}\n}}",
			self.jsify_symbol(&class.name),
			if let Some(parent) = &class.parent {
				format!(" extends {}", self.jsify_user_defined_type(parent))
			} else {
				"".to_string()
			},
			self.jsify_function(
				Some("constructor"),
				&class.constructor.parameters,
				&class.constructor.statements,
				phase
			),
			class
				.fields
				.iter()
				.map(|m| self.jsify_class_member(m))
				.collect::<Vec<String>>()
				.join("\n"),
			class
				.methods
				.iter()
				.map(|(n, m)| format!(
					"{} = {}",
					n.name,
					self.jsify_function(None, &m.parameters, &m.statements, phase)
				))
				.collect::<Vec<String>>()
				.join("\n")
		)
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
				var.flight != Phase::Inflight && !var.reassignable && var._type.is_capturable()
			})
			.map(|(name, kind, _)| {
				let _type = kind.as_variable().unwrap()._type;
				// TODO: For now we collect all the inflight methods in the resource (in the future we
				// we'll need to analyze each inflight method to see what it does with the captured resource)
				let methods = if _type.as_resource().is_some() {
					_type
						.as_resource()
						.unwrap()
						.methods(true)
						.filter_map(|(name, sig)| {
							if sig.as_function_sig().unwrap().flight == Phase::Inflight {
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
