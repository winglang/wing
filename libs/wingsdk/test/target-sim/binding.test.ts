import { Function } from "../../src/cloud";
import { SimApp, Testing } from "../../src/testing";

test("binding throws if a method is unsupported", () => {
  const app = new SimApp();
  const handler = Testing.makeHandler(app, "Handler", "async handle() {}");
  const host = Function.newFunction(app, "Function", handler);
  expect(() => handler._registerBind(host, ["foo", "bar"])).toThrow(
    /Resource root\/Handler does not support operation foo/
  );
});
