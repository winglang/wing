use std::fmt::{Display, Formatter};

/// Represents a fully-qualified name (FQN) of a type in a JSII library.
/// For example, `@aws-cdk/aws-ec2.Vpc` is a FQN.
/// The FQN is used to uniquely identify a type in a JSII library.
///
/// The FQN typically looks like:
/// `assembly_name.namespace1.namespace2...namespaceN.type_name`
/// where there may be zero or more namespaces.
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
}
