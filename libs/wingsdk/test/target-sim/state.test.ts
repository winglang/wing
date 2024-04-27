import { test, expect } from "vitest";
import { cloud } from "../../src";
import { IFunctionClient, OnDeploy } from "../../src/cloud";
import { inflight, lift } from "../../src/core";
import { Json } from "../../src/std";
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
    inflight(async () => process.env.MY_KEY),
    {
      env: {
        MY_KEY: token,
      },
    }
  );

  new OnDeploy(
    app,
    "MyOnDeploy",
    lift({ my_state: state, tokenKey })
      .grant({ my_state: ["set"] })
      .inflight(async (ctx) => {
        console.log(`setting ${ctx.tokenKey}`);
        await ctx.my_state.set(`${ctx.tokenKey}`, "bang bang" as any);
      })
  );

  const s = await app.startSimulator();

  const fnClient = s.getResource(fn.node.path) as IFunctionClient;
  const result = await fnClient.invoke("");
  expect(result).toBe("bang bang");
});
