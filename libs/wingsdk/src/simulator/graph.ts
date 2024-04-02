import { resolveTokens } from "./tokens";

export interface Definition {
  path: string;
  deps?: string[];
  props?: Record<string, any>;
}

class Node<T extends Definition> {
  public readonly dependencies = new Set<string>();
  public readonly dependents = new Set<string>();
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

  public tryFind(path: string): Node<T> | undefined {
    const node = this.byPath[path];
    if (!node) {
      return undefined;
    }

    return node;
  }

  private recordDependency(consumer: string, producer: string) {
    this.tryFind(consumer)?.dependencies.add(producer);
    this.tryFind(producer)?.dependents.add(consumer);

    // check for cyclic dependencies
    this.detectCycles(consumer);
    this.detectCycles(producer);
  }

  private detectCycles(root: string) {
    const visited = new Set<string>();
    const stack = new Set<string>();

    const visit = (path: string) => {
      if (stack.has(path)) {
        throw new Error(
          `cyclic dependency detected: ${[...stack, path].join(" -> ")}`
        );
      }

      if (visited.has(path)) {
        return;
      }

      visited.add(path);
      stack.add(path);

      for (const dep of this.tryFind(path)?.dependencies ?? []) {
        visit(dep);
      }

      stack.delete(path);
    };

    visit(root);
  }
}
