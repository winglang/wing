mod jsii_importer;
pub mod symbol_env;
use crate::ast::{Type as AstType, *};
use crate::diagnostic::{Diagnostic, DiagnosticLevel, Diagnostics, TypeError, WingSpan};
use crate::{debug, WINGSDK_ARRAY, WINGSDK_DURATION, WINGSDK_SET, WINGSDK_RESOURCE};
use derivative::Derivative;
use indexmap::IndexSet;
use jsii_importer::JsiiImporter;
use std::cell::RefCell;
use std::collections::HashMap;
use std::fmt::{Debug, Display};
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
	Variable(TypeRef),
	Namespace(Namespace),
}

impl SymbolKind {
	pub fn as_variable(&self) -> Option<TypeRef> {
		match &self {
			SymbolKind::Variable(t) => Some(t.clone()),
			_ => None,
		}
	}

	fn as_namespace(&self) -> Option<&Namespace> {
		match self {
			SymbolKind::Namespace(ns) => Some(ns),
			_ => None,
		}
	}

	fn as_mut_namespace(&mut self) -> Option<&mut Namespace> {
		match self {
			SymbolKind::Namespace(ref mut ns) => Some(ns),
			_ => None,
		}
	}

	fn as_type(&self) -> Option<TypeRef> {
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
	Optional(TypeRef),
	Array(TypeRef),
	Map(TypeRef),
	Set(TypeRef),
	Function(FunctionSignature),
	Class(Class),
	Resource(Class),
	Struct(Struct),
	Enum(Enum),
}

const WING_CONSTRUCTOR_NAME: &'static str = "init";
const WINGSDK_STD_MODULE: &'static str = "std";
const WINGSDK_CORE_MODULE: &'static str = "core";

#[derive(Derivative)]
#[derivative(Debug)]
pub struct Namespace {
	pub name: String,
	pub hidden: bool,
	#[derivative(Debug = "ignore")]
	pub env: SymbolEnv,
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
}

impl Class {
	pub fn methods(&self) -> impl Iterator<Item = (String, TypeRef)> + '_ {
		self
			.env
			.iter()
			.filter(|(_, t)| t.as_variable().unwrap().as_function_sig().is_some())
			.map(|(s, t)| (s.clone(), t.as_variable().unwrap().clone()))
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

impl PartialEq for Type {
	fn eq(&self, other: &Self) -> bool {
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
				// If our parent is equal to `other` then treat both classes as equal (inheritance)
				if let Some(parent) = l0.parent.as_ref() {
					let parent_type: &Type = &*parent;
					return parent_type.eq(other);
				}
				false
			}
			(Self::Resource(l0), Self::Resource(_)) => {
				// If our parent is equal to `other` then treat both resources as equal (inheritance)
				if let Some(parent) = l0.parent.as_ref() {
					let parent_type: &Type = &*parent;
					return parent_type.eq(other);
				}
				false
			}
			(Self::Struct(l0), Self::Struct(_)) => {
				// If we extend from `other` then treat both structs as equal (inheritance)
				for parent in l0.extends.iter() {
					let parent_type: &Type = &*parent;
					if parent_type.eq(other) {
						return true;
					}
				}
				false
			}
			(Self::Array(l0), Self::Array(r0)) => {
				// Arrays are of the same type if they have the same value type
				let l: &Type = &*l0;
				let r: &Type = &*r0;
				l == r
			}
			(Self::Map(l0), Self::Map(r0)) => {
				// Maps are of the same type if they have the same value type
				let l: &Type = &*l0;
				let r: &Type = &*r0;
				l == r
			}
			(Self::Set(l0), Self::Set(r0)) => {
				// Sets are of the same type if they have the same value type
				let l: &Type = &*l0;
				let r: &Type = &*r0;
				l == r
			}
			(Self::Optional(l0), Self::Optional(r0)) => {
				// Optionals are of the same type if they have the same value type
				let l: &Type = &*l0;
				let r: &Type = &*r0;
				l == r
			}
			(Self::Optional(l0), _) => {
				// If we are not an optional, then we must be the same type as the optional's inner type
				let l: &Type = &*l0;
				l == other
			}
			// For all other types (built-ins) we compare the enum value
			_ => core::mem::discriminant(self) == core::mem::discriminant(other),
		}
	}
}

