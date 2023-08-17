use std::collections::{BTreeMap, BTreeSet, HashMap};

use itertools::Itertools;

use crate::ast::{Symbol, UserDefinedType};

use super::CLASS_INFLIGHT_INIT_NAME;

/// A repository of lifts and captures at the class level.
#[derive(Debug)]
pub struct Lifts {
	/// All the lifts. The key is "<method>/<token>"
	lifts: BTreeMap<String, MethodLift>,

	/// All the captures. The key is token.
	captures: BTreeMap<String, Capture>,

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

/// A record that describes a capture.
#[derive(Debug, Clone)]
pub struct Capture {
	/// Lifting token (the symbol used in inflight code)
	pub token: String,

	/// The javascript code to capture
	pub code: String,
}

/// A record that describes a single lift from a method.
#[derive(Debug)]
pub struct MethodLift {
	/// The method name
	pub method: String,

	/// Lifting token (the symbol used in inflight code)
	pub token: String,

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
	/// Lifting token (the symbol used in inflight code)
	pub token: String,

	/// The javascript code to lift (preflight)
	pub code: String,

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
		let is_field = code.contains("this.");

		let token = self.render_token(code);

		self
			.token_for_liftable
			.entry(lifted_thing.clone())
			.or_insert(token.clone());

		self.lift_by_token.entry(token.clone()).or_insert(Lift {
			token: token.clone(),
			is_field,
			code: code.to_string(),
		});

		let method = method.map(|m| m.name).unwrap_or(Default::default());

		self.add_lift(method, token.clone(), code, property.map(|s| s.name.clone()), is_field);

		// add a lift to the inflight initializer or capture it if its not a field
		if is_field {
			self.add_lift(CLASS_INFLIGHT_INIT_NAME.to_string(), token, code, None, true);
		} else {
			self.capture(&lifted_thing, code);
		}
	}

	fn add_lift(&mut self, method: String, token: String, code: &str, property: Option<String>, is_field: bool) {
		let key = format!("{}/{}", method.clone(), token);
		let lift = self.lifts.entry(key).or_insert(MethodLift {
			code: code.to_string(),
			token: token.clone(),
			method: method.clone(),
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

	/// Captures an expression.
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

		self.captures.entry(token.clone()).or_insert(Capture {
			token: token.to_string(),
			code: code.to_string(),
		});
	}

	/// The list of captures.
	pub fn captures(&self) -> Vec<&Capture> {
		self.captures.values().collect_vec()
	}

	/// List of all lifted fields in the class.
	pub fn lifted_fields(&self) -> BTreeMap<String, String> {
		let mut result: BTreeMap<String, String> = BTreeMap::new();

		for (_, lift) in &self.lifts {
			if !lift.is_field {
				continue;
			}

			result.insert(lift.token.clone(), lift.code.clone());
		}

		// self.lifted_fields_by_token.clone()
		result
	}

	/// List of all lifts per method. Key is the method name and the value is a list of lifts.
	pub fn lifts_per_method(&self) -> BTreeMap<String, Vec<&MethodLift>> {
		let mut result: BTreeMap<String, Vec<&MethodLift>> = BTreeMap::new();

		for (_, method_lift) in &self.lifts {
			if method_lift.method.is_empty() {
				continue;
			}
			result.entry(method_lift.method.clone()).or_default().push(method_lift);
		}

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
