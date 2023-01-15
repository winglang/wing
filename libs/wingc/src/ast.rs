use std::cell::RefCell;
use std::collections::{BTreeMap, HashMap};
use std::fmt::{Debug, Display};
use std::hash::{Hash, Hasher};

use derivative::Derivative;
use indexmap::IndexSet;

use crate::capture::Captures;
use crate::diagnostic::WingSpan;
use crate::type_check::symbol_env::SymbolEnv;
use crate::type_check::TypeRef;

#[derive(Debug, Eq, Clone)]
pub struct Symbol {
	pub name: String,
	pub span: WingSpan,
}

impl Ord for Symbol {
	fn cmp(&self, other: &Self) -> std::cmp::Ordering {
		self.name.cmp(&other.name).then(self.span.cmp(&other.span))
	}
}

impl PartialOrd for Symbol {
	fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
		let string_ord = self.name.partial_cmp(&other.name);
		if string_ord == Some(std::cmp::Ordering::Equal) {
			self.span.partial_cmp(&other.span)
		} else {
			string_ord
		}
	}
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
		write!(f, "{} (at {})", self.name, self.span)
	}
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Phase {
	Inflight,
	Preflight,
	Independent,
}

impl Display for Phase {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			Phase::Inflight => write!(f, "inflight"),
			Phase::Preflight => write!(f, "preflight"),
			Phase::Independent => write!(f, "independent"),
		}
	}
}

#[derive(Debug, Clone)]
pub enum Type {
	Number,
	String,
	Bool,
	Duration,
	Optional(Box<Type>),
	Array(Box<Type>),
	MutArray(Box<Type>),
	Map(Box<Type>),
	MutMap(Box<Type>),
	Set(Box<Type>),
	MutSet(Box<Type>),
	FunctionSignature(FunctionSignature),
	CustomType { root: Symbol, fields: Vec<Symbol> },
}

impl Display for Type {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			Type::Number => write!(f, "num"),
			Type::String => write!(f, "str"),
			Type::Bool => write!(f, "bool"),
			Type::Duration => write!(f, "duration"),
			Type::Optional(t) => write!(f, "{}?", t),
			Type::Array(t) => write!(f, "Array<{}>", t),
			Type::MutArray(t) => write!(f, "MutArray<{}>", t),
			Type::Map(t) => write!(f, "Map<{}>", t),
			Type::MutMap(t) => write!(f, "MutMap<{}>", t),
			Type::Set(t) => write!(f, "Set<{}>", t),
			Type::MutSet(t) => write!(f, "MutSet<{}>", t),
			Type::FunctionSignature(sig) => {
				write!(
					f,
					"fn({}): {}",
					sig
						.parameters
						.iter()
						.map(|a| format!("{}", a))
						.collect::<Vec<String>>()
						.join(", "),
					if let Some(ret_val) = &sig.return_type {
						format!("{}", ret_val)
					} else {
						"void".to_string()
					}
				)
			}
			Type::CustomType { root, fields: _ } => {
				write!(f, "{}", root)
			}
		}
	}
}

#[derive(Debug, Clone)]
pub struct FunctionSignature {
	pub parameters: Vec<Type>,
	pub return_type: Option<Box<Type>>,
	pub flight: Phase,
}

#[derive(Derivative)]
#[derivative(Debug)]
pub struct FunctionDefinition {
	pub parameter_names: Vec<Symbol>, // TODO: move into FunctionSignature and make optional
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
pub struct Stmt {
	pub kind: StmtKind,
	pub span: WingSpan,
	pub idx: usize,
}

#[derive(Debug)]
pub enum UtilityFunctions {
	Print,
	Panic,
	Throw,
	Assert,
}

impl Display for UtilityFunctions {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			UtilityFunctions::Print => write!(f, "print"),
			UtilityFunctions::Panic => write!(f, "panic"),
			UtilityFunctions::Throw => write!(f, "throw"),
			UtilityFunctions::Assert => write!(f, "assert"),
		}
	}
}

#[derive(Debug)]
pub enum StmtKind {
	Use {
		module_name: Symbol, // Reference?
		identifier: Option<Symbol>,
	},
	VariableDef {
		var_name: Symbol,
		initial_value: Expr,
		type_: Option<Type>,
	},
	ForLoop {
		iterator: Symbol,
		iterable: Expr,
		statements: Scope,
	},
	While {
		condition: Expr,
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
		methods: Vec<(Symbol, FunctionDefinition)>,
		constructor: Constructor,
		parent: Option<Type>,
		is_resource: bool,
	},
	Struct {
		name: Symbol,
		extends: Vec<Symbol>,
		members: Vec<ClassMember>,
	},
	Enum {
		name: Symbol,
		values: IndexSet<Symbol>,
	},
}

#[derive(Debug)]
pub struct ClassMember {
	pub name: Symbol,
	pub member_type: Type,
	pub flight: Phase,
}

#[derive(Debug)]
pub enum ExprKind {
	New {
		class: Type,
		obj_id: Option<String>,
		obj_scope: Option<Box<Expr>>,
		arg_list: ArgList,
	},
	Literal(Literal),
	Reference(Reference),
	Call {
		function: Reference,
		args: ArgList,
	},
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
	ArrayLiteral {
		type_: Option<Type>,
		items: Vec<Expr>,
	},
	StructLiteral {
		type_: Type,
		// We're using an ordered map implementation to guarantee deterministic compiler output. See discussion: https://github.com/winglang/wing/discussions/887.
		fields: BTreeMap<Symbol, Expr>,
	},
	MapLiteral {
		type_: Option<Type>,
		// We're using an ordered map implementation to guarantee deterministic compiler output. See discussion: https://github.com/winglang/wing/discussions/887.
		fields: BTreeMap<String, Expr>,
	},
	SetLiteral {
		type_: Option<Type>,
		items: Vec<Expr>,
	},
	FunctionClosure(FunctionDefinition),
}

#[derive(Debug)]
pub struct Expr {
	pub kind: ExprKind,
	pub evaluated_type: RefCell<Option<TypeRef>>,
	pub span: WingSpan,
}

impl Expr {
	pub fn new(kind: ExprKind, span: WingSpan) -> Self {
		Self {
			kind,
			evaluated_type: RefCell::new(None),
			span,
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
	InterpolatedString(InterpolatedString),
	Number(f64),
	Duration(f64),
	Boolean(bool),
}

#[derive(Debug)]
pub struct InterpolatedString {
	pub parts: Vec<InterpolatedStringPart>,
}

#[derive(Debug)]
pub enum InterpolatedStringPart {
	Static(String),
	Expr(Expr),
}

#[derive(Derivative)]
#[derivative(Debug)]
pub struct Scope {
	pub statements: Vec<Stmt>,
	#[derivative(Debug = "ignore")]
	pub env: RefCell<Option<SymbolEnv>>, // None after parsing, set to Some during type checking phase
}

impl Scope {
	pub fn set_env(&self, new_env: SymbolEnv) {
		let mut env = self.env.borrow_mut();
		assert!((*env).is_none());
		*env = Some(new_env);
	}
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
				let obj_str = match &object.kind {
					ExprKind::Reference(r) => format!("{}", r),
					_ => "object".to_string(), // TODO!
				};
				write!(f, "{}.{}", obj_str, property.name)
			}
		}
	}
}
