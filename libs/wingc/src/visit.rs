use crate::{
	ast::{
		ArgList, BringSource, CalleeKind, Class, Expr, ExprKind, FunctionBody, FunctionDefinition, FunctionParameter,
		FunctionSignature, Interface, InterpolatedStringPart, Literal, NewExpr, Reference, Scope, Stmt, StmtKind, Symbol,
		TypeAnnotation, TypeAnnotationKind, UserDefinedType,
	},
	dbg_panic,
};

/// Visitor pattern inspired by implementation from https://docs.rs/syn/latest/syn/visit/index.html
///
/// A visitor visits each node in the AST in depth-first order. The
/// default implementation of each method is to do nothing, so you only
/// need to implement the methods for the nodes you are interested in.
///
/// You can delegate back to the default implementation to visit the children
/// of a node by calling `visit::visit_<node_type>(self, node)`.
///
/// For example:
///
/// ```ignore
/// impl<'ast> Visit<'ast> for ExprVisitor {
///   fn visit_expr(&mut self, exp: &'ast Expr) {
///     println!("Expr with span={}", exp.span);
///
///     // Delegate to the default impl to visit any nested expressions.
///     visit::visit_expr(self, exp);
///   }
/// }
/// ```
///
/// TODO: Can we code-generate this based on data in `ast.rs`?
/// TODO: Provide a VisitMut trait that allows for mutation of the AST nodes
/// (each method would accept a `&mut node` instead of `&node`)
pub trait Visit<'ast> {
	fn visit_scope(&mut self, node: &'ast Scope) {
		visit_scope(self, node);
	}
	fn visit_stmt(&mut self, node: &'ast Stmt) {
		visit_stmt(self, node);
	}
	fn visit_class(&mut self, node: &'ast Class) {
		visit_class(self, node);
	}
	fn visit_interface(&mut self, node: &'ast Interface) {
		visit_interface(self, node);
	}
	fn visit_expr(&mut self, node: &'ast Expr) {
		visit_expr(self, node);
	}
	fn visit_new_expr(&mut self, node: &'ast NewExpr) {
		visit_new_expr(self, node);
	}
	fn visit_literal(&mut self, node: &'ast Literal) {
		visit_literal(self, node);
	}
	fn visit_reference(&mut self, node: &'ast Reference) {
		visit_reference(self, node);
	}
	fn visit_function_definition(&mut self, node: &'ast FunctionDefinition) {
		visit_function_definition(self, node);
	}
	fn visit_function_signature(&mut self, node: &'ast FunctionSignature) {
		visit_function_signature(self, node);
	}
	fn visit_function_parameter(&mut self, node: &'ast FunctionParameter) {
		visit_function_parameter(self, node);
	}
	fn visit_args(&mut self, node: &'ast ArgList) {
		visit_args(self, node);
	}
	fn visit_user_defined_type(&mut self, node: &'ast UserDefinedType) {
		visit_user_defined_type(self, node);
	}
	fn visit_type_annotation(&mut self, node: &'ast TypeAnnotation) {
		visit_type_annotation(self, node)
	}
	fn visit_symbol(&mut self, node: &'ast Symbol) {
		visit_symbol(self, node);
	}
}

pub fn visit_scope<'ast, V>(v: &mut V, node: &'ast Scope)
where
	V: Visit<'ast> + ?Sized,
{
	for stmt in &node.statements {
		v.visit_stmt(stmt);
	}
}

