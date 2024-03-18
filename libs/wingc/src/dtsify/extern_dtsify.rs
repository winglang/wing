use std::collections::HashMap;

use camino::Utf8PathBuf;
use const_format::formatcp;
use itertools::Itertools;

use crate::{
	ast::{AccessModifier, Phase},
	dtsify::{ignore_member_phase, TYPE_INFLIGHT_POSTFIX},
	files::{update_file, FilesError},
	jsify::codemaker::CodeMaker,
	type_check::*,
	SymbolEnv, WINGSDK_ASSEMBLY_NAME, WINGSDK_DURATION,
};

const DURATION_FQN: &str = formatcp!("{WINGSDK_ASSEMBLY_NAME}.{WINGSDK_DURATION}");

/// Generates a self-contained .d.ts file for a given extern file.
pub struct ExternDTSifier<'a> {
	libraries: &'a SymbolEnv,
	extern_file: &'a Utf8PathBuf,
	extern_file_env: &'a SymbolEnvOrNamespace,
	/// The type information for any named types seen along the way that need to be hoisted to the top of the file
	hoisted_types: CodeMaker,
	/// Named types ecountered so far that have been hoisted.
	/// The key is a psuedo-FQN and the value is the actual name to use in the .d.ts file. This name is based on name_counter since there may be duplicates.
	known_types: HashMap<String, String>,
	/// Because all types will be in the same namespace, if you types have the same name this map will be used to disambiguate them by incrementing the counter.
	name_counter: HashMap<String, usize>,
}

/// Checks if given file has a valid extension to be considered an extern file
pub fn is_extern_file(file: &Utf8PathBuf) -> bool {
	if let Some(ext) = file.extension() {
		match ext {
			"js" | "cjs" | "mjs" | "jsx" | "ts" | "cts" | "mts" | "tsx" => true,
			_ => false,
		}
	} else {
		false
	}
}

impl<'a> ExternDTSifier<'a> {
	pub fn new(
		extern_file: &'a Utf8PathBuf,
		extern_file_env: &'a SymbolEnvOrNamespace,
		libraries: &'a SymbolEnv,
	) -> Self {
		Self {
			libraries,
			extern_file,
			extern_file_env,
			known_types: HashMap::new(),
			name_counter: HashMap::new(),
			hoisted_types: CodeMaker::default(),
		}
	}

	pub fn dtsify(&mut self) -> Result<(), FilesError> {
		let mut dts = CodeMaker::default();
		dts.open("export default interface extern {");

		if let SymbolEnvOrNamespace::SymbolEnv(extern_env) = self.extern_file_env {
			for env_entry in extern_env.iter(false) {
				if let Some(variable_info) = env_entry.1.as_variable() {
					let sym_type = variable_info.type_;
					let func_phase = sym_type.as_function_sig().unwrap().phase;

					let type_string = self.dtsify_type(sym_type, matches!(func_phase, Phase::Inflight));
					dts.line(format!("{}: {},", env_entry.0, type_string));
				}
			}
		}
		dts.close("}");

		// add all the known types we found
		dts.line(self.hoisted_types.to_string());

		let dts_filename = self.extern_file.with_extension("extern.d.ts");

		update_file(&dts_filename, &dts.to_string())
	}

