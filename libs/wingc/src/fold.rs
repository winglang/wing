use crate::ast::{
	ArgList, CatchBlock, Class, ClassField, ElifBlock, Expr, ExprKind, FunctionBody, FunctionDefinition,
	FunctionParameter, FunctionSignature, FunctionTypeAnnotation, Initializer, Interface, InterpolatedString,
	InterpolatedStringPart, Literal, Reference, Scope, Stmt, StmtKind, StructField, Symbol, TypeAnnotation,
	UserDefinedType,
};

/// Similar to the `visit` module in `wingc` except each method takes ownership of an
/// AST node instead of a reference to it, and returns a new AST node instance.
/// This trait can be useful for AST transformations.
pub trait Fold {
	fn fold_scope(&mut self, node: Scope) -> Scope {
		fold_scope(self, node)
	}
	fn fold_stmt(&mut self, node: Stmt) -> Stmt {
		fold_stmt(self, node)
	}
	fn fold_class(&mut self, node: Class) -> Class {
		fold_class(self, node)
	}
	fn fold_class_field(&mut self, node: ClassField) -> ClassField {
		fold_class_field(self, node)
	}
	fn fold_struct_field(&mut self, node: StructField) -> StructField {
		fold_struct_field(self, node)
	}
	fn fold_interface(&mut self, node: Interface) -> Interface {
		fold_interface(self, node)
	}
	fn fold_constructor(&mut self, node: Initializer) -> Initializer {
		fold_constructor(self, node)
	}
	fn fold_expr(&mut self, node: Expr) -> Expr {
		fold_expr(self, node)
	}
	fn fold_literal(&mut self, node: Literal) -> Literal {
		fold_literal(self, node)
	}
	fn fold_reference(&mut self, node: Reference) -> Reference {
		fold_reference(self, node)
	}
	fn fold_function_definition(&mut self, node: FunctionDefinition) -> FunctionDefinition {
		fold_function_definition(self, node)
	}
	fn fold_function_signature(&mut self, node: FunctionSignature) -> FunctionSignature {
		fold_function_signature(self, node)
	}
	fn fold_function_parameter(&mut self, node: FunctionParameter) -> FunctionParameter {
		fold_function_parameter(self, node)
	}
	fn fold_args(&mut self, node: ArgList) -> ArgList {
		fold_args(self, node)
	}
	fn fold_type_annotation(&mut self, node: TypeAnnotation) -> TypeAnnotation {
		fold_type_annotation(self, node)
	}
	fn fold_user_defined_type(&mut self, node: UserDefinedType) -> UserDefinedType {
		fold_user_defined_type(self, node)
	}
	fn fold_symbol(&mut self, node: Symbol) -> Symbol {
		fold_symbol(self, node)
	}
}

pub fn fold_scope<F>(f: &mut F, node: Scope) -> Scope
where
	F: Fold + ?Sized,
{
	Scope {
		statements: node.statements.into_iter().map(|stmt| f.fold_stmt(stmt)).collect(),
		span: node.span,
		env: node.env,
	}
}

