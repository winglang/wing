import { expect, test } from "vitest";

interface ConstructHubNode {
  id: string;
  path: string;
  constructInfo?: Record<string, string>;
  children?: Record<string, ConstructHubNode>;
}
interface Node {
  id: string;
  path: string;
  parent: string | undefined;
  constructInfo?: Record<string, string>;
  children: string[];
}

function visit(
  node: ConstructHubNode,
  callback: (
    parent: ConstructHubNode | undefined,
    child: ConstructHubNode,
  ) => void,
) {
  callback(undefined, node);

  for (const child of Object.values(node.children ?? {})) {
    callback(node, child);

    visit(child, callback);
  }
}

function buildNodeMap(node: ConstructHubNode) {
  let nodes: Record<string, Node> = {};

  visit(node, (parent, node) => {
    nodes = {
      ...nodes,
      [node.path]: {
        id: node.id,
        path: node.path,
        parent: parent?.path,
        children: Object.values(node.children ?? {}).map((child) => child.path),
      },
    };
  });

  return nodes;
}

test.skip("a", async () => {
  const nodes = await (async () => {
    const constructHubTree = await import(
      "../src/assets/construct-hub-tree.json"
    );

    return buildNodeMap(constructHubTree.tree);
  })();

  console.log(nodes);
  // expect(nodes).toEqual({});
});
