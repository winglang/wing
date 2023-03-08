import { expect, test } from "vitest";
import { makeHandler } from "../../src/core/internal";
import { Api } from "../../src/target-sim";
import { SimApp } from "../../src/testing";

test("create api", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = makeHandler(
    app,
    "Handler",
    `async handle(message) { console.log("Received " + message); }`
  );
  const api = new Api(app, "my_api");
  //   api.get("/hello", handler);

  const s = await app.startSimulator();

  // THEN
  await s.stop();
  expect("foo").toMatchSnapshot();
});