pub fn fold_stmt<F>(f: &mut F, node: Stmt) -> Stmt
where
	F: Fold + ?Sized,
{
	let kind = match node.kind {
		StmtKind::Bring {
			module_name,
			identifier,
		} => StmtKind::Bring {
			module_name: f.fold_symbol(module_name),
			identifier: identifier.map(|id| f.fold_symbol(id)),
		},
		StmtKind::VariableDef {
			reassignable,
			var_name,
			initial_value,
			type_,
		} => StmtKind::VariableDef {
			reassignable,
			var_name: f.fold_symbol(var_name),
			initial_value: f.fold_expr(initial_value),
			type_: type_.map(|type_| f.fold_type_annotation(type_)),
		},
		StmtKind::ForLoop {
			iterator,
			iterable,
			statements,
		} => StmtKind::ForLoop {
			iterator: f.fold_symbol(iterator),
			iterable: f.fold_expr(iterable),
			statements: f.fold_scope(statements),
		},
		StmtKind::While { condition, statements } => StmtKind::While {
			condition: f.fold_expr(condition),
			statements: f.fold_scope(statements),
		},
		StmtKind::If {
			condition,
			statements,
			elif_statements,
			else_statements,
		} => StmtKind::If {
			condition: f.fold_expr(condition),
			statements: f.fold_scope(statements),
			elif_statements: elif_statements
				.into_iter()
				.map(|elif_block| ElifBlock {
					condition: f.fold_expr(elif_block.condition),
					statements: f.fold_scope(elif_block.statements),
				})
				.collect(),
			else_statements: else_statements.map(|statements| f.fold_scope(statements)),
		},
		StmtKind::Break => StmtKind::Break,
		StmtKind::Continue => StmtKind::Continue,
		StmtKind::Return(value) => StmtKind::Return(value.map(|value| f.fold_expr(value))),
		StmtKind::Expression(expr) => StmtKind::Expression(f.fold_expr(expr)),
		StmtKind::Assignment { variable, value } => StmtKind::Assignment {
			variable: f.fold_reference(variable),
			value: f.fold_expr(value),
		},
		StmtKind::Scope(scope) => StmtKind::Scope(f.fold_scope(scope)),
		StmtKind::Class(class) => StmtKind::Class(f.fold_class(class)),
		StmtKind::Interface(interface) => StmtKind::Interface(f.fold_interface(interface)),
		StmtKind::Struct { name, extends, fields } => StmtKind::Struct {
			name: f.fold_symbol(name),
			extends: extends.into_iter().map(|e| f.fold_user_defined_type(e)).collect(),
			fields: fields.into_iter().map(|field| f.fold_struct_field(field)).collect(),
		},
		StmtKind::Enum { name, values } => StmtKind::Enum {
			name: f.fold_symbol(name),
			values: values.into_iter().map(|value| f.fold_symbol(value)).collect(),
		},
		StmtKind::TryCatch {
			try_statements,
			catch_block,
			finally_statements,
		} => StmtKind::TryCatch {
			try_statements: f.fold_scope(try_statements),
			catch_block: catch_block.map(|catch_block| CatchBlock {
				exception_var: catch_block.exception_var.map(|var| f.fold_symbol(var)),
				statements: f.fold_scope(catch_block.statements),
			}),
			finally_statements: finally_statements.map(|statements| f.fold_scope(statements)),
		},
	};
	Stmt {
		kind,
		span: node.span,
		idx: node.idx,
	}
}

pub fn fold_class<F>(f: &mut F, node: Class) -> Class
where
	F: Fold + ?Sized,
{
	Class {
		name: f.fold_symbol(node.name),
		fields: node.fields.into_iter().map(|field| f.fold_class_field(field)).collect(),
		methods: node
			.methods
			.into_iter()
			.map(|(name, def)| (f.fold_symbol(name), f.fold_function_definition(def)))
			.collect(),
		initializer: f.fold_constructor(node.initializer),
		parent: node.parent.map(|parent| f.fold_user_defined_type(parent)),
		implements: node
			.implements
			.into_iter()
			.map(|interface| f.fold_user_defined_type(interface))
			.collect(),
		is_resource: node.is_resource,
		inflight_initializer: node.inflight_initializer.map(|init| f.fold_function_definition(init)),
	}
}

pub fn fold_class_field<F>(f: &mut F, node: ClassField) -> ClassField
where
	F: Fold + ?Sized,
{
	ClassField {
		name: f.fold_symbol(node.name),
		member_type: f.fold_type_annotation(node.member_type),
		reassignable: node.reassignable,
		phase: node.phase,
		is_static: node.is_static,
	}
}

pub fn fold_struct_field<F>(f: &mut F, node: StructField) -> StructField
where
	F: Fold + ?Sized,
{
	StructField {
		name: f.fold_symbol(node.name),
		member_type: f.fold_type_annotation(node.member_type),
	}
}

pub fn fold_interface<F>(f: &mut F, node: Interface) -> Interface
where
	F: Fold + ?Sized,
{
	Interface {
		name: f.fold_symbol(node.name),
		methods: node
			.methods
			.into_iter()
			.map(|(name, sig)| (f.fold_symbol(name), f.fold_function_signature(sig)))
			.collect(),
		extends: node
			.extends
			.into_iter()
			.map(|interface| f.fold_user_defined_type(interface))
			.collect(),
	}
}

