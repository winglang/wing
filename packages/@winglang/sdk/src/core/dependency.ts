// This file is copied from
// https://github.com/cdk8s-team/cdk8s-core/blob/2.x/src/dependency.ts
import { Node, IConstruct } from "constructs";

/**
 * Represents the dependency graph for a given Node.
 *
 * This graph includes the dependency relationships between all nodes in the
 * node (construct) sub-tree who's root is this Node.
 *
 * Note that this means that lonely nodes (no dependencies and no dependants) are also included in this graph as
 * childless children of the root node of the graph.
 *
 * The graph does not include cross-scope dependencies. That is, if a child on the current scope depends on a node
 * from a different scope, that relationship is not represented in this graph.
 *
 */
export class DependencyGraph {
  private readonly _fosterParent: DependencyVertex;

  constructor(node: Node) {
    this._fosterParent = new DependencyVertex();

    const nodes: Record<string, DependencyVertex> = {};

    function putVertex(construct: IConstruct) {
      nodes[Node.of(construct).path] = new DependencyVertex(construct);
    }

    function getVertex(construct: IConstruct): DependencyVertex {
      return nodes[Node.of(construct).path];
    }

    // create all vertices of the graph.
    for (const n of node.findAll()) {
      putVertex(n);
    }

    const deps = [];
    for (const child of node.findAll()) {
      for (const dep of child.node.dependencies) {
        deps.push({ source: child, target: dep });
      }
    }

    // create all the edges of the graph.
    for (const dep of deps) {
      if (!getVertex(dep.target)) {
        // dont cross scope boundaries.
        // since charts only renders its own children, this is ok and
        // has the benefit of simplifying the graph. we should reconsider this behavior when moving
        // to a more general purpose use-case.
        continue;
      }

      const sourceDepNode = getVertex(dep.source);
      const targetDepNode = getVertex(dep.target);

      sourceDepNode.addChild(targetDepNode);
    }

    // create the root.
    for (const n of Object.values(nodes)) {
      if (n.inbound.length === 0) {
        // orphans are dependency roots. lets adopt them!
        this._fosterParent.addChild(n);
      }
    }
  }

  /**
   * Returns the root of the graph.
   *
   * Note that this vertex will always have `null` as its `.value` since it is an artifical root
   * that binds all the connected spaces of the graph.
   */
  public get root(): DependencyVertex {
    return this._fosterParent;
  }

  /**
   * Returns a topologically sorted array of the constructs in the sub-graph.
   */
  public topology(): IConstruct[] {
    return this._fosterParent.topology();
  }
}

/**
 * Represents a vertex in the graph.
 *
 * The value of each vertex is an `IConstruct` that is accessible via the `.value` getter.
 */
export class DependencyVertex {
  private readonly _value: IConstruct | undefined;
  private readonly _children: Set<DependencyVertex> =
    new Set<DependencyVertex>();
  private readonly _parents: Set<DependencyVertex> =
    new Set<DependencyVertex>();

  constructor(value: IConstruct | undefined = undefined) {
    this._value = value;
  }

  /**
   * Returns the IConstruct this graph vertex represents.
   *
   * `null` in case this is the root of the graph.
   */
  public get value(): IConstruct | undefined {
    return this._value;
  }

  /**
   * Returns the children of the vertex (i.e dependencies)
   */
  public get outbound(): Array<DependencyVertex> {
    return Array.from(this._children);
  }

  /**
   * Returns the parents of the vertex (i.e dependants)
   */
  public get inbound(): Array<DependencyVertex> {
    return Array.from(this._parents);
  }

  /**
   * Returns a topologically sorted array of the constructs in the sub-graph.
   */
  public topology(): IConstruct[] {
    const found = new Set<DependencyVertex>();
    const topology: DependencyVertex[] = [];

    function visit(n: DependencyVertex) {
      for (const c of n.outbound) {
        visit(c);
      }
      if (!found.has(n)) {
        topology.push(n);
        found.add(n);
      }
    }

    visit(this);

    return topology.filter((d) => d.value).map((d) => d.value!);
  }

  /**
   * Adds a vertex as a dependency of the current node.
   * Also updates the parents of `dep`, so that it contains this node as a parent.
   *
   * This operation will fail in case it creates a cycle in the graph.
   *
   * @param dep The dependency
   */
  public addChild(dep: DependencyVertex) {
    const cycle: DependencyVertex[] = dep.findRoute(this);
    if (cycle.length !== 0) {
      cycle.push(dep);
      throw new Error(
        `Dependency cycle detected: ${cycle
          .filter((d) => d.value)
          .map((d) => Node.of(d.value!).path)
          .join(" => ")}`,
      );
    }

    this._children.add(dep);
    dep.addParent(this);
  }

  private addParent(dep: DependencyVertex) {
    this._parents.add(dep);
  }

  private findRoute(dst: DependencyVertex): DependencyVertex[] {
    const route: DependencyVertex[] = [];
    visit(this);
    return route;

    function visit(n: DependencyVertex): boolean {
      route.push(n);
      let found = false;
      for (const c of n.outbound) {
        if (c === dst) {
          route.push(c);
          return true;
        }
        found = visit(c);
      }
      if (!found) {
        route.pop();
      }
      return found;
    }
  }
}
