pub(crate) mod jsii_importer;
pub mod symbol_env;
use crate::ast::{self, ClassField, FunctionBodyRef, TypeAnnotationKind};
use crate::ast::{
	ArgList, BinaryOperator, Class as AstClass, Expr, ExprKind, FunctionBody, FunctionParameter,
	Interface as AstInterface, InterpolatedStringPart, Literal, MethodLike, Phase, Reference, Scope, Stmt, StmtKind,
	Symbol, ToSpan, TypeAnnotation, UnaryOperator, UserDefinedType,
};
use crate::diagnostic::{Diagnostic, DiagnosticLevel, Diagnostics, TypeError};
use crate::type_check_class_fields_init::VisitClassInit;
use crate::visit::Visit;
use crate::{
	debug, WINGSDK_ARRAY, WINGSDK_ASSEMBLY_NAME, WINGSDK_CLOUD_MODULE, WINGSDK_DURATION, WINGSDK_FS_MODULE, WINGSDK_JSON,
	WINGSDK_MAP, WINGSDK_MUT_ARRAY, WINGSDK_MUT_JSON, WINGSDK_MUT_MAP, WINGSDK_MUT_SET, WINGSDK_REDIS_MODULE,
	WINGSDK_RESOURCE, WINGSDK_SET, WINGSDK_STD_MODULE, WINGSDK_STRING,
};
use derivative::Derivative;
use indexmap::{IndexMap, IndexSet};
use itertools::{izip, Itertools};
use jsii_importer::JsiiImporter;
use std::cell::RefCell;
use std::collections::HashMap;
use std::fmt::{Debug, Display};
use std::iter::FilterMap;
use std::path::Path;
use symbol_env::{StatementIdx, SymbolEnv};
use wingii::fqn::FQN;
use wingii::type_system::TypeSystem;

use self::jsii_importer::JsiiImportSpec;
use self::symbol_env::SymbolEnvIter;

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
	pub type_: TypeRef,
	/// Can the variable be reassigned?
	pub reassignable: bool,
	/// The phase in which this variable exists
	pub phase: Phase,
	/// Is this a static or instance variable?
	pub is_static: bool,
}

impl SymbolKind {
	pub fn make_variable(type_: TypeRef, reassignable: bool, is_static: bool, phase: Phase) -> Self {
		SymbolKind::Variable(VariableInfo {
			type_,
			reassignable,
			phase,
			is_static,
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
			SymbolKind::Namespace(ns) => Some(*ns),
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
			SymbolKind::Type(t) => Some(*t),
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
	Json,
	MutJson,
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
	Interface(Interface),
	Struct(Struct),
	Enum(Enum),
}

pub const CLASS_INIT_NAME: &'static str = "init";
pub const CLASS_INFLIGHT_INIT_NAME: &'static str = "$inflight_init";

#[derive(Derivative)]
#[derivative(Debug)]
pub struct Namespace {
	pub name: String,

	#[derivative(Debug = "ignore")]
	pub env: SymbolEnv,
}

pub type NamespaceRef = UnsafeRef<Namespace>;

impl Debug for NamespaceRef {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{:?}", &**self)
	}
}

#[derive(Derivative)]
#[derivative(Debug)]
pub struct Class {
	pub name: Symbol,
	parent: Option<TypeRef>,  // Must be a Type::Class type
	implements: Vec<TypeRef>, // Must be a Type::Interface type
	#[derivative(Debug = "ignore")]
	pub env: SymbolEnv,
	pub should_case_convert_jsii: bool,
	pub fqn: Option<String>,
	pub is_abstract: bool,
	pub type_parameters: Option<Vec<TypeRef>>,
}

#[derive(Derivative)]
#[derivative(Debug)]
pub struct Interface {
	pub name: Symbol,
	extends: Vec<TypeRef>, // Must be a Type::Interface type
	#[derivative(Debug = "ignore")]
	pub env: SymbolEnv,
}

impl Interface {
	fn is_resource(&self) -> bool {
		// TODO: This should check that the interface extends `IResource` from
		// the SDK, not just any interface with the name `IResource`
		// https://github.com/winglang/wing/issues/2098
		self.name.name == "IResource"
			|| self.extends.iter().any(|i| {
				i.as_interface()
					.expect("Interface extends a type that isn't an interface")
					.name
					.name == "IResource"
			})
	}
}

impl Display for Interface {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		if let Some(method) = self.get_env().try_lookup("handle", None) {
			let method = method.as_variable().unwrap();
			if method.phase == Phase::Inflight {
				write!(f, "{} ({})", self.name.name, method.type_)
			} else {
				write!(f, "{}", self.name.name)
			}
		} else {
			write!(f, "{}", self.name.name)
		}
	}
}

type ClassLikeIterator<'a> =
	FilterMap<SymbolEnvIter<'a>, fn(<SymbolEnvIter as Iterator>::Item) -> Option<(String, TypeRef)>>;

pub trait ClassLike {
	fn get_env(&self) -> &SymbolEnv;

	fn methods(&self, with_ancestry: bool) -> ClassLikeIterator<'_> {
		self.get_env().iter(with_ancestry).filter_map(|(s, t, ..)| {
			t.as_variable()
				.unwrap()
				.type_
				.as_function_sig()
				.map(|_| (s.clone(), t.as_variable().unwrap().type_))
		})
	}

	fn fields(&self, with_ancestry: bool) -> ClassLikeIterator<'_> {
		self.get_env().iter(with_ancestry).filter_map(|(s, t, ..)| {
			if t.as_variable().unwrap().type_.as_function_sig().is_none() {
				Some((s, t.as_variable().unwrap().type_))
			} else {
				None
			}
		})
	}

	fn get_method(&self, name: &str) -> Option<VariableInfo> {
		let v = self
			.get_env()
			.try_lookup(name, None)?
			.as_variable()
			.expect("class env should only contain variables");
		v.type_.as_function_sig().map(|_| v.clone())
	}
}

impl ClassLike for Interface {
	fn get_env(&self) -> &SymbolEnv {
		&self.env
	}
}

impl ClassLike for Class {
	fn get_env(&self) -> &SymbolEnv {
		&self.env
	}
}

impl ClassLike for Struct {
	fn get_env(&self) -> &SymbolEnv {
		&self.env
	}
}

/// Intermediate struct for storing the evaluated types of arguments in a function call or constructor call.
pub struct ArgListTypes {
	pub pos_args: Vec<TypeRef>,
	pub named_args: IndexMap<Symbol, TypeRef>,
}

#[derive(Derivative)]
#[derivative(Debug)]
pub struct Struct {
	pub name: Symbol,
	extends: Vec<TypeRef>, // Must be a Type::Struct type
	#[derivative(Debug = "ignore")]
	pub env: SymbolEnv,
	pub should_case_convert_jsii: bool,
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
	///
	/// TODO: change return type to allow additional subtyping information to be
	/// returned, for better error messages when one type isn't the subtype of another.
	fn is_subtype_of(&self, other: &Self) -> bool;

	fn is_same_type_as(&self, other: &Self) -> bool {
		self.is_subtype_of(other) && other.is_subtype_of(self)
	}

	fn is_strict_subtype_of(&self, other: &Self) -> bool {
		self.is_subtype_of(other) && !other.is_subtype_of(self)
	}
}

impl Subtype for Phase {
	fn is_subtype_of(&self, other: &Self) -> bool {
		// We model phase subtyping as if the independent phase is an
		// intersection type of preflight and inflight. This means that
		// independent = preflight & inflight.
		//
		// This means the following pseudocode is valid:
		// > let x: preflight fn = <phase-independent function>;
		// (a phase-independent function is a subtype of a preflight function)
		//
		// But the following pseudocode is not valid:
		// > let x: independent fn = <preflight function>;
		// (a preflight function is not a subtype of an inflight function)
		if self == &Phase::Independent {
			true
		} else {
			self == other
		}
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
			(Self::Function(l0), Self::Interface(r0)) => {
				// TODO: Hack to make functions compatible with interfaces
				// Remove this after https://github.com/winglang/wing/issues/1448

				// First check that the function is in the inflight phase
				if l0.phase != Phase::Inflight {
					return false;
				}

				// Next, compare the function to a method on the interface named "handle" if it exists
				if let Some(method) = r0.get_env().try_lookup("handle", None) {
					let method = method.as_variable().unwrap();
					if method.phase != Phase::Inflight {
						return false;
					}

					return self.is_subtype_of(&*method.type_);
				}

				false
			}
			(Self::Function(l0), Self::Function(r0)) => {
				if !l0.phase.is_subtype_of(&r0.phase) {
					return false;
				}

				// If the return types are not subtypes of each other, then this is not a subtype
				// exception: if function type we are assigning to returns void, then any return type is ok
				if !l0.return_type.is_subtype_of(&r0.return_type) && !(r0.return_type.is_void()) {
					return false;
				}

				// In this section, we check if the parameter types are not subtypes of each other, then this is not a subtype.

				// Check that this function has at most as many required parameters as the other function requires
				// if it doesn't, we know it's not a subtype
				if l0.min_parameters() > r0.min_parameters() {
					return false;
				}

				let lparams = l0.parameters.iter();
				let rparams = r0.parameters.iter();

				for (l, r) in lparams.zip(rparams) {
					// parameter types are contravariant, which means even if Cat is a subtype of Animal,
					// (Cat) => void is not a subtype of (Animal) => void
					// but (Animal) => void is a subtype of (Cat) => void
					// see https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)
					if !r.is_subtype_of(l) {
						return false;
					}
				}
				true
			}
			(Self::Class(l0), Self::Class(_)) => {
				// If we extend from `other` then I'm a subtype of it (inheritance)
				if let Some(parent) = l0.parent.as_ref() {
					let parent_type: &Type = parent;
					return parent_type.is_subtype_of(other);
				}
				false
			}
			(Self::Resource(l0), Self::Resource(_)) => {
				// If we extend from `other` then I'm a subtype of it (inheritance)
				if let Some(parent) = l0.parent.as_ref() {
					let parent_type: &Type = parent;
					return parent_type.is_subtype_of(other);
				}
				false
			}
			(Self::Interface(l0), Self::Interface(_)) => {
				// If we extend from `other` then I'm a subtype of it (inheritance)
				l0.extends.iter().any(|parent| {
					let parent_type: &Type = parent;
					parent_type.is_subtype_of(other)
				})
			}
			(Self::Resource(res), Self::Interface(_)) => {
				// If a resource implements the interface then it's a subtype of it (nominal typing)
				res.implements.iter().any(|parent| {
					let parent_type: &Type = parent;
					parent_type.is_subtype_of(other)
				})
			}
			(_, Self::Interface(_)) => {
				// TODO - for now only resources can implement interfaces
				// https://github.com/winglang/wing/issues/2111
				false
			}
			(Self::Struct(l0), Self::Struct(_)) => {
				// If we extend from `other` then I'm a subtype of it (inheritance)
				for parent in l0.extends.iter() {
					let parent_type: &Type = parent;
					if parent_type.is_subtype_of(other) {
						return true;
					}
				}
				false
			}
			(Self::Array(l0), Self::Array(r0)) => {
				// An Array type is a subtype of another Array type if the value type is a subtype of the other value type
				let l: &Type = l0;
				let r: &Type = r0;
				l.is_subtype_of(r)
			}
			(Self::MutArray(l0), Self::MutArray(r0)) => {
				// An Array type is a subtype of another Array type if the value type is a subtype of the other value type
				let l: &Type = l0;
				let r: &Type = r0;
				l.is_subtype_of(r)
			}
			(Self::Map(l0), Self::Map(r0)) => {
				// A Map type is a subtype of another Map type if the value type is a subtype of the other value type
				let l: &Type = l0;
				let r: &Type = r0;
				l.is_subtype_of(r)
			}
			(Self::MutMap(l0), Self::MutMap(r0)) => {
				// A Map type is a subtype of another Map type if the value type is a subtype of the other value type
				let l: &Type = l0;
				let r: &Type = r0;
				l.is_subtype_of(r)
			}
			(Self::Set(l0), Self::Set(r0)) => {
				// A Set type is a subtype of another Set type if the value type is a subtype of the other value type
				let l: &Type = l0;
				let r: &Type = r0;
				l.is_subtype_of(r)
			}
			(Self::MutSet(l0), Self::MutSet(r0)) => {
				// A Set type is a subtype of another Set type if the value type is a subtype of the other value type
				let l: &Type = l0;
				let r: &Type = r0;
				l.is_subtype_of(r)
			}
			(Self::Enum(e0), Self::Enum(e1)) => {
				// An enum type is a subtype of another Enum type only if they are the exact same
				e0.name == e1.name
			}
			(Self::Optional(l0), Self::Optional(r0)) => {
				// An Optional type is a subtype of another Optional type if the value type is a subtype of the other value type
				let l: &Type = l0;
				let r: &Type = r0;
				l.is_subtype_of(r)
			}
			(_, Self::Optional(r0)) => {
				// A non-Optional type is a subtype of an Optional type if the non-optional's type is a subtype of the value type
				// e.g. `String` is a subtype of `Optional<String>`
				let r: &Type = r0;
				self.is_subtype_of(r)
			}
			// This allows us for assignment from native types without allowing assignment to native types
			// e.g. assert("hello" == x.world) but NOT assert(x.world == "hello")
			(_, Self::Json) | (_, Self::MutJson) => true,
			(Self::Number, Self::Number) => true,
			(Self::String, Self::String) => true,
			(Self::Boolean, Self::Boolean) => true,
			(Self::Duration, Self::Duration) => true,
			(Self::Void, Self::Void) => true,
			_ => false,
		}
	}
}

