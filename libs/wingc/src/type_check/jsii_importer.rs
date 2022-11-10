use crate::{
	ast::{Flight, Symbol},
	debug,
	diagnostic::{CharacterLocation, WingSpan},
	type_check::{self, type_env::TypeEnv},
	type_check::{type_env::StatementIdx, Class, FunctionSignature, Struct, Type, TypeRef, Types, WING_CONSTRUCTOR_NAME},
};
use colored::Colorize;
use serde_json::Value;
use wingii::jsii;

const RESOURCE_CLASS_FQN: &'static str = "@winglang/wingsdk.cloud.Resource";

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

pub struct JsiiImporter<'a> {
	pub jsii_types: &'a wingii::type_system::TypeSystem,
	pub assembly_name: String,
	pub namespace_env: &'a mut TypeEnv,
	pub namespace_name: String,
	pub wing_types: &'a mut Types,
	pub import_statement_idx: usize,
}

impl<'a> JsiiImporter<'a> {
	fn type_ref_to_wing_type(&mut self, jsii_type_ref: &jsii::TypeReference) -> Option<TypeRef> {
		if let serde_json::Value::Object(obj) = jsii_type_ref {
			if let Some(Value::String(primitive_name)) = obj.get("primitive") {
				match primitive_name.as_str() {
					"string" => Some(self.wing_types.string()),
					"number" => Some(self.wing_types.number()),
					"boolean" => Some(self.wing_types.bool()),
					"any" => Some(self.wing_types.anything()),
					_ => panic!("TODO: handle primitive type {}", primitive_name),
				}
			} else if let Some(Value::String(type_fqn)) = obj.get("fqn") {
				if type_fqn == "@winglang/wingsdk.core.Inflight" {
					Some(self.wing_types.add_type(Type::Function(FunctionSignature {
						args: vec![self.wing_types.anything()],
						return_type: Some(self.wing_types.anything()),
						flight: Flight::In,
					})))
				} else if type_fqn == "@winglang/wingsdk.core.Duration" {
					Some(self.wing_types.duration())
				} else if type_fqn == "constructs.IConstruct" || type_fqn == "constructs.Construct" {
					// TODO: this should be a special type that represents "any resource" https://github.com/winglang/wing/issues/261
					Some(self.wing_types.anything())
				} else {
					Some(self.lookup_or_create_type(type_fqn))
				}
			} else if let Some(Value::Object(_)) = obj.get("collection") {
				// TODO: handle JSII to Wing collection type conversion, for now return any
				Some(self.wing_types.anything())
			} else {
				panic!(
					"Expected JSII type reference {:?} to be a collection, fqn or primitive",
					jsii_type_ref
				);
			}
		} else {
			panic!("Expected JSII type reference {:?} to be an object", jsii_type_ref);
		}
	}

	fn lookup_or_create_type(&mut self, type_fqn: &String) -> TypeRef {
		let type_name = &self.fqn_to_type_name(type_fqn);
		// Check if this type is already define in this module's namespace
		if let Some(t) = self.namespace_env.try_lookup(type_name, None) {
			return t;
		}
		// Define new type and return it
		self.import_type(type_fqn).unwrap()
	}

	pub fn fqn_to_type_name(&self, fqn: &str) -> String {
		let parts = fqn.split('.').collect::<Vec<&str>>();
		let assembly_name = parts[0];
		let namespace_name = parts[1];
		// Make sure this type is part of our assembly and in our namespace
		if assembly_name != self.assembly_name || namespace_name != self.namespace_name {
			panic!(
				"Encountered JSII type {} which isn't part of imported JSII namespace {}.{}",
				fqn, self.assembly_name, self.namespace_name
			);
		}
		fqn
			.strip_prefix(format!("{}.{}.", self.assembly_name, self.namespace_name).as_str())
			.unwrap()
			.to_string()
	}

	pub fn import_type(&mut self, type_fqn: &str) -> Option<TypeRef> {
		// Hack: if the class name is RESOURCE_CLASS_FQN then we treat this class as a resource and don't need to define it
		if type_fqn == RESOURCE_CLASS_FQN {
			return None;
		}

		// Check if this is a JSII interface and import it if it is
		let jsii_interface = self.jsii_types.find_interface(&type_fqn);
		if let Some(jsii_interface) = jsii_interface {
			return self.import_interface(jsii_interface);
		} else {
			// Check if this is a JSII class and import it if it is
			let jsii_class = self.jsii_types.find_class(&type_fqn);
			if let Some(jsii_class) = jsii_class {
				return self.import_class(jsii_class);
			} else {
				debug!("Type {} is unsupported, skipping", type_fqn);
				return None;
			}
		}
	}

