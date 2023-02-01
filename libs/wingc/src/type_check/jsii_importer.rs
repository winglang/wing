use crate::{
	ast::{Phase, Symbol},
	debug,
	diagnostic::{CharacterLocation, WingSpan},
	type_check::{self, symbol_env::SymbolEnv},
	type_check::{
		symbol_env::StatementIdx, Class, FunctionSignature, Struct, SymbolKind, Type, TypeRef, Types, WING_CONSTRUCTOR_NAME,
	},
	utilities::camel_case_to_snake_case,
	WINGSDK_ASSEMBLY_NAME, WINGSDK_DURATION, WINGSDK_INFLIGHT,
};
use colored::Colorize;
use serde_json::Value;
use wingii::jsii;

use super::{fqn::FQN, Namespace};

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
	/// An interface to access the types in the JSII library loaded with wingii.
	jsii_types: &'a wingii::type_system::TypeSystem,
	/// The assembly to import from the JSII library. This is typically the name of the NPM package.
	assembly_name: &'a str,
	/// This is a namespace filter on the imported JSII assembly.
	/// For example:
	/// - ["cloud"] will only (publicly) import types prefixed with `cloud.` from the assembly
	/// - ["ns1", "ns2"] will only import types prefixed with `ns1.ns2.` from the assembly
	/// - [] will import all types from the assembly
	/// Note that other types might be implicitly imported into hidden namespaces
	/// if they are referenced from a type in the specified `module_name`.
	namespace_filter: &'a [String],
	/// The name to assign to the module in the Wing type system.
	identifier: &'a Symbol,
	/// The wing type system: all imported types are added to `wing_types`.
	wing_types: &'a mut Types,
	/// The index of the import statement that triggered this import. This is required so we'll know
	/// later on if types defined by this import come before or after other statements in the code.
	/// If type definitions in wing are always location agnostic this doesn't really matter and we
	/// might be able to remove this.
	import_statement_idx: usize,
	/// The symbol environment to add imported symbols to. Note that all symbols will be added to
	/// some `Namespace` under this `env`.
	env: &'a mut SymbolEnv,
}

impl<'a> JsiiImporter<'a> {
	pub fn new(
		jsii_types: &'a wingii::type_system::TypeSystem,
		assembly_name: &'a str,
		namespace_filter: &'a [String],
		identifier: &'a Symbol,
		wing_types: &'a mut Types,
		import_statement_idx: usize,
		env: &'a mut SymbolEnv,
	) -> Self {
		Self {
			jsii_types,
			assembly_name,
			namespace_filter,
			identifier,
			wing_types,
			import_statement_idx,
			env,
		}
	}

