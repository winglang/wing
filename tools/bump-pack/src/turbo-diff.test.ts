import { describe, expect, it } from "vitest";
import { getChanges, TurboOutput } from "./turbo-diff";

const turboOutputBase: TurboOutput = {
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

const turboOutputWithDependencies = structuredClone(turboOutputBase);
turboOutputWithDependencies.tasks[0].dependencies = ["project2#task"];

function createChanges(...files: string[]) {
  return {
    absoluteChanges: files.map((file) => `/tmp/root/${file}`),
    relativeChanges: files,
  };
}

describe("getChanges", () => {
  it("should detect single file change", () => {
    const fileChanges = createChanges("project2/file3.js");

    expect(getChanges(turboOutputBase, fileChanges)).toMatchInlineSnapshot(`
      {
        "project1#task": {
          "cached": true,
          "changes": false,
        },
        "project2#task": {
          "cached": false,
          "changes": true,
        },
      }
    `);
  });

  it("should should detect change from dependency", () => {
    const fileChanges = createChanges("project2/file3.js");

    expect(getChanges(turboOutputWithDependencies, fileChanges))
      .toMatchInlineSnapshot(`
      {
        "project1#task": {
          "cached": true,
          "changes": true,
        },
        "project2#task": {
          "cached": false,
          "changes": true,
        },
      }
    `);
  });
});
