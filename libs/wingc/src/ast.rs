use std::cell::RefCell;
use std::collections::BTreeMap;
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

impl Symbol {
	pub fn global(name: &str) -> Self {
		Self {
			name: name.to_string(),
			span: WingSpan::global(),
		}
	}
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
pub enum TypeAnnotation {
	Number,
	String,
	Bool,
	Duration,
	Optional(Box<TypeAnnotation>),
	Array(Box<TypeAnnotation>),
	MutArray(Box<TypeAnnotation>),
	Map(Box<TypeAnnotation>),
	MutMap(Box<TypeAnnotation>),
	Set(Box<TypeAnnotation>),
	MutSet(Box<TypeAnnotation>),
	FunctionSignature(FunctionSignature),
	UserDefined(UserDefinedType),
}

// In the future this may be an enum for type-alias, class, etc. For now its just a nested name.
// Also this root,fields thing isn't really useful, should just turn in to a Vec<Symbol>.
#[derive(Debug, Clone)]
pub struct UserDefinedType {
	pub root: Symbol,
	pub fields: Vec<Symbol>,
}

impl Display for TypeAnnotation {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			TypeAnnotation::Number => write!(f, "num"),
			TypeAnnotation::String => write!(f, "str"),
			TypeAnnotation::Bool => write!(f, "bool"),
			TypeAnnotation::Duration => write!(f, "duration"),
			TypeAnnotation::Optional(t) => write!(f, "{}?", t),
			TypeAnnotation::Array(t) => write!(f, "Array<{}>", t),
			TypeAnnotation::MutArray(t) => write!(f, "MutArray<{}>", t),
			TypeAnnotation::Map(t) => write!(f, "Map<{}>", t),
			TypeAnnotation::MutMap(t) => write!(f, "MutMap<{}>", t),
			TypeAnnotation::Set(t) => write!(f, "Set<{}>", t),
			TypeAnnotation::MutSet(t) => write!(f, "MutSet<{}>", t),
			TypeAnnotation::FunctionSignature(sig) => write!(f, "{}", sig),
			TypeAnnotation::UserDefined(user_defined_type) => {
				write!(f, "{}", user_defined_type.root.name)
			}
		}
	}
}

impl Display for FunctionSignature {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		let phase_str = match self.flight {
			Phase::Inflight => "inflight ",
			Phase::Preflight => "preflight ",
			Phase::Independent => "",
		};
		let params_str = self
			.parameters
			.iter()
			.map(|a| format!("{}", a))
			.collect::<Vec<String>>()
			.join(", ");
		let ret_type_str = if let Some(ret_val) = &self.return_type {
			format!("{}", ret_val)
		} else {
			"void".to_string()
		};
		write!(f, "{phase_str}({params_str}): {ret_type_str}")
	}
}

#[derive(Debug, Clone)]
pub struct FunctionSignature {
	pub parameters: Vec<TypeAnnotation>,
	pub return_type: Option<Box<TypeAnnotation>>,
	pub flight: Phase,
}

#[derive(Derivative)]
#[derivative(Debug)]
pub struct FunctionDefinition {
	/// List of names of function parameters and whether they are reassignable (`var`) or not.
	pub parameters: Vec<(Symbol, bool)>, // TODO: move into FunctionSignature and make optional

	pub statements: Scope,
	pub signature: FunctionSignature,
	#[derivative(Debug = "ignore")]
	pub captures: RefCell<Option<Captures>>,
}

#[derive(Debug)]
pub struct Constructor {
	/// List of names of constructor parameters and whether they are reassignable (`var`) or not.
	pub parameters: Vec<(Symbol, bool)>,

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
pub struct ElifBlock {
	pub condition: Expr,
	pub statements: Scope,
}

#[derive(Debug)]
pub struct Class {
	pub name: Symbol,
	pub fields: Vec<ClassField>,
	pub methods: Vec<(Symbol, FunctionDefinition)>,
	pub constructor: Constructor,
	pub parent: Option<UserDefinedType>,
	pub is_resource: bool,
}

#[derive(Debug)]
pub enum StmtKind {
	Bring {
		module_name: Symbol, // Reference?
		identifier: Option<Symbol>,
	},
	VariableDef {
		reassignable: bool,
		var_name: Symbol,
		initial_value: Expr,
		type_: Option<TypeAnnotation>,
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
		elif_statements: Vec<ElifBlock>,
		else_statements: Option<Scope>,
	},
	Expression(Expr),
	Assignment {
		variable: Reference,
		value: Expr,
	},
	Return(Option<Expr>),
	Scope(Scope),
	Class(Class),
	Struct {
		name: Symbol,
		extends: Vec<Symbol>,
		members: Vec<ClassField>,
	},
	Enum {
		name: Symbol,
		values: IndexSet<Symbol>,
	},
	TryCatch {
		try_statements: Scope,
		catch_block: Option<CatchBlock>,
		finally_statements: Option<Scope>,
	},
}

#[derive(Debug)]
pub struct CatchBlock {
	pub statements: Scope,
	pub exception_var: Option<Symbol>,
}

#[derive(Debug)]
pub struct ClassField {
	pub name: Symbol,
	pub member_type: TypeAnnotation,
	pub reassignable: bool,
	pub flight: Phase,
}

#[derive(Debug)]
pub enum ExprKind {
	New {
		class: TypeAnnotation,
		obj_id: Option<String>,
		obj_scope: Option<Box<Expr>>,
		arg_list: ArgList,
	},
	Literal(Literal),
	Reference(Reference),
	Call {
		function: Box<Expr>,
		arg_list: ArgList,
	},
	Unary {
		// TODO: Split to LogicalUnary, NumericUnary
		op: UnaryOperator,
		exp: Box<Expr>,
	},
	Binary {
		// TODO: Split to LogicalBinary, NumericBinary, Bit/String??
		op: BinaryOperator,
		left: Box<Expr>,
		right: Box<Expr>,
	},
	ArrayLiteral {
		type_: Option<TypeAnnotation>,
		items: Vec<Expr>,
	},
	StructLiteral {
		type_: TypeAnnotation,
		// We're using an ordered map implementation to guarantee deterministic compiler output. See discussion: https://github.com/winglang/wing/discussions/887.
		fields: BTreeMap<Symbol, Expr>,
	},
	MapLiteral {
		type_: Option<TypeAnnotation>,
		// We're using an ordered map implementation to guarantee deterministic compiler output. See discussion: https://github.com/winglang/wing/discussions/887.
		fields: BTreeMap<String, Expr>,
	},
	SetLiteral {
		type_: Option<TypeAnnotation>,
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
	pub named_args: BTreeMap<Symbol, Expr>,
}

impl ArgList {
	pub fn new() -> Self {
		ArgList {
			pos_args: vec![],
			named_args: BTreeMap::new(),
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
