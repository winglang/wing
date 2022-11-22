use inflections::*;

pub fn is_snake_case(s: &str) -> bool {
	case::is_snake_case(s)
}
pub fn is_camel_case(s: &str) -> bool {
	case::is_camel_case(s)
}

pub fn camel_case_to_snake_case(s: &str) -> String {
	case::to_snake_case(s)
}

pub fn snake_case_to_camel_case(s: &str) -> String {
	case::to_camel_case(s)
}

// write tests for the above functions
#[cfg(test)]
mod tests {
	#[test]
	fn should_return_true_for_snake_case() {
		assert!(super::is_snake_case("snake_case"));
	}
	#[test]
	fn should_return_true_for_camel_case() {
		assert!(super::is_camel_case("camelCase"));
	}
	#[test]
	fn should_return_false_for_camel_case() {
		assert!(!super::is_snake_case("camelCase"));
	}
	#[test]
	fn should_return_false_for_snake_case() {
		assert!(!super::is_camel_case("snake_case"));
	}
	#[test]
	fn should_convert_snake_case_to_camel_case() {
		assert_eq!(super::snake_case_to_camel_case("snake_case"), "snakeCase");
	}
	#[test]
	fn should_convert_camel_case_to_snake_case() {
		assert_eq!(super::camel_case_to_snake_case("camelCase"), "camel_case");
	}
}