	fn import_interface(&mut self, jsii_interface: wingii::jsii::InterfaceType) -> Option<TypeRef> {
		let type_name = self.fqn_to_type_name(&jsii_interface.fqn);
		match jsii_interface.datatype {
			Some(true) => {
				// If this datatype has methods something is unexpected in this JSII type definition, skip it.
				if jsii_interface.methods.is_some() && !jsii_interface.methods.as_ref().unwrap().is_empty() {
					debug!("JSII datatype interface {} has methods, skipping", type_name);
					return None;
				}
			}
			_ => {
				debug!("The JSII interface {} is not a \"datatype\", skipping", type_name);
				return None;
			}
		}

		let extends = if let Some(interfaces) = &jsii_interface.interfaces {
			interfaces
				.iter()
				.map(|fqn| self.lookup_or_create_type(fqn))
				.collect::<Vec<_>>()
		} else {
			vec![]
		};

		let struct_env = TypeEnv::new(None, None, true, self.namespace_env.flight, self.import_statement_idx);
		let new_type_symbol = Self::jsii_name_to_symbol(&type_name, &jsii_interface.location_in_module);
		let wing_type = self.wing_types.add_type(Type::Struct(Struct {
			name: new_type_symbol.clone(),
			extends: extends.clone(),
			env: struct_env,
		}));
		let struct_env = &mut wing_type.as_mut_struct().unwrap().env;
		self.add_members_to_class_env(&jsii_interface, false, self.namespace_env.flight, struct_env, wing_type);

		// Add properties from our parents to the new structs env
		type_check::add_parent_members_to_struct_env(&extends, &new_type_symbol, struct_env);

		debug!("Adding struct type {}", type_name.green());
		self
			.namespace_env
			.define(&new_type_symbol, wing_type, StatementIdx::Top);
		Some(wing_type)
	}

	fn add_members_to_class_env<T: JsiiInterface>(
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
					debug!("Skipping capture method on resource");
					continue;
				}

				debug!("Adding method {} to class", m.name.green());

				let return_type = if let Some(jsii_return_type) = &m.returns {
					self.optional_type_to_wing_type(&jsii_return_type)
				} else {
					None
				};

