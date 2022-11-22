use itertools::Itertools;
use std::{cmp::Ordering, fs, path::PathBuf};

use sha2::{Digest, Sha256};

use crate::{
	ast::{
		ArgList, BinaryOperator, ClassMember, Expr, ExprKind, FunctionDefinition, InterpolatedStringPart, Literal, Phase,
		Reference, Scope, Stmt, StmtKind, Symbol, Type, UnaryOperator,
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
	return lines.join("\n");
}

pub fn jsify(scope: &Scope, out_dir: &PathBuf, app_name: &str, shim: bool) -> String {
	let mut js = vec![];
	let mut imports = vec![];

	for statement in scope.statements.iter().sorted_by(|a, b| match (&a.kind, &b.kind) {
		// Put type definitions first so JS won't complain of unknown types
		(StmtKind::Class { .. }, StmtKind::Class { .. }) => Ordering::Equal,
		(StmtKind::Class { .. }, _) => Ordering::Less,
		(_, StmtKind::Class { .. }) => Ordering::Greater,
		_ => Ordering::Equal,
	}) {
		let line = jsify_statement(statement, &out_dir);
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

	if shim {
		output.push(format!("const {} = require('{}');", STDLIB, STDLIB_MODULE));
		output.push(format!("const $outdir = process.env.WINGSDK_SYNTH_DIR ?? \".\";"));
		output.push(TARGET_CODE.to_owned());
	}

	output.append(&mut imports);

	if shim {
		js.insert(0, format!("super({{ outdir: $outdir }});\n"));
		output.push(format!(
			"class MyApp extends {} {{\nconstructor() {}\n}}",
			TARGET_APP,
			render_block(js)
		));
		output.push(format!("new MyApp({{ name: \"{}\" }}).synth();", app_name));
	} else {
		output.append(&mut js);
	}
	output.join("\n")
}

fn jsify_scope(scope: &Scope, out_dir: &PathBuf) -> String {
	let mut lines = vec![];
	lines.push("{".to_string());

	for statement in scope.statements.iter() {
		let statement_str = format!("{}", jsify_statement(statement, &out_dir));
		let result = statement_str.split("\n");
		for l in result {
			lines.push(format!("  {}", l));
		}
	}

	lines.push("}".to_string());
	return lines.join("\n");
}

fn jsify_reference(reference: &Reference, case_convert: Option<bool>) -> String {
	let symbolize = if case_convert.unwrap_or(false) {
		jsify_symbol_case_converted
	} else {
		jsify_symbol
	};
	match reference {
		Reference::Identifier(identifier) => symbolize(identifier),
		Reference::NestedIdentifier { object, property } => jsify_expression(object) + "." + &symbolize(property),
	}
}

fn jsify_symbol_case_converted(symbol: &Symbol) -> String {
	let mut result = symbol.name.clone();
	result = snake_case_to_camel_case(&result);
	return format!("{}", result);
}
fn jsify_symbol(symbol: &Symbol) -> String {
	return format!("{}", symbol.name);
}

fn jsify_arg_list(arg_list: &ArgList, scope: Option<&str>, id: Option<&str>) -> String {
	if !arg_list.pos_args.is_empty() && !arg_list.named_args.is_empty() {
		// TODO?
		// JS doesn't support named args, this is probably to pass props to a construct. Can't mix that with positional args.
		panic!("Cannot use positional and named arguments in the same call");
	}

	let mut args = vec![];

	if let Some(scope_str) = scope {
		args.push(scope_str.to_string());
	}

	if let Some(id_str) = id {
		args.push(format!("\"{}\"", id_str));
	}

	if !arg_list.pos_args.is_empty() || !args.is_empty() {
		for arg in arg_list.pos_args.iter() {
			args.push(jsify_expression(arg));
		}
		return args.join(",");
	} else if !arg_list.named_args.is_empty() {
		for arg in arg_list.named_args.iter() {
			args.push(format!("{}: {}", arg.0.name, jsify_expression(arg.1)));
		}
		return format!("{{{}}}", args.join(","));
	} else {
		return "".to_string();
	}
}

fn jsify_type(typ: &Type) -> String {
	match typ {
		Type::CustomType { root, fields } => {
			if fields.is_empty() {
				return jsify_symbol(root);
			} else {
				format!(
					"{}.{}",
					jsify_symbol(root),
					fields.iter().map(jsify_symbol).collect::<Vec<String>>().join(".")
				)
			}
		}
		_ => todo!(),
	}
}

fn jsify_expression(expression: &Expr) -> String {
	match &expression.kind {
		ExprKind::New {
			class,
			obj_id,
			arg_list,
			obj_scope: _, // TODO
		} => {
			let is_resource = if let Some(evaluated_type) = expression.evaluated_type.borrow().as_ref() {
				evaluated_type.as_resource_object().is_some()
			} else {
				// TODO Hack: This object type is not known. How can we tell if it's a resource or not?
				// Currently, this occurs when a JSII import is untyped, such as when `WINGC_SKIP_JSII` is enabled and `bring cloud` is used.
				true
			};

			// If this is a resource then add the scope and id to the arg list
			if is_resource {
				format!(
					"new {}({})",
					jsify_type(class),
					jsify_arg_list(
						&arg_list,
						Some("this"),
						Some(&format!("{}", obj_id.as_ref().unwrap_or(&jsify_type(class))))
					)
				)
			} else {
				format!("new {}({})", jsify_type(&class), jsify_arg_list(&arg_list, None, None))
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
						InterpolatedStringPart::Expr(e) => format!("${{{}}}", jsify_expression(e)),
					})
					.collect::<Vec<String>>()
					.join("")
			),
			Literal::Number(n) => format!("{}", n),
			Literal::Duration(sec) => format!("{}.core.Duration.fromSeconds({})", STDLIB, sec),
			Literal::Boolean(b) => format!("{}", if *b { "true" } else { "false" }),
		},
		ExprKind::Reference(_ref) => jsify_reference(&_ref, None),
		ExprKind::Call { function, args } => {
			// TODO: implement "print" to use Logger resource
			// see: https://github.com/winglang/wing/issues/50
			if matches!(&function, Reference::Identifier(Symbol { name, .. }) if name == "print") {
				return format!("console.log({})", jsify_arg_list(args, None, None));
			}
			format!("{}({})", jsify_reference(&function, Some(true)), jsify_arg_list(&args, None, None))
		}
		ExprKind::Unary { op, exp } => {
			let op = match op {
				UnaryOperator::Plus => "+",
				UnaryOperator::Minus => "-",
				UnaryOperator::Not => "!",
			};
			format!("({}{})", op, jsify_expression(exp))
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
			format!("({} {} {})", jsify_expression(lexp), op, jsify_expression(rexp))
		}
		ExprKind::StructLiteral { fields, .. } => {
			format!(
				"{{\n{}}}\n",
				fields
					.iter()
					.map(|(name, expr)| format!("\"{}\": {},", name.name, jsify_expression(expr)))
					.collect::<Vec<String>>()
					.join("\n")
			)
		}
		ExprKind::MapLiteral { fields, .. } => {
			format!(
				"{{\n{}\n}}",
				fields
					.iter()
					.map(|(key, expr)| format!("\"{}\": {},", key, jsify_expression(expr)))
					.collect::<Vec<String>>()
					.join("\n")
			)
		}
	}
}

