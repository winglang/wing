use std::{collections::HashMap, fs};

use sha2::{Digest, Sha256};

use crate::ast::{
	ArgList, BinaryOperator, ClassMember, Expr, ExprType, Flight, FunctionDefinition, Literal, Reference, Scope,
	Statement, Symbol, UnaryOperator,
};

const STDLIB: &str = "$stdlib";
const STDLIB_MODULE: &str = "@monadahq/wingsdk";

struct Capture {
	symbol: String,
	method: String,
}

fn find_captures_from_expression(node: &Expr) -> Vec<Capture> {
	let mut res: Vec<Capture> = vec![];

	// TODO Hack, assume it's of the form `capture.method()`
	// Without type info, this is the best we can do
	if let ExprType::MethodCall(m) = &node.variant {
		if let Reference::NestedIdentifier { object, property } = &m.method {
			if let ExprType::Reference(Reference::Identifier(object)) = &object.variant {
				if object.name == "console" {
					// TODO Extra hack, ignore console.log for now
					return res;
				}
				res.push(Capture {
					symbol: object.name.clone(),
					method: property.name.clone(),
				});
			}
		}
	}

	res
}

fn find_captures(node: &Scope) -> Vec<Capture> {
	let mut res: Vec<Capture> = vec![];
	for statement in &node.statements {
		match statement {
			Statement::VariableDef { initial_value, .. } => {
				res.append(&mut find_captures_from_expression(&initial_value));
			}
			Statement::ForLoop {
				iterable, statements, ..
			} => {
				res.append(&mut find_captures_from_expression(&iterable));
				res.append(&mut find_captures(&statements));
			}
			Statement::If {
				condition,
				statements,
				else_statements,
			} => {
				res.append(&mut find_captures_from_expression(&condition));
				res.append(&mut find_captures(&statements));
				if let Some(else_statements) = else_statements {
					res.append(&mut find_captures(&else_statements));
				}
			}
			Statement::Expression(exp) => res.append(&mut find_captures_from_expression(&exp)),
			Statement::Assignment { value, .. } => res.append(&mut find_captures_from_expression(&value)),
			Statement::Return(exp) => {
				if exp.is_some() {
					res.append(&mut find_captures_from_expression(exp.as_ref().unwrap()));
				}
			}
			Statement::Scope(s) => res.append(&mut find_captures(&s)),
			_ => {}
		}
	}
	res
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
	return lines.join("\n");
}

pub fn jsify(scope: &Scope, shim: bool) -> String {
	let mut js = vec![];
	let mut imports = vec![];

	for statement in scope.statements.iter() {
		let line = jsify_statement(statement);
		if line.is_empty() {
			continue;
		}
		if let Statement::Use {
			identifier: _,
			module_name: _,
		} = statement
		{
			imports.push(line);
		} else {
			js.push(line);
		}
	}

	let mut output = vec![];

	if shim {
		output.push(format!("const {} = require('{}');", STDLIB, STDLIB_MODULE));
	}

	output.append(&mut imports);

	if shim {
		js.insert(0, "super();\n".to_string());
		output.push(format!(
			"class MyApp extends {}.core.App {{\nconstructor() {}\n}}",
			STDLIB,
			render_block(js)
		));
		output.push("new MyApp().synth();".to_string());
	} else {
		output.append(&mut js);
	}
	output.join("\n")
}

fn jsify_scope(scope: &Scope) -> String {
	let mut lines = vec![];
	lines.push("{".to_string());

	for statement in scope.statements.iter() {
		let statement_str = format!("{}", jsify_statement(statement));
		let result = statement_str.split("\n");
		for l in result {
			lines.push(format!("  {}", l));
		}
	}

	lines.push("}".to_string());
	return lines.join("\n");
}

fn jsify_reference(reference: &Reference) -> String {
	match reference {
		Reference::Identifier(identifier) => jsify_symbol(identifier),
		Reference::NestedIdentifier { object, property } => jsify_expression(object) + "." + &jsify_symbol(property),
		Reference::NamespacedIdentifier { namespace, identifier } => {
			jsify_symbol(namespace) + "." + &jsify_symbol(identifier)
		}
	}
}

fn jsify_symbol(symbol: &Symbol) -> String {
	return format!("{}", symbol.name);
}

