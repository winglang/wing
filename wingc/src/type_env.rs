use crate::{
	ast::{Flight, Symbol},
	type_check::Type,
	type_check::TypeRef,
};
use std::collections::HashMap;

pub struct TypeEnv {
	type_map: HashMap<String, TypeRef>,
	parent: Option<*const TypeEnv>,
	pub return_type: Option<TypeRef>,
	is_class: bool,
	pub flight: Flight,
}

impl TypeEnv {
	pub fn new(parent: Option<*const TypeEnv>, return_type: Option<TypeRef>, is_class: bool, flight: Flight) -> Self {
		assert!(return_type.is_none() || (return_type.is_some() && parent.is_some()));
		Self {
			type_map: HashMap::new(),
			parent,
			return_type,
			is_class,
			flight,
		}
	}

	pub fn is_root(&self) -> bool {
		self.parent.is_none()
	}

	pub fn define(&mut self, symbol: &Symbol, _type: TypeRef) {
		if self.type_map.contains_key(&symbol.name) {
			panic!("Symbol {} already defined.", symbol);
		}

		// Avoid variable shadowing
		if let Some(_parent_env) = self.parent {
			if let Some(parent_type) = self.try_lookup(&symbol.name) {
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

	pub fn try_lookup(&self, symbol_name: &str) -> Option<TypeRef> {
		self.try_lookup_ext(symbol_name).map(|res| res.0)
	}

	pub fn try_lookup_ext(&self, symbol_name: &str) -> Option<(TypeRef, Flight)> {
		if let Some(_type) = self.type_map.get(symbol_name) {
			Some((*_type, self.flight))
		} else if let Some(parent_env) = self.parent {
			unsafe { &*parent_env }.try_lookup_ext(symbol_name)
		} else {
			None
		}
	}

	pub fn lookup(&self, symbol: &Symbol) -> TypeRef {
		self.lookup_ext(symbol).0
	}

	pub fn lookup_ext(&self, symbol: &Symbol) -> (TypeRef, Flight) {
		self
			.try_lookup_ext(&symbol.name)
			.expect(&format!("Unknown symbol {}", &symbol.name))
	}
}
