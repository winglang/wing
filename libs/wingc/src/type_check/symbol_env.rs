use colored::Colorize;
use derivative::Derivative;
use duplicate::duplicate_item;

use crate::{
	ast::{AccessModifier, Phase, Symbol},
	diagnostic::{DiagnosticAnnotation, TypeError, WingSpan},
	type_check::{SymbolKind, Type, TypeRef},
};
use std::fmt::Debug;
use std::{
	collections::{btree_map, BTreeMap, HashSet},
	fmt::Display,
};

use super::{UnsafeRef, VariableInfo};

pub type SymbolEnvRef = UnsafeRef<SymbolEnv>;

impl Debug for SymbolEnvRef {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{:?}", &**self)
	}
}

pub struct SymbolEnv {
	// We use a BTreeMaps here so that we can iterate over the symbols in a deterministic order (snapshot tests)
	pub(crate) symbol_map: BTreeMap<String, SymbolEnvEntry>,
	pub(crate) parent: Option<SymbolEnvRef>,

	pub kind: SymbolEnvKind,

	pub phase: Phase,
	pub type_parameters: Option<Vec<TypeRef>>,
	statement_idx: usize,
}

pub struct SymbolEnvEntry {
	pub statement_idx: StatementIdx,
	pub span: WingSpan,
	pub access: AccessModifier,
	pub kind: SymbolKind,
}

pub enum SymbolEnvKind {
	Scope,
	Function { is_init: bool, sig: TypeRef },
	Type(TypeRef),
}

impl Display for SymbolEnv {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		let mut level = 0;
		let mut env = self;
		loop {
			write!(f, "level {}: {{ ", level.to_string().bold())?;
			let mut items = vec![];
			for (name, entry) in &env.symbol_map {
				let repr = match &entry.kind {
					SymbolKind::Type(t) => format!("{} [type]", t).red(),
					SymbolKind::Variable(v) => format!("{}", v.type_).blue(),
					SymbolKind::Namespace(ns) => format!("{} [namespace]", ns.name).green(),
				};
				items.push(format!("{} => {}", name.bold(), repr));
			}
			write!(f, "{} }}", items.join(", "))?;

			if let Some(parent) = &env.parent {
				env = parent;
				level += 1;
				writeln!(f)?; // new line
			} else {
				break;
			}
		}

		Ok(())
	}
}

impl Debug for SymbolEnv {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		let mut symbols_with_access_modifiers: Vec<(String, AccessModifier)> = vec![];
		for (name, entry) in &self.symbol_map {
			symbols_with_access_modifiers.push((name.clone(), entry.access));
		}
		f.debug_struct("SymbolEnv")
			.field("symbols", &symbols_with_access_modifiers)
			.field("phase", &self.phase)
			.finish()
	}
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
#[duplicate_item(
	LookupResult reference(lifetime, type) SymbolLookupInfo;
	[LookupResult] [& 'lifetime type] [SymbolLookupInfo];
	[LookupResultMut] [& 'lifetime mut type] [SymbolLookupInfoMut];
)]
#[derive(Debug)]
pub enum LookupResult<'a> {
	/// The kind of symbol and useful metadata associated with its lookup
	Found(reference([a], [SymbolKind]), SymbolLookupInfo),
	/// A matching symbol was found but it's not public
	NotPublic(reference([a], [SymbolKind]), SymbolLookupInfo),
	/// The symbol was not found in the environment, contains the name of the symbol or part of it that was not found
	/// If the lookup environment was a type environment, the type is also included
	NotFound(Symbol, Option<TypeRef>),
	/// A symbol with a matching name was found in multiple environments.
	MultipleFound,
	/// The symbol exists in the environment but it's not defined yet (based on the statement
	/// index passed to the lookup)
	DefinedLater(WingSpan),
	/// Expected a namespace in a nested lookup but found a different kind of symbol
	ExpectedNamespace(Symbol),
}

