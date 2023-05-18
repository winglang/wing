use indexmap::{indexset, IndexSet};

use crate::{
	ast::{Phase, Reference, Scope, Stmt, Symbol},
	type_check::{symbol_env::SymbolEnvRef, SymbolKind},
	visit::{self, Visit},
};

/// Scans AST nodes for free variables.
///
/// A free variable is a variable that is used in the body of a function but not
/// defined in the function's scope. Here is an example where "x" is a free variable:
/// ```wing
/// let x = 5;
/// let foo = () => {
///  return x + 3;
/// }
/// ```
///
/// For more info see https://en.wikipedia.org/wiki/Free_variables_and_bound_variables
pub struct FreeVariableScanner {
	/// A list of all free variables the scanner has found so far.
	/// This collects the exact symbols (not just the names of variables) since
	/// this scanner may be used to scan an entire class, and a class may have
	/// multiple methods. It's possible that in method A, a variable "x" is a
	/// free variable, but in method B, "x" is a bound variable:
	/// ```wing
	/// let x = 5;
	/// class Foo {
	///   methodA() {
	///     return x + 3;
	///   }
	///   methodB(x) {
	///     return x + 3;
	///   }
	/// }
	/// ```
	pub free_vars: IndexSet<Symbol>,

	/// The current scopes env during traversal
	env: Option<SymbolEnvRef>,
	/// The current statement index
	statement_index: usize,
	/// The last symbol we visited
	last_symb: Symbol,
}

impl FreeVariableScanner {
	pub fn new() -> Self {
		Self {
			free_vars: indexset![],
			env: None,
			statement_index: 0,
			last_symb: Symbol::global("badger"),
		}
	}
}

impl Visit<'_> for FreeVariableScanner {
	// invariant: adds zero bound variables
	fn visit_reference(&mut self, node: &Reference) {
		if let Reference::Identifier(ref symb) = node {
			// Skip "this" symbol since it's never a free var even though it refers to a preflight type
			if symb.name != "this" {
				// Lookup the reference int the current environment
				let lookup_result = self
					.env
					.as_ref()
					.unwrap()
					.lookup(symb, Some(self.statement_index))
					.expect("covered by type checking");

				// If this reference is a capturable, non-reassignable, preflight
				// variable then it's a capture
				if let SymbolKind::Variable(v) = lookup_result {
					// TODO: if we see a reassignable or non-capturable variable, should we emit an error here or inside analyze_expr?
					if v.phase == Phase::Preflight {
						self.free_vars.insert(symb.clone());
					}
				}
			}
		};

		return visit::visit_reference(self, node);
	}

	fn visit_scope(&mut self, scope: &Scope) {
		let curr_env = scope.env.borrow().as_ref().unwrap().get_ref();
		// Don't look for free vars in non-inflight scopes
		if curr_env.phase != Phase::Inflight {
			return;
		}
		let old_env = self.env;
		self.env = Some(curr_env);
		visit::visit_scope(self, scope);
		self.env = old_env;
	}

	fn visit_stmt(&mut self, stmt: &Stmt) {
		let old_statement_index = self.statement_index;
		self.statement_index = stmt.idx;
		visit::visit_stmt(self, stmt);
		self.statement_index = old_statement_index;
	}

	fn visit_symbol(&mut self, node: &Symbol) {
		self.last_symb = node.clone();
	}
}