#[derive(PartialEq, Debug)]
pub struct FunctionSignature {
	pub args: Vec<TypeRef>,
	pub return_type: Option<TypeRef>,
	pub flight: Phase,
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
			Type::Optional(v) => write!(f, "{}?", v),
			Type::Function(sig) => {
				write!(
					f,
					"fn({}): {}",
					sig
						.args
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
			Type::Class(class) => write!(f, "{}", class.name),
			Type::Resource(class) => write!(f, "{}", class.name),
			Type::Struct(s) => write!(f, "{}", s.name),
			Type::Array(v) => write!(f, "Array<{}>", v),
			Type::Map(v) => write!(f, "Map<{}>", v),
			Type::Set(v) => write!(f, "Set<{}>", v),
			Type::Enum(s) => write!(f, "{}", s.name),
		}
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

	pub fn is_option(&self) -> bool {
		if let Type::Optional(_) = **self {
			true
		} else {
			false
		}
	}
}

impl PartialEq for TypeRef {
	fn eq(&self, other: &Self) -> bool {
		// Types are equal if they point to the same type definition
		if self.0 == other.0 {
			true
		} else {
			// If the self and other aren't the the same, we need to use the specific types equality function
			let t1: &Type = &**self;
			let t2: &Type = &**other;
			t1.eq(t2) // Same as `t1 == t2`, used eq for verbosity
		}
	}
}

impl Debug for TypeRef {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{:?}", self.0)
	}
}

pub struct Types {
	// TODO: Remove the box and change TypeRef to just be an index into the types array
	// Note: we need the box so reallocations of the vec while growing won't change the addresses of the types since they are referenced from the TypeRef struct
	types: Vec<Box<Type>>,
	numeric_idx: usize,
	string_idx: usize,
	bool_idx: usize,
	duration_idx: usize,
	anything_idx: usize,
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

		Self {
			types,
			numeric_idx,
			string_idx,
			bool_idx,
			duration_idx,
			anything_idx,
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

	pub fn add_type(&mut self, t: Type) -> TypeRef {
		self.types.push(Box::new(t));
		self.get_typeref(self.types.len() - 1)
	}

	pub fn stringables(&self) -> Vec<TypeRef> {
		// TODO: This should be more complex and return all types that have some stringification facility
		// see: https://github.com/winglang/wing/issues/741
		vec![self.string(), self.number()]
	}

	fn get_typeref(&self, idx: usize) -> TypeRef {
		let t = &self.types[idx];
		UnsafeRef::<Type>(&**t as *const Type)
	}
}

pub struct TypeChecker<'a> {
	types: &'a mut Types,

	// Scratchpad for storing inner scopes so we can do breadth first traversal of the AST tree during type checking
	// TODO: this is a list of unsafe pointers to the statement's inner scopes. We use
	// unsafe because we can't return a mutable reference to the inner scopes since this method
	// already uses references to the statement that contains the scopes. Using unsafe here just
	// makes it a lot simpler. Ideally we should avoid returning anything here and have some way
	// to iterate over the inner scopes given the outer scope. For this we need to model our AST
	// so all nodes implement some basic "tree" interface. For now this is good enough.
	inner_scopes: Vec<*const Scope>,

	pub diagnostics: RefCell<Diagnostics>,
}

impl<'a> TypeChecker<'a> {
	pub fn new(types: &'a mut Types) -> Self {
		Self {
			types: types,
			inner_scopes: vec![],
			diagnostics: RefCell::new(Diagnostics::new()),
		}
	}

