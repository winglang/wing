use std::collections::BTreeMap;

use crate::{
	ast::{AccessModifier, Phase, Symbol},
	debug,
	docs::Docs,
	type_check::{
		self,
		symbol_env::{StatementIdx, SymbolEnvKind},
		Class, FunctionParameter, FunctionSignature, Interface, ResolveSource, Struct, SymbolKind, Type, TypeRef, Types,
		CLASS_INIT_NAME,
	},
	CONSTRUCT_BASE_CLASS, WINGSDK_ASSEMBLY_NAME, WINGSDK_DATETIME, WINGSDK_DURATION, WINGSDK_JSON, WINGSDK_MUT_JSON,
	WINGSDK_REGEX, WINGSDK_RESOURCE,
};
use colored::Colorize;
use indexmap::IndexMap;
use wingii::{
	fqn::FQN,
	jsii::{self, CollectionKind, PrimitiveType, TypeReference},
	type_system::TypeSystem,
};

use super::{
	symbol_env::{LookupResult, SymbolEnv},
	Enum, Namespace,
};

trait JsiiInterface {
	fn methods(&self) -> &Option<Vec<jsii::Method>>;
	fn properties(&self) -> &Option<Vec<jsii::Property>>;
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

#[derive(Debug)]
pub struct JsiiImportSpec {
	/// The assembly to import from the JSII library. This is typically the name of the NPM package.
	pub assembly_name: String,
	/// This is a namespace filter on the imported JSII assembly.
	/// For example:
	/// - ["cloud"] will only (publicly) import types prefixed with `cloud.` from the assembly
	/// - ["ns1", "ns2"] will only import types prefixed with `ns1.ns2.` from the assembly
	/// - [] will import all types from the assembly
	/// Note that other types might be still get implicitly imported
	/// if they are referenced from a type in the specified `module_name`.
	pub namespace_filter: Vec<String>,
	/// The name to assign to the module in the Wing type system.
	pub alias: Symbol,
}

pub struct JsiiImporter<'a> {
	jsii_spec: &'a JsiiImportSpec,

	jsii_types: &'a TypeSystem,

	/// The wing type system: all imported types are added to `wing_types.libraries`.
	wing_types: &'a mut Types,
}

impl<'a> JsiiImporter<'a> {
	pub fn new(jsii_spec: &'a JsiiImportSpec, wing_types: &'a mut Types, jsii_types: &'a TypeSystem) -> Self {
		Self {
			jsii_spec,
			wing_types,
			jsii_types,
		}
	}