	fn dtsify_type(&mut self, type_: TypeRef, is_inflight: bool) -> String {
		match &*type_ {
			Type::Anything => "any".to_string(),
			Type::Number => "number".to_string(),
			Type::String => "string".to_string(),
			Type::Boolean => "boolean".to_string(),
			Type::Void => "void".to_string(),
			Type::Nil => "undefined".to_string(),
			Type::Json(_) => "Readonly<any>".to_string(),
			Type::MutJson => "any".to_string(),
			Type::Duration => {
				let duration_type = self
					.libraries
					.lookup_nested_str(DURATION_FQN, None)
					.unwrap()
					.0
					.as_type()
					.unwrap();
				self.dtsify_type(duration_type, false)
			}
			Type::Optional(t) => format!("({}) | undefined", self.dtsify_type(*t, is_inflight)),
			Type::Array(t) => format!("(readonly ({})[])", self.dtsify_type(*t, is_inflight)),
			Type::MutArray(t) => format!("({})[]", self.dtsify_type(*t, is_inflight)),
			Type::Map(t) => format!("Readonly<Record<string, {}>>", self.dtsify_type(*t, is_inflight)),
			Type::MutMap(t) => format!("Record<string, {}>", self.dtsify_type(*t, is_inflight)),
			Type::Set(t) => format!("Readonly<Set<{}>>", self.dtsify_type(*t, is_inflight)),
			Type::MutSet(t) => format!("Set<{}>", self.dtsify_type(*t, is_inflight)),
			Type::Function(f) => self.dtsify_function_signature(&f, is_inflight),
			Type::Class(_) | Type::Interface(_) | Type::Struct(_) | Type::Enum(_) => {
				self.resolve_named_type(type_, is_inflight)
			}
			Type::Inferred(_) | Type::Unresolved => {
				panic!("Extern must use resolved types")
			}
		}
	}

	fn resolve_named_type(&mut self, type_: TypeRef, is_inflight: bool) -> String {
		let fqn = match &*type_ {
			Type::Class(c) => c.fqn.as_ref().unwrap_or(&c.name.span.file_id),
			Type::Interface(i) => i.fqn.as_ref().unwrap_or(&i.name.span.file_id),
			Type::Struct(s) => s.fqn.as_ref().unwrap_or(&s.name.span.file_id),
			Type::Enum(e) => &e.name.span.file_id,
			_ => panic!("Not a named type"),
		};
		let base_name = match &*type_ {
			Type::Class(c) => {
				if is_inflight {
					format!("{}{}", c.name.name, TYPE_INFLIGHT_POSTFIX)
				} else {
					c.name.name.clone()
				}
			}
			Type::Interface(i) => {
				if is_inflight {
					format!("{}{}", i.name.name, TYPE_INFLIGHT_POSTFIX)
				} else {
					i.name.name.clone()
				}
			}
			Type::Struct(s) => s.name.name.clone(),
			Type::Enum(e) => e.name.name.clone(),
			_ => panic!("Not a named type"),
		};
		let type_key = format!("{fqn}|{base_name}");

		if let Some(name) = self.known_types.get(&type_key) {
			name.clone()
		} else {
			let name_counter = self.name_counter.get(&base_name).unwrap_or(&0);
			let name = if *name_counter == 0 {
				base_name.to_string()
			} else {
				format!("{base_name}{name_counter}")
			};

			self.name_counter.insert(base_name, name_counter + 1);
			self.known_types.insert(type_key, name.clone());

			let type_code = match &*type_ {
				Type::Class(c) => self.dtsify_class(c, is_inflight),
				Type::Interface(i) => self.dtsify_interface(i, is_inflight),
				Type::Struct(s) => self.dtsify_struct(s),
				Type::Enum(e) => self.dtsify_enum(e),
				_ => panic!("Not a named type"),
			};
			self.hoisted_types.line(type_code);

			name
		}
	}

	fn dtsify_function_signature(&mut self, f: &FunctionSignature, is_inflight: bool) -> String {
		let args = self.dtsify_parameters(&f.parameters, is_inflight);

		let is_inflight = matches!(f.phase, Phase::Inflight);

		let return_type = self.dtsify_type(f.return_type, is_inflight);
		let return_type = if is_inflight {
			format!("Promise<{return_type}>")
		} else {
			return_type
		};

		format!("({args}) => {return_type}")
	}

	fn dtsify_enum(&mut self, enum_: &Enum) -> CodeMaker {
		let mut code = CodeMaker::default();

		if let Some(docs) = &enum_.docs.as_jsdoc_comment() {
			code.line(docs);
		}
		code.open(format!("export enum {} {{", enum_.name.name));

		for (i, variant) in enum_.values.iter().enumerate() {
			code.line(format!("{variant} = {i},"));
		}

		code.close("}");

		code
	}

