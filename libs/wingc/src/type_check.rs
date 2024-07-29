mod class_fields_init;
mod has_type_stmt;
mod inference_visitor;
pub(crate) mod jsii_importer;
pub mod lifts;
pub mod symbol_env;
pub(crate) mod type_reference_transform;

use crate::ast::{
	self, AccessModifier, ArgListId, AssignmentKind, BringSource, CalleeKind, ClassField, ExplicitLift, ExprId,
	FunctionDefinition, IfLet, Intrinsic, IntrinsicKind, New, TypeAnnotationKind,
};
use crate::ast::{
	ArgList, BinaryOperator, Class as AstClass, Elifs, Enum as AstEnum, Expr, ExprKind, FunctionBody,
	FunctionParameter as AstFunctionParameter, Interface as AstInterface, InterpolatedStringPart, Literal, Phase,
	Reference, Scope, Spanned, Stmt, StmtKind, Struct as AstStruct, Symbol, TypeAnnotation, UnaryOperator,
	UserDefinedType,
};
use crate::comp_ctx::{CompilationContext, CompilationPhase};
use crate::diagnostic::{report_diagnostic, Diagnostic, DiagnosticAnnotation, DiagnosticSeverity, TypeError, WingSpan};
use crate::docs::Docs;
use crate::file_graph::FileGraph;
use crate::type_check::has_type_stmt::HasStatementVisitor;
use crate::type_check::symbol_env::SymbolEnvKind;
use crate::visit::Visit;
use crate::visit_context::{VisitContext, VisitorWithContext};
use crate::visit_stmt_before_super::{CheckSuperCtorLocationVisitor, CheckValidBeforeSuperVisitor};
use crate::visit_types::{VisitType, VisitTypeMut};
use crate::{
	dbg_panic, debug, CONSTRUCT_BASE_CLASS, CONSTRUCT_BASE_INTERFACE, CONSTRUCT_NODE_PROPERTY, UTIL_CLASS_NAME,
	WINGSDK_ARRAY, WINGSDK_ASSEMBLY_NAME, WINGSDK_BRINGABLE_MODULES, WINGSDK_DURATION, WINGSDK_GENERIC,
	WINGSDK_IRESOURCE, WINGSDK_JSON, WINGSDK_MAP, WINGSDK_MUT_ARRAY, WINGSDK_MUT_JSON, WINGSDK_MUT_MAP, WINGSDK_MUT_SET,
	WINGSDK_NODE, WINGSDK_RESOURCE, WINGSDK_SET, WINGSDK_SIM_IRESOURCE_FQN, WINGSDK_STD_MODULE, WINGSDK_STRING,
	WINGSDK_STRUCT,
};
use camino::{Utf8Path, Utf8PathBuf};
use derivative::Derivative;
use duplicate::duplicate_item;
use indexmap::IndexMap;
use itertools::{izip, Itertools};
use jsii_importer::JsiiImporter;

use std::cmp;
use std::collections::{BTreeMap, HashMap, HashSet};
use std::fmt::{Debug, Display};
use std::iter::FilterMap;
use symbol_env::{StatementIdx, SymbolEnv};
use wingii::fqn::FQN;
use wingii::type_system::TypeSystem;

use self::class_fields_init::VisitClassInit;
use self::inference_visitor::{InferenceCounterVisitor, InferenceVisitor};
use self::jsii_importer::JsiiImportSpec;
use self::lifts::Lifts;
use self::symbol_env::{LookupResult, LookupResultMut, SymbolEnvIter, SymbolEnvRef};

pub struct UnsafeRef<T>(*const T);

impl<T> Copy for UnsafeRef<T> {}

impl<'a, T> From<&'a T> for UnsafeRef<T> {
	fn from(t: &'a T) -> Self {
		UnsafeRef(t)
	}
}

impl<T> Clone for UnsafeRef<T> {
	fn clone(&self) -> Self {
		*self
	}
}
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

#[derive(Debug, Clone, PartialEq)]
pub enum VariableKind {
	/// a free variable not associated with a specific type
	Free,

	/// an instance member (either of classes or of structs)
	InstanceMember,

	/// a class member (or an enum member)
	StaticMember,

	/// an error placeholder
	Error,
}

/// Information about a variable in the environment
#[derive(Debug, Clone)]
pub struct VariableInfo {
	/// The name of the variable
	pub name: Symbol,
	/// Type of the variable
	pub type_: TypeRef,
	/// Can the variable be reassigned? (only applies to variables and fields)
	pub reassignable: bool,
	/// The phase in which this variable exists
	pub phase: Phase,
	/// The kind of variable
	pub kind: VariableKind,
	/// Access rules for this variable (only applies to methods and fields)
	pub access: AccessModifier,

	pub docs: Option<Docs>,
}

impl SymbolKind {
	#[allow(clippy::too_many_arguments)] // TODO: refactor this
	pub fn make_member_variable(
		name: Symbol,
		type_: TypeRef,
		reassignable: bool,
		is_static: bool,
		phase: Phase,
		access: AccessModifier,
		docs: Option<Docs>,
	) -> Self {
		SymbolKind::Variable(VariableInfo {
			name,
			type_,
			reassignable,
			phase,
			kind: if is_static {
				VariableKind::StaticMember
			} else {
				VariableKind::InstanceMember
			},
			access,
			docs,
		})
	}

	pub fn make_free_variable(name: Symbol, type_: TypeRef, reassignable: bool, phase: Phase) -> Self {
		SymbolKind::Variable(VariableInfo {
			name,
			type_,
			reassignable,
			phase,
			kind: VariableKind::Free,
			access: AccessModifier::Public,
			docs: None,
		})
	}

	pub fn as_variable(&self) -> Option<&VariableInfo> {
		match self {
			SymbolKind::Variable(t) => Some(t),
			_ => None,
		}
	}

	pub fn as_variable_mut(&mut self) -> Option<&mut VariableInfo> {
		match self {
			SymbolKind::Variable(t) => Some(t),
			_ => None,
		}
	}

	pub fn as_namespace_ref(&self) -> Option<NamespaceRef> {
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

	fn as_namespace_mut(&mut self) -> Option<&mut Namespace> {
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

	pub fn as_type_ref(&self) -> Option<&TypeRef> {
		match &self {
			SymbolKind::Type(t) => Some(t),
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
	/// Immutable Json literals may store extra information about their known data
	Json(Option<JsonData>),
	MutJson,
	Nil,
	Unresolved,
	/// A type that is inferred from the context.
	/// The usize is a unique identifier for the inference
	Inferred(InferenceId),
	Optional(TypeRef),
	Array(TypeRef),
	MutArray(TypeRef),
	Map(TypeRef),
	MutMap(TypeRef),
	Set(TypeRef),
	MutSet(TypeRef),
	Function(FunctionSignature),
	Class(Class),
	Interface(Interface),
	Struct(Struct),
	Enum(Enum),
	/// A special type for parameters that accept any stringable value.
	/// If you have a value of this type, the only thing you know you can do
	/// for sure is that you can stringify it.
	Stringable,
}

pub const CLASS_INIT_NAME: &'static str = "new";
pub const CLASS_INFLIGHT_INIT_NAME: &'static str = "$inflight_init";

pub const CLOSURE_CLASS_HANDLE_METHOD: &'static str = "handle";

#[derive(Debug)]
pub enum JsonDataKind {
	Type(SpannedTypeInfo),
	Fields(IndexMap<Symbol, SpannedTypeInfo>),
	List(Vec<SpannedTypeInfo>),
}

#[derive(Debug)]
pub struct JsonData {
	pub expression_id: ExprId,
	pub kind: JsonDataKind,
}

#[derive(Debug)]
pub struct SpannedTypeInfo {
	pub type_: TypeRef,
	pub span: WingSpan,
}

impl Display for SpannedTypeInfo {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}", self.type_)
	}
}

#[derive(Derivative)]
#[derivative(Debug)]
pub struct Namespace {
	pub name: String,

	#[derivative(Debug = "ignore")]
	pub envs: Vec<SymbolEnvRef>,

	/// Where we can resolve this namespace from
	pub module_path: ResolveSource,
}

#[derive(Debug)]
pub enum ResolveSource {
	/// A wing file within the source tree for this compilation.
	WingFile,
	/// External JSII module. This string will be the spec of the module, either a path or a npm package name.
	ExternalModule(String),
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
	pub parent: Option<TypeRef>,  // Must be a Type::Class type
	pub implements: Vec<TypeRef>, // Must be a Type::Interface type
	#[derivative(Debug = "ignore")]
	pub env: SymbolEnv,
	pub fqn: Option<String>,
	pub is_abstract: bool,
	pub phase: Phase,
	pub docs: Docs,
	pub lifts: Option<Lifts>,

	// The phase in which this class was defined (this should be the same as the env.phase where the class name is defined)
	pub defined_in_phase: Phase,

	// Preflight classes are CDK Constructs which means they have a scope and id as their first arguments
	// this is natively supported by wing using the `as` `in` keywords. However theoretically it is possible
	// to have a construct which does not have these arguments, in which case we can't use the `as` `in` keywords
	// and instead the user will need to pass the relevant args to the class's init method.
	pub std_construct_args: bool,

	// Unique identifier for this class type, used to get access to the type's generated preflight code even when
	// the type name isn't available in scope or is shadowed.
	// Ideally we should use the FQN and unify the implementation of JSII imported classes and Wing classes, currently
	// uid is used for Wing classes and is always 0 for JSII classes to avoid snapshot noise.
	pub uid: usize,
}
impl Class {
	pub(crate) fn set_lifts(&mut self, lifts: Lifts) {
		self.lifts = Some(lifts);
	}

	/// Returns the type of the "handle" method of a closure class or `None` if this is not a closure
	/// class.
	pub fn get_closure_method(&self) -> Option<TypeRef> {
		self
			.methods(true)
			.find(|(name, v)| name == CLOSURE_CLASS_HANDLE_METHOD && v.type_.is_inflight_function())
			.map(|(_, v)| v.type_)
	}
}

#[derive(Derivative)]
#[derivative(Debug)]
pub struct Interface {
	pub name: Symbol,
	pub fqn: Option<String>,
	pub docs: Docs,
	pub extends: Vec<TypeRef>, // Must be a Type::Interface type
	pub phase: Phase,
	#[derivative(Debug = "ignore")]
	pub env: SymbolEnv,
}

impl Display for Interface {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		if let LookupResult::Found(method, _) = self.get_env().lookup_ext(&CLOSURE_CLASS_HANDLE_METHOD.into(), None) {
			let method = method.as_variable().unwrap();
			if method.phase == Phase::Inflight {
				write!(f, "{}", method.type_) // show signature of inflight closure
			} else {
				write!(f, "{}", self.name.name)
			}
		} else {
			write!(f, "{}", self.name.name)
		}
	}
}

type ClassLikeIterator<'a> =
	FilterMap<SymbolEnvIter<'a>, fn(<SymbolEnvIter as Iterator>::Item) -> Option<(String, VariableInfo)>>;

pub trait ClassLike: Display {
	fn get_env(&self) -> &SymbolEnv;

	fn methods(&self, with_ancestry: bool) -> ClassLikeIterator<'_> {
		self.get_env().iter(with_ancestry).filter_map(|(s, sym_kind, ..)| {
			if sym_kind.as_variable()?.type_.as_function_sig().is_some() {
				Some((s, sym_kind.as_variable()?.clone()))
			} else {
				None
			}
		})
	}

	fn fields(&self, with_ancestry: bool) -> ClassLikeIterator<'_> {
		self.get_env().iter(with_ancestry).filter_map(|(s, sym_kind, ..)| {
			if sym_kind.as_variable()?.type_.as_function_sig().is_none() {
				Some((s, sym_kind.as_variable()?.clone()))
			} else {
				None
			}
		})
	}

	fn get_method(&self, name: &Symbol) -> Option<&VariableInfo> {
		let v = self.get_env().lookup_ext(name, None).ok()?.0.as_variable()?;
		if v.type_.is_closure() {
			Some(v)
		} else {
			None
		}
	}

	fn get_field(&self, name: &Symbol) -> Option<&VariableInfo> {
		let v = self.get_env().lookup_ext(name, None).ok()?.0.as_variable()?;
		if !v.type_.is_closure() {
			Some(v)
		} else {
			None
		}
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
	pub named_args: IndexMap<Symbol, SpannedTypeInfo>,
	// Indicates if any of the arguments were an inflight expression, this is useful for determining if a
	// phase independent call needs to be resolved as an inflight call or not.
	pub includes_inflights: bool,
}

#[derive(Derivative)]
#[derivative(Debug)]
pub struct Struct {
	pub name: Symbol,
	pub fqn: Option<String>,
	pub docs: Docs,
	pub extends: Vec<TypeRef>, // Must be a Type::Struct type
	#[derivative(Debug = "ignore")]
	pub env: SymbolEnv,
}

impl Display for Struct {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}", self.name.name)
	}
}

