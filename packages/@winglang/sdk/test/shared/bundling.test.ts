import { describe, it, expect } from "vitest";
import { encode, decode } from "vlq";
import { fixSourcemaps } from "../../src/shared/bundling";

describe("fixSourcemaps", () => {
  it("should fix sourcemaps", () => {
    // THEN
    const mappings = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 2, 2, 0],
      [0, -1, 3, 0],
      [0, -1, 4, 0],
    ];
    const originalMapping = mappings.map((m) => encode(m)).join(";");

    const sourcemapData = {
      sources: ["a/aa", "b", "a/aa", "c"],
      sourcesContent: ["1", "2", "1", "3"],
      mappings: originalMapping,
    };

    // WHEN
    fixSourcemaps(sourcemapData);

    // THEN
    expect(sourcemapData.sources).toHaveLength(3);
    expect(sourcemapData.sourcesContent).toHaveLength(3);
    expect(sourcemapData.mappings).not.toEqual(originalMapping);

    expect(sourcemapData.sources).toMatchInlineSnapshot(`
      [
        "a/aa",
        "b",
        "c",
      ]
    `);
    expect(sourcemapData.sourcesContent).toMatchInlineSnapshot(`
      [
        "1",
        "2",
        "3",
      ]
    `);

    const decoded = sourcemapData.mappings.split(";").map(decode);
    expect(decoded).toHaveLength(5);
    // first 2 mappings are unchanged
    expect(decoded[0]).toEqual(mappings[0]);
    expect(decoded[1]).toEqual(mappings[1]);
    // This mapping pointed to [3] which is now at [2], so now it needs to point to [2]
    // AKA Shifted by 1
    expect(decoded[2]).toEqual([
      mappings[2][0],
      mappings[2][1] - 1,
      mappings[2][2],
      mappings[2][3],
    ]);
    expect(decoded[3]).toEqual([
      mappings[3][0],
      mappings[3][1] - 1,
      mappings[3][2],
      mappings[3][3],
    ]);
    expect(decoded[4]).toEqual([
      mappings[4][0],
      mappings[4][1] + 2,
      mappings[4][2],
      mappings[4][3],
    ]);
  });
});
