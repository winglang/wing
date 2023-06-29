use crate::{
	ast::{ArgList, Class, Expr, FunctionBody, Phase, Reference, Scope, Stmt, TypeAnnotation, TypeAnnotationKind},
	diagnostic::{report_diagnostic, Diagnostic, WingSpan},
	type_check::{
		symbol_env::{LookupResult, SymbolEnv},
		SymbolKind, Types, VariableInfo,
	},
	visit::{self, Visit},
};
use indexmap::IndexMap;
use itertools::Itertools;
use std::{
	cell::RefCell,
	collections::{BTreeMap, BTreeSet},
	fmt::Display,
	vec,
};

/// Lists all the captures from a class
pub struct ClassCaptures {
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

	/// The phase of the current expression
	current_expr_phase: Option<Phase>,

	/// The index of the last visited statement.
	current_index: usize,

	captures: &'a mut ClassCaptures,

	types: &'a Types,
}

impl ClassCaptures {
	/// Scan all inflight methods in a class and extract the names of all the types and variables that
	/// are defined outside of this method.
	pub fn scan(class: &Class, types: &Types) -> ClassCaptures {
		let mut captures = ClassCaptures::new();

		for (method_name, m) in class.all_methods() {
			// only consider inflight methods
			if m.signature.phase != Phase::Inflight {
				continue;
			}

			if let FunctionBody::Statements(scope) = &m.body {
				let mut visitor = CaptureScanner::new(&method_name.name, scope, &mut captures, &types);
				visitor.scan();
			}
		}

		// Remove myself from the list of referenced preflight types because I don't need to import myself
		captures.remove(&class.name.name.clone());
		captures
	}

	fn new() -> Self {
		Self {
			// types: IndexMap::new(),
			vars: BTreeMap::new(),
		}
	}

	pub fn capture(&mut self, method_name: &str, var: &str, op: Option<String>) {
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

	pub fn remove(&mut self, name: &String) {
		self.vars.remove(name);
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

	/// Returns all the fields `this.xxx`
	pub fn fields(&self) -> BTreeMap<String, BTreeSet<String>> {
		self
			.vars()
			.iter()
			.filter(|(v, _)| v.starts_with("this."))
			.map(|(v, ops)| (v.to_string(), ops.clone()))
			.collect()
	}

	pub fn all(&self) -> Vec<String> {
		// create a list of all captured symbols (vars and types).
		let mut all_captures = vec![];

		for v in &self.free() {
			all_captures.push(v.clone());
		}

		for (f, _) in self.fields() {
			all_captures.push(f);
		}

		all_captures
	}
}

impl Display for ClassCaptures {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
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
		method_name: &'a str,
		function_scope: &'a Scope,
		captures: &'a mut ClassCaptures,
		types: &'a Types,
	) -> Self {
		Self {
			method_name,
			captures,
			function_scope,
			method_env: &function_scope.env,
			current_env: &function_scope.env,
			current_expr_phase: None,
			current_index: 0,
			types,
		}
	}

	pub fn scan(&mut self) {
		self.visit_scope(self.function_scope);
	}

	fn try_capture(&mut self, r: String, span: &WingSpan) -> bool {
		let env = self.current_env.borrow();
		let result = env.as_ref().unwrap().lookup_nested_str(&r, Some(self.current_index));

		// if the symbol is defined later in the current environment, it means we can't capture a
		// reference to a symbol with the same name from a parent so bail out.
		if let LookupResult::DefinedLater = result {
			report_diagnostic(Diagnostic {
				span: Some(span.clone()),
				message: format!("Cannot capture \"{r}\" because it is shadowed by another object defined later"),
			});

			return false;
		}

		// if not found, return none
		let LookupResult::Found(kind, info) = result else {
			return false;
		};

		// if the symbol is defined in a child environemnt (or same), then it's not a capture
		if self.is_child_env(&info.env) {
			return false;
		}

		// if the current expression phase is preflight, we don't need to capture
		// because this expression will be handled by the lifting machinery
		if self.current_expr_phase == Some(Phase::Preflight) {
			return false;
		}

		if let SymbolKind::Variable(v) = kind {
			if is_macro(v) {
				return false;
			}
		}

		self.captures.capture(self.method_name, &r, None);
		return true;
	}

	/// Returns `true` if `env` is a child of the current method's environment
	/// of if it's the same environment (>=)
	fn is_child_env(&self, env: &SymbolEnv) -> bool {
		// is this a capture or a local symbol? check if the object's environment is a child or the same
		// as the environment of the method we are currently scanning.
		env.is_same(self.method_env.borrow().as_ref().unwrap())
			|| env.is_child_of(self.method_env.borrow().as_ref().unwrap())
	}
}

/// Checks if `v` is a macro function (e.g. has a "js_override" attribute)
fn is_macro(v: &VariableInfo) -> bool {
	if let Some(f) = v.type_.as_function_sig() {
		return f.js_override.is_some();
	}

	return false;
}

impl<'ast> Visit<'ast> for CaptureScanner<'ast> {
	fn visit_class(&mut self, _node: &'ast Class) {
		// do not descend into classes!
	}

	fn visit_expr_new(
		&mut self,
		node: &'ast Expr,
		class: &'ast TypeAnnotation,
		obj_id: &'ast Option<Box<Expr>>,
		obj_scope: &'ast Option<Box<Expr>>,
		arg_list: &'ast ArgList,
	) {
		if let TypeAnnotationKind::UserDefined(u) = &class.kind {
			if self.try_capture(u.full_path_str(), &u.span) {
				return;
			}
		}

		visit::visit_expr_new(self, node, class, obj_id, obj_scope, arg_list);
	}

	fn visit_reference(&mut self, node: &'ast Reference) {
		match node {
			Reference::Identifier(x) => {
				if self.try_capture(x.name.clone(), &x.span) {
					return;
				}
			}
			Reference::TypeMember { type_, .. } => {
				if self.try_capture(type_.full_path_str(), &type_.span) {
					return;
				}
			}
			Reference::InstanceMember { .. } => {
				// no op: recurse into the object by falling back to the default visitor implementation
			}
		}

		visit::visit_reference(self, node);
	}

	fn visit_expr(&mut self, node: &'ast Expr) {
		// skip preflight expressions - they are handled by the lifting machinery
		if let Some(phase) = self.types.get_expr_phase(node) {
			self.current_expr_phase = Some(phase);
		}

		visit::visit_expr(self, node);
		self.current_expr_phase = None;
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
