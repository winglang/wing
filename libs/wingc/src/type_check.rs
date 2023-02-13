mod fqn;
mod jsii_importer;
pub mod symbol_env;
use crate::ast::{
	Class as AstClass, Expr, ExprKind, InterpolatedStringPart, Literal, Phase, Reference, Scope, Stmt, StmtKind, Symbol,
	TypeAnnotation, UnaryOperator, UserDefinedType,
};
use crate::diagnostic::{Diagnostic, DiagnosticLevel, Diagnostics, TypeError, WingSpan};
use crate::{
	debug, WINGSDK_ARRAY, WINGSDK_ASSEMBLY_NAME, WINGSDK_CLOUD_MODULE, WINGSDK_DURATION, WINGSDK_FS_MODULE, WINGSDK_MAP,
	WINGSDK_MUT_ARRAY, WINGSDK_MUT_MAP, WINGSDK_MUT_SET, WINGSDK_SET, WINGSDK_STD_MODULE, WINGSDK_STRING,
};
use derivative::Derivative;
use indexmap::IndexSet;
use itertools::Itertools;
use jsii_importer::JsiiImporter;
use std::cell::RefCell;
use std::collections::HashMap;
use std::fmt::{Debug, Display};
use std::path::Path;
use symbol_env::SymbolEnv;

use self::symbol_env::StatementIdx;

pub struct UnsafeRef<T>(*const T);
impl<T> Clone for UnsafeRef<T> {
	fn clone(&self) -> Self {
		Self(self.0)
	}
}

impl<T> Copy for UnsafeRef<T> {}

impl<T> std::ops::Deref for UnsafeRef<T> {
	type Target = T;
	fn deref(&self) -> &Self::Target {
		unsafe { &*self.0 }
	}
}

impl<T> std::ops::DerefMut for UnsafeRef<T> {
	fn deref_mut(&mut self) -> &mut Self::Target {
		unsafe { &mut *(self.0 as *mut T) }
	}
}

impl<T> Display for UnsafeRef<T>
where
	T: Display,
{
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		let t: &T = self;
		write!(f, "{}", t)
	}
}

pub type TypeRef = UnsafeRef<Type>;

#[derive(Debug)]
pub enum SymbolKind {
	Type(TypeRef),
	Variable(VariableInfo),
	Namespace(NamespaceRef),
}

/// Information about a variable in the environment
#[derive(Debug, Clone)]
pub struct VariableInfo {
	/// Type of the variable
	pub _type: TypeRef,
	/// Can the variable be reassigned?
	pub reassignable: bool,
	/// The phase in which this variable exists
	pub flight: Phase,
}

impl SymbolKind {
	pub fn make_variable(_type: TypeRef, reassignable: bool, flight: Phase) -> Self {
		SymbolKind::Variable(VariableInfo {
			_type,
			reassignable,
			flight,
		})
	}

	pub fn as_variable(&self) -> Option<VariableInfo> {
		match &self {
			SymbolKind::Variable(t) => Some(t.clone()),
			_ => None,
		}
	}

	pub fn is_reassignable(&self) -> bool {
		match self {
			SymbolKind::Variable(VariableInfo { reassignable: true, .. }) => true,
			_ => false,
		}
	}

	fn as_namespace_ref(&self) -> Option<NamespaceRef> {
		match self {
			SymbolKind::Namespace(ns) => Some(ns.clone()),
			_ => None,
		}
	}

	fn as_namespace(&self) -> Option<&Namespace> {
		match self {
			SymbolKind::Namespace(ns) => Some(ns),
			_ => None,
		}
	}

	fn as_mut_namespace_ref(&mut self) -> Option<&mut Namespace> {
		match self {
			SymbolKind::Namespace(ref mut ns) => Some(ns),
			_ => None,
		}
	}

	pub fn as_type(&self) -> Option<TypeRef> {
		match &self {
			SymbolKind::Type(t) => Some(t.clone()),
			_ => None,
		}
	}
}

#[derive(Debug)]
pub enum Type {
	Anything,
	Number,
	String,
	Duration,
	Boolean,
	Void,
	Optional(TypeRef),
	Array(TypeRef),
	MutArray(TypeRef),
	Map(TypeRef),
	MutMap(TypeRef),
	Set(TypeRef),
	MutSet(TypeRef),
	Function(FunctionSignature),
	Class(Class),
	Resource(Class),
	Struct(Struct),
	Enum(Enum),
}

const WING_CONSTRUCTOR_NAME: &'static str = "init";

#[derive(Derivative)]
#[derivative(Debug)]
pub struct Namespace {
	pub name: String,

	// When `true` this namespace contains symbols that can't be explicitly accessed from the code.
	// While the internals of imported modules might still need these symbols (and types) to be
	// available to them.
	pub hidden: bool,

	#[derivative(Debug = "ignore")]
	pub env: SymbolEnv,
}

pub type NamespaceRef = UnsafeRef<Namespace>;

impl Debug for NamespaceRef {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{:?}", &**self)
	}
}

// TODO See TypeRef for why this is necessary
unsafe impl Send for SymbolKind {}

#[derive(Derivative)]
#[derivative(Debug)]
pub struct Class {
	pub name: Symbol,
	parent: Option<TypeRef>, // Must be a Type::Class type
	#[derivative(Debug = "ignore")]
	pub env: SymbolEnv,
	pub should_case_convert_jsii: bool,
	pub type_parameters: Option<Vec<TypeRef>>,
}

impl Class {
	pub fn methods(&self, with_ancestry: bool) -> impl Iterator<Item = (String, TypeRef)> + '_ {
		self
			.env
			.iter(with_ancestry)
			.filter(|(_, t, _)| t.as_variable().unwrap()._type.as_function_sig().is_some())
			.map(|(s, t, _)| (s.clone(), t.as_variable().unwrap()._type.clone()))
	}
}

#[derive(Derivative)]
#[derivative(Debug)]
pub struct Struct {
	pub name: Symbol,
	extends: Vec<TypeRef>, // Must be a Type::Struct type
	#[derivative(Debug = "ignore")]
	pub env: SymbolEnv,
}

#[derive(Debug)]
pub struct Enum {
	pub name: Symbol,
	pub values: IndexSet<Symbol>,
}

#[derive(Debug)]
pub struct EnumInstance {
	pub enum_name: TypeRef,
	pub enum_value: Symbol,
}

trait Subtype {
	/// Returns true if `self` is a subtype of `other`.
	///
	/// For example, `str` is a subtype of `str`, `str` is a subtype of
	/// `anything`, `str` is a subtype of `Json`, `str` is not a subtype of
	/// `num`, and `str` is not a subtype of `void`.
	///
	/// Subtype is a partial order, so if a.is_subtype_of(b) is false, it does
	/// not imply that b.is_subtype_of(a) is true. It is also reflexive, so
	/// a.is_subtype_of(a) is always true.
	fn is_subtype_of(&self, other: &Self) -> bool;

	fn is_same_type_as(&self, other: &Self) -> bool {
		self.is_subtype_of(other) && other.is_subtype_of(self)
	}

	fn is_strict_subtype_of(&self, other: &Self) -> bool {
		self.is_subtype_of(other) && !other.is_subtype_of(self)
	}
}

impl Subtype for Type {
	fn is_subtype_of(&self, other: &Self) -> bool {
		// If references are the same this is the same type, if not then compare content
		if std::ptr::eq(self, other) {
			return true;
		}
		match (self, other) {
			(Self::Anything, _) | (_, Self::Anything) => {
				// TODO: Hack to make anything's compatible with all other types, specifically useful for handling core.Inflight handlers
				true
			}
			(Self::Function(l0), Self::Function(r0)) => l0 == r0,
			(Self::Class(l0), Self::Class(_)) => {
				// If we extend from `other` than I'm a subtype of it (inheritance)
				if let Some(parent) = l0.parent.as_ref() {
					let parent_type: &Type = &*parent;
					return parent_type.is_subtype_of(other);
				}
				false
			}
			(Self::Resource(l0), Self::Resource(_)) => {
				// If we extend from `other` than I'm a subtype of it (inheritance)
				if let Some(parent) = l0.parent.as_ref() {
					let parent_type: &Type = &*parent;
					return parent_type.is_subtype_of(other);
				}
				false
			}
			(Self::Struct(l0), Self::Struct(_)) => {
				// If we extend from `other` then I'm a subtype of it (inheritance)
				for parent in l0.extends.iter() {
					let parent_type: &Type = &*parent;
					if parent_type.is_subtype_of(other) {
						return true;
					}
				}
				false
			}
			(Self::Array(l0), Self::Array(r0)) => {
				// An Array type is a subtype of another Array type if the value type is a subtype of the other value type
				let l: &Type = &*l0;
				let r: &Type = &*r0;
				l.is_subtype_of(r)
			}
			(Self::MutArray(l0), Self::MutArray(r0)) => {
				// An Array type is a subtype of another Array type if the value type is a subtype of the other value type
				let l: &Type = &*l0;
				let r: &Type = &*r0;
				l.is_subtype_of(r)
			}
			(Self::Map(l0), Self::Map(r0)) => {
				// A Map type is a subtype of another Map type if the value type is a subtype of the other value type
				let l: &Type = &*l0;
				let r: &Type = &*r0;
				l.is_subtype_of(r)
			}
			(Self::MutMap(l0), Self::MutMap(r0)) => {
				// A Map type is a subtype of another Map type if the value type is a subtype of the other value type
				let l: &Type = &*l0;
				let r: &Type = &*r0;
				l.is_subtype_of(r)
			}
			(Self::Set(l0), Self::Set(r0)) => {
				// A Set type is a subtype of another Set type if the value type is a subtype of the other value type
				let l: &Type = &*l0;
				let r: &Type = &*r0;
				l.is_subtype_of(r)
			}
			(Self::MutSet(l0), Self::MutSet(r0)) => {
				// A Set type is a subtype of another Set type if the value type is a subtype of the other value type
				let l: &Type = &*l0;
				let r: &Type = &*r0;
				l.is_subtype_of(r)
			}
			(Self::Enum(e0), Self::Enum(e1)) => {
				// An enum type is a subtype of another Enum type only if they are the exact same
				e0.name == e1.name
			}
			(Self::Optional(l0), Self::Optional(r0)) => {
				// An Optional type is a subtype of another Optional type if the value type is a subtype of the other value type
				let l: &Type = &*l0;
				let r: &Type = &*r0;
				l.is_subtype_of(r)
			}
			(_, Self::Optional(r0)) => {
				// A non-Optional type is a subtype of an Optional type if the non-optional's type is a subtype of the value type
				// e.g. `String` is a subtype of `Optional<String>`
				let r: &Type = &*r0;
				self.is_subtype_of(r)
			}
			(Self::Number, Self::Number) => true,
			(Self::String, Self::String) => true,
			(Self::Boolean, Self::Boolean) => true,
			(Self::Duration, Self::Duration) => true,
			(Self::Void, Self::Void) => true,
			_ => false,
		}
	}
}

