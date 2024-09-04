use camino::{Utf8Path, Utf8PathBuf};
use indexmap::IndexMap;
use wingii::{fqn::FQN, type_system::TypeSystem};

use crate::{
	ast::{AccessModifier, Phase, Scope},
	closure_transform::ClosureTransformer,
	diagnostic::{found_errors, report_diagnostic, Diagnostic, DiagnosticSeverity},
	emit_warning_for_unsupported_package_managers,
	file_graph::{File, FileGraph},
	files::Files,
	find_nearest_wing_project_dir,
	fold::Fold,
	jsify::JSifier,
	lifting::LiftVisitor,
	parser::{as_wing_library, normalize_path, parse_wing_project},
	type_check::{
		type_reference_transform::TypeReferenceTransformer, ClassLike, FunctionSignature, HasFqn, Namespace, NamespaceRef,
		SymbolEnvOrNamespace, SymbolKind, Type, TypeRef, Types, UnsafeRef, VariableKind,
	},
	type_check_assert::TypeCheckAssert,
	type_check_file,
	valid_json_visitor::ValidJsonVisitor,
	visit::Visit,
};

/// Generate documentation for the project
pub fn generate_docs(project_dir: &Utf8Path) -> Result<String, ()> {
	let project_dir = find_nearest_wing_project_dir(project_dir);
	let source_package = as_wing_library(&project_dir, false);
	if source_package.is_none() {
		report_diagnostic(Diagnostic {
			message: "No package.json found in project directory".to_string(),
			span: None,
			annotations: vec![],
			hints: vec![],
			severity: DiagnosticSeverity::Error,
		});
		return Err(());
	}
	let source_package = source_package.unwrap();
	let source_path = normalize_path(&project_dir, None);
	let source_file = File::new(&source_path, source_package.clone());

	// A map from package names to their root directories
	let mut library_roots: IndexMap<String, Utf8PathBuf> = IndexMap::new();
	library_roots.insert(source_package.clone(), project_dir.to_owned());

	// -- PARSING PHASE --
	let mut files = Files::new();
	let mut file_graph = FileGraph::default();
	let mut tree_sitter_trees = IndexMap::new();
	let mut asts = IndexMap::new();
	let topo_sorted_files = parse_wing_project(
		&source_file,
		None,
		&mut files,
		&mut file_graph,
		&mut library_roots,
		&mut tree_sitter_trees,
		&mut asts,
	);

	emit_warning_for_unsupported_package_managers(&project_dir);

	// -- DESUGARING PHASE --

	// Transform all inflight closures defined in preflight into single-method resources
	let mut asts = asts
		.into_iter()
		.map(|(path, scope)| {
			let mut inflight_transformer = ClosureTransformer::new();
			let scope = inflight_transformer.fold_scope(scope);
			(path, scope)
		})
		.collect::<IndexMap<Utf8PathBuf, Scope>>();

	// -- TYPECHECKING PHASE --

	// Create universal types collection (need to keep this alive during entire compilation)
	let mut types = Types::new();
	let mut jsii_types = TypeSystem::new();

	// Create a universal JSII import spec (need to keep this alive during entire compilation)
	let mut jsii_imports = vec![];

	// Type check all files in topological order (start with files that don't bring any other
	// Wing files, then move on to files that depend on those, and repeat)
	for file in &topo_sorted_files {
		let mut scope = asts.swap_remove(&file.path).expect("matching AST not found");
		type_check_file(
			&mut scope,
			&mut types,
			&file,
			&file_graph,
			&library_roots,
			&mut jsii_types,
			&mut jsii_imports,
		);

		// Make sure all type reference are no longer considered references
		let mut tr_transformer = TypeReferenceTransformer { types: &mut types };
		let scope = tr_transformer.fold_scope(scope);

		// Validate the type checker didn't miss anything - see `TypeCheckAssert` for details
		let mut tc_assert = TypeCheckAssert::new(&types, found_errors());
		tc_assert.check(&scope);

		// Validate all Json literals to make sure their values are legal
		let mut json_checker = ValidJsonVisitor::new(&types);
		json_checker.check(&scope);

		asts.insert(file.path.to_owned(), scope);
	}

	let jsifier = JSifier::new(
		&mut types,
		&files,
		&file_graph,
		&source_path,
		// out_dir will not be used
		&source_path,
	);

	// -- LIFTING PHASE --

	for (_path, scope) in &asts {
		let mut lift = LiftVisitor::new(&jsifier);
		lift.visit_scope(&scope);
	}

	// bail out now (before jsification) if there are errors (no point in jsifying)
	if found_errors() {
		return Err(());
	}

	// -- DOC GENERATION PHASE --
	return generate_docs_helper(&types, &source_path);
}

