use relative_path::RelativePathBuf;
use std::cell::RefCell;
use std::collections::HashMap;
use std::path::Path;
use std::{str, vec};
use tree_sitter::Node;

use crate::ast::{
	ArgList, BinaryOperator, ClassMember, Constructor, Expression, FunctionDefinition, FunctionSignature, Literal,
	MethodCall, ParameterDefinition, Reference, Scope, Statement, Symbol, Type, UnaryOperator,
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

	fn add_error<Val>(&self, message: String, node: &Node) -> DiagnosticResult<Val> {
		let diag = Diagnostic {
			message,
			span: self.node_span(node),
			level: DiagnosticLevel::Error,
		};
		// TODO terrible to clone here to avoid move
		self.diagnostics.borrow_mut().push(diag.clone());
		Err(diag)
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
		let value = node.named_child(0);
		let value_text = if let Some(value) = value {
			let value_field = self.get_child_field(&value, "value")?;
			Ok(self.node_text(&value_field))
		} else {
			self.add_error(format!("Expected duration value"), &node)
		};

		match value.unwrap().kind() {
			"seconds" => Ok(Literal::Duration(value_text.unwrap().parse().expect("Duration string"))),
			"minutes" => Ok(Literal::Duration(
				// Specific "Minutes" duration needed here
				value_text.unwrap().parse::<f64>().expect("Duration string") * 60_f64,
			)),
			other => self.add_error(format!("Expected duration value, found {}", other), &node),
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
				.map(|st_node| self.build_statement(&st_node))
				.filter(|st| st.is_ok())
				.map(|st| st.unwrap())
				.collect(),
		}
	}

	fn build_statement(&self, statement_node: &Node) -> DiagnosticResult<Statement> {
		let mut cursor = statement_node.walk();
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
			"inflight_function_definition" => Ok(Statement::InflightFunctionDefinition {
				name: self.node_symbol(&statement_node.child_by_field_name("name").unwrap())?,
				parameters: statement_node
					.child_by_field_name("parameter_list")
					.unwrap()
					.named_children(&mut cursor)
					.map(|st_node| self.build_parameter_definition(&st_node).unwrap())
					.collect(),
				statements: {
					let block = statement_node.child_by_field_name("block").unwrap();
					self.build_scope(&block)
				},
			}),
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
				self.build_function_definition(statement_node)?,
			)),
			"return_statement" => Ok(Statement::Return(
				if let Some(return_expression_node) = statement_node.child_by_field_name("expression") {
					Some(self.build_expression(&return_expression_node)?)
				} else {
					None
				},
			)),
			"class_definition" => {
				let mut members = vec![];
				let mut methods = vec![];
				let mut constructor = None;
				let name = self.node_symbol(&statement_node.child_by_field_name("name").unwrap())?;
				for class_element in statement_node
					.child_by_field_name("implementation")
					.unwrap()
					.named_children(&mut cursor)
				{
					match class_element.kind() {
						"function_definition" => methods.push(self.build_function_definition(&class_element)?),
						"class_member" => members.push(ClassMember {
							name: self.node_symbol(&class_element.child_by_field_name("name").unwrap())?,
							member_type: self.build_type(&class_element.child_by_field_name("type").unwrap())?,
						}),
						"constructor" => {
							if let Some(_) = constructor {
								self
									.add_error::<Node>(
										format!("Multiple constructors defined in class {:?}", statement_node),
										&class_element,
									)
									.err();
							}
							let parameters =
								self.build_parameter_list(&class_element.child_by_field_name("parameter_list").unwrap())?;
							constructor = Some(Constructor {
								parameters: parameters.iter().map(|p| p.name.clone()).collect(),
								statements: self.build_scope(&class_element.child_by_field_name("block").unwrap()),
								signature: FunctionSignature {
									parameters: parameters.iter().map(|p| p.parameter_type.clone()).collect(),
									return_type: Some(Box::new(Type::Class(name.clone()))),
								},
							})
						}
						other => {
							self
								.add_error::<Node>(format!("Unexpected class element node type {}", other), &class_element)
								.err();
						}
					}
				}

				if constructor.is_none() {
					self.add_error::<Node>(
						format!("No constructor defined in class {:?}", statement_node),
						&statement_node,
					)?;
				}

				Ok(Statement::Class {
					name,
					members,
					methods,
					parent: statement_node
						.child_by_field_name("parent")
						.map(|n| self.node_symbol(&n).unwrap()),
					constructor: constructor.unwrap(),
				})
			}
			other => self.add_error(format!("Unexpected {}", other), statement_node),
		}
	}

	fn build_function_definition(&self, func_def_node: &Node) -> DiagnosticResult<FunctionDefinition> {
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

	fn build_parameter_definition(&self, parameter_node: &Node) -> DiagnosticResult<ParameterDefinition> {
		Ok(ParameterDefinition {
			name: self.node_symbol(&parameter_node.child_by_field_name("name").unwrap())?,
			parameter_type: self.build_type(&parameter_node.child_by_field_name("type").unwrap())?,
		})
	}

	fn build_type(&self, type_node: &Node) -> DiagnosticResult<Type> {
		match type_node.kind() {
			"builtin_type" => match self.node_text(type_node) {
				"number" => Ok(Type::Number),
				"string" => Ok(Type::String),
				"bool" => Ok(Type::Bool),
				"duration" => Ok(Type::Duration),
				other => self.add_error(format!("Unexpected builtin type {}", other), type_node),
			},
			"class" => Ok(Type::Class(self.node_symbol(type_node)?)),
			"function_type" => {
				let param_type_list_node = type_node.child_by_field_name("parameter_types").unwrap();
				let mut cursor = param_type_list_node.walk();
				let parameters = param_type_list_node
					.named_children(&mut cursor)
					.map(|param_type| self.build_type(&param_type).unwrap())
					.collect::<Vec<Type>>();
				let return_type = type_node
					.child_by_field_name("return_type")
					.map(|n| Box::new(self.build_type(&n).unwrap()));
				Ok(Type::FunctionSignature(FunctionSignature {
					parameters,
					return_type,
				}))
			}
			other => self.add_error(format!("Unexpected type node {}", other), type_node),
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
			other => self.add_error(
				format!("Unexpected node type {} || {:#?}", other, reference_node),
				&actual_node,
			),
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
				other => {
					self
						.add_error::<ArgList>(format!("Unexpected argument type {}", other), &child)
						.err();
				}
			}
		}

		Ok(ArgList { pos_args, named_args })
	}

	fn build_expression(&self, expression_node: &Node) -> DiagnosticResult<Expression> {
		match expression_node.kind() {
			"new_expression" => {
				let class = self.node_symbol(&expression_node.child_by_field_name("class").unwrap());
				let arg_list = if let Some(args_node) = expression_node.child_by_field_name("args") {
					self.build_arg_list(&args_node)
				} else {
					Ok(ArgList::new())
				};

				let obj_id = expression_node
					.child_by_field_name("object_id")
					.map(|n| self.node_symbol(&n).unwrap());
				Ok(Expression::New {
					class: class?,
					obj_id,
					arg_list: arg_list?,
				})
			}
			"binary_expression" => Ok(Expression::Binary {
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
					other => {
						self.add_error::<BinaryOperator>(format!("Unexpected binary operator {}", other), expression_node)?
					}
				},
			}),
			"unary_expression" => Ok(Expression::Unary {
				op: match self.node_text(&expression_node.child_by_field_name("op").unwrap()) {
					"+" => UnaryOperator::Plus,
					"-" => UnaryOperator::Minus,
					"!" => UnaryOperator::Not,
					other => self.add_error::<UnaryOperator>(format!("Unexpected unary operator {}", other), expression_node)?,
				},
				exp: Box::new(self.build_expression(&expression_node.child_by_field_name("arg").unwrap())?),
			}),
			"string" => Ok(Expression::Literal(Literal::String(
				self.node_text(&expression_node).into(),
			))),
			"number" => Ok(Expression::Literal(Literal::Number(
				self.node_text(&expression_node).parse().expect("Number string"),
			))),
			"bool" => Ok(Expression::Literal(Literal::Boolean(
				match self.node_text(&expression_node) {
					"true" => true,
					"false" => false,
					other => self.add_error(format!("Unexpected boolean literal {}", other), expression_node)?,
				},
			))),
			"duration" => Ok(Expression::Literal(self.build_duration(&expression_node)?)),
			"reference" => Ok(Expression::Reference(self.build_reference(&expression_node)?)),
			"positional_argument" => self.build_expression(&expression_node.named_child(0).unwrap()),
			"keyword_argument_value" => self.build_expression(&expression_node.named_child(0).unwrap()),
			"function_call" => Ok(Expression::FunctionCall {
				function: self.build_reference(&expression_node.child_by_field_name("call_name").unwrap())?,
				args: self.build_arg_list(&expression_node.child_by_field_name("args").unwrap())?,
			}),
			"method_call" => Ok(Expression::MethodCall(MethodCall {
				method: self.build_nested_identifier(&expression_node.child_by_field_name("call_name").unwrap())?,
				args: self.build_arg_list(&expression_node.child_by_field_name("args").unwrap())?,
			})),
			"parenthesized_expression" => self.build_expression(&expression_node.named_child(0).unwrap()),
			other => self.add_error(format!("Unexpected {}", other), expression_node),
		}
	}
}