#[derive(Debug)]
pub struct FunctionSignature {
	pub parameters: Vec<TypeRef>,
	pub return_type: TypeRef,
	pub flight: Phase,

	/// During jsify, calls to this function will be replaced with this string
	/// In JSII imports, this is denoted by the `@macro` attribute
	/// This string may contain special tokens:
	/// - `$self$`: The expression on which this function was called
	/// - `$args$`: the arguments passed to this function call
	pub js_override: Option<String>,
}

impl PartialEq for FunctionSignature {
	fn eq(&self, other: &Self) -> bool {
		self
			.parameters
			.iter()
			.zip(other.parameters.iter())
			.all(|(x, y)| x.is_same_type_as(y))
			&& self.return_type.is_same_type_as(&other.return_type)
			&& self.flight == other.flight
	}
}

impl Display for SymbolKind {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			SymbolKind::Type(_) => write!(f, "type"),
			SymbolKind::Variable(_) => write!(f, "variable"),
			SymbolKind::Namespace(_) => write!(f, "namespace"),
		}
	}
}

impl Display for Type {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			Type::Anything => write!(f, "any"),
			Type::Number => write!(f, "num"),
			Type::String => write!(f, "str"),
			Type::Duration => write!(f, "duration"),
			Type::Boolean => write!(f, "bool"),
			Type::Void => write!(f, "void"),
			Type::Optional(v) => write!(f, "{}?", v),
			Type::Function(sig) => write!(f, "{}", sig),
			Type::Class(class) => write!(f, "{}", class.name),
			Type::Resource(class) => write!(f, "{}", class.name),
			Type::Struct(s) => write!(f, "{}", s.name),
			Type::Array(v) => write!(f, "Array<{}>", v),
			Type::MutArray(v) => write!(f, "MutArray<{}>", v),
			Type::Map(v) => write!(f, "Map<{}>", v),
			Type::MutMap(v) => write!(f, "MutMap<{}>", v),
			Type::Set(v) => write!(f, "Set<{}>", v),
			Type::MutSet(v) => write!(f, "MutSet<{}>", v),
			Type::Enum(s) => write!(f, "{}", s.name),
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
		let ret_type_str = self.return_type.to_string();
		write!(f, "{phase_str}({params_str}): {ret_type_str}")
	}
}

// TODO Allows for use in async runtime
// TODO either avoid shared memory or use Arc<Mutex<...>> instead
unsafe impl Send for TypeRef {}

impl TypeRef {
	pub fn as_resource(&self) -> Option<&Class> {
		if let Type::Resource(ref res) = **self {
			Some(res)
		} else {
			None
		}
	}

	pub fn as_class_or_resource(&self) -> Option<&Class> {
		self.as_class().or_else(|| self.as_resource())
	}

	pub fn as_mut_class_or_resource(&mut self) -> Option<&mut Class> {
		match **self {
			Type::Class(ref mut class) => Some(class),
			Type::Resource(ref mut class) => Some(class),
			_ => None,
		}
	}

	fn as_class(&self) -> Option<&Class> {
		if let Type::Class(ref class) = **self {
			Some(class)
		} else {
			None
		}
	}

	fn as_struct(&self) -> Option<&Struct> {
		if let Type::Struct(ref s) = **self {
			Some(s)
		} else {
			None
		}
	}

	fn maybe_unwrap_option(&self) -> TypeRef {
		if let Type::Optional(ref t) = **self {
			*t
		} else {
			*self
		}
	}

	pub fn as_function_sig(&self) -> Option<&FunctionSignature> {
		if let Type::Function(ref sig) = **self {
			Some(sig)
		} else {
			None
		}
	}

	pub fn is_anything(&self) -> bool {
		if let Type::Anything = **self {
			true
		} else {
			false
		}
	}

	pub fn is_void(&self) -> bool {
		if let Type::Void = **self {
			true
		} else {
			false
		}
	}

	pub fn is_option(&self) -> bool {
		if let Type::Optional(_) = **self {
			true
		} else {
			false
		}
	}

	pub fn is_immutable_collection(&self) -> bool {
		if let Type::Array(_) | Type::Map(_) | Type::Set(_) = **self {
			true
		} else {
			false
		}
	}

	pub fn is_mutable_collection(&self) -> bool {
		if let Type::MutArray(_) | Type::MutSet(_) = **self {
			true
		} else {
			false
		}
	}

	pub fn is_primitive(&self) -> bool {
		if let Type::Number | Type::String | Type::Duration | Type::Boolean = **self {
			true
		} else {
			false
		}
	}
}

impl Subtype for TypeRef {
	fn is_subtype_of(&self, other: &Self) -> bool {
		// Types are equal if they point to the same type definition
		if self.0 == other.0 {
			true
		} else {
			// If the self and other aren't the the same, we need to use the specific types equality function
			let t1: &Type = &**self;
			let t2: &Type = &**other;
			t1.is_subtype_of(t2)
		}
	}
}

impl Debug for TypeRef {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}", &**self)
	}
}

pub struct Types {
	// TODO: Remove the box and change TypeRef and NamespaceRef to just be indices into the types array and namespaces array respectively
	// Note: we need the box so reallocations of the vec while growing won't change the addresses of the types since they are referenced from the TypeRef struct
	types: Vec<Box<Type>>,
	namespaces: Vec<Box<Namespace>>,
	pub libraries: SymbolEnv,
	numeric_idx: usize,
	string_idx: usize,
	bool_idx: usize,
	duration_idx: usize,
	anything_idx: usize,
	void_idx: usize,
}

impl Types {
	pub fn new() -> Self {
		let mut types = vec![];
		types.push(Box::new(Type::Number));
		let numeric_idx = types.len() - 1;
		types.push(Box::new(Type::String));
		let string_idx = types.len() - 1;
		types.push(Box::new(Type::Boolean));
		let bool_idx = types.len() - 1;
		types.push(Box::new(Type::Duration));
		let duration_idx = types.len() - 1;
		types.push(Box::new(Type::Anything));
		let anything_idx = types.len() - 1;
		types.push(Box::new(Type::Void));
		let void_idx = types.len() - 1;

		// TODO: this is hack to create the top-level mapping from lib names to symbols
		// We construct a void ref by hand since we can't call self.void() while constructing the Types struct
		let void_ref = UnsafeRef::<Type>(&*types[void_idx] as *const Type);
		let libraries = SymbolEnv::new(None, void_ref, false, false, Phase::Preflight, 0);

		Self {
			types,
			namespaces: Vec::new(),
			libraries,
			numeric_idx,
			string_idx,
			bool_idx,
			duration_idx,
			anything_idx,
			void_idx,
		}
	}

	pub fn number(&self) -> TypeRef {
		self.get_typeref(self.numeric_idx)
	}

	pub fn string(&self) -> TypeRef {
		self.get_typeref(self.string_idx)
	}

	pub fn bool(&self) -> TypeRef {
		self.get_typeref(self.bool_idx)
	}

	pub fn duration(&self) -> TypeRef {
		self.get_typeref(self.duration_idx)
	}

	pub fn anything(&self) -> TypeRef {
		self.get_typeref(self.anything_idx)
	}

	pub fn void(&self) -> TypeRef {
		self.get_typeref(self.void_idx)
	}

	pub fn add_type(&mut self, t: Type) -> TypeRef {
		self.types.push(Box::new(t));
		self.get_typeref(self.types.len() - 1)
	}

	fn get_typeref(&self, idx: usize) -> TypeRef {
		let t = &self.types[idx];
		UnsafeRef::<Type>(&**t as *const Type)
	}

	pub fn stringables(&self) -> Vec<TypeRef> {
		// TODO: This should be more complex and return all types that have some stringification facility
		// see: https://github.com/winglang/wing/issues/741
		vec![self.string(), self.number()]
	}