pub fn visit_stmt<'ast, V>(v: &mut V, node: &'ast Stmt)
where
	V: Visit<'ast> + ?Sized,
{
	match &node.kind {
		StmtKind::Bring { source, identifier } => {
			match &source {
				BringSource::BuiltinModule(name) => v.visit_symbol(name),
				BringSource::JsiiModule(name) => v.visit_symbol(name),
				BringSource::WingFile(name) => v.visit_symbol(name),
			}
			if let Some(identifier) = identifier {
				v.visit_symbol(identifier);
			}
		}
		StmtKind::SuperConstructor { arg_list } => v.visit_args(arg_list),
		StmtKind::Let {
			reassignable: _,
			var_name,
			initial_value,
			type_,
		} => {
			v.visit_symbol(var_name);
			if let Some(type_) = type_ {
				v.visit_type_annotation(type_);
			}
			v.visit_expr(initial_value);
		}
		StmtKind::ForLoop {
			iterator,
			iterable,
			statements,
		} => {
			v.visit_symbol(iterator);
			v.visit_expr(iterable);
			v.visit_scope(statements);
		}
		StmtKind::While { condition, statements } => {
			v.visit_expr(condition);
			v.visit_scope(statements);
		}
		StmtKind::Break | StmtKind::Continue => {}
		StmtKind::IfLet {
			value,
			statements,
			reassignable: _,
			var_name,
			elif_statements,
			else_statements,
		} => {
			v.visit_symbol(var_name);
			v.visit_expr(value);
			v.visit_scope(statements);
			for elif in elif_statements {
				v.visit_symbol(&elif.var_name);
				v.visit_expr(&elif.value);
				v.visit_scope(&elif.statements);
			}
			if let Some(statements) = else_statements {
				v.visit_scope(statements);
			}
		}
		StmtKind::If {
			condition,
			statements,
			elif_statements,
			else_statements,
		} => {
			v.visit_expr(condition);
			v.visit_scope(statements);
			for elif in elif_statements {
				v.visit_expr(&elif.condition);
				v.visit_scope(&elif.statements);
			}
			if let Some(statements) = else_statements {
				v.visit_scope(statements);
			}
		}
		StmtKind::Expression(expr) => {
			v.visit_expr(&expr);
		}
		StmtKind::Assignment { variable, value } => {
			v.visit_reference(variable);
			v.visit_expr(value);
		}
		StmtKind::Return(expr) => {
			if let Some(expr) = expr {
				v.visit_expr(expr);
			}
		}
		StmtKind::Throw(expr) => {
			v.visit_expr(expr);
		}
		StmtKind::Scope(scope) => {
			v.visit_scope(scope);
		}
		StmtKind::Class(class) => {
			v.visit_class(class);
		}
		StmtKind::Interface(interface) => {
			v.visit_interface(interface);
		}
		StmtKind::Struct {
			name,
			extends,
			fields: members,
		} => {
			v.visit_symbol(name);
			for extend in extends {
				v.visit_user_defined_type(extend);
			}
			for member in members {
				v.visit_symbol(&member.name);
				v.visit_type_annotation(&member.member_type);
			}
		}
		StmtKind::Enum { name, values } => {
			v.visit_symbol(name);
			for value in values {
				v.visit_symbol(value);
			}
		}
		StmtKind::TryCatch {
			try_statements,
			catch_block,
			finally_statements,
		} => {
			v.visit_scope(try_statements);
			if let Some(catch_block) = catch_block {
				if let Some(exception_var) = &catch_block.exception_var {
					v.visit_symbol(exception_var);
				}
				v.visit_scope(&catch_block.statements);
			}
			if let Some(finally_statements) = finally_statements {
				v.visit_scope(finally_statements);
			}
		}
		StmtKind::CompilerDebugEnv => {}
	}
}

pub fn visit_class<'ast, V>(v: &mut V, node: &'ast Class)
where
	V: Visit<'ast> + ?Sized,
{
	v.visit_symbol(&node.name);

	v.visit_function_definition(&node.initializer);
	v.visit_function_definition(&node.inflight_initializer);

	for field in &node.fields {
		v.visit_symbol(&field.name);
		v.visit_type_annotation(&field.member_type);
	}

	for method in &node.methods {
		v.visit_symbol(&method.0);
		v.visit_function_definition(&method.1);
	}

	if let Some(extend) = &node.parent {
		v.visit_user_defined_type(extend);
	}

	for implement in &node.implements {
		v.visit_user_defined_type(&implement);
	}
}

pub fn visit_interface<'ast, V>(v: &mut V, node: &'ast Interface)
where
	V: Visit<'ast> + ?Sized,
{
	v.visit_symbol(&node.name);

	for method in &node.methods {
		v.visit_symbol(&method.0);
		v.visit_function_signature(&method.1);
	}

	for extend in &node.extends {
		v.visit_user_defined_type(extend);
	}
}

pub fn visit_new_expr<'ast, V>(v: &mut V, node: &'ast NewExpr)
where
	V: Visit<'ast> + ?Sized,
{
	v.visit_user_defined_type(&node.class);
	v.visit_args(&node.arg_list);
	if let Some(id) = &node.obj_id {
		v.visit_expr(&id);
	}
	if let Some(scope) = &node.obj_scope {
		v.visit_expr(&scope);
	}
}

pub fn visit_expr<'ast, V>(v: &mut V, node: &'ast Expr)
where
	V: Visit<'ast> + ?Sized,
{
	match &node.kind {
		ExprKind::New(new_expr) => {
			v.visit_new_expr(new_expr);
		}
		ExprKind::Literal(lit) => {
			v.visit_literal(lit);
		}
		ExprKind::Range {
			start,
			inclusive: _,
			end,
		} => {
			v.visit_expr(start);
			v.visit_expr(end);
		}
		ExprKind::Reference(ref_) => {
			v.visit_reference(ref_);
		}
		ExprKind::Call { callee, arg_list } => {
			match callee {
				CalleeKind::Expr(expr) => v.visit_expr(expr),
				CalleeKind::SuperCall(method) => v.visit_symbol(method),
			}
			v.visit_args(arg_list);
		}
		ExprKind::Unary { op: _, exp } => {
			v.visit_expr(exp);
		}
		ExprKind::Binary { op: _, left, right } => {
			v.visit_expr(left);
			v.visit_expr(right);
		}
		ExprKind::ArrayLiteral { type_, items } => {
			if let Some(type_) = type_ {
				v.visit_type_annotation(type_);
			}
			for item in items {
				v.visit_expr(item);
			}
		}
		ExprKind::JsonLiteral { element, .. } => {
			v.visit_expr(element);
		}
		ExprKind::StructLiteral { type_, fields } => {
			v.visit_type_annotation(type_);
			for (sym, val) in fields.iter() {
				v.visit_symbol(sym);
				v.visit_expr(val);
			}
		}
		ExprKind::JsonMapLiteral { fields } => {
			for (name, val) in fields.iter() {
				v.visit_symbol(name);
				v.visit_expr(val);
			}
		}
		ExprKind::MapLiteral { type_, fields } => {
			if let Some(type_) = type_ {
				v.visit_type_annotation(type_);
			}
			for (name, val) in fields.iter() {
				v.visit_symbol(name);
				v.visit_expr(val);
			}
		}
		ExprKind::SetLiteral { type_, items } => {
			if let Some(type_) = type_ {
				v.visit_type_annotation(type_);
			}
			for item in items {
				v.visit_expr(item);
			}
		}
		ExprKind::FunctionClosure(def) => {
			v.visit_function_definition(def);
		}
		ExprKind::CompilerDebugPanic => {
			// Handle the debug panic expression (during visiting)
			dbg_panic!();
		}
	}
}

