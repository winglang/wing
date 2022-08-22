use std::fmt::{Debug, Display};

use crate::ast::{Type as AstType, *};
use crate::type_env::TypeEnv;

#[derive(Debug)]
pub enum Type {
	Anything,
	Nothing,
	Number,
	String,
	Duration,
	Boolean,
	Function(Box<FunctionSignature>),
	Class(Class),
	Resource(Class),
	ResourceObject(TypeRef), // Reference to a Resource type
	ClassInstance(TypeRef),  // Reference to a Class type
}

pub struct Class {
	name: Symbol, // TODO: do we really need the name here, we should alway get here through a Class Type in some env which has the name of the type
	env: TypeEnv,
	parent: Option<TypeRef>, // Must be a Type::Class type
}

impl Debug for Class {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		f.debug_struct("Class")
			.field("name", &self.name)
			.field("parent", &self.parent)
			.finish()
	}
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
				// If our parent is equal to `other` then treat both classes as equal (inheritance)
				if let Some(parent) = l0.parent {
					let parent_type: &Type = parent.into();
					return parent_type.eq(other);
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
			// Fo all other types (built-ins) we compare the enum value
			_ => core::mem::discriminant(self) == core::mem::discriminant(other),
		}
	}
}

#[derive(PartialEq, Debug)]
pub struct FunctionSignature {
	pub args: Vec<TypeRef>,
	pub return_type: Option<TypeRef>,
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
			Type::Nothing => write!(f, "nothing"),
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
				let resource_type_name = resource
					.as_resource()
					.expect("Resource object must reference to a resource");
				write!(f, "object of {}", resource_type_name)
			}
			Type::ClassInstance(class) => {
				let class_type_name = class.as_class().expect("Class instance must reference to a class");
				write!(f, "instance of {}", class_type_name)
			}
		}
	}
}

//type TypeRef = *const Type;

