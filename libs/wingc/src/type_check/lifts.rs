use std::collections::{BTreeMap, BTreeSet};

use itertools::Itertools;

use crate::ast::Symbol;

/// Jsification context at the class level
#[derive(Debug)]
pub struct Lifts {
	lift_by_token: BTreeMap<String, Lift>,            // map from token to lift
	lifts: BTreeMap<String, MethodLift>,              // all the lifts (key is "<method>/<token>")
	captures: BTreeMap<String, Capture>,              // inflight_token -> capture
	lifted_fields_by_token: BTreeMap<String, String>, // token -> code
	token_by_expr_id: BTreeMap<usize, String>,
	disabled: bool,
}

#[derive(Debug, Clone)]
pub struct Capture {
	// pub is_type: bool,
	pub inflight: String,
	pub code: String,
}

#[derive(Debug)]
pub struct MethodLift {
	pub token: String,
	pub method: String,
	pub code: String,
	pub ops: BTreeSet<String>,
}

#[derive(Debug)]
pub struct Lift {
	pub token: String,
	pub code: String,
	pub field: bool,
}

impl Lifts {
	pub fn new() -> Self {
		Self {
			lifts: BTreeMap::new(),
			lift_by_token: BTreeMap::new(),
			captures: BTreeMap::new(),
			lifted_fields_by_token: BTreeMap::new(),
			token_by_expr_id: BTreeMap::new(),
			disabled: false,
		}
	}

	pub fn disabled() -> Self {
		Self {
			disabled: true,
			..Self::new()
		}
	}

	pub fn lifts(&self) -> Vec<&Lift> {
		self.lift_by_token.values().collect_vec()
	}

	fn render_token(&self, code: &str) -> String {
		format!("${}", replace_non_alphanumeric(code))
	}

	/// Adds a lift to the class context
	pub fn lift(&mut self, expr_id: usize, method: Option<Symbol>, property: Option<String>, is_field: bool, code: &str) {
		assert!(!self.disabled);
		let token = self.render_token(code);

		self.token_by_expr_id.entry(expr_id).or_insert(token.clone());

		self.lift_by_token.entry(token.clone()).or_insert(Lift {
			token: token.clone(),
			field: is_field,
			code: code.to_string(),
		});

		let method = method.and_then(|m| Some(m.name)).unwrap_or(Default::default());

		let key = format!("{}/{}", method.clone(), token);
		let lift = self.lifts.entry(key).or_insert(MethodLift {
			code: code.to_string(),
			token: token.clone(),
			method: method.clone(),
			ops: BTreeSet::new(),
		});

		if let Some(op) = &property {
			lift.ops.insert(op.clone());
		}

		if is_field {
			self.add_lifted_field(&token, &code);
		} else {
			self.capture(&expr_id, code);
		}
	}

	pub fn token_for_expr(&self, expr_id: &usize) -> Option<String> {
		let Some(token) = self.token_by_expr_id.get(expr_id) else {
			return None;
		};

		let is_field = if let Some(lift) = self.lift_by_token.get(token) {
			lift.field
		} else {
			false
		};

		if is_field {
			return Some(format!("this.{}", token).to_string());
		} else {
			return Some(token.clone());
		}
	}

	pub fn capture(&mut self, expr_id: &usize, code: &str) -> String {
		assert!(!self.disabled);
		let token = self.render_token(code);

		self.token_by_expr_id.entry(*expr_id).or_insert(token.clone());

		self.captures.entry(token.clone()).or_insert(Capture {
			inflight: token.to_string(),
			code: code.to_string(),
		});

		token.clone()
	}

	pub fn captures(&self) -> Vec<&Capture> {
		self.captures.values().collect_vec()
	}

	fn add_lifted_field(&mut self, token: &str, code: &str) {
		assert!(!self.disabled);
		self
			.lifted_fields_by_token
			.entry(token.to_string())
			.or_insert(code.to_string());
	}

	pub fn lifted_fields(&self) -> BTreeMap<String, String> {
		self.lifted_fields_by_token.clone()
	}

	pub fn all_capture_tokens(&self) -> Vec<&String> {
		self.captures.keys().collect_vec()
	}

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
