use crate::{
	ast::{Flight, Symbol},
	diagnostic::TypeError,
	type_check::Type,
	type_check::TypeRef,
};
use std::collections::{hash_map, HashMap, HashSet};

pub struct TypeEnv {
	pub(crate) type_map: HashMap<String, (StatementIdx, TypeRef)>,
	parent: Option<*const TypeEnv>,
	pub return_type: Option<TypeRef>,
	is_class: bool,
	pub flight: Flight,
	statement_idx: usize,
}

// TODO See TypeRef for why this is necessary
unsafe impl Send for TypeEnv {}

pub enum StatementIdx {
	Index(usize),
	Top,
}

enum LookupResult {
	Found((TypeRef, Flight)),
	NotFound,
	DefinedLater,
}

impl TypeEnv {
	pub fn new(
		parent: Option<*const TypeEnv>,
		return_type: Option<TypeRef>,
		is_class: bool,
		flight: Flight,
		statement_idx: usize,
	) -> Self {
		assert!(return_type.is_none() || (return_type.is_some() && parent.is_some()));
		Self {
			type_map: HashMap::new(),
			parent,
			return_type,
			is_class,
			flight,
			statement_idx,
		}
	}

	pub fn is_root(&self) -> bool {
		self.parent.is_none()
	}

	pub fn define(&mut self, symbol: &Symbol, _type: TypeRef, pos: StatementIdx) -> Result<(), TypeError> {
		if self.type_map.contains_key(&symbol.name) {
			return Err(TypeError {
				span: symbol.span.clone(),
				message: format!("Symbol \"{}\" already defined in this scope", symbol.name),
			});
		}

		// Avoid variable shadowing
		if let Some(_parent_env) = self.parent {
			if let Some(parent_type) = self.try_lookup(&symbol.name, None) {
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
		self.type_map.insert(symbol.name.clone(), (pos, _type));

		Ok(())
	}

	pub fn try_lookup(&self, symbol_name: &str, statement_idx: Option<usize>) -> Option<TypeRef> {
		match self.try_lookup_ext(symbol_name, statement_idx) {
			LookupResult::Found((type_, _)) => Some(type_),
			LookupResult::NotFound | LookupResult::DefinedLater => None,
		}
	}

	fn try_lookup_ext(&self, symbol_name: &str, statement_idx: Option<usize>) -> LookupResult {
		if let Some((_, _type)) = self.type_map.get(symbol_name) {
			if let Some(statement_idx) = statement_idx {
				if let StatementIdx::Index(idx) = self.type_map.get(symbol_name).unwrap().0 {
					if idx > statement_idx {
						return LookupResult::DefinedLater;
					}
				}
			}
			LookupResult::Found((*_type, self.flight))
		} else if let Some(parent_env) = self.parent {
			let parent_env = unsafe { &*parent_env };
			parent_env.try_lookup_ext(symbol_name, statement_idx.map(|_| self.statement_idx))
		} else {
			LookupResult::NotFound
		}
	}

	pub fn lookup(&self, symbol: &Symbol, statement_idx: Option<usize>) -> Result<TypeRef, TypeError> {
		Ok(self.lookup_ext(symbol, statement_idx)?.0)
	}

	pub fn lookup_ext(&self, symbol: &Symbol, statement_idx: Option<usize>) -> Result<(TypeRef, Flight), TypeError> {
		let lookup_result = self.try_lookup_ext(&symbol.name, statement_idx);

		match lookup_result {
			LookupResult::Found((type_, flight)) => Ok((type_, flight)),
			LookupResult::NotFound => Err(TypeError {
				message: format!("Unknown symbol \"{}\"", &symbol.name),
				span: symbol.span.clone(),
			}),
			LookupResult::DefinedLater => Err(TypeError {
				message: format!("Symbol \"{}\" used before being defined", symbol.name),
				span: symbol.span.clone(),
			}),
		}
	}

	pub fn lookup_nested(&self, nested_vec: &[&Symbol], statement_idx: Option<usize>) -> Result<TypeRef, TypeError> {
		let mut it = nested_vec.iter();

		let mut symb = *it.next().unwrap();
		let mut t = if let Some(type_ref) = self.try_lookup(&symb.name, statement_idx) {
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

			let lookup_result = ns.env.try_lookup(&(*next_symb).name, statement_idx);

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
	curr_pos: hash_map::Iter<'a, String, (StatementIdx, TypeRef)>,
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
		if let Some((name, (_, _type))) = self.curr_pos.next() {
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
