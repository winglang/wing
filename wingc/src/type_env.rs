use crate::{ast::Symbol, type_check::Type};
use std::collections::HashMap;

pub struct TypeEnv<'a> {
	type_map: HashMap<String, Type>,
	parent: Option<&'a TypeEnv<'a>>,
	pub return_type: Option<Type>,
}

impl<'a> TypeEnv<'a> {
	pub fn new(parent: Option<&'a TypeEnv<'a>>, return_type: Option<Type>) -> Self {
		assert!(return_type.is_none() || return_type.is_some() && parent.is_some());
		Self {
			type_map: HashMap::new(),
			parent,
			return_type,
		}
	}

	pub fn define(&mut self, symbol: &Symbol, _type: Type) {
		if self.type_map.contains_key(&symbol.name) {
			// TODO span is a byte offset, not a line number
			panic!("Symbol {} already defined.", symbol);
		}

		self.type_map.insert(symbol.name.clone(), _type);
	}

	pub fn lookup(&self, symbol: &Symbol) -> &Type {
		if let Some(_type) = self.type_map.get(&symbol.name) {
			_type
		} else if let Some(parent_env) = self.parent {
			parent_env.lookup(symbol)
		} else {
			panic!("Unknown symbol {}", symbol);
		}
	}
}