	pub fn add_namespace(&mut self, n: Namespace) -> NamespaceRef {
		self.namespaces.push(Box::new(n));
		self.get_namespaceref(self.namespaces.len() - 1)
	}

	fn get_namespaceref(&self, idx: usize) -> NamespaceRef {
		let t = &self.namespaces[idx];
		UnsafeRef::<Namespace>(&**t as *const Namespace)
	}
}

pub struct TypeChecker<'a> {
	types: &'a mut Types,

	/// Scratchpad for storing inner scopes so we can do breadth first traversal of the AST tree during type checking
	///
	/// TODO: this is a list of unsafe pointers to the statement's inner scopes. We use
	/// unsafe because we can't return a mutable reference to the inner scopes since this method
	/// already uses references to the statement that contains the scopes. Using unsafe here just
	/// makes it a lot simpler. Ideally we should avoid returning anything here and have some way
	/// to iterate over the inner scopes given the outer scope. For this we need to model our AST
	/// so all nodes implement some basic "tree" interface. For now this is good enough.
	inner_scopes: Vec<*const Scope>,

	/// The path to the source file being type checked.
	source_path: &'a Path,

	pub diagnostics: RefCell<Diagnostics>,
}

impl<'a> TypeChecker<'a> {
	pub fn new(types: &'a mut Types, source_path: &'a Path) -> Self {
		Self {
			types: types,
			inner_scopes: vec![],
			source_path,
			diagnostics: RefCell::new(Diagnostics::new()),
		}
	}

	pub fn add_globals(&mut self, scope: &Scope) {
		self.add_module_to_env(
			scope.env.borrow_mut().as_mut().unwrap(),
			WINGSDK_ASSEMBLY_NAME.to_string(),
			vec![WINGSDK_STD_MODULE.to_string()],
			&Symbol {
				name: WINGSDK_STD_MODULE.to_string(),
				span: WingSpan::global(),
			},
			0,
		);
	}

	// TODO: All calls to this should be removed and we should make sure type checks are done
	// for unimplemented types
	pub fn unimplemented_type(&self, type_name: &str) -> Option<Type> {
		self.diagnostics.borrow_mut().push(Diagnostic {
			level: DiagnosticLevel::Warning,
			message: format!("Unimplemented type: {}", type_name),
			span: None,
		});

		return Some(Type::Anything);
	}

	fn general_type_error(&self, message: String) -> TypeRef {
		self.diagnostics.borrow_mut().push(Diagnostic {
			level: DiagnosticLevel::Error,
			message,
			span: None,
		});

		self.types.anything()
	}

	fn expr_error(&self, expr: &Expr, message: String) -> TypeRef {
		self.diagnostics.borrow_mut().push(Diagnostic {
			level: DiagnosticLevel::Error,
			message,
			span: Some(expr.span.clone()),
		});

		self.types.anything()
	}

	fn stmt_error(&self, stmt: &Stmt, message: String) {
		self.diagnostics.borrow_mut().push(Diagnostic {
			level: DiagnosticLevel::Error,
			message,
			span: Some(stmt.span.clone()),
		});
	}

	fn type_error(&self, type_error: &TypeError) -> TypeRef {
		self.diagnostics.borrow_mut().push(Diagnostic {
			level: DiagnosticLevel::Error,
			message: type_error.message.clone(),
			span: Some(type_error.span.clone()),
		});

		self.types.anything()
	}

	fn variable_error(&self, type_error: &TypeError) -> VariableInfo {
		self.diagnostics.borrow_mut().push(Diagnostic {
			level: DiagnosticLevel::Error,
			message: type_error.message.clone(),
			span: Some(type_error.span.clone()),
		});

		VariableInfo {
			_type: self.types.anything(),
			reassignable: false,
			flight: Phase::Independent,
		}
	}

	pub fn get_primitive_type_by_name(&self, name: &str) -> TypeRef {
		match name {
			"number" => self.types.number(),
			"string" => self.types.string(),
			"bool" => self.types.bool(),
			"duration" => self.types.duration(),
			other => self.general_type_error(format!("Type \"{}\" is not a primitive type", other)),
		}
	}

