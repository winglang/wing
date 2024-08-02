import { expect, test } from "vitest";

import { uniqBy } from "./uniq-by.js";

test("deduplicates items using identity as iteratee", () => {
  expect(uniqBy([1, 2], (number) => number)).toEqual([1, 2]);
  expect(uniqBy([1, 2, 3, 1, 2], (number) => number)).toEqual([1, 2, 3]);
});

test("deduplicates items using a custom iteratee", () => {
  expect(
    uniqBy(
      [
        { id: 1, name: "John" },
        { id: 2, name: "Sarah" },
        { id: 1, name: "Repeated" },
      ],
      (object) => object.id,
    ),
  ).toEqual([
    { id: 1, name: "John" },
    { id: 2, name: "Sarah" },
  ]);
});
