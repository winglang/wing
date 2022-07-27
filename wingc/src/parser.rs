use std::collections::HashMap;
use std::str;
use tree_sitter::Node;

use crate::ast::{
	ArgList, BinaryOperator, Expression, Literal, ParameterDefinition, Reference, Scope, Statement, UnaryOperator,
};
use crate::type_check;

pub struct Parser<'a> {
	pub source: &'a [u8],
}

impl Parser<'_> {
	pub fn wingit(&self, root: &Node) -> Scope {
		match root.kind() {
			"source_file" => {
				let mut cursor = root.walk();
				self.build_scope(root.named_children(&mut cursor))
			}
			other => {
				panic!("Unexpected node type {}", other);
			}
		}
	}

	fn node_text<'a>(&'a self, node: &Node) -> &'a str {
		return str::from_utf8(&self.source[node.byte_range()]).unwrap();
	}

	fn build_scope<'a>(&self, statement_iter: impl Iterator<Item = Node<'a>>) -> Scope {
		Scope {
			statements: statement_iter.map(|st_node| self.build_statement(&st_node)).collect(),
		}
	}

	fn build_statement(&self, statement_node: &Node) -> Statement {
		let mut cursor = statement_node.walk();
		match statement_node.kind() {
			"use_statement" => {
				// TODO This grammar for this doesn't make sense yet
				if let Some(parent_module) = statement_node.child_by_field_name("parent_module") {
					Statement::Use {
						module_name: self
							.node_text(&statement_node.child_by_field_name("module_name").unwrap())
							.into(),
						identifier: Some(self.node_text(&parent_module).into()),
					}
				} else {
					Statement::Use {
						module_name: self
							.node_text(&statement_node.child_by_field_name("module_name").unwrap())
							.into(),
						identifier: None,
					}
				}
			}
			"variable_definition" => Statement::VariableDef {
				var_name: self.node_text(&statement_node.child(0).unwrap()).into(),
				initial_value: self.build_expression(&statement_node.child(2).unwrap()),
			},
			"assignment" => Statement::Assignment {
				variable: Reference {
					namespace: None,
					identifier: self
						.node_text(&statement_node.child_by_field_name("name").unwrap())
						.into(),
				},
				value: self.build_expression(&statement_node.child_by_field_name("value").unwrap()),
			},
			"expression_statement" => Statement::Expression(self.build_expression(&statement_node.named_child(0).unwrap())),
			"proc_definition" => Statement::ProcessDefinition {
				name: self
					.node_text(&statement_node.child_by_field_name("name").unwrap())
					.into(),
				parameters: statement_node
					.child_by_field_name("parameter_list")
					.unwrap()
					.named_children(&mut cursor)
					.map(|st_node| self.build_parameter_definition(&st_node))
					.collect(),
				statements: {
					let block = statement_node.child_by_field_name("block").unwrap();
					let statements_nodes = block.children_by_field_name("statements", &mut cursor);
					self.build_scope(statements_nodes)
				},
			},
			"block" => {
				let statements_nodes = statement_node.children_by_field_name("statements", &mut cursor);
				Statement::Scope(self.build_scope(statements_nodes))
			}
			"if" => {
				let statements_nodes = statement_node.children_by_field_name("block", &mut cursor);
				let if_statements = self.build_scope(statements_nodes);
				let else_statements_nodes = statement_node.children_by_field_name("else_block", &mut cursor);
				let else_statements = self.build_scope(else_statements_nodes);
				Statement::If {
					condition: self.build_expression(&statement_node.child_by_field_name("condition").unwrap()),
					statements: if_statements,
					else_statements: if else_statements.statements.is_empty() {
						None
					} else {
						Some(else_statements)
					},
				}
			}
			"function_definition" => Statement::FunctionDefinition {
				name: self
					.node_text(&statement_node.child_by_field_name("name").unwrap())
					.into(),
				parameters: self.build_parameter_list(&statement_node.child_by_field_name("parameter_list").unwrap()),
				statements: self.build_scope(statement_node.children_by_field_name("block", &mut cursor)),
				return_type: if let Some(ret_type_node) = statement_node.child_by_field_name("return_type") {
					Some(type_check::get_type_by_name(self.node_text(&ret_type_node)))
				} else {
					None
				},
			},
			"return" => Statement::Return(self.build_expression(&statement_node.child_by_field_name("expression").unwrap())),
			other => {
				panic!("Unexpected statement node type {} ({:?})", other, statement_node);
			}
		}
	}

	fn build_parameter_list(&self, parameter_list_node: &Node) -> Vec<ParameterDefinition> {
		let mut res = vec![];
		let mut cursor = parameter_list_node.walk();
		for parameter_definition_node in parameter_list_node.named_children(&mut cursor) {
			res.push(ParameterDefinition {
				name: self
					.node_text(&parameter_definition_node.child_by_field_name("name").unwrap())
					.into(),
				parameter_type: type_check::get_type_by_name(
					self.node_text(&parameter_definition_node.child_by_field_name("type").unwrap()),
				),
			})
		}

		res
	}

	fn build_parameter_definition(&self, parameter_node: &Node) -> ParameterDefinition {
		ParameterDefinition {
			name: self
				.node_text(&parameter_node.child_by_field_name("name").unwrap())
				.to_string(),
			parameter_type: self.build_type(&parameter_node.child_by_field_name("type").unwrap()),
		}
	}

	fn build_type(&self, type_node: &Node) -> type_check::Type {
		match type_node.kind() {
			"primitive_type" => type_check::get_type_by_name(self.node_text(type_node)),
			"class" => {
				// TODO: handle namespaces
				type_check::get_type_by_name(self.node_text(&type_node.child_by_field_name("symbol").unwrap()))
			}
			other => panic!("Unexpected node type {} for node {:?}", other, type_node),
		}
	}

	fn build_reference(&self, reference_node: &Node) -> Reference {
		let symbol = self
			.node_text(&reference_node.child_by_field_name("symbol").unwrap())
			.into();
		let namespace = if let Some(namespace_node) = &reference_node.child_by_field_name("namespace") {
			Some(self.node_text(&namespace_node).into())
		} else {
			None
		};

		return Reference {
			namespace: namespace,
			identifier: symbol,
		};
	}

	fn build_arg_list(&self, arg_list_node: &Node) -> ArgList {
		let mut pos_args = vec![];
		let mut named_args = HashMap::new();

		let mut cursor = arg_list_node.walk();
		for child in arg_list_node.named_children(&mut cursor) {
			match child.kind() {
				"positional_argument" => {
					pos_args.push(self.build_expression(&child));
				}
				"keyword_argument" => {
					named_args.insert(
						self.node_text(&child.named_child(0).unwrap()).into(),
						self.build_expression(&child.named_child(1).unwrap()),
					);
				}
				other => panic!("Unexpected argument type {}", other),
			}
		}

		ArgList { pos_args, named_args }
	}

	fn build_expression(&self, expression_node: &Node) -> Expression {
		match expression_node.kind() {
			"new_expression" => {
				let class = self.build_reference(&expression_node.child_by_field_name("class").unwrap());
				let arg_list = if let Some(args_node) = expression_node.child_by_field_name("args") {
					self.build_arg_list(&args_node)
				} else {
					ArgList::new()
				};

				let obj_id = expression_node
					.child_by_field_name("object_id")
					.map(|n| self.node_text(&n).into());
				Expression::New {
					class,
					obj_id,
					arg_list,
				}
			}
			"binary_expression" => Expression::Binary {
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
						panic!("Unexpected binary operator {}", other);
					}
				},
				lexp: Box::new(self.build_expression(&expression_node.child_by_field_name("left").unwrap())),
				rexp: Box::new(self.build_expression(&expression_node.child_by_field_name("right").unwrap())),
			},
			"unary_expression" => Expression::Unary {
				op: match self.node_text(&expression_node.child_by_field_name("op").unwrap()) {
					"+" => UnaryOperator::Plus,
					"-" => UnaryOperator::Minus,
					"!" => UnaryOperator::Not,
					other => {
						panic!("Unexpected unary operator {}", other);
					}
				},
				exp: Box::new(self.build_expression(&expression_node.child_by_field_name("arg").unwrap())),
			},
			"string" => Expression::Literal(Literal::String(self.node_text(&expression_node).into())),
			"number" => Expression::Literal(Literal::Number(
				self.node_text(&expression_node).parse().expect("Number string"),
			)),
			"bool" => Expression::Literal(Literal::Boolean(match self.node_text(&expression_node) {
				"true" => true,
				"false" => false,
				other => panic!("Unexpected boolean literal {} for node: {:?}", other, expression_node),
			})),
			"seconds" => Expression::Literal(Literal::Duration(
				self
					.node_text(&expression_node.child_by_field_name("number").unwrap())
					.parse()
					.expect("Duration string"),
			)),
			"minutes" => Expression::Literal(Literal::Duration(
				// Specific "Minutes" duration needed here
				self
					.node_text(&expression_node.child_by_field_name("number").unwrap())
					.parse::<f64>()
					.expect("Duration string")
					* 60_f64,
			)),
			"reference" => Expression::Reference(self.build_reference(&expression_node)),
			"positional_argument" => self.build_expression(&expression_node.named_child(0).unwrap()),
			"keyword_argument_value" => self.build_expression(&expression_node.named_child(0).unwrap()),
			"function_call" => Expression::FunctionCall {
				function: self.build_reference(
					&expression_node
						.child_by_field_name("call_name")
						.unwrap()
						.child_by_field_name("reference")
						.unwrap(),
				),
				args: self.build_arg_list(&expression_node.child_by_field_name("args").unwrap()),
			},
			"parenthesized_expression" => self.build_expression(&expression_node.named_child(0).unwrap()),
			other => {
				panic!(
					"Unexpected expression node type {} for node: {:?}",
					other, expression_node
				);
			}
		}
	}
}
