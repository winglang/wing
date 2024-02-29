import { test, expect } from "vitest";
import { cloud } from "../../src";
import { IFunctionClient, OnDeploy } from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { State } from "../../src/target-sim";
import { SimApp } from "../sim-app";

test("state can be resolved at any time", async () => {
  // GIVEN
  const app = new SimApp();
  const state = new State(app, "MyState");

  // WHEN
  const tokenKey = "myKey";
  const token = state.token(tokenKey);

  const fn = new cloud.Function(
    app,
    "MyFunction",
    Testing.makeHandler(`
      async handle(event) {
        return process.env.MY_KEY;
      }
      `),
    {
      env: {
        MY_KEY: token,
      },
    },
  );

  new OnDeploy(
    app,
    "MyOnDeploy",
    Testing.makeHandler(
      `
      async handle() {
        console.log("setting ${tokenKey}");
        await this.my_state.set("${tokenKey}", "bang bang");
      }
      `,
      {
        my_state: {
          obj: state,
          ops: ["set"],
        },
      },
    ),
  );

  const s = await app.startSimulator();

  const fnClient = s.getResource(fn.node.path) as IFunctionClient;
  const result = await fnClient.invoke("");
  expect(result).toBe("bang bang");
});
