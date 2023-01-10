import { SimApp, Testing } from "../../src/testing";

const INFLIGHT_CODE = `
async handle(event) {
  console.log("Hello, " + event);
  console.log("Wahoo!");
}`;

test("inflight has display hidden property set to true", async () => {
  // GIVEN
  const app = new SimApp();

  // WHEN
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  //THEN
  expect(handler.display.hidden).toEqual(true);
});