	fn dtsify_struct(&mut self, struct_: &Struct) -> CodeMaker {
		let mut code = CodeMaker::default();
		if let Some(docs) = &struct_.docs.as_jsdoc_comment() {
			code.line(docs);
		}
		code.open(format!("export interface {} {{", struct_.name.name));

		code.line(self.dtsify_inner_classlike(struct_, false));

		code.close("}");

		code
	}

	fn dtsify_interface(&mut self, interface: &Interface, is_inflight: bool) -> CodeMaker {
		let mut code = CodeMaker::default();
		let interface_name = if is_inflight {
			format!("{}{TYPE_INFLIGHT_POSTFIX}", &interface.name.name)
		} else {
			interface.name.name.to_string()
		};

		if let Some(docs) = &interface.docs.as_jsdoc_comment() {
			code.line(docs);
		}
		code.line(format!("export interface {interface_name}"));
		if !interface.extends.is_empty() {
			code.append(" extends ");
			code.append(
				&interface
					.extends
					.iter()
					.map(|udt| self.dtsify_type(*udt, is_inflight))
					.join(", "),
			);
		}

		code.append(" {");
		code.indent();

		code.line(self.dtsify_inner_classlike(interface, is_inflight));

		code.close("}");

		code
	}

	fn dtsify_class(&mut self, class: &Class, is_inflight: bool) -> CodeMaker {
		let mut code = CodeMaker::default();
		let class_name = if is_inflight {
			format!("{}{TYPE_INFLIGHT_POSTFIX}", class.name)
		} else {
			class.name.name.to_string()
		};

		if let Some(docs) = &class.docs.as_jsdoc_comment() {
			code.line(docs);
		}
		code.line(format!("export class {class_name}"));
		if let Some(parent) = &class.parent {
			code.append(" extends ");
			code.append(self.dtsify_type(*parent, is_inflight));
		}

		if !class.implements.is_empty() {
			code.append(" implements ");
			code.append(
				&class
					.implements
					.iter()
					.map(|udt| self.dtsify_type(*udt, is_inflight))
					.join(", "),
			);
		}

		code.append(" {");
		code.indent();

		code.line(self.dtsify_inner_classlike(class, is_inflight));

		code.close("}");
		code
	}

	fn dtsify_parameters(&mut self, arg_list: &Vec<FunctionParameter>, is_inflight: bool) -> String {
		let mut args = vec![];

		for (i, arg) in arg_list.iter().enumerate() {
			let arg_name = if arg.name.is_empty() {
				// function type annotations don't always have names
				format!("arg{}", i)
			} else {
				arg.name.clone()
			};

			args.push(format!(
				"{arg_name}{}: {}",
				if arg.typeref.is_option() { "?" } else { "" },
				self.dtsify_type(arg.typeref, is_inflight)
			));
		}
		args.join(", ")
	}

	fn dtsify_inner_classlike(&mut self, classlike: &impl ClassLike, is_inflight: bool) -> CodeMaker {
		let mut code = CodeMaker::default();
		for member_var in classlike.get_env().iter(false).filter_map(|(_, kind, lookup)| {
			if lookup.init || !matches!(lookup.access, AccessModifier::Public) {
				return None;
			}

			let variable = kind.as_variable()?;

			if let Some(sig) = variable.type_.as_function_sig() {
				if ignore_member_phase(sig.phase, is_inflight) {
					return None;
				}
			} else {
				if ignore_member_phase(variable.phase, is_inflight) {
					return None;
				}
			}

			if variable.kind != VariableKind::InstanceMember {
				None
			} else {
				Some(variable)
			}
		}) {
			if let Some(docs) = member_var.docs.as_ref().and_then(|d| d.as_jsdoc_comment()) {
				code.line(docs);
			}
			code.line(format!(
				"{}{}{}: {};",
				if member_var.reassignable { "" } else { "readonly " },
				member_var.name,
				if member_var.type_.is_option() { "?" } else { "" },
				self.dtsify_type(member_var.type_, is_inflight)
			));
		}
		code
	}
}
