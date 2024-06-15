use std::cell::RefCell;

use camino::{Utf8Path, Utf8PathBuf};
use indexmap::IndexMap;
use itertools::Itertools;

use crate::{
	ast::*, diagnostic::report_diagnostic, file_graph::FileGraph, files::Files, jsify::codemaker::CodeMaker,
	type_check::Types, WINGSDK_ASSEMBLY_NAME,
};
pub mod extern_dtsify;

pub const TYPE_INFLIGHT_POSTFIX: &str = "$Inflight";
const TYPE_INTERNAL_NAMESPACE: &str = "$internal";
const TYPE_STD: &str = "std";
const EMIT_FILE_EXTENSION: &str = "cjs";
const EMIT_TYPE_FILE_EXTENSION: &str = "d.cts";

pub struct DTSifier<'a> {
	preflight_file_map: &'a IndexMap<Utf8PathBuf, String>,
	source_file_graph: &'a FileGraph,
	pub types: &'a mut Types,
	pub output_files: RefCell<Files>,
}

impl<'a> DTSifier<'a> {
	pub fn new(
		types: &'a mut Types,
		preflight_file_map: &'a IndexMap<Utf8PathBuf, String>,
		source_file_graph: &'a FileGraph,
	) -> Self {
		Self {
			preflight_file_map,
			source_file_graph,
			output_files: RefCell::new(Files::new()),
			types,
		}
	}

	pub fn dtsify(&self, source_path: &Utf8Path, scope: &Scope) {
		let mut dts = CodeMaker::default();

		if source_path.is_dir() {
			let directory_children = self.source_file_graph.dependencies_of(source_path);

			for file in directory_children {
				let preflight_file_name = self.preflight_file_map.get(file).expect("no emitted JS file found");
				if file.is_dir() {
					let directory_name = file.file_stem().unwrap();
					dts.line(format!("export * as {directory_name} from \"./{preflight_file_name}\""));
				} else {
					dts.line(format!("export * from \"./{preflight_file_name}\""));
				}
			}
		} else {
			dts.line(format!(
				"import * as {TYPE_INTERNAL_NAMESPACE} from \"{WINGSDK_ASSEMBLY_NAME}/lib/core/types\""
			));
			dts.line(format!("import {{ {TYPE_STD} }} from \"{WINGSDK_ASSEMBLY_NAME}\""));
		}

		for statement in &scope.statements {
			dts.add_code(self.dtsify_statement(statement));
		}

		let mut dts_file_name = Utf8PathBuf::from(self.preflight_file_map.get(source_path).unwrap());

		assert!(matches!(dts_file_name.extension(), Some(EMIT_FILE_EXTENSION)));

		dts_file_name = dts_file_name.with_extension(EMIT_TYPE_FILE_EXTENSION);

		match self.output_files.borrow_mut().add_file(dts_file_name, dts.to_string()) {
			Ok(()) => {}
			Err(err) => report_diagnostic(err.into()),
		}
	}

	fn dtsify_function_signature(&self, f: &FunctionSignature, as_inflight: bool) -> String {
		let args = self.dtsify_parameters(&f.parameters, as_inflight);

		let is_inflight = matches!(f.phase, Phase::Inflight);

		let return_type = self.dtsify_type_annotation(&f.return_type, as_inflight);
		let return_type = if is_inflight {
			format!("Promise<{return_type}>")
		} else {
			return_type
		};

		let func = format!("({}) => {return_type}", args,);

		if is_inflight && !as_inflight {
			// this is the preflight side of an inflight function
			format!("{TYPE_INTERNAL_NAMESPACE}.Inflight<{func}>")
		} else {
			func
		}
	}

	fn dtsify_interface(&self, interface: &Interface, as_inflight: bool) -> CodeMaker {
		let mut code = CodeMaker::default();
		let interface_name = if as_inflight {
			format!("{}{TYPE_INFLIGHT_POSTFIX}", &interface.name.name)
		} else {
			interface.name.name.to_string()
		};

		code.line(format!("export interface {interface_name}"));

		if !interface.extends.is_empty() {
			code.append(" extends ");
			code.append(
				&interface
					.extends
					.iter()
					.map(|udt| {
						if as_inflight {
							format!("{udt}{TYPE_INFLIGHT_POSTFIX}")
						} else {
							udt.to_string()
						}
					})
					.join(", "),
			);
		}

		code.open("{");

		for method in interface
			.methods
			.iter()
			.filter(|m| !ignore_member_phase(m.1.phase, as_inflight))
		{
			code.line(format!(
				"readonly {}: {};",
				method.0.name,
				self.dtsify_function_signature(&method.1, as_inflight)
			));
		}

		code.close("}");

		code
	}

