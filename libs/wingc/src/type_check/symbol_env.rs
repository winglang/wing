use crate::{
	ast::{Phase, Symbol},
	diagnostic::TypeError,
	type_check::{SymbolKind, Type, TypeRef},
};
use std::collections::{btree_map, BTreeMap, HashSet};
use std::fmt::Debug;

use super::{UnsafeRef, VariableInfo};

pub type SymbolEnvRef = UnsafeRef<SymbolEnv>;

pub struct SymbolEnv {
	// We use a BTreeMaps here so that we can iterate over the symbols in a deterministic order (snapshot tests)
	pub(crate) symbol_map: BTreeMap<String, (StatementIdx, SymbolKind)>,
	pub(crate) parent: Option<SymbolEnvRef>,

	// TODO: This doesn't make much sense in the context of the "environment" but I needed a way to propagate the return type of a function
	// down the scopes. Think of a nicer way to do this.
	pub return_type: TypeRef,

	pub is_init: bool,
	pub phase: Phase,
	statement_idx: usize,
}

/// The index (position) of the statement where a certain symbol was defined
/// this is useful to determine if a symbol can be used in a certain
/// expression or whether it is being used before it's defined.
#[derive(Debug)]
pub enum StatementIdx {
	Index(usize),
	/// Special value meaning the symbol should be treated as if it was defined at the top of the scope
	Top,
}

