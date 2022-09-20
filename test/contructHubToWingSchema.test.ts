import { test, expect } from "vitest";

import { constructHubTreeToWingSchema } from "@/stories/utils";

test("tree", async () => {
  const tree = await constructHubTreeToWingSchema();
  // expect(tree).toMatchSnapshot();
  console.log(tree);
});
