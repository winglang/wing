use tree_sitter::{Node, Point, Tree};

#[derive(Debug)]
pub struct ErrorInfo {
	pub start: Point,
	pub end: Point,
}

pub fn errors_from_tree<'a>(list: &'a mut Vec<ErrorInfo>, node: &'a Node) {
	if node.is_error() {
		list.push(ErrorInfo {
			start: node.start_position(),
			end: node.end_position(),
		});
	}

	if node.child_count() > 0 && node.has_error() {
		let mut cursor = node.walk();
		for child in node.children(&mut cursor) {
			if child.has_error() {
				errors_from_tree(list, &child);
			}
		}
	}
}

pub fn errors_from_ast(ast: &Tree) -> Vec<ErrorInfo> {
	let mut errors = vec![];

	errors_from_tree(errors.as_mut(), &ast.root_node());

	return errors;
}
