mod jsii_importer;
pub mod type_env;
use crate::ast::{Type as AstType, *};
use crate::diagnostic::{Diagnostic, DiagnosticLevel, Diagnostics, TypeError};
use derivative::Derivative;
use jsii_importer::JsiiImporter;
use std::cell::RefCell;
use std::fmt::{Debug, Display};
use type_env::TypeEnv;

#[derive(Debug)]
pub enum Type {
	Anything,
	Nil,
	Number,
	String,
	Duration,
	Boolean,
	Option(TypeRef), // Assumes that the inner type is not an option
	Map(TypeRef),
	Set(TypeRef),
	Function(FunctionSignature),
	Class(Class),
	Resource(Class),
	Struct(Struct),
	ResourceObject(TypeRef), // Reference to a Resource type
	ClassInstance(TypeRef),  // Reference to a Class type
	StructInstance(TypeRef), // Reference to a Struct type
	Namespace(Namespace),
}

const WING_CONSTRUCTOR_NAME: &'static str = "init";

#[derive(Derivative)]
#[derivative(Debug)]
pub struct Namespace {
	pub name: String,
	#[derivative(Debug = "ignore")]
	pub env: TypeEnv,
}

// TODO See TypeRef for why this is necessary
unsafe impl Send for Type {}

#[derive(Derivative)]
#[derivative(Debug)]
pub struct Class {
	pub name: Symbol,
	parent: Option<TypeRef>, // Must be a Type::Class type
	#[derivative(Debug = "ignore")]
	pub env: TypeEnv,
}

impl Class {
	pub fn methods(&self) -> impl Iterator<Item = (String, TypeRef)> + '_ {
		self
			.env
			.iter()
			.filter(|(_, t)| t.as_function_sig().is_some())
			.map(|(s, t)| (s.clone(), t.clone()))
	}
}

#[derive(Derivative)]
#[derivative(Debug)]
pub struct Struct {
	pub name: Symbol,
	extends: Vec<TypeRef>, // Must be a Type::Struct type
	#[derivative(Debug = "ignore")]
	pub env: TypeEnv,
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
				if let Some(parent) = l0.parent {
					let parent_type: &Type = parent.into();
					return parent_type.eq(other);
				}
				false
			}
			(Self::Resource(l0), Self::Resource(_)) => {
				// If our parent is equal to `other` then treat both resources as equal (inheritance)
				if let Some(parent) = l0.parent {
					let parent_type: &Type = parent.into();
					return parent_type.eq(other);
				}
				false
			}
			(Self::Struct(l0), Self::Struct(_)) => {
				// If we extend from `other` then treat both structs as equal (inheritance)
				for parent in l0.extends.iter() {
					let parent_type: &Type = (*parent).into();
					if parent_type.eq(other) {
						return true;
					}
				}
				false
			}
			(Self::ClassInstance(l0), Self::ClassInstance(r0)) => {
				// Class instances are of the same type if they are instances of the same Class
				let l: &Type = (*l0).into();
				let r: &Type = (*r0).into();
				l == r
			}
			(Self::ResourceObject(l0), Self::ResourceObject(r0)) => {
				// Resource objects are of the same type if they are objects of the same Resource
				let l: &Type = (*l0).into();
				let r: &Type = (*r0).into();
				l == r
			}
			(Self::StructInstance(l0), Self::StructInstance(r0)) => {
				// Struct instances are of the same type if they are instances of the same Struct
				let l: &Type = (*l0).into();
				let r: &Type = (*r0).into();
				l == r
			}
			(Self::Map(l0), Self::Map(r0)) => {
				// Maps are of the same type if they have the same value type
				let l: &Type = (*l0).into();
				let r: &Type = (*r0).into();
				l == r
			}
			(Self::Set(l0), Self::Set(r0)) => {
				// Sets are of the same type if they have the same value type
				let l: &Type = (*l0).into();
				let r: &Type = (*r0).into();
				l == r
			}
			(Self::Option(l0), Self::Option(r0)) => {
				// Options are of the same type if they have the same value type
				let l: &Type = (*l0).into();
				let r: &Type = (*r0).into();
				l == r
			}
			(Self::Nil, Self::Option(r0)) => {
				// Nil value can be assigned to any optional type
				true
			}
			(_, Self::Option(r0)) => {
				// If we are not nil or option, then we must be the same type as the option's value type
				let r: &Type = (*r0).into();
				self == r
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
	pub flight: Flight,
}

