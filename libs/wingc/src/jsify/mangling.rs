use std::collections::{BTreeMap, BTreeSet};

use itertools::Itertools;

use crate::jsify::codemaker::CodeMaker;

#[derive(Clone)]
pub enum JavaScriptObject {
	Value(String),
	Object(BTreeMap<String, JavaScriptObject>),
}

pub struct MangleDemangle {
	pub keys: Vec<String>,
	pub objects: BTreeMap<String, JavaScriptObject>,
	pub javascript: String,
}

pub fn mangle_captures(captures: BTreeSet<String>) -> MangleDemangle {
	let mut result = MangleDemangle {
		keys: vec![],
		objects: BTreeMap::new(),
		javascript: String::new(),
	};

	fn add_to_object(path: Vec<&str>, parent: &mut BTreeMap<String, JavaScriptObject>, value: String) {
		let Some(first) = path.first() else {
			return; // no more components in the path
		};

		// if this is the last element, insert it as a value to the parent
		if path.len() == 1 {
			parent.insert(first.to_string(), JavaScriptObject::Value(value));
			return;
		}

		// otherwise, this is an object, so we need to create it if it doesn't exist
		let child = parent
			.entry(first.to_string())
			.or_insert(JavaScriptObject::Object(BTreeMap::new()));

		// if we already captured this key as a value, then we can skip the nested objects
		// because the entire object is already captured.
		let JavaScriptObject::Object(child) = child else {
			return;
		};

		// and recurse
		add_to_object(path[1..].to_vec(), child, value);
	}

	// we sort in order to be able to skip nested objects if the parent has already been captured
	for v in captures.iter().sorted() {
		let key = mangle(&v);
		result.keys.push(key.clone());
		add_to_object(v.split(".").collect_vec(), &mut result.objects, key.clone());
	}

	// format the objects as javascript objects
	for (k, v) in &result.objects {
		if let JavaScriptObject::Object(o) = v {
			let mut code = CodeMaker::default();
			code.open(format!("const {} = {{", k));
			format_js_obj(o, &mut code);
			code.close("};");

			result.javascript.push_str(&code.to_string());
		}
	}

	result
}

#[derive(PartialEq, Debug)]

pub struct LiftArgs {
	pub key: String,
	pub field: String,
	pub ops: String,
}

/// Creates a map from object names to a JavaScript array of operations that are performed on that
/// object. This is used when generating calls to `_lift(obj, ops)`.
pub fn make_lift_args(vars: BTreeMap<String, BTreeSet<String>>) -> Vec<LiftArgs> {
	let mut result = vec![];

	for (v, ops) in vars {
		let arr = ops.iter().map(|f| format!("\"{f}\"").clone()).collect_vec().join(", ");
		result.push(LiftArgs {
			key: mangle(&v),
			field: v.clone(),
			ops: format!("[{arr}]"),
		});
	}

	return result;
}

pub fn mangle(s: &str) -> String {
	s.replace(".", "_")
}

pub fn format_js_obj(map: &BTreeMap<String, JavaScriptObject>, code: &mut CodeMaker) {
	for (k, v) in map {
		match v {
			JavaScriptObject::Value(v) => {
				code.line(&format!("{}: {},", k, v));
			}
			JavaScriptObject::Object(o) => {
				code.open(&format!("{}: {{", k));
				format_js_obj(o, code);
				code.close("},");
			}
		}
	}
}

#[cfg(test)]
mod tests;