#[derive(Clone, Debug)]
pub struct FunctionSignature {
	/// The type of "this" inside the function, if any. This should be None for
	/// static or anonymous functions.
	pub this_type: Option<TypeRef>,
	pub parameters: Vec<TypeRef>,
	pub return_type: TypeRef,
	pub phase: Phase,

	/// During jsify, calls to this function will be replaced with this string
	/// In JSII imports, this is denoted by the `@macro` attribute
	/// This string may contain special tokens:
	/// - `$self$`: The expression on which this function was called
	/// - `$args$`: the arguments passed to this function call
	pub js_override: Option<String>,
}

impl FunctionSignature {
	/// Returns the minimum number of parameters that need to be passed to this function.
	fn min_parameters(&self) -> usize {
		// Count number of optional parameters from the end of the constructor's params
		// Allow arg_list to be missing up to that number of option (or any) values to try and make the number of arguments match
		let num_optionals = self
			.parameters
			.iter()
			.rev()
			// TODO - as a hack we treat `anything` arguments like optionals so that () => {} can be a subtype of (any) => {}
			.take_while(|arg| arg.is_option() || arg.is_struct() || arg.is_anything())
			.count();

		self.parameters.len() - num_optionals
	}

	/// Returns the maximum number of parameters that can be passed to this function.
	///
	/// TODO: how to represent unlimited parameters in the case of variadics?
	/// https://github.com/winglang/wing/issues/125
	fn max_parameters(&self) -> usize {
		self.parameters.len()
	}
}

impl PartialEq for FunctionSignature {
	fn eq(&self, other: &Self) -> bool {
		self
			.parameters
			.iter()
			.zip(other.parameters.iter())
			.all(|(x, y)| x.is_same_type_as(y))
			&& self.return_type.is_same_type_as(&other.return_type)
			&& self.phase == other.phase
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
			Type::Json => write!(f, "Json"),
			Type::MutJson => write!(f, "MutJson"),
			Type::Optional(v) => write!(f, "{}?", v),
			Type::Function(sig) => write!(f, "{}", sig),
			Type::Class(class) => write!(f, "{}", class.name.name),
			Type::Resource(class) => write!(f, "{}", class.name.name),
			Type::Interface(iface) => write!(f, "{}", iface),
			Type::Struct(s) => write!(f, "{}", s.name.name),
			Type::Array(v) => write!(f, "Array<{}>", v),
			Type::MutArray(v) => write!(f, "MutArray<{}>", v),
			Type::Map(v) => write!(f, "Map<{}>", v),
			Type::MutMap(v) => write!(f, "MutMap<{}>", v),
			Type::Set(v) => write!(f, "Set<{}>", v),
			Type::MutSet(v) => write!(f, "MutSet<{}>", v),
			Type::Enum(s) => write!(f, "{}", s.name.name),
		}
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

	pub fn as_struct(&self) -> Option<&Struct> {
		if let Type::Struct(ref s) = **self {
			Some(s)
		} else {
			None
		}
	}

