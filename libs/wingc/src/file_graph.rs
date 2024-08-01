use std::fmt::Display;

use camino::Utf8PathBuf;
use indexmap::IndexMap;
use petgraph::visit::EdgeRef;

#[derive(Clone, Debug, Eq, PartialEq, Hash)]
pub struct File {
	/// The path of the file relative to the entrypoint of the compilation.
	pub path: Utf8PathBuf,
	/// The package that this file belongs to.
	pub package: String,
}

impl Display for File {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}", self.path.as_str())
	}
}

impl File {
	pub fn new<P: Into<Utf8PathBuf>, U: Into<String>>(path: P, package: U) -> Self {
		Self {
			path: path.into(),
			package: package.into(),
		}
	}
}

/// A graph of files, where each file depends on zero or more other files.
///
/// TODO: support removing files from the graph
#[derive(Default)]
pub struct FileGraph {
	graph: petgraph::stable_graph::StableDiGraph<File, ()>,
	path_to_node_index: IndexMap<File, petgraph::graph::NodeIndex>,
}

impl FileGraph {
	/// Updates a file's dependencies in the graph.
	///
	/// For example, if the current graph has file A depending on B, and
	/// `update_file(pathA, &[pathC])` was called, then this function will remove the edge
	/// from A to B, and add an edge from A to C.
	pub fn set_file_deps<'a, I: IntoIterator<Item = &'a File>>(&mut self, from_file: &File, to_files: I) {
		let from_node_index = self.get_or_insert_node_index(from_file);

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
		for to_path in to_files {
			let to_node_index = self.get_or_insert_node_index(to_path);
			self.graph.add_edge(from_node_index, to_node_index, ());
		}
	}

	/// Returns true if the given file is in the graph
	pub fn contains_file(&mut self, file: &File) -> bool {
		self.path_to_node_index.contains_key(file)
	}

	/// Returns a list of the direct dependencies of the given file.
	/// (does not include all transitive dependencies)
	/// The file path must be relative to the root of the file graph.
	pub fn dependencies_of(&self, file: &File) -> Vec<&File> {
		let node_index = self.path_to_node_index.get(file).expect("path not in graph");
		self
			.graph
			.edges(*node_index)
			.map(|edge| &self.graph[edge.target()])
			.collect::<Vec<_>>()
	}

	/// Returns a list of files in the order they should be compiled, if a topological sort exists.
	/// If there is a cycle in the graph, returns an error with a list of files that are part of a cycle.
	/// (Note that there might be more than one cycle.)
	pub fn toposort(&self) -> Result<Vec<File>, Vec<File>> {
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

	fn get_or_insert_node_index(&mut self, file: &File) -> petgraph::graph::NodeIndex {
		if let Some(node_index) = self.path_to_node_index.get(file) {
			return *node_index;
		}

		let node_index = self.graph.add_node(file.to_owned());
		self.path_to_node_index.insert(file.to_owned(), node_index);
		node_index
	}

	pub fn iter_files(&self) -> impl Iterator<Item = &File> {
		self.graph.node_indices().map(move |node_index| &self.graph[node_index])
	}
}

impl Display for FileGraph {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		for node_index in self.graph.node_indices() {
			let node = &self.graph[node_index];
			write!(f, "{{{} -> [ ", node)?;
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
	use itertools::Itertools;

	use super::*;

	#[test]
	fn toposort_simple() {
		// graph with two nodes, A and B, where A depends on B
		let mut graph = FileGraph::default();
		let a = File::new("a", "pkg");
		let b = File::new("b", "pkg");
		graph.set_file_deps(&a, [&b]);
		graph.set_file_deps(&b, []);
		assert_eq!(file_paths(&graph.toposort().unwrap()), ["b", "a"]);
	}

	#[test]
	fn toposort_complex() {
		// graph with 5 nodes, A, B, C, D, and E, where A depends on B and C, B depends on C and D, C depends on D, and D depends on E
		let mut graph = FileGraph::default();
		let a = File::new("a", "pkg");
		let b = File::new("b", "pkg");
		let c = File::new("c", "pkg");
		let d = File::new("d", "pkg");
		let e = File::new("e", "pkg");
		graph.set_file_deps(&a, [&b, &c]);
		graph.set_file_deps(&b, [&c, &d]);
		graph.set_file_deps(&c, [&d]);
		graph.set_file_deps(&d, [&e]);
		graph.set_file_deps(&e, []);
		assert_eq!(file_paths(&graph.toposort().unwrap()), ["e", "d", "c", "b", "a"]);

		// create the same graph in a different order as a sanity check
		let mut graph = FileGraph::default();
		graph.set_file_deps(&e, []);
		graph.set_file_deps(&d, [&e]);
		graph.set_file_deps(&c, [&d]);
		graph.set_file_deps(&b, [&c, &d]);
		graph.set_file_deps(&a, [&b, &c]);
		assert_eq!(file_paths(&graph.toposort().unwrap()), ["e", "d", "c", "b", "a"]);
	}