#[derive(Debug)]
pub struct Enum {
	pub name: Symbol,
	pub docs: Docs,
	/// Variant name and optional documentation
	pub values: IndexMap<Symbol, Option<String>>,
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
			(Self::Inferred(my_n), other) | (other, Self::Inferred(my_n)) => {
				if let Self::Inferred(other_n) = other {
					my_n == other_n
				} else {
					true
				}
			}
			(Self::Function(l0), Self::Interface(r0)) => {
				// TODO: Hack to make functions compatible with interfaces
				// Remove this after https://github.com/winglang/wing/issues/1448

				// First check that the function is in the inflight phase
				if !l0.phase.is_subtype_of(&Phase::Inflight) {
					return false;
				}

				// Next, compare the function to a method on the interface named "handle" if it exists
				if let Some((method, _)) = r0.get_env().lookup_ext(&CLOSURE_CLASS_HANDLE_METHOD.into(), None).ok() {
					let Some(method) = method.as_variable() else {
						return false;
					};
					if !method.phase.is_subtype_of(&Phase::Inflight) {
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
					if !r.typeref.is_subtype_of(&l.typeref) {
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
			(Self::Interface(l0), Self::Interface(_)) => {
				// If we extend from `other` then I'm a subtype of it (inheritance)
				l0.extends.iter().any(|parent| {
					let parent_type: &Type = parent;
					parent_type.is_subtype_of(other)
				})
			}
			(Self::Class(class), Self::Interface(iface)) => {
				// If a resource implements the interface then it's a subtype of it (nominal typing)
				let implements_iface = class.implements.iter().any(|parent| {
					let parent_type: &Type = parent;
					parent_type.is_subtype_of(other)
				});

				let base_class_implements_iface = if let Some(base_class) = &class.parent {
					let base_class_type: &Type = base_class;
					base_class_type.is_subtype_of(other)
				} else {
					false
				};

				if implements_iface || base_class_implements_iface {
					return true;
				}

				// To support flexible inflight closures, we say that any class with an inflight method
				// named "handle" is a subtype of any single-method interface with a matching "handle"
				// method type (aka "closure classes").

				// First, check if there is exactly one inflight method in the interface
				let mut inflight_methods = iface.methods(true).filter(|(_name, v)| v.type_.is_inflight_function());
				let handler_method = inflight_methods.next();
				if handler_method.is_none() || inflight_methods.next().is_some() {
					return false;
				}

				// Next, check that the method's name is "handle"
				let (handler_method_name, handler_method_var) = handler_method.unwrap();
				if handler_method_name != CLOSURE_CLASS_HANDLE_METHOD {
					return false;
				}

				// Then get the type of the resource's "handle" method if it has one
				let res_handle_type = if let Some(method) = class.get_method(&CLOSURE_CLASS_HANDLE_METHOD.into()) {
					method.type_
				} else {
					return false;
				};

				// Finally check if they're subtypes
				res_handle_type.is_subtype_of(&handler_method_var.type_)
			}
			(Self::Class(res), Self::Function(_)) => {
				// To support flexible inflight closures, we say that any
				// preflight class with an inflight method named "handle" is a subtype of
				// any matching inflight type.

				// Get the type of the resource's "handle" method if it has one
				let res_handle_type = if let Some(method) = res.get_method(&CLOSURE_CLASS_HANDLE_METHOD.into()) {
					method.type_
				} else {
					return false;
				};

				// Finally check if they're subtypes
				(*res_handle_type).is_subtype_of(other)
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
			(Self::Nil, Self::Optional(_)) => {
				// Nil is a subtype of Optional<T> for any T
				true
			}
			(_, Self::Optional(r0)) => {
				// A non-Optional type is a subtype of an Optional type if the non-optional's type is a subtype of the value type
				// e.g. `String` is a subtype of `Optional<String>`
				let r: &Type = r0;
				self.is_subtype_of(r)
			}
			(Self::Number, Self::Number) => true,
			(Self::String, Self::String) => true,
			(Self::Boolean, Self::Boolean) => true,
			(Self::Duration, Self::Duration) => true,
			(Self::Void, Self::Void) => true,
			// These types are stringable
			(Self::String, Self::Stringable) => true,
			(Self::Number, Self::Stringable) => true,
			(Self::Boolean, Self::Stringable) => true,
			(Self::Json(_), Self::Stringable) => true,
			(Self::MutJson, Self::Stringable) => true,
			(Self::Enum(_), Self::Stringable) => true,
			_ => false,
		}
	}
}

#[derive(Clone, Debug)]
pub struct FunctionParameter {
	pub name: String,
	pub typeref: TypeRef,
	pub docs: Docs,
	pub variadic: bool,
}

#[derive(Clone, Debug)]
pub struct FunctionSignature {
	/// The type of "this" inside the function, if any. This should be None for
	/// static or anonymous functions.
	pub this_type: Option<TypeRef>,
	/// The parameters of the function.
	pub parameters: Vec<FunctionParameter>,
	/// The return type of the function.
	pub return_type: TypeRef,
	/// The phase in which this function exists
	pub phase: Phase,
	/// Expects an implicit caller scope argument to be passed to the function (for static preflight functions
	/// so they can instantiate preflight classes)
	pub implicit_scope_param: bool,
	/// During jsify, calls to this function will be replaced with this string
	/// In JSII imports, this is denoted by the `@macro` attribute
	/// This string may contain special tokens:
	/// - `$self$`: The expression on which this function was called
	/// - `$args$`: the arguments passed to this function call
	/// - `$args_text$`: the original source text of the arguments passed to this function call, escaped
	/// Those functions will be compiled into a separate file and retrieved when creating and running the js output.
	pub js_override: Option<String>,
	pub is_macro: bool,
	pub docs: Docs,
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
			.take_while(|arg| {
				arg.typeref.is_option()
					|| arg.typeref.is_struct()
					|| arg.typeref.is_anything()
					|| arg.typeref.is_inferred()
					|| arg.variadic
			})
			.count();

		self.parameters.len() - num_optionals
	}
}

impl PartialEq for FunctionSignature {
	fn eq(&self, other: &Self) -> bool {
		self
			.parameters
			.iter()
			.zip(other.parameters.iter())
			.all(|(x, y)| x.typeref.is_same_type_as(&y.typeref))
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

impl Display for Class {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		if let Some(closure) = self.get_closure_method() {
			std::fmt::Display::fmt(&closure, f)
		} else {
			write!(f, "{}", self.name.name)
		}
	}
}

impl Display for Type {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			Type::Anything => write!(f, "any"),
			Type::Number => write!(f, "num"),
			Type::String => write!(f, "str"),
			Type::Stringable => write!(f, "stringable"),
			Type::Duration => write!(f, "duration"),
			Type::Boolean => write!(f, "bool"),
			Type::Void => write!(f, "void"),
			Type::Json(_) => write!(f, "Json"),
			Type::MutJson => write!(f, "MutJson"),
			Type::Nil => write!(f, "nil"),
			Type::Unresolved => write!(f, "unresolved"),
			Type::Inferred(_) => write!(f, "unknown"),
			Type::Optional(v) => {
				if v.is_closure() {
					write!(f, "({})?", v)
				} else {
					write!(f, "{}?", v)
				}
			}
			Type::Function(sig) => write!(f, "{}", sig),
			Type::Class(class) => write!(f, "{}", class),

			Type::Interface(iface) => write!(f, "{}", iface),
			Type::Struct(s) => write!(f, "{}", s.name.name),
			Type::Array(v) => write!(f, "Array<{v}>"),
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
			.map(|a| {
				if a.name.is_empty() {
					format!("{}", a.typeref)
				} else {
					let prefix = if a.variadic { "..." } else { "" };
					format!("{}{}: {}", prefix, a.name, a.typeref)
				}
			})
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
	pub fn as_preflight_class(&self) -> Option<&Class> {
		if let Type::Class(ref class) = **self {
			if class.phase == Phase::Preflight {
				return Some(class);
			}
		}

		None
	}

	pub fn as_env(&self) -> Option<&SymbolEnv> {
		match &**self {
			Type::Class(class) => Some(&class.env),
			Type::Interface(iface) => Some(&iface.env),
			Type::Struct(st) => Some(&st.env),
			_ => None,
		}
	}

	pub fn as_env_mut(&mut self) -> Option<&mut SymbolEnv> {
		match &mut **self {
			Type::Class(class) => Some(&mut class.env),
			Type::Interface(iface) => Some(&mut iface.env),
			Type::Struct(st) => Some(&mut st.env),
			_ => None,
		}
	}

	pub fn as_class_mut(&mut self) -> Option<&mut Class> {
		match **self {
			Type::Class(ref mut class) => Some(class),
			_ => None,
		}
	}

	pub fn as_class(&self) -> Option<&Class> {
		if let Type::Class(ref class) = **self {
			return Some(class);
		}

		None
	}

	pub fn as_struct(&self) -> Option<&Struct> {
		if let Type::Struct(ref s) = **self {
			Some(s)
		} else {
			None
		}
	}

	pub fn as_struct_mut(&mut self) -> Option<&mut Struct> {
		if let Type::Struct(ref mut st) = **self {
			Some(st)
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
	fn as_interface_mut(&mut self) -> Option<&mut Interface> {
		if let Type::Interface(ref mut iface) = **self {
			Some(iface)
		} else {
			None
		}
	}

	pub fn maybe_unwrap_option(&self) -> &Self {
		if let Type::Optional(ref t) = **self {
			t
		} else {
			self
		}
	}

	pub fn as_function_sig(&self) -> Option<&FunctionSignature> {
		if let Type::Function(ref sig) = **self {
			Some(sig)
		} else {
			None
		}
	}

	pub fn as_function_sig_mut(&mut self) -> Option<&mut FunctionSignature> {
		if let Type::Function(ref mut sig) = **self {
			Some(sig)
		} else {
			None
		}
	}

	/// Returns the function sig from a function type, or the closure handler method of a class or interface
	pub fn as_deep_function_sig(&self) -> Option<&FunctionSignature> {
		if matches!(**self, Type::Function(_)) {
			return self.as_function_sig();
		}

		if let Some(class) = self.as_class() {
			if let LookupResult::Found(method, _) = class.get_env().lookup_ext(&CLOSURE_CLASS_HANDLE_METHOD.into(), None) {
				return method.as_variable()?.type_.as_function_sig();
			}
		}

		if let Some(interface) = self.as_interface() {
			if let LookupResult::Found(method, _) = interface
				.get_env()
				.lookup_ext(&CLOSURE_CLASS_HANDLE_METHOD.into(), None)
			{
				return method.as_variable()?.type_.as_function_sig();
			}
		}

		None
	}

	pub fn is_anything(&self) -> bool {
		matches!(**self, Type::Anything)
	}

	pub fn is_inferred(&self) -> bool {
		matches!(**self, Type::Inferred(_))
	}

	pub fn is_unresolved(&self) -> bool {
		matches!(**self, Type::Unresolved)
	}

	pub fn is_json(&self) -> bool {
		if let Type::Json(_) | Type::MutJson = **self {
			return true;
		} else {
			false
		}
	}

	pub fn is_preflight_class(&self) -> bool {
		if let Type::Class(ref class) = **self {
			return class.phase == Phase::Preflight;
		}

		return false;
	}

	pub fn is_preflight_object_type(&self) -> bool {
		if let Type::Class(ref class) = **self {
			return class.phase == Phase::Preflight;
		}

		if let Type::Interface(ref iface) = **self {
			return iface.phase == Phase::Preflight;
		}

		false
	}

	/// Returns whether type represents a closure (either a function or a closure class).
	pub fn is_closure(&self) -> bool {
		self.as_function_sig().is_some() || self.is_closure_class()
	}

	/// Returns whether type represents a class representing an inflight closure.
	pub fn is_closure_class(&self) -> bool {
		if let Some(ref class) = self.as_class() {
			return class.get_closure_method().is_some() && class.defined_in_phase == Phase::Preflight;
		}
		false
	}

	pub fn is_string(&self) -> bool {
		matches!(**self, Type::String)
	}

	pub fn is_number(&self) -> bool {
		matches!(**self, Type::Number)
	}

	pub fn is_struct(&self) -> bool {
		matches!(**self, Type::Struct(_))
	}

	pub fn is_map(&self) -> bool {
		matches!(**self, Type::Map(_) | Type::MutMap(_))
	}

	pub fn is_void(&self) -> bool {
		matches!(**self, Type::Void)
	}

	pub fn is_option(&self) -> bool {
		// "any" can also be `nil`
		matches!(**self, Type::Optional(_) | Type::Anything)
	}

	/// Same as is_option, but does not consider `anything` as an optional
	pub fn is_strict_option(&self) -> bool {
		matches!(**self, Type::Optional(_))
	}

	pub fn is_immutable_collection(&self) -> bool {
		matches!(**self, Type::Array(_) | Type::Map(_) | Type::Set(_))
	}

	pub fn is_inflight_function(&self) -> bool {
		if let Type::Function(ref sig) = **self {
			sig.phase == Phase::Inflight
		} else {
			false
		}
	}

	pub fn is_function_sig(&self) -> bool {
		matches!(**self, Type::Function(_))
	}

	pub fn is_enum(&self) -> bool {
		matches!(**self, Type::Enum(_))
	}

	pub fn is_stringable(&self) -> bool {
		matches!(
			**self,
			Type::String | Type::Number | Type::Boolean | Type::Json(_) | Type::MutJson | Type::Enum(_) | Type::Anything
		)
	}

	/// If this is a function and its last argument is a struct, return that struct.
	pub fn get_function_struct_arg(&self) -> Option<&Struct> {
		if let Some(func) = self.maybe_unwrap_option().as_function_sig() {
			if let Some(arg) = func.parameters.last() {
				return arg.typeref.maybe_unwrap_option().as_struct();
			}
		}

		None
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
			Type::Optional(t) => t.collection_item_type(),
			_ => None,
		}
	}

	pub fn is_mutable_collection(&self) -> bool {
		matches!(**self, Type::MutArray(_) | Type::MutMap(_) | Type::MutSet(_))
	}

	pub fn is_iterable(&self) -> bool {
		matches!(
			**self,
			Type::Array(_) | Type::Set(_) | Type::MutArray(_) | Type::MutSet(_)
		)
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

	pub fn is_serializable(&self) -> bool {
		match &**self {
			// serializable
			Type::Anything => true,
			Type::Number => true,
			Type::String => true,
			Type::Boolean => true,
			Type::Void => true,
			Type::Json(_) => true,
			Type::MutJson => true,
			Type::Nil => true,
			Type::Unresolved => true,
			Type::Optional(t) => t.is_serializable(),
			Type::Array(t) => t.is_serializable(),
			Type::MutArray(t) => t.is_serializable(),
			Type::Map(t) => t.is_serializable(),
			Type::MutMap(t) => t.is_serializable(),
			Type::Struct(s) => s.fields(true).map(|(_, v)| v.type_).all(|t| t.is_serializable()),
			Type::Enum(_) => true,
			// not serializable
			Type::Duration => false,
			Type::Inferred(_) => false,
			Type::Set(_) => false,
			Type::MutSet(_) => false,
			Type::Function(_) => false,
			Type::Class(_) => false,
			Type::Interface(_) => false,
			Type::Stringable => false,
		}
	}

	pub fn is_nil(&self) -> bool {
		match &**self {
			Type::Nil => true,
			Type::Array(t) => t.is_nil(),
			Type::MutArray(t) => t.is_nil(),
			Type::Map(t) => t.is_nil(),
			Type::MutMap(t) => t.is_nil(),
			Type::Set(t) => t.is_nil(),
			Type::MutSet(t) => t.is_nil(),
			_ => false,
		}
	}

	pub fn is_json_legal_value(&self) -> bool {
		match &**self {
			Type::Number => true,
			Type::String => true,
			Type::Boolean => true,
			Type::MutJson | Type::Json(None) => true,
			Type::Inferred(..) => true,
			Type::Array(v) => v.is_json_legal_value(),
			Type::Map(v) => v.is_json_legal_value(),
			Type::Struct(ref s) => {
				for t in s.fields(true).map(|(_, v)| v.type_) {
					if !t.is_json_legal_value() {
						return false;
					}
				}
				true
			}
			Type::Optional(v) => v.is_json_legal_value(),
			Type::Json(Some(v)) => match &v.kind {
				JsonDataKind::Type(SpannedTypeInfo { type_, .. }) => type_.is_json_legal_value(),
				JsonDataKind::Fields(fields) => {
					for (_, SpannedTypeInfo { type_, .. }) in fields {
						if !type_.is_json_legal_value() {
							return false;
						}
					}
					true
				}
				JsonDataKind::List(list) => {
					for SpannedTypeInfo { type_, .. } in list {
						if !type_.is_json_legal_value() {
							return false;
						}
					}
					true
				}
			},
			_ => false,
		}
	}

	// This is slightly different than is_json_legal_value in that its purpose
	// is to determine if a type can be represented in JSON before we allow users to attempt
	// convert from Json
	pub fn has_json_representation(&self) -> bool {
		match &**self {
			Type::Struct(s) => {
				// check all its fields are json compatible
				for t in s.fields(true).map(|(_, v)| v.type_) {
					if !t.has_json_representation() {
						return false;
					}
				}
				true
			}
			Type::Optional(t) | Type::Array(t) | Type::Set(t) | Type::Map(t) => t.has_json_representation(),
			_ => self.is_json_legal_value(),
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

struct ResolvedExpression {
	type_: TypeRef,
	phase: Phase,
}

/// In Wing projects that have both files and directories, type information is stored like so:
///
/// "src/subdir/inner/widget.w" -> SymbolEnv { "Widget": TypeRef } = SE1
/// "src/subdir/inner/" -> Namespace { envs: [SE1] } = NS1
/// "src/subdir/foo.w" -> SymbolEnv { "Foo": TypeRef } = SE2
/// "src/subdir/bar.w" -> SymbolEnv { "Bar": TypeRef } = SE3
/// "src/subdir/" -> Namespace { envs: [SE2, SE3, SymbolEnv { "inner": NS1 }] } = NS2
///
/// Then when a file at "src/main.w" has a statement `bring "./subdir" as subdir;`,
/// it retrieves NS2 from the types.source_file_envs map and adds it to the main file's symbol environment
/// under the symbol "subdir".
#[derive(Debug)]
pub enum SymbolEnvOrNamespace {
	SymbolEnv(SymbolEnvRef),
	Namespace(NamespaceRef),
	Error(Diagnostic),
}

/// File-unique identifier for each necessary inference while type checking. This is an index of the Types.inferences vec.
/// There will always be an entry for each InferenceId.
pub type InferenceId = usize;

pub struct Types {
	// TODO: Remove the box and change TypeRef and NamespaceRef to just be indices into the types array and namespaces array respectively
	// Note: we need the box so reallocations of the vec while growing won't change the addresses of the types since they are referenced from the TypeRef struct
	types: Vec<Box<Type>>,
	namespaces: Vec<Box<Namespace>>,
	symbol_envs: Vec<Box<SymbolEnv>>,
	/// A map from source paths to type information about that path
	/// If it's a file, we save its symbol environment, and if it's a directory, we save a namespace that points to
	/// all of the symbol environments of the files (or subdirectories) in that directory
	pub source_file_envs: IndexMap<Utf8PathBuf, SymbolEnvOrNamespace>,
	pub libraries: SymbolEnv,
	pub intrinsics: SymbolEnv,
	numeric_idx: usize,
	string_idx: usize,
	bool_idx: usize,
	duration_idx: usize,
	anything_idx: usize,
	void_idx: usize,
	json_idx: usize,
	mut_json_idx: usize,
	nil_idx: usize,
	err_idx: usize,
	stringable_idx: usize,

	inferences: Vec<Option<TypeRef>>,
	/// Lookup table from an Expr's `id` to its resolved type and phase
	type_for_expr: Vec<Option<ResolvedExpression>>,
	/// Lookup table from an Expr's `id` to the type it's being cast to. The Expr is always a Json literal or Json map literal.
	json_literal_casts: IndexMap<ExprId, TypeRef>,
	/// Lookup table from a Scope's `id` to its symbol environment
	scope_envs: Vec<Option<SymbolEnvRef>>,
	/// Expressions used in references that actually refer to a type.
	/// Key is the ExprId of the object of a InstanceMember, and the value is a TypeMember representing the whole reference.
	type_expressions: IndexMap<ExprId, Reference>,
	/// Append empty struct to end of arg list
	pub append_empty_struct_to_arglist: HashSet<ArgListId>,
	/// Class counter, used to generate unique ids for class types
	pub class_counter: usize,
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
		types.push(Box::new(Type::Json(None)));
		let json_idx = types.len() - 1;
		types.push(Box::new(Type::MutJson));
		let mut_json_idx = types.len() - 1;
		types.push(Box::new(Type::Nil));
		let nil_idx = types.len() - 1;
		types.push(Box::new(Type::Unresolved));
		let err_idx = types.len() - 1;
		types.push(Box::new(Type::Stringable));
		let stringable_idx = types.len() - 1;

		Self {
			types,
			namespaces: Vec::new(),
			symbol_envs: Vec::new(),
			source_file_envs: IndexMap::new(),
			numeric_idx,
			string_idx,
			bool_idx,
			duration_idx,
			anything_idx,
			void_idx,
			json_idx,
			mut_json_idx,
			nil_idx,
			err_idx,
			stringable_idx,
			type_for_expr: Vec::new(),
			json_literal_casts: IndexMap::new(),
			scope_envs: Vec::new(),
			inferences: Vec::new(),
			type_expressions: IndexMap::new(),
			append_empty_struct_to_arglist: HashSet::new(),
			libraries: SymbolEnv::new(None, SymbolEnvKind::Scope, Phase::Preflight, 0),
			intrinsics: SymbolEnv::new(None, SymbolEnvKind::Scope, Phase::Independent, 0),
			// 1 based to avoid conflict with imported JSII classes. This isn't strictly needed since brought JSII classes are never accessed
			// through their unique ID, but still good to avoid confusion.
			class_counter: 1,
		}
	}

	pub fn number(&self) -> TypeRef {
		self.get_typeref(self.numeric_idx)
	}

	pub fn string(&self) -> TypeRef {
		self.get_typeref(self.string_idx)
	}

	pub fn stringable(&self) -> TypeRef {
		self.get_typeref(self.stringable_idx)
	}

	pub fn nil(&self) -> TypeRef {
		self.get_typeref(self.nil_idx)
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

	pub fn error(&self) -> TypeRef {
		self.get_typeref(self.err_idx)
	}

	pub fn void(&self) -> TypeRef {
		self.get_typeref(self.void_idx)
	}

	pub fn add_type(&mut self, t: Type) -> TypeRef {
		self.types.push(Box::new(t));
		self.get_typeref(self.types.len() - 1)
	}

	/// If the type is inferred and the real type is known, return it.
	///
	/// Otherwise, return the type itself.
	/// If a chain of inferences is found, return the last type in the chain (which may itself be an inference).
	///
	/// Note: This function is recursive, so it will unwrap nested inferred types.
	pub fn maybe_unwrap_inference(&self, t: TypeRef) -> TypeRef {
		if let Type::Inferred(id) = &*t {
			if let Some(t) = self.get_inference_by_id(*id) {
				self.maybe_unwrap_inference(t)
			} else {
				t
			}
		} else {
			t
		}
	}

	/// If the given type is inferred and the real type is known, return it
	pub fn get_inference(&self, t: TypeRef) -> Option<TypeRef> {
		if let Type::Inferred(id) = *t {
			self.get_inference_by_id(id)
		} else {
			None
		}
	}

	/// If the real type is known for the given inference id, return it
	pub fn get_inference_by_id(&self, id: InferenceId) -> Option<TypeRef> {
		if let Some(t) = self.inferences.get(id).expect("Inference id out of bounds") {
			return Some(*t);
		}

		None
	}

	/// Update an unlinked inference with a given type.
	/// If the inference is already linked, add diagnostic unless the type is the same.
	pub fn update_inferred_type(&mut self, id: InferenceId, new_type: TypeRef, span: &WingSpan) {
		if let Type::Inferred(n) = &*new_type {
			if *n == id {
				// setting an inference to be itself is a no-op
				return;
			}
		}

		let error = self.error();
		let existing_type_option = self.inferences.get_mut(id).expect("Inference id out of bounds");

		if let Some(existing_type) = existing_type_option {
			// if the types are the same, ok, otherwise error
			if existing_type.is_same_type_as(&new_type) || existing_type.is_unresolved() {
				// this can happen when we have a type that can have multiple references to the same inference inside it
				// e.g. function, json
				return;
			} else {
				report_diagnostic(Diagnostic {
					message: format!("Inferred type {new_type} conflicts with already inferred type {existing_type}"),
					span: Some(span.clone()),
					annotations: vec![],
					hints: vec![],
					severity: DiagnosticSeverity::Error,
				});
				existing_type_option.replace(error);
				return;
			}
		}

		existing_type_option.replace(new_type);
	}

	pub fn make_inference(&mut self) -> TypeRef {
		let id = self.inferences.len();
		self.inferences.push(None);
		self.add_type(Type::Inferred(id))
	}

	pub fn as_inference(&mut self, t: TypeRef) -> Option<InferenceId> {
		match *t {
			Type::Inferred(id) => Some(id),
			_ => None,
		}
	}

	/// Get the optional version of a given type.
	///
	/// If the type is already optional, return it as-is.
	pub fn make_option(&mut self, t: TypeRef) -> TypeRef {
		if t.is_option() {
			t
		} else {
			self.add_type(Type::Optional(t))
		}
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

	pub fn add_namespace(&mut self, n: Namespace) -> NamespaceRef {
		self.namespaces.push(Box::new(n));
		self.get_namespaceref(self.namespaces.len() - 1)
	}

	fn get_namespaceref(&self, idx: usize) -> NamespaceRef {
		let t = &self.namespaces[idx];
		UnsafeRef::<Namespace>(&**t as *const Namespace)
	}

	pub fn add_symbol_env(&mut self, s: SymbolEnv) -> SymbolEnvRef {
		self.symbol_envs.push(Box::new(s));
		self.get_symbolenvref(self.symbol_envs.len() - 1)
	}

	fn get_symbolenvref(&self, idx: usize) -> SymbolEnvRef {
		let t = &self.symbol_envs[idx];
		UnsafeRef::<SymbolEnv>(&**t as *const SymbolEnv)
	}

	pub fn resource_base_type(&self) -> TypeRef {
		let resource_fqn = format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE);
		self
			.libraries
			.lookup_nested_str(&resource_fqn, None)
			.expect("Resource base class to be loaded")
			.0
			.as_type()
			.expect("Resource base class to be a type")
	}

	pub fn resource_base_interface(&self) -> TypeRef {
		let resource_fqn = format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_IRESOURCE);
		self
			.libraries
			.lookup_nested_str(&resource_fqn, None)
			.expect("Resource base interface to be loaded")
			.0
			.as_type()
			.expect("Resource base interface to be a type")
	}

	pub fn construct_base_type(&self) -> TypeRef {
		self
			.libraries
			.lookup_nested_str(&CONSTRUCT_BASE_CLASS, None)
			.expect("Construct base class to be loaded")
			.0
			.as_type()
			.expect("Construct base class to be a type")
	}

	pub fn construct_interface(&self) -> TypeRef {
		self
			.libraries
			.lookup_nested_str(&CONSTRUCT_BASE_INTERFACE, None)
			.expect("Construct interface to be loaded")
			.0
			.as_type()
			.expect("Construct interface to be a type")
	}

	/// Stores the type and phase of a given expression node.
	pub fn assign_type_to_expr(&mut self, expr: &Expr, type_: TypeRef, phase: Phase) {
		let expr_idx = expr.id;
		if self.type_for_expr.len() <= expr_idx {
			self.type_for_expr.resize_with(expr_idx + 1, || None);
		}
		self.type_for_expr[expr_idx] = Some(ResolvedExpression { type_, phase });
	}

	/// Obtain the type of a given expression node. Will panic if the expression has not been type checked yet.
	pub fn get_expr_type(&self, expr: &Expr) -> TypeRef {
		self.get_expr_id_type(expr.id)
	}

	/// Obtain the type of a given expression id. Will panic if the expression has not been type checked yet.
	pub fn get_expr_id_type(&self, expr_id: ExprId) -> TypeRef {
		*self.get_expr_id_type_ref(expr_id)
	}

	/// Obtain the type of a given expression id. Will panic if the expression has not been type checked yet.
	pub fn get_expr_id_type_ref(&self, expr_id: ExprId) -> &TypeRef {
		self
			.type_for_expr
			.get(expr_id)
			.and_then(|t| t.as_ref().map(|t| &t.type_))
			.unwrap()
	}

	/// Sets the type environment for a given scope. Usually should be called soon
	/// after the scope is created.
	pub fn set_scope_env(&mut self, scope: &Scope, env: SymbolEnvRef) {
		let scope_id = scope.id;
		if self.scope_envs.len() <= scope_id {
			self.scope_envs.resize_with(scope_id + 1, || None);
		}
		assert!(self.scope_envs[scope_id].is_none());
		self.scope_envs[scope_id] = Some(env);
	}

	/// Obtain the type environment for a given scope.
	pub fn get_scope_env(&self, scope: &Scope) -> SymbolEnvRef {
		let scope_id = scope.id;
		self.scope_envs[scope_id].expect("Scope should have an env")
	}

	/// Obtain the type of a given expression id. Returns None if the expression has not been type checked yet. If
	/// this is called after type checking, it should always return Some.
	pub fn try_get_expr_type(&self, expr_id: ExprId) -> Option<TypeRef> {
		self
			.type_for_expr
			.get(expr_id)
			.and_then(|t| t.as_ref().map(|t| t.type_))
	}

	pub fn get_expr_phase(&self, expr: &Expr) -> Option<Phase> {
		self
			.type_for_expr
			.get(expr.id)
			.and_then(|t| t.as_ref().map(|t| t.phase))
	}

	/// Get the type that a JSON literal expression was cast to.
	pub fn get_type_from_json_cast(&self, expr_id: ExprId) -> Option<&TypeRef> {
		self.json_literal_casts.get(&expr_id)
	}

	/// Given a builtin type, return the full class info from the standard library.
	///
	/// This is needed because our builtin types have no API.
	/// So we have to get the API from the std lib
	/// but the std lib sometimes doesn't have the same names as the builtin types
	/// https://github.com/winglang/wing/issues/1780
	///
	/// Note: This doesn't handle generics (i.e. this keeps the `T1`)
	pub fn get_std_class(&self, type_: &TypeRef) -> Option<(&SymbolKind, symbol_env::SymbolLookupInfo)> {
		let type_name = match &**type_ {
			Type::Number => "Number",
			Type::String => "String",
			Type::Boolean => "Boolean",
			Type::Duration => "Duration",
			Type::Json(_) => "Json",
			Type::MutJson => "MutJson",
			Type::Array(_) => "Array",
			Type::MutArray(_) => "MutArray",
			Type::Map(_) => "Map",
			Type::MutMap(_) => "MutMap",
			Type::Set(_) => "Set",
			Type::MutSet(_) => "MutSet",
			Type::Struct(_) => "Struct",

			Type::Optional(t) => return self.get_std_class(t),

			Type::Function(_)
			| Type::Class(_)
			| Type::Interface(_)
			| Type::Enum(_)
			| Type::Stringable
			| Type::Void
			| Type::Nil
			| Type::Anything
			| Type::Unresolved
			| Type::Inferred(_) => return None,
		};

		let fqn = format!("{WINGSDK_ASSEMBLY_NAME}.{WINGSDK_STD_MODULE}.{type_name}");

		self.libraries.lookup_nested_str(fqn.as_str(), None).ok()
	}
}

/// Enum of builtin functions, this are defined as hard coded AST nodes in `add_builtins`
#[derive(Debug)]
pub enum UtilityFunctions {
	Log,
	Assert,
	UnsafeCast,
	Nodeof,
}

impl Display for UtilityFunctions {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			UtilityFunctions::Log => write!(f, "log"),
			UtilityFunctions::Assert => write!(f, "assert"),
			UtilityFunctions::UnsafeCast => write!(f, "unsafeCast"),
			UtilityFunctions::Nodeof => write!(f, "nodeof"),
		}
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
	inner_scopes: Vec<(*const Scope, VisitContext)>,

	/// The path to the source file being type checked.
	source_path: &'a Utf8Path,

	/// The file graph of the compilation.
	file_graph: &'a FileGraph,

	/// JSII Manifest descriptions to be imported.
	/// May be reused between compilations
	jsii_imports: &'a mut Vec<JsiiImportSpec>,

	/// The JSII type system
	jsii_types: &'a mut TypeSystem,

	is_in_mut_json: bool,

	ctx: VisitContext,
}

impl<'a> TypeChecker<'a> {
	pub fn new(
		types: &'a mut Types,
		source_path: &'a Utf8Path,
		file_graph: &'a FileGraph,
		jsii_types: &'a mut TypeSystem,
		jsii_imports: &'a mut Vec<JsiiImportSpec>,
	) -> Self {
		Self {
			types,
			inner_scopes: vec![],
			jsii_types,
			source_path,
			file_graph,
			jsii_imports,
			is_in_mut_json: false,
			ctx: VisitContext::new(),
		}
	}

	/// Recursively check if a type is or contains a type inference.
	///
	/// Returns true if any inferences were found.
	fn check_for_inferences(&self, node: &TypeRef) -> bool {
		let mut visitor = InferenceCounterVisitor::default();

		visitor.visit_typeref(node);

		visitor.found_inference
	}

	/// Recursively check if a type is or contains a type inference.
	/// If it does, use the expected type to update the list of known inferences.
	///
	/// Returns true if any inferences were found.
	fn add_new_inference(&mut self, node: &TypeRef, expected_type: &TypeRef, span: &WingSpan) -> bool {
		let mut visitor = InferenceVisitor {
			types: self.types,
			found_inference: false,
			expected_type: Some(expected_type),
			span,
		};

		visitor.visit_typeref(node);

		visitor.found_inference
	}

	/// Recursively replaces any inferences in the given type with it's known type, if any.
	///
	/// Returns true if any inferences were found.
	fn update_known_inferences(&mut self, node: &mut TypeRef, span: &WingSpan) -> bool {
		let mut visitor = InferenceVisitor {
			types: self.types,
			found_inference: false,
			expected_type: None,
			span,
		};

		visitor.visit_typeref_mut(node);

		visitor.found_inference
	}

	fn spanned_error_with_var<S: Into<String>>(&self, spanned: &impl Spanned, message: S) -> (VariableInfo, Phase) {
		report_diagnostic(Diagnostic {
			message: message.into(),
			span: Some(spanned.span()),
			annotations: vec![],
			hints: vec![],
			severity: DiagnosticSeverity::Error,
		});

		(self.make_error_variable_info(), Phase::Independent)
	}

	fn spanned_error<S: Into<String>>(&self, spanned: &impl Spanned, message: S) {
		report_diagnostic(Diagnostic {
			message: message.into(),
			span: Some(spanned.span()),
			annotations: vec![],
			hints: vec![],
			severity: DiagnosticSeverity::Error,
		});
	}

	fn spanned_error_with_hints<S: ToString, H: ToString>(&self, spanned: &impl Spanned, message: S, hints: &[H]) {
		report_diagnostic(Diagnostic {
			message: message.to_string(),
			span: Some(spanned.span()),
			annotations: vec![],
			hints: hints.iter().map(|h| h.to_string()).collect(),
			severity: DiagnosticSeverity::Error,
		});
	}

	fn spanned_error_with_annotations<S: Into<String>>(
		&self,
		spanned: &impl Spanned,
		message: S,
		annotations: Vec<DiagnosticAnnotation>,
	) {
		report_diagnostic(Diagnostic {
			message: message.into(),
			span: Some(spanned.span()),
			annotations,
			hints: vec![],
			severity: DiagnosticSeverity::Error,
		});
	}

	fn unspanned_error<S: Into<String>>(&self, message: S) {
		report_diagnostic(Diagnostic {
			message: message.into(),
			span: None,
			annotations: vec![],
			hints: vec![],
			severity: DiagnosticSeverity::Error,
		});
	}

	fn type_error(&self, type_error: TypeError) -> TypeRef {
		let TypeError {
			message,
			span,
			annotations,
			hints,
		} = type_error;
		report_diagnostic(Diagnostic {
			message,
			span: Some(span),
			annotations,
			hints,
			severity: DiagnosticSeverity::Error,
		});

		self.types.error()
	}

	fn make_error_variable_info(&self) -> VariableInfo {
		VariableInfo {
			name: "<error>".into(),
			type_: self.types.error(),
			reassignable: false,
			phase: Phase::Independent,
			kind: VariableKind::Error,
			access: AccessModifier::Public,
			docs: None,
		}
	}

	pub fn add_this(&mut self, env: &mut SymbolEnv) {
		let sym = Symbol::global("this");
		env
			.define(
				&sym,
				SymbolKind::make_free_variable(sym.clone(), self.types.construct_base_type(), false, Phase::Preflight),
				AccessModifier::Private,
				StatementIdx::Top,
			)
			.expect("Failed to add this");
	}

	/// Patch some of the types from the "constructs" package to provide a better DX
	pub fn patch_constructs(&mut self) {
		// Hide the "node" field from constructs so that users go through
		// the `nodeof` utility function to get the tree node of a construct.
		// The `Node` instance provided by Wing has some extra methods not
		// available in the constructs package, and also modifies how the
		// root node is obtained.
		let mut constructs_iface = self
			.types
			.libraries
			.lookup_nested_str(&CONSTRUCT_BASE_INTERFACE, None)
			.expect("constructs.IConstruct not found in type system")
			.0
			.as_type()
			.expect("constructs.IConstruct was found but it's not a type");
		let iface = constructs_iface
			.as_interface_mut()
			.expect("constructs.IConstruct was found but it's not a class");
		iface.env.symbol_map.remove(CONSTRUCT_NODE_PROPERTY);

		let mut constructs_class = self
			.types
			.libraries
			.lookup_nested_str(&CONSTRUCT_BASE_CLASS, None)
			.expect("constructs.Construct not found in type system")
			.0
			.as_type()
			.expect("constructs.Construct was found but it's not a type");
		let class = constructs_class
			.as_class_mut()
			.expect("constructs.Construct was found but it's not a class");
		class.env.symbol_map.remove(CONSTRUCT_NODE_PROPERTY);
	}

	pub fn add_builtins(&mut self, scope: &mut Scope) {
		let optional_string = self.types.make_option(self.types.string());
		self.add_builtin(
			UtilityFunctions::Log.to_string().as_str(),
			Type::Function(FunctionSignature {
				this_type: None,
				parameters: vec![FunctionParameter {
					name: "value".into(),
					typeref: self.types.stringable(),
					docs: Docs::with_summary("The value to log"),
					variadic: false,
				}],
				return_type: self.types.void(),
				phase: Phase::Independent,
				js_override: Some("console.log($args$)".to_string()),
				is_macro: false,
				docs: Docs::with_summary("Logs a value"),
				implicit_scope_param: false,
			}),
			scope,
		);
		self.add_builtin(
			UtilityFunctions::Assert.to_string().as_str(),
			Type::Function(FunctionSignature {
				this_type: None,
				parameters: vec![
					FunctionParameter {
						name: "condition".into(),
						typeref: self.types.bool(),
						docs: Docs::with_summary("The condition to assert"),
						variadic: false,
					},
					FunctionParameter {
						name: "message".into(),
						typeref: optional_string,
						docs: Docs::with_summary("The message to log if the condition is false"),
						variadic: false,
					},
				],
				return_type: self.types.void(),
				phase: Phase::Independent,
				js_override: Some("$helpers.assert($args$, \"$args_text$\")".to_string()),
				is_macro: false,
				docs: Docs::with_summary("Asserts that a condition is true"),
				implicit_scope_param: false,
			}),
			scope,
		);
		self.add_builtin(
			UtilityFunctions::UnsafeCast.to_string().as_str(),
			Type::Function(FunctionSignature {
				this_type: None,
				parameters: vec![FunctionParameter {
					name: "value".into(),
					typeref: self.types.anything(),
					docs: Docs::with_summary("The value to cast into a different type"),
					variadic: false,
				}],
				return_type: self.types.anything(),
				phase: Phase::Independent,
				js_override: Some("$args$".to_string()),
				is_macro: false,
				docs: Docs::with_summary("Casts a value into a different type. This is unsafe and can cause runtime errors"),
				implicit_scope_param: false,
			}),
			scope,
		);

		let std_node_fqn = format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_NODE);
		let std_node = self
			.types
			.libraries
			.lookup_nested_str(&std_node_fqn, None)
			.expect("std.Node not found in type system")
			.0
			.as_type()
			.expect("std.Node was found but it's not a type");
		self.add_builtin(
			UtilityFunctions::Nodeof.to_string().as_str(),
			Type::Function(FunctionSignature {
				this_type: None,
				parameters: vec![FunctionParameter {
					name: "construct".into(),
					typeref: self.types.construct_interface(),
					docs: Docs::with_summary("The construct to obtain the tree node of"),
					variadic: false,
				}],
				return_type: std_node,
				phase: Phase::Preflight,
				js_override: Some("$helpers.nodeof($args$)".to_string()),
				is_macro: false,
				docs: Docs::with_summary("Obtain the tree node of a preflight resource."),
				implicit_scope_param: false,
			}),
			scope,
		);

		// Intrinsics
		let _ = self.types.intrinsics.define(
			&Symbol::global(IntrinsicKind::Dirname.to_string()),
			SymbolKind::Variable(VariableInfo {
				access: AccessModifier::Public,
				name: Symbol::global(IntrinsicKind::Dirname.to_string()),
				docs: Some(Docs::with_summary(r#"Get the normalized absolute path of the current source file's directory.

The resolved path represents a path during preflight only and is not guaranteed to be valid while inflight.
It should primarily be used in preflight or in inflights that are guaranteed to be executed in the same filesystem where preflight executed."#)),
				kind: VariableKind::StaticMember,
				phase: Phase::Preflight,
				type_: self.types.string(),
				reassignable: false,
			}),
			AccessModifier::Public,
			StatementIdx::Top,
		);

		let import_inflight_options_fqn = format!("{}.std.ImportInflightOptions", WINGSDK_ASSEMBLY_NAME);
		let import_inflight_options = self
			.types
			.libraries
			.lookup_nested_str(&import_inflight_options_fqn, None)
			.expect("std.ImportInflightOptions not found in type system")
			.0
			.as_type()
			.expect("std.ImportInflightOptions was found but it's not a type");
		let inflight_t = Type::Function(FunctionSignature {
			this_type: None,
			parameters: vec![
				FunctionParameter {
					name: "file".into(),
					typeref: self.types.string(),
					docs: Docs::with_summary("Path to extern file to create inflight. Relative to the current wing file."),
					variadic: false,
				},
				FunctionParameter {
					name: "options".into(),
					typeref: self.types.make_option(import_inflight_options),
					docs: import_inflight_options.as_struct().unwrap().docs.clone(),
					variadic: false,
				},
			],
			// In practice, this function returns an inferred type upon each use
			return_type: self.types.anything(),
			phase: Phase::Preflight,
			// The emitted JS is dynamic
			js_override: None,
			is_macro: false,
			docs: Docs::with_summary(
				r#"Create an inflight function from the given file.
The file must be a JavaScript or TypeScript file with a default export that matches the inferred return where `@inflight` is used.

For example:

```wing
bring cloud;
new cloud.Function(@inflight("./handler.ts"));
```

`./handler.ts` Must default export an `async ({}, string?) => string?` function. The first argument is anything lifted into that function, e.g.:

```wing
let bucket = new cloud.Bucket();
new cloud.Function(@inflight("./handler.ts"), lifts: { bucket: ["put"] });
```
"#,
			),
			implicit_scope_param: false,
		});
		let inflight_t = self.types.add_type(inflight_t);
		let _ = self.types.intrinsics.define(
			&IntrinsicKind::Inflight.clone().into(),
			SymbolKind::Variable(VariableInfo {
				access: AccessModifier::Public,
				name: IntrinsicKind::Inflight.into(),
				docs: None,
				kind: VariableKind::StaticMember,
				phase: Phase::Preflight,
				type_: inflight_t,
				reassignable: false,
			}),
			AccessModifier::Public,
			StatementIdx::Top,
		);
	}

	fn add_builtin(&mut self, name: &str, typ: Type, scope: &mut Scope) {
		let sym = Symbol::global(name);
		let mut scope_env = self.types.get_scope_env(&scope);
		scope_env
			.define(
				&sym,
				SymbolKind::make_free_variable(sym.clone(), self.types.add_type(typ), false, Phase::Independent),
				AccessModifier::Private,
				StatementIdx::Top,
			)
			.expect("Failed to add builtin");
	}

	// Validates types in the expression make sense and returns the expression's inferred type
	fn type_check_exp(&mut self, exp: &Expr, env: &mut SymbolEnv) -> (TypeRef, Phase) {
		CompilationContext::set(CompilationPhase::TypeChecking, &exp.span);

		let (mut t, phase) = match &exp.kind {
			ExprKind::Literal(lit) => self.type_check_lit(lit, env),
			ExprKind::Binary { op, left, right } => self.type_check_binary_op(left, env, right, op, exp),
			ExprKind::Unary { op, exp: unary_exp } => self.type_check_unary_op(unary_exp, env, op),
			ExprKind::Range { start, end, .. } => self.type_check_range(start, env, end),
			ExprKind::Reference(_ref) => self.type_check_reference(_ref, env),
			ExprKind::Intrinsic(intrinsic) => self.type_check_intrinsic(intrinsic, env, exp),
			ExprKind::New(new_expr) => self.type_check_new(new_expr, env, exp),
			ExprKind::Call { callee, arg_list } => self.type_check_call(arg_list, env, callee, exp),
			ExprKind::ArrayLiteral { type_, items } => self.type_check_array_lit(type_, env, exp, items),
			ExprKind::MapLiteral { fields, type_ } => self.type_check_map_lit(type_, env, fields, exp),
			ExprKind::SetLiteral { type_, items } => self.type_check_set_lit(type_, env, items, exp),
			ExprKind::StructLiteral { type_, fields } => self.type_check_struct_lit(type_, env, fields, exp),
			ExprKind::JsonLiteral { is_mut, element } => self.type_check_json_lit(is_mut, element, env, exp),
			ExprKind::JsonMapLiteral { fields } => self.type_check_json_map_lit(fields, env, exp),
			ExprKind::FunctionClosure(func_def) => self.type_check_closure(func_def, env),
			ExprKind::CompilerDebugPanic => {
				// Handle the debug panic expression (during type-checking)
				dbg_panic!();
				(
					self.type_error(TypeError {
						message: "Panic expression".to_string(),
						span: exp.span.clone(),
						annotations: vec![],
						hints: vec![],
					}),
					env.phase,
				)
			}
		};

		// If we're inflight but the expression is a lifted (preflight) expression then make it immutable
		if env.phase == Phase::Inflight && phase == Phase::Preflight {
			t = self.make_immutable(t);
		}

		self.types.assign_type_to_expr(exp, t, phase);

		// In case any type inferences were updated during this check, ensure all related inferences are updated
		self.update_known_inferences(&mut t, &exp.span);

		(t, phase)
	}

	fn type_check_lit(&mut self, lit: &Literal, env: &mut SymbolEnv) -> (TypeRef, Phase) {
		match lit {
			Literal::String(_) => (self.types.string(), Phase::Independent),
			Literal::NonInterpolatedString(_) => (self.types.string(), Phase::Independent),
			Literal::Nil => (self.types.nil(), Phase::Independent),
			Literal::InterpolatedString(s) => {
				let mut phase = Phase::Independent;
				s.parts.iter().for_each(|part| {
					if let InterpolatedStringPart::Expr(interpolated_expr) = part {
						let (exp_type, p) = self.type_check_exp(interpolated_expr, env);
						phase = combine_phases(phase, p);
						self.validate_type_in(exp_type, &[self.types.stringable()], interpolated_expr, None, None);
					}
				});
				(self.types.string(), phase)
			}
			Literal::Number(_) => (self.types.number(), Phase::Independent),
			Literal::Boolean(_) => (self.types.bool(), Phase::Independent),
		}
	}

	fn type_check_binary_op(
		&mut self,
		left: &Expr,
		env: &mut SymbolEnv,
		right: &Expr,
		op: &BinaryOperator,
		exp: &Expr,
	) -> (TypeRef, Phase) {
		let (ltype, ltype_phase) = self.type_check_exp(left, env);
		let (rtype, rtype_phase) = self.type_check_exp(right, env);

		// Resolve the phase
		let phase = combine_phases(ltype_phase, rtype_phase);

		match op {
			BinaryOperator::LogicalAnd | BinaryOperator::LogicalOr => {
				self.validate_type(ltype, self.types.bool(), left);
				self.validate_type(rtype, self.types.bool(), right);
				(self.types.bool(), phase)
			}
			BinaryOperator::AddOrConcat => {
				if ltype.is_subtype_of(&self.types.number()) && rtype.is_subtype_of(&self.types.number()) {
					(self.types.number(), phase)
				} else if ltype.is_subtype_of(&self.types.string()) && rtype.is_subtype_of(&self.types.string()) {
					(self.types.string(), phase)
				} else {
					// If any of the types are unresolved (error) then don't report this assuming the error has already been reported
					if !ltype.is_unresolved() && !rtype.is_unresolved() {
						self.spanned_error(
							exp,
							format!(
														"Binary operator '+' cannot be applied to operands of type '{}' and '{}'; only ({}, {}) and ({}, {}) are supported",
														ltype,
														rtype,
														self.types.number(),
														self.types.number(),
														self.types.string(),
														self.types.string(),
													),
						);
					}
					self.resolved_error()
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
				(self.types.number(), phase)
			}
			BinaryOperator::Equal | BinaryOperator::NotEqual => {
				self.validate_type_binary_equality(rtype, ltype, exp, None, None);
				(self.types.bool(), phase)
			}
			BinaryOperator::Less | BinaryOperator::LessOrEqual | BinaryOperator::Greater | BinaryOperator::GreaterOrEqual => {
				self.validate_type(ltype, self.types.number(), left);
				self.validate_type(rtype, self.types.number(), right);
				(self.types.bool(), phase)
			}
			BinaryOperator::UnwrapOr => {
				// Left argument must be an optional type
				if !ltype.is_option() {
					self.spanned_error(left, format!("Expected optional type, found \"{}\"", ltype));
					(ltype, phase)
				} else {
					// Right argument must be a subtype of the inner type of the left argument
					let inner_type = *ltype.maybe_unwrap_option();
					self.validate_type(rtype, inner_type, right);
					(inner_type, phase)
				}
			}
		}
	}

	fn type_check_unary_op(&mut self, unary_exp: &Expr, env: &mut SymbolEnv, op: &UnaryOperator) -> (TypeRef, Phase) {
		let (type_, phase) = self.type_check_exp(unary_exp, env);

		match op {
			UnaryOperator::Not => (self.validate_type(type_, self.types.bool(), unary_exp), phase),
			UnaryOperator::Minus => (self.validate_type(type_, self.types.number(), unary_exp), phase),
			UnaryOperator::OptionalUnwrap => {
				if !type_.is_option() {
					self.spanned_error(unary_exp, format!("'!' expects an optional type, found \"{}\"", type_));
					(type_, phase)
				} else {
					let inner_type = *type_.maybe_unwrap_option();
					(inner_type, phase)
				}
			}
		}
	}

	fn type_check_json_map_lit(
		&mut self,
		fields: &IndexMap<Symbol, Expr>,
		env: &mut SymbolEnv,
		exp: &Expr,
	) -> (TypeRef, Phase) {
		let mut known_types = IndexMap::new();
		fields.iter().for_each(|(name, v)| {
			let (known_type, _) = self.type_check_exp(v, env);
			known_types.insert(
				name.clone(),
				SpannedTypeInfo {
					type_: known_type,
					span: v.span(),
				},
			);
			// Ensure we don't allow MutJson to Json or vice versa
			match *known_type {
				Type::Json(_) => {
					if self.is_in_mut_json {
						self.spanned_error(
							v,
							"\"MutJson\" fields cannot be \"Json\" (hint: try using Json.deepMutCopy())",
						)
					}
				}
				Type::MutJson => {
					if !self.is_in_mut_json {
						self.spanned_error(
							v,
							"\"Json\" fields cannot be \"MutJson\" (hint: try using Json.deepCopy())",
						)
					}
				}
				_ => {}
			};

			if self.is_in_mut_json && !known_type.is_json_legal_value() {
				self.spanned_error(
					v,
					format!(
						"Expected a valid Json value (https://www.json.org/json-en.html), but got \"{}\"",
						known_type
					),
				);
			}
		});

		(
			self.types.add_type(Type::Json(Some(JsonData {
				expression_id: exp.id,
				kind: JsonDataKind::Fields(known_types),
			}))),
			env.phase,
		)
	}

	fn type_check_json_lit(
		&mut self,
		is_mut: &bool,
		element: &Expr,
		env: &mut SymbolEnv,
		exp: &Expr,
	) -> (TypeRef, Phase) {
		if *is_mut {
			self.is_in_mut_json = true;
		}

		self.ctx.push_json();
		let (known_type, _) = self.type_check_exp(&element, env);
		self.ctx.pop_json();

		// When we are no longer in a Json literal, we reset the is_in_mut_json flag
		if !self.ctx.in_json() {
			self.is_in_mut_json = false;
		}

		if *is_mut {
			(self.types.mut_json(), env.phase)
		} else {
			if known_type.is_json() {
				(known_type, env.phase)
			} else {
				(
					self.types.add_type(Type::Json(Some(JsonData {
						expression_id: exp.id,
						kind: JsonDataKind::Type(SpannedTypeInfo {
							type_: known_type,
							span: element.span(),
						}),
					}))),
					env.phase,
				)
			}
		}
	}

	fn type_check_struct_lit(
		&mut self,
		type_: &TypeAnnotation,
		env: &mut SymbolEnv,
		fields: &IndexMap<Symbol, Expr>,
		exp: &Expr,
	) -> (TypeRef, Phase) {
		// Find this struct's type in the environment
		let struct_type = self.resolve_type_annotation(type_, env);

		// Type check each of the struct's fields
		let field_types: IndexMap<Symbol, TypeRef> = fields
			.iter()
			.map(|(name, exp)| {
				let (t, _) = self.type_check_exp(exp, env);
				(name.clone(), t)
			})
			.collect();

		// If we don't have type information for the struct we don't need to validate the fields
		if struct_type.is_anything() || struct_type.is_unresolved() {
			return (struct_type, env.phase);
		}

		// Make sure it really is a struct type
		let st = struct_type
			.as_struct()
			.expect(&format!("Expected \"{}\" to be a struct type", struct_type));

		// Verify that all expected fields are present and are the right type
		for (name, v) in st.fields(true) {
			let field_type = v.type_;
			match fields.get(name.as_str()) {
				Some(field_exp) => {
					let t = field_types.get(name.as_str()).unwrap();
					self.validate_type(*t, field_type, field_exp);
				}
				None => {
					if !field_type.is_option() {
						self.spanned_error(exp, format!("\"{}\" is not initialized", name));
					}
				}
			}
		}

		// Verify that no unexpected fields are present
		for (name, _t) in field_types.iter() {
			if st.env.lookup(name, Some(self.ctx.current_stmt_idx())).is_none() {
				self.spanned_error(exp, format!("\"{}\" is not a field of \"{}\"", name.name, st.name.name));
			}
		}

		(struct_type, env.phase)
	}

	fn type_check_set_lit(
		&mut self,
		type_: &Option<TypeAnnotation>,
		env: &mut SymbolEnv,
		items: &Vec<Expr>,
		exp: &Expr,
	) -> (TypeRef, Phase) {
		// Infer type based on either the explicit type or the value in one of the items
		let (mut container_type, mut element_type) = if let Some(type_) = type_ {
			let container_type = self.resolve_type_annotation(type_, env);
			let element_type = match *container_type {
				Type::Set(t) | Type::MutSet(t) => t,
				_ => {
					self.spanned_error(
						&type_.span,
						format!("Expected \"Set\" or \"MutSet\", found \"{container_type}\""),
					);
					self.types.error()
				}
			};
			(container_type, element_type)
		} else {
			let inner_type = self.types.make_inference();
			(self.types.add_type(Type::Set(inner_type)), inner_type)
		};

		// Verify all types are the same as the inferred type
		for item in items {
			let (t, _) = self.type_check_exp(item, env);

			if t.is_json() && !matches!(*element_type, Type::Json(Some(..))) {
				// this is an set of JSON, change the element type to reflect that
				let json_data = JsonData {
					expression_id: exp.id,
					kind: JsonDataKind::List(vec![]),
				};
				element_type = self.types.add_type(Type::Json(Some(json_data)));
			}

			// Augment the json list data with the new element type
			if let Type::Json(Some(JsonData { ref mut kind, .. })) = &mut *element_type {
				if let JsonDataKind::List(ref mut json_list) = kind {
					json_list.push(SpannedTypeInfo {
						type_: t,
						span: item.span(),
					});
				}
			}

			self.validate_type(t, element_type, item);
			element_type = self.types.maybe_unwrap_inference(element_type);
		}

		if let Type::Set(ref mut inner) | Type::MutSet(ref mut inner) = &mut *container_type {
			*inner = element_type;
		}

		(container_type, env.phase)
	}

	fn type_check_map_lit(
		&mut self,
		type_: &Option<TypeAnnotation>,
		env: &mut SymbolEnv,
		fields: &Vec<(Expr, Expr)>,
		exp: &Expr,
	) -> (TypeRef, Phase) {
		// Infer type based on either the explicit type or the value in one of the fields
		let (mut container_type, mut element_type) = if let Some(type_) = type_ {
			let container_type = self.resolve_type_annotation(type_, env);
			let element_type = match *container_type {
				Type::Map(t) | Type::MutMap(t) => t,
				_ => {
					self.spanned_error(
						&type_.span,
						format!("Expected \"Map\" or \"MutMap\", found \"{container_type}\""),
					);
					self.types.error()
				}
			};
			(container_type, element_type)
		} else {
			let inner_type = self.types.make_inference();
			(self.types.add_type(Type::Map(inner_type)), inner_type)
		};

		// Verify all types are the same as the inferred type and that all keys are of string type
		for (key, value) in fields {
			let (t, _) = self.type_check_exp(value, env);
			if t.is_json() && !matches!(*element_type, Type::Json(Some(..))) {
				// This is an field of JSON, change the element type to reflect that
				let json_data = JsonData {
					expression_id: exp.id,
					kind: JsonDataKind::Fields(IndexMap::new()),
				};
				element_type = self.types.add_type(Type::Json(Some(json_data)));
			}

			self.validate_type(t, element_type, value);
			element_type = self.types.maybe_unwrap_inference(element_type);

			// Verify that the key is a string
			let (key_type, _) = self.type_check_exp(key, env);
			self.validate_type(key_type, self.types.string(), key);
		}

		if let Type::Map(ref mut inner) | Type::MutMap(ref mut inner) = &mut *container_type {
			*inner = element_type;
		}

		(container_type, env.phase)
	}

	fn type_check_array_lit(
		&mut self,
		type_: &Option<TypeAnnotation>,
		env: &mut SymbolEnv,
		exp: &Expr,
		items: &Vec<Expr>,
	) -> (TypeRef, Phase) {
		// Infer type based on either the explicit type or the value in one of the items
		let (mut container_type, mut element_type) = if let Some(type_) = type_ {
			let container_type = self.resolve_type_annotation(type_, env);
			let element_type = match *container_type {
				Type::Array(t) | Type::MutArray(t) => t,
				_ => {
					self.spanned_error(
						&type_.span,
						format!("Expected \"Array\" or \"MutArray\", found \"{container_type}\""),
					);
					self.types.error()
				}
			};
			(container_type, element_type)
		} else if self.ctx.in_json() {
			let json_data = JsonData {
				expression_id: exp.id,
				kind: JsonDataKind::List(vec![]),
			};
			let inner_type = self.types.add_type(Type::Json(Some(json_data)));
			(self.types.add_type(Type::Array(inner_type)), inner_type)
		} else {
			let inner_type = self.types.make_inference();
			(self.types.add_type(Type::Array(inner_type)), inner_type)
		};

		// Verify all types are the same as the inferred type and find the aggregate phase of all the items
		let mut phase = Phase::Independent;
		for item in items {
			let (t, item_phase) = self.type_check_exp(item, env);
			phase = combine_phases(phase, item_phase);

			if t.is_json()
				&& !matches!(
					*t,
					Type::Json(Some(JsonData {
						kind: JsonDataKind::List(_),
						..
					}))
				) {
				// This is an array of JSON, change the element type to reflect that
				let json_data = JsonData {
					expression_id: exp.id,
					kind: JsonDataKind::List(vec![]),
				};
				element_type = self.types.add_type(Type::Json(Some(json_data)));
			}

			// Augment the json list data with the new element type
			if let Type::Json(Some(JsonData { ref mut kind, .. })) = &mut *element_type {
				if let JsonDataKind::List(ref mut json_list) = kind {
					json_list.push(SpannedTypeInfo {
						type_: t,
						span: item.span(),
					});
				}
			}

			if !self.ctx.in_json() && !t.is_json() {
				// If we're not in a Json literal, validate the type of each element
				self.validate_type(t, element_type, item);
				element_type = self.types.maybe_unwrap_inference(element_type);
			} else if self.is_in_mut_json && !t.is_json_legal_value() {
				// if we're in a MutJson literal, we only need to check that each field is legal json
				self.spanned_error(
					item,
					format!("Expected a valid Json value (https://www.json.org/json-en.html), but got \"{t}\""),
				);
			}
		}

		if let Type::Array(ref mut inner) | Type::MutArray(ref mut inner) = &mut *container_type {
			*inner = element_type;
		}

		(container_type, phase)
	}

	fn type_check_call(
		&mut self,
		arg_list: &ArgList,
		env: &mut SymbolEnv,
		callee: &CalleeKind,
		exp: &Expr,
	) -> (TypeRef, Phase) {
		// Type check the call arguments
		let arg_list_types = self.type_check_arg_list(arg_list, env);

		// Resolve the function's reference (either a method in the class's env or a function in the current env)
		let (func_type, callee_phase) = match callee {
			CalleeKind::Expr(expr) => self.type_check_exp(expr, env),
			CalleeKind::SuperCall(method) => resolve_super_method(method, env, &self.types).unwrap_or_else(|e| {
				self.type_error(e);
				self.resolved_error()
			}),
		};
		let is_option = func_type.is_option();
		let func_type = func_type.maybe_unwrap_option();

		// If the callee's signature type is unknown, just evaluate the entire call expression as an error
		if func_type.is_unresolved() {
			return self.resolved_error();
		}

		// If the caller's signature is `any`, then just evaluate the entire call expression as `any`
		if func_type.is_anything() {
			return (self.types.anything(), Phase::Independent);
		}

		// Make sure this is a function signature type
		let func_sig = if let Some(func_sig) = func_type.as_deep_function_sig() {
			func_sig.clone()
		} else if func_type.is_closure_class() {
			let handle_type = func_type.as_class().unwrap().get_closure_method().unwrap();
			handle_type.as_function_sig().unwrap().clone()
		} else {
			self.spanned_error(
				callee,
				format!("Expected a function or method, found \"{}\"", func_type),
			);
			return self.resolved_error();
		};

		if !env.phase.can_call_to(&func_sig.phase) {
			self.spanned_error(
				exp,
				format!("Cannot call into {} phase while {}", func_sig.phase, env.phase),
			);
		}

		// If the function is phase independent, then inherit from the callee
		let func_phase = if func_sig.phase == Phase::Independent {
			callee_phase
		} else {
			func_sig.phase
		};

		if let Some(value) = self.type_check_arg_list_against_function_sig(arg_list, &func_sig, exp, arg_list_types) {
			return (value, func_phase);
		}

		// If the function is "wingc_env", then print out the current environment
		if let CalleeKind::Expr(call_expr) = callee {
			if let ExprKind::Reference(Reference::Identifier(ident)) = &call_expr.kind {
				if ident.name == "wingc_env" {
					println!("[symbol environment at {}]", exp.span().file_id);
					println!("{}", env.to_string());
				}
			}
		}

		if is_option {
			// When calling a an optional function, the return type is always optional
			// To allow this to be both safe and unsurprising,
			// the callee must be a reference with an optional accessor
			if let CalleeKind::Expr(call_expr) = callee {
				if let ExprKind::Reference(Reference::InstanceMember { optional_accessor, .. }) = &call_expr.kind {
					if *optional_accessor {
						(self.types.make_option(func_sig.return_type), func_phase)
					} else {
						// No additional error is needed here, since the type checker will already have errored without optional chaining
						(self.types.error(), func_phase)
					}
				} else {
					// TODO do we want syntax for this? e.g. `foo?.()`
					self.spanned_error(callee, "Cannot call an optional function");
					(self.types.error(), func_phase)
				}
			} else {
				// TODO do we want syntax for this? e.g. `foo?.()`
				self.spanned_error(callee, "Cannot call an optional function");
				(self.types.error(), func_phase)
			}
		} else {
			(func_sig.return_type, func_phase)
		}
	}

	fn type_check_intrinsic(&mut self, intrinsic: &Intrinsic, env: &mut SymbolEnv, exp: &Expr) -> (TypeRef, Phase) {
		if !intrinsic.kind.is_valid_phase(&env.phase) {
			self.spanned_error(exp, format!("{} cannot be used in {}", intrinsic.kind, env.phase));
		}
		let arg_list = intrinsic
			.arg_list
			.as_ref()
			.map(|arg_list| (arg_list, self.type_check_arg_list(arg_list, env)));

		if let Some(intrinsic_type) = self
			.types
			.intrinsics
			.lookup(&intrinsic.kind.clone().into(), None)
			.and_then(|x| x.as_variable())
			.map(|x| x.type_)
		{
			if let Some(sig) = intrinsic_type.as_function_sig() {
				if let Some((arg_list, arg_list_types)) = arg_list {
					self.type_check_arg_list_against_function_sig(arg_list, &sig, exp, arg_list_types);
				} else {
					self.spanned_error(exp, format!("{} requires arguments", intrinsic.kind));
				}

				match intrinsic.kind {
					IntrinsicKind::Inflight => {
						return (self.types.make_inference(), Phase::Preflight);
					}
					IntrinsicKind::Dirname | IntrinsicKind::Unknown => {
						return (sig.return_type, sig.phase);
					}
				}
			} else {
				if let Some(arg_list) = &intrinsic.arg_list {
					self.spanned_error(&arg_list.span, format!("{} does not expect arguments", intrinsic.kind));
				}
				return (intrinsic_type, Phase::Independent);
			}
		};

		(self.types.error(), Phase::Independent)
	}

	fn type_check_range(&mut self, start: &Expr, env: &mut SymbolEnv, end: &Expr) -> (TypeRef, Phase) {
		let (stype, stype_phase) = self.type_check_exp(start, env);
		let (etype, _) = self.type_check_exp(end, env);

		self.validate_type(stype, self.types.number(), start);
		self.validate_type(etype, self.types.number(), end);
		(self.types.add_type(Type::Array(stype)), stype_phase)
	}

	fn type_check_new(&mut self, new_expr: &New, env: &mut SymbolEnv, exp: &Expr) -> (TypeRef, Phase) {
		let New {
			class,
			obj_id,
			arg_list,
			obj_scope,
		} = new_expr;
		// Type check everything
		let class_type = self
			.resolve_user_defined_type(class, env, self.ctx.current_stmt_idx())
			.unwrap_or_else(|e| self.type_error(e));
		let obj_scope_type = obj_scope.as_ref().map(|x| self.type_check_exp(x, env).0);
		let obj_id_type = obj_id.as_ref().map(|x| self.type_check_exp(x, env).0);
		let arg_list_types = self.type_check_arg_list(arg_list, env);

		// Lookup the class's type in the env
		let (class_env, class_symbol) = match *class_type {
			Type::Class(ref class) => {
				if class.is_abstract {
					self.spanned_error(exp, format!("Cannot instantiate abstract class \"{}\"", class.name));
				}

				if class.phase == Phase::Independent || env.phase == class.phase {
					(&class.env, &class.name)
				} else {
					self.spanned_error(
						exp,
						format!(
							"Cannot create {} class \"{}\" in {} phase",
							class.phase, class.name, env.phase
						),
					);
					return (self.types.error(), Phase::Independent);
				}
			}
			// If type is anything we have to assume it's ok to initialize it
			Type::Anything => return (self.types.anything(), Phase::Independent),
			// If type is error, we assume the error was already reported and evauate the new expression to error as well
			Type::Unresolved => return self.resolved_error(),
			Type::Struct(_) => {
				self.spanned_error(
					class,
					format!(
						"Cannot instantiate type \"{}\" because it is a struct and not a class. Use struct instantiation instead.",
						class_type
					),
				);
				return self.resolved_error();
			}
			_ => {
				self.spanned_error(
					class,
					format!("Cannot instantiate type \"{}\" because it is not a class", class_type),
				);
				return self.resolved_error();
			}
		};

		// Type check args against constructor
		let init_method_name = if env.phase == Phase::Preflight || class_env.phase == Phase::Independent {
			CLASS_INIT_NAME
		} else {
			CLASS_INFLIGHT_INIT_NAME
		};

		let lookup_res = class_env.lookup_ext(&init_method_name.into(), None);
		let constructor_type = match lookup_res {
			LookupResult::Found(k, _) => k.as_variable().expect("Expected constructor to be a variable").type_,
			LookupResult::NotFound(_, _) => {
				self.spanned_error(
					exp,
					format!("Constructor for class \"{}\" is private", class_symbol.name),
				);
				return self.resolved_error();
			}
			LookupResult::NotPublic(_, _)
			| LookupResult::MultipleFound
			| LookupResult::DefinedLater(_)
			| LookupResult::ExpectedNamespace(_) => {
				self.type_error(lookup_result_to_type_error(
					lookup_res,
					&Symbol {
						name: CLASS_INIT_NAME.into(),
						span: class_symbol.span.clone(),
					},
				));
				return self.resolved_error();
			}
		};
		let constructor_sig = constructor_type
			.as_function_sig()
			.expect("Expected constructor to be a function signature");

		// Verify return type (This should never fail since we define the constructors return type during AST building)
		self.validate_type(constructor_sig.return_type, class_type, exp);

		self.type_check_arg_list_against_function_sig(&arg_list, &constructor_sig, exp, arg_list_types);

		let non_std_args = !class_type.as_class().unwrap().std_construct_args;

		// If this is a preflight class make sure the object's scope and id are of correct type
		if class_type.is_preflight_class() {
			// Get reference to resource object's scope
			let obj_scope_type = if obj_scope_type.is_none() {
				// If this returns None, this means we're instantiating a preflight object in the global scope, which is valid
				env
					.lookup(&"this".into(), Some(self.ctx.current_stmt_idx()))
					.map(|v| v.as_variable().expect("Expected \"this\" to be a variable").type_)
			} else {
				// If this is a non-standard preflight class, make sure the object's scope isn't explicitly set (using the `in` keywords)
				if non_std_args {
					self.spanned_error(
						obj_scope.as_ref().unwrap(),
						format!(
							"Cannot set scope of non-standard preflight class \"{}\" using `in`",
							class_type
						),
					);
				}

				obj_scope_type
			};

			// Verify the object scope is a construct
			if let Some(obj_scope_type) = obj_scope_type {
				if !obj_scope_type.is_subtype_of(&self.types.construct_interface()) {
					self.spanned_error(
						exp,
						format!(
							"Expected scope to be a preflight object, instead found \"{}\"",
							obj_scope_type
						),
					);
				}
			}

			// Verify the object id is a string
			if let Some(obj_id_type) = obj_id_type {
				self.validate_type(obj_id_type, self.types.string(), obj_id.as_ref().unwrap());
				// If this is a non-standard preflight class, make sure the object's id isn't explicitly set (using the `as` keywords)
				if non_std_args {
					self.spanned_error(
						obj_id.as_ref().unwrap(),
						format!(
							"Cannot set id of non-standard preflight class \"{}\" using `as`",
							class_type
						),
					);
				}
			}
		} else {
			// This is an inflight class, make sure the object scope and id are not set
			if let Some(obj_scope) = obj_scope {
				self.spanned_error(obj_scope, "Inflight classes cannot have a scope");
			}
			if let Some(obj_id) = obj_id {
				self.spanned_error(obj_id, "Inflight classes cannot have an id");
			}
		}

		(class_type, env.phase)
	}

	fn type_check_reference(&mut self, _ref: &Reference, env: &mut SymbolEnv) -> (TypeRef, Phase) {
		let (vi, phase) = self.resolve_reference(_ref, env);
		let var_type = match vi {
			ResolveReferenceResult::Variable(var) => var.type_,
			ResolveReferenceResult::Location(_, type_) => type_,
		};
		(var_type, phase)
	}

	fn resolved_error(&mut self) -> (TypeRef, Phase) {
		(self.types.error(), Phase::Independent)
	}

	pub fn all_optional_struct(t: TypeRef) -> bool {
		match &*t {
			Type::Struct(s) => s.fields(true).all(|(_, v)| v.type_.is_option()),
			_ => false,
		}
	}

	fn type_check_arg_list_against_function_sig(
		&mut self,
		arg_list: &ArgList,
		func_sig: &FunctionSignature,
		call_span: &impl Spanned,
		arg_list_types: ArgListTypes,
	) -> Option<TypeRef> {
		// Verify named args
		let last_param = func_sig.parameters.last();
		let is_last_param_struct = last_param.is_some() && last_param.unwrap().typeref.maybe_unwrap_option().is_struct();
		let last_param_all_optional_struct = last_param.is_some() && Self::all_optional_struct(last_param.unwrap().typeref);
		let is_last_param_not_optional_struct = last_param.is_some() && last_param.unwrap().typeref.is_struct();

		if !arg_list.named_args.is_empty() {
			if is_last_param_struct {
				let last_param_type = last_param.unwrap().typeref.maybe_unwrap_option();
				self.validate_structural_type(&arg_list_types.named_args, &last_param_type, call_span);
			} else {
				self.spanned_error(call_span, "No named arguments expected");
			}
		}

		// Check if there is a variadic parameter, get its index
		let variadic_index = func_sig.parameters.iter().position(|o| o.variadic);
		let pos_args_len = cmp::min(
			arg_list.pos_args.len(),
			variadic_index.unwrap_or(arg_list.pos_args.len()),
		);
		let non_variadic_args_len = pos_args_len
			+ if is_last_param_struct && !arg_list.named_args.is_empty() {
				1
			} else {
				0
			};

		// Verify arity
		let mut min_args = func_sig.min_parameters() + if is_last_param_not_optional_struct { 1 } else { 0 };
		let max_args = func_sig.parameters.len() - if variadic_index.is_some() { 1 } else { 0 };
		let named_args_text = if is_last_param_struct {
			"or named arguments for the last parameter "
		} else {
			""
		};
		let variadic_args_text = if variadic_index.is_some() {
			"+ variadic args "
		} else {
			""
		};

		// If the last parameter is an all-optional struct and there's no argument for it,
		// then append a default empty struct to the argument list and indicate we need one less arg
		if last_param_all_optional_struct && non_variadic_args_len + 1 == min_args {
			min_args -= 1;
			self.types.append_empty_struct_to_arglist.insert(arg_list.id);
		}

		// Check arity
		if non_variadic_args_len < min_args || pos_args_len > max_args {
			let err_text = if min_args == max_args {
				format!(
					"Expected {} positional argument(s) {}{}but got {}",
					min_args, named_args_text, variadic_args_text, pos_args_len
				)
			} else {
				format!(
					"Expected between {} and {} positional arguments {}{}but got {}",
					min_args, max_args, named_args_text, variadic_args_text, pos_args_len
				)
			};

			self.spanned_error(call_span, err_text);
		} else if is_last_param_struct && non_variadic_args_len > max_args {
			self.spanned_error(
				call_span,
				"Expected either a positional argument or named arguments for the last parameter, but got both",
			);
		}

		// Verify positioned args
		for (arg_expr, arg_type, param) in izip!(
			arg_list.pos_args.iter().take(pos_args_len),
			arg_list_types.pos_args.iter().take(pos_args_len),
			func_sig.parameters.iter().take(pos_args_len)
		) {
			self.validate_type(*arg_type, param.typeref, arg_expr);
		}

		// Verify variadic args
		if let Some(variadic_index) = variadic_index {
			let variadic_args_param = func_sig.parameters.get(variadic_index).unwrap();
			let mut variadic_args_inner_type = variadic_args_param.typeref.collection_item_type().unwrap();

			for (arg_expr, arg_type) in izip!(
				arg_list.pos_args.iter().skip(variadic_index),
				arg_list_types.pos_args.iter().skip(variadic_index),
			) {
				// If you're calling a method on some container type, and it takes a generic variadic argument,
				// then substitute that argument type (T1) with the container's element type when typechecking the function arguments
				if let Some(element_type) = func_sig.this_type.and_then(|x| x.collection_item_type()) {
					if let Some(object) = variadic_args_inner_type.as_class() {
						if let Some(fqn) = &object.fqn {
							if fqn.contains(WINGSDK_GENERIC) {
								variadic_args_inner_type = element_type;
							}
						}
					}
				}
				self.validate_type(*arg_type, variadic_args_inner_type, arg_expr);
			}
		}

		None
	}

	fn type_check_closure(&mut self, func_def: &ast::FunctionDefinition, env: &SymbolEnv) -> (TypeRef, Phase) {
		// TODO: make sure this function returns on all control paths when there's a return type (can be done by recursively traversing the statements and making sure there's a "return" statements in all control paths)
		// https://github.com/winglang/wing/issues/457

		// Create a type_checker function signature from the AST function definition
		let function_type = self.resolve_type_annotation(&func_def.signature.to_type_annotation(), env);
		let sig = function_type.as_function_sig().unwrap();

		// Create an environment for the function
		let mut function_env = self.types.add_symbol_env(SymbolEnv::new(
			Some(env.get_ref()),
			SymbolEnvKind::Function {
				is_init: false,
				sig: function_type,
			},
			func_def.signature.phase,
			self.ctx.current_stmt_idx(),
		));
		self.add_arguments_to_env(&func_def.signature.parameters, &sig, &mut function_env);

		self.with_function_def(None, &func_def.signature, func_def.is_static, function_env, |tc| {
			// Type check the function body
			if let FunctionBody::Statements(scope) = &func_def.body {
				tc.types.set_scope_env(scope, function_env);

				tc.inner_scopes.push((scope, tc.ctx.clone()));

				(function_type, sig.phase)
			} else {
				(function_type, sig.phase)
			}
		})
	}

	/// Validate that a given map can be assigned to a variable of given struct type
	fn validate_structural_type(
		&mut self,
		object_types: &IndexMap<Symbol, SpannedTypeInfo>,
		expected_type: &TypeRef,
		value: &impl Spanned,
	) {
		let expected_struct = if let Some(expected_struct) = expected_type.maybe_unwrap_option().as_struct() {
			expected_struct
		} else {
			self.spanned_error(value, format!("{expected_type} is not a struct so it has no fields"));
			return;
		};

		// Verify that there are no extraneous fields
		// Also map original field names to the ones in the struct type
		let mut field_map = IndexMap::new();
		for (k, _) in object_types.iter() {
			let field = expected_struct.env.lookup(k, None);
			if let Some(field) = field {
				let field_type = field
					.as_variable()
					.expect("Expected struct field to be a variable in the struct env")
					.type_;
				field_map.insert(k.name.clone(), (k, field_type));
			} else {
				self.spanned_error(value, format!("\"{}\" is not a field of \"{}\"", k.name, expected_type));
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
				let t = object_types.get(*symb).unwrap();
				let t = if let Type::Json(Some(JsonData {
					kind: JsonDataKind::Type(type_info),
					..
				})) = &*t.type_
				{
					type_info
				} else {
					t
				};
				self.validate_type(t.type_, *expected_field_type, &t.span);
			} else if !v.is_option() {
				self.spanned_error(
					value,
					format!(
						"Missing required field \"{}\" from \"{}\"",
						k, expected_struct.name.name
					),
				);
			}
		}
	}

	/// Validate that the given type is a subtype (or same) as the expected type while allowing
	/// collection types to have different mutability (e.g. Array and MutArray).
	///
	/// Returns the given type on success, otherwise returns the expected type.
	fn validate_type_binary_equality(
		&mut self,
		actual_type: TypeRef,
		expected_type: TypeRef,
		span: &impl Spanned,
		actual_original_type: Option<TypeRef>,
		expected_original_type: Option<TypeRef>,
	) -> TypeRef {
		if let (
			Type::Array(inner_actual) | Type::MutArray(inner_actual),
			Type::Array(inner_expected) | Type::MutArray(inner_expected),
		) = (&*actual_type, &*expected_type)
		{
			self.validate_type_binary_equality(
				*inner_actual,
				*inner_expected,
				span,
				Some(actual_original_type.unwrap_or(actual_type)),
				Some(expected_original_type.unwrap_or(expected_type)),
			)
		} else if let (
			Type::Map(inner_actual) | Type::MutMap(inner_actual),
			Type::Map(inner_expected) | Type::MutMap(inner_expected),
		) = (&*actual_type, &*expected_type)
		{
			self.validate_type_binary_equality(
				*inner_actual,
				*inner_expected,
				span,
				Some(actual_original_type.unwrap_or(actual_type)),
				Some(expected_original_type.unwrap_or(expected_type)),
			)
		} else if let (
			Type::Set(inner_actual) | Type::MutSet(inner_actual),
			Type::Set(inner_expected) | Type::MutSet(inner_expected),
		) = (&*actual_type, &*expected_type)
		{
			self.validate_type_binary_equality(
				*inner_actual,
				*inner_expected,
				span,
				Some(actual_original_type.unwrap_or(actual_type)),
				Some(expected_original_type.unwrap_or(expected_type)),
			)
		} else {
			self.validate_nested_type(
				actual_type,
				expected_type,
				span,
				actual_original_type,
				expected_original_type,
			)
		}
	}

	/// If possible, structurally check the given type as a Json against the expected type.
	///
	/// returns true if validation occurred, false otherwise
	pub fn validate_type_json(&mut self, actual_type: TypeRef, expected_type: TypeRef, span: &impl Spanned) -> bool {
		let mut json_type = actual_type;
		let expected_type = self.types.maybe_unwrap_inference(expected_type);
		let expected_type_unwrapped = expected_type.maybe_unwrap_option();

		if expected_type_unwrapped.is_json() {
			// No need for fancy type checking against Json
			return false;
		}

		let inner_expected = expected_type_unwrapped.collection_item_type();
		if let Some(inner_expected) = inner_expected {
			if let Some(inner_actual) = actual_type.collection_item_type() {
				if matches!(*inner_actual, Type::Json(Some(_))) {
					// If the outer collection type doesn't match then don't bother
					// We can just check the collection enum variant to make sure they match exactly (subtyping isn't relevant here)
					if std::mem::discriminant(&**expected_type_unwrapped) != std::mem::discriminant(&*actual_type) {
						return false;
					}
					json_type = inner_actual;
				} else {
					// The expected type is a collection and the actual type is a collection of non-json
					// In case the actual type is a nested collection, we must recurse here
					return self.validate_type_json(inner_actual, inner_expected, span);
				}
			}
		}

		let Type::Json(Some(data)) = &*json_type else {
			// We don't have any json data to validate
			return false;
		};

		if expected_type_unwrapped.is_struct()
			|| expected_type_unwrapped.is_immutable_collection()
			|| expected_type_unwrapped.is_json_legal_value()
		{
			// We don't need to check the json-legality of this expr later because we know it's either legal or it's being used as a struct/map
			self.types.json_literal_casts.insert(data.expression_id, expected_type);
		}

		match &data.kind {
			JsonDataKind::Type(t) => {
				// The expected type is some sort of primitive
				self.validate_type(t.type_, expected_type, span);
				true
			}
			JsonDataKind::Fields(fields) => {
				if expected_type_unwrapped.is_struct() {
					self.validate_structural_type(fields, expected_type_unwrapped, span);
					true
				} else if let (Some(inner_expected), true) = (inner_expected, expected_type_unwrapped.is_map()) {
					// The expected type is a Map
					for field_info in fields.values() {
						self.validate_type(field_info.type_, inner_expected, &field_info.span);
					}
					true
				} else {
					false
				}
			}
			JsonDataKind::List(list) => {
				if let Some(inner_expected) = inner_expected {
					// The expected type is an Array or Set
					for t in list {
						self.validate_type(t.type_, inner_expected, &t.span);
					}
					true
				} else {
					false
				}
			}
		}
	}

	/// Validate that the given type is a subtype (or same) as the expected type. If not, add an error
	/// to the diagnostics.
	///
	/// Returns the given type on success, otherwise returns the expected type.
	fn validate_type(&mut self, actual_type: TypeRef, expected_type: TypeRef, span: &impl Spanned) -> TypeRef {
		self.validate_type_in(actual_type, &[expected_type], span, None, None)
	}

	/// Validate that the given type is a subtype (or same) as the expected type. If not, add an error
	/// to the diagnostics- based on the parent type.
	///
	/// Returns the given type on success, otherwise returns the expected type.
	fn validate_nested_type(
		&mut self,
		actual_type: TypeRef,
		expected_type: TypeRef,
		span: &impl Spanned,
		actual_original_type: Option<TypeRef>,
		expected_original_type: Option<TypeRef>,
	) -> TypeRef {
		if let Some(expected_original_t) = expected_original_type {
			self.validate_type_in(
				actual_type,
				&[expected_type],
				span,
				actual_original_type,
				Some(&[expected_original_t]),
			)
		} else {
			self.validate_type_in(actual_type, &[expected_type], span, actual_original_type, None)
		}
	}

	/// Validate that the given type is a subtype (or same) as the one of the expected types. If not, add
	/// an error to the diagnostics.
	/// Returns the given type on success, otherwise returns one of the expected types.
	fn validate_type_in(
		&mut self,
		actual_type: TypeRef,
		expected_types: &[TypeRef],
		span: &impl Spanned,
		actual_original_type: Option<TypeRef>,
		expected_original_types: Option<&[TypeRef]>,
	) -> TypeRef {
		assert!(expected_types.len() > 0);
		let first_expected_type = expected_types[0];
		let mut return_type = actual_type;

		// To avoid ambiguity, only do inference if there is one expected type
		if expected_types.len() == 1 {
			let span = span.span();
			// First check if the actual type is an inference that can be replaced with the expected type
			if self.add_new_inference(&actual_type, &first_expected_type, &span) {
				// Update the type we validate and return
				return_type = self.types.maybe_unwrap_inference(return_type);
			} else {
				// otherwise, check if the expected type is an inference that can be replaced with the actual type
				self.add_new_inference(&first_expected_type, &actual_type, &span);
			}
		}

		// If the actual type is anything or any of the expected types then we're good
		if return_type.is_anything() || expected_types.iter().any(|t| return_type.is_subtype_of(t)) {
			return return_type;
		}

		// If the actual type is an error (a type we failed to resolve) then we silently ignore it assuming
		// the error was already reported.
		if return_type.is_unresolved() {
			return return_type;
		}

		// If any of the expected types are errors (types we failed to resolve) then we silently ignore it
		// assuming the error was already reported.
		if expected_types.iter().any(|t| t.is_unresolved()) {
			return return_type;
		}

		// If the expected type is Json and the actual type is a Json legal value then we're good
		if expected_types.iter().any(|t| t.maybe_unwrap_option().is_json()) {
			// the actual type should be legal value, and match the optionality of the expected type
			if return_type.is_json_legal_value() && (!expected_types.iter().any(|t| t.is_json()) || !return_type.is_option())
			{
				return return_type;
			}
		} else {
			if expected_types
				.iter()
				.any(|t| self.validate_type_json(actual_type, *t, span))
			{
				return return_type;
			}
		}

		let expected_type_origin = expected_original_types.unwrap_or(expected_types);
		let expected_type_str = if expected_type_origin.len() > 1 {
			let expected_types_list = expected_type_origin
				.iter()
				.map(|t| format!("{}", t))
				.collect::<Vec<String>>()
				.join(",");
			format!("one of \"{}\"", expected_types_list)
		} else {
			format!("\"{}\"", expected_type_origin[0])
		};

		let return_type_str = actual_original_type.unwrap_or(return_type);
		let message = format!("Expected type to be {expected_type_str}, but got \"{return_type_str}\" instead");
		let mut hints: Vec<String> = vec![];
		if return_type.is_nil() && expected_types.len() == 1 {
			hints.push(format!(
				"to allow \"nil\" assignment use optional type: \"{first_expected_type}?\""
			));
		}

		if matches!(**return_type.maybe_unwrap_option(), Type::Json(None) | Type::MutJson)
			&& !matches!(
				**first_expected_type.maybe_unwrap_option(),
				Type::Json(None) | Type::MutJson
			) {
			// known json data is statically known
			hints.push(format!(
				"use {first_expected_type}.fromJson() to convert dynamic Json\""
			));
		}
		if let Some(function_signature) = actual_type.as_deep_function_sig() {
			// No phases match
			if !expected_types.iter().any(|t| {
				t.as_deep_function_sig()
					.is_some_and(|f| function_signature.phase.is_subtype_of(&f.phase))
			}) {
				// Get first expected phase
				if let Some(expected_function_type) = expected_types.iter().find(|t| {
					t.as_deep_function_sig()
						.is_some_and(|f| !function_signature.phase.is_subtype_of(&f.phase))
				}) {
					hints.push(format!(
						"expected phase to be {}, but got {} instead",
						expected_function_type.as_deep_function_sig().unwrap().phase,
						function_signature.phase
					));
				}
			}
		}

		if expected_types.len() == 1 && matches!(*expected_types[0], Type::Stringable) {
			if actual_type.maybe_unwrap_option().is_stringable() {
				hints.push(format!(
					"{} is an optional, try unwrapping it with 'x ?? \"nil\"' or 'x!'",
					actual_type
				));
			} else {
				hints.push("str, num, bool, json, and enums are stringable".to_string());
			};
		}

		self.spanned_error_with_hints(span, message, &hints);

		// Evaluate to one of the expected types
		first_expected_type
	}

	pub fn type_check_file_or_dir(&mut self, source_path: &Utf8Path, scope: &Scope) {
		CompilationContext::set(CompilationPhase::TypeChecking, &scope.span);
		self.type_check_scope(scope);

		if source_path.is_dir() {
			self.type_check_dir(source_path);
			return;
		}

		// Save the file's symbol environment to `self.types.source_file_envs`
		// (replacing any existing ones if there was already a SymbolEnv from a previous compilation)
		let scope_env = self.types.get_scope_env(scope);
		self
			.types
			.source_file_envs
			.insert(source_path.to_owned(), SymbolEnvOrNamespace::SymbolEnv(scope_env));
	}

	pub fn type_check_dir(&mut self, source_path: &Utf8Path) {
		// Get a list of all children paths (files or directories) through the file graph
		let children = self.file_graph.dependencies_of(source_path);

		// Obtain each child's symbol environment or namespace
		// If it's a namespace (i.e. it's a directory), wrap it in a symbol env
		let mut child_envs = vec![];
		for child_path in children.iter() {
			match self.types.source_file_envs.get(*child_path) {
				Some(SymbolEnvOrNamespace::SymbolEnv(env)) => {
					child_envs.push(*env);
				}
				Some(SymbolEnvOrNamespace::Namespace(ns)) => {
					let mut new_env = SymbolEnv::new(None, SymbolEnvKind::Scope, Phase::Independent, 0);
					new_env
						.define(
							&Symbol::global(child_path.file_stem().unwrap().to_string()),
							SymbolKind::Namespace(*ns),
							AccessModifier::Public,
							StatementIdx::Top,
						)
						.unwrap();
					let wrapper_env = self.types.add_symbol_env(new_env);
					child_envs.push(wrapper_env);
				}
				Some(SymbolEnvOrNamespace::Error(diagnostic)) => {
					self
						.types
						.source_file_envs
						.insert(source_path.to_owned(), SymbolEnvOrNamespace::Error(diagnostic.clone()));
					return;
				}
				None => {
					self.types.source_file_envs.insert(
						source_path.to_owned(),
						SymbolEnvOrNamespace::Error(Diagnostic {
							message: format!("Could not bring \"{}\" due to cyclic bring statements", source_path,),
							span: None,
							annotations: vec![],
							hints: vec![],
							severity: DiagnosticSeverity::Error,
						}),
					);
					return;
				}
			};
		}

		// Check that there aren't multiply-defined public symbols in the directory
		let mut seen_public_symbols = HashSet::new();
		for child_env in &child_envs {
			for key in child_env.symbol_map.keys() {
				if child_env.symbol_map[key].access != AccessModifier::Public {
					continue;
				}

				if seen_public_symbols.contains(key) {
					self.types.source_file_envs.insert(
						source_path.to_owned(),
						SymbolEnvOrNamespace::Error(Diagnostic {
							message: format!("Symbol \"{}\" has multiple definitions in \"{}\"", key, source_path),
							span: None,
							annotations: vec![],
							hints: vec![],
							severity: DiagnosticSeverity::Error,
						}),
					);
					return;
				}
				seen_public_symbols.insert(key.clone());
			}
		}

		let ns = self.types.add_namespace(Namespace {
			name: source_path.file_stem().unwrap().to_string(),
			envs: child_envs,
			module_path: ResolveSource::WingFile,
		});
		self
			.types
			.source_file_envs
			.insert(source_path.to_owned(), SymbolEnvOrNamespace::Namespace(ns));
	}

	fn type_check_scope(&mut self, scope: &Scope) {
		assert!(self.inner_scopes.is_empty());
		let mut env = self.types.get_scope_env(scope);

		self.hoist_type_definitions(scope, &mut env);

		for statement in scope.statements.iter() {
			self.type_check_statement(statement, &mut env);
		}

		let inner_scopes = self.inner_scopes.drain(..).collect::<Vec<_>>();
		for (inner_scope, ctx) in inner_scopes {
			let scope = unsafe { &*inner_scope };
			self.ctx = ctx;
			self.type_check_scope(scope);
		}

		if let SymbolEnvKind::Function { sig, is_init, .. } = env.kind {
			let mut return_type = sig.as_function_sig().expect("a function type").return_type;
			if let Type::Inferred(n) = &*return_type {
				if self.types.get_inference_by_id(*n).is_none() {
					// If function types don't return anything then we should set the return type to void
					self.types.update_inferred_type(*n, self.types.void(), &scope.span);
				}
				self.update_known_inferences(&mut return_type, &scope.span);
			}

			// iterate over the statements in the scope and check if there are any statements
			// we care about
			let mut has_stmt_visitor = HasStatementVisitor::default();
			has_stmt_visitor.visit(&scope.statements);

			// If the scope doesn't contain any return statements and the return type isn't void or T? or
			// the scope itself does not have a throw error, throw an error to the user
			if !has_stmt_visitor.seen_throw
				&& !has_stmt_visitor.seen_return
				&& !return_type.is_void()
				&& !return_type.is_option()
				&& !is_init
			{
				self.spanned_error(
					scope,
					format!(
						"A function whose return type is \"{}\" must return a value.",
						return_type
					),
				);
			}
		}

		for symbol_data in env.symbol_map.values_mut() {
			if let SymbolKind::Variable(ref mut var_info) = symbol_data.kind {
				// Update any possible inferred types in this variable.
				// This must be called before checking for un-inferred types because some variable were not used in this scope so they did not get a chance to get updated.
				self.update_known_inferences(&mut var_info.type_, &var_info.name.span);

				// If we found a variable with an inferred type, this is an error because it means we failed to infer its type
				// Ignores any transient (no file_id) variables e.g. `this`. Those failed inferences are cascading errors and not useful to the user
				if !var_info.name.span.file_id.is_empty() && self.check_for_inferences(&var_info.type_) {
					self.spanned_error(
						&var_info.name,
						"Unable to infer type by usage, an explicit type annotation is required",
					);
				}
			}
		}
	}

	/// Check if there are any type declaration statements in the given scope.
	/// If so, define the the respective types in the environment so that the type can be referenced by other
	/// type declarations, even if they come before the type declaration.
	fn hoist_type_definitions(&mut self, scope: &Scope, env: &mut SymbolEnv) {
		for statement in scope.statements.iter() {
			match &statement.kind {
				StmtKind::Bring { source, identifier } => self.hoist_bring_statement(source, identifier, statement, env),
				StmtKind::Struct(st) => self.hoist_struct_definition(st, env, &statement.doc),
				StmtKind::Interface(iface) => self.hoist_interface_definition(iface, env, &statement.doc),
				StmtKind::Enum(enu) => self.hoist_enum_definition(enu, env, &statement.doc),
				_ => {}
			}
		}
	}

	fn hoist_bring_statement(
		&mut self,
		source: &BringSource,
		identifier: &Option<Symbol>,
		stmt: &Stmt,
		env: &mut SymbolEnv,
	) {
		let library_name: String;
		let namespace_filter: Vec<String>;
		let alias: &Symbol;
		match &source {
			BringSource::BuiltinModule(name) => {
				if WINGSDK_BRINGABLE_MODULES.contains(&name.name.as_str()) {
					library_name = WINGSDK_ASSEMBLY_NAME.to_string();
					namespace_filter = vec![name.name.clone()];
					alias = identifier.as_ref().unwrap_or(&name);
				} else if name.name.as_str() == WINGSDK_STD_MODULE {
					self.spanned_error(stmt, format!("Redundant bring of \"{}\"", WINGSDK_STD_MODULE));
					return;
				} else {
					self.spanned_error(stmt, format!("\"{}\" is not a built-in module", name));
					return;
				}
			}
			BringSource::JsiiModule(name) => {
				library_name = name.name.to_string();
				// no namespace filter (we only support importing entire libraries at the moment)
				namespace_filter = vec![];
				alias = identifier.as_ref().unwrap();
			}
			BringSource::WingFile(path) => {
				let brought_env = match self.types.source_file_envs.get(path) {
					Some(SymbolEnvOrNamespace::SymbolEnv(env)) => *env,
					Some(SymbolEnvOrNamespace::Namespace(_)) => {
						panic!("Expected a symbol environment to be associated with the file")
					}
					Some(SymbolEnvOrNamespace::Error(diagnostic)) => {
						report_diagnostic(Diagnostic {
							span: Some(stmt.span()),
							..diagnostic.clone()
						});
						return;
					}
					None => {
						self.spanned_error(
							stmt,
							format!("Could not type check \"{}\" due to cyclic bring statements", path),
						);
						return;
					}
				};
				let ns = self.types.add_namespace(Namespace {
					name: path.to_string(),
					envs: vec![brought_env],
					module_path: ResolveSource::WingFile,
				});
				if let Err(e) = env.define(
					identifier.as_ref().unwrap(),
					SymbolKind::Namespace(ns),
					AccessModifier::Private,
					StatementIdx::Top,
				) {
					self.type_error(e);
				}
				return;
			}
			BringSource::WingLibrary(name, module_dir) | BringSource::TrustedModule(name, module_dir) => {
				let brought_ns = match self.types.source_file_envs.get(module_dir) {
					Some(SymbolEnvOrNamespace::SymbolEnv(_)) => {
						panic!("Expected a namespace to be associated with the library")
					}
					Some(SymbolEnvOrNamespace::Namespace(ns)) => ns,
					Some(SymbolEnvOrNamespace::Error(diagnostic)) => {
						report_diagnostic(Diagnostic {
							span: Some(stmt.span()),
							..diagnostic.clone()
						});
						return;
					}
					None => {
						self.spanned_error(
							stmt,
							format!("Could not type check \"{}\" due to cyclic bring statements", name),
						);
						return;
					}
				};
				if let Err(e) = env.define(
					identifier.as_ref().unwrap_or(&name),
					SymbolKind::Namespace(*brought_ns),
					AccessModifier::Private,
					StatementIdx::Top,
				) {
					self.type_error(e);
				}
				return;
			}
			BringSource::Directory(path) => {
				let brought_ns = match self.types.source_file_envs.get(path) {
					Some(SymbolEnvOrNamespace::SymbolEnv(_)) => {
						panic!("Expected a namespace to be associated with the directory")
					}
					Some(SymbolEnvOrNamespace::Namespace(ns)) => ns,
					Some(SymbolEnvOrNamespace::Error(diagnostic)) => {
						report_diagnostic(Diagnostic {
							span: Some(stmt.span()),
							..diagnostic.clone()
						});
						return;
					}
					None => {
						self.spanned_error(
							stmt,
							format!("Could not type check \"{}\" due to cyclic bring statements", path),
						);
						return;
					}
				};
				if let Err(e) = env.define(
					identifier.as_ref().unwrap(),
					SymbolKind::Namespace(*brought_ns),
					AccessModifier::Private,
					StatementIdx::Top,
				) {
					self.type_error(e);
				}
				return;
			}
		}
		self.add_jsii_module_to_env(env, library_name, namespace_filter, alias, Some(&stmt));
		// library_name is the name of the library we are importing from the JSII world
		// namespace_filter describes what types we are importing from the library
		// e.g. [] means we are importing everything from `mylib`
		// e.g. ["ns1", "ns2"] means we are importing everything from `mylib.ns1.ns2`
		// alias is the symbol we are giving to the imported library or namespace
	}

	fn hoist_struct_definition(&mut self, st: &AstStruct, env: &mut SymbolEnv, doc: &Option<String>) {
		let AstStruct {
			name, extends, access, ..
		} = st;

		// Structs can't be defined in preflight or inflight contexts, only at the top-level of a program
		if let Some(_) = env.parent {
			self.spanned_error(
				name,
				format!("struct \"{name}\" must be declared at the top-level of a file"),
			);
		}

		// Create environment representing this struct, for now it'll be empty just so we can support referencing it
		let dummy_env = SymbolEnv::new(None, SymbolEnvKind::Type(self.types.void()), env.phase, 0);

		// Collect types this struct extends
		let extends_types = extends
			.iter()
			.filter_map(|ext| {
				let t = self
					.resolve_user_defined_type(ext, &env, self.ctx.current_stmt_idx())
					.unwrap_or_else(|e| self.type_error(e));
				if t.as_struct().is_some() {
					Some(t)
				} else {
					self.spanned_error(ext, format!("Expected a struct, found type \"{}\"", t));
					None
				}
			})
			.collect::<Vec<_>>();

		// Create the struct type with the empty environment
		let struct_type = self.types.add_type(Type::Struct(Struct {
			name: name.clone(),
			fqn: None,
			extends: extends_types.clone(),
			env: dummy_env,
			docs: doc.as_ref().map_or(Docs::default(), |s| Docs::with_summary(s)),
		}));

		match env.define(name, SymbolKind::Type(struct_type), *access, StatementIdx::Top) {
			Err(type_error) => {
				self.type_error(type_error);
			}
			_ => {}
		};
	}

	fn hoist_interface_definition(&mut self, iface: &AstInterface, env: &mut SymbolEnv, doc: &Option<String>) {
		// Create environment representing this interface, for now it'll be empty just so we can support referencing ourselves
		// from the interface definition or by other type definitions that come before the interface statement.
		let dummy_env = SymbolEnv::new(
			None,
			SymbolEnvKind::Type(self.types.void()),
			env.phase,
			self.ctx.current_stmt_idx(),
		);

		// Collect types this interface extends
		let extend_interfaces = iface
			.extends
			.iter()
			.filter_map(|i| {
				let t = self
					.resolve_user_defined_type(i, env, self.ctx.current_stmt_idx())
					.unwrap_or_else(|e| self.type_error(e));
				if t.as_interface().is_some() {
					Some(t)
				} else {
					// The type checker resolves non-existing definitions to `any`, so we avoid duplicate errors by checking for that here
					if !t.is_unresolved() {
						self.spanned_error(i, format!("Expected an interface, instead found type \"{}\"", t));
					}
					None
				}
			})
			.collect::<Vec<_>>();

		// Create the interface type with the empty environment
		let interface_spec = Interface {
			name: iface.name.clone(),
			fqn: None,
			docs: doc.as_ref().map_or(Docs::default(), |s| Docs::with_summary(s)),
			env: dummy_env,
			extends: extend_interfaces.clone(),
			phase: iface.phase,
		};
		let interface_type = self.types.add_type(Type::Interface(interface_spec));

		match env.define(
			&iface.name,
			SymbolKind::Type(interface_type),
			iface.access,
			StatementIdx::Top,
		) {
			Err(type_error) => {
				self.type_error(type_error);
			}
			_ => {}
		};
	}

	fn hoist_enum_definition(&mut self, enu: &AstEnum, env: &mut SymbolEnv, doc: &Option<String>) {
		let enum_type_ref = self.types.add_type(Type::Enum(Enum {
			name: enu.name.clone(),
			values: enu.values.clone(),
			docs: doc.as_ref().map_or(Docs::default(), |s| Docs::with_summary(s)),
		}));

		match env.define(
			&enu.name,
			SymbolKind::Type(enum_type_ref),
			enu.access,
			StatementIdx::Top,
		) {
			Err(type_error) => {
				self.type_error(type_error);
			}
			_ => {}
		};
	}

	fn resolve_type_annotation(&mut self, annotation: &TypeAnnotation, env: &SymbolEnv) -> TypeRef {
		match &annotation.kind {
			TypeAnnotationKind::Inferred => self.types.make_inference(),
			TypeAnnotationKind::Number => self.types.number(),
			TypeAnnotationKind::String => self.types.string(),
			TypeAnnotationKind::Bool => self.types.bool(),
			TypeAnnotationKind::Duration => self.types.duration(),
			TypeAnnotationKind::Void => self.types.void(),
			TypeAnnotationKind::Json => self.types.json(),
			TypeAnnotationKind::MutJson => self.types.mut_json(),
			TypeAnnotationKind::Optional(v) => {
				let value_type = self.resolve_type_annotation(v, env);
				self.types.add_type(Type::Optional(value_type))
			}
			TypeAnnotationKind::Function(ast_sig) => {
				let last_non_optional_index = ast_sig.parameters.iter().rposition(|p| match p.type_annotation.kind {
					TypeAnnotationKind::Optional(_) => false,
					_ => !p.variadic,
				});

				let mut parameters = vec![];
				for i in 0..ast_sig.parameters.len() {
					let p = ast_sig.parameters.get(i).unwrap();
					if p.variadic && i != (ast_sig.parameters.len() - 1) {
						self.spanned_error(
							&ast_sig.parameters.get(i).unwrap().name.span,
							"Variadic parameters must always be the last parameter in a function.".to_string(),
						);
					}

					if p.variadic {
						match &p.type_annotation.kind {
							TypeAnnotationKind::Array(_) | TypeAnnotationKind::MutArray(_) => {}
							_ => self.spanned_error(
								&ast_sig.parameters.get(i).unwrap().name.span,
								"Variadic parameters must be type Array or MutArray.".to_string(),
							),
						};
					}

					if last_non_optional_index.is_some_and(|li| i <= li) {
						match &p.type_annotation.kind {
							TypeAnnotationKind::Optional(_) => self.spanned_error(
								&ast_sig.parameters.get(i).unwrap().name.span,
								"Optional parameters must always be after all non-optional parameters.".to_string(),
							),
							_ => {}
						};
					}
				}
				for p in ast_sig.parameters.iter() {
					parameters.push(FunctionParameter {
						name: p.name.name.clone(),
						typeref: self.resolve_type_annotation(&p.type_annotation, env),
						docs: Docs::default(),
						variadic: p.variadic,
					});
				}
				let sig = FunctionSignature {
					this_type: None,
					parameters,
					return_type: self.resolve_type_annotation(ast_sig.return_type.as_ref(), env),
					phase: ast_sig.phase,
					js_override: None,
					is_macro: false,
					docs: Docs::default(),
					implicit_scope_param: false,
				};
				// TODO: avoid creating a new type for each function_sig resolution
				self.types.add_type(Type::Function(sig))
			}
			TypeAnnotationKind::UserDefined(user_defined_type) => self
				.resolve_user_defined_type(user_defined_type, env, self.ctx.current_stmt_idx())
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

	fn type_check_arg_list(&mut self, arg_list: &ArgList, env: &mut SymbolEnv) -> ArgListTypes {
		// By default assume there are no inflight expressions in the arg list
		let mut inflight_args = false;

		// Type check the positional arguments, e.g. fn(exp1, exp2, exp3)
		let pos_arg_types = arg_list
			.pos_args
			.iter()
			.map(|pos_arg| {
				let (t, p) = self.type_check_exp(pos_arg, env);
				inflight_args |= p == Phase::Inflight;
				t
			})
			.collect();

		// Type check the named arguments, e.g. fn(named_arg1: exp4, named_arg2: exp5)
		let named_arg_types = arg_list
			.named_args
			.iter()
			.map(|(sym, expr)| {
				let (arg_type, p) = self.type_check_exp(&expr, env);
				inflight_args |= p == Phase::Inflight;
				(
					sym.clone(),
					SpannedTypeInfo {
						type_: arg_type,
						span: expr.span.clone(),
					},
				)
			})
			.collect::<IndexMap<_, _>>();

		ArgListTypes {
			pos_args: pos_arg_types,
			named_args: named_arg_types,
			includes_inflights: inflight_args,
		}
	}

	fn type_check_statement(&mut self, stmt: &Stmt, env: &mut SymbolEnv) {
		CompilationContext::set(CompilationPhase::TypeChecking, &stmt.span);

		// Set the current statement index for symbol lookup checks.
		self.with_stmt(stmt, |tc| match &stmt.kind {
			StmtKind::Let {
				reassignable,
				var_name,
				initial_value,
				type_,
			} => {
				tc.type_check_let(type_, initial_value, var_name, reassignable, env);
			}
			StmtKind::ForLoop {
				iterator,
				iterable,
				statements,
			} => {
				tc.type_check_for_loop(iterable, iterator, statements, env);
			}
			StmtKind::While { condition, statements } => {
				tc.type_check_while(condition, statements, env);
			}
			StmtKind::Break | StmtKind::Continue => {}
			StmtKind::IfLet(iflet) => {
				tc.type_check_iflet(iflet, env);
			}
			StmtKind::If {
				condition,
				statements,
				elif_statements,
				else_statements,
			} => {
				tc.type_check_if(condition, statements, elif_statements, else_statements, env);
			}
			StmtKind::Expression(e) => {
				tc.type_check_exp(e, env);
			}
			StmtKind::Assignment { kind, variable, value } => {
				tc.type_check_assignment(kind, value, variable, env);
			}
			StmtKind::Bring { .. } => {
				// nothing to do here - bring statements are hoisted during type_check_scope
			}
			StmtKind::Scope(scope) => {
				let scope_env = tc.types.add_symbol_env(SymbolEnv::new(
					Some(env.get_ref()),
					SymbolEnvKind::Scope,
					env.phase,
					stmt.idx,
				));
				tc.types.set_scope_env(scope, scope_env);
				tc.inner_scopes.push((scope, tc.ctx.clone()));
			}
			StmtKind::Throw(exp) => {
				tc.type_check_throw(exp, env);
			}
			StmtKind::Return(exp) => {
				tc.type_check_return(stmt, exp, env);
			}
			StmtKind::Class(ast_class) => {
				tc.type_check_class(stmt, ast_class, env);
			}
			StmtKind::Interface(ast_iface) => {
				tc.type_check_interface(ast_iface, env);
			}
			StmtKind::Struct(st) => {
				tc.type_check_struct(st, env);
			}
			StmtKind::Enum(_) => {
				// nothing to do here - enums are hoisted during type_check_scope
			}
			StmtKind::TryCatch {
				try_statements,
				catch_block,
				finally_statements,
			} => {
				tc.type_check_try_catch(try_statements, catch_block, finally_statements, env);
			}
			StmtKind::CompilerDebugEnv => {
				eprintln!("[symbol environment at {}]", stmt.span);
				eprintln!("{}", env);
			}
			StmtKind::SuperConstructor { arg_list } => {
				tc.type_check_super_constructor_against_parent_initializer(stmt, arg_list, env);
			}
			StmtKind::ExplicitLift(lift_quals) => {
				tc.type_check_lift_statement(lift_quals, env);
			}
		});
	}

	fn type_check_try_catch(
		&mut self,
		try_statements: &Scope,
		catch_block: &Option<ast::CatchBlock>,
		finally_statements: &Option<Scope>,
		env: &mut SymbolEnv,
	) {
		// Create a new environment for the try block
		let try_env = self.types.add_symbol_env(SymbolEnv::new(
			Some(env.get_ref()),
			SymbolEnvKind::Scope,
			env.phase,
			self.ctx.current_stmt_idx(),
		));
		self.types.set_scope_env(try_statements, try_env);
		self.inner_scopes.push((try_statements, self.ctx.clone()));

		// Create a new environment for the catch block
		if let Some(catch_block) = catch_block {
			let mut catch_env = self.types.add_symbol_env(SymbolEnv::new(
				Some(env.get_ref()),
				SymbolEnvKind::Scope,
				env.phase,
				self.ctx.current_stmt_idx(),
			));

			// Add the exception variable to the catch block
			if let Some(exception_var) = &catch_block.exception_var {
				match catch_env.define(
					exception_var,
					SymbolKind::make_free_variable(exception_var.clone(), self.types.string(), false, env.phase),
					AccessModifier::Private,
					StatementIdx::Top,
				) {
					Err(type_error) => {
						self.type_error(type_error);
					}
					_ => {}
				}
			}
			self.types.set_scope_env(&catch_block.statements, catch_env);
			self.inner_scopes.push((&catch_block.statements, self.ctx.clone()));
		}

		// Create a new environment for the finally block
		if let Some(finally_statements) = finally_statements {
			let finally_env = self.types.add_symbol_env(SymbolEnv::new(
				Some(env.get_ref()),
				SymbolEnvKind::Scope,
				env.phase,
				self.ctx.current_stmt_idx(),
			));
			self.types.set_scope_env(finally_statements, finally_env);
			self.inner_scopes.push((finally_statements, self.ctx.clone()));
		}
	}

	fn type_check_struct(&mut self, st: &AstStruct, env: &mut SymbolEnv) {
		let AstStruct {
			name,
			extends: _,
			fields,
			access: _,
		} = st;

		// Note: to support mutually recursive type definitions (types that refer to each other), struct types
		// are initialized during `type_check_scope`. The struct type is created with a dummy environment and
		// then replaced with the real environment after the struct's fields are type checked.
		// In this method, we are filling in the struct's environment with the fields and parent members
		// and updating the struct's Type with the new environment.
		let mut struct_type = env
			.lookup(name, Some(self.ctx.current_stmt_idx()))
			.expect("struct type should have been defined in the environment")
			.as_type()
			.unwrap();

		// Note: structs don't have a parent environment, instead they flatten their parent's members into the struct's env.
		//   If we encounter an existing member with the same name and type we skip it, if the types are different we
		//   fail type checking.

		// Create an environment for the struct's members
		let mut struct_env = SymbolEnv::new(
			None,
			SymbolEnvKind::Type(struct_type),
			Phase::Independent,
			self.ctx.current_stmt_idx(),
		);

		// Add fields to the struct env
		for field in fields.iter() {
			let field_type = self.resolve_type_annotation(&field.member_type, env);
			if field_type.is_mutable() {
				self.spanned_error(&field.name, "Struct fields must have immutable types");
			}
			match struct_env.define(
				&field.name,
				SymbolKind::make_member_variable(
					field.name.clone(),
					field_type,
					false,
					false,
					Phase::Independent,
					AccessModifier::Public,
					field.doc.as_ref().map(|s| Docs::with_summary(s)),
				),
				AccessModifier::Public,
				StatementIdx::Top,
			) {
				Err(type_error) => {
					self.type_error(type_error);
				}
				_ => {}
			};
		}

		let extends_types = &struct_type.as_struct().unwrap().extends;
		if let Err(e) = add_parent_members_to_struct_env(extends_types, name, &mut struct_env) {
			self.type_error(e);
		}

		// Replace the dummy struct environment with the real one
		struct_type.as_struct_mut().unwrap().env = struct_env;
	}

	fn type_check_interface(&mut self, ast_iface: &AstInterface, env: &mut SymbolEnv) {
		// Note: to support mutually recursive type definitions (types that refer to each other), interface types
		// are initialized during `type_check_scope`. The interface type is created with a dummy environment and
		// then replaced with the real environment after the interface's fields are type checked.
		// In this method, we are filling in the interface's environment with its members
		// and updating the interface's Type with the new environment.
		let mut interface_type = env
			.lookup(&ast_iface.name, Some(self.ctx.current_stmt_idx()))
			.expect("interface type should have been defined in the environment")
			.as_type()
			.unwrap();

		// Create the real interface environment to be filled with the interface AST types
		let mut interface_env = SymbolEnv::new(
			None,
			SymbolEnvKind::Type(interface_type),
			env.phase,
			self.ctx.current_stmt_idx(),
		);

		// Add methods to the interface env
		for (method_name, sig, doc) in ast_iface.methods.iter() {
			let mut method_type = self.resolve_type_annotation(&sig.to_type_annotation(), env);
			// use the interface type as the function's "this" type
			if let Type::Function(ref mut f) = *method_type {
				f.this_type = Some(interface_type);
			} else {
				panic!("Expected method type to be a function");
			}

			match interface_env.define(
				method_name,
				SymbolKind::make_member_variable(
					method_name.clone(),
					method_type,
					false,
					false,
					sig.phase,
					AccessModifier::Public,
					doc.as_ref().map(|s| Docs::with_summary(s)),
				),
				AccessModifier::Public,
				StatementIdx::Top,
			) {
				Err(type_error) => {
					self.type_error(type_error);
				}
				_ => {}
			};
		}

		let extend_interfaces = &interface_type.as_interface().unwrap().extends;

		// If this is a preflight interface and it doesn't extend any other preflight interfaces then implicitly make it extend
		// the base resource interface. This is so there's some expression in the type system that this is an
		// interface that can only be implemented on a preflight class. This is safe because all preflight classes implement
		// `std.Resource` which itself implements `std.IResource`.
		let need_to_add_base_iresource = ast_iface.phase == Phase::Preflight
			&& !extend_interfaces
				.iter()
				.any(|i| i.as_interface().unwrap().phase == Phase::Preflight);

		// Verify extended interfaces are of valid phase for this interface
		for interface in extend_interfaces.iter().map(|t| t.as_interface().unwrap()) {
			if ast_iface.phase == Phase::Inflight && interface.phase == Phase::Preflight {
				self.spanned_error(
					&ast_iface.name,
					format!(
						"Inflight interface {} cannot extend a preflight interface {}",
						ast_iface.name, interface.name
					),
				);
			}
		}

		// add methods from all extended interfaces to the interface env
		if let Err(e) = add_parent_members_to_iface_env(extend_interfaces, &ast_iface.name, &mut interface_env) {
			self.type_error(e);
		}

		// Replace the dummy interface environment with the real one
		interface_type.as_interface_mut().unwrap().env = interface_env;

		if need_to_add_base_iresource {
			let base_resource = self.types.resource_base_interface();
			interface_type.as_interface_mut().unwrap().extends.push(base_resource);
		}
	}

	fn type_check_class(&mut self, stmt: &Stmt, ast_class: &AstClass, env: &mut SymbolEnv) {
		self.ctx.push_class(ast_class);

		// preflight classes cannot be declared inside an inflight scope
		// (the other way is okay)
		if env.phase == Phase::Inflight && ast_class.phase == Phase::Preflight {
			self.spanned_error(
				stmt,
				format!("Cannot declare a {} class in {} scope", ast_class.phase, env.phase),
			);
		}
		// Verify parent is a known class and get their env
		let (parent_class, parent_class_env) =
			self.extract_parent_class(ast_class.parent.as_ref(), ast_class.phase, &ast_class.name, env);

		// Create environment representing this class, for now it'll be empty just so we can support referencing ourselves from the class definition.
		let dummy_env = SymbolEnv::new(None, SymbolEnvKind::Type(self.types.void()), env.phase, stmt.idx);

		let impl_interfaces = ast_class
			.implements
			.iter()
			.filter_map(|i| {
				let t = self
					.resolve_user_defined_type(i, env, stmt.idx)
					.unwrap_or_else(|e| self.type_error(e));
				if t.as_interface().is_some() {
					Some(t)
				} else {
					self.spanned_error(i, format!("Expected an interface, instead found type \"{}\"", t));
					None
				}
			})
			.collect::<Vec<_>>();

		// Verify implemented interfaces are of valid phase for this class
		for interface in impl_interfaces.iter().map(|t| t.as_interface().unwrap()) {
			if ast_class.phase == Phase::Inflight && interface.phase == Phase::Preflight {
				self.spanned_error(
					stmt,
					format!(
						"Inflight class {} cannot implement a preflight interface {}",
						ast_class.name, interface.name
					),
				);
			}
		}

		// Create the resource/class type and add it to the current environment (so class implementation can reference itself)
		let class_spec = Class {
			name: ast_class.name.clone(),
			fqn: None,
			env: dummy_env,
			parent: parent_class,
			implements: impl_interfaces.clone(),
			is_abstract: false,
			phase: ast_class.phase,
			defined_in_phase: env.phase,
			docs: stmt.doc.as_ref().map_or(Docs::default(), |s| Docs::with_summary(s)),
			std_construct_args: ast_class.phase == Phase::Preflight,
			lifts: None,
			uid: self.types.class_counter,
		};
		self.types.class_counter += 1;
		let mut class_type = self.types.add_type(Type::Class(class_spec));
		match env.define(
			&ast_class.name,
			SymbolKind::Type(class_type),
			ast_class.access,
			StatementIdx::Top,
		) {
			Err(type_error) => {
				self.type_error(type_error);
			}
			_ => {}
		};

		// Create a the real class environment to be filled with the class AST types
		let mut class_env = SymbolEnv::new(parent_class_env, SymbolEnvKind::Type(class_type), env.phase, stmt.idx);

		// Add fields to the class env
		for field in ast_class.fields.iter() {
			let field_type = self.resolve_type_annotation(&field.member_type, env);
			match class_env.define(
				&field.name,
				SymbolKind::make_member_variable(
					field.name.clone(),
					field_type,
					field.reassignable,
					field.is_static,
					field.phase,
					field.access,
					field.doc.as_ref().map(|s| Docs::with_summary(s)),
				),
				field.access,
				StatementIdx::Top,
			) {
				Err(type_error) => {
					self.type_error(type_error);
				}
				_ => {}
			};
		}

		// Add methods to the class env
		let mut method_types: BTreeMap<&Symbol, TypeRef> = BTreeMap::new();
		for (method_name, method_def) in ast_class.methods.iter() {
			let mut method_type = self.resolve_type_annotation(&method_def.signature.to_type_annotation(), env);
			self.add_method_to_class_env(
				&mut method_type,
				method_def,
				if method_def.is_static { None } else { Some(class_type) },
				method_def.access,
				&mut class_env,
				method_name,
			);
			method_types.insert(&method_name, method_type);
		}

		// Add the constructor to the class env
		let init_symb = Symbol {
			name: CLASS_INIT_NAME.into(),
			span: ast_class.initializer.span.clone(),
		};

		let mut init_func_type = self.resolve_type_annotation(&ast_class.initializer.signature.to_type_annotation(), env);
		self.add_method_to_class_env(
			&mut init_func_type,
			&ast_class.initializer,
			None,
			ast_class.initializer.access,
			&mut class_env,
			&init_symb,
		);
		method_types.insert(&init_symb, init_func_type);

		let inflight_init_symb = Symbol {
			name: CLASS_INFLIGHT_INIT_NAME.into(),
			span: ast_class.inflight_initializer.span.clone(),
		};

		// Add the inflight initializer to the class env
		let mut inflight_init_func_type =
			self.resolve_type_annotation(&ast_class.inflight_initializer.signature.to_type_annotation(), env);
		self.add_method_to_class_env(
			&mut inflight_init_func_type,
			&ast_class.inflight_initializer,
			Some(class_type),
			ast_class.inflight_initializer.access,
			&mut class_env,
			&inflight_init_symb,
		);
		method_types.insert(&inflight_init_symb, inflight_init_func_type);

		// Replace the dummy class environment with the real one before type checking the methods
		if let Some(mut_class) = class_type.as_class_mut() {
			mut_class.env = class_env;
		} else {
			panic!("Expected class type");
		}

		if let FunctionBody::Statements(scope) = &ast_class.inflight_initializer.body {
			self.check_class_field_initialization(&scope, &ast_class.fields, Phase::Inflight);
		};

		// Type check constructor
		self.type_check_method(
			class_type,
			&init_symb,
			&mut init_func_type,
			env,
			stmt.idx,
			&ast_class.initializer,
		);

		// Verify if all fields of a class/resource are initialized in the ctor.
		let init_statements = match &ast_class.initializer.body {
			FunctionBody::Statements(s) => s,
			FunctionBody::External(_) => panic!("init cannot be extern"),
		};
		self.check_class_field_initialization(&init_statements, &ast_class.fields, Phase::Preflight);

		// If our parent's ctor has any parameters make sure there's a call to it as the first statement of our ctor
		// (otherwise the call can be implicit and we don't need to check for it)
		if let (Some(parent_class_env), Some(parent_class_type)) = (parent_class_env, parent_class) {
			let ctor_def = if ast_class.phase == Phase::Inflight {
				&ast_class.inflight_initializer
			} else {
				&ast_class.initializer
			};
			let parent_ctor_symb = if parent_class_type.as_class().unwrap().phase == Phase::Inflight {
				&inflight_init_symb
			} else {
				// note: In case of phase independent classes (brought from JSII) the init synbol is the same as preflight
				&init_symb
			};

			let parent_ctor_sig = parent_class_env
				.lookup(&parent_ctor_symb, None)
				.expect("a ctor")
				.as_variable()
				.unwrap()
				.type_
				.as_function_sig()
				.expect("ctor to be a function");
			if let FunctionBody::Statements(ctor_body) = &ctor_def.body {
				// Make sure there's a `super()` call to the parent ctor
				if parent_ctor_sig.min_parameters() > 0 {
					// Find the `super()` call
					if let Some((idx, _super_call)) = ctor_body
						.statements
						.iter()
						.enumerate()
						.find(|(_, s)| matches!(s.kind, StmtKind::SuperConstructor { .. }))
					{
						// Check if any of the statements before the super() call are invalid
						for i in 0..idx {
							self.type_check_valid_stmt_before_super(&ctor_body.statements[i]);
						}
					} else {
						self.spanned_error(
							ctor_body,
							format!("Missing super() call in {}'s constructor", ast_class.name),
						);
					}

					// Check `super()` call occurs in valid location
					let mut super_ctor_loc_check = CheckSuperCtorLocationVisitor::new();
					super_ctor_loc_check.visit_scope(ctor_body);
					// Redundant super() calls diagnostics
					for span in super_ctor_loc_check.redundant_calls.iter() {
						self.spanned_error_with_annotations(
							span,
							"super() should be called only once",
							vec![DiagnosticAnnotation::new(
								"First super call occurs here",
								super_ctor_loc_check.first_call.as_ref().unwrap(),
							)],
						);
					}
					// Inner scope super() calls diagnostics
					for span in super_ctor_loc_check.inner_calls.iter() {
						self.spanned_error(span, "super() should be called at the top scope of the constructor");
					}
				}
			}
		}

		// Type check the inflight ctor
		self.type_check_method(
			class_type,
			&inflight_init_symb,
			&mut inflight_init_func_type,
			env,
			stmt.idx,
			&ast_class.inflight_initializer,
		);

		// TODO: handle member/method overrides in our env based on whatever rules we define in our spec
		// https://github.com/winglang/wing/issues/1124

		// Type check methods
		for (method_name, method_def) in ast_class.methods.iter() {
			let mut method_type = *method_types.get(&method_name).unwrap();
			self.type_check_method(class_type, method_name, &mut method_type, env, stmt.idx, method_def);
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
			for (method_name, v) in interface_type.methods(true) {
				let method_type = v.type_;
				if let Some(symbol) = &mut class_type
					.as_class_mut()
					.unwrap()
					.env
					.lookup(&method_name.as_str().into(), None)
				{
					let class_method_var = symbol.as_variable().expect("Expected method to be a variable");
					let class_method_type = class_method_var.type_;
					self.validate_type(class_method_type, method_type, &class_method_var.name);
					// Make sure the method is public (interface methods must be public)
					if class_method_var.access != AccessModifier::Public {
						self.spanned_error(
							&class_method_var.name,
							format!(
								"Method \"{method_name}\" is {} in \"{}\" but it's an implementation of \"{interface_type}\". Interface members must be public.",
								class_method_var.access, ast_class.name,
							),
						);
					}
				} else {
					self.spanned_error(
						&ast_class.name,
						format!(
							"Class \"{}\" does not implement method \"{}\" of interface \"{}\"",
							&ast_class.name, method_name, interface_type.name.name
						),
					);
				}
			}
		}

		// Check that if the class implements sim.IResource, then the
		// types used in its methods are serializable and immutable
		if impl_interfaces
			.iter()
			.any(|i| i.as_interface().unwrap().fqn.as_deref() == Some(WINGSDK_SIM_IRESOURCE_FQN))
		{
			for (method_name, method_def) in ast_class.methods.iter() {
				let method_type = method_types.get(&method_name).unwrap();
				self.check_method_is_resource_compatible(*method_type, method_def);
			}
		}

		self.ctx.pop_class();
	}

	fn type_check_valid_stmt_before_super(&mut self, stmt: &Stmt) {
		let mut check = CheckValidBeforeSuperVisitor::new();
		check.visit_stmt(stmt);

		for span in check.this_accesses.iter() {
			self.spanned_error(
				span,
				"'super()' must be called before accessing 'this' in the constructor of a derived class",
			);
		}

		for span in check.super_accesses.iter() {
			self.spanned_error(
				span,
				"'super()' must be called before calling a method of 'super' in the constructor of a derived class",
			);
		}
	}

	fn check_method_is_resource_compatible(&mut self, method_type: TypeRef, method_def: &FunctionDefinition) {
		let sig = method_type
			.as_function_sig()
			.expect("Expected method type to be a function signature");

		let check_type = |param_name: Option<&str>, t: TypeRef| {
			let prefix = match param_name {
				Some(name) => format!("Parameter \"{}\"", name),
				None => "Return value".to_string(),
			};
			if t.is_mutable() {
				self.spanned_error(
					method_def,
					format!("{} cannot have a mutable type \"{}\" because the method's class implements sim.IResource. Only serializable, immutable types can be used in methods of simulator resources.", prefix, t),
				);
			}
			if !t.is_serializable() {
				self.spanned_error(
					method_def,
					format!("{} cannot have a non-serializable type \"{}\" because the method's class implements sim.IResource. Only serializable, immutable types can be used in methods of simulator resources.", prefix, t),
				);
			}
		};

		for param in sig.parameters.iter() {
			check_type(Some(&param.name), param.typeref);
		}
		check_type(None, sig.return_type);
	}

	fn type_check_return(&mut self, stmt: &Stmt, exp: &Option<Expr>, env: &mut SymbolEnv) {
		// Type check the return expression
		let return_type = exp.as_ref().map(|exp| (self.type_check_exp(exp, env).0, exp));

		// Make sure we're inside a function
		if self.ctx.current_function().is_none() {
			self.spanned_error(stmt, "Return statement outside of function cannot return a value");
			return;
		};

		let cur_func_env = *self.ctx.current_function_env().expect("a function env");
		let SymbolEnvKind::Function { sig: cur_func_type, .. } = cur_func_env.kind else {
			panic!("Expected function env");
		};
		let mut function_ret_type = cur_func_type.as_function_sig().expect("a function_type").return_type;

		let return_type_inferred = self.update_known_inferences(&mut function_ret_type, &stmt.span);

		if let Some((return_type, return_expression)) = return_type {
			if !function_ret_type.is_void() {
				self.validate_type(return_type, function_ret_type, return_expression);
			} else {
				if return_type_inferred {
					self.spanned_error(stmt, "Unexpected return value from void function");
				} else {
					self.spanned_error(
						stmt,
						"Unexpected return value from void function. Return type annotations are required for methods.",
					);
				}
			}
		} else {
			self.validate_type(self.types.void(), function_ret_type, stmt);
		}

		if let Type::Json(d) = &mut *function_ret_type {
			// We do not have the required analysis to know the type of the Json data after return
			if d.is_some() {
				d.take();
			}
		}
	}

	fn type_check_throw(&mut self, exp: &Expr, env: &mut SymbolEnv) {
		let (exp_type, _) = self.type_check_exp(exp, env);
		self.validate_type(exp_type, self.types.string(), exp);
	}

	fn type_check_assignment(&mut self, kind: &AssignmentKind, value: &Expr, variable: &Reference, env: &mut SymbolEnv) {
		let (exp_type, _) = self.type_check_exp(value, env);
		let (var, var_phase) = self.resolve_reference(&variable, env);
		let var_type = match &var {
			ResolveReferenceResult::Variable(var) => var.type_,
			ResolveReferenceResult::Location(_, elem_type) => *elem_type,
		};

		// First, check if the assignment violates any mutability restrictions.
		//
		// Examples:
		//
		// ```
		// let x = 5;
		// x = 6; // error: x is not reassignable
		// ```
		//
		// ```
		// let x = Array<num>[1, 2, 3];
		// x[0] = 4; // error: cannot update elements of an immutable array
		// ```
		match &var {
			ResolveReferenceResult::Variable(var) => {
				if !var.reassignable && !var.type_.is_unresolved() {
					self.spanned_error_with_annotations(
						variable,
						"Variable is not reassignable".to_string(),
						vec![DiagnosticAnnotation {
							message: "defined here (try adding \"var\" in front)".to_string(),
							span: var.name.span(),
						}],
					);
				} else if var_phase == Phase::Preflight && env.phase == Phase::Inflight {
					self.spanned_error(variable, "Variable cannot be reassigned from inflight");
				}
			}
			ResolveReferenceResult::Location(container_type, _) => match **container_type {
				Type::Anything | Type::MutJson | Type::MutArray(_) | Type::MutMap(_) => {}
				Type::Map(_) => {
					self.spanned_error_with_hints(
						variable,
						"Cannot update elements of an immutable Map",
						&["Consider using MutMap instead"],
					);
				}
				Type::Json(_) => {
					self.spanned_error_with_hints(
						variable,
						"Cannot update elements of an immutable Json",
						&["Consider using MutJson instead"],
					);
				}
				Type::Array(_) => {
					self.spanned_error_with_hints(
						variable,
						"Cannot update elements of an immutable Array",
						&["Consider using MutArray instead"],
					);
				}
				Type::String => {
					self.spanned_error(variable, "Strings are immutable");
				}
				Type::Inferred(_)
				| Type::Unresolved
				| Type::Number
				| Type::Duration
				| Type::Boolean
				| Type::Void
				| Type::Nil
				| Type::Optional(_)
				| Type::Set(_)
				| Type::MutSet(_)
				| Type::Function(_)
				| Type::Class(_)
				| Type::Interface(_)
				| Type::Struct(_)
				| Type::Stringable
				| Type::Enum(_) => self.spanned_error(
					variable,
					format!("Unsupported reassignment of element of type {}", var_type),
				),
			},
		}

		// Next, check if the RHS type is compatible the LHS type and satisfies
		// the assignment kind (like +=, -=, etc.).
		//
		// Examples:
		//
		// ```
		// let x = 5;
		// x = "hello"; // error: cannot assign a string to a number
		// ```
		//
		// ```
		// let y = MutArray<num>["hello", "world"];
		// y[0] -= "!"; // error: expected a number, found a string
		// ```
		match kind {
			AssignmentKind::AssignIncr => {
				self.validate_type_in(exp_type, &[self.types.number(), self.types.string()], value, None, None);
				self.validate_type_in(var_type, &[self.types.number(), self.types.string()], value, None, None);
			}
			AssignmentKind::AssignDecr => {
				self.validate_type(exp_type, self.types.number(), value);
				self.validate_type(var_type, self.types.number(), variable);
			}
			AssignmentKind::Assign => {}
		}
		self.validate_type(exp_type, var_type, value);
	}

	fn type_check_if(
		&mut self,
		condition: &Expr,
		statements: &Scope,
		elif_statements: &Vec<ast::ElifBlock>,
		else_statements: &Option<Scope>,
		env: &mut SymbolEnv,
	) {
		self.type_check_if_statement(condition, statements, env);

		for elif_scope in elif_statements {
			self.type_check_if_statement(&elif_scope.condition, &elif_scope.statements, env);
		}

		if let Some(else_scope) = else_statements {
			let else_scope_env = self.types.add_symbol_env(SymbolEnv::new(
				Some(env.get_ref()),
				SymbolEnvKind::Scope,
				env.phase,
				self.ctx.current_stmt_idx(),
			));
			self.types.set_scope_env(else_scope, else_scope_env);
			self.inner_scopes.push((else_scope, self.ctx.clone()));
		}
	}

	fn type_check_iflet(&mut self, iflet: &IfLet, env: &mut SymbolEnv) {
		self.type_check_if_let_statement(
			&iflet.value,
			&iflet.statements,
			&iflet.reassignable,
			&iflet.var_name,
			env,
		);

		for elif_scope in &iflet.elif_statements {
			match elif_scope {
				Elifs::ElifBlock(elif_block) => {
					self.type_check_if_statement(&elif_block.condition, &elif_block.statements, env);
				}
				Elifs::ElifLetBlock(elif_let_block) => {
					self.type_check_if_let_statement(
						&elif_let_block.value,
						&elif_let_block.statements,
						&elif_let_block.reassignable,
						&elif_let_block.var_name,
						env,
					);
				}
			}
		}

		if let Some(else_scope) = &iflet.else_statements {
			let else_scope_env = self.types.add_symbol_env(SymbolEnv::new(
				Some(env.get_ref()),
				SymbolEnvKind::Scope,
				env.phase,
				self.ctx.current_stmt_idx(),
			));
			self.types.set_scope_env(else_scope, else_scope_env);
			self.inner_scopes.push((else_scope, self.ctx.clone()));
		}
	}

	fn type_check_while(&mut self, condition: &Expr, statements: &Scope, env: &mut SymbolEnv) {
		let (cond_type, _) = self.type_check_exp(condition, env);
		self.validate_type(cond_type, self.types.bool(), condition);

		let scope_env = self.types.add_symbol_env(SymbolEnv::new(
			Some(env.get_ref()),
			SymbolEnvKind::Scope,
			env.phase,
			self.ctx.current_stmt_idx(),
		));
		self.types.set_scope_env(statements, scope_env);

		self.inner_scopes.push((statements, self.ctx.clone()));
	}

	fn type_check_for_loop(&mut self, iterable: &Expr, iterator: &Symbol, statements: &Scope, env: &mut SymbolEnv) {
		// TODO: Expression must be iterable
		let (exp_type, _) = self.type_check_exp(iterable, env);

		if !exp_type.is_iterable() {
			self.spanned_error(iterable, format!("Unable to iterate over \"{}\"", &exp_type));
		}

		let iterator_type = match &*exp_type {
			// These are builtin iterables that have a clear/direct iterable type
			Type::Array(t) => *t,
			Type::Set(t) => *t,
			Type::MutArray(t) => *t,
			Type::MutSet(t) => *t,
			Type::Anything => exp_type,
			_t => self.types.error(),
		};

		let mut scope_env = self.types.add_symbol_env(SymbolEnv::new(
			Some(env.get_ref()),
			SymbolEnvKind::Scope,
			env.phase,
			self.ctx.current_stmt_idx(),
		));
		match scope_env.define(
			&iterator,
			SymbolKind::make_free_variable(iterator.clone(), iterator_type, false, env.phase),
			AccessModifier::Private,
			StatementIdx::Top,
		) {
			Err(type_error) => {
				self.type_error(type_error);
			}
			_ => {}
		};
		self.types.set_scope_env(statements, scope_env);

		self.inner_scopes.push((statements, self.ctx.clone()));
	}

	fn type_check_let(
		&mut self,
		type_: &Option<TypeAnnotation>,
		initial_value: &Expr,
		var_name: &Symbol,
		reassignable: &bool,
		env: &mut SymbolEnv,
	) {
		let explicit_type = type_.as_ref().map(|t| self.resolve_type_annotation(t, env));
		let (mut inferred_type, _) = self.type_check_exp(initial_value, env);
		if inferred_type.is_void() {
			self.spanned_error(
				var_name,
				format!("Cannot assign expression of type \"{}\" to a variable", inferred_type),
			);
		}
		if explicit_type.is_none() && inferred_type.is_nil() {
			self.spanned_error(
				initial_value,
				"Cannot assign nil value to variables without explicit optional type",
			);
		}
		if let Some(explicit_type) = explicit_type {
			self.validate_type(inferred_type, explicit_type, initial_value);
			let final_type = if !*reassignable && explicit_type.is_json() && inferred_type.is_json() {
				// If both types are Json, use the inferred type in case it has more information
				inferred_type
			} else {
				explicit_type
			};
			match env.define(
				var_name,
				SymbolKind::make_free_variable(var_name.clone(), final_type, *reassignable, env.phase),
				AccessModifier::Private,
				StatementIdx::Index(self.ctx.current_stmt_idx()),
			) {
				Err(type_error) => {
					self.type_error(type_error);
				}
				_ => {}
			};
		} else {
			if *reassignable && inferred_type.is_json() {
				if let Type::Json(Some(_)) = *inferred_type {
					// We do not have the required analysis to know the type of the Json data after reassignment
					inferred_type = self.types.json();
				}
			}
			match env.define(
				var_name,
				SymbolKind::make_free_variable(var_name.clone(), inferred_type, *reassignable, env.phase),
				AccessModifier::Private,
				StatementIdx::Index(self.ctx.current_stmt_idx()),
			) {
				Err(type_error) => {
					self.type_error(type_error);
				}
				_ => {}
			};
		}
	}

	fn type_check_if_let_statement(
		&mut self,
		value: &Expr,
		statements: &Scope,
		reassignable: &bool,
		var_name: &Symbol,
		env: &mut SymbolEnv,
	) {
		let (mut cond_type, _) = self.type_check_exp(value, env);

		if let Type::Inferred(n) = *cond_type {
			// If the type is inferred and unlinked, we must make sure that the type is also optional
			// So let's make a new inference, but this time optional
			if self.types.get_inference_by_id(n).is_none() {
				let new_inference = self.types.make_inference();
				cond_type = self.types.make_option(new_inference);
				self.types.update_inferred_type(n, cond_type, &value.span);
			}
		}

		if !cond_type.is_option() {
			self.spanned_error(
				value,
				format!("Expected type to be optional, but got \"{}\" instead", cond_type),
			)
		}

		// Technically we only allow if let statements to be used with optionals
		// and above validate_type_is_optional method will attach a diagnostic error if it is not.
		// However for the sake of verbose diagnostics we'll allow the code to continue if the type is not an optional
		// and complete the type checking process for additional errors.
		let var_type = *cond_type.maybe_unwrap_option();

		let mut stmt_env = self.types.add_symbol_env(SymbolEnv::new(
			Some(env.get_ref()),
			SymbolEnvKind::Scope,
			env.phase,
			self.ctx.current_stmt_idx(),
		));

		// Add the variable to if block scope
		match stmt_env.define(
			var_name,
			SymbolKind::make_free_variable(var_name.clone(), var_type, *reassignable, env.phase),
			AccessModifier::Private,
			StatementIdx::Top,
		) {
			Err(type_error) => {
				self.type_error(type_error);
			}
			_ => {}
		}

		self.types.set_scope_env(statements, stmt_env);
		self.inner_scopes.push((statements, self.ctx.clone()));
	}

	fn type_check_if_statement(&mut self, condition: &Expr, statements: &Scope, env: &mut SymbolEnv) {
		let (cond_type, _) = self.type_check_exp(condition, env);
		self.validate_type(cond_type, self.types.bool(), condition);

		let if_scope_env = self.types.add_symbol_env(SymbolEnv::new(
			Some(env.get_ref()),
			SymbolEnvKind::Scope,
			env.phase,
			self.ctx.current_stmt_idx(),
		));
		self.types.set_scope_env(statements, if_scope_env);
		self.inner_scopes.push((statements, self.ctx.clone()));
	}

	fn type_check_super_constructor_against_parent_initializer(
		&mut self,
		super_constructor_call: &Stmt,
		arg_list: &ArgList,
		env: &mut SymbolEnv,
	) {
		let arg_list_types = self.type_check_arg_list(arg_list, env);

		// Verify we're inside a class
		let class_type = if let Some(current_clas) = self.ctx.current_class().cloned() {
			self
				.resolve_user_defined_type(&current_clas, env, self.ctx.current_stmt_idx())
				.expect("current class type to be defined")
		} else {
			self.spanned_error(
				super_constructor_call,
				"Call to super constructor can only be done from within a class constructor",
			);
			return;
		};

		let init_name = if env.phase == Phase::Inflight {
			CLASS_INFLIGHT_INIT_NAME
		} else {
			CLASS_INIT_NAME
		};

		// Verify we're inside the class's initializer
		let (method_name, _) = self.ctx.current_method().expect("to be inside a method");
		if method_name.name != init_name {
			self.spanned_error(
				super_constructor_call,
				"Call to super constructor can only be done from within a class constructor",
			);
			return;
		}

		// Verify the class has a parent class
		let Some(parent_class) = &class_type
			.as_class()
			.expect("class type to be a class")
			.parent
			.filter(|p| !p.is_same_type_as(&self.types.resource_base_type()))
		else {
			self.spanned_error(
				super_constructor_call,
				format!("Class \"{class_type}\" does not have a parent class"),
			);
			return;
		};

		// If the parent class is phase independent then its constructor name is just "new" regardless of
		// whether we're inflight or not.
		let parent_init_name = if parent_class.as_class().unwrap().phase == Phase::Independent {
			CLASS_INIT_NAME
		} else {
			init_name
		};

		let parent_initializer = parent_class
			.as_class()
			.unwrap()
			.methods(false)
			.find(|(name, ..)| name == parent_init_name)
			.unwrap()
			.1;

		self.type_check_arg_list_against_function_sig(
			&arg_list,
			parent_initializer.type_.as_function_sig().unwrap(),
			super_constructor_call,
			arg_list_types,
		);
	}

	/// Validate if the fields of a class are initialized in the constructor (init) according to the given phase.
	/// For example, if the phase is preflight, then all non-static preflight fields must be initialized
	/// and if the phase is inflight, then all non-static inflight fields must be initialized.
	///
	/// # Arguments
	///
	/// * `scope` - The constructor scope (init)
	/// * `fields` - All fields of a class
	/// * `phase` - initializer phase
	///
	fn check_class_field_initialization(&mut self, scope: &Scope, fields: &[ClassField], phase: Phase) {
		// Traverse the AST of the constructor (preflight or inflight) to find all initialized fields
		// that were initialized during its execution.
		let mut visit_init = VisitClassInit::default();
		visit_init.analyze_statements(&scope.statements);
		let initialized_fields = visit_init.fields;

		let (current_phase, forbidden_phase) = if phase == Phase::Inflight {
			("Inflight", Phase::Preflight)
		} else {
			("Preflight", Phase::Inflight)
		};

		// For each field on the class...
		for field in fields.iter() {
			// Check if a field with that name was initialized in this phase's constructor...
			let matching_field = initialized_fields.iter().find(|&s| &s.name == &field.name.name);

			// If the field is static or in the wrong phase, then it shouldn't have been initialized here,
			// so we raise an error.
			if field.phase == forbidden_phase || field.is_static {
				if let Some(matching_field) = matching_field {
					self.spanned_error(
						matching_field,
						format!(
							"\"{}\" cannot be initialized in the {} constructor",
							matching_field.name,
							current_phase.to_lowercase()
						),
					);
				};
				continue;
			}

			// If the field does match the constructor's phase and it wasn't initialized, then we raise an error.
			if field.phase == phase && matching_field == None {
				self.spanned_error(
					&field.name,
					format!("{} field \"{}\" is not initialized", current_phase, field.name.name),
				);
			}
		}
	}

	fn type_check_method(
		&mut self,
		class_type: TypeRef,
		method_name: &Symbol,
		method_type: &mut TypeRef,
		parent_env: &SymbolEnv, // the environment in which the class is declared
		statement_idx: usize,
		method_def: &FunctionDefinition,
	) {
		let class_env = &class_type.as_class().unwrap().env;
		// TODO: make sure this function returns on all control paths when there's a return type (can be done by recursively traversing the statements and making sure there's a "return" statements in all control paths)
		// https://github.com/winglang/wing/issues/457

		let method_sig = method_type
			.as_function_sig()
			.expect("Expected method type to be a function signature");

		// Create method environment and prime it with args
		let is_init = method_name.name == CLASS_INIT_NAME || method_name.name == CLASS_INFLIGHT_INIT_NAME;
		let mut method_env = self.types.add_symbol_env(SymbolEnv::new(
			Some(parent_env.get_ref()),
			SymbolEnvKind::Function {
				is_init,
				sig: *method_type,
			},
			method_sig.phase,
			statement_idx,
		));
		// Prime the method environment with `this`
		if !method_def.is_static || is_init {
			method_env
				.define(
					&Symbol {
						name: "this".into(),
						span: method_name.span.clone(),
					},
					SymbolKind::make_free_variable("this".into(), class_type, false, class_env.phase),
					AccessModifier::Private,
					StatementIdx::Top,
				)
				.expect("Expected `this` to be added to constructor env");
		}
		self.add_arguments_to_env(&method_def.signature.parameters, method_sig, &mut method_env);

		self.with_function_def(
			Some(method_name),
			&method_def.signature,
			method_def.is_static,
			method_env,
			|tc| {
				if let FunctionBody::Statements(scope) = &method_def.body {
					tc.types.set_scope_env(scope, method_env);
					tc.inner_scopes.push((scope, tc.ctx.clone()));
				}

				if let FunctionBody::External(extern_path) = &method_def.body {
					if !method_def.is_static {
						tc.spanned_error(
							method_name,
							"Extern methods must be declared \"static\" (they cannot access instance members)",
						);
					}
					if !tc.types.source_file_envs.contains_key(extern_path) {
						let new_env = tc.types.add_symbol_env(SymbolEnv::new(
							None,
							SymbolEnvKind::Type(tc.types.void()),
							method_sig.phase,
							0,
						));
						tc.types
							.source_file_envs
							.insert(extern_path.clone(), SymbolEnvOrNamespace::SymbolEnv(new_env));
					}

					if let Some(SymbolEnvOrNamespace::SymbolEnv(extern_env)) = tc.types.source_file_envs.get_mut(extern_path) {
						let lookup = extern_env.lookup(method_name, None);
						if let Some(lookup) = lookup {
							// check if it's the same type
							if let Some(lookup) = lookup.as_variable() {
								if !lookup.type_.is_same_type_as(method_type) {
									report_diagnostic(Diagnostic {
										message: "extern type must be the same in all usages".to_string(),
										span: Some(method_name.span.clone()),
										annotations: vec![DiagnosticAnnotation {
											message: "First declared here".to_string(),
											span: lookup.name.span.clone(),
										}],
										hints: vec![format!("Change type to match first declaration: {}", lookup.type_)],
										severity: DiagnosticSeverity::Error,
									});
								}
							} else {
								panic!("Expected extern to be a variable");
							}
						} else {
							extern_env
								.define(
									method_name,
									SymbolKind::Variable(VariableInfo {
										name: method_name.clone(),
										type_: *method_type,
										access: method_def.access,
										phase: method_def.signature.phase,
										docs: None,
										kind: VariableKind::StaticMember,
										reassignable: false,
									}),
									method_def.access,
									StatementIdx::Top,
								)
								.expect("Expected extern to be defined");
						}
					}
				}
			},
		);
	}

	fn add_method_to_class_env(
		&mut self,
		method_type: &mut TypeRef,
		method_def: &FunctionDefinition,
		instance_type: Option<TypeRef>,
		access: AccessModifier,
		class_env: &mut SymbolEnv,
		method_name: &Symbol,
	) {
		// Modify the method's type based on the fact we know it's a method and not just a function
		let method_sig = method_type
			.as_function_sig_mut()
			.expect("Expected method type to be a function");

		// use the class type as the function's "this" type (or None if static)
		method_sig.this_type = instance_type;

		// For now all static preflight methods require an implicit scope argument. In the future we may be smart and if
		// the method doesn't instantiate any preflight classes then we can do away with it.
		//
		// Special cases:
		// 1) If we're overriding a method from a parent class, we assume its `implicit_scope_param`. Note that
		//    this isn't stricly correct and we don't have clearly defined rules for static method inheritance, but this
		//    resolves the issue of calling the base `Resource` class's onTypeLift method which doesn't expect a scope param.
		// 2) If the method is extern we can't add any implicit params.
		let inherit_implicit_scope_param = class_env.parent.and_then(|e| {
			e.lookup(method_name, None).and_then(|s| {
				s.as_variable()
					.unwrap()
					.type_
					.as_function_sig()
					.map(|s| s.implicit_scope_param)
			})
		});
		method_sig.implicit_scope_param = if let Some(inherit_implicit_scope_param) = inherit_implicit_scope_param {
			inherit_implicit_scope_param
		} else {
			instance_type.is_none()
				&& method_sig.phase == Phase::Preflight
				&& !matches!(method_def.body, FunctionBody::External(_))
		};

		// If this method is overriding a parent method, check access modifiers allow it, note this is only relevant for instance methods
		if instance_type.is_some() {
			if let Some(parent_type_env) = class_env.parent {
				if let LookupResult::Found(SymbolKind::Variable(var), li) = parent_type_env.lookup_ext(method_name, None) {
					let SymbolEnvKind::Type(method_defined_in) = li.env.kind else {
						panic!("Expected env to be a type env");
					};
					// If parent method is private we don't allow overriding
					if var.access == AccessModifier::Private {
						self.spanned_error(
							method_name,
							format!("Cannot override private method \"{method_name}\" of \"{method_defined_in}\""),
						);
					} else {
						// For non private methods, we only allow overriding if the access modifier is the same or more permissive:
						// - public can override public or protected
						// - protected can only override protected
						if !(access == AccessModifier::Public
							&& matches!(var.access, AccessModifier::Public | AccessModifier::Protected)
							|| access == AccessModifier::Protected && var.access == AccessModifier::Protected)
						{
							self.spanned_error(
								method_name,
								format!(
									"Cannot override {} method \"{method_name}\" of \"{method_defined_in}\" with a {access} method",
									var.access
								),
							);
						}
					}
				}
			}
		}

		let method_phase = method_type.as_function_sig().unwrap().phase;

		match class_env.define(
			method_name,
			SymbolKind::make_member_variable(
				method_name.clone(),
				*method_type,
				false,
				instance_type.is_none(),
				method_phase,
				access,
				method_def.doc.as_ref().map(|s| Docs::with_summary(s)),
			),
			access,
			StatementIdx::Top,
		) {
			Err(type_error) => {
				self.type_error(type_error);
			}
			_ => {}
		};
	}

	pub fn add_jsii_module_to_env(
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
			.find(|j| j.assembly_name == library_name && j.alias.same(alias))
		{
			// This spec has already been pre-supplied to the typechecker, so we'll still use this to populate the symbol environment
			jsii
		} else {
			// Loading the SDK is handled different from loading any other jsii modules because with the SDK we provide an exact
			// location to locate the SDK, whereas for the other modules we need to search for them from the source directory.
			let assembly_name = if library_name == WINGSDK_ASSEMBLY_NAME {
				// in runtime, if "WINGSDK_MANIFEST_ROOT" env var is set, read it. otherwise set to "../wingsdk" for dev
				let manifest_root = std::env::var("WINGSDK_MANIFEST_ROOT").unwrap_or_else(|_| "../../libs/wingsdk".to_string());
				let assembly_name = match self.jsii_types.load_module(&Utf8Path::new(&manifest_root)) {
					Ok(name) => name,
					Err(type_error) => {
						self.spanned_error(
							&stmt.map(|s| s.span.clone()).unwrap_or_default(),
							format!(
								"Cannot locate Wing standard library from \"{}\": {}",
								manifest_root, type_error
							),
						);
						return;
					}
				};

				assembly_name
			} else {
				let source_dir = self.source_path.parent().unwrap();
				let assembly_name = match self.jsii_types.load_dep(library_name.as_str(), source_dir) {
					Ok(name) => name,
					Err(type_error) => {
						self.spanned_error(
							&stmt.map(|s| s.span.clone()).unwrap_or_default(),
							format!(
								"Cannot find jsii module \"{}\" in source directory: {}",
								library_name, type_error
							),
						);
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
			});

			self
				.jsii_imports
				.iter()
				.find(|j| j.assembly_name == assembly_name && j.alias.same(alias))
				.expect("Expected to find the just-added jsii import spec")
		};

		// check if we've already defined the given alias in the current scope
		if env.lookup(&jsii.alias.name.as_str().into(), None).is_some() {
			self.spanned_error(alias, format!("\"{}\" is already defined", alias.name));
		} else {
			let mut importer = JsiiImporter::new(&jsii, self.types, self.jsii_types);

			importer.import_root_types();
			importer.import_submodules_to_env(env);

			// If we're importing from the the wing sdk, eagerly import all the types within it
			// The wing sdk is special because it's currently the only jsii module we import with a specific target namespace
			if jsii.assembly_name == WINGSDK_ASSEMBLY_NAME {
				importer.deep_import_submodule_to_env(if jsii.namespace_filter.is_empty() {
					None
				} else {
					Some(jsii.namespace_filter.join("."))
				});
			}
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
	fn add_arguments_to_env(&mut self, args: &Vec<AstFunctionParameter>, sig: &FunctionSignature, env: &mut SymbolEnv) {
		assert!(args.len() == sig.parameters.len());
		for (arg, param) in args.iter().zip(sig.parameters.iter()) {
			match env.define(
				&arg.name,
				SymbolKind::make_free_variable(arg.name.clone(), param.typeref, arg.reassignable, env.phase),
				AccessModifier::Public,
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
		original_type: TypeRef,
		type_params: Vec<TypeRef>,
	) -> TypeRef {
		let Some(original_type_env) = original_type.as_env() else {
			panic!("\"{original_type}\" does not have an environment and does not need hydration");
		};

		let Some(original_type_params) = original_type_env.type_parameters.as_ref() else {
			panic!("\"{original_type}\" does not have type parameters and does not need hydration");
		};

		if original_type_params.len() != type_params.len() {
			self.unspanned_error(format!(
				"Type \"{}\" has {} type parameters, but {} were provided",
				original_type,
				original_type_params.len(),
				type_params.len()
			));
			return self.types.error();
		}

		// map from original_type_params to type_params
		let mut types_map = HashMap::new();
		for (o, n) in original_type_params.iter().zip(type_params.iter()) {
			types_map.insert(format!("{o}"), (*o, *n));
		}

		let dummy_env = SymbolEnv::new(None, SymbolEnvKind::Type(original_type), Phase::Independent, 0);
		let tt = match &*original_type {
			Type::Class(c) => Type::Class(Class {
				name: c.name.clone(),
				env: dummy_env,
				fqn: c.fqn.clone(),
				parent: c.parent,
				implements: c.implements.clone(),
				is_abstract: c.is_abstract,
				phase: c.phase,
				docs: c.docs.clone(),
				std_construct_args: c.std_construct_args,
				lifts: None,
				defined_in_phase: env.phase,
				uid: c.uid,
			}),
			Type::Interface(iface) => Type::Interface(Interface {
				name: iface.name.clone(),
				env: dummy_env,
				fqn: iface.fqn.clone(),
				docs: iface.docs.clone(),
				extends: iface.extends.clone(),
				phase: iface.phase,
			}),
			Type::Struct(s) => Type::Struct(Struct {
				name: s.name.clone(),
				env: dummy_env,
				fqn: s.fqn.clone(),
				docs: s.docs.clone(),
				extends: s.extends.clone(),
			}),
			_ => panic!("Expected type to be a class, interface, or struct"),
		};

		// TODO: here we add a new type regardless whether we already "hydrated" `original_type` with these `type_params`. Cache!
		let mut new_type = self.types.add_type(tt);
		let new_env =
			SymbolEnv::new_with_type_params(None, SymbolEnvKind::Type(new_type), Phase::Independent, 0, type_params);

		// Update the types's env to point to the new env
		match *new_type {
			Type::Class(ref mut class) => {
				class.env = new_env;
			}
			Type::Interface(ref mut iface) => {
				iface.env = new_env;
			}
			Type::Struct(ref mut s) => {
				s.env = new_env;
			}
			_ => {}
		}

		// Add symbols from original type to new type
		// Note: this is currently limited to top-level function signatures and fields
		for (_, symbol, _) in original_type_env.iter(true) {
			match symbol {
				SymbolKind::Variable(VariableInfo {
					name,
					type_,
					reassignable,
					phase,
					kind,
					access,
					docs,
				}) => {
					match new_type.as_env_mut().unwrap().define(
						&name,
						SymbolKind::make_member_variable(
							name.clone(),
							self.get_concrete_type_for_generic(env, *type_, &types_map),
							*reassignable,
							matches!(kind, VariableKind::StaticMember),
							*phase,
							*access,
							docs.clone(),
						),
						*access,
						StatementIdx::Top,
					) {
						Err(type_error) => {
							self.type_error(type_error);
						}
						_ => {}
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
		env: &SymbolEnv,
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
			if let Type::Optional(t) = *type_to_maybe_replace {
				let concrete_t = self.get_concrete_type_for_generic(env, t, types_map);
				return self.types.add_type(Type::Optional(concrete_t));
			}

			if let Some(sig) = type_to_maybe_replace.as_function_sig() {
				let new_this_type = sig
					.this_type
					.map(|t| self.get_concrete_type_for_generic(env, t, types_map));
				let new_return_type = self.get_concrete_type_for_generic(env, sig.return_type, types_map);

				let new_params = sig
					.parameters
					.iter()
					.map(|param| FunctionParameter {
						name: param.name.clone(),
						docs: param.docs.clone(),
						typeref: self.get_concrete_type_for_generic(env, param.typeref, types_map),
						variadic: param.variadic,
					})
					.collect();

				let new_sig = FunctionSignature {
					this_type: new_this_type,
					parameters: new_params,
					return_type: new_return_type,
					phase: if new_this_type.is_none() { env.phase } else { sig.phase },
					js_override: sig.js_override.clone(),
					is_macro: sig.is_macro,
					docs: sig.docs.clone(),
					implicit_scope_param: sig.implicit_scope_param,
				};

				return self.types.add_type(Type::Function(new_sig));
			}

			if let Some(inner_env) = type_to_maybe_replace.as_env() {
				if let Some(type_parameters) = &inner_env.type_parameters {
					// For now all our generics only have a single type parameter so use the first type parameter as our "T1"
					let t1 = type_parameters[0];
					let t1_replacement = *types_map
						.get(&format!("{t1}"))
						.filter(|(o, _)| t1.is_same_type_as(o))
						.map(|(_, n)| n)
						.expect("generic must have a type parameter");

					let fqn = match &*type_to_maybe_replace {
						Type::Class(c) => c.fqn.as_ref(),
						Type::Interface(i) => i.fqn.as_ref(),
						Type::Struct(s) => s.fqn.as_ref(),
						_ => None,
					};

					return if let Some(fqn) = fqn {
						match fqn
							.replace(const_format::formatcp!("{WINGSDK_ASSEMBLY_NAME}."), "")
							.as_str()
						{
							WINGSDK_MUT_ARRAY => self.types.add_type(Type::MutArray(t1_replacement)),
							WINGSDK_ARRAY => self.types.add_type(Type::Array(t1_replacement)),
							WINGSDK_MAP => self.types.add_type(Type::Map(t1_replacement)),
							WINGSDK_MUT_MAP => self.types.add_type(Type::MutMap(t1_replacement)),
							WINGSDK_SET => self.types.add_type(Type::Set(t1_replacement)),
							WINGSDK_MUT_SET => self.types.add_type(Type::MutSet(t1_replacement)),
							_ => self.hydrate_class_type_arguments(env, type_to_maybe_replace, vec![t1_replacement]),
						}
					} else {
						self.hydrate_class_type_arguments(env, type_to_maybe_replace, vec![t1_replacement])
					};
				}
			} else {
				match &*type_to_maybe_replace {
					Type::Array(inner_t) => {
						let new_inner = self.get_concrete_type_for_generic(env, *inner_t, types_map);
						return self.types.add_type(Type::Array(new_inner));
					}
					Type::MutArray(inner_t) => {
						let new_inner = self.get_concrete_type_for_generic(env, *inner_t, types_map);
						return self.types.add_type(Type::MutArray(new_inner));
					}
					Type::Set(inner_t) => {
						let new_inner = self.get_concrete_type_for_generic(env, *inner_t, types_map);
						return self.types.add_type(Type::Set(new_inner));
					}
					Type::MutSet(inner_t) => {
						let new_inner = self.get_concrete_type_for_generic(env, *inner_t, types_map);
						return self.types.add_type(Type::MutSet(new_inner));
					}
					Type::Map(inner_t) => {
						let new_inner = self.get_concrete_type_for_generic(env, *inner_t, types_map);
						return self.types.add_type(Type::Map(new_inner));
					}
					Type::MutMap(inner_t) => {
						let new_inner = self.get_concrete_type_for_generic(env, *inner_t, types_map);
						return self.types.add_type(Type::MutMap(new_inner));
					}
					_ => {}
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
			"duration" => Some(Symbol {
				name: "Duration".to_string(),
				span: symbol.span.clone(),
			}),
			"datetime" => Some(Symbol {
				name: "Datetime".to_string(),
				span: symbol.span.clone(),
			}),
			"regex" => Some(Symbol {
				name: "Regex".to_string(),
				span: symbol.span.clone(),
			}),
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

	fn reference_to_udt(&mut self, reference: &Reference) -> Option<UserDefinedType> {
		// TODO: we currently don't handle parenthesized expressions correctly so something like `(MyEnum).A` or `std.(namespace.submodule).A` will return true, is this a problem?
		// https://github.com/winglang/wing/issues/1006
		let mut path = vec![];
		let mut current_reference = reference;
		loop {
			match &current_reference {
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
				Reference::InstanceMember {
					object,
					property,
					optional_accessor: _,
				} => {
					path.push(property.clone());
					current_reference = match &object.kind {
						ExprKind::Reference(r) => r,
						_ => return None,
					}
				}
				Reference::TypeMember { type_name, property } => {
					path.push(property.clone());
					type_name.fields.iter().rev().for_each(|f| path.push(f.clone()));
					path.push(type_name.root.clone());
					break;
				}
				// a[b] cannot be a type reference
				Reference::ElementAccess { .. } => return None,
			}
		}

		let root = path.pop().unwrap();
		path.reverse();

		// combine all the spans into a single span
		let start = root.span.start;
		let end = path.last().map(|s| s.span.end).unwrap_or(root.span.end);
		let file_id = root.span.file_id.clone();
		let start_offset = root.span.start_offset;
		let end_offset = path.last().map(|s| s.span.end_offset).unwrap_or(root.span.end_offset);

		Some(UserDefinedType {
			root,
			fields: path,
			span: WingSpan {
				start,
				end,
				file_id,
				start_offset,
				end_offset,
			},
		})
	}

	/// Check if this expression is actually a reference to a type. The parser doesn't distinguish between a `some_expression.field` and `SomeType.field`.
	/// This function checks if the expression is a reference to a user define type and if it is it returns it. If not it returns `None`.
	fn expr_maybe_type(&mut self, expr: &Expr, env: &SymbolEnv) -> Option<UserDefinedType> {
		// TODO: we currently don't handle parenthesized expressions correctly so something like `(MyEnum).A` or `std.(namespace.submodule).A` will return true, is this a problem?
		// https://github.com/winglang/wing/issues/1006

		let base_udt = if let ExprKind::Reference(reference) = &expr.kind {
			self.reference_to_udt(reference)?
		} else {
			return None;
		};

		// rewrite "namespace.foo()" to "namespace.Util.foo()" (e.g. `util.env()`). we do this by
		// looking up the symbol path within the current environment and if it resolves to a namespace,
		// then resolve a class named "Util" within it. This will basically be equivalent to the
		// `foo.Bar.baz()` case (where `baz()`) is a static method of class `Bar`.
		if base_udt.fields.is_empty() {
			let result = env.lookup_nested_str(&base_udt.full_path_str(), Some(self.ctx.current_stmt_idx()));
			if let LookupResult::Found(symbol_kind, _) = result {
				if let SymbolKind::Namespace(_) = symbol_kind {
					let mut new_udt = base_udt.clone();
					new_udt.fields.push(Symbol {
						name: UTIL_CLASS_NAME.to_string(),
						span: base_udt.span.clone(),
					});

					return self
						.resolve_user_defined_type(&new_udt, env, self.ctx.current_stmt_idx())
						.ok()
						.map(|_| new_udt);
				}
			}
		}

		self
			.resolve_user_defined_type(&base_udt, env, self.ctx.current_stmt_idx())
			.ok()
			.map(|_| base_udt)
	}

	fn make_immutable(&mut self, type_: TypeRef) -> TypeRef {
		match *type_ {
			Type::MutArray(inner) => {
				let inner = self.make_immutable(inner);
				self.types.add_type(Type::Array(inner))
			}
			Type::MutJson => self.types.json(),
			Type::MutMap(inner) => {
				let inner = self.make_immutable(inner);
				self.types.add_type(Type::Map(inner))
			}
			Type::MutSet(inner) => {
				let inner = self.make_immutable(inner);
				self.types.add_type(Type::Set(inner))
			}
			Type::Optional(inner) => {
				let inner = self.make_immutable(inner);
				self.types.add_type(Type::Optional(inner))
			}
			_ => type_,
		}
	}

	fn resolve_reference(&mut self, reference: &Reference, env: &mut SymbolEnv) -> (ResolveReferenceResult, Phase) {
		match reference {
			Reference::Identifier(symbol) => {
				let lookup_res = env.lookup_ext_mut(symbol, Some(self.ctx.current_stmt_idx()));
				if let LookupResultMut::Found(var, _) = lookup_res {
					if let Some(var) = var.as_variable_mut() {
						let phase = var.phase;
						self.update_known_inferences(&mut var.type_, &var.name.span);
						(ResolveReferenceResult::Variable(var.clone()), phase)
					} else {
						let err = self.spanned_error_with_var(
							symbol,
							format!("Expected identifier \"{symbol}\" to be a variable, but it's a {var}",),
						);
						(ResolveReferenceResult::Variable(err.0), err.1)
					}
				} else {
					// Give a specific error message if someone tries to write "print" instead of "log"
					if symbol.name == "print" {
						self.spanned_error(symbol, "Unknown symbol \"print\", did you mean to use \"log\"?");
					} else {
						self.type_error(lookup_result_mut_to_type_error(lookup_res, symbol));
					}
					(
						ResolveReferenceResult::Variable(self.make_error_variable_info()),
						Phase::Independent,
					)
				}
			}
			Reference::InstanceMember {
				object,
				property,
				optional_accessor,
			} => {
				// There's a special case where the object is actually a type and the property is either a static member or an enum variant.
				// In this case the type might even be namespaced (recursive nested reference). We need to detect this and transform this
				// reference into a type reference.
				if let Some(user_type_annotation) = self.expr_maybe_type(object, env) {
					// We can't get here twice, we can safely assume that if we're here the `object` part of the reference doesn't have and evaluated type yet.
					// Create a type reference out of this nested reference and call ourselves again
					let new_ref = Reference::TypeMember {
						type_name: user_type_annotation.clone(),
						property: property.clone(),
					};

					// Store this reference for later when we can modify the final AST and replace the original reference with the new one
					self.types.type_expressions.insert(object.id, new_ref.clone());

					return self.resolve_reference(&new_ref, env);
				}

				// Special case: if the object expression is a simple reference to `this` and we're inside the init function then
				// we'll consider all properties as reassignable regardless of whether they're `var`.
				let mut force_reassignable = false;
				if let ExprKind::Reference(Reference::Identifier(symb)) = &object.kind {
					if symb.name == "this" {
						if let LookupResult::Found(kind, info) = env.lookup_ext(&symb, Some(self.ctx.current_stmt_idx())) {
							// `this` reserved symbol should always be a variable
							assert!(matches!(kind, SymbolKind::Variable(_)));
							force_reassignable = info.init;
						}
					}
				}

				let (instance_type, instance_phase) = self.type_check_exp(object, env);

				// If resolving the object's type failed, we can't resolve the property either
				if instance_type.is_unresolved() {
					return (
						ResolveReferenceResult::Variable(self.make_error_variable_info()),
						Phase::Independent,
					);
				}

				let mut property_variable = self.resolve_variable_from_instance_type(instance_type, property, env);

				// Make sure we're not referencing a preflight field on an inflight instance
				let mut property_phase = property_variable.phase;
				if property_phase == Phase::Preflight && instance_phase == Phase::Inflight {
					self.spanned_error_with_annotations(
						property,
						format!("Can't access preflight member \"{property}\" on inflight instance of type \"{instance_type}\"",),
						vec![DiagnosticAnnotation::new("Object phase is in inflight", object)],
					);
					return (
						ResolveReferenceResult::Variable(self.make_error_variable_info()),
						Phase::Independent,
					);
				}

				// Try to resolve phase independent property's actual phase
				property_phase = if property_phase == Phase::Independent {
					// Phase independent properties get the env phase, this makes sure calls to phase independent
					// methods on lifted preflight objects are executed inflight. This is important in the following cases:
					// 1. Strings might be tokens and not evaluated yet. Tokenized strings accessed inflight
					//    must be evaluated in inflight.
					// 2. Methods returning mutable objects need to be called inflight, because we un-mut these objects
					//    on lift, but the use expects the return value to be mutable. Calling them inflight resolves this.
					// 3. Any side effect as a result of the call (non-pure functions) is probably expected to happen inflight.
					//    So generally, we should call phase independent methods inflight.
					if instance_type.is_struct() {
						// Struct fields aren't methods so we can safely leave them phase independent,
						// without this accessing methods on struct fields don't get correctly lift qualified
						instance_phase
					} else {
						env.phase
					}
				} else {
					property_variable.phase
				};

				// Check if the object is an optional type. If it is ensure the use of optional chaining.
				let object_is_option = instance_type.is_option();

				if object_is_option && !optional_accessor {
					self.spanned_error(
						object,
						format!(
							"Property access on optional type \"{}\" requires optional accessor: \"?.\"",
							instance_type
						),
					);
				}

				if force_reassignable {
					property_variable.reassignable = true;
				}

				// If `a?.b.c`, make sure the entire reference is optional
				if *optional_accessor {
					property_variable.type_ = self.types.make_option(property_variable.type_);
				}

				(ResolveReferenceResult::Variable(property_variable), property_phase)
			}
			Reference::TypeMember { type_name, property } => {
				let type_ = self
					.resolve_user_defined_type(type_name, env, self.ctx.current_stmt_idx())
					.unwrap_or_else(|e| self.type_error(e));
				match *type_ {
					Type::Enum(ref e) => {
						if e.values.contains_key(property) {
							(
								ResolveReferenceResult::Variable(VariableInfo {
									name: property.clone(),
									kind: VariableKind::StaticMember,
									type_,
									reassignable: false,
									phase: Phase::Independent,
									access: AccessModifier::Public,
									docs: None,
								}),
								Phase::Independent,
							)
						} else {
							let err = self.spanned_error_with_var(
								property,
								format!("Enum \"{}\" does not contain value \"{}\"", type_, property.name),
							);
							(ResolveReferenceResult::Variable(err.0), err.1)
						}
					}
					Type::Struct(ref s) => {
						const FROM_JSON: &str = "fromJson";
						const TRY_FROM_JSON: &str = "tryFromJson";

						if property.name == FROM_JSON || property.name == TRY_FROM_JSON {
							// we need to validate that only structs with all valid json fields can have a fromJson method
							for (name, field) in s.fields(true) {
								if !field.type_.has_json_representation() {
									self.spanned_error_with_var(
										property,
										format!(
											"Struct \"{}\" contains field \"{}\" which cannot be represented in Json",
											type_, name
										),
									);
									return (
										ResolveReferenceResult::Variable(self.make_error_variable_info()),
										Phase::Independent,
									);
								}
							}
						}

						let new_class = self.hydrate_class_type_arguments(env, lookup_known_type(WINGSDK_STRUCT, env), vec![type_]);
						let v = self.get_property_from_class_like(new_class.as_class().unwrap(), property, true, env);
						(ResolveReferenceResult::Variable(v), Phase::Independent)
					}
					Type::Class(ref c) => {
						let v = self.get_property_from_class_like(c, property, true, env);
						if matches!(v.kind, VariableKind::InstanceMember) {
							let err = self.spanned_error_with_var(
								property,
								format!("Class \"{c}\" contains a member \"{property}\" but it is not static"),
							);
							return (ResolveReferenceResult::Variable(err.0), err.1);
						}
						// If the property is phase independent then resolve its actual phase to the current execution phase
						let phase = if v.phase == Phase::Independent {
							env.phase
						} else {
							v.phase
						};
						(ResolveReferenceResult::Variable(v.clone()), phase)
					}
					_ => {
						let err = self.spanned_error_with_var(property, format!("\"{}\" not a valid reference", reference));
						(ResolveReferenceResult::Variable(err.0), err.1)
					}
				}
			}
			Reference::ElementAccess { object, index } => {
				let (instance_type, instance_phase) = self.type_check_exp(object, env);
				let (index_type, index_phase) = self.type_check_exp(index, env);

				// Given a[b], we type check the expression according to the type of a.
				let res = match *instance_type {
					// TODO: it might be possible to look at Type::Json's inner data to give a more specific type
					Type::Json(_) => {
						self.validate_type_in(
							index_type,
							&[self.types.number(), self.types.string()],
							index,
							None,
							None,
						);
						ResolveReferenceResult::Location(instance_type, self.types.json()) // indexing into a Json object returns a Json object
					}
					Type::MutJson => {
						self.validate_type_in(
							index_type,
							&[self.types.number(), self.types.string()],
							index,
							None,
							None,
						);
						ResolveReferenceResult::Location(instance_type, self.types.mut_json()) // indexing into a MutJson object returns a MutJson object
					}
					Type::Array(inner_type) | Type::MutArray(inner_type) => {
						self.validate_type(index_type, self.types.number(), index);
						ResolveReferenceResult::Location(instance_type, inner_type)
					}
					Type::Map(inner_type) | Type::MutMap(inner_type) => {
						self.validate_type(index_type, self.types.string(), index);
						ResolveReferenceResult::Location(instance_type, inner_type)
					}
					Type::Anything => ResolveReferenceResult::Location(self.types.anything(), self.types.anything()),
					Type::Unresolved => ResolveReferenceResult::Location(self.types.error(), self.types.error()),
					Type::Inferred(_) => {
						self.spanned_error(object, "Indexing into an inferred type is not supported");
						ResolveReferenceResult::Location(self.types.error(), self.types.error())
					}
					Type::String => {
						self.validate_type(index_type, self.types.number(), index);

						ResolveReferenceResult::Location(instance_type, self.types.string())
					}
					Type::Number
					| Type::Duration
					| Type::Boolean
					| Type::Void
					| Type::Nil
					| Type::Optional(_)
					| Type::Set(_)
					| Type::MutSet(_)
					| Type::Function(_)
					| Type::Class(_)
					| Type::Interface(_)
					| Type::Struct(_)
					| Type::Enum(_)
					| Type::Stringable => {
						let err = self.spanned_error_with_var(object, format!("Type \"{}\" is not indexable", instance_type));
						ResolveReferenceResult::Variable(err.0)
					}
				};
				(
					res,
					if index_phase == Phase::Independent && instance_phase == Phase::Preflight {
						// In case of a phase independent index on a preflight instance we can lift the entire expression
						// so use the instance phase. Using combine_phases here would result in the entire expression to be
						// phase independent and then we'll lift only the instance and won't be able to correctly qualify
						// the expression:
						// bucket_arr[0].put(..) // we need to qualify the entire expression with "put"
						instance_phase
					} else {
						combine_phases(index_phase, instance_phase)
					},
				)
			}
		}
	}

	/// Check if the given property on the given type with the given access modifier can be accessed from the current context
	fn resolve_variable_from_instance_type(
		&mut self,
		instance_type: TypeRef,
		property: &Symbol,
		env: &SymbolEnv,
	) -> VariableInfo {
		match *instance_type {
			Type::Optional(t) => self.resolve_variable_from_instance_type(t, property, env),
			Type::Class(ref class) => self.get_property_from_class_like(class, property, false, env),
			Type::Interface(ref interface) => self.get_property_from_class_like(interface, property, false, env),
			Type::Anything => VariableInfo {
				name: property.clone(),
				type_: instance_type,
				reassignable: false,
				phase: env.phase,
				kind: VariableKind::InstanceMember,
				access: AccessModifier::Public,
				docs: None,
			},

			// Lookup wingsdk std types, hydrating generics if necessary
			Type::Array(t) => {
				let new_class = self.hydrate_class_type_arguments(env, lookup_known_type(WINGSDK_ARRAY, env), vec![t]);
				self.get_property_from_class_like(new_class.as_class().unwrap(), property, false, env)
			}
			Type::MutArray(t) => {
				let new_class = self.hydrate_class_type_arguments(env, lookup_known_type(WINGSDK_MUT_ARRAY, env), vec![t]);
				self.get_property_from_class_like(new_class.as_class().unwrap(), property, false, env)
			}
			Type::Set(t) => {
				let new_class = self.hydrate_class_type_arguments(env, lookup_known_type(WINGSDK_SET, env), vec![t]);
				self.get_property_from_class_like(new_class.as_class().unwrap(), property, false, env)
			}
			Type::MutSet(t) => {
				let new_class = self.hydrate_class_type_arguments(env, lookup_known_type(WINGSDK_MUT_SET, env), vec![t]);
				self.get_property_from_class_like(new_class.as_class().unwrap(), property, false, env)
			}
			Type::Map(t) => {
				let new_class = self.hydrate_class_type_arguments(env, lookup_known_type(WINGSDK_MAP, env), vec![t]);
				self.get_property_from_class_like(new_class.as_class().unwrap(), property, false, env)
			}
			Type::MutMap(t) => {
				let new_class = self.hydrate_class_type_arguments(env, lookup_known_type(WINGSDK_MUT_MAP, env), vec![t]);
				self.get_property_from_class_like(new_class.as_class().unwrap(), property, false, env)
			}
			Type::Json(_) => self.get_property_from_class_like(
				lookup_known_type(WINGSDK_JSON, env).as_class().unwrap(),
				property,
				false,
				env,
			),
			Type::MutJson => self.get_property_from_class_like(
				lookup_known_type(WINGSDK_MUT_JSON, env).as_class().unwrap(),
				property,
				false,
				env,
			),
			Type::String => self.get_property_from_class_like(
				lookup_known_type(WINGSDK_STRING, env).as_class().unwrap(),
				property,
				false,
				env,
			),
			Type::Duration => self.get_property_from_class_like(
				lookup_known_type(WINGSDK_DURATION, env).as_class().unwrap(),
				property,
				false,
				env,
			),
			Type::Struct(ref s) => self.get_property_from_class_like(s, property, true, env),
			_ => self.spanned_error_with_var(property, "Property not found").0,
		}
	}

	/// Get's the type of an instance variable in a class and the type in which it's defined
	fn get_property_from_class_like(
		&mut self,
		class: &impl ClassLike,
		property: &Symbol,
		allow_static: bool,
		env: &SymbolEnv,
	) -> VariableInfo {
		let lookup_res = class.get_env().lookup_ext(property, None);
		if let LookupResult::Found(field, lookup_info) = lookup_res {
			let var = field.as_variable().expect("Expected property to be a variable");

			// Determine the access type of the property
			// Lookup the property in the class env to find out in which class (perhaps an ancestor) it was defined
			let SymbolEnvKind::Type(property_defined_in) = lookup_info.env.kind else {
				panic!("Expected env to be a type env");
			};
			// Check if the class in which the property is defined is one of the classes we're currently nested in
			let mut private_access = false;
			let mut protected_access = false;
			for current_class in self.ctx.current_class_nesting() {
				let current_class_type = self
					.resolve_user_defined_type(&current_class, env, self.ctx.current_stmt_idx())
					.unwrap();
				private_access = private_access || current_class_type.is_same_type_as(&property_defined_in);
				protected_access =
					protected_access || private_access || current_class_type.is_strict_subtype_of(&property_defined_in);
				if private_access {
					break;
				}
			}

			// Compare the access type with what's allowed
			match var.access {
				AccessModifier::Private => {
					if !private_access {
						report_diagnostic(Diagnostic {
							message: format!("Cannot access private member \"{property}\" of \"{class}\""),
							span: Some(property.span()),
							annotations: vec![DiagnosticAnnotation {
								message: "defined here".to_string(),
								span: lookup_info.span,
							}],
							hints: vec![format!(
								"the definition of \"{property}\" needs a broader access modifier like \"pub\" or \"protected\" to be used outside of \"{class}\"",
							)],
							severity: DiagnosticSeverity::Error,
						});
					}
				}
				AccessModifier::Protected => {
					if !protected_access {
						report_diagnostic(Diagnostic {
							message: format!("Cannot access protected member \"{property}\" of \"{class}\""),
							span: Some(property.span()),
							annotations: vec![DiagnosticAnnotation {
								message: "defined here".to_string(),
								span: lookup_info.span,
							}],
							hints: vec![format!(
								"the definition of \"{property}\" needs a broader access modifier like \"pub\" to be used outside of \"{class}\"",
							)],
							severity: DiagnosticSeverity::Error,
						});
					}
				}
				AccessModifier::Public => {} // keep this here to make sure we don't add a new access modifier without handling it here
			}

			if let VariableKind::StaticMember = var.kind {
				if allow_static {
					return var.clone();
				}

				self
					.spanned_error_with_var(
						property,
						format!("Cannot access static property \"{property}\" from instance"),
					)
					.0
			} else {
				var.clone()
			}
		} else {
			self.type_error(lookup_result_to_type_error(lookup_res, property));
			self.make_error_variable_info()
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
		import_udt_from_jsii(self.types, self.jsii_types, user_defined_type, &self.jsii_imports);
		resolve_user_defined_type(user_defined_type, env, statement_idx)
	}

	fn extract_parent_class(
		&mut self,
		parent: Option<&UserDefinedType>,
		phase: Phase,
		name: &Symbol,
		env: &mut SymbolEnv,
	) -> (Option<TypeRef>, Option<SymbolEnvRef>) {
		let Some(parent) = parent else {
			if phase == Phase::Preflight {
				// if this is a preflight and we don't have a parent, then we implicitly set it to `std.Resource`
				let t = self.types.resource_base_type();
				let env = t.as_preflight_class().unwrap().env.get_ref();
				return (Some(t), Some(env));
			} else {
				return (None, None);
			}
		};

		let parent_type = self
			.resolve_user_defined_type(parent, env, self.ctx.current_stmt_idx())
			.unwrap_or_else(|e| {
				self.type_error(e);
				self.types.error()
			});

		// bail out if we could not resolve the parent type
		if parent_type.is_unresolved() {
			return (None, None);
		}

		if &parent.root == name && parent.fields.is_empty() {
			self.spanned_error(parent, "Class cannot extend itself");
			return (None, None);
		}

		if let Some(parent_class) = parent_type.as_class() {
			// Parent class must be either the same phase as the child or, if the child is an inflight class, the parent can be an independent class
			if (parent_class.phase == phase) || (phase == Phase::Inflight && parent_class.phase == Phase::Independent) {
				(Some(parent_type), Some(parent_class.env.get_ref()))
			} else {
				self.spanned_error(
					parent,
					format!(
						"Class \"{}\" is an {} class and cannot extend {} class \"{}\"",
						name, phase, parent_class.phase, parent_class.name
					),
				);
				(None, None)
			}
		} else {
			self.spanned_error(parent, format!("Expected \"{}\" to be a class", parent));
			(None, None)
		}
	}

	fn type_check_lift_statement(&mut self, lift_quals: &ExplicitLift, env: &mut SymbolEnv) {
		for qual in lift_quals.qualifications.iter() {
			let (obj_type, obj_phase) = self.type_check_exp(&qual.obj, env);
			// Skip unknown references (diagnotics already emitted in `resolve_reference`)
			if obj_type.is_unresolved() {
				continue;
			}
			// Make sure the object isn't inflight
			if obj_phase == Phase::Inflight {
				self.spanned_error(
					&qual.obj,
					format!("Expected a preflight object, but found {obj_phase} expression instead"),
				);
			}
			// Make sure the object type is a preflight type
			if !obj_type.is_preflight_object_type() {
				self.spanned_error_with_hints(
					&qual.obj,
					format!("Expected a preflight object type, but found {obj_type} instead"),
					&["Preflight objects are instances of either a class or interface defined preflight without the `inflight` modifier"],
				);
				continue;
			}
			// Make sure all the ops are inflight instance members of the object
			for op in qual.ops.iter() {
				let obj_env = obj_type.as_env().expect("a preflight object to have an env");
				match obj_env.lookup(op, None) {
					Some(SymbolKind::Variable(v)) => {
						if v.phase != Phase::Inflight {
							self.spanned_error(
								op,
								format!(
									"Only inflight members may be qualified. \"{op}\" is a {} member.",
									v.phase
								),
							);
						}
						if v.kind != VariableKind::InstanceMember {
							self.spanned_error(op, "Only instance (non-static) members may be qualified".to_string());
						}
					}
					Some(_) => panic!("expected object envs to only have variables"),
					None => self.spanned_error_with_annotations(
						op,
						format!("Object of type {obj_type} does not have an inflight member named \"{op}\""),
						vec![DiagnosticAnnotation::new(
							"Operation does not exist in this object",
							&qual.obj,
						)],
					),
				}
			}
		}

		// Type check the inner statements
		let scope_env = self.types.add_symbol_env(SymbolEnv::new(
			Some(env.get_ref()),
			SymbolEnvKind::Scope,
			env.phase,
			self.ctx.current_stmt_idx(),
		));
		self.types.set_scope_env(&lift_quals.statements, scope_env);
		self.inner_scopes.push((&lift_quals.statements, self.ctx.clone()));
	}
}

impl VisitorWithContext for TypeChecker<'_> {
	fn ctx(&mut self) -> &mut VisitContext {
		&mut self.ctx
	}
}

/**
 * Given two phases (typically from two sub expressions of an expression) will return a valid phase
 * for the top level expression.
 */
fn combine_phases(phase1: Phase, phase2: Phase) -> Phase {
	match (phase1, phase2) {
		// If any of the expressions are inflight then the result is inflight since
		// the entire expression can only be evaluated in inflight context.
		(Phase::Inflight, _) | (_, Phase::Inflight) => Phase::Inflight,
		// Otherwise we'll treat the expression as phase independent
		// Note: we never result in a preflight expression since we currently prefer
		// to lift the smaller preflight components and evaluate them in inflight context
		_ => Phase::Independent,
	}
}

fn add_parent_members_to_struct_env(
	extends_types: &Vec<TypeRef>,
	name: &Symbol,
	struct_env: &mut SymbolEnv, // TODO: pass the struct_type here and we'll extract the env
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
				annotations: vec![],
				hints: vec![],
			});
		};
		// Add each member of current parent to the struct's environment (if it wasn't already added by a previous parent)
		for (parent_member_name, parent_member, _) in parent_struct.env.iter(true) {
			let parent_member_var = parent_member
				.as_variable()
				.expect("Expected struct member to be a variable");
			let parent_member_type = parent_member_var.type_;

			if let Some(existing_type) = struct_env.lookup(&parent_member_name.as_str().into(), None) {
				let existing_var = existing_type
					.as_variable()
					.expect("Expected struct member to be a variable");
				let existing_type = existing_var.type_;

				if !existing_type.is_same_type_as(&parent_member_type) {
					return Err(TypeError {
						span: existing_var.name.span.clone(),
						message: format!(
							"Struct \"{}\" extends \"{}\" which introduces a conflicting member \"{}\" ({} != {})",
							name, parent_type, parent_member_name, parent_member_type, existing_type
						),
						annotations: vec![],
						hints: vec![],
					});
				}
			} else {
				let sym = Symbol {
					name: parent_member_name,
					span: parent_member_var.name.span.clone(),
				};
				struct_env.define(
					&sym,
					SymbolKind::make_member_variable(
						sym.clone(),
						parent_member_type,
						false,
						false,
						struct_env.phase,
						AccessModifier::Public,
						parent_member_var.docs.clone(),
					),
					AccessModifier::Public,
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
	iface_env: &mut SymbolEnv, // TODO: pass the iface_type here and we'll extract the env
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
				annotations: vec![],
				hints: vec![],
			});
		};
		// Add each member of current parent to the interface's environment (if it wasn't already added by a previous parent)
		for (parent_member_name, parent_member, _) in parent_iface.env.iter(true) {
			let member_var = parent_member
				.as_variable()
				.expect("Expected interface member to be a variable");
			if let Some(existing_type) = iface_env.lookup(&parent_member_name.as_str().into(), None) {
				let existing_type = existing_type
					.as_variable()
					.expect("Expected interface member to be a variable")
					.type_;
				if !existing_type.is_same_type_as(&member_var.type_) {
					return Err(TypeError {
						message: format!(
							"Interface \"{}\" extends \"{}\" but has a conflicting member \"{}\" ({} != {})",
							name, parent_type, parent_member_name, member_var.type_, existing_type
						),
						span: name.span.clone(),
						annotations: vec![],
						hints: vec![],
					});
				}
			} else {
				let sym = Symbol {
					name: parent_member_name,
					span: name.span.clone(),
				};
				iface_env.define(
					&sym,
					SymbolKind::make_member_variable(
						sym.clone(),
						member_var.type_,
						member_var.reassignable,
						member_var.kind == VariableKind::StaticMember,
						member_var.phase,
						AccessModifier::Public,
						member_var.docs.clone(),
					),
					AccessModifier::Public,
					StatementIdx::Top,
				)?;
			}
		}
	}
	Ok(())
}

#[duplicate_item(
	lookup_result_to_type_error LookupResult;
	[lookup_result_to_type_error] [LookupResult];
	[lookup_result_mut_to_type_error] [LookupResultMut];
)]
fn lookup_result_to_type_error<T>(lookup_result: LookupResult, looked_up_object: &T) -> TypeError
where
	T: Spanned + Display,
{
	match lookup_result {
		LookupResult::NotFound(s, maybe_t) => {
			let message = if let Some(env_type) = maybe_t {
				format!("Member \"{s}\" does not exist in \"{env_type}\"")
			} else {
				format!("Unknown symbol \"{s}\"")
			};
			let mut hints = vec![];
			if s.name == CONSTRUCT_NODE_PROPERTY {
				hints.push("use nodeof(x) to access the tree node on a preflight class".to_string());
			}
			TypeError {
				message,
				span: s.span(),
				annotations: vec![],
				hints,
			}
		}
		LookupResult::NotPublic(kind, lookup_info) => TypeError {
			message: {
				let access = lookup_info.access.to_string();
				match kind {
					SymbolKind::Type(type_) => {
						if matches!(**type_, Type::Class(_)) {
							format!("Class \"{looked_up_object}\" is {access}")
						} else if matches!(**type_, Type::Interface(_)) {
							format!("Interface \"{looked_up_object}\" is {access}")
						} else if matches!(**type_, Type::Struct(_)) {
							format!("Struct \"{looked_up_object}\" is {access}")
						} else if matches!(**type_, Type::Enum(_)) {
							format!("Enum \"{looked_up_object}\" is {access}")
						} else {
							format!("Symbol \"{looked_up_object}\" is {access}")
						}
					}
					SymbolKind::Variable(_) => format!("Symbol \"{looked_up_object}\" is {access}"),
					SymbolKind::Namespace(_) => format!("namespace \"{looked_up_object}\" is {access}"),
				}
			},
			span: looked_up_object.span(),
			annotations: vec![DiagnosticAnnotation {
				message: "defined here".to_string(),
				span: lookup_info.span,
			}],
			hints: vec![],
		},
		LookupResult::MultipleFound => TypeError {
			message: format!("Ambiguous symbol \"{looked_up_object}\""),
			span: looked_up_object.span(),
			annotations: vec![],
			hints: vec![],
		},
		LookupResult::DefinedLater(span) => TypeError {
			message: format!("Symbol \"{looked_up_object}\" used before being defined"),
			span: looked_up_object.span(),
			annotations: vec![DiagnosticAnnotation {
				message: "defined later here".to_string(),
				span,
			}],
			hints: vec![],
		},
		LookupResult::ExpectedNamespace(ns_name) => TypeError {
			message: format!("Expected \"{ns_name}\" in \"{looked_up_object}\" to be a namespace"),
			span: ns_name.span(),
			annotations: vec![],
			hints: vec![],
		},
		LookupResult::Found(..) => panic!("Expected a lookup error, but found a successful lookup"),
	}
}

/// Resolves a user defined type (e.g. `Foo.Bar.Baz`) to a type reference
pub fn resolve_user_defined_type(
	user_defined_type: &UserDefinedType,
	env: &SymbolEnv,
	statement_idx: usize,
) -> Result<TypeRef, TypeError> {
	resolve_user_defined_type_ref(user_defined_type, env, statement_idx).map(|t| *t)
}

pub fn resolve_user_defined_type_ref<'a>(
	user_defined_type: &'a UserDefinedType,
	env: &'a SymbolEnv,
	statement_idx: usize,
) -> Result<&'a TypeRef, TypeError> {
	// Resolve all types down the fields list and return the last one (which is likely to be a real type and not a namespace)
	let mut nested_name = vec![&user_defined_type.root];
	nested_name.extend(user_defined_type.fields.iter().collect_vec());

	let lookup_result = env.lookup_nested(&nested_name, Some(statement_idx));

	if let LookupResult::Found(symb_kind, _) = lookup_result {
		if let SymbolKind::Type(t) = symb_kind {
			Ok(t)
		} else {
			let symb = nested_name.last().unwrap();
			Err(TypeError {
				message: format!("Expected \"{}\" to be a type but it's a {symb_kind}", symb.name),
				span: symb.span.clone(),
				annotations: vec![],
				hints: vec![],
			})
		}
	} else {
		Err(lookup_result_to_type_error(lookup_result, user_defined_type))
	}
}

pub fn get_udt_definition_phase(user_defined_type: &UserDefinedType, env: &SymbolEnv) -> Option<Phase> {
	let mut nested_name = vec![&user_defined_type.root];
	nested_name.extend(user_defined_type.fields.iter().collect_vec());

	let lookup_result = env.lookup_nested(&nested_name, None);

	if let LookupResult::Found(_, lookup_info) = lookup_result {
		Some(lookup_info.env.phase)
	} else {
		None
	}
}

pub fn is_udt_struct_type(udt: &UserDefinedType, env: &SymbolEnv) -> bool {
	if let Ok(type_) = resolve_user_defined_type(udt, env, 0) {
		type_.as_struct().is_some()
	} else {
		false
	}
}

pub fn resolve_super_method(method: &Symbol, env: &SymbolEnv, types: &Types) -> Result<(TypeRef, Phase), TypeError> {
	let this_type = env.lookup(&Symbol::global("this"), None);
	if let Some(SymbolKind::Variable(VariableInfo {
		type_,
		kind: VariableKind::Free,
		..
	})) = this_type
	{
		if type_.is_closure() {
			return Err(TypeError {
				message:
					"`super` calls inside inflight closures not supported yet, see: https://github.com/winglang/wing/issues/3474"
						.to_string(),
				span: method.span.clone(),
				annotations: vec![],
				hints: vec![],
			});
		}
		// Get the parent type of "this" (if it's a preflight class that's directly derived from `std.Resource` it's an implicit derive so we'll treat it as if there's no parent)
		let parent_type = type_
			.as_class()
			.expect("Expected \"this\" to be a class")
			.parent
			.filter(|t| !(t.is_preflight_class() && t.is_same_type_as(&types.resource_base_type())));
		if let Some(parent_type) = parent_type {
			if let Some(method_info) = parent_type.as_class().unwrap().get_method(method) {
				Ok((method_info.type_, method_info.phase))
			} else {
				Err(TypeError {
					message: format!(
						"super class \"{}\" does not have a method named \"{}\"",
						parent_type, method
					),
					span: method.span.clone(),
					annotations: vec![],
					hints: vec![],
				})
			}
		} else {
			Err(TypeError {
				message: format!("Cannot call super method because class {} has no parent", type_),
				span: method.span.clone(),
				annotations: vec![],
				hints: vec![],
			})
		}
	} else {
		Err(TypeError {
			message: (if matches!(env.kind, SymbolEnvKind::Function { .. }) {
				"Cannot call super method inside of a static method"
			} else {
				"\"super\" can only be used inside of classes"
			})
			.to_string(),
			span: method.span.clone(),
			annotations: vec![],
			hints: vec![],
		})
	}
}

pub fn import_udt_from_jsii(
	wing_types: &mut Types,
	jsii_types: &TypeSystem,
	user_defined_type: &UserDefinedType,
	jsii_imports: &[JsiiImportSpec],
) {
	for jsii in jsii_imports {
		if jsii.alias.name == user_defined_type.root.name {
			let mut importer = JsiiImporter::new(&jsii, wing_types, jsii_types);

			let mut udt_string = if jsii.assembly_name == WINGSDK_ASSEMBLY_NAME {
				// when importing from the std lib, the "alias" is the submodule
				format!("{}.{}", jsii.assembly_name, jsii.alias.name)
			} else {
				if user_defined_type.fields.is_empty() {
					return;
				}
				jsii.assembly_name.to_string()
			};

			for field in &user_defined_type.fields {
				udt_string.push('.');
				udt_string.push_str(&field.name);
			}

			importer.import_type(&FQN::from(udt_string.as_str()));
		}
	}
}

/// *Hacky* If the given type is from the std namespace, add the implicit `std.` to it.
///
/// This is needed because our builtin types have no API
/// So we have to get the API from the std lib
/// But the std lib sometimes doesn't have the same names as the builtin types
///
/// https://github.com/winglang/wing/issues/1780
pub fn fully_qualify_std_type(type_: &str) -> String {
	// Additionally, this doesn't handle for generics
	let type_ = match type_ {
		"duration" => "Duration",
		"datetime" => "Datetime",
		"regex" => "Regex",
		"str" => "String",
		"num" => "Number",
		"bool" => "Boolean",
		_ => {
			// Check for generics or Json
			let type_ = if let Some((prefix, _)) = type_.split_once(" ") {
				prefix
			} else {
				type_
			};
			let type_ = if let Some((prefix, _)) = type_.split_once("<") {
				prefix
			} else {
				type_
			};
			match type_ {
				"Json" | "MutJson" | "MutArray" | "MutMap" | "MutSet" | "Array" | "Map" | "Set" => type_,
				_ => return type_.to_owned(),
			}
		}
	};

	format!("{WINGSDK_STD_MODULE}.{type_}")
}

/// If the string is known at compile time and should be assumed to exist,
/// then this function will return the type reference. Otherwise, it will panic.
fn lookup_known_type(name: &'static str, env: &SymbolEnv) -> TypeRef {
	env
		.lookup_nested_str(name, None)
		.expect(&format!("Expected known type \"{}\" to be defined", name))
		.0
		.as_type()
		.expect(&format!("Expected known type \"{}\" to be a type", name))
}

#[derive(Debug)]
enum ResolveReferenceResult {
	Variable(VariableInfo),
	Location(TypeRef, TypeRef), // (container type, element type)
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

	fn make_function(params: Vec<FunctionParameter>, ret: TypeRef, phase: Phase) -> Type {
		Type::Function(FunctionSignature {
			this_type: None,
			parameters: params,
			return_type: ret,
			phase,
			js_override: None,
			is_macro: false,
			docs: Docs::default(),
			implicit_scope_param: false,
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
		let num_fn = make_function(
			vec![FunctionParameter {
				typeref: num,
				docs: Docs::default(),
				name: "p1".into(),
				variadic: false,
			}],
			void,
			Phase::Inflight,
		);
		let str_fn = make_function(
			vec![FunctionParameter {
				typeref: string,
				docs: Docs::default(),
				name: "p1".into(),
				variadic: false,
			}],
			void,
			Phase::Inflight,
		);

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
		let void = UnsafeRef::<Type>(&Type::Void);
		let string = UnsafeRef::<Type>(&Type::String);
		let opt_string_type = Type::Optional(string);
		let opt_string = UnsafeRef::<Type>(&opt_string_type);
		let str_fn = make_function(
			vec![FunctionParameter {
				typeref: string,
				docs: Docs::default(),
				name: "p1".into(),
				variadic: false,
			}],
			void,
			Phase::Inflight,
		);
		let opt_str_fn = make_function(
			vec![FunctionParameter {
				typeref: opt_string,
				docs: Docs::default(),
				name: "p1".into(),
				variadic: false,
			}],
			void,
			Phase::Inflight,
		);

		// let x = (s: string) => {};
		// let y = (s: string?) => {};
		// y is a subtype of x because a function that accepts a "string?" can be used
		// in place of a function that accepts a "string", but not vice versa
		assert!(opt_str_fn.is_subtype_of(&str_fn));
		assert!(!str_fn.is_subtype_of(&opt_str_fn));
	}

	#[test]
	fn any_is_optional() {
		let any = UnsafeRef::<Type>(&Type::Anything);
		assert!(any.is_option());
	}
}