	fn type_ref_to_wing_type(&mut self, jsii_type_ref: &TypeReference) -> TypeRef {
		match jsii_type_ref {
			TypeReference::PrimitiveTypeReference(primitive_ref) => match primitive_ref.primitive {
				PrimitiveType::String => self.wing_types.string(),
				PrimitiveType::Number => self.wing_types.number(),
				PrimitiveType::Boolean => self.wing_types.bool(),
				PrimitiveType::Any => self.wing_types.anything(),
				PrimitiveType::Json => self.wing_types.json(),
				PrimitiveType::Date => self.wing_types.anything(), // TODO: https://github.com/winglang/wing/issues/3569
			},
			TypeReference::NamedTypeReference(named_ref) => {
				let type_fqn = &named_ref.fqn;
				if type_fqn == &format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_DURATION) {
					self.wing_types.duration()
				} else if type_fqn == &format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_DATETIME) {
					self.wing_types.datetime()
				} else if type_fqn == &format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_REGEX) {
					self.wing_types.regex()
				} else if type_fqn == &format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_JSON) {
					self.wing_types.json()
				} else if type_fqn == &format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_MUT_JSON) {
					self.wing_types.mut_json()
				} else {
					self.lookup_or_create_type(&FQN::from(type_fqn.as_str()))
				}
			}
			TypeReference::CollectionTypeReference(collection_ref) => {
				let collection_kind = &collection_ref.collection.kind;

				let element_type = &collection_ref.collection.elementtype;

				let wing_type = self.type_ref_to_wing_type(element_type);

				match collection_kind {
					CollectionKind::Array => self.wing_types.add_type(Type::Array(wing_type)),
					CollectionKind::Map => self.wing_types.add_type(Type::Map(wing_type)),
					// set is intentionally left out, since in JSII “collection
					// kind” is only either map or array.
				}
			}
			TypeReference::UnionTypeReference(..) =>
			// Wing does not support union types, so we'll model it the same way as if
			// we saw an "any" in a JSII library
			{
				self.wing_types.anything()
			}
		}
	}

	fn lookup_or_create_type(&mut self, type_fqn: &FQN) -> TypeRef {
		// Check if this type is already imported
		if let LookupResult::Found(t, _) = self.wing_types.libraries.lookup_nested_str(type_fqn.as_str(), None) {
			return t.as_type().expect(&format!("Expected {} to be a type", type_fqn));
		}
		// Define new type and return it
		if let Some(t) = self.import_type(type_fqn) {
			t
		} else {
			panic!("Expected {type_fqn} to be defined")
		}
	}

	pub fn import_type(&mut self, type_fqn: &FQN) -> Option<TypeRef> {
		// check if type is already imported
		if let LookupResult::Found(sym, ..) = self.wing_types.libraries.lookup_nested_str(type_fqn.raw, None) {
			if let SymbolKind::Namespace(n) = sym {
				// We are trying to import a namespace directly, so let's eagerly load all of its types
				self.deep_import_submodule_to_env(Some(n.name.clone()));
				None
			} else {
				sym.as_type()
			}
		} else if let Some(jsii_interface) = self.jsii_types.find_interface(type_fqn) {
			Some(self.import_interface(jsii_interface))
		} else if let Some(jsii_class) = self.jsii_types.find_class(type_fqn) {
			Some(self.import_class(jsii_class))
		} else if let Some(jsii_enum) = self.jsii_types.find_enum(type_fqn) {
			Some(self.import_enum(jsii_enum))
		} else {
			None
		}
	}

	pub fn setup_namespaces_for(&mut self, type_name: &FQN) {
		// First, create a namespace in the Wing type system (if there isn't one already) corresponding to the JSII assembly
		// the type belongs to.
		debug!("Setting up namespaces for {}", type_name);
		let assembly = Symbol::global(type_name.assembly());

		// First, setup the assembly namespace
		if self.wing_types.libraries.lookup(&assembly, None).is_none() {
			let ns_env = self.wing_types.add_symbol_env(SymbolEnv::new(
				None,
				SymbolEnvKind::Scope,
				Phase::Preflight,
				0,
				assembly.name.clone(),
			));
			let ns = self.wing_types.add_namespace(Namespace {
				name: assembly.to_string(),
				envs: vec![ns_env],
				source_package: assembly.name.clone(),
				module_path: ResolveSource::ExternalModule(assembly.name.clone()),
			});
			self
				.wing_types
				.libraries
				.define(
					&assembly,
					SymbolKind::Namespace(ns),
					AccessModifier::Public,
					StatementIdx::Top,
				)
				.unwrap();
		};

		// Next, ensure there is a namespace for each of the namespaces in the type name
		for (ns_idx, namespace_name) in type_name.namespaces().iter().enumerate() {
			let ns_sym = Symbol::global(*namespace_name);
			let mut lookup_vec = vec![assembly.name.as_str()];
			lookup_vec.extend(type_name.namespaces()[..ns_idx].iter());
			let lookup_str = lookup_vec.join(".");

			let mut parent_ns = self
				.wing_types
				.libraries
				.lookup_nested_str_mut(&lookup_str, None)
				.unwrap()
				.0
				.as_namespace_ref()
				.unwrap();

			if parent_ns.envs.get_mut(0).unwrap().lookup_mut(&ns_sym, None).is_none() {
				let ns_env = self.wing_types.add_symbol_env(SymbolEnv::new(
					None,
					SymbolEnvKind::Scope,
					Phase::Preflight,
					0,
					assembly.name.clone(),
				));
				// Special case for the SDK, we are able to alias the namespace
				let module_path = if assembly.name == WINGSDK_ASSEMBLY_NAME {
					format!("{}/{}", lookup_vec.join("/"), namespace_name)
				} else {
					lookup_vec.join("/")
				};

				let ns = self.wing_types.add_namespace(Namespace {
					name: namespace_name.to_string(),
					envs: vec![ns_env],
					source_package: assembly.name.clone(),
					module_path: ResolveSource::ExternalModule(module_path),
				});
				parent_ns
					.envs
					.get_mut(0)
					.unwrap()
					.define(
						&ns_sym,
						SymbolKind::Namespace(ns),
						AccessModifier::Public,
						StatementIdx::Top,
					)
					.unwrap();
			}
		}
	}

	pub fn import_enum(&mut self, jsii_enum: &jsii::EnumType) -> TypeRef {
		let enum_name = &jsii_enum.name;
		let enum_fqn = FQN::from(jsii_enum.fqn.as_str());
		let enum_symbol = Self::jsii_name_to_symbol(enum_name, &jsii_enum.location_in_module);

		let values = jsii_enum
			.members
			.iter()
			.map(|m| {
				(
					Self::jsii_name_to_symbol(&m.name, &jsii_enum.location_in_module),
					m.docs.as_ref().and_then(|d| d.summary.clone()),
				)
			})
			.collect::<IndexMap<_, _>>();

		let enum_type_ref = self.wing_types.add_type(Type::Enum(Enum {
			name: enum_symbol.clone(),
			docs: Docs::from(&jsii_enum.docs),
			values,
		}));

		self.register_jsii_type(&enum_fqn, &enum_symbol, enum_type_ref)
	}

	/// Import a JSII interface as a function instead.
	/// These interfaces must have the @callable annotation and only one method defined, which will be the function signature.
	fn import_closure(&mut self, jsii_interface: &wingii::jsii::InterfaceType) -> TypeRef {
		let jsii_interface_fqn = FQN::from(jsii_interface.fqn.as_str());
		debug!("Importing closure {}", jsii_interface_fqn.as_str().green());

		let type_name = jsii_interface_fqn.type_name();

		// TODO These should technically be "phase independent" by default, but wing currently doesn't have a way to create
		// a phase independent function, so it's more useful to pick one for now.
		let phase = Phase::Preflight;

		let new_type_symbol = Self::jsii_name_to_symbol(&type_name, &jsii_interface.location_in_module);

		let first_method = if let Some(methods) = &jsii_interface.methods {
			if methods.len() != 1 {
				panic!("Expected exactly one method defined in {jsii_interface_fqn} annotated with @callable")
			} else {
				methods.first().unwrap()
			}
		} else {
			panic!("Expected at least one method in {jsii_interface_fqn} annotated with @callable")
		};

		let return_type = if let Some(jsii_return_type) = &first_method.returns {
			self.optional_type_to_wing_type(&jsii_return_type)
		} else {
			self.wing_types.void()
		};
		let parameters: Vec<FunctionParameter> = first_method
			.parameters
			.as_ref()
			.map(|params| {
				params
					.iter()
					.map(|param| FunctionParameter {
						name: param.name.clone(),
						typeref: self.parameter_to_wing_type(&param),
						docs: Docs::from(&param.docs),
						variadic: param.variadic.unwrap_or(false),
					})
					.collect()
			})
			.unwrap_or_default();

		let is_macro = extract_docstring_tag(&first_method.docs, "macro")
			.map(|s| s.to_string())
			.is_some();

		let wing_type = self.wing_types.add_type(Type::Function(FunctionSignature {
			docs: Docs::from(&jsii_interface.docs),
			this_type: None,
			parameters,
			return_type,
			phase,
			js_override: if is_macro {
				Some(format!("__{}_{}", &type_name, &first_method.name))
			} else {
				None
			},
			is_macro,
			implicit_scope_param: false,
		}));

		self.register_jsii_type(&jsii_interface_fqn, &new_type_symbol, wing_type)
	}

	/// Import a JSII interface into the Wing type system.
	///
	/// In JSII an interface can either be a "struct" (for data types) or a "behavioral" interface (for normal
	/// interface types).
	/// A struct's name always starts with "I", it has no methods, and its properties are all readonly.
	/// Structs can be distinguished non-structs with the "datatype: true" property in `jsii::InterfaceType`.
	///
	/// See https://aws.github.io/jsii/specification/2-type-system/#interfaces-structs
	fn import_interface(&mut self, jsii_interface: &wingii::jsii::InterfaceType) -> TypeRef {
		// check if this interface has a `@callable` tag
		if extract_docstring_tag(&jsii_interface.docs, "callable").is_some() {
			return self.import_closure(jsii_interface);
		}

		let jsii_interface_fqn = FQN::from(jsii_interface.fqn.as_str());
		debug!("Importing interface {}", jsii_interface_fqn.as_str().green());

		let type_name = jsii_interface_fqn.type_name();
		let assembly = jsii_interface_fqn.assembly();
		let is_struct = match jsii_interface.datatype {
			Some(true) => {
				// If this datatype has methods something is unexpected in this JSII type definition, skip it.
				if jsii_interface.methods.is_some() && !jsii_interface.methods.as_ref().unwrap().is_empty() {
					panic!("Unexpected - JSII datatype interface {} has methods", type_name);
				}
				true
			}
			_ => false,
		};

		let phase = if is_struct {
			Phase::Independent
		} else {
			if extract_docstring_tag(&jsii_interface.docs, "inflight") == Some("true") {
				Phase::Inflight
			} else {
				Phase::Preflight
			}
		};

		let new_type_symbol = Self::jsii_name_to_symbol(&type_name, &jsii_interface.location_in_module);
		let mut wing_type = match is_struct {
			true => self.wing_types.add_type(Type::Struct(Struct {
				name: new_type_symbol.clone(),
				fqn: Some(jsii_interface_fqn.to_string()),
				// Will be replaced below
				extends: vec![],
				docs: Docs::from(&jsii_interface.docs),
				// Will be replaced below
				env: SymbolEnv::new(
					None,
					SymbolEnvKind::Type(self.wing_types.void()),
					Phase::Independent, // structs are phase-independent
					0,
					assembly.to_string(),
				),
			})),
			false => self.wing_types.add_type(Type::Interface(Interface {
				name: new_type_symbol.clone(),
				fqn: Some(jsii_interface_fqn.to_string()),
				// Will be replaced below
				extends: vec![],
				docs: Docs::from(&jsii_interface.docs),
				// Will be replaced below
				env: SymbolEnv::new(
					None,
					SymbolEnvKind::Type(self.wing_types.void()),
					phase,
					0,
					assembly.to_string(),
				),
				phase,
			})),
		};

		self.register_jsii_type(&jsii_interface_fqn, &new_type_symbol, wing_type);

		if let Some(interfaces) = &jsii_interface.interfaces {
			if let Type::Struct(Struct { ref mut extends, .. }) | Type::Interface(Interface { ref mut extends, .. }) =
				*wing_type
			{
				*extends = interfaces
					.iter()
					.map(|fqn| self.lookup_or_create_type(&FQN::from(fqn.as_str())))
					.collect::<Vec<_>>()
			}
		};

		let mut iface_env = SymbolEnv::new(None, SymbolEnvKind::Type(wing_type), phase, 0, assembly.to_string());
		iface_env.type_parameters = self.type_param_from_docs(&jsii_interface_fqn, &jsii_interface.docs);

		self.add_members_to_class_env(
			jsii_interface,
			Phase::Inflight,
			iface_env.phase,
			&mut iface_env,
			wing_type,
		);

		// Add properties from our parents to the new structs env
		if is_struct {
			type_check::add_parent_members_to_struct_env(
				&wing_type.as_struct().expect("Expected struct").extends,
				&new_type_symbol,
				&mut iface_env,
			)
			.expect(&format!(
				"Invalid JSII library: failed to add parent members to struct {}",
				type_name
			));
		}
		// Add inflight methods from any docstring-linked interfaces to the new interface's env
		// For example, `IBucket` could contain all of the preflight methods of a bucket, and
		// contain docstring tag of "@inflight IBucketClient" where `IBucketClient` is an interface
		// that contains all of the inflight methods of a bucket.
		else {
			type_check::add_parent_members_to_iface_env(
				&wing_type.as_interface().expect("Expected interface").extends,
				&new_type_symbol,
				&mut iface_env,
			)
			.expect(&format!(
				"Invalid JSII library: failed to add parent members to struct {}",
				type_name
			));

			// Look for a client interface for this resource
			self.add_inflight_client(&mut wing_type, &mut iface_env, &jsii_interface.docs);
		}

		// Replace the dummy struct environment with the real one after adding all properties
		match *wing_type {
			Type::Struct(Struct { ref mut env, .. }) | Type::Interface(Interface { ref mut env, .. }) => *env = iface_env,
			_ => panic!("Expected {} to be an interface or struct", type_name),
		};
		wing_type
	}

	fn add_inflight_client(
		&mut self,
		wing_type: &mut TypeRef,
		original_env: &mut SymbolEnv,
		docs: &Option<wingii::jsii::Docs>,
	) {
		// Look for a client interface for this resource
		let inflight_tag: Option<&str> = extract_docstring_tag(docs, "inflight");

		if inflight_tag == Some("true") {
			debug!("{wing_type} does not seem to have an inflight client");
			return;
		}

		let client_interface = inflight_tag.map(|fqn| {
			// Some fully qualified package names include "@" characters,
			// so they have to be escaped in the original docstring.
			FQN::from(if fqn.starts_with("`") && fqn.ends_with("`") {
				&fqn[1..fqn.len() - 1]
			} else {
				fqn
			})
		});

		if let Some(client_interface) = client_interface {
			let client_interface = self.lookup_or_create_type(&client_interface);

			// Manually add the client interface's methods to the class environment (because this type does not *actually* implement it)
			for client_interface_data in client_interface.as_env().unwrap().iter(true) {
				if let SymbolKind::Variable(vvv) = client_interface_data.1 {
					let _ = original_env.define(
						&Symbol {
							name: client_interface_data.0.clone(),
							span: client_interface_data.2.span.clone(),
						},
						SymbolKind::Variable(vvv.clone()),
						AccessModifier::Public,
						StatementIdx::Top,
					);
				}
			}
		} else {
			debug!("{wing_type} does not seem to have an inflight client");
		}
	}

	fn add_members_to_class_env<T: JsiiInterface>(
		&mut self,
		jsii_interface: &T,
		class_phase: Phase,
		member_phase: Phase,
		class_env: &mut SymbolEnv,
		wing_type: TypeRef,
	) {
		assert!(!(class_phase == Phase::Preflight) || member_phase == Phase::Preflight);

		// Add methods to the class environment
		if let Some(methods) = &jsii_interface.methods() {
			for m in methods {
				// TODO: skip internal methods (for now we skip `capture` until we mark it as internal)
				if class_phase == Phase::Preflight && m.name == "capture" {
					debug!("Skipping capture method on resource");
					continue;
				}

				let is_static = if let Some(true) = m.static_ { true } else { false };

				debug!("Adding method {} to class", m.name.green());

				let return_type = if let Some(jsii_return_type) = &m.returns {
					self.optional_type_to_wing_type(&jsii_return_type)
				} else {
					self.wing_types.void()
				};

				// Check if there's an explicit inflight phase override on this method
				let member_phase = extract_docstring_tag(&m.docs, "inflight")
					.map(|_| Phase::Inflight)
					.unwrap_or(member_phase);

				let mut fn_params = vec![];

				// Define the rest of the arguments and create the method signature
				if let Some(params) = &m.parameters {
					for param in params {
						fn_params.push(FunctionParameter {
							name: param.name.clone(),
							typeref: self.parameter_to_wing_type(&param),
							docs: Docs::from(&param.docs),
							variadic: param.variadic.unwrap_or(false),
						});
					}
				}

				let is_macro = extract_docstring_tag(&m.docs, "macro").map(|s| s.to_string()).is_some();

				let this_type = if is_static { None } else { Some(wing_type) };
				let method_sig = self.wing_types.add_type(Type::Function(FunctionSignature {
					docs: Docs::from(&m.docs),
					this_type,
					parameters: fn_params,
					return_type,
					phase: member_phase,
					js_override: if is_macro {
						Some(format!("__{}_{}", &wing_type, &m.name))
					} else {
						None
					},
					is_macro,
					implicit_scope_param: false,
				}));
				let sym = Self::jsii_name_to_symbol(&m.name, &m.location_in_module);
				let access_modifier = if matches!(m.protected, Some(true)) {
					AccessModifier::Protected
				} else {
					AccessModifier::Public
				};
				class_env
					.define(
						&sym,
						SymbolKind::make_member_variable(
							sym.clone(),
							method_sig,
							false,
							is_static,
							member_phase,
							access_modifier,
							Some(Docs::from(&m.docs)),
						),
						access_modifier,
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
				let base_wing_type = self.type_ref_to_wing_type(&p.type_);
				let is_optional = if let Some(true) = p.optional { true } else { false };
				let is_static = if let Some(true) = p.static_ { true } else { false };

				let wing_type = if is_optional {
					// TODO Will this create a bunch of duplicate types?
					self.wing_types.add_type(Type::Optional(base_wing_type))
				} else {
					base_wing_type
				};

				let sym = Self::jsii_name_to_symbol(&p.name, &p.location_in_module);
				let access_modifier = if matches!(p.protected, Some(true)) {
					AccessModifier::Protected
				} else {
					AccessModifier::Public
				};
				class_env
					.define(
						&sym,
						SymbolKind::make_member_variable(
							sym.clone(),
							wing_type,
							!matches!(p.immutable, Some(true)),
							is_static,
							member_phase,
							access_modifier,
							Some(Docs::from(&p.docs)),
						),
						access_modifier,
						StatementIdx::Top,
					)
					.expect(&format!(
						"Invalid JSII library: failed to add property {} to class",
						p.name
					));
			}
		}
	}

	fn jsii_name_to_symbol(name: &str, _jsii_source_location: &Option<jsii::SourceLocation>) -> Symbol {
		// JSII source location is not used right now since it doesn't necessarily map to a file on the user's disk
		// (the JSII library might include .js files but not the original .ts files)
		// if this information is useful, we could consider changing `Span` or `Symbol` to
		// model whether or not the span represents a file on disk that we can read.
		Symbol {
			name: name.to_string(),
			span: Default::default(),
		}
	}

	fn type_param_from_docs(&mut self, fqn: &FQN, docs: &Option<jsii::Docs>) -> Option<Vec<TypeRef>> {
		docs.as_ref().and_then(|d| {
			d.custom.as_ref().and_then(|c| {
				c.get("typeparam").map(|type_param_name| {
					let args = type_param_name.split(",").map(|s| s.trim()).collect::<Vec<&str>>();
					args
						.iter()
						.map(|a| {
							self.lookup_or_create_type(&FQN::from(format!("{}.{}", fqn.as_str_without_type_name(), a).as_str()))
						})
						.collect::<Vec<_>>()
				})
			})
		})
	}

	fn import_class(&mut self, jsii_class: &'a wingii::jsii::ClassType) -> TypeRef {
		let mut class_phase = if is_construct_base(&jsii_class.fqn) {
			Phase::Preflight
		} else {
			Phase::Independent
		};

		let jsii_class_fqn = FQN::from(jsii_class.fqn.as_str());
		debug!("Importing class {}", jsii_class_fqn.as_str().green());
		let type_name = jsii_class_fqn.type_name();
		let assembly = jsii_class_fqn.assembly();

		// Get the base class of the JSII class, define it via recursive call if it's not define yet
		let base_class_type = if let Some(base_class_fqn) = &jsii_class.base {
			let base_class_fqn = FQN::from(base_class_fqn.as_str());
			let base_class_name = base_class_fqn.type_name();
			let base_class_type = if let LookupResult::Found(base_class_type, _) = self
				.wing_types
				.libraries
				.lookup_nested_str(base_class_fqn.as_str(), None)
			{
				base_class_type
					.as_type()
					.expect("Base class name found but it's not a type")
			} else {
				// If the base class isn't defined yet then define it first (recursive call)
				self.import_type(&base_class_fqn);
				self
					.wing_types
					.libraries
					.lookup_nested_str(&base_class_fqn.as_str(), None)
					.expect(&format!(
						"Failed to define base class {} of {}",
						base_class_name, type_name
					))
					.0
					.as_type()
					.unwrap()
			};

			// Validate the base class is either a class or a resource
			if base_class_type.as_class().is_none() {
				panic!("Base class {} of {} is not a resource", base_class_name, type_name);
			}
			Some(base_class_type)
		} else {
			None
		};

		// Get env of base class/resource
		let base_class_env = if let Some(base_class_type) = base_class_type {
			let base_class = base_class_type.as_class().expect(&format!(
				"Base class {} of {} is not a class",
				base_class_type, type_name
			));
			class_phase = base_class.phase;
			Some(base_class.env.get_ref())
		} else {
			None
		};

		let member_phase = if class_phase == Phase::Preflight {
			Phase::Preflight
		} else {
			Phase::Independent
		};

		// Create environment representing this class, for now it'll be empty just so we can support referencing ourselves from the class definition.
		let dummy_env = SymbolEnv::new(
			None,
			SymbolEnvKind::Type(self.wing_types.void()),
			class_phase,
			0,
			assembly.to_string(),
		);
		let new_type_symbol = Self::jsii_name_to_symbol(type_name, &jsii_class.location_in_module);
		// Create the new resource/class type and add it to the current environment.
		// When adding the class methods below we'll be able to reference this type.
		debug!("Adding type {} to namespace", type_name.green());

		let class_spec = Class {
			name: new_type_symbol.clone(),
			env: dummy_env,
			fqn: Some(jsii_class_fqn.to_string()),
			parent: base_class_type,
			// Will be replaced below
			implements: vec![],
			is_abstract: jsii_class.abstract_.unwrap_or(false),
			phase: class_phase,
			defined_in_phase: Phase::Preflight,
			docs: Docs::from(&jsii_class.docs),
			std_construct_args: false, // Temporary value, will be updated once we parse the initializer args
			lifts: None,

			// uid is used to create unique names class types so we can access the correct type regardless of type name shadowing,
			// this isn't relevant for imported types (that aren't code generated), so we can default to 0
			uid: 0,
		};
		let mut new_type = self.wing_types.add_type(Type::Class(class_spec));
		self.register_jsii_type(&jsii_class_fqn, &new_type_symbol, new_type);

		if let Some(interface_fqns) = &jsii_class.interfaces {
			// mutate the class's implements field to point to the actual interfaces
			let mut_type = new_type.as_class_mut().unwrap();
			mut_type.implements = interface_fqns
				.iter()
				.map(|i| {
					let fqn = FQN::from(i.as_str());
					self.lookup_or_create_type(&fqn)
				})
				.collect::<Vec<_>>()
		};

		// Create class's actual environment before we add properties and methods to it
		let mut class_env = SymbolEnv::new(
			base_class_env,
			SymbolEnvKind::Type(new_type),
			class_phase,
			0,
			assembly.to_string(),
		);
		class_env.type_parameters = self.type_param_from_docs(&jsii_class_fqn, &jsii_class.docs);

		// Add the class's constructor to the class environment, if the class has one which is public
		let jsii_initializer = jsii_class.initializer.as_ref();
		if let Some(initializer) = jsii_initializer {
			let mut fn_params = vec![];
			if let Some(params) = &initializer.parameters {
				let mut params_iter = params.iter();

				// If this is a preflight class then we need to verify its first two args (scope and id):
				// If both exist and are of a preflight class type and string type respectively then this is a standard constrcut type
				// otherwise we need to mark it as having non standard constructor args meaning we can't use the `as` `in` keywords
				// when instantiating it.
				if class_phase == Phase::Preflight {
					let scope_arg = params.get(0);
					let id_arg = params.get(1);
					if let (Some(scope_arg), Some(id_arg)) = (scope_arg, id_arg) {
						let scope_arg_type = self.type_ref_to_wing_type(&scope_arg.type_);
						let id_arg_type = self.type_ref_to_wing_type(&id_arg.type_);
						// If scope is a preflight class, id is a string and both are non variadic non optionals types then this is a standard construct type
						if scope_arg.name == "scope"
							&& id_arg.name == "id"
							&& scope_arg_type.is_preflight_class()
							&& id_arg_type.is_string()
							&& !scope_arg.variadic.unwrap_or(false)
							&& !scope_arg.optional.unwrap_or(false)
							&& !id_arg.variadic.unwrap_or(false)
							&& !id_arg.optional.unwrap_or(false)
						{
							new_type.as_class_mut().unwrap().std_construct_args = true;
							params_iter.next();
							params_iter.next();
						}
					}
				}

				for param in params_iter {
					fn_params.push(FunctionParameter {
						name: param.name.clone(),
						typeref: self.parameter_to_wing_type(&param),
						docs: Docs::from(&param.docs),
						variadic: param.variadic.unwrap_or(false),
					});
				}
			}
			let method_sig = self.wing_types.add_type(Type::Function(FunctionSignature {
				this_type: None, // Initializers are considered static so they have no `this_type`
				parameters: fn_params,
				return_type: new_type,
				phase: member_phase,
				js_override: None,
				is_macro: false,
				docs: Docs::from(&initializer.docs),
				implicit_scope_param: false,
			}));
			let sym = Self::jsii_name_to_symbol(CLASS_INIT_NAME, &initializer.location_in_module);
			let access_modifier = if matches!(initializer.protected, Some(true)) {
				AccessModifier::Protected
			} else {
				AccessModifier::Public
			};
			if let Err(e) = class_env.define(
				&sym,
				SymbolKind::make_member_variable(
					sym.clone(),
					method_sig,
					false,
					true,
					member_phase,
					access_modifier,
					Some(Docs::from(&initializer.docs)),
				),
				access_modifier,
				StatementIdx::Top,
			) {
				panic!("Invalid JSII library, failed to define {}'s init: {}", type_name, e)
			}
		}

		// Add methods and properties to the class environment
		self.add_members_to_class_env(jsii_class, class_phase, member_phase, &mut class_env, new_type);
		if class_phase == Phase::Preflight {
			// Look for a client interface for this resource
			self.add_inflight_client(&mut new_type, &mut class_env, &jsii_class.docs);
		}

		// Replace the dummy class environment with the real one before type checking the methods
		match *new_type {
			Type::Class(ref mut class) => {
				class.env = class_env;
			}
			_ => panic!("Expected {} to be a class or resource ", type_name),
		};
		new_type
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

	fn parameter_to_wing_type(&mut self, parameter: &jsii::Parameter) -> TypeRef {
		let mut param_type = self.type_ref_to_wing_type(&parameter.type_);

		if parameter.variadic.unwrap_or(false) {
			param_type = self.wing_types.add_type(Type::Array(param_type));
		}

		if parameter.optional.unwrap_or(false) {
			param_type = self.wing_types.add_type(Type::Optional(param_type));
		}

		param_type
	}

	/// Imports all types within a given submodule
	pub fn deep_import_submodule_to_env(&mut self, submodule: Option<String>) {
		let prefix = submodule.map(|s| format!("{}.{s}", self.jsii_spec.assembly_name));
		for entry in self
			.jsii_types
			.find_assembly(&self.jsii_spec.assembly_name)
			.unwrap()
			.types
			.as_ref()
			.unwrap()
			.iter()
			.map(|(k, v)| (FQN::from(k.as_str()), v))
			.skip_while(|e| !e.0.has_prefix(&prefix))
		{
			if entry.0.has_prefix(&prefix) {
				self.import_type(&entry.0);
			} else {
				// the types should be well ordered, so we can break early
				break;
			}
		}
	}

	/// Import all top-level types that are not in a submodule
	pub fn import_root_types(&mut self) {
		let assembly = self.jsii_types.find_assembly(&self.jsii_spec.assembly_name).unwrap();
		let mut last_inner_namespace: Option<FQN> = None;
		for entry in assembly.types.as_ref().unwrap().iter() {
			let ns = match entry.1 {
				jsii::Type::ClassType(c) => &c.namespace,
				jsii::Type::EnumType(e) => &e.namespace,
				jsii::Type::InterfaceType(i) => &i.namespace,
			};
			let fqn = FQN::from(entry.0.as_str());

			if let Some(ns) = ns {
				if let Some(ref last_inner_namespace) = last_inner_namespace {
					// If the namespace is within the last imported type (not namespace), we should consider it a top-level type
					if ns == last_inner_namespace.type_name() {
						self.import_type(&fqn);
						continue;
					}
				}
				// the types should be well ordered, so we can break early
				break;
			}
			self.import_type(&fqn);
			last_inner_namespace = Some(fqn)
		}
	}

	/// Imports submodules of the assembly, preparing each as an available namespace
	pub fn import_submodules_to_env(&mut self, env: &mut SymbolEnv) {
		let assembly = self
			.jsii_types
			.find_assembly(&self.jsii_spec.assembly_name)
			.expect("Assembly not found");
		if let Some(submodules) = assembly.submodules.as_ref() {
			for type_fqn in submodules.keys() {
				let fake_type = format!("{}.{}", type_fqn, "x");
				let type_fqn = FQN::from(fake_type.as_str());

				// Skip types outside the imported namespace
				if !type_fqn.is_in_namespace(self.jsii_spec.namespace_filter.as_slice()) {
					debug!(
						"Skipped importing {} (outside of namespace filter).",
						type_fqn.as_str().blue()
					);
					continue;
				}

				// Import type
				self.setup_namespaces_for(&type_fqn);
			}
		} else {
			// No submodules, so lets manually setup a root namespace for the module

			// if the "libraries" environment already contains a namespace for this assembly
			// we can skip this step
			if self
				.wing_types
				.libraries
				.lookup(&assembly.name.as_str().into(), None)
				.is_none()
			{
				let ns_env = self.wing_types.add_symbol_env(SymbolEnv::new(
					None,
					SymbolEnvKind::Scope,
					Phase::Preflight,
					0,
					assembly.name.clone(),
				));
				let ns = self.wing_types.add_namespace(Namespace {
					name: assembly.name.clone(),
					envs: vec![ns_env],
					source_package: assembly.name.clone(),
					module_path: ResolveSource::ExternalModule(assembly.name.clone()),
				});
				self
					.wing_types
					.libraries
					.define(
						&Symbol::global(assembly.name.clone()),
						SymbolKind::Namespace(ns),
						AccessModifier::Public,
						StatementIdx::Top,
					)
					.expect("Failed to define jsii root namespace");
			}
		}

		// Create a symbol in the environment for the imported module
		// For example, `bring cloud` will create a symbol named `cloud` in the environment
		// that points to the `@winglang/sdk.cloud` NamespaceRef
		let lookup_str = vec![self.jsii_spec.assembly_name.to_string()]
			.iter()
			.chain(self.jsii_spec.namespace_filter.iter())
			.map(|x| x.as_str())
			.collect::<Vec<_>>()
			.join(".");
		let ns = self
			.wing_types
			.libraries
			.lookup_nested_str_mut(&lookup_str, None)
			.unwrap()
			.0
			.as_namespace_ref()
			.unwrap();

		env
			.define(
				&self.jsii_spec.alias,
				SymbolKind::Namespace(ns),
				AccessModifier::Private,
				StatementIdx::Top,
			)
			.unwrap();
	}

	fn register_jsii_type(&mut self, fqn: &FQN, symbol: &Symbol, type_ref: TypeRef) -> TypeRef {
		// make this function idempotent
		if matches!(
			self.wing_types.libraries.lookup_nested_str(fqn.as_str(), None),
			LookupResult::Found(..)
		) {
			return type_ref;
		}

		let parent_fqn = fqn.as_str_without_type_name();

		// make sure we have the namespaces loaded
		if !matches!(
			self.wing_types.libraries.lookup_nested_str(parent_fqn, None),
			LookupResult::Found(..)
		) {
			if fqn.namespaces().len() == 0 {
				self.setup_namespaces_for(&fqn)
			} else {
				// load as type first in case it's a class instead of namespace
				self.import_type(&FQN::from(parent_fqn));
				self.setup_namespaces_for(&fqn)
			}
		}

		let tt = self
			.wing_types
			.libraries
			.lookup_nested_str_mut(parent_fqn, None)
			.unwrap()
			.0;
		if let Some(mut ns) = tt.as_namespace_ref() {
			ns.envs
				.get_mut(0)
				.unwrap()
				.define(
					&symbol,
					SymbolKind::Type(type_ref),
					AccessModifier::Public,
					StatementIdx::Top,
				)
				.expect(&format!("Invalid JSII library: failed to define type {}", fqn));
		} else if let Some(t) = tt.as_type() {
			if t.as_env().is_none() {
				panic!("Invalid JSII library: '{}' Is not a valid class", fqn);
			}
		} else {
			panic!("Invalid JSII library: '{}' Is not a valid class or namespace", fqn);
		}
		type_ref
	}
}

fn extract_docstring_tag<'a>(docs: &'a Option<jsii::Docs>, arg: &str) -> Option<&'a str> {
	docs.as_ref().and_then(|docs| {
		docs
			.custom
			.as_ref()
			.and_then(|custom| custom.get(arg).map(|s| s.as_str()))
	})
}

