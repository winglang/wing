import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
// import * as local from "../../src/local";
import * as tfaws from "../../src/tf-aws";

class Root extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new cloud.Bucket(this, "bucket", {
      public: true,
    });
  }
}

const app = new core.App({
  synthesizer: new tfaws.Synthesizer({ outdir: __dirname }),
});
new Root(app.root, "root");
app.synth();
