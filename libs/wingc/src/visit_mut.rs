use crate::ast::{
	ArgList, Class, Constructor, Expr, ExprKind, FunctionBody, FunctionDefinition, FunctionParameter, FunctionSignature,
	Interface, InterpolatedStringPart, Literal, Reference, Scope, Stmt, StmtKind, Symbol, TypeAnnotation,
	UserDefinedType,
};

/// Visitor trait for mutating the AST.
/// TODO: rename `visit_blah` to `visit_blah_mut`
pub trait VisitMut<'ast> {
	fn visit_scope_mut(&mut self, node: &'ast mut Scope) {
		visit_scope_mut(self, node);
	}
	fn visit_stmt_mut(&mut self, node: &'ast mut Stmt) {
		visit_stmt_mut(self, node);
	}
	fn visit_class_mut(&mut self, node: &'ast mut Class) {
		visit_class_mut(self, node);
	}
	fn visit_interface_mut(&mut self, node: &'ast mut Interface) {
		visit_interface_mut(self, node);
	}
	fn visit_constructor_mut(&mut self, node: &'ast mut Constructor) {
		visit_constructor_mut(self, node);
	}
	fn visit_expr_mut(&mut self, node: &'ast mut Expr) {
		visit_expr_mut(self, node);
	}
	fn visit_literal_mut(&mut self, node: &'ast mut Literal) {
		visit_literal_mut(self, node);
	}
	fn visit_reference_mut(&mut self, node: &'ast mut Reference) {
		visit_reference_mut(self, node);
	}
	fn visit_function_definition_mut(&mut self, node: &'ast mut FunctionDefinition) {
		visit_function_definition_mut(self, node);
	}
	fn visit_function_signature_mut(&mut self, node: &'ast mut FunctionSignature) {
		visit_function_signature_mut(self, node);
	}
	fn visit_function_parameter_mut(&mut self, node: &'ast mut FunctionParameter) {
		visit_function_parameter_mut(self, node);
	}
	fn visit_args_mut(&mut self, node: &'ast mut ArgList) {
		visit_args_mut(self, node);
	}
	fn visit_user_defined_type_mut(&mut self, node: &'ast mut UserDefinedType) {
		visit_user_defined_type_mut(self, node);
	}
	fn visit_type_annotation_mut(&mut self, node: &'ast mut TypeAnnotation) {
		visit_type_annotation_mut(self, node)
	}
	fn visit_symbol_mut(&mut self, _node: &'ast mut Symbol) {}
}

pub fn visit_scope_mut<'ast, V>(v: &mut V, node: &'ast mut Scope)
where
	V: VisitMut<'ast> + ?Sized,
{
	for stmt in &mut node.statements {
		v.visit_stmt_mut(stmt);
	}
}

pub fn visit_stmt_mut<'ast, V>(v: &mut V, node: &'ast mut Stmt)
where
	V: VisitMut<'ast> + ?Sized,
{
	match &mut node.kind {
		StmtKind::Bring {
			module_name,
			identifier,
		} => {
			v.visit_symbol_mut(module_name);
			if let Some(identifier) = identifier {
				v.visit_symbol_mut(identifier);
			}
		}
		StmtKind::VariableDef {
			reassignable: _,
			var_name,
			initial_value,
			type_,
		} => {
			v.visit_symbol_mut(var_name);
			if let Some(type_) = type_ {
				v.visit_type_annotation_mut(type_);
			}
			v.visit_expr_mut(initial_value);
		}
		StmtKind::ForLoop {
			iterator,
			iterable,
			statements,
		} => {
			v.visit_symbol_mut(iterator);
			v.visit_expr_mut(iterable);
			v.visit_scope_mut(statements);
		}
		StmtKind::While { condition, statements } => {
			v.visit_expr_mut(condition);
			v.visit_scope_mut(statements);
		}
		StmtKind::Break | StmtKind::Continue => {}
		StmtKind::If {
			condition,
			statements,
			elif_statements,
			else_statements,
		} => {
			v.visit_expr_mut(condition);
			v.visit_scope_mut(statements);
			for elif in elif_statements {
				v.visit_expr_mut(&mut elif.condition);
				v.visit_scope_mut(&mut elif.statements);
			}
			if let Some(statements) = else_statements {
				v.visit_scope_mut(statements);
			}
		}
		StmtKind::Expression(expr) => {
			v.visit_expr_mut(expr);
		}
		StmtKind::Assignment { variable, value } => {
			v.visit_reference_mut(variable);
			v.visit_expr_mut(value);
		}
		StmtKind::Return(expr) => {
			if let Some(expr) = expr {
				v.visit_expr_mut(expr);
			}
		}
		StmtKind::Scope(scope) => {
			v.visit_scope_mut(scope);
		}
		StmtKind::Class(class) => {
			v.visit_class_mut(class);
		}
		StmtKind::Interface(interface) => {
			v.visit_interface_mut(interface);
		}
		StmtKind::Struct {
			name,
			extends,
			fields: members,
		} => {
			v.visit_symbol_mut(name);
			for extend in extends {
				v.visit_user_defined_type_mut(extend);
			}
			for member in members {
				v.visit_symbol_mut(&mut member.name);
				v.visit_type_annotation_mut(&mut member.member_type);
			}
		}
		StmtKind::Enum { name, values: _values } => {
			v.visit_symbol_mut(name);

			// TODO: iterate over values
		}
		StmtKind::TryCatch {
			try_statements,
			catch_block,
			finally_statements,
		} => {
			v.visit_scope_mut(try_statements);
			if let Some(catch_block) = catch_block {
				if let Some(exception_var) = &mut catch_block.exception_var {
					v.visit_symbol_mut(exception_var);
				}
				v.visit_scope_mut(&mut catch_block.statements);
			}
			if let Some(finally_statements) = finally_statements {
				v.visit_scope_mut(finally_statements);
			}
		}
	}
}