/// Possible results for a symbol lookup in the environment
enum LookupResult<'a> {
	/// The kind of symbol and usefull metadata associated with its lookup
	Found((&'a SymbolKind, SymbolLookupInfo)),
	/// The symbol was not found in the environment
	NotFound,
	/// The symbol exists in the environment but it's not defined yet (based on the statement
	/// index passed to the lookup)
	DefinedLater,
}

#[derive(Debug)]
pub struct SymbolLookupInfo {
	/// The phase the symbol was defined in
	pub phase: Phase,
	/// Whether the symbol was defined in an `init`'s environment
	pub init: bool,
}

enum LookupMutResult<'a> {
	/// The type of the symbol and its flight phase
	Found((&'a mut SymbolKind, Phase)),
	/// The symbol was not found in the environment
	NotFound,
	/// The symbol exists in the environment but it's not defined yet (based on the statement
	/// index passed to the lookup)
	DefinedLater,
}

impl SymbolEnv {
	pub fn new(
		parent: Option<SymbolEnvRef>,
		return_type: TypeRef,
		is_init: bool,
		phase: Phase,
		statement_idx: usize,
	) -> Self {
		// assert that if the return type isn't void, then there is a parent environment
		assert!(matches!(*return_type, Type::Void) || parent.is_some());

		Self {
			symbol_map: BTreeMap::new(),
			parent,
			return_type,
			is_init,
			phase,
			statement_idx,
		}
	}

	/// Used to get an unsafe reference to this symbol environment so it be referenced by
	/// other types or environments (e.g. as a parent class or parent scope)
	pub fn get_ref(&self) -> SymbolEnvRef {
		UnsafeRef::<Self>(self)
	}

	pub fn is_root(&self) -> bool {
		self.parent.is_none()
	}

	pub fn define(&mut self, symbol: &Symbol, kind: SymbolKind, pos: StatementIdx) -> Result<(), TypeError> {
		if self.symbol_map.contains_key(&symbol.name) {
			return Err(TypeError {
				span: symbol.span.clone(),
				message: format!("Symbol \"{}\" already defined in this scope", symbol.name),
			});
		}

		self.symbol_map.insert(symbol.name.clone(), (pos, kind));

		Ok(())
	}

	pub fn try_lookup(&self, symbol_name: &str, not_after_stmt_idx: Option<usize>) -> Option<&SymbolKind> {
		match self.try_lookup_ext(symbol_name, not_after_stmt_idx) {
			LookupResult::Found((type_, _)) => Some(type_),
			LookupResult::NotFound | LookupResult::DefinedLater => None,
		}
	}

	pub fn try_lookup_mut(&mut self, symbol_name: &str, not_after_stmt_idx: Option<usize>) -> Option<&mut SymbolKind> {
		match self.try_lookup_mut_ext(symbol_name, not_after_stmt_idx) {
			LookupMutResult::Found((type_, _)) => Some(type_),
			LookupMutResult::NotFound | LookupMutResult::DefinedLater => None,
		}
	}

	fn try_lookup_ext(&self, symbol_name: &str, not_after_stmt_idx: Option<usize>) -> LookupResult {
		if let Some((definition_idx, kind)) = self.symbol_map.get(symbol_name) {
			if let Some(not_after_stmt_idx) = not_after_stmt_idx {
				if let StatementIdx::Index(definition_idx) = definition_idx {
					if *definition_idx > not_after_stmt_idx {
						return LookupResult::DefinedLater;
					}
				}
			}
			LookupResult::Found((
				kind,
				SymbolLookupInfo {
					phase: self.phase,
					init: self.is_init,
				},
			))
		} else if let Some(ref parent_env) = self.parent {
			parent_env.try_lookup_ext(symbol_name, not_after_stmt_idx.map(|_| self.statement_idx))
		} else {
			LookupResult::NotFound
		}
	}

	// TODO: Baahh. Find a nice way to reuse the non-mut code and remove LookupMutResult
	fn try_lookup_mut_ext(&mut self, symbol_name: &str, not_after_stmt_idx: Option<usize>) -> LookupMutResult {
		if let Some((definition_idx, kind)) = self.symbol_map.get_mut(symbol_name) {
			if let Some(not_after_stmt_idx) = not_after_stmt_idx {
				if let StatementIdx::Index(definition_idx) = definition_idx {
					if *definition_idx > not_after_stmt_idx {
						return LookupMutResult::DefinedLater;
					}
				}
			}
			LookupMutResult::Found((kind, self.phase))
		} else if let Some(ref mut parent_env) = self.parent {
			parent_env.try_lookup_mut_ext(symbol_name, not_after_stmt_idx.map(|_| self.statement_idx))
		} else {
			LookupMutResult::NotFound
		}
	}

	pub fn lookup(&self, symbol: &Symbol, not_after_stmt_idx: Option<usize>) -> Result<&SymbolKind, TypeError> {
		Ok(self.lookup_ext(symbol, not_after_stmt_idx)?.0)
	}

	pub fn lookup_ext(
		&self,
		symbol: &Symbol,
		not_after_stmt_idx: Option<usize>,
	) -> Result<(&SymbolKind, SymbolLookupInfo), TypeError> {
		let lookup_result = self.try_lookup_ext(&symbol.name, not_after_stmt_idx);

		match lookup_result {
			LookupResult::Found((kind, symbol_info)) => Ok((kind, symbol_info)),
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

	pub fn lookup_nested_str(&self, nested_str: &str, statement_idx: Option<usize>) -> Result<&SymbolKind, TypeError> {
		let nested_vec = nested_str
			.split('.')
			.map(|s| Symbol::global(s))
			.collect::<Vec<Symbol>>();
		self.lookup_nested(&nested_vec.iter().collect::<Vec<&Symbol>>(), statement_idx)
	}

	// TODO: can we make this more generic to avoid code duplication with lookup_nested_str?
	pub fn lookup_nested_mut_str(
		&mut self,
		nested_str: &str,
		statement_idx: Option<usize>,
	) -> Result<&mut SymbolKind, TypeError> {
		let nested_vec = nested_str
			.split('.')
			.map(|s| Symbol::global(s))
			.collect::<Vec<Symbol>>();
		self.lookup_nested_mut(&nested_vec.iter().collect::<Vec<&Symbol>>(), statement_idx)
	}

	pub fn lookup_nested(&self, nested_vec: &[&Symbol], statement_idx: Option<usize>) -> Result<&SymbolKind, TypeError> {
		let mut it = nested_vec.iter();

		let mut symb = *it.next().unwrap();
		let mut t = if let Some(type_ref) = self.try_lookup(&symb.name, statement_idx) {
			type_ref
		} else {
			return Err(TypeError {
				message: format!("Unknown symbol \"{}\"", symb.name),
				span: symb.span.clone(),
			});
		};

		while let Some(next_symb) = it.next() {
			// Hack: if we reach an anything symbol we just return it and don't bother if there are more nested symbols.
			// This is because we currently allow unknown stuff to be referenced under an anything which will
			// be resolved only in runtime.
			// TODO: do we still need this? Why?
			if let SymbolKind::Variable(VariableInfo { type_: t, .. }) = *t {
				if matches!(*t, Type::Anything) {
					break;
				}
			}
			let ns = if let Some(ns) = t.as_namespace() {
				ns
			} else {
				return Err(TypeError {
					message: format!("Symbol \"{}\" is not a namespace", symb.name),
					span: symb.span.clone(),
				});
			};

			let lookup_result = ns.env.try_lookup(&next_symb.name, statement_idx);

			if let Some(type_ref) = lookup_result {
				t = type_ref;
			} else {
				return Err(TypeError {
					message: format!("Unknown symbol \"{}\" in namespace \"{}\"", next_symb.name, ns.name),
					span: next_symb.span.clone(),
				});
			}

			symb = *next_symb;
		}
		Ok(t)
	}

	/// TODO: can we make this more generic to avoid code duplication with lookup_nested?
	fn lookup_nested_mut(
		&mut self,
		nested_vec: &[&Symbol],
		statement_idx: Option<usize>,
	) -> Result<&mut SymbolKind, TypeError> {
		let mut it = nested_vec.iter();

		let mut symb = *it.next().unwrap();
		let mut t = if let Some(type_ref) = self.try_lookup_mut(&symb.name, statement_idx) {
			type_ref
		} else {
			return Err(TypeError {
				message: format!("Unknown symbol \"{}\"", symb.name),
				span: symb.span.clone(),
			});
		};

		while let Some(next_symb) = it.next() {
			// Hack: if we reach an anything symbol we just return it and don't bother if there are more nested symbols.
			// This is because we currently allow unknown stuff to be referenced under an anything which will
			// be resolved only in runtime.
			// TODO: do we still need this? Why?
			if let SymbolKind::Variable(VariableInfo { type_: t, .. }) = *t {
				if matches!(*t, Type::Anything) {
					break;
				}
			}

			let ns = if let Some(ns) = t.as_mut_namespace_ref() {
				ns
			} else {
				return Err(TypeError {
					message: format!("Symbol \"{}\" is not a namespace", symb.name),
					span: symb.span.clone(),
				});
			};

			let lookup_result = ns.env.try_lookup_mut(&next_symb.name, statement_idx);

			if let Some(type_ref) = lookup_result {
				t = type_ref;
			} else {
				return Err(TypeError {
					message: format!("Unknown symbol \"{}\" in namespace \"{}\"", next_symb.name, ns.name),
					span: next_symb.span.clone(),
				});
			}

			symb = *next_symb;
		}
		Ok(t)
	}

	pub fn iter(&self, with_ancestry: bool) -> SymbolEnvIter {
		SymbolEnvIter::new(self, with_ancestry)
	}
}

pub struct SymbolEnvIter<'a> {
	seen_keys: HashSet<String>,
	curr_env: &'a SymbolEnv,
	curr_pos: btree_map::Iter<'a, String, (StatementIdx, SymbolKind)>,
	with_ancestry: bool,
}

impl<'a> SymbolEnvIter<'a> {
	fn new(env: &'a SymbolEnv, with_ancestry: bool) -> Self {
		SymbolEnvIter {
			seen_keys: HashSet::new(),
			curr_env: env,
			curr_pos: env.symbol_map.iter(),
			with_ancestry,
		}
	}
}

impl<'a> Iterator for SymbolEnvIter<'a> {
	type Item = (String, &'a SymbolKind, SymbolLookupInfo);

	fn next(&mut self) -> Option<Self::Item> {
		if let Some((name, (_, kind))) = self.curr_pos.next() {
			if self.seen_keys.contains(name) {
				self.next()
			} else {
				self.seen_keys.insert(name.clone());
				Some((
					name.clone(),
					kind,
					SymbolLookupInfo {
						phase: self.curr_env.phase,
						init: self.curr_env.is_init,
					},
				))
			}
		} else if self.with_ancestry {
			if let Some(ref parent_env) = self.curr_env.parent {
				self.curr_env = parent_env;
				self.curr_pos = self.curr_env.symbol_map.iter();
				self.next()
			} else {
				None
			}
		} else {
			None
		}
	}
}
