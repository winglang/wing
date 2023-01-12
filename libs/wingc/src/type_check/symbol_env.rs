use crate::{
	ast::{Phase, Symbol},
	diagnostic::{TypeError, WingSpan},
	type_check::{SymbolKind, Type, TypeRef},
};
use std::collections::{hash_map, HashMap, HashSet};

use super::UnsafeRef;

pub type SymbolEnvRef = UnsafeRef<SymbolEnv>;

pub struct SymbolEnv {
	pub(crate) ident_map: HashMap<String, (StatementIdx, SymbolKind)>,
	parent: Option<SymbolEnvRef>,
	pub return_type: TypeRef,
	is_class: bool,
	pub flight: Phase,
	statement_idx: usize,
}

// TODO See TypeRef for why this is necessary
unsafe impl Send for SymbolEnv {}

// The index (position) of the statement where a certain symbol was defined
// this is useful to determine if a symbol can be used in a certain
// expression or whether it is being used before it's defined.
#[derive(Debug)]
pub enum StatementIdx {
	Index(usize),
	Top, // Special value meaning the symbol should be treated as if it was defined at the top of the scope
}

// Possible results for a symbol lookup in the environment
enum LookupResult<'a> {
	// The type of the symbol and its flight phase
	Found((&'a SymbolKind, Phase)),
	// The symbol was not found in the environment
	NotFound,
	// The symbol exists in the environment but it's not defined yet (based on the statement
	// index passed to the lookup)
	DefinedLater,
}

enum LookupMutResult<'a> {
	// The type of the symbol and its flight phase
	Found((&'a mut SymbolKind, Phase)),
	// The symbol was not found in the environment
	NotFound,
	// The symbol exists in the environment but it's not defined yet (based on the statement
	// index passed to the lookup)
	DefinedLater,
}

impl SymbolEnv {
	pub fn new(
		parent: Option<SymbolEnvRef>,
		return_type: TypeRef,
		is_class: bool,
		flight: Phase,
		statement_idx: usize,
	) -> Self {
		// assert that if the return type isn't void, then there is a parent environment
		assert!(matches!(*return_type, Type::Void) || parent.is_some());

		Self {
			ident_map: HashMap::new(),
			parent,
			return_type,
			is_class,
			flight,
			statement_idx,
		}
	}

	// Used to get an unsafe reference to this symbol environment so it be referenced by
	// other types or environments (e.g. as a parent class or parent scope)
	pub fn get_ref(&self) -> SymbolEnvRef {
		UnsafeRef::<Self>(self)
	}

	pub fn is_root(&self) -> bool {
		self.parent.is_none()
	}

	pub fn define(&mut self, symbol: &Symbol, kind: SymbolKind, pos: StatementIdx) -> Result<(), TypeError> {
		if self.ident_map.contains_key(&symbol.name) {
			return Err(TypeError {
				span: symbol.span.clone(),
				message: format!("Symbol \"{}\" already defined in this scope", symbol.name),
			});
		}

		// Avoid variable shadowing
		if let Some(_parent_env) = self.parent {
			if let Some(parent_kind) = self.try_lookup(&symbol.name, None) {
				// If we're a class we allow "symbol shadowing" for methods
				let is_function = if let SymbolKind::Variable(t) = kind {
					matches!(*t, Type::Function(_))
				} else {
					false
				};
				let is_parent_function = if let SymbolKind::Variable(t) = *parent_kind {
					matches!(*t, Type::Function(_))
				} else {
					false
				};
				if !(self.is_class && is_parent_function && is_function) {
					return Err(TypeError {
						span: symbol.span.clone(),
						message: format!("Symbol \"{}\" already defined in parent scope.", symbol.name),
					});
				}
			}
		}
		self.ident_map.insert(symbol.name.clone(), (pos, kind));

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
		if let Some((definition_idx, kind)) = self.ident_map.get(symbol_name) {
			if let Some(not_after_stmt_idx) = not_after_stmt_idx {
				if let StatementIdx::Index(definition_idx) = definition_idx {
					if *definition_idx > not_after_stmt_idx {
						return LookupResult::DefinedLater;
					}
				}
			}
			LookupResult::Found((kind.into(), self.flight))
		} else if let Some(ref parent_env) = self.parent {
			parent_env.try_lookup_ext(symbol_name, not_after_stmt_idx.map(|_| self.statement_idx))
		} else {
			LookupResult::NotFound
		}
	}

	// Baahh. Find a nice way to reuse the non-mut code and remove LookupMutResult
	fn try_lookup_mut_ext(&mut self, symbol_name: &str, not_after_stmt_idx: Option<usize>) -> LookupMutResult {
		if let Some((definition_idx, kind)) = self.ident_map.get_mut(symbol_name) {
			if let Some(not_after_stmt_idx) = not_after_stmt_idx {
				if let StatementIdx::Index(definition_idx) = definition_idx {
					if *definition_idx > not_after_stmt_idx {
						return LookupMutResult::DefinedLater;
					}
				}
			}
			LookupMutResult::Found((kind.into(), self.flight))
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
	) -> Result<(&SymbolKind, Phase), TypeError> {
		let lookup_result = self.try_lookup_ext(&symbol.name, not_after_stmt_idx);

		match lookup_result {
			LookupResult::Found((kind, flight)) => Ok((kind, flight)),
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

	pub fn lookup_nested_str(
		&self,
		nested_str: &str,
		ignore_hidden: bool,
		statement_idx: Option<usize>,
	) -> Result<&SymbolKind, TypeError> {
		let nested_vec = nested_str
			.split('.')
			.map(|s| Symbol {
				name: s.to_string(),
				span: WingSpan::global(),
			})
			.collect::<Vec<Symbol>>();
		self.lookup_nested(
			&nested_vec.iter().collect::<Vec<&Symbol>>(),
			ignore_hidden,
			statement_idx,
		)
	}

	// Pass `ignore_hidden: true` if it's OK to return types that have only been imported implicitly (such as through an inheritance chain), and false otherwise
	pub fn lookup_nested(
		&self,
		nested_vec: &[&Symbol],
		ignore_hidden: bool,
		statement_idx: Option<usize>,
	) -> Result<&SymbolKind, TypeError> {
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
			if let SymbolKind::Variable(t) = *t {
				if matches!(*t, Type::Anything) {
					break;
				}
			}
			let ns = if let Some(ns) = t.as_namespace() {
				if ns.hidden && !ignore_hidden {
					return Err(TypeError {
						message: format!("\"{}\" was not brought", symb.name),
						span: symb.span.clone(),
					});
				}
				ns
			} else {
				return Err(TypeError {
					message: format!("Symbol \"{}\" is not a namespace", symb.name),
					span: symb.span.clone(),
				});
			};

			let lookup_result = ns.env.try_lookup(&(*next_symb).name, statement_idx);

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

	pub fn iter(&self) -> TypeEnvIter {
		TypeEnvIter::new(self)
	}
}

pub struct TypeEnvIter<'a> {
	seen_keys: HashSet<String>,
	curr_env: &'a SymbolEnv,
	curr_pos: hash_map::Iter<'a, String, (StatementIdx, SymbolKind)>,
}

impl<'a> TypeEnvIter<'a> {
	fn new(env: &'a SymbolEnv) -> Self {
		TypeEnvIter {
			seen_keys: HashSet::new(),
			curr_env: env,
			curr_pos: env.ident_map.iter(),
		}
	}
}

impl<'a> Iterator for TypeEnvIter<'a> {
	type Item = (String, &'a SymbolKind);

	fn next(&mut self) -> Option<Self::Item> {
		if let Some((name, (_, kind))) = self.curr_pos.next() {
			if self.seen_keys.contains(name) {
				self.next()
			} else {
				self.seen_keys.insert(name.clone());
				Some((name.clone(), kind.into()))
			}
		} else if let Some(ref parent_env) = self.curr_env.parent {
			self.curr_env = parent_env;
			self.curr_pos = self.curr_env.ident_map.iter();
			self.next()
		} else {
			None
		}
	}
}
