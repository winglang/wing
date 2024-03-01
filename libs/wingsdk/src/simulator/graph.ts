import { resolveTokens } from "./tokens";

export interface Definition {
  path: string;
  deps?: string[];
  props?: Record<string, any>;
}

class Node<T extends Definition> {
  public readonly dependencies: Node<T>[] = [];
  public readonly dependents: Node<T>[] = [];
  constructor(public readonly def: T) {}

  public get path() {
    return this.def.path;
  }
}

export class Graph<T extends Definition> {
  private byPath: Record<string, Node<T>> = {};

  constructor(resources: T[] = []) {
    for (const resource of resources) {
      this.byPath[resource.path] = new Node(resource);
    }

    // build the dependency graph
    for (const resource of resources) {
      const consumer = resource.path;

      // add explicit dependencies
      for (const dep of resource.deps ?? []) {
        this.recordDependency(consumer, dep);
      }

      // add implicit dependencies (e.g. from tokens in props)
      const implicitDeps: string[] = [];

      // collect all tokens from the props object (recursive) the "resolver" here is just a dummy
      // function that collects all tokens and returns a dummy value (we don't care about the
      // result).
      resolveTokens(resource.props ?? {}, (token) => {
        implicitDeps.push(token.path);
        return "[T]"; // <-- we don't really use the result, just need to return something
      });

      // now add all implicit dependencies
      for (const dep of implicitDeps) {
        this.recordDependency(consumer, dep);
      }
    }
  }

  public get nodes(): Node<T>[] {
    return Object.values(this.byPath);
  }

  public find(path: string): Node<T> | undefined {
    return this.byPath[path];
  }

  public toposort(): Array<Array<string>> {
    const result: Array<Array<string>> = [];
    const pending = new Set(this.nodes.map((x) => x.path));
    const started = new Set<string>();

    let i = 0;

    while (pending.size > 0 && i++ < 10) {
      // create an array of all the nodes that are ready to be started. this means that either they have
      // no dependencies or all of their dependencies have already been started.
      const ready = [];

      for (const path of pending) {
        const deps = []; // non-started dependencies
        for (const dep of this.find(path)?.dependencies ?? []) {
          if (!started.has(dep.path)) {
            deps.push(dep);
          }
        }

        // no remaining dependencies, move from "pending" to "ready"
        if (deps.length === 0) {
          ready.push(path);
          pending.delete(path);
        }
      }

      // start all resources that are ready (keep the order deterministic by sorting the paths in each wave)
      result.push(ready.sort());

      // mark the started resources
      for (const path of ready) {
        started.add(path);
      }
    }

    return result;
  }

  private recordDependency(consumer: string, producer: string) {
    const c = this.byPath[consumer];
    const d = this.byPath[producer];
    c.dependencies.push(d);
    d.dependents.push(c);

    // check for cyclic dependencies
    this.checkCycle(c);
    this.checkCycle(d);
  }

  private checkCycle(x: Node<T>) {
    const visited = new Set<string>();
    const stack = new Set<string>();

    const visit = (node: Node<T>) => {
      if (stack.has(node.path)) {
        throw new Error(
          `cyclic dependency detected: ${[...stack, node.path].join(" -> ")}`
        );
      }

      if (visited.has(node.path)) {
        return;
      }

      visited.add(node.path);
      stack.add(node.path);

      for (const dep of node.dependencies) {
        visit(dep);
      }

      stack.delete(node.path);
    };

    visit(x);
  }
}