	// Validates types in the expression make sense and returns the expression's inferred type
	fn type_check_exp(&mut self, exp: &Expr, env: &SymbolEnv, statement_idx: usize) -> TypeRef {
		let t = match &exp.kind {
			ExprKind::Literal(lit) => match lit {
				Literal::String(_) => self.types.string(),
				Literal::InterpolatedString(s) => {
					s.parts.iter().for_each(|part| {
						if let InterpolatedStringPart::Expr(interpolated_expr) = part {
							let exp_type = self.type_check_exp(interpolated_expr, env, statement_idx);
							self.validate_type_in(exp_type, &self.types.stringables(), interpolated_expr);
						}
					});
					self.types.string()
				}
				Literal::Number(_) => self.types.number(),
				Literal::Duration(_) => self.types.duration(),
				Literal::Boolean(_) => self.types.bool(),
			},
			ExprKind::Binary { op, lexp, rexp } => {
				let ltype = self.type_check_exp(lexp, env, statement_idx);
				let rtype = self.type_check_exp(rexp, env, statement_idx);

				if op.boolean_args() {
					self.validate_type(ltype, self.types.bool(), rexp);
					self.validate_type(rtype, self.types.bool(), rexp);
				} else if op.numerical_args() {
					self.validate_type(ltype, self.types.number(), rexp);
					self.validate_type(rtype, self.types.number(), rexp);
				} else {
					self.validate_type(ltype, rtype, rexp);
				}

				if op.boolean_result() {
					self.types.bool()
				} else {
					self.validate_type(ltype, self.types.number(), rexp);
					ltype
				}
			}
			ExprKind::Unary { op, exp: unary_exp } => {
				let _type = self.type_check_exp(unary_exp, env, statement_idx);

				match op {
					UnaryOperator::Not => self.validate_type(_type, self.types.bool(), unary_exp),
					UnaryOperator::Minus => self.validate_type(_type, self.types.number(), unary_exp),
				};

				_type
			}
			ExprKind::Reference(_ref) => self.resolve_reference(_ref, env, statement_idx)._type,
			ExprKind::New {
				class,
				obj_id: _, // TODO
				arg_list,
				obj_scope, // TODO
			} => {
				// TODO: obj_id, obj_scope ignored, should use it once we support Type::Resource and then remove it from Classes (fail if a class has an id if grammar doesn't handle this for us)

				// Lookup the type in the env
				let type_ = self.resolve_type_annotation(class, env, statement_idx);
				let (class_env, class_symbol) = match *type_ {
					Type::Class(ref class) => (&class.env, &class.name),
					Type::Resource(ref class) => {
						if matches!(env.flight, Phase::Preflight) {
							(&class.env, &class.name)
						} else {
							return self.general_type_error(format!(
								"Cannot create the resource \"{}\" in inflight phase",
								class.name.to_string()
							));
						}
					}
					Type::Anything => return self.types.anything(),
					_ => {
						return self.general_type_error(format!(
							"Cannot instantiate type \"{}\" because it is not a class or resource",
							type_.to_string()
						))
					}
				};

				// Type check args against constructor
				let constructor_type = match class_env.lookup(
					&Symbol {
						name: WING_CONSTRUCTOR_NAME.into(),
						span: class_symbol.span.clone(),
					},
					None,
				) {
					Ok(v) => v.as_variable().expect("Expected constructor to be a variable")._type,
					Err(type_error) => {
						self.type_error(&type_error);
						return self.types.anything();
					}
				};
				let constructor_sig = constructor_type
					.as_function_sig()
					.expect("Expected constructor to be a function signature");

				// Verify return type (This should never fail since we define the constructors return type during AST building)
				self.validate_type(constructor_sig.return_type, type_, exp);

				if !arg_list.named_args.is_empty() {
					let last_arg = constructor_sig.parameters.last().unwrap().maybe_unwrap_option();
					self.validate_structural_type(&arg_list.named_args, &last_arg, exp, env, statement_idx);
				}

				// Count number of optional parameters from the end of the constructor's params
				// Allow arg_list to be missing up to that number of nil values to try and make the number of arguments match
				let num_optionals = constructor_sig
					.parameters
					.iter()
					.rev()
					.take_while(|arg| arg.is_option())
					.count();

				// Verify arity
				let arg_count = arg_list.pos_args.len() + (if arg_list.named_args.is_empty() { 0 } else { 1 });
				let min_args = constructor_sig.parameters.len() - num_optionals;
				let max_args = constructor_sig.parameters.len();
				if arg_count < min_args || arg_count > max_args {
					let err_text = if min_args == max_args {
						format!(
							"Expected {} arguments but got {} when instantiating \"{}\"",
							min_args, arg_count, type_
						)
					} else {
						format!(
							"Expected between {} and {} arguments but got {} when instantiating \"{}\"",
							min_args, max_args, arg_count, type_
						)
					};
					self.expr_error(exp, err_text);
				}

				// Verify passed arguments match the constructor
				for (arg_expr, arg_type) in arg_list.pos_args.iter().zip(constructor_sig.parameters.iter()) {
					let arg_expr_type = self.type_check_exp(arg_expr, env, statement_idx);
					self.validate_type(arg_expr_type, *arg_type, arg_expr);
				}

				// If this is a Resource then create a new type for this resource object
				if type_.as_resource().is_some() {
					// Get reference to resource object's scope
					let obj_scope_type = if let Some(obj_scope) = obj_scope {
						Some(self.type_check_exp(obj_scope, env, statement_idx))
					} else {
						// If this returns None, this means we're instantiating a resource object in the global scope, which is valid
						env
							.try_lookup("this".into(), Some(statement_idx))
							.map(|v| v.as_variable().expect("Expected \"this\" to be a variable")._type)
					};

					// Verify the object scope is an actually resource
					if let Some(obj_scope_type) = obj_scope_type {
						if obj_scope_type.as_resource().is_none() {
							self.expr_error(
								exp,
								format!(
									"Expected scope to be a resource object, instead found \"{}\"",
									obj_scope_type
								),
							);
						}
					}

					// TODO: make sure there's no existing object with this scope/id, fail if there is! -> this can only be done in synth because I can't evaluate the scope expression here.. handle this somehow with source mapping
				}
				type_
			}
			ExprKind::Call { function, args } => {
				// Resolve the function's reference (either a method in the class's env or a function in the current env)
				let func_type = self.type_check_exp(function, env, statement_idx);
				let this_args = if matches!(function.kind, ExprKind::Reference(Reference::NestedIdentifier { .. })) {
					1
				} else {
					0
				};

				// TODO: hack to support methods of stdlib object we don't know their types yet (basically stuff like cloud.Bucket().upload())
				if matches!(*func_type, Type::Anything) {
					return self.types.anything();
				}

				// Make sure this is a function signature type
				let func_sig = if let Some(func_sig) = func_type.as_function_sig() {
					func_sig
				} else {
					return self.expr_error(&*function, format!("should be a function or method"));
				};

				if !can_call_flight(func_sig.flight, env.flight) {
					self.expr_error(
						exp,
						format!("Cannot call into {} phase while {}", func_sig.flight, env.flight),
					);
				}

				if !args.named_args.is_empty() {
					let last_arg = func_sig.parameters.last().unwrap().maybe_unwrap_option();
					self.validate_structural_type(&args.named_args, &last_arg, exp, env, statement_idx);
				}

				// Count number of optional parameters from the end of the function's params
				// Allow arg_list to be missing up to that number of nil values to try and make the number of arguments match
				let num_optionals = func_sig
					.parameters
					.iter()
					.rev()
					.take_while(|arg| arg.is_option())
					.count();

				// Verity arity
				let arg_count = args.pos_args.len() + (if args.named_args.is_empty() { 0 } else { 1 });
				let min_args = func_sig.parameters.len() - num_optionals - this_args;
				let max_args = func_sig.parameters.len() - this_args;
				if arg_count < min_args || arg_count > max_args {
					let err_text = if min_args == max_args {
						format!("Expected {} arguments but got {}", min_args, arg_count)
					} else {
						format!(
							"Expected between {} and {} arguments but got {}",
							min_args, max_args, arg_count
						)
					};
					self.expr_error(exp, err_text);
				}

				let params = func_sig
					.parameters
					.iter()
					.skip(this_args)
					.take(func_sig.parameters.len() - num_optionals);
				let args = args.pos_args.iter();

				for (arg_type, param_exp) in params.zip(args) {
					let param_type = self.type_check_exp(param_exp, env, statement_idx);
					self.validate_type(param_type, *arg_type, param_exp);
				}

				func_sig.return_type
			}
			ExprKind::ArrayLiteral { type_, items } => {
				// Infer type based on either the explicit type or the value in one of the items
				let container_type = if let Some(type_) = type_ {
					self.resolve_type_annotation(type_, env, statement_idx)
				} else if !items.is_empty() {
					let some_val_type = self.type_check_exp(items.iter().next().unwrap(), env, statement_idx);
					self.types.add_type(Type::Array(some_val_type))
				} else {
					self.expr_error(exp, "Cannot infer type of empty array".to_owned());
					self.types.add_type(Type::Array(self.types.anything()))
				};

				let element_type = match *container_type {
					Type::Array(t) => t,
					Type::MutArray(t) => t,
					_ => self.expr_error(exp, format!("Expected \"Array\" type, found \"{}\"", container_type)),
				};

				// Verify all types are the same as the inferred type
				for v in items.iter() {
					let t = self.type_check_exp(v, env, statement_idx);
					self.validate_type(t, element_type, v);
				}

				container_type
			}
			ExprKind::StructLiteral { type_, fields } => {
				// Find this struct's type in the environment
				let struct_type = self.resolve_type_annotation(type_, env, statement_idx);

				if struct_type.is_anything() {
					return struct_type;
				}

				// Make sure it really is a struct type
				let st = struct_type
					.as_struct()
					.expect(&format!("Expected \"{}\" to be a struct type", struct_type));

				// Verify that all fields are present and are of the right type
				if st.env.iter(true).count() > fields.len() {
					panic!("Not all fields of {} are initialized.", struct_type);
				}
				for (k, v) in fields.iter() {
					let field = st.env.try_lookup(&k.name, None);
					if let Some(field) = field {
						let t = self.type_check_exp(v, env, statement_idx);
						self.validate_type(
							t,
							field
								.as_variable()
								.expect("Expected struct field to be a variable in the struct env")
								._type,
							v,
						);
					} else {
						self.expr_error(exp, format!("\"{}\" is not a field of \"{}\"", k.name, struct_type));
					}
				}

				struct_type
			}
			ExprKind::MapLiteral { fields, type_ } => {
				// Infer type based on either the explicit type or the value in one of the fields
				let container_type = if let Some(type_) = type_ {
					self.resolve_type_annotation(type_, env, statement_idx)
				} else if !fields.is_empty() {
					let some_val_type = self.type_check_exp(fields.iter().next().unwrap().1, env, statement_idx);
					self.types.add_type(Type::Map(some_val_type))
				} else {
					self.expr_error(exp, "Cannot infer type of empty map".to_owned());
					self.types.add_type(Type::Map(self.types.anything()))
				};

				let value_type = match *container_type {
					Type::Map(t) => t,
					Type::MutMap(t) => t,
					_ => self.expr_error(exp, format!("Expected \"Map\" type, found \"{}\"", container_type)),
				};

				// Verify all types are the same as the inferred type
				for (_, v) in fields.iter() {
					let t = self.type_check_exp(v, env, statement_idx);
					self.validate_type(t, value_type, v);
				}

				container_type
			}
			ExprKind::SetLiteral { type_, items } => {
				// Infer type based on either the explicit type or the value in one of the items
				let container_type = if let Some(type_) = type_ {
					self.resolve_type_annotation(type_, env, statement_idx)
				} else if !items.is_empty() {
					let some_val_type = self.type_check_exp(items.iter().next().unwrap(), env, statement_idx);
					self.types.add_type(Type::Set(some_val_type))
				} else {
					self.expr_error(exp, "Cannot infer type of empty set".to_owned());
					self.types.add_type(Type::Set(self.types.anything()))
				};

				let element_type = match *container_type {
					Type::Set(t) => t,
					Type::MutSet(t) => t,
					_ => self.expr_error(exp, format!("Expected \"Set\" type, found \"{}\"", container_type)),
				};

				// Verify all types are the same as the inferred type
				for v in items.iter() {
					let t = self.type_check_exp(v, env, statement_idx);
					self.validate_type(t, element_type, v);
				}

				container_type
			}
			ExprKind::FunctionClosure(func_def) => {
				// TODO: make sure this function returns on all control paths when there's a return type (can be done by recursively traversing the statements and making sure there's a "return" statements in all control paths)

				if matches!(func_def.signature.flight, Phase::Inflight) {
					self.unimplemented_type("Inflight function signature"); // TODO: what typechecking do we need here?self??
				}

				// Create a type_checker function signature from the AST function definition, assuming success we can add this function to the env
				let function_type = self.resolve_type_annotation(
					&TypeAnnotation::FunctionSignature(func_def.signature.clone()),
					env,
					statement_idx,
				);
				let sig = function_type.as_function_sig().unwrap();

				// Create an environment for the function
				let mut function_env = SymbolEnv::new(
					Some(env.get_ref()),
					sig.return_type,
					false,
					false,
					func_def.signature.flight,
					statement_idx,
				);
				self.add_arguments_to_env(&func_def.parameters, &sig, &mut function_env);
				func_def.statements.set_env(function_env);

				self.inner_scopes.push(&func_def.statements);

				function_type
			}
		};
		*exp.evaluated_type.borrow_mut() = Some(t);
		t
	}

	/// Validate that a given hashmap can be assigned to a variable of given struct type
	fn validate_structural_type(
		&mut self,
		object: &HashMap<Symbol, Expr>,
		expected_type: &TypeRef,
		value: &Expr,
		env: &SymbolEnv,
		statement_idx: usize,
	) {
		let expected_struct = if let Some(expected_struct) = expected_type.as_struct() {
			expected_struct
		} else {
			self.expr_error(value, format!("Named arguments provided for non-struct argument"));
			return;
		};

		// Verify that there are no extraneous fields
		// Also map original field names to the ones in the struct type
		let mut field_map = HashMap::new();
		for (k, _) in object.iter() {
			let field = expected_struct.env.try_lookup(&k.name, None);
			if let Some(field) = field {
				let field_type = field
					.as_variable()
					.expect("Expected struct field to be a variable in the struct env")
					._type;
				field_map.insert(k.name.clone(), (k, field_type));
			} else {
				self.expr_error(value, format!("\"{}\" is not a field of \"{}\"", k.name, expected_type));
			}
		}

		// Verify that all non-optional fields are present and are of the right type
		for (k, v) in expected_struct.env.iter(true).map(|(k, v, _)| {
			(
				k,
				v.as_variable()
					.expect("Expected struct field to be a variable in the struct env")
					._type,
			)
		}) {
			if let Some((symb, expected_field_type)) = field_map.get(&k) {
				let provided_exp = object.get(symb).unwrap();
				let t = self.type_check_exp(provided_exp, env, statement_idx);
				self.validate_type(t, *expected_field_type, provided_exp);
			} else if !v.is_option() {
				self.expr_error(
					value,
					format!(
						"Missing required field \"{}\" from \"{}\"",
						k, expected_struct.name.name
					),
				);
			}
		}
	}