impl Display for Type {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			Type::Anything => write!(f, "anything"),
			Type::Nil => write!(f, "nil"),
			Type::Number => write!(f, "number"),
			Type::String => write!(f, "string"),
			Type::Duration => write!(f, "duration"),
			Type::Boolean => write!(f, "bool"),
			Type::Option(v) => write!(f, "option<{}>", v),
			Type::Function(func_sig) => {
				if let Some(ret_val) = &func_sig.return_type {
					write!(
						f,
						"fn({}):{}",
						func_sig
							.args
							.iter()
							.map(|a| format!("{}", a))
							.collect::<Vec<String>>()
							.join(", "),
						format!("{}", ret_val)
					)
				} else {
					write!(
						f,
						"fn({})",
						func_sig
							.args
							.iter()
							.map(|a| format!("{}", a))
							.collect::<Vec<String>>()
							.join(",")
					)
				}
			}
			Type::Class(class) => write!(f, "{}", class.name),
			Type::Resource(class) => write!(f, "{}", class.name),
			Type::ResourceObject(resource) => {
				let resource_type = resource
					.as_resource()
					.expect("Resource object must reference to a resource");
				write!(f, "object of {}", resource_type.name.name)
			}
			Type::ClassInstance(class) => {
				let class_type_name = class.as_class().expect("Class instance must reference to a class");
				write!(f, "instance of {}", class_type_name)
			}
			Type::Namespace(namespace) => write!(f, "{}", namespace.name),
			Type::Struct(s) => write!(f, "{}", s.name),
			Type::StructInstance(s) => {
				let struct_type = s.as_struct().expect("Struct instance must reference to a struct");
				write!(f, "instance of {}", struct_type.name.name)
			}
			Type::Map(v) => write!(f, "Map<{}>", v),
			Type::Set(v) => write!(f, "Set<{}>", v),
		}
	}
}

//type TypeRef = *const Type;

#[derive(Clone, Copy)]
pub struct TypeRef(*const Type);

// TODO Allows for use in async runtime
// TODO either avoid shared memory or use Arc<Mutex<...>> instead
unsafe impl Send for TypeRef {}

impl From<&Box<Type>> for TypeRef {
	fn from(t: &Box<Type>) -> Self {
		Self(&**t as *const Type)
	}
}

impl From<TypeRef> for &Type {
	fn from(t: TypeRef) -> Self {
		unsafe { &*t.0 }
	}
}

impl From<TypeRef> for &mut Type {
	fn from(t: TypeRef) -> Self {
		unsafe { &mut *(t.0 as *mut Type) }
	}
}

impl TypeRef {
	pub fn as_resource_object(&self) -> Option<&Class> {
		if let &Type::ResourceObject(ref res_obj) = (*self).into() {
			let res = res_obj.as_resource().unwrap();
			Some(res)
		} else {
			None
		}
	}

	pub fn as_resource(&self) -> Option<&Class> {
		if let &Type::Resource(ref res) = (*self).into() {
			Some(res)
		} else {
			None
		}
	}

	fn as_class(&self) -> Option<&Type> {
		if let &Type::Class(_) = (*self).into() {
			Some((*self).into())
		} else {
			None
		}
	}

	fn as_struct(&self) -> Option<&Struct> {
		if let &Type::Struct(ref s) = (*self).into() {
			Some(s)
		} else {
			None
		}
	}

	fn as_mut_struct(&self) -> Option<&mut Struct> {
		if let &mut Type::Struct(ref mut s) = (*self).into() {
			Some(s)
		} else {
			None
		}
	}

	pub fn as_function_sig(&self) -> Option<&FunctionSignature> {
		if let &Type::Function(ref sig) = (*self).into() {
			Some(sig)
		} else {
			None
		}
	}

	pub fn is_anything(&self) -> bool {
		if let &Type::Anything = (*self).into() {
			true
		} else {
			false
		}
	}

	pub fn is_option(&self) -> bool {
		if let &Type::Option(_) = (*self).into() {
			true
		} else {
			false
		}
	}

	pub fn as_namespace(&self) -> Option<&Namespace> {
		if let &Type::Namespace(ref ns) = (*self).into() {
			Some(ns)
		} else {
			None
		}
	}
}

impl Display for TypeRef {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		let t: &Type = (*self).into();
		write!(f, "{}", t)
	}
}