	pub fn add_globals(&mut self, scope: &Scope) {
		for m in [WINGSDK_STD_MODULE, WINGSDK_CORE_MODULE] {
			self.add_module_to_env(scope.env.borrow_mut().as_mut().unwrap(), m.to_string(), 0);
		}
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
	fn type_check_exp(&mut self, exp: &Expr, env: &SymbolEnv, statement_idx: usize) -> Option<TypeRef> {
		let t = match &exp.kind {
			ExprKind::Literal(lit) => match lit {
				Literal::String(_) => Some(self.types.string()),
				Literal::InterpolatedString(s) => {
					s.parts.iter().for_each(|part| {
						if let InterpolatedStringPart::Expr(interpolated_expr) = part {
							let exp_type = self.type_check_exp(interpolated_expr, env, statement_idx).unwrap();
							self.validate_type_in(exp_type, &self.types.stringables(), interpolated_expr);
						}
					});
					Some(self.types.string())
				}
				Literal::Number(_) => Some(self.types.number()),
				Literal::Duration(_) => Some(self.types.duration()),
				Literal::Boolean(_) => Some(self.types.bool()),
			},
			ExprKind::Binary { op, lexp, rexp } => {
				let ltype = self.type_check_exp(lexp, env, statement_idx).unwrap();
				let rtype = self.type_check_exp(rexp, env, statement_idx).unwrap();

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
					Some(self.types.bool())
				} else {
					self.validate_type(ltype, self.types.number(), rexp);
					Some(ltype)
				}
			}
			ExprKind::Unary { op: _, exp: unary_exp } => {
				let _type = self.type_check_exp(unary_exp, env, statement_idx).unwrap();
				// Add bool vs num support here (! => bool, +- => num)
				self.validate_type(_type, self.types.number(), unary_exp);
				Some(_type)
			}
			ExprKind::Reference(_ref) => Some(self.resolve_reference(_ref, env, statement_idx)),
			ExprKind::New {
				class,
				obj_id: _, // TODO
				arg_list,
				obj_scope, // TODO
			} => {
				// TODO: obj_id, obj_scope ignored, should use it once we support Type::Resource and then remove it from Classes (fail if a class has an id if grammar doesn't handle this for us)

				// Lookup the type in the env
				let type_ = self.resolve_type(class, env, statement_idx);
				let (class_env, class_symbol) = match *type_ {
					Type::Class(ref class) => (&class.env, &class.name),
					Type::Resource(ref class) => {
						if matches!(env.flight, Phase::Preflight) {
							(&class.env, &class.name)
						} else {
							return Some(self.general_type_error(format!(
								"Cannot create the resource \"{}\" in inflight phase",
								class.name.to_string()
							)));
						}
					}
					Type::Anything => return Some(self.types.anything()),
					_ => {
						return Some(self.general_type_error(format!(
							"Cannot instantiate type \"{}\" because it is not a class or resource",
							type_.to_string()
						)))
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
					Ok(v) => v.as_variable().expect("Expected constructor to be a variable"),
					Err(type_error) => {
						self.type_error(&type_error);
						return Some(self.types.anything());
					}
				};
				let constructor_sig = constructor_type
					.as_function_sig()
					.expect("Expected constructor to be a function signature");

				// Verify return type (This should never fail since we define the constructors return type during AST building)
				self.validate_type(constructor_sig.return_type.unwrap(), type_, exp);

				if !arg_list.named_args.is_empty() {
					let last_arg = constructor_sig.args.last().unwrap().maybe_unwrap_option();
					self.validate_structural_type(&arg_list.named_args, &last_arg, exp, env, statement_idx);
				}

				// Count number of optional parameters from the end of the constructor's params
				// Allow arg_list to be missing up to that number of nil values to try and make the number of arguments match
				let num_optionals = constructor_sig
					.args
					.iter()
					.rev()
					.take_while(|arg| arg.is_option())
					.count();

				// Verify arity
				let arg_count = arg_list.pos_args.len() + (if arg_list.named_args.is_empty() { 0 } else { 1 });
				let min_args = constructor_sig.args.len() - num_optionals;
				let max_args = constructor_sig.args.len();
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
				for (arg_expr, arg_type) in arg_list.pos_args.iter().zip(constructor_sig.args.iter()) {
					let arg_expr_type = self.type_check_exp(arg_expr, env, statement_idx).unwrap();
					self.validate_type(arg_expr_type, *arg_type, arg_expr);
				}

				// If this is a Resource then create a new type for this resource object
				if type_.as_resource().is_some() {
					// Get reference to resource object's scope
					let obj_scope_type = if let Some(obj_scope) = obj_scope {
						Some(self.type_check_exp(obj_scope, env, statement_idx).unwrap())
					} else {
						// If this returns None, this means we're instantiating a resource object in the global scope, which is valid
						env
							.try_lookup("this".into(), Some(statement_idx))
							.map(|v| v.as_variable().expect("Expected \"this\" to be a variable"))
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
				Some(type_)
			}
			ExprKind::Call { function, args } => {
				// Resolve the function's reference (either a method in the class's env or a function in the current env)
				let func_type = self.resolve_reference(function, env, statement_idx);
				let this_args = if matches!(function, Reference::NestedIdentifier { .. }) {
					1
				} else {
					0
				};

				// TODO: hack to support methods of stdlib object we don't know their types yet (basically stuff like cloud.Bucket().upload())
				if matches!(*func_type, Type::Anything) {
					return Some(self.types.anything());
				}

				// Make sure this is a function signature type
				let func_sig = if let Some(func_sig) = func_type.as_function_sig() {
					func_sig
				} else {
					self.expr_error(exp, format!("\"{}\" should be a function or method", function));
					return None;
				};

				if !can_call_flight(func_sig.flight, env.flight) {
					self.expr_error(
						exp,
						format!(
							"Cannot call {} function \"{}\" while in {} phase",
							func_sig.flight, function, env.flight,
						),
					);
				}

				if !args.named_args.is_empty() {
					let last_arg = func_sig.args.last().unwrap().maybe_unwrap_option();
					self.validate_structural_type(&args.named_args, &last_arg, exp, env, statement_idx);
				}

				// Count number of optional parameters from the end of the function's params
				// Allow arg_list to be missing up to that number of nil values to try and make the number of arguments match
				let num_optionals = func_sig.args.iter().rev().take_while(|arg| arg.is_option()).count();

				// Verity arity
				let arg_count = args.pos_args.len() + (if args.named_args.is_empty() { 0 } else { 1 });
				let min_args = func_sig.args.len() - num_optionals - this_args;
				let max_args = func_sig.args.len() - this_args;
				if arg_count < min_args || arg_count > max_args {
					let err_text = if min_args == max_args {
						format!(
							"Expected {} arguments but got {} when invoking \"{}\"",
							min_args, arg_count, function
						)
					} else {
						format!(
							"Expected between {} and {} arguments but got {} when invoking \"{}\"",
							min_args, max_args, arg_count, function
						)
					};
					self.expr_error(exp, err_text);
				}

				let params = func_sig
					.args
					.iter()
					.skip(this_args)
					.take(func_sig.args.len() - num_optionals);
				let args = args.pos_args.iter();

				for (arg_type, param_exp) in params.zip(args) {
					let param_type = self.type_check_exp(param_exp, env, statement_idx).unwrap();
					self.validate_type(param_type, *arg_type, param_exp);
				}

				func_sig.return_type
			}
			ExprKind::ArrayLiteral { type_, items } => {
				// Infer type based on either the explicit type or the value in one of the items
				let container_type = if let Some(type_) = type_ {
					self.resolve_type(type_, env, statement_idx)
				} else if !items.is_empty() {
					let some_val_type = self
						.type_check_exp(items.iter().next().unwrap(), env, statement_idx)
						.unwrap();
					self.types.add_type(Type::Array(some_val_type))
				} else {
					self.expr_error(exp, "Cannot infer type of empty array".to_owned());
					self.types.add_type(Type::Array(self.types.anything()))
				};

				let element_type = match *container_type {
					Type::Array(t) => t,
					_ => self.expr_error(exp, format!("Expected \"Array\" type, found \"{}\"", container_type)),
				};

				// Verify all types are the same as the inferred type
				for v in items.iter() {
					let t = self.type_check_exp(v, env, statement_idx).unwrap();
					self.validate_type(t, element_type, v);
				}

				Some(container_type)
			}
			ExprKind::StructLiteral { type_, fields } => {
				// Find this struct's type in the environment
				let struct_type = self.resolve_type(type_, env, statement_idx);

				if struct_type.is_anything() {
					return Some(struct_type);
				}

				// Make sure it really is a struct type
				let st = struct_type
					.as_struct()
					.expect(&format!("Expected \"{}\" to be a struct type", struct_type));

				// Verify that all fields are present and are of the right type
				if st.env.iter().count() > fields.len() {
					panic!("Not all fields of {} are initialized.", struct_type);
				}
				for (k, v) in fields.iter() {
					let field = st.env.try_lookup(&k.name, None);
					if let Some(field) = field {
						let t = self.type_check_exp(v, env, statement_idx).unwrap();
						self.validate_type(
							t,
							field
								.as_variable()
								.expect("Expected struct field to be a variable in the struct env"),
							v,
						);
					} else {
						self.expr_error(exp, format!("\"{}\" is not a field of \"{}\"", k.name, struct_type));
					}
				}

				Some(struct_type)
			}
			ExprKind::MapLiteral { fields, type_ } => {
				// Infer type based on either the explicit type or the value in one of the fields
				let container_type = if let Some(type_) = type_ {
					self.resolve_type(type_, env, statement_idx)
				} else if !fields.is_empty() {
					let some_val_type = self
						.type_check_exp(fields.iter().next().unwrap().1, env, statement_idx)
						.unwrap();
					self.types.add_type(Type::Map(some_val_type))
				} else {
					self.expr_error(exp, "Cannot infer type of empty map".to_owned());
					self.types.add_type(Type::Map(self.types.anything()))
				};

				let value_type = match *container_type {
					Type::Map(t) => t,
					_ => self.expr_error(exp, format!("Expected \"Map\" type, found \"{}\"", container_type)),
				};

				// Verify all types are the same as the inferred type
				for (_, v) in fields.iter() {
					let t = self.type_check_exp(v, env, statement_idx).unwrap();
					self.validate_type(t, value_type, v);
				}

				Some(container_type)
			}
			ExprKind::SetLiteral { type_, items } => {
				// Infer type based on either the explicit type or the value in one of the items
				let container_type = if let Some(type_) = type_ {
					self.resolve_type(type_, env, statement_idx)
				} else if !items.is_empty() {
					let some_val_type = self
						.type_check_exp(items.iter().next().unwrap(), env, statement_idx)
						.unwrap();
					self.types.add_type(Type::Set(some_val_type))
				} else {
					self.expr_error(exp, "Cannot infer type of empty set".to_owned());
					self.types.add_type(Type::Set(self.types.anything()))
				};

				let element_type = match *container_type {
					Type::Set(t) => t,
					_ => self.expr_error(exp, format!("Expected \"Set\" type, found \"{}\"", container_type)),
				};

				// Verify all types are the same as the inferred type
				for v in items.iter() {
					let t = self.type_check_exp(v, env, statement_idx).unwrap();
					self.validate_type(t, element_type, v);
				}

				Some(container_type)
			}
			ExprKind::FunctionClosure(func_def) => {
				// TODO: make sure this function returns on all control paths when there's a return type (can be done by recursively traversing the statements and making sure there's a "return" statements in all control paths)

				if matches!(func_def.signature.flight, Phase::Inflight) {
					self.unimplemented_type("Inflight function signature"); // TODO: what typechecking do we need here?self??
				}

				// Create a type_checker function signature from the AST function definition, assuming success we can add this function to the env
				let function_type = self.resolve_type(
					&AstType::FunctionSignature(func_def.signature.clone()),
					env,
					statement_idx,
				);
				let sig = function_type.as_function_sig().unwrap();

				// Create an environment for the function
				let mut function_env = SymbolEnv::new(
					Some(env.get_ref()),
					sig.return_type,
					false,
					func_def.signature.flight,
					statement_idx,
				);
				self.add_arguments_to_env(&func_def.parameter_names, &sig, &mut function_env);
				func_def.statements.set_env(function_env);

				self.inner_scopes.push(&func_def.statements);

				Some(function_type)
			}
		};
		*exp.evaluated_type.borrow_mut() = t;
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
					.expect("Expected struct field to be a variable in the struct env");
				field_map.insert(k.name.clone(), (k, field_type));
			} else {
				self.expr_error(value, format!("\"{}\" is not a field of \"{}\"", k.name, expected_type));
			}
		}

		// Verify that all non-optional fields are present and are of the right type
		for (k, v) in expected_struct.env.iter().map(|(k, v)| {
			(
				k,
				v.as_variable()
					.expect("Expected struct field to be a variable in the struct env"),
			)
		}) {
			if let Some((symb, expected_field_type)) = field_map.get(&k) {
				let provided_exp = object.get(symb).unwrap();
				let t = self.type_check_exp(provided_exp, env, statement_idx).unwrap();
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
		if actual_type.0 != &Type::Anything && !expected_types.contains(&actual_type) {
			self.diagnostics.borrow_mut().push(Diagnostic {
				message: format!(
					"Expected type to be one of \"{}\", but got \"{}\" instead",
					expected_types
						.iter()
						.map(|t| format!("{}", t))
						.collect::<Vec<String>>()
						.join(","),
					actual_type
				),
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

	fn resolve_type(&mut self, ast_type: &AstType, env: &SymbolEnv, statement_idx: usize) -> TypeRef {
		match ast_type {
			AstType::Number => self.types.number(),
			AstType::String => self.types.string(),
			AstType::Bool => self.types.bool(),
			AstType::Duration => self.types.duration(),
			AstType::Optional(v) => {
				let value_type = self.resolve_type(v, env, statement_idx);
				self.types.add_type(Type::Optional(value_type))
			}
			AstType::FunctionSignature(ast_sig) => {
				let mut args = vec![];
				for arg in ast_sig.parameters.iter() {
					args.push(self.resolve_type(arg, env, statement_idx));
				}
				let sig = FunctionSignature {
					args,
					return_type: ast_sig
						.return_type
						.as_ref()
						.map(|t| self.resolve_type(t, env, statement_idx)),
					flight: ast_sig.flight,
				};
				// TODO: avoid creating a new type for each function_sig resolution
				self.types.add_type(Type::Function(sig))
			}
			AstType::CustomType { root, fields } => {
				// Resolve all types down the fields list and return the last one (which is likely to be a real type and not a namespace)
				let mut nested_name = vec![root];
				nested_name.extend(fields);

				match env.lookup_nested(&nested_name, false, Some(statement_idx)) {
					Ok(_type) => {
						if let SymbolKind::Type(t) = *_type {
							t
						} else {
							let symb = nested_name.last().unwrap();
							self.type_error(&TypeError {
								message: format!("Expected {} to be a type but it's a {}", symb, _type),
								span: symb.span.clone(),
							})
						}
					}
					Err(type_error) => self.type_error(&type_error),
				}
			}
			AstType::Array(v) => {
				let value_type = self.resolve_type(v, env, statement_idx);
				// TODO: avoid creating a new type for each array resolution
				self.types.add_type(Type::Array(value_type))
			}
			AstType::Set(v) => {
				let value_type = self.resolve_type(v, env, statement_idx);
				// TODO: avoid creating a new type for each set resolution
				self.types.add_type(Type::Set(value_type))
			}
			AstType::Map(v) => {
				let value_type = self.resolve_type(v, env, statement_idx);
				// TODO: avoid creating a new type for each map resolution
				self.types.add_type(Type::Map(value_type))
			}
		}
	}

	fn type_check_statement(&mut self, stmt: &Stmt, env: &mut SymbolEnv) {
		match &stmt.kind {
			StmtKind::VariableDef {
				var_name,
				initial_value,
				type_,
			} => {
				let explicit_type = type_.as_ref().map(|t| self.resolve_type(t, env, stmt.idx));
				let inferred_type = self.type_check_exp(initial_value, env, stmt.idx).unwrap();
				if let Some(explicit_type) = explicit_type {
					self.validate_type(inferred_type, explicit_type, initial_value);
					match env.define(
						var_name,
						SymbolKind::Variable(explicit_type),
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
						SymbolKind::Variable(inferred_type),
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
				let exp_type = self.type_check_exp(iterable, env, stmt.idx).unwrap();

				let mut scope_env = SymbolEnv::new(Some(env.get_ref()), env.return_type, false, env.flight, stmt.idx);
				match scope_env.define(&iterator, SymbolKind::Variable(exp_type), StatementIdx::Top) {
					Err(type_error) => {
						self.type_error(&type_error);
					}
					_ => {}
				};
				statements.set_env(scope_env);

				self.inner_scopes.push(statements);
			}
			StmtKind::While { condition, statements } => {
				let cond_type = self.type_check_exp(condition, env, stmt.idx).unwrap();
				self.validate_type(cond_type, self.types.bool(), condition);

				statements.set_env(SymbolEnv::new(
					Some(env.get_ref()),
					env.return_type,
					false,
					env.flight,
					stmt.idx,
				));

				self.inner_scopes.push(statements);
			}
			StmtKind::If {
				condition,
				statements,
				else_statements,
			} => {
				let cond_type = self.type_check_exp(condition, env, stmt.idx).unwrap();
				self.validate_type(cond_type, self.types.bool(), condition);

				statements.set_env(SymbolEnv::new(
					Some(env.get_ref()),
					env.return_type,
					false,
					env.flight,
					stmt.idx,
				));
				self.inner_scopes.push(statements);

				if let Some(else_scope) = else_statements {
					else_scope.set_env(SymbolEnv::new(
						Some(env.get_ref()),
						env.return_type,
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
				let exp_type = self.type_check_exp(value, env, stmt.idx).unwrap();
				let var_type = self.resolve_reference(variable, env, stmt.idx);
				self.validate_type(exp_type, var_type, value);
			}
			StmtKind::Use {
				module_name,
				identifier,
			} => {
				_ = {
					// If provided use alias identifier as the namespace name
					let namespace_name = identifier.as_ref().unwrap_or(module_name);

					if namespace_name.name == WINGSDK_STD_MODULE {
						self.stmt_error(stmt, format!("Redundant import of \"{}\"", WINGSDK_STD_MODULE));
						return;
					}

					self.add_module_to_env(env, module_name.name.clone(), stmt.idx);
				}
			}
			StmtKind::Scope(scope) => {
				scope.set_env(SymbolEnv::new(
					Some(env.get_ref()),
					env.return_type,
					false,
					env.flight,
					stmt.idx,
				));
				self.inner_scopes.push(scope)
			}
			StmtKind::Return(exp) => {
				if let Some(return_expression) = exp {
					let return_type = self.type_check_exp(return_expression, env, stmt.idx).unwrap();
					if let Some(expected_return_type) = env.return_type {
						self.validate_type(return_type, expected_return_type, return_expression);
					} else {
						self.stmt_error(
							stmt,
							format!("Return statement outside of function cannot return a value."),
						);
					}
				} else {
					if let Some(expected_return_type) = env.return_type {
						self.stmt_error(
							stmt,
							format!("Expected return statement to return type {}", expected_return_type),
						);
					}
				}
			}
			StmtKind::Class {
				name,
				members,
				methods,
				parent,
				constructor,
				is_resource,
			} => {
				let env_flight = if *is_resource {
					Phase::Preflight
				} else {
					Phase::Inflight
				};

				if *is_resource {
					// TODO
				}

				// Verify parent is actually a known Class/Resource and get their env
				let (parent_class, parent_class_env) = if let Some(parent_type) = parent {
					let t = self.resolve_type(parent_type, env, stmt.idx);
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
				} else if *is_resource {
					// If we're a resource and we have no parent we implicitly inherit from wingsdk's resource base class
					let wingsdk_resource_type = env
						.lookup_nested_str(WINGSDK_RESOURCE, false, Some(stmt.idx))
						.expect("Expected wingsdk resource base to be defined")
						.as_type()
						.unwrap();
					let wingsdk_resource_class = wingsdk_resource_type.as_resource().unwrap();
					(Some(wingsdk_resource_type), Some(wingsdk_resource_class.env.get_ref()))
				} else {
					(None, None)
				};

				// Create environment representing this class, for now it'll be empty just so we can support referencing ourselves from the class definition.
				let dummy_env = SymbolEnv::new(None, None, true, env_flight, stmt.idx);

				// Create the resource/class type and add it to the current environment (so class implementation can reference itself)
				let class_spec = Class {
					should_case_convert_jsii: false,
					name: name.clone(),
					env: dummy_env,
					parent: parent_class,
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
				let mut class_env = SymbolEnv::new(parent_class_env, None, true, env_flight, stmt.idx);

				// Add members to the class env
				for member in members.iter() {
					let member_type = self.resolve_type(&member.member_type, env, stmt.idx);
					match class_env.define(&member.name, SymbolKind::Variable(member_type), StatementIdx::Top) {
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
						AstType::CustomType {
							root: name.clone(),
							fields: vec![],
						},
					);

					let method_type = self.resolve_type(&AstType::FunctionSignature(sig), env, stmt.idx);
					match class_env.define(method_name, SymbolKind::Variable(method_type), StatementIdx::Top) {
						Err(type_error) => {
							self.type_error(&type_error);
						}
						_ => {}
					};
				}

				// Add the constructor to the class env
				let constructor_type = self.resolve_type(
					&AstType::FunctionSignature(constructor.signature.clone()),
					env,
					stmt.idx,
				);
				match class_env.define(
					&Symbol {
						name: WING_CONSTRUCTOR_NAME.into(),
						span: name.span.clone(),
					},
					SymbolKind::Variable(constructor_type),
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
					env_flight,
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
						SymbolKind::Variable(class_type),
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
						.expect("Expected method to be a variable");

					let method_sig = method_type
						.as_function_sig()
						.expect("Expected method type to be a function signature");

					// Create method environment and prime it with args
					let mut method_env = SymbolEnv::new(
						Some(env.get_ref()),
						method_sig.return_type,
						false,
						method_sig.flight,
						stmt.idx,
					);
					// Add `this` as first argument
					let mut actual_parameters = vec![Symbol {
						name: "this".into(),
						span: method_name.span.clone(),
					}];
					actual_parameters.extend(method_def.parameter_names.clone());
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
				let mut struct_env = SymbolEnv::new(None, None, true, env.flight, stmt.idx);

				// Add members to the struct env
				for member in members.iter() {
					let member_type = self.resolve_type(&member.member_type, env, stmt.idx);
					match struct_env.define(&member.name, SymbolKind::Variable(member_type), StatementIdx::Top) {
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

	fn add_module_to_env(&mut self, env: &mut SymbolEnv, module_name: String, statement_idx: usize) {
		// TODO Hack: treat "cloud" or "std" as "_ in wingsdk" until I figure out the path issue
		if module_name == "cloud" || module_name == WINGSDK_STD_MODULE {
			let mut wingii_types = wingii::type_system::TypeSystem::new();
			let wingii_loader_options = wingii::type_system::AssemblyLoadOptions {
				root: true,
				deps: false,
			};
			// in runtime, if "WINGSDK_MANIFEST_ROOT" env var is set, read it. otherwise set to "../wingsdk" for dev
			let wingsdk_manifest_root = std::env::var("WINGSDK_MANIFEST_ROOT").unwrap_or_else(|_| "../wingsdk".to_string());
			let name = wingii_types
				.load(wingsdk_manifest_root.as_str(), Some(wingii_loader_options))
				.unwrap();
			debug!("Loaded JSII assembly {}", name);
			let assembly = wingii_types.find_assembly(&name).unwrap();

			let mut jsii_importer = JsiiImporter::new(&wingii_types, assembly, &module_name, self.types, statement_idx, env);
			jsii_importer.import_to_env();
		}
	}

	fn add_arguments_to_env(&mut self, arg_names: &Vec<Symbol>, sig: &FunctionSignature, env: &mut SymbolEnv) {
		assert!(arg_names.len() == sig.args.len());
		for (arg, arg_type) in arg_names.iter().zip(sig.args.iter()) {
			match env.define(&arg, SymbolKind::Variable(*arg_type), StatementIdx::Top) {
				Err(type_error) => {
					self.type_error(&type_error);
				}
				_ => {}
			};
		}
	}

	/// Hydrate `any`s in a type reference with a single type argument
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
	fn hydrate_class_type_arguments(&mut self, env: &SymbolEnv, original_fqn: &str, type_param: TypeRef) -> TypeRef {
		let original_type = env.lookup_nested_str(original_fqn, None).unwrap().as_type().unwrap();
		let original_type_class = original_type.as_class().unwrap();

		let new_env = SymbolEnv::new(None, original_type_class.env.return_type, true, Phase::Independent, 0);
		let tt = Type::Class(Class {
			name: original_type_class.name.clone(),
			env: new_env,
			parent: original_type_class.parent,
			should_case_convert_jsii: original_type_class.should_case_convert_jsii,
		});
		let mut new_type = self.types.add_type(tt);
		let new_type_class = new_type.as_mut_class_or_resource().unwrap();

		// Add symbols from original type to new type
		// Note: this is currently limited to top-level function signatures and fields
		for (name, symbol) in original_type_class.env.iter() {
			match symbol {
				SymbolKind::Variable(v) => {
					// Replace `any` in function signatures
					if let Some(sig) = v.as_function_sig() {
						let new_return_type = sig
							.return_type
							.map(|ret| if ret.is_anything() { type_param } else { ret });

						let new_args: Vec<UnsafeRef<Type>> = sig
							.args
							.iter()
							.map(|arg| if arg.is_anything() { type_param } else { *arg })
							.collect();

						let new_sig = FunctionSignature {
							args: new_args,
							return_type: new_return_type,
							flight: Phase::Independent,
						};

						match new_type_class.env.define(
							// TODO: Original symbol is not available. SymbolKind::Variable should probably expose it
							&Symbol {
								name: name.clone(),
								span: WingSpan::global(),
							},
							SymbolKind::Variable(self.types.add_type(Type::Function(new_sig))),
							StatementIdx::Top,
						) {
							Err(type_error) => {
								self.type_error(&type_error);
							}
							_ => {}
						}
					} else if let Some(var) = symbol.as_variable() {
						let new_var_type = if var.is_anything() { type_param } else { var };
						match new_type_class.env.define(
							// TODO: Original symbol is not available. SymbolKind::Variable should probably expose it
							&Symbol {
								name: name.clone(),
								span: WingSpan::global(),
							},
							SymbolKind::Variable(new_var_type),
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

	fn resolve_reference(&mut self, reference: &Reference, env: &SymbolEnv, statement_idx: usize) -> TypeRef {
		match reference {
			Reference::Identifier(symbol) => match env.lookup(symbol, Some(statement_idx)) {
				Ok(var) => {
					if let Some(var) = var.as_variable() {
						var
					} else {
						self.type_error(&TypeError {
							message: format!("Expected identifier {}, to be a variable, but it's a {}", symbol, var),
							span: symbol.span.clone(),
						})
					}
				}
				Err(type_error) => self.type_error(&type_error),
			},
			Reference::NestedIdentifier { object, property } => {
				// There's a special case where the object is actually a type and the property is either a static method or an enum variant.
				// In this case the type might even be namespaced (recursive nested reference). We need to detect this and treat the entire
				// object as a single reference to the type
				if let Some(_type) = self.expr_maybe_type(object, env, statement_idx) {
					// Currently we only support enum field access (no static methods)
					match *_type {
						Type::Enum(ref e) => {
							if e.values.contains(property) {
								return _type;
							} else {
								return self.general_type_error(format!(
									"Enum \"{}\" does not contain value \"{}\"",
									_type, property.name
								));
							}
						}
						_ => {
							return self.general_type_error(format!("Type {} not valid in expression", _type));
						}
					}
				}

				let instance_type = self.type_check_exp(object, env, statement_idx).unwrap();
				match *instance_type {
					Type::Class(ref class) | Type::Resource(ref class) => self.get_property_from_class(class, property),
					Type::Anything => instance_type,

					// Lookup wingsdk std types, hydrating generics if necessary
					Type::Array(t) => {
						let new_class = self.hydrate_class_type_arguments(env, WINGSDK_ARRAY, t);
						self.get_property_from_class(new_class.as_class().unwrap(), property)
					}
					Type::Set(t) => {
						let new_class = self.hydrate_class_type_arguments(env, WINGSDK_SET, t);
						self.get_property_from_class(new_class.as_class().unwrap(), property)
					}
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

					_ => self.expr_error(
						object,
						format!(
							"Expression must be a class or resource instance to access property \"{}\", instead found type \"{}\"",
							property.name, instance_type
						),
					),
				}
			}
		}
	}

	fn get_property_from_class(&mut self, class: &Class, property: &Symbol) -> TypeRef {
		match class.env.lookup(property, None) {
			Ok(field) => field.as_variable().expect("Expected property to be a variable"),
			Err(type_error) => self.type_error(&type_error),
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
		for (parent_member_name, parent_member) in parent_struct.env.iter() {
			let member_type = parent_member
				.as_variable()
				.expect("Expected struct member to be a variable");
			if let Some(existing_type) = struct_env.try_lookup(&parent_member_name, None) {
				// We compare types in both directions to make sure they are exactly the same type and not inheriting from each other
				// TODO: does this make sense? We should add an `is_a()` methdod to `Type` to check if a type is a subtype and use that
				//   when we want to check for subtypes and use equality for strict comparisons.
				let existing_type = existing_type
					.as_variable()
					.expect("Expected struct member to be a variable");
				if existing_type.ne(&member_type) && member_type.ne(&member_type) {
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
					SymbolKind::Variable(member_type),
					StatementIdx::Top,
				)?;
			}
		}
	}
	Ok(())
}
