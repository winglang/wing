use std::{collections::BTreeSet, fmt::Display};

use insta::assert_snapshot;

use crate::jsify::mangle_captures;

use super::MangleDemangle;

fn as_set(x: &[&str]) -> BTreeSet<String> {
	x.iter().map(|s| s.to_string()).collect::<BTreeSet<_>>()
}

#[test]
fn simple_objects() {
	let result = mangle_captures(as_set(&["a", "hello", "MyClass"]));
	assert_snapshot!(result.to_string());
}

#[test]
fn nested_objects() {
	let result = mangle_captures(as_set(&["a.b.c", "a.b.d", "a.b.e"]));
	assert_snapshot!(result.to_string());
}

#[test]
fn mixed() {
	let result = mangle_captures(as_set(&[
		"a.b.c",
		"a.b.d",
		"a.b.e",
		"hello.world",
		"b.myBucket",
		"hello",
		"MyClass",
		"std.Json",
		"std.Number",
	]));
	assert_snapshot!(result.to_string());
}

impl Display for MangleDemangle {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		writeln!(f, "keys: {}", self.keys.join(","))?;
		writeln!(f, "\n{}", self.javascript)
	}
}