fn jsify_statement(statement: &Stmt, out_dir: &PathBuf) -> String {
	match &statement.kind {
		StmtKind::Use {
			module_name,
			identifier,
		} => {
			format!(
				"const {} = {};",
				jsify_symbol(if let Some(identifier) = identifier {
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
			let initial_value = jsify_expression(initial_value);
			format!("let {} = {};", jsify_symbol(var_name), initial_value)
		}
		StmtKind::FunctionDefinition(func_def) => match func_def.signature.flight {
			Phase::Inflight => jsify_inflight_function(func_def, &out_dir),
			Phase::Independent => unimplemented!(),
			Phase::Preflight => jsify_function(
				format!("function {}", jsify_symbol(&func_def.name)).as_str(),
				&func_def.parameters,
				&func_def.statements,
				&out_dir,
			),
		},
		StmtKind::ForLoop {
			iterator,
			iterable,
			statements,
		} => format!(
			"for(const {} of {}) {}",
			jsify_symbol(iterator),
			jsify_expression(iterable),
			jsify_scope(statements, &out_dir)
		),
		StmtKind::If {
			condition,
			statements,
			else_statements,
		} => {
			if let Some(else_scope) = else_statements {
				format!(
					"if ({}) {} else {}",
					jsify_expression(condition),
					jsify_scope(statements, &out_dir),
					jsify_scope(else_scope, &out_dir)
				)
			} else {
				format!(
					"if ({}) {}",
					jsify_expression(condition),
					jsify_scope(statements, &out_dir)
				)
			}
		}
		StmtKind::Expression(e) => format!("{};", jsify_expression(e)),
		StmtKind::Assignment { variable, value } => {
			format!("{} = {};", jsify_reference(&variable, None), jsify_expression(value))
		}
		StmtKind::Scope(scope) => jsify_scope(scope, &out_dir),
		StmtKind::Return(exp) => {
			if let Some(exp) = exp {
				format!("return {};", jsify_expression(exp))
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
				jsify_symbol(name),
				if let Some(parent) = parent {
					format!(" extends {}", jsify_type(parent))
				} else {
					"".to_string()
				},
				jsify_function(
					"constructor",
					&constructor.parameters,
					&constructor.statements,
					&out_dir
				),
				members
					.iter()
					.map(jsify_class_member)
					.collect::<Vec<String>>()
					.join("\n"),
				methods
					.iter()
					.map(|f| jsify_function(jsify_symbol(&f.name).as_str(), &f.parameters, &f.statements, &out_dir))
					.collect::<Vec<String>>()
					.join("\n")
			)
		}
		StmtKind::Struct { name, extends, members } => {
			format!(
				"interface {}{} {{\n{}\n}}",
				jsify_symbol(name),
				if !extends.is_empty() {
					format!(
						" extends {}",
						extends.iter().map(jsify_symbol).collect::<Vec<String>>().join(", ")
					)
				} else {
					"".to_string()
				},
				members
					.iter()
					.map(jsify_class_member)
					.collect::<Vec<String>>()
					.join("\n")
			)
		}
	}
}

fn jsify_inflight_function(func_def: &FunctionDefinition, out_dir: &PathBuf) -> String {
	let mut parameter_list = vec![];
	for p in func_def.parameters.iter() {
		parameter_list.push(p.name.clone());
	}
	let block = jsify_scope(&func_def.statements, &out_dir);
	let procid = base16ct::lower::encode_string(&Sha256::new().chain_update(&block).finalize());
	let mut bindings = vec![];
	let mut capture_names = vec![];
	for (obj, cap_def) in func_def.captures.borrow().as_ref().unwrap().iter() {
		capture_names.push(obj.name.clone());
		bindings.push(format!(
			"{}: {},",
			obj.name,
			render_block([
				format!("resource: {},", obj.name),
				format!(
					"methods: [{}]",
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
	proc_source.push(format!(
		"async function $proc({{ {} }}, {}) {};",
		capture_names.join(", "),
		parameter_list.join(", "),
		block
	));
	let proc_dir = format!("{}/proc.{}", out_dir.to_string_lossy(), procid);
	fs::create_dir_all(&proc_dir).expect("Creating inflight proc dir");
	let file_path = format!("{}/index.js", proc_dir);
	let relative_file_path = format!("proc.{}/index.js", procid);
	fs::write(&file_path, proc_source.join("\n")).expect("Writing inflight proc source");
	let props_block = render_block([
		format!(
			"code: {}.core.NodeJsCode.fromFile(require('path').resolve(__dirname, \"{}\")),",
			STDLIB, &relative_file_path
		),
		format!("entrypoint: \"$proc\","),
		if !bindings.is_empty() {
			format!("captures: {}", render_block(&bindings))
		} else {
			"".to_string()
		},
	]);
	format!(
		"const {} = new {}.core.Inflight({});",
		func_def.name.name, STDLIB, props_block
	)
}

fn jsify_function(name: &str, parameters: &[Symbol], body: &Scope, out_dir: &PathBuf) -> String {
	let mut parameter_list = vec![];
	for p in parameters.iter() {
		parameter_list.push(jsify_symbol(p));
	}

	format!(
		"{}({}) {}",
		name,
		parameter_list.iter().map(|x| x.as_str()).collect::<Vec<_>>().join(", "),
		jsify_scope(body, &out_dir)
	)
}

fn jsify_class_member(member: &ClassMember) -> String {
	format!("{};", jsify_symbol(&member.name))
}