	#[test]
	fn toposort_cycle() {
		// graph with 3 nodes, A, B, and C, where A depends on B, B depends on C, and C depends on A
		let mut graph = FileGraph::default();
		let a = File::new("a", "pkg");
		let b = File::new("b", "pkg");
		let c = File::new("c", "pkg");
		graph.set_file_deps(&a, [&b]);
		graph.set_file_deps(&b, [&c]);
		graph.set_file_deps(&c, [&a]);

		let res = graph.toposort().unwrap_err();
		let mut err = file_paths(&res);
		err.sort();
		assert_eq!(err, ["a", "b", "c"]);
	}

	#[test]
	fn toposort_two_cycles_with_shared_node() {
		// graph where A is part of two cycles, {A,B,C} and {A,X,Y}
		let mut graph = FileGraph::default();
		let a = File::new("a", "pkg");
		let b = File::new("b", "pkg");
		let c = File::new("c", "pkg");
		let x = File::new("x", "pkg");
		let y = File::new("y", "pkg");
		graph.set_file_deps(&a, [&b, &x]);
		graph.set_file_deps(&b, [&c]);
		graph.set_file_deps(&c, [&a]);
		graph.set_file_deps(&x, [&y]);
		graph.set_file_deps(&y, [&a]);

		let res = graph.toposort().unwrap_err();
		let mut err = file_paths(&res);
		err.sort();
		assert_eq!(err, ["a", "b", "c", "x", "y"]);
	}

	#[test]
	fn toposort_two_distinct_cycles() {
		// graph with six nodes, where {A,B,C} form a cycle and {D,E,F} form a cycle
		let mut graph = FileGraph::default();
		let a = File::new("a", "pkg");
		let b = File::new("b", "pkg");
		let c = File::new("c", "pkg");
		let d = File::new("d", "pkg");
		let e = File::new("e", "pkg");
		let f = File::new("f", "pkg");
		graph.set_file_deps(&a, [&b]);
		graph.set_file_deps(&b, [&c]);
		graph.set_file_deps(&c, [&a]);
		graph.set_file_deps(&d, [&e]);
		graph.set_file_deps(&e, [&f]);
		graph.set_file_deps(&f, [&d]);

		let res = graph.toposort().unwrap_err();
		let mut err = file_paths(&res);
		err.sort();

		// note: if we returned the cycle {D,E,F} that would also be valid
		assert_eq!(err, ["a", "b", "c"]);
	}

	#[test]
	fn toposort_cycle_and_unrelated_component() {
		// graph with 5 nodes, where A depends on B, and {C,D,E} form a cycle
		let mut graph = FileGraph::default();
		let a = File::new("a", "pkg");
		let b = File::new("b", "pkg");
		let c = File::new("c", "pkg");
		let d = File::new("d", "pkg");
		let e = File::new("e", "pkg");
		graph.set_file_deps(&a, [&b]);
		graph.set_file_deps(&b, []);
		graph.set_file_deps(&c, [&d]);
		graph.set_file_deps(&d, [&e]);
		graph.set_file_deps(&e, [&c]);

		// we don't care about where the cycle starts, so we sort the list
		let res = graph.toposort().unwrap_err();
		let mut err = file_paths(&res);
		err.sort();
		assert_eq!(err, ["c", "d", "e"]);
	}

	#[test]
	fn toposort_update_edges() {
		// graph with 3 nodes, A, B, and C, where A depends on B and C, and B depends on C
		let mut graph = FileGraph::default();
		let a = File::new("a", "pkg");
		let b = File::new("b", "pkg");
		let c = File::new("c", "pkg");
		graph.set_file_deps(&a, [&b, &c]);
		graph.set_file_deps(&b, [&c]);
		graph.set_file_deps(&c, []);
		assert_eq!(file_paths(&graph.toposort().unwrap()), ["c", "b", "a"]);

		// update the edges so that A depends on C and B depends on A
		graph.set_file_deps(&a, [&c]);
		graph.set_file_deps(&b, [&a]);
		assert_eq!(file_paths(&graph.toposort().unwrap()), ["c", "a", "b"]);
	}

	fn file_paths(files: &Vec<File>) -> Vec<&str> {
		files.iter().map(|x| x.path.as_str()).collect_vec()
	}
}
