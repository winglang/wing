import * as open from "open";
import { docs } from "../src/commands/docs";

jest.mock("open");

test("wing docs opens the docs website", async () => {  
  await docs();
  expect(open).toBeCalledWith("https://docs.winglang.io");
});