				let mut arg_types = vec![];
				// Add my type as the first argument to all methods (this)
				arg_types.push(wing_type);
				// Define the rest of the arguments and create the method signature
				if let Some(params) = &m.parameters {
					for param in params {
						arg_types.push(self.parameter_to_wing_type(&param));
					}
				}
				let method_sig = self.wing_types.add_type(Type::Function(FunctionSignature {
					args: arg_types,
					return_type,
					flight,
				}));
				class_env.define(
					&Self::jsii_name_to_symbol(&m.name, &m.location_in_module),
					method_sig,
					StatementIdx::Top,
				);
			}
		}
		// Add properties to the class environment
		if let Some(properties) = jsii_interface.properties() {
			for p in properties {
				debug!("Found property {} with type {:?}", p.name.green(), p.type_);
				if flight == Flight::In {
					todo!("No support for inflight properties yet");
				}
				class_env.define(
					&Self::jsii_name_to_symbol(&p.name, &p.location_in_module),
					self.type_ref_to_wing_type(&p.type_).unwrap(),
					StatementIdx::Top,
				);
			}
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

	fn import_class(&mut self, jsii_class: wingii::jsii::ClassType) -> Option<TypeRef> {
		let mut is_resource = false;
		let type_name = &self.fqn_to_type_name(&jsii_class.fqn);

		// Get the base class of the JSII class, define it via recursive call if it's not define yet
		let base_class = if let Some(base_class_fqn) = &jsii_class.base {
			// Hack: if the base class name is RESOURCE_CLASS_FQN then we treat this class as a resource and don't need to define its parent
			if base_class_fqn == RESOURCE_CLASS_FQN {
				is_resource = true;
				None
			} else {
				let base_class_name = self.fqn_to_type_name(base_class_fqn);
				let base_class_type = if let Some(base_class_type) = self.namespace_env.try_lookup(&base_class_name, None) {
					Some(base_class_type)
				} else {
					// If the base class isn't defined yet then define it first (recursive call)
					let base_class_type = self.import_type(base_class_fqn);
					if base_class_type.is_none() {
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

		// Get env of base class/resource
		let base_class_env = if let Some(base_class) = base_class {
			match base_class.into() {
				&Type::Class(ref c) => Some(&c.env as *const TypeEnv),
				&Type::Resource(ref c) => {
					// If our base class is a resource then we are a resource
					is_resource = true;
					Some(&c.env as *const TypeEnv)
				}
				_ => panic!("Base class {} of {} is not a class or resource", base_class, type_name),
			}
		} else {
			None
		};

		// Create environment representing this class, for now it'll be empty just so we can support referencing ourselves from the class definition.
		let dummy_env = TypeEnv::new(None, None, true, self.namespace_env.flight, 0);
		let new_type_symbol = Self::jsii_name_to_symbol(type_name, &jsii_class.location_in_module);
		// Create the new resource/class type and add it to the current environment.
		// When adding the class methods below we'll be able to reference this type.
		debug!("Adding type {} to namespace", type_name.green());
		let class_spec = Class {
			name: new_type_symbol.clone(),
			env: dummy_env,
			parent: base_class,
		};
		let new_type = self.wing_types.add_type(if is_resource {
			Type::Resource(class_spec)
		} else {
			Type::Class(class_spec)
		});
		self.namespace_env.define(&new_type_symbol, new_type, StatementIdx::Top);
		// Create class's actual environment before we add properties and methods to it
		let mut class_env = TypeEnv::new(base_class_env, None, true, self.namespace_env.flight, 0);

		// Add constructor to the class environment
		let jsii_initializer = jsii_class.initializer.as_ref();

		if let Some(initializer) = jsii_initializer {
			let mut arg_types: Vec<TypeRef> = vec![];
			if let Some(params) = &initializer.parameters {
				for (i, param) in params.iter().enumerate() {
					// If this is a resource then skip scope and id arguments
					if is_resource {
						if i == 0 {
							assert!(param.name == "scope");
							continue;
						} else if i == 1 {
							assert!(param.name == "id");
							continue;
						}
					}
					arg_types.push(self.parameter_to_wing_type(&param));
				}
			}
			let method_sig = self.wing_types.add_type(Type::Function(FunctionSignature {
				args: arg_types,
				return_type: Some(new_type),
				flight: class_env.flight,
			}));
			class_env.define(
				&Self::jsii_name_to_symbol(WING_CONSTRUCTOR_NAME, &initializer.location_in_module),
				method_sig,
				StatementIdx::Top,
			);
		}

		// Add methods and properties to the class environment
		self.add_members_to_class_env(&jsii_class, is_resource, Flight::Pre, &mut class_env, new_type);
		if is_resource {
			// Look for a client interface for this resource
			let client_interface = jsii_class.docs.and_then(|docs| docs.custom).and_then(|custom| {
				custom
					.get("inflight")
					.map(|fqn| {
						// Some fully qualified package names include "@" characters,
						// so they have to be escaped in the original docstring.
						if fqn.starts_with("`") && fqn.ends_with("`") {
							&fqn[1..fqn.len() - 1]
						} else {
							fqn
						}
					})
					.and_then(|fqn| self.jsii_types.find_interface(fqn))
			});
			if let Some(client_interface) = client_interface {
				// Add client interface's methods to the class environment
				self.add_members_to_class_env(&client_interface, false, Flight::In, &mut class_env, new_type);
			} else {
				debug!("Resource {} doesn't not seem to have a client", type_name.green());
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

	fn optional_type_to_wing_type(&mut self, jsii_optional_type: &jsii::OptionalValue) -> Option<TypeRef> {
		if let Some(true) = jsii_optional_type.optional {
			// TODO: we assume Some(false) and None are both non-optional - verify!!
			panic!("TODO: handle optional types");
		}
		self.type_ref_to_wing_type(&jsii_optional_type.type_)
	}

	fn parameter_to_wing_type(&mut self, parameter: &jsii::Parameter) -> TypeRef {
		if parameter.variadic.unwrap_or(false) {
			panic!("TODO: variadic parameters are unsupported - Give a +1 to this issue: https://github.com/winglang/wing/issues/397");
		}

		let param_type = self.type_ref_to_wing_type(&parameter.type_).unwrap();
		if parameter.optional.unwrap_or(false) {
			self.wing_types.add_type(Type::Optional(param_type))
		} else {
			param_type
		}
	}
}
