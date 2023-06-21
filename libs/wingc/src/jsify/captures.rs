use crate::{
	ast::{
		ArgList, Class, Expr, ExprKind, FunctionBody, Phase, Reference, Scope, Stmt, Symbol, TypeAnnotation,
		TypeAnnotationKind,
	},
	diagnostic::{report_diagnostic, Diagnostic, WingSpan},
	type_check::{
		resolve_user_defined_type,
		symbol_env::{LookupResult, SymbolEnv, SymbolEnvRef},
		Type, TypeRef, Types, UnsafeRef, VariableInfo,
	},
	visit::{self, Visit},
};
use indexmap::IndexMap;
use itertools::Itertools;
use std::{
	cell::RefCell,
	collections::{BTreeMap, BTreeSet},
	fmt::Display,
	ops::ControlFlow,
	vec,
};

/// Lists all the captures from a class
pub struct ClassCaptures {
	// all the types captured by this class
	types: IndexMap<Vec<String>, TypeRef>,

	/// captured variables per method
	vars: BTreeMap<String, BTreeMap<String, BTreeSet<String>>>,
}

/// Visitor that finds all the types and variables used within an inflight method but defined in its
/// parent environment
pub struct CaptureScanner<'a> {
	/// The name of the method
	method_name: &'a str,

	/// The root scope of the function we're analyzing
	function_scope: &'a Scope,

	/// The method env, used to lookup the type
	method_env: &'a RefCell<Option<SymbolEnv>>,

	/// The current environment (tracked via the visitor)
	current_env: &'a RefCell<Option<SymbolEnv>>,

	/// The index of the last visited statement.
	current_index: usize,

	/// The types table
	types: &'a Types,

	captures: &'a mut ClassCaptures,
}

#[derive(Clone)]
struct Component {
	text: String,
	span: WingSpan,
	kind: ComponentKind,
}

#[derive(Clone)]
enum ComponentKind {
	Member(VariableInfo, SymbolEnvRef),
	ClassType(TypeRef),
}

impl Display for Component {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}", self.text)
	}
}

impl ClassCaptures {
	/// Scan all inflight methods in a class and extract the names of all the types and variables that
	/// are defined outside of this method.
	pub fn scan(types: &Types, class: &Class) -> ClassCaptures {
		let mut captures = ClassCaptures::new();

		for (method_name, m) in &class.methods {
			// only consider inflight methods
			if m.signature.phase != Phase::Inflight {
				continue;
			}

			if let FunctionBody::Statements(scope) = &m.body {
				let mut visitor = CaptureScanner::new(types, &method_name.name, scope, &mut captures);
				visitor.scan();
			}
		}

		// Remove myself from the list of referenced preflight types because I don't need to import myself
		captures.remove_type(&vec![class.name.name.clone()]);

		captures
	}

	fn new() -> Self {
		Self {
			types: IndexMap::new(),
			vars: BTreeMap::new(),
		}
	}

	pub fn capture_type(&mut self, name: Vec<String>, t: UnsafeRef<Type>) {
		self.types.insert(name, t);
	}

	pub fn capture_var(&mut self, method_name: &str, var: &str, op: Option<String>) {
		let entry = self
			.vars
			.entry(method_name.to_string())
			.or_default()
			.entry(var.to_string())
			.or_default();

		if let Some(op) = op {
			entry.insert(op);
		}
	}

	pub fn remove_type(&mut self, name: &[String]) {
		self.types.remove(name);
	}

	pub fn vars(&self) -> IndexMap<String, BTreeSet<String>> {
		let mut result: IndexMap<String, BTreeSet<String>> = IndexMap::new();

		for (_, captures) in &self.vars {
			for (var, ops) in captures {
				result.entry(var.to_string()).or_default().extend(ops.clone());
			}
		}

		result
	}

	/// Returns all free variables and types.
	pub fn free(&self) -> BTreeSet<String> {
		let mut result = BTreeSet::new();

		for (v, _) in self.free_vars() {
			result.insert(v);
		}

		for (t, _) in self.free_types() {
			result.insert(t);
		}

		return result;
	}

	/// Returns all free variables
	pub fn free_vars(&self) -> BTreeMap<String, BTreeSet<String>> {
		self
			.vars()
			.iter()
			.filter(|(v, _)| !v.starts_with("this."))
			.map(|(v, ops)| (v.to_string(), ops.clone()))
			.collect()
	}

