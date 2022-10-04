use std::cell::RefCell;
use std::collections::HashMap;
use std::fmt::{Debug, Display};
use std::hash::{Hash, Hasher};

use derivative::Derivative;

use crate::capture::Captures;
use crate::diagnostic::WingSpan;
use crate::type_check::type_env::TypeEnv;
use crate::type_check::TypeRef;

#[derive(Debug, Eq, Clone)]
pub struct Symbol {
	pub name: String,
	pub span: WingSpan,
}

impl Hash for Symbol {
	fn hash<H: Hasher>(&self, state: &mut H) {
		self.name.hash(state);
	}
}

impl PartialEq for Symbol {
	fn eq(&self, other: &Self) -> bool {
		self.name == other.name
	}
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
	CustomType { root: Symbol, fields: Vec<Symbol> },
}

#[derive(Debug, Clone)]
pub struct FunctionSignature {
	pub parameters: Vec<Type>,
	pub return_type: Option<Box<Type>>,
	pub flight: Flight,
}

#[derive(Derivative)]
#[derivative(Debug)]
pub struct FunctionDefinition {
	pub name: Symbol,
	pub parameters: Vec<Symbol>,
	pub statements: Scope,
	pub signature: FunctionSignature,
	#[derivative(Debug = "ignore")]
	pub captures: RefCell<Option<Captures>>,
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
		initial_value: Expr,
		type_: Option<Type>,
	},
	FunctionDefinition(FunctionDefinition),
	ForLoop {
		iterator: Symbol,
		iterable: Expr,
		statements: Scope,
	},
	If {
		condition: Expr,
		statements: Scope,
		else_statements: Option<Scope>,
	},
	Expression(Expr),
	Assignment {
		variable: Reference,
		value: Expr,
	},
	Return(Option<Expr>),
	Scope(Scope),
	Class {
		name: Symbol,
		members: Vec<ClassMember>,
		methods: Vec<FunctionDefinition>,
		constructor: Constructor,
		parent: Option<Symbol>,
		is_resource: bool,
	},
	Struct {
		name: Symbol,
		extends: Vec<Symbol>,
		members: Vec<ClassMember>,
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
pub enum ExprType {
	New {
		class: Type,
		obj_id: Option<Symbol>,
		obj_scope: Option<Box<Expr>>,
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
		exp: Box<Expr>,
	},
	Binary {
		// TODO: Split to LogicalBinary, NumericBinary, Bit/String??
		op: BinaryOperator,
		lexp: Box<Expr>,
		rexp: Box<Expr>,
	},
}

#[derive(Debug)]
pub struct Expr {
	pub variant: ExprType,
	pub evaluated_type: RefCell<Option<TypeRef>>,
}

impl Expr {
	pub fn new(expression_variant: ExprType) -> Self {
		Self {
			variant: expression_variant,
			evaluated_type: RefCell::new(None),
		}
	}
}

#[derive(Debug)]
pub struct ArgList {
	pub pos_args: Vec<Expr>,
	pub named_args: HashMap<Symbol, Expr>,
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

#[derive(Derivative)]
#[derivative(Debug)]
pub struct Scope {
	pub statements: Vec<Statement>,
	#[derivative(Debug = "ignore")]
	pub env: Option<TypeEnv>, // None after parsing, set to Some during type checking phase
}

impl Scope {
	pub fn set_env(&mut self, env: TypeEnv) {
		assert!(self.env.is_none());
		self.env = Some(env);
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
	NestedIdentifier { object: Box<Expr>, property: Symbol },
}

impl Display for Reference {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match &self {
			Reference::Identifier(symb) => write!(f, "{}", symb.name),
			Reference::NestedIdentifier { object, property } => {
				let obj_str = match &object.variant {
					ExprType::Reference(r) => format!("{}", r),
					_ => "object".to_string(), // TODO!
				};
				write!(f, "{}.{}", obj_str, property.name)
			}
		}
	}
}
