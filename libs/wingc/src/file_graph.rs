use std::fmt::Display;

use camino::{Utf8Path, Utf8PathBuf};
use indexmap::IndexMap;
use petgraph::visit::EdgeRef;

/// A graph of files, where each file depends on zero or more other files.
///
/// TODO: support removing files from the graph
#[derive(Default)]
pub struct FileGraph {
	graph: petgraph::stable_graph::StableDiGraph<Utf8PathBuf, ()>,
	path_to_node_index: IndexMap<Utf8PathBuf, petgraph::graph::NodeIndex>,
}

impl FileGraph {
	/// Sets a file to depend on the given other files.
	///
	/// For example, if the current graph has file A depending on B, and
	/// `update_file(pathA, &[pathC])` was called, then this function will remove the edge
	/// from A to B, and add an edge from A to C.
	pub fn update_file(&mut self, from_path: &Utf8Path, to_paths: &[Utf8PathBuf]) {
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

	/// Returns true if the given file is in the graph
	pub fn contains_file(&mut self, path: &Utf8Path) -> bool {
		self.path_to_node_index.contains_key(path)
	}

	/// Returns a list of files in the order they should be compiled
	/// Or a list of files that are part of a cycle, if one exists
	pub fn toposort(&self) -> Result<Vec<Utf8PathBuf>, Vec<Utf8PathBuf>> {
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

	fn get_or_insert_node_index(&mut self, path: &Utf8Path) -> petgraph::graph::NodeIndex {
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
			write!(f, "{{{} -> [", node)?;
			for edge in self.graph.edges(node_index) {
				let target = &self.graph[edge.target()];
				write!(f, "{} ", target)?;
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
		graph.update_file("a".into(), &["b".into()]);
		graph.update_file("b".into(), &[]);
		assert_eq!(graph.toposort().unwrap(), make_paths(&["b", "a"]));
	}

	#[test]
	fn toposort_complex() {
		// graph with 5 nodes, A, B, C, D, and E, where A depends on B and C, B depends on C and D, C depends on D, and D depends on E
		let mut graph = FileGraph::default();
		graph.update_file("a".into(), &["b".into(), "c".into()]);
		graph.update_file("b".into(), &["c".into(), "d".into()]);
		graph.update_file("c".into(), &["d".into()]);
		graph.update_file("d".into(), &["e".into()]);
		graph.update_file("e".into(), &[]);
		assert_eq!(graph.toposort().unwrap(), make_paths(&["e", "d", "c", "b", "a"]));

		// create the same graph in a different order as a sanity check
		let mut graph = FileGraph::default();
		graph.update_file("e".into(), &[]);
		graph.update_file("d".into(), &["e".into()]);
		graph.update_file("c".into(), &["d".into()]);
		graph.update_file("b".into(), &["c".into(), "d".into()]);
		graph.update_file("a".into(), &["b".into(), "c".into()]);
		assert_eq!(graph.toposort().unwrap(), make_paths(&["e", "d", "c", "b", "a"]));
	}

	#[test]
	fn toposort_cycle() {
		// graph with 3 nodes, A, B, and C, where A depends on B, B depends on C, and C depends on A
		let mut graph = FileGraph::default();
		graph.update_file("a".into(), &["b".into()]);
		graph.update_file("b".into(), &["c".into()]);
		graph.update_file("c".into(), &["a".into()]);

		let mut err = graph.toposort().unwrap_err();
		err.sort();
		assert_eq!(err, make_paths(&["a", "b", "c"]));
	}

	#[test]
	fn toposort_two_cycles_with_shared_node() {
		// graph where A is part of two cycles, {A,B,C} and {A,X,Y}
		let mut graph = FileGraph::default();
		graph.update_file("a".into(), &["b".into(), "x".into()]);
		graph.update_file("b".into(), &["c".into()]);
		graph.update_file("c".into(), &["a".into()]);
		graph.update_file("x".into(), &["y".into()]);
		graph.update_file("y".into(), &["a".into()]);

		let mut err = graph.toposort().unwrap_err();
		err.sort();
		assert_eq!(err, make_paths(&["a", "b", "c", "x", "y"]));
	}

	#[test]
	fn toposort_two_distinct_cycles() {
		// graph with six nodes, where {A,B,C} form a cycle and {D,E,F} form a cycle
		let mut graph = FileGraph::default();
		graph.update_file("a".into(), &["b".into()]);
		graph.update_file("b".into(), &["c".into()]);
		graph.update_file("c".into(), &["a".into()]);
		graph.update_file("d".into(), &["e".into()]);
		graph.update_file("e".into(), &["f".into()]);
		graph.update_file("f".into(), &["d".into()]);

		let mut err = graph.toposort().unwrap_err();
		err.sort();

		// note: if we returned the cycle {D,E,F} that would also be valid
		assert_eq!(err, make_paths(&["a", "b", "c"]));
	}

	#[test]
	fn toposort_cycle_and_unrelated_component() {
		// graph with 5 nodes, where A depends on B, and {C,D,E} form a cycle
		let mut graph = FileGraph::default();
		graph.update_file("a".into(), &["b".into()]);
		graph.update_file("b".into(), &[]);
		graph.update_file("c".into(), &["d".into()]);
		graph.update_file("d".into(), &["e".into()]);
		graph.update_file("e".into(), &["c".into()]);

		// we don't care about where the cycle starts, so we sort the list
		let mut err = graph.toposort().unwrap_err();
		err.sort();
		assert_eq!(err, make_paths(&["c", "d", "e"]));
	}

	#[test]
	fn toposort_update_edges() {
		// graph with 3 nodes, A, B, and C, where A depends on B and C, and B depends on C
		let mut graph = FileGraph::default();
		graph.update_file("a".into(), &["b".into(), "c".into()]);
		graph.update_file("b".into(), &["c".into()]);
		graph.update_file("c".into(), &[]);
		assert_eq!(graph.toposort().unwrap(), ["c", "b", "a"]);

		// update the edges so that A depends on C and B depends on A
		graph.update_file("a".into(), &["c".into()]);
		graph.update_file("b".into(), &["a".into()]);
		assert_eq!(graph.toposort().unwrap(), make_paths(&["c", "a", "b"]));
	}

	fn make_paths(paths: &[&str]) -> Vec<Utf8PathBuf> {
		paths.iter().map(|p| p.into()).collect::<Vec<Utf8PathBuf>>()
	}
}
