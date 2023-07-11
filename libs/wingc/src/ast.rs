use std::cell::RefCell;
use std::fmt::{Debug, Display};
use std::hash::{Hash, Hasher};
use std::sync::atomic::{AtomicUsize, Ordering};

use derivative::Derivative;
use indexmap::{Equivalent, IndexMap, IndexSet};
use itertools::Itertools;

use crate::diagnostic::WingSpan;
use crate::type_check::symbol_env::SymbolEnv;
use crate::type_check::CLOSURE_CLASS_HANDLE_METHOD;

static EXPR_COUNTER: AtomicUsize = AtomicUsize::new(0);

#[derive(Debug, Eq, Clone)]
pub struct Symbol {
	pub name: String,
	pub span: WingSpan,
}

impl Symbol {
	pub fn new<S: Into<String>>(name: S, span: WingSpan) -> Self {
		Self {
			name: name.into(),
			span,
		}
	}

	pub fn global<S: Into<String>>(name: S) -> Self {
		Self {
			name: name.into(),
			span: Default::default(),
		}
	}

	/// Returns true if the symbols refer to the same name AND location in the source code.
	/// Use `eq` to compare symbols only by name.
	pub fn same(&self, other: &Self) -> bool {
		self.name == other.name && self.span == other.span
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

impl Display for Symbol {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}", self.name)
	}
}

impl Equivalent<Symbol> for str {
	fn equivalent(&self, key: &Symbol) -> bool {
		self == key.name
	}
}

impl From<&str> for Symbol {
	fn from(s: &str) -> Self {
		Symbol::global(s)
	}
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Phase {
	Inflight,
	Preflight,
	Independent,
}

impl Phase {
	/// Returns true if the current phase can call into given phase.
	/// Rules:
	/// - Independent functions can be called from any phase.
	/// - Preflight can call into preflight
	/// - Inflight can call into inflight
	///
	pub fn can_call_to(&self, to: &Phase) -> bool {
		match to {
			Phase::Independent => true,
			Phase::Inflight | Phase::Preflight => to == self,
		}
	}
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
pub struct TypeAnnotation {
	pub kind: TypeAnnotationKind,
	pub span: WingSpan,
}

#[derive(Debug, Clone)]
pub enum TypeAnnotationKind {
	Number,
	String,
	Bool,
	Duration,
	Void,
	Json,
	MutJson,
	Optional(Box<TypeAnnotation>),
	Array(Box<TypeAnnotation>),
	MutArray(Box<TypeAnnotation>),
	Map(Box<TypeAnnotation>),
	MutMap(Box<TypeAnnotation>),
	Set(Box<TypeAnnotation>),
	MutSet(Box<TypeAnnotation>),
	Function(FunctionSignature),
	UserDefined(UserDefinedType),
}

// In the future this may be an enum for type-alias, class, etc. For now its just a nested name.
// Also this root,fields thing isn't really useful, should just turn in to a Vec<Symbol>.
#[derive(Debug, Clone)]
pub struct UserDefinedType {
	pub root: Symbol,
	pub fields: Vec<Symbol>,
	pub span: WingSpan,
}

impl UserDefinedType {
	pub fn for_class(class: &Class) -> Self {
		Self {
			root: class.name.clone(),
			fields: vec![],
			span: class.name.span.clone(),
		}
	}

	pub fn full_path(&self) -> Vec<Symbol> {
		let mut path = vec![self.root.clone()];
		path.extend(self.fields.clone());
		path
	}

	pub fn full_path_str(&self) -> String {
		self.full_path().iter().join(".")
	}

