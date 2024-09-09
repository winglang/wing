import { expect, test } from "vitest";
import { isPath } from "../src/shared/misc";

test("isPath", () => {
  expect(isPath("foo")).toBeFalsy();
  expect(isPath("./hello")).toBeTruthy();
  expect(isPath("../hello")).toBeTruthy();
  expect(isPath(".././../hello")).toBeTruthy();
  expect(isPath("/hello/world")).toBeTruthy();
});