const HIDDEN_METHODS: [&str; 6] = [
	"toString",
	"toJSON",
	"onLift",
	"onLiftType",
	"toInflight",
	"isConstruct",
];

fn generate_docs_helper(types: &Types, project_dir: &Utf8Path) -> Result<String, ()> {
	let mut docs = String::new();
	let root_env = types.source_file_envs.get(project_dir).expect("No root env found");
	let ns = match root_env {
		SymbolEnvOrNamespace::Namespace(ns) => *ns,
		SymbolEnvOrNamespace::SymbolEnv(_) => panic!("Root env is not a namespace"),
		SymbolEnvOrNamespace::Error(diag) => panic!("Error in root env: {}", diag),
	};

	docs.push_str("## API Reference\n\n");

	let mut public_types = vec![];
	let namespaces = find_documentable_namespaces_recursive(&ns);
	for ns in namespaces {
		public_types.extend(find_public_types_in_namespace(&ns));
	}

	print_table_of_contents(&public_types, &mut docs);
	print_classes(&public_types, &mut docs);
	print_interfaces(&public_types, &mut docs);
	print_structs(&public_types, &mut docs);
	print_enums(&public_types, &mut docs);

	Ok(docs)
}

/// Return a list of all of the public namespaces directly in this namespace and all of its children, including
/// this namespace if it has any public elements.
fn find_documentable_namespaces_recursive(ns: &Namespace) -> Vec<NamespaceRef> {
	let mut namespaces = vec![];
	if ns.has_public_api_elements() {
		namespaces.push(UnsafeRef::from(ns));
	}
	for env in ns.envs.iter() {
		for entry in env.symbol_map.values() {
			if let SymbolKind::Namespace(child_ns) = entry.kind {
				if entry.access == AccessModifier::Public {
					namespaces.extend(find_documentable_namespaces_recursive(&child_ns));
				}
			}
		}
	}
	namespaces
}

/// Return a list of all public types directly in this namespace (does not include types in child namespaces).
fn find_public_types_in_namespace(ns: &Namespace) -> Vec<TypeRef> {
	let mut entries = vec![];
	for env in ns.envs.iter() {
		for (_name, entry) in env.symbol_map.iter() {
			if entry.access == AccessModifier::Public {
				if let SymbolKind::Type(typ) = entry.kind {
					entries.push(typ);
				}
			}
		}
	}
	return entries;
}

fn simplified_fqn(typ: &TypeRef) -> String {
	let fqn = typ.fqn().expect("Type has no FQN");
	let fqn = FQN::from(fqn.as_str());
	fqn
		.as_str()
		.strip_prefix(fqn.assembly())
		.expect("FQN assembly prefix not found")
		.strip_prefix('.')
		.expect("FQN dot not found")
		.to_string()
}

