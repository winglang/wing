import { vi, test, expect } from "vitest";
import { consoleAppPath } from "./consoleAppPath";

vi.spyOn(console, "log");

test("wing console-path prints the path to the Wing Console app package", async () => {
  await consoleAppPath();
  expect(console.log).toBeCalledWith(expect.stringContaining("wing-console"));
});
