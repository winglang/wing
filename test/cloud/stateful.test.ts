import { Bucket, Function } from "../../src/cloud";
import { App, NodeJsCode, Process } from "../../src/core";
import * as local from "../../src/local";
import { mkdtemp } from "../util";

test("each cloud resource can be identified as stateful or not", () => {
  const app = new App({
    synthesizer: new local.Synthesizer({ outdir: mkdtemp() }),
  });
  const bucket = new Bucket(app.root, "bucket", {});
  const fn = new Function(app.root, "fn", makeProcess());
  // const queue = new Queue(app.root, "queue", {});
  expect(bucket.stateful).toEqual(true);
  expect(fn.stateful).toEqual(false);
  // expect(queue.stateful).toEqual(true);
});

function makeProcess() {
  return new Process({
    code: NodeJsCode.fromInline(
      'exports.handler = function() { console.log("hello!") };'
    ),
    entrypoint: "index.handler",
  });
}
