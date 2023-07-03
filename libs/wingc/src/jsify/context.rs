use std::collections::{BTreeMap, BTreeSet};

use itertools::Itertools;

use crate::ast::LiftedExpr;

/// Jsification context at the class level
pub struct InflightClassContext {
	/// map from token to lift
	lift_by_token: BTreeMap<String, Lift>,

	// all the lifts (key is "<method>/<token>")
	lifts: BTreeMap<String, MethodLift>,

	/// inflight_token -> capture
	captures: BTreeMap<String, Capture>,

	lifted_fields: BTreeMap<String, String>,
}

pub struct Capture {
	// pub is_type: bool,
	pub inflight: String,
	pub preflight: String,
}

pub struct MethodLift {
	pub token: String,
	pub method: String,
	pub preflight: String,
	pub ops: BTreeSet<String>,
}

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
			// captured_types: BTreeMap::new(),
			// captured_vars: BTreeSet::new(),
			lifted_fields: BTreeMap::new(),
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
	pub fn get_lift_token(&mut self, node: &LiftedExpr, preflight_code: &str) -> String {
		let token = self.render_token(preflight_code);

		self.lift_by_token.entry(token.clone()).or_insert(Lift {
			token: token.clone(),
			field: node.field,
			preflight: preflight_code.to_string(),
		});

		let method = node.lifting_method.clone();
		let key = format!("{}/{}", method.clone(), token);
		let lift = self.lifts.entry(key).or_insert(MethodLift {
			preflight: preflight_code.to_string(),
			token: token.clone(),
			method: method.clone(),
			ops: BTreeSet::new(),
		});

		if let Some(op) = &node.property {
			lift.ops.insert(op.clone());
		}

		if node.field {
			self.add_lifted_field(&token, &preflight_code);
			return format!("this.{}", token);
		} else {
			self.capture(preflight_code);
		}

		// return the token
		token
	}

	fn capture(&mut self, preflight_code: &str) -> String {
		let inflight_token = self.render_token(preflight_code);
		self.captures.entry(inflight_token.clone()).or_insert(Capture {
			// is_type,
			inflight: inflight_token.to_string(),
			preflight: preflight_code.to_string(),
		});

		inflight_token.clone()
	}

	pub(crate) fn capture_type(&mut self, fullname: &str) -> String {
		self.capture(fullname)
	}

	pub(crate) fn capture_var(&mut self, fullname: &str) -> String {
		self.capture(fullname)
	}

	pub(crate) fn captures(&self) -> Vec<&Capture> {
		self.captures.values().collect_vec()
	}

	pub(crate) fn add_lifted_field(&mut self, field: &str, preflight_code: &str) {
		self
			.lifted_fields
			.entry(field.to_string())
			.or_insert(preflight_code.to_string());
	}

	pub(crate) fn lifted_fields(&self) -> BTreeMap<String, String> {
		self.lifted_fields.clone()
	}

	pub(crate) fn all_capture_tokens(&self) -> Vec<&String> {
		self.captures.keys().collect_vec()
	}

	pub fn lifts_per_method(&self) -> BTreeMap<String, Vec<&MethodLift>> {
		let mut result: BTreeMap<String, Vec<&MethodLift>> = BTreeMap::new();

		for (_, method_lift) in &self.lifts {
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