	fn dtsify_class(&self, class: &Class, as_inflight: bool) -> CodeMaker {
		let mut code = CodeMaker::default();
		let class_name = if as_inflight {
			format!("{}{TYPE_INFLIGHT_POSTFIX}", class.name)
		} else {
			class.name.name.to_string()
		};

		code.line("export class ");

		code.append(&class_name);
		if let Some(parent) = &class.parent {
			code.append(" extends ");
			if as_inflight {
				code.append(format!("{parent}{TYPE_INFLIGHT_POSTFIX}"));
			} else {
				code.append(parent.to_string());
			}
		} else if !as_inflight && matches!(class.phase, Phase::Preflight) {
			code.append(format!(" extends {TYPE_STD}.Resource"));
		}

		if !class.implements.is_empty() {
			code.append(" implements ");
			if as_inflight {
				code.append(
					&class
						.implements
						.iter()
						.map(|udt| format!("{udt}{TYPE_INFLIGHT_POSTFIX}"))
						.join(", "),
				);
			} else {
				code.append(&class.implements.iter().map(|udt| udt.to_string()).join(", "));
			}
		}

		code.open("{");

		let constructor_params = self.dtsify_parameters(&class.initializer.signature.parameters, as_inflight);
		if matches!(class.phase, Phase::Preflight) {
			if as_inflight {
				code.line(format!("constructor({constructor_params});"));
			} else {
				// add implicit scope and id
				code.line(format!(
					"constructor(scope: {TYPE_INTERNAL_NAMESPACE}.Construct, id: string"
				));

				if constructor_params.is_empty() {
					code.append(");");
				} else {
					code.append(format!(", {constructor_params});"));
				}
			}
		} else {
			code.line(format!("constructor({constructor_params});"));
		}

		if !as_inflight {
			// Emit special preflight marks to tie the inflight side together
			let inflight_class_name = format!("{class_name}{TYPE_INFLIGHT_POSTFIX}");
			code.line(format!(
				"[{TYPE_INTERNAL_NAMESPACE}.INFLIGHT_SYMBOL]?: {inflight_class_name};"
			));
		}

		for field in class
			.fields
			.iter()
			.filter(|f| matches!(f.access, AccessModifier::Public))
			.filter(|f| !ignore_member_phase(f.phase, as_inflight))
		{
			code.line(format!(
				"{}{}: {};",
				field.name,
				if matches!(field.member_type.kind, TypeAnnotationKind::Optional(_)) {
					"?"
				} else {
					""
				},
				self.dtsify_type_annotation(&field.member_type, true)
			));
		}
		for method in class
			.methods
			.iter()
			.filter(|f| matches!(f.1.access, AccessModifier::Public))
			.filter(|f| !ignore_member_phase(f.1.signature.phase, as_inflight))
		{
			code.line(format!(
				"{}{}: {};",
				if method.1.is_static { "static " } else { "" },
				method.0.name,
				self.dtsify_function_signature(&method.1.signature, as_inflight)
			));
		}

		code.close("}");
		code
	}

	fn dtsify_statement(&self, stmt: &Stmt) -> CodeMaker {
		let mut code = CodeMaker::default();
		match &stmt.kind {
			StmtKind::Interface(interface) => {
				code.line(self.dtsify_interface(interface, false));
				code.line(self.dtsify_interface(interface, true));
			}
			StmtKind::Struct(st) => {
				if !st.extends.is_empty() {
					code.open(format!(
						"export interface {} extends {} {{",
						st.name.name,
						st.extends.iter().map(|udt| udt.to_string()).join(", ")
					));
				} else {
					code.open(format!("export interface {} {{", st.name.name));
				}

				for field in &st.fields {
					code.line(format!(
						"readonly {}{}: {};",
						field.name,
						if matches!(field.member_type.kind, TypeAnnotationKind::Optional(_)) {
							"?"
						} else {
							""
						},
						self.dtsify_type_annotation(&field.member_type, false)
					));
				}
				code.close("}");
			}
			StmtKind::Enum(enu) => {
				code.open(format!("export enum {} {{", enu.name.name));
				for value in &enu.values {
					code.line(format!("{},", value.0.name));
				}
				code.close("}");
			}
			StmtKind::Bring { source, identifier } => {
				let identifier = identifier.as_ref().map(|i| i.name.clone()).unwrap_or("".to_string());

				match source {
					BringSource::BuiltinModule(sym) => code.line(format!("import {{ {sym} }} from \"{WINGSDK_ASSEMBLY_NAME}\"")),
					BringSource::TrustedModule(sym, path) => {
						let preflight_file_name = self.preflight_file_map.get(path).unwrap();
						code.line(format!("import * as {sym} from \"./{preflight_file_name}\";"))
					}
					BringSource::WingLibrary(sym, path) => {
						let preflight_file_name = self.preflight_file_map.get(path).unwrap();
						code.line(format!("import * as {sym} from \"./{preflight_file_name}\";"))
					}
					BringSource::JsiiModule(sym) => code.line(format!("import * as {identifier} from \"{sym}\"")),
					BringSource::WingFile(path) => {
						let preflight_file_name = self.preflight_file_map.get(path).unwrap();
						code.line(format!("import * as {identifier} from \"./{preflight_file_name}\";"))
					}
					BringSource::Directory(path) => {
						let preflight_file_name = self.preflight_file_map.get(path).unwrap();
						code.line(format!("import * as {identifier} from \"./{preflight_file_name}\";"))
					}
				}
			}
			StmtKind::Class(class) => {
				code.line(self.dtsify_class(class, false));
				code.line(self.dtsify_class(class, true));
			}

			// No need to emit anything for these
			StmtKind::SuperConstructor { .. }
			| StmtKind::Let { .. }
			| StmtKind::ForLoop { .. }
			| StmtKind::While { .. }
			| StmtKind::IfLet(_)
			| StmtKind::If { .. }
			| StmtKind::Break
			| StmtKind::Continue
			| StmtKind::Return(_)
			| StmtKind::Throw(_)
			| StmtKind::Expression(_)
			| StmtKind::Assignment { .. }
			| StmtKind::Scope(_)
			| StmtKind::TryCatch { .. }
			| StmtKind::CompilerDebugEnv
			| StmtKind::ExplicitLift(_) => {}
		}

		code
	}