pub fn fold_constructor<F>(f: &mut F, node: Initializer) -> Initializer
where
	F: Fold + ?Sized,
{
	Initializer {
		signature: f.fold_function_signature(node.signature),
		statements: f.fold_scope(node.statements),
		span: node.span,
	}
}

pub fn fold_expr<F>(f: &mut F, node: Expr) -> Expr
where
	F: Fold + ?Sized,
{
	let kind = match node.kind {
		ExprKind::New {
			class,
			obj_id,
			obj_scope,
			arg_list,
		} => ExprKind::New {
			class: f.fold_type_annotation(class),
			obj_id,
			obj_scope: obj_scope.map(|scope| Box::new(f.fold_expr(*scope))),
			arg_list: f.fold_args(arg_list),
		},
		ExprKind::Literal(literal) => ExprKind::Literal(f.fold_literal(literal)),
		ExprKind::Range { start, inclusive, end } => ExprKind::Range {
			start: Box::new(f.fold_expr(*start)),
			inclusive,
			end: Box::new(f.fold_expr(*end)),
		},
		ExprKind::Reference(reference) => ExprKind::Reference(f.fold_reference(reference)),
		ExprKind::Call { function, arg_list } => ExprKind::Call {
			function: Box::new(f.fold_expr(*function)),
			arg_list: f.fold_args(arg_list),
		},
		ExprKind::Unary { op, exp } => ExprKind::Unary {
			op,
			exp: Box::new(f.fold_expr(*exp)),
		},
		ExprKind::Binary { op, left, right } => ExprKind::Binary {
			op,
			left: Box::new(f.fold_expr(*left)),
			right: Box::new(f.fold_expr(*right)),
		},
		ExprKind::ArrayLiteral { type_, items } => ExprKind::ArrayLiteral {
			type_: type_.map(|t| f.fold_type_annotation(t)),
			items: items.into_iter().map(|item| f.fold_expr(item)).collect(),
		},
		ExprKind::StructLiteral { type_, fields } => ExprKind::StructLiteral {
			type_: f.fold_type_annotation(type_),
			fields: fields
				.into_iter()
				.map(|(name, field)| (f.fold_symbol(name), f.fold_expr(field)))
				.collect(),
		},
		ExprKind::MapLiteral { type_, fields } => ExprKind::MapLiteral {
			type_: type_.map(|t| f.fold_type_annotation(t)),
			fields: fields
				.into_iter()
				.map(|(key, value)| (key, f.fold_expr(value)))
				.collect(),
		},
		ExprKind::SetLiteral { type_, items } => ExprKind::SetLiteral {
			type_: type_.map(|t| f.fold_type_annotation(t)),
			items: items.into_iter().map(|item| f.fold_expr(item)).collect(),
		},
		ExprKind::JsonLiteral { is_mut, element } => ExprKind::JsonLiteral {
			is_mut,
			element: Box::new(f.fold_expr(*element)),
		},
		ExprKind::FunctionClosure(def) => ExprKind::FunctionClosure(f.fold_function_definition(def)),
	};
	Expr {
		kind,
		span: node.span,
		evaluated_type: node.evaluated_type,
	}
}

pub fn fold_literal<F>(f: &mut F, node: Literal) -> Literal
where
	F: Fold + ?Sized,
{
	match node {
		Literal::InterpolatedString(interpolated_str) => Literal::InterpolatedString(InterpolatedString {
			parts: interpolated_str
				.parts
				.into_iter()
				.map(|part| match part {
					InterpolatedStringPart::Static(s) => InterpolatedStringPart::Static(s),
					InterpolatedStringPart::Expr(e) => InterpolatedStringPart::Expr(f.fold_expr(e)),
				})
				.collect(),
		}),
		Literal::Boolean(x) => Literal::Boolean(x),
		Literal::Number(x) => Literal::Number(x),
		Literal::Duration(x) => Literal::Duration(x),
		Literal::String(x) => Literal::String(x),
	}
}

pub fn fold_reference<F>(f: &mut F, node: Reference) -> Reference
where
	F: Fold + ?Sized,
{
	match node {
		Reference::Identifier(s) => Reference::Identifier(f.fold_symbol(s)),
		Reference::InstanceMember { property, object } => Reference::InstanceMember {
			object: Box::new(f.fold_expr(*object)),
			property: f.fold_symbol(property),
		},
		Reference::TypeMember { type_, property } => Reference::TypeMember {
			type_: f.fold_user_defined_type(type_),
			property: f.fold_symbol(property),
		},
	}
}

