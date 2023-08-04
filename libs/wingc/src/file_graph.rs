use std::{
	fmt::Display,
	path::{Path, PathBuf},
};

use indexmap::IndexMap;
use petgraph::visit::EdgeRef;

#[derive(Default)]
pub struct FileGraph {
	graph: petgraph::stable_graph::StableDiGraph<PathBuf, ()>,
	path_to_node_index: IndexMap<PathBuf, petgraph::graph::NodeIndex>,
}

impl FileGraph {
	/// Sets a file to depend on the given other files.
	///
	/// For example, if the current graph has file A depending on B, and
	/// `update_file(pathA, &[pathC])` was called, then this function will remove the edge
	/// from A to B, and add an edge from A to C.
	pub fn update_file(&mut self, from_path: &Path, to_paths: &[PathBuf]) {
		let from_node_index = self.get_or_insert_node_index(from_path);

		// remove all current outcoming edges from this node
		self.graph.retain_edges(|g, edge| {
			if let Some((source, _target)) = g.edge_endpoints(edge) {
				if source == from_node_index {
					return false;
				}
			}
			return true;
		});

		// add new edges from this node
		for to_path in to_paths {
			let to_node_index = self.get_or_insert_node_index(to_path);
			self.graph.add_edge(from_node_index, to_node_index, ());
		}
	}

	/// Returns a list of files in the order they should be compiled
	/// Or a list of files that are part of a cycle, if one exists
	pub fn toposort(&self) -> Result<Vec<PathBuf>, Vec<PathBuf>> {
		match petgraph::algo::toposort(&self.graph, None) {
			Ok(indices) => Ok(
				indices
					.into_iter()
					.rev()
					.map(|n| self.graph[n].clone())
					.collect::<Vec<_>>(),
			),
			Err(_) => {
				// toposort function in the `petgraph` library doesn't return the cycle itself,
				// so we need to use Tarjan's algorithm to find one instead
				let strongly_connected_components = petgraph::algo::tarjan_scc(&self.graph);

				// a strongly connected component is a cycle if it has more than one node
				// let's just return the first one we find
				let cycle = strongly_connected_components
					.into_iter()
					.find(|component| component.len() > 1)
					.unwrap();
				Err(cycle.iter().map(|n| self.graph[*n].clone()).collect::<Vec<_>>())
			}
		}
	}

	fn get_or_insert_node_index(&mut self, path: &Path) -> petgraph::graph::NodeIndex {
		if let Some(node_index) = self.path_to_node_index.get(path) {
			return *node_index;
		}

		let node_index = self.graph.add_node(path.to_owned());
		self.path_to_node_index.insert(path.to_owned(), node_index);
		node_index
	}
}

impl Display for FileGraph {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		for node_index in self.graph.node_indices() {
			let node = &self.graph[node_index];
			write!(f, "{{{} -> [", node.display())?;
			for edge in self.graph.edges(node_index) {
				let target = &self.graph[edge.target()];
				write!(f, "{} ", target.display())?;
			}
			writeln!(f, "]}}")?;
		}
		Ok(())
	}
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn toposort_simple() {
		// graph with two nodes, A and B, where A depends on B
		let mut graph = FileGraph::default();
		graph.update_file(Path::new("a"), &[PathBuf::from("b")]);
		graph.update_file(Path::new("b"), &[]);
		assert_eq!(graph.toposort().unwrap(), vec![PathBuf::from("b"), PathBuf::from("a")]);
	}

	#[test]
	fn toposort_complex() {
		// graph with 5 nodes, A, B, C, D, and E, where A depends on B and C, B depends on C and D, C depends on D, and D depends on E
		let mut graph = FileGraph::default();
		graph.update_file(Path::new("a"), &[PathBuf::from("b"), PathBuf::from("c")]);
		graph.update_file(Path::new("b"), &[PathBuf::from("c"), PathBuf::from("d")]);
		graph.update_file(Path::new("c"), &[PathBuf::from("d")]);
		graph.update_file(Path::new("d"), &[PathBuf::from("e")]);
		graph.update_file(Path::new("e"), &[]);
		assert_eq!(
			graph.toposort().unwrap(),
			vec![
				PathBuf::from("e"),
				PathBuf::from("d"),
				PathBuf::from("c"),
				PathBuf::from("b"),
				PathBuf::from("a")
			]
		);

		// create the same graph in a different order as a sanity check
		let mut graph = FileGraph::default();
		graph.update_file(Path::new("e"), &[]);
		graph.update_file(Path::new("d"), &[PathBuf::from("e")]);
		graph.update_file(Path::new("c"), &[PathBuf::from("d")]);
		graph.update_file(Path::new("b"), &[PathBuf::from("c"), PathBuf::from("d")]);
		graph.update_file(Path::new("a"), &[PathBuf::from("b"), PathBuf::from("c")]);
		assert_eq!(
			graph.toposort().unwrap(),
			vec![
				PathBuf::from("e"),
				PathBuf::from("d"),
				PathBuf::from("c"),
				PathBuf::from("b"),
				PathBuf::from("a")
			]
		);
	}

	#[test]
	fn toposort_cycle() {
		// graph with 3 nodes, A, B, and C, where A depends on B, B depends on C, and C depends on A
		let mut graph = FileGraph::default();
		graph.update_file(Path::new("a"), &[PathBuf::from("b")]);
		graph.update_file(Path::new("b"), &[PathBuf::from("c")]);
		graph.update_file(Path::new("c"), &[PathBuf::from("a")]);

		// we don't care about where the cycle starts, so we sort the list
		let mut err = graph.toposort().unwrap_err();
		err.sort();
		assert_eq!(err, vec![PathBuf::from("a"), PathBuf::from("b"), PathBuf::from("c")]);
	}

	#[test]
	fn toposort_update_edges() {
		// graph with 3 nodes, A, B, and C, where A depends on B and C, and B depends on C
		let mut graph = FileGraph::default();
		graph.update_file(Path::new("a"), &[PathBuf::from("b"), PathBuf::from("c")]);
		graph.update_file(Path::new("b"), &[PathBuf::from("c")]);
		graph.update_file(Path::new("c"), &[]);
		assert_eq!(
			graph.toposort().unwrap(),
			vec![PathBuf::from("c"), PathBuf::from("b"), PathBuf::from("a")]
		);

		// update the edges so that A depends on C and B depends on A
		graph.update_file(Path::new("a"), &[PathBuf::from("c")]);
		graph.update_file(Path::new("b"), &[PathBuf::from("a")]);
		assert_eq!(
			graph.toposort().unwrap(),
			vec![PathBuf::from("c"), PathBuf::from("a"), PathBuf::from("b")]
		);
	}
}