	/// Returns all (free) types
	pub fn free_types(&self) -> BTreeMap<String, TypeRef> {
		let mut res: BTreeMap<String, TypeRef> = BTreeMap::new();
		for (n, t) in &self.types {
			res.insert(n.join("."), *t);
		}

		res
	}

	/// Returns all the fields `this.xxx`
	pub fn fields(&self) -> BTreeMap<String, BTreeSet<String>> {
		self
			.vars()
			.iter()
			.filter(|(v, _)| v.starts_with("this."))
			.map(|(v, ops)| (v.to_string(), ops.clone()))
			.collect()
	}

	/// Returns all the fields, omitting `this.`
	pub fn fields_without_this(&self) -> IndexMap<String, BTreeSet<String>> {
		self
			.fields()
			.iter()
			.map(|(f, ops)| f.strip_prefix("this.").map(|f| (f.to_string(), ops.clone())))
			.flatten()
			.collect()
	}

	/// For each method, return the list of captured variables and their operations
	pub fn refs(&self) -> BTreeMap<String, BTreeMap<String, BTreeSet<String>>> {
		self.vars.clone()
	}
}

impl Display for ClassCaptures {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		if !self.types.is_empty() {
			write!(f, "Types:\n")?;
			for (name, t) in &self.types {
				write!(f, "  {} = {}\n", name.join("."), t)?;
			}
		}

		if !self.vars.is_empty() {
			write!(f, "Variables:\n")?;
			for (method, vars) in &self.vars {
				write!(f, "  {}():\n", method)?;
				for (var, ops) in vars {
					write!(f, "    {} => [{}]\n", var, ops.iter().join(","))?;
				}
			}
		}

		Result::Ok(())
	}
}

impl<'a> CaptureScanner<'a> {
	pub fn new(
		types: &'a Types,
		method_name: &'a str,
		function_scope: &'a Scope,
		captures: &'a mut ClassCaptures,
	) -> Self {
		Self {
			method_name,
			types,
			captures,
			function_scope,
			method_env: &function_scope.env,
			current_env: &function_scope.env,
			current_index: 0,
		}
	}

	pub fn scan(&mut self) {
		self.visit_scope(self.function_scope);
	}

	fn analyze_expr(&self, node: &'a Expr) -> Vec<Component> {
		let ExprKind::Reference(expr) = &node.kind else {
			return vec![];
		};

		return self.split_reference(expr);
	}

	fn split_reference(&self, expr: &'a Reference) -> Vec<Component> {
		let env = self.current_env.borrow();

		match expr {
			Reference::Identifier(x) => {
				let lookup = env.as_ref().unwrap().lookup_ext(&x, Some(self.current_index));

				// if the reference is already defined later in this scope, skip it
				if let LookupResult::DefinedLater = lookup {
					return vec![];
				}

				let LookupResult::Found(kind, i) = lookup else {
					panic!("reference to undefined symbol \"{x}\"");
				};

				let var = kind.as_variable().expect("variable");

				return vec![Component {
					text: x.name.clone(),
					span: x.span.clone(),
					kind: ComponentKind::Member(var, i.env),
				}];
			}
			Reference::InstanceMember {
				object,
				property,
				optional_accessor: _optional_chain,
			} => {
				let obj_type = self.types.get_expr_type(object).unwrap();
				let prop = if let Some(component_kind) = self.to_component_kind(obj_type, property) {
					vec![Component {
						text: property.name.clone(),
						span: property.span.clone(),
						kind: component_kind,
					}]
				} else {
					vec![]
				};

				let obj = self.analyze_expr(&object);
				return [obj, prop].concat();
			}
			Reference::TypeMember { type_, property } => {
				// Get the type we're accessing a member of
				let t = resolve_user_defined_type(type_, &env.as_ref().unwrap(), self.current_index)
					.expect("covered by type checking");

				// check if we are referencing an enum
				if let Type::Enum(_) = &*t {
					return vec![Component {
						text: format!("{type_}"),
						span: type_.span.clone(),
						kind: ComponentKind::ClassType(t),
					}];
				}

				// If the type we're referencing isn't a class then skip it
				let Some(class) = t.as_class() else {
					return vec![];
				};

				// To obtain information about the variable we're referencing (like its type and
				// whether it's reassignable), we look it up in the class's env.
				let (kind, var_info) = class.env.lookup_ext(&property, None).expect("lookup");

				let var = kind.as_variable().expect("variable");

				return vec![
					Component {
						text: format!("{type_}"),
						span: type_.span.clone(),
						kind: ComponentKind::ClassType(t),
					},
					Component {
						text: property.name.clone(),
						span: property.span.clone(),
						kind: ComponentKind::Member(var, var_info.env),
					},
				];
			}
		}
	}

