use std::collections::{BTreeMap, BTreeSet, HashMap};

use crate::ast::{Symbol, UserDefinedType};

use super::{ExprId, CLASS_INFLIGHT_INIT_NAME};

/// A repository of lifts and captures at the class level.
#[derive(Debug)]
pub struct Lifts {
	// TODO: make all these private and add accessors+helper logic
	/// All the lifts. Map from method to a map from inflight code to lift qualifications.
	pub lifts_qualifications: BTreeMap<String, BTreeMap<String, LiftQualification>>,

	/// All the captures. The key is token the value is the preflight code.
	/// Used for preflight setup of inflight captures.
	pub captures: BTreeMap<String, Capture>,

	/// Map between liftable AST element and a lift token (used for inflight jsification of captures)
	pub token_for_liftable: HashMap<Liftable, String>,
}

/// Ast elements that may be lifted
#[derive(Debug, PartialEq, Eq, Hash, Clone)]
pub enum Liftable {
	Expr(ExprId),
	Type(UserDefinedType),
}

/// A record that describes a single lift from a method.
#[derive(Debug)]
pub struct LiftQualification {
	/// The operations that qualify the lift (the property names)
	pub ops: BTreeSet<String>,
}

/// A record that describes a lift from a class.
#[derive(Debug)]
pub struct Capture {
	/// Whether this is a field capture (`this.foo`)
	pub is_field: bool,

	/// The javascript code to capture (preflight)
	pub code: String,
}

impl Lifts {
	pub fn new() -> Self {
		Self {
			lifts_qualifications: BTreeMap::new(),
			captures: BTreeMap::new(),
			token_for_liftable: HashMap::new(),
		}
	}

	fn render_token(&self, code: &str) -> String {
		format!("${}", replace_non_alphanumeric(code))
	}

	/// Adds a lift for an expression.
	pub fn lift(&mut self, method: Option<Symbol>, property: Option<Symbol>, code: &str, is_field: bool) {
		let method = method.map(|m| m.name).unwrap_or(Default::default());

		self.add_lift(method, code, property.as_ref().map(|s| s.name.clone()));

		// add a lift to the inflight initializer or capture it if its not a field
		if is_field {
			self.add_lift(CLASS_INFLIGHT_INIT_NAME.to_string(), code, None);
		}
	}

	fn add_lift(&mut self, method: String, code: &str, property: Option<String>) {
		let lift = self
			.lifts_qualifications
			.entry(method)
			.or_default()
			.entry(code.to_string())
			.or_insert(LiftQualification { ops: BTreeSet::new() });

		if let Some(op) = &property {
			lift.ops.insert(op.clone());
		}
	}

	/// Returns the token for a liftable. Called by the jsifier when emitting inflight code.
	pub fn token_for_liftable(&self, lifted_thing: &Liftable) -> Option<String> {
		let Some(token) = self.token_for_liftable.get(lifted_thing) else {
			return None;
		};

		let is_field = if let Some(lift) = self.captures.get(token) {
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
	pub fn capture(&mut self, lifted_thing: &Liftable, code: &str, is_field: bool) {
		// no need to capture this (it's already in scope)
		if code == "this" {
			return;
		}

		let token = self.render_token(code);

		self
			.token_for_liftable
			.entry(lifted_thing.clone())
			.or_insert(token.clone());

		self.captures.entry(token.clone()).or_insert(Capture {
			is_field,
			code: code.to_string(),
		});
	}

	/// List of all lifted fields in the class. (map from lift token to preflight code)
	pub fn lifted_fields(&self) -> BTreeMap<String, String> {
		let mut result: BTreeMap<String, String> = BTreeMap::new();

		self
			.captures
			.iter()
			.filter(|(_, lift)| lift.is_field)
			.for_each(|(token, lift)| {
				result.insert(token.clone(), lift.code.clone());
			});
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
