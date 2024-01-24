import { describe, expect, it } from "vitest";
import { getChanges, TurboOutput } from "./turbo-diff";

describe("getChanges", () => {
  it("should return the correct task change map", () => {
    const turboOutput: TurboOutput = {
      absoluteRoot: "/tmp/root",
      tasks: [
        {
          taskId: "project1#task",
          directory: "project1",
          cache: { status: "HIT" },
          package: "project1",
          dependencies: [],
          inputs: {
            "file1.js": {},
            "file2.js": {},
          },
        },
        {
          taskId: "project2#task",
          directory: "project2",
          cache: { status: "MISS" },
          package: "project2",
          dependencies: [],
          inputs: {
            "file3.js": {},
            "file4.js": {},
          },
        },
      ],
      globalInputFiles: [],
    };

    const fileChanges = {
      absoluteChanges: [
        "/tmp/root/project2/file3.js",
      ],
      relativeChanges: ["project2/file3.js"],
    };

    const expectedTaskChangeMap = {
      "project1#task": {
        cached: true,
        changes: false,
      },
      "project2#task": {
        cached: false,
        changes: true,
      },
    };

    expect(getChanges(turboOutput, fileChanges)).toEqual(expectedTaskChangeMap);
  });
});