	fn to_component_kind(&self, obj_type: UnsafeRef<Type>, property: &Symbol) -> Option<ComponentKind> {
		fn lookup(env: &SymbolEnv, symbol: &Symbol) -> ComponentKind {
			let (s, i) = env.lookup_ext(&symbol, None).expect("covered by type checking");
			return ComponentKind::Member(s.as_variable().expect("variable"), i.env);
		}

		match &*obj_type {
			Type::Void => unreachable!("cannot reference a member of void"),
			Type::Function(_) => unreachable!("cannot reference a member of a function"),
			Type::Optional(t) => self.to_component_kind(*t, property),
			Type::String
			| Type::Number
			| Type::Duration
			| Type::Boolean
			| Type::Json
			| Type::MutJson
			| Type::Anything
			| Type::Nil
			| Type::Enum(_)
			| Type::Array(_)
			| Type::MutArray(_)
			| Type::Map(_)
			| Type::MutMap(_)
			| Type::Set(_)
			| Type::MutSet(_) => None,

			Type::Class(cls) => Some(lookup(&cls.env, property)),
			Type::Interface(iface) => Some(lookup(&iface.env, property)),
			Type::Struct(st) => Some(lookup(&st.env, property)),
		}
	}

	/// Returns `true` if the reference should be futher visited or `false` if we should break
	fn analyze_reference(&mut self, node: &'a Reference) -> ControlFlow<()> {
		let parts = self.split_reference(node);
		println!("{}", parts.iter().map(|f| f.text.clone()).join("."));

		if parts.is_empty() {
			return ControlFlow::Continue(());
		}

		let first = {
			let p = &parts[0];
			if p.text == "this" {
				if parts.len() == 1 {
					// this is just "this". we can skip
					return ControlFlow::Continue(());
				}

				&parts[1]
			} else {
				p
			}
		};

		// is this a capture or a local symbol? check if the object's environment is a child or the same
		// as the environment of the method we are currently scanning.
		if let ComponentKind::Member(_, object_env) = first.kind {
			if object_env.is_same(self.method_env.borrow().as_ref().unwrap())
				|| object_env.is_child_of(self.method_env.borrow().as_ref().unwrap())
			{
				return ControlFlow::Break(());
			}
		}

		// if the object is a class type, capture the type
		if let ComponentKind::ClassType(t) = &first.kind {
			self
				.captures
				.capture_type(first.text.split(".").map(|f| f.to_string()).collect_vec(), *t);

			return ControlFlow::Break(());
		}

		let mut preflight_object = vec![];
		let mut inflight = vec![];

		// dissect the expression by collecting all the preflight components into `preflight_object`
		// and then all the inflight components into `inflight`.
		for part in &parts {
			let ComponentKind::Member(variable, _) = &part.kind else {
				report_diagnostic(Diagnostic { message: format!("Unexpected type for component '{}'", part), span: Some(part.span.clone()) });
				return ControlFlow::Break(());
			};

			// accumuate another inflight part into the inflight container
			if variable.phase != Phase::Preflight {
				inflight.push(part);
				continue;
			}

			// it doesn't make sense to capture a preflight object after we've already taken off.
			if !inflight.is_empty() {
				report_diagnostic(Diagnostic {
					message: format!("Cannot reference a preflight object after takeoff"),
					span: Some(part.span.clone()),
				});
				return ControlFlow::Break(());
			}

			// the object we are capturing is a preflight object, so we need to lift it into inflight.
			// we need to make sure that the object is not reassignable and that it has a capturable
			// type.

			// cannot capture a reassignable object
			if variable.reassignable {
				report_diagnostic(Diagnostic {
					message: format!("Cannot capture reassignable object '{part}'"),
					span: Some(part.span.clone()),
				});

				return ControlFlow::Break(());
			}

			// check that the type is capturable
			if !variable.type_.is_capturable() {
				report_diagnostic(Diagnostic {
					message: format!(
						"Cannot capture field '{part}' with non-capturable type '{}'",
						variable.type_
					),
					span: Some(part.span.clone()),
				});

				return ControlFlow::Break(());
			}

			// okay, so we have a non-reassignable, capturable type.
			// one more special case is collections. we currently only support
			// collections which do not include resources because we cannot
			// qualify the capture.
			if let Some(inner_type) = variable.type_.collection_item_type() {
				if inner_type.is_preflight_class() {
					report_diagnostic(Diagnostic {
						message: format!(
							"Capturing collection of preflight classes is not supported yet (type is '{}')",
							variable.type_,
						),
						span: Some(part.span.clone()),
					});

					return ControlFlow::Break(());
				}
			}

			preflight_object.push(part);
		}

		// trim all macro functions and inflight variables from the end of the inflight list because
		// those are already available in the inflight environment (we need to capture the inflight
		// methods because of permissions).
		let inflight = trim_inflight_variables(inflight);

		let var = preflight_object.iter().map(|f| f.text.clone()).join(".");
		let op = if inflight.is_empty() {
			None
		} else {
			Some(inflight.iter().map(|f| format_component(f)).join("."))
		};

		// nothing left to capture (e.g. `assert()`).
		if inflight.is_empty() && (var.is_empty() || var == "this") {
			return ControlFlow::Break(());
		}

		self.captures.capture_var(self.method_name, &var, op);

		return ControlFlow::Break(());
	}
}

