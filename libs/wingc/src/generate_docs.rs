use camino::{Utf8Path, Utf8PathBuf};
use indexmap::IndexMap;
use wingii::type_system::TypeSystem;

use crate::{
	ast::{AccessModifier, Scope},
	closure_transform::ClosureTransformer,
	diagnostic::{found_errors, report_diagnostic, Diagnostic, DiagnosticSeverity},
	emit_warning_for_unsupported_package_managers,
	file_graph::{File, FileGraph},
	files::Files,
	fold::Fold,
	is_absolute_path,
	jsify::JSifier,
	lifting::LiftVisitor,
	parser::{as_wing_library, normalize_path, parse_wing_project},
	type_check::{
		type_reference_transform::TypeReferenceTransformer, Namespace, NamespaceRef, SymbolEnvOrNamespace, SymbolKind,
		TypeRef, Types, UnsafeRef,
	},
	type_check_assert::TypeCheckAssert,
	type_check_file,
	valid_json_visitor::ValidJsonVisitor,
	visit::Visit,
};

/// Generate documentation for the project
pub fn generate_docs(project_dir: &Utf8Path) -> Result<String, ()> {
	let source_package = as_wing_library(project_dir);
	if source_package.is_none() {
		report_diagnostic(Diagnostic {
			message: "No package.json found in project directory".to_string(),
			span: None,
			annotations: vec![],
			hints: vec![],
			severity: DiagnosticSeverity::Error,
		});
	}
	let source_path = normalize_path(&project_dir, None);
	let source_file = File::new(&source_path, source_path.to_string());

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

	// Verify that the project dir is absolute
	if !is_absolute_path(&project_dir) {
		report_diagnostic(Diagnostic {
			message: format!("Project directory must be absolute: {}", project_dir),
			span: None,
			annotations: vec![],
			hints: vec![],
			severity: DiagnosticSeverity::Error,
		});
		return Err(());
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

	return generate_docs_helper(&types, project_dir);
}

fn generate_docs_helper(types: &Types, project_dir: &Utf8Path) -> Result<String, ()> {
	let docs = String::new();
	let root_env = types.source_file_envs.get(project_dir).expect("No root env found");
	let ns = match root_env {
		SymbolEnvOrNamespace::Namespace(ns) => *ns,
		SymbolEnvOrNamespace::SymbolEnv(_) => panic!("Root env is not a namespace"),
		SymbolEnvOrNamespace::Error(diag) => panic!("Error in root env: {}", diag),
	};

	let namespaces = find_documentable_namespaces_recursive(&ns);
	for ns in namespaces {
		println!("{}", ns.name);
		let public_types = find_public_types_in_namespace(&ns);
		for (name, typ) in public_types {
			println!(" - {} ({})", name, typ);
		}
	}
	Ok(docs)
}

/// Return a list of all of the public namespaces directly in this namespace and all of its children, including
/// this namespace if it has any public elements.
pub fn find_documentable_namespaces_recursive(ns: &Namespace) -> Vec<NamespaceRef> {
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
pub fn find_public_types_in_namespace(ns: &Namespace) -> Vec<(String, TypeRef)> {
	let mut entries = vec![];
	for env in ns.envs.iter() {
		for (name, entry) in env.symbol_map.iter() {
			if entry.access == AccessModifier::Public {
				if let SymbolKind::Type(typ) = entry.kind {
					entries.push((name.clone(), typ));
				}
			}
		}
	}
	return entries;
}