pub fn fold_function_definition<F>(f: &mut F, node: FunctionDefinition) -> FunctionDefinition
where
	F: Fold + ?Sized,
{
	FunctionDefinition {
		body: match node.body {
			FunctionBody::Statements(scope) => FunctionBody::Statements(f.fold_scope(scope)),
			FunctionBody::External(s) => FunctionBody::External(s),
		},
		signature: f.fold_function_signature(node.signature),
		is_static: node.is_static,
		span: node.span,
		captures: node.captures,
	}
}

pub fn fold_function_signature<F>(f: &mut F, node: FunctionSignature) -> FunctionSignature
where
	F: Fold + ?Sized,
{
	FunctionSignature {
		parameters: node
			.parameters
			.into_iter()
			.map(|param| f.fold_function_parameter(param))
			.collect(),
		return_type: node.return_type.map(|type_| Box::new(f.fold_type_annotation(*type_))),
		phase: node.phase,
	}
}

pub fn fold_function_parameter<F>(f: &mut F, node: FunctionParameter) -> FunctionParameter
where
	F: Fold + ?Sized,
{
	FunctionParameter {
		name: f.fold_symbol(node.name),
		type_annotation: f.fold_type_annotation(node.type_annotation),
		reassignable: node.reassignable,
	}
}

pub fn fold_args<F>(f: &mut F, node: ArgList) -> ArgList
where
	F: Fold + ?Sized,
{
	ArgList {
		pos_args: node.pos_args.into_iter().map(|arg| f.fold_expr(arg)).collect(),
		named_args: node
			.named_args
			.into_iter()
			.map(|(name, arg)| (f.fold_symbol(name), f.fold_expr(arg)))
			.collect(),
	}
}

pub fn fold_type_annotation<F>(f: &mut F, node: TypeAnnotation) -> TypeAnnotation
where
	F: Fold + ?Sized,
{
	match node {
		TypeAnnotation::Number => TypeAnnotation::Number,
		TypeAnnotation::String => TypeAnnotation::String,
		TypeAnnotation::Bool => TypeAnnotation::Bool,
		TypeAnnotation::Duration => TypeAnnotation::Duration,
		TypeAnnotation::Json => TypeAnnotation::Json,
		TypeAnnotation::MutJson => TypeAnnotation::MutJson,
		TypeAnnotation::Optional(t) => TypeAnnotation::Optional(Box::new(f.fold_type_annotation(*t))),
		TypeAnnotation::Array(t) => TypeAnnotation::Array(Box::new(f.fold_type_annotation(*t))),
		TypeAnnotation::MutArray(t) => TypeAnnotation::MutArray(Box::new(f.fold_type_annotation(*t))),
		TypeAnnotation::Map(t) => TypeAnnotation::Map(Box::new(f.fold_type_annotation(*t))),
		TypeAnnotation::MutMap(t) => TypeAnnotation::MutMap(Box::new(f.fold_type_annotation(*t))),
		TypeAnnotation::Set(t) => TypeAnnotation::Set(Box::new(f.fold_type_annotation(*t))),
		TypeAnnotation::MutSet(t) => TypeAnnotation::MutSet(Box::new(f.fold_type_annotation(*t))),
		TypeAnnotation::Function(t) => TypeAnnotation::Function(FunctionTypeAnnotation {
			param_types: t.param_types.into_iter().map(|t| f.fold_type_annotation(t)).collect(),
			return_type: t.return_type.map(|t| Box::new(f.fold_type_annotation(*t))),
			phase: t.phase,
		}),
		TypeAnnotation::UserDefined(t) => TypeAnnotation::UserDefined(f.fold_user_defined_type(t)),
	}
}

pub fn fold_user_defined_type<F>(f: &mut F, node: UserDefinedType) -> UserDefinedType
where
	F: Fold + ?Sized,
{
	UserDefinedType {
		root: f.fold_symbol(node.root),
		fields: node.fields.into_iter().map(|s| f.fold_symbol(s)).collect(),
		span: node.span,
	}
}

pub fn fold_symbol<F>(_f: &mut F, node: Symbol) -> Symbol
where
	F: Fold + ?Sized,
{
	node
}