fn trim_inflight_variables(inflight: Vec<&Component>) -> Vec<&Component> {
	let mut result = vec![];

	for part in inflight.iter().rev() {
		if let ComponentKind::Member(variable, _) = &part.kind {
			let as_function = variable.type_.as_function_sig();
			if as_function.is_none() || as_function.unwrap().js_override.is_some() {
				continue; // skip
			}

			result.push(*part);
		}

		break;
	}

	result.reverse();
	return result;
}

fn format_component(part: &Component) -> String {
	if let ComponentKind::Member(v, _) = &part.kind {
		if let Type::Function(_) = *v.type_ {
			return format!("{}()", part.text);
		}
	}

	return part.text.clone();
}

impl<'ast> Visit<'ast> for CaptureScanner<'ast> {
	fn visit_expr_new(
		&mut self,
		node: &'ast Expr,
		class: &'ast TypeAnnotation,
		obj_id: &'ast Option<String>,
		obj_scope: &'ast Option<Box<Expr>>,
		arg_list: &'ast ArgList,
	) {
		// we want to only capture the type annotation in the case of "new X" because
		// other cases of type annotation are actually erased in the javascript code.
		if let TypeAnnotationKind::UserDefined(u) = &class.kind {
			let env = self.current_env.borrow();
			let x = env
				.as_ref()
				.unwrap()
				.lookup_nested(&u.full_path().iter().collect_vec(), Some(self.current_index));

			match x {
				LookupResult::Found(t, _) => self.captures.capture_type(u.full_path_str_vec(), t.as_type().unwrap()),
				LookupResult::NotFound(_) => todo!(),
				LookupResult::DefinedLater => todo!(),
				LookupResult::ExpectedNamespace(_) => todo!(),
			}
		}

		visit::visit_expr_new(self, node, class, obj_id, obj_scope, arg_list);
	}

	fn visit_reference(&mut self, node: &'ast Reference) {
		match self.analyze_reference(node) {
			ControlFlow::Continue(_) => visit::visit_reference(self, node),
			ControlFlow::Break(_) => {}
		}
	}

	fn visit_scope(&mut self, node: &'ast Scope) {
		let backup_env = self.current_env;
		self.current_env = &node.env;
		visit::visit_scope(self, node);
		self.current_env = backup_env;
	}

	fn visit_stmt(&mut self, node: &'ast Stmt) {
		self.current_index = node.idx;
		visit::visit_stmt(self, node);
	}
}

#[cfg(test)]
mod tests;
