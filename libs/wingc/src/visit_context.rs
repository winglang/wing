use crate::{
	ast::{Phase, Symbol, UserDefinedType},
	type_check::symbol_env::SymbolEnvRef,
};

pub struct VisitContext {
	phase: Vec<Phase>,
	env: Vec<SymbolEnvRef>,
	method_env: Vec<Option<SymbolEnvRef>>,
	property: Vec<String>,
	method: Vec<Option<Symbol>>,
	class: Vec<UserDefinedType>,
	statement: Vec<usize>,
	in_json: Vec<bool>,
	in_type_annotation: Vec<bool>,
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
			in_json: vec![],
			in_type_annotation: vec![],
		}
	}
}

impl VisitContext {
	pub fn push_type_annotation(&mut self) {
		self.in_type_annotation.push(true);
	}

	pub fn pop_type_annotation(&mut self) {
		self.in_type_annotation.pop();
	}

	pub fn in_type_annotation(&self) -> bool {
		*self.in_type_annotation.last().unwrap_or(&false)
	}

	// --

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

	pub fn push_class(&mut self, class: UserDefinedType, phase: &Phase, initializer_env: Option<SymbolEnvRef>) {
		self.class.push(class);
		self.push_phase(*phase);
		self.method_env.push(initializer_env);
	}

	pub fn pop_class(&mut self) {
		self.class.pop();
		self.pop_phase();
		self.method_env.pop();
	}

	pub fn current_class(&self) -> Option<&UserDefinedType> {
		self.class.last()
	}

	// --

	pub fn push_function_definition(&mut self, function_name: &Option<Symbol>, phase: &Phase, env: SymbolEnvRef) {
		self.push_phase(*phase);
		self.method.push(function_name.clone());

		// if the function definition doesn't have a name (i.e. it's a closure), don't push its env
		// because it's not a method dude!
		let maybe_env = function_name.as_ref().map(|_| env);
		self.method_env.push(maybe_env);
	}

	pub fn pop_function_definition(&mut self) {
		self.pop_phase();
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
		self.method_env.iter().rev().find_map(|m| m.as_ref())
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

	// --

	pub fn push_json(&mut self) {
		self.in_json.push(true);
	}

	pub fn pop_json(&mut self) {
		self.in_json.pop();
	}

	pub fn in_json(&self) -> bool {
		*self.in_json.last().unwrap_or(&false)
	}

	// --

	pub fn push_phase(&mut self, phase: Phase) {
		self.phase.push(phase);
	}

	pub fn pop_phase(&mut self) {
		self.phase.pop();
	}
}