/// Returns true if the FQN represents a "construct base class".
///
/// TODO: this is a temporary hack until we support interfaces.
pub fn is_construct_base(fqn: &str) -> bool {
	// We treat both CONSTRUCT_BASE_CLASS and WINGSDK_RESOURCE, as base constructs because in wingsdk we currently have stuff directly derived
	// from `construct.Construct` and stuff derived `std.Resource` (which itself is derived from `constructs.Construct`).
	// But since we don't support interfaces yet we can't import `std.Resource` so we just treat it as a base class.
	// I'm also not sure we should ever import `std.Resource` because we might want to keep its internals hidden to the user:
	// after all it's an abstract class representing our `resource` primitive. See https://github.com/winglang/wing/issues/261.
	fqn == &format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE) || fqn == CONSTRUCT_BASE_CLASS
}

impl From<&Option<jsii::Docs>> for Docs {
	fn from(value: &Option<jsii::Docs>) -> Self {
		let Some(docs) = value else { return Docs::default() };

		Docs {
			custom: docs.custom.as_ref().unwrap_or(&BTreeMap::default()).clone(),
			remarks: docs.remarks.clone(),
			summary: docs.summary.clone(),
			default: docs.default.clone(),
			deprecated: docs.deprecated.clone(),
			example: docs.example.clone(),
			see: docs.see.clone(),
			returns: docs.returns.clone(),
			stability: docs.stability.clone(),
			subclassable: docs.subclassable,
		}
	}
}

#[test]
fn test_fqn_is_construct_base() {
	assert_eq!(is_construct_base(CONSTRUCT_BASE_CLASS), true);
	assert_eq!(
		is_construct_base(format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE).as_str()),
		true
	);
	assert_eq!(is_construct_base("@winglang/sdk.cloud.Bucket"), false);
}