#[derive(Clone, Copy)]
pub struct TypeRef(*const Type);

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
	pub fn as_resource_object(&self) -> Option<&Type> {
		if let &Type::ResourceObject(_) = (*self).into() {
			Some((*self).into())
		} else {
			None
		}
	}

	fn as_resource(&self) -> Option<&Type> {
		if let &Type::Resource(_) = (*self).into() {
			Some((*self).into())
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
}

// impl Deref for TypeRef {
//     type Target = Type;

//     fn deref(&self) -> &Self::Target {
//         (*self).into()
//     }
// }

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

	fn type_check_exp(&mut self, exp: &Expression, env: &TypeEnv) -> Option<TypeRef> {
		match exp {
			Expression::Literal(lit) => match lit {
				Literal::String(_) => Some(self.types.string()),
				Literal::Number(_) => Some(self.types.number()),
				Literal::Duration(_) => Some(self.types.duration()),
				Literal::Boolean(_) => Some(self.types.bool()),
			},
			Expression::Binary { op, lexp, rexp } => {
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
			Expression::Unary { op: _, exp: unary_exp } => {
				let _type = self.type_check_exp(&unary_exp, env).unwrap();
				// Add bool vs num support here (! => bool, +- => num)
				self.validate_type(_type, self.types.number(), &unary_exp);
				Some(_type)
			}
			Expression::Reference(_ref) => Some(self.resolve_reference(_ref, env)),
			Expression::New {
				class,
				obj_id: _, // TODO
				arg_list,
				obj_scope, // TODO
			} => {
				// TODO: obj_id, obj_scope ignored, should use it once we support Type::Resource and then remove it from Classes (fail if a class has an id if grammar doesn't handle this for us)

				// Lookup the type in the env
				let type_ = self.resolve_reference(class, env);
				// TODO: hack to support namespaced identifiers (basically stdlib cloud::Bucket), we skip type-checking and resolve them to Anything
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
					name: "constructor".into(),
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
			Expression::FunctionCall { function, args } => {
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
			Expression::MethodCall(method_call) => {
				// Find method in class's environment
				let method_type = self.resolve_reference(&method_call.method, env);

				// TODO: hack to support methods of stdlib object we don't know their types yet (basically stuff like cloud::Bucket().upload())
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
		}
	}

	fn validate_type(&mut self, actual_type: TypeRef, expected_type: TypeRef, value: &Expression) {
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
				};
				// TODO: avoid creating a new type for each function_sig resolution
				self.types.add_type(Type::Function(Box::new(sig)))
			}
			AstType::Class(class_name) => {
				// Lookup this class name in the current environment
				env.lookup(&class_name)
			}
		}
	}

	fn type_check_statement(&mut self, statement: &mut Statement, env: &mut TypeEnv) {
		match statement {
			Statement::VariableDef {
				var_name,
				initial_value,
			} => {
				let exp_type = self.type_check_exp(initial_value, env).unwrap();
				env.define(&var_name, exp_type);
			}
			Statement::FunctionDefinition(func_def) => {
				// TODO: make sure this function returns on all control paths when there's a return type (can be done by recursively traversing the statements and making sure there's a "return" statements in all control paths)

				if matches!(func_def.signature.flight, Flight::In) {
					unimplemented_type(); // TODO: what typechecking do we need here???
				}

				// Create a type_checker function signature from the AST function definition, assuming success we can add this function to the env
				// TODO: why not just use `self.resolve_type(&AstType::FunctionSignature(sig), env);`??
				let mut args = vec![];
				let ast_sig = &func_def.signature;
				for arg in ast_sig.parameters.iter() {
					args.push(self.resolve_type(arg, env));
				}
				let return_type = ast_sig.return_type.as_ref().map(|t| self.resolve_type(&t, env));
				let function_type = self.types.add_type(Type::Function(Box::new(FunctionSignature {
					args: args.clone(),
					return_type,
				})));

				// Add this function to the env
				env.define(&func_def.name, function_type);

				let mut function_env = TypeEnv::new(Some(env), return_type, false, func_def.signature.flight);
				for (param, param_type) in func_def.parameters.iter().zip(args.iter()) {
					function_env.define(&param, *param_type);
				}
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
				module_name: _,
				identifier: _,
			} => _ = unimplemented_type(),
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
					let member_type = self.resolve_type(&member.member_type, env);
					class_env.define(&member.name, member_type);
				}
				// Add methods to the class env
				for method in methods.iter() {
					let mut sig = method.signature.clone();

					// Add myself as first parameter to all class methods (self)
					sig.parameters.insert(0, AstType::Class(name.clone()));

					let method_type = self.resolve_type(&AstType::FunctionSignature(sig), env);
					class_env.define(&method.name, method_type);
				}

				// Add the constructor to the class env
				let constructor_type = self.resolve_type(&AstType::FunctionSignature(constructor.signature.clone()), env);
				class_env.define(
					&Symbol {
						name: "constructor".into(),
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
				for (param, param_type) in constructor.parameters.iter().zip(constructor_sig.args.iter()) {
					constructor_env.define(&param, *param_type);
				}
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
					let mut method_env = TypeEnv::new(Some(env), method_sig.return_type, false, env_flight);
					// Add `this` as first argument
					let mut actual_parameters = vec![Symbol {
						name: "this".into(),
						span: method.name.span.clone(),
					}];
					actual_parameters.extend(method.parameters.clone());
					for (param, param_type) in actual_parameters.iter().zip(method_sig.args.iter()) {
						method_env.define(&param, *param_type);
					}
					method.statements.set_env(method_env);
					// Check function scope
					self.type_check_scope(&mut method.statements);
				}
			}
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
						// TODO: hack, we accept a nested reference's object to be `anything` to support mock imports for now (basically cloud::Bucket)
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
			Reference::NamespacedIdentifier {
				namespace: _,
				identifier: _,
			} => {
				// TODO: for now all namespaced identifiers resolve to `anything` since we don't know what they are,
				// this is better than failing just because it's a way to do our mock `use cloud; cloud::Bucket()` support.
				_ = unimplemented_type();
				self.types.anything()
			}
		}
	}
}
