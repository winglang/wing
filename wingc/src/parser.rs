use relative_path::RelativePathBuf;
use std::cell::RefCell;
use std::collections::HashMap;
use std::path::Path;
use std::{str, vec};
use tree_sitter::Node;

use crate::ast::{
	ArgList, BinaryOperator, ClassMember, Constructor, Expr, ExprType, Flight, FunctionDefinition, FunctionSignature,
	Literal, MethodCall, ParameterDefinition, Reference, Scope, Statement, Symbol, Type, UnaryOperator,
};
use crate::diagnostic::{Diagnostic, DiagnosticLevel, DiagnosticResult, Diagnostics, WingSpan};

pub struct Parser<'a> {
	pub source: &'a [u8],
	pub source_name: String,
	pub diagnostics: RefCell<Diagnostics>,
}

impl Parser<'_> {
	pub fn wingit(&self, root: &Node) -> Scope {
		match root.kind() {
			"source" => self.build_scope(root),
			other => {
				panic!("Unexpected root node type {} at {}", other, self.node_span(root));
			}
		}
	}

	fn add_error<T>(&self, message: String, node: &Node) -> Result<T, ()> {
		let diag = Diagnostic {
			message,
			span: self.node_span(node),
			level: DiagnosticLevel::Error,
		};
		// TODO terrible to clone here to avoid move
		self.diagnostics.borrow_mut().push(diag);

		Err(())
	}

	fn node_text<'a>(&'a self, node: &Node) -> &'a str {
		return str::from_utf8(&self.source[node.byte_range()]).unwrap();
	}

	fn check_error<'a>(&'a self, node: Node<'a>, expected: &str) -> DiagnosticResult<Node> {
		if node.is_error() {
			self.add_error(format!("Expected {}", expected), &node)
		} else {
			Ok(node)
		}
	}

	fn get_child_field<'a>(&'a self, node: &'a Node<'a>, field: &str) -> DiagnosticResult<Node> {
		let checked_node = self.check_error(*node, field)?;
		let child = checked_node.child_by_field_name(field);
		if let Some(child) = child {
			self.check_error(child, field)
		} else {
			self.add_error(format!("Expected {}", field), &node)
		}
	}

	fn node_symbol<'a>(&'a self, node: &Node) -> DiagnosticResult<Symbol> {
		let checked_node = self.check_error(*node, "symbol")?;
		Ok(Symbol {
			span: self.node_span(&checked_node),
			name: self.node_text(&checked_node).to_string(),
		})
	}

	fn build_duration(&self, node: &Node) -> DiagnosticResult<Literal> {
		let value = self.check_error(node.named_child(0).unwrap(), "duration")?;
		let value_text = self.node_text(&self.get_child_field(&value, "value")?);

		match value.kind() {
			"seconds" => Ok(Literal::Duration(value_text.parse().expect("Duration string"))),
			"minutes" => Ok(Literal::Duration(
				// Specific "Minutes" duration needed here
				value_text.parse::<f64>().expect("Duration string") * 60_f64,
			)),
			"ERROR" => self.add_error(format!("Expected duration type"), &node),
			other => panic!("Unexpected duration type {} || {:#?}", other, node),
		}
	}

	fn node_span(&self, node: &Node) -> WingSpan {
		WingSpan {
			start: node.range().start_point,
			end: node.range().end_point,
			start_byte: node.byte_range().start,
			end_byte: node.byte_range().end,
			// TODO: Implement multi-file support
			file_id: RelativePathBuf::from_path(Path::new(&self.source_name)).unwrap(),
		}
	}

	fn build_scope<'a>(&self, scope_node: &Node) -> Scope {
		let mut cursor = scope_node.walk();

		Scope {
			statements: scope_node
				.named_children(&mut cursor)
				.filter(|child| !child.is_extra())
				.filter_map(|st_node| self.build_statement(&st_node).ok())
				.collect(),
			env: None, // env should be set later when scope is type-checked
		}
	}

	fn build_statement(&self, statement_node: &Node) -> DiagnosticResult<Statement> {
		match statement_node.kind() {
			"use_statement" => {
				// TODO This grammar for this doesn't make sense yet
				if let Some(parent_module) = statement_node.child_by_field_name("parent_module") {
					Ok(Statement::Use {
						module_name: self.node_symbol(&statement_node.child_by_field_name("module_name").unwrap())?,
						identifier: Some(self.node_symbol(&parent_module)?),
					})
				} else {
					Ok(Statement::Use {
						module_name: self.node_symbol(&statement_node.child_by_field_name("module_name").unwrap())?,
						identifier: None,
					})
				}
			}
			"variable_definition_statement" => Ok(Statement::VariableDef {
				var_name: self.node_symbol(&statement_node.child(0).unwrap())?,
				initial_value: self.build_expression(&statement_node.child(2).unwrap())?,
			}),
			"variable_assignment_statement" => Ok(Statement::Assignment {
				variable: self.build_reference(&statement_node.child_by_field_name("name").unwrap())?,
				value: self.build_expression(&statement_node.child_by_field_name("value").unwrap())?,
			}),
			"expression_statement" => Ok(Statement::Expression(
				self.build_expression(&statement_node.named_child(0).unwrap())?,
			)),
			"block" => Ok(Statement::Scope(self.build_scope(statement_node))),
			"if_statement" => {
				let if_block = self.build_scope(&statement_node.child_by_field_name("block").unwrap());
				let else_block = if let Some(else_block) = statement_node.child_by_field_name("else_block") {
					Some(self.build_scope(&else_block))
				} else {
					None
				};
				Ok(Statement::If {
					condition: self.build_expression(&statement_node.child_by_field_name("condition").unwrap())?,
					statements: if_block,
					else_statements: else_block,
				})
			}
			"for_in_loop" => Ok(Statement::ForLoop {
				iterator: self.node_symbol(&statement_node.child_by_field_name("iterator").unwrap())?,
				iterable: self.build_expression(&statement_node.child_by_field_name("iterable").unwrap())?,
				statements: self.build_scope(&statement_node.child_by_field_name("block").unwrap()),
			}),
			"function_definition" => Ok(Statement::FunctionDefinition(
				self.build_function_definition(statement_node, Flight::Pre)?,
			)),
			"inflight_function_definition" => Ok(Statement::FunctionDefinition(
				self.build_function_definition(statement_node, Flight::In)?,
			)),
			"return_statement" => Ok(Statement::Return(
				if let Some(return_expression_node) = statement_node.child_by_field_name("expression") {
					Some(self.build_expression(&return_expression_node)?)
				} else {
					None
				},
			)),
			"class_definition" => Ok(self.build_class_statement(statement_node, false)?),
			"resource_definition" => Ok(self.build_class_statement(statement_node, true)?),
			"ERROR" => self.add_error(format!("Expected statement"), statement_node),
			other => panic!("Unexpected statement type {} || {:#?}", other, statement_node),
		}
	}

	fn build_class_statement(&self, statement_node: &Node, is_resource: bool) -> DiagnosticResult<Statement> {
		let mut cursor = statement_node.walk();
		let mut members = vec![];
		let mut methods = vec![];
		let mut constructor = None;
		let name = self.node_symbol(&statement_node.child_by_field_name("name").unwrap())?;
		for class_element in statement_node
			.child_by_field_name("implementation")
			.unwrap()
			.named_children(&mut cursor)
		{
			match (class_element.kind(), is_resource) {
				("function_definition", true) => methods.push(self.build_function_definition(&class_element, Flight::Pre)?),
				("inflight_function_definition", _) => {
					methods.push(self.build_function_definition(&class_element, Flight::In)?)
				}
				("class_member", _) => members.push(ClassMember {
					name: self.node_symbol(&class_element.child_by_field_name("name").unwrap())?,
					member_type: self.build_type(&class_element.child_by_field_name("type").unwrap())?,
					flight: Flight::Pre,
				}),
				("inflight_class_member", _) => members.push(ClassMember {
					name: self.node_symbol(&class_element.child_by_field_name("name").unwrap())?,
					member_type: self.build_type(&class_element.child_by_field_name("type").unwrap())?,
					flight: Flight::In,
				}),
				("constructor", _) => {
					if let Some(_) = constructor {
						self
							.add_error::<Node>(
								format!("Multiple constructors defined in class {:?}", statement_node),
								&class_element,
							)
							.err();
					}
					let parameters = self.build_parameter_list(&class_element.child_by_field_name("parameter_list").unwrap())?;
					constructor = Some(Constructor {
						parameters: parameters.iter().map(|p| p.name.clone()).collect(),
						statements: self.build_scope(&class_element.child_by_field_name("block").unwrap()),
						signature: FunctionSignature {
							parameters: parameters.iter().map(|p| p.parameter_type.clone()).collect(),
							return_type: Some(Box::new(Type::Class(name.clone()))),
							flight: if is_resource { Flight::Pre } else { Flight::In }, // TODO: for now classes can only be constructed inflight
						},
					})
				}
				("ERROR", _) => {
					self
						.add_error::<Node>(format!("Expected class element node"), &class_element)
						.err();
				}
				(other, _) => {
					panic!(
						"Unexpected {} element node type {} || {:#?}",
						if is_resource { "resource" } else { "class" },
						other,
						class_element
					);
				}
			}
		}
		if constructor.is_none() {
			self.add_error::<Node>(
				format!(
					"No constructor defined in {} {:?}",
					if is_resource { "resource" } else { "class" },
					statement_node
				),
				&statement_node,
			)?;
		}

		let parent = statement_node
			.child_by_field_name("parent")
			.map(|n| self.node_symbol(&n).unwrap());
		Ok(Statement::Class {
			name,
			members,
			methods,
			parent,
			constructor: constructor.unwrap(),
			is_resource,
		})
	}

	fn build_function_definition(&self, func_def_node: &Node, flight: Flight) -> DiagnosticResult<FunctionDefinition> {
		let parameters = self.build_parameter_list(&func_def_node.child_by_field_name("parameter_list").unwrap())?;
		Ok(FunctionDefinition {
			name: self.node_symbol(&func_def_node.child_by_field_name("name").unwrap())?,
			parameters: parameters.iter().map(|p| p.name.clone()).collect(),
			statements: self.build_scope(&func_def_node.child_by_field_name("block").unwrap()),
			signature: FunctionSignature {
				parameters: parameters.iter().map(|p| p.parameter_type.clone()).collect(),
				return_type: func_def_node
					.child_by_field_name("return_type")
					.map(|rt| Box::new(self.build_type(&rt).unwrap())),
				flight,
			},
		})
	}

	fn build_parameter_list(&self, parameter_list_node: &Node) -> DiagnosticResult<Vec<ParameterDefinition>> {
		let mut res = vec![];
		let mut cursor = parameter_list_node.walk();
		for parameter_definition_node in parameter_list_node.named_children(&mut cursor) {
			res.push(ParameterDefinition {
				name: self.node_symbol(&parameter_definition_node.child_by_field_name("name").unwrap())?,
				parameter_type: self.build_type(&parameter_definition_node.child_by_field_name("type").unwrap())?,
			})
		}

		Ok(res)
	}

	fn build_type(&self, type_node: &Node) -> DiagnosticResult<Type> {
		match type_node.kind() {
			"builtin_type" => match self.node_text(type_node) {
				"number" => Ok(Type::Number),
				"string" => Ok(Type::String),
				"bool" => Ok(Type::Bool),
				"duration" => Ok(Type::Duration),
				"ERROR" => self.add_error(format!("Expected builtin type"), type_node),
				other => panic!("Unexpected builtin type {} || {:#?}", other, type_node),
			},
			"class_type" => Ok(Type::Class(self.node_symbol(type_node)?)),
			"function_type" => {
				let param_type_list_node = type_node.child_by_field_name("parameter_types").unwrap();
				let mut cursor = param_type_list_node.walk();
				let parameters = param_type_list_node
					.named_children(&mut cursor)
					.filter_map(|param_type| self.build_type(&param_type).ok())
					.collect::<Vec<Type>>();
				let return_type = type_node
					.child_by_field_name("return_type")
					.map(|n| Box::new(self.build_type(&n).unwrap()));
				Ok(Type::FunctionSignature(FunctionSignature {
					parameters,
					return_type,
					flight: if type_node.child_by_field_name("inflight").is_some() {
						Flight::In
					} else {
						Flight::Pre
					},
				}))
			}
			"ERROR" => self.add_error(format!("Expected type"), type_node),
			other => panic!("Unexpected type {} || {:#?}", other, type_node),
		}
	}

	fn build_nested_identifier(&self, nested_node: &Node) -> DiagnosticResult<Reference> {
		Ok(Reference::NestedIdentifier {
			property: self.node_symbol(&nested_node.child_by_field_name("property").unwrap())?,
			object: Box::new(self.build_expression(&nested_node.child_by_field_name("object").unwrap())?),
		})
	}

	fn build_reference(&self, reference_node: &Node) -> DiagnosticResult<Reference> {
		let actual_node = reference_node.named_child(0).unwrap();
		match actual_node.kind() {
			"identifier" => Ok(Reference::Identifier(self.node_symbol(&actual_node)?)),
			"namespaced_identifier" => Ok(Reference::NamespacedIdentifier {
				namespace: self.node_symbol(&actual_node.child_by_field_name("namespace").unwrap())?,
				identifier: self.node_symbol(&actual_node.child_by_field_name("name").unwrap())?,
			}),
			"nested_identifier" => Ok(self.build_nested_identifier(&actual_node)?),
			"ERROR" => self.add_error(format!("Expected type || {:#?}", reference_node), &actual_node),
			other => panic!("Unexpected type node {} || {:#?}", other, reference_node),
		}
	}

	fn build_arg_list(&self, arg_list_node: &Node) -> DiagnosticResult<ArgList> {
		let mut pos_args = vec![];
		let mut named_args = HashMap::new();

		let mut cursor = arg_list_node.walk();
		for child in arg_list_node.named_children(&mut cursor) {
			match child.kind() {
				"positional_argument" => {
					pos_args.push(self.build_expression(&child)?);
				}
				"keyword_argument" => {
					named_args.insert(
						self.node_symbol(&child.named_child(0).unwrap())?,
						self.build_expression(&child.named_child(1).unwrap())?,
					);
				}
				"ERROR" => {
					_ = self.add_error::<ArgList>(format!("Expected argument type"), &child);
				}
				other => panic!("Unexpected argument type {} || {:#?}", other, child),
			}
		}

		Ok(ArgList { pos_args, named_args })
	}

	fn build_expression(&self, exp_node: &Node) -> DiagnosticResult<Expr> {
		let expr_node = &self.check_error(*exp_node, "Expression")?;
		match expression_node.kind() {
			"new_expression" => {
				let class = self.build_reference(&expression_node.child_by_field_name("class").unwrap())?;
				// This should be a type name so it cannot be a nested reference
				if matches!(class, Reference::NestedIdentifier { object: _, property: _ }) {
					_ = self.add_error::<Expr>(
						format!(
							"Expected a reference to a class or resource type, instead got {:?}",
							class
						),
						expression_node,
					);
				}

				let arg_list = if let Some(args_node) = expression_node.child_by_field_name("args") {
					self.build_arg_list(&args_node)
				} else {
					Ok(ArgList::new())
				};

				let obj_id = expression_node
					.child_by_field_name("id")
					.map(|n| self.node_symbol(&n).unwrap());
				let obj_scope = if let Some(scope_expr_node) = expression_node.child_by_field_name("scope") {
					Some(Box::new(self.build_expression(&scope_expr_node)?))
				} else {
					None
				};
				Ok(Expr::new(ExprType::New {
					class,
					obj_id,
					arg_list: arg_list?,
					obj_scope,
				}))
			}
			"binary_expression" => Ok(Expr::new(ExprType::Binary {
				lexp: Box::new(self.build_expression(&expression_node.child_by_field_name("left").unwrap())?),
				rexp: Box::new(self.build_expression(&expression_node.child_by_field_name("right").unwrap())?),
				op: match self.node_text(&expression_node.child_by_field_name("op").unwrap()) {
					"+" => BinaryOperator::Add,
					"-" => BinaryOperator::Sub,
					"==" => BinaryOperator::Equal,
					"!=" => BinaryOperator::NotEqual,
					">" => BinaryOperator::Greater,
					">=" => BinaryOperator::GreaterOrEqual,
					"<" => BinaryOperator::Less,
					"<=" => BinaryOperator::LessOrEqual,
					"&&" => BinaryOperator::LogicalAnd,
					"||" => BinaryOperator::LogicalOr,
					"%" => BinaryOperator::Mod,
					"*" => BinaryOperator::Mul,
					"/" => BinaryOperator::Div,
					"ERROR" => self.add_error::<BinaryOperator>(format!("Expected binary operator"), expression_node)?,
					other => panic!("Unexpected binary operator {} || {:#?}", other, expression_node),
				},
			})),
			"unary_expression" => Ok(Expr::new(ExprType::Unary {
				op: match self.node_text(&expression_node.child_by_field_name("op").unwrap()) {
					"+" => UnaryOperator::Plus,
					"-" => UnaryOperator::Minus,
					"!" => UnaryOperator::Not,
					"ERROR" => self.add_error::<UnaryOperator>(format!("Expected unary operator"), expression_node)?,
					other => panic!("Unexpected unary operator {} || {:#?}", other, expression_node),
				},
				exp: Box::new(self.build_expression(&expression_node.child_by_field_name("arg").unwrap())?),
			})),
			"string" => Ok(Expr::new(ExprType::Literal(Literal::String(
				self.node_text(&expression_node).into(),
			)))),
			"number" => Ok(Expr::new(ExprType::Literal(Literal::Number(
				self.node_text(&expression_node).parse().expect("Number string"),
			)))),
			"bool" => Ok(Expr::new(ExprType::Literal(Literal::Boolean(
				match self.node_text(&expression_node) {
					"true" => true,
					"false" => false,
					"ERROR" => self.add_error::<bool>(format!("Expected boolean literal"), expression_node)?,
					other => panic!("Unexpected boolean literal {} || {:#?}", other, expression_node),
				},
			)))),
			"duration" => Ok(Expr::new(ExprType::Literal(self.build_duration(&expression_node)?))),
			"reference" => Ok(Expr::new(ExprType::Reference(self.build_reference(&expression_node)?))),
			"positional_argument" => self.build_expression(&expression_node.named_child(0).unwrap()),
			"keyword_argument_value" => self.build_expression(&expression_node.named_child(0).unwrap()),
			"function_call" => Ok(Expr::new(ExprType::FunctionCall {
				function: self.build_reference(&expression_node.child_by_field_name("call_name").unwrap())?,
				args: self.build_arg_list(&expression_node.child_by_field_name("args").unwrap())?,
			})),
			"method_call" => Ok(Expr::new(ExprType::MethodCall(MethodCall {
				method: self.build_nested_identifier(&expression_node.child_by_field_name("call_name").unwrap())?,
				args: self.build_arg_list(&expression_node.child_by_field_name("args").unwrap())?,
			}))),
			"parenthesized_expression" => self.build_expression(&expression_node.named_child(0).unwrap()),
			other => {
				if expression_node.has_error() {
					self.add_error(format!("Expected expression"), expression_node)
				} else {
					panic!("Unexpected expression {} || {:#?}", other, expression_node);
				}
			}
		}
	}
}