#[duplicate_item(
	LookupResult reference(lifetime, type) SymbolLookupInfo;
	[LookupResult] [& 'lifetime type] [SymbolLookupInfo];
	[LookupResultMut] [& 'lifetime mut type] [SymbolLookupInfoMut];
)]
impl<'a> LookupResult<'a> {
	pub fn unwrap(self) -> (reference([a], [SymbolKind]), SymbolLookupInfo) {
		match self {
			LookupResult::Found(kind, info) => (kind, info),
			LookupResult::NotPublic(x, _) => panic!("LookupResult::unwrap({x}) called on LookupResult::NotPublic"),
			LookupResult::NotFound(x, ..) => panic!("LookupResult::unwrap({x}) called on LookupResult::NotFound"),
			LookupResult::MultipleFound => panic!("LookupResult::unwrap() called on LookupResult::MultipleFound"),
			LookupResult::DefinedLater(_) => panic!("LookupResult::unwrap() called on LookupResult::DefinedLater"),
			LookupResult::ExpectedNamespace(symbol) => panic!(
				"LookupResult::unwrap() called on LookupResult::ExpectedNamespace({:?})",
				symbol
			),
		}
	}

	pub fn expect(self, message: &str) -> (reference([a], [SymbolKind]), SymbolLookupInfo) {
		match self {
			LookupResult::Found(kind, info) => (kind, info),
			_ => panic!("{message}"),
		}
	}

	pub fn ok(self) -> Option<(reference([a], [SymbolKind]), SymbolLookupInfo)> {
		match self {
			LookupResult::Found(kind, info) => Some((kind, info)),
			_ => None,
		}
	}
}

#[duplicate_item(
	SymbolLookupInfo SymbolEnvRef;
	[SymbolLookupInfo] [SymbolEnvRef];
	[SymbolLookupInfoMut] [()];
)]
#[derive(Derivative)]
#[derivative(Debug)]
pub struct SymbolLookupInfo {
	/// The phase the symbol was defined in
	pub phase: Phase,
	/// Whether the symbol was defined in an `init`'s environment
	pub init: bool,

	/// The original span of the symbol when first defined
	pub span: WingSpan,

	pub access: AccessModifier,

	/// The environment in which this symbol is defined.
	#[derivative(Debug = "ignore")]
	pub env: SymbolEnvRef,
}

impl SymbolEnv {
	pub fn new(parent: Option<SymbolEnvRef>, kind: SymbolEnvKind, phase: Phase, statement_idx: usize) -> Self {
		assert_is_type_env(parent, &kind);

		Self {
			symbol_map: BTreeMap::new(),
			parent,
			kind,
			phase,
			statement_idx,
			type_parameters: None,
		}
	}

	pub fn new_with_type_params(
		parent: Option<SymbolEnvRef>,
		kind: SymbolEnvKind,
		phase: Phase,
		statement_idx: usize,
		type_params: Vec<UnsafeRef<Type>>,
	) -> Self {
		assert_is_type_env(parent, &kind);

		Self {
			symbol_map: BTreeMap::new(),
			parent,
			kind,
			phase,
			statement_idx,
			type_parameters: Some(type_params),
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

	/// Checks if this environment is a parent of another environment.
	pub fn is_parent_of(&self, other: &SymbolEnv) -> bool {
		let Some(parent) = other.parent else {
			return false;
		};

		if self.is_same(&parent) {
			return true;
		}

		self.is_parent_of(&parent)
	}

	/**
	 * Determines if this environment is a child of another environment (i.e. the other
	 * environment is one of its parents).
	 */
	pub fn is_child_of(&self, other: &SymbolEnv) -> bool {
		other.is_parent_of(self)
	}

	pub fn is_same(&self, other: &SymbolEnv) -> bool {
		std::ptr::eq(other, self)
	}

	pub fn define(
		&mut self,
		symbol: &Symbol,
		kind: SymbolKind,
		access: AccessModifier,
		pos: StatementIdx,
	) -> Result<(), TypeError> {
		if self.symbol_map.contains_key(&symbol.name) {
			return Err(TypeError {
				span: symbol.span.clone(),
				message: format!("Symbol \"{}\" already defined in this scope", symbol.name),
				annotations: vec![DiagnosticAnnotation {
					message: "previous definition".to_string(),
					span: self.symbol_map[&symbol.name].span.clone(),
				}],
			});
		}

		self.symbol_map.insert(
			symbol.name.clone(),
			SymbolEnvEntry {
				statement_idx: pos,
				span: symbol.span.clone(),
				access,
				kind,
			},
		);

		Ok(())
	}

	#[allow(clippy::needless_arbitrary_self_type)]
	#[duplicate_item(
		lookup reference(type) lookup_ext SymbolLookupInfo;
		[lookup] [& type] [lookup_ext] [SymbolLookupInfo];
		[lookup_mut] [& mut type] [lookup_ext_mut] [SymbolLookupInfoMut];
	)]
	/// Lookup a symbol in the environment, returning the symbol kind if it was found.
	/// Note that the symbol name cannot be a nested symbol (e.g. `foo.bar`). Use
	/// `lookup_nested` for that.
	/// This is a simplified version of `lookup_ext` that only returns the symbol kind
	/// without the added `SymbolLookupInfo` metadata and without details lookup errors,
	/// just `None`.
	pub fn lookup(
		self: reference([Self]),
		symbol: &Symbol,
		not_after_stmt_idx: Option<usize>,
	) -> Option<reference([SymbolKind])> {
		self.lookup_ext(symbol, not_after_stmt_idx).ok().map(|(kind, _)| kind)
	}

