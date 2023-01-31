use std::fmt::{Display, Formatter};

use crate::{CONSTRUCT_BASE, TERRAFORM_RESOURCE_BASE, WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE};

/// Represents a fully-qualified name (FQN) of a type in a JSII library.
/// For example, `@aws-cdk/aws-ec2.Vpc` is a FQN.
/// The FQN uniquely identifies a type.
///
/// The FQN typically looks like:
/// `assembly_name.namespace1.namespace2...namespaceN.type_name`
/// where there may be zero or more namespaces.
#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct FQN<'a>(&'a str);

impl<'a> FQN<'a> {
	pub fn from(fqn: &'a str) -> Self {
		if fqn.split('.').count() < 2 {
			panic!("Invalid FQN: {}", fqn);
		}
		FQN(fqn)
	}

	pub fn as_str(&self) -> &str {
		self.0
	}

	pub fn as_str_without_type_name(&self) -> &str {
		let index = self.0.rfind('.').unwrap();
		&self.0[..index]
	}

	pub fn assembly(&self) -> &str {
		self.0.split('.').next().unwrap()
	}

	pub fn type_name(&self) -> &str {
		self.0.split('.').last().unwrap()
	}

	pub fn namespaces(&self) -> impl Iterator<Item = &str> {
		let mut parts = self.0.split('.');
		parts.next();
		parts.next_back().unwrap();
		parts
	}

	pub fn is_construct_base(&self) -> bool {
		// We treat both CONSTRUCT_BASE and WINGSDK_RESOURCE, as base constructs because in wingsdk we currently have stuff directly derived
		// from `construct.Construct` and stuff derived `cloud.Resource` (which itself is derived from `constructs.Construct`).
		// But since we don't support interfaces yet we can't import `core.Resource` so we just treat it as a base class.
		// I'm also not sure we should ever import `core.Resource` because we might want to keep its internals hidden to the user:
		// after all it's an abstract class representing our `resource` primitive. See https://github.com/winglang/wing/issues/261.
		self.0 == &format!("{}.{}", WINGSDK_ASSEMBLY_NAME, WINGSDK_RESOURCE)
			|| self.0 == CONSTRUCT_BASE
			|| self.0 == TERRAFORM_RESOURCE_BASE
	}

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
