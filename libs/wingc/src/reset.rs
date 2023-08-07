use crate::{
	ast::Scope,
	visit::{self, Visit},
};

pub struct ScopeResetter;

impl ScopeResetter {
	pub fn new() -> Self {
		ScopeResetter
	}

	pub fn reset_scopes(&mut self, scope: &Scope) {
		self.visit_scope(scope);
	}
}

impl Visit<'_> for ScopeResetter {
	fn visit_scope(&mut self, scope: &Scope) {
		scope.reset_env();
		visit::visit_scope(self, scope);
	}
}