	fn type_ref_to_wing_type(&mut self, jsii_type_ref: &jsii::TypeReference) -> TypeRef {
		if let serde_json::Value::Object(obj) = jsii_type_ref {
			if let Some(Value::String(primitive_name)) = obj.get("primitive") {
				match primitive_name.as_str() {
					"string" => self.wing_types.string(),
					"number" => self.wing_types.number(),
					"boolean" => self.wing_types.bool(),
					"any" => self.wing_types.anything(),
					_ => panic!("TODO: handle primitive type {}", primitive_name),
				}
			} else if let Some(Value::String(type_fqn)) = obj.get("fqn") {
				if type_fqn == &format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_INFLIGHT) {
					self.wing_types.add_type(Type::Function(FunctionSignature {
						args: vec![self.wing_types.anything()],
						return_type: self.wing_types.anything(),
						flight: Phase::Inflight,
					}))
				} else if type_fqn == &format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_DURATION) {
					self.wing_types.duration()
				} else if type_fqn == "constructs.IConstruct" || type_fqn == "constructs.Construct" {
					// TODO: this should be a special type that represents "any resource" https://github.com/winglang/wing/issues/261
					self.wing_types.anything()
				} else {
					self.lookup_or_create_type(&FQN::from(type_fqn))
				}
			} else if let Some(Value::Object(_)) = obj.get("collection") {
				// TODO: handle JSII to Wing collection type conversion, for now return any
				self.wing_types.anything()
			} else if let Some(Value::Object(_)) = obj.get("union") {
				// Wing does not support union types, so we'll just return any
				self.wing_types.anything()
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

	fn lookup_or_create_type(&mut self, type_fqn: &FQN) -> TypeRef {
		// Check if this type is already defined in this module's namespace
		if let Ok(t) = self.env.lookup_nested_str(type_fqn.as_str(), true, None) {
			return t.as_type().expect(&format!("Expected {} to be a type", type_fqn));
		}
		// Define new type and return it
		self.import_type(type_fqn);
		self
			.env
			.lookup_nested_str(type_fqn.as_str(), true, None)
			.expect(&format!("Expected {} to be defined", type_fqn))
			.as_type()
			.unwrap()
	}

	fn import_type(&mut self, type_fqn: &FQN) {
		// Hack: if the class name is a construct base then we treat this class as a resource and don't need to define it
		if type_fqn.is_construct_base() {
			return;
		}

		// TODO: why do we need this?
		// assert!(type_fqn.assembly() == self.assembly_name);

		self.setup_namespaces_for(&type_fqn);

		// Check if this is a JSII interface and import it if it is
		let jsii_interface = self.jsii_types.find_interface(type_fqn.as_str());
		if let Some(jsii_interface) = jsii_interface {
			self.import_interface(jsii_interface);
			return;
		}

		// Check if this is a JSII class and import it if it is
		let jsii_class = self.jsii_types.find_class(type_fqn.as_str());
		if let Some(jsii_class) = jsii_class {
			self.import_class(jsii_class);
			return;
		}

		debug!(
			"Type {} is unsupported or not found in the type system, skipping",
			type_fqn
		);
	}

	fn setup_namespaces_for(&mut self, type_name: &FQN) {
		debug!("Setting up namespaces for {}", type_name);

		// First, ensure there is a namespace in the Wing type system corresponding to the JSII assembly we are importing from.
		// If we are importing a type from the root of the assembly, then we need to make sure the assembly namespace is visible
		// (Note that we never want to hide a namespace that has already been made visible)
		let assembly_should_be_visible = type_name.namespaces().count() == 0;
		if let Some(symb) = self.env.try_lookup_mut(self.assembly_name, None) {
			if let SymbolKind::Namespace(ns) = symb {
				// If this namespace is already imported but hidden then unhide it if it's being explicitly imported
				if ns.hidden && assembly_should_be_visible {
					ns.hidden = false;
				}
			} else {
				// TODO: make this a proper error
				panic!(
					"Tried importing {} but {} already defined as a {}",
					type_name, self.assembly_name, symb
				)
			}
		} else {
			let ns = self.wing_types.add_namespace(Namespace {
				name: self.assembly_name.to_string(),
				hidden: !assembly_should_be_visible,
				env: SymbolEnv::new(None, self.wing_types.void(), false, false, self.env.flight, 0),
			});
			self
				.env
				.define(
					&Symbol {
						name: self.assembly_name.to_string(),
						span: WingSpan::global(),
					},
					SymbolKind::Namespace(ns),
					StatementIdx::Top,
				)
				.unwrap();
		};

		let flight = self.env.flight;

		// Next, ensure there is a namespace for each of the namespaces in the type name
		for (ns_idx, namespace_name) in type_name.namespaces().enumerate() {
			let mut lookup_str = vec![self.assembly_name];
			lookup_str.extend(type_name.namespaces().take(ns_idx));
			let lookup_str = lookup_str.join(".");

			let mut parent_ns = self
				.env
				.lookup_nested_mut_str(&lookup_str, false, None)
				.unwrap()
				.as_namespace_ref()
				.unwrap();

			let namespace_should_be_visible = ns_idx + 1 == type_name.namespaces().count();
			if let Some(symb) = parent_ns.env.try_lookup_mut(namespace_name, None) {
				if let SymbolKind::Namespace(ns) = symb {
					// If this namespace is already imported but hidden then unhide it if it's being explicitly imported
					if ns.hidden && namespace_should_be_visible {
						ns.hidden = false;
					}
				} else {
					// TODO: make this a proper error
					panic!(
						"Tried importing {} but {} already defined as a {}",
						type_name, namespace_name, symb
					)
				}
			} else {
				let ns = self.wing_types.add_namespace(Namespace {
					name: namespace_name.to_string(),
					hidden: !namespace_should_be_visible,
					env: SymbolEnv::new(
						Some(parent_ns.env.get_ref()),
						self.wing_types.void(),
						false,
						false,
						flight,
						0,
					),
				});
				parent_ns
					.env
					.define(
						&Symbol {
							name: namespace_name.to_string(),
							span: WingSpan::global(),
						},
						SymbolKind::Namespace(ns),
						StatementIdx::Top,
					)
					.unwrap();
			}
		}
	}

	/// Import a JSII interface into the Wing type system.
	/// In JSII, a struct is a special kind of interface whose name starts with "I" which has no methods and whose
	/// properties are all readonly.
	/// Structs can be distinguished non-structs with the "datatype: true" property in `jsii::InterfaceType`.
	///
	/// See https://aws.github.io/jsii/specification/2-type-system/#interfaces-structs
	fn import_interface(&mut self, jsii_interface: wingii::jsii::InterfaceType) {
		let jsii_interface_fqn = FQN::from(&jsii_interface.fqn);
		debug!("Importing interface {}", jsii_interface_fqn.as_str().green());
		let type_name = jsii_interface_fqn.type_name();
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
				.map(|fqn| self.lookup_or_create_type(&FQN::from(fqn)))
				.collect::<Vec<_>>()
		} else {
			vec![]
		};

		let mut struct_env = SymbolEnv::new(
			None,
			self.wing_types.void(),
			true,
			false,
			self.env.flight,
			self.import_statement_idx,
		);
		let new_type_symbol = Self::jsii_name_to_symbol(&type_name, &jsii_interface.location_in_module);
		let mut wing_type = self.wing_types.add_type(Type::Struct(Struct {
			name: new_type_symbol.clone(),
			extends: extends.clone(),
			env: SymbolEnv::new(
				None,
				self.wing_types.void(),
				true,
				false,
				struct_env.flight,
				self.import_statement_idx,
			), // Dummy env, will be replaced below
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
		let mut ns = self
			.env
			.lookup_nested_mut_str(jsii_interface_fqn.as_str_without_type_name(), true, None)
			.unwrap()
			.as_namespace_ref()
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
					self.wing_types.void()
				};

				let mut arg_types = vec![];
				// Add my type as the first argument to all methods (this)
				arg_types.push(wing_type);
				// Define the rest of the arguments and create the method signature
				if let Some(params) = &m.parameters {
					if self.has_variadic_parameters(params) {
						debug!("Skipping method {} with variadic parameters", m.name);
						continue;
					}

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
						SymbolKind::make_variable(method_sig, false),
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
				let base_wing_type = self.type_ref_to_wing_type(&p.type_);
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
						SymbolKind::make_variable(wing_type, matches!(p.immutable, Some(true))),
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

	fn import_class(&mut self, jsii_class: wingii::jsii::ClassType) {
		let mut is_resource = false;
		let jsii_class_fqn = FQN::from(&jsii_class.fqn);
		debug!("Importing class {}", jsii_class_fqn.as_str().green());
		let type_name = jsii_class_fqn.type_name();

		// Get the base class of the JSII class, define it via recursive call if it's not define yet
		let base_class_type = if let Some(base_class_fqn) = &jsii_class.base {
			let base_class_fqn = FQN::from(base_class_fqn);
			// Hack: if the base class name is a resource base then we treat this class as a resource and don't need to define its parent.
			if base_class_fqn.is_construct_base() {
				is_resource = true;
				None
			} else {
				let base_class_name = base_class_fqn.type_name();
				let base_class_type =
					if let Ok(base_class_type) = self.env.lookup_nested_str(base_class_fqn.as_str(), true, None) {
						base_class_type
							.as_type()
							.expect("Base class name found but it's not a type")
					} else {
						// If the base class isn't defined yet then define it first (recursive call)
						self.import_type(&base_class_fqn);
						self
							.env
							.lookup_nested_str(&base_class_fqn.as_str(), true, None)
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

		let phase = if is_resource {
			self.env.flight
		} else {
			Phase::Independent
		};

		// Create environment representing this class, for now it'll be empty just so we can support referencing ourselves from the class definition.
		let dummy_env = SymbolEnv::new(None, self.wing_types.void(), true, false, phase, 0);
		let new_type_symbol = Self::jsii_name_to_symbol(type_name, &jsii_class.location_in_module);
		// Create the new resource/class type and add it to the current environment.
		// When adding the class methods below we'll be able to reference this type.
		debug!("Adding type {} to namespace", type_name.green());
		let type_params = jsii_class.docs.as_ref().and_then(|docs| {
			// `@typeparam` allows us to add type args to JSII types
			// `@typeparam <types>` - where <types> is a comma separated list of type parameters, referencing a class in the same namespace
			// e.g. `@typeparam T1, T2` - T1 and T2 are type parameters of the class and will be replaced with the actual types when the class is used
			docs.custom.as_ref().and_then(|c| {
				c.get("typeparam").and_then(|type_param_name| {
					let args = type_param_name.split(",").map(|s| s.trim()).collect::<Vec<&str>>();
					Some(
						args
							.iter()
							.map(|a| {
								self.lookup_or_create_type(&FQN::from(&format!(
									"{}.{}",
									jsii_class_fqn.as_str_without_type_name(),
									a
								)))
							})
							.collect::<Vec<_>>(),
					)
				})
			})
		});
		let class_spec = Class {
			should_case_convert_jsii: true,
			name: new_type_symbol.clone(),
			env: dummy_env,
			parent: base_class_type,
			type_parameters: type_params,
		};
		let mut new_type = self.wing_types.add_type(if is_resource {
			Type::Resource(class_spec)
		} else {
			Type::Class(class_spec)
		});
		let mut ns = self
			.env
			.lookup_nested_mut_str(jsii_class_fqn.as_str_without_type_name(), true, None)
			.unwrap()
			.as_namespace_ref()
			.unwrap();
		ns.env
			.define(&new_type_symbol, SymbolKind::Type(new_type), StatementIdx::Top)
			.expect(&format!("Invalid JSII library: failed to define class {}", type_name));
		// Create class's actual environment before we add properties and methods to it
		let mut class_env = SymbolEnv::new(base_class_env, self.wing_types.void(), true, false, phase, 0);

		// Add constructor to the class environment
		let jsii_initializer = jsii_class.initializer.as_ref();

		if let Some(initializer) = jsii_initializer {
			let mut arg_types: Vec<TypeRef> = vec![];
			if let Some(params) = &initializer.parameters {
				for (i, param) in params.iter().enumerate() {
					// If this is a resource then skip scope and id arguments
					// TODO hack - skip this check if the resource's name is "App"
					if is_resource && type_name != "App" {
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
				return_type: new_type,
				flight: phase,
			}));
			if let Err(e) = class_env.define(
				&Self::jsii_name_to_symbol(WING_CONSTRUCTOR_NAME, &initializer.location_in_module),
				SymbolKind::make_variable(method_sig, false),
				StatementIdx::Top,
			) {
				panic!("Invalid JSII library, failed to define {}'s init: {}", type_name, e)
			}
		}

		// Add methods and properties to the class environment
		self.add_members_to_class_env(&jsii_class, is_resource, phase, &mut class_env, new_type);
		if is_resource {
			// Look for a client interface for this resource
			let client_interface = jsii_class
				.docs
				.as_ref()
				.and_then(|docs| docs.custom.as_ref())
				.and_then(|custom| {
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
				debug!("Resource {} does not seem to have a client", type_name.green());
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

	fn optional_type_to_wing_type(&mut self, jsii_optional_type: &jsii::OptionalValue) -> TypeRef {
		let base_type = self.type_ref_to_wing_type(&jsii_optional_type.type_);
		if let Some(true) = jsii_optional_type.optional {
			// TODO: we assume Some(false) and None are both non-optional - verify!!
			self.wing_types.add_type(Type::Optional(base_type))
		} else {
			base_type
		}
	}

	fn has_variadic_parameters(&self, parameters: &Vec<jsii::Parameter>) -> bool {
		parameters.iter().any(|p| p.variadic.unwrap_or(false))
	}

	fn parameter_to_wing_type(&mut self, parameter: &jsii::Parameter) -> TypeRef {
		if parameter.variadic.unwrap_or(false) {
			panic!("TODO: variadic parameters are unsupported - Give a +1 to this issue: https://github.com/winglang/wing/issues/397");
		}

		let param_type = self.type_ref_to_wing_type(&parameter.type_);
		if parameter.optional.unwrap_or(false) {
			self.wing_types.add_type(Type::Optional(param_type))
		} else {
			param_type
		}
	}

	pub fn import_to_env(&mut self) {
		let assembly = self.jsii_types.find_assembly(self.assembly_name).unwrap();

		for type_fqn in assembly.types.as_ref().unwrap().keys() {
			let type_fqn = FQN::from(type_fqn);

			// Skip types outside the imported namespace
			if !type_fqn.is_in_namespace(self.namespace_filter) {
				debug!(
					"Skipped importing {} (outside of namespace filter).",
					type_fqn.as_str().blue()
				);
				continue;
			}

			// Lookup type before we attempt to import it, this is required because `import_jsii_type` is recursive
			// and might have already defined the current type internally
			if self.env.lookup_nested_str(type_fqn.as_str(), true, None).is_ok() {
				debug!("Already imported {}.", type_fqn.as_str().blue());
				continue;
			}

			debug!("Importing {}...", type_fqn.as_str().blue());

			// Import type
			self.import_type(&type_fqn);
		}

		// Create a symbol in the environment for the imported module
		// For example, `bring cloud` will create a symbol named `cloud` in the environment
		// that points to the `@winglang/sdk.cloud` NamespaceRef
		let lookup_str = vec![self.assembly_name.to_string()]
			.iter()
			.chain(self.namespace_filter)
			.map(|x| x.as_str())
			.collect::<Vec<_>>()
			.join(".");
		let ns = self
			.env
			.lookup_nested_mut_str(&lookup_str, true, None)
			.unwrap()
			.as_namespace_ref()
			.unwrap();
		self
			.env
			.define(
				self.identifier,
				SymbolKind::Namespace(ns),
				StatementIdx::Index(self.import_statement_idx),
			)
			.unwrap();
	}
}
