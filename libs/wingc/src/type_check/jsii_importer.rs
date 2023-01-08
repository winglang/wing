use crate::{
	ast::{Phase, Symbol},
	debug,
	diagnostic::{CharacterLocation, WingSpan},
	type_check::{self, symbol_env::SymbolEnv},
	type_check::{
		symbol_env::StatementIdx, Class, FunctionSignature, Struct, SymbolKind, Type, TypeRef, Types, WING_CONSTRUCTOR_NAME,
	},
	utilities::camel_case_to_snake_case,
	WINGSDK_ASSEMBLY_NAME, WINGSDK_DURATION, WINGSDK_INFLIGHT, WINGSDK_RESOURCE,
};
use colored::Colorize;
use serde_json::Value;
use wingii::jsii::{self, Assembly};

use super::Namespace;

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
	jsii_types: &'a wingii::type_system::TypeSystem,
	assembly: &'a Assembly,
	module_name: &'a str,
	wing_types: &'a mut Types,
	import_statement_idx: usize,
	env: &'a mut SymbolEnv,
}

impl<'a> JsiiImporter<'a> {
	pub fn new(
		jsii_types: &'a wingii::type_system::TypeSystem,
		assembly: &'a Assembly,
		module_name: &'a str,
		wing_types: &'a mut Types,
		import_statement_idx: usize,
		env: &'a mut SymbolEnv,
	) -> Self {
		Self {
			jsii_types,
			assembly,
			module_name,
			wing_types,
			import_statement_idx,
			env,
		}
	}

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
				if type_fqn == &format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_INFLIGHT) {
					Some(self.wing_types.add_type(Type::Function(FunctionSignature {
						args: vec![self.wing_types.anything()],
						return_type: Some(self.wing_types.anything()),
						flight: Phase::Inflight,
					})))
				} else if type_fqn == &format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_DURATION) {
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
		let type_name = &self.strip_assembly_from_fqn(type_fqn);
		// Check if this type is already define in this module's namespace
		if let Ok(t) = self.env.lookup_nested_str(type_name, true, None) {
			return t.as_type().expect(&format!("Expected {} to be a type", type_name));
		}
		// Define new type and return it
		self.import_type(type_fqn);
		self
			.env
			.lookup_nested_str(type_name, true, None)
			.expect(&format!("Expected {} to be defined", type_name))
			.as_type()
			.unwrap()
	}

	fn fqn_to_type_name(&self, fqn: &str) -> String {
		let parts = fqn.split('.').collect::<Vec<&str>>();
		let assembly_name = parts[0];
		let namespace_name = parts[1];
		fqn
			.strip_prefix(format!("{}.{}.", assembly_name, namespace_name).as_str())
			.unwrap()
			.to_string()
	}

	fn strip_assembly_from_fqn(&self, fqn: &str) -> String {
		let parts = fqn.split('.').collect::<Vec<&str>>();
		let assembly_name = parts[0];
		fqn
			.strip_prefix(format!("{}.", assembly_name).as_str())
			.unwrap()
			.to_string()
	}

	fn import_type(&mut self, type_fqn: &str) {
		// Hack: if the class name is RESOURCE_CLASS_FQN then we treat this class as a resource and don't need to define it
		if type_fqn == format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE) {
			return;
		}

		// Always expect assembly.module.type
		let parts = type_fqn.split('.').collect::<Vec<_>>();
		assert!(parts.len() == 3);
		assert!(parts[0] == self.assembly.name);
		let namespace_name = parts[1];
		let type_name = parts[2];

		// Create namespace and add it to env if it doesn't exist yet
		if let Some(symb) = self.env.try_lookup_mut(namespace_name, None) {
			if let SymbolKind::Namespace(ns) = symb {
				// If this namespace is already imported but hidden then unhide it if it's being explicitly imported
				if ns.hidden && namespace_name == self.module_name {
					ns.hidden = false;
				}
			} else {
				// TODO: make this a proper error
				panic!(
					"Tried importing {} but {} already defined as a {}",
					type_name, namespace_name, symb
				);
			}
		} else {
			self
				.env
				.define(
					&Symbol {
						name: namespace_name.to_string(),
						span: WingSpan::global(),
					},
					SymbolKind::Namespace(Namespace {
						name: namespace_name.to_string(),
						hidden: namespace_name == self.module_name,
						env: SymbolEnv::new(None, None, false, self.env.flight, 0),
					}),
					StatementIdx::Top,
				)
				.unwrap();
		}

		// Check if this is a JSII interface and import it if it is
		let jsii_interface = self.jsii_types.find_interface(&type_fqn);
		if let Some(jsii_interface) = jsii_interface {
			self.import_interface(jsii_interface, namespace_name);
		} else {
			// Check if this is a JSII class and import it if it is
			let jsii_class = self.jsii_types.find_class(&type_fqn);
			if let Some(jsii_class) = jsii_class {
				self.import_class(jsii_class, namespace_name);
			} else {
				debug!("Type {} is unsupported, skipping", type_fqn);
			}
		}
	}

	fn import_interface(&mut self, jsii_interface: wingii::jsii::InterfaceType, namespace_name: &str) {
		let type_name = self.fqn_to_type_name(&jsii_interface.fqn);
		match jsii_interface.datatype {
			Some(true) => {
				// If this datatype has methods something is unexpected in this JSII type definition, skip it.
				if jsii_interface.methods.is_some() && !jsii_interface.methods.as_ref().unwrap().is_empty() {
					debug!("JSII datatype interface {} has methods, skipping", type_name);
					return;
				}
			}
			_ => {
				debug!("The JSII interface {} is not a \"datatype\", skipping", type_name);
				return;
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

		let mut struct_env = SymbolEnv::new(None, None, true, self.env.flight, self.import_statement_idx);
		let new_type_symbol = Self::jsii_name_to_symbol(&type_name, &jsii_interface.location_in_module);
		let mut wing_type = self.wing_types.add_type(Type::Struct(Struct {
			name: new_type_symbol.clone(),
			extends: extends.clone(),
			env: SymbolEnv::new(None, None, true, struct_env.flight, self.import_statement_idx), // Dummy env, will be replaced below
		}));
		self.add_members_to_class_env(&jsii_interface, false, struct_env.flight, &mut struct_env, wing_type);

		// Add properties from our parents to the new structs env
		type_check::add_parent_members_to_struct_env(&extends, &new_type_symbol, &mut struct_env).expect(&format!(
			"Invalid JSII library: failed to add parent members to struct {}",
			type_name
		));

		// Replace the dummy struct environment with the real one after adding all properties
		match *wing_type {
			Type::Struct(ref mut _struct) => _struct.env = struct_env,
			_ => panic!("Expected {} to be a struct", type_name),
		};

		// TODO: don't we need to add this to the namespace earlier in case there's a self reference in the struct?
		let ns = self
			.env
			.try_lookup_mut(namespace_name, None)
			.unwrap()
			.as_mut_namespace()
			.unwrap();
		ns.env
			.define(&new_type_symbol, SymbolKind::Type(wing_type), StatementIdx::Top)
			.expect(&format!(
				"Invalid JSII library: failed to define struct type {}",
				type_name
			));
	}

	fn add_members_to_class_env<T: JsiiInterface>(
		&mut self,
		jsii_interface: &T,
		is_resource: bool,
		flight: Phase,
		class_env: &mut SymbolEnv,
		wing_type: TypeRef,
	) {
		assert!(!is_resource || flight == Phase::Preflight);

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
				let name = camel_case_to_snake_case(&m.name);
				class_env
					.define(
						&Self::jsii_name_to_symbol(&name, &m.location_in_module),
						SymbolKind::Variable(method_sig),
						StatementIdx::Top,
					)
					.expect(&format!(
						"Invalid JSII library: failed to add method {} to class",
						m.name
					));
			}
		}
		// Add properties to the class environment
		if let Some(properties) = jsii_interface.properties() {
			for p in properties {
				debug!("Found property {} with type {:?}", p.name.green(), p.type_);
				if flight == Phase::Inflight {
					todo!("No support for inflight properties yet");
				}
				let base_wing_type = self.type_ref_to_wing_type(&p.type_).unwrap();
				let is_optional = if let Some(true) = p.optional { true } else { false };

				let wing_type = if is_optional {
					// TODO Will this create a bunch of duplicate types?
					self.wing_types.add_type(Type::Optional(base_wing_type))
				} else {
					base_wing_type
				};

				class_env
					.define(
						&Self::jsii_name_to_symbol(&camel_case_to_snake_case(&p.name), &p.location_in_module),
						SymbolKind::Variable(wing_type),
						StatementIdx::Top,
					)
					.expect(&format!(
						"Invalid JSII library: failed to add property {} to class",
						p.name
					));
			}
		}
	}

	fn jsii_name_to_symbol(name: &str, jsii_source_location: &Option<jsii::SourceLocation>) -> Symbol {
		let span = if let Some(jsii_source_location) = jsii_source_location {
			WingSpan {
				start: CharacterLocation {
					row: (jsii_source_location.line - 1.0) as usize,
					column: 0,
				},
				end: CharacterLocation {
					row: (jsii_source_location.line - 1.0) as usize,
					column: 0,
				},
				start_byte: 0,
				end_byte: 0,
				file_id: (&jsii_source_location.filename).into(),
			}
		} else {
			WingSpan::global()
		};
		Symbol {
			name: name.to_string(),
			span,
		}
	}

	fn import_class(&mut self, jsii_class: wingii::jsii::ClassType, namespace_name: &str) {
		let mut is_resource = false;
		let type_name = &self.fqn_to_type_name(&jsii_class.fqn);

		// Get the base class of the JSII class, define it via recursive call if it's not define yet
		let base_class_type = if let Some(base_class_fqn) = &jsii_class.base {
			// Hack: if the base class name is RESOURCE_CLASS_FQN then we treat this class as a resource and don't need to define its parent
			if base_class_fqn == &format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE) {
				is_resource = true;
				None
			} else {
				let base_class_name = self.strip_assembly_from_fqn(base_class_fqn);
				let base_class_type = if let Ok(base_class_type) = self.env.lookup_nested_str(&base_class_name, true, None) {
					base_class_type
						.as_type()
						.expect("Base class name found but it's not a type")
				} else {
					// If the base class isn't defined yet then define it first (recursive call)
					self.import_type(base_class_fqn);
					self
						.env
						.lookup_nested_str(&base_class_name, true, None)
						.expect(&format!(
							"Failed to define base class {} of {}",
							base_class_name, type_name
						))
						.as_type()
						.unwrap()
				};

				// Validate the base class is either a class or a resource
				if base_class_type.as_resource().is_none() && base_class_type.as_class().is_none() {
					panic!("Base class {} of {} is not a resource", base_class_name, type_name);
				}
				Some(base_class_type)
			}
		} else {
			None
		};

		// Get env of base class/resource
		let base_class_env = if let Some(base_class_type) = base_class_type {
			let base_class = base_class_type.as_class_or_resource().expect(&format!(
				"Base class {} of {} is not a class or resource",
				base_class_type, type_name
			));
			is_resource = base_class_type.as_resource().is_some();
			Some(base_class.env.get_ref())
		} else {
			None
		};

		// Create environment representing this class, for now it'll be empty just so we can support referencing ourselves from the class definition.
		let dummy_env = SymbolEnv::new(None, None, true, self.env.flight, 0);
		let new_type_symbol = Self::jsii_name_to_symbol(type_name, &jsii_class.location_in_module);
		// Create the new resource/class type and add it to the current environment.
		// When adding the class methods below we'll be able to reference this type.
		debug!("Adding type {} to namespace", type_name.green());
		let class_spec = Class {
			should_case_convert_jsii: true,
			name: new_type_symbol.clone(),
			env: dummy_env,
			parent: base_class_type,
		};
		let mut new_type = self.wing_types.add_type(if is_resource {
			Type::Resource(class_spec)
		} else {
			Type::Class(class_spec)
		});
		let ns = self
			.env
			.try_lookup_mut(namespace_name, None)
			.unwrap()
			.as_mut_namespace()
			.unwrap();
		ns.env
			.define(&new_type_symbol, SymbolKind::Type(new_type), StatementIdx::Top)
			.expect(&format!("Invalid JSII library: failed to define class {}", type_name));
		// Create class's actual environment before we add properties and methods to it
		let mut class_env = SymbolEnv::new(base_class_env, None, true, self.env.flight, 0);

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
			if let Err(e) = class_env.define(
				&Self::jsii_name_to_symbol(WING_CONSTRUCTOR_NAME, &initializer.location_in_module),
				SymbolKind::Variable(method_sig),
				StatementIdx::Top,
			) {
				panic!("Invalid JSII library, failed to define {}'s init: {}", type_name, e)
			}
		}

		// Add methods and properties to the class environment
		self.add_members_to_class_env(&jsii_class, is_resource, Phase::Preflight, &mut class_env, new_type);
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
				self.add_members_to_class_env(&client_interface, false, Phase::Inflight, &mut class_env, new_type);
			} else {
				debug!("Resource {} doesn't not seem to have a client", type_name.green());
			}
		}
		// Replace the dummy class environment with the real one before type checking the methods
		match *new_type {
			Type::Class(ref mut class) | Type::Resource(ref mut class) => {
				class.env = class_env;
			}
			_ => panic!("Expected {} to be a class or resource ", type_name),
		};
	}

	fn optional_type_to_wing_type(&mut self, jsii_optional_type: &jsii::OptionalValue) -> Option<TypeRef> {
		let base_type = self.type_ref_to_wing_type(&jsii_optional_type.type_);
		if let Some(true) = jsii_optional_type.optional {
			// TODO: we assume Some(false) and None are both non-optional - verify!!
			Some(self.wing_types.add_type(Type::Optional(base_type.unwrap())))
		} else {
			base_type
		}
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

	pub fn import_to_env(&mut self) {
		let prefix = format!("{}.{}.", self.assembly.name, self.module_name);
		for type_fqn in self.assembly.types.as_ref().unwrap().keys() {
			// Skip types outside the imported namespace
			if !type_fqn.starts_with(&prefix) {
				continue;
			}

			// Lookup type before we attempt to import it, this is required because `import_jsii_type` is recursive
			// and might have already defined the current type internally
			if self
				.env
				.lookup_nested_str(&self.strip_assembly_from_fqn(type_fqn), true, None)
				.is_ok()
			{
				continue;
			}

			// Import type
			self.import_type(type_fqn);
		}
	}
}
