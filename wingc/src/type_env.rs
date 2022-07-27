use crate::{ast::Symbol, type_check::Type};
use std::collections::HashMap;

pub struct TypedSymbol {
	pub symbol: Symbol,
	pub _type: Type,
}

pub struct TypeEnv<'a> {
	type_map: HashMap<String, TypedSymbol>,
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
		if let Some(typed_symbol) = self.type_map.get(&symbol.name) {
			// TODO span is a byte offset, not a friendly character one
			panic!("Symbol {} already defined at {}.", symbol, typed_symbol.symbol.span);
		}

		self.type_map.insert(
			symbol.name.clone(),
			TypedSymbol {
				symbol: symbol.clone(),
				_type,
			},
		);
	}

	pub fn lookup(&self, symbol: &Symbol) -> &Type {
		if let Some(typed_symbol) = self.type_map.get(&symbol.name) {
			&typed_symbol._type
		} else if let Some(parent_env) = self.parent {
			parent_env.lookup(symbol)
		} else {
			panic!("Unknown symbol {}", symbol);
		}
	}
}