	fn validate_type(&mut self, actual_type: TypeRef, expected_type: TypeRef, value: &Expr) {
		self.validate_type_in(actual_type, &[expected_type], value)
	}

	fn validate_type_in(&mut self, actual_type: TypeRef, expected_types: &[TypeRef], value: &Expr) {
		assert!(expected_types.len() > 0);
		if !actual_type.is_anything()
			&& !expected_types
				.iter()
				.any(|expected| actual_type.is_subtype_of(&expected))
		{
			self.diagnostics.borrow_mut().push(Diagnostic {
				message: if expected_types.len() > 1 {
					let expected_types_list = expected_types
						.iter()
						.map(|t| format!("{}", t))
						.collect::<Vec<String>>()
						.join(",");
					format!(
						"Expected type to be one of \"{}\", but got \"{}\" instead",
						expected_types_list, actual_type
					)
				} else {
					format!(
						"Expected type to be \"{}\", but got \"{}\" instead",
						expected_types[0], actual_type
					)
				},
				span: Some(value.span.clone()),
				level: DiagnosticLevel::Error,
			});
		}
	}

	pub fn type_check_scope(&mut self, scope: &Scope) {
		assert!(self.inner_scopes.is_empty());
		for statement in scope.statements.iter() {
			self.type_check_statement(statement, scope.env.borrow_mut().as_mut().unwrap());
		}
		let inner_scopes = self.inner_scopes.drain(..).collect::<Vec<_>>();
		for inner_scope in inner_scopes {
			self.type_check_scope(unsafe { &*inner_scope });
		}
	}

	fn resolve_type_annotation(&mut self, annotation: &TypeAnnotation, env: &SymbolEnv, statement_idx: usize) -> TypeRef {
		match annotation {
			TypeAnnotation::Number => self.types.number(),
			TypeAnnotation::String => self.types.string(),
			TypeAnnotation::Bool => self.types.bool(),
			TypeAnnotation::Duration => self.types.duration(),
			TypeAnnotation::Optional(v) => {
				let value_type = self.resolve_type_annotation(v, env, statement_idx);
				self.types.add_type(Type::Optional(value_type))
			}
			TypeAnnotation::FunctionSignature(ast_sig) => {
				let mut args = vec![];
				for arg in ast_sig.parameters.iter() {
					args.push(self.resolve_type_annotation(arg, env, statement_idx));
				}
				let sig = FunctionSignature {
					parameters: args,
					return_type: ast_sig.return_type.as_ref().map_or(self.types.void(), |t| {
						self.resolve_type_annotation(t, env, statement_idx)
					}),
					flight: ast_sig.flight,
					js_override: None,
				};
				// TODO: avoid creating a new type for each function_sig resolution
				self.types.add_type(Type::Function(sig))
			}
			TypeAnnotation::UserDefined(user_defined_type) => {
				resolve_user_defined_type(user_defined_type, env, statement_idx).unwrap_or_else(|e| self.type_error(&e))
			}
			TypeAnnotation::Array(v) => {
				let value_type = self.resolve_type_annotation(v, env, statement_idx);
				// TODO: avoid creating a new type for each array resolution
				self.types.add_type(Type::Array(value_type))
			}
			TypeAnnotation::MutArray(v) => {
				let value_type = self.resolve_type_annotation(v, env, statement_idx);
				// TODO: avoid creating a new type for each array resolution
				self.types.add_type(Type::MutArray(value_type))
			}
			TypeAnnotation::Set(v) => {
				let value_type = self.resolve_type_annotation(v, env, statement_idx);
				// TODO: avoid creating a new type for each set resolution
				self.types.add_type(Type::Set(value_type))
			}
			TypeAnnotation::MutSet(v) => {
				let value_type = self.resolve_type_annotation(v, env, statement_idx);
				// TODO: avoid creating a new type for each set resolution
				self.types.add_type(Type::MutSet(value_type))
			}
			TypeAnnotation::Map(v) => {
				let value_type = self.resolve_type_annotation(v, env, statement_idx);
				// TODO: avoid creating a new type for each map resolution
				self.types.add_type(Type::Map(value_type))
			}
			TypeAnnotation::MutMap(v) => {
				let value_type = self.resolve_type_annotation(v, env, statement_idx);
				// TODO: avoid creating a new type for each map resolution
				self.types.add_type(Type::MutMap(value_type))
			}
		}
	}

