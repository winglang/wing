import { Construct } from "constructs";
import { expect, test } from "vitest";
import * as cloud from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { Resource } from "../../src/std";
import * as ui from "../../src/ui";
import { SimApp } from "../sim-app";
import { listMessages } from "../target-sim/util";

test("can obtain ui components", async () => {
  // GIVEN
  const app = new SimApp();

  class MyClass extends Resource {
    constructor(scope: Construct, id: string) {
      super(scope, id);

      const section = new ui.Section(this, "Section", { label: "Overview" });
      const buttonHandler = Testing.makeHandler(
        `async handle() { return "button worked"; }`,
      );
      const button = new ui.Button(
        this,
        "Button",
        "Button Label",
        buttonHandler,
      );
      const fieldHandler = Testing.makeHandler(
        `async handle() { return "field worked"; }`,
      );
      const field = new ui.Field(this, "Field", "Field Label", fieldHandler);
      section.add(button, field);
    }
  }
  new MyClass(app, "MyClass");

  // WHEN
  const s = await app.startSimulator();
  const buttonClient = s.getResource(
    "/MyClass/Button/Handler",
  ) as cloud.IFunctionClient;
  const fieldClient = s.getResource(
    "/MyClass/Field/Handler",
  ) as cloud.IFunctionClient;

  // WHEN
  const response1 = await buttonClient.invoke("");
  expect(response1).toEqual("button worked");
  const response2 = await fieldClient.invoke("");
  expect(response2).toEqual("field worked");

  expect(s.getResourceUI("/MyClass")).toEqual([
    {
      kind: "section",
      label: "Overview",
      children: [
        {
          kind: "button",
          label: "Button Label",
          handler: "root/MyClass/Button/Handler",
        },
        {
          kind: "field",
          label: "Field Label",
          handler: "root/MyClass/Field/Handler",
        },
      ],
    },
  ]);

  // THEN
  await s.stop();
  expect(listMessages(s)).toMatchSnapshot();
});