	#[allow(clippy::needless_arbitrary_self_type)]
	#[duplicate_item(
		lookup_ext LookupResult map_get reference(type) ref_annotation(ident) get_ref SymbolLookupInfo;
		[lookup_ext] [LookupResult] [get] [& type] [ref ident] [self.get_ref()] [SymbolLookupInfo];
		[lookup_ext_mut] [LookupResultMut] [get_mut] [&mut type] [ref mut ident] [()] [SymbolLookupInfoMut];
	)]
	/// Lookup a symbol in the environment, returning a `LookupResult`. Note that the symbol name
	/// cannot be a nested symbol (e.g. `foo.bar`), use `lookup_nested` for that.
	/// TODO: perhaps make this private and switch to the nested version in all external calls
	pub fn lookup_ext(self: reference([Self]), symbol: &Symbol, not_after_stmt_idx: Option<usize>) -> LookupResult {
		if let Some(entry) = self.symbol_map.map_get(&symbol.name) {
			// if found the symbol and it is defined before the statement index (or statement index is
			// unspecified, which is likely not something we want to support), we found it
			let lookup_index = not_after_stmt_idx.unwrap_or(usize::MAX);
			let definition_idx = match entry.statement_idx {
				StatementIdx::Top => 0,
				StatementIdx::Index(idx) => idx,
			};

			if lookup_index < definition_idx {
				return LookupResult::DefinedLater(entry.span.clone());
			}

			return LookupResult::Found(
				reference([entry.kind]),
				SymbolLookupInfo {
					phase: self.phase,
					init: matches!(self.kind, SymbolEnvKind::Function { is_init: true, .. }),
					access: entry.access,
					env: get_ref,
					span: entry.span.clone(),
				},
			);
		}

		// Get the type of this env (if it's a type env) to include in the result
		let env_type = if let SymbolEnvKind::Type(t) = self.kind {
			Some(t)
		} else {
			None
		};

		// we couldn't find the symbol in the current environment, let's look up in the parent
		// environment.
		if let Some(ref_annotation([parent_env])) = self.parent {
			let res = parent_env.lookup_ext(symbol, not_after_stmt_idx.map(|_| self.statement_idx));
			// The `NotFound` result needs to include the type of the original (non-parent) environment (if applicable)
			let res = match res {
				LookupResult::NotFound(s, ..) => LookupResult::NotFound(s, env_type),
				_ => res,
			};
			return res;
		}

		LookupResult::NotFound(symbol.clone(), env_type)
	}

	#[allow(clippy::needless_arbitrary_self_type)]
	#[duplicate_item(
		lookup_nested LookupResult lookup_ext as_namespace reference(type) SymbolLookupInfo vec_iter;
		[lookup_nested] [LookupResult] [lookup_ext] [as_namespace] [& type] [SymbolLookupInfo] [iter];
		[lookup_nested_mut] [LookupResultMut] [lookup_ext_mut] [as_namespace_mut] [&mut type] [SymbolLookupInfoMut] [iter_mut];
	)]
	/// Lookup a symbol in the environment, returning a `LookupResult`. The symbol name may be a
	/// nested symbol (e.g. `foo.bar`) if `nested_vec` is larger than 1.
	pub fn lookup_nested(self: reference([Self]), nested_vec: &[&Symbol], statement_idx: Option<usize>) -> LookupResult {
		let mut it = nested_vec.iter();

		let symb = *it.next().unwrap();

		let res = self.lookup_ext(symb, statement_idx);
		let mut res = if let LookupResult::Found(k, i) = res {
			(k, i)
		} else {
			return res;
		};

		let mut prev_symb = symb;
		while let Some(next_symb) = it.next() {
			// Hack: if we reach an anything symbol we just return it and don't bother if there are more nested symbols.
			// This is because we currently allow unknown stuff to be referenced under an anything which will
			// be resolved only in runtime.
			// TODO: do we still need this? Why?
			if let SymbolKind::Variable(VariableInfo { type_: t, .. }) = *res.0 {
				if matches!(*t, Type::Anything) {
					break;
				}
			}
			let ns = if let Some(ns) = res.0.as_namespace() {
				ns
			} else {
				return LookupResult::ExpectedNamespace(prev_symb.clone());
			};

			// Look up the result in each env. If there are multiple results, throw a special error
			// otherwise proceed normally
			let mut lookup_result = LookupResult::NotFound((*next_symb).clone(), None);
			for env in ns.envs.vec_iter() {
				// invariant: lookup_result is never "ExpectedNamespace" or "MultipleFound"

				// We're looking up a symbol in a namespace other than our own, so we need to
				// check if the symbol is public or not. If it's not, replace a "Found" result
				// with a "NotPublic" result.
				let partial_result = match env.lookup_ext(next_symb, statement_idx) {
					LookupResult::Found(kind, info) => match info.access {
						AccessModifier::Public => LookupResult::Found(kind, info),
						AccessModifier::Private => LookupResult::NotPublic(kind, info),
						AccessModifier::Protected => panic!("symbols in namespaces cannot be protected"),
					},
					result => result,
				};

				// if the current result was "Found" or "DefinedLater", and the partial result
				// was "Found" or "DefinedLater", then we have multiple valid results
				if (matches!(partial_result, LookupResult::Found(_, _))
					|| matches!(partial_result, LookupResult::DefinedLater(_)))
					&& (matches!(lookup_result, LookupResult::Found(_, _))
						|| matches!(lookup_result, LookupResult::DefinedLater(_)))
				{
					return LookupResult::MultipleFound;
				}

				// if the current result was "NotPublic" or "NotFound" but we got a
				// "Found" or "DefinedLater" partial result, then report that instead
				#[allow(clippy::if_same_then_else)]
				if (matches!(partial_result, LookupResult::Found(_, _))
					|| matches!(partial_result, LookupResult::DefinedLater(_)))
					&& (matches!(lookup_result, LookupResult::NotPublic(_, _))
						|| matches!(lookup_result, LookupResult::NotFound(..)))
				{
					lookup_result = partial_result;
				}
				// if we found a symbol but it wasn't public, we can update our
				// result if we're currently "NotFound". "Found", "DefinedLater", and any
				// existing "NotPublic" results take precedence.
				else if (matches!(partial_result, LookupResult::NotPublic(_, _)))
					&& (matches!(lookup_result, LookupResult::NotFound(..)))
				{
					lookup_result = partial_result;
				}
			}
			match lookup_result {
				LookupResult::Found(k, i) => {
					res = (k, i);
				}
				r => return r,
			}

			prev_symb = *next_symb;
		}
		let (kind, lookup_info) = res;
		LookupResult::Found(kind, lookup_info)
	}

	#[allow(clippy::needless_arbitrary_self_type)]
	#[duplicate_item(
		lookup_nested_str LookupResult lookup_nested reference(type);
		[lookup_nested_str] [LookupResult] [lookup_nested] [& type];
		[lookup_nested_str_mut] [LookupResultMut] [lookup_nested_mut] [&mut type];
	)]
	/// Lookup a symbol in the environment, returning a `LookupResult`. The symbol name may be a
	/// nested symbol (e.g. `foo.bar`).
	pub fn lookup_nested_str(self: reference([Self]), nested_str: &str, statement_idx: Option<usize>) -> LookupResult {
		let nested_vec = nested_str
			.split('.')
			.map(|s| Symbol::global(s))
			.collect::<Vec<Symbol>>();
		self.lookup_nested(&nested_vec.iter().collect::<Vec<&Symbol>>(), statement_idx)
	}

	pub fn iter(&self, with_ancestry: bool) -> SymbolEnvIter {
		SymbolEnvIter::new(self, with_ancestry)
	}

	pub fn is_in_function(&self) -> bool {
		matches!(self.kind, SymbolEnvKind::Function { .. })
	}
}