	fn type_check_statement(&mut self, stmt: &Stmt, env: &mut SymbolEnv) {
		match &stmt.kind {
			StmtKind::VariableDef {
				reassignable,
				var_name,
				initial_value,
				type_,
			} => {
				let explicit_type = type_.as_ref().map(|t| self.resolve_type_annotation(t, env, stmt.idx));
				let inferred_type = self.type_check_exp(initial_value, env, stmt.idx);
				if inferred_type.is_void() {
					self.type_error(&TypeError {
						message: format!("Cannot assign expression of type \"{}\" to a variable", inferred_type),
						span: var_name.span.clone(),
					});
				}
				if let Some(explicit_type) = explicit_type {
					self.validate_type(inferred_type, explicit_type, initial_value);
					match env.define(
						var_name,
						SymbolKind::make_variable(explicit_type, *reassignable, env.flight),
						StatementIdx::Index(stmt.idx),
					) {
						Err(type_error) => {
							self.type_error(&type_error);
						}
						_ => {}
					};
				} else {
					match env.define(
						var_name,
						SymbolKind::make_variable(inferred_type, *reassignable, env.flight),
						StatementIdx::Index(stmt.idx),
					) {
						Err(type_error) => {
							self.type_error(&type_error);
						}
						_ => {}
					};
				}
			}
			StmtKind::ForLoop {
				iterator,
				iterable,
				statements,
			} => {
				// TODO: Expression must be iterable
				let exp_type = self.type_check_exp(iterable, env, stmt.idx);

				let iterator_type = match &*exp_type {
					// These are builtin iterables that have a clear/direct iterable type
					Type::Array(t) => *t,
					Type::Set(t) => *t,
					Type::MutArray(t) => *t,
					Type::MutSet(t) => *t,

					// TODO: Handle non-builtin iterables
					t => {
						self.type_error(&TypeError {
							message: format!("Unable to iterate over \"{}\"", t),
							span: iterable.span.clone(),
						});
						self.types.anything()
					}
				};

				let mut scope_env = SymbolEnv::new(Some(env.get_ref()), env.return_type, false, false, env.flight, stmt.idx);
				match scope_env.define(
					&iterator,
					SymbolKind::make_variable(iterator_type, false, env.flight),
					StatementIdx::Top,
				) {
					Err(type_error) => {
						self.type_error(&type_error);
					}
					_ => {}
				};
				statements.set_env(scope_env);

				self.inner_scopes.push(statements);
			}
			StmtKind::While { condition, statements } => {
				let cond_type = self.type_check_exp(condition, env, stmt.idx);
				self.validate_type(cond_type, self.types.bool(), condition);

				statements.set_env(SymbolEnv::new(
					Some(env.get_ref()),
					env.return_type,
					false,
					false,
					env.flight,
					stmt.idx,
				));

				self.inner_scopes.push(statements);
			}
			StmtKind::If {
				condition,
				statements,
				elif_statements,
				else_statements,
			} => {
				let cond_type = self.type_check_exp(condition, env, stmt.idx);
				self.validate_type(cond_type, self.types.bool(), condition);

				statements.set_env(SymbolEnv::new(
					Some(env.get_ref()),
					env.return_type,
					false,
					false,
					env.flight,
					stmt.idx,
				));
				self.inner_scopes.push(statements);

				for elif_scope in elif_statements {
					let cond_type = self.type_check_exp(&elif_scope.condition, env, stmt.idx);
					self.validate_type(cond_type, self.types.bool(), condition);

					(&elif_scope.statements).set_env(SymbolEnv::new(
						Some(env.get_ref()),
						env.return_type,
						false,
						false,
						env.flight,
						stmt.idx,
					));
					self.inner_scopes.push(&elif_scope.statements);
				}

				if let Some(else_scope) = else_statements {
					else_scope.set_env(SymbolEnv::new(
						Some(env.get_ref()),
						env.return_type,
						false,
						false,
						env.flight,
						stmt.idx,
					));
					self.inner_scopes.push(else_scope);
				}
			}
			StmtKind::Expression(e) => {
				self.type_check_exp(e, env, stmt.idx);
			}
			StmtKind::Assignment { variable, value } => {
				let exp_type = self.type_check_exp(value, env, stmt.idx);
				let var_info = self.resolve_reference(variable, env, stmt.idx);
				if !var_info.reassignable {
					self.stmt_error(stmt, format!("Variable {} is not reassignable ", variable));
				}
				self.validate_type(exp_type, var_info._type, value);
			}
			StmtKind::Bring {
				module_name,
				identifier,
			} => {
				// library_name is the name of the library we are importing from the JSII world
				let library_name: String;
				// namespace_filter describes what types we are importing from the library
				// e.g. [] means we are importing everything from `mylib`
				// e.g. ["ns1", "ns2"] means we are importing everything from `mylib.ns1.ns2`
				let namespace_filter: Vec<String>;
				// alias is the symbol we are giving to the imported library or namespace
				let alias: &Symbol;

				if module_name.name.starts_with('"') && module_name.name.ends_with('"') {
					// case 1: bring "library_name" as identifier;
					if identifier.is_none() {
						self.stmt_error(
							stmt,
							format!(
								"bring \"{}\" must be assigned to an identifier (e.g. bring \"foo\" as foo)",
								module_name.name
							),
						);
						return;
					}
					// We assume we have a jsii library and we use `module_name` as the library name, and set no
					// namespace filter (we only support importing a full library at the moment)
					library_name = module_name.name[1..module_name.name.len() - 1].to_string();
					namespace_filter = vec![];
					alias = identifier.as_ref().unwrap();
				} else {
					// case 2: bring module_name;
					// case 3: bring module_name as identifier;
					match module_name.name.as_str() {
						// If the module name is a built-in module, then we use @winglang/sdk as the library name,
						// and import the module as a namespace. If the user doesn't specify an identifier, then
						// we use the module name as the identifier.
						// For example, `bring fs` will import the `fs` namespace from @winglang/sdk and assign it
						// to an identifier named `fs`.
						WINGSDK_CLOUD_MODULE | WINGSDK_FS_MODULE => {
							library_name = WINGSDK_ASSEMBLY_NAME.to_string();
							namespace_filter = vec![module_name.name.clone()];
							alias = identifier.as_ref().unwrap_or(&module_name);
						}
						WINGSDK_STD_MODULE => {
							self.stmt_error(stmt, format!("Redundant bring of \"{}\"", WINGSDK_STD_MODULE));
							return;
						}
						_ => {
							self.stmt_error(stmt, format!("\"{}\" is not a built-in module", module_name.name));
							return;
						}
					}
				};

				self.add_module_to_env(env, library_name, namespace_filter, &alias, stmt.idx);
			}
			StmtKind::Scope(scope) => {
				scope.set_env(SymbolEnv::new(
					Some(env.get_ref()),
					env.return_type,
					false,
					false,
					env.flight,
					stmt.idx,
				));
				self.inner_scopes.push(scope)
			}
			StmtKind::Return(exp) => {
				if let Some(return_expression) = exp {
					let return_type = self.type_check_exp(return_expression, env, stmt.idx);
					if !env.return_type.is_void() {
						self.validate_type(return_type, env.return_type, return_expression);
					} else {
						self.stmt_error(
							stmt,
							format!("Return statement outside of function cannot return a value."),
						);
					}
				} else {
					if !env.return_type.is_void() {
						self.stmt_error(
							stmt,
							format!("Expected return statement to return type {}", env.return_type),
						);
					}
				}
			}
			StmtKind::Class(AstClass {
				name,
				fields,
				methods,
				parent,
				constructor,
				is_resource,
			}) => {
				// Resources cannot be defined inflight
				assert!(!*is_resource || env.flight == Phase::Preflight);

				if *is_resource {
					// TODO
				}

				// Verify parent is actually a known Class/Resource and get their env
				let (parent_class, parent_class_env) = if let Some(parent_type) = parent {
					let t = resolve_user_defined_type(parent_type, env, stmt.idx).unwrap_or_else(|e| self.type_error(&e));
					if *is_resource {
						if let Type::Resource(ref class) = *t {
							(Some(t), Some(class.env.get_ref()))
						} else {
							panic!("Resource {}'s parent {} is not a resource", name, t);
						}
					} else {
						if let Type::Class(ref class) = *t {
							(Some(t), Some(class.env.get_ref()))
						} else {
							self.general_type_error(format!("Class {}'s parent \"{}\" is not a class", name, t));
							(None, None)
						}
					}
				} else {
					(None, None)
				};

				// Create environment representing this class, for now it'll be empty just so we can support referencing ourselves from the class definition.
				let dummy_env = SymbolEnv::new(None, self.types.void(), true, false, env.flight, stmt.idx);

				// Create the resource/class type and add it to the current environment (so class implementation can reference itself)
				let class_spec = Class {
					should_case_convert_jsii: false,
					name: name.clone(),
					env: dummy_env,
					parent: parent_class,
					type_parameters: None, // TODO no way to have generic args in wing yet
				};
				let mut class_type = self.types.add_type(if *is_resource {
					Type::Resource(class_spec)
				} else {
					Type::Class(class_spec)
				});
				match env.define(name, SymbolKind::Type(class_type), StatementIdx::Top) {
					Err(type_error) => {
						self.type_error(&type_error);
					}
					_ => {}
				};

				// Create a the real class environment to be filled with the class AST types
				let mut class_env = SymbolEnv::new(parent_class_env, self.types.void(), true, false, env.flight, stmt.idx);

				// Add fields to the class env
				for field in fields.iter() {
					let field_type = self.resolve_type_annotation(&field.member_type, env, stmt.idx);
					match class_env.define(
						&field.name,
						SymbolKind::make_variable(field_type, field.reassignable, field.flight),
						StatementIdx::Top,
					) {
						Err(type_error) => {
							self.type_error(&type_error);
						}
						_ => {}
					};
				}
				// Add methods to the class env
				for (method_name, method_def) in methods.iter() {
					let mut sig = method_def.signature.clone();

					// Add myself as first parameter to all class methods (self)
					sig.parameters.insert(
						0,
						TypeAnnotation::UserDefined(UserDefinedType {
							root: name.clone(),
							fields: vec![],
						}),
					);

					let method_type = self.resolve_type_annotation(&TypeAnnotation::FunctionSignature(sig), env, stmt.idx);
					match class_env.define(
						method_name,
						SymbolKind::make_variable(method_type, false, method_def.signature.flight),
						StatementIdx::Top,
					) {
						Err(type_error) => {
							self.type_error(&type_error);
						}
						_ => {}
					};
				}

				// Add the constructor to the class env
				let constructor_type = self.resolve_type_annotation(
					&TypeAnnotation::FunctionSignature(constructor.signature.clone()),
					env,
					stmt.idx,
				);
				match class_env.define(
					&Symbol {
						name: WING_CONSTRUCTOR_NAME.into(),
						span: name.span.clone(),
					},
					SymbolKind::make_variable(constructor_type, false, constructor.signature.flight),
					StatementIdx::Top,
				) {
					Err(type_error) => {
						self.type_error(&type_error);
					}
					_ => {}
				};

				// Replace the dummy class environment with the real one before type checking the methods
				class_type.as_mut_class_or_resource().unwrap().env = class_env;
				let class_env = &class_type.as_class_or_resource().unwrap().env;

				// Type check constructor
				let constructor_sig = if let Type::Function(ref s) = *constructor_type {
					s
				} else {
					panic!(
						"Constructor of {} isn't defined as a function in the class environment",
						name
					);
				};

				// Create constructor environment and prime it with args
				let mut constructor_env = SymbolEnv::new(
					Some(env.get_ref()),
					constructor_sig.return_type,
					false,
					true,
					constructor.signature.flight,
					stmt.idx,
				);
				self.add_arguments_to_env(&constructor.parameters, constructor_sig, &mut constructor_env);
				// Prime the constructor environment with `this`
				constructor_env
					.define(
						&Symbol {
							name: "this".into(),
							span: name.span.clone(),
						},
						SymbolKind::make_variable(class_type, false, constructor_env.flight),
						StatementIdx::Top,
					)
					.expect("Expected `this` to be added to constructor env");
				constructor.statements.set_env(constructor_env);
				// Check function scope
				self.inner_scopes.push(&constructor.statements);

				// TODO: handle member/method overrides in our env based on whatever rules we define in our spec

				// Type check methods
				for (method_name, method_def) in methods.iter() {
					// Lookup the method in the class_env
					let method_type = class_env
						.lookup(method_name, None)
						.expect("Expected method to be in class env")
						.as_variable()
						.expect("Expected method to be a variable")
						._type;

					let method_sig = method_type
						.as_function_sig()
						.expect("Expected method type to be a function signature");

					// Create method environment and prime it with args
					let mut method_env = SymbolEnv::new(
						Some(env.get_ref()),
						method_sig.return_type,
						false,
						false,
						method_sig.flight,
						stmt.idx,
					);
					// Add `this` as first argument
					let mut actual_parameters = vec![(
						Symbol {
							name: "this".into(),
							span: method_name.span.clone(),
						},
						false,
					)];
					actual_parameters.extend(method_def.parameters.clone());
					self.add_arguments_to_env(&actual_parameters, method_sig, &mut method_env);
					method_def.statements.set_env(method_env);
					self.inner_scopes.push(&method_def.statements);
				}
			}
			StmtKind::Struct { name, extends, members } => {
				// Note: structs don't have a parent environment, instead they flatten their parent's members into the struct's env.
				//   If we encounter an existing member with the same name and type we skip it, if the types are different we
				//   fail type checking.

				// Create an environment for the struct
				let mut struct_env = SymbolEnv::new(None, self.types.void(), true, false, env.flight, stmt.idx);

				// Add fields to the struct env
				for field in members.iter() {
					let field_type = self.resolve_type_annotation(&field.member_type, env, stmt.idx);
					match struct_env.define(
						&field.name,
						SymbolKind::make_variable(field_type, false, field.flight),
						StatementIdx::Top,
					) {
						Err(type_error) => {
							self.type_error(&type_error);
						}
						_ => {}
					};
				}

				// Add members from the structs parents
				let extends_types = extends
					.iter()
					.filter_map(|parent| match env.lookup(&parent, Some(stmt.idx)) {
						Ok(kind) => match &*kind {
							SymbolKind::Type(_type) => Some(*_type),
							_ => {
								self.type_error(&TypeError {
									message: format!("Expected {} to be a type", parent),
									span: parent.span.clone(),
								});
								None
							}
						},
						Err(type_error) => {
							self.type_error(&type_error);
							None
						}
					})
					.collect::<Vec<_>>();

				if let Err(e) = add_parent_members_to_struct_env(&extends_types, name, &mut struct_env) {
					self.type_error(&e);
				}
				match env.define(
					name,
					SymbolKind::Type(self.types.add_type(Type::Struct(Struct {
						name: name.clone(),
						extends: extends_types,
						env: struct_env,
					}))),
					StatementIdx::Top,
				) {
					Err(type_error) => {
						self.type_error(&type_error);
					}
					_ => {}
				};
			}
			StmtKind::Enum { name, values } => {
				let enum_type_ref = self.types.add_type(Type::Enum(Enum {
					name: name.clone(),
					values: values.clone(),
				}));

				match env.define(name, SymbolKind::Type(enum_type_ref), StatementIdx::Top) {
					Err(type_error) => {
						self.type_error(&type_error);
					}
					_ => {}
				};
			}
		}
	}

