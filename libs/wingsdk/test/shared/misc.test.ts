import { describe, expect, test } from "vitest";
import { generateDockerContainerName } from "../../src/shared/misc";

describe("generateDockerContainerName", () => {
  test("includes the provided prefix", () => {
    const prefix = "my-example-name";
    const actual = generateDockerContainerName(prefix);
    expect(actual).toContain(prefix);
  });

  test("removes disallowed characters", () => {
    const actual = generateDockerContainerName(
      "wing-container-type-App.Name With Spaces/And/Stuff"
    );
    expect(actual).not.contains(/[ \/]/);
  });

  test("includes a uuid v4 suffix", () => {
    const uuidRegexp = /[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}$/i;
    const actual = generateDockerContainerName("wing-container-type-name");
    expect(actual).toMatch(uuidRegexp);
  });
});
