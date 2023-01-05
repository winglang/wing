use itertools::Itertools;
use std::{cmp::Ordering, fs, path::PathBuf};

use sha2::{Digest, Sha256};

use crate::{
	ast::{
		ArgList, BinaryOperator, ClassMember, Expr, ExprKind, FunctionDefinition, InterpolatedStringPart, Literal, Phase,
		Reference, Scope, Stmt, StmtKind, Symbol, Type, UnaryOperator, UtilityFunctions,
	},
	utilities::snake_case_to_camel_case,
};

const STDLIB: &str = "$stdlib";
const STDLIB_MODULE: &str = "@winglang/wingsdk";

const TARGET_CODE: &str = r#"
function __app(target) {
	switch (target) {
		case "sim":
			return $stdlib.sim.App;
		case "tfaws":
		case "tf-aws":
			return $stdlib.tfaws.App;
		default:
			throw new Error(`Unknown WING_TARGET value: "${process.env.WING_TARGET ?? ""}"`);
	}
}
const $App = __app(process.env.WING_TARGET);
"#;
const TARGET_APP: &str = "$App";

const INFLIGHT_OBJ_PREFIX: &str = "$Inflight";

pub struct JSifier {
	pub out_dir: PathBuf,
	shim: bool,
	app_name: String,
}

