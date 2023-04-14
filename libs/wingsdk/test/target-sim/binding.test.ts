import { test, expect } from "vitest";
import { Function } from "../../src/cloud";
import { Testing } from "../../src/testing";
import { SimApp } from "../sim-app";

test("binding throws if a method is unsupported", () => {
  const app = new SimApp();
  const handler = Testing.makeHandler(app, "Handler", "async handle() {}");
  const host = Function._newFunction(app, "Function", handler);
  expect(() => handler._registerBind(host, ["foo", "bar"])).toThrow(
    /Unable to reference \"root\/Handler\" from \"root\/Function\" because it does not support operation \"foo\"/
  );
});
