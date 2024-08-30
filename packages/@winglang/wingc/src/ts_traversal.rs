use tree_sitter::Node;

/// Create a post-order tree iterator for a tree-sitter node.
pub struct PostOrderIter<'a> {
	stack: Vec<Node<'a>>,
}

impl<'a> PostOrderIter<'a> {
	pub fn new(root: &'a Node) -> Self {
		let mut stack = Vec::new();
		stack.push(*root);
		PostOrderIter { stack }
	}
}

impl<'a> Iterator for PostOrderIter<'a> {
	type Item = Node<'a>;

	fn next(&mut self) -> Option<Self::Item> {
		if let Some(node) = self.stack.pop() {
			for i in (0..node.child_count()).rev() {
				self.stack.push(node.child(i).unwrap());
			}
			return Some(node);
		} else {
			None
		}
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use tree_sitter::Parser;
	use tree_sitter_wing::language;

	#[test]
	fn test_post_order_iter() {
		let code = r#"
			a;
			if true {
				b;
			}
			c;
		"#;
		let mut parser = Parser::new();
		parser.set_language(&language()).unwrap();
		let tree = parser.parse(code, None).unwrap();
		let root = tree.root_node();
		let nodes: Vec<Node> = PostOrderIter::new(&root).collect();
		let reference_nodes = nodes
			.iter()
			.filter(|n| n.kind() == "reference_identifier")
			.map(|n| n.utf8_text(&code.as_bytes()).unwrap().to_string())
			.collect::<Vec<String>>();

		assert_eq!(reference_nodes, vec!["a", "b", "c"]);
	}
}