impl PartialEq for TypeRef {
	fn eq(&self, other: &Self) -> bool {
		// Types are equal if they point to the same type definition
		if self.0 == other.0 {
			true
		} else {
			// If the self and other aren't the the same, we need to use the specific types equality function
			let t1: &Type = (*self).into();
			let t2: &Type = (*other).into();
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
	nil_idx: usize,
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
		types.push(Box::new(Type::Nil));
		let nil_idx = types.len() - 1;

		Self {
			types,
			numeric_idx,
			string_idx,
			bool_idx,
			duration_idx,
			anything_idx,
			nil_idx,
		}
	}

	pub fn number(&self) -> TypeRef {
		(&self.types[self.numeric_idx]).into()
	}

	pub fn string(&self) -> TypeRef {
		(&self.types[self.string_idx]).into()
	}

	pub fn bool(&self) -> TypeRef {
		(&self.types[self.bool_idx]).into()
	}

	pub fn duration(&self) -> TypeRef {
		(&self.types[self.duration_idx]).into()
	}

	pub fn anything(&self) -> TypeRef {
		(&self.types[self.anything_idx]).into()
	}

	pub fn nil(&self) -> TypeRef {
		(&self.types[self.nil_idx]).into()
	}

	pub fn add_type(&mut self, t: Type) -> TypeRef {
		self.types.push(Box::new(t));
		(&self.types[self.types.len() - 1]).into()
	}
}

pub struct TypeChecker<'a> {
	types: &'a mut Types,
	pub diagnostics: RefCell<Diagnostics>,
}

impl<'a> TypeChecker<'a> {
	pub fn new(types: &'a mut Types) -> Self {
		Self {
			types: types,
			diagnostics: RefCell::new(Diagnostics::new()),
		}
	}

