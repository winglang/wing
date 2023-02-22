import * as cloud from "../../src/cloud";
import { Resource } from "../../src/core";
import { SimApp, Testing } from "../../src/testing";

test("create a bucket", async () => {
  // GIVEN
  const app = new SimApp();
  const bucket = new cloud.Bucket(app, "my_bucket");
  const handler = Testing.makeHandler(
    app,
    "Handler",
    "async handle() { return 'hello'; }"
  );
  const fn = new cloud.Function(app, "my_function", handler);

  // WHEN
  for (let i = 0; i < 5; i++) {
    Resource.addConnection({
      from: bucket,
      to: fn,
      relationship: "relationship",
    });
  }

  // THEN
  expect(app.snapshot()).toMatchSnapshot();
});
