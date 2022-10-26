import { test, expect } from "vitest";

import { constructHubTreeToWingSchema } from "../src/stories/utils.js";

test("tree", async () => {
  const tree = constructHubTreeToWingSchema();
  // expect(tree).toMatchSnapshot();
  console.log(tree);
});
