import open from "open";
import { vi, test, expect } from "vitest";
import { docs } from "./docs";

vi.mock("open");

test("wing docs opens the docs website", async () => {
  await docs();
  expect(open).toBeCalledWith("https://www.winglang.io/docs/");
});