fn print_table_of_contents(types: &[TypeRef], docs: &mut String) {
	docs.push_str("### Table of Contents\n\n");

	let mut classes = vec![];
	let mut interfaces = vec![];
	let mut structs = vec![];
	let mut enums = vec![];

	for typ in types {
		match **typ {
			Type::Class(_) => classes.push(typ),
			Type::Interface(_) => interfaces.push(typ),
			Type::Struct(_) => structs.push(typ),
			Type::Enum(_) => enums.push(typ),
			_ => panic!("Unexpected type in public types list"),
		}
	}

	if !classes.is_empty() {
		docs.push_str("- **Classes**\n");
		for class in &classes {
			docs.push_str("  - <a href=\"#");
			docs.push_str(&class.fqn().expect("Type has no FQN"));
			docs.push_str("\">");
			docs.push_str(&simplified_fqn(class));
			docs.push_str("</a>\n");
		}
	}

	if !interfaces.is_empty() {
		docs.push_str("- **Interfaces**\n");
		for interface in &interfaces {
			docs.push_str("  - <a href=\"#");
			docs.push_str(&interface.fqn().expect("Type has no FQN"));
			docs.push_str("\">");
			docs.push_str(&simplified_fqn(interface));
			docs.push_str("</a>\n");
		}
	}

	if !structs.is_empty() {
		docs.push_str("- **Structs**\n");
		for struct_ in &structs {
			docs.push_str("  - <a href=\"#");
			docs.push_str(&struct_.fqn().expect("Type has no FQN"));
			docs.push_str("\">");
			docs.push_str(&simplified_fqn(struct_));
			docs.push_str("</a>\n");
		}
	}

	if !enums.is_empty() {
		docs.push_str("- **Enums**\n");
		for enum_ in &enums {
			docs.push_str("  - <a href=\"#");
			docs.push_str(&enum_.fqn().expect("Type has no FQN"));
			docs.push_str("\">");
			docs.push_str(&simplified_fqn(enum_));
			docs.push_str("</a>\n");
		}
	}

	docs.push_str("\n");
}

fn print_classes(types: &[TypeRef], docs: &mut String) {
	for typ in types {
		if let Type::Class(ref class) = **typ {
			docs.push_str("### ");
			docs.push_str(&simplified_fqn(typ));
			docs.push_str(" (");
			docs.push_str(&class.phase.to_string());
			docs.push_str(" class) <a class=\"wing-docs-anchor\" id=\"");
			docs.push_str(&typ.fqn().expect("Type has no FQN"));
			docs.push_str("\"></a>\n\n");

			let docstring = class.docs.render();
			if !docstring.is_empty() {
				docs.push_str(&docstring);
			} else {
				docs.push_str("*No description*");
			}
			docs.push_str("\n\n");

			print_constructors(docs, class);
			print_properties(docs, class);
			print_methods(docs, class);
		}
	}
}

fn print_interfaces(types: &[TypeRef], docs: &mut String) {
	for typ in types {
		if let Type::Interface(ref interface) = **typ {
			docs.push_str("### ");
			docs.push_str(&simplified_fqn(typ));
			docs.push_str(" (interface) <a class=\"wing-docs-anchor\" id=\"");
			docs.push_str(&typ.fqn().expect("Type has no FQN"));
			docs.push_str("\"></a>\n\n");

			let docstring = interface.docs.render();
			if !docstring.is_empty() {
				docs.push_str(&docstring);
			} else {
				docs.push_str("*No description*");
			}
			docs.push_str("\n\n");

			print_properties(docs, interface);
			print_methods(docs, interface);
		}
	}
}

fn print_structs(types: &[TypeRef], docs: &mut String) {
	for typ in types {
		if let Type::Struct(ref struct_) = **typ {
			docs.push_str("### ");
			docs.push_str(&simplified_fqn(typ));
			docs.push_str(" (struct) <a class=\"wing-docs-anchor\" id=\"");
			docs.push_str(&typ.fqn().expect("Type has no FQN"));
			docs.push_str("\"></a>\n\n");

			let docstring = struct_.docs.render();
			if !docstring.is_empty() {
				docs.push_str(&docstring);
			} else {
				docs.push_str("*No description*");
			}
			docs.push_str("\n\n");

			print_properties(docs, struct_);
		}
	}
}

fn print_enums(types: &[TypeRef], docs: &mut String) {
	for typ in types {
		if let Type::Enum(ref enum_) = **typ {
			docs.push_str("### ");
			docs.push_str(&simplified_fqn(typ));
			docs.push_str(" (enum) <a class=\"wing-docs-anchor\" id=\"");
			docs.push_str(&typ.fqn().expect("Type has no FQN"));
			docs.push_str("\"></a>\n\n");

			let docstring = enum_.docs.render();
			if !docstring.is_empty() {
				docs.push_str(&docstring);
			} else {
				docs.push_str("*No description*");
			}
			docs.push_str("\n\n");

			docs.push_str("#### Values\n\n");
			docs.push_str("| **Name** | **Description** |\n");
			docs.push_str("| --- | --- |\n");
			for (name, description) in enum_.values.iter() {
				docs.push_str("| <code>");
				docs.push_str(&name.name);
				docs.push_str("</code> | ");
				if let Some(description) = description {
					docs.push_str(&description);
				} else {
					docs.push_str("*No description*");
				}
				docs.push_str(" |\n");
			}

			docs.push_str("\n");
		}
	}
}

