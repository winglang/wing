use crate::{
	ast::{Phase, Symbol},
	diagnostic::TypeError,
	type_check::Type,
	type_check::TypeRef,
};
use std::collections::{hash_map, HashMap, HashSet};

pub struct TypeEnv {
	pub(crate) type_map: HashMap<String, TypeRef>,
	parent: Option<*const TypeEnv>,
	pub return_type: Option<TypeRef>,
	is_class: bool,
	pub flight: Phase,
}

// TODO See TypeRef for why this is necessary
unsafe impl Send for TypeEnv {}

impl TypeEnv {
	pub fn new(parent: Option<*const TypeEnv>, return_type: Option<TypeRef>, is_class: bool, flight: Phase) -> Self {
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

	pub fn define(&mut self, symbol: &Symbol, _type: TypeRef) -> Result<(), TypeError> {
		if self.type_map.contains_key(&symbol.name) {
			return Err(TypeError {
				span: symbol.span.clone(),
				message: format!("Symbol \"{}\" already defined in this scope", symbol.name),
			});
		}

		// Avoid variable shadowing
		if let Some(_parent_env) = self.parent {
			if let Some(parent_type) = self.try_lookup(&symbol.name) {
				// If we're a class we allow "symbol shadowing" for methods
				if !(self.is_class
					&& matches!(parent_type.into(), &Type::Function(_))
					&& matches!(_type.into(), &Type::Function(_)))
				{
					return Err(TypeError {
						span: symbol.span.clone(),
						message: format!("Symbol \"{}\" already defined in parent scope.", symbol.name),
					});
				}
			}
		}
		self.type_map.insert(symbol.name.clone(), _type);

		Ok(())
	}

	pub fn try_lookup(&self, symbol_name: &str) -> Option<TypeRef> {
		self.try_lookup_ext(symbol_name).map(|res| res.0)
	}

	pub fn try_lookup_ext(&self, symbol_name: &str) -> Option<(TypeRef, Phase)> {
		if let Some(_type) = self.type_map.get(symbol_name) {
			Some((*_type, self.flight))
		} else if let Some(parent_env) = self.parent {
			unsafe { &*parent_env }.try_lookup_ext(symbol_name)
		} else {
			None
		}
	}

	pub fn lookup(&self, symbol: &Symbol) -> Result<TypeRef, TypeError> {
		Ok(self.lookup_ext(symbol)?.0)
	}

	pub fn lookup_ext(&self, symbol: &Symbol) -> Result<(TypeRef, Phase), TypeError> {
		let lookup_result = self.try_lookup_ext(&symbol.name);

		if let Some((type_ref, flight)) = lookup_result {
			Ok((type_ref, flight))
		} else {
			Err(TypeError {
				message: format!("Unknown symbol \"{}\"", &symbol.name),
				span: symbol.span.clone(),
			})
		}
	}

	pub fn lookup_nested(&self, nested_vec: &[&Symbol]) -> Result<TypeRef, TypeError> {
		let mut it = nested_vec.iter();

		let mut symb = *it.next().unwrap();
		let mut t = if let Some(type_ref) = self.try_lookup(&symb.name) {
			type_ref
		} else {
			return Err(TypeError {
				message: format!("Unknown symbol \"{}\"", symb),
				span: symb.span.clone(),
			});
		};

		while let Some(next_symb) = it.next() {
			if t.is_anything() {
				break;
			}
			let ns = t
				.as_namespace()
				.expect(&format!("Symbol \"{}\" should be a namespace", symb));

			let lookup_result = ns.env.try_lookup(&(*next_symb).name);

			if let Some(type_ref) = lookup_result {
				t = type_ref;
			} else {
				return Err(TypeError {
					message: format!("Unknown symbol \"{}\" in namespace \"{}\"", next_symb, ns.name),
					span: next_symb.span.clone(),
				});
			}

			symb = *next_symb;
		}
		Ok(t)
	}

	pub fn iter(&self) -> TypeEnvIter {
		TypeEnvIter::new(self)
	}
}

pub struct TypeEnvIter<'a> {
	seen_keys: HashSet<String>,
	curr_env: &'a TypeEnv,
	curr_pos: hash_map::Iter<'a, String, TypeRef>,
}

impl<'a> TypeEnvIter<'a> {
	fn new(env: &'a TypeEnv) -> Self {
		TypeEnvIter {
			seen_keys: HashSet::new(),
			curr_env: env,
			curr_pos: env.type_map.iter(),
		}
	}
}

impl<'a> Iterator for TypeEnvIter<'a> {
	type Item = (String, TypeRef);

	fn next(&mut self) -> Option<Self::Item> {
		if let Some((name, _type)) = self.curr_pos.next() {
			if self.seen_keys.contains(name) {
				self.next()
			} else {
				self.seen_keys.insert(name.clone());
				Some((name.clone(), *_type))
			}
		} else if let Some(parent_env) = self.curr_env.parent {
			unsafe { self.curr_env = &*parent_env };
			self.curr_pos = self.curr_env.type_map.iter();
			self.next()
		} else {
			None
		}
	}
}
