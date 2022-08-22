use std::collections::HashMap;

use crate::diagnostic::WingSpan;

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

#[derive(Debug, Clone)]
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
pub enum Expression {
	New {
		class: Symbol,
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
	CapturedObjMethodCall(MethodCall),
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

#[derive(Debug)]
pub struct Scope {
	pub statements: Vec<Statement>,
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