	fn add_module_to_env(
		&mut self,
		env: &mut SymbolEnv,
		library_name: String,
		namespace_filter: Vec<String>,
		alias: &Symbol,
		statement_idx: usize,
	) {
		let mut wingii_types = wingii::type_system::TypeSystem::new();

		// Loading the SDK is handled different from loading any other jsii modules because with the SDK we provide an exact
		// location to locate the SDK, whereas for the other modules we need to search for them from the source directory.
		let assembly_name = if library_name == WINGSDK_ASSEMBLY_NAME {
			// in runtime, if "WINGSDK_MANIFEST_ROOT" env var is set, read it. otherwise set to "../wingsdk" for dev
			let manifest_root = std::env::var("WINGSDK_MANIFEST_ROOT").unwrap_or_else(|_| "../wingsdk".to_string());
			let wingii_loader_options = wingii::type_system::AssemblyLoadOptions {
				root: true,
				deps: false,
			};
			let assembly_name = wingii_types
				.load(manifest_root.as_str(), Some(wingii_loader_options))
				.unwrap();
			assembly_name
		} else {
			let wingii_loader_options = wingii::type_system::AssemblyLoadOptions { root: true, deps: true };
			let source_dir = self.source_path.parent().unwrap().to_str().unwrap();
			let assembly_name = wingii_types
				.load_dep(library_name.as_str(), source_dir, &wingii_loader_options)
				.unwrap();
			assembly_name
		};

		debug!("Loaded JSII assembly {}", assembly_name);

		let mut jsii_importer = JsiiImporter::new(
			&wingii_types,
			&assembly_name,
			&namespace_filter,
			&alias,
			self.types,
			statement_idx,
			env,
		);
		jsii_importer.import_to_env();
	}

	/// Add function arguments to the function's environment
	///
	/// #Arguments
	///
	/// * `args` - List of aruments to add, each element is a tuple of the arugment symbol and whether it's
	///   reassignable arg or not. Note that the argument types are figured out from `sig`.
	/// * `sig` - The function signature (used to figure out the type of each argument).
	/// * `env` - The function's environment to prime with the args.
	///
	fn add_arguments_to_env(&mut self, args: &Vec<(Symbol, bool)>, sig: &FunctionSignature, env: &mut SymbolEnv) {
		assert!(args.len() == sig.parameters.len());
		for (arg, arg_type) in args.iter().zip(sig.parameters.iter()) {
			match env.define(
				&arg.0,
				SymbolKind::make_variable(*arg_type, arg.1, env.flight),
				StatementIdx::Top,
			) {
				Err(type_error) => {
					self.type_error(&type_error);
				}
				_ => {}
			};
		}
	}

	/// Hydrate `@typeparam`s in a type reference with a given type argument
	///
	/// # Arguments
	///
	/// * `env` - The environment to use for looking up the original type
	/// * `original_fqn` - The fully qualified name of the original type
	/// * `type_param` - The type argument to use for the `any`
	///
	/// # Returns
	/// The hydrated type reference
	///
	fn hydrate_class_type_arguments(
		&mut self,
		env: &SymbolEnv,
		original_fqn: &str,
		type_params: Vec<TypeRef>,
	) -> TypeRef {
		let original_type = env
			.lookup_nested_str(original_fqn, true, None)
			.unwrap()
			.as_type()
			.unwrap();
		let original_type_class = original_type.as_class().unwrap();
		let original_type_params = if let Some(tp) = original_type_class.type_parameters.as_ref() {
			tp
		} else {
			panic!(
				"\"{}\" does not have type parameters and does not need hydration",
				original_fqn
			);
		};

		if original_type_params.len() != type_params.len() {
			return self.general_type_error(format!(
				"Type \"{}\" has {} type parameters, but {} were provided",
				original_fqn,
				original_type_params.len(),
				type_params.len()
			));
		}

		let new_env = SymbolEnv::new(
			None,
			original_type_class.env.return_type,
			true,
			false,
			Phase::Independent,
			0,
		);
		let tt = Type::Class(Class {
			name: original_type_class.name.clone(),
			env: new_env,
			parent: original_type_class.parent,
			should_case_convert_jsii: original_type_class.should_case_convert_jsii,
			type_parameters: Some(type_params.clone()),
		});
		// TODO: here we add a new type regardless whether we already "hydrated" `original_type` with these `type_params`. Cache!
		let mut new_type = self.types.add_type(tt);
		let new_type_class = new_type.as_mut_class_or_resource().unwrap();

		// Add symbols from original type to new type
		// Note: this is currently limited to top-level function signatures and fields
		for (type_index, original_type_param) in original_type_params.iter().enumerate() {
			let new_type_arg = type_params[type_index];
			for (name, symbol, _) in original_type_class.env.iter(true) {
				match symbol {
					SymbolKind::Variable(VariableInfo {
						_type: v,
						reassignable,
						flight,
					}) => {
						// Replace type params in function signatures
						if let Some(sig) = v.as_function_sig() {
							let new_return_type = if sig.return_type.is_same_type_as(original_type_param) {
								new_type_arg
							} else {
								// Handle generic return types
								// TODO: If a generic class has a method that returns another generic, it must be a builtin
								if let Some(c) = sig.return_type.as_class() {
									if c.type_parameters.is_some() {
										let fqn = format!("{}.{}", WINGSDK_STD_MODULE, c.name.name);
										match fqn.as_str() {
											WINGSDK_MUT_ARRAY => self.types.add_type(Type::MutArray(new_type_arg)),
											WINGSDK_ARRAY => self.types.add_type(Type::Array(new_type_arg)),
											WINGSDK_MAP => self.types.add_type(Type::Map(new_type_arg)),
											WINGSDK_MUT_MAP => self.types.add_type(Type::MutMap(new_type_arg)),
											WINGSDK_SET => self.types.add_type(Type::Set(new_type_arg)),
											WINGSDK_MUT_SET => self.types.add_type(Type::MutSet(new_type_arg)),
											_ => self.general_type_error(format!("\"{}\" is not a supported generic return type", fqn)),
										}
									} else {
										sig.return_type
									}
								} else {
									sig.return_type
								}
							};

							let new_args: Vec<UnsafeRef<Type>> = sig
								.parameters
								.iter()
								.map(|arg| {
									if arg.is_same_type_as(original_type_param) {
										new_type_arg
									} else {
										*arg
									}
								})
								.collect();

							let new_sig = FunctionSignature {
								parameters: new_args,
								return_type: new_return_type,
								flight: sig.flight.clone(),
								js_override: sig.js_override.clone(),
							};

							match new_type_class.env.define(
								// TODO: Original symbol is not available. SymbolKind::Variable should probably expose it
								&Symbol {
									name: name.clone(),
									span: WingSpan::global(),
								},
								SymbolKind::make_variable(self.types.add_type(Type::Function(new_sig)), *reassignable, *flight),
								StatementIdx::Top,
							) {
								Err(type_error) => {
									self.type_error(&type_error);
								}
								_ => {}
							}
						} else if let Some(VariableInfo {
							_type: var,
							reassignable,
							flight,
						}) = symbol.as_variable()
						{
							let new_var_type = if var.is_same_type_as(original_type_param) {
								new_type_arg
							} else {
								var
							};
							match new_type_class.env.define(
								// TODO: Original symbol is not available. SymbolKind::Variable should probably expose it
								&Symbol {
									name: name.clone(),
									span: WingSpan::global(),
								},
								SymbolKind::make_variable(new_var_type, reassignable, flight),
								StatementIdx::Top,
							) {
								Err(type_error) => {
									self.type_error(&type_error);
								}
								_ => {}
							}
						}
					}
					_ => {}
				}
			}
		}

		return new_type;
	}