pub fn visit_class_mut<'ast, V>(v: &mut V, node: &'ast mut Class)
where
	V: VisitMut<'ast> + ?Sized,
{
	v.visit_symbol_mut(&mut node.name);

	v.visit_constructor_mut(&mut node.constructor);

	for field in &mut node.fields {
		v.visit_symbol_mut(&mut field.name);
		v.visit_type_annotation_mut(&mut field.member_type);
	}

	for method in &mut node.methods {
		v.visit_symbol_mut(&mut method.0);
		v.visit_function_definition_mut(&mut method.1);
	}

	if let Some(extend) = &mut node.parent {
		v.visit_user_defined_type_mut(extend);
	}

	for implement in &mut node.implements {
		v.visit_user_defined_type_mut(implement);
	}
}

pub fn visit_interface_mut<'ast, V>(v: &mut V, node: &'ast mut Interface)
where
	V: VisitMut<'ast> + ?Sized,
{
	v.visit_symbol_mut(&mut node.name);

	for method in &mut node.methods {
		v.visit_symbol_mut(&mut method.0);
		v.visit_function_signature_mut(&mut method.1);
	}

	for extend in &mut node.extends {
		v.visit_user_defined_type_mut(extend);
	}
}

pub fn visit_constructor_mut<'ast, V>(v: &mut V, node: &'ast mut Constructor)
where
	V: VisitMut<'ast> + ?Sized,
{
	v.visit_function_signature_mut(&mut node.signature);
	v.visit_scope_mut(&mut node.statements);
}

pub fn visit_expr_mut<'ast, V>(v: &mut V, node: &'ast mut Expr)
where
	V: VisitMut<'ast> + ?Sized,
{
	match &mut node.kind {
		ExprKind::New {
			class,
			obj_id: _,
			obj_scope,
			arg_list,
		} => {
			v.visit_type_annotation_mut(class);
			if let Some(scope) = obj_scope {
				v.visit_expr_mut(scope);
			}
			v.visit_args_mut(arg_list);
		}
		ExprKind::Literal(lit) => {
			v.visit_literal_mut(lit);
		}
		ExprKind::Range {
			start,
			inclusive: _,
			end,
		} => {
			v.visit_expr_mut(start);
			v.visit_expr_mut(end);
		}
		ExprKind::Reference(ref_) => {
			v.visit_reference_mut(ref_);
		}
		ExprKind::Call {
			callee: function,
			arg_list,
		} => {
			v.visit_expr_mut(function);
			v.visit_args_mut(arg_list);
		}
		ExprKind::Unary { op: _, exp } => {
			v.visit_expr_mut(exp);
		}
		ExprKind::Binary { op: _, left, right } => {
			v.visit_expr_mut(left);
			v.visit_expr_mut(right);
		}
		ExprKind::ArrayLiteral { type_, items } => {
			if let Some(type_) = type_ {
				v.visit_type_annotation_mut(type_);
			}
			for item in items {
				v.visit_expr_mut(item);
			}
		}
		ExprKind::JsonLiteral { element, .. } => {
			v.visit_expr_mut(element);
		}
		ExprKind::StructLiteral { type_, fields: _fields } => {
			v.visit_type_annotation_mut(type_);

			// TODO: iterate over fields
		}
		ExprKind::MapLiteral { type_, fields } => {
			if let Some(type_) = type_ {
				v.visit_type_annotation_mut(type_);
			}
			for val in fields.values_mut() {
				v.visit_expr_mut(val);
			}
		}
		ExprKind::SetLiteral { type_, items } => {
			if let Some(type_) = type_ {
				v.visit_type_annotation_mut(type_);
			}
			for item in items {
				v.visit_expr_mut(item);
			}
		}
		ExprKind::FunctionClosure(def) => {
			v.visit_function_definition_mut(def);
		}
	}
}

