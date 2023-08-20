use std::collections::{BTreeMap, BTreeSet, HashMap};

use itertools::Itertools;

use crate::ast::{Symbol, UserDefinedType};

use super::CLASS_INFLIGHT_INIT_NAME;

/// A repository of lifts and captures at the class level.
#[derive(Debug)]
pub struct Lifts {
	/// All the lifts. Map from method to a map from token to lift.
	pub lifts: BTreeMap<String, BTreeMap<String, MethodLift>>, //BTreeMap<String, MethodLift>,

	/// All the captures. The key is token the value is the preflight code.
	pub captures: BTreeMap<String, String>,

	/// Map from token to lift
	lift_by_token: BTreeMap<String, Lift>,

	/// Map between liftable AST element and a lift token.
	token_for_liftable: HashMap<Liftable, String>,
}

/// Ast elements that may be lifted
#[derive(Debug, PartialEq, Eq, Hash, Clone)]
pub enum Liftable {
	Expr(usize),
	Type(UserDefinedType),
}

/// A record that describes a single lift from a method.
#[derive(Debug)]
pub struct MethodLift {
	/// The javascript code to lift (preflight)
	pub code: String,

	/// The operations that qualify the lift (the property names)
	pub ops: BTreeSet<String>,

	/// Indicates if this is a lift for a field or a free variable
	pub is_field: bool,
}

/// A record that describes a lift from a class.
#[derive(Debug)]
pub struct Lift {
	/// Whether this is a field lift (`this.foo`)
	pub is_field: bool,
}

impl Lifts {
	pub fn new() -> Self {
		Self {
			lifts: BTreeMap::new(),
			lift_by_token: BTreeMap::new(),
			captures: BTreeMap::new(),
			token_for_liftable: HashMap::new(),
		}
	}

	/// Returns the list of all lifts from this class.
	pub fn lifts(&self) -> Vec<&Lift> {
		self.lift_by_token.values().collect_vec()
	}

	fn render_token(&self, code: &str) -> String {
		if code == "this" {
			return code.to_string();
		}

		format!("${}", replace_non_alphanumeric(code))
	}

	/// Adds a lift for an expression.
	pub fn lift(&mut self, lifted_thing: &Liftable, method: Option<Symbol>, property: Option<Symbol>, code: &str) {
		let is_field = code.contains("this."); // TODO: starts_with

		let token = self.render_token(code);

		self
			.token_for_liftable
			.entry(lifted_thing.clone())
			.or_insert(token.clone());

		self.lift_by_token.entry(token.clone()).or_insert(Lift { is_field });

		let method = method.map(|m| m.name).unwrap_or(Default::default());

		self.add_lift(
			method,
			token.clone(),
			code,
			property.as_ref().map(|s| s.name.clone()),
			is_field,
		);

		// add a lift to the inflight initializer or capture it if its not a field
		if is_field {
			self.add_lift(CLASS_INFLIGHT_INIT_NAME.to_string(), token, code, None, true);
		} else {
			self.capture(&lifted_thing, code);
		}
	}

	fn add_lift(&mut self, method: String, token: String, code: &str, property: Option<String>, is_field: bool) {
		let lift = self
			.lifts
			.entry(method)
			.or_default()
			.entry(token)
			.or_insert(MethodLift {
				code: code.to_string(),
				ops: BTreeSet::new(),
				is_field,
			});

		if let Some(op) = &property {
			lift.ops.insert(op.clone());
		}
	}

	/// Returns the token for a liftable. Called by the jsifier when emitting inflight code.
	pub fn token_for_liftable(&self, lifted_thing: &Liftable) -> Option<String> {
		let Some(token) = self.token_for_liftable.get(lifted_thing) else {
			return None;
		};

		let is_field = if let Some(lift) = self.lift_by_token.get(token) {
			lift.is_field
		} else {
			false
		};

		if is_field {
			return Some(format!("this.{}", token).to_string());
		} else {
			return Some(token.clone());
		}
	}

	/// Captures a liftable piece of code.
	pub fn capture(&mut self, lifted_thing: &Liftable, code: &str) {
		// no need to capture this (it's already in scope)
		if code == "this" {
			return;
		}

		let token = self.render_token(code);

		self
			.token_for_liftable
			.entry(lifted_thing.clone())
			.or_insert(token.clone());

		self.captures.entry(token.clone()).or_insert(code.to_string());
	}

	/// List of all lifted fields in the class. (map from lift token to preflight code)
	pub fn lifted_fields(&self) -> BTreeMap<String, String> {
		let mut result: BTreeMap<String, String> = BTreeMap::new();

		for (token, lift) in self.lifts.iter().flat_map(|(_, lifts)| lifts.iter()) {
			if !lift.is_field {
				continue;
			}

			result.insert(token.clone(), lift.code.clone());
		}

		// self.lifted_fields_by_token.clone()
		result
	}
}

fn replace_non_alphanumeric(s: &str) -> String {
	let mut result = String::new();

	for c in s.chars() {
		if c.is_alphanumeric() {
			result.push(c);
		} else {
			result.push('_');
		}
	}

	result
}
