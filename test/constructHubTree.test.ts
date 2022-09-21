import { expect, test } from "vitest";

import { buildConstructHubNodeMap } from "@/stories/mockData";

test("builds node map from construct-hub-tree.json", async () => {
  const nodes = await (async () => {
    const constructHubTree = await import(
      "../src/assets/construct-hub-tree.json"
    );

    return buildConstructHubNodeMap(constructHubTree.tree);
  })();

  // console.log(nodes);
  // expect(nodes).toEqual({});
});
