use relative_path::RelativePathBuf;
use std::collections::HashMap;
use std::path::Path;
use std::{str, vec};
use tree_sitter::Node;

use crate::ast::{
	ArgList, BinaryOperator, ClassMember, Constructor, Expression, FunctionDefinition, FunctionSignature, Literal,
	MethodCall, ParameterDefinition, Reference, Scope, Statement, Symbol, Type, UnaryOperator,
};
use crate::diagnostic::WingSpan;

pub struct Parser<'a> {
	pub source: &'a [u8],
	pub source_name: String,
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

	fn node_text<'a>(&'a self, node: &Node) -> &'a str {
		return str::from_utf8(&self.source[node.byte_range()]).unwrap();
	}

	fn build_duration(&self, node: &Node) -> Literal {
		let child = node.named_child(0).unwrap();
		match child.kind() {
			"seconds" => Literal::Duration(
				self
					.node_text(&child.child_by_field_name("value").unwrap())
					.parse()
					.expect("Duration string"),
			),
			"minutes" => Literal::Duration(
				// Specific "Minutes" duration needed here
				self
					.node_text(&child.child_by_field_name("value").unwrap())
					.parse::<f64>()
					.expect("Duration string")
					* 60_f64,
			),
			other => panic!("Unexpected duration node type {} at {}", other, self.node_span(node)),
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

	fn node_symbol<'a>(&'a self, node: &Node) -> Symbol {
		Symbol {
			span: self.node_span(node),
			name: self.node_text(node).to_string(),
		}
	}

	fn build_scope<'a>(&self, scope_node: &Node) -> Scope {
		let mut cursor = scope_node.walk();

		Scope {
			statements: scope_node
				.named_children(&mut cursor)
				.filter(|child| !child.is_extra())
				.map(|st_node| self.build_statement(&st_node))
				.collect(),
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
			"variable_definition_statement" => Statement::VariableDef {
				var_name: self.node_symbol(&statement_node.child(0).unwrap()),
				initial_value: self.build_expression(&statement_node.child(2).unwrap()),
			},
			"variable_assignment_statement" => Statement::Assignment {
				variable: self.build_reference(&statement_node.child_by_field_name("name").unwrap()),
				value: self.build_expression(&statement_node.child_by_field_name("value").unwrap()),
			},
			"expression_statement" => Statement::Expression(self.build_expression(&statement_node.named_child(0).unwrap())),
			"inflight_function_definition" => Statement::InflightFunctionDefinition {
				name: self.node_symbol(&statement_node.child_by_field_name("name").unwrap()),
				parameters: statement_node
					.child_by_field_name("parameter_list")
					.unwrap()
					.named_children(&mut cursor)
					.map(|st_node| self.build_parameter_definition(&st_node))
					.collect(),
				statements: {
					let block = statement_node.child_by_field_name("block").unwrap();
					self.build_scope(&block)
				},
			},
			"block" => Statement::Scope(self.build_scope(statement_node)),
			"if_statement" => {
				let if_block = self.build_scope(&statement_node.child_by_field_name("block").unwrap());
				let else_block = if let Some(else_block) = statement_node.child_by_field_name("else_block") {
					Some(self.build_scope(&else_block))
				} else {
					None
				};
				Statement::If {
					condition: self.build_expression(&statement_node.child_by_field_name("condition").unwrap()),
					statements: if_block,
					else_statements: else_block,
				}
			}
			"for_in_loop" => Statement::ForLoop {
				iterator: self.node_symbol(&statement_node.child_by_field_name("iterator").unwrap()),
				iterable: self.build_expression(&statement_node.child_by_field_name("iterable").unwrap()),
				statements: self.build_scope(&statement_node.child_by_field_name("block").unwrap()),
			},
			"function_definition" => Statement::FunctionDefinition(self.build_function_definition(statement_node)),
			"return_statement" => Statement::Return(
				if let Some(return_expression_node) = statement_node.child_by_field_name("expression") {
					Some(self.build_expression(&return_expression_node))
				} else {
					None
				},
			),
			"class_definition" => {
				let mut members = vec![];
				let mut methods = vec![];
				let mut constructor = None;
				let name = self.node_symbol(&statement_node.child_by_field_name("name").unwrap());
				for class_element in statement_node
					.child_by_field_name("implementation")
					.unwrap()
					.named_children(&mut cursor)
				{
					match class_element.kind() {
						"function_definition" => methods.push(self.build_function_definition(&class_element)),
						"class_member" => members.push(ClassMember {
							name: self.node_symbol(&class_element.child_by_field_name("name").unwrap()),
							member_type: self.build_type(&class_element.child_by_field_name("type").unwrap()),
						}),
						"constructor" => {
							if let Some(_) = constructor {
								panic!("Multiple constructors defined in class {:?}", statement_node);
							}
							let parameters = self.build_parameter_list(&class_element.child_by_field_name("parameter_list").unwrap());
							constructor = Some(Constructor {
								parameters: parameters.iter().map(|p| p.name.clone()).collect(),
								statements: self.build_scope(class_element.children_by_field_name("block", &mut class_element.walk())),
								signature: FunctionSignature {
									parameters: parameters.iter().map(|p| p.parameter_type.clone()).collect(),
									return_type: Some(Box::new(Type::Class(name.clone()))),
								},
							})
						}
						other => {
							panic!(
								"Unexpected class element node type {} at {}",
								other,
								self.node_span(statement_node)
							)
						}
					}
				}

				if let None = constructor {
					panic!("No constructor defined in class {:?}", statement_node);
				}

				Statement::Class {
					name,
					members,
					methods,
					parent: statement_node
						.child_by_field_name("parent")
						.map(|n| self.node_symbol(&n)),
					constructor: constructor.unwrap(),
				}
			}
			other => {
				panic!(
					"Unexpected statement node type {} at {}",
					other,
					self.node_span(statement_node)
				);
			}
		}
	}

	fn build_function_definition(&self, func_def_node: &Node) -> FunctionDefinition {
		let parameters = self.build_parameter_list(&func_def_node.child_by_field_name("parameter_list").unwrap());
		FunctionDefinition {
			name: self.node_symbol(&func_def_node.child_by_field_name("name").unwrap()),
			parameters: parameters.iter().map(|p| p.name.clone()).collect(),
			statements: self.build_scope(&func_def_node.child_by_field_name("block").unwrap()),
			signature: FunctionSignature {
				parameters: parameters.iter().map(|p| p.parameter_type.clone()).collect(),
				return_type: func_def_node
					.child_by_field_name("return_type")
					.map(|rt| Box::new(self.build_type(&rt))),
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

	// TODO: this should receive the env in order to lookup user defined types (classes) -> actually no, this should be done in the type checking phase..
	fn build_type(&self, type_node: &Node) -> Type {
		match type_node.kind() {
			"primitive_type" => match self.node_text(type_node) {
				"number" => Type::Number,
				"string" => Type::String,
				"bool" => Type::Bool,
				"duration" => Type::Duration,
				other => panic!("Unexpected primitive type {}", other),
			},
			"class" => Type::Class(self.node_symbol(type_node)),
			"function_type" => {
				let param_type_list_node = type_node.child_by_field_name("parameter_types").unwrap();
				let mut cursor = param_type_list_node.walk();
				let parameters = param_type_list_node
					.named_children(&mut cursor)
					.map(|param_type| self.build_type(&param_type))
					.collect::<Vec<Type>>();
				let return_type = type_node
					.child_by_field_name("return_type")
					.map(|n| Box::new(self.build_type(&n)));
				Type::FunctionSignature(FunctionSignature {
					parameters,
					return_type,
				})
			}
			other => panic!("Unexpected node type {} at {}", other, self.node_span(type_node)),
		}
	}

	fn build_nested_identifier(&self, nested_node: &Node) -> Reference {
		Reference::NestedIdentifier {
			property: self.node_symbol(&nested_node.child_by_field_name("property").unwrap()),
			object: Box::new(self.build_expression(&nested_node.child_by_field_name("object").unwrap())),
		}
	}

	fn build_reference(&self, reference_node: &Node) -> Reference {
		let actual_node = reference_node.named_child(0).unwrap();
		match actual_node.kind() {
			"identifier" => Reference::Identifier(self.node_symbol(&actual_node)),
			"namespaced_identifier" => Reference::NamespacedIdentifier {
				namespace: self.node_symbol(&actual_node.child_by_field_name("namespace").unwrap()),
				identifier: self.node_symbol(&actual_node.child_by_field_name("name").unwrap()),
			},
			"nested_identifier" => self.build_nested_identifier(&actual_node),
			other => panic!(
				"Unexpected node type {} at {} || {:#?}",
				other,
				self.node_span(&actual_node),
				reference_node
			),
		}
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
				other => panic!("Unexpected argument type {} at {}", other, self.node_span(&child)),
			}
		}

		ArgList { pos_args, named_args }
	}

	fn build_expression(&self, expression_node: &Node) -> Expression {
		match expression_node.kind() {
			"new_expression" => {
				let class = self.node_symbol(&expression_node.child_by_field_name("class").unwrap());
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
						panic!(
							"Unexpected binary operator {} at {}",
							other,
							self.node_span(&expression_node)
						);
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
						panic!(
							"Unexpected unary operator {} at {}",
							other,
							self.node_span(&expression_node)
						);
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
				other => panic!(
					"Unexpected boolean literal {} at {}",
					other,
					self.node_span(expression_node)
				),
			})),
			"duration" => Expression::Literal(self.build_duration(&expression_node)),
			"reference" => Expression::Reference(self.build_reference(&expression_node)),
			"positional_argument" => self.build_expression(&expression_node.named_child(0).unwrap()),
			"keyword_argument_value" => self.build_expression(&expression_node.named_child(0).unwrap()),
			"function_call" => Expression::FunctionCall {
				function: self.build_reference(&expression_node.child_by_field_name("call_name").unwrap()),
				args: self.build_arg_list(&expression_node.child_by_field_name("args").unwrap()),
			},
			"method_call" => Expression::MethodCall(MethodCall {
				object: self.build_reference(
					&expression_node
						.child_by_field_name("call_name")
						.unwrap()
						.child_by_field_name("object")
						.unwrap(),
				),
				method: self.node_symbol(
					&expression_node
						.child_by_field_name("call_name")
						.unwrap()
						.child_by_field_name("property")
						.unwrap(),
				),
				args: self.build_arg_list(&expression_node.child_by_field_name("args").unwrap()),
			}),
			"parenthesized_expression" => self.build_expression(&expression_node.named_child(0).unwrap()),
			"method_call" => Expression::MethodCall(MethodCall {
				object: Box::new(self.build_expression(&expression_node.child_by_field_name("object").unwrap())),
				method: self.node_symbol(&expression_node.child_by_field_name("call_name").unwrap()),
				args: self.build_arg_list(&expression_node.child_by_field_name("args").unwrap()),
			}),
			other => {
				panic!(
					"Unexpected expression '{}' at {}",
					other,
					self.node_span(expression_node)
				);
			}
		}
	}
}
