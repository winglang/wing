import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
// import * as sim from "../../src/target-sim";
import * as sim from "../../src/target-tf-aws";
import * as tfgcp from "../../src/target-tf-gcp";

class HelloWorld extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new cloud.Bucket(this, "Bucket");
  }
}

const app = new tfgcp.App({
  outdir: __dirname,
  projectId: "chrome-inkwell-370315",
});
new HelloWorld(app, "HelloWorld");
app.synth();
