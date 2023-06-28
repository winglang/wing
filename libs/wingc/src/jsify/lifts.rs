use itertools::Itertools;
use std::collections::{BTreeMap, BTreeSet};

#[derive(Default)]
pub struct Lifts {
	lifts: BTreeMap<String, LiftedObject>,
}

#[derive(Clone)]
pub struct LiftedObject {
	pub method_name: String,
	pub is_field: bool,
	pub inflight_symbol: String,
	pub preflight_code: String,
	pub operations: BTreeSet<String>,
}

impl LiftedObject {
	pub fn render_ops_js_array(&self) -> String {
		let ops = self
			.operations
			.iter()
			.map(|f| format!("\"{}\"", f))
			.collect_vec()
			.join(", ");
		format!("[{}]", ops)
	}
}



impl Lifts {
	pub fn add(&mut self, method_name: String, is_field: bool, preflight_code: String, op: Option<String>) -> String {
		let prefix = if is_field { "this." } else { "" };

		let slug = replace_non_alphanumeric(&preflight_code);
		let inflight_symbol = format!("{prefix}${}", slug);

		let key = format!("{}.{}", method_name, inflight_symbol);

		let x = self.lifts.entry(key).or_insert(LiftedObject {
			method_name: method_name.clone(),
			inflight_symbol: inflight_symbol.clone(),
			preflight_code: preflight_code.clone(),
			is_field,
			operations: BTreeSet::default(),
		});

		if let Some(op) = op {
			x.operations.insert(op);
		}

		inflight_symbol
	}

	pub fn per_method(&self) -> BTreeMap<String, Vec<LiftedObject>> {
		let mut result: BTreeMap<String, Vec<LiftedObject>> = BTreeMap::new();

		for lift in &self.all() {
			result.entry(lift.method_name.clone()).or_default().push(lift.clone());
		}

		result.clone()
	}

	/// Returns all lifted objects, deduplicated.
	pub fn all(&self) -> Vec<LiftedObject> {
		let mut map = BTreeMap::<String, LiftedObject>::new();

		for l in self.lifts.values() {
			let o = map.entry(l.inflight_symbol.clone()).or_insert(LiftedObject {
				method_name: l.method_name.clone(),
				is_field: l.is_field,
				inflight_symbol: l.inflight_symbol.clone(),
				preflight_code: l.preflight_code.clone(),
				operations: BTreeSet::default(),
			});

			o.operations.extend(l.operations.clone());
		}

		let mut result: Vec<LiftedObject> = vec![];
		for x in map.values() {
			result.push(x.clone());
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