	#[deprecated = "Remember to implement this!"]
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
	fn type_check_exp(&mut self, exp: &Expr, env: &TypeEnv) -> Option<TypeRef> {
		let t = match &exp.variant {
			ExprType::Literal(lit) => match lit {
				Literal::String(_) => Some(self.types.string()),
				Literal::InterpolatedString(s) => {
					s.parts.iter().for_each(|part| {
						if let InterpolatedStringPart::Expr(interpolated_expr) = part {
							let exp_type = self.type_check_exp(interpolated_expr, env).unwrap();
							self.validate_type(exp_type, self.types.string(), interpolated_expr);
						}
					});
					Some(self.types.string())
				}
				Literal::Number(_) => Some(self.types.number()),
				Literal::Duration(_) => Some(self.types.duration()),
				Literal::Boolean(_) => Some(self.types.bool()),
				Literal::Nil => Some(self.types.nil()),
			},
			ExprType::Binary { op, lexp, rexp } => {
				let ltype = self.type_check_exp(lexp, env).unwrap();
				let rtype = self.type_check_exp(rexp, env).unwrap();

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
			ExprType::Unary { op: _, exp: unary_exp } => {
				let _type = self.type_check_exp(unary_exp, env).unwrap();
				// Add bool vs num support here (! => bool, +- => num)
				self.validate_type(_type, self.types.number(), unary_exp);
				Some(_type)
			}
			ExprType::Reference(_ref) => Some(self.resolve_reference(_ref, env)),
			ExprType::New {
				class,
				obj_id: _, // TODO
				arg_list,
				obj_scope, // TODO
			} => {
				// TODO: obj_id, obj_scope ignored, should use it once we support Type::Resource and then remove it from Classes (fail if a class has an id if grammar doesn't handle this for us)

				// Lookup the type in the env
				let type_ = self.resolve_type(class, env);
				let (class_env, class_symbol) = match type_.into() {
					&Type::Class(ref class) => (&class.env, &class.name),
					&Type::Resource(ref class) => (&class.env, &class.name), // TODO: don't allow resource instantiation inflight
					&Type::Anything => return Some(self.types.anything()),
					_ => panic!(
						"Expected {:?} to be a resource or class type but it's a {}",
						class, type_
					),
				};

				// Type check args against constructor
				let constructor_type = match class_env.lookup(&Symbol {
					name: WING_CONSTRUCTOR_NAME.into(),
					span: class_symbol.span.clone(),
				}) {
					Ok(_type) => _type,
					Err(type_error) => {
						self.type_error(&type_error);
						return Some(self.types.anything());
					}
				};

				let constructor_sig = if let &Type::Function(ref sig) = constructor_type.into() {
					sig
				} else {
					panic!(
						"Expected {} to be of a constructor for class {}",
						constructor_type, class_symbol
					);
				};

				// Verify return type (This should never fail since we define the constructors return type during AST building)
				self.validate_type(constructor_sig.return_type.unwrap(), type_, exp);
				// TODO: named args

				// Count number of optional parameters from the end of the constructor's params
				// Allow arg_list to be missing up to that number of nil values to try and make the number of arguments match
				let num_optionals = constructor_sig
					.args
					.iter()
					.rev()
					.take_while(|arg| arg.is_option())
					.count();

				// Verify arity
				if arg_list.pos_args.len() < constructor_sig.args.len() - num_optionals {
					self.expr_error(
						exp,
						format!(
							"Expected at least {} args but got {} when instantiating \"{}\"",
							constructor_sig.args.len() - num_optionals,
							arg_list.pos_args.len(),
							type_
						),
					);
				}
				// Verify passed arguments match the constructor
				for (arg_expr, arg_type) in arg_list.pos_args.iter().zip(constructor_sig.args.iter()) {
					let arg_expr_type = self.type_check_exp(arg_expr, env).unwrap();
					self.validate_type(arg_expr_type, *arg_type, arg_expr);
				}

				// If this is a Resource then create a new type for this resource object
				if type_.as_resource().is_some() {
					// Get reference to resource object's scope
					let obj_scope_type = if let Some(obj_scope) = obj_scope {
						Some(self.type_check_exp(obj_scope, env).unwrap())
					} else {
						// If we're in the root env then we have no object scope
						if env.is_root() {
							None
						} else {
							Some(env.try_lookup("this".into()).unwrap())
						}
					};

					// Verify the object scope is an actually ResourceObject
					if let Some(obj_scope_type) = obj_scope_type {
						if obj_scope_type.as_resource_object().is_none() {
							self.expr_error(
								exp,
								format!(
									"Expected scope {:?} to be a resource object, instead found \"{}\"",
									obj_scope, obj_scope_type
								),
							);
						}
					}

					// Create new type for this resource object
					// TODO: make sure there's no existing object with this scope/id, fail if there is! -> this can only be done in synth because I can't evaluate the scope expression here.. handle this somehow with source mapping
					Some(self.types.add_type(Type::ResourceObject(type_))) // TODO: don't create new type if one already exists.
				} else {
					Some(self.types.add_type(Type::ClassInstance(type_))) // TODO: don't create new type if one already exists.
				}
			}
			ExprType::Call { function, args } => {
				// Resolve the function's reference (either a method in the class's env or a function in the current env)
				let func_type = self.resolve_reference(function, env);
				let extra_args = if matches!(function, Reference::NestedIdentifier { .. }) {
					1
				} else {
					0
				};

				// TODO: hack to support methods of stdlib object we don't know their types yet (basically stuff like cloud.Bucket().upload())
				if matches!(func_type.into(), &Type::Anything) {
					return Some(self.types.anything());
				}

				// Make sure this is a function signature type
				let func_sig = func_type
					.as_function_sig()
					.expect(&format!("{:?} should be a function or method", function));

				// TODO: named args
				// Argument arity check
				if args.pos_args.len() + extra_args != func_sig.args.len() {
					self.expr_error(
						exp,
						format!(
							"Expected {} arguments for {:?}, but got {} instead.",
							func_sig.args.len() - extra_args,
							function,
							args.pos_args.len()
						),
					);
				}
				// Verify argument types (we run from last to first to skip "this" argument)
				for (arg_type, param_exp) in func_sig.args.iter().rev().zip(args.pos_args.iter().rev()) {
					let param_type = self.type_check_exp(param_exp, env).unwrap();
					self.validate_type(param_type, *arg_type, param_exp);
				}

				func_sig.return_type
			}
			ExprType::StructLiteral { type_, fields } => {
				// Find this struct's type in the environment
				let struct_type = self.resolve_type(type_, env);

				if struct_type.is_anything() {
					return Some(struct_type);
				}

				// Make it really is a a struct type
				let st = struct_type
					.as_struct()
					.expect(&format!("Expected \"{}\" to be a struct type", struct_type));

				// Verify that all fields are present and are of the right type
				if st.env.iter().count() > fields.len() {
					panic!("Not all fields of {} are initialized.", struct_type);
				}
				for (k, v) in fields.iter() {
					let field_type = st
						.env
						.try_lookup(&k.name)
						.expect(&format!("\"{}\" is not a field of \"{}\"", k.name, struct_type));
					let t = self.type_check_exp(v, env).unwrap();
					self.validate_type(t, field_type, v);
				}

				Some(struct_type)
			}
			ExprType::MapLiteral { fields, type_ } => {
				// Infer type based on either the explicit type or the value in one of the fields
				let container_type = if let Some(type_) = type_ {
					self.resolve_type(type_, env)
				} else if !fields.is_empty() {
					let some_val_type = self.type_check_exp(fields.iter().next().unwrap().1, env).unwrap();
					self.types.add_type(Type::Map(some_val_type))
				} else {
					panic!(
						"Cannot infer type of empty map literal with no type annotation: {:?}",
						exp
					);
				};

				let value_type = match container_type.into() {
					&Type::Map(t) => t,
					_ => panic!("Expected map type, found {}", container_type),
				};

				// Verify all types are the same as the inferred type
				for (_, v) in fields.iter() {
					let t = self.type_check_exp(v, env).unwrap();
					self.validate_type(t, value_type, v);
				}

				Some(container_type)
			}
		};
		*exp.evaluated_type.borrow_mut() = t;
		t
	}

	fn validate_type(&mut self, actual_type: TypeRef, expected_type: TypeRef, value: &Expr) {
		if actual_type != expected_type && actual_type.0 != &Type::Anything {
			self.diagnostics.borrow_mut().push(Diagnostic {
				message: format!(
					"Expected type \"{}\", but got \"{}\" instead: {:?}",
					expected_type, actual_type, value.variant
				),
				span: Some(value.span.clone()),
				level: DiagnosticLevel::Error,
			});
		}
	}

	pub fn type_check_scope(&mut self, scope: &mut Scope) {
		for statement in scope.statements.iter_mut() {
			self.type_check_statement(statement, scope.env.as_mut().unwrap());
		}
	}

	fn resolve_type(&mut self, ast_type: &AstType, env: &TypeEnv) -> TypeRef {
		match ast_type {
			AstType::Number => self.types.number(),
			AstType::String => self.types.string(),
			AstType::Bool => self.types.bool(),
			AstType::Nil => self.types.nil(),
			AstType::Duration => self.types.duration(),
			AstType::FunctionSignature(ast_sig) => {
				let mut args = vec![];
				for arg in ast_sig.parameters.iter() {
					args.push(self.resolve_type(arg, env));
				}
				let sig = FunctionSignature {
					args,
					return_type: ast_sig.return_type.as_ref().map(|t| self.resolve_type(t, env)),
					flight: ast_sig.flight,
				};
				// TODO: avoid creating a new type for each function_sig resolution
				self.types.add_type(Type::Function(sig))
			}
			AstType::CustomType { root, fields } => {
				// Resolve all types down the fields list and return the last one (which is likely to be a real type and not a namespace)
				let mut nested_name = vec![root];
				nested_name.extend(fields);

				match env.lookup_nested(&nested_name) {
					Ok(_type) => _type,
					Err(type_error) => {
						self.type_error(&type_error);
						self.types.anything()
					}
				}
			}
			AstType::Map(v) => {
				let value_type = self.resolve_type(v, env);
				// TODO: avoid creating a new type for each map resolution
				self.types.add_type(Type::Map(value_type))
			}
		}
	}

	fn type_check_statement(&mut self, statement: &mut Statement, env: &mut TypeEnv) {
		match statement {
			Statement::VariableDef {
				var_name,
				initial_value,
				type_,
			} => {
				let explicit_type = type_.as_ref().map(|t| self.resolve_type(t, env));
				let inferred_type = self.type_check_exp(initial_value, env).unwrap();
				if let Some(explicit_type) = explicit_type {
					self.validate_type(inferred_type, explicit_type, initial_value);
					match env.define(var_name, explicit_type) {
						Err(type_error) => {
							self.type_error(&type_error);
						}
						_ => {}
					};
				} else {
					match env.define(var_name, inferred_type) {
						Err(type_error) => {
							self.type_error(&type_error);
						}
						_ => {}
					};
				}
			}
			Statement::FunctionDefinition(func_def) => {
				// TODO: make sure this function returns on all control paths when there's a return type (can be done by recursively traversing the statements and making sure there's a "return" statements in all control paths)

				if matches!(func_def.signature.flight, Flight::In) {
					self.unimplemented_type("Inflight function signature"); // TODO: what typechecking do we need here?self??
				}

				// Create a type_checker function signature from the AST function definition, assuming success we can add this function to the env
				let function_type = self.resolve_type(&AstType::FunctionSignature(func_def.signature.clone()), env);
				let sig = function_type.as_function_sig().unwrap();

				// Add this function to the env
				match env.define(&func_def.name, function_type) {
					Err(type_error) => {
						self.type_error(&type_error);
					}
					_ => {}
				};

				// Create an environment for the function
				let mut function_env = TypeEnv::new(Some(env), sig.return_type, false, func_def.signature.flight);
				self.add_arguments_to_env(&func_def.parameters, &sig, &mut function_env);
				func_def.statements.set_env(function_env);

				// TODO: we created `function_env` but `type_check_scope` will also create a wrapper env for the scope which is redundant
				self.type_check_scope(&mut func_def.statements);
			}
			Statement::ForLoop {
				iterator,
				iterable,
				statements,
			} => {
				// TODO: Expression must be iterable
				let exp_type = self.type_check_exp(iterable, env).unwrap();

				let mut scope_env = TypeEnv::new(Some(env), env.return_type, false, env.flight);
				match scope_env.define(&iterator, exp_type) {
					Err(type_error) => {
						self.type_error(&type_error);
					}
					_ => {}
				};
				statements.set_env(scope_env);

				self.type_check_scope(statements);
			}
			Statement::If {
				condition,
				statements,
				else_statements,
			} => {
				let cond_type = self.type_check_exp(condition, env).unwrap();
				self.validate_type(cond_type, self.types.bool(), condition);

				statements.set_env(TypeEnv::new(Some(env), env.return_type, false, env.flight));
				self.type_check_scope(statements);

				if let Some(else_scope) = else_statements {
					else_scope.set_env(TypeEnv::new(Some(env), env.return_type, false, env.flight));
					self.type_check_scope(else_scope);
				}
			}
			Statement::Expression(e) => {
				self.type_check_exp(e, env);
			}
			Statement::Assignment { variable, value } => {
				let exp_type = self.type_check_exp(value, env).unwrap();
				let var_type = self.resolve_reference(variable, env);
				self.validate_type(exp_type, var_type, value);
			}
			Statement::Use {
				module_name,
				identifier,
			} => {
				_ = {
					// If provided use alias identifier as the namespace name
					let namespace_name = identifier.as_ref().unwrap_or(module_name);

					if let Some(skip_flag) = std::env::var_os("WINGC_SKIP_JSII") {
						if skip_flag != "false" {
							match env.define(namespace_name, self.types.anything()) {
								Err(type_error) => {
									self.type_error(&type_error);
								}
								_ => {}
							};
						}
						return;
					};

					// Create a new env for the imported module's namespace
					let mut namespace_env = TypeEnv::new(None, None, false, env.flight);

					// TODO Hack: treat "cloud" as "cloud in wingsdk" until I figure out the path issue
					if module_name.name == "cloud" {
						let mut wingii_types = wingii::type_system::TypeSystem::new();
						let wingii_loader_options = wingii::type_system::AssemblyLoadOptions {
							root: true,
							deps: false,
						};
						// in runtime, if "WINGSDK_MANIFEST_ROOT" env var is set, read it. otherwise set to "../wingsdk" for dev
						let wingsdk_manifest_root =
							std::env::var("WINGSDK_MANIFEST_ROOT").unwrap_or_else(|_| "../wingsdk".to_string());
						let name = wingii_types
							.load(wingsdk_manifest_root.as_str(), Some(wingii_loader_options))
							.unwrap();
						let prefix = format!("{}.{}.", name, module_name.name);
						println!("Loaded JSII assembly {}", name);
						let assembly = wingii_types.find_assembly(&name).unwrap();

						let mut jsii_importer = JsiiImporter {
							jsii_types: &wingii_types,
							assembly_name: name,
							namespace_env: &mut namespace_env,
							namespace_name: module_name.name.clone(),
							wing_types: self.types,
						};

						for type_fqn in assembly.types.as_ref().unwrap().keys() {
							// Skip types outside the imported namespace
							if !type_fqn.starts_with(&prefix) {
								continue;
							}

							// Lookup type before we attempt to import it, this is required because `import_jsii_type` is recursive
							// and might have already defined the current type internally
							let type_name = jsii_importer.fqn_to_type_name(type_fqn);
							if jsii_importer.namespace_env.try_lookup(&type_name).is_some() {
								continue;
							}
							jsii_importer.import_type(type_fqn);
						}

						// Create a namespace for the imported module
						let namespace = self.types.add_type(Type::Namespace(Namespace {
							name: namespace_name.name.clone(),
							env: namespace_env,
						}));
						match env.define(namespace_name, namespace) {
							Err(type_error) => {
								self.type_error(&type_error);
							}
							_ => {}
						};
					}
				}
			}
			Statement::Scope(scope) => {
				let mut scope_env = TypeEnv::new(Some(env), env.return_type, false, env.flight);
				for statement in scope.statements.iter_mut() {
					self.type_check_statement(statement, &mut scope_env);
				}
			}
			Statement::Return(exp) => {
				if let Some(return_expression) = exp {
					let return_type = self.type_check_exp(return_expression, env).unwrap();
					if let Some(expected_return_type) = env.return_type {
						self.validate_type(return_type, expected_return_type, return_expression);
					} else {
						self.general_type_error(format!("Return statement outside of function cannot return a value."));
					}
				} else {
					if let Some(expected_return_type) = env.return_type {
						self.general_type_error(format!(
							"Expected return statement to return type {}",
							expected_return_type
						));
					}
				}
			}
			Statement::Class {
				name,
				members,
				methods,
				parent,
				constructor,
				is_resource,
			} => {
				// TODO: if is_resource then....
				if *is_resource {
					self.unimplemented_type("Resource class");
				}

				let env_flight = if *is_resource { Flight::Pre } else { Flight::In };

				// Verify parent is actually a known Class/Resource and get their env
				let (parent_class, parent_class_env) = if let Some(parent_type) = parent {
					let t = self.resolve_type(parent_type, env);
					if *is_resource {
						if let &Type::Resource(ref class) = t.into() {
							(Some(t), Some(&class.env as *const TypeEnv))
						} else {
							panic!("Resource {}'s parent {} is not a resource", name, t);
						}
					} else {
						if let &Type::Class(ref class) = t.into() {
							(Some(t), Some(&class.env as *const TypeEnv))
						} else {
							self.general_type_error(format!("Class {}'s parent \"{}\" is not a class", name, t));
							(None, None)
						}
					}
				} else {
					(None, None)
				};

				// Create environment representing this class, for now it'll be empty just so we can support referencing ourselves from the class definition.
				let dummy_env = TypeEnv::new(None, None, true, env_flight);

				// Create the resource/class type and add it to the current environment (so class implementation can reference itself)
				let class_spec = Class {
					name: name.clone(),
					env: dummy_env,
					parent: parent_class,
				};
				let class_type = self.types.add_type(if *is_resource {
					Type::Resource(class_spec)
				} else {
					Type::Class(class_spec)
				});
				match env.define(name, class_type) {
					Err(type_error) => {
						self.type_error(&type_error);
					}
					_ => {}
				};

				// Create a the real class environment to be filled with the class AST types
				let mut class_env = TypeEnv::new(parent_class_env, None, true, env_flight);

				// Add members to the class env
				for member in members.iter() {
					let mut member_type = self.resolve_type(&member.member_type, env);
					// If the type is a class/resource then indicate it's an instance/object (and not the class/resource itself)
					if member_type.as_class().is_some() {
						member_type = self.types.add_type(Type::ClassInstance(member_type));
					} else if member_type.as_resource().is_some() {
						member_type = self.types.add_type(Type::ResourceObject(member_type));
					}
					match class_env.define(&member.name, member_type) {
						Err(type_error) => {
							self.type_error(&type_error);
						}
						_ => {}
					};
				}
				// Add methods to the class env
				for method in methods.iter() {
					let mut sig = method.signature.clone();

					// Add myself as first parameter to all class methods (self)
					sig.parameters.insert(
						0,
						AstType::CustomType {
							root: name.clone(),
							fields: vec![],
						},
					);

					let method_type = self.resolve_type(&AstType::FunctionSignature(sig), env);
					match class_env.define(&method.name, method_type) {
						Err(type_error) => {
							self.type_error(&type_error);
						}
						_ => {}
					};
				}

				// Add the constructor to the class env
				let constructor_type = self.resolve_type(&AstType::FunctionSignature(constructor.signature.clone()), env);
				match class_env.define(
					&Symbol {
						name: WING_CONSTRUCTOR_NAME.into(),
						span: name.span.clone(),
					},
					constructor_type,
				) {
					Err(type_error) => {
						self.type_error(&type_error);
					}
					_ => {}
				};

				// Replace the dummy class environment with the real one before type checking the methods
				let class_env = match class_type.into() {
					&mut Type::Class(ref mut class) | &mut Type::Resource(ref mut class) => {
						class.env = class_env;
						&class.env
					}
					_ => {
						panic!("Expected {} to be a class or resource ", name);
					}
				};

				// Type check constructor
				let constructor_sig = if let &Type::Function(ref s) = constructor_type.into() {
					s
				} else {
					panic!(
						"Constructor of {} isn't defined as a function in the class environment",
						name
					);
				};

				// Create constructor environment and prime it with args
				let mut constructor_env = TypeEnv::new(Some(env), constructor_sig.return_type, false, env_flight);
				self.add_arguments_to_env(&constructor.parameters, constructor_sig, &mut constructor_env);
				constructor.statements.set_env(constructor_env);
				// Check function scope
				self.type_check_scope(&mut constructor.statements);

				// TODO: handle member/method overrides in our env based on whatever rules we define in our spec

				// Type check methods
				for method in methods.iter_mut() {
					// Lookup the method in the class_env
					let method_type = match class_env.lookup(&method.name) {
						Ok(_type) => _type,
						Err(type_error) => {
							self.type_error(&type_error);
							self.types.anything()
						}
					};
					let method_sig = if let &Type::Function(ref s) = method_type.into() {
						s
					} else {
						panic!(
							"Method {}.{} isn't defined as a function in the class environment",
							name, method.name
						)
					};

					// Create method environment and prime it with args
					let mut method_env = TypeEnv::new(Some(env), method_sig.return_type, false, method_sig.flight);
					// Add `this` as first argument
					let mut actual_parameters = vec![Symbol {
						name: "this".into(),
						span: method.name.span.clone(),
					}];
					actual_parameters.extend(method.parameters.clone());
					self.add_arguments_to_env(&actual_parameters, method_sig, &mut method_env);
					method.statements.set_env(method_env);
					// Check function scope
					self.type_check_scope(&mut method.statements);
				}
			}
			Statement::Struct { name, extends, members } => {
				// Note: structs don't have a parent environment, instead they flatten their parent's members into the struct's env.
				//   If we encounter an existing member with the same name and type we skip it, if the types are different we
				//   fail type checking.

				// Create an environment for the struct
				let mut struct_env = TypeEnv::new(None, None, true, env.flight);

				// Add members to the struct env
				for member in members.iter() {
					let member_type = self.resolve_type(&member.member_type, env);
					match struct_env.define(&member.name, member_type) {
						Err(type_error) => {
							self.type_error(&type_error);
						}
						_ => {}
					};
				}

				// Add members from the structs parents
				let extends_types = extends
					.iter()
					.map(|parent| match env.lookup(&parent) {
						Ok(_type) => _type,
						Err(type_error) => {
							self.type_error(&type_error);
							self.types.anything()
						}
					})
					.collect::<Vec<_>>();

				add_parent_members_to_struct_env(&extends_types, name, &mut struct_env);
				match env.define(
					name,
					self.types.add_type(Type::Struct(Struct {
						name: name.clone(),
						extends: extends_types,
						env: struct_env,
					})),
				) {
					Err(type_error) => {
						self.type_error(&type_error);
					}
					_ => {}
				};
			}
		}
	}

	fn add_arguments_to_env(&mut self, arg_names: &Vec<Symbol>, sig: &FunctionSignature, env: &mut TypeEnv) {
		assert!(arg_names.len() == sig.args.len());
		for (arg, arg_type) in arg_names.iter().zip(sig.args.iter()) {
			// If the type is a class/resource then indicate it's an instance/object (and not the class/resource itself)
			let actual_arg_type = if arg_type.as_class().is_some() {
				self.types.add_type(Type::ClassInstance(*arg_type))
			} else if arg_type.as_resource().is_some() {
				self.types.add_type(Type::ResourceObject(*arg_type))
			} else {
				*arg_type
			};

			match env.define(&arg, actual_arg_type) {
				Err(type_error) => {
					self.type_error(&type_error);
				}
				_ => {}
			};
		}
	}

	fn resolve_reference(&mut self, reference: &Reference, env: &TypeEnv) -> TypeRef {
		match reference {
			Reference::Identifier(symbol) => match env.lookup(symbol) {
				Ok(_type) => _type,
				Err(type_error) => {
					self.type_error(&type_error);
					self.types.anything()
				}
			},
			Reference::NestedIdentifier { object, property } => {
				// Get class
				let class = {
					let instance = self.type_check_exp(object, env).unwrap();
					let instance_type = match instance.into() {
						&Type::ClassInstance(t) | &Type::ResourceObject(t) => t,
						// TODO: hack, we accept a nested reference's object to be `anything` to support mock imports for now (basically cloud.Bucket)
						&Type::Anything => return instance,
						_ => self.general_type_error(format!(
							"\"{}\" in {:?} does not resolve to a class instance or resource object",
							instance, reference
						)),
					};

					match instance_type.into() {
						&Type::Class(ref class) | &Type::Resource(ref class) => class,
						_ => panic!("Expected \"{}\" to be a class or resource type", instance_type),
					}
				};

				// Find property in class's environment
				match class.env.lookup(property) {
					Ok(_type) => _type,
					Err(type_error) => {
						self.type_error(&type_error);
						self.types.anything()
					}
				}
			}
		}
	}
}

fn add_parent_members_to_struct_env(extends_types: &Vec<TypeRef>, name: &Symbol, struct_env: &mut TypeEnv) {
	for parent_type in extends_types.iter() {
		let parent_struct = parent_type.as_struct().expect(
			format!(
				"Type \"{}\" extends \"{}\" which should be a struct",
				name.name, parent_type
			)
			.as_str(),
		);
		for (parent_member_name, member_type) in parent_struct.env.iter() {
			if let Some(existing_type) = struct_env.try_lookup(&parent_member_name) {
				// We compare types in both directions to make sure they are exactly the same type and not inheriting from each other
				// TODO: does this make sense? We should add an `is_a()` methdod to `Type` to check if a type is a subtype and use that
				//   when we want to check for subtypes and use equality for strict comparisons.
				if existing_type.ne(&member_type) && member_type.ne(&existing_type) {
					panic!(
						"Struct \"{}\" extends \"{}\" but has a conflicting member \"{}\" ({} != {})",
						name, parent_type, parent_member_name, existing_type, member_type
					);
				}
			} else {
				struct_env.define(
					&Symbol {
						name: parent_member_name,
						span: name.span.clone(),
					},
					member_type,
				);
			}
		}
	}
}