	fn expr_maybe_type(&mut self, expr: &Expr, env: &SymbolEnv, statement_idx: usize) -> Option<TypeRef> {
		// TODO: we currently don't handle parenthesized expressions correctly so something like `(MyEnum).A` or `std.(namespace.submodule).A` will return true, is this a problem?
		let mut path = vec![];
		let mut curr_expr = expr;
		loop {
			match &curr_expr.kind {
				ExprKind::Reference(reference) => match reference {
					Reference::Identifier(symbol) => {
						path.push(symbol);
						break;
					}
					Reference::NestedIdentifier { object, property } => {
						path.push(property);
						curr_expr = &object;
					}
				},
				_ => return None,
			}
		}
		path.reverse();
		match env.lookup_nested(&path, false, Some(statement_idx)) {
			Ok(SymbolKind::Type(type_ref)) => Some(*type_ref),
			_ => None,
		}
	}

	fn resolve_reference(&mut self, reference: &Reference, env: &SymbolEnv, statement_idx: usize) -> VariableInfo {
		match reference {
			Reference::Identifier(symbol) => match env.lookup(symbol, Some(statement_idx)) {
				Ok(var) => {
					if let Some(var) = var.as_variable() {
						var
					} else {
						self.variable_error(&TypeError {
							message: format!("Expected identifier {}, to be a variable, but it's a {}", symbol, var),
							span: symbol.span.clone(),
						})
					}
				}
				Err(type_error) => self.variable_error(&type_error),
			},
			Reference::NestedIdentifier { object, property } => {
				// There's a special case where the object is actually a type and the property is either a static method or an enum variant.
				// In this case the type might even be namespaced (recursive nested reference). We need to detect this and treat the entire
				// object as a single reference to the type
				if let Some(_type) = self.expr_maybe_type(object, env, statement_idx) {
					// Currently we only support enum field access (no static methods)
					let _type = match *_type {
						Type::Enum(ref e) => {
							if e.values.contains(property) {
								_type
							} else {
								self.general_type_error(format!(
									"Enum \"{}\" does not contain value \"{}\"",
									_type, property.name
								))
							}
						}
						_ => self.general_type_error(format!("Type {} not valid in expression", _type)),
					};
					return VariableInfo {
						_type,
						reassignable: false,
						// Since we only support enum variants here we assume they are phase independent, for static methods this should be fixed
						flight: Phase::Independent,
					};
				}

				// Special case: if the object expression is a simple reference to `this` and we're inside the init function then
				// we'll consider all properties as reassignable regardless of whether they're `var`.
				let mut force_reassignable = false;
				if let ExprKind::Reference(Reference::Identifier(symb)) = &object.kind {
					if symb.name == "this" {
						if let Ok((kind, info)) = env.lookup_ext(symb, Some(statement_idx)) {
							// `this` resreved symbol should always be a variable
							assert!(matches!(kind, SymbolKind::Variable(_)));
							force_reassignable = info.init;
						}
					}
				}

				let instance_type = self.type_check_exp(object, env, statement_idx);
				let res = match *instance_type {
					Type::Class(ref class) | Type::Resource(ref class) => self.get_property_from_class(class, property),
					Type::Anything => VariableInfo {
						_type: instance_type,
						reassignable: false,
						flight: env.flight,
					},

					// Lookup wingsdk std types, hydrating generics if necessary
					Type::Array(t) => {
						let new_class = self.hydrate_class_type_arguments(env, WINGSDK_ARRAY, vec![t]);
						self.get_property_from_class(new_class.as_class().unwrap(), property)
					}
					Type::MutArray(t) => {
						let new_class = self.hydrate_class_type_arguments(env, WINGSDK_MUT_ARRAY, vec![t]);
						self.get_property_from_class(new_class.as_class().unwrap(), property)
					}
					Type::Set(t) => {
						let new_class = self.hydrate_class_type_arguments(env, WINGSDK_SET, vec![t]);
						self.get_property_from_class(new_class.as_class().unwrap(), property)
					}
					Type::MutSet(t) => {
						let new_class = self.hydrate_class_type_arguments(env, WINGSDK_MUT_SET, vec![t]);
						self.get_property_from_class(new_class.as_class().unwrap(), property)
					}
					Type::Map(t) => {
						let new_class = self.hydrate_class_type_arguments(env, WINGSDK_MAP, vec![t]);
						self.get_property_from_class(new_class.as_class().unwrap(), property)
					}
					Type::MutMap(t) => {
						let new_class = self.hydrate_class_type_arguments(env, WINGSDK_MUT_MAP, vec![t]);
						self.get_property_from_class(new_class.as_class().unwrap(), property)
					}
					Type::String => self.get_property_from_class(
						env
							.lookup_nested_str(WINGSDK_STRING, false, None)
							.unwrap()
							.as_type()
							.unwrap()
							.as_class()
							.unwrap(),
						property,
					),
					Type::Duration => self.get_property_from_class(
						env
							.lookup_nested_str(WINGSDK_DURATION, false, None)
							.unwrap()
							.as_type()
							.unwrap()
							.as_class()
							.unwrap(),
						property,
					),

					_ => VariableInfo {
						_type: self.expr_error(
							object,
							format!(
								"Expression must be a class or resource instance to access property \"{}\", instead found type \"{}\"",
								property.name, instance_type
							),
						),
						reassignable: false,
						flight: Phase::Independent,
					},
				};

				if force_reassignable {
					VariableInfo {
						_type: res._type,
						reassignable: true,
						flight: res.flight,
					}
				} else {
					res
				}
			}
		}
	}

	fn get_property_from_class(&mut self, class: &Class, property: &Symbol) -> VariableInfo {
		match class.env.lookup(property, None) {
			Ok(field) => field.as_variable().expect("Expected property to be a variable"),
			Err(type_error) => self.variable_error(&type_error),
		}
	}
}

fn can_call_flight(fn_flight: Phase, scope_flight: Phase) -> bool {
	if fn_flight == Phase::Independent {
		// if the function we're trying to call is an "either-flight" function,
		// then it can be called both in preflight, inflight, and in
		// either-flight scopes
		true
	} else {
		// otherwise, preflight functions can only be called in preflight scopes,
		// and inflight functions can only be called in inflight scopes
		fn_flight == scope_flight
	}
}

fn add_parent_members_to_struct_env(
	extends_types: &Vec<TypeRef>,
	name: &Symbol,
	struct_env: &mut SymbolEnv,
) -> Result<(), TypeError> {
	// Add members of all parents to the struct's environment
	for parent_type in extends_types.iter() {
		let parent_struct = if let Some(parent_struct) = parent_type.as_struct() {
			parent_struct
		} else {
			return Err(TypeError {
				message: format!(
					"Type \"{}\" extends \"{}\" which should be a struct",
					name.name, parent_type
				),
				span: name.span.clone(),
			});
		};
		// Add each member of current parent to the struct's environment (if it wasn't already added by a previous parent)
		for (parent_member_name, parent_member, _) in parent_struct.env.iter(true) {
			let member_type = parent_member
				.as_variable()
				.expect("Expected struct member to be a variable")
				._type;
			if let Some(existing_type) = struct_env.try_lookup(&parent_member_name, None) {
				// We compare types in both directions to make sure they are exactly the same type and not inheriting from each other
				// TODO: does this make sense? We should add an `is_a()` methdod to `Type` to check if a type is a subtype and use that
				//   when we want to check for subtypes and use equality for strict comparisons.
				let existing_type = existing_type
					.as_variable()
					.expect("Expected struct member to be a variable")
					._type;
				if !existing_type.is_same_type_as(&member_type) {
					return Err(TypeError {
						span: name.span.clone(),
						message: format!(
							"Struct \"{}\" extends \"{}\" but has a conflicting member \"{}\" ({} != {})",
							name, parent_type, parent_member_name, member_type, member_type
						),
					});
				}
			} else {
				struct_env.define(
					&Symbol {
						name: parent_member_name,
						span: name.span.clone(),
					},
					SymbolKind::make_variable(member_type, false, struct_env.flight),
					StatementIdx::Top,
				)?;
			}
		}
	}
	Ok(())
}

pub fn resolve_user_defined_type(
	user_defined_type: &UserDefinedType,
	env: &SymbolEnv,
	statement_idx: usize,
) -> Result<TypeRef, TypeError> {
	// Resolve all types down the fields list and return the last one (which is likely to be a real type and not a namespace)
	let mut nested_name = vec![&user_defined_type.root];
	nested_name.extend(user_defined_type.fields.iter().collect_vec());

	match env.lookup_nested(&nested_name, false, Some(statement_idx)) {
		Ok(_type) => {
			if let SymbolKind::Type(t) = *_type {
				Ok(t)
			} else {
				let symb = nested_name.last().unwrap();
				Err(TypeError {
					message: format!("Expected {} to be a type but it's a {}", symb, _type),
					span: symb.span.clone(),
				})
			}
		}
		Err(type_error) => Err(type_error),
	}
}

pub fn resolve_user_defined_type_by_fqn(
	user_defined_type_name: &str,
	env: &SymbolEnv,
	statement_idx: usize,
) -> Result<TypeRef, TypeError> {
	let mut fields = user_defined_type_name
		.split('.')
		.map(|s| Symbol::global(s))
		.collect_vec();
	let root = fields.remove(0);
	let user_defined_type = UserDefinedType { root, fields };
	resolve_user_defined_type(&user_defined_type, env, statement_idx)
}