pub struct SymbolEnvIter<'a> {
	seen_keys: HashSet<String>,
	curr_env: &'a SymbolEnv,
	curr_pos: btree_map::Iter<'a, String, SymbolEnvEntry>,
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
		if let Some((name, entry)) = self.curr_pos.next() {
			if self.seen_keys.contains(name) {
				self.next()
			} else {
				self.seen_keys.insert(name.clone());
				Some((
					name.clone(),
					&entry.kind,
					SymbolLookupInfo {
						phase: self.curr_env.phase,
						init: matches!(self.curr_env.kind, SymbolEnvKind::Function { is_init: true, .. }),
						access: entry.access,
						env: self.curr_env.get_ref(),
						span: entry.span.clone(),
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

/// Asserts that if the given environment is not `None` and the given kind is a type environment,
/// then the environment is also a type environment.
fn assert_is_type_env(env: Option<SymbolEnvRef>, kind: &SymbolEnvKind) {
	if let Some(env) = &env {
		if matches!(kind, SymbolEnvKind::Type(_)) {
			assert!(matches!(env.kind, SymbolEnvKind::Type(_)));
		}
	}
}

#[cfg(test)]
mod tests {
	use crate::{
		ast::{AccessModifier, Phase, Symbol},
		type_check::{
			symbol_env::{LookupResult, SymbolEnvKind},
			Namespace, ResolveSource, SymbolKind, Types,
		},
	};

	use super::{StatementIdx, SymbolEnv};

	fn setup_types() -> Types {
		Types::new()
	}

	#[test]
	fn test_statement_idx_lookups() {
		let types = setup_types();
		let mut parent_env = SymbolEnv::new(None, SymbolEnvKind::Scope, Phase::Independent, 0);
		let child_scope_idx = 10;
		let mut child_env = SymbolEnv::new(
			Some(parent_env.get_ref()),
			SymbolEnvKind::Scope,
			crate::ast::Phase::Independent,
			child_scope_idx,
		);

		// Define a globally visible variable in the parent env
		let sym = Symbol::global("parent_global_var");
		assert!(matches!(
			parent_env.define(
				&sym,
				SymbolKind::make_free_variable(sym.clone(), types.number(), false, Phase::Independent),
				AccessModifier::Private,
				StatementIdx::Top,
			),
			Ok(())
		));

		// Define a positionally visible variable in the parent env before the child scope
		let sym = Symbol::global("parent_low_pos_var");
		assert!(matches!(
			parent_env.define(
				&sym,
				SymbolKind::make_free_variable(sym.clone(), types.number(), false, Phase::Independent),
				AccessModifier::Private,
				StatementIdx::Index(child_scope_idx - 1),
			),
			Ok(())
		));

		// Define a positionally visible variable in the parent env after the child scope
		let parent_high_pos_var_idx = child_scope_idx + 1;
		let sym = Symbol::global("parent_high_pos_var");
		assert!(matches!(
			parent_env.define(
				&sym,
				SymbolKind::make_free_variable(sym.clone(), types.number(), false, Phase::Independent),
				AccessModifier::Private,
				StatementIdx::Index(parent_high_pos_var_idx),
			),
			Ok(())
		));

		// Define a globally visible variable in the child env
		let sym = Symbol::global("child_global_var");
		assert!(matches!(
			child_env.define(
				&sym,
				SymbolKind::make_free_variable(sym.clone(), types.number(), false, Phase::Independent),
				AccessModifier::Private,
				StatementIdx::Top,
			),
			Ok(())
		));

		// Lookup non-existent variable
		assert!(matches!(
			parent_env.lookup_nested_str("non_existent_var", None),
			LookupResult::NotFound(..)
		));

		// Lookup globally visible variable
		assert!(matches!(
			parent_env.lookup_nested_str("parent_global_var", None),
			LookupResult::Found(SymbolKind::Variable(_), _)
		));

		// Lookup globally visible variable using low statement index
		assert!(matches!(
			parent_env.lookup_nested_str("parent_global_var", Some(0)),
			LookupResult::Found(SymbolKind::Variable(_), _)
		));

		// Lookup positionally visible variable using an index after it's defined
		assert!(matches!(
			parent_env.lookup_nested_str("parent_high_pos_var", Some(parent_high_pos_var_idx + 1)),
			LookupResult::Found(SymbolKind::Variable(_), _)
		));

		// Lookup positionally visible variable using an index before it's defined
		assert!(matches!(
			parent_env.lookup_nested_str("parent_high_pos_var", Some(parent_high_pos_var_idx - 1)),
			LookupResult::DefinedLater(_)
		));

		// Lookup a globally visible parent var in the child env with a low statement index
		assert!(matches!(
			child_env.lookup_nested_str("parent_global_var", Some(0)),
			LookupResult::Found(SymbolKind::Variable(_), _)
		));

		// Lookup a globally visible parent var in the child env with a high statement index
		assert!(matches!(
			child_env.lookup_nested_str("parent_global_var", Some(1000)),
			LookupResult::Found(SymbolKind::Variable(_), _)
		));

		// Lookup a positionally visible parent var defined after the child scope in the child env using a low statement index
		assert!(matches!(
			child_env.lookup_nested_str("parent_high_pos_var", Some(0)),
			LookupResult::DefinedLater(_)
		));

		// Lookup for a child var in the parent env
		assert!(matches!(
			parent_env.lookup_nested_str("child_global_var", None),
			LookupResult::NotFound(..)
		));

		// Lookup for a var in the child env
		assert!(matches!(
			child_env.lookup_nested_str("child_global_var", None),
			LookupResult::Found(SymbolKind::Variable(_), _)
		));
	}

	#[test]
	fn test_nested_lookups() {
		let mut types = setup_types();
		let mut parent_env = SymbolEnv::new(None, SymbolEnvKind::Scope, Phase::Independent, 0);
		let child_env = SymbolEnv::new(
			Some(parent_env.get_ref()),
			SymbolEnvKind::Scope,
			crate::ast::Phase::Independent,
			0,
		);

		// Create namespaces
		let mut ns1_env = types.add_symbol_env(SymbolEnv::new(None, SymbolEnvKind::Scope, Phase::Independent, 0));
		let mut ns2_env = types.add_symbol_env(SymbolEnv::new(
			Some(ns1_env),
			SymbolEnvKind::Scope,
			Phase::Independent,
			0,
		));
		let ns1 = types.add_namespace(Namespace {
			name: "ns1".to_string(),
			envs: vec![ns1_env],
			loaded: false,
			module_path: ResolveSource::WingFile,
		});
		let ns2 = types.add_namespace(Namespace {
			name: "ns2".to_string(),
			envs: vec![ns2_env],
			loaded: false,
			module_path: ResolveSource::WingFile,
		});

		// Define ns2 in n1's env
		assert!(matches!(
			ns1_env.define(
				&Symbol::global("ns2"),
				SymbolKind::Namespace(ns2),
				AccessModifier::Public,
				StatementIdx::Top
			),
			Ok(())
		));

		// Define a variable in n2's env
		let sym = Symbol::global("ns2_var");
		assert!(matches!(
			ns2_env.define(
				&sym,
				SymbolKind::make_free_variable(sym.clone(), types.number(), false, Phase::Independent),
				AccessModifier::Public,
				StatementIdx::Top,
			),
			Ok(())
		));

		// Define a variable in n1's env
		let sym = Symbol::global("ns1_var");
		assert!(matches!(
			ns1_env.define(
				&sym,
				SymbolKind::make_free_variable(sym.clone(), types.number(), false, Phase::Independent),
				AccessModifier::Public,
				StatementIdx::Top,
			),
			Ok(())
		));

		// Define the namesapces in the parent env
		assert!(matches!(
			parent_env.define(
				&Symbol::global("ns1"),
				SymbolKind::Namespace(ns1),
				AccessModifier::Public,
				StatementIdx::Top
			),
			Ok(())
		));

		// Perform a nested lookup from the parent env
		assert!(matches!(
			parent_env.lookup_nested_str("ns1.ns2.ns2_var", None),
			LookupResult::Found(SymbolKind::Variable(_), _)
		));

		// Perform a nested lookup from the child env
		assert!(matches!(
			child_env.lookup_nested_str("ns1.ns2.ns2_var", None),
			LookupResult::Found(SymbolKind::Variable(_), _)
		));

		// Perform a nested lookup through a existing variable name
		let res = child_env.lookup_nested_str("ns1.ns1_var.ns2_var", None);
		match res {
			LookupResult::ExpectedNamespace(s) => {
				assert!(s.name == "ns1_var")
			}
			_ => panic!("Expected LookupResult::ExpectedNamespace(_) but got {:?}", res),
		}

		// Perform a nested lookup for a non-existent var
		let res = child_env.lookup_nested_str("ns1.ns2.non_existent", None);
		match res {
			LookupResult::NotFound(s, ..) => {
				assert!(s.name == "non_existent")
			}
			_ => panic!("Expected LookupResult::NotFount(_) but got {:?}", res),
		}

		// Perform a nested lookup through a non-existent namespace
		let res = child_env.lookup_nested_str("ns1.non_existent.ns2_var", None);
		match res {
			LookupResult::NotFound(s, ..) => {
				assert!(s.name == "non_existent")
			}
			_ => panic!("Expected LookupResult::NotFount(_) but got {:?}", res),
		}
	}
}
