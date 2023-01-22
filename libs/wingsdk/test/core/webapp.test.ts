import { WebApp } from "../../src/cloud/webapp";
import { Inflight, NodeJsCode } from "../../src/core";
import { SimApp } from "../../src/testing";

test("foo", async () => {
  const app = new SimApp();

  const js = new Inflight(app, "WebClient", {
    code: NodeJsCode.fromInline(`
      async handle() {
        alert("hello wing in your browser");
      }
    `),
  });

  new WebApp(app, "WebApp", js);

  await app.startSimulator();

  expect(app.snapshot()).toMatchSnapshot();
});
