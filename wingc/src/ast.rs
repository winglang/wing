use std::collections::HashMap;

use crate::type_check;

pub type FileId = usize;

pub type ByteIndex = usize;
pub type CharacterIndex = usize;

#[derive(Debug, PartialEq, Eq, Hash, Clone)]
pub struct WingSpan {
	pub start: ByteIndex,
	pub end: ByteIndex,
	pub file_id: FileId,
}

impl std::fmt::Display for WingSpan {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "({}, {})", self.start, self.end)
	}
}

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
	FunctionDefinition {
		name: Symbol,
		parameters: Vec<ParameterDefinition>,
		statements: Scope,
		return_type: Option<type_check::Type>,
	},
	ProcessDefinition {
		name: Symbol,
		parameters: Vec<ParameterDefinition>,
		statements: Scope,
	},
	ForLoop {
		iterator: Reference,
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
}
#[derive(Debug)]
pub struct ParameterDefinition {
	pub name: Symbol,
	pub parameter_type: type_check::Type,
}

#[derive(Debug)]
pub enum Expression {
	New {
		class: Reference, // TypeReference
		obj_id: Option<Symbol>,
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
		// TODO: Split to LgicalUnary, NumericUnary
		op: UnaryOperator,
		exp: Box<Expression>,
	},
	Binary {
		// TODO: Split to LgicalBinary, NumericBinary, Bit/String??
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
	object: Reference, // ObjectReference
	method: Symbol,
	args: ArgList,
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

// TODO: ObjReferene, FuncReference, MethodReference, TypeReference, CapturedObjReference, ProcReference
#[derive(Debug)]
pub struct Reference {
	//namespace: Option<Vec<String>>,
	pub namespace: Option<Symbol>,
	pub identifier: Symbol,
}
