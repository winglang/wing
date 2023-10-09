use itertools::Itertools;

use crate::{
	ast::{Class, ExprId, FunctionSignature, Phase, Symbol, UserDefinedType},
	type_check::symbol_env::SymbolEnvRef,
};

#[derive(Clone)]
pub struct VisitContext {
	phase: Vec<Phase>,
	env: Vec<SymbolEnvRef>,
	function_env: Vec<SymbolEnvRef>,
	property: Vec<Symbol>,
	function: Vec<(Option<Symbol>, FunctionSignature)>,
	class: Vec<UserDefinedType>,
	statement: Vec<usize>,
	in_json: Vec<bool>,
	in_type_annotation: Vec<bool>,
	expression: Vec<ExprId>,
}

impl VisitContext {
	pub fn new() -> Self {
		VisitContext {
			phase: vec![],
			env: vec![],
			function_env: vec![],
			property: vec![],
			class: vec![],
			statement: vec![],
			function: vec![],
			in_json: vec![],
			in_type_annotation: vec![],
			expression: vec![],
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

	fn push_expr(&mut self, expr: ExprId) {
		self.expression.push(expr);
	}

	fn pop_expr(&mut self) {
		self.expression.pop();
	}

	pub fn current_expr(&self) -> Option<ExprId> {
		self.expression.last().map(|id| *id)
	}

	// --

	pub fn push_class(&mut self, class: &Class) {
		self.class.push(UserDefinedType::for_class(class));
		self.push_phase(class.phase);
	}

	pub fn pop_class(&mut self) {
		self.class.pop();
		self.pop_phase();
	}

	pub fn current_class(&self) -> Option<&UserDefinedType> {
		self.class.last()
	}

	pub fn current_class_nesting(&self) -> Vec<UserDefinedType> {
		self.class.iter().rev().map(|udt| udt.clone()).collect_vec()
	}

	// --

	pub fn push_function_definition(
		&mut self,
		function_name: Option<&Symbol>,
		sig: &FunctionSignature,
		env: SymbolEnvRef,
	) {
		self.push_phase(sig.phase);
		self.function.push((function_name.cloned(), sig.clone()));
		self.function_env.push(env);
	}

	pub fn pop_function_definition(&mut self) {
		self.pop_phase();
		self.function.pop();
		self.function_env.pop();
	}

	pub fn current_method(&self) -> Option<(Symbol, FunctionSignature)> {
		// return the first none-None method in the stack (from the end)
		self
			.function
			.iter()
			.rev()
			.find(|(m, _)| m.is_some())
			.map(|(m, sig)| (m.clone().unwrap(), sig.clone()))
	}

	pub fn current_function(&self) -> Option<(Option<Symbol>, FunctionSignature)> {
		self.function.last().cloned()
	}

	pub fn current_phase(&self) -> Phase {
		*self.phase.last().unwrap_or(&Phase::Preflight)
	}

	pub fn current_method_env(&self) -> Option<&SymbolEnvRef> {
		// Get the env of the first named function in the stack (non named functions are closures)
		self.function.iter().zip(self.function_env.iter()).rev().find_map(
			|((m, _), e)| {
				if m.is_some() {
					Some(e)
				} else {
					None
				}
			},
		)
	}

	pub fn current_function_env(&self) -> Option<&SymbolEnvRef> {
		self.function_env.last()
	}

	// --

	pub fn push_property(&mut self, property: &Symbol) {
		self.property.push(property.clone());
	}

	pub fn pop_property(&mut self) {
		self.property.pop();
	}

	pub fn current_property(&self) -> Option<Symbol> {
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

pub trait VisitorWithContext {
	fn ctx(&mut self) -> &mut VisitContext;

	fn with_expr(&mut self, expr: ExprId, f: impl FnOnce(&mut Self)) {
		self.ctx().push_expr(expr);
		f(self);
		self.ctx().pop_expr();
	}

	fn with_stmt(&mut self, stmt: usize, f: impl FnOnce(&mut Self)) {
		self.ctx().push_stmt(stmt);
		f(self);
		self.ctx().pop_stmt();
	}

	fn with_function_def<T>(
		&mut self,
		function_name: Option<&Symbol>,
		sig: &FunctionSignature,
		env: SymbolEnvRef,
		f: impl FnOnce(&mut Self) -> T,
	) -> T {
		self.ctx().push_function_definition(function_name, sig, env);
		let res = f(self);
		self.ctx().pop_function_definition();
		res
	}
}
