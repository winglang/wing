use std::fmt::{Debug, Display};

use colored::Colorize;
use derivative::Derivative;
use serde_json::Value;
use wingii::jsii;

use crate::ast::{Type as AstType, *};
use crate::diagnostic::{CharacterLocation, WingSpan};
use crate::type_env::TypeEnv;

#[derive(Debug)]
pub enum Type {
	Anything,
	Number,
	String,
	Duration,
	Boolean,
	Function(FunctionSignature),
	Class(Class),
	Resource(Class),
	Struct(Struct),
	ResourceObject(TypeRef), // Reference to a Resource type
	ClassInstance(TypeRef),  // Reference to a Class type
	StructInstance(TypeRef), // Reference to a Struct type
	Namespace(Namespace),
}

const RESOURCE_CLASS_FQN: &'static str = "@monadahq/wingsdk.cloud.Resource";
const WING_CONSTRUCTOR_NAME: &'static str = "constructor";

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

#[deprecated = "Remember to implement this!"]
pub fn unimplemented_type() -> Option<Type> {
	println!("Skipping unimplemented type check");
	return Some(Type::Anything);
}

impl Display for Type {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			Type::Anything => write!(f, "anything"),
			Type::Number => write!(f, "number"),
			Type::String => write!(f, "string"),
			Type::Duration => write!(f, "duration"),
			Type::Boolean => write!(f, "bool"),
			Type::Function(func_sig) => {
				if let Some(ret_val) = &func_sig.return_type {
					write!(
						f,
						"fn({}) -> {}",
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

	pub fn add_type(&mut self, t: Type) -> TypeRef {
		self.types.push(Box::new(t));
		(&self.types[self.types.len() - 1]).into()
	}
}

pub struct TypeChecker<'a> {
	types: &'a mut Types,
}

impl<'a> TypeChecker<'a> {
	pub fn new(types: &'a mut Types) -> Self {
		Self { types: types }
	}

	pub fn get_primitive_type_by_name(&self, name: &str) -> TypeRef {
		match name {
			"number" => self.types.number(),
			"string" => self.types.string(),
			"bool" => self.types.bool(),
			"duration" => self.types.duration(),
			other => panic!("Type {} is not a primitive type", other),
		}
	}

	fn type_check_exp(&mut self, exp: &Expr, env: &TypeEnv) -> Option<TypeRef> {
		let t = match &exp.variant {
			ExprType::Literal(lit) => match lit {
				Literal::String(_) => Some(self.types.string()),
				Literal::Number(_) => Some(self.types.number()),
				Literal::Duration(_) => Some(self.types.duration()),
				Literal::Boolean(_) => Some(self.types.bool()),
			},
			ExprType::Binary { op, lexp, rexp } => {
				let ltype = self.type_check_exp(lexp, env).unwrap();
				let rtype = self.type_check_exp(rexp, env).unwrap();
				self.validate_type(ltype, rtype, rexp);
				if op.boolean_args() {
					self.validate_type(ltype, self.types.bool(), rexp);
				} else if op.numerical_args() {
					self.validate_type(ltype, self.types.number(), rexp);
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
				// TODO: hack to support custom types (basically stdlib cloud.Bucket), we skip type-checking and resolve them to Anything
				if matches!(type_.into(), &Type::Anything) {
					_ = unimplemented_type();
					return Some(type_);
				}

				let (class_env, class_symbol) = match type_.into() {
					&Type::Class(ref class) => (&class.env, &class.name),
					&Type::Resource(ref class) => (&class.env, &class.name), // TODO: don't allow resource instantiation inflight
					_ => panic!(
						"Expected {:?} to be a resource or class type but it's a {}",
						class, type_
					),
				};

				// Type check args against constructor
				let constructor_type = class_env.lookup(&Symbol {
					name: WING_CONSTRUCTOR_NAME.into(),
					span: class_symbol.span.clone(),
				});

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
				// Verify arity
				if arg_list.pos_args.len() != constructor_sig.args.len() {
					panic!(
						"Expected {} args but got {} when instantiating {}",
						constructor_sig.args.len(),
						arg_list.pos_args.len(),
						type_
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
							panic!(
								"Expected scope {:?} to be a resource object, instead found {}",
								obj_scope, obj_scope_type
							)
						}
					}

					// Create new type for this resource object
					// TODO: make sure there's no existing object with this scope/id, fail if there is! -> this can only be done in synth because I can't evaluate the scope expression here.. handle this somehow with source mapping
					Some(self.types.add_type(Type::ResourceObject(type_))) // TODO: don't create new type if one already exists.
				} else {
					Some(self.types.add_type(Type::ClassInstance(type_))) // TODO: don't create new type if one already exists.
				}
			}
			ExprType::FunctionCall { function, args } => {
				let func_type = self.resolve_reference(function, env);

				if let &Type::Function(ref func_type) = func_type.into() {
					// TODO: named args
					// Argument arity check
					if args.pos_args.len() != func_type.args.len() {
						panic!(
							"Expected {} arguments for function {:?}, but got {} instead.",
							func_type.args.len(),
							function,
							args.pos_args.len()
						)
					}
					// Argument type check
					for (passed_arg, expected_arg) in args.pos_args.iter().zip(func_type.args.iter()) {
						let passed_arg_type = self.type_check_exp(passed_arg, env).unwrap();
						self.validate_type(passed_arg_type, *expected_arg, passed_arg);
					}

					func_type.return_type
				} else {
					panic!("Identifier {:?} is not a function", function)
				}
			}
			ExprType::MethodCall(method_call) => {
				// Find method in class's environment
				let method_type = self.resolve_reference(&method_call.method, env);

				// TODO: hack to support methods of stdlib object we don't know their types yet (basically stuff like cloud.Bucket().upload())
				if matches!(method_type.into(), &Type::Anything) {
					return Some(self.types.anything());
				}

				let method_sig = if let &Type::Function(ref sig) = method_type.into() {
					sig
				} else {
					panic!("Identifier {:?} is not a method", method_call.method);
				};

				// Verify arity
				// TODO named args
				if method_sig.args.len() != method_call.args.pos_args.len() + 1 {
					panic!(
						"Expected {} arguments when calling {:?} but got {}",
						method_sig.args.len() - 1,
						method_call.method,
						method_call.args.pos_args.len()
					);
				}
				// Verify argument types (we run from last to first to skip "this" argument)
				for (arg_type, param_exp) in method_sig.args.iter().rev().zip(method_call.args.pos_args.iter().rev()) {
					let param_type = self.type_check_exp(param_exp, env).unwrap();
					self.validate_type(param_type, *arg_type, param_exp);
				}

				method_sig.return_type
			}
		};
		*exp.evaluated_type.borrow_mut() = t;
		t
	}

	fn validate_type(&mut self, actual_type: TypeRef, expected_type: TypeRef, value: &Expr) {
		if actual_type != expected_type && actual_type.0 != &Type::Anything {
			panic!("Expected type {} of {:?} to be {}", actual_type, value, expected_type);
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
				if fields.is_empty() {
					// TODO Hack For classes in the current env
					env.lookup(root)
				} else {
					// TODO This should be updated to support "bring"
					self.types.anything()
				}
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
				let exp_type = self.type_check_exp(initial_value, env).unwrap();
				if let Some(t) = type_ {
					let explicit_type = self.resolve_type(t, env);
					self.validate_type(exp_type, explicit_type, initial_value);
					env.define(var_name, explicit_type);
				} else {
					env.define(var_name, exp_type);
				}
			}
			Statement::FunctionDefinition(func_def) => {
				// TODO: make sure this function returns on all control paths when there's a return type (can be done by recursively traversing the statements and making sure there's a "return" statements in all control paths)

				if matches!(func_def.signature.flight, Flight::In) {
					unimplemented_type(); // TODO: what typechecking do we need here???
				}

				// Create a type_checker function signature from the AST function definition, assuming success we can add this function to the env
				let function_type = self.resolve_type(&AstType::FunctionSignature(func_def.signature.clone()), env);
				let sig = function_type.as_function_sig().unwrap();

				// Add this function to the env
				env.define(&func_def.name, function_type);

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
				scope_env.define(&iterator, exp_type);
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
				identifier: _,
			} => {
				_ = {
					// Create a new env for the imported module's namespace
					let mut namespace_env = TypeEnv::new(Some(env), None, false, env.flight);

					// TODO Hack: treat "cloud" as "cloud in wingsdk" until I figure out the path issue
					if module_name.name == "cloud" {
						let mut wingii_types = wingii::type_system::TypeSystem::new();
						let name = wingii_types.load("../wingsdk").unwrap();
						let prefix = format!("{}.{}.", name, module_name.name);
						println!("Loaded JSII assembly {}", name);
						let assembly = wingii_types.find_assembly(&name).unwrap();
						for type_name in assembly.types.as_ref().unwrap().keys() {
							// Skip types outside the imported namespace
							if !type_name.starts_with(&prefix) {
								println!("Skipping {} (outside of module {})", type_name, module_name.name);
								continue;
							}
							let type_name = type_name.strip_prefix(&prefix).unwrap();

							// Lookup type before we attempt to import it, this is required because `import_jsii_type` is recursive
							// and might have already defined the current type internally
							println!("Going to import {}", type_name);
							if namespace_env.try_lookup(type_name).is_some() {
								println!("Type {} already defined, skipping", type_name);
								continue;
							}
							self.import_jsii_type(type_name, &prefix, &wingii_types, &mut namespace_env);
						}

						// Create a namespace for the imported module
						let namespace = self.types.add_type(Type::Namespace(Namespace {
							name: module_name.name.clone(),
							env: namespace_env,
						}));
						env.define(module_name, namespace);
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
						panic!("Return statement outside of function cannot return a value.");
					}
				} else {
					if let Some(expected_return_type) = env.return_type {
						panic!("Expected return statement to return type {}", expected_return_type);
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
					unimplemented_type();
				}

				let env_flight = if *is_resource { Flight::Pre } else { Flight::In };

				// Verify parent is actually a known Class
				let (parent_class, parent_class_env) = if let Some(parent_symbol) = parent {
					let t = env.lookup(parent_symbol);
					if let &Type::Class(ref class) = t.into() {
						(Some(t), Some(&class.env as *const TypeEnv))
					} else {
						panic!("Class {}'s parent {} is not a class", name, parent_symbol);
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
				env.define(name, class_type);

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
					class_env.define(&member.name, member_type);
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
					class_env.define(&method.name, method_type);
				}

				// Add the constructor to the class env
				let constructor_type = self.resolve_type(&AstType::FunctionSignature(constructor.signature.clone()), env);
				class_env.define(
					&Symbol {
						name: WING_CONSTRUCTOR_NAME.into(),
						span: name.span.clone(),
					},
					constructor_type,
				);

				// Replace the dummy class environment with the real one before type checking the methods
				let class_env = match class_type.into() {
					&mut Type::Class(ref mut class) | &mut Type::Resource(ref mut class) => {
						class.env = class_env;
						&class.env
					}
					_ => panic!("Expected {} to be a class or resource ", name),
				};

				// Type check constructor
				let constructor_sig = if let &Type::Function(ref s) = constructor_type.into() {
					s
				} else {
					panic!(
						"Constructor of {} isn't defined as a function in the class environment",
						name
					)
				};

				// Create constructor environment and prime it with args
				let mut constructor_env = TypeEnv::new(Some(env), constructor_sig.return_type, false, env_flight);
				self.add_arguments_to_env(&constructor.parameters, constructor_sig, &mut constructor_env);
				constructor.statements.set_env(constructor_env);
				// Check function scope
				self.type_check_scope(&mut constructor.statements);

				// Type check methods
				for method in methods.iter_mut() {
					// Lookup the method in the class_env
					let method_type = class_env.lookup(&method.name);
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
					struct_env.define(&member.name, member_type);
				}

				// Add members from the structs parents
				let mut extends_types = vec![];
				for parent in extends.iter() {
					let parent_type = env.lookup(parent);
					let parent_struct = parent_type
						.as_struct()
						.expect(format!("Type {} extends {} which should be a struct", name.name, parent.name).as_str());
					for (parent_member_name, member_type) in parent_struct.env.iter() {
						if let Some(existing_type) = struct_env.try_lookup(&parent_member_name) {
							// We compare types in both directions to make sure they are exactly the same type and not inheriting from each other
							// TODO: does this make sense? We should add an `is_a()` methdod to `Type` to check if a type is a subtype and use that
							//   when we want to check for subtypes and use equality for strict comparisons.
							if existing_type.ne(&member_type) && member_type.ne(&existing_type) {
								panic!(
									"Struct {} extends {} but has a conflicting member {} ({} != {})",
									name, parent.name, parent_member_name, existing_type, member_type
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
					// Store references to all parent types
					extends_types.push(parent_type);
				}
				env.define(
					name,
					self.types.add_type(Type::Struct(Struct {
						name: name.clone(),
						extends: extends_types,
						env: struct_env,
					})),
				)
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

			env.define(&arg, actual_arg_type);
		}
	}

	fn resolve_reference(&mut self, reference: &Reference, env: &TypeEnv) -> TypeRef {
		match reference {
			Reference::Identifier(symbol) => env.lookup(symbol),
			Reference::NestedIdentifier { object, property } => {
				// Get class
				let class = {
					let instance = self.type_check_exp(object, env).unwrap();
					let instance_type = match instance.into() {
						&Type::ClassInstance(t) | &Type::ResourceObject(t) => t,
						// TODO: hack, we accept a nested reference's object to be `anything` to support mock imports for now (basically cloud.Bucket)
						&Type::Anything => return instance,
						_ => panic!(
							"{} in {:?} does not resolve to a class instance or resource object",
							instance, reference
						),
					};

					match instance_type.into() {
						&Type::Class(ref class) | &Type::Resource(ref class) => class,
						_ => panic!("Expected {} to be a class or resource type", instance_type),
					}
				};

				// Find property in class's environment
				class.env.lookup(property)
			}
		}
	}

	fn import_jsii_type(
		&mut self,
		type_name: &str,
		prefix: &str,
		jsii_types: &wingii::type_system::TypeSystem,
		env: &mut TypeEnv,
	) -> Option<TypeRef> {
		// Hack: if the class name is RESOURCE_CLASS_FQN then we treat this class as a resource and don't need to define it
		println!("Defining type {}", type_name);
		let fqn = format!("{}{}", prefix, type_name);
		if fqn == RESOURCE_CLASS_FQN {
			println!("Hack: no need to define {}", type_name);
			return None;
		}

		// Check if this is a JSII interface and import it if it is
		let jsii_interface = jsii_types.find_interface(&fqn);
		if let Some(jsii_interface) = jsii_interface {
			return self.import_jsii_interface(jsii_interface, type_name, env);
		} else {
			// Check if this is a JSII class and import it if it is
			let jsii_class = jsii_types.find_class(&fqn);
			if let Some(jsii_class) = jsii_class {
				return self.import_jsii_class(jsii_class, prefix, env, jsii_types, type_name);
			} else {
				println!("Type {} is unsupported, skipping", type_name);
				return None;
			}
		}
	}

	fn import_jsii_class(
		&mut self,
		jsii_class: wingii::jsii::ClassType,
		prefix: &str,
		env: &mut TypeEnv,
		jsii_types: &wingii::type_system::TypeSystem,
		type_name: &str,
	) -> Option<TypeRef> {
		let mut is_resource = false;
		// Get the base class of the JSII class
		let base_class = if let Some(base_class_name) = &jsii_class.base {
			// Hack: if the base class name is RESOURCE_CLASS_FQN then we treat this class as a resource and don't need to define its parent
			if base_class_name == RESOURCE_CLASS_FQN {
				println!("Hack: no need to define base class {}", base_class_name);
				is_resource = true;
				None
			} else {
				let base_class_name = base_class_name.strip_prefix(prefix).unwrap();
				println!("going to lookup base class {}", base_class_name);
				let base_class_type = if let Some(base_class_type) = env.try_lookup(&base_class_name) {
					Some(base_class_type)
				} else {
					// If the base class isn't defined yet then define it first (recursive call)
					let base_class_type = self.import_jsii_type(&base_class_name, prefix, jsii_types, env);
					if base_class_type.is_none()
					/* && base_class_name != RESOURCE_CLASS_FQN*/
					{
						panic!("Failed to define base class {}", base_class_name);
					}
					base_class_type
				};

				// Validate the base class is either a class or a resource
				if let Some(base_class_type) = base_class_type {
					if base_class_type.as_resource().is_none() && base_class_type.as_class().is_none() {
						panic!("Base class {} of {} is not a resource", base_class_name, type_name);
					}
				}
				base_class_type
			}
		} else {
			None
		};
		// Verify we have a constructor for this calss
		let jsii_initializer = jsii_class
			.initializer
			.as_ref()
			.expect("JSII classes must have a constructor");
		println!("got here! we can define {}", type_name);
		// If our base class is a resource then we are a resource
		if let Some(base_class) = base_class {
			is_resource = base_class.as_resource().is_some();
		}
		// Create environment representing this class, for now it'll be empty just so we can support referencing ourselves from the class definition.
		let dummy_env = TypeEnv::new(None, None, true, env.flight);
		let new_type_symbol = Self::jsii_name_to_symbol(type_name, &jsii_class.location_in_module);
		// Create the new resource/class type and add it to the current environment.
		// When adding the class methods below we'll be able to reference this type.
		println!("Adding type {} to namespace", type_name.green());
		let class_spec = Class {
			name: new_type_symbol.clone(),
			env: dummy_env,
			parent: base_class,
		};
		let new_type = self.types.add_type(if is_resource {
			Type::Resource(class_spec)
		} else {
			Type::Class(class_spec)
		});
		env.define(&new_type_symbol, new_type);
		// Create class's actually environment before we add properties and methods to it
		let mut class_env = TypeEnv::new(Some(env), None, true, env.flight);
		// Add constructor to the class environment
		let mut arg_types = vec![];
		if let Some(args) = &jsii_initializer.parameters {
			for (i, arg) in args.iter().enumerate() {
				// TODO: handle arg.variadic and arg.optional

				// If this is a resource then skip scope and id arguments
				if is_resource {
					if i == 0 {
						assert!(arg.name == "scope");
						continue;
					} else if i == 1 {
						assert!(arg.name == "id");
						continue;
					}
				}
				arg_types.push(self.jsii_type_ref_to_wing_type(&arg.type_).unwrap());
			}
		}
		let method_sig = self.types.add_type(Type::Function(FunctionSignature {
			args: arg_types,
			return_type: Some(new_type),
			flight: env.flight,
		}));
		class_env.define(
			&Self::jsii_name_to_symbol(WING_CONSTRUCTOR_NAME, &jsii_initializer.location_in_module),
			method_sig,
		);
		println!("Created constructor for {}: {:?}", type_name, method_sig);
		// Add methods and properties to the class environment
		self.add_jsii_interface_members_to_class_env(&jsii_class, is_resource, Flight::Pre, &mut class_env, new_type);
		if is_resource {
			// Look for a client interface for this resource
			let client_interface = jsii_types.find_interface(&format!("{}I{}Client", prefix, type_name));
			if let Some(client_interface) = client_interface {
				// Add client interface's methods to the class environment
				self.add_jsii_interface_members_to_class_env(&client_interface, false, Flight::In, &mut class_env, new_type);
			} else {
				println!("Resource {} doesn't not seem to have a client", type_name.green());
			}
		}
		// Replace the dummy class environment with the real one before type checking the methods
		match new_type.into() {
			&mut Type::Class(ref mut class) | &mut Type::Resource(ref mut class) => {
				class.env = class_env;
			}
			_ => panic!("Expected {} to be a class or resource ", type_name),
		};
		Some(new_type)
	}

	fn import_jsii_interface(
		&mut self,
		jsii_interface: wingii::jsii::InterfaceType,
		type_name: &str,
		env: &mut TypeEnv,
	) -> Option<TypeRef> {
		match jsii_interface.datatype {
			Some(true) => {
				// If this datatype has methods something is unexpected in this JSII type definition, skip it.
				if jsii_interface.methods.is_some() && !jsii_interface.methods.as_ref().unwrap().is_empty() {
					println!("JSII datatype interface {} has methods, skipping", type_name);
					return None;
				}
			}
			_ => {
				println!("The JSII interface {} is not a \"datatype\", skipping", type_name);
				return None;
			}
		}
		if jsii_interface.interfaces.is_some() && !jsii_interface.interfaces.as_ref().unwrap().is_empty() {
			println!(
				"JSII datatype interface {} extends other interfaces, skipping",
				type_name
			);
			return None;
		}
		let struct_env = TypeEnv::new(None, None, true, env.flight);
		let new_type_symbol = Self::jsii_name_to_symbol(type_name, &jsii_interface.location_in_module);
		let wing_type = self.types.add_type(Type::Struct(Struct {
			name: new_type_symbol.clone(),
			extends: vec![],
			env: struct_env,
		}));
		let struct_env = &mut wing_type.as_mut_struct().unwrap().env;
		self.add_jsii_interface_members_to_class_env(&jsii_interface, false, env.flight, struct_env, wing_type);
		println!("Adding struct type {}", type_name.green());
		env.define(&new_type_symbol, wing_type);
		Some(wing_type)
	}

	fn add_jsii_interface_members_to_class_env<T: JsiiInterface>(
		&mut self,
		jsii_interface: &T,
		is_resource: bool,
		flight: Flight,
		class_env: &mut TypeEnv,
		wing_type: TypeRef,
	) {
		assert!(!is_resource || flight == Flight::Pre);

		// Add methods to the class environment
		if let Some(methods) = &jsii_interface.methods() {
			for m in methods {
				// TODO: skip internal methods (for now we skip `capture` until we mark it as internal)
				if is_resource && m.name == "capture" {
					println!("Skipping capture method on resource");
					continue;
				}

				println!("Adding method {} to class", m.name.green());

				let return_type = if let Some(jsii_return_type) = &m.returns {
					self.jsii_optional_type_to_wing_type(&jsii_return_type)
				} else {
					None
				};

				let mut arg_types = vec![];
				// Add my type as the first argument to all methods (this)
				arg_types.push(wing_type);
				// Define the rest of the arguments and create the method signature
				if let Some(args) = &m.parameters {
					for arg in args {
						// TODO: handle arg.variadic and arg.optional
						arg_types.push(self.jsii_type_ref_to_wing_type(&arg.type_).unwrap());
					}
				}
				let method_sig = self.types.add_type(Type::Function(FunctionSignature {
					args: arg_types,
					return_type,
					flight,
				}));
				class_env.define(&Self::jsii_name_to_symbol(&m.name, &m.location_in_module), method_sig)
			}
		}
		// Add properties to the class environment
		if let Some(properties) = &jsii_interface.properties() {
			for p in properties {
				println!("Found property {} with type {:?}", p.name.green(), p.type_);
				if flight == Flight::In {
					todo!("No support for inflight properties yet");
				}
				class_env.define(
					&Self::jsii_name_to_symbol(&p.name, &p.location_in_module),
					self.jsii_type_ref_to_wing_type(&p.type_).unwrap(),
				);
			}
		}
	}

	fn jsii_optional_type_to_wing_type(&self, jsii_optional_type: &jsii::OptionalValue) -> Option<TypeRef> {
		if let Some(true) = jsii_optional_type.optional {
			// TODO: we assume Some(false) and None are both non-optional - verify!!
			panic!("TODO: handle optional types");
		}
		self.jsii_type_ref_to_wing_type(&jsii_optional_type.type_)
	}

	fn jsii_type_ref_to_wing_type(&self, jsii_type_ref: &jsii::TypeReference) -> Option<TypeRef> {
		if let serde_json::Value::Object(obj) = jsii_type_ref {
			if let Some(Value::String(primitive_name)) = obj.get("primitive") {
				match primitive_name.as_str() {
					"string" => Some(self.types.string()),
					"number" => Some(self.types.number()),
					"boolean" => Some(self.types.bool()),
					"any" => Some(self.types.anything()),
					_ => panic!("TODO: handle primitive type {}", primitive_name),
				}
			} else if let Some(Value::String(s)) = obj.get("fqn") {
				if s == "@monadahq/wingsdk.cloud.Void" {
					None
				} else {
					panic!("TODO: handle non-primitive type {:?}", jsii_type_ref);
				}
			} else if let Some(Value::Object(_)) = obj.get("collection") {
				// TODO: handle JSII to Wing collection type conversion, for now return any
				Some(self.types.anything())
			} else {
				panic!("TODO: handle non-primitive type {:?}", jsii_type_ref);
			}
		} else {
			panic!("Expected JSII type reference {:?} to be an object", jsii_type_ref);
		}
	}

	fn jsii_name_to_symbol(name: &str, jsii_source_location: &Option<jsii::SourceLocation>) -> Symbol {
		let span = if let Some(jsii_source_location) = jsii_source_location {
			WingSpan {
				start: CharacterLocation {
					row: jsii_source_location.line as usize,
					column: 0,
				},
				end: CharacterLocation {
					row: jsii_source_location.line as usize,
					column: 0,
				},
				start_byte: 0,
				end_byte: 0,
				file_id: (&jsii_source_location.filename).into(),
			}
		} else {
			WingSpan {
				start: CharacterLocation { row: 0, column: 0 },
				end: CharacterLocation { row: 0, column: 0 },
				start_byte: 0,
				end_byte: 0,
				file_id: "".into(),
			}
		};
		Symbol {
			name: name.to_string(),
			span,
		}
	}
}

trait JsiiInterface {
	fn methods<'a>(&'a self) -> &'a Option<Vec<jsii::Method>>;
	fn properties<'a>(&'a self) -> &'a Option<Vec<jsii::Property>>;
}

impl JsiiInterface for jsii::ClassType {
	fn methods(&self) -> &Option<Vec<jsii::Method>> {
		&self.methods
	}
	fn properties(&self) -> &Option<Vec<jsii::Property>> {
		&self.properties
	}
}

impl JsiiInterface for jsii::InterfaceType {
	fn methods(&self) -> &Option<Vec<jsii::Method>> {
		&self.methods
	}
	fn properties(&self) -> &Option<Vec<jsii::Property>> {
		&self.properties
	}
}
