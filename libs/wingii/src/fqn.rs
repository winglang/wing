use std::fmt::{Display, Formatter};

const FQN_SEPARATOR: char = '.';

/// Represents a fully-qualified name (FQN) of a type in a JSII library.
/// For example, `@aws-cdk/aws-ec2.Vpc` is a FQN.
/// The FQN uniquely identifies a type within the JSII ecosystem.
///
/// The FQN typically looks like:
/// `assembly_name.namespace1.namespace2...namespaceN.type_name`
/// where there may be zero or more namespaces.
///
/// TODO: What if a jsii library an npm package that has a dot in its name?
/// https://github.com/winglang/wing/issues/1515
#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct FQN<'a> {
	pub raw: &'a str,
	pub parts: Vec<&'a str>,
}

impl<'a> From<&'a str> for FQN<'a> {
	fn from(fqn: &'a str) -> Self {
		FQN::new(fqn)
	}
}

impl<'a> FQN<'a> {
	pub fn new(raw: &'a str) -> Self {
		let parts: Vec<&str> = raw.split(FQN_SEPARATOR).collect();
		if parts.len() < 2 {
			panic!("Invalid FQN: {raw}");
		}

		FQN { raw, parts }
	}

	/// Returns the FQN as a string.
	pub fn as_str(&self) -> &str {
		self.raw
	}

	/// Returns the FQN as a string without the type name.
	pub fn as_str_without_type_name(&self) -> &str {
		let index = self.raw.rfind(FQN_SEPARATOR).unwrap();
		&self.raw[..index]
	}

	/// Returns the "assembly" part of the FQN. This is the name of the
	/// JSII library or Wing library the type is defined in.
	pub fn assembly(&self) -> &str {
		self.parts[0]
	}

	/// Returns the "type name" part of the FQN. This is the name of the
	/// type itself.
	pub fn type_name(&self) -> &str {
		self.parts[self.parts.len() - 1]
	}

	/// Returns an iterator over the namespaces of the FQN. The namespaces
	/// are the parts of the FQN between the assembly name and the type name
	/// which are used to group types together.
	pub fn namespaces(&self) -> &[&str] {
		if self.parts.len() > 2 {
			&self.parts[1..self.parts.len() - 1]
		} else {
			&[]
		}
	}

	/// Returns true if the FQN belongs to a namespace that is a prefix of the given namespace filter.
	/// For example, if the FQN is `my_lib.ns1.ns2.MyResource` then the resource is part of these filters:
	/// - `[]`
	/// - `["ns1"]`
	/// - `["ns1", "ns2"]`
	///
	/// But it is not part of these filters:
	/// - `["ns1", "ns2", "ns3"]`
	/// - `["ns2"]`
	pub fn is_in_namespace<T: AsRef<str>>(&self, namespace_filter: &[T]) -> bool {
		self.namespaces().len() >= namespace_filter.len()
			&& self
				.namespaces()
				.iter()
				.zip(namespace_filter.iter())
				.all(|(ns, filter)| *ns == filter.as_ref())
	}

	pub fn has_prefix(&self, prefix: &Option<String>) -> bool {
		if let Some(prefix) = prefix {
			self.raw.starts_with(prefix)
		} else {
			self.namespaces().len() == 0
		}
	}
}

impl Display for FQN<'_> {
	fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
		self.raw.fmt(f)
	}
}

// unit tests
#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn test_fqn1() {
		let fqn = FQN::new("@aws-cdk/aws-ec2.Vpc");
		assert_eq!(fqn.assembly(), "@aws-cdk/aws-ec2");
		assert_eq!(fqn.namespaces(), vec![] as Vec<&str>);
		assert_eq!(fqn.type_name(), "Vpc");
	}

	#[test]
	fn test_fqn2() {
		let fqn = FQN::new("@winglang/sdk.cloud.Bucket");
		assert_eq!(fqn.assembly(), "@winglang/sdk");
		assert_eq!(fqn.namespaces(), vec!["cloud"]);
		assert_eq!(fqn.type_name(), "Bucket");
	}

	#[test]
	fn test_fqn3() {
		let fqn = FQN::new("my_lib.ns1.ns2.MyResource");
		assert_eq!(fqn.assembly(), "my_lib");
		assert_eq!(fqn.namespaces(), vec!["ns1", "ns2"]);
		assert_eq!(fqn.type_name(), "MyResource");
	}

	#[test]
	fn test_fqn_as_str_without_type_name() {
		let fqn = FQN::new("my_lib.ns1.ns2.MyResource");
		assert_eq!(fqn.as_str_without_type_name(), "my_lib.ns1.ns2");
	}

	#[test]
	fn test_fqn_is_in_namespace() {
		let fqn = FQN::new("my_lib.ns1.ns2.MyResource");

		assert_eq!(fqn.is_in_namespace::<&str>(&vec![]), true);
		assert_eq!(fqn.is_in_namespace(&vec!["ns1"]), true);
		assert_eq!(fqn.is_in_namespace(&vec!["ns1", "ns2"]), true);

		assert_eq!(fqn.is_in_namespace(&vec!["blah"]), false);
		assert_eq!(fqn.is_in_namespace(&vec!["ns1", "blah"]), false);
		assert_eq!(fqn.is_in_namespace(&vec!["ns1", "ns2", "ns3"]), false);
	}
}