	pub fn to_expression(&self) -> Expr {
		Expr::new(
			ExprKind::Reference(Reference::TypeReference(self.clone())),
			self.span.clone(),
		)
	}
}

impl Display for UserDefinedType {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		let mut name = self.root.name.clone();
		for field in &self.fields {
			name.push('.');
			name.push_str(&field.name);
		}
		write!(f, "{}", name)
	}
}

impl Display for TypeAnnotationKind {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			TypeAnnotationKind::Number => write!(f, "num"),
			TypeAnnotationKind::String => write!(f, "str"),
			TypeAnnotationKind::Bool => write!(f, "bool"),
			TypeAnnotationKind::Duration => write!(f, "duration"),
			TypeAnnotationKind::Void => write!(f, "void"),
			TypeAnnotationKind::Json => write!(f, "Json"),
			TypeAnnotationKind::MutJson => write!(f, "MutJson"),
			TypeAnnotationKind::Optional(t) => write!(f, "{}?", t),
			TypeAnnotationKind::Array(t) => write!(f, "Array<{}>", t),
			TypeAnnotationKind::MutArray(t) => write!(f, "MutArray<{}>", t),
			TypeAnnotationKind::Map(t) => write!(f, "Map<{}>", t),
			TypeAnnotationKind::MutMap(t) => write!(f, "MutMap<{}>", t),
			TypeAnnotationKind::Set(t) => write!(f, "Set<{}>", t),
			TypeAnnotationKind::MutSet(t) => write!(f, "MutSet<{}>", t),
			TypeAnnotationKind::Function(t) => write!(f, "{}", t),
			TypeAnnotationKind::UserDefined(user_defined_type) => write!(f, "{}", user_defined_type),
		}
	}
}

impl Display for TypeAnnotation {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		std::fmt::Display::fmt(&self.kind, f)
	}
}

impl Display for FunctionSignature {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		let phase_str = match self.phase {
			Phase::Inflight => "inflight ",
			Phase::Preflight => "preflight ",
			Phase::Independent => "",
		};
		let params_str = self
			.parameters
			.iter()
			.map(|a| {
				if a.name.name.is_empty() {
					format!("{}", a.type_annotation)
				} else {
					format!("{}: {}", a.name, a.type_annotation)
				}
			})
			.collect::<Vec<String>>()
			.join(", ");

		let ret_type_str = format!("{}", &self.return_type);
		write!(f, "{phase_str}({params_str}): {ret_type_str}")
	}
}

#[derive(Debug, Clone)]
pub struct FunctionSignature {
	pub parameters: Vec<FunctionParameter>,
	pub return_type: Box<TypeAnnotation>,
	pub phase: Phase,
}

impl FunctionSignature {
	pub fn to_type_annotation(&self) -> TypeAnnotation {
		TypeAnnotation {
			kind: TypeAnnotationKind::Function(self.clone()),
			// Function signatures may not necessarily have spans
			span: Default::default(),
		}
	}
}

#[derive(Debug, Clone)]
pub struct FunctionParameter {
	pub name: Symbol,
	pub type_annotation: TypeAnnotation,
	pub reassignable: bool,
}

#[derive(Debug)]
pub enum FunctionBody {
	/// The function body implemented within a Wing scope.
	Statements(Scope),
	/// The `extern` modifier value, pointing to an external implementation file
	External(String),
}

#[derive(Debug)]
pub struct FunctionDefinition {
	/// The name of the function ('None' if this is a closure).
	pub name: Option<Symbol>,
	/// The function implementation.
	pub body: FunctionBody,
	/// The function signature, including the return type.
	pub signature: FunctionSignature,
	/// Whether this function is static or not. In case of a closure, this is always true.
	pub is_static: bool,
	pub span: WingSpan,
}

#[derive(Debug)]
pub struct Stmt {
	pub kind: StmtKind,
	pub span: WingSpan,
	pub idx: usize,
}

#[derive(Debug)]
pub enum UtilityFunctions {
	Log,
	Panic,
	Throw,
	Assert,
}

impl UtilityFunctions {
	/// Returns all utility functions.
	pub fn all() -> Vec<UtilityFunctions> {
		vec![
			UtilityFunctions::Log,
			UtilityFunctions::Panic,
			UtilityFunctions::Throw,
			UtilityFunctions::Assert,
		]
	}
}

impl Display for UtilityFunctions {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			UtilityFunctions::Log => write!(f, "log"),
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
	pub initializer: FunctionDefinition,
	pub inflight_initializer: FunctionDefinition,
	pub parent: Option<Expr>, // base class (the expression is a reference to a user defined type)
	pub implements: Vec<UserDefinedType>,
	pub phase: Phase,
}

impl Class {
	/// Returns the `UserDefinedType` of the parent class, if any.
	pub fn parent_udt(&self) -> Option<&UserDefinedType> {
		let Some(expr) = &self.parent else {
			return None;
		};

		expr.as_type_reference()
	}

