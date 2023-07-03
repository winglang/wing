use std::collections::{BTreeMap, BTreeSet};

use itertools::Itertools;

use crate::ast::Symbol;

/// Jsification context at the class level
#[derive(Debug)]
pub struct InflightClassContext {
	/// map from token to lift
	lift_by_token: BTreeMap<String, Lift>,

	// all the lifts (key is "<method>/<token>")
	lifts: BTreeMap<String, MethodLift>,

	/// inflight_token -> capture
	captures: BTreeMap<String, Capture>,

	lifted_fields: BTreeMap<String, String>,

	token_by_expr_id: BTreeMap<usize, String>,
}

#[derive(Debug, Clone)]
pub struct Capture {
	// pub is_type: bool,
	pub inflight: String,
	pub preflight: String,
}

#[derive(Debug, Clone)]
pub struct MethodLift {
	pub token: String,
	pub method: String,
	pub preflight: String,
	pub ops: BTreeSet<String>,
}

#[derive(Debug, Clone)]
pub struct Lift {
	pub token: String,
	pub preflight: String,
	pub field: bool,
}

impl InflightClassContext {
	pub fn new() -> Self {
		Self {
			lifts: BTreeMap::new(),
			lift_by_token: BTreeMap::new(),
			captures: BTreeMap::new(),
			lifted_fields: BTreeMap::new(),
			token_by_expr_id: BTreeMap::new(),
		}
	}

	pub fn disabled() -> Self {
		Self::new()
	}

	pub fn lifts(&self) -> Vec<&Lift> {
		self.lift_by_token.values().collect_vec()
	}

	fn render_token(&self, preflight_code: &str) -> String {
		format!("${}", replace_non_alphanumeric(preflight_code))
	}

	/// Adds a lift to the class context
	pub fn lift(
		&mut self,
		expr_id: usize,
		method: Option<Symbol>,
		property: Option<String>,
		is_field: bool,
		preflight_code: &str,
	) {
		let token = self.render_token(preflight_code);

		self.token_by_expr_id.entry(expr_id).or_insert(token.clone());

		self.lift_by_token.entry(token.clone()).or_insert(Lift {
			token: token.clone(),
			field: is_field,
			preflight: preflight_code.to_string(),
		});

		let method = method.and_then(|m| Some(m.name)).unwrap_or(Default::default());

		let key = format!("{}/{}", method.clone(), token);
		let lift = self.lifts.entry(key).or_insert(MethodLift {
			preflight: preflight_code.to_string(),
			token: token.clone(),
			method: method.clone(),
			ops: BTreeSet::new(),
		});

		if let Some(op) = &property {
			lift.ops.insert(op.clone());
		}

		if is_field {
			self.add_lifted_field(&token, &preflight_code);
		} else {
			self.capture(&expr_id, preflight_code);
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

	pub fn capture(&mut self, expr_id: &usize, preflight_code: &str) -> String {
		let token = self.render_token(preflight_code);

		self.token_by_expr_id.entry(*expr_id).or_insert(token.clone());

		self.captures.entry(token.clone()).or_insert(Capture {
			// is_type,
			inflight: token.to_string(),
			preflight: preflight_code.to_string(),
		});

		token.clone()
	}

	pub fn captures(&self) -> Vec<&Capture> {
		self.captures.values().collect_vec()
	}

	pub fn add_lifted_field(&mut self, field: &str, preflight_code: &str) {
		self
			.lifted_fields
			.entry(field.to_string())
			.or_insert(preflight_code.to_string());
	}

	pub fn lifted_fields(&self) -> BTreeMap<String, String> {
		self.lifted_fields.clone()
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

// pub fn jsify_type_name(t: &str, phase: Phase) -> String {
// 	let parts = t.split(".").collect_vec();

// 	if phase == Phase::Inflight {
// 		parts.join("_")
// 	} else {
// 		parts.join(".")
// 	}
// }
