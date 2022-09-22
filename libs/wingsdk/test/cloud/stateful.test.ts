import * as cloud from "../../src/cloud";
import { App, NodeJsCode, Inflight } from "../../src/core";
import * as sim from "../../src/sim";
import { mkdtemp } from "../util";

test("each cloud resource can be identified as stateful or not", () => {
  const app = new App({
    synthesizer: new sim.Synthesizer({ outdir: mkdtemp() }),
  });
  const bucket = new cloud.Bucket(app.root, "bucket");
  const fn = new cloud.Function(app.root, "fn", makeInflight());
  const queue = new cloud.Queue(app.root, "queue");
  expect(bucket.stateful).toEqual(true);
  expect(fn.stateful).toEqual(false);
  expect(queue.stateful).toEqual(true);
});

function makeInflight() {
  return new Inflight({
    code: NodeJsCode.fromInline(
      'exports.handler = function() { console.log("hello!") };'
    ),
    entrypoint: "index.handler",
  });
}