	/// Returns all methods, including the initializer and inflight initializer.
	pub fn all_methods(&self, include_initializers: bool) -> Vec<&FunctionDefinition> {
		let mut methods: Vec<&FunctionDefinition> = vec![];

		for (_, m) in &self.methods {
			methods.push(&m);
		}

		if include_initializers {
			methods.push(&self.initializer);
			methods.push(&self.inflight_initializer);
		}

		methods
	}

	pub fn inflight_methods(&self, include_initializers: bool) -> Vec<&FunctionDefinition> {
		self
			.all_methods(include_initializers)
			.iter()
			.filter(|m| m.signature.phase == Phase::Inflight)
			.map(|f| *f)
			.collect_vec()
	}

	pub fn inflight_fields(&self) -> Vec<&ClassField> {
		self.fields.iter().filter(|f| f.phase == Phase::Inflight).collect_vec()
	}

	/// Returns the function definition of the "handle" method of this class (if this is a closure
	/// class). Otherwise returns None.
	pub fn closure_handle_method(&self) -> Option<&FunctionDefinition> {
		for method in self.inflight_methods(false) {
			if let Some(name) = &method.name {
				if name.name == CLOSURE_CLASS_HANDLE_METHOD {
					return Some(method);
				}
			}
		}

		None
	}

	pub fn preflight_methods(&self, include_initializers: bool) -> Vec<&FunctionDefinition> {
		self
			.all_methods(include_initializers)
			.iter()
			.filter(|f| f.signature.phase != Phase::Inflight)
			.map(|f| *f)
			.collect_vec()
	}
}

#[derive(Debug)]
pub struct Interface {
	pub name: Symbol,
	pub methods: Vec<(Symbol, FunctionSignature)>,
	pub extends: Vec<UserDefinedType>,
}