fn jsify_arg_list(arg_list: &ArgList) -> String {
	if !arg_list.pos_args.is_empty() && !arg_list.named_args.is_empty() {
		// TODO?
		// JS doesn't support named args, this is probably to pass props to a construct. Can't mix that with positional args.
		panic!("Cannot use positional and named arguments in the same call");
	}

	let mut args = vec![];

	if !arg_list.pos_args.is_empty() {
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

fn jsify_expression(expression: &Expr) -> String {
	match &expression.variant {
		ExprType::New {
			class,
			obj_id: _, // TODO
			arg_list,
			obj_scope: _, // TODO
		} => {
			format!("new {}({})", jsify_reference(&class), jsify_arg_list(&arg_list))
		}
		ExprType::Literal(lit) => match lit {
			Literal::String(s) => format!("{}", s),
			Literal::Number(n) => format!("{}", n),
			Literal::Duration(sec) => format!("{}.core.Duration.fromSeconds({})", STDLIB, sec),
			Literal::Boolean(b) => format!("{}", if *b { "true" } else { "false" }),
		},
		ExprType::Reference(_ref) => jsify_reference(&_ref),
		ExprType::FunctionCall { function, args } => {
			format!("{}({})", jsify_reference(&function), jsify_arg_list(&args))
		}
		ExprType::MethodCall(method_call) => {
			format!(
				"{}({})",
				jsify_reference(&method_call.method),
				jsify_arg_list(&method_call.args)
			)
		}
		ExprType::Unary { op, exp } => {
			let op = match op {
				UnaryOperator::Plus => "+",
				UnaryOperator::Minus => "-",
				UnaryOperator::Not => "!",
			};
			format!("({}{})", op, jsify_expression(exp))
		}
		ExprType::Binary { op, lexp, rexp } => {
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
	}
}

fn jsify_statement(statement: &Statement) -> String {
	match statement {
		Statement::Use {
			module_name,
			identifier,
		} => {
			if let Some(identifier) = identifier {
				// use <module_name> from <parent_module>
				format!(
					"const {} = require('{}/{}').{};",
					jsify_symbol(module_name),
					STDLIB_MODULE,
					jsify_symbol(module_name),
					jsify_symbol(identifier)
				)
			} else {
				// use <module_name>
				format!(
					"const {} = require('{}').{};",
					jsify_symbol(module_name),
					STDLIB_MODULE,
					jsify_symbol(module_name)
				)
			}
		}
		Statement::VariableDef {
			var_name,
			initial_value,
		} => {
			let initial_value = jsify_expression(initial_value);
			format!("let {} = {};", jsify_symbol(var_name), initial_value)
		}
		Statement::FunctionDefinition(func_def) => match func_def.signature.flight {
			Flight::In => jsify_inflight_function(func_def),
			Flight::Pre => jsify_function(
				format!("function {}", jsify_symbol(&func_def.name)).as_str(),
				&func_def.parameters,
				&func_def.statements,
			),
		},
		Statement::ForLoop {
			iterator,
			iterable,
			statements,
		} => format!(
			"for(const {} of {}) {}",
			jsify_symbol(iterator),
			jsify_expression(iterable),
			jsify_scope(statements)
		),
		Statement::If {
			condition,
			statements,
			else_statements,
		} => {
			if let Some(else_scope) = else_statements {
				format!(
					"if ({}) {} else {}",
					jsify_expression(condition),
					jsify_scope(statements),
					jsify_scope(else_scope)
				)
			} else {
				format!("if ({}) {}", jsify_expression(condition), jsify_scope(statements))
			}
		}
		Statement::Expression(e) => jsify_expression(e),
		Statement::Assignment { variable, value } => {
			format!("{} = {};", jsify_reference(&variable), jsify_expression(value))
		}
		Statement::Scope(scope) => jsify_scope(scope),
		Statement::Return(exp) => {
			if let Some(exp) = exp {
				format!("return {};", jsify_expression(exp))
			} else {
				"return;".into()
			}
		}
		Statement::Class {
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
					format!(" extends {}", jsify_symbol(parent))
				} else {
					"".to_string()
				},
				jsify_function("constructor", &constructor.parameters, &constructor.statements),
				members
					.iter()
					.map(|m| jsify_class_member(m))
					.collect::<Vec<String>>()
					.join("\n"),
				methods
					.iter()
					.map(|f| jsify_function(jsify_symbol(&f.name).as_str(), &f.parameters, &f.statements))
					.collect::<Vec<String>>()
					.join("\n")
			)
		}
	}
}

fn jsify_inflight_function(func_def: &FunctionDefinition) -> String {
	let mut parameter_list = vec![];
	for p in func_def.parameters.iter() {
		parameter_list.push(p.name.clone());
	}
	// TODO Hack
	let out_dir = format!("{}.out", func_def.name.span.file_id.to_string());
	// find all cloud objects referenced in the proc
	let captures = find_captures(&func_def.statements);
	let block = jsify_scope(&func_def.statements);
	let procid = base16ct::lower::encode_string(&Sha256::new().chain_update(&block).finalize());
	let mut methods_per_object = HashMap::new();
	for capture in captures.iter() {
		if !methods_per_object.contains_key(&capture.symbol) {
			methods_per_object.insert(capture.symbol.clone(), vec![]);
		}
		methods_per_object
			.get_mut(&capture.symbol)
			.unwrap()
			.push(capture.method.clone());
	}
	let mut bindings = vec![];
	let mut capture_names = vec![];
	for (symbol, methods) in methods_per_object {
		capture_names.push(symbol.clone());
		bindings.push(format!(
			"{}: {},",
			symbol,
			render_block([
				format!("obj: {},", symbol),
				format!(
					"methods: [{}]",
					methods
						.iter()
						.map(|x| format!("\"{}\"", x))
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
	let proc_dir = format!("{}/proc.{}", out_dir, procid);
	fs::create_dir_all(&proc_dir).expect("Creating inflight proc dir");
	fs::write(format!("{}/index.js", proc_dir), proc_source.join("\n")).expect("Writing inflight proc source");
	let props_block = render_block([
		format!("path: \"{}\",", proc_dir),
		if !bindings.is_empty() {
			format!("captures: {}", render_block(&bindings))
		} else {
			"".to_string()
		},
	]);
	format!(
		"const {} = new {}.core.Process({});",
		func_def.name.name, STDLIB, props_block
	)
}

fn jsify_function(name: &str, parameters: &Vec<Symbol>, body: &Scope) -> String {
	let mut parameter_list = vec![];
	for p in parameters.iter() {
		parameter_list.push(jsify_symbol(p));
	}

	format!(
		"{}({}) {}",
		name,
		parameter_list.iter().map(|x| x.as_str()).collect::<Vec<_>>().join(", "),
		jsify_scope(body)
	)
}

fn jsify_class_member(member: &ClassMember) -> String {
	format!("{};", jsify_symbol(&member.name))
}