	pub fn as_interface(&self) -> Option<&Interface> {
		if let Type::Interface(ref iface) = **self {
			Some(iface)
		} else {
			None
		}
	}
	fn as_mut_interface(&mut self) -> Option<&mut Interface> {
		if let Type::Interface(ref mut iface) = **self {
			Some(iface)
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

	pub fn as_mut_function_sig(&mut self) -> Option<&mut FunctionSignature> {
		if let Type::Function(ref mut sig) = **self {
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

	pub fn is_struct(&self) -> bool {
		if let Type::Struct(_) = **self {
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

	/// Returns the item type of a collection type, or None if the type is not a collection.
	pub fn collection_item_type(&self) -> Option<TypeRef> {
		match **self {
			Type::Array(t) => Some(t),
			Type::MutArray(t) => Some(t),
			Type::Map(t) => Some(t),
			Type::MutMap(t) => Some(t),
			Type::Set(t) => Some(t),
			Type::MutSet(t) => Some(t),
			_ => None,
		}
	}

	pub fn is_mutable_collection(&self) -> bool {
		if let Type::MutArray(_) | Type::MutSet(_) | Type::MutMap(_) = **self {
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

	pub fn is_iterable(&self) -> bool {
		if let Type::Array(_) | Type::Set(_) | Type::MutArray(_) | Type::MutSet(_) = **self {
			true
		} else {
			false
		}
	}

	pub fn is_capturable(&self) -> bool {
		match &**self {
			Type::Resource(_) => true,
			Type::Interface(iface) => iface.is_resource(),
			Type::Enum(_) => true,
			Type::Number => true,
			Type::String => true,
			Type::Duration => true,
			Type::Boolean => true,
			Type::Json => true,
			Type::Array(v) => v.is_capturable(),
			Type::Map(v) => v.is_capturable(),
			Type::Set(v) => v.is_capturable(),
			Type::Struct(_) => true,
			Type::Optional(v) => v.is_capturable(),
			Type::Anything => false,
			Type::Void => false,
			Type::MutJson => false,
			Type::MutArray(_) => false,
			Type::MutMap(_) => false,
			Type::MutSet(_) => false,
			Type::Function(_) => false, // TODO: https://github.com/winglang/wing/issues/2236
			Type::Class(_) => false,
		}
	}

	// returns true if mutable type or if immutable container type contains a mutable type
	pub fn is_mutable(&self) -> bool {
		match &**self {
			Type::MutArray(_) => true,
			Type::MutMap(_) => true,
			Type::MutSet(_) => true,
			Type::MutJson => true,
			Type::Array(v) => v.is_mutable(),
			Type::Map(v) => v.is_mutable(),
			Type::Set(v) => v.is_mutable(),
			Type::Optional(v) => v.is_mutable(),
			_ => false,
		}
	}

	pub fn is_json_legal_value(&self) -> bool {
		match **self {
			Type::Number => true,
			Type::String => true,
			Type::Boolean => true,
			Type::Json => true,
			Type::Array(v) => v.is_json_legal_value(),
			Type::Map(v) => v.is_json_legal_value(),
			Type::Set(v) => v.is_json_legal_value(),
			_ => false,
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
			let t1: &Type = self;
			let t2: &Type = other;
			t1.is_subtype_of(t2)
		}
	}
}

impl Debug for TypeRef {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{:?}", &**self)
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
	json_idx: usize,
	mut_json_idx: usize,

	resource_base_type: Option<TypeRef>,
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
		types.push(Box::new(Type::Json));
		let json_idx = types.len() - 1;
		types.push(Box::new(Type::MutJson));
		let mut_json_idx = types.len() - 1;

		// TODO: this is hack to create the top-level mapping from lib names to symbols
		// We construct a void ref by hand since we can't call self.void() while constructing the Types struct
		let void_ref = UnsafeRef::<Type>(&*types[void_idx] as *const Type);
		let libraries = SymbolEnv::new(None, void_ref, false, Phase::Preflight, 0);

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
			json_idx,
			mut_json_idx,
			resource_base_type: None,
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

	pub fn json(&self) -> TypeRef {
		self.get_typeref(self.json_idx)
	}

	pub fn mut_json(&self) -> TypeRef {
		self.get_typeref(self.mut_json_idx)
	}

	pub fn stringables(&self) -> Vec<TypeRef> {
		// TODO: This should be more complex and return all types that have some stringification facility
		// see: https://github.com/winglang/wing/issues/741
		vec![
			self.string(),
			self.number(),
			self.json(),
			self.mut_json(),
			self.anything(),
		]
	}

	pub fn add_namespace(&mut self, n: Namespace) -> NamespaceRef {
		self.namespaces.push(Box::new(n));
		self.get_namespaceref(self.namespaces.len() - 1)
	}

	fn get_namespaceref(&self, idx: usize) -> NamespaceRef {
		let t = &self.namespaces[idx];
		UnsafeRef::<Namespace>(&**t as *const Namespace)
	}

	fn resource_base_type(&mut self) -> TypeRef {
		// cache the resource base type ref
		if self.resource_base_type.is_none() {
			let resource_fqn = format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE);
			self.resource_base_type = Some(
				self
					.libraries
					.lookup_nested_str(&resource_fqn, None)
					.unwrap()
					.as_type()
					.unwrap(),
			);
		}

		self.resource_base_type.unwrap()
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

	/// JSII Manifest descriptions to be imported.
	/// May be reused between compilations
	jsii_imports: Vec<JsiiImportSpec>,

	/// The JSII type system
	jsii_types: &'a mut TypeSystem,

	pub diagnostics: RefCell<Diagnostics>,

	// Nesting level within JSON literals, a value larger than 0 means we're currently in a JSON literal
	in_json: u64,

	/// Index of the current statement being type checked within the current scope
	statement_idx: usize,
}

impl<'a> TypeChecker<'a> {
	pub fn new(types: &'a mut Types, source_path: &'a Path, jsii_types: &'a mut TypeSystem) -> Self {
		Self {
			types,
			inner_scopes: vec![],
			jsii_types,
			source_path,
			diagnostics: RefCell::new(Diagnostics::new()),
			jsii_imports: vec![],
			in_json: 0,
			statement_idx: 0,
		}
	}

	pub fn add_globals(&mut self, scope: &Scope) {
		self.add_module_to_env(
			scope.env.borrow_mut().as_mut().unwrap(),
			WINGSDK_ASSEMBLY_NAME.to_string(),
			vec![WINGSDK_STD_MODULE.to_string()],
			&Symbol::global(WINGSDK_STD_MODULE),
			None,
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

	fn resolve_static_error(&self, property: &Symbol, message: String) -> VariableInfo {
		self.diagnostics.borrow_mut().push(Diagnostic {
			level: DiagnosticLevel::Error,
			message,
			span: Some(property.span.clone()),
		});
		VariableInfo {
			type_: self.types.anything(),
			reassignable: false,
			phase: Phase::Independent,
			is_static: true,
		}
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

	fn type_error(&self, type_error: TypeError) -> TypeRef {
		let TypeError { message, span } = type_error;
		self.diagnostics.borrow_mut().push(Diagnostic {
			level: DiagnosticLevel::Error,
			message,
			span: Some(span),
		});

		self.types.anything()
	}

	fn variable_error(&self, type_error: TypeError) -> VariableInfo {
		let TypeError { message, span } = type_error;
		self.diagnostics.borrow_mut().push(Diagnostic {
			level: DiagnosticLevel::Error,
			message,
			span: Some(span),
		});

		VariableInfo {
			type_: self.types.anything(),
			reassignable: false,
			phase: Phase::Independent,
			is_static: false,
		}
	}

	pub fn get_primitive_type_by_name(&self, name: &str) -> TypeRef {
		match name {
			"number" => self.types.number(),
			"string" => self.types.string(),
			"bool" => self.types.bool(),
			"duration" => self.types.duration(),
			"Json" => self.types.json(),
			"MutJson" => self.types.mut_json(),
			other => self.general_type_error(format!("Type \"{}\" is not a primitive type", other)),
		}
	}

	// Validates types in the expression make sense and returns the expression's inferred type
	fn type_check_exp(&mut self, exp: &Expr, env: &SymbolEnv) -> TypeRef {
		let t = self.type_check_exp_helper(&exp, env);
		exp.evaluated_type.replace(Some(t));
		t
	}

	/// Helper function for type_check_exp. This is needed because we want to be able to `return`
	/// and break early, while still setting the evaluated type on the expression.
	///
	/// Do not use this function directly, use `type_check_exp` instead.
	fn type_check_exp_helper(&mut self, exp: &Expr, env: &SymbolEnv) -> TypeRef {
		match &exp.kind {
			ExprKind::Literal(lit) => match lit {
				Literal::String(_) => self.types.string(),
				Literal::InterpolatedString(s) => {
					s.parts.iter().for_each(|part| {
						if let InterpolatedStringPart::Expr(interpolated_expr) = part {
							let exp_type = self.type_check_exp(interpolated_expr, env);
							self.validate_type_in(exp_type, &self.types.stringables(), interpolated_expr);
						}
					});
					self.types.string()
				}
				Literal::Number(_) => self.types.number(),
				Literal::Duration(_) => self.types.duration(),
				Literal::Boolean(_) => self.types.bool(),
			},
			ExprKind::Binary { op, left, right } => {
				let ltype = self.type_check_exp(left, env);
				let rtype = self.type_check_exp(right, env);

				match op {
					BinaryOperator::LogicalAnd | BinaryOperator::LogicalOr => {
						self.validate_type(ltype, self.types.bool(), left);
						self.validate_type(rtype, self.types.bool(), right);
						self.types.bool()
					}
					BinaryOperator::AddOrConcat => {
						if ltype.is_subtype_of(&self.types.number()) && rtype.is_subtype_of(&self.types.number()) {
							self.types.number()
						} else if ltype.is_subtype_of(&self.types.string()) && rtype.is_subtype_of(&self.types.string()) {
							self.types.string()
						} else {
							self.diagnostics.borrow_mut().push(Diagnostic {
								message: format!(
									"Binary operator '+' cannot be applied to operands of type '{}' and '{}'; only ({}, {}) and ({}, {}) are supported",
									ltype, rtype, self.types.number(), self.types.number(), self.types.string(), self.types.string(),
								),
								span: Some(exp.span()),
								level: DiagnosticLevel::Error,
							});
							self.types.anything() // TODO: return error type
						}
					}
					BinaryOperator::Sub
					| BinaryOperator::Mul
					| BinaryOperator::Div
					| BinaryOperator::FloorDiv
					| BinaryOperator::Mod
					| BinaryOperator::Power => {
						self.validate_type(ltype, self.types.number(), left);
						self.validate_type(rtype, self.types.number(), right);
						self.types.number()
					}
					BinaryOperator::Equal | BinaryOperator::NotEqual => {
						self.validate_type(rtype, ltype, exp);
						self.types.bool()
					}
					BinaryOperator::Less
					| BinaryOperator::LessOrEqual
					| BinaryOperator::Greater
					| BinaryOperator::GreaterOrEqual => {
						self.validate_type(ltype, self.types.number(), left);
						self.validate_type(rtype, self.types.number(), right);
						self.types.bool()
					}
					BinaryOperator::UnwrapOr => {
						// Left argument must be an optional type
						if !ltype.is_option() {
							self.expr_error(left, format!("Expected optional type, found \"{}\"", ltype));
							ltype
						} else {
							// Right argument must be a subtype of the inner type of the left argument
							let inner_type = ltype.maybe_unwrap_option();
							self.validate_type(rtype, inner_type, right);
							inner_type
						}
					}
				}
			}
			ExprKind::Unary { op, exp: unary_exp } => {
				let type_ = self.type_check_exp(unary_exp, env);

				match op {
					UnaryOperator::Not => self.validate_type(type_, self.types.bool(), unary_exp),
					UnaryOperator::Minus => self.validate_type(type_, self.types.number(), unary_exp),
					UnaryOperator::OptionalTest => {
						if !type_.is_option() {
							self.expr_error(unary_exp, format!("Expected optional type, found \"{}\"", type_));
						}
						self.types.bool()
					}
				}
			}
			ExprKind::Range {
				start,
				inclusive: _,
				end,
			} => {
				let stype = self.type_check_exp(start, env);
				let etype = self.type_check_exp(end, env);

				self.validate_type(stype, self.types.number(), start);
				self.validate_type(etype, self.types.number(), end);
				self.types.add_type(Type::Array(stype))
			}
			ExprKind::Reference(_ref) => self.resolve_reference(_ref, env).type_,
			ExprKind::New {
				class,
				obj_id: _, // TODO
				arg_list,
				obj_scope, // TODO
			} => {
				// TODO: obj_id, obj_scope ignored, should use it once we support Type::Resource and then remove it from Classes (fail if a class has an id if grammar doesn't handle this for us)

				// Type check the arguments
				let arg_list_types = self.type_check_arg_list(arg_list, env);

				// Lookup the class's type in the env
				let type_ = self.resolve_type_annotation(class, env);
				let (class_env, class_symbol) = match &*type_ {
					Type::Class(ref class) => (&class.env, &class.name),
					Type::Resource(ref class) => {
						if matches!(env.phase, Phase::Preflight) {
							(&class.env, &class.name)
						} else {
							return self.general_type_error(format!(
								"Cannot create preflight class \"{}\" in inflight phase",
								class.name
							));
						}
					}
					t => {
						if matches!(t, Type::Anything) {
							return self.types.anything();
						} else {
							return self.general_type_error(format!(
								"Cannot instantiate type \"{}\" because it is not a class",
								type_
							));
						}
					}
				};

				// Type check args against constructor
				let constructor_type = match class_env.lookup(
					&Symbol {
						name: CLASS_INIT_NAME.into(),
						span: class_symbol.span.clone(),
					},
					None,
				) {
					Ok(v) => v.as_variable().expect("Expected constructor to be a variable").type_,
					Err(type_error) => {
						self.type_error(type_error);
						return self.types.anything();
					}
				};
				let constructor_sig = constructor_type
					.as_function_sig()
					.expect("Expected constructor to be a function signature");

				// Verify return type (This should never fail since we define the constructors return type during AST building)
				self.validate_type(constructor_sig.return_type, type_, exp);

				// Verify arity
				let pos_args_count = arg_list.pos_args.len();
				let min_args = constructor_sig.min_parameters();
				if pos_args_count < min_args {
					let err_text = format!(
							"Expected {} positional argument(s) but got {}",
							min_args, pos_args_count
						);
					return self.expr_error(exp, err_text);
				}

				if !arg_list.named_args.is_empty() {
					let last_arg = match constructor_sig.parameters.last() {
						Some(arg) => arg.maybe_unwrap_option(),
						None => {
							return self.expr_error(exp, format!("Expected 0 named argument(s)"
							));
						},
					};
					
					if !last_arg.is_struct() {
						return self.expr_error(exp, format!("class {} does not expect any named argument", class_symbol.name));
					}

					self.validate_structural_type(&arg_list.named_args, &arg_list_types.named_args, &last_arg, exp);
				}

				let arg_count = arg_list.pos_args.len() + (if arg_list.named_args.is_empty() { 0 } else { 1 });
				let max_args = constructor_sig.max_parameters();
				if arg_count < min_args || arg_count > max_args {
					let err_text = if min_args == max_args {
						format!(
							"Expected {} arguments but got {}",
							min_args, arg_count
						)
					} else {
						format!(
							"Expected between {} and {} arguments but got {}",
							min_args, max_args, arg_count
						)
					};
					self.expr_error(exp, err_text);
				}

				// Verify passed positional arguments match the constructor
				for (arg_expr, arg_type, param_type) in izip!(
					arg_list.pos_args.iter(),
					arg_list_types.pos_args.iter(),
					constructor_sig.parameters.iter()
				) {
					self.validate_type(*arg_type, *param_type, arg_expr);
				}

				// If this is a Resource then create a new type for this resource object
				if type_.as_resource().is_some() {
					// Get reference to resource object's scope
					let obj_scope_type = if let Some(obj_scope) = obj_scope {
						Some(self.type_check_exp(obj_scope, env))
					} else {
						// If this returns None, this means we're instantiating a preflight object in the global scope, which is valid
						env
							.try_lookup("this", Some(self.statement_idx))
							.map(|v| v.as_variable().expect("Expected \"this\" to be a variable").type_)
					};

					// Verify the object scope is an actually resource
					if let Some(obj_scope_type) = obj_scope_type {
						if obj_scope_type.as_resource().is_none() {
							self.expr_error(
								exp,
								format!(
									"Expected scope to be a preflight object, instead found \"{}\"",
									obj_scope_type
								),
							);
						}
					}

					// TODO: make sure there's no existing object with this scope/id, fail if there is! -> this can only be done in synth because I can't evaluate the scope expression here.. handle this somehow with source mapping
				}
				type_
			}
			ExprKind::Call { function, arg_list } => {
				// Resolve the function's reference (either a method in the class's env or a function in the current env)
				let func_type = self.type_check_exp(function, env);

				let arg_list_types = self.type_check_arg_list(arg_list, env);

				// TODO: hack to support methods of stdlib object we don't know their types yet (basically stuff like cloud.Bucket().upload())
				if matches!(*func_type, Type::Anything) {
					return self.types.anything();
				}

				// Make sure this is a function signature type
				let func_sig = if let Some(func_sig) = func_type.as_function_sig() {
					func_sig
				} else {
					return self.expr_error(function, "should be a function or method".to_string());
				};

				if !env.phase.can_call_to(&func_sig.phase) {
					self.expr_error(
						exp,
						format!("Cannot call into {} phase while {}", func_sig.phase, env.phase),
					);
				}

				// Verify arity
				let pos_args_count = arg_list.pos_args.len();
				let min_args = func_sig.min_parameters();
				if pos_args_count < min_args {
					let err_text = format!(
							"Expected {} positional argument(s) but got {}",
							min_args, pos_args_count
						);
					return self.expr_error(exp, err_text);
				}

				if !arg_list.named_args.is_empty() {
					let last_arg = match func_sig.parameters.last() {
						Some(arg) => arg.maybe_unwrap_option(),
						None => {
							return self.expr_error(exp, format!("Expected 0 named arguments for func at {}", exp.span().to_string()
							));
						},
					};

					if !last_arg.is_struct() {
						return self.expr_error(exp, format!("No named arguments expected"));
					}

					self.validate_structural_type(&arg_list.named_args, &arg_list_types.named_args, &last_arg, exp);
				}

				// Count number of optional parameters from the end of the function's params
				// Allow arg_list to be missing up to that number of nil values to try and make the number of arguments match
				let num_optionals = func_sig
					.parameters
					.iter()
					.rev()
					.take_while(|arg| arg.is_option())
					.count();

				// Verify arity
				let arg_count = arg_list.pos_args.len() + (if arg_list.named_args.is_empty() { 0 } else { 1 });
				let min_args = func_sig.parameters.len() - num_optionals;
				let max_args = func_sig.parameters.len();
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
					.take(func_sig.parameters.len() - num_optionals);

				// Verify passed positional arguments match the function's parameter types
				for (arg_expr, arg_type, param_type) in izip!(arg_list.pos_args.iter(), arg_list_types.pos_args.iter(), params)
				{
					self.validate_type(*arg_type, *param_type, arg_expr);
				}

				func_sig.return_type
			}
			ExprKind::ArrayLiteral { type_, items } => {
				// Infer type based on either the explicit type or the value in one of the items
				let container_type = if let Some(type_) = type_ {
					self.resolve_type_annotation(type_, env)
				} else if !items.is_empty() {
					let some_val_type = self.type_check_exp(items.iter().next().unwrap(), env);
					self.types.add_type(Type::Array(some_val_type))
				} else {
					if self.in_json > 0 {
						self.types.add_type(Type::Array(self.types.json()))
					} else {
						self.expr_error(exp, "Cannot infer type of empty array".to_owned());
						self.types.add_type(Type::Array(self.types.anything()))
					}
				};

				let element_type = match *container_type {
					Type::Array(t) => t,
					Type::MutArray(t) => t,
					_ => self.expr_error(exp, format!("Expected \"Array\" type, found \"{}\"", container_type)),
				};

				// Verify all types are the same as the inferred type
				for v in items.iter() {
					let t = self.type_check_exp(v, env);
					self.check_json_serializable_or_validate_type(t, element_type, v);
				}

				container_type
			}
			ExprKind::StructLiteral { type_, fields } => {
				// Find this struct's type in the environment
				let struct_type = self.resolve_type_annotation(type_, env);

				// Type check each of the struct's fields
				let field_types: IndexMap<Symbol, TypeRef> = fields
					.iter()
					.map(|(name, exp)| {
						let t = self.type_check_exp(exp, env);
						(name.clone(), t)
					})
					.collect();

				// If the struct type is anything, we don't need to validate the fields
				if struct_type.is_anything() {
					return struct_type;
				}

				// Make sure it really is a struct type
				let st = struct_type
					.as_struct()
					.expect(&format!("Expected \"{}\" to be a struct type", struct_type));

				// Verify that all expected fields are present and are the right type
				for (name, kind, _info) in st.env.iter(true) {
					let field_type = kind
						.as_variable()
						.expect("Expected struct field to be a variable in the struct env")
						.type_;
					match fields.get(name.as_str()) {
						Some(field_exp) => {
							let t = field_types.get(name.as_str()).unwrap();
							self.validate_type(*t, field_type, field_exp);
						}
						None => {
							if !field_type.is_option() {
								self.expr_error(exp, format!("\"{}\" is not initialized", name));
							}
						}
					}
				}

				// Verify that no unexpected fields are present
				for (name, _t) in field_types.iter() {
					if st.env.lookup(&name, Some(self.statement_idx)).is_err() {
						self.expr_error(exp, format!("\"{}\" is not a field of \"{}\"", name.name, st.name.name));
					}
				}

				struct_type
			}
			ExprKind::JsonLiteral { is_mut, element } => {
				self.in_json += 1;
				self.type_check_exp(&element, env);
				self.in_json -= 1;
				if *is_mut {
					self.types.mut_json()
				} else {
					self.types.json()
				}
			}
			ExprKind::MapLiteral { fields, type_ } => {
				// Infer type based on either the explicit type or the value in one of the fields
				let container_type = if let Some(type_) = type_ {
					self.resolve_type_annotation(type_, env)
				} else if !fields.is_empty() {
					let some_val_type = self.type_check_exp(fields.iter().next().unwrap().1, env);
					self.types.add_type(Type::Map(some_val_type))
				} else {
					if self.in_json > 0 {
						self.types.add_type(Type::Map(self.types.json()))
					} else {
						self.expr_error(exp, "Cannot infer type of empty map".to_owned());
						self.types.add_type(Type::Map(self.types.anything()))
					}
				};

				let value_type = match *container_type {
					Type::Map(t) => t,
					Type::MutMap(t) => t,
					_ => self.expr_error(exp, format!("Expected \"Map\" type, found \"{}\"", container_type)),
				};

				// Verify all types are the same as the inferred type
				for (_, v) in fields.iter() {
					let t = self.type_check_exp(v, env);
					self.check_json_serializable_or_validate_type(t, value_type, v);
				}

				container_type
			}
			ExprKind::SetLiteral { type_, items } => {
				// Infer type based on either the explicit type or the value in one of the items
				let container_type = if let Some(type_) = type_ {
					self.resolve_type_annotation(type_, env)
				} else if !items.is_empty() {
					let some_val_type = self.type_check_exp(items.iter().next().unwrap(), env);
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
					let t = self.type_check_exp(v, env);
					self.validate_type(t, element_type, v);
				}

				container_type
			}
			ExprKind::FunctionClosure(func_def) => self.type_check_closure(func_def, env),
		}
	}

	fn type_check_closure(&mut self, func_def: &ast::FunctionDefinition, env: &SymbolEnv) -> UnsafeRef<Type> {
		// TODO: make sure this function returns on all control paths when there's a return type (can be done by recursively traversing the statements and making sure there's a "return" statements in all control paths)
		// https://github.com/winglang/wing/issues/457
		// Create a type_checker function signature from the AST function definition
		let function_type = self.resolve_type_annotation(&func_def.signature.to_type_annotation(), env);
		let sig = function_type.as_function_sig().unwrap();

		// Create an environment for the function
		let mut function_env = SymbolEnv::new(
			Some(env.get_ref()),
			sig.return_type,
			false,
			func_def.signature.phase,
			self.statement_idx,
		);
		self.add_arguments_to_env(&func_def.signature.parameters, &sig, &mut function_env);

		// Type check the function body
		if let FunctionBody::Statements(scope) = &func_def.body {
			scope.set_env(function_env);

			self.inner_scopes.push(scope);

			function_type
		} else {
			function_type
		}
	}

	/// Validate that a given map can be assigned to a variable of given struct type
	fn validate_structural_type(
		&mut self,
		object: &IndexMap<Symbol, Expr>,
		object_types: &IndexMap<Symbol, TypeRef>,
		expected_type: &TypeRef,
		value: &Expr,
	) {
		let expected_struct = if let Some(expected_struct) = expected_type.as_struct() {
			expected_struct
		} else {
			self.expr_error(value, "Named arguments provided for non-struct argument".to_string());
			return;
		};

		// Verify that there are no extraneous fields
		// Also map original field names to the ones in the struct type
		let mut field_map = IndexMap::new();
		for (k, _) in object_types.iter() {
			let field = expected_struct.env.try_lookup(&k.name, None);
			if let Some(field) = field {
				let field_type = field
					.as_variable()
					.expect("Expected struct field to be a variable in the struct env")
					.type_;
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
					.type_,
			)
		}) {
			if let Some((symb, expected_field_type)) = field_map.get(&k) {
				let provided_exp = object.get(*symb).unwrap();
				let t = object_types.get(*symb).unwrap();
				self.validate_type(*t, *expected_field_type, provided_exp);
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

	fn check_json_serializable_or_validate_type(
		&mut self,
		actual_type: TypeRef,
		expected_type: TypeRef,
		exp: &Expr,
	) -> TypeRef {
		// Skip validate if in Json
		if self.in_json == 0 {
			return self.validate_type(actual_type, expected_type, exp);
		}

		if !actual_type.is_json_legal_value() {
			return self.expr_error(
				exp,
				format!(
					"Expected \"Json\" elements to be Json Value (https://www.json.org/json-en.html), but got \"{}\" which is not Json Value",
					actual_type
				),
			);
		}

		actual_type
	}

	/// Validate that the given type is a subtype (or same) as the expected type. If not, add an error
	/// to the diagnostics.
	/// Returns the given type on success, otherwise returns the expected type.
	fn validate_type(&mut self, actual_type: TypeRef, expected_type: TypeRef, span: &impl ToSpan) -> TypeRef {
		self.validate_type_in(actual_type, &[expected_type], span)
	}

	/// Validate that the given type is a subtype (or same) as the one of the expected types. If not, add
	/// an error to the diagnostics.
	/// Returns the given type on success, otherwise returns one of the expected types.
	fn validate_type_in(&mut self, actual_type: TypeRef, expected_types: &[TypeRef], span: &impl ToSpan) -> TypeRef {
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
				span: Some(span.span()),
				level: DiagnosticLevel::Error,
			});
			expected_types[0]
		} else {
			actual_type
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

	fn resolve_type_annotation(&mut self, annotation: &TypeAnnotation, env: &SymbolEnv) -> TypeRef {
		match &annotation.kind {
			TypeAnnotationKind::Number => self.types.number(),
			TypeAnnotationKind::String => self.types.string(),
			TypeAnnotationKind::Bool => self.types.bool(),
			TypeAnnotationKind::Duration => self.types.duration(),
			TypeAnnotationKind::Json => self.types.json(),
			TypeAnnotationKind::MutJson => self.types.mut_json(),
			TypeAnnotationKind::Optional(v) => {
				let value_type = self.resolve_type_annotation(v, env);
				self.types.add_type(Type::Optional(value_type))
			}
			TypeAnnotationKind::Function(ast_sig) => {
				let mut args = vec![];
				for arg in ast_sig.param_types.iter() {
					args.push(self.resolve_type_annotation(arg, env));
				}
				let sig = FunctionSignature {
					this_type: None,
					parameters: args,
					return_type: ast_sig
						.return_type
						.as_ref()
						.map_or(self.types.void(), |t| self.resolve_type_annotation(t, env)),
					phase: ast_sig.phase,
					js_override: None,
				};
				// TODO: avoid creating a new type for each function_sig resolution
				self.types.add_type(Type::Function(sig))
			}
			TypeAnnotationKind::UserDefined(user_defined_type) => self
				.resolve_user_defined_type(user_defined_type, env, self.statement_idx)
				.unwrap_or_else(|e| self.type_error(e)),
			TypeAnnotationKind::Array(v) => {
				let value_type = self.resolve_type_annotation(v, env);
				// TODO: avoid creating a new type for each array resolution
				self.types.add_type(Type::Array(value_type))
			}
			TypeAnnotationKind::MutArray(v) => {
				let value_type = self.resolve_type_annotation(v, env);
				// TODO: avoid creating a new type for each array resolution
				self.types.add_type(Type::MutArray(value_type))
			}
			TypeAnnotationKind::Set(v) => {
				let value_type = self.resolve_type_annotation(v, env);
				// TODO: avoid creating a new type for each set resolution
				self.types.add_type(Type::Set(value_type))
			}
			TypeAnnotationKind::MutSet(v) => {
				let value_type = self.resolve_type_annotation(v, env);
				// TODO: avoid creating a new type for each set resolution
				self.types.add_type(Type::MutSet(value_type))
			}
			TypeAnnotationKind::Map(v) => {
				let value_type = self.resolve_type_annotation(v, env);
				// TODO: avoid creating a new type for each map resolution
				self.types.add_type(Type::Map(value_type))
			}
			TypeAnnotationKind::MutMap(v) => {
				let value_type = self.resolve_type_annotation(v, env);
				// TODO: avoid creating a new type for each map resolution
				self.types.add_type(Type::MutMap(value_type))
			}
		}
	}

	fn type_check_arg_list(&mut self, arg_list: &ArgList, env: &SymbolEnv) -> ArgListTypes {
		// Type check the positional arguments, e.g. fn(exp1, exp2, exp3)
		let pos_arg_types = arg_list
			.pos_args
			.iter()
			.map(|pos_arg| self.type_check_exp(pos_arg, env))
			.collect();

		// Type check the named arguments, e.g. fn(named_arg1: exp4, named_arg2: exp5)
		let named_arg_types = arg_list
			.named_args
			.iter()
			.map(|(sym, expr)| {
				let arg_type = self.type_check_exp(&expr, env);
				(sym.clone(), arg_type)
			})
			.collect::<IndexMap<_, _>>();

		ArgListTypes {
			pos_args: pos_arg_types,
			named_args: named_arg_types,
		}
	}

	fn type_check_statement(&mut self, stmt: &Stmt, env: &mut SymbolEnv) {
		// Set the current statement index for symbol lookup checks. We can safely assume we're
		// not overwriting the current statement index because `type_check_statement` is never
		// recursively called (we use a breadth-first traversal of the AST statements).
		self.statement_idx = stmt.idx;

		match &stmt.kind {
			StmtKind::VariableDef {
				reassignable,
				var_name,
				initial_value,
				type_,
			} => {
				let explicit_type = type_.as_ref().map(|t| self.resolve_type_annotation(t, env));
				let inferred_type = self.type_check_exp(initial_value, env);
				if inferred_type.is_void() {
					self.type_error(TypeError {
						message: format!("Cannot assign expression of type \"{}\" to a variable", inferred_type),
						span: var_name.span.clone(),
					});
				}
				if let Some(explicit_type) = explicit_type {
					self.validate_type(inferred_type, explicit_type, initial_value);
					match env.define(
						var_name,
						SymbolKind::make_variable(explicit_type, *reassignable, true, env.phase),
						StatementIdx::Index(stmt.idx),
					) {
						Err(type_error) => {
							self.type_error(type_error);
						}
						_ => {}
					};
				} else {
					match env.define(
						var_name,
						SymbolKind::make_variable(inferred_type, *reassignable, true, env.phase),
						StatementIdx::Index(stmt.idx),
					) {
						Err(type_error) => {
							self.type_error(type_error);
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
				let exp_type = self.type_check_exp(iterable, env);

				if !exp_type.is_iterable() {
					self.type_error(TypeError {
						message: format!("Unable to iterate over \"{}\"", &exp_type),
						span: iterable.span.clone(),
					});
				}

				let iterator_type = match &*exp_type {
					// These are builtin iterables that have a clear/direct iterable type
					Type::Array(t) => *t,
					Type::Set(t) => *t,
					Type::MutArray(t) => *t,
					Type::MutSet(t) => *t,
					Type::Anything => exp_type,
					_t => self.types.anything(),
				};

				let mut scope_env = SymbolEnv::new(Some(env.get_ref()), env.return_type, false, env.phase, stmt.idx);
				match scope_env.define(
					&iterator,
					SymbolKind::make_variable(iterator_type, false, true, env.phase),
					StatementIdx::Top,
				) {
					Err(type_error) => {
						self.type_error(type_error);
					}
					_ => {}
				};
				statements.set_env(scope_env);

				self.inner_scopes.push(statements);
			}
			StmtKind::While { condition, statements } => {
				let cond_type = self.type_check_exp(condition, env);
				self.validate_type(cond_type, self.types.bool(), condition);

				statements.set_env(SymbolEnv::new(
					Some(env.get_ref()),
					env.return_type,
					false,
					env.phase,
					stmt.idx,
				));

				self.inner_scopes.push(statements);
			}
			StmtKind::Break | StmtKind::Continue => {}
			StmtKind::If {
				condition,
				statements,
				elif_statements,
				else_statements,
			} => {
				let cond_type = self.type_check_exp(condition, env);
				self.validate_type(cond_type, self.types.bool(), condition);

				statements.set_env(SymbolEnv::new(
					Some(env.get_ref()),
					env.return_type,
					false,
					env.phase,
					stmt.idx,
				));
				self.inner_scopes.push(statements);

				for elif_scope in elif_statements {
					let cond_type = self.type_check_exp(&elif_scope.condition, env);
					self.validate_type(cond_type, self.types.bool(), condition);

					(&elif_scope.statements).set_env(SymbolEnv::new(
						Some(env.get_ref()),
						env.return_type,
						false,
						env.phase,
						stmt.idx,
					));
					self.inner_scopes.push(&elif_scope.statements);
				}

				if let Some(else_scope) = else_statements {
					else_scope.set_env(SymbolEnv::new(
						Some(env.get_ref()),
						env.return_type,
						false,
						env.phase,
						stmt.idx,
					));
					self.inner_scopes.push(else_scope);
				}
			}
			StmtKind::Expression(e) => {
				self.type_check_exp(e, env);
			}
			StmtKind::Assignment { variable, value } => {
				let exp_type = self.type_check_exp(value, env);
				let var_info = self.resolve_reference(variable, env);
				if !var_info.reassignable {
					self.stmt_error(stmt, format!("Variable {} is not reassignable ", variable));
				}
				self.validate_type(exp_type, var_info.type_, value);
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
								"bring {} must be assigned to an identifier (e.g. bring \"foo\" as foo)",
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
						WINGSDK_CLOUD_MODULE | WINGSDK_FS_MODULE | WINGSDK_REDIS_MODULE => {
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

				self.add_module_to_env(env, library_name, namespace_filter, &alias, Some(&stmt));
			}
			StmtKind::Scope(scope) => {
				scope.set_env(SymbolEnv::new(
					Some(env.get_ref()),
					env.return_type,
					false,
					env.phase,
					stmt.idx,
				));
				self.inner_scopes.push(scope)
			}
			StmtKind::Return(exp) => {
				if let Some(return_expression) = exp {
					let return_type = self.type_check_exp(return_expression, env);
					if !env.return_type.is_void() {
						self.validate_type(return_type, env.return_type, return_expression);
					} else {
						self.stmt_error(
							stmt,
							"Return statement outside of function cannot return a value".to_string(),
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
				implements,
				initializer,
				is_resource,
				inflight_initializer,
			}) => {
				// Resources cannot be defined inflight
				assert!(!*is_resource || env.phase == Phase::Preflight);

				// Verify parent is actually a known Class/Resource and get their env
				let (parent_class, parent_class_env) = if let Some(parent_type) = parent {
					let t = self
						.resolve_user_defined_type(parent_type, env, stmt.idx)
						.unwrap_or_else(|e| self.type_error(e));
					if *is_resource {
						if let Type::Resource(ref class) = *t {
							(Some(t), Some(class.env.get_ref()))
						} else {
							panic!("Preflight class {}'s parent {} is not a preflight class", name, t);
						}
					} else {
						if let Type::Class(ref class) = *t {
							(Some(t), Some(class.env.get_ref()))
						} else {
							self.general_type_error(format!("Inflight class {}'s parent \"{}\" is not a class", name, t));
							(None, None)
						}
					}
				} else if *is_resource {
					// if this is a resource and we don't have a parent, then we implicitly set it to `std.Resource`
					let t = self.types.resource_base_type();
					let env = t.as_resource().unwrap().env.get_ref();
					(Some(t), Some(env))
				} else {
					(None, None)
				};

				// Create environment representing this class, for now it'll be empty just so we can support referencing ourselves from the class definition.
				let dummy_env = SymbolEnv::new(None, self.types.void(), false, env.phase, stmt.idx);

				let impl_interfaces = implements
					.iter()
					.filter_map(|i| {
						let t = self
							.resolve_user_defined_type(i, env, stmt.idx)
							.unwrap_or_else(|e| self.type_error(e));
						if t.as_interface().is_some() {
							Some(t)
						} else {
							self.general_type_error(format!("Expected an interface, instead found type \"{}\"", t));
							None
						}
					})
					.collect::<Vec<_>>();

				// Create the resource/class type and add it to the current environment (so class implementation can reference itself)
				let class_spec = Class {
					should_case_convert_jsii: false,
					name: name.clone(),
					fqn: None,
					env: dummy_env,
					parent: parent_class,
					implements: impl_interfaces.clone(),
					is_abstract: false,
					type_parameters: None, // TODO no way to have generic args in wing yet
				};
				let mut class_type = self.types.add_type(if *is_resource {
					Type::Resource(class_spec)
				} else {
					Type::Class(class_spec)
				});
				match env.define(name, SymbolKind::Type(class_type), StatementIdx::Top) {
					Err(type_error) => {
						self.type_error(type_error);
					}
					_ => {}
				};

				// Create a the real class environment to be filled with the class AST types
				let mut class_env = SymbolEnv::new(parent_class_env, self.types.void(), false, env.phase, stmt.idx);

				// Add fields to the class env
				for field in fields.iter() {
					let field_type = self.resolve_type_annotation(&field.member_type, env);
					match class_env.define(
						&field.name,
						SymbolKind::make_variable(field_type, field.reassignable, field.is_static, field.phase),
						StatementIdx::Top,
					) {
						Err(type_error) => {
							self.type_error(type_error);
						}
						_ => {}
					};
				}
				// Add methods to the class env
				for (method_name, method_def) in methods.iter() {
					self.add_method_to_class_env(
						&method_def.signature,
						env,
						if method_def.is_static { None } else { Some(class_type) },
						&mut class_env,
						method_name,
					);
				}

				// Add the constructor to the class env
				let init_symb = Symbol {
					name: CLASS_INIT_NAME.into(),
					span: initializer.span.clone(),
				};
				self.add_method_to_class_env(&initializer.signature, env, None, &mut class_env, &init_symb);

				let mut inflight_init_symb = Symbol::global(CLASS_INFLIGHT_INIT_NAME);

				// Add the inflight initializer to the class env
				if let Some(inflight_initializer) = inflight_initializer {
					inflight_init_symb.span = inflight_initializer.span.clone();
					self.add_method_to_class_env(
						&inflight_initializer.signature,
						env,
						Some(class_type),
						&mut class_env,
						&inflight_init_symb,
					);
				}

				// Replace the dummy class environment with the real one before type checking the methods
				class_type.as_mut_class_or_resource().unwrap().env = class_env;
				let class_env = &class_type.as_class_or_resource().unwrap().env;

				// Type check constructor
				self.type_check_method(class_env, &init_symb, env, stmt.idx, initializer, class_type);

				// Verify if all fields of a class/resource are initialized in the initializer.
				self.check_class_field_initialization(&initializer.statements, fields);

				// Type check the inflight initializer
				if let Some(inflight_initializer) = inflight_initializer {
					self.type_check_method(
						class_env,
						&inflight_init_symb,
						env,
						stmt.idx,
						inflight_initializer,
						class_type,
					);
				}

				// TODO: handle member/method overrides in our env based on whatever rules we define in our spec
				// https://github.com/winglang/wing/issues/1124

				// Type check methods
				for (method_name, method_def) in methods.iter() {
					self.type_check_method(class_env, method_name, env, stmt.idx, method_def, class_type);
				}

				// Check that the class satisfies all of its interfaces
				for interface_type in impl_interfaces.iter() {
					let interface_type = match interface_type.as_interface() {
						Some(t) => t,
						None => {
							// No need to error here, it will be caught when `impl_interaces` was created
							continue;
						}
					};

					// Check all methods are implemented
					for (method_name, method_type) in interface_type.methods(true) {
						if let Some(symbol) = class_env.try_lookup(&method_name, None) {
							let class_method_type = symbol.as_variable().expect("Expected method to be a variable").type_;
							self.validate_type(class_method_type, method_type, name);
						} else {
							self.type_error(TypeError {
								message: format!(
									"Class \"{}\" does not implement method \"{}\" of interface \"{}\"",
									name.name, method_name, interface_type.name.name
								),
								span: name.span.clone(),
							});
						}
					}

					// Check all fields are implemented
					for (field_name, field_type) in interface_type.fields(true) {
						if let Some(symbol) = class_env.try_lookup(&field_name, None) {
							let class_field_type = symbol.as_variable().expect("Expected field to be a variable").type_;
							self.validate_type(class_field_type, field_type, name);
						} else {
							self.type_error(TypeError {
								message: format!(
									"Class \"{}\" does not implement field \"{}\" of interface \"{}\"",
									name.name, field_name, interface_type.name.name
								),
								span: name.span.clone(),
							});
						}
					}
				}
			}
			StmtKind::Interface(AstInterface { name, methods, extends }) => {
				// Create environment representing this interface, for now it'll be empty just so we can support referencing ourselves from the interface definition.
				let dummy_env = SymbolEnv::new(None, self.types.void(), false, env.phase, stmt.idx);

				let extend_interfaces = extends
					.iter()
					.filter_map(|i| {
						let t = self
							.resolve_user_defined_type(i, env, stmt.idx)
							.unwrap_or_else(|e| self.type_error(e));
						if t.as_interface().is_some() {
							Some(t)
						} else {
							// The type checker resolves non-existing definitions to `any`, so we avoid duplicate errors by checking for that here
							if !t.is_anything() {
								self.general_type_error(format!("Expected an interface, instead found type \"{}\"", t));
							}
							None
						}
					})
					.collect::<Vec<_>>();

				// Create the interface type and add it to the current environment (so interface implementation can reference itself)
				let interface_spec = Interface {
					name: name.clone(),
					env: dummy_env,
					extends: extend_interfaces.clone(),
				};
				let mut interface_type = self.types.add_type(Type::Interface(interface_spec));
				match env.define(name, SymbolKind::Type(interface_type), StatementIdx::Top) {
					Err(type_error) => {
						self.type_error(type_error);
					}
					_ => {}
				};

				// Create the real interface environment to be filled with the interface AST types
				let mut interface_env = SymbolEnv::new(None, self.types.void(), false, env.phase, stmt.idx);

				// Add methods to the interface env
				for (method_name, sig) in methods.iter() {
					let mut method_type = self.resolve_type_annotation(&sig.to_type_annotation(), env);
					// use the interface type as the function's "this" type
					if let Type::Function(ref mut f) = *method_type {
						f.this_type = Some(interface_type);
					} else {
						panic!("Expected method type to be a function");
					}

					match interface_env.define(
						method_name,
						SymbolKind::make_variable(method_type, false, false, sig.phase),
						StatementIdx::Top,
					) {
						Err(type_error) => {
							self.type_error(type_error);
						}
						_ => {}
					};
				}

				// add methods from all extended interfaces to the interface env
				if let Err(e) = add_parent_members_to_iface_env(&extend_interfaces, name, &mut interface_env) {
					self.type_error(e);
				}

				// Replace the dummy interface environment with the real one before type checking the methods
				interface_type.as_mut_interface().unwrap().env = interface_env;
			}
			StmtKind::Struct { name, extends, fields } => {
				// Note: structs don't have a parent environment, instead they flatten their parent's members into the struct's env.
				//   If we encounter an existing member with the same name and type we skip it, if the types are different we
				//   fail type checking.

				// Create an environment for the struct
				let mut struct_env = SymbolEnv::new(None, self.types.void(), false, env.phase, stmt.idx);

				// Add fields to the struct env
				for field in fields.iter() {
					let field_type = self.resolve_type_annotation(&field.member_type, env);
					if field_type.is_mutable() {
						self.type_error(TypeError {
							message: format!("struct fields must be immutable got: {}", field_type),
							span: field.name.span.clone(),
						});
					}
					match struct_env.define(
						&field.name,
						SymbolKind::make_variable(field_type, false, false, Phase::Independent),
						StatementIdx::Top,
					) {
						Err(type_error) => {
							self.type_error(type_error);
						}
						_ => {}
					};
				}

				// Add members from the structs parents
				let extends_types = extends
					.iter()
					.filter_map(|ext| {
						let t = self
							.resolve_user_defined_type(ext, env, stmt.idx)
							.unwrap_or_else(|e| self.type_error(e));
						if t.as_struct().is_some() {
							Some(t)
						} else {
							self.general_type_error(format!("Expected a struct, found type \"{}\"", t));
							None
						}
					})
					.collect::<Vec<_>>();

				if let Err(e) = add_parent_members_to_struct_env(&extends_types, name, &mut struct_env) {
					self.type_error(e);
				}
				match env.define(
					name,
					SymbolKind::Type(self.types.add_type(Type::Struct(Struct {
						name: name.clone(),
						should_case_convert_jsii: false,
						extends: extends_types,
						env: struct_env,
					}))),
					StatementIdx::Top,
				) {
					Err(type_error) => {
						self.type_error(type_error);
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
						self.type_error(type_error);
					}
					_ => {}
				};
			}
			StmtKind::TryCatch {
				try_statements,
				catch_block,
				finally_statements,
			} => {
				// Create a new environment for the try block
				let try_env = SymbolEnv::new(Some(env.get_ref()), env.return_type, false, env.phase, stmt.idx);
				try_statements.set_env(try_env);
				self.inner_scopes.push(try_statements);

				// Create a new environment for the catch block
				if let Some(catch_block) = catch_block {
					let mut catch_env = SymbolEnv::new(Some(env.get_ref()), env.return_type, false, env.phase, stmt.idx);

					// Add the exception variable to the catch block
					if let Some(exception_var) = &catch_block.exception_var {
						match catch_env.define(
							exception_var,
							SymbolKind::make_variable(self.types.string(), false, true, env.phase),
							StatementIdx::Top,
						) {
							Err(type_error) => {
								self.type_error(type_error);
							}
							_ => {}
						}
					}
					catch_block.statements.set_env(catch_env);
					self.inner_scopes.push(&catch_block.statements);
				}

				// Create a new environment for the finally block
				if let Some(finally_statements) = finally_statements {
					let finally_env = SymbolEnv::new(Some(env.get_ref()), env.return_type, false, env.phase, stmt.idx);
					finally_statements.set_env(finally_env);
					self.inner_scopes.push(finally_statements);
				}
			}
		}
	}

	/// Validate if the fields of a class are initialized in the constructor (init).
	///
	/// # Arguments
	///
	/// * `statements` - The constructor scope (init)
	/// * `fields` - All fields of a class
	///
	fn check_class_field_initialization(&mut self, statements: &Scope, fields: &[ClassField]) {
		let mut visit_init = VisitClassInit { fields: Vec::new() };
		visit_init.visit_scope(statements);
		for field in fields.iter() {
			// inflight or static fields cannot be initialized in the initializer
			if field.phase == Phase::Inflight || field.is_static {
				continue;
			}
			if !visit_init.fields.contains(&field.name.name) {
				self.type_error(TypeError {
					message: format!("\"{}\" is not initialized", field.name.name),
					span: field.name.span.clone(),
				});
			}
		}
	}

	fn type_check_method<T>(
		&mut self,
		class_env: &SymbolEnv,
		method_name: &Symbol,
		env: &SymbolEnv,
		statement_idx: usize,
		method_def: &T,
		class_type: UnsafeRef<Type>,
	) where
		T: MethodLike<'a>,
	{
		// TODO: make sure this function returns on all control paths when there's a return type (can be done by recursively traversing the statements and making sure there's a "return" statements in all control paths)
		// https://github.com/winglang/wing/issues/457
		// Lookup the method in the class_env
		let method_type = class_env
			.lookup(method_name, None)
			.expect("Expected method to be in class env")
			.as_variable()
			.expect("Expected method to be a variable")
			.type_;

		let method_sig = method_type
			.as_function_sig()
			.expect("Expected method type to be a function signature");

		// Create method environment and prime it with args
		let is_init = method_name.name == CLASS_INIT_NAME || method_name.name == CLASS_INFLIGHT_INIT_NAME;
		let mut method_env = SymbolEnv::new(
			Some(env.get_ref()),
			method_sig.return_type,
			is_init,
			method_sig.phase,
			statement_idx,
		);
		// Prime the method environment with `this`
		if !method_def.is_static() || is_init {
			method_env
				.define(
					&Symbol {
						name: "this".into(),
						span: method_name.span.clone(),
					},
					SymbolKind::make_variable(class_type, false, true, method_env.phase),
					StatementIdx::Top,
				)
				.expect("Expected `this` to be added to constructor env");
		}
		self.add_arguments_to_env(&method_def.parameters(), method_sig, &mut method_env);

		if let FunctionBodyRef::Statements(scope) = method_def.body() {
			scope.set_env(method_env);
			self.inner_scopes.push(scope);
		}
	}

	fn add_method_to_class_env(
		&mut self,
		method_sig: &ast::FunctionSignature,
		env: &mut SymbolEnv,
		instance_type: Option<TypeRef>,
		class_env: &mut SymbolEnv,
		method_name: &Symbol,
	) {
		let mut method_type = self.resolve_type_annotation(&method_sig.to_type_annotation(), env);
		// use the class type as the function's "this" type (or None if static)
		method_type
			.as_mut_function_sig()
			.expect("Expected method type to be a function")
			.this_type = instance_type;

		match class_env.define(
			method_name,
			SymbolKind::make_variable(method_type, false, instance_type.is_none(), method_sig.phase),
			StatementIdx::Top,
		) {
			Err(type_error) => {
				self.type_error(type_error);
			}
			_ => {}
		};
	}

	fn add_module_to_env(
		&mut self,
		env: &mut SymbolEnv,
		library_name: String,
		namespace_filter: Vec<String>,
		alias: &Symbol,
		// the statement that initiated the bring, if any
		stmt: Option<&Stmt>,
	) {
		let jsii = if let Some(jsii) = self
			.jsii_imports
			.iter()
			.find(|j| j.assembly_name == library_name && j.alias.name == alias.name)
		{
			// This spec has already been pre-supplied to the typechecker, so we'll still use this to populate the symbol environment
			jsii
		} else {
			// Loading the SDK is handled different from loading any other jsii modules because with the SDK we provide an exact
			// location to locate the SDK, whereas for the other modules we need to search for them from the source directory.
			let assembly_name = if library_name == WINGSDK_ASSEMBLY_NAME {
				// in runtime, if "WINGSDK_MANIFEST_ROOT" env var is set, read it. otherwise set to "../wingsdk" for dev
				let manifest_root = std::env::var("WINGSDK_MANIFEST_ROOT").unwrap_or_else(|_| "../wingsdk".to_string());
				let assembly_name = match self.jsii_types.load_module(manifest_root.as_str()) {
					Ok(name) => name,
					Err(type_error) => {
						self.type_error(TypeError {
							message: format!(
								"Cannot locate Wing standard library from \"{}\": {}",
								manifest_root, type_error
							),
							span: stmt.map(|s| s.span.clone()).unwrap_or_default(),
						});
						return;
					}
				};

				assembly_name
			} else {
				let source_dir = self.source_path.parent().unwrap().to_str().unwrap();
				let assembly_name = match self.jsii_types.load_dep(library_name.as_str(), source_dir) {
					Ok(name) => name,
					Err(type_error) => {
						self.type_error(TypeError {
							message: format!(
								"Cannot find module \"{}\" in source directory: {}",
								library_name,
								type_error.to_string()
							),
							span: stmt.map(|s| s.span.clone()).unwrap_or_default(),
						});
						return;
					}
				};
				assembly_name
			};

			debug!("Loaded JSII assembly {}", assembly_name);

			self.jsii_imports.push(JsiiImportSpec {
				assembly_name: assembly_name.to_string(),
				namespace_filter,
				alias: alias.clone(),
				import_statement_idx: stmt.map(|s| s.idx).unwrap_or(0),
			});

			self
				.jsii_imports
				.iter()
				.find(|j| j.assembly_name == assembly_name && j.alias.name == alias.name)
				.expect("Expected to find the just-added jsii import spec")
		};

		// check if we've already defined the given alias in the current scope
		if env.lookup(&jsii.alias, Some(jsii.import_statement_idx)).is_ok() {
			self.type_error(TypeError {
				message: format!("\"{}\" is already defined", alias.name),
				span: alias.span.clone(),
			});
		} else {
			let mut importer = JsiiImporter::new(&jsii, self.types, self.jsii_types);

			// if we're importing the `std` module from the wing sdk, eagerly import all the types within it
			// because they aren't typically resolved through the same process as other types
			if jsii.assembly_name == WINGSDK_ASSEMBLY_NAME && jsii.alias.name == WINGSDK_STD_MODULE {
				importer.deep_import_submodule_to_env(WINGSDK_STD_MODULE);
			}

			importer.import_submodules_to_env(env);
		}
	}

	/// Add function arguments to the function's environment
	///
	/// #Arguments
	///
	/// * `args` - List of arguments to add, each element is a tuple of the argument symbol and whether it's
	///   reassignable arg or not. Note that the argument types are figured out from `sig`.
	/// * `sig` - The function signature (used to figure out the type of each argument).
	/// * `env` - The function's environment to prime with the args.
	///
	fn add_arguments_to_env(&mut self, args: &Vec<FunctionParameter>, sig: &FunctionSignature, env: &mut SymbolEnv) {
		assert!(args.len() == sig.parameters.len());
		for (arg, arg_type) in args.iter().zip(sig.parameters.iter()) {
			match env.define(
				&arg.name,
				SymbolKind::make_variable(*arg_type, arg.reassignable, true, env.phase),
				StatementIdx::Top,
			) {
				Err(type_error) => {
					self.type_error(type_error);
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
	/// * `type_params` - The type argument to use for the T1, T2, .. in the original type
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
		let original_type = env.lookup_nested_str(original_fqn, None).unwrap().as_type().unwrap();
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

		// map from original_type_params to type_params
		let mut types_map = HashMap::new();
		for (o, n) in original_type_params.iter().zip(type_params.iter()) {
			types_map.insert(format!("{o}"), (*o, *n));
		}

		let new_env = SymbolEnv::new(None, original_type_class.env.return_type, false, Phase::Independent, 0);
		let tt = Type::Class(Class {
			name: original_type_class.name.clone(),
			env: new_env,
			fqn: Some(original_fqn.to_string()),
			parent: original_type_class.parent,
			implements: original_type_class.implements.clone(),
			should_case_convert_jsii: original_type_class.should_case_convert_jsii,
			is_abstract: original_type_class.is_abstract,
			type_parameters: Some(type_params),
		});

		// TODO: here we add a new type regardless whether we already "hydrated" `original_type` with these `type_params`. Cache!
		let mut new_type = self.types.add_type(tt);
		let new_type_class = new_type.as_mut_class_or_resource().unwrap();

		// Add symbols from original type to new type
		// Note: this is currently limited to top-level function signatures and fields
		for (name, symbol, _) in original_type_class.env.iter(true) {
			match symbol {
				SymbolKind::Variable(VariableInfo {
					type_: v,
					reassignable,
					phase: flight,
					is_static,
				}) => {
					// Replace type params in function signatures
					if let Some(sig) = v.as_function_sig() {
						let new_return_type = self.get_concrete_type_for_generic(sig.return_type, &types_map);

						let new_this_type = if let Some(this_type) = sig.this_type {
							Some(self.get_concrete_type_for_generic(this_type, &types_map))
						} else {
							None
						};

						let new_params: Vec<UnsafeRef<Type>> = sig
							.parameters
							.iter()
							.map(|arg| self.get_concrete_type_for_generic(*arg, &types_map))
							.collect();

						let new_sig = FunctionSignature {
							this_type: new_this_type,
							parameters: new_params,
							return_type: new_return_type,
							phase: sig.phase,
							js_override: sig.js_override.clone(),
						};

						match new_type_class.env.define(
							// TODO: Original symbol is not available. SymbolKind::Variable should probably expose it
							&Symbol::global(name),
							SymbolKind::make_variable(
								self.types.add_type(Type::Function(new_sig)),
								*reassignable,
								*is_static,
								*flight,
							),
							StatementIdx::Top,
						) {
							Err(type_error) => {
								self.type_error(type_error);
							}
							_ => {}
						}
					} else {
						let new_var_type = self.get_concrete_type_for_generic(*v, &types_map);
						match new_type_class.env.define(
							// TODO: Original symbol is not available. SymbolKind::Variable should probably expose it
							&Symbol::global(name),
							SymbolKind::make_variable(new_var_type, *reassignable, *is_static, *flight),
							StatementIdx::Top,
						) {
							Err(type_error) => {
								self.type_error(type_error);
							}
							_ => {}
						}
					}
				}
				_ => {
					panic!("Unexpected symbol kind: {:?} in class env", symbol)
				}
			}
		}

		return new_type;
	}

	fn get_concrete_type_for_generic(
		&mut self,
		type_to_maybe_replace: TypeRef,
		types_map: &HashMap<String, (TypeRef, TypeRef)>,
	) -> TypeRef {
		// Lookup type to replace in the types map and return the concrete type from the maps
		if let Some(new_type_arg) = types_map
			.get(&format!("{type_to_maybe_replace}"))
			.filter(|(o, _)| type_to_maybe_replace.is_same_type_as(o))
			.map(|(_, n)| n)
		{
			return *new_type_arg;
		} else {
			// Handle generic return types
			// TODO: If a generic class has a method that returns another generic, it must be a builtin
			if let Some(c) = type_to_maybe_replace.as_class() {
				if let Some(type_parameters) = &c.type_parameters {
					// For now all our generics only have a single type parameter so use the first type parameter as our "T1"
					let t1 = type_parameters[0];
					let t1_replacement = *types_map
						.get(&format!("{t1}"))
						.filter(|(o, _)| t1.is_same_type_as(o))
						.map(|(_, n)| n)
						.expect("generic must have a type parameter");
					let fqn = format!("{}.{}", WINGSDK_STD_MODULE, c.name.name);
					return match fqn.as_str() {
						WINGSDK_MUT_ARRAY => self.types.add_type(Type::MutArray(t1_replacement)),
						WINGSDK_ARRAY => self.types.add_type(Type::Array(t1_replacement)),
						WINGSDK_MAP => self.types.add_type(Type::Map(t1_replacement)),
						WINGSDK_MUT_MAP => self.types.add_type(Type::MutMap(t1_replacement)),
						WINGSDK_SET => self.types.add_type(Type::Set(t1_replacement)),
						WINGSDK_MUT_SET => self.types.add_type(Type::MutSet(t1_replacement)),
						_ => self.general_type_error(format!("\"{}\" is not a supported generic return type", fqn)),
					};
				}
			}
		}
		return type_to_maybe_replace;
	}

	fn get_stdlib_symbol(&self, symbol: &Symbol) -> Option<Symbol> {
		// Need this in order to map wing types to their stdlib equivalents
		// e.g. wing::str -> stdlib::String | wing::Array -> stdlib::ImmutableArray
		match symbol.name.as_str() {
			"Json" => Some(symbol.clone()),
			"str" => Some(Symbol {
				name: "String".to_string(),
				span: symbol.span.clone(),
			}),
			"num" => Some(Symbol {
				name: "Number".to_string(),
				span: symbol.span.clone(),
			}),
			"bool" => Some(Symbol {
				name: "Boolean".to_string(),
				span: symbol.span.clone(),
			}),
			_ => None,
		}
	}

	/// Check if this expression is actually a reference to a type. The parser doesn't distinguish between a `some_expression.field` and `SomeType.field`.
	/// This function checks if the expression is a reference to a user define type and if it is it returns it. If not it returns `None`.
	fn expr_maybe_type(&mut self, expr: &Expr, env: &SymbolEnv) -> Option<UserDefinedType> {
		// TODO: we currently don't handle parenthesized expressions correctly so something like `(MyEnum).A` or `std.(namespace.submodule).A` will return true, is this a problem?
		// https://github.com/winglang/wing/issues/1006
		let mut path = vec![];
		let mut curr_expr = expr;
		loop {
			match &curr_expr.kind {
				ExprKind::Reference(reference) => match reference {
					Reference::Identifier(symbol) => {
						if let Some(stdlib_symbol) = self.get_stdlib_symbol(symbol) {
							path.push(stdlib_symbol);
							path.push(Symbol {
								name: WINGSDK_STD_MODULE.to_string(),
								span: symbol.span.clone(),
							});
						} else {
							path.push(symbol.clone());
						}
						break;
					}
					Reference::InstanceMember { object, property } => {
						path.push(property.clone());
						curr_expr = &object;
					}
					Reference::TypeMember { type_, .. } => {
						assert_eq!(
							path.len(),
							0,
							"Type property references cannot be a type name because they have a property"
						);
						return Some(type_.clone());
					}
				},
				_ => return None,
			}
		}
		let root = path.pop().unwrap();
		path.reverse();
		let user_type_annotation = UserDefinedType { root, fields: path };

		self
			.resolve_user_defined_type(&user_type_annotation, env, self.statement_idx)
			.ok()
			.map(|_| user_type_annotation)
	}

	fn resolve_reference(&mut self, reference: &Reference, env: &SymbolEnv) -> VariableInfo {
		match reference {
			Reference::Identifier(symbol) => match env.lookup(symbol, Some(self.statement_idx)) {
				Ok(var) => {
					if let Some(var) = var.as_variable() {
						var
					} else {
						self.variable_error(TypeError {
							message: format!("Expected identifier {}, to be a variable, but it's a {}", symbol, var),
							span: symbol.span.clone(),
						})
					}
				}
				Err(type_error) => {
					// Give a specific error message if someone tries to write "print" instead of "log"
					if symbol.name == "print" {
						self.variable_error(TypeError {
							message: "Unknown symbol \"print\", did you mean to use \"log\"?".to_string(),
							span: symbol.span.clone(),
						})
					} else {
						self.variable_error(type_error)
					}
				}
			},
			Reference::InstanceMember { object, property } => {
				// There's a special case where the object is actually a type and the property is either a static member or an enum variant.
				// In this case the type might even be namespaced (recursive nested reference). We need to detect this and transform this
				// reference into a type reference.
				if let Some(user_type_annotation) = self.expr_maybe_type(object, env) {
					// We can't get here twice, we can safely assume that if we're here the `object` part of the reference doesn't have and evaluated type yet.
					assert!(object.evaluated_type.borrow().is_none());

					// Create a type reference out of this nested reference and call ourselves again
					let new_ref = Reference::TypeMember {
						type_: user_type_annotation,
						property: property.clone(),
					};
					// Replace the reference with the new one, this is unsafe because `reference` isn't mutable and theoretically someone may
					// hold another reference to it. But our AST doesn't hold up/cross references so this is safe as long as we return right.
					let const_ptr = reference as *const Reference;
					let mut_ptr = const_ptr as *mut Reference;
					unsafe {
						// We don't use the return value but need to call replace so it'll drop the old value
						_ = std::mem::replace(&mut *mut_ptr, new_ref);
					}
					return self.resolve_reference(reference, env);
				}

				// Special case: if the object expression is a simple reference to `this` and we're inside the init function then
				// we'll consider all properties as reassignable regardless of whether they're `var`.
				let mut force_reassignable = false;
				if let ExprKind::Reference(Reference::Identifier(symb)) = &object.kind {
					if symb.name == "this" {
						if let Ok((kind, info)) = env.lookup_ext(symb, Some(self.statement_idx)) {
							// `this` resreved symbol should always be a variable
							assert!(matches!(kind, SymbolKind::Variable(_)));
							force_reassignable = info.init;
						}
					}
				}

				let instance_type = self.type_check_exp(object, env);
				let res = match *instance_type {
					Type::Class(ref class) | Type::Resource(ref class) => self.get_property_from_class_like(class, property),
					Type::Interface(ref interface) => self.get_property_from_class_like(interface, property),
					Type::Anything => VariableInfo {
						type_: instance_type,
						reassignable: false,
						phase: env.phase,
						is_static: false,
					},

					// Lookup wingsdk std types, hydrating generics if necessary
					Type::Array(t) => {
						let new_class = self.hydrate_class_type_arguments(env, WINGSDK_ARRAY, vec![t]);
						self.get_property_from_class_like(new_class.as_class().unwrap(), property)
					}
					Type::MutArray(t) => {
						let new_class = self.hydrate_class_type_arguments(env, WINGSDK_MUT_ARRAY, vec![t]);
						self.get_property_from_class_like(new_class.as_class().unwrap(), property)
					}
					Type::Set(t) => {
						let new_class = self.hydrate_class_type_arguments(env, WINGSDK_SET, vec![t]);
						self.get_property_from_class_like(new_class.as_class().unwrap(), property)
					}
					Type::MutSet(t) => {
						let new_class = self.hydrate_class_type_arguments(env, WINGSDK_MUT_SET, vec![t]);
						self.get_property_from_class_like(new_class.as_class().unwrap(), property)
					}
					Type::Map(t) => {
						let new_class = self.hydrate_class_type_arguments(env, WINGSDK_MAP, vec![t]);
						self.get_property_from_class_like(new_class.as_class().unwrap(), property)
					}
					Type::MutMap(t) => {
						let new_class = self.hydrate_class_type_arguments(env, WINGSDK_MUT_MAP, vec![t]);
						self.get_property_from_class_like(new_class.as_class().unwrap(), property)
					}
					Type::Json => self.get_property_from_class_like(
						env
							.lookup_nested_str(WINGSDK_JSON, None)
							.unwrap()
							.as_type()
							.unwrap()
							.as_class()
							.unwrap(),
						property,
					),
					Type::MutJson => self.get_property_from_class_like(
						env
							.lookup_nested_str(WINGSDK_MUT_JSON, None)
							.unwrap()
							.as_type()
							.unwrap()
							.as_class()
							.unwrap(),
						property,
					),
					Type::String => self.get_property_from_class_like(
						env
							.lookup_nested_str(WINGSDK_STRING, None)
							.unwrap()
							.as_type()
							.unwrap()
							.as_class()
							.unwrap(),
						property,
					),
					Type::Duration => self.get_property_from_class_like(
						env
							.lookup_nested_str(WINGSDK_DURATION, None)
							.unwrap()
							.as_type()
							.unwrap()
							.as_class()
							.unwrap(),
						property,
					),
					Type::Struct(ref s) => self.get_property_from_class_like(s, property),

					_ => VariableInfo {
						type_: self.expr_error(
							object,
							format!("Property access unsupported on type \"{}\"", instance_type),
						),
						reassignable: false,
						phase: Phase::Independent,
						is_static: false,
					},
				};

				if force_reassignable {
					VariableInfo {
						reassignable: true,
						..res
					}
				} else {
					res
				}
			}
			Reference::TypeMember { type_, property } => {
				let type_ = self
					.resolve_user_defined_type(type_, env, self.statement_idx)
					.expect("Type annotation should have been verified by `expr_maybe_type`");
				return match *type_ {
					Type::Enum(ref e) => {
						if e.values.contains(property) {
							VariableInfo {
								type_,
								reassignable: false,
								phase: Phase::Independent,
								is_static: true,
							}
						} else {
							self.resolve_static_error(
								property,
								format!("Enum \"{}\" does not contain value \"{}\"", type_, property.name),
							)
						}
					}
					Type::Class(ref c) | Type::Resource(ref c) => {
						let member = c.env.lookup(property, None);
						match member {
							Ok(SymbolKind::Variable(v)) => {
								if v.is_static {
									v.clone()
								} else {
									self.resolve_static_error(
										property,
										format!(
											"Class \"{}\" contains a member \"{}\" but it is not static",
											type_, property.name
										),
									)
								}
							}
							_ => self.resolve_static_error(
								property,
								format!("No member \"{}\" in class \"{}\"", property.name, type_),
							),
						}
					}
					_ => self.resolve_static_error(property, format!("\"{}\" not a valid reference", reference)),
				};
			}
		}
	}

	/// Get's the type of an instance variable in a class
	fn get_property_from_class_like(&mut self, class: &impl ClassLike, property: &Symbol) -> VariableInfo {
		match class.get_env().lookup(property, None) {
			Ok(field) => {
				let var = field.as_variable().expect("Expected property to be a variable");
				if var.is_static {
					self.variable_error(TypeError {
						message: format!("Cannot access static property \"{}\" from instance", property.name),
						span: property.span.clone(),
					})
				} else {
					var
				}
			}
			Err(type_error) => self.variable_error(type_error),
		}
	}

	/// Resolves a user defined type (e.g. `Foo.Bar.Baz`) to a type reference
	/// If needed, this method can also resolve types from jsii libraries that have yet to be imported
	fn resolve_user_defined_type(
		&mut self,
		user_defined_type: &UserDefinedType,
		env: &SymbolEnv,
		statement_idx: usize,
	) -> Result<TypeRef, TypeError> {
		// Attempt to resolve the type from the current environment
		let res = resolve_user_defined_type(user_defined_type, env, statement_idx);
		if res.is_ok() {
			return res;
		}

		// If the type is not found, attempt to import it from a jsii library
		for jsii in &*self.jsii_imports {
			if jsii.alias.name == user_defined_type.root.name {
				let mut importer = JsiiImporter::new(&jsii, self.types, self.jsii_types);

				let mut udt_string = if jsii.assembly_name == WINGSDK_ASSEMBLY_NAME {
					// when importing from the std lib, the "alias" is the submodule
					format!("{}.{}.", jsii.assembly_name, jsii.alias.name)
				} else {
					format!("{}.", jsii.assembly_name)
				};
				udt_string.push_str(&user_defined_type.fields.iter().map(|g| g.name.clone()).join("."));

				if importer.import_type(&FQN::from(udt_string.as_str())) {
					return resolve_user_defined_type(user_defined_type, env, statement_idx);
				} else {
					// if the import failed, don't bother trying to do any more lookups
					break;
				}
			}
		}

		// If the type is still not found, return the original error
		res
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
				.type_;
			if let Some(existing_type) = struct_env.try_lookup(&parent_member_name, None) {
				let existing_type = existing_type
					.as_variable()
					.expect("Expected struct member to be a variable")
					.type_;
				if !existing_type.is_same_type_as(&member_type) {
					return Err(TypeError {
						span: name.span.clone(),
						message: format!(
							"Struct \"{}\" extends \"{}\" which introduces a conflicting member \"{}\" ({} != {})",
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
					SymbolKind::make_variable(member_type, false, false, struct_env.phase),
					StatementIdx::Top,
				)?;
			}
		}
	}
	Ok(())
}

// TODO: dup code with `add_parent_members_to_struct_env`
fn add_parent_members_to_iface_env(
	extends_types: &Vec<TypeRef>,
	name: &Symbol,
	iface_env: &mut SymbolEnv,
) -> Result<(), TypeError> {
	// Add members of all parents to the interface's environment
	for parent_type in extends_types.iter() {
		let parent_iface = if let Some(parent_iface) = parent_type.as_interface() {
			parent_iface
		} else {
			return Err(TypeError {
				message: format!(
					"Type \"{}\" extends \"{}\" which should be an interface",
					name.name, parent_type
				),
				span: name.span.clone(),
			});
		};
		// Add each member of current parent to the interface's environment (if it wasn't already added by a previous parent)
		for (parent_member_name, parent_member, _) in parent_iface.env.iter(true) {
			let member_type = parent_member
				.as_variable()
				.expect("Expected interface member to be a variable")
				.type_;
			if let Some(existing_type) = iface_env.try_lookup(&parent_member_name, None) {
				let existing_type = existing_type
					.as_variable()
					.expect("Expected interface member to be a variable")
					.type_;
				if !existing_type.is_same_type_as(&member_type) {
					return Err(TypeError {
						span: name.span.clone(),
						message: format!(
							"Interface \"{}\" extends \"{}\" but has a conflicting member \"{}\" ({} != {})",
							name, parent_type, parent_member_name, member_type, member_type
						),
					});
				}
			} else {
				iface_env.define(
					&Symbol {
						name: parent_member_name,
						span: name.span.clone(),
					},
					SymbolKind::make_variable(member_type, false, true, iface_env.phase),
					StatementIdx::Top,
				)?;
			}
		}
	}
	Ok(())
}

/// Resolves a user defined type (e.g. `Foo.Bar.Baz`) to a type reference
pub fn resolve_user_defined_type(
	user_defined_type: &UserDefinedType,
	env: &SymbolEnv,
	statement_idx: usize,
) -> Result<TypeRef, TypeError> {
	// Resolve all types down the fields list and return the last one (which is likely to be a real type and not a namespace)
	let mut nested_name = vec![&user_defined_type.root];
	nested_name.extend(user_defined_type.fields.iter().collect_vec());

	match env.lookup_nested(&nested_name, Some(statement_idx)) {
		Ok(_type) => {
			if let SymbolKind::Type(t) = *_type {
				Ok(t)
			} else {
				let symb = nested_name.last().unwrap();
				Err(TypeError {
					message: format!("Expected '{}' to be a type but it's a {}", symb.name, _type),
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

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn phase_subtyping() {
		// subtyping is reflexive
		assert!(Phase::Independent.is_subtype_of(&Phase::Independent));
		assert!(Phase::Preflight.is_subtype_of(&Phase::Preflight));
		assert!(Phase::Inflight.is_subtype_of(&Phase::Inflight));

		// independent is a subtype of preflight
		assert!(Phase::Independent.is_subtype_of(&Phase::Preflight));
		assert!(!Phase::Preflight.is_subtype_of(&Phase::Independent));

		// independent is a subtype of inflight
		assert!(Phase::Independent.is_subtype_of(&Phase::Inflight));
		assert!(!Phase::Inflight.is_subtype_of(&Phase::Independent));

		// preflight and inflight are not subtypes of each other
		assert!(!Phase::Preflight.is_subtype_of(&Phase::Inflight));
		assert!(!Phase::Inflight.is_subtype_of(&Phase::Preflight));
	}

	fn make_function(params: Vec<TypeRef>, ret: TypeRef, phase: Phase) -> Type {
		Type::Function(FunctionSignature {
			this_type: None,
			parameters: params,
			return_type: ret,
			phase,
			js_override: None,
		})
	}

	#[test]
	fn optional_subtyping() {
		let string = UnsafeRef::<Type>(&Type::String as *const Type);
		let opt_string = UnsafeRef::<Type>(&Type::Optional(string) as *const Type);

		// T is a subtype of T? since T can be used anywhere a T? is expected
		// (but not vice versa)
		assert!(string.is_subtype_of(&opt_string));
		assert!(!opt_string.is_subtype_of(&string));

		// subtyping is reflexive
		assert!(string.is_subtype_of(&string));
		assert!(opt_string.is_subtype_of(&opt_string));
	}

	#[test]
	fn function_subtyping_across_phases() {
		let void = UnsafeRef::<Type>(&Type::Void as *const Type);
		let inflight_fn = make_function(vec![], void, Phase::Inflight);
		let preflight_fn = make_function(vec![], void, Phase::Preflight);

		// functions of different phases are not subtypes of each other
		assert!(!inflight_fn.is_subtype_of(&preflight_fn));
		assert!(!preflight_fn.is_subtype_of(&inflight_fn));

		// subtyping is reflexive
		assert!(inflight_fn.is_subtype_of(&inflight_fn));
		assert!(preflight_fn.is_subtype_of(&preflight_fn));
	}

	#[test]
	fn function_subtyping_incompatible_single_param() {
		let void = UnsafeRef::<Type>(&Type::Void as *const Type);
		let num = UnsafeRef::<Type>(&Type::Number as *const Type);
		let string = UnsafeRef::<Type>(&Type::String as *const Type);
		let num_fn = make_function(vec![num], void, Phase::Inflight);
		let str_fn = make_function(vec![string], void, Phase::Inflight);

		// functions of incompatible arguments are not subtypes of each other
		assert!(!num_fn.is_subtype_of(&str_fn));
		assert!(!str_fn.is_subtype_of(&num_fn));
	}

	#[test]
	fn function_subtyping_incompatible_return_type() {
		let void = UnsafeRef::<Type>(&Type::Void as *const Type);
		let num = UnsafeRef::<Type>(&Type::Number as *const Type);
		let string = UnsafeRef::<Type>(&Type::String as *const Type);
		let returns_num = make_function(vec![], num, Phase::Inflight);
		let returns_str = make_function(vec![], string, Phase::Inflight);
		let returns_void = make_function(vec![], void, Phase::Inflight);

		// functions of incompatible return types are not subtypes of each other
		assert!(!returns_num.is_subtype_of(&returns_str));
		assert!(!returns_str.is_subtype_of(&returns_num));

		// functions with specific return types are subtypes of functions with void return type
		assert!(returns_num.is_subtype_of(&returns_void));
		assert!(returns_str.is_subtype_of(&returns_void));
	}

	#[test]
	fn function_subtyping_parameter_contravariance() {
		let void = UnsafeRef::<Type>(&Type::Void as *const Type);
		let string = UnsafeRef::<Type>(&Type::String as *const Type);
		let opt_string = UnsafeRef::<Type>(&Type::Optional(string) as *const Type);
		let str_fn = make_function(vec![string], void, Phase::Inflight);
		let opt_str_fn = make_function(vec![opt_string], void, Phase::Inflight);

		// let x = (s: string) => {};
		// let y = (s: string?) => {};
		// y is a subtype of x because a function that accepts a "string?" can be used
		// in place of a function that accepts a "string", but not vice versa
		assert!(opt_str_fn.is_subtype_of(&str_fn));
		assert!(!str_fn.is_subtype_of(&opt_str_fn));
	}
}