#[derive(Debug)]
pub enum StmtKind {
	Bring {
		module_name: Symbol, // Reference?
		identifier: Option<Symbol>,
	},
	SuperConstructor {
		arg_list: ArgList,
	},
	Let {
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
	IfLet {
		var_name: Symbol,
		value: Expr,
		statements: Scope,
		else_statements: Option<Scope>,
	},
	If {
		condition: Expr,
		statements: Scope,
		elif_statements: Vec<ElifBlock>,
		else_statements: Option<Scope>,
	},
	Break,
	Continue,
	Return(Option<Expr>),
	Expression(Expr),
	Assignment {
		variable: Expr,
		value: Expr,
	},
	Scope(Scope),
	Class(Class),
	Interface(Interface),
	Struct {
		name: Symbol,
		extends: Vec<UserDefinedType>,
		fields: Vec<StructField>,
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
	CompilerDebugEnv,
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
	pub phase: Phase,
	pub is_static: bool,
}

#[derive(Debug)]
pub struct StructField {
	pub name: Symbol,
	pub member_type: TypeAnnotation,
}

#[derive(Debug)]
pub enum ExprKind {
	New(NewExpr),
	Literal(Literal),
	Range {
		start: Box<Expr>,
		inclusive: Option<bool>,
		end: Box<Expr>,
	},
	Reference(Reference),
	Call {
		callee: Box<Expr>,
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
		// We're using a map implementation with reliable iteration to guarantee deterministic compiler output. See discussion: https://github.com/winglang/wing/discussions/887.
		fields: IndexMap<Symbol, Expr>,
	},
	JsonMapLiteral {
		fields: IndexMap<String, Expr>,
	},
	MapLiteral {
		type_: Option<TypeAnnotation>,
		// We're using a map implementation with reliable iteration to guarantee deterministic compiler output. See discussion: https://github.com/winglang/wing/discussions/887.
		fields: IndexMap<String, Expr>,
	},
	SetLiteral {
		type_: Option<TypeAnnotation>,
		items: Vec<Expr>,
	},
	JsonLiteral {
		is_mut: bool,
		element: Box<Expr>,
	},
	FunctionClosure(FunctionDefinition),
	CompilerDebugPanic,
}

#[derive(Debug)]
pub struct Expr {
	/// An identifier that is unique among all expressions in the AST.
	pub id: usize,
	/// The kind of expression.
	pub kind: ExprKind,
	/// The span of the expression.
	pub span: WingSpan,
}

impl Expr {
	pub fn new(kind: ExprKind, span: WingSpan) -> Self {
		let id = EXPR_COUNTER.fetch_add(1, Ordering::SeqCst);

		Self { id, kind, span }
	}

	/// Returns true if the expression is a reference to a type.
	pub fn as_type_reference(&self) -> Option<&UserDefinedType> {
		match &self.kind {
			ExprKind::Reference(Reference::TypeReference(t)) => Some(t),
			_ => None,
		}
	}
}

#[derive(Debug)]
pub struct NewExpr {
	pub class: Box<Expr>, // expression must be a reference to a user defined type
	pub obj_id: Option<Box<Expr>>,
	pub obj_scope: Option<Box<Expr>>,
	pub arg_list: ArgList,
}

#[derive(Debug)]
pub struct ArgList {
	pub pos_args: Vec<Expr>,
	pub named_args: IndexMap<Symbol, Expr>,
	pub span: WingSpan,
}

impl ArgList {
	pub fn new(span: WingSpan) -> Self {
		ArgList {
			pos_args: vec![],
			named_args: IndexMap::new(),
			span,
		}
	}
}

#[derive(Debug)]
pub enum Literal {
	String(String),
	InterpolatedString(InterpolatedString),
	Number(f64),
	Boolean(bool),
	Nil,
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
	pub span: WingSpan,
	#[derivative(Debug = "ignore")]
	pub env: RefCell<Option<SymbolEnv>>, // None after parsing, set to Some during type checking phase
}

impl Scope {
	pub fn new(statements: Vec<Stmt>, span: WingSpan) -> Self {
		Self {
			statements,
			span,
			env: RefCell::new(None),
		}
	}

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
	OptionalTest,
}

#[derive(Debug)]
pub enum BinaryOperator {
	AddOrConcat,
	Sub,
	Mul,
	Div,
	FloorDiv,
	Mod,
	Power,
	Greater,
	GreaterOrEqual,
	Less,
	LessOrEqual,
	Equal,
	NotEqual,
	LogicalAnd,
	LogicalOr,
	UnwrapOr,
}

#[derive(Debug)]
pub enum Reference {
	/// A simple identifier: `x`
	Identifier(Symbol),
	/// A reference to a member nested inside some object `expression.x`
	InstanceMember {
		object: Box<Expr>,
		property: Symbol,
		optional_accessor: bool,
	},
	/// A reference to a type (e.g. `std.Json` or `MyResource` or `aws.s3.Bucket`)
	TypeReference(UserDefinedType),
	/// A reference to a member inside a type: `MyType.x` or `MyEnum.A`
	TypeMember { typeobject: Box<Expr>, property: Symbol },
}

impl Display for Reference {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match &self {
			Reference::Identifier(symb) => write!(f, "{}", symb.name),
			Reference::InstanceMember {
				object,
				property,
				optional_accessor: _,
			} => {
				let obj_str = match &object.kind {
					ExprKind::Reference(r) => format!("{}", r),
					_ => "object".to_string(), // TODO!
				};
				write!(f, "{}.{}", obj_str, property.name)
			}
			Reference::TypeReference(type_) => write!(f, "{}", type_),
			Reference::TypeMember { typeobject, property } => {
				let ExprKind::Reference(ref r) = typeobject.kind else {
					return write!(f, "<?>.{}", property.name);
				};

				write!(f, "{}.{}", r, property.name)
			}
		}
	}
}

/// Represents any type that has a span.
pub trait Spanned {
	fn span(&self) -> WingSpan;
}

impl Spanned for WingSpan {
	fn span(&self) -> WingSpan {
		self.clone()
	}
}

impl Spanned for Stmt {
	fn span(&self) -> WingSpan {
		self.span.clone()
	}
}

impl Spanned for Expr {
	fn span(&self) -> WingSpan {
		self.span.clone()
	}
}

impl Spanned for Symbol {
	fn span(&self) -> WingSpan {
		self.span.clone()
	}
}

impl Spanned for TypeAnnotation {
	fn span(&self) -> WingSpan {
		self.span.clone()
	}
}

impl Spanned for UserDefinedType {
	fn span(&self) -> WingSpan {
		self.span.clone()
	}
}

impl<T> Spanned for Box<T>
where
	T: Spanned,
{
	fn span(&self) -> WingSpan {
		(&**self).span()
	}
}
