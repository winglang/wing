import { test } from "vitest";

import { constructHubTreeToWingSchema } from "@/stories/utils";

test("tree", async () => {
  const tree = await constructHubTreeToWingSchema();

  console.log(JSON.stringify(tree, undefined, 2));
});
