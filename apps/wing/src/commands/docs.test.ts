import open from "open";
import { docs } from "./docs";
import { vi, test, expect } from "vitest";

vi.mock("open");

test("wing docs opens the docs website", async () => {  
  await docs();
  expect(open).toBeCalledWith("https://docs.winglang.io");
});

