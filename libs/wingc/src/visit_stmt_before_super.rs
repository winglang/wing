use crate::{
	ast::{CalleeKind, Class, Expr, ExprKind, Reference, Scope, Spanned, Stmt, StmtKind},
	diagnostic::WingSpan,
	visit::{self, Visit},
};

pub struct CheckValidBeforeSuperVisitor {
	/// A list of locations where there's a `super.method_call()` within this statement.
	/// These are illegal before a call to the `super()` constructor.
	pub super_accesses: Vec<WingSpan>,
	/// A list of locations where `this` is referenced within this statement.
	/// These are illegal before a call to the `super()` constructor.
	pub this_accesses: Vec<WingSpan>,
}

impl CheckValidBeforeSuperVisitor {
	pub fn new() -> Self {
		CheckValidBeforeSuperVisitor {
			super_accesses: vec![],
			this_accesses: vec![],
		}
	}
}

impl<'ast> Visit<'ast> for CheckValidBeforeSuperVisitor {
	fn visit_expr(&mut self, node: &'ast Expr) {
		if matches!(
			&node.kind,
			ExprKind::Call {
				callee: CalleeKind::SuperCall(..),
				..
			}
		) {
			self.super_accesses.push(node.span());
		}
		visit::visit_expr(self, node);
	}

	fn visit_reference(&mut self, node: &'ast Reference) {
		if matches!(node, Reference::Identifier(s) if s.name == "this") {
			self.this_accesses.push(node.span());
		}
		visit::visit_reference(self, node);
	}

	fn visit_class(&mut self, _node: &'ast Class) {
		return;
	}
}

// A visitor that checks `super()` is called from the top scope
// and that there's only one `super()` call
pub struct CheckSuperCtorLocationVisitor {
	pub redundant_calls: Vec<WingSpan>,
	pub inner_calls: Vec<WingSpan>,
	pub first_call: Option<WingSpan>,
	pub scope_depth: usize,
}

impl CheckSuperCtorLocationVisitor {
	pub fn new() -> Self {
		CheckSuperCtorLocationVisitor {
			redundant_calls: vec![],
			inner_calls: vec![],
			first_call: None,
			scope_depth: 0,
		}
	}
}

impl Visit<'_> for CheckSuperCtorLocationVisitor {
	fn visit_stmt(&mut self, node: &'_ Stmt) {
		if matches!(node.kind, StmtKind::SuperConstructor { .. }) {
			// If we're in an inner scope then mark this call as invalid
			if self.scope_depth > 1 {
				self.inner_calls.push(node.span());
			}
			// If we've already found a valid call then mark this call as redundant
			else if self.first_call.is_some() {
				self.redundant_calls.push(node.span());
			} else {
				// This seems like a valid call, store the span
				self.first_call = Some(node.span());
			}
		}
		visit::visit_stmt(self, node);
	}

	fn visit_scope(&mut self, node: &'_ Scope) {
		self.scope_depth += 1;
		visit::visit_scope(self, node);
		self.scope_depth -= 1;
	}

	fn visit_class(&mut self, _node: &Class) {
		// Ignore inner classes
		return;
	}
}
