import { vi, test, expect } from "vitest";
import { consolePath } from "./consolePath";

vi.spyOn(console, "log");

test("wing console-path prints the path to the Wing Console", async () => {
  await consolePath();
  expect(console.log).toBeCalledWith(expect.stringContaining("wing-console"));
});