	fn dtsify_parameters(&self, arg_list: &Vec<FunctionParameter>, ignore_phase: bool) -> String {
		let mut args = vec![];

		for (i, arg) in arg_list.iter().enumerate() {
			let arg_name = if arg.name.name.is_empty() {
				// function type annotations don't always have names
				format!("arg{}", i)
			} else {
				arg.name.name.clone()
			};

			args.push(format!(
				"{arg_name}{}: {}",
				if matches!(arg.type_annotation.kind, TypeAnnotationKind::Optional(_)) {
					"?"
				} else {
					""
				},
				self.dtsify_type_annotation(&arg.type_annotation, ignore_phase)
			));
		}
		args.join(", ")
	}

	fn dtsify_type_annotation(&self, typ: &TypeAnnotation, ignore_phase: bool) -> String {
		match &typ.kind {
			TypeAnnotationKind::Inferred => panic!("Should not have any inferred types"),
			TypeAnnotationKind::Number => "number".to_string(),
			TypeAnnotationKind::String => "string".to_string(),
			TypeAnnotationKind::Bool => "boolean".to_string(),
			TypeAnnotationKind::Void => "void".to_string(),
			TypeAnnotationKind::Json => format!("Readonly<{TYPE_INTERNAL_NAMESPACE}.Json>"),
			TypeAnnotationKind::MutJson => format!("{TYPE_INTERNAL_NAMESPACE}.Json"),
			TypeAnnotationKind::Duration => format!("{TYPE_STD}.Duration"),
			TypeAnnotationKind::Optional(t) => {
				format!("({}) | undefined", self.dtsify_type_annotation(&t, ignore_phase))
			}
			TypeAnnotationKind::Array(t) => format!("(readonly ({})[])", self.dtsify_type_annotation(&t, ignore_phase)),
			TypeAnnotationKind::MutArray(t) => format!("({})[]", self.dtsify_type_annotation(&t, ignore_phase)),
			TypeAnnotationKind::Map(t) => format!(
				"Readonly<Record<string, {}>>",
				self.dtsify_type_annotation(&t, ignore_phase)
			),
			TypeAnnotationKind::MutMap(t) => {
				format!("Record<string, {}>", self.dtsify_type_annotation(&t, ignore_phase))
			}
			TypeAnnotationKind::Set(t) => format!("Readonly<Set<{}>>", self.dtsify_type_annotation(&t, ignore_phase)),
			TypeAnnotationKind::MutSet(t) => format!("Set<{}>", self.dtsify_type_annotation(&t, ignore_phase)),
			TypeAnnotationKind::Function(f) => self.dtsify_function_signature(f, ignore_phase),
			TypeAnnotationKind::UserDefined(udt) => udt.to_string(),
		}
	}
}

pub fn ignore_member_phase(phase: Phase, is_inflight: bool) -> bool {
	// If we're an inflight client, we want to ignore preflight members
	// Or
	// If we're a preflight client, we want to ignore inflight members
	(is_inflight && matches!(phase, Phase::Preflight)) || (!is_inflight && matches!(phase, Phase::Inflight))
}

#[test]
fn declarations() {
	assert_compile_dir!(
		r#"
pub struct Struct {
	n: num;
	d: Array<duration>;
	j: Json;
}

pub interface Interface {
	method(s: Struct): str;
	inflight inflightMethod(): str;
}

pub interface ClassInterface {
	addHandler(handler: inflight (str): str): void;
	inflight bar(): void;
}

pub inflight interface InflightInterface {
  somethingFun(): void;
}

pub inflight class InflightClass impl InflightInterface {
  pub somethingFun() {}
}

pub class ParentClass impl ClassInterface {
	pub static inflight static_method(): InflightClass {
	  return new InflightClass();
	}

	inflight foo() {}
	pub inflight bar() {}

	pub addHandler(handler: inflight (str): str) {}
}

pub class Child extends ParentClass impl ClassInterface {}
"#
	);
}

#[test]
fn optionals() {
	assert_compile_dir!(
		r#"
pub struct Struct {
	n: num?;
}

pub interface Interface {
	method(s: Struct?): str;
}

pub interface ClassInterface {
	addHandler(handler: inflight (str?): str, s: Struct?): void;
}

pub class ParentClass impl ClassInterface {
	pub addHandler(handler: inflight (str?): str, s: Struct?) {}
}
"#
	)
}
