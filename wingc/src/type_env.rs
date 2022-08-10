use crate::{
	ast::{Reference, Symbol},
	type_check::TypeRef,
};
use std::collections::HashMap;

pub struct TypeEnv {
	type_map: HashMap<String, TypeRef>,
	parent: Option<*const TypeEnv>,
	pub return_type: Option<TypeRef>,
}

impl TypeEnv {
	pub fn new(parent: Option<*const TypeEnv>, return_type: Option<TypeRef>) -> Self {
		assert!(return_type.is_none() || return_type.is_some() && parent.is_some());
		Self {
			type_map: HashMap::new(),
			parent,
			return_type,
		}
	}

	pub fn define(&mut self, symbol: &Symbol, _type: TypeRef) {
		if self.type_map.contains_key(&symbol.name) {
			panic!("Symbol {} already defined.", symbol);
		}
		if let Some(parent_env) = self.parent {
			if parent_env.type_map.contains_key(&symbol.name) {
				panic!("Symbol {} already defined in parent scope.", symbol);
			}
		}

		self.type_map.insert(symbol.name.clone(), _type);
	}

	pub fn lookup(&self, symbol: &Reference) -> TypeRef {
		match symbol {
			Reference::Identifier(identifier) => {
				if let Some(_type) = self.type_map.get(&identifier.name) {
				_type
			} else if let Some(parent_env) = self.parent {
				parent_env.lookup(symbol)
			} else {
				panic!("Unknown symbol {}", identifier);
			}
			// TODO, I don't think we need to ever get here, reference resolution should be outside the scope of the env...
			Reference::NestedIdentifier { object: _, property: _ } => &Type::Anything,
			Reference::NamespacedIdentifier {
				namespace: _,
				identifier: _,
			} => &Type::Anything,
		}
	}
}
