use crate::{ast::Symbol, type_check::Type, type_check::TypeRef};
use std::collections::HashMap;

pub struct TypeEnv {
	type_map: HashMap<String, TypeRef>,
	parent: Option<*const TypeEnv>,
	pub return_type: Option<TypeRef>,
	is_class: bool,
}

impl TypeEnv {
	pub fn new(parent: Option<*const TypeEnv>, return_type: Option<TypeRef>, is_class: bool) -> Self {
		assert!(return_type.is_none() || return_type.is_some() && parent.is_some());
		Self {
			type_map: HashMap::new(),
			parent,
			return_type,
			is_class,
		}
	}

	pub fn define(&mut self, symbol: &Symbol, _type: TypeRef) {
		if self.type_map.contains_key(&symbol.name) {
			panic!("Symbol {} already defined.", symbol);
		}

		// Avoid variable shadowing
		if let Some(parent_env) = self.parent {
			if let Some(parent_type) = self.try_lookup(&symbol) {
				// If we're a class we allow "symbol shadowing" for methods
				if !(self.is_class
					&& matches!(parent_type.into(), &Type::Function(_))
					&& matches!(_type.into(), &Type::Function(_)))
				{
					panic!("Symbol {} already defined in parent scope.", symbol);
				}
			}
		}
		self.type_map.insert(symbol.name.clone(), _type);
	}

	fn try_lookup(&self, symbol: &Symbol) -> Option<TypeRef> {
		if let Some(_type) = self.type_map.get(&symbol.name) {
			Some(*_type)
		} else if let Some(parent_env) = self.parent {
			unsafe { &*parent_env }.try_lookup(symbol)
		} else {
			None
		}
	}

	pub fn lookup(&self, symbol: &Symbol) -> TypeRef {
		self.try_lookup(symbol).expect(&format!("Unknown symbol {}", symbol))
	}
}
