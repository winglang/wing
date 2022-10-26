pub mod bring;

use bring::bring;
use std::cell::RefCell;
use std::collections::{HashMap, HashSet};
use std::path::PathBuf;
use std::{str, vec};
use tree_sitter::Node;

use crate::ast::{
	ArgList, BinaryOperator, ClassMember, Constructor, Expr, ExprType, Flight, FunctionDefinition, FunctionSignature,
	InterpolatedString, InterpolatedStringPart, Literal, ParameterDefinition, Reference, Scope, Statement, Symbol, Type,
	UnaryOperator,
};
use crate::diagnostic::{Diagnostic, DiagnosticLevel, DiagnosticResult, Diagnostics, WingSpan};

pub struct Parser<'a> {
	pub source: &'a [u8],
	pub source_name: String,
	pub diagnostics: RefCell<Diagnostics>,
	pub imports: RefCell<&'a mut HashSet<String>>,
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
			span: Some(self.node_span(node)),
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
			file_id: self.source_name.to_string(),
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
			"short_import_statement" => {
				let module_name_node = statement_node.child_by_field_name("module_name").unwrap();
				if module_name_node.kind() == "identifier" {
					Ok(Statement::Use {
						module_name: self.node_symbol(&module_name_node)?,
						identifier: if let Some(identifier) = statement_node.child_by_field_name("alias") {
							Some(self.node_symbol(&identifier)?)
						} else {
							None
						},
					})
				} else if module_name_node.kind() == "string" {
					let bring_target = self.node_text(&module_name_node);
					let bring_target = &bring_target[1..bring_target.len() - 1];
					let context_dir = PathBuf::from(&self.source_name);
					let context_dir = context_dir.parent().unwrap().to_str().unwrap();
					let brought = bring(bring_target, Some(context_dir), *self.imports.borrow_mut());
					Ok(Statement::Bring {
						module_path: bring_target.to_string(),
						statements: brought
							.unwrap_or((
								Scope {
									statements: vec![],
									env: None,
								},
								Diagnostics::new(),
							))
							.0,
					})
				} else {
					panic!("Unexpected bring type {}", module_name_node.kind())
				}
			}
			"variable_definition_statement" => {
				let type_ = if let Some(type_node) = statement_node.child_by_field_name("type") {
					Some(self.build_type(&type_node)?)
				} else {
					None
				};
				Ok(Statement::VariableDef {
					var_name: self.node_symbol(&statement_node.child_by_field_name("name").unwrap())?,
					initial_value: self.build_expression(&statement_node.child_by_field_name("value").unwrap())?,
					type_,
				})
			}
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
							return_type: Some(Box::new(Type::CustomType {
								root: name.clone(),
								fields: vec![],
							})),
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

		let parent = if let Some(parent_node) = statement_node.child_by_field_name("parent") {
			Some(self.build_type(&parent_node)?)
		} else {
			None
		};
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
					.child_by_field_name("type")
					.map(|rt| Box::new(self.build_type(&rt).unwrap())),
				flight,
			},
			captures: RefCell::new(None),
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
				"num" => Ok(Type::Number),
				"str" => Ok(Type::String),
				"bool" => Ok(Type::Bool),
				"duration" => Ok(Type::Duration),
				"ERROR" => self.add_error(format!("Expected builtin type"), type_node),
				other => panic!("Unexpected builtin type {} || {:#?}", other, type_node),
			},
			"custom_type" => Ok(self.build_custom_type(&type_node)?),
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
			"mutable_container_type" | "immutable_container_type" => {
				let container_type = self.node_text(&type_node.child_by_field_name("collection_type").unwrap());
				let element_type = type_node.child_by_field_name("type_parameter").unwrap();
				match container_type {
					"Map" => Ok(Type::Map(Box::new(self.build_type(&element_type)?))),
					"Set" | "Array" | "MutSet" | "MutMap" | "MutArray" | "Promise" => self.add_error(
						format!("{} container type currently unsupported", container_type),
						type_node,
					)?,
					"ERROR" => self.add_error(format!("Expected builtin container type"), type_node)?,
					other => panic!("Unexpected container type {} || {:#?}", other, type_node),
				}
			}
			"ERROR" => self.add_error(format!("Expected type"), type_node),
			other => panic!("Unexpected type {} || {:#?}", other, type_node),
		}
	}

	fn build_nested_identifier(&self, nested_node: &Node) -> DiagnosticResult<Reference> {
		Ok(Reference::NestedIdentifier {
			object: Box::new(self.build_expression(&nested_node.child_by_field_name("object").unwrap())?),
			property: self.node_symbol(&nested_node.child_by_field_name("property").unwrap())?,
		})
	}

	fn build_custom_type(&self, nested_node: &Node) -> DiagnosticResult<Type> {
		let mut cursor = nested_node.walk();
		Ok(Type::CustomType {
			root: self.node_symbol(&nested_node.child_by_field_name("object").unwrap())?,
			fields: nested_node
				.children_by_field_name("fields", &mut cursor)
				.map(|n| self.node_symbol(&n).unwrap())
				.collect(),
		})
	}

	fn build_reference(&self, reference_node: &Node) -> DiagnosticResult<Reference> {
		let actual_node = reference_node.named_child(0).unwrap();
		match actual_node.kind() {
			"identifier" => Ok(Reference::Identifier(self.node_symbol(&actual_node)?)),
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
					let arg_name_node = &child.named_child(0).unwrap();
					let arg_name = self.node_symbol(arg_name_node)?;
					if named_args.contains_key(&arg_name) {
						_ = self.add_error::<ArgList>(format!("Duplicate argument name"), arg_name_node);
					} else {
						named_args.insert(arg_name, self.build_expression(&child.named_child(1).unwrap())?);
					}
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
		let expression_node = &self.check_error(*exp_node, "Expression")?;
		let expression_span = self.node_span(expression_node);
		match expression_node.kind() {
			"new_expression" => {
				let class = self.build_type(&expression_node.child_by_field_name("class").unwrap())?;

				let arg_list = if let Some(args_node) = expression_node.child_by_field_name("args") {
					self.build_arg_list(&args_node)
				} else {
					Ok(ArgList::new())
				};

				let obj_id = expression_node.child_by_field_name("id").map(|n| {
					let id_str = self.node_text(&n.named_child(0).unwrap());
					id_str[1..id_str.len() - 1].to_string()
				});
				let obj_scope = if let Some(scope_expr_node) = expression_node.child_by_field_name("scope") {
					Some(Box::new(self.build_expression(&scope_expr_node)?))
				} else {
					None
				};
				Ok(Expr::new(
					ExprType::New {
						class,
						obj_id,
						arg_list: arg_list?,
						obj_scope,
					},
					expression_span,
				))
			}
			"binary_expression" => Ok(Expr::new(
				ExprType::Binary {
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
				},
				expression_span,
			)),
			"unary_expression" => Ok(Expr::new(
				ExprType::Unary {
					op: match self.node_text(&expression_node.child_by_field_name("op").unwrap()) {
						"+" => UnaryOperator::Plus,
						"-" => UnaryOperator::Minus,
						"!" => UnaryOperator::Not,
						"ERROR" => self.add_error::<UnaryOperator>(format!("Expected unary operator"), expression_node)?,
						other => panic!("Unexpected unary operator {} || {:#?}", other, expression_node),
					},
					exp: Box::new(self.build_expression(&expression_node.child_by_field_name("arg").unwrap())?),
				},
				expression_span,
			)),
			"string" => {
				if expression_node.named_child_count() == 0 {
					Ok(Expr::new(
						ExprType::Literal(Literal::String(self.node_text(&expression_node).into())),
						expression_span,
					))
				} else {
					// We must go over the string and separate it into parts (static and expr)
					let mut cursor = expression_node.walk();
					let mut parts = Vec::new();

					// Skip first and last quote
					let end = expression_node.end_byte() - 1;
					let mut last_start = expression_node.start_byte() + 1;
					let mut last_end = end;

					for interpolation_node in expression_node.named_children(&mut cursor) {
						let interpolation_start = interpolation_node.start_byte();
						let interpolation_end = interpolation_node.end_byte();

						if interpolation_start != last_start {
							parts.push(InterpolatedStringPart::Static(
								str::from_utf8(&self.source[last_start..interpolation_start])
									.unwrap()
									.into(),
							));
						}

						parts.push(InterpolatedStringPart::Expr(
							self.build_expression(&interpolation_node.named_child(0).unwrap())?,
						));

						last_start = interpolation_start;
						last_end = interpolation_end;
					}

					if last_end != end {
						parts.push(InterpolatedStringPart::Static(
							str::from_utf8(&self.source[last_end..end]).unwrap().into(),
						));
					}

					Ok(Expr::new(
						ExprType::Literal(Literal::InterpolatedString(InterpolatedString { parts })),
						expression_span,
					))
				}
			}

			"number" => Ok(Expr::new(
				ExprType::Literal(Literal::Number(
					self.node_text(&expression_node).parse().expect("Number string"),
				)),
				expression_span,
			)),
			"bool" => Ok(Expr::new(
				ExprType::Literal(Literal::Boolean(match self.node_text(&expression_node) {
					"true" => true,
					"false" => false,
					"ERROR" => self.add_error::<bool>(format!("Expected boolean literal"), expression_node)?,
					other => panic!("Unexpected boolean literal {} || {:#?}", other, expression_node),
				})),
				expression_span,
			)),
			"duration" => Ok(Expr::new(
				ExprType::Literal(self.build_duration(&expression_node)?),
				expression_span,
			)),
			"reference" => Ok(Expr::new(
				ExprType::Reference(self.build_reference(&expression_node)?),
				expression_span,
			)),
			"positional_argument" => self.build_expression(&expression_node.named_child(0).unwrap()),
			"keyword_argument_value" => self.build_expression(&expression_node.named_child(0).unwrap()),
			"call" => Ok(Expr::new(
				ExprType::Call {
					function: self.build_reference(&expression_node.child_by_field_name("call_name").unwrap())?,
					args: self.build_arg_list(&expression_node.child_by_field_name("args").unwrap())?,
				},
				expression_span,
			)),
			"parenthesized_expression" => self.build_expression(&expression_node.named_child(0).unwrap()),
			"preflight_closure" => self.add_error(format!("Anonymous closures not implemented yet"), expression_node),
			"inflight_closure" => self.add_error(format!("Anonymous closures not implemented yet"), expression_node),
			"pure_closure" => self.add_error(format!("Anonymous closures not implemented yet"), expression_node),
			"map_literal" => {
				let map_type = if let Some(type_node) = expression_node.child_by_field_name("type") {
					Some(self.build_type(&type_node)?)
				} else {
					None
				};

				let mut fields = HashMap::new();
				let mut cursor = expression_node.walk();
				for field_node in expression_node.children_by_field_name("map_literal_member", &mut cursor) {
					let key_node = field_node.named_child(0).unwrap();
					let key = match key_node.kind() {
						"string" => {
							let s = self.node_text(&key_node);
							// Remove quotes, we assume this is a valid key for a map
							s[1..s.len() - 1].to_string()
						}
						"identifier" => self.node_text(&key_node).to_string(),
						other => panic!("Unexpected map key type {} at {:?}", other, key_node),
					};
					let value_node = field_node.named_child(1).unwrap();
					if fields.contains_key(&key) {
						_ = self.add_error::<()>(format!("Duplicate key {} in map literal", key), &key_node);
					} else {
						fields.insert(key, self.build_expression(&value_node)?);
					}
				}

				Ok(Expr::new(
					ExprType::MapLiteral {
						fields,
						type_: map_type,
					},
					expression_span,
				))
			}
			"struct_literal" => {
				let type_ = self.build_type(&expression_node.child_by_field_name("type").unwrap());
				let mut fields = HashMap::new();
				let mut cursor = expression_node.walk();
				for field in expression_node.children_by_field_name("fields", &mut cursor) {
					let field_name = self.node_symbol(&field.named_child(0).unwrap());
					let field_value = self.build_expression(&field.named_child(1).unwrap());
					// Add fields to our struct literal, if some are missing or aren't part of the type we'll fail on type checking
					if let (Ok(k), Ok(v)) = (field_name, field_value) {
						if fields.contains_key(&k) {
							// TODO: ugly, we need to change add_error to not return anything and have a wrapper `raise_error` that returns a Result
							_ = self.add_error::<()>(format!("Duplicate field {} in struct literal", k), expression_node);
						} else {
							fields.insert(k, v);
						}
					}
				}
				Ok(Expr::new(
					ExprType::StructLiteral { type_: type_?, fields },
					expression_span,
				))
			}
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
