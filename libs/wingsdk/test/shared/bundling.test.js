"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var vlq_1 = require("vlq");
var bundling_1 = require("../../src/shared/bundling");
(0, vitest_1.describe)("fixSourcemaps", function () {
    (0, vitest_1.it)("should fix sourcemaps", function () {
        // THEN
        var mappings = [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 2, 2, 0],
            [0, -1, 3, 0],
            [0, -1, 4, 0],
        ];
        var originalMapping = mappings.map(function (m) { return (0, vlq_1.encode)(m); }).join(";");
        var sourcemapData = {
            sources: ["a/aa", "b", "a/aa", "c"],
            sourcesContent: ["1", "2", "1", "3"],
            mappings: originalMapping,
        };
        // WHEN
        (0, bundling_1.fixSourcemaps)(sourcemapData);
        // THEN
        (0, vitest_1.expect)(sourcemapData.sources).toHaveLength(3);
        (0, vitest_1.expect)(sourcemapData.sourcesContent).toHaveLength(3);
        (0, vitest_1.expect)(sourcemapData.mappings).not.toEqual(originalMapping);
        (0, vitest_1.expect)(sourcemapData.sources).toMatchInlineSnapshot("\n      [\n        \"a/aa\",\n        \"b\",\n        \"c\",\n      ]\n    ");
        (0, vitest_1.expect)(sourcemapData.sourcesContent).toMatchInlineSnapshot("\n      [\n        \"1\",\n        \"2\",\n        \"3\",\n      ]\n    ");
        var decoded = sourcemapData.mappings.split(";").map(vlq_1.decode);
        (0, vitest_1.expect)(decoded).toHaveLength(5);
        // first 2 mappings are unchanged
        (0, vitest_1.expect)(decoded[0]).toEqual(mappings[0]);
        (0, vitest_1.expect)(decoded[1]).toEqual(mappings[1]);
        // This mapping pointed to [3] which is now at [2], so now it needs to point to [2]
        // AKA Shifted by 1
        (0, vitest_1.expect)(decoded[2]).toEqual([
            mappings[2][0],
            mappings[2][1] - 1,
            mappings[2][2],
            mappings[2][3],
        ]);
        (0, vitest_1.expect)(decoded[3]).toEqual([
            mappings[3][0],
            mappings[3][1] - 1,
            mappings[3][2],
            mappings[3][3],
        ]);
        (0, vitest_1.expect)(decoded[4]).toEqual([
            mappings[4][0],
            mappings[4][1] + 2,
            mappings[4][2],
            mappings[4][3],
        ]);
    });
});
