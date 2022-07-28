use std::collections::HashMap;
use std::{str, vec};
use tree_sitter::Node;

use crate::ast::{
	ArgList, BinaryOperator, ClassMember, Expression, FunctionDefinition, Literal, ParameterDefinition, Reference, Scope,
	Statement, Symbol, UnaryOperator, WingSpan,
};
use crate::type_check;

pub struct Parser<'a> {
	pub source: &'a [u8],
	pub source_name: String,
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

	fn node_symbol<'a>(&'a self, node: &Node) -> Symbol {
		Symbol {
			span: WingSpan {
				start: node.byte_range().start,
				end: node.byte_range().end,
				// TODO: Implement multi-file support
				file_id: self.source_name.clone(),
			},
			name: self.node_text(node).to_string(),
		}
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
						module_name: self.node_symbol(&statement_node.child_by_field_name("module_name").unwrap()),
						identifier: Some(self.node_symbol(&parent_module)),
					}
				} else {
					Statement::Use {
						module_name: self.node_symbol(&statement_node.child_by_field_name("module_name").unwrap()),
						identifier: None,
					}
				}
			}
			"variable_definition" => Statement::VariableDef {
				var_name: self.node_symbol(&statement_node.child(0).unwrap()),
				initial_value: self.build_expression(&statement_node.child(2).unwrap()),
			},
			"assignment" => Statement::Assignment {
				variable: Reference {
					namespace: None,
					identifier: self.node_symbol(&statement_node.child_by_field_name("name").unwrap()),
				},
				value: self.build_expression(&statement_node.child_by_field_name("value").unwrap()),
			},
			"expression_statement" => Statement::Expression(self.build_expression(&statement_node.named_child(0).unwrap())),
			"proc_definition" => Statement::ProcessDefinition {
				name: self.node_symbol(&statement_node.child_by_field_name("name").unwrap()),
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
			"function_definition" => Statement::FunctionDefinition(self.build_function_definition(statement_node)),
			"return" => Statement::Return(
				if let Some(return_expression_node) = statement_node.child_by_field_name("expression") {
					Some(self.build_expression(&return_expression_node))
				} else {
					None
				},
			),
			"class_definition" => {
				let mut members = vec![];
				let mut methods = vec![];
				for class_element in statement_node
					.child_by_field_name("implementation")
					.unwrap()
					.named_children(&mut cursor)
				{
					match class_element.kind() {
						"function_definition" => methods.push(self.build_function_definition(&class_element)),
						"class_member" => members.push(ClassMember {
							name: self.node_symbol(&class_element.child_by_field_name("name").unwrap()),
							parameter_type: self.build_type(&class_element.child_by_field_name("type").unwrap()),
						}),
						other => {
							panic!("Unexpected class element node type {} ({:?})", other, statement_node)
						}
					}
				}

				Statement::Class {
					name: self.node_symbol(&statement_node.child_by_field_name("name").unwrap()),
					members,
					methods,
				}
			}
			other => {
				panic!("Unexpected statement node type {} ({:?})", other, statement_node);
			}
		}
	}

	fn build_function_definition(&self, func_def_node: &Node) -> FunctionDefinition {
		let mut cursor = func_def_node.walk();
		FunctionDefinition {
			name: self.node_symbol(&func_def_node.child_by_field_name("name").unwrap()),
			parameters: self.build_parameter_list(&func_def_node.child_by_field_name("parameter_list").unwrap()),
			statements: self.build_scope(func_def_node.children_by_field_name("block", &mut cursor)),
			return_type: if let Some(ret_type_node) = func_def_node.child_by_field_name("return_type") {
				Some(self.build_type(&ret_type_node))
			} else {
				None
			},
		}
	}

	fn build_parameter_list(&self, parameter_list_node: &Node) -> Vec<ParameterDefinition> {
		let mut res = vec![];
		let mut cursor = parameter_list_node.walk();
		for parameter_definition_node in parameter_list_node.named_children(&mut cursor) {
			res.push(ParameterDefinition {
				name: self.node_symbol(&parameter_definition_node.child_by_field_name("name").unwrap()),
				parameter_type: self.build_type(&parameter_definition_node.child_by_field_name("type").unwrap()),
			})
		}

		res
	}

	fn build_parameter_definition(&self, parameter_node: &Node) -> ParameterDefinition {
		ParameterDefinition {
			name: self.node_symbol(&parameter_node.child_by_field_name("name").unwrap()),
			parameter_type: self.build_type(&parameter_node.child_by_field_name("type").unwrap()),
		}
	}

	// TODO: this should receive the env in order to lookup user defined types (classes)
	fn build_type(&self, type_node: &Node) -> type_check::Type {
		match type_node.kind() {
			"primitive_type" => type_check::get_primitive_type_by_name(self.node_text(type_node)),
			"class" => todo!(),
			"function_type" => {
				let param_type_list_node = type_node.child_by_field_name("parameter_types").unwrap();
				let mut cursor = param_type_list_node.walk();
				let args = param_type_list_node
					.named_children(&mut cursor)
					.map(|param_type| self.build_type(&param_type))
					.collect::<Vec<type_check::Type>>();
				let return_type = type_node
					.child_by_field_name("return_type")
					.map(|n| self.build_type(&n));
				type_check::Type::Function(Box::new(type_check::FunctionSignature { args, return_type }))
			}
			other => panic!("Unexpected node type {} for node {:?}", other, type_node),
		}
	}

	fn build_reference(&self, reference_node: &Node) -> Reference {
		let symbol = self.node_symbol(&reference_node.child_by_field_name("symbol").unwrap());
		let namespace = if let Some(namespace_node) = &reference_node.child_by_field_name("namespace") {
			Some(self.node_symbol(&namespace_node))
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
						self.node_symbol(&child.named_child(0).unwrap()),
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
					.map(|n| self.node_symbol(&n));
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
				function: self.build_reference(&expression_node.child_by_field_name("call_name").unwrap()),
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