pub fn visit_literal_mut<'ast, V>(v: &mut V, node: &'ast mut Literal)
where
	V: VisitMut<'ast> + ?Sized,
{
	match node {
		Literal::InterpolatedString(interpolated_str) => {
			for part in &mut interpolated_str.parts {
				if let InterpolatedStringPart::Expr(exp) = part {
					v.visit_expr_mut(exp);
				}
			}
		}
		Literal::Boolean(_) => {}
		Literal::Number(_) => {}
		Literal::Duration(_) => {}
		Literal::String(_) => {}
	}
}

pub fn visit_reference_mut<'ast, V>(v: &mut V, node: &'ast mut Reference)
where
	V: VisitMut<'ast> + ?Sized,
{
	match node {
		Reference::Identifier(s) => {
			v.visit_symbol_mut(s);
		}
		Reference::InstanceMember { property, object } => {
			v.visit_expr_mut(object);
			v.visit_symbol_mut(property);
		}
		Reference::TypeMember { type_, property } => {
			v.visit_user_defined_type_mut(type_);
			v.visit_symbol_mut(property);
		}
	}
}

pub fn visit_function_definition_mut<'ast, V>(v: &mut V, node: &'ast mut FunctionDefinition)
where
	V: VisitMut<'ast> + ?Sized,
{
	v.visit_function_signature_mut(&mut node.signature);
	if let FunctionBody::Statements(scope) = &mut node.body {
		v.visit_scope_mut(scope);
	};
}

pub fn visit_function_signature_mut<'ast, V>(v: &mut V, node: &'ast mut FunctionSignature)
where
	V: VisitMut<'ast> + ?Sized,
{
	for param in &mut node.parameters {
		v.visit_function_parameter_mut(param);
	}
	if let Some(return_type) = &mut node.return_type {
		v.visit_type_annotation_mut(return_type);
	}
}

pub fn visit_function_parameter_mut<'ast, V>(v: &mut V, node: &'ast mut FunctionParameter)
where
	V: VisitMut<'ast> + ?Sized,
{
	v.visit_symbol_mut(&mut node.name);
	v.visit_type_annotation_mut(&mut node.type_annotation);
}

pub fn visit_args_mut<'ast, V>(v: &mut V, node: &'ast mut ArgList)
where
	V: VisitMut<'ast> + ?Sized,
{
	for arg in &mut node.pos_args {
		v.visit_expr_mut(arg);
	}

	// TODO: iterate over named args
}

pub fn visit_type_annotation_mut<'ast, V>(v: &mut V, node: &'ast mut TypeAnnotation)
where
	V: VisitMut<'ast> + ?Sized,
{
	match node {
		TypeAnnotation::Number => {}
		TypeAnnotation::String => {}
		TypeAnnotation::Bool => {}
		TypeAnnotation::Duration => {}
		TypeAnnotation::Json => {}
		TypeAnnotation::MutJson => {}
		TypeAnnotation::Optional(t) => v.visit_type_annotation_mut(t),
		TypeAnnotation::Array(t) => v.visit_type_annotation_mut(t),
		TypeAnnotation::MutArray(t) => v.visit_type_annotation_mut(t),
		TypeAnnotation::Map(t) => v.visit_type_annotation_mut(t),
		TypeAnnotation::MutMap(t) => v.visit_type_annotation_mut(t),
		TypeAnnotation::Set(t) => v.visit_type_annotation_mut(t),
		TypeAnnotation::MutSet(t) => v.visit_type_annotation_mut(t),
		TypeAnnotation::Function(f) => {
			for param in &mut f.param_types {
				v.visit_type_annotation_mut(param);
			}
			if let Some(return_type) = &mut f.return_type {
				v.visit_type_annotation_mut(return_type);
			}
		}
		TypeAnnotation::UserDefined(t) => {
			v.visit_symbol_mut(&mut t.root);
			for field in &mut t.fields {
				v.visit_symbol_mut(field);
			}
		}
		TypeAnnotation::Resource => {}
	}
}

pub fn visit_user_defined_type_mut<'ast, V>(v: &mut V, node: &'ast mut UserDefinedType)
where
	V: VisitMut<'ast> + ?Sized,
{
	v.visit_symbol_mut(&mut node.root);
	for field in &mut node.fields {
		v.visit_symbol_mut(field);
	}
}
