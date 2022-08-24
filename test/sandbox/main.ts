import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
// import * as local from "../../src/local";
import * as tfaws from "../../src/tf-aws";

class Root extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const bucket = new cloud.Bucket(this, "Bucket");
    const inflight = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, event) {
          console.log("Hello, " + event.name);
          await $cap.bucket.put("hello.txt", JSON.stringify(event));
        }`
      ),
      entrypoint: "$proc",
      captures: {
        bucket: {
          obj: bucket,
          methods: ["put"],
        },
      },
    });
    new cloud.Function(this, "Function", inflight);
  }
}

const app = new core.App({
  synthesizer: new tfaws.Synthesizer({ outdir: __dirname }),
});
new Root(app.root, "root");
app.synth();
