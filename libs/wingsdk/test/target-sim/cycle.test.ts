import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/target-sim";
import { mkdtemp } from "../../src/util";

test("dependency cycle causes simfile synthesis to fail", async () => {
  // GIVEN
  const app = new sim.App({ outdir: mkdtemp() });
  const handler = new core.Inflight({
    code: core.NodeJsCode.fromInline(
      `async function $proc($cap, event) { return "Hello, " + event.name + "!"; }`
    ),
    entrypoint: "$proc",
  });
  const fn1 = new cloud.Function(app, "my_function1", handler);
  const fn2 = new cloud.Function(app, "my_function2", handler);

  // WHEN
  fn1.node.addDependency(fn2);
  fn2.node.addDependency(fn1);

  // THEN
  expect(() => app.synth()).toThrow(/Dependency cycle detected/);
});