impl JSifier {
	pub fn new(out_dir: PathBuf, app_name: &str, shim: bool) -> Self {
		Self {
			out_dir,
			shim,
			app_name: app_name.to_string(),
		}
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
			(StmtKind::Class { .. }, StmtKind::Class { .. }) => Ordering::Equal,
			(StmtKind::Class { .. }, _) => Ordering::Less,
			(_, StmtKind::Class { .. }) => Ordering::Greater,
			_ => Ordering::Equal,
		}) {
			let line = self.jsify_statement(statement, Phase::Preflight); // top level statements are always preflight
			if line.is_empty() {
				continue;
			}
			if let StmtKind::Use {
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
				format!("super({{ outdir: $outdir, name: \"{}\" }});\n", self.app_name),
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
			let statement_str = format!("{}", self.jsify_statement(statement, phase));
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
	// note: Globals are emitted here and wrapped in "{{ ... }}" blocks. Wrapping makes these emissions, actual
	// statements and not expressions. this makes the runtime panic if these are used in place of expressions.
	fn jsify_global_utility_function(&self, args: &ArgList, function_type: UtilityFunctions) -> String {
		match function_type {
			UtilityFunctions::Assert => {
				return format!(
					"{{((cond) => {{if (!cond) throw new Error(`assertion failed: '{0}'`)}})({0})}}",
					self.jsify_arg_list(args, None, None, false)
				);
			}
			UtilityFunctions::Print => {
				return format!("{{console.log({})}}", self.jsify_arg_list(args, None, None, false));
			}
			UtilityFunctions::Throw => {
				return format!(
					"{{((msg) => {{throw new Error(msg)}})({})}}",
					self.jsify_arg_list(args, None, None, false)
				);
			}
			UtilityFunctions::Panic => {
				return format!(
					"{{((msg) => {{console.error(msg, (new Error()).stack);process.exit(1)}})({})}}",
					self.jsify_arg_list(args, None, None, false)
				);
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

	fn jsify_arg_list(&self, arg_list: &ArgList, scope: Option<&str>, id: Option<&str>, case_convert: bool) -> String {
		let mut args = vec![];
		let mut structure_args = vec![];

		if let Some(scope_str) = scope {
			args.push(scope_str.to_string());
		}

		if let Some(id_str) = id {
			args.push(format!("\"{}\"", id_str));
		}

		for arg in arg_list.pos_args.iter() {
			args.push(self.jsify_expression(arg, Phase::Independent));
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

	fn jsify_type(&self, typ: &Type) -> String {
		match typ {
			Type::CustomType { root, fields } => {
				if fields.is_empty() {
					return self.jsify_symbol(root);
				} else {
					format!(
						"{}.{}",
						self.jsify_symbol(root),
						fields
							.iter()
							.map(|f| self.jsify_symbol(f))
							.collect::<Vec<String>>()
							.join(".")
					)
				}
			}
			_ => todo!(),
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
							should_case_convert
						)
					)
				} else {
					format!(
						"new {}({})",
						self.jsify_type(&class),
						self.jsify_arg_list(&arg_list, None, None, should_case_convert)
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
			ExprKind::Call { function, args } => {
				let mut needs_case_conversion = false;
				if matches!(&function, Reference::Identifier(Symbol { name, .. }) if name == UtilityFunctions::Print.to_string().as_str())
				{
					return self.jsify_global_utility_function(&args, UtilityFunctions::Print);
				} else if matches!(&function, Reference::Identifier(Symbol { name, .. }) if name == UtilityFunctions::Assert.to_string().as_str())
				{
					return self.jsify_global_utility_function(&args, UtilityFunctions::Assert);
				} else if matches!(&function, Reference::Identifier(Symbol { name, .. }) if name == UtilityFunctions::Panic.to_string().as_str())
				{
					return self.jsify_global_utility_function(&args, UtilityFunctions::Panic);
				} else if matches!(&function, Reference::Identifier(Symbol { name, .. }) if name == UtilityFunctions::Throw.to_string().as_str())
				{
					return self.jsify_global_utility_function(&args, UtilityFunctions::Throw);
				} else if let Reference::NestedIdentifier { object, .. } = function {
					let object_type = object.evaluated_type.borrow().unwrap();

					needs_case_conversion = if let Some(obj) = object_type.as_class_or_resource() {
						obj.should_case_convert_jsii
					} else {
						// There are two reasons this could happen:
						// 1. The object is a `any` type, which is either something unimplemented or an explicit `any` from JSII.
						// 2. The object is a builtin type (e.g. Array) but the call reference intentionally resolves to a JSII class.
						// In either case, it's probably safe to assume that case conversion is required.
						true
					};
				}
				format!(
					"({}{}({}))",
					auto_await,
					self.jsify_reference(&function, Some(needs_case_conversion), phase),
					self.jsify_arg_list(&args, None, None, needs_case_conversion)
				)
			}
			ExprKind::Unary { op, exp } => {
				let op = match op {
					UnaryOperator::Plus => "+",
					UnaryOperator::Minus => "-",
					UnaryOperator::Not => "!",
				};
				format!("({}{})", op, self.jsify_expression(exp, phase))
			}
			ExprKind::Binary { op, lexp, rexp } => {
				let op = match op {
					BinaryOperator::Add => "+",
					BinaryOperator::Sub => "-",
					BinaryOperator::Mul => "*",
					BinaryOperator::Div => "/",
					BinaryOperator::Mod => "%",
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
					self.jsify_expression(lexp, phase),
					op,
					self.jsify_expression(rexp, phase)
				)
			}
			ExprKind::ArrayLiteral { items, .. } => {
				format!(
					"Object.freeze([{}])",
					items
						.iter()
						.map(|expr| self.jsify_expression(expr, phase))
						.collect::<Vec<String>>()
						.join(", ")
				)
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
					"Object.freeze({{{}}})",
					fields
						.iter()
						.map(|(key, expr)| format!("\"{}\": {}", key, self.jsify_expression(expr, phase)))
						.collect::<Vec<String>>()
						.join(", ")
				)
			}
			ExprKind::FunctionClosure(func_def) => match func_def.signature.flight {
				Phase::Inflight => self.jsify_inflight_function(func_def),
				Phase::Independent => unimplemented!(),
				Phase::Preflight => self.jsify_function(None, &func_def.parameter_names, &func_def.statements, phase),
			},
		}
	}

	fn jsify_statement(&self, statement: &Stmt, phase: Phase) -> String {
		match &statement.kind {
			StmtKind::Use {
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
					if module_name.name.starts_with("\"./") {
						// TODO so many assumptions here, would only wort with a JS file
						format!("require({})", module_name.name)
					} else {
						format!("require('{}').{}", STDLIB_MODULE, module_name.name)
					}
				)
			}
			StmtKind::VariableDef {
				var_name,
				initial_value,
				type_: _,
			} => {
				let initial_value = self.jsify_expression(initial_value, phase);
				// TODO: decide on `const` vs `let` once we have mutables
				format!("const {} = {};", self.jsify_symbol(var_name), initial_value)
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
				else_statements,
			} => {
				if let Some(else_scope) = else_statements {
					format!(
						"if ({}) {} else {}",
						self.jsify_expression(condition, phase),
						self.jsify_scope(statements, phase),
						self.jsify_scope(else_scope, phase)
					)
				} else {
					format!(
						"if ({}) {}",
						self.jsify_expression(condition, phase),
						self.jsify_scope(statements, phase)
					)
				}
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
			StmtKind::Class {
				name,
				members,
				methods,
				parent,
				constructor,
				is_resource,
			} => {
				if *is_resource {
					// TODO...
				}

				format!(
					"class {}{}\n{{\n{}\n{}\n{}\n}}",
					self.jsify_symbol(name),
					if let Some(parent) = parent {
						format!(" extends {}", self.jsify_type(parent))
					} else {
						"".to_string()
					},
					self.jsify_function(
						Some("constructor"),
						&constructor.parameters,
						&constructor.statements,
						phase
					),
					members
						.iter()
						.map(|m| self.jsify_class_member(m))
						.collect::<Vec<String>>()
						.join("\n"),
					methods
						.iter()
						.map(|(n, m)| format!(
							"{} = {}",
							n.name,
							self.jsify_function(None, &m.parameter_names, &m.statements, phase)
						))
						.collect::<Vec<String>>()
						.join("\n")
				)
			}
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
		}
	}

	fn jsify_inflight_function(&self, func_def: &FunctionDefinition) -> String {
		let mut parameter_list = vec![];
		for p in func_def.parameter_names.iter() {
			parameter_list.push(p.name.clone());
		}
		let block = self.jsify_scope(&func_def.statements, Phase::Inflight);
		let procid = base16ct::lower::encode_string(&Sha256::new().chain_update(&block).finalize());
		let mut bindings = vec![];
		let mut capture_names = vec![];
		for (obj, cap_def) in func_def.captures.borrow().as_ref().unwrap().iter() {
			capture_names.push(obj.clone());
			bindings.push(format!(
				"{}: {},",
				obj,
				Self::render_block([
					format!("resource: {},", obj),
					format!(
						"ops: [{}]",
						cap_def
							.iter()
							.map(|x| format!("\"{}\"", x.method))
							.collect::<Vec<_>>()
							.join(",")
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
				"code: {}.core.NodeJsCode.fromFile(require('path').resolve(__dirname, \"{}\")),",
				STDLIB, &relative_file_path
			),
			if !bindings.is_empty() {
				format!("bindings: {}", Self::render_block(&bindings))
			} else {
				"".to_string()
			},
		]);
		let short_hash = procid.clone().split_off(procid.len() - 8);
		let inflight_obj_id = format!("{}{}", INFLIGHT_OBJ_PREFIX, short_hash);
		format!(
			"new {}.core.Inflight(this, \"{}\", {})",
			STDLIB, inflight_obj_id, props_block
		)
	}

	fn jsify_function(&self, name: Option<&str>, parameters: &[Symbol], body: &Scope, phase: Phase) -> String {
		let mut parameter_list = vec![];
		for p in parameters.iter() {
			parameter_list.push(self.jsify_symbol(p));
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

	fn jsify_class_member(&self, member: &ClassMember) -> String {
		format!("{};", self.jsify_symbol(&member.name))
	}
}