fn print_constructors(docs: &mut String, class: &impl ClassLike) {
	docs.push_str("#### Constructor\n\n");

	let mut constructors = class.constructors(true).collect::<Vec<_>>();
	constructors.retain(|(_, constructor_info)| constructor_info.access == AccessModifier::Public);
	// We only care about printing the preflight constructor
	constructors.retain(|(_, constructor_info)| constructor_info.phase == Phase::Preflight);

	if constructors.is_empty() {
		docs.push_str("*No constructor*\n");
	} else {
		docs.push_str("```\n");
		for (_, constructor_info) in constructors {
			let sig = constructor_info
				.type_
				.as_function_sig()
				.expect("Constructor is not a function");
			print_signature(&VariableKind::InstanceMember, "new", sig, docs);
			docs.push_str("\n");
		}
		docs.push_str("```\n");
	}

	docs.push_str("\n");
}

fn print_properties(docs: &mut String, class: &impl ClassLike) {
	docs.push_str("#### Properties\n\n");

	let mut fields = class.fields(true).collect::<Vec<_>>();
	fields.retain(|(_, field_info)| field_info.access == AccessModifier::Public);

	if fields.is_empty() {
		docs.push_str("*No properties*\n");
	} else {
		docs.push_str("| **Name** | **Type** | **Description** |\n");
		docs.push_str("| --- | --- | --- |\n");
		for (name, prop_info) in fields {
			docs.push_str("| <code>");
			docs.push_str(&name);
			docs.push_str("</code> | <code>");
			docs.push_str(&prop_info.type_.to_string());
			docs.push_str("</code> | ");
			let prop_summary = prop_info.docs.and_then(|d| d.summary);
			if let Some(prop_summary) = prop_summary {
				docs.push_str(&prop_summary.replace('\n', " "));
			} else {
				docs.push_str("*No description*");
			}
			docs.push_str(" |\n");
		}
	}

	docs.push_str("\n");
}

fn print_methods(docs: &mut String, class: &impl ClassLike) {
	docs.push_str("#### Methods\n\n");

	let mut methods = class.methods(true).collect::<Vec<_>>();
	methods.retain(|(_, method_info)| method_info.access == AccessModifier::Public);
	methods.retain(|(name, _)| !HIDDEN_METHODS.contains(&name.as_str()));

	if methods.is_empty() {
		docs.push_str("*No methods*\n");
	} else {
		docs.push_str("| **Signature** | **Description** |\n");
		docs.push_str("| --- | --- |\n");
		for (name, method_info) in methods {
			let sig = method_info.type_.as_function_sig().expect("Method is not a function");

			docs.push_str("| <code>");
			print_signature(&method_info.kind, &name, sig, docs);
			docs.push_str("</code> | ");
			let method_summary = method_info.docs.and_then(|d| d.summary);
			if let Some(method_summary) = method_summary {
				docs.push_str(&method_summary.replace('\n', " "));
			} else {
				docs.push_str("*No description*");
			}
			docs.push_str(" |\n");
		}
	}

	docs.push_str("\n");
}

fn print_signature(var_kind: &VariableKind, name: &str, sig: &FunctionSignature, docs: &mut String) {
	if var_kind == &VariableKind::StaticMember {
		docs.push_str("static ");
	}
	if sig.phase != Phase::Preflight {
		docs.push_str(&sig.phase.to_string());
		docs.push_str(" ");
	}
	docs.push_str(name);
	docs.push_str("(");
	for (i, param) in sig.parameters.iter().enumerate() {
		if i > 0 {
			docs.push_str(", ");
		}
		docs.push_str(&param.name);
		docs.push_str(": ");
		docs.push_str(&param.typeref.to_string());
	}
	docs.push_str("): ");
	docs.push_str(&sig.return_type.to_string());
}
