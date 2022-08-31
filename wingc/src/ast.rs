use std::cell::RefCell;
use std::collections::HashMap;
use std::fmt::{Debug, Display};

use crate::diagnostic::WingSpan;
use crate::type_check::TypeRef;
use crate::type_env::TypeEnv;

#[derive(Debug, PartialEq, Eq, Hash, Clone)]
pub struct Symbol {
	pub name: String,
	pub span: WingSpan,
}

impl std::fmt::Display for Symbol {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{} {}", self.name, self.span)
	}
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Flight {
	In,
	Pre,
}

#[derive(Debug, Clone)]
pub enum Type {
	Number,
	String,
	Bool,
	Duration,
	FunctionSignature(FunctionSignature),
	Class(Symbol),
}

#[derive(Debug, Clone)]
pub struct FunctionSignature {
	pub parameters: Vec<Type>,
	pub return_type: Option<Box<Type>>,
	pub flight: Flight,
}

#[derive(Debug)]
pub struct FunctionDefinition {
	pub name: Symbol,
	pub parameters: Vec<Symbol>,
	pub statements: Scope,
	pub signature: FunctionSignature,
}

#[derive(Debug)]
pub struct Constructor {
	pub parameters: Vec<Symbol>,
	pub statements: Scope,
	pub signature: FunctionSignature,
}

#[derive(Debug)]
pub enum Statement {
	Use {
		module_name: Symbol, // Reference?
		identifier: Option<Symbol>,
	},
	VariableDef {
		var_name: Symbol,
		initial_value: Expression,
	},
	FunctionDefinition(FunctionDefinition),
	ForLoop {
		iterator: Symbol,
		iterable: Expression,
		statements: Scope,
	},
	If {
		condition: Expression,
		statements: Scope,
		else_statements: Option<Scope>,
	},
	Expression(Expression),
	Assignment {
		variable: Reference,
		value: Expression,
	},
	Return(Option<Expression>),
	Scope(Scope),
	Class {
		name: Symbol,
		members: Vec<ClassMember>,
		methods: Vec<FunctionDefinition>,
		constructor: Constructor,
		parent: Option<Symbol>,
		is_resource: bool,
	},
}

#[derive(Debug)]
pub struct ParameterDefinition {
	pub name: Symbol,
	pub parameter_type: Type,
}

#[derive(Debug)]
pub struct ClassMember {
	pub name: Symbol,
	pub member_type: Type,
	pub flight: Flight,
}

#[derive(Debug)]
pub enum ExpressionType {
	New {
		class: Reference,
		obj_id: Option<Symbol>,
		obj_scope: Option<Box<Expression>>,
		arg_list: ArgList,
	},
	Literal(Literal),
	Reference(Reference),
	FunctionCall {
		function: Reference,
		args: ArgList,
	},
	MethodCall(MethodCall),
	Unary {
		// TODO: Split to LogicalUnary, NumericUnary
		op: UnaryOperator,
		exp: Box<Expression>,
	},
	Binary {
		// TODO: Split to LogicalBinary, NumericBinary, Bit/String??
		op: BinaryOperator,
		lexp: Box<Expression>,
		rexp: Box<Expression>,
	},
}

#[derive(Debug)]
pub struct Expression {
	pub expression_variant: ExpressionType,
	pub evaluated_type: RefCell<Option<TypeRef>>,
}

impl Expression {
	pub fn new(expression_variant: ExpressionType) -> Self {
		Self {
			expression_variant,
			evaluated_type: RefCell::new(None),
		}
	}
}

#[derive(Debug)]
pub struct ArgList {
	pub pos_args: Vec<Expression>,
	pub named_args: HashMap<Symbol, Expression>,
}

impl ArgList {
	pub fn new() -> Self {
		ArgList {
			pos_args: vec![],
			named_args: HashMap::new(),
		}
	}
}

#[derive(Debug)]
pub enum Literal {
	String(String),
	Number(f64),
	Duration(f64),
	Boolean(bool),
}

pub struct Scope {
	pub statements: Vec<Statement>,
	pub env: Option<TypeEnv>, // None after parsing, set to Some during type checking phase
}

impl Scope {
	pub fn set_env(&mut self, env: TypeEnv) {
		assert!(self.env.is_none());
		self.env = Some(env);
	}
}

impl Debug for Scope {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		// Ignore env when debug printing scope
		f.debug_struct("Scope").field("statements", &self.statements).finish()
	}
}

#[derive(Debug)]
pub struct MethodCall {
	pub method: Reference,
	pub args: ArgList,
}
#[derive(Debug)]
pub enum UnaryOperator {
	Plus,
	Minus,
	Not,
}

#[derive(Debug)]
pub enum BinaryOperator {
	Add,
	Sub,
	Mul,
	Div,
	Mod,
	Greater,
	GreaterOrEqual,
	Less,
	LessOrEqual,
	Equal,
	NotEqual,
	LogicalAnd,
	LogicalOr,
}

impl BinaryOperator {
	pub fn boolean_result(&self) -> bool {
		use BinaryOperator::*;
		match self {
			Greater | GreaterOrEqual | Less | LessOrEqual | Equal | NotEqual | LogicalAnd | LogicalOr => true,
			_ => false,
		}
	}

	pub fn boolean_args(&self) -> bool {
		use BinaryOperator::*;
		match self {
			LogicalAnd | LogicalOr => true,
			_ => false,
		}
	}

	pub fn numerical_args(&self) -> bool {
		use BinaryOperator::*;
		match self {
			Add | Sub | Mul | Div | Mod | Greater | GreaterOrEqual | Less | LessOrEqual => true,
			_ => false,
		}
	}
}

#[derive(Debug)]
pub enum Reference {
	Identifier(Symbol),
	NestedIdentifier { object: Box<Expression>, property: Symbol },
	NamespacedIdentifier { namespace: Symbol, identifier: Symbol },
}

impl Display for Reference {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match &self {
			Reference::Identifier(symb) => write!(f, "{}", symb.name),
			Reference::NestedIdentifier { object, property } => {
				let obj_str = match &object.expression_variant {
					ExpressionType::Reference(r) => format!("{}", r),
					_ => "object".to_string(), // TODO!
				};
				write!(f, "{}.{}", obj_str, property.name)
			}
			Reference::NamespacedIdentifier { namespace, identifier } => {
				write!(f, "{}::{}", namespace.name, identifier.name)
			}
		}
	}
}
