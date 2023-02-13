use std::fmt::{Display, Formatter};

use crate::{CONSTRUCT_BASE, WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE};

/// Represents a fully-qualified name (FQN) of a type in a JSII library.
/// For example, `@aws-cdk/aws-ec2.Vpc` is a FQN.
/// The FQN uniquely identifies a type.
///
/// The FQN typically looks like:
/// `assembly_name.namespace1.namespace2...namespaceN.type_name`
/// where there may be zero or more namespaces.
///
/// TODO: What if a jsii library an npm package that has a dot in its name?
/// https://github.com/winglang/wing/issues/1515
#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct FQN<'a>(&'a str);

impl<'a> From<&'a str> for FQN<'a> {
	fn from(fqn: &'a str) -> Self {
		if fqn.split('.').count() < 2 {
			panic!("Invalid FQN: {}", fqn);
		}
		FQN(fqn)
	}
}

impl<'a> FQN<'a> {
	/// Returns the FQN as a string.
	pub fn as_str(&self) -> &str {
		self.0
	}

	/// Returns the FQN as a string without the type name.
	pub fn as_str_without_type_name(&self) -> &str {
		let index = self.0.rfind('.').unwrap();
		&self.0[..index]
	}

	/// Returns the "assembly" part of the FQN. This is the name of the
	/// npm library or wing library the type is defined in.
	#[allow(dead_code)]
	pub fn assembly(&self) -> &str {
		self.0.split('.').next().unwrap()
	}

	/// Returns the "type name" part of the FQN. This is the name of the
	/// type itself.
	pub fn type_name(&self) -> &str {
		self.0.split('.').last().unwrap()
	}

	/// Returns an iterator over the namespaces of the FQN. The namespaces
	/// are the parts of the FQN between the assembly name and the type name
	/// which are used to group types together.
	pub fn namespaces(&self) -> impl Iterator<Item = &str> {
		let mut parts = self.0.split('.');
		parts.next();
		parts.next_back().unwrap();
		parts
	}

	/// Returns true if the FQN represents a "construct base class".
	///
	/// TODO: this is a temporary hack until we support interfaces.
	pub fn is_construct_base(&self) -> bool {
		// We treat both CONSTRUCT_BASE and WINGSDK_RESOURCE, as base constructs because in wingsdk we currently have stuff directly derived
		// from `construct.Construct` and stuff derived `core.Resource` (which itself is derived from `constructs.Construct`).
		// But since we don't support interfaces yet we can't import `core.Resource` so we just treat it as a base class.
		// I'm also not sure we should ever import `core.Resource` because we might want to keep its internals hidden to the user:
		// after all it's an abstract class representing our `resource` primitive. See https://github.com/winglang/wing/issues/261.
		self.0 == &format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE) || self.0 == CONSTRUCT_BASE
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
		self.namespaces().count() >= namespace_filter.len()
			&& self
				.namespaces()
				.zip(namespace_filter.iter())
				.all(|(ns, filter)| ns == filter.as_ref())
	}
}

impl Display for FQN<'_> {
	fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}", self.0)
	}
}

// unit tests
#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn test_fqn1() {
		let fqn = FQN("@aws-cdk/aws-ec2.Vpc");
		assert_eq!(fqn.assembly(), "@aws-cdk/aws-ec2");
		assert_eq!(fqn.namespaces().collect::<Vec<_>>(), vec![] as Vec<&str>);
		assert_eq!(fqn.type_name(), "Vpc");
	}

	#[test]
	fn test_fqn2() {
		let fqn = FQN("@winglang/sdk.cloud.Bucket");
		assert_eq!(fqn.assembly(), "@winglang/sdk");
		assert_eq!(fqn.namespaces().collect::<Vec<_>>(), vec!["cloud"]);
		assert_eq!(fqn.type_name(), "Bucket");
	}

	#[test]
	fn test_fqn3() {
		let fqn = FQN("my_lib.ns1.ns2.MyResource");
		assert_eq!(fqn.assembly(), "my_lib");
		assert_eq!(fqn.namespaces().collect::<Vec<_>>(), vec!["ns1", "ns2"]);
		assert_eq!(fqn.type_name(), "MyResource");
	}

	#[test]
	fn test_fqn_as_str_without_type_name() {
		let fqn = FQN("my_lib.ns1.ns2.MyResource");
		assert_eq!(fqn.as_str_without_type_name(), "my_lib.ns1.ns2");
	}

	#[test]
	fn test_fqn_is_in_namespace() {
		let fqn = FQN("my_lib.ns1.ns2.MyResource");

		assert_eq!(fqn.is_in_namespace::<&str>(&vec![]), true);
		assert_eq!(fqn.is_in_namespace(&vec!["ns1"]), true);
		assert_eq!(fqn.is_in_namespace(&vec!["ns1", "ns2"]), true);

		assert_eq!(fqn.is_in_namespace(&vec!["blah"]), false);
		assert_eq!(fqn.is_in_namespace(&vec!["ns1", "blah"]), false);
		assert_eq!(fqn.is_in_namespace(&vec!["ns1", "ns2", "ns3"]), false);
	}

	#[test]
	fn test_fqn_is_construct_base() {
		assert_eq!(FQN(CONSTRUCT_BASE).is_construct_base(), true);
		assert_eq!(
			FQN(&format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE)).is_construct_base(),
			true
		);
		assert_eq!(FQN("@winglang/sdk.cloud.Bucket").is_construct_base(), false);
	}
}