pub fn visit_literal<'ast, V>(v: &mut V, node: &'ast Literal)
where
	V: Visit<'ast> + ?Sized,
{
	match node {
		Literal::InterpolatedString(interpolated_str) => {
			for part in &interpolated_str.parts {
				if let InterpolatedStringPart::Expr(exp) = part {
					v.visit_expr(exp);
				}
			}
		}
		Literal::Nil => {}
		Literal::Boolean(_) => {}
		Literal::Number(_) => {}
		Literal::String(_) => {}
	}
}

pub fn visit_reference<'ast, V>(v: &mut V, node: &'ast Reference)
where
	V: Visit<'ast> + ?Sized,
{
	match node {
		Reference::Identifier(s) => {
			v.visit_symbol(s);
		}
		Reference::InstanceMember {
			property,
			object,
			optional_accessor: _,
		} => {
			v.visit_expr(object);
			v.visit_symbol(property);
		}
		Reference::TypeMember { type_name, property } => {
			v.visit_user_defined_type(type_name);
			v.visit_symbol(property);
		}
	}
}

pub fn visit_function_definition<'ast, V>(v: &mut V, node: &'ast FunctionDefinition)
where
	V: Visit<'ast> + ?Sized,
{
	v.visit_function_signature(&node.signature);
	if let FunctionBody::Statements(scope) = &node.body {
		v.visit_scope(scope);
	};
}

pub fn visit_function_signature<'ast, V>(v: &mut V, node: &'ast FunctionSignature)
where
	V: Visit<'ast> + ?Sized,
{
	for param in &node.parameters {
		v.visit_function_parameter(param);
	}

	v.visit_type_annotation(&node.return_type);
}

pub fn visit_function_parameter<'ast, V>(v: &mut V, node: &'ast FunctionParameter)
where
	V: Visit<'ast> + ?Sized,
{
	v.visit_symbol(&node.name);
	v.visit_type_annotation(&node.type_annotation);
}

pub fn visit_args<'ast, V>(v: &mut V, node: &'ast ArgList)
where
	V: Visit<'ast> + ?Sized,
{
	for arg in &node.pos_args {
		v.visit_expr(&arg);
	}
	for arg in &node.named_args {
		v.visit_symbol(&arg.0);
		v.visit_expr(&arg.1);
	}
}

pub fn visit_type_annotation<'ast, V>(v: &mut V, node: &'ast TypeAnnotation)
where
	V: Visit<'ast> + ?Sized,
{
	match &node.kind {
		TypeAnnotationKind::Number => {}
		TypeAnnotationKind::String => {}
		TypeAnnotationKind::Bool => {}
		TypeAnnotationKind::Duration => {}
		TypeAnnotationKind::Void => {}
		TypeAnnotationKind::Json => {}
		TypeAnnotationKind::MutJson => {}
		TypeAnnotationKind::Inferred => {}
		TypeAnnotationKind::Optional(t) => v.visit_type_annotation(t),
		TypeAnnotationKind::Array(t) => v.visit_type_annotation(t),
		TypeAnnotationKind::MutArray(t) => v.visit_type_annotation(t),
		TypeAnnotationKind::Map(t) => v.visit_type_annotation(t),
		TypeAnnotationKind::MutMap(t) => v.visit_type_annotation(t),
		TypeAnnotationKind::Set(t) => v.visit_type_annotation(t),
		TypeAnnotationKind::MutSet(t) => v.visit_type_annotation(t),
		TypeAnnotationKind::Function(f) => {
			for param in &f.parameters {
				v.visit_symbol(&param.name);
				v.visit_type_annotation(&param.type_annotation);
			}
			v.visit_type_annotation(&f.return_type);
		}
		TypeAnnotationKind::UserDefined(t) => v.visit_user_defined_type(t),
	}
}

pub fn visit_user_defined_type<'ast, V>(v: &mut V, node: &'ast UserDefinedType)
where
	V: Visit<'ast> + ?Sized,
{
	v.visit_symbol(&node.root);
	for field in &node.fields {
		v.visit_symbol(field);
	}
}

pub fn visit_symbol<'ast, V>(_v: &mut V, _node: &'ast Symbol)
where
	V: Visit<'ast> + ?Sized,
{
}
