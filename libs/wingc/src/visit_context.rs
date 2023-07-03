use crate::{
	ast::{Phase, Symbol, UserDefinedType},
	type_check::symbol_env::SymbolEnvRef,
};

pub struct VisitContext {
	phase: Vec<Phase>,
	env: Vec<SymbolEnvRef>,
	method_env: Vec<SymbolEnvRef>,
	property: Vec<String>,
	method: Vec<Option<Symbol>>,
	class: Vec<UserDefinedType>,
	statement: Vec<usize>,
}

impl VisitContext {
	pub fn new() -> Self {
		VisitContext {
			phase: vec![],
			env: vec![],
			method_env: vec![],
			property: vec![],
			class: vec![],
			statement: vec![],
			method: vec![],
		}
	}
}

impl VisitContext {
	pub fn push_stmt(&mut self, stmt: usize) {
		self.statement.push(stmt);
	}

	pub fn pop_stmt(&mut self) {
		self.statement.pop();
	}

	pub fn current_stmt_idx(&self) -> usize {
		*self.statement.last().unwrap_or(&0)
	}

	// --

	pub fn push_class(&mut self, class: UserDefinedType) {
		self.class.push(class);
	}

	pub fn pop_class(&mut self) {
		self.class.pop();
	}

	pub fn current_class(&self) -> Option<&UserDefinedType> {
		self.class.last()
	}

	// --

	pub fn push_function_definition(&mut self, function_name: &Option<Symbol>, phase: &Phase, env: SymbolEnvRef) {
		self.phase.push(phase.clone());
		self.method.push(function_name.clone());
		self.method_env.push(env);
	}

	pub fn pop_function_definition(&mut self) {
		self.phase.pop();
		self.method.pop();
		self.method_env.pop();
	}

	pub fn current_method(&self) -> Option<Symbol> {
		// return the first none-None method in the stack (from the end)
		self.method.iter().rev().find_map(|m| m.clone())
	}

	pub fn current_phase(&self) -> Phase {
		*self.phase.last().unwrap_or(&Phase::Preflight)
	}

	pub fn current_method_env(&self) -> Option<&SymbolEnvRef> {
		self.method_env.last()
	}

	// --

	pub fn push_property(&mut self, property: String) {
		self.property.push(property);
	}

	pub fn pop_property(&mut self) {
		self.property.pop();
	}

	pub fn current_property(&self) -> Option<String> {
		self.property.last().cloned()
	}

	// --

	pub fn push_env(&mut self, env: SymbolEnvRef) {
		self.env.push(env);
	}

	pub fn pop_env(&mut self) {
		self.env.pop();
	}

	pub fn current_env(&self) -> Option<&SymbolEnvRef> {
		self.env.last()
	}
}
